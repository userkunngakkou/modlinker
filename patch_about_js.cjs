const fs = require('fs');

let js = fs.readFileSync('src/main.js', 'utf8');

const aboutJs = `
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
      // Sidebar button state
      document.querySelectorAll(".nav-item").forEach(btn => btn.classList.remove("active"));
      openAboutBtn.classList.add("active");
      
      aboutModal.classList.add("show");
      setAboutStep(1);
    });

    closeAboutBtn.addEventListener("click", () => {
      aboutModal.classList.remove("show");
      openAboutBtn.classList.remove("active");
    });

    // Close on outside click
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
      // Update sidebar
      aboutStepItems.forEach(item => {
        if(parseInt(item.dataset.step) === step) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
      // Update pane
      aboutPanes.forEach(pane => {
        if(pane.id === \`about-step-\${step}\`) {
          pane.classList.add("active");
        } else {
          pane.classList.remove("active");
        }
      });
      // Update buttons
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
      
      // Re-apply locale for newly injected innerHTML
      if (window.i18n && window.i18n.applyLocale) {
        window.i18n.applyLocale();
      }
    }
  }
`;

// "});" (DOMContentLoadedの終わり) の手前に挿入する
js = js.replace('});\r\n', aboutJs + '\r\n});\r\n');
if (js.indexOf('About Modal Logic') === -1) {
    js = js.replace('});\n', aboutJs + '\n});\n');
}
fs.writeFileSync('src/main.js', js);
