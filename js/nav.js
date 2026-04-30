/* Mobile drawer navigation + Lottie burger icon */
(function () {
  const burger       = document.getElementById('burger');
  const drawer       = document.getElementById('drawer');
  const overlay      = document.getElementById('drawer-overlay');
  const lottiePlayer = document.getElementById('burger-lottie');
  let dotLottieInstance = null;
  let drawerOpen        = false;
  let pendingMode       = null; // queued animation if instance not ready yet

  function setupDrawer() {
    gsap.set(drawer,  { xPercent: 100 });
    gsap.set(overlay, { opacity: 0 });
    drawer.style.pointerEvents = 'none';
  }


  function initLottie() {
  if (!lottiePlayer) return;

  customElements.whenDefined('dotlottie-wc').then(() => {

    const showReal = () => {
      if (burger.classList.contains('is-ready')) return;

      dotLottieInstance = lottiePlayer.dotLottie || null;

      /* eerst laten renderen + extra wachttijd */
      setTimeout(() => {
        burger.classList.add('is-ready');
      }, 1000); /* speel met 250-500ms */

      if (pendingMode) {
        const mode = pendingMode;
        pendingMode = null;
        playLottie(mode);
      }
    };

    lottiePlayer.addEventListener('ready', showReal);
    lottiePlayer.addEventListener('load', showReal);

    const check = setInterval(() => {
      if (lottiePlayer.dotLottie) {
        clearInterval(check);
        showReal();
      }
    }, 100);

    setTimeout(() => clearInterval(check), 3000);
  });
}

  function playLottie(mode) {
    // Last-chance grab before giving up
    if (!dotLottieInstance && lottiePlayer) dotLottieInstance = lottiePlayer.dotLottie;
    if (!dotLottieInstance) {
      pendingMode = mode; // remember for when the instance becomes ready
      return;
    }
    pendingMode = null;
    try {
      dotLottieInstance.setMode(mode);
      dotLottieInstance.setSpeed(2.5);
      if (typeof dotLottieInstance.setFrame === 'function') dotLottieInstance.setFrame(0);
      dotLottieInstance.play();
    } catch (_) {}
  }

  function openDrawer() {
    drawerOpen = true;
    burger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    drawer.style.pointerEvents = 'auto';
    playLottie('forward');
    gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.to(drawer,  { xPercent: 0, duration: 0.45, ease: 'power4.out' });
    gsap.fromTo(
      drawer.querySelectorAll('.drawer-link, .drawer-cta, .drawer-socials'),
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, stagger: 0.05, duration: 0.35, delay: 0.12, ease: 'power2.out', overwrite: true }
    );
  }

  function closeDrawer() {
    drawerOpen = false;
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    playLottie('reverse');
    gsap.to(overlay, { opacity: 0, duration: 0.25, ease: 'power2.out',
      onComplete: () => overlay.classList.remove('active') });
    gsap.to(drawer, { xPercent: 100, duration: 0.42, ease: 'power3.inOut',
      onComplete: () => { drawer.style.pointerEvents = 'none'; } });
  }

  burger.addEventListener('click', () => drawerOpen ? closeDrawer() : openDrawer());
  overlay.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('.drawer-link').forEach(a => a.addEventListener('click', closeDrawer));

  setupDrawer();
  initLottie();

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    drawer.querySelectorAll('li a').forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(el, { x: 6, duration: .2, ease: 'power2.out' });
        const num = el.querySelector('.drawer-num');
        if (num) gsap.to(num, { color: 'var(--accent)', duration: .2 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, duration: .22, ease: 'power2.inOut' });
        const num = el.querySelector('.drawer-num');
        if (num) gsap.to(num, { color: 'rgba(255,255,255,.14)', duration: .2 });
      });
    });
  }
})();
