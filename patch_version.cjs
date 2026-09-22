const fs = require('fs');

// 1. index.html の更新
let html = fs.readFileSync('src/index.html', 'utf8');
html = html.replace(/<span class="brand-tag">v0\.3\.0<\/span>/, '<span class="brand-tag" style="font-size: 11px;">V1.0.0 Early Access</span>');
fs.writeFileSync('src/index.html', html);
console.log('index.html updated');

// 2. package.json の更新
let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.version = "1.0.0";
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('package.json updated');

// 3. tauri.conf.json の更新
let tauriConf = JSON.parse(fs.readFileSync('src-tauri/tauri.conf.json', 'utf8'));
tauriConf.version = "1.0.0";
// Tauri v2 の場合、version フィールドの場所が複数あるかもしれない
if (tauriConf.package && tauriConf.package.version) {
    tauriConf.package.version = "1.0.0";
}
fs.writeFileSync('src-tauri/tauri.conf.json', JSON.stringify(tauriConf, null, 2));
console.log('tauri.conf.json updated');
