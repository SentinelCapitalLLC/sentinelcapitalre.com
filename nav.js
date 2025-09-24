// nav.js
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const navWrap = document.getElementById('primaryNav');
  const subParents = Array.from(document.querySelectorAll('.has-sub'));

  // 1) Hard reset on load: nothing open
  document.addEventListener('DOMContentLoaded', () => {
    navWrap?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
    subParents.forEach(p => {
      p.classList.remove('open');
      p.setAttribute('aria-expanded', 'false');
      const btn = p.querySelector('button');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      const dd = p.querySelector('.dropdown');
      if (dd) dd.style.display = ''; // clear any inline leftovers
    });
  });

  // 2) Mobile menu toggle
  menuBtn?.addEventListener('click', () => {
    const isOpen = navWrap.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // close any open dropdowns when opening/closing the menu
    if (!isOpen) {
      subParents.forEach(p => {
        p.classList.remove('open');
        p.setAttribute('aria-expanded', 'false');
        const btn = p.querySelector('button');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // 3) Dropdown toggles (same logic for desktop & mobile)
  subParents.forEach(parent => {
    const trigger = parent.querySelector('button');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // close other dropdowns first (one open at a time)
      subParents.forEach(p => {
        if (p !== parent) {
          p.classList.remove('open');
          p.setAttribute('aria-expanded', 'false');
          const b = p.querySelector('button');
          if (b) b.setAttribute('aria-expanded', 'false');
        }
      });

      const nowOpen = parent.classList.toggle('open');
      parent.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
      trigger.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
    });
  });

  // 4) Click outside to close
  document.addEventListener('click', (e) => {
    const clickInsideNav = navWrap && navWrap.contains(e.target);
    const clickOnMenuBtn = e.target === menuBtn || menuBtn?.contains(e.target);
    if (!clickInsideNav && !clickOnMenuBtn) {
      navWrap?.classList.remove('open');
      menuBtn?.setAttribute('aria-expanded', 'false');
      subParents.forEach(p => {
        p.classList.remove('open');
        p.setAttribute('aria-expanded', 'false');
        const b = p.querySelector('button');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // 5) ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navWrap?.classList.remove('open');
      menuBtn?.setAttribute('aria-expanded', 'false');
      subParents.forEach(p => {
        p.classList.remove('open');
        p.setAttribute('aria-expanded', 'false');
        const b = p.querySelector('button');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }
  });
})();
