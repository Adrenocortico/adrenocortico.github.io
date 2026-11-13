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

const MOBILE_NAV_BREAKPOINT = 1280;

// ===============================================
// DOM READY
// ===============================================

let initializeComponentsPromise;

document.addEventListener('DOMContentLoaded', () => {
    initializeComponentsPromise = initializeComponents();
    initializeNavigation();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeCardAnimations();
    initializeStudioExperience();
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
    const normalizePage = (value) => {
        if (!value) return 'index';
        const trimmed = value.replace(/\/+$/, '').replace(/^\/+/, '');
        const base = trimmed.split('/').pop() || '';
        const withoutExt = base.replace(/\.html$/, '');
        return withoutExt || 'index';
    };
    const currentPage = normalizePage(window.location.pathname);
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const normalizedHref = normalizePage(href);
        if (normalizedHref === currentPage) {
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
        if (navLink && !langBtn && window.innerWidth <= MOBILE_NAV_BREAKPOINT) {
            closeMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const wasOpen = document.querySelector('.nav-links')?.classList.contains('active');
            closeMobileMenu();
            if (wasOpen) document.querySelector('.menu-toggle')?.focus();
        }

        if (e.key === 'Tab') {
            keepFocusInsideMobileMenu(e);
        }
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > MOBILE_NAV_BREAKPOINT) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        const isOpen = navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        updateMobileMenuLabel(menuToggle, isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';

        if (isOpen) {
            setTimeout(() => getVisibleMenuItems(navLinks)[0]?.focus(), 80);
        }
    }
}

function getVisibleMenuItems(navLinks) {
    return [...navLinks.querySelectorAll('a, button')]
        .filter(element => window.getComputedStyle(element).display !== 'none');
}

function keepFocusInsideMobileMenu(event) {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks?.classList.contains('active')) return;

    const focusableItems = getVisibleMenuItems(navLinks);
    if (focusableItems.length === 0) return;

    const firstItem = focusableItems[0];
    const lastItem = focusableItems[focusableItems.length - 1];

    if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
    }
}

function closeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        updateMobileMenuLabel(menuToggle, false);
        document.body.style.overflow = '';
    }
}

function updateMobileMenuLabel(menuToggle, isOpen) {
    const key = isOpen ? 'closeMenu' : 'toggleMenu';
    const fallback = isOpen ? 'Close menu' : 'Toggle menu';
    const label = I18N.translations.nav?.[key] || fallback;
    menuToggle.setAttribute('aria-label', label);
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
            if (targetElement.hasAttribute('tabindex')) targetElement.focus({ preventScroll: true });
            targetElement.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
// GITHUB PROJECTS
// ===============================================

async function initializeGitHubProjects() {
    const list = document.getElementById('github-repo-list');
    const fallback = document.getElementById('github-fallback');

    if (!list || !fallback) return;

    const profile = 'Adrenocortico';
    const apiUrl = `https://api.github.com/users/${profile}/repos?per_page=100&sort=updated`;

    const setFallback = (key) => {
        fallback.setAttribute('data-i18n', key);
        if (I18N?.t) {
            fallback.textContent = I18N.t(key);
        }
    };

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Accept: 'application/vnd.github+json'
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos = await response.json();

        if (!Array.isArray(repos) || repos.length === 0) {
            setFallback('projects.githubEmpty');
            return;
        }

        const formatter = new Intl.DateTimeFormat(undefined, {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });

        list.innerHTML = '';

        repos.forEach(repo => {
            if (!repo || !repo.html_url) return;

            const card = document.createElement('article');
            card.className = 'github-repo-card';

            const title = document.createElement('a');
            title.href = repo.html_url;
            title.target = '_blank';
            title.rel = 'noopener';
            title.textContent = repo.name;
            title.className = 'github-repo-title';

            const description = document.createElement('p');
            description.className = 'github-repo-description';
            description.textContent = repo.description || I18N.t('projects.githubNoDescription');

            const meta = document.createElement('div');
            meta.className = 'github-repo-meta';

            if (repo.language) {
                const language = document.createElement('span');
                language.className = 'github-repo-chip';
                language.textContent = `${I18N.t('projects.githubLanguage')}: ${repo.language}`;
                meta.appendChild(language);
            }

            const stars = document.createElement('span');
            stars.className = 'github-repo-chip';
            stars.textContent = `${I18N.t('projects.githubStars')}: ${repo.stargazers_count ?? 0}`;
            meta.appendChild(stars);

            const updated = document.createElement('span');
            updated.className = 'github-repo-chip';
            const updatedDate = repo.pushed_at ? formatter.format(new Date(repo.pushed_at)) : I18N.t('projects.githubUnknown');
            updated.textContent = `${I18N.t('projects.githubUpdated')}: ${updatedDate}`;
            meta.appendChild(updated);

            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(meta);
            list.appendChild(card);
        });

        fallback.remove();
    } catch (error) {
        console.error('Failed to load GitHub repos:', error);
        setFallback('projects.githubError');
    }
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
        const trimmed = path.replace(/\/+$/, '').replace(/^\/+/, '');
        const page = trimmed.split('/').pop() || '';
        const withoutExt = page.replace(/\.html$/, '');
        return withoutExt || 'index';
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

        document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
            const translation = this.t(el.getAttribute('data-i18n-aria-label'));
            if (typeof translation === 'string') el.setAttribute('aria-label', translation);
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
            'index': 'nav.home',
            'insurance': 'nav.insurance',
            'entrepreneurship': 'nav.entrepreneurship',
            'software': 'nav.software',
            'church': 'nav.church',
            'finance': 'nav.finance',
            'projects': 'nav.projects',
            'palio': 'nav.palio',
            'family': 'nav.family'
        };

        // Update main nav links
        document.querySelectorAll('.nav-links a, .explore-nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            const normalizedHref = href.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '') || 'index';
            if (navMappings[normalizedHref]) {
                link.textContent = this.t(navMappings[normalizedHref]);
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
            const isActive = lang === this.currentLang;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });

        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            updateMobileMenuLabel(menuToggle, menuToggle.getAttribute('aria-expanded') === 'true');
        }
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

        // Translate page content and start page-specific data loading deterministically.
        await initializeComponentsPromise;
        this.applyTranslations();
        initializeGitHubProjects();

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

