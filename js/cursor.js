/* Custom cursor — dot + trailing ring with auto re-init on resize */
(function () {
  let cleanup = null;
  let active = false;

  const QUERY = '(hover:hover) and (pointer:fine)';

  function destroyCursor() {
    if (cleanup) cleanup();
    cleanup = null;
    active = false;

    document.body.classList.remove('cur-link', 'cur-view');

    const dot = document.getElementById('cur-dot');
    const ring = document.getElementById('cur-ring');

    if (dot && ring) {
      gsap.set([dot, ring], { opacity: 0 });
    }
  }

  function initCursor() {
    if (!window.matchMedia(QUERY).matches || active) return;

    const dot = document.getElementById('cur-dot');
    const ring = document.getElementById('cur-ring');
    if (!dot || !ring) return;

    active = true;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const xDot = gsap.quickTo(dot, 'x', { duration: .10, ease: 'power3' });
    const yDot = gsap.quickTo(dot, 'y', { duration: .10, ease: 'power3' });
    const xRing = gsap.quickTo(ring, 'x', { duration: .45, ease: 'power3' });
    const yRing = gsap.quickTo(ring, 'y', { duration: .45, ease: 'power3' });

    let visible = false;

    const CARD = '.project-card, .related-card';
    const LINK = 'a, button, [role="button"], .filter-btn, .contact-link';
    const TEXT = 'input, textarea, [contenteditable]';

    function setMode(mode) {
      document.body.classList.toggle('cur-link', mode === 'link');
      document.body.classList.toggle('cur-view', mode === 'view');
      document.body.classList.toggle('cur-text', mode === 'text');

      gsap.to(dot, {
        scale: mode ? 0 : 1,
        duration: .2,
        ease: 'power2.inOut',
        overwrite: 'auto'
      });
    }

    function onMove(e) {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);

      if (!visible) {
        gsap.to([dot, ring], {
          opacity: 1,
          duration: .4,
          overwrite: 'auto'
        });
        visible = true;
      }
    }

    function onLeave() {
      gsap.to([dot, ring], {
        opacity: 0,
        duration: .3,
        overwrite: 'auto'
      });
      visible = false;
    }

    function onEnter() {
      gsap.to(ring, { opacity: 1, duration: .3, overwrite: 'auto' });

      if (
        !document.body.classList.contains('cur-link') &&
        !document.body.classList.contains('cur-view')
      ) {
        gsap.to(dot, { opacity: 1, duration: .3, overwrite: 'auto' });
      }

      visible = true;
    }

    function onHover(e) {
      if (e.target.closest(CARD)) setMode('view');
      else if (e.target.closest(TEXT)) setMode('text');
      else if (e.target.closest(LINK)) setMode('link');
      else setMode('');
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover', onHover, { passive: true });

    cleanup = () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover', onHover);
    };
  }

  function checkCursorMode() {
    if (window.matchMedia(QUERY).matches) initCursor();
    else destroyCursor();
  }

  /* init */
  checkCursorMode();

  /* desktop <-> mobile switch */
  window.addEventListener('resize', checkCursorMode);

  /* some browsers trigger this cleaner */
  window.matchMedia(QUERY).addEventListener('change', checkCursorMode);
})();