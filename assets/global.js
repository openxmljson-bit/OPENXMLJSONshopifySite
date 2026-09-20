/* OPENXMLJSON theme — progressive-enhancement motion + interaction layer.
   Everything here is additive: with JS off the page renders fully (see the
   .no-js rules in base.css), and every effect is skipped under
   prefers-reduced-motion. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var supportsIO = "IntersectionObserver" in window;

  /* ---------------------------------------------------------------
     Mobile nav
  --------------------------------------------------------------- */
  document.addEventListener("click", function (e) {
    var toggle = e.target.closest("[data-nav-toggle]");
    if (toggle) {
      var nav = document.getElementById("primary-nav");
      if (nav) {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      }
      return;
    }
    // click outside closes it
    var openNav = document.querySelector(".nav.open");
    if (openNav && !e.target.closest(".nav")) openNav.classList.remove("open");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var openNav = document.querySelector(".nav.open");
    if (openNav) openNav.classList.remove("open");
  });

  /* ---------------------------------------------------------------
     Sticky header state + scroll progress rail
  --------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  var rail = document.querySelector("[data-scroll-rail]");
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (header) header.classList.toggle("is-stuck", y > 12);
      if (rail) {
        var doc = document.documentElement;
        var max = doc.scrollHeight - window.innerHeight;
        rail.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
      }
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------
     Scroll reveal — [data-reveal] and [data-stagger]
     Staggered children get an incremental transition-delay.
  --------------------------------------------------------------- */
  var revealTargets = document.querySelectorAll("[data-reveal], [data-stagger]");

  function showNow(el) { el.classList.add("is-in"); }

  if (reduced || !supportsIO) {
    revealTargets.forEach(showNow);
  } else {
    revealTargets.forEach(function (el) {
      if (!el.hasAttribute("data-stagger")) return;
      // cap the stagger so late cards never feel laggy
      var step = parseInt(el.getAttribute("data-stagger"), 10) || 70;
      Array.prototype.forEach.call(el.children, function (child, i) {
        child.style.transitionDelay = Math.min(i * step, 560) + "ms";
      });
    });

    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        showNow(entry.target);
        revealIO.unobserve(entry.target);
      });
      // threshold 0 + a bottom inset fires as soon as the element's top edge
      // clears 12% of the viewport — a percentage threshold would make tall
      // grids wait until they are most of the way up the screen.
    }, { threshold: 0, rootMargin: "0px 0px -12% 0px" });

    revealTargets.forEach(function (el) { revealIO.observe(el); });
  }

  /* ---------------------------------------------------------------
     Animated counters — [data-count="6500"]
     Optional: data-count-decimals, data-count-prefix, data-count-suffix
  --------------------------------------------------------------- */
  function formatNumber(value, decimals) {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
    var decimals = parseInt(el.getAttribute("data-count-decimals"), 10) || 0;
    var prefix = el.getAttribute("data-count-prefix") || "";
    var suffix = el.getAttribute("data-count-suffix") || "";
    var duration = parseInt(el.getAttribute("data-count-duration"), 10) || 1800;

    if (reduced) {
      el.textContent = prefix + formatNumber(target, decimals) + suffix;
      return;
    }

    var start = null;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      // easeOutExpo — fast out of the gate, settles precisely on the number
      var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = prefix + formatNumber(target * eased, decimals) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    if (!supportsIO) {
      counters.forEach(runCounter);
    } else {
      var countIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          var card = entry.target.closest(".counter");
          if (card) card.classList.add("is-in");
          countIO.unobserve(entry.target);
        });
      }, { threshold: 0.45 });
      counters.forEach(function (c) { countIO.observe(c); });
    }
  }

  /* ---------------------------------------------------------------
     Benchmark bars
  --------------------------------------------------------------- */
  var bars = document.querySelectorAll("[data-bar]");
  function fillBar(el) { el.style.width = (el.getAttribute("data-bar") || "0") + "%"; }

  if (bars.length && supportsIO && !reduced) {
    var barIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // stagger the rows so the winning bar lands first
        var idx = Array.prototype.indexOf.call(bars, el);
        setTimeout(function () { fillBar(el); }, idx * 110);
        barIO.unobserve(el);
      });
    }, { threshold: 0.3 });
    bars.forEach(function (b) { barIO.observe(b); });
  } else {
    bars.forEach(fillBar);
  }

  /* ---------------------------------------------------------------
     Cursor spotlight on cards
  --------------------------------------------------------------- */
  if (!reduced && window.matchMedia("(hover: hover)").matches) {
    var spotlightCards = document.querySelectorAll(".feature, .step, .counter, .plan, .narik-card");
    spotlightCards.forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });

    /* ---- hero window: gentle 3D tilt toward the pointer ---- */
    var shot = document.querySelector("[data-tilt]");
    if (shot) {
      var tiltFrame = null;
      shot.addEventListener("pointermove", function (e) {
        if (tiltFrame) return;
        tiltFrame = requestAnimationFrame(function () {
          var r = shot.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          shot.style.transform =
            "perspective(1400px) rotateY(" + (px * 5).toFixed(2) + "deg) rotateX(" +
            (-py * 4).toFixed(2) + "deg) translateY(-4px)";
          tiltFrame = null;
        });
      });
      shot.addEventListener("pointerleave", function () {
        shot.style.transform = "";
      });
    }
  }

  /* ---------------------------------------------------------------
     Format marquee — duplicate the track so the loop is seamless
  --------------------------------------------------------------- */
  var marquee = document.querySelector("[data-marquee]");
  if (marquee && !reduced) {
    marquee.innerHTML += marquee.innerHTML;
    marquee.setAttribute("aria-hidden", "false");
  }

  /* ---------------------------------------------------------------
     FAQ accordion — one panel open at a time
  --------------------------------------------------------------- */
  var faqs = document.querySelectorAll("[data-faq] details");
  faqs.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (!d.open) return;
      faqs.forEach(function (other) { if (other !== d) other.open = false; });
    });
  });
})();
