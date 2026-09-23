const btn = document.querySelector('.menu-toggle');
const closeBtn = document.querySelector('.menu-close');
const nav = document.querySelector('.nav');
const header = document.querySelector('.site-header');
const background = [header, document.querySelector('main'), document.querySelector('footer')].filter(Boolean);

function closeMenu() {
  if (!nav || !btn || !nav.classList.contains('open')) return;
  background.forEach(el => { el.inert = false; });
  btn.focus({ preventScroll: true });
  nav.classList.remove('open');
  nav.inert = true;
  nav.setAttribute('aria-hidden', 'true');
  btn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

if (btn && nav && closeBtn) {
  btn.addEventListener('click', () => {
    nav.inert = false;
    nav.removeAttribute('aria-hidden');
    nav.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    closeBtn.focus({ preventScroll: true });
    background.forEach(el => { el.inert = true; });
  });
  closeBtn.addEventListener('click', closeMenu);
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    closeMenu();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  }));
  document.addEventListener('pointerdown', event => {
    if (!nav.classList.contains('open') || nav.contains(event.target)) return;
    closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (!nav.classList.contains('open')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
    }
    if (event.key === 'Tab') {
      const items = [...nav.querySelectorAll('button, a[href]')];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  });
  nav.inert = true;
  nav.setAttribute('aria-hidden', 'true');
  document.documentElement.classList.add('menu-ready');
}

function updateHeader() {
  if (header) header.classList.toggle('scrolled', window.scrollY > 24);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Content stays visible even if scripts or observers fail; animation is optional.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}
