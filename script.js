// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Page navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetPage) {
                    section.classList.add('active');
                    // Smooth scroll to top of section
                    window.scrollTo({
                        top: section.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
            
            // Close mobile menu if open
            const menu = document.getElementById('navMenu');
            const menuBtn = document.getElementById('menuBtn');
            const icon = menuBtn.querySelector('i');
            
            if (menu.classList.contains('show')) {
                menu.classList.remove('show');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Mobile menu toggle
    document.getElementById('menuBtn').addEventListener('click', function() {
        const menu = document.getElementById('navMenu');
        menu.classList.toggle('show');
        
        // Toggle menu icon
        const icon = this.querySelector('i');
        if (menu.classList.contains('show')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isOpen = content.classList.contains('open');
            
            // Close all accordions first
            document.querySelectorAll('.accordion-content.open').forEach(acc => {
                if(acc !== content) {
                    acc.classList.remove('open');
                    const prevHeader = acc.previousElementSibling;
                    const prevIcon = prevHeader.querySelector('i');
                    prevIcon.classList.remove('fa-chevron-up');
                    prevIcon.classList.add('fa-chevron-down');
                }
            });
            
            // Toggle clicked accordion
            content.classList.toggle('open');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });
    
    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentTestimonial = index;
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials
    if (testimonials.length > 0) {
        setInterval(() => {
            let nextIndex = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(nextIndex);
        }, 8000);
    }
    
    // Form submissions
    const askForm = document.getElementById('askForm');
    if (askForm) {
        askForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your question! Our midwife team will respond within 48 hours.');
            this.reset();
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing!');
            this.reset();
        });
    }
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = darkModeToggle.querySelector('i');
    
    const enableDarkMode = () => {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    };

    const disableDarkMode = () => {
        document.body.classList.remove('dark-mode');
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    };

    // Check for saved user preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }
    
    darkModeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    
    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Pregnancy tracker simulation
    function updatePregnancyTracker() {
        const currentWeek = 12;
        const totalWeeks = 40;
        const daysLeft = (totalWeeks - currentWeek) * 7;
        const trimester = currentWeek <= 13 ? 1 : currentWeek <= 27 ? 2 : 3;
        const progressPercent = (currentWeek / totalWeeks) * 100;
        
        document.getElementById('currentWeek').textContent = currentWeek;
        document.getElementById('daysLeft').textContent = daysLeft;
        document.getElementById('trimester').textContent = trimester;
        document.getElementById('pregnancyProgress').style.width = `${progressPercent}%`;
    }
    
    if (document.getElementById('pregnancyProgress')) {
        updatePregnancyTracker();
    }
    
    // Daily tips rotation
    const pregnancyTips = [
        "Take prenatal vitamins with at least 400mcg folic acid daily to support neural tube development in early pregnancy.",
        "Practice pelvic floor exercises (Kegels) regularly to prepare for labor and postpartum recovery. Aim for 3 sets of 10-15 contractions daily.",
        "Avoid raw fish, unpasteurized dairy, undercooked meats, and deli meats unless heated to reduce infection risks during pregnancy.",
        "Get adequate sleep by sleeping on your left side to improve circulation to your baby. Use pillows for support between your knees and under your belly.",
        "Stay active with pregnancy-safe exercises like walking, swimming, or prenatal yoga for 30 minutes most days, unless advised otherwise by your provider."
    ];
    
    const nutritionTips = [
        "Include iron-rich foods like spinach, lentils, lean meats, and fortified cereals to prevent anemia. Pair with vitamin C sources to enhance absorption.",
        "Consume calcium-rich foods such as dairy, leafy greens, almonds, and fortified plant milks to support your baby's bone development (1,000mg daily).",
        "Eat small, frequent meals (every 2-3 hours) to manage nausea and maintain steady energy levels. Include protein and complex carbs in each snack.",
        "Stay hydrated with water, herbal teas, and water-rich fruits like watermelon. Aim for at least 8-10 glasses daily, more if exercising or in hot weather.",
        "Choose whole grains over refined grains for sustained energy and fiber to prevent constipation. Options include quinoa, brown rice, oats, and whole wheat."
    ];
    
    function updateDailyTips() {
        const dailyTipEl = document.getElementById('dailyTip');
        const nutritionTipEl = document.getElementById('nutritionTip');

        if (dailyTipEl) {
            const randomPregnancyTip = pregnancyTips[Math.floor(Math.random() * pregnancyTips.length)];
            dailyTipEl.textContent = randomPregnancyTip;
        }

        if (nutritionTipEl) {
            const randomNutritionTip = nutritionTips[Math.floor(Math.random() * nutritionTips.length)];
            nutritionTipEl.textContent = randomNutritionTip;
        }
    }
    
    updateDailyTips();
    setInterval(updateDailyTips, 43200000); // every 12 hours
    
    // Animate elements when they come into view using Intersection Observer
    const animatedElements = document.querySelectorAll('.animate__animated');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
});
