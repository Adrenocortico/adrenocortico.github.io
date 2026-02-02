/**
 * Francesco Dulio Portfolio - Modern Interactive Experience
 * Advanced animations, smooth interactions, and immersive effects
 */

// ===============================================
// CONFIGURATION
// ===============================================

const CONFIG = {
    animation: {
        cardDelay: 100,        // Stagger delay between cards (ms)
        threshold: 0.1,        // Intersection observer threshold
        rootMargin: '0px 0px -50px 0px'
    },
    cursor: {
        enabled: true,
        smoothing: 0.15
    }
};

// ===============================================
// DOM READY
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeComponents();
    initializeNavigation();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeCardAnimations();
    initializeHomepageSections();
    initializeCursorGlow();
    initializeSmoothScroll();
    initializeParallax();
});

// ===============================================
// COMPONENT LOADER
// ===============================================

async function loadComponent(elementId, componentPath) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const response = await fetch(componentPath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const content = await response.text();
        element.innerHTML = content;

        // Re-initialize features after component load
        if (elementId === 'header') {
            initializeNavigation();
            initializeMobileMenu();
            initializeHeaderScroll();
        }

        if (elementId === 'footer') {
            updateFooterYear();
        }
    } catch (error) {
        console.error(`Error loading ${componentPath}:`, error);
    }
}

async function initializeComponents() {
    await Promise.all([
        loadComponent('header', 'components/header.html'),
        loadComponent('footer', 'components/footer.html')
    ]);

    // Dispatch event when all components are loaded
    document.dispatchEvent(new CustomEvent('componentsLoaded'));
}

function updateFooterYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===============================================
// NAVIGATION
// ===============================================

