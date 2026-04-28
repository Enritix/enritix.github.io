/* Custom cursor — dot + trailing ring with hover states */
(function () {
  if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  if (!dot || !ring) return;

  gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
  const xDot  = gsap.quickTo(dot,  'x', { duration: .1,  ease: 'power3' });
  const yDot  = gsap.quickTo(dot,  'y', { duration: .1,  ease: 'power3' });
  const xRing = gsap.quickTo(ring, 'x', { duration: .45, ease: 'power3' });
  const yRing = gsap.quickTo(ring, 'y', { duration: .45, ease: 'power3' });

  let visible = false;

  window.addEventListener('mousemove', e => {
    xDot(e.clientX); yDot(e.clientY);
    xRing(e.clientX); yRing(e.clientY);
    if (!visible) {
      gsap.to([dot, ring], { opacity: 1, duration: .4, overwrite: 'auto' });
      visible = true;
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    gsap.to([dot, ring], { opacity: 0, duration: .3, overwrite: 'auto' });
    visible = false;
  });
  document.addEventListener('mouseenter', () => {
    gsap.to(ring, { opacity: 1, duration: .3, overwrite: 'auto' });
    if (!document.body.classList.contains('cur-link') &&
        !document.body.classList.contains('cur-view'))
      gsap.to(dot, { opacity: 1, duration: .3, overwrite: 'auto' });
    visible = true;
  });

  const CARD = '.project-card, .related-card';
  const LINK = 'a, button, [role="button"], .filter-btn, .contact-link';

  function setMode(mode) {
    document.body.classList.toggle('cur-link', mode === 'link');
    document.body.classList.toggle('cur-view', mode === 'view');
    gsap.to(dot, { scale: mode ? 0 : 1, duration: .2, ease: 'power2.inOut', overwrite: 'auto' });
  }

  document.addEventListener('mouseover', e => {
    if (e.target.closest(CARD)) setMode('view');
    else if (e.target.closest(LINK)) setMode('link');
    else setMode('');
  }, { passive: true });
})();
