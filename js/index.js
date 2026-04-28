/* Index page — hero animations, scroll reveals, interactions, form, scroll spy */
(function () {
  gsap.registerPlugin(ScrollTrigger);

  /* ── Word splitter for hero title stagger ── */
  function wrapWords(el) {
    const html = el.innerHTML.replace(/<br\s*\/?>/gi, ' ⏎ ');
    const words = html.split(/\s+/);
    el.innerHTML = words.map(w => {
      if (w === '⏎') return '<br>';
      return `<span class="word" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="word-inner" style="display:inline-block">${w}</span></span> `;
    }).join('');
    return el.querySelectorAll('.word-inner');
  }

  /* ── Nav entrance ── */
  gsap.from('nav:not(.drawer)', { y: -20, opacity: 0, duration: .6, ease: 'power3.out', delay: .1 });

  /* ── Hero entrance ── */
  const titleWords = wrapWords(document.querySelector('.hero-title'));
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: .3 });
  heroTl
    .fromTo('.hero-badge',    { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .55 })
    .fromTo(titleWords,       { yPercent: 110 },       { yPercent: 0, stagger: .05, duration: .65 }, '-=.2')
    .fromTo('.hero-sub p',    { opacity: 0, y: 18 },   { opacity: 1, y: 0, duration: .55 }, '-=.25')
    .fromTo('.hero-actions > *', { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: .12, duration: .5 }, '-=.3')
    .fromTo('.hero-socials a', { opacity: 0, y: 10 },  { opacity: 1, y: 0, stagger: .08, duration: .35 }, '-=.2')
    .fromTo('.hero-scroll',   { opacity: 0 },          { opacity: 1, duration: .4 }, '-=.1')
    .fromTo('.hero-avail',    { opacity: 0, x: 24 },   { opacity: 1, x: 0, duration: .7, ease: 'power3.out' }, '-=.5');

  /* ── Section labels & titles ── */
  gsap.utils.toArray('.section-label').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: -28 }, { opacity: 1, x: 0, duration: .55, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  gsap.utils.toArray('h2.section-title').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  /* ── About ── */
  gsap.fromTo('.about-text', { opacity: 0, x: -32 }, { opacity: 1, x: 0, duration: .7, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-grid', start: 'top 82%', once: true } });
  gsap.fromTo('.about-stats', { opacity: 0, x: 32 }, { opacity: 1, x: 0, duration: .7, ease: 'power3.out', delay: .1,
    scrollTrigger: { trigger: '.about-grid', start: 'top 82%', once: true } });
  gsap.utils.toArray('.stat').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 20, scale: .96 },
      { opacity: 1, y: 0, scale: 1, duration: .5, delay: i * .09, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.about-stats', start: 'top 88%', once: true } });
  });

  /* ── Skills ── */
  gsap.utils.toArray('.skill-category').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: .5, delay: i * .07, ease: 'power2.out',
        scrollTrigger: { trigger: '.skills-categories', start: 'top 85%', once: true } });
  });
  gsap.utils.toArray('.skill-category').forEach(cat => {
    gsap.fromTo(cat.querySelectorAll('.skill-pill'), { opacity: 0, scale: .88 },
      { opacity: 1, scale: 1, stagger: .04, duration: .35, ease: 'back.out(1.6)',
        scrollTrigger: { trigger: cat, start: 'top 88%', once: true } });
  });

  /* ── Project cards ── */
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: .6, delay: (i % 3) * .1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 92%', once: true } });
  });

  /* ── Contact ── */
  gsap.fromTo('.contact-intro', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .65, ease: 'power3.out',
    scrollTrigger: { trigger: '#contacts', start: 'top 82%', once: true } });
  gsap.fromTo('.contact-form', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .65, delay: .15, ease: 'power3.out',
    scrollTrigger: { trigger: '#contacts', start: 'top 82%', once: true } });
  gsap.utils.toArray('.contact-link').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: .45, delay: .2 + i * .08, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-links', start: 'top 88%', once: true } });
  });
  gsap.utils.toArray('.form-field').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: .4, delay: .15 + i * .07, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 88%', once: true } });
  });

  /* ── Footer ── */
  gsap.fromTo('footer', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .5, ease: 'power2.out',
    scrollTrigger: { trigger: 'footer', start: 'top 95%', once: true } });

  /* ── Button interactions ── */
  addPrimaryHover(document.querySelectorAll('.btn-primary, .nav-cta'));
  addGhostHover(document.querySelectorAll('.btn-ghost'));

  /* ── Arrow hovers ── */
  addArrowHover(document.querySelectorAll('.project-link'));
  addArrowHover(document.querySelectorAll('.view-all-link'));
  addArrowHover(document.querySelectorAll('.hero-avail-cta'));

  /* ── Nav links ── */
  addUnderlineHover(document.querySelectorAll('.nav-links a'));
  document.querySelectorAll('.nav-links a').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(el, { y: -2, duration: .18, ease: 'power1.out' }));
    el.addEventListener('mouseleave', () => gsap.to(el, { y:  0, duration: .2,  ease: 'power1.inOut' }));
  });

  /* ── Contact links ── */
  document.querySelectorAll('.contact-link').forEach(el => {
    const arrow = el.querySelector('.contact-link-arrow');
    el.addEventListener('mouseenter', () => {
      gsap.to(el, { y: -3, duration: .2, ease: 'power2.out' });
      if (arrow) gsap.timeline()
        .to(arrow, { x: 10, opacity: 0, duration: .18, ease: 'power2.in' })
        .set(arrow, { x: -6 })
        .to(arrow,  { x: 0, opacity: 1, duration: .2, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, duration: .22, ease: 'power2.inOut' }));
  });

  /* ── Social icons ── */
  document.querySelectorAll('.hero-socials a').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(el, { scale: 1.25, rotate: 8, duration: .22, ease: 'back.out(2)' }));
    el.addEventListener('mouseleave', () => gsap.to(el, { scale: 1, rotate: 0, duration: .25, ease: 'power2.inOut' }));
  });

  /* ── Skill pills ── */
  document.querySelectorAll('.skill-pill').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(el, { y: -3, scale: 1.05, duration: .18, ease: 'back.out(2)' }));
    el.addEventListener('mouseleave', () => gsap.to(el, { y: 0,  scale: 1,    duration: .22, ease: 'power2.inOut' }));
  });

  /* ── Project cards hover ── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => gsap.to(card, { y: -5, scale: 1.01, duration: .25, ease: 'power2.out' }));
    card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, scale: 1,     duration: .3,  ease: 'power2.inOut' }));
  });

  /* ── Footer links ── */
  addUnderlineHover(document.querySelectorAll('.footer-right a'));

  /* ── Form ── */
  document.querySelectorAll('.form-field input, .form-field textarea').forEach(el => {
    el.addEventListener('focus', () => gsap.to(el, { borderColor: 'rgba(255,255,255,.35)', duration: .25 }));
    el.addEventListener('blur',  () => gsap.to(el, { borderColor: 'rgba(255,255,255,.07)', duration: .25 }));
  });
  document.getElementById('send-btn').addEventListener('click', () => {
    const n = document.getElementById('name').value.trim();
    const e = document.getElementById('email').value.trim();
    const m = document.getElementById('message').value.trim();
    if (!n || !e || !m) {
      gsap.timeline()
        .to('#send-btn', { x:  7, duration: .07 })
        .to('#send-btn', { x: -7, duration: .07 })
        .to('#send-btn', { x:  5, duration: .07 })
        .to('#send-btn', { x: -5, duration: .07 })
        .to('#send-btn', { x:  0, duration: .06 });
      return;
    }
    const btn = document.getElementById('send-btn');
    btn.textContent = 'Sent ✓';
    gsap.to(btn, { opacity: .6, scale: .97, duration: .3, ease: 'power2.out' });
    const msg = document.getElementById('form-msg');
    msg.style.display = 'block';
    gsap.from(msg, { opacity: 0, y: 10, duration: .4, ease: 'power2.out' });
  });

  /* ── Scroll spy ── */
  const allSections = document.querySelectorAll('section[id]');
  const navLinks    = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    allSections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
    });
  }, { passive: true });
})();
