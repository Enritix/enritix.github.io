/* Projects list page — filters, card grid, animations */
(function () {
  gsap.registerPlugin(ScrollTrigger);

  const grid       = document.getElementById('grid');
  const filtersBar = document.getElementById('filters-bar');
  let activeFilter = 'all';
  let soonCard = null;
  let resizeObserver = null;

  /* ── Page entrance animations ── */
  gsap.from('nav:not(.drawer)', { y: -20, opacity: 0, duration: .6, ease: 'power3.out', delay: .1 });
  gsap.timeline({ defaults: { ease: 'power3.out' }, delay: .25 })
    .fromTo('.section-label', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: .5 })
    .fromTo('.page-title',    { opacity: 0, y: 28  }, { opacity: 1, y: 0, duration: .65 }, '-=.25');
  gsap.fromTo('.filters-bar', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .5, delay: .6, ease: 'power2.out' });

  /* ── Filter button hover ── */
  function bindFilterHover() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => gsap.to(btn, { y: -2, scale: 1.04, duration: .16, ease: 'back.out(2)' }));
      btn.addEventListener('mouseleave', () => gsap.to(btn, { y:  0, scale: 1,    duration: .2,  ease: 'power2.inOut' }));
      btn.addEventListener('mousedown',  () => gsap.to(btn, { scale: .94, duration: .08 }));
      btn.addEventListener('mouseup',    () => gsap.to(btn, { scale: 1.04, duration: .14, ease: 'back.out(2)' }));
    });
  }

  /* ── Build a project card ── */
  function buildCard(p) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.type = p.type;
    card.setAttribute('role', 'article');
    card.setAttribute('tabindex', '0');
    card.style.opacity = '0';
    card.innerHTML = `
      <div class="project-img">
        <div class="project-img-placeholder" style="background:${p.gradient};width:100%;height:100%">
          <span style="font-family:'DM Serif Display',serif;font-size:1.4rem;letter-spacing:-.02em;color:${p.accent}">${p.title}</span>
          <span style="font-family:'DM Mono',monospace;font-size:.7rem;color:#8a8880">${p.type}</span>
        </div>
      </div>
      <div class="project-body">
        <div class="project-meta">
          <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          <span class="project-year">${p.year}</span>
        </div>
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.summary}</div>
        <button class="project-link" data-id="${p.id}">View project →</button>
      </div>`;

    card.addEventListener('mouseenter', () => gsap.to(card, { y: -5, scale: 1.01, duration: .22, ease: 'power2.out' }));
    card.addEventListener('mouseleave', () => gsap.to(card, { y:  0, scale: 1,    duration: .28, ease: 'power2.inOut' }));
    card.addEventListener('click', () => navigate(p.id));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') navigate(p.id); });

    const linkBtn = card.querySelector('.project-link');
    linkBtn.addEventListener('click', e => { e.stopPropagation(); navigate(p.id); });
    setTimeout(() => addArrowHover([linkBtn]), 0);
    return card;
  }

  function navigate(id) { window.location.href = `/project/${id}`; }

  /* ── Build filter buttons ── */
  function buildFilters(projects) {
    const types = ['all', ...new Set(projects.map(p => p.type))];
    types.forEach(type => {
      const btn = document.createElement('button');
      btn.className    = 'filter-btn' + (type === 'all' ? ' active' : '');
      btn.textContent  = type === 'all' ? 'All' : type;
      btn.dataset.filter = type;
      btn.addEventListener('click', () => {
        activeFilter = type;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === type));
        applyFilter();
      });
      filtersBar.appendChild(btn);
    });
    gsap.fromTo(filtersBar.querySelectorAll('.filter-btn'),
      { y: 10, opacity: 1 },
      { y: 0, stagger: .05, duration: .35, ease: 'power2.out', delay: .1 });
    bindFilterHover();
  }

  /* ── Filter the grid ── */
  function applyFilter() {
  gsap.globalTimeline.timeScale(1);

  requestAnimationFrame(() => {
    document.querySelectorAll('.project-card').forEach(card => {
      const match = activeFilter === 'all' || card.dataset.type === activeFilter;

      if (match) {
        card.classList.remove('hidden');
        gsap.fromTo(card,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: .25 }
        );
      } else {
        gsap.set(card, { opacity: 0, y: 8 });
        card.classList.add('hidden');
      }
    });

    updateSoonCardLayout(grid, getVisibleCardsCount());
  });
}

  /* ── Load and render projects ── */
  function loadProjects() {
    return new Promise(resolve => setTimeout(() => resolve(PROJECTS), 600));
  }

  loadProjects().then(projects => {
    grid.classList.remove('loading');
    grid.innerHTML = '';
    buildFilters(projects);
    projects.forEach((p, i) => {
      const card = buildCard(p);
      grid.appendChild(card);
      gsap.fromTo(card, { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: .55, delay: (i % 3) * .09, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 92%', once: true } });
    });

    /* ── Coming soon placeholder ── */
    function updateSoonCardLayout(grid, itemsCount) {
  if (!soonCard) return;

  const cols = window.getComputedStyle(grid)
    .getPropertyValue('grid-template-columns')
    .split(' ').length;

  const remainder = itemsCount % cols;

  if (remainder === 0) {
    soonCard.style.gridColumn = '1 / -1';
  } else {
    soonCard.style.gridColumn = `span ${cols - remainder}`;
  }
}

function getVisibleCardsCount() {
  return document.querySelectorAll('.project-card:not(.hidden)').length;
}

    soonCard = document.createElement('div');
soonCard.className = 'card-soon';
soonCard.innerHTML = `
  <div class="card-soon-inner">
    <span class="card-soon-dot"></span>
    <span class="card-soon-title">More coming soon</span>
    <p class="card-soon-sub">New projects are currently in the works.</p>
  </div>`;

grid.appendChild(soonCard);

updateSoonCardLayout(grid, getVisibleCardsCount());

resizeObserver = new ResizeObserver(() => {
  updateSoonCardLayout(grid, getVisibleCardsCount());
});
resizeObserver.observe(grid);

gsap.fromTo(soon, { opacity: 0, y: 32 },
  { opacity: 1, y: 0, duration: .55, delay: (projects.length % 3) * .09,
    ease: 'power3.out', scrollTrigger: { trigger: soon, start: 'top 92%', once: true } });

    addUnderlineHover(document.querySelectorAll('.nav-links a'));
    addUnderlineHover(document.querySelectorAll('.footer-right a'));
    addPrimaryHover(document.querySelectorAll('.nav-cta'));
  });
})();
