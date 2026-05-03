/* Index page — hero animations, scroll reveals, interactions, form, scroll spy */
(function () {
  gsap.registerPlugin(ScrollTrigger);

  /* ── Word splitter for hero title stagger ── */
 function wrapWords(el) {
  const nodes = [...el.childNodes];
  let html = '';

  nodes.forEach(node => {
    if (node.nodeType === 3) {
      const words = node.textContent.trim().split(/\s+/);
      html += words.map(word =>
        `<span class="word"><span class="word-inner">${word}</span></span>`
      ).join(' ');
    } else if (node.nodeName === 'BR') {
      html += '<br>';
    } else {
      html += node.outerHTML;
    }
  });

  el.innerHTML = html;
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
  (function initForm() {
    const form    = document.getElementById('contact-form');
    const nameEl  = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const msgEl   = document.getElementById('message');
    const btn     = document.getElementById('send-btn');
    const fb      = document.getElementById('form-feedback');
    if (!form) return;

    function setError(id, text) {
      const input = document.getElementById(id);
      input.closest('.form-field').classList.add('has-error');
      document.getElementById('err-' + id).textContent = text;
      gsap.to(input, { borderColor: '#f87171', duration: .2 });
    }

    function clearError(id) {
      const input = document.getElementById(id);
      input.closest('.form-field').classList.remove('has-error');
      document.getElementById('err-' + id).textContent = '';
      gsap.to(input, { borderColor: 'rgba(255,255,255,.07)', duration: .2 });
    }

    function validate() {
      let ok = true;
      ['name', 'email', 'message'].forEach(clearError);
      if (!nameEl.value.trim()) {
        setError('name', 'Name is required.'); ok = false;
      }
      const email = emailEl.value.trim();
      if (!email) {
        setError('email', 'Email is required.'); ok = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('email', 'Enter a valid email address.'); ok = false;
      }
      if (!msgEl.value.trim()) {
        setError('message', 'Message is required.'); ok = false;
      }
      return ok;
    }

    function shake() {
      gsap.timeline()
        .to(btn, { x:  7, duration: .07 })
        .to(btn, { x: -7, duration: .07 })
        .to(btn, { x:  5, duration: .07 })
        .to(btn, { x: -5, duration: .07 })
        .to(btn, { x:  0, duration: .06 });
    }

    function setFeedback(type, text) {
      fb.className = 'form-feedback is-' + type;
      fb.textContent = text;
      fb.style.display = 'block';
      gsap.from(fb, { opacity: 0, y: 8, duration: .35, ease: 'power2.out' });
    }

    function setBusy(busy) {
      btn.disabled = busy;
      btn.textContent = busy ? 'Sending…' : 'Send message';
      gsap.to(btn, { opacity: busy ? .6 : 1, duration: .2 });
    }

    // Focus / blur border colour
    [nameEl, emailEl, msgEl].forEach(el => {
      el.addEventListener('focus', () => gsap.to(el, { borderColor: 'rgba(255,255,255,.35)', duration: .25 }));
      el.addEventListener('blur', () => {
        if (!el.closest('.form-field').classList.contains('has-error'))
          gsap.to(el, { borderColor: 'rgba(255,255,255,.07)', duration: .25 });
      });
      // Clear error as soon as user starts correcting
      el.addEventListener('input', () => {
        if (el.closest('.form-field').classList.contains('has-error'))
          clearError(el.id);
      });
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      fb.style.display = 'none';

      if (!validate()) { shake(); return; }

      setBusy(true);
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name:    nameEl.value.trim(),
            email:   emailEl.value.trim(),
            message: msgEl.value.trim()
          })
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || 'Server error. Please try again.');
        }

        btn.textContent = 'Sent ✓';
        gsap.to(btn, { opacity: .6, scale: .96, duration: .3, ease: 'power2.out' });
        setFeedback('success', '✓ Message sent — I\'ll get back to you soon.');
        form.reset();
      } catch (err) {
        setBusy(false);
        setFeedback('error',
          err.message === 'Failed to fetch'
            ? 'Network error — check your connection and try again.'
            : err.message || 'Something went wrong. Please try again.'
        );
        shake();
      }
    });
  })();

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
