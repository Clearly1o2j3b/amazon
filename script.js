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
    revealElements();
}

// --- NEW: AMAZON API FUNCTIONS ---

/**
 * Fetches products from Amazon using our secure backend proxy.
 * @param {string} keywords - The search term for products (e.g., "kitchen decor").
 * @param {string} category - The category to search in (e.g., "Home").
 * @param {string} containerId - The ID of the HTML element where products should be displayed.
 */
async function fetchAmazonProducts(keywords, category, containerId) {
    const container = document.getElementById(containerId);
    // Display a loading message
    container.innerHTML = '<p class="text-center text-gray-600">Loading our top picks...</p>';

    try {
        // This is the Axios call to YOUR future backend.
        // It sends the keywords and category to your server.
        const response = await axios.post('/api/search-amazon', {
            keywords: keywords,
            category: category
        });

        // The server will return a list of products.
        const products = response.data;
        displayProducts(products, containerId);

    } catch (error) {
        console.error('Error fetching Amazon products:', error);
        // Display an error message to the user
        container.innerHTML = '<p class="text-center text-red-500">Sorry, we couldn\'t load products right now. Please try again later.</p>';
    }
}

/**
 * Takes product data and displays it on the page by creating HTML cards.
 * @param {Array} products - An array of product objects from the API.
 * @param {string} containerId - The ID of the HTML element to add the product cards to.
 */
function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    // Clear the loading message
    container.innerHTML = '';

    if (!products || products.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-600">No products found.</p>';
        return;
    }

    // Loop through each product and create an HTML card for it.
    products.forEach(product => {
        const productCard = `
            <div class="product-card group bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden reveal reveal-up">
                <a href="${product.url}" target="_blank" rel="noopener noreferrer">
                    <div class="relative">
                        <img src="${product.image}" alt="${product.title}" class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105">
                        ${product.price ? `<div class="price-tag absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium">${product.price}</div>` : ''}
                    </div>
                    <div class="p-6">
                        <h4 class="font-medium text-charcoal mb-2 h-12 overflow-hidden">${product.title}</h4>
                        <div class="flex justify-between items-center mt-4">
                            <div class="flex text-yellow-400">
                                </div>
                            <button class="bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">Shop Now</button>
                        </div>
                    </div>
                </a>
            </div>
        `;
        // Add the new card to the container
        container.innerHTML += productCard;
    });
}


// --- SCROLL-TRIGGERED ANIMATION LOGIC (Unchanged) ---

function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}


// --- INITIALIZATION ---

document.addEventListener('DOMContentLoaded', function() {
    // Start the animation logic
    revealElements();

    // --- NEW: Now, let's fetch products when the page loads ---
    // You would call this for each product section you have.
    // For this to work, you'll need to add a container div with the matching ID in your HTML.
    // e.g., in the "Home Essentials" section, add: <div id="home-essentials-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"></div>
    fetchAmazonProducts('kitchen essentials', 'Home', 'home-essentials-grid');
    fetchAmazonProducts('womens fashion', 'Fashion', 'fashion-finds-grid');
});
