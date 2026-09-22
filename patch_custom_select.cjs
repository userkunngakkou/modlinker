const fs = require('fs');

// 1. CSSにカスタムセレクト用のスタイルを追加
let css = fs.readFileSync('src/styles.css', 'utf8');
if (!css.includes('.custom-select-wrapper')) {
  css += `
/* === Custom Select === */
.custom-select-wrapper {
  position: relative;
  width: 100%;
  margin-top: 8px;
  user-select: none;
}
.custom-select-trigger {
  width: 100%;
  height: 42px;
  padding: 0 36px 0 14px;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  background-color: var(--bg-darkest);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;
}
.custom-select-trigger:hover {
  border-color: var(--accent-primary);
}
.custom-select-trigger.open {
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  border-bottom-color: transparent;
}
.custom-select-trigger svg {
  transition: transform 0.2s ease;
}
.custom-select-trigger.open svg {
  transform: rotate(180deg);
}
.custom-select-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--bg-darkest);
  border: 1px solid var(--glass-border);
  border-top: none;
  border-radius: 0 0 var(--radius-sm) var(--radius-sm);
  max-height: 250px;
  overflow-y: auto;
  z-index: 100;
  display: none;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}
.custom-select-options.open {
  display: block;
}
.custom-option {
  padding: 10px 14px;
  font-size: 13px;
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.custom-option:hover {
  background-color: var(--bg-hover);
}
.custom-option.selected {
  background-color: rgba(99, 102, 241, 0.15);
  color: var(--accent-primary);
}
`;
  fs.writeFileSync('src/styles.css', css);
  console.log('CSS updated');
}

// 2. HTMLの元のselectを非表示にし、ラッパーを置くためのコンテナに変更
let html = fs.readFileSync('src/index.html', 'utf8');
const oldSelectPattern = /<select id="locale-select"[\s\S]*?<\/select>/;
const newSelectHtml = `<div id="locale-custom-select-container"></div>
            <!-- original select hidden -->
            <select id="locale-select" style="display: none;"></select>`;
html = html.replace(oldSelectPattern, newSelectHtml);
fs.writeFileSync('src/index.html', html);
console.log('HTML updated');

// 3. main.js の初期化処理をカスタムセレクトに置き換える
let js = fs.readFileSync('src/main.js', 'utf8');

// localeSelectの初期化ブロックを見つける
const oldI18nInit = `  // i18n
  if (window.i18n) {
    const localeSelect = document.getElementById("locale-select");
    if (localeSelect) {
      window.i18n.SUPPORTED_LOCALES.forEach(loc => {
        const opt = document.createElement("option");
        opt.value = loc.code;
        opt.textContent = \`\${loc.flag} \${loc.name}\`;
        localeSelect.appendChild(opt);
      });
      localeSelect.addEventListener("change", async (e) => {
        await window.i18n.setLocale(e.target.value);
        updateDynamicTexts();
      });
    }
    const initialLocale = window.i18n.detectLocale();
    if (localeSelect) localeSelect.value = initialLocale;
    await window.i18n.setLocale(initialLocale);
  }`;

// UTF-8対応などのために少し柔軟に置換する（エスケープ文字列など）
// 無難に正規表現で置換
const regexI18n = /\/\/ [^\n]*i18n[^\n]*\n\s*if\s*\(window\.i18n\)[\s\S]*?await\s*window\.i18n\.setLocale\(initialLocale\);\n\s*\}/;

const newI18nInit = `  // i18n & Custom Select Init
  if (window.i18n) {
    const container = document.getElementById("locale-custom-select-container");
    const initialLocale = window.i18n.detectLocale();
    
    if (container) {
      // Build custom select DOM
      container.innerHTML = \`
        <div class="custom-select-wrapper">
          <div class="custom-select-trigger" id="custom-locale-trigger">
            <span id="custom-locale-selected-text"></span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div class="custom-select-options" id="custom-locale-options"></div>
        </div>
      \`;

      const trigger = document.getElementById("custom-locale-trigger");
      const optionsContainer = document.getElementById("custom-locale-options");
      const selectedText = document.getElementById("custom-locale-selected-text");

      // Populate options
      window.i18n.SUPPORTED_LOCALES.forEach(loc => {
        const optDiv = document.createElement("div");
        optDiv.className = "custom-option";
        if (loc.code === initialLocale) optDiv.classList.add("selected");
        optDiv.textContent = \`\${loc.flag} \${loc.name}\`;
        optDiv.dataset.value = loc.code;
        
        optDiv.addEventListener("click", async () => {
          // close dropdown
          optionsContainer.classList.remove("open");
          trigger.classList.remove("open");
          
          // update UI
          document.querySelectorAll(".custom-option").forEach(el => el.classList.remove("selected"));
          optDiv.classList.add("selected");
          selectedText.textContent = \`\${loc.flag} \${loc.name}\`;
          
          // Apply locale
          await window.i18n.setLocale(loc.code);
          updateDynamicTexts();
        });
        
        optionsContainer.appendChild(optDiv);
      });

      // Set initial text
      const initLoc = window.i18n.SUPPORTED_LOCALES.find(l => l.code === initialLocale) || window.i18n.SUPPORTED_LOCALES[0];
      selectedText.textContent = \`\${initLoc.flag} \${initLoc.name}\`;

      // Toggle dropdown
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        optionsContainer.classList.toggle("open");
        trigger.classList.toggle("open");
      });

      // Close when clicking outside
      document.addEventListener("click", () => {
        optionsContainer.classList.remove("open");
        trigger.classList.remove("open");
      });
    }

    await window.i18n.setLocale(initialLocale);
  }`;

if(js.match(regexI18n)) {
    js = js.replace(regexI18n, newI18nInit);
    fs.writeFileSync('src/main.js', js);
    console.log('main.js updated');
} else {
    console.log('Could not find i18n block in main.js');
}
