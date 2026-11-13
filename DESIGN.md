# Connected worlds — Francesco Dulio

## Direction

A personal editorial atelier: curiosity, practical responsibility and connections between software, business and community. Lead with business direction, people and product decisions, followed by concrete work (Assistudio, ISICOApp, Palio), personal life and contact. StayActive is an explicitly closed chapter. Keep public biographical facts already present in the site; do not publish private operational details from working conversations.

## Visual system

- User palette: emerald `#10b981`, orange `#ff8746`, ultramarine `#3347d6`; lighter blue `#a6b1ff` for small details on dark backgrounds.
- Graphite `#151613` and warm white `#f3f0e8` provide the neutral canvas. Emerald leads the hero, sculpture and primary actions; orange gives rhythm to the strip and personal details; ultramarine anchors the insurance illustration and paper-section emphasis.
- Paper section `#e9e6dc` with ink `#24251f` and ultramarine emphasis `#3347d6`.
- Manrope for large, closely spaced headlines; DM Sans for reading; DM Mono for small labels. Serif italics punctuate the manifesto and contact invitation.
- Wide asymmetric layouts, numbered chapters, generous space and fine rules. Square buttons; avoid a wall of interchangeable cards.
- Project artwork is conceptual CSS/SVG illustration, not a product screenshot or an official brand mark.
- Shared tokens, header and typography extend to every existing page.

## Motion and interaction

The homepage sculpture projects a procedural torus and three satellite orbits onto a 2D canvas. Pointer movement changes its orientation. No Three.js dependency or downloaded model is needed. A static inline SVG remains if canvas is unavailable or JavaScript does not run.

Render at approximately 30 fps, cap pixel ratio at 2 and stop the loop outside the viewport or in hidden tabs. Reveal projects on scroll. Use small hover transformations, a continuous typographic strip and a rotating motif; never intercept normal scrolling.

The pause control stops decorative animation. Respect `prefers-reduced-motion`, including changes made while the page is open. Content remains readable without JavaScript. Maintain visible keyboard focus, skip navigation, the existing mobile focus loop, semantic landmarks, and English/Italian parity.

## Responsive behaviour

Use two hero columns on desktop, stack the text and sculpture below 768px, and stack project artwork above its description. Use a 1280px navigation breakpoint so the larger navigation text has room without crowding. Keep every page available through explicit `.html` links on ordinary static servers as well as GitHub Pages.

## References consulted

- [Taste Skill](https://www.tasteskill.dev/): a deliberate art direction, expressive typography and browser review.
- [Impeccable](https://impeccable.style/): clear hierarchy, useful copy and interaction detail.
- [Awesome DESIGN.md](https://github.com/voltagent/awesome-design-md) and [designmd.ai](https://designmd.ai/): explicit reusable design rules.
- [Refero Styles](https://styles.refero.design/): precision, space and restrained interface details.
- [Kage](https://kage.design/): hero composition and clear calls to action.
- [img2threejs](https://github.com/img2threejs/img2threejs): procedural geometry as an expressive visual element. This implementation uses its own canvas geometry, not that library or its models.

## Editorial voice

Write in the first person, in straightforward Italian and natural English. Describe what Francesco does, why it interests him and who he works with. Show projects and contributions before making claims about qualities. Keep curiosity, room for mistakes and learning visible. Distinguish personal interests from professional expertise and current work from closed projects.

Replace abstract leadership language, blanket technology claims and absolute statements about private routines with concrete, supported examples. Family and faith deserve a personal register, rather than business language. Do not add precise dates, numbers, credentials or intimate details without a source. The public portfolio is a story about the work and the person; internal infrastructure and private working conversations stay outside it.

Public factual references checked during the editorial review (13 November 2026): [Assistudio’s team page](https://assistudiovigevano.com/chi-siamo/) identifies Francesco as a partner; the [Sforzinda association page](https://paliodivigevano.it/lassociazione-sforzinda/) lists him as president for 2023–2025, with the role also reported in his [May 2026 interview in L’Araldo](https://www.araldolomellino.it/territorio/vigevano/il-palio-dei-fanciulli-cambia-volto/). These describe responsibilities; the copy should not inflate them into unsupported performance claims. Interest in physics is described as an interest, not a degree or credential.

## CEO and developer positioning

Francesco explicitly identifies his positioning as CEO-dev. Lead with business responsibilities, choosing priorities, people, product and financial sustainability. Technical ability is a substantial part of how he makes and delivers those decisions. Keep the personal, unpretentious voice.

The homepage presents the working approach before case studies, which start with Assistudio. The business page starts with current work; StayActive remains a closed experience. The software page starts with product decisions and contributions; language/tool details come later. Keep role boundaries explicit: contributing to ISICOApp development does not imply leading ISICO. Do not invent CEO titles for specific organisations, team sizes, financial outcomes or credentials. Family and faith retain their personal register.

## Reading comfort

Use 18px-equivalent body text, 16px-equivalent navigation/actions and at least 14px-equivalent meaningful supporting labels, domains and footer text. Use rem units, with the root at 100%, to respect the browser’s default font-size preference. Keep larger display headings distinct; do not shrink meaningful copy on mobile. Decorative text inside illustrations may be smaller.

Give paragraphs a relaxed line height, let labels and metadata wrap, and keep secondary copy sufficiently bright against graphite. Accommodate enlarged text by increasing spacing or reflowing the layout. The mobile navigation starts at 1280px; keep its JavaScript behaviour and CSS breakpoint aligned.

Scegli Noi is a distinct featured business alongside Assistudio. Francesco confirms that he is a partner and agent, and that the business network became a company with ten insurance agents. The [AXA Mortara agency page](https://agenzie.axa.it/mortara1427) also lists him as an agent and presents ten agents. Link to both this listing and [Scegli Noi](https://sceglinoi.it/); do not infer that all team members are agents or that Francesco developed its website. Social/profile links remain permanently visible, and meeting links use the Cal.com address supplied by Francesco.

The Scegli Noi homepage was rechecked live in a browser with browser caching disabled. It still describes the original network of six agencies, founded in 2021 across Lombardy and Veneto, and collaboration in insurance, financial advisory and long-term rental. The portfolio distinguishes that origin from the current company of ten insurance agents confirmed by Francesco. Use the original site's history and collaborative approach; do not carry over its historical agency/carrier/product counts as present-day company figures. Financial advisory is presented as collaboration with other professionals, not as a personal credential or an invented mandate.
