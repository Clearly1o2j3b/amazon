// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Section navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

// Home Essentials subcategories
function showSubcategory(category) {
    // Remove active class from all buttons
    document.querySelectorAll('.subcategory-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add active class to clicked button
    document.querySelector(`.subcategory-btn[data-category="${category}"]`).classList.add('active');

    // Hide all subcategory contents
    document.querySelectorAll('.subcategory-content').forEach(content => {
        content.classList.add('hidden');
    });

    // Show selected subcategory content
    document.getElementById(`${category}-products`).classList.remove('hidden');
}

// Fashion Finds subcategories
function showFashionSubcategory(category) {
    // Remove active class from all buttons
    document.querySelectorAll('.fashion-subcategory-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add active class to clicked button
    document.querySelector(`.fashion-subcategory-btn[data-category="${category}"]`).classList.add('active');

    // Hide all subcategory contents
    document.querySelectorAll('.fashion-subcategory-content').forEach(content => {
        content.classList.add('hidden');
    });

    // Show selected subcategory content
    document.getElementById(`${category}-products`).classList.remove('hidden');
}

// Slider navigation
function scrollSlider(sliderId, amount) {
    const slider = document.getElementById(sliderId);
    slider.scrollBy({ left: amount, behavior: 'smooth' });
}

// Initialize first subcategory as active when the page loads
document.addEventListener('DOMContentLoaded', function() {
    showSubcategory('kitchen');
    showFashionSubcategory('womens');
});
