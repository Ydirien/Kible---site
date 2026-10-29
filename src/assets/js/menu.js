/* Menu mobile + sous-menu Solutions. Vanilla, sans dépendance. */
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  var submenuToggles = Array.prototype.slice.call(nav.querySelectorAll(".site-nav__submenu-toggle"));
  var desktop = window.matchMedia("(min-width: 62em)"); // doit correspondre au breakpoint CSS

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) closeSubmenus();
  }

  function setSubmenu(btn, open) {
    btn.setAttribute("aria-expanded", String(open));
    var menu = document.getElementById(btn.getAttribute("aria-controls"));
    if (menu) menu.classList.toggle("is-open", open);
  }

  function closeSubmenus(except) {
    submenuToggles.forEach(function (b) {
      if (b !== except) setSubmenu(b, false);
    });
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  submenuToggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") !== "true";
      closeSubmenus(btn);
      setSubmenu(btn, open);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape" && e.key !== "Esc") return;
    var openSub = submenuToggles.filter(function (b) { return b.getAttribute("aria-expanded") === "true"; })[0];
    if (openSub) {
      setSubmenu(openSub, false);
      openSub.focus();
      return;
    }
    if (toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });

  // Clic en dehors : ferme le sous-menu (desktop) .
  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target)) closeSubmenus();
  });

  // Le focus quitte le sous-menu : on le referme.
  nav.addEventListener("focusout", function (e) {
    var item = e.target.closest ? e.target.closest(".site-nav__item--has-submenu") : null;
    if (item && e.relatedTarget && !item.contains(e.relatedTarget)) closeSubmenus();
  });

  // Passage en desktop : on réinitialise l'état mobile.
  var onChange = function () { if (desktop.matches) setMenu(false); };
  if (desktop.addEventListener) desktop.addEventListener("change", onChange);
  else if (desktop.addListener) desktop.addListener(onChange);
})();
