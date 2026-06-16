const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.site-nav a');
const yearTarget = document.getElementById('year');
const cursorGlow = document.querySelector('.cursor-glow');
const reveals = document.querySelectorAll('.reveal');
const filterButtons = document.querySelectorAll('.filter-btn');
const workPieces = document.querySelectorAll('.work-piece');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = document.querySelector('.lightbox-close');

if (yearTarget) yearTarget.textContent = new Date().getFullYear();

navToggle?.addEventListener('click', () => {
  const isOpen = body.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach(link => link.addEventListener('click', () => {
  body.classList.remove('nav-open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

window.addEventListener('mousemove', (event) => {
  if (!cursorGlow || window.innerWidth < 1000) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay ? Number(entry.target.dataset.delay) : 0;
      setTimeout(() => entry.target.classList.add('is-visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

reveals.forEach(item => revealObserver.observe(item));

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    workPieces.forEach(piece => {
      const tags = piece.dataset.filter || '';
      const matches = filter === 'all' || tags.includes(filter);
      piece.classList.toggle('is-hidden', !matches);
    });
  });
});

workPieces.forEach(piece => {
  piece.addEventListener('click', () => {
    const source = piece.dataset.full;
    if (!source || !lightbox || !lightboxImage) return;
    lightboxImage.src = source;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  setTimeout(() => { lightboxImage.src = ''; }, 120);
};

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});
