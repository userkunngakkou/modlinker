const fs = require('fs');

let h = fs.readFileSync('src/index.html', 'utf8');

// 1. 古いガイドをボタンに置換する
const oldGuideRegex = /<div class="tutorial-box"[^>]*>\s*<details class="tutorial-details"[\s\S]*?<\/details>\s*<\/div>/;
const newGuideButton = `<div class="tutorial-box" style="background: var(--surface-bg); padding: 12px; border-radius: 8px; font-size: 13px; margin-bottom: 12px; border: 1px solid var(--border-color); display: flex; justify-content: center;">
              <button class="btn-ghost" id="open-r2-guide-btn" style="color: var(--accent-color); font-weight: 600; display: flex; align-items: center; gap: 8px; border: 1px solid var(--accent-color); border-radius: 6px; padding: 6px 12px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <span data-i18n="settings.r2.guide_title">📖 R2 セットアップガイドを開く</span>
              </button>
            </div>`;

h = h.replace(oldGuideRegex, newGuideButton);

// 2. body終了タグ直前にモーダルを追加する
const modalHtml = `
  <!-- R2 Setup Guide Modal -->
  <div id="r2-guide-modal" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" data-i18n="settings.r2.title">Cloudflare R2 (非公式MODアップロード用)</h3>
        <button class="modal-close" id="close-r2-guide-btn" title="閉じる" data-i18n-attr="title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal-sidebar" id="r2-guide-steps-list">
          <div class="step-nav-item active" data-step="1">
            <span class="step-nav-number">1</span>
            <span data-i18n="settings.r2.step_nav_1">バケット作成</span>
          </div>
          <div class="step-nav-item" data-step="2">
            <span class="step-nav-number">2</span>
            <span data-i18n="settings.r2.step_nav_2">パブリックURL</span>
          </div>
          <div class="step-nav-item" data-step="3">
            <span class="step-nav-number">3</span>
            <span data-i18n="settings.r2.step_nav_3">CORS設定</span>
          </div>
          <div class="step-nav-item" data-step="4">
            <span class="step-nav-number">4</span>
            <span data-i18n="settings.r2.step_nav_4">APIトークン</span>
          </div>
        </div>
        <div class="modal-main" id="r2-guide-content">
          <!-- Step 1 -->
          <div class="step-pane active" id="r2-step-1">
            <p><span data-i18n="settings.r2.step1">1. Cloudflare ダッシュボードにログインし、「R2」を開きます。</span></p>
            <p><span data-i18n="settings.r2.step2">2. <b>「バケットの作成」</b> から好きな名前 (例: <code>my-mod-repo</code>) で作成します。これが <b>Bucket Name</b> になります。</span></p>
            <img class="step-image" src="./assets/r2_step1.jpg" alt="Create Bucket" />
          </div>
          <!-- Step 2 -->
          <div class="step-pane" id="r2-step-2">
            <p><span data-i18n="settings.r2.step3">3. 作成したバケットの設定から <b>R2.dev サブドメイン</b> を「許可」にします。</span></p>
            <p><span style="color: #ef4444; font-weight: bold;" data-i18n="settings.r2.step3_warn">※ 注意: これを許可すると、URLを知っている全員がMODをダウンロード可能になります。プライベートなファイルは置かないでください。</span></p>
            <p><span data-i18n="settings.r2.step3_url">表示されたパブリックURL (<code>https://pub-xxxx.r2.dev</code> 等) が <b>Public URL</b> になります。</span></p>
            <img class="step-image" src="./assets/r2_step2.jpg" alt="Public URL" />
          </div>
          <!-- Step 3 -->
          <div class="step-pane" id="r2-step-3">
            <p><span data-i18n="settings.r2.step4">4. (重要) 設定画面の <b>CORS ポリシー</b> で「CORS ポリシーの追加」から以下を設定してください。これがないと他の人がダウンロードできません。</span></p>
            <ul>
              <li data-i18n="settings.r2.step4_origin">・許可されるオリジン: <code>*</code> または <code>tauri://localhost</code></li>
              <li data-i18n="settings.r2.step4_method">・許可されるメソッド: <code>GET</code></li>
            </ul>
            <img class="step-image" src="./assets/r2_step3.jpg" alt="CORS Policy" />
          </div>
          <!-- Step 4 -->
          <div class="step-pane" id="r2-step-4">
            <p><span data-i18n="settings.r2.step5">5. R2トップページ右上の <b>R2 API トークンの管理</b> から「API トークンの作成」をします。</span></p>
            <p><span data-i18n="settings.r2.step6">6. 「オブジェクト 読み取りと書き込み」権限で作成します。<br>表示された <b>アクセスキー ID</b> を <b>アクセスキー</b> の欄にコピーしてください。</span></p>
            <p><span data-i18n="settings.r2.step7">7. 同様に <b>シークレットアクセスキー</b> をコピーして一番上の欄に貼り付けます。</span></p>
            <img class="step-image" src="./assets/r2_step4.jpg" alt="API Token" />
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-ghost" id="r2-guide-prev-btn" style="visibility: hidden;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span data-i18n="common.prev">前へ</span>
        </button>
        <button class="btn-primary" id="r2-guide-next-btn">
          <span data-i18n="common.next">次へ</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</body>`;

h = h.replace('</body>', modalHtml);
fs.writeFileSync('src/index.html', h);
