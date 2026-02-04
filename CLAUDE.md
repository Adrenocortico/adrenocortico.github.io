# CLAUDE.md - AI Assistant Guide

This document provides guidance for AI assistants working with this codebase.

## Project Overview

**Repository:** `adrenocortico.github.io`
**Type:** Static personal portfolio website
**Live URL:** https://francesco.dulio.it (also https://adrenocortico.github.io)
**Owner:** Francesco Dulio
**Hosting:** GitHub Pages with custom domain

This is a modern, bilingual (English/Italian) portfolio website showcasing professional activities across entrepreneurship, insurance, finance, software development, and community involvement.

## Repository Structure

```
adrenocortico.github.io/
├── index.html              # Homepage
├── entrepreneurship.html   # Entrepreneurship section
├── insurance.html          # Insurance/financial sector
├── finance.html            # Finance and investing
├── software.html           # Software development
├── projects.html           # Project portfolio (with GitHub API integration)
├── palio.html              # Palio of Vigevano
├── church.html             # Church/faith activities
├── family.html             # Family page
├── CNAME                   # Custom domain configuration
├── README.md               # Basic project documentation
├── .gitignore              # Git ignore rules
├── components/
│   ├── header.html         # Reusable navigation header
│   └── footer.html         # Reusable footer
├── styles/
│   └── main.css            # Complete styling (~1,500 lines)
├── scripts/
│   └── main.js             # Application logic (~766 lines)
├── locales/
│   ├── en.json             # English translations
│   └── it.json             # Italian translations
└── assets/
    └── images/             # Hero images and assets
```

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern features (Grid, Flexbox, CSS Variables, glass-morphism)
- **Vanilla JavaScript** - ES6+ modules, no frameworks
- **Font Awesome 6.0.0** - Icon library (loaded via CDN)
- **Google Fonts** - Inter and Space Grotesk typefaces

**No build tools** - This is a pure static site with no npm, webpack, or bundlers.

## Key Conventions

### CSS Design System

Design tokens are defined as CSS custom properties in `styles/main.css`:

```css
/* Colors */
--primary-color: #6366f1     /* Indigo */
--secondary-color: #06b6d4   /* Cyan */
--accent-color: #f59e0b      /* Amber */
--bg-color: #0a0a0f          /* Dark background */

/* Spacing */
--space-xs: 0.25rem
--space-sm: 0.5rem
--space-md: 1rem
--space-lg: 1.5rem
--space-xl: 2rem
--space-2xl: 3rem

/* Transitions */
--transition-fast: 0.2s ease
--transition-normal: 0.3s ease
--transition-slow: 0.5s ease
```

### CSS Class Naming

- BEM-like patterns: `.hero-refined`, `.nav-links`, `.github-repo-card`
- Modifier classes: `.scrolled`, `.mobile-menu-open`, `.active`
- Data attributes for JS targeting: `data-i18n`, `data-lang`, `data-i18n-list`

### JavaScript Patterns

- **Configuration at top** - `CONFIG` object in main.js contains tunable parameters
- **I18N object** - Central internationalization system
- **Async/await** - For component loading and API calls
- **Event delegation** - Document-level event handlers
- **Intersection Observer** - For lazy animations
- **RequestAnimationFrame** - For smooth cursor animations

### Internationalization (i18n)

The site supports English and Italian via JSON locale files:

```html
<!-- Text content -->
<span data-i18n="nav.home">Home</span>

<!-- List items -->
<ul data-i18n-list="section.items"></ul>

<!-- HTML content (allows <br> tags) -->
<p data-i18n-html="section.description"></p>
```

Language preference is stored in `localStorage` under key `preferredLang`.

### File Organization

- **One HTML file per page** - Each section has its own file
- **Single CSS file** - All styles in `main.css`
- **Single JS file** - All logic in `main.js`
- **Locale files** - Parallel structure in `en.json` and `it.json`

## Development Workflow

### Local Development

1. Open any HTML file directly in a browser, or
2. Use a local server (for proper component loading):
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

### Making Changes

