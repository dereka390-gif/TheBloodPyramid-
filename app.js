const btn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (btn && nav) {
  btn.addEventListener('click', () => nav.classList.toggle('open'));
}

document.querySelectorAll('.nav a').forEach(a => {
  a.addEventListener('click', () => {
    if (nav) nav.classList.remove('open');
  });
});
