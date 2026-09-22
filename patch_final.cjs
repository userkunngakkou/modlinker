const fs = require('fs');

// === 1. Fix CSS: change opacity:0 to display:none for proper hiding ===
let css = fs.readFileSync('src/styles.css', 'utf8');
css = css.replace(
  '.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 1000; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }',
  '.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(6px); display: none; align-items: center; justify-content: center; z-index: 1000; }'
);
css = css.replace(
  '.modal-overlay.show { opacity: 1; pointer-events: auto; }',
  '.modal-overlay.show { display: flex; }'
);
fs.writeFileSync('src/styles.css', css);
console.log('CSS fixed');

// === 2. Fix main.js: settings header text + i18n ===
let js = fs.readFileSync('src/main.js', 'utf8');

// Fix header text for settings mode
js = js.replace(
  /headerTitleText\.textContent = "API設定・その他"/g,
  'headerTitleText.textContent = window.i18n ? window.i18n.t("nav.settings") : "設定"'
);
// Also fix encoded version if any
js = js.replace(
  /headerTitleText\.textContent = "API\u8a2d\u5b9a\u30fb\u305d\u306e\u4ed6"/g,
  'headerTitleText.textContent = window.i18n ? window.i18n.t("nav.settings") : "設定"'
);

// Also i18n the other header texts
js = js.replace(
  /headerTitleText\.textContent = "MODダウンロード同期"/g,
  'headerTitleText.textContent = window.i18n ? window.i18n.t("header.sync_title") : "MODダウンロード同期"'
);
js = js.replace(
  /headerTitleText\.textContent = "マニフェスト生成 \(リスト抽出\)"/g,
  'headerTitleText.textContent = window.i18n ? window.i18n.t("header.generate_title") : "マニフェスト生成 (リスト抽出)"'
);
fs.writeFileSync('src/main.js', js);
console.log('main.js fixed');

// === 3. Fix HTML: R2 guide button still centered ===
let html = fs.readFileSync('src/index.html', 'utf8');
html = html.replace(
  'display: flex; justify-content: center;"',
  'display: flex; justify-content: flex-start;"'
);
// Also fix center variant
html = html.replace(
  'justify-content: center;',
  'justify-content: flex-start;'
);
fs.writeFileSync('src/index.html', html);
console.log('HTML fixed');
