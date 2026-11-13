# Francesco Dulio's Personal Portfolio

This is the repository for my personal website, hosted on GitHub Pages. The site showcases my various professional activities and interests, including:

- 🛡️ Insurance
- 💼 Entrepreneurship
- 💻 Software Development
- ⛪ Church Activities
- 📈 Finance
- 🚀 Projects

## Website Structure

- `index.html`: Main homepage
- `styles/`: Contains CSS files
- `scripts/`: Contains JavaScript files

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Font Awesome for icons
- GitHub Pages for hosting

## How to View the Site

The site is accessible at: https://adrenocortico.github.io

## Modalità di test (locale)

Per testare il sito in locale con un server statico:

```bash
python3 -m http.server 8000
```

Apri poi: `http://localhost:8000`

## Identità visiva e interazioni

Il sistema **Connected worlds** è descritto in [DESIGN.md](DESIGN.md): homepage editoriale, illustrazioni dei progetti e scultura orbitale procedurale, senza dipendenze JavaScript aggiuntive. Tipografia e palette sono condivise con le pagine interne.

- I testi sono in `locales/it.json` e `locales/en.json` (nuove sezioni: `studio`).
- Il pulsante nella scena orbitale mette in pausa le animazioni decorative.
- La preferenza di sistema per il movimento ridotto disabilita le animazioni.
- La scultura interrompe il rendering fuori schermo e nelle schede non visibili.
- I link interni usano file `.html`, utilizzabili anche con il server statico locale.
- I collegamenti di “Mi trovi anche qui” sono sempre visibili; gli appuntamenti usano Cal.com.

Per la verifica manuale: controllare italiano e inglese, layout a 390/768/1440px, menu da tastiera, pausa/ripresa, movimento ridotto e caricamento dei repository nella pagina Progetti. Nessuna build è necessaria.
