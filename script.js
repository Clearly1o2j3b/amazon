// --- EXISTING FUNCTIONS (Mostly Unchanged) ---

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Section navigation
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    window.scrollTo(0, 0);

    // After showing a new section, re-run the reveal check
    // This is important for elements that are at the top of a new "page"
    revealElements();
}

// Home Essentials subcategories
function showSubcategory(category) {
    document.querySelectorAll('.subcategory-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.subcategory-btn[data-category="${category}"]`).classList.add('active');
    document.querySelectorAll('.subcategory-content').forEach(content => {
        content.classList.add('hidden');
    });
    document.getElementById(`${category}-products`).classList.remove('hidden');
}

// Fashion Finds subcategories
function showFashionSubcategory(category) {
    document.querySelectorAll('.fashion-subcategory-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.fashion-subcategory-btn[data-category="${category}"]`).classList.add('active');
    document.querySelectorAll('.fashion-subcategory-content').forEach(content => {
        content.classList.add('hidden');
    });
    document.getElementById(`${category}-products`).classList.remove('hidden');
}

// Slider navigation
function scrollSlider(sliderId, amount) {
    const slider = document.getElementById(sliderId);
    slider.scrollBy({ left: amount, behavior: 'smooth' });
}


// --- NEW: SCROLL-TRIGGERED ANIMATION LOGIC ---

// This function will handle adding the 'active' class to elements when they come into view
function revealElements() {
    // Select all elements that have the "reveal" class
    const reveals = document.querySelectorAll('.reveal');

    // Create a new "observer"
    const observer = new IntersectionObserver(entries => {
        // Loop over each element that the observer is watching
        entries.forEach(entry => {
            // If the element is now visible in the viewport...
            if (entry.isIntersecting) {
                // ...add the 'active' class to it.
                entry.target.classList.add('active');
                 // Optional: Stop observing the element after it has been revealed once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Tell the observer to watch each of our "reveal" elements
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}


// --- INITIALIZATION ---

// When the page is fully loaded...
document.addEventListener('DOMContentLoaded', function() {
    // Set up the default tabs
    if(document.querySelector('.subcategory-btn')) {
      showSubcategory('kitchen');
    }
    if(document.querySelector('.fashion-subcategory-btn')) {
      showFashionSubcategory('womens');
    }
    
    // Start the animation logic
    revealElements();
});// --- EXISTING FUNCTIONS (Mostly Unchanged) ---

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Section navigation
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    window.scrollTo(0, 0);

    // After showing a new section, re-run the reveal check
    // This is important for elements that are at the top of a new "page"
    revealElements();
}

// Home Essentials subcategories
function showSubcategory(category) {
    document.querySelectorAll('.subcategory-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.subcategory-btn[data-category="${category}"]`).classList.add('active');
    document.querySelectorAll('.subcategory-content').forEach(content => {
        content.classList.add('hidden');
    });
    document.getElementById(`${category}-products`).classList.remove('hidden');
}

// Fashion Finds subcategories
function showFashionSubcategory(category) {
    document.querySelectorAll('.fashion-subcategory-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.fashion-subcategory-btn[data-category="${category}"]`).classList.add('active');
    document.querySelectorAll('.fashion-subcategory-content').forEach(content => {
        content.classList.add('hidden');
    });
    document.getElementById(`${category}-products`).classList.remove('hidden');
}

// Slider navigation
function scrollSlider(sliderId, amount) {
    const slider = document.getElementById(sliderId);
    slider.scrollBy({ left: amount, behavior: 'smooth' });
}


// --- NEW: SCROLL-TRIGGERED ANIMATION LOGIC ---

// This function will handle adding the 'active' class to elements when they come into view
function revealElements() {
    // Select all elements that have the "reveal" class
    const reveals = document.querySelectorAll('.reveal');

    // Create a new "observer"
    const observer = new IntersectionObserver(entries => {
        // Loop over each element that the observer is watching
        entries.forEach(entry => {
            // If the element is now visible in the viewport...
            if (entry.isIntersecting) {
                // ...add the 'active' class to it.
                entry.target.classList.add('active');
                 // Optional: Stop observing the element after it has been revealed once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Tell the observer to watch each of our "reveal" elements
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}


// --- INITIALIZATION ---

// When the page is fully loaded...
document.addEventListener('DOMContentLoaded', function() {
    // Set up the default tabs
    if(document.querySelector('.subcategory-btn')) {
      showSubcategory('kitchen');
    }
    if(document.querySelector('.fashion-subcategory-btn')) {
      showFashionSubcategory('womens');
    }
    
    // Start the animation logic
    revealElements();
});
