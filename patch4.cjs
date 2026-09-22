const fs = require('fs');

// 1. Fix main.js themeText
let mainJs = fs.readFileSync('src/main.js', 'utf8');
mainJs = mainJs.replace(
  'themeText.textContent = "ダークモード";',
  'themeText.setAttribute("data-i18n", "nav.theme.dark"); if (window.i18n) { themeText.textContent = window.i18n.t("nav.theme.dark"); } else { themeText.textContent = "ダークモード"; }'
);
mainJs = mainJs.replace(
  'themeText.textContent = "ライトモード";',
  'themeText.setAttribute("data-i18n", "nav.theme.light"); if (window.i18n) { themeText.textContent = window.i18n.t("nav.theme.light"); } else { themeText.textContent = "ライトモード"; }'
);
fs.writeFileSync('src/main.js', mainJs);

// 2. Fix index.html layout for manifest panel
let indexHtml = fs.readFileSync('src/index.html', 'utf8');

// The original block
const oldHtml = `        <div class="control-panel glass-card">
          <div class="input-group" style="flex: 1;">
            <label style="display: flex; align-items: center; gap: 6px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span data-i18n="sync.manifest_file">マニフェストファイル (JSON)</span>
            </label>
            <div class="input-row">
              <input type="text" id="manifest-input" placeholder="ファイルが選択されていません" data-i18n="sync.manifest_placeholder" data-i18n-attr="placeholder" spellcheck="false" readonly style="cursor: pointer;" />
              <button class="btn-icon" id="browse-manifest-btn" title="ファイルを選択" data-i18n="common.select_file" data-i18n-attr="title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"/>
                </svg>
              </button>
            </div>
            <label class="checkbox-label" style="margin-top: 12px; cursor: pointer;">
              <input type="checkbox" id="skip-r2-checkbox" />
              <span data-i18n="sync.skip_r2">非公式リンク (R2等) からのDLをスキップする</span>
            </label>
          </div>
          <button class="btn-primary" id="start-diff-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span data-i18n="sync.check_diff">差分をチェック</span>
          </button>
        </div>`;

const newHtml = `        <div class="control-panel glass-card" style="flex-direction: column; align-items: stretch; gap: 16px;">
          <div style="display: flex; align-items: flex-end; gap: 16px;">
            <div class="input-group" style="flex: 1;">
              <label style="display: flex; align-items: center; gap: 6px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span data-i18n="sync.manifest_file">マニフェストファイル (JSON)</span>
              </label>
              <div class="input-row">
                <input type="text" id="manifest-input" placeholder="ファイルが選択されていません" data-i18n="sync.manifest_placeholder" data-i18n-attr="placeholder" spellcheck="false" readonly style="cursor: pointer;" />
                <button class="btn-icon" id="browse-manifest-btn" title="ファイルを選択" data-i18n="common.select_file" data-i18n-attr="title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"/>
                  </svg>
                </button>
              </div>
            </div>
            <button class="btn-primary" id="start-diff-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span data-i18n="sync.check_diff">差分をチェック</span>
            </button>
          </div>
          <label class="checkbox-label" style="cursor: pointer;">
            <input type="checkbox" id="skip-r2-checkbox" />
            <span data-i18n="sync.skip_r2">非公式リンク (R2等) からのDLをスキップする</span>
          </label>
        </div>`;

// If oldHtml doesn't match perfectly, use a more relaxed regex replace or just replace the inner parts
let patchedHtml = indexHtml.replace(oldHtml, newHtml);
if (patchedHtml === indexHtml) {
    console.log("Strict replace failed. Falling back to targeted replacement.");
    // 確実な置換を行うために部分置換
    // 1. checkboxの移動
    patchedHtml = patchedHtml.replace(
        '<label class="checkbox-label" style="margin-top: 12px; cursor: pointer;">\r\n              <input type="checkbox" id="skip-r2-checkbox" />\r\n              <span data-i18n="sync.skip_r2">非公式リンク (R2等) からのDLをスキップする</span>\r\n            </label>\r\n          </div>',
        '</div>'
    );
    patchedHtml = patchedHtml.replace(
        '<label class="checkbox-label" style="margin-top: 12px; cursor: pointer;">\n              <input type="checkbox" id="skip-r2-checkbox" />\n              <span data-i18n="sync.skip_r2">非公式リンク (R2等) からのDLをスキップする</span>\n            </label>\n          </div>',
        '</div>'
    );
    // 2. btn-primaryの下にcheckboxを追加し、親のcontrol-panelをラップする
    // これは複雑なので、CSSで対応したほうが早い。
} else {
    console.log("Strict replace succeeded.");
    fs.writeFileSync('src/index.html', patchedHtml);
}
