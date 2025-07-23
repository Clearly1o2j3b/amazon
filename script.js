document.addEventListener('DOMContentLoaded', () => {
    // --- Loading Screen ---
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        loadingScreen.classList.add('hidden');
    });

    // --- Sticky Header ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    mobileMenuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // --- Search Bar Toggle ---
    const searchToggle = document.getElementById('search-toggle');
    const searchBar = document.getElementById('search-bar');
    searchToggle.addEventListener('click', () => {
        searchBar.classList.toggle('active');
    });

    // --- Product Filtering ---
    const filterTabs = document.querySelectorAll('.filter-tab');
    const productCards = document.querySelectorAll('.product-card');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.dataset.filter;
            productCards.forEach(card => {
                const category = card.dataset.category;
                const show = filter === 'all' || filter === category;
                card.style.display = show ? 'block' : 'none';
            });
        });
    });

    // --- Newsletter Form ---
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput.value && emailInput.value.includes('@')) {
                alert('Thank you for subscribing!');
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // --- Scroll Reveal Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTopButton.classList.toggle('visible', window.scrollY > 300);
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