function initializeNavigation() {
    const currentLocation = window.location.pathname;
    const currentPage = currentLocation.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ===============================================
// MOBILE MENU
// ===============================================

let mobileMenuInitialized = false;

function initializeMobileMenu() {
    // Prevent adding multiple listeners
    if (mobileMenuInitialized) return;
    mobileMenuInitialized = true;

    // Use event delegation for dynamically loaded content
    document.addEventListener('click', (e) => {
        const menuToggle = e.target.closest('.menu-toggle');
        const navLink = e.target.closest('.nav-links a');
        const langBtn = e.target.closest('.lang-btn');

        if (menuToggle) {
            toggleMobileMenu();
        }

        // Close menu when clicking nav links (but not language buttons)
        if (navLink && !langBtn && window.innerWidth <= 768) {
            closeMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
}

function closeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===============================================
// SCROLL EFFECTS
// ===============================================

function initializeScrollEffects() {
    initializeHeaderScroll();
}

function initializeHeaderScroll() {
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (header) {
            // Add/remove scrolled class for styling
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

// ===============================================
// CARD ANIMATIONS
// ===============================================

function initializeCardAnimations() {
    const cards = document.querySelectorAll('.card');

    if (cards.length === 0) return;

    // Add stagger classes
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * CONFIG.animation.cardDelay}ms`;
    });

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: CONFIG.animation.threshold,
        rootMargin: CONFIG.animation.rootMargin
    });

    // Observe all cards
    cards.forEach(card => observer.observe(card));
}

// ===============================================
// HOMEPAGE SECTIONS ANIMATION
// ===============================================

function initializeHomepageSections() {
    // Only run on homepage
    if (!document.body.classList.contains('homepage')) return;

    const sections = document.querySelectorAll('.content-section, .signature-section, .human-section, .signal-section, .explore-section');

    if (sections.length === 0) return;

    // Add initial hidden state
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`;
    });

    // Create intersection observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    // Observe all sections
    sections.forEach(section => sectionObserver.observe(section));
}

// ===============================================
// CURSOR GLOW EFFECT
// ===============================================

function initializeCursorGlow() {
    // Skip on touch devices
    if (!CONFIG.cursor.enabled || window.matchMedia('(hover: none)').matches) {
        return;
    }

    // Create cursor glow element
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth animation loop
    function animateCursor() {
        // Lerp for smooth following
        currentX += (mouseX - currentX) * CONFIG.cursor.smoothing;
        currentY += (mouseY - currentY) * CONFIG.cursor.smoothing;

        cursorGlow.style.left = `${currentX}px`;
        cursorGlow.style.top = `${currentY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hide cursor glow when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '1';
    });
}

// ===============================================
// SMOOTH SCROLL
// ===============================================

function initializeSmoothScroll() {
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;

        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ===============================================
// PARALLAX EFFECTS
// ===============================================

function initializeParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Skip aggressive parallax on homepage (refined hero)
    if (hero.classList.contains('hero-refined')) {
        // Use subtle, slower parallax for refined homepage
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.container');

            if (heroContent && scrolled < window.innerHeight) {
                // Much gentler effect - only slight fade
                const opacity = 1 - (scrolled / (window.innerHeight * 1.5));
                heroContent.style.opacity = Math.max(0.3, opacity);
            }
        }, { passive: true });
        return;
    }

    // Standard parallax for other pages
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.container');

        if (heroContent && scrolled < window.innerHeight) {
            const opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            const translateY = scrolled * 0.3;

            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translateY(${translateY}px)`;
        }
    }, { passive: true });
}

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ===============================================
// TEXT ANIMATION (for hero)
// ===============================================

function initializeTextAnimation() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.innerHTML = '';

    // Split text into characters
    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${i * 0.05}s`;
        span.className = 'char-animate';
        heroTitle.appendChild(span);
    });
}

// ===============================================
// PAGE TRANSITION EFFECTS
// ===============================================

// Fade in page on load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(() => {
        const fadeElements = document.querySelectorAll('.fade-up');
        fadeElements.forEach(el => el.classList.add('visible'));
    }, 100);
});

// ===============================================
// PERFORMANCE OPTIMIZATION
// ===============================================

// Reduce animations for users who prefer reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    CONFIG.cursor.enabled = false;
    document.documentElement.style.setProperty('--transition-normal', '0.01s');
    document.documentElement.style.setProperty('--transition-slow', '0.01s');
}

// ===============================================
// INTERNATIONALIZATION (i18n)
// ===============================================

const I18N = {
    currentLang: 'en',
    translations: {},
    supportedLangs: ['en', 'it'],

    // Detect user's preferred language
    detectLanguage() {
        // 1. Check localStorage for saved preference
        const saved = localStorage.getItem('preferred-language');
        if (saved && this.supportedLangs.includes(saved)) {
            return saved;
        }

        // 2. Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();

        // If Italian, return Italian
        if (langCode === 'it') {
            return 'it';
        }

        // Default to English for everyone else
        return 'en';
    },

    // Load translation file
    async loadTranslations(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.translations = await response.json();
            this.currentLang = lang;
            return true;
        } catch (error) {
            console.error(`Error loading translations for ${lang}:`, error);
            // Fallback to English if loading fails
            if (lang !== 'en') {
                return this.loadTranslations('en');
            }
            return false;
        }
    },

    // Get translation by key path (e.g., "nav.home")
    t(keyPath) {
        const keys = keyPath.split('.');
        let value = this.translations;

        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                console.warn(`Translation not found: ${keyPath}`);
                return keyPath;
            }
        }

        return value;
    },

    // Get current page name from URL
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        return page === '' ? 'index' : page;
    },

    // Apply translations to the page
    applyTranslations() {
        const page = this.getCurrentPage();

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && this.translations.meta?.description?.[page]) {
            metaDesc.content = this.translations.meta.description[page];
        }

        // Update page title
        if (this.translations.meta?.title?.[page]) {
            document.title = this.translations.meta.title[page];
        }

        // Apply translations to elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);

            if (typeof translation === 'string') {
                // Check if element should use innerHTML (for <br> tags etc.)
                if (el.hasAttribute('data-i18n-html')) {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        // Apply translations to lists
        document.querySelectorAll('[data-i18n-list]').forEach(ul => {
            const key = ul.getAttribute('data-i18n-list');
            const items = this.t(key);

            if (Array.isArray(items)) {
                const listItems = ul.querySelectorAll('li');
                items.forEach((text, index) => {
                    if (listItems[index]) {
                        listItems[index].textContent = text;
                    }
                });
            }
        });

        // Update navigation links text
        this.updateNavigation();

        // Update language switcher active state
        this.updateLanguageSwitcher();
    },

    // Update navigation text
    updateNavigation() {
        const navMappings = {
            'index.html': 'nav.home',
            'insurance.html': 'nav.insurance',
            'entrepreneurship.html': 'nav.entrepreneurship',
            'software.html': 'nav.software',
            'church.html': 'nav.church',
            'finance.html': 'nav.finance',
            'projects.html': 'nav.projects'
        };

        // Update main nav links
        document.querySelectorAll('.nav-links a, .explore-nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (navMappings[href]) {
                link.textContent = this.t(navMappings[href]);
            }
        });

        // Update explore label
        document.querySelectorAll('.explore-label').forEach(el => {
            el.textContent = this.t('common.explore');
        });
    },

    // Update language switcher UI
    updateLanguageSwitcher() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            if (lang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    },

    // Switch language
    async switchLanguage(lang) {
        if (!this.supportedLangs.includes(lang) || lang === this.currentLang) {
            return;
        }

        // Save preference
        localStorage.setItem('preferred-language', lang);

        // Load new translations
        await this.loadTranslations(lang);

        // Apply to page
        this.applyTranslations();
    },

    // Initialize i18n system
    async init() {
        const lang = this.detectLanguage();
        await this.loadTranslations(lang);

        // Apply translations after components are loaded
        // We use a small delay to ensure header/footer are loaded
        setTimeout(() => {
            this.applyTranslations();
        }, 100);

        // Also apply when components are done loading
        document.addEventListener('componentsLoaded', () => {
            this.applyTranslations();
        });

        // Set up language switcher event delegation
        document.addEventListener('click', (e) => {
            const langBtn = e.target.closest('.lang-btn');
            if (langBtn) {
                const lang = langBtn.getAttribute('data-lang');
                this.switchLanguage(lang);
            }
        });
    }
};

// Initialize i18n on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    I18N.init();
});
