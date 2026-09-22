const fs = require('fs');
let h = fs.readFileSync('src/index.html', 'utf8');

h = h.replace(/<button class="btn-ghost" id="clear-log-btn-sync".*?>.*?<\/button>/g, '<button class="btn-ghost" id="clear-log-btn-sync" data-i18n="console.clear">クリア</button>');
h = h.replace(/<button class="btn-ghost" id="clear-log-btn-generate".*?>.*?<\/button>/g, '<button class="btn-ghost" id="clear-log-btn-generate" data-i18n="console.clear">クリア</button>');
h = h.replace(/<span class="log-msg">ゲームディレクトリを指定して操作を開始してください。<\/span>/g, '<span class="log-msg" data-i18n="console.initial">ゲームディレクトリを指定して操作を開始してください。</span>');

fs.writeFileSync('src/index.html', h);
