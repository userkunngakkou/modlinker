// ═══════════════════════════════════════════════════════════
//  ModLinker – Frontend Logic (Vanilla JS, Tauri v2 API)
// ═══════════════════════════════════════════════════════════
window.addEventListener("error", (e) => {
  const title = document.getElementById("header-title-text");
  if (title) title.textContent = "Error: " + e.message;
  fetch('http://localhost:9999', { method: 'POST', body: "ERROR: " + e.message + "\nFile: " + e.filename + "\nLine: " + e.lineno + "\nCol: " + e.colno + "\nStack: " + (e.error && e.error.stack) }).catch(err => console.error(err));
});
window.addEventListener("unhandledrejection", (e) => {
  const title = document.getElementById("header-title-text");
  if (title) title.textContent = "Rejection: " + e.reason;
  fetch('http://localhost:9999', { method: 'POST', body: "REJECTION: " + e.reason }).catch(err => console.error(err));
});
const invoke = window.__TAURI__?.core?.invoke;
const listen = window.__TAURI__?.event?.listen;
const open = window.__TAURI__?.dialog?.open;
const readTextFile = window.__TAURI__?.fs?.readTextFile;

// ── DOM要素 ──
let gamePathInput, browseBtn;

// モード切替
let navModeSync, navModeGenerate, navSettingsBtn;
let panelSync, panelGenerate, panelSettings;
let headerTitleText;

// テーマ
let themeToggleBtn, themeIcon, themeText;

// 設定
let cfApiKeyInput, cfKeySaveBtn, cfKeyClearBtn;
let r2AccountIdInput, r2BucketInput, r2AccessKeyInput, r2SecretKeyInput, r2PublicUrlInput;
let r2SaveBtn, r2ClearBtn;

// ダウンロード用
let manifestInput, skipR2Checkbox, startDiffBtn, browseManifestBtn;
let diffSection, diffTbody, diffStats, executeDownloadBtn;
let manualDlSection, manualDlList;
let currentDiffTargets = [];

// 生成用
let startGenerateBtn, saveManifestBtn;

// 共通
let progressBar, progressLabel, progressPercent;
let logConsoleSync, logConsoleGenerate, clearLogBtnSync, clearLogBtnGenerate;
let resultsTbody, resultsSection, resultsStats, modCountBadge;
let statusIndicator, exportManifestBtn;

// ── 状態 ──
let isProcessing = false;
let currentMode = 'sync'; // 'sync' | 'generate'
let lastManifest = [];
let loadedManifestContent = "";

