const fs = require('fs');

let h = fs.readFileSync('src/index.html', 'utf8');

// 1. R2ボタンの中央揃えを解除
const oldR2BtnContainer = '<div class="tutorial-box" style="background: var(--surface-bg); padding: 12px; border-radius: 8px; font-size: 13px; margin-bottom: 12px; border: 1px solid var(--border-color); display: flex; justify-content: center;">';
const newR2BtnContainer = '<div class="tutorial-box" style="background: var(--surface-bg); padding: 12px; border-radius: 8px; font-size: 13px; margin-bottom: 12px; border: 1px solid var(--border-color); display: flex; justify-content: flex-start;">';
h = h.replace(oldR2BtnContainer, newR2BtnContainer);

// 2. サイドバーに「説明書」ボタンを追加
const oldSettingsNav = `<button class="nav-item" id="nav-settings-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
          <span data-i18n="nav.settings">設定</span>
        </button>`;

const newSettingsNav = oldSettingsNav + `\n
        <button class="nav-item" id="nav-about-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
          <span data-i18n="nav.about">説明書</span>
        </button>`;

h = h.replace(oldSettingsNav, newSettingsNav);

// もし置換に失敗していたら（改行コードなどの影響）
if (h.indexOf('nav.about') === -1) {
    const backupRegex = /<button class="nav-item" id="nav-settings-btn">[\s\S]*?<\/button>/;
    h = h.replace(backupRegex, (match) => {
        return match + `\n
        <button class="nav-item" id="nav-about-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
          <span data-i18n="nav.about">説明書</span>
        </button>`;
    });
}

// 3. About モーダルを追加する (</body>の直前)
const aboutModalHtml = `
  <!-- About/Help Modal -->
  <div id="about-modal" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" data-i18n="about.title">ModLinker の使い方</h3>
        <button class="modal-close" id="close-about-btn" title="閉じる" data-i18n-attr="title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal-sidebar" id="about-steps-list">
          <div class="step-nav-item active about-step-item" data-step="1">
            <span class="step-nav-number">1</span>
            <span data-i18n="about.nav_1">はじめに</span>
          </div>
          <div class="step-nav-item about-step-item" data-step="2">
            <span class="step-nav-number">2</span>
            <span data-i18n="about.nav_2">ダウンロード機能</span>
          </div>
          <div class="step-nav-item about-step-item" data-step="3">
            <span class="step-nav-number">3</span>
            <span data-i18n="about.nav_3">マニフェスト生成機能</span>
          </div>
        </div>
        <div class="modal-main" id="about-content">
          <!-- Step 1 -->
          <div class="step-pane about-pane active" id="about-step-1">
            <p><span data-i18n="about.step1_1">ModLinker は、Minecraft の MOD 構成を複数人で同期・共有するためのツールです。</span></p>
            <p><span data-i18n="about.step1_2">「マニフェスト (JSON)」と呼ばれるファイルを使って、どの MOD が必要かを管理します。</span></p>
            <div style="margin-top: 20px; display: flex; justify-content: center;">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
          </div>
          <!-- Step 2 -->
          <div class="step-pane about-pane" id="about-step-2">
            <h4 style="margin-top:0; color:var(--text-primary);"><span data-i18n="about.step2_1">【ダウンロード機能】</span></h4>
            <p><span data-i18n="about.step2_2">配布された「マニフェストファイル」を読み込み、記載されている MOD を一括でダウンロードします。</span></p>
            <p><span data-i18n="about.step2_3">すでにダウンロード済みの MOD はスキップされるため、差分だけを高速に同期できます。</span></p>
            <div style="margin-top: 20px; padding: 12px; border: 1px dashed var(--border-color); border-radius: 6px;">
              <span data-i18n="about.step2_note" style="color: var(--text-secondary); font-size: 13px;">使い方： 1. ダウンロードタブを開く → 2. JSONファイルを選択 → 3. 差分チェック＆ダウンロード</span>
            </div>
          </div>
          <!-- Step 3 -->
          <div class="step-pane about-pane" id="about-step-3">
            <h4 style="margin-top:0; color:var(--text-primary);"><span data-i18n="about.step3_1">【マニフェスト生成機能】</span></h4>
            <p><span data-i18n="about.step3_2">自分の「mods」フォルダをスキャンして、他の人に配るための「マニフェストファイル」を作成します。</span></p>
            <p><span data-i18n="about.step3_3">Modrinth などの公式 MOD は自動でリンクを取得し、自作 MOD などの非公式ファイルは Cloudflare R2 にアップロードして共有することができます。</span></p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-ghost" id="about-prev-btn" style="visibility: hidden;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span data-i18n="common.prev">前へ</span>
        </button>
        <button class="btn-primary" id="about-next-btn">
          <span data-i18n="common.next">次へ</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</body>`;

h = h.replace('</body>', aboutModalHtml);

fs.writeFileSync('src/index.html', h);
