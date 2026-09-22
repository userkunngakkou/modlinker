const fs = require('fs');

let html = fs.readFileSync('src/index.html', 'utf8');

const oldSyncPanel = `<div class="control-panel glass-card" style="flex-direction: column; align-items: stretch; gap: 16px;">
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
            <button class="btn-primary" id="start-diff-btn">`;

const newSyncPanel = `<div class="control-panel glass-card" style="display: block;">
          <div style="display: flex; align-items: flex-end; gap: 16px; margin-bottom: 12px;">
            <div class="input-group" style="flex: 1; min-width: 0;">
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
                <button class="btn-icon" id="browse-manifest-btn" title="ファイルを選択" data-i18n="common.select_file" data-i18n-attr="title" style="flex-shrink: 0;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"/>
                  </svg>
                </button>
              </div>
            </div>
            <button class="btn-primary" id="start-diff-btn" style="flex-shrink: 0; white-space: nowrap;">`;

html = html.replace(oldSyncPanel, newSyncPanel);

fs.writeFileSync('src/index.html', html);
console.log('Layout patched');
