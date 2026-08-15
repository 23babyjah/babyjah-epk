const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canAnimate = !reduceMotion && 'IntersectionObserver' in window;

if (canAnimate) document.documentElement.classList.add('motion-ready');

const setHeaderState = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});

nav?.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  menuButton?.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
});

document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
document.querySelector('[data-year]').textContent = new Date().getFullYear();

if (canAnimate) {
  const revealItems = document.querySelectorAll('[data-reveal]');
  const revealGroups = new Map();
  revealItems.forEach((item) => {
    const trigger = item.closest('section') || item.parentElement;
    if (!revealGroups.has(trigger)) revealGroups.set(trigger, []);
    revealGroups.get(trigger).push(item);
  });
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      revealGroups.get(entry.target).forEach((item) => item.classList.add('is-visible'));
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -4% 0px' });
  revealGroups.forEach((items, trigger) => revealObserver.observe(trigger));

  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = Number(entry.target.dataset.count);
      const suffix = entry.target.dataset.suffix || '';
      const start = performance.now();
      const duration = 850;
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        entry.target.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  counters.forEach((counter) => counterObserver.observe(counter));

  let ticking = false;
  const updateKinetics = () => {
    const maxScroll = document.documentElement.scrollHeight - innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    document.documentElement.style.setProperty('--scroll-progress', progress);
    document.documentElement.style.setProperty('--slice-a', `${scrollY * 0.055}px`);
    document.documentElement.style.setProperty('--slice-b', `${scrollY * -0.035}px`);
    document.querySelectorAll('[data-parallax]').forEach((frame) => {
      const rect = frame.getBoundingClientRect();
      const local = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight));
      frame.style.setProperty('--parallax-y', `${-6 - local * 4}%`);
    });
    ticking = false;
  };
  const requestKinetics = () => {
    if (!ticking) requestAnimationFrame(updateKinetics);
    ticking = true;
  };
  updateKinetics();
  window.addEventListener('scroll', requestKinetics, { passive: true });
  window.addEventListener('resize', requestKinetics);

  const aboutVisual = document.querySelector('[data-about-visual]');
  if (aboutVisual && window.matchMedia('(pointer: fine)').matches) {
    aboutVisual.addEventListener('pointermove', (event) => {
      const bounds = aboutVisual.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 16;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 12;
      aboutVisual.style.setProperty('--about-x', `${x}px`);
      aboutVisual.style.setProperty('--about-y', `${y}px`);
      aboutVisual.style.setProperty('--about-rx', `${x * -0.55}px`);
      aboutVisual.style.setProperty('--about-ry', `${y * -0.55}px`);
      aboutVisual.classList.add('is-active');
    });
    aboutVisual.addEventListener('pointerleave', () => {
      aboutVisual.style.setProperty('--about-x', '0px');
      aboutVisual.style.setProperty('--about-y', '0px');
      aboutVisual.style.setProperty('--about-rx', '0px');
      aboutVisual.style.setProperty('--about-ry', '0px');
      aboutVisual.classList.remove('is-active');
    });
  }
}