// ── 初期化 ──
window.addEventListener("DOMContentLoaded", async () => {
  gamePathInput = document.getElementById("game-path-input");
  browseBtn = document.getElementById("browse-btn");

  navModeSync = document.getElementById("nav-mode-sync");
  navModeGenerate = document.getElementById("nav-mode-generate");
  navSettingsBtn = document.getElementById("nav-settings-btn");
  panelSync = document.getElementById("panel-sync");
  panelGenerate = document.getElementById("panel-generate");
  panelSettings = document.getElementById("panel-settings");
  headerTitleText = document.getElementById("header-title-text");

  cfApiKeyInput = document.getElementById("cf-api-key-input");
  cfKeySaveBtn = document.getElementById("cf-key-save-btn");
  cfKeyClearBtn = document.getElementById("cf-key-clear-btn");

  r2AccountIdInput = document.getElementById("r2-account-id");
  r2BucketInput = document.getElementById("r2-bucket");
  r2AccessKeyInput = document.getElementById("r2-access-key");
  r2SecretKeyInput = document.getElementById("r2-secret-key");
  r2PublicUrlInput = document.getElementById("r2-public-url");
  r2SaveBtn = document.getElementById("r2-save-btn");
  r2ClearBtn = document.getElementById("r2-clear-btn");

  manifestInput = document.getElementById("manifest-input");
  skipR2Checkbox = document.getElementById("skip-r2-checkbox");
  browseManifestBtn = document.getElementById("browse-manifest-btn");
  startDiffBtn = document.getElementById("start-diff-btn");
  diffSection = document.getElementById("diff-section");
  diffTbody = document.getElementById("diff-tbody");
  diffStats = document.getElementById("diff-stats");
  executeDownloadBtn = document.getElementById("execute-download-btn");
  manualDlSection = document.getElementById("manual-dl-section");
  manualDlList = document.getElementById("manual-dl-list");

  startGenerateBtn = document.getElementById("start-generate-btn");
  saveManifestBtn = document.getElementById("save-manifest-btn");

  progressBar = document.getElementById("progress-bar");
  progressLabel = document.getElementById("progress-label");
  progressPercent = document.getElementById("progress-percent");
  logConsoleSync = document.getElementById("log-console-sync");
  logConsoleGenerate = document.getElementById("log-console-generate");
  clearLogBtnSync = document.getElementById("clear-log-btn-sync");
  clearLogBtnGenerate = document.getElementById("clear-log-btn-generate");

  resultsTbody = document.getElementById("results-tbody");
  resultsSection = document.getElementById("results-section");
  resultsStats = document.getElementById("results-stats");
  modCountBadge = document.getElementById("mod-count-badge");
  statusIndicator = document.getElementById("status-indicator");
  exportManifestBtn = document.getElementById("export-manifest-btn");

  themeToggleBtn = document.getElementById("theme-toggle-btn");
  themeIcon = document.getElementById("theme-icon");
  themeText = document.getElementById("theme-text");

    // i18n & Custom Select Init
  if (window.i18n) {
    const container = document.getElementById("locale-custom-select-container");
    const initialLocale = window.i18n.detectLocale();
    
    if (container) {
      // Build custom select DOM
      container.innerHTML = `
        <div class="custom-select-wrapper">
          <div class="custom-select-trigger" id="custom-locale-trigger">
            <span id="custom-locale-selected-text"></span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div class="custom-select-options" id="custom-locale-options"></div>
        </div>
      `;

      const trigger = document.getElementById("custom-locale-trigger");
      const optionsContainer = document.getElementById("custom-locale-options");
      const selectedText = document.getElementById("custom-locale-selected-text");

      // Populate options
      window.i18n.SUPPORTED_LOCALES.forEach(loc => {
        const optDiv = document.createElement("div");
        optDiv.className = "custom-option";
        if (loc.code === initialLocale) optDiv.classList.add("selected");
        optDiv.textContent = `${loc.flag} ${loc.name}`;
        optDiv.dataset.value = loc.code;
        
        optDiv.addEventListener("click", async () => {
          // close dropdown
          optionsContainer.classList.remove("open");
          trigger.classList.remove("open");
          
          // update UI
          document.querySelectorAll(".custom-option").forEach(el => el.classList.remove("selected"));
          optDiv.classList.add("selected");
          selectedText.textContent = `${loc.flag} ${loc.name}`;
          
          // Apply locale
          await window.i18n.setLocale(loc.code);
          updateDynamicTexts();
        });
        
        optionsContainer.appendChild(optDiv);
      });

      // Set initial text
      const initLoc = window.i18n.SUPPORTED_LOCALES.find(l => l.code === initialLocale) || window.i18n.SUPPORTED_LOCALES[0];
      selectedText.textContent = `${initLoc.flag} ${initLoc.name}`;

      // Toggle dropdown
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        optionsContainer.classList.toggle("open");
        trigger.classList.toggle("open");
      });

      // Close when clicking outside
      document.addEventListener("click", () => {
        optionsContainer.classList.remove("open");
        trigger.classList.remove("open");
      });
    }

    await window.i18n.setLocale(initialLocale);
  }

  // 動的テキストの更新用（モード切替時などに再適用する場合）
  function updateDynamicTexts() {
    updateThemeUI(document.documentElement.classList.contains("theme-light"));
    if (executeDownloadBtn && currentDiffTargets.length > 0) {
      const dlCount = currentDiffTargets.filter(d => d.action === "download").length;
      executeDownloadBtn.textContent = dlCount === 0 ? window.i18n.t("sync.no_download") : window.i18n.t("sync.download_start", [dlCount]);
    }
  }

  // ── テーマ初期化（最優先） ──
  const savedTheme = localStorage.getItem("theme");
  const isLight = savedTheme ? (savedTheme === "light") : true;
  if (isLight) {
    document.documentElement.classList.add("theme-light");
  } else {
    document.documentElement.classList.remove("theme-light");
  }
  updateThemeUI(isLight);

  // ── イベントリスナー登録（nullガード付き） ──
  if (navModeSync) navModeSync.addEventListener("click", () => switchMode("sync"));
  if (navModeGenerate) navModeGenerate.addEventListener("click", () => switchMode("generate"));
  if (navSettingsBtn) navSettingsBtn.addEventListener("click", () => switchMode("settings"));

  if (browseBtn) browseBtn.addEventListener("click", handleBrowse);
  if (browseManifestBtn) browseManifestBtn.addEventListener("click", handleBrowseManifest);
  if (manifestInput) manifestInput.addEventListener("click", handleBrowseManifest);
  if (clearLogBtnSync) clearLogBtnSync.addEventListener("click", () => clearLog("sync"));
  if (clearLogBtnGenerate) clearLogBtnGenerate.addEventListener("click", () => clearLog("generate"));
  if (exportManifestBtn) exportManifestBtn.addEventListener("click", handleExportManifest);
  if (saveManifestBtn) saveManifestBtn.addEventListener("click", handleSaveManifest);

  if (startGenerateBtn) startGenerateBtn.addEventListener("click", handleGenerateManifest);
  if (startDiffBtn) startDiffBtn.addEventListener("click", handleCheckDiff);
  if (executeDownloadBtn) executeDownloadBtn.addEventListener("click", handleExecuteDownload);
  if (themeToggleBtn) themeToggleBtn.addEventListener("click", toggleTheme);
  if (cfKeySaveBtn) cfKeySaveBtn.addEventListener("click", saveCfApiKey);
  if (cfKeyClearBtn) cfKeyClearBtn.addEventListener("click", clearCfApiKey);

  if (r2SaveBtn) r2SaveBtn.addEventListener("click", saveR2Config);
  if (r2ClearBtn) r2ClearBtn.addEventListener("click", clearR2Config);

  // GSAP 初期アニメーションは一旦無効化

  setupProgressListener();

  // CF APIキーの読み込み
  const savedKey = localStorage.getItem("cf_api_key");
  if (savedKey && cfApiKeyInput) cfApiKeyInput.value = savedKey;

  // R2設定の読み込み（Rust側から安全に読む）
  try {
    const r2Config = await invoke("load_r2_config");
    if (r2Config) {
      if (r2AccountIdInput) r2AccountIdInput.value = r2Config.account_id || "";
      if (r2BucketInput) r2BucketInput.value = r2Config.bucket || "";
      if (r2AccessKeyInput) r2AccessKeyInput.value = r2Config.access_key || "";
      if (r2SecretKeyInput) r2SecretKeyInput.value = r2Config.secret_key || "";
      if (r2PublicUrlInput) r2PublicUrlInput.value = r2Config.public_url || "";
    }
  } catch (e) {
    console.warn("R2設定の読み込みスキップ:", e);
  }
});

