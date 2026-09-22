const fs = require('fs');

let css = fs.readFileSync('src/styles.css', 'utf8');

// Update .custom-select-trigger.open
css = css.replace(
  /\.custom-select-trigger\.open \{\n\s*border-radius: var\(--radius-sm\) var\(--radius-sm\) 0 0;\n\s*border-bottom-color: transparent;\n\}/g,
  `.custom-select-trigger.open {\n  border-radius: 0 0 var(--radius-sm) var(--radius-sm);\n  border-top-color: transparent;\n}`
);

// Update .custom-select-options
css = css.replace(
  /\.custom-select-options \{\n\s*position: absolute;\n\s*top: 100%;\n\s*left: 0;\n\s*right: 0;\n\s*background-color: var\(--bg-darkest\);\n\s*border: 1px solid var\(--glass-border\);\n\s*border-top: none;\n\s*border-radius: 0 0 var\(--radius-sm\) var\(--radius-sm\);/g,
  `.custom-select-options {\n  position: absolute;\n  bottom: 100%;\n  left: 0;\n  right: 0;\n  background-color: var(--bg-darkest);\n  border: 1px solid var(--glass-border);\n  border-bottom: none;\n  border-radius: var(--radius-sm) var(--radius-sm) 0 0;`
);

fs.writeFileSync('src/styles.css', css);
console.log('Select CSS updated to open upwards');
