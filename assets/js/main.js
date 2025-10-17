const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const captchaWrappers = document.querySelectorAll('[data-captcha]');
  captchaWrappers.forEach(wrapper => {
    const questionEl = wrapper.querySelector('[data-captcha-question]');
    const inputEl = wrapper.querySelector('input');
    const form = wrapper.closest('form');
    const submitMessage = wrapper.querySelector('[data-captcha-message]');

    function generateCaptcha() {
      const a = Math.floor(Math.random() * 8) + 1;
      const b = Math.floor(Math.random() * 8) + 1;
      wrapper.dataset.answer = String(a + b);
      if (questionEl) {
        questionEl.textContent = `${a} + ${b}`;
      }
      if (inputEl) {
        inputEl.value = '';
      }
      if (submitMessage) {
        submitMessage.textContent = '';
      }
    }

    generateCaptcha();

    if (form) {
      form.addEventListener('submit', event => {
        if (!inputEl || inputEl.value.trim() !== wrapper.dataset.answer) {
          event.preventDefault();
          if (submitMessage) {
            submitMessage.textContent = 'Jawaban captcha salah. Silakan coba lagi.';
            submitMessage.style.color = 'var(--brand-red)';
          }
          generateCaptcha();
        }
      });
    }
  });
});
