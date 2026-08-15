# babyjah EPK — Design Handoff

## Thesis

Option C is a booking-first, monochrome club poster translated into a responsive EPK. Live photography carries the visual identity; oversized type, hard black/white contrast, and compact proof points make the page feel immediate, credible, and easy for talent buyers to scan.

## Visual World & Layout

The page moves from atmosphere to evidence to action: full-viewport performance hero, career proof strip, sound and track support, venue history, artist bio, then booking. Sections alternate near-black and warm white. Photography is full-bleed or tightly cropped, with restrained saturation and added contrast to preserve an after-dark, documentary feel.

The desktop hero places genre/location at upper left, the booking QR at upper right, the oversized `babyjah` wordmark at lower left, and the primary booking button at lower right. The design uses editorial asymmetry, generous negative space, thin rules, and square corners throughout.

## Type & Color

- Display: `Archivo Black`, used for names, headlines, statistics, and the `B/J` graphic.
- Body/UI: `Archivo` Regular, Semibold, and Bold.
- Fonts are self-hosted in `assets/fonts/` to avoid network dependencies.
- Core tokens: black `#050505`, warm white `#f5f5f0`, light rule `rgba(245,245,240,.22)`.
- Display tracking is tight (`-.04em`); navigation and utility labels are uppercase with wider tracking.

## Responsive Behavior

At `760px` and below, the navigation becomes an accessible disclosure menu, multi-column sections stack, the hero remains poster-like at a fixed minimum height, and the booking CTA becomes full width. The QR remains in the hero's upper-right region and reappears in Contact. The content-heavy About section uses its own 900px breakpoint so its photographic monogram and biography stack before either becomes cramped. Its sound rail retains a 10px minimum utility size and permits safe wrapping at 320px. Fluid `clamp()` sizing controls display type and spacing. Reduced-motion preferences disable smooth scrolling and transitions.

## Motion System

The Kinetic Poster overdrive pass adds one connected motion language: the hero name rises letter-by-letter, clipped `BABYJAH` slices shift with scroll, a continuous genre ribbon bridges the hero and music sections, proof figures count upward once, and editorial blocks reveal through clipped masks or directional movement. The live image uses restrained scroll parallax and a 3px progress rule tracks page position. Motion is progressively enhanced through the `motion-ready` class; content remains fully visible without JavaScript. On mobile, the genre/location label becomes a vertical poster spine to preserve the upper-right QR. `prefers-reduced-motion` removes animation, parallax, and decorative slices.

The About section treats `B/J` as a photographic letterform cut from the hero performance image, with an offset outline and contrasting poster block. A three-part rail—“Groovy low end,” “Four-on-the-floor,” and “Digital distortion”—turns supplied sound language into visible structure. Fine-pointer devices add a restrained opposing parallax between the photo type, outline, and block; touch and reduced-motion experiences remain static.

## Accessibility

The document uses semantic landmarks, a skip link, descriptive image alternatives, visible keyboard focus, and an `aria-expanded` mobile menu. All critical text sits on high-contrast black or white surfaces. Links remain usable without JavaScript; JavaScript only controls the menu, current year, and print dialog.

## Booking QR & Email

`assets/images/booking-qr.svg` is the production QR; `booking-qr.png` is a raster fallback. Both encode a `mailto:` to `23babyjah@gmail.com` with a booking subject and structured inquiry prompts. The hero QR, booking button, and contact email use the same payload. If the address or template changes, regenerate both QR files and update every `mailto:` occurrence in `index.html`. Keep a visible email fallback beside any QR.

## Print / Download

“Print / Save EPK” calls the browser print dialog. The A4 print stylesheet removes navigation and interactive-only controls, converts the hero to grayscale, avoids splitting core sections, and lays content into print-friendly columns. Test both browser preview and “Save as PDF” after changing section height or copy length.

## Asset Map

- `assets/images/`: optimized WebP performance images plus QR files.
- `assets/downloads/`: original-resolution press photos, logo, and the encoded booking link text.
- `assets/fonts/`: self-hosted Archivo family.
- `index.html`: content, metadata, structured data, and outbound links.
- `styles.css`: design tokens, layout, responsive rules, and print treatment.
- `script.js`: small progressive enhancements only.

## Safe Editing

Preserve the hero's four-corner hierarchy, black/white alternation, square geometry, and booking-first flow. Add factual claims only when verified. Optimize new display images to WebP, retain originals in `assets/downloads/`, write specific alt text, and check desktop, mobile, keyboard navigation, QR scanning, mail-client launch, and print preview before release.
