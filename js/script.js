/* ==========================================================================
   TARLTON CLEAN TEAM — Homepage interactions
   Vanilla JS only. No dependencies.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var body = doc.body;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isDesktop = function () { return window.matchMedia('(min-width: 860px)').matches; };

  /* --------------------------------------------------------------------
     1. Year
     -------------------------------------------------------------------- */
  var yearEl = doc.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* --------------------------------------------------------------------
     2. Sticky header shadow
     -------------------------------------------------------------------- */
  var hdr = doc.getElementById('hdr');
  if (hdr) {
    var onHdrScroll = function () {
      hdr.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onHdrScroll();
    window.addEventListener('scroll', onHdrScroll, { passive: true });
  }

  /* --------------------------------------------------------------------
     3. Mobile drawer
     -------------------------------------------------------------------- */
  var drawer = doc.getElementById('drawer');
  var burger = doc.getElementById('burger');

  var lastFocus = null;

  function openDrawer() {
    if (!drawer) return;
    lastFocus = doc.activeElement;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (burger) burger.setAttribute('aria-expanded', 'true');
    body.classList.add('no-scroll');
    root.classList.add('no-scroll');

    var first = drawer.querySelector('.drawer__close');
    if (first) window.setTimeout(function () { first.focus(); }, 60);
  }

  function closeDrawer() {
    if (!drawer || !drawer.classList.contains('is-open')) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    body.classList.remove('no-scroll');
    root.classList.remove('no-scroll');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  if (burger && drawer) {
    burger.addEventListener('click', function () {
      if (drawer.classList.contains('is-open')) closeDrawer();
      else openDrawer();
    });

    drawer.querySelectorAll('[data-close-drawer]').forEach(function (el) {
      el.addEventListener('click', closeDrawer);
    });

    drawer.querySelectorAll('.drawer__link, .drawer__foot a').forEach(function (link) {
      link.addEventListener('click', function () { closeDrawer(); });
    });

    doc.addEventListener('keydown', function (e) {
      if (!drawer.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        closeDrawer();
        return;
      }

      if (e.key === 'Tab') {
        var focusables = drawer.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        var firstEl = focusables[0];
        var lastEl = focusables[focusables.length - 1];

        if (e.shiftKey && doc.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && doc.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    });

    window.addEventListener('resize', function () {
      if (isDesktop()) closeDrawer();
    });
  }

  /* --------------------------------------------------------------------
     4. Reveal on scroll
     -------------------------------------------------------------------- */
  var revealEls = Array.prototype.slice.call(doc.querySelectorAll('[data-reveal]'));

  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

      revealEls.forEach(function (el, i) {
        el.style.transitionDelay = (Math.min(i % 4, 3) * 55) + 'ms';
        io.observe(el);
      });
    }
  }

  /* --------------------------------------------------------------------
     5. FAQ — exclusive accordion
     -------------------------------------------------------------------- */
  var faqItems = Array.prototype.slice.call(doc.querySelectorAll('.qa'));
  if (faqItems.length) {
    faqItems.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        faqItems.forEach(function (other) {
          if (other !== item && other.open) other.open = false;
        });
      });
    });
  }

  /* --------------------------------------------------------------------
     6. Floating CTAs
     -------------------------------------------------------------------- */
  var floatCall = doc.getElementById('floatCall');
  var mcta = doc.getElementById('mcta');
  var ticking = false;

  function updateFloats() {
    var y = window.scrollY;
    if (floatCall) floatCall.classList.toggle('is-on', y > 420);
    if (mcta) mcta.classList.toggle('is-on', y > 240);
    if (mcta) body.classList.toggle('has-bar', !isDesktop() && y > 240);
    ticking = false;
  }

  function onScrollFloats() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateFloats);
    }
  }

  updateFloats();
  window.addEventListener('scroll', onScrollFloats, { passive: true });
  window.addEventListener('resize', onScrollFloats, { passive: true });

  /* --------------------------------------------------------------------
     7. Smooth in-page scrolling with sticky-header offset
        (CSS scroll-padding-top handles most; this fixes browsers that
         ignore it for hash changes.)
     -------------------------------------------------------------------- */
  var hashLinks = Array.prototype.slice.call(doc.querySelectorAll('a[href^="#"]'));

  hashLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;

      var target = doc.querySelector(id);
      if (!target) return;

      e.preventDefault();

      if (history.pushState) {
        history.pushState(null, '', id);
      }

      var headerH = hdr ? hdr.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - headerH - 14;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: reduceMotion ? 'auto' : 'smooth'
      });

      if (target && !target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      if (target && target.focus) target.focus({ preventScroll: true });
    });
  });

  /* --------------------------------------------------------------------
     8. Image error guard — never show a broken image icon
     -------------------------------------------------------------------- */
  Array.prototype.slice.call(doc.images).forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.opacity = '0';
      img.setAttribute('aria-hidden', 'true');
    });
  });
})();
