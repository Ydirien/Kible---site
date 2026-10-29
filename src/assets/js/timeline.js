/* Timeline de l'accueil : la ligne centrale se remplit au défilement et chaque bloc s'active à son passage.
   Sans JS (ou sans IntersectionObserver), la ligne est pleine et tous les blocs sont visibles.
   Aucune mesure au chargement : les blocs sont observés, la ligne n'est calculée qu'au défilement. */
(function () {
  var tl = document.querySelector(".timeline");
  if (!tl || !("IntersectionObserver" in window)) return;
  var items = tl.querySelectorAll(".tl-item");
  var ticking = false;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("is-active"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -25% 0px" });
  Array.prototype.forEach.call(items, function (it) { io.observe(it); });

  function update() {
    ticking = false;
    var r = tl.getBoundingClientRect();
    var p = (window.innerHeight * 0.55 - r.top) / r.height;
    tl.style.setProperty("--tl", Math.min(1, Math.max(0, p)).toFixed(4));
  }

  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }

  tl.classList.add("is-live");
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
})();
