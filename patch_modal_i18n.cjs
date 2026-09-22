const fs = require('fs');
const path = require('path');

const jaExtras = {
  "settings.r2.step_nav_1": "バケット作成",
  "settings.r2.step_nav_2": "パブリックURL",
  "settings.r2.step_nav_3": "CORS設定",
  "settings.r2.step_nav_4": "APIトークン",
  "common.prev": "前へ",
  "common.next": "次へ",
  "common.close": "閉じる"
};

const enExtras = {
  "settings.r2.step_nav_1": "Create Bucket",
  "settings.r2.step_nav_2": "Public URL",
  "settings.r2.step_nav_3": "CORS Policy",
  "settings.r2.step_nav_4": "API Token",
  "common.prev": "Prev",
  "common.next": "Next",
  "common.close": "Close"
};

const zhCNExtras = {
  "settings.r2.step_nav_1": "创建存储桶",
  "settings.r2.step_nav_2": "公共 URL",
  "settings.r2.step_nav_3": "CORS 设置",
  "settings.r2.step_nav_4": "API 令牌",
  "common.prev": "上一步",
  "common.next": "下一步",
  "common.close": "关闭"
};

const zhTWExtras = {
  "settings.r2.step_nav_1": "建立儲存貯體",
  "settings.r2.step_nav_2": "公共 URL",
  "settings.r2.step_nav_3": "CORS 設定",
  "settings.r2.step_nav_4": "API 權杖",
  "common.prev": "上一步",
  "common.next": "下一步",
  "common.close": "關閉"
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
patchDict('zh-CN', zhCNExtras);
patchDict('zh-TW', zhTWExtras);

// 他の言語にはenをフォールバック
const i18nDir = path.join(__dirname, 'src', 'i18n');
const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.json') && !['ja.json', 'en.json', 'zh-CN.json', 'zh-TW.json'].includes(f));
for (const file of files) {
  const p = path.join(i18nDir, file);
  let dict = JSON.parse(fs.readFileSync(p, 'utf8'));
  dict = { ...dict, ...enExtras };
  fs.writeFileSync(p, JSON.stringify(dict, null, 2));
}
