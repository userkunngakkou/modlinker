const fs = require('fs');

const zhCN_extras = {
  "common.save": "保存",
  "common.clear": "清除",
  "common.select_file": "选择文件",
  "settings.cf_key_link_prefix": "密钥在 ",
  "settings.cf_key_link_suffix": " 获取。",
  "settings.r2.step1": "1. 登录 Cloudflare Dashboard 并打开“R2”。",
  "settings.r2.step2": "2. 点击 <b>“创建存储桶”</b> 并设置一个名称（例: <code>my-mod-repo</code>）。这将作为您的 <b>Bucket Name</b>。",
  "settings.r2.step3": "3. 在存储桶设置中，允许 <b>R2.dev 子域</b>。",
  "settings.r2.step3_warn": "※ 注意: 允许后，任何人都可以通过URL下载MOD。请勿存放私密文件。",
  "settings.r2.step3_url": "显示的公共URL（如 <code>https://pub-xxxx.r2.dev</code>）即为 <b>Public URL</b>。",
  "settings.r2.step4": "4. (必填) 在 <b>CORS 策略</b> 中，添加以下规则。否则其他人无法下载。",
  "settings.r2.step4_origin": "- 允许的源（Allowed Origins）: <code>*</code> 或 <code>tauri://localhost</code>",
  "settings.r2.step4_method": "- 允许的方法（Allowed Methods）: <code>GET</code>",
  "settings.r2.step5": "5. 在R2页面右上角的 <b>管理 R2 API 令牌</b> 中点击“创建 API 令牌”。",
  "settings.r2.step6": "6. 选择“对象读和写”权限来创建。<br>将生成的 <b>Access Key ID</b> 复制到“访问密钥”栏中。",
  "settings.r2.step7": "7. 同样，将 <b>Secret Access Key</b> 复制到相应的输入框中。",
  "settings.r2.account_id": "账户 ID",
  "settings.r2.bucket": "Bucket Name",
  "settings.r2.access_key": "访问密钥 (Access Key ID)",
  "settings.r2.secret_key": "秘密密钥 (Secret Access Key)",
  "settings.r2.public_url": "Public URL (R2.dev URL)",
  "settings.r2.account_id_placeholder": "从Cloudflare仪表板复制账户ID",
  "settings.r2.bucket_placeholder": "例: my-mod-repo",
  "settings.r2.access_key_placeholder": "例: a1b2c3d4e5f6g7h8...",
  "settings.r2.secret_key_placeholder": "例: z9y8x7w6v5u4t3s2...",
  "settings.r2.public_url_placeholder": "Public URL (例: https://pub-xxxx.r2.dev)",
  "sync.diff_preview": "下载对象预览",
  "results.col.action": "操作",
  "results.col.status": "状态",
  "console.initial_sync": "读取清单文件后点击“检查差异”。",
  "console.initial_scan": "请指定游戏目录并开始操作。",
  "generate.auto_save_prefix": "结果将自动保存至 ",
  "generate.auto_save_suffix": "。"
};

const zhTW_extras = {
  "common.save": "儲存",
  "common.clear": "清除",
  "common.select_file": "選擇檔案",
  "settings.cf_key_link_prefix": "金鑰在 ",
  "settings.cf_key_link_suffix": " 獲取。",
  "settings.r2.step1": "1. 登入 Cloudflare Dashboard 並打開「R2」。",
  "settings.r2.step2": "2. 點擊 <b>「建立儲存貯體」</b> 並設定一個名稱（例: <code>my-mod-repo</code>）。這將作為您的 <b>Bucket Name</b>。",
  "settings.r2.step3": "3. 在儲存貯體設定中，允許 <b>R2.dev 子網域</b>。",
  "settings.r2.step3_warn": "※ 注意: 允許後，任何人都可以透過URL下載MOD。請勿存放私密檔案。",
  "settings.r2.step3_url": "顯示的公共URL（如 <code>https://pub-xxxx.r2.dev</code>）即為 <b>Public URL</b>。",
  "settings.r2.step4": "4. (必填) 在 <b>CORS 政策</b> 中，新增以下規則。否則其他人無法下載。",
  "settings.r2.step4_origin": "- 允許的來源（Allowed Origins）: <code>*</code> 或 <code>tauri://localhost</code>",
  "settings.r2.step4_method": "- 允許的方法（Allowed Methods）: <code>GET</code>",
  "settings.r2.step5": "5. 在R2頁面右上角的 <b>管理 R2 API 權杖</b> 中點擊「建立 API 權杖」。",
  "settings.r2.step6": "6. 選擇「物件讀取和寫入」權限來建立。<br>將產生的 <b>Access Key ID</b> 複製到「存取金鑰」欄位中。",
  "settings.r2.step7": "7. 同樣，將 <b>Secret Access Key</b> 複製到相應的輸入框中。",
  "settings.r2.account_id": "帳戶 ID",
  "settings.r2.bucket": "Bucket Name",
  "settings.r2.access_key": "存取金鑰 (Access Key ID)",
  "settings.r2.secret_key": "秘密金鑰 (Secret Access Key)",
  "settings.r2.public_url": "Public URL (R2.dev URL)",
  "settings.r2.account_id_placeholder": "從Cloudflare儀表板複製帳戶ID",
  "settings.r2.bucket_placeholder": "例: my-mod-repo",
  "settings.r2.access_key_placeholder": "例: a1b2c3d4e5f6g7h8...",
  "settings.r2.secret_key_placeholder": "例: z9y8x7w6v5u4t3s2...",
  "settings.r2.public_url_placeholder": "Public URL (例: https://pub-xxxx.r2.dev)",
  "sync.diff_preview": "下載對象預覽",
  "results.col.action": "操作",
  "results.col.status": "狀態",
  "console.initial_sync": "讀取清單檔案後點擊「檢查差異」。",
  "console.initial_scan": "請指定遊戲目錄並開始操作。",
  "generate.auto_save_prefix": "結果將自動儲存至 ",
  "generate.auto_save_suffix": "。"
};

function applyExtras(file, extras) {
  let json = JSON.parse(fs.readFileSync(file, 'utf8'));
  json = { ...json, ...extras };
  Object.keys(json).forEach(k => {
    if (typeof json[k] === 'string') {
      json[k] = json[k].replace(/API设置/g, '设置');
      json[k] = json[k].replace(/API設定/g, '設定');
    }
  });
  fs.writeFileSync(file, JSON.stringify(json, null, 2));
}

applyExtras('src/i18n/zh-CN.json', zhCN_extras);
applyExtras('src/i18n/zh-TW.json', zhTW_extras);