// ── CF APIキー保存 ──
function saveCfApiKey() {
  const key = cfApiKeyInput.value.trim();
  if (key) {
    localStorage.setItem("cf_api_key", key);
    addLog("✔ CurseForge APIキーを保存しました。", "success");
  } else {
    localStorage.removeItem("cf_api_key");
    addLog("CurseForge APIキーをクリアしました。", "info");
  }
}

function getCfApiKey() {
  return localStorage.getItem("cf_api_key") || "";
}

function clearCfApiKey() {
  cfApiKeyInput.value = "";
  localStorage.removeItem("cf_api_key");
  addLog("CurseForge APIキーをクリアしました。", "info");
}

// ── R2 設定保存 (Rust側に安全に保存) ──
async function saveR2Config() {
  const config = {
    account_id: r2AccountIdInput.value.trim(),
    bucket: r2BucketInput.value.trim(),
    access_key: r2AccessKeyInput.value.trim(),
    secret_key: r2SecretKeyInput.value.trim(),
    public_url: r2PublicUrlInput.value.trim()
  };
  try {
    await invoke("save_r2_config", { config });
    addLog("✔ Cloudflare R2 の設定を保存しました。", "success");
  } catch (e) {
    addLog(`✘ R2設定の保存に失敗: ${e}`, "error");
  }
}

async function clearR2Config() {
  if (r2AccountIdInput) r2AccountIdInput.value = "";
  if (r2BucketInput) r2BucketInput.value = "";
  if (r2AccessKeyInput) r2AccessKeyInput.value = "";
  if (r2SecretKeyInput) r2SecretKeyInput.value = "";
  if (r2PublicUrlInput) r2PublicUrlInput.value = "";
  try {
    await invoke("clear_r2_config");
    addLog("Cloudflare R2 の設定をクリアしました。", "info");
  } catch (e) {
    addLog(`✘ R2設定のクリアに失敗: ${e}`, "error");
  }
}

async function getR2Config() {
  try {
    return await invoke("load_r2_config");
  } catch (e) {
    return null;
  }
}

// ── モード切替 ──
function switchMode(mode) {
  if (currentMode === mode) return;
  
  // モード切替前のアクティブパネルを非表示にする
  const prevPanel = document.querySelector(".mode-panel.active");
  if (prevPanel) {
    prevPanel.classList.remove("active");
    prevPanel.style.display = "none";
  }

  currentMode = mode;

  navModeSync.classList.toggle("active", mode === "sync");
  navModeGenerate.classList.toggle("active", mode === "generate");
  navSettingsBtn.classList.toggle("active", mode === "settings");

  // 対象パネルを表示してGSAPでアニメーション
  let targetPanelId;
  if (mode === "sync") targetPanelId = "panel-sync";
  else if (mode === "generate") targetPanelId = "panel-generate";
  else if (mode === "settings") targetPanelId = "panel-settings";
  
  const targetPanel = document.getElementById(targetPanelId);
  targetPanel.classList.add("active");
  targetPanel.style.display = "block"; // settings の初期非表示を上書き
  // アニメーションなしで即時表示

  if (mode === "sync") headerTitleText.textContent = window.i18n ? window.i18n.t("header.sync_title") : "MODダウンロード同期";
  else if (mode === "generate") headerTitleText.textContent = window.i18n ? window.i18n.t("header.generate_title") : "マニフェスト生成 (リスト抽出)";
  else if (mode === "settings") headerTitleText.textContent = window.i18n ? window.i18n.t("nav.settings") : "設定";

  resultsSection.style.display = "none";
  if (diffSection) diffSection.style.display = "none";
  if (manualDlSection) manualDlSection.style.display = "none";
}

