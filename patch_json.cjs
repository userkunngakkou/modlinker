const fs = require('fs');
const path = require('path');

const jaExtras = {
  "common.save": "保存",
  "common.clear": "クリア",
  "common.select_file": "ファイルを選択",
  "settings.cf_key_link_prefix": "キーは ",
  "settings.cf_key_link_suffix": " で取得できます。",
  "settings.r2.step1": "1. Cloudflare ダッシュボードにログインし、「R2」を開きます。",
  "settings.r2.step2": "2. <b>「バケットの作成」</b> から好きな名前 (例: <code>my-mod-repo</code>) で作成します。これが <b>Bucket Name</b> になります。",
  "settings.r2.step3": "3. 作成したバケットの設定から <b>R2.dev サブドメイン</b> を「許可」にします。",
  "settings.r2.step3_warn": "※ 注意: これを許可すると、URLを知っている全員がMODをダウンロード可能になります。プライベートなファイルは置かないでください。",
  "settings.r2.step3_url": "表示されたパブリックURL (<code>https://pub-xxxx.r2.dev</code> 等) が <b>Public URL</b> になります。",
  "settings.r2.step4": "4. (重要) 設定画面の <b>CORS ポリシー</b> で「CORS ポリシーの追加」から以下を設定してください。これがないと他の人がダウンロードできません。",
  "settings.r2.step4_origin": "・許可されるオリジン: <code>*</code> または <code>tauri://localhost</code>",
  "settings.r2.step4_method": "・許可されるメソッド: <code>GET</code>",
  "settings.r2.step5": "5. R2トップページ右上の <b>R2 API トークンの管理</b> から「API トークンの作成」をします。",
  "settings.r2.step6": "6. 「オブジェクト 読み取りと書き込み」権限で作成します。<br>表示された <b>アクセスキー ID</b> を <b>アクセスキー</b> の欄にコピーしてください。",
  "settings.r2.step7": "7. 同様に <b>シークレットアクセスキー</b> をコピーして一番上の欄に貼り付けます。",
  "settings.r2.account_id": "アカウント ID (Account ID)",
  "settings.r2.bucket": "Bucket Name",
  "settings.r2.access_key": "アクセスキー (Access Key ID)",
  "settings.r2.secret_key": "シークレットキー (Secret Access Key)",
  "settings.r2.public_url": "Public URL (R2.dev URL)",
  "settings.r2.account_id_placeholder": "Cloudflareダッシュボード右下の アカウント ID を入力",
  "settings.r2.bucket_placeholder": "例: my-mod-repo",
  "settings.r2.access_key_placeholder": "例: a1b2c3d4e5f6g7h8...",
  "settings.r2.secret_key_placeholder": "例: z9y8x7w6v5u4t3s2...",
  "settings.r2.public_url_placeholder": "Public URL (例: https://pub-xxxx.r2.dev)",
  "sync.diff_preview": "ダウンロード対象プレビュー",
  "results.col.action": "アクション",
  "results.col.status": "ステータス",
  "console.initial_sync": "マニフェストファイルを読み込み、「チェック」を押してください。",
  "console.initial_scan": "ゲームディレクトリを指定してスキャンを開始してください。",
  "generate.auto_save_prefix": "結果は ",
  "generate.auto_save_suffix": " に自動保存されます。"
};

