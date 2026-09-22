const fs = require('fs');

let js = fs.readFileSync('src/main.js', 'utf8');

// The messed up top part is from line 9 to line 122 or so.
// Let's use a regex to replace everything from `  // --- Modal Logic ---` down to the `});` 
// and the stray `    closeR2GuideBtn.addEventListener("click", () => { ... }` that got broken.

// In fact, it might be safer to reconstruct the top part manually
const startMarker = `window.addEventListener("error", (e) => {
  const title = document.getElementById("header-title-text");
  if (title) title.textContent = "Error: " + e.message;
  fetch('http://localhost:9999', { method: 'POST', body: "ERROR: " + e.message + "\\nFile: " + e.filename + "\\nLine: " + e.lineno + "\\nCol: " + e.colno + "\\nStack: " + (e.error && e.error.stack) }).catch(err => console.error(err));
});`;

// Replace everything from `window.addEventListener("error"` down to `// Tauri core imports`
const badTopPartRegex = /window\.addEventListener\("error"[\s\S]*?\/\/\s*Tauri core imports/m;

js = js.replace(badTopPartRegex, startMarker + "\n\n// Tauri core imports");

// Now we need to append the clean modal logic at the bottom of the file (or inside DOMContentLoaded).
// To be safe, let's just append it to the end of the file. It will run after the DOM is parsed if script is defer.
// But better yet, wrap it in DOMContentLoaded.

const cleanModalLogic = `
window.addEventListener("DOMContentLoaded", () => {
  // --- Modal Logic ---
  const r2GuideModal = document.getElementById("r2-guide-modal");
  const openR2GuideBtn = document.getElementById("open-r2-guide-btn");
  const closeR2GuideBtn = document.getElementById("close-r2-guide-btn");
  const r2GuidePrevBtn = document.getElementById("r2-guide-prev-btn");
  const r2GuideNextBtn = document.getElementById("r2-guide-next-btn");
  const stepNavItems = document.querySelectorAll(".step-nav-item");
  const stepPanes = document.querySelectorAll(".step-pane");
  let currentStep = 1;
  const maxStep = 4;

  if (openR2GuideBtn && r2GuideModal) {
    openR2GuideBtn.addEventListener("click", () => {
      r2GuideModal.classList.add("show");
      setStep(1);
    });

    closeR2GuideBtn.addEventListener("click", () => {
      r2GuideModal.classList.remove("show");
    });

    r2GuideModal.addEventListener("click", (e) => {
      if (e.target === r2GuideModal) {
        r2GuideModal.classList.remove("show");
      }
    });

    r2GuideNextBtn.addEventListener("click", () => {
      if (currentStep < maxStep) {
        setStep(currentStep + 1);
      } else {
        r2GuideModal.classList.remove("show");
      }
    });

    r2GuidePrevBtn.addEventListener("click", () => {
      if (currentStep > 1) {
        setStep(currentStep - 1);
      }
    });

    stepNavItems.forEach(item => {
      item.addEventListener("click", () => {
        setStep(parseInt(item.dataset.step));
      });
    });

    function setStep(step) {
      currentStep = step;
      stepNavItems.forEach(item => {
        if(parseInt(item.dataset.step) === step) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
      stepPanes.forEach(pane => {
        if(pane.id === \`r2-step-\${step}\`) {
          pane.classList.add("active");
        } else {
          pane.classList.remove("active");
        }
      });
      r2GuidePrevBtn.style.visibility = step === 1 ? "hidden" : "visible";
      
      if (step === maxStep) {
        r2GuideNextBtn.innerHTML = '<span data-i18n="common.close">閉じる</span>';
      } else {
        r2GuideNextBtn.innerHTML = '<span data-i18n="common.next">次へ</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>';
      }
      
      if (window.i18n && window.i18n.applyLocale) {
        window.i18n.applyLocale();
      }
    }
  }

  // --- About Modal Logic ---
  const aboutModal = document.getElementById("about-modal");
  const openAboutBtn = document.getElementById("nav-about-btn");
  const closeAboutBtn = document.getElementById("close-about-btn");
  const aboutPrevBtn = document.getElementById("about-prev-btn");
  const aboutNextBtn = document.getElementById("about-next-btn");
  const aboutStepItems = document.querySelectorAll(".about-step-item");
  const aboutPanes = document.querySelectorAll(".about-pane");
  let aboutStep = 1;
  const maxAboutStep = 3;

  if (openAboutBtn && aboutModal) {
    openAboutBtn.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach(btn => btn.classList.remove("active"));
      openAboutBtn.classList.add("active");
      aboutModal.classList.add("show");
      setAboutStep(1);
    });

    closeAboutBtn.addEventListener("click", () => {
      aboutModal.classList.remove("show");
      openAboutBtn.classList.remove("active");
    });

    aboutModal.addEventListener("click", (e) => {
      if (e.target === aboutModal) {
        aboutModal.classList.remove("show");
        openAboutBtn.classList.remove("active");
      }
    });

    if (aboutNextBtn) {
      aboutNextBtn.addEventListener("click", () => {
        if (aboutStep < maxAboutStep) {
          setAboutStep(aboutStep + 1);
        } else {
          aboutModal.classList.remove("show");
          openAboutBtn.classList.remove("active");
        }
      });
    }

    if (aboutPrevBtn) {
      aboutPrevBtn.addEventListener("click", () => {
        if (aboutStep > 1) {
          setAboutStep(aboutStep - 1);
        }
      });
    }

    aboutStepItems.forEach(item => {
      item.addEventListener("click", () => {
        setAboutStep(parseInt(item.dataset.step));
      });
    });

    function setAboutStep(step) {
      aboutStep = step;
      aboutStepItems.forEach(item => {
        if(parseInt(item.dataset.step) === step) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
      aboutPanes.forEach(pane => {
        if(pane.id === \`about-step-\${step}\`) {
          pane.classList.add("active");
        } else {
          pane.classList.remove("active");
        }
      });
      if (aboutPrevBtn) {
        aboutPrevBtn.style.visibility = step === 1 ? "hidden" : "visible";
      }
      
      if (aboutNextBtn) {
        if (step === maxAboutStep) {
          aboutNextBtn.innerHTML = '<span data-i18n="common.close">閉じる</span>';
        } else {
          aboutNextBtn.innerHTML = '<span data-i18n="common.next">次へ</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>';
        }
      }
      
      if (window.i18n && window.i18n.applyLocale) {
        window.i18n.applyLocale();
      }
    }
  }
});
`;

// Append modal logic at the end of the file
js = js + "\n\n" + cleanModalLogic;
fs.writeFileSync('src/main.js', js);
