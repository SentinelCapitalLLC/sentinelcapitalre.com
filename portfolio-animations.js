// portfolio-animations.js
// Reveal tiles with stagger on scroll

(function () {
  function reveal(selector = '.tile') {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          // Stagger per row-ish by index:
          const i = [...els].indexOf(e.target);
          e.target.style.transitionDelay = (i % 6) * 60 + 'ms';
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach((el) => io.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => reveal());
})();