const enExtras = {
  "common.save": "Save",
  "common.clear": "Clear",
  "common.select_file": "Select File",
  "settings.cf_key_link_prefix": "You can get a key at ",
  "settings.cf_key_link_suffix": ".",
  "settings.r2.step1": "1. Log into Cloudflare Dashboard and open 'R2'.",
  "settings.r2.step2": "2. Click <b>'Create bucket'</b> and choose a name (e.g. <code>my-mod-repo</code>). This is your <b>Bucket Name</b>.",
  "settings.r2.step3": "3. In bucket settings, allow the <b>R2.dev subdomain</b>.",
  "settings.r2.step3_warn": "※ Warning: Allowing this makes MODs publicly downloadable. Do not store private files.",
  "settings.r2.step3_url": "The displayed public URL (e.g. <code>https://pub-xxxx.r2.dev</code>) is your <b>Public URL</b>.",
  "settings.r2.step4": "4. (Required) Under <b>CORS Policy</b>, add the following rules. Without this, others cannot download.",
  "settings.r2.step4_origin": "- Allowed Origins: <code>*</code> or <code>tauri://localhost</code>",
  "settings.r2.step4_method": "- Allowed Methods: <code>GET</code>",
  "settings.r2.step5": "5. Go to <b>Manage R2 API Tokens</b> at the top right of the R2 page and click 'Create API token'.",
  "settings.r2.step6": "6. Create with 'Object Read & Write' permission.<br>Copy the <b>Access Key ID</b> to the Access Key field.",
  "settings.r2.step7": "7. Similarly, copy the <b>Secret Access Key</b> to its corresponding field.",
  "settings.r2.account_id": "Account ID",
  "settings.r2.bucket": "Bucket Name",
  "settings.r2.access_key": "Access Key ID",
  "settings.r2.secret_key": "Secret Access Key",
  "settings.r2.public_url": "Public URL (R2.dev URL)",
  "settings.r2.account_id_placeholder": "Enter Account ID from Cloudflare dashboard",
  "settings.r2.bucket_placeholder": "e.g. my-mod-repo",
  "settings.r2.access_key_placeholder": "e.g. a1b2c3d4e5f6g7h8...",
  "settings.r2.secret_key_placeholder": "e.g. z9y8x7w6v5u4t3s2...",
  "settings.r2.public_url_placeholder": "Public URL (e.g. https://pub-xxxx.r2.dev)",
  "sync.diff_preview": "Download Target Preview",
  "results.col.action": "Action",
  "results.col.status": "Status",
  "console.initial_sync": "Load a manifest file and click 'Check'.",
  "console.initial_scan": "Specify a game directory and start scanning.",
  "generate.auto_save_prefix": "Results will be auto-saved to ",
  "generate.auto_save_suffix": "."
};

const i18nDir = path.join(__dirname, 'src', 'i18n');

// 1. ja.json の更新
const jaPath = path.join(i18nDir, 'ja.json');
let ja = JSON.parse(fs.readFileSync(jaPath, 'utf8'));
ja = { ...ja, ...jaExtras };
// 置換忘れのAPI設定を「設定」に変更（先ほど一部のみやっていたかもしれないので念押し）
Object.keys(ja).forEach(k => {
  if (typeof ja[k] === 'string') {
    ja[k] = ja[k].replace(/API設定/g, '設定');
  }
});
fs.writeFileSync(jaPath, JSON.stringify(ja, null, 2));

// 2. en.json の更新
const enPath = path.join(i18nDir, 'en.json');
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
en = { ...en, ...enExtras };
Object.keys(en).forEach(k => {
  if (typeof en[k] === 'string') {
    en[k] = en[k].replace(/API設定/g, '設定'); // 念のため
  }
});
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

// 3. その他の言語ファイルの更新 (en.json にあるキーがなければ en の値で埋める)
const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.json') && f !== 'ja.json' && f !== 'en.json');
for (const file of files) {
  const p = path.join(i18nDir, file);
  let dict = JSON.parse(fs.readFileSync(p, 'utf8'));
  
  // en のキーをループして存在しなければ埋める
  for (const [k, v] of Object.entries(en)) {
    if (!dict[k]) {
      dict[k] = v;
    }
  }
  
  // 置換
  Object.keys(dict).forEach(k => {
    if (typeof dict[k] === 'string') {
      dict[k] = dict[k].replace(/API設定/g, '設定');
    }
  });

  fs.writeFileSync(p, JSON.stringify(dict, null, 2));
}

console.log('All JSON files updated with missing keys (fallback to EN).');
