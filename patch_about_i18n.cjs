const fs = require('fs');
const path = require('path');

const jaExtras = {
  "nav.about": "説明書",
  "about.title": "ModLinker の使い方",
  "about.nav_1": "はじめに",
  "about.nav_2": "ダウンロード機能",
  "about.nav_3": "マニフェスト生成機能",
  "about.step1_1": "ModLinker は、Minecraft の MOD 構成を複数人で同期・共有するためのツールです。",
  "about.step1_2": "「マニフェスト (JSON)」と呼ばれるファイルを使って、どの MOD が必要かを管理します。",
  "about.step2_1": "【ダウンロード機能】",
  "about.step2_2": "配布された「マニフェストファイル」を読み込み、記載されている MOD を一括でダウンロードします。",
  "about.step2_3": "すでにダウンロード済みの MOD はスキップされるため、差分だけを高速に同期できます。",
  "about.step2_note": "使い方： 1. ダウンロードタブを開く → 2. JSONファイルを選択 → 3. 差分チェック＆ダウンロード",
  "about.step3_1": "【マニフェスト生成機能】",
  "about.step3_2": "自分の「mods」フォルダをスキャンして、他の人に配るための「マニフェストファイル」を作成します。",
  "about.step3_3": "Modrinth などの公式 MOD は自動でリンクを取得し、自作 MOD などの非公式ファイルは Cloudflare R2 にアップロードして共有することができます。"
};

const enExtras = {
  "nav.about": "Help / About",
  "about.title": "How to use ModLinker",
  "about.nav_1": "Introduction",
  "about.nav_2": "Download Mode",
  "about.nav_3": "Generate Mode",
  "about.step1_1": "ModLinker is a tool to synchronize and share Minecraft MOD configurations among multiple people.",
  "about.step1_2": "It uses a file called 'Manifest (JSON)' to manage which mods are required.",
  "about.step2_1": "[Download Mode]",
  "about.step2_2": "Reads the distributed 'Manifest File' and downloads all listed mods at once.",
  "about.step2_3": "Already downloaded mods are skipped, so you can synchronize only the differences at high speed.",
  "about.step2_note": "How to use: 1. Open Download tab -> 2. Select JSON file -> 3. Check Diff & Download",
  "about.step3_1": "[Generate Mode]",
  "about.step3_2": "Scans your 'mods' folder and creates a 'Manifest File' to distribute to others.",
  "about.step3_3": "Official mods (like Modrinth) get links automatically. Unofficial files (like custom mods) can be uploaded and shared via Cloudflare R2."
};

const zhCNExtras = {
  "nav.about": "使用说明",
  "about.title": "ModLinker 使用方法",
  "about.nav_1": "简介",
  "about.nav_2": "下载功能",
  "about.nav_3": "清单生成功能",
  "about.step1_1": "ModLinker 是一款用于在多人之间同步和分享 Minecraft MOD 配置的工具。",
  "about.step1_2": "它使用称为“清单 (JSON)”的文件来管理需要哪些 MOD。",
  "about.step2_1": "【下载功能】",
  "about.step2_2": "读取分发的“清单文件”并一次性下载其中列出的所有 MOD。",
  "about.step2_3": "已下载的 MOD 会被跳过，因此可以高速同步差异部分。",
  "about.step2_note": "使用方法： 1. 打开下载选项卡 -> 2. 选择 JSON 文件 -> 3. 检查差异并下载",
  "about.step3_1": "【清单生成功能】",
  "about.step3_2": "扫描您的“mods”文件夹，创建用于分发给他人的“清单文件”。",
  "about.step3_3": "Modrinth 等官方 MOD 会自动获取链接，自制 MOD 等非官方文件可以上传到 Cloudflare R2 进行共享。"
};

const zhTWExtras = {
  "nav.about": "使用說明",
  "about.title": "ModLinker 使用方法",
  "about.nav_1": "簡介",
  "about.nav_2": "下載功能",
  "about.nav_3": "清單生成功能",
  "about.step1_1": "ModLinker 是一款用於在多人之間同步和分享 Minecraft MOD 配置的工具。",
  "about.step1_2": "它使用稱為「清單 (JSON)」的檔案來管理需要哪些 MOD。",
  "about.step2_1": "【下載功能】",
  "about.step2_2": "讀取分發的「清單檔案」並一次性下載其中列出的所有 MOD。",
  "about.step2_3": "已下載的 MOD 會被跳過，因此可以高速同步差異部分。",
  "about.step2_note": "使用方法： 1. 打開下載分頁 -> 2. 選擇 JSON 檔案 -> 3. 檢查差異並下載",
  "about.step3_1": "【清單生成功能】",
  "about.step3_2": "掃描您的「mods」資料夾，建立用於分發給他人的「清單檔案」。",
  "about.step3_3": "Modrinth 等官方 MOD 會自動獲取連結，自製 MOD 等非官方檔案可以上傳到 Cloudflare R2 進行共享。"
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
