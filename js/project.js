/* Project detail page — fetch project data, render content, animations */
(function () {
  gsap.registerPlugin(ScrollTrigger);

  const pathParts = window.location.pathname.split('/');
  const id = pathParts[pathParts.length - 1];
  const skeleton  = document.getElementById('skeleton');
  const errorState = document.getElementById('error-state');
  const content   = document.getElementById('content');

  gsap.from('nav:not(.drawer)', { y: -20, opacity: 0, duration: .6, ease: 'power3.out', delay: .1 });

  /* ── Data fetching ── */
  function fetchProject(projectId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const project = PROJECTS.find(p => p.id === projectId);
        project ? resolve(project) : reject(new Error('Not found'));
      }, 700);
    });
  }

  function fetchRelated(projectId) {
    return new Promise(resolve => {
      setTimeout(() => resolve(PROJECTS.filter(p => p.id !== projectId).slice(0, 4)), 0);
    });
  }

  /* ── Render ── */
  function render(project, related) {
    document.title = `${project.title} — Enrico`;
    document.querySelector('meta[name="description"]').content = project.summary;

    document.getElementById('hero-breadcrumb').textContent = project.title;
    document.getElementById('hero-title').textContent      = project.title;
    document.getElementById('hero-sub').textContent        = project.subtitle;
    document.getElementById('hero-bg').style.cssText       = `background:${project.gradient};position:absolute;inset:0`;
    document.documentElement.style.setProperty('--accent', project.accent);

    document.getElementById('meta-year').textContent = project.year;
    document.getElementById('meta-type').textContent = project.type;
    const tagsEl = document.getElementById('meta-tags');
    project.tags.forEach(t => {
      const s = document.createElement('span'); s.className = 'tag'; s.textContent = t; tagsEl.appendChild(s);
    });

    const descEl = document.getElementById('project-description');
    project.description.forEach(para => {
      const p = document.createElement('p'); p.textContent = para; descEl.appendChild(p);
    });

    const linksEl = document.getElementById('project-link-btns');
    if (project.links && project.links.length) {
      project.links.forEach((link, i) => {
        const a = document.createElement('a');
        a.href = link.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.className = i === 0 ? 'btn-primary' : 'btn-ghost';
        a.textContent = link.label + ' →';
        linksEl.appendChild(a);
      });
    } else {
      document.getElementById('project-links-section').style.display = 'none';
    }

    const relatedGrid = document.getElementById('related-grid');
    related.forEach(p => {
      const a = document.createElement('a');
      a.className = 'related-card'; a.href = `/project/${p.id}`;
      a.innerHTML = `<div class="related-card-type">${p.type} · ${p.year}</div>
        <div class="related-card-title">${p.title}</div>
        <div class="related-card-arrow">View →</div>`;
      relatedGrid.appendChild(a);
    });

    initGallery(project.images);

    gsap.to(skeleton, {
      opacity: 0, duration: .3, ease: 'power2.in',
      onComplete: () => {
        skeleton.style.display = 'none';
        content.style.display = 'block';
        initAnimations();
      }
    });
  }

  /* ── Gallery (hero image + thumbnail strip + fullscreen modal) ── */
  function initGallery(images) {
    if (!images || images.length === 0) return;

    /* ── 1. Main hero image ── */
    const heroImg     = document.getElementById('hero-main-img');
    const heroOverlay = document.getElementById('hero-overlay');
    if (heroImg) {
      heroImg.src   = images[0];
      heroImg.alt   = 'Project screenshot';
      heroImg.style.display = 'block';
    }
    if (heroOverlay) heroOverlay.style.display = 'block';

    /* ── 2. Thumbnail strip (max 4 visible) ── */
    const thumbsWrap = document.getElementById('hero-thumbs');
    if (thumbsWrap && images.length > 1) {
      const MAX_THUMBS = 4;
      const visible    = images.slice(0, MAX_THUMBS);

      visible.forEach((src, i) => {
        const isLast = i === visible.length - 1;
        const btn    = document.createElement('button');
        btn.className = 'hero-thumb' + (isLast ? ' is-gallery-btn' : '');
        btn.setAttribute('aria-label', isLast ? 'Open gallery' : `View screenshot ${i + 1}`);

        const img = new Image();
        img.src     = src;
        img.loading = 'lazy';
        img.draggable = false;
        btn.appendChild(img);

        /* overlay */
        const overlay = document.createElement('span');
        overlay.className = 'hero-thumb-overlay';
        overlay.innerHTML = `
          <svg class="hero-thumb-overlay-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>
          </svg>
          <span class="hero-thumb-overlay-label">Open Gallery</span>`;
        btn.appendChild(overlay);

        btn.addEventListener('click', () => openModal(i));
        thumbsWrap.appendChild(btn);
      });

      thumbsWrap.style.display = 'flex';
    }

    /* ── 3. Gallery modal (appended to body) ── */
    let current  = 0;
    let isOpen   = false;
    let kbBound  = false;

    const modal = document.createElement('div');
    modal.id        = 'gallery-modal';
    modal.className = 'gallery-modal';
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('role', 'dialog');
    modal.innerHTML = `
      <button class="gallery-close" id="gallery-close" aria-label="Close gallery">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <div class="gallery-stage">
        <div class="gallery-img-wrap" id="gallery-img-wrap">
          <img id="gallery-img" alt="" draggable="false">
        </div>
      </div>
      <button class="gallery-nav gallery-prev" id="gallery-prev" aria-label="Previous image">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button class="gallery-nav gallery-next" id="gallery-next" aria-label="Next image">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      <div class="gallery-counter" id="gallery-counter"></div>`;
    document.body.appendChild(modal);

    const galleryImg = modal.querySelector('#gallery-img');
    const counter    = modal.querySelector('#gallery-counter');

    function updateCounter() {
      if (counter) counter.textContent = `${current + 1} / ${images.length}`;
    }

    function goTo(index) {
      current = (index + images.length) % images.length;
      gsap.to(galleryImg, {
        opacity: 0, x: index > current ? -20 : 20, duration: .18, ease: 'power2.in',
        onComplete: () => {
          galleryImg.src = images[current];
          gsap.fromTo(galleryImg,
            { opacity: 0, x: index > current ? 20 : -20 },
            { opacity: 1, x: 0, duration: .28, ease: 'power2.out' });
        }
      });
      updateCounter();
    }

    function openModal(startIndex = 0) {
      current = startIndex;
      galleryImg.src = images[current];
      updateCounter();
      document.body.style.overflow = 'hidden';
      isOpen = true;
      modal.classList.add('is-open');
      gsap.to(modal, { opacity: 1, duration: .3, ease: 'power2.out' });

      if (!kbBound) {
        document.addEventListener('keydown', onKey);
        kbBound = true;
      }
    }

    function closeModal() {
      isOpen = false;
      gsap.to(modal, {
        opacity: 0, duration: .25, ease: 'power2.in',
        onComplete: () => {
          modal.classList.remove('is-open');
          document.body.style.overflow = '';
        }
      });
    }

    function onKey(e) {
      if (!isOpen) return;
      if (e.key === 'Escape')     closeModal();
      if (e.key === 'ArrowLeft')  goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    }

    modal.querySelector('#gallery-close').addEventListener('click', closeModal);
    modal.querySelector('#gallery-prev').addEventListener('click', () => goTo(current - 1));
    modal.querySelector('#gallery-next').addEventListener('click', () => goTo(current + 1));

    /* Click backdrop (outside image) to close */
    modal.addEventListener('click', e => {
      if (e.target === modal || e.target.classList.contains('gallery-stage'))
        closeModal();
    });

    /* Touch swipe in modal */
    let touchStartX = 0;
    modal.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    modal.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? goTo(current + 1) : goTo(current - 1);
    }, { passive: true });

    /* Hide prev/next when only 1 image */
    if (images.length === 1) {
      modal.querySelector('#gallery-prev').style.display = 'none';
      modal.querySelector('#gallery-next').style.display = 'none';
      if (counter) counter.style.display = 'none';
    }

    /* Clicking anywhere in the hero (outside text/buttons/thumbs) opens gallery */
    const heroEl = document.getElementById('project-hero');
    if (heroEl) {
      heroEl.style.cursor = 'pointer';
      heroEl.addEventListener('click', e => {
        if (!e.target.closest('a, button, .hero-thumbs, .project-hero-content'))
          openModal(0);
      });
    }
  }

  /* ── Page animations (called after content renders) ── */
  function initAnimations() {
    gsap.timeline({ defaults: { ease: 'power3.out' }, delay: .05 })
      .fromTo('.breadcrumb',         { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: .45 })
      .fromTo('.project-hero-title', { opacity: 0, y: 36  }, { opacity: 1, y: 0, duration: .7  }, '-=.2')
      .fromTo('.project-hero-sub',   { opacity: 0, y: 18  }, { opacity: 1, y: 0, duration: .5  }, '-=.3');

    gsap.fromTo('.meta-bar', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .55, ease: 'power2.out',
      scrollTrigger: { trigger: '.meta-bar', start: 'top 88%', once: true } });

    gsap.utils.toArray('#meta-tags .tag').forEach((t, i) =>
      gsap.fromTo(t, { opacity: 0, scale: .8 },
        { opacity: 1, scale: 1, duration: .3, delay: i * .05, ease: 'back.out(1.6)',
          scrollTrigger: { trigger: '.meta-bar', start: 'top 88%', once: true } }));

    gsap.utils.toArray('#project-description p').forEach((p, i) =>
      gsap.fromTo(p, { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: .55, delay: i * .1, ease: 'power2.out',
          scrollTrigger: { trigger: p, start: 'top 90%', once: true } }));

    gsap.fromTo('.project-links-section', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .5, ease: 'power2.out',
      scrollTrigger: { trigger: '.project-links-section', start: 'top 90%', once: true } });

    gsap.fromTo('.related-label', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .45, ease: 'power2.out',
      scrollTrigger: { trigger: '.related-section', start: 'top 88%', once: true } });

    gsap.utils.toArray('.related-card').forEach((card, i) =>
      gsap.fromTo(card, { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: .45, delay: i * .1, ease: 'power3.out',
          scrollTrigger: { trigger: '.related-grid', start: 'top 90%', once: true } }));

    addPrimaryHover(document.querySelectorAll('.btn-primary'));
    addGhostHover(document.querySelectorAll('.btn-ghost'));
    addArrowHover(document.querySelectorAll('.btn-primary, .btn-ghost'));
    addUnderlineHover(document.querySelectorAll('.footer-right a'));

    document.querySelectorAll('.related-card').forEach(el => {
      const arrow = el.querySelector('.related-card-arrow');
      el.addEventListener('mouseenter', () => {
        gsap.to(el, { y: -4, duration: .2, ease: 'power2.out' });
        if (arrow) gsap.timeline()
          .to(arrow, { x: 10, opacity: 0, duration: .16, ease: 'power2.in' })
          .set(arrow, { x: -6 })
          .to(arrow,  { x: 0, opacity: 1, duration: .2,  ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, duration: .22, ease: 'power2.inOut' }));
    });

    const navBack = document.querySelector('.nav-back');
    if (navBack) {
      navBack.innerHTML = navBack.innerHTML.replace('←', '<span class="back-arrow" style="display:inline-block">←</span>');
      const ba = navBack.querySelector('.back-arrow');
      navBack.addEventListener('mouseenter', () => {
        gsap.to(ba,     { x: -5, duration: .2,  ease: 'power2.out' });
        gsap.to(navBack, { x: -3, duration: .2,  ease: 'power2.out' });
      });
      navBack.addEventListener('mouseleave', () => {
        gsap.to(ba,     { x: 0, duration: .22, ease: 'power2.inOut' });
        gsap.to(navBack, { x: 0, duration: .22, ease: 'power2.inOut' });
      });
    }
  }

  /* ── Error state ── */
  function showError() {
    gsap.to(skeleton, {
      opacity: 0, duration: .3,
      onComplete: () => {
        skeleton.style.display = 'none';
        errorState.style.display = 'block';
        gsap.from('.error-state', { opacity: 0, y: 24, duration: .5, ease: 'power2.out' });
        addGhostHover(document.querySelectorAll('.btn-ghost'));
      }
    });
  }

  if (!id) { showError(); return; }
  Promise.all([fetchProject(id), fetchRelated(id)])
    .then(([project, related]) => render(project, related))
    .catch(() => showError());
})();
