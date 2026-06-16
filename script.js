const headerToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox img');
const closeLightbox = document.querySelector('.lightbox-close');
const year = document.getElementById('year');
const glow = document.querySelector('.cursor-glow');

year.textContent = new Date().getFullYear();

headerToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  headerToggle.classList.toggle('open', isOpen);
  headerToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    headerToggle.classList.remove('open');
    headerToggle.setAttribute('aria-expanded', 'false');
  });
});

const fullMap = {
  leader: 'assets/images/leader-cover.webp',
  isclinical: 'assets/images/isclinical-products.webp',
  asceplus: 'assets/images/asce-srlv.webp',
  jovena: 'assets/images/jovena-device.webp',
  bodystim: 'assets/images/bodystim-device.webp',
  stimprime: 'assets/images/stimprime-hero.webp'
};

function openPreview(src, alt = 'Expanded portfolio visual') {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.showModal();
}

document.querySelectorAll('.case-card').forEach(card => {
  card.querySelector('.image-button')?.addEventListener('click', () => {
    const key = card.dataset.case;
    const image = fullMap[key];
    const alt = card.querySelector('img')?.alt || 'Expanded portfolio visual';
    if (image) openPreview(image, alt);
  });
});

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const image = item.dataset.full;
    const alt = item.querySelector('img')?.alt || 'Expanded portfolio visual';
    openPreview(image, alt);
  });
});

closeLightbox?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', event => {
  const dialogDimensions = lightbox.getBoundingClientRect();
  if (
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom
  ) {
    lightbox.close();
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = Number(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.addEventListener('mousemove', event => {
  if (!glow) return;
  glow.style.transform = `translate(${event.clientX - 160}px, ${event.clientY - 160}px)`;
});
