/* ============================================================
   SMOALD — shared behaviour for every page.
   Each block is guarded so it only runs if its elements exist.
   ============================================================ */
(function () {
  // Sticky nav background on scroll
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  // Reveal-on-scroll
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  // Ecosystem interactivity (homepage only)
  const viz = document.getElementById('ecoViz');
  const detail = document.getElementById('ecoDetail');
  if (viz && detail) {
    const nodes = viz.querySelectorAll('.eco-node');
    const lines = viz.querySelectorAll('.eco-line');
    const panels = detail.querySelectorAll('.eco-panel');
    function setActive(name) {
      nodes.forEach(n => n.classList.toggle('active', n.dataset.node === name));
      lines.forEach(l => l.classList.toggle('on', l.dataset.line === name));
      panels.forEach(p => p.classList.toggle('show', p.dataset.panel === name));
      detail.classList.toggle('has', !!name);
    }
    nodes.forEach(n => {
      const name = n.dataset.node;
      n.addEventListener('mouseenter', () => setActive(name));
      n.addEventListener('mouseleave', () => setActive(''));
      n.addEventListener('focus', () => setActive(name));
      n.addEventListener('blur', () => setActive(''));
      n.addEventListener('click', (e) => e.preventDefault());
    });
  }
})();
