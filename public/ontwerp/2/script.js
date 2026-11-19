(function () {
  var header = document.querySelector('[data-header]');
  if (!header) return;
  var ticking = false;
  function update() {
    header.classList.toggle('is-compact', window.scrollY > 24);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();
