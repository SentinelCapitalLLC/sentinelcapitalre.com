// scroll-animations.js
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".approach-item");

  // Add a gentle stagger so each item starts a little later
  items.forEach((item, i) => {
    item.style.setProperty("--d", `${i * 140}ms`);
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // no toggling back; keeps it smooth
        }
      });
    },
    {
      threshold: 0.18,         // start a bit before fully in view
      rootMargin: "0px 0px -8% 0px" // and a touch earlier
    }
  );

  items.forEach((item) => observer.observe(item));
});
