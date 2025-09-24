// animation_index.js

// 1) Reveal-on-scroll for elements with .reveal
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();

// 2) Cross-fading hero slideshow (20s interval)
(function () {
  const a = document.getElementById('heroA');
  const b = document.getElementById('heroB');
  if (!a || !b) return;

  const slides = [
    'assets/index_hero_1.jpeg',
    'assets/index_hero_2.jpeg',
    'assets/index_hero_3.jpeg' // add/replace with any image you have
  ];

  let current = 0;       // index currently showing on element A or B
  let showingA = true;   // which layer is on top

  function nextSlide() {
    const nextIdx = (current + 1) % slides.length;
    const topLayer   = showingA ? a : b;
    const backLayer  = showingA ? b : a;

    // set next image on the back layer and fade it in
    backLayer.style.backgroundImage = `url('${slides[nextIdx]}')`;
    backLayer.classList.add('show');
    topLayer.classList.remove('show');

    // swap pointers
    showingA = !showingA;
    current = nextIdx;
  }

  // initialize both layers for a smooth first fade
  a.style.backgroundImage = `url('${slides[0]}')`;
  b.style.backgroundImage = `url('${slides[1]}')`;
  b.classList.remove('show'); // A is visible by default

  // start cycle
  setInterval(nextSlide, 7000); // 10 seconds
})();
