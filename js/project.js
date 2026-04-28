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

    gsap.to(skeleton, {
      opacity: 0, duration: .3, ease: 'power2.in',
      onComplete: () => {
        skeleton.style.display = 'none';
        content.style.display = 'block';
        initAnimations();
      }
    });
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