// ── テーマ切替 ──
function toggleTheme() {
  const isLight = document.documentElement.classList.toggle("theme-light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  updateThemeUI(isLight);
}
function updateThemeUI(isLight) {
  if (isLight) {
    themeText.setAttribute("data-i18n", "nav.theme.dark"); if (window.i18n) { themeText.textContent = window.i18n.t("nav.theme.dark"); } else { themeText.textContent = "ダークモード"; }
    themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
  } else {
    themeText.setAttribute("data-i18n", "nav.theme.light"); if (window.i18n) { themeText.textContent = window.i18n.t("nav.theme.light"); } else { themeText.textContent = "ライトモード"; }
    themeIcon.innerHTML = `
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    `;
  }
}

// ── 進捗リスナー ──
async function setupProgressListener() {
  await listen("sync-progress", (event) => {
    const { stage, message, progress } = event.payload;
    updateProgress(progress, message);
    addLog(message, stageToLogLevel(stage));
    updateStatusDot(stage);
  });
}

// ── フォルダ選択 ──
async function handleBrowse() {
  try {
    const selected = await open({
      directory: true, multiple: false,
      title: "ゲームディレクトリ (.minecraft 等) を選択",
    });
    if (selected) gamePathInput.value = selected;
  } catch (err) {
    addLog(`フォルダ選択エラー: ${err}`, "error");
  }
}

async function handleBrowseManifest() {
  try {
    const selected = await open({
      directory: false,
      multiple: false,
      filters: [{ name: "JSON", extensions: ["json"] }],
      title: "マニフェストファイル (JSON) を選択"
    });
    if (selected) {
      const content = await readTextFile(selected);
      loadedManifestContent = content;
      manifestInput.value = selected;
      addLog(`マニフェストファイルを読み込みました: ${selected}`, "info");
    }
  } catch (err) {
    addLog(`ファイル読み込みエラー: ${err}`, "error");
  }
}

// ── マニフェスト生成 (スキャン) ──
async function handleGenerateManifest() {
  const gamePath = gamePathInput.value.trim();
  if (!gamePath) {
    addLog("⚠ ゲームディレクトリを入力してください。", "warning");
    gamePathInput.focus();
    return;
  }

  if (isProcessing) return;
  setProcessingState(startGenerateBtn, true, "スキャン中...");
  resultsSection.style.display = "none";
  addLog(`マニフェスト生成開始: ${gamePath}`, "info");

  const cfKey = getCfApiKey();
  if (cfKey) addLog("CurseForge APIキーあり → CF照合を実行します。", "info");
  else addLog("CurseForge APIキーなし → Modrinth のみで照合します。", "info");

  try {
    const manifest = await invoke("sync_mods", {
      gamePath: gamePath,
      cfApiKey: cfKey || null
    });

    // R2設定があれば、API未登録(unknown)なMODをR2へ自動アップロード
    const r2Config = await getR2Config();
    if (r2Config && r2Config.account_id && r2Config.bucket && r2Config.access_key && r2Config.secret_key) {
      for (let i = 0; i < manifest.length; i++) {
        const mod = manifest[i];
        if (mod.source === "unknown" && !mod.download_url) {
          const separator = gamePath.includes("\\") ? "\\" : "/";
          let dir = mod.target_dir.replace(/^[\/\\]+/, "");
          const filePath = `${gamePath}${separator}${dir}${separator}${mod.file_name}`;
          
          addLog(`API未登録MODをR2へ自動アップロードします: ${mod.file_name}`, "info");
          try {
            const publicUrl = await invoke("upload_to_r2", {
              filePath: filePath
            });
            manifest[i].download_url = publicUrl;
            manifest[i].source = "manual"; // R2からのダウンロード(manual)扱いに変更
            addLog(`✔ R2アップロード完了: ${publicUrl}`, "success");
          } catch (r2Err) {
            addLog(`✘ R2アップロード失敗 (${mod.file_name}): ${r2Err}`, "error");
          }
        }
      }
    }

    lastManifest = manifest;
    renderResults(manifest);
    loadedManifestContent = JSON.stringify(manifest, null, 2);
    manifestInput.value = "(自動生成されたマニフェスト)";
  } catch (err) {
    addLog(`✘ エラー: ${err}`, "error");
    updateProgress(0, "エラーが発生しました");
    updateStatusDot("error");
  } finally {
    setProcessingState(startGenerateBtn, false, "スキャン開始");
  }
}

// ── 差分チェック ──
async function handleCheckDiff() {
  const gamePath = gamePathInput.value.trim();
  if (!gamePath) {
    addLog("⚠ ゲームディレクトリを入力してください。", "warning");
    gamePathInput.focus();
    return;
  }

  const manifestText = loadedManifestContent.trim();
  if (!manifestText) {
    addLog("⚠ マニフェスト(JSON)が選択されていません。", "warning");
    return;
  }

  const skipR2 = skipR2Checkbox.checked;

  if (isProcessing) return;
  setProcessingState(startDiffBtn, true, "チェック中...");
  diffSection.style.display = "none";
  manualDlSection.style.display = "none";
  addLog(`差分チェック開始: ${gamePath}`, "info");

  try {
    const diffResults = await invoke("check_sync_diff", {
      gamePath: gamePath,
      manifestJson: manifestText,
      skipR2: skipR2
    });
    renderDiffResults(diffResults);
  } catch (err) {
    addLog(`✘ 差分チェックエラー: ${err}`, "error");
    updateProgress(0, "エラーが発生しました");
    updateStatusDot("error");
  } finally {
    setProcessingState(startDiffBtn, false, "差分をチェック");
  }
}

function renderDiffResults(diffResults) {
  diffSection.style.display = "block";
  diffTbody.innerHTML = "";
  currentDiffTargets = [];
  const manualItems = [];

  let dlCount = 0, skipCount = 0, upToDateCount = 0, manualCount = 0;

  for (const entry of diffResults) {
    const tr = document.createElement("tr");
    let statusBadge = "";
    let sourceBadge = makeSourceBadge(entry.source);

    if (entry.action === "download") {
      statusBadge = `<span class="status-badge unmatched">↓ DL対象</span>`;
      dlCount++;
      currentDiffTargets.push({
        file_name: entry.file_name,
        target_dir: entry.target_dir,
        url: entry.url
      });
    } else if (entry.action === "manual") {
      statusBadge = `<span class="status-badge" style="background: rgba(255, 165, 0, 0.12); color: orange;">🔗 手動DL</span>`;
      manualCount++;
      manualItems.push(entry);
    } else if (entry.action === "skip") {
      statusBadge = `<span class="status-badge" style="background: rgba(255, 165, 0, 0.12); color: orange;">⚠ スキップ</span>`;
      skipCount++;
    } else if (entry.action === "up_to_date") {
      statusBadge = `<span class="status-badge matched">✔ 最新</span>`;
      upToDateCount++;
    }

    const urlCell = entry.url
      ? `<a class="url-link" href="${escapeHtml(entry.url)}" target="_blank">Link</a>`
      : entry.page_url
        ? `<a class="url-link" href="${escapeHtml(entry.page_url)}" target="_blank">手動DL</a>`
        : `<span style="color: var(--text-muted);">—</span>`;

    tr.innerHTML = `
      <td><span class="dir-badge">${escapeHtml(entry.target_dir)}/</span></td>
      <td>${statusBadge}</td>
      <td class="file-name-cell">${escapeHtml(entry.file_name)}</td>
      <td>${sourceBadge}</td>
      <td>${urlCell}</td>
    `;
    diffTbody.appendChild(tr);
  }

  diffStats.innerHTML = `
    <div class="stat-item">
      <span class="stat-label">DL対象:</span>
      <span class="stat-value" style="color: var(--accent-error);">${dlCount}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">最新:</span>
      <span class="stat-value" style="color: var(--accent-success);">${upToDateCount}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">手動DL:</span>
      <span class="stat-value" style="color: orange;">${manualCount}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">スキップ:</span>
      <span class="stat-value" style="color: var(--text-muted);">${skipCount}</span>
    </div>
  `;

  executeDownloadBtn.disabled = (dlCount === 0);
  executeDownloadBtn.textContent = dlCount === 0 ? "ダウンロード不要" : `ダウンロード開始 (${dlCount} 個)`;

  // gsap アニメーション削除

  // 手動DLリンク一覧
  if (manualItems.length > 0) {
    manualDlSection.style.display = "block";
    manualDlList.innerHTML = manualItems.map(item => `
      <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--glass-border);">
        <span class="dir-badge">${escapeHtml(item.target_dir)}/</span>
        <span class="file-name-cell" style="flex: 1;">${escapeHtml(item.file_name)}</span>
        ${item.page_url ? `<a class="url-link" href="${escapeHtml(item.page_url)}" target="_blank" style="white-space: nowrap;">🔗 ページを開く</a>` : `<span style="color: var(--text-muted); font-size: 12px;">リンクなし</span>`}
      </div>
    `).join("");
    // gsap アニメーション削除
  } else {
    manualDlSection.style.display = "none";
  }
}

// ── 実際のダウンロード ──
async function handleExecuteDownload() {
  const gamePath = gamePathInput.value.trim();
  if (currentDiffTargets.length === 0) return;

  if (isProcessing) return;
  setProcessingState(executeDownloadBtn, true, "ダウンロード中...");
  addLog(`ダウンロードを開始します（${currentDiffTargets.length} 個）`, "info");

  try {
    await invoke("execute_download", {
      gamePath: gamePath,
      targetsJson: JSON.stringify(currentDiffTargets)
    });
  } catch (err) {
    addLog(`✘ ダウンロードエラー: ${err}`, "error");
    updateProgress(0, "エラーが発生しました");
    updateStatusDot("error");
  } finally {
    setProcessingState(executeDownloadBtn, false, "完了");
  }
}

// ── ソースバッジ生成 ──
function makeSourceBadge(source) {
  switch (source) {
    case "modrinth":
      return `<span class="status-badge" style="background: rgba(30, 200, 120, 0.12); color: #1ec878;">Modrinth</span>`;
    case "curseforge":
      return `<span class="status-badge" style="background: rgba(240, 100, 40, 0.12); color: #f06428;">CurseForge</span>`;
    case "manual":
      return `<span class="status-badge" style="background: rgba(255, 165, 0, 0.12); color: orange;">手動DL</span>`;
    default:
      return `<span class="status-badge" style="background: rgba(128, 128, 128, 0.12); color: var(--text-muted);">不明</span>`;
  }
}

// ── UI状態管理 ──
function setProcessingState(btn, processing, text) {
  isProcessing = processing;
  btn.disabled = processing;
  if (processing) {
    btn.classList.add("running");
    updateProgress(0, "準備中...");
    updateStatusDot("running");
  } else {
    btn.classList.remove("running");
  }
  const span = btn.querySelector("span");
  if (span) span.textContent = text;
  else btn.textContent = text;
}

function updateProgress(ratio, label) {
  const pct = Math.round(ratio * 100);
  progressBar.style.width = `${pct}%`;
  progressPercent.textContent = `${pct}%`;
  if (label) progressLabel.textContent = label;
}

function updateStatusDot(stage) {
  const dot = statusIndicator.querySelector(".status-dot");
  const text = statusIndicator.querySelector("span");
  dot.className = "status-dot";
  switch (stage) {
    case "scanning": case "hashing": case "querying": case "building": case "running":
      dot.classList.add("running"); text.textContent = "処理中"; break;
    case "done":
      dot.classList.add("done"); text.textContent = "完了"; break;
    case "error":
      dot.classList.add("error"); text.textContent = "エラー"; break;
    default:
      dot.classList.add("idle"); text.textContent = "待機中";
  }
}

// ── ログ関連 ──
function getActiveLogConsole() {
  if (currentMode === "generate") return logConsoleGenerate;
  return logConsoleSync; // sync, settings どちらもsync側に出す
}

function addLog(message, level = "info") {
  const console = getActiveLogConsole();
  if (!console) return;
  const entry = document.createElement("div");
  entry.className = `log-entry ${level}`;
  const now = new Date();
  const timeStr = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map(n => n.toString().padStart(2, "0")).join(":");
  entry.innerHTML = `<span class="log-time">${timeStr}</span><span class="log-msg">${escapeHtml(message)}</span>`;
  console.appendChild(entry);
  console.scrollTop = console.scrollHeight;
}

function clearLog(target) {
  const console = target === "generate" ? logConsoleGenerate : logConsoleSync;
  if (!console) return;
  console.innerHTML = "";
  const entry = document.createElement("div");
  entry.className = "log-entry info";
  const msg = window.i18n ? window.i18n.t("log.cleared") : "ログをクリアしました。";
  entry.innerHTML = `<span class="log-time">--:--:--</span><span class="log-msg">${msg}</span>`;
  console.appendChild(entry);
}

function stageToLogLevel(stage) {
  switch (stage) {
    case "done": return "success";
    case "warning": return "warning";
    case "error": return "error";
    default: return "progress";
  }
}

// ── 結果テーブル描画 ──
function renderResults(manifest) {
  if (!manifest || manifest.length === 0) {
    resultsSection.style.display = "none";
    modCountBadge.textContent = "0 Files";
    return;
  }

  resultsSection.style.display = "block";
  resultsTbody.innerHTML = "";

  const modrinthCount = manifest.filter(m => m.source === "modrinth").length;
  const cfCount = manifest.filter(m => m.source === "curseforge").length;
  const manualCount = manifest.filter(m => m.source === "manual").length;
  const unknownCount = manifest.filter(m => m.source === "unknown").length;
  modCountBadge.textContent = `${manifest.length} Files`;

  resultsStats.innerHTML = `
    <div class="stat-item">
      <span class="stat-dot" style="background: #1ec878;"></span>
      <span class="stat-label">Modrinth:</span>
      <span class="stat-value">${modrinthCount}</span>
    </div>
    <div class="stat-item">
      <span class="stat-dot" style="background: #f06428;"></span>
      <span class="stat-label">CurseForge:</span>
      <span class="stat-value">${cfCount}</span>
    </div>
    <div class="stat-item">
      <span class="stat-dot" style="background: orange;"></span>
      <span class="stat-label">手動DL:</span>
      <span class="stat-value">${manualCount}</span>
    </div>
    <div class="stat-item">
      <span class="stat-dot unmatched"></span>
      <span class="stat-label">不明:</span>
      <span class="stat-value">${unknownCount}</span>
    </div>
  `;

  for (const mod of manifest) {
    const tr = document.createElement("tr");
    const sourceBadge = makeSourceBadge(mod.source);

    const urlCell = mod.download_url
      ? `<a class="url-link" href="${escapeHtml(mod.download_url)}" target="_blank">CDN Link</a>`
      : mod.page_url
        ? `<a class="url-link" href="${escapeHtml(mod.page_url)}" target="_blank">手動DL</a>`
        : `<span style="color: var(--text-muted);">—</span>`;

    tr.innerHTML = `
      <td><span class="dir-badge">${escapeHtml(mod.target_dir)}/</span></td>
      <td>${sourceBadge}</td>
      <td class="file-name-cell">${escapeHtml(mod.file_name)}</td>
      <td>${mod.project_name ? escapeHtml(mod.project_name) : '<span style="color: var(--text-muted);">—</span>'}</td>
      <td>${urlCell}</td>
    `;
    resultsTbody.appendChild(tr);
  }

  // ── R2 アップロード提案 ──
  const r2Prompt = document.getElementById("r2-upload-prompt");
  const r2Desc = document.getElementById("r2-upload-desc");
  const r2Actions = document.getElementById("r2-upload-actions");
  
  if (unknownCount > 0 && r2Prompt) {
    r2Prompt.style.display = "block";
    r2Desc.textContent = window.i18n ? window.i18n.t("r2_upload.desc", [unknownCount]) : `${unknownCount} 個のMODが不明です...`;
    
    r2Actions.innerHTML = "";
    const uploadBtn = document.createElement("button");
    uploadBtn.className = "btn-primary";
    uploadBtn.textContent = window.i18n ? window.i18n.t("r2_upload.btn", [unknownCount]) : `R2にアップロード (${unknownCount})`;
    uploadBtn.addEventListener("click", handleR2UploadUnknowns);
    r2Actions.appendChild(uploadBtn);
  } else if (r2Prompt) {
    r2Prompt.style.display = "none";
  }
}

async function handleR2UploadUnknowns() {
  const gamePath = gamePathInput.value.trim();
  if (!gamePath) return;

  const r2Config = await invoke("load_r2_config");
  if (!r2Config) {
    alert(window.i18n ? window.i18n.t("r2_upload.no_config_desc") : "R2の設定が必要です");
    switchMode("settings");
    return;
  }

  const unknowns = lastManifest.filter(m => m.source === "unknown");
  if (unknowns.length === 0) return;

  const btn = document.querySelector("#r2-upload-actions button");
  if (btn) btn.disabled = true;

  try {
    let successCount = 0;
    for (let i = 0; i < unknowns.length; i++) {
      const mod = unknowns[i];
      if (btn) btn.textContent = window.i18n ? window.i18n.t("r2_upload.uploading", [i + 1, unknowns.length]) : `アップロード中... (${i+1}/${unknowns.length})`;
      
      const filePath = `${gamePath}\\${mod.target_dir}\\${mod.file_name}`;
      try {
        const publicUrl = await invoke("upload_to_r2", { filePath });
        mod.download_url = publicUrl;
        mod.source = "unknown"; // r2にしてもいいが、一応unknownのままURLを付与
        successCount++;
      } catch (e) {
        addLog(`✘ ${mod.file_name}: ${e}`, "error");
      }
    }
    
    // マニフェスト再保存
    const autoSavePath = `${gamePath}\\modlinker-manifest.json`;
    await invoke("save_manifest_to_file", { path: autoSavePath, content: JSON.stringify(lastManifest, null, 2) });
    
    addLog(window.i18n ? window.i18n.t("r2_upload.done", [successCount]) : `✔ ${successCount} 個のMODをR2にアップロードしました。`, "success");
    
    // 再描画
    renderResults(lastManifest);
  } catch (err) {
    addLog(window.i18n ? window.i18n.t("r2_upload.error", [err]) : `✘ エラー: ${err}`, "error");
  } finally {
    if (btn) btn.disabled = false;
  }
}

// ── マニフェスト保存・エクスポート ──
async function handleSaveManifest() {
  if (!lastManifest || lastManifest.length === 0) {
    addLog("⚠ 保存するマニフェストがありません。", "warning");
    return;
  }
  try {
    const filePath = await window.__TAURI__.dialog.save({
      filters: [{ name: 'JSON', extensions: ['json'] }],
      defaultPath: "modlinker-manifest.json",
      title: "マニフェストを保存"
    });
    if (filePath) {
      const json = JSON.stringify(lastManifest, null, 2);
      await invoke("save_manifest_to_file", { path: filePath, content: json });
      addLog(`✔ マニフェストを保存しました: ${filePath}`, "success");
    }
  } catch (err) {
    addLog(`✘ 保存エラー: ${err}`, "error");
  }
}

function handleExportManifest() {
  if (!lastManifest || lastManifest.length === 0) {
    addLog("⚠ エクスポートするマニフェストがありません。", "warning");
    return;
  }
  const json = JSON.stringify(lastManifest, null, 2);
  navigator.clipboard.writeText(json)
    .then(() => addLog("✔ マニフェストJSONをクリップボードにコピーしました。", "success"))
    .catch(() => addLog("⚠ クリップボードへのコピーに失敗しました。", "warning"));
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}



window.addEventListener("DOMContentLoaded", () => {
  // --- Modal Logic ---
  const r2GuideModal = document.getElementById("r2-guide-modal");
  const openR2GuideBtn = document.getElementById("open-r2-guide-btn");
  const closeR2GuideBtn = document.getElementById("close-r2-guide-btn");
  const r2GuidePrevBtn = document.getElementById("r2-guide-prev-btn");
  const r2GuideNextBtn = document.getElementById("r2-guide-next-btn");
  const stepNavItems = document.querySelectorAll(".step-nav-item");
  const stepPanes = document.querySelectorAll(".step-pane");
  let currentStep = 1;
  const maxStep = 4;

  if (openR2GuideBtn && r2GuideModal) {
    openR2GuideBtn.addEventListener("click", () => {
      r2GuideModal.classList.add("show");
      setStep(1);
    });

    closeR2GuideBtn.addEventListener("click", () => {
      r2GuideModal.classList.remove("show");
    });

    r2GuideModal.addEventListener("click", (e) => {
      if (e.target === r2GuideModal) {
        r2GuideModal.classList.remove("show");
      }
    });

    r2GuideNextBtn.addEventListener("click", () => {
      if (currentStep < maxStep) {
        setStep(currentStep + 1);
      } else {
        r2GuideModal.classList.remove("show");
      }
    });

    r2GuidePrevBtn.addEventListener("click", () => {
      if (currentStep > 1) {
        setStep(currentStep - 1);
      }
    });

    stepNavItems.forEach(item => {
      item.addEventListener("click", () => {
        setStep(parseInt(item.dataset.step));
      });
    });

    function setStep(step) {
      currentStep = step;
      stepNavItems.forEach(item => {
        if(parseInt(item.dataset.step) === step) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
      stepPanes.forEach(pane => {
        if(pane.id === `r2-step-${step}`) {
          pane.classList.add("active");
        } else {
          pane.classList.remove("active");
        }
      });
      r2GuidePrevBtn.style.visibility = step === 1 ? "hidden" : "visible";
      
      if (step === maxStep) {
        r2GuideNextBtn.innerHTML = '<span data-i18n="common.close">閉じる</span>';
      } else {
        r2GuideNextBtn.innerHTML = '<span data-i18n="common.next">次へ</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>';
      }
      
      if (window.i18n && window.i18n.applyLocale) {
        window.i18n.applyLocale();
      }
    }
  }

  // --- About Modal Logic ---
  const aboutModal = document.getElementById("about-modal");
  const openAboutBtn = document.getElementById("nav-about-btn");
  const closeAboutBtn = document.getElementById("close-about-btn");
  const aboutPrevBtn = document.getElementById("about-prev-btn");
  const aboutNextBtn = document.getElementById("about-next-btn");
  const aboutStepItems = document.querySelectorAll(".about-step-item");
  const aboutPanes = document.querySelectorAll(".about-pane");
  let aboutStep = 1;
  const maxAboutStep = 3;

  if (openAboutBtn && aboutModal) {
    openAboutBtn.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach(btn => btn.classList.remove("active"));
      openAboutBtn.classList.add("active");
      aboutModal.classList.add("show");
      setAboutStep(1);
    });

    closeAboutBtn.addEventListener("click", () => {
      aboutModal.classList.remove("show");
      openAboutBtn.classList.remove("active");
    });

    aboutModal.addEventListener("click", (e) => {
      if (e.target === aboutModal) {
        aboutModal.classList.remove("show");
        openAboutBtn.classList.remove("active");
      }
    });

    if (aboutNextBtn) {
      aboutNextBtn.addEventListener("click", () => {
        if (aboutStep < maxAboutStep) {
          setAboutStep(aboutStep + 1);
        } else {
          aboutModal.classList.remove("show");
          openAboutBtn.classList.remove("active");
        }
      });
    }

    if (aboutPrevBtn) {
      aboutPrevBtn.addEventListener("click", () => {
        if (aboutStep > 1) {
          setAboutStep(aboutStep - 1);
        }
      });
    }

    aboutStepItems.forEach(item => {
      item.addEventListener("click", () => {
        setAboutStep(parseInt(item.dataset.step));
      });
    });

    function setAboutStep(step) {
      aboutStep = step;
      aboutStepItems.forEach(item => {
        if(parseInt(item.dataset.step) === step) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
      aboutPanes.forEach(pane => {
        if(pane.id === `about-step-${step}`) {
          pane.classList.add("active");
        } else {
          pane.classList.remove("active");
        }
      });
      if (aboutPrevBtn) {
        aboutPrevBtn.style.visibility = step === 1 ? "hidden" : "visible";
      }
      
      if (aboutNextBtn) {
        if (step === maxAboutStep) {
          aboutNextBtn.innerHTML = '<span data-i18n="common.close">閉じる</span>';
        } else {
          aboutNextBtn.innerHTML = '<span data-i18n="common.next">次へ</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>';
        }
      }
      
      if (window.i18n && window.i18n.applyLocale) {
        window.i18n.applyLocale();
      }
    }
  }
});
