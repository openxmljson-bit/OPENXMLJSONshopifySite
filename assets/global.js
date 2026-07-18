/* OPENXMLJSON theme — small progressive-enhancement helpers */
(function () {
  "use strict";

  // Mobile nav toggle
  document.addEventListener("click", function (e) {
    var toggle = e.target.closest("[data-nav-toggle]");
    if (toggle) {
      var nav = document.getElementById("primary-nav");
      if (nav) nav.classList.toggle("open");
    }
  });

  // Benchmark bars: animate fill width when scrolled into view
  var bars = document.querySelectorAll("[data-bar]");
  if (bars.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.style.width = (el.getAttribute("data-bar") || "0") + "%";
          io.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(function (b) { io.observe(b); });
  } else {
    bars.forEach(function (b) { b.style.width = (b.getAttribute("data-bar") || "0") + "%"; });
  }

  // FAQ: keep only one open (optional accordion behaviour)
  var faqs = document.querySelectorAll("[data-faq] details");
  faqs.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) {
        faqs.forEach(function (other) { if (other !== d) other.open = false; });
      }
    });
  });
})();
