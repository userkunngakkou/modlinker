const fs = require('fs');

// --- 1. HTMLの置換 ---
let html = fs.readFileSync('src/index.html', 'utf8');

const oldAboutContentRegex = /<div class="modal-main" id="about-content">[\s\S]*?<\/div>\s*<\/div>\s*<div class="modal-footer">/;

const newAboutContent = `<div class="modal-main" id="about-content">
          <!-- Step 1 -->
          <div class="step-pane about-pane active" id="about-step-1">
            <h4 style="margin-top:0; margin-bottom:16px; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              <span data-i18n="about.step1_title">ModLinker へようこそ！</span>
            </h4>
            <p style="line-height: 1.6; margin-bottom: 12px;"><span data-i18n="about.step1_1">ModLinkerは、お友達やサーバーのメンバーと一緒に、MinecraftのMOD構成をかんたんに揃えるためのツールです。</span></p>
            <p style="line-height: 1.6;"><span data-i18n="about.step1_2">「マニフェストファイル (JSON)」という設計図をやり取りするだけで、みんなと同じMOD環境をすぐに作ることができます！</span></p>
          </div>
          
          <!-- Step 2 -->
          <div class="step-pane about-pane" id="about-step-2">
            <h4 style="margin-top:0; margin-bottom:16px; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span data-i18n="about.step2_title">他の人の環境を取り込む（ダウンロード）</span>
            </h4>
            <p style="line-height: 1.6; margin-bottom: 16px;"><span data-i18n="about.step2_1">配られたマニフェストファイルを使って、必要なMODを一気にダウンロードします。</span></p>
            <ul style="padding-left: 20px; line-height: 1.8; margin-bottom: 16px;">
              <li><span data-i18n="about.step2_list1">📂 <b>ファイルを選ぶだけ</b>：複雑な操作は不要です。</span></li>
              <li><span data-i18n="about.step2_list2">⚡ <b>差分だけをダウンロード</b>：すでに入っているMODはスキップするのでとても速いです。</span></li>
            </ul>
            <div style="padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; background: rgba(0,0,0,0.1);">
              <span data-i18n="about.step2_note" style="color: var(--text-secondary); font-size: 13px;">💡 <b>ヒント：</b> 「ダウンロード」タブからJSONファイルを選び、「差分をチェック」を押すだけでOKです！</span>
            </div>
          </div>
          
          <!-- Step 3 -->
          <div class="step-pane about-pane" id="about-step-3">
            <h4 style="margin-top:0; margin-bottom:16px; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              <span data-i18n="about.step3_title">自分の環境を配る（マニフェスト生成）</span>
            </h4>
            <p style="line-height: 1.6; margin-bottom: 16px;"><span data-i18n="about.step3_1">今のあなたの「mods」フォルダの中身をリストアップし、みんなに配るための設計図を作ります。</span></p>
            <ul style="padding-left: 20px; line-height: 1.8; margin-bottom: 16px;">
              <li><span data-i18n="about.step3_list1">🌐 <b>公式MODは自動リンク</b>：Modrinth などの配布元を自動で特定します。</span></li>
              <li><span data-i18n="about.step3_list2">☁️ <b>非公式MODはクラウドへ</b>：自作MODなどは Cloudflare R2 に自動でアップロードして共有できます。</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="modal-footer">`;

html = html.replace(oldAboutContentRegex, newAboutContent);
fs.writeFileSync('src/index.html', html);
console.log('HTML patched');

// --- 2. i18nの更新 ---
const path = require('path');

const jaExtras = {
  "about.step1_title": "ModLinker へようこそ！",
  "about.step1_1": "ModLinkerは、お友達やサーバーのメンバーと一緒に、MinecraftのMOD構成をかんたんに揃えるためのツールです。",
  "about.step1_2": "「マニフェストファイル (JSON)」という設計図をやり取りするだけで、みんなと同じMOD環境をすぐに作ることができます！",
  "about.step2_title": "他の人の環境を取り込む（ダウンロード）",
  "about.step2_1": "配られたマニフェストファイルを使って、必要なMODを一気にダウンロードします。",
  "about.step2_list1": "📂 <b>ファイルを選ぶだけ</b>：複雑な操作は不要です。",
  "about.step2_list2": "⚡ <b>差分だけをダウンロード</b>：すでに入っているMODはスキップするのでとても速いです。",
  "about.step2_note": "💡 <b>ヒント：</b> 「ダウンロード」タブからJSONファイルを選び、「差分をチェック」を押すだけでOKです！",
  "about.step3_title": "自分の環境を配る（マニフェスト生成）",
  "about.step3_1": "今のあなたの「mods」フォルダの中身をリストアップし、みんなに配るための設計図を作ります。",
  "about.step3_list1": "🌐 <b>公式MODは自動リンク</b>：Modrinth などの配布元を自動で特定します。",
  "about.step3_list2": "☁️ <b>非公式MODはクラウドへ</b>：自作MODなどは Cloudflare R2 に自動でアップロードして共有できます。"
};

const enExtras = {
  "about.step1_title": "Welcome to ModLinker!",
  "about.step1_1": "ModLinker is a tool that makes it easy to synchronize Minecraft mod configurations with your friends and server members.",
  "about.step1_2": "By sharing a blueprint called a 'Manifest file (JSON)', you can instantly replicate the exact same mod environment as everyone else!",
  "about.step2_title": "Importing an environment (Download)",
  "about.step2_1": "Use the shared manifest file to download all the necessary mods at once.",
  "about.step2_list1": "📂 <b>Just select the file</b>: No complex operations required.",
  "about.step2_list2": "⚡ <b>Download only differences</b>: It skips mods you already have, making it very fast.",
  "about.step2_note": "💡 <b>Hint:</b> Just select the JSON file from the 'Download' tab and click 'Check Diff'!",
  "about.step3_title": "Sharing your environment (Generate)",
  "about.step3_1": "Scans the contents of your current 'mods' folder to create a blueprint to share with others.",
  "about.step3_list1": "🌐 <b>Auto-linking official mods</b>: Automatically identifies sources like Modrinth.",
  "about.step3_list2": "☁️ <b>Unofficial mods to the cloud</b>: Custom mods can be automatically uploaded to Cloudflare R2 for sharing."
};

function patchDict(code, extras) {
  const p = path.join(__dirname, 'src', 'i18n', code + '.json');
  if (fs.existsSync(p)) {
    let dict = JSON.parse(fs.readFileSync(p, 'utf8'));
    dict = { ...dict, ...extras };
    fs.writeFileSync(p, JSON.stringify(dict, null, 2));
  }
}

patchDict('ja', jaExtras);
patchDict('en', enExtras);

const i18nDir = path.join(__dirname, 'src', 'i18n');
const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.json') && !['ja.json', 'en.json'].includes(f));
for (const file of files) {
  patchDict(file.replace('.json', ''), enExtras);
}
console.log('i18n patched');