**HTML Pages:**
- Copy structure from existing pages for consistency
- Include proper meta tags for SEO
- Use `data-i18n` attributes for translatable text

**CSS:**
- Use existing CSS variables for colors and spacing
- Mobile breakpoint is at `768px`
- Respect `prefers-reduced-motion` for animations

**JavaScript:**
- Add new functionality to `main.js`
- Follow existing patterns for consistency
- Use async/await for asynchronous operations

**Translations:**
- Update both `locales/en.json` and `locales/it.json`
- Keep key structure parallel between files
- Test both languages after changes

### Deployment

Push to `master` branch - GitHub Pages automatically deploys.

## Important Files

| File | Purpose |
|------|---------|
| `scripts/main.js` | All JavaScript logic including i18n, animations, GitHub API |
| `styles/main.css` | Complete styling and design system |
| `locales/en.json` | English translations (338 lines) |
| `locales/it.json` | Italian translations (338 lines) |
| `components/header.html` | Navigation component (loaded dynamically) |
| `CNAME` | Custom domain configuration |

## Key Features to Understand

### 1. Component Loading
Header and footer are loaded dynamically via fetch:
```javascript
await loadComponent('#header', 'components/header.html');
```

### 2. GitHub Integration
The projects page fetches repositories from GitHub API:
```javascript
const response = await fetch('https://api.github.com/users/adrenocortico/repos');
```

### 3. Visual Effects
- **Cursor glow** - Custom trailing cursor effect
- **Parallax scrolling** - Different intensity for homepage vs subpages
- **Card animations** - Staggered fade-in with IntersectionObserver

### 4. Responsive Design
- Mobile menu toggle at 768px breakpoint
- Hamburger icon replaces navigation links
- Touch-friendly tap targets

## Common Tasks

### Adding a New Page

1. Create `newpage.html` based on existing page structure
2. Add navigation link in `components/header.html`
3. Add translations to both locale files
4. Add any page-specific styles to `main.css`

### Adding Translations

1. Add keys to `locales/en.json`:
   ```json
   "newSection": {
     "title": "English Title",
     "description": "English description"
   }
   ```
2. Add parallel keys to `locales/it.json`:
   ```json
   "newSection": {
     "title": "Titolo Italiano",
     "description": "Descrizione italiana"
   }
   ```
3. Use in HTML: `<h2 data-i18n="newSection.title"></h2>`

### Modifying Styles

1. Check existing CSS variables first
2. Add new styles following existing patterns
3. Test at both desktop and mobile (768px) breakpoints
4. Ensure animations respect `prefers-reduced-motion`

## Testing

**No automated testing exists.** Manual testing checklist:

- [ ] Test in Chrome, Firefox, Safari
- [ ] Test responsive layout (desktop + mobile)
- [ ] Test both English and Italian languages
- [ ] Test all navigation links
- [ ] Test GitHub API integration on projects page
- [ ] Verify animations work (and are disabled with reduced motion)

## Git Conventions

- **Main branch:** `master`
- **Commit messages:** Mixed Italian/English (informal)
- **Feature branches:** Use `claude/` prefix for AI-assisted work

## Things to Avoid

1. **Don't add build tools** - Keep this as a pure static site
2. **Don't add npm/package.json** - No dependencies to manage
3. **Don't break i18n** - Always update both locale files
4. **Don't hardcode text** - Use `data-i18n` attributes
5. **Don't ignore accessibility** - Maintain semantic HTML and ARIA attributes
6. **Don't forget mobile** - Test at 768px breakpoint

## Performance Considerations

- No bundling - files served as-is
- External fonts/icons from CDN
- Images in `assets/images/`
- Passive event listeners for scroll handlers
- Respects `prefers-reduced-motion` media query

## External Dependencies (CDN)

```html
<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Quick Reference

| Action | Location |
|--------|----------|
| Change colors | `styles/main.css` (CSS variables at top) |
| Add translations | `locales/en.json` + `locales/it.json` |
| Modify navigation | `components/header.html` |
| Add JavaScript feature | `scripts/main.js` |
| Update footer | `components/footer.html` |
| Change domain | `CNAME` file |
