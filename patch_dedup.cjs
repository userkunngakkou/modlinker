const fs = require('fs');

let h = fs.readFileSync('src/index.html', 'utf8');

// Find and remove the duplicate R2 modal (second occurrence)
// Both start with "<!-- R2 Setup Guide Modal -->" and end with "</div>\n\n"
const r2ModalPattern = /\s*<!-- R2 Setup Guide Modal -->\s*<div id="r2-guide-modal" class="modal-overlay">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;

const matches = h.match(r2ModalPattern);
if (matches && matches.length >= 2) {
  // Remove the second occurrence
  let firstFound = false;
  h = h.replace(r2ModalPattern, (match) => {
    if (!firstFound) {
      firstFound = true;
      return match; // Keep first
    }
    return ''; // Remove second
  });
  console.log('Removed duplicate R2 modal');
} else {
  console.log('Found ' + (matches ? matches.length : 0) + ' R2 modals');
}

fs.writeFileSync('src/index.html', h);
