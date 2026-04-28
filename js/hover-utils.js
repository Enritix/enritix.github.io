/* Shared hover utility functions — used by nav.js and all page scripts */

function addUnderlineHover(els) {
  els.forEach(el => {
    if (el.querySelector('.ul-line')) return;
    el.style.position = 'relative';
    const line = document.createElement('span');
    line.className = 'ul-line';
    line.style.cssText = 'position:absolute;bottom:-1px;left:0;height:1px;width:0;background:currentColor;pointer-events:none';
    el.appendChild(line);
    const ln = el.querySelector('.ul-line');
    el.addEventListener('mouseenter', () => gsap.to(ln, { width: '100%', duration: .3, ease: 'power2.out' }));
    el.addEventListener('mouseleave', () => gsap.to(ln, { width: 0,     duration: .25, ease: 'power2.in' }));
  });
}

function addArrowHover(els) {
  els.forEach(el => {
    if (!el.querySelector('.arrow'))
      el.innerHTML = el.innerHTML.replace(/(→)(?!<)/, '<span class="arrow" style="display:inline-block">→</span>');
    const arrow = el.querySelector('.arrow');
    if (!arrow) return;
    el.addEventListener('mouseenter', () =>
      gsap.timeline()
        .to(arrow, { x: 14, opacity: 0, duration: .18, ease: 'power2.in' })
        .set(arrow, { x: -8 })
        .to(arrow,  { x: 0, opacity: 1, duration: .22, ease: 'power2.out' }));
  });
}

function addPrimaryHover(els) {
  els.forEach(el => {
    el.style.position = 'relative'; el.style.overflow = 'hidden';
    const sw = document.createElement('span');
    sw.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,.12);transform:scaleX(0);transform-origin:left;pointer-events:none;border-radius:inherit';
    el.appendChild(sw);
    el.addEventListener('mouseenter', () => {
      gsap.fromTo(sw, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: .35, ease: 'power2.out' });
      gsap.to(el, { scale: 1.04, duration: .2, ease: 'back.out(2)' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(sw, { scaleX: 0, transformOrigin: 'right', duration: .28, ease: 'power2.in' });
      gsap.to(el, { scale: 1, duration: .22, ease: 'power2.inOut' });
    });
    el.addEventListener('mousedown', () => gsap.to(el, { scale: .96, duration: .1 }));
    el.addEventListener('mouseup',   () => gsap.to(el, { scale: 1.04, duration: .15, ease: 'back.out(2)' }));
  });
}

function addGhostHover(els) {
  els.forEach(el => {
    el.style.position = 'relative'; el.style.overflow = 'hidden';
    const fill = document.createElement('span');
    fill.style.cssText = 'position:absolute;inset:0;background:rgba(255,255,255,.06);transform:scaleX(0);transform-origin:left;pointer-events:none;border-radius:inherit';
    el.appendChild(fill);
    el.addEventListener('mouseenter', () => {
      gsap.to(fill, { scaleX: 1, duration: .32, ease: 'power2.out' });
      gsap.to(el,   { scale: 1.03, y: -2, duration: .2, ease: 'back.out(2)' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(fill, { scaleX: 0, transformOrigin: 'right', duration: .28, ease: 'power2.in' });
      gsap.to(el,   { scale: 1, y: 0, duration: .22, ease: 'power2.inOut' });
    });
    el.addEventListener('mousedown', () => gsap.to(el, { scale: .97, duration: .1 }));
    el.addEventListener('mouseup',   () => gsap.to(el, { scale: 1.03, duration: .15, ease: 'back.out(2)' }));
  });
}
