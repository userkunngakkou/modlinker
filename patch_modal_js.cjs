const fs = require('fs');

const modalJs = `
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

    // Close on outside click
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
      // Update sidebar
      stepNavItems.forEach(item => {
        if(parseInt(item.dataset.step) === step) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
      // Update pane
      stepPanes.forEach(pane => {
        if(pane.id === \`r2-step-\${step}\`) {
          pane.classList.add("active");
        } else {
          pane.classList.remove("active");
        }
      });
      // Update buttons
      r2GuidePrevBtn.style.visibility = step === 1 ? "hidden" : "visible";
      
      if (step === maxStep) {
        r2GuideNextBtn.innerHTML = '<span data-i18n="common.close">閉じる</span>';
      } else {
        r2GuideNextBtn.innerHTML = '<span data-i18n="common.next">次へ</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>';
      }
      
      // Re-apply locale for newly injected innerHTML
      if (window.i18n && window.i18n.applyLocale) {
        window.i18n.applyLocale();
      }
    }
  }
});
`;

let js = fs.readFileSync('src/main.js', 'utf8');
// "});" (DOMContentLoadedの終わり) の手前に挿入する
js = js.replace('});\r\n', modalJs);
js = js.replace('});\n', modalJs); // 改行コード差異用
fs.writeFileSync('src/main.js', js);
