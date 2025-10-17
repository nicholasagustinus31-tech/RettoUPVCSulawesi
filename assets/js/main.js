document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const navToggle = document.querySelector('.nav-toggle');
    const siteNav = document.querySelector('.site-nav');
    const navLinks = document.querySelectorAll('.site-nav a');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = siteNav.classList.toggle('open');
            body.classList.toggle('nav-open', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (siteNav.classList.contains('open')) {
                siteNav.classList.remove('open');
                body.classList.remove('nav-open');
                navToggle?.setAttribute('aria-expanded', 'false');
            }
        });
    });

    const animatedElements = document.querySelectorAll('.animate');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -10% 0px'
        }
    );

    animatedElements.forEach((el) => observer.observe(el));

    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length && galleryItems.length) {
        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const category = button.dataset.filter;

                filterButtons.forEach((btn) => btn.classList.remove('active'));
                button.classList.add('active');

                galleryItems.forEach((item) => {
                    const itemCategory = item.dataset.category;
                    const showItem = category === 'all' || itemCategory === category;
                    item.style.display = showItem ? 'block' : 'none';
                });
            });
        });
    }

    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    const form = document.getElementById('contact-form');
    if (form) {
        const captchaQuestion = document.getElementById('captcha-question');
        const captchaInput = document.getElementById('captcha');
        const refreshCaptcha = document.getElementById('refresh-captcha');
        const feedback = form.querySelector('.form-feedback');
        const consent = document.getElementById('consent');
        let captchaAnswer = 0;

        const generateCaptcha = () => {
            const first = Math.floor(Math.random() * 9) + 1;
            const second = Math.floor(Math.random() * 9) + 1;
            const operators = ['+', '−'];
            const operator = operators[Math.floor(Math.random() * operators.length)];
            captchaAnswer = operator === '+' ? first + second : first - second;
            captchaQuestion.textContent = `${first} ${operator} ${second} = ?`;
            captchaInput.value = '';
            captchaInput.focus();
        };

        generateCaptcha();

        refreshCaptcha?.addEventListener('click', generateCaptcha);

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            feedback.textContent = '';
            feedback.classList.remove('error', 'success');

            if (!consent.checked) {
                feedback.textContent = 'Mohon setujui kebijakan privasi sebelum mengirim pesan.';
                feedback.classList.add('error');
                return;
            }

            const userAnswer = Number(captchaInput.value);
            if (Number.isNaN(userAnswer) || userAnswer !== captchaAnswer) {
                feedback.textContent = 'Jawaban captcha tidak sesuai. Silakan coba lagi.';
                feedback.classList.add('error');
                generateCaptcha();
                return;
            }

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.table(data);

            feedback.textContent = 'Terima kasih! Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.';
            feedback.classList.add('success');
            form.reset();
            generateCaptcha();
        });
    }
});
