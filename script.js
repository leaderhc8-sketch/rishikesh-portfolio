const portfolioVisualPolish = document.createElement('style');
portfolioVisualPolish.textContent = `
/* V3.2 visual polish — hero balance + Bolden-inspired spacing */
@media (min-width: 1101px) {
  .site-header {
    top: 22px;
    width: min(1120px, calc(100% - 64px));
  }

  .hero {
    min-height: 100svh;
    padding: 132px 0 82px;
  }

  .hero-layout {
    grid-template-columns: minmax(0, .86fr) minmax(420px, .9fr);
    gap: 54px;
    align-items: center;
  }

  .hero h1 {
    font-size: clamp(58px, 5.85vw, 88px) !important;
    line-height: .92;
    letter-spacing: -.075em;
    max-width: 720px;
  }

  .hero-subcopy {
    max-width: 650px;
    font-size: clamp(16px, 1.25vw, 18px);
    margin-top: 22px;
  }

  .hero-actions {
    margin-top: 28px;
  }

  .hero-showcase {
    min-height: 560px;
    transform: translateY(22px);
  }

  .showcase-main {
    inset: 70px 46px 62px 10px;
    border-radius: 34px;
    transform: rotate(-1.4deg);
  }

  .showcase-tile {
    width: 178px;
    height: 126px;
  }

  .tile-1 {
    right: 8px;
    top: 24px;
  }

  .tile-2 {
    left: 0;
    bottom: 32px;
  }

  .showcase-badge {
    right: 8px;
    bottom: 128px;
  }
}

@media (min-width: 1400px) {
  .hero h1 {
    font-size: clamp(64px, 5.2vw, 96px) !important;
    max-width: 760px;
  }

  .hero-layout {
    grid-template-columns: minmax(0, .9fr) minmax(480px, .92fr);
  }
}

@media (max-width: 1100px) {
  .hero h1 {
    font-size: clamp(44px, 8vw, 74px) !important;
  }

  .hero {
    padding-top: 130px;
  }
}
`;
document.head.appendChild(portfolioVisualPolish);

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
