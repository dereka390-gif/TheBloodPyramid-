const btn = document.querySelector('.menu-toggle');
const closeBtn = document.querySelector('.menu-close');
const nav = document.querySelector('.nav');
const header = document.querySelector('.site-header');

function closeMenu() {
  if (!nav || !btn) return;
  nav.classList.remove('open');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

if (btn && nav) {
  btn.addEventListener('click', event => {
    event.stopPropagation();
    const isOpen = nav.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', closeMenu);
}

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', closeMenu));

// Close the mobile menu whenever the user taps the visible webpage outside the menu panel.
document.addEventListener('pointerdown', event => {
  if (!nav || !nav.classList.contains('open')) return;
  if (nav.contains(event.target) || (btn && btn.contains(event.target))) return;
  closeMenu();
});

window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
  reveals.forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -28px 0px' });

  reveals.forEach(el => observer.observe(el));
}

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
