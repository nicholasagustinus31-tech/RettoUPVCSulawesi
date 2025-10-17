const navToggle = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const scrollIndicator = document.querySelector('.scroll-indicator');
const fadeUpElements = document.querySelectorAll('.fade-up');
const productTabs = document.querySelectorAll('[data-product-tab]');
const productCards = document.querySelectorAll('[data-product-category]');
const captchaCodeEl = document.querySelector('.captcha-code');
const captchaInputEl = document.querySelector('#captcha');
const contactForm = document.querySelector('#contact-form');

function toggleNav() {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
}

if (navToggle) {
  navToggle.addEventListener('click', toggleNav);
}

window.addEventListener('scroll', () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const width = (scrolled / scrollHeight) * 100;
  if (scrollIndicator) {
    scrollIndicator.style.width = `${width}%`;
  }
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: '0px 0px -60px 0px'
  }
);

fadeUpElements.forEach(element => observer.observe(element));

productTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.productTab;

    productTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    productCards.forEach(card => {
      if (category === 'all' || card.dataset.productCategory === category) {
        card.style.display = 'flex';
        requestAnimationFrame(() => {
          card.classList.add('visible');
        });
      } else {
        card.style.display = 'none';
        card.classList.remove('visible');
      }
    });
  });
});

function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  if (captchaCodeEl) {
    captchaCodeEl.textContent = result;
  }
  return result;
}

let currentCaptcha = generateCaptcha();

if (captchaCodeEl && captchaCodeEl.dataset.timestamp) {
  currentCaptcha = captchaCodeEl.dataset.timestamp;
}

const refreshCaptchaBtn = document.querySelector('[data-refresh-captcha]');
if (refreshCaptchaBtn) {
  refreshCaptchaBtn.addEventListener('click', () => {
    currentCaptcha = generateCaptcha();
    if (captchaInputEl) {
      captchaInputEl.value = '';
      captchaInputEl.focus();
    }
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    const value = captchaInputEl ? captchaInputEl.value.trim().toUpperCase() : '';
    if (value !== currentCaptcha) {
      event.preventDefault();
      if (captchaInputEl) {
        captchaInputEl.classList.add('error');
        captchaInputEl.setCustomValidity('Captcha tidak sesuai, silakan coba lagi.');
        captchaInputEl.reportValidity();
        captchaInputEl.value = '';
      }
      currentCaptcha = generateCaptcha();
    } else {
      if (captchaInputEl) {
        captchaInputEl.classList.remove('error');
        captchaInputEl.setCustomValidity('');
      }
    }
  });
}

const yearEl = document.querySelector('[data-current-year]');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks && navLinks.classList.contains('open')) {
      toggleNav();
    }
  });
});
