const fs = require('fs');
const path = require('path');

const jaExtras = {
  "header.sync_title": "MODダウンロード同期",
  "header.generate_title": "マニフェスト生成 (リスト抽出)"
};

const enExtras = {
  "header.sync_title": "MOD Download Sync",
  "header.generate_title": "Manifest Generation (List Export)"
};

const zhCNExtras = {
  "header.sync_title": "MOD 下载同步",
  "header.generate_title": "清单生成 (列表导出)"
};

const zhTWExtras = {
  "header.sync_title": "MOD 下載同步",
  "header.generate_title": "清單生成 (列表匯出)"
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

// Other languages -> English fallback
const i18nDir = path.join(__dirname, 'src', 'i18n');
const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.json') && !['ja.json', 'en.json', 'zh-CN.json', 'zh-TW.json'].includes(f));
for (const file of files) {
  const p = path.join(i18nDir, file);
  let dict = JSON.parse(fs.readFileSync(p, 'utf8'));
  dict = { ...dict, ...enExtras };
  fs.writeFileSync(p, JSON.stringify(dict, null, 2));
}
