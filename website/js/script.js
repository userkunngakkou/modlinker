document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll Effect ---
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- Fade-in Animations (Intersection Observer) ---
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    fadeElements.forEach(el => observer.observe(el));
  }

  // --- Docs Navigation Logic ---
  const docsNavLinks = document.querySelectorAll('.docs-nav-link');
  if (docsNavLinks.length > 0) {
    docsNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Remove active class from all links
        docsNavLinks.forEach(l => l.classList.remove('active'));
        // Add active to clicked
        e.target.classList.add('active');
        
        // Hide all sections
        const sections = document.querySelectorAll('.docs-section');
        sections.forEach(sec => sec.classList.remove('active'));
        
        // Show target section
        const targetId = e.target.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.classList.add('active');
          // Smooth scroll to top of content area on mobile
          if (window.innerWidth <= 768) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  // --- Copy Code Functionality ---
  const copyButtons = document.querySelectorAll('.copy-btn');
  if (copyButtons.length > 0) {
    copyButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const targetId = btn.getAttribute('data-copy-target');
        const targetCode = document.getElementById(targetId);
        
        if (targetCode) {
          try {
            await navigator.clipboard.writeText(targetCode.textContent.trim());
            
            // Visual feedback
            const originalText = btn.innerHTML;
            btn.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Copied!
            `;
            btn.classList.add('copied');
            
            setTimeout(() => {
              btn.innerHTML = originalText;
              btn.classList.remove('copied');
            }, 2000);
          } catch (err) {
            console.error('Failed to copy text: ', err);
            btn.textContent = 'Error';
            setTimeout(() => {
              btn.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy
              `;
            }, 2000);
          }
        }
      });
    });
  }
});
