// Load header and footer components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const content = await response.text();
        document.getElementById(elementId).innerHTML = content;
        
        // If this is the header, initialize navigation highlighting
        if (elementId === 'header') {
            initializeNavigation();
        }
    } catch (error) {
        console.error(`Error loading ${componentPath}:`, error);
    }
}

function initializeNavigation() {
    // Add active class to current nav item
    const currentLocation = window.location.pathname;
    const currentPage = currentLocation.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Add smooth scrolling to all links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Add fade-in animation to cards
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Use relative paths so the site works when served from any base URL
    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');
    initializeSmoothScroll();
    initializeCardAnimations();
});
