/* ============================================================
   Portafolio — Francisco Berdezagar
   Sin dependencias. Todo se inicializa al cargar el DOM.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Tema ---------- */
  // El tema se resuelve una sola vez: preferencia guardada > preferencia del SO.
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) { /* modo privado */ }

  var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  root.setAttribute('data-theme', stored || (prefersLight ? 'light' : 'dark'));

  var themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* ignorar */ }
  });

  /* ---------- Menú móvil ---------- */
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', function () {
    var open = navLinks.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });

  // Cerrar al navegar a una sección.
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- Sombra del nav al hacer scroll ---------- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Sección activa en el nav ---------- */
  // Marca el enlace de la sección visible. El rootMargin recorta la franja de
  // detección a la banda central de la pantalla para que no haya dos activos.
  var sections = document.querySelectorAll('main section[id]');
  var linkFor = {};
  Array.prototype.forEach.call(navLinks.querySelectorAll('a'), function (a) {
    linkFor[a.getAttribute('href').slice(1)] = a;
  });

  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var link = linkFor[entry.target.id];
      if (!link) return;
      if (entry.isIntersecting) {
        Array.prototype.forEach.call(navLinks.querySelectorAll('a'), function (a) {
          a.classList.remove('is-active');
        });
        link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  Array.prototype.forEach.call(sections, function (s) { navObserver.observe(s); });

  /* ---------- Aparición progresiva ---------- */
  var revealObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry, i) {
      if (!entry.isIntersecting) return;
      // Escalonado suave entre elementos que entran juntos.
      entry.target.style.transitionDelay = Math.min(i * 60, 240) + 'ms';
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) {
    revealObserver.observe(el);
  });

  /* ---------- Filtro de proyectos ---------- */
  var filters = document.querySelectorAll('.filter');
  var cards = document.querySelectorAll('#projects .card');

  Array.prototype.forEach.call(filters, function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.dataset.filter;

      Array.prototype.forEach.call(filters, function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      Array.prototype.forEach.call(cards, function (card) {
        var match = value === 'all' || card.dataset.cat.split(' ').indexOf(value) !== -1;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* ---------- Contadores del hero ---------- */
  // Solo se anima una vez, cuando el bloque entra en pantalla.
  var statsBlock = document.querySelector('.hero__stats');
  if (statsBlock && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var counted = false;
    var statsObserver = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting || counted) return;
      counted = true;

      Array.prototype.forEach.call(statsBlock.querySelectorAll('[data-count]'), function (el) {
        var target = parseInt(el.dataset.count, 10);
        var step = Math.max(1, Math.round(target / 24));
        var current = 0;
        var tick = setInterval(function () {
          current += step;
          if (current >= target) { current = target; clearInterval(tick); }
          el.textContent = current;
        }, 34);
      });
    }, { threshold: 0.4 });
    statsObserver.observe(statsBlock);
  }

  /* ---------- Año del footer ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