// ===============================================
// CONNECTED WORLDS — procedural sculpture & motion
// ===============================================
function initializeStudioExperience() {
    const scene = document.querySelector('.orbital-scene');
    if (!scene) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pauseButton = scene.querySelector('.motion-toggle');
    let paused = false;
    let refreshScene = () => {};
    const updateMotionControl = () => {
        const stopped = paused || reducedMotion.matches;
        document.body.dataset.motion = stopped ? 'paused' : 'running';
        pauseButton.setAttribute('aria-pressed', String(stopped));
        pauseButton.setAttribute('data-i18n-aria-label', stopped ? 'studio.resumeMotion' : 'studio.pauseMotion');
        pauseButton.setAttribute('aria-label', I18N.t(stopped ? 'studio.resumeMotion' : 'studio.pauseMotion'));
        pauseButton.querySelector('span').textContent = stopped ? '▶' : 'Ⅱ';
        pauseButton.disabled = reducedMotion.matches;
        if (reducedMotion.matches) {
            pauseButton.setAttribute('data-i18n-aria-label', 'studio.reducedMotion');
            pauseButton.setAttribute('aria-label', I18N.t('studio.reducedMotion'));
        }
    };
    // Locale data is asynchronous; keep the HTML label until translations are ready.
    const motionLabelObserver = new MutationObserver(() => {
        updateMotionControl();
    });
    motionLabelObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(element => {
        if (!reducedMotion.matches) element.classList.add('reveal-ready');
        revealObserver.observe(element);
    });

    pauseButton.addEventListener('click', () => {
        paused = !paused;
        updateMotionControl();
        refreshScene();
    });
    reducedMotion.addEventListener('change', () => {
        updateMotionControl();
        refreshScene();
    });

    scene.classList.add('motion-ready');
    const canvas = document.getElementById('systems-canvas');
    const theme = getComputedStyle(document.documentElement);
    const colors = Object.fromEntries(['emerald', 'orange', 'ultramarine-light'].map(name =>
        [name, theme.getPropertyValue(`--${name}`).trim()]));
    const context = canvas.getContext('2d');
    if (!context) return;
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrame = 0;
    let phase = 0;
    let visible = true;
    let pointerX = 0;
    let pointerY = 0;
    let rotationX = 0;
    let rotationY = 0;

    function project(x, y, z, tilt, turn) {
        const x1 = x * Math.cos(turn) + z * Math.sin(turn);
        const z1 = -x * Math.sin(turn) + z * Math.cos(turn);
        const y1 = y * Math.cos(tilt) - z1 * Math.sin(tilt);
        const depth = y * Math.sin(tilt) + z1 * Math.cos(tilt);
        const perspective = 680 / (680 + depth);
        const scale = Math.min(width, height) / 600;
        return { x: width / 2 + x1 * perspective * scale, y: height / 2 + y1 * perspective * scale, depth };
    }

    function draw() {
        context.clearRect(0, 0, width, height);
        const tilt = .85 + rotationY;
        const turn = -.5 + phase * .2 + rotationX;
        // A woven torus: geometry is computed locally, with no model or WebGL dependency.
        const paths = [];
        for (let ring = 0; ring < 56; ring++) {
            const u = ring / 56 * Math.PI * 2;
            const points = [];
            let depth = 0;
            for (let segment = 0; segment <= 64; segment++) {
                const v = segment / 64 * Math.PI * 2;
                const radius = 136 + 58 * Math.cos(v);
                const twist = u + .22 * Math.sin(v + phase * .25);
                const point = project(radius * Math.cos(twist), radius * Math.sin(twist), 58 * Math.sin(v), tilt, turn);
                points.push(point);
                depth += point.depth;
            }
            paths.push({ points, depth: depth / points.length });
        }
        paths.sort((a, b) => b.depth - a.depth).forEach(path => {
            const light = Math.max(.12, Math.min(.8, .45 - path.depth / 460));
            context.strokeStyle = colors.emerald;
            context.globalAlpha = light;
            context.lineWidth = .7;
            context.beginPath();
            path.points.forEach((point, i) => i ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y));
            context.stroke();
        });
        context.globalAlpha = 1;
        // Satellite paths connect the three disciplines around the central system.
        for (let orbit = 0; orbit < 3; orbit++) {
            context.beginPath();
            context.strokeStyle = orbit === 1 ? `${colors['ultramarine-light']}80` : `${colors.orange}60`;
            context.lineWidth = .7;
            for (let step = 0; step <= 120; step++) {
                const angle = step / 120 * Math.PI * 2;
                const point = project(244 * Math.cos(angle), 244 * Math.sin(angle), 0, tilt + orbit * .9, turn + orbit * 1.1);
                if (step === 0) context.moveTo(point.x, point.y); else context.lineTo(point.x, point.y);
            }
            context.stroke();
            const angle = phase * (.3 + orbit * .07) + orbit * 2;
            const satellite = project(244 * Math.cos(angle), 244 * Math.sin(angle), 0, tilt + orbit * .9, turn + orbit * 1.1);
            context.beginPath();
            context.arc(satellite.x, satellite.y, 3, 0, Math.PI * 2);
            context.fillStyle = orbit === 1 ? colors['ultramarine-light'] : colors.orange;
            context.fill();
        }
        const center = project(0, 0, 0, tilt, turn);
        context.fillStyle = '#f3f0e8';
        context.font = `${Math.max(10, width * .022)}px 'DM Mono', monospace`;
        context.textAlign = 'center';
        context.fillText('FD', center.x, center.y + 4);
    }

    function animate(timestamp) {
        frame = 0;
        if (!visible || document.hidden || paused || reducedMotion.matches) return;
        if (timestamp - lastFrame > 32) {
            phase += Math.min((timestamp - lastFrame) / 1000, .05);
            rotationX += (pointerX - rotationX) * .055;
            rotationY += (pointerY - rotationY) * .055;
            draw();
            lastFrame = timestamp;
        }
        frame = requestAnimationFrame(animate);
    }
    function syncAnimation() {
        cancelAnimationFrame(frame);
        frame = 0;
        draw();
        if (visible && !document.hidden && !paused && !reducedMotion.matches) {
            lastFrame = performance.now();
            frame = requestAnimationFrame(animate);
        }
    }
    const resizeObserver = new ResizeObserver(() => {
        width = scene.clientWidth;
        height = scene.clientHeight;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        draw();
        scene.classList.add('canvas-ready');
    });
    resizeObserver.observe(scene);
    const sceneObserver = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        syncAnimation();
    });
    sceneObserver.observe(scene);
    scene.addEventListener('pointermove', event => {
        if (event.pointerType !== 'mouse' || paused || reducedMotion.matches) return;
        const bounds = scene.getBoundingClientRect();
        pointerX = ((event.clientX - bounds.left) / bounds.width - .5) * .65;
        pointerY = ((event.clientY - bounds.top) / bounds.height - .5) * .45;
    });
    scene.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; });
    refreshScene = syncAnimation;
    document.addEventListener('visibilitychange', syncAnimation);
    document.body.dataset.motion = reducedMotion.matches ? 'paused' : 'running';
    syncAnimation();
}
