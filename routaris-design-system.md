# Routaris – Design System & Brand Tokens

> Dieses Dokument definiert alle visuellen Regeln für Routaris.
> Es dient als Referenz für die Entwicklung und kann als Kontext in Claude Code / CLAUDE.md eingebunden werden.

---

## 1. Brand Identity

**Name:** Routaris (ein Wort, CamelCase)
**Tagline:** "Plan your journey"
**Positionierung:** Premium, editorial, travel-magazine aesthetic
**Ton:** Warm, kompetent, einladend – wie ein gut informierter Reisefreund

### Logos
- **Icon Logo:** Organischer Globus aus fließenden Linien mit Terracotta-Pin auf der Oberfläche. Verwendet für Favicon, App-Icon, Social Media Avatar.
- **Wordmark Logo:** "Routaris" in Serif-Typografie mit gepunkteter Bogenlinie (teal) die in einem Terracotta-Pin endet. Verwendet für Website-Header, Footer, Drucksachen.
- **Dateien:**
  - `CI/logo-icon.png` (128px), `CI/logo-icon-64.png` (64px), `CI/logo-icon-512.png` (512px)
  - `CI/logo-header.png` (250px breit, für Header)
  - `CI/logo-hero.png` (450px breit, für Hero)
  - `CI/logo-wordmark.png` (800px breit, vollständig)
  - Originale: `CI/Logo.png`, `CI/Logo weiss.png`, `CI/Wordicon.png`

---

## 2. Farbpalette

### CSS Custom Properties

```css
:root {
  /* === PRIMARY === */
  --color-cream:       #FAF3E8;  /* Hintergrund, Basis */
  --color-charcoal:    #2D2D2D;  /* Primärer Text, Headlines */
  --color-teal:        #2A6B6B;  /* Akzent, Links, interaktive Elemente */
  --color-terracotta:  #C4654A;  /* Highlights, CTAs, Pins, Buttons */

  /* === SUPPORTING === */
  --color-sand:        #E8DFD0;  /* Card-Hintergründe, Borders, Dividers */
  --color-sage:        #8FAE8B;  /* Erfolg, Natur-Tags, positive States */

  /* === EXTENDED (abgeleitet) === */
  --color-cream-dark:  #F0E8D8;  /* Hover-State auf Cream */
  --color-teal-light:  #E8F0F0;  /* Teal als Hintergrund (10% Opacity) */
  --color-teal-dark:   #1E4F4F;  /* Teal für Hover/Active States */
  --color-terra-light: #F5E0D8;  /* Terracotta als dezenter Hintergrund */
  --color-terra-dark:  #A84E36;  /* Terracotta Hover */
  --color-text-muted:  #6B6560;  /* Sekundärer Text, Captions */
  --color-overlay:     rgba(45, 45, 45, 0.6);  /* Modale Overlays */

  /* === SEMANTISCH === */
  --color-bg:          var(--color-cream);
  --color-text:        var(--color-charcoal);
  --color-accent:      var(--color-teal);
  --color-cta:         var(--color-terracotta);
  --color-success:     var(--color-sage);
  --color-card-bg:     var(--color-sand);
  --color-border:      var(--color-sand);
}
```

### Verwendungsregeln
| Element | Farbe | Hinweis |
|---|---|---|
| Seitenhintergrund | Cream | Immer, kein reines Weiß |
| Fließtext | Charcoal | Nicht Schwarz (#000) |
| Headlines | Charcoal | Gleich wie Fließtext |
| Links | Teal | Hover: Teal-dark |
| Primärer Button | Terracotta (bg) + Weiß (text) | Hover: Terra-dark |
| Sekundärer Button | Transparent + Teal (border/text) | Hover: Teal-light bg |
| Karten | Sand (bg) | Subtiler Schatten |
| Tags/Chips | Teal-light (bg) + Teal (text) | Rounded, klein |
| Karten-Pin auf Karte | Terracotta | Konsistent mit Logo |
| Erfolg/Bestätigung | Sage | Sparsam einsetzen |
| Dekorative Route-Linie | Teal, gepunktet | Marken-Element! |

---

## 3. Typografie

### Font Stack

```css
:root {
  --font-display: 'DM Serif Display', Georgia, 'Times New Roman', serif;
  --font-body:    'Instrument Sans', 'Segoe UI', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;
}
```

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Typografie-Skala

```css
:root {
  /* === FONT SIZES === */
  --text-xs:    0.75rem;   /* 12px – Captions, Labels */
  --text-sm:    0.875rem;  /* 14px – Small Text, Tags */
  --text-base:  1rem;      /* 16px – Body Text */
  --text-lg:    1.125rem;  /* 18px – Large Body */
  --text-xl:    1.25rem;   /* 20px – H4, Subtitles */
  --text-2xl:   1.5rem;    /* 24px – H3 */
  --text-3xl:   1.875rem;  /* 30px – H2 */
  --text-4xl:   2.25rem;   /* 36px – H1 */
  --text-5xl:   3rem;      /* 48px – Hero Headlines */
  --text-6xl:   3.75rem;   /* 60px – Hero XL (Landing) */

  /* === LINE HEIGHTS === */
  --leading-tight:   1.2;   /* Headlines */
  --leading-normal:  1.5;   /* Body Text */
  --leading-relaxed: 1.75;  /* Lange Textabschnitte */

  /* === LETTER SPACING === */
  --tracking-tight:  -0.02em;  /* Display Headlines */
  --tracking-normal:  0;       /* Body */
  --tracking-wide:    0.05em;  /* Uppercase Labels, Tags */
}
```

### Anwendung

| Element | Font | Größe | Gewicht | Spacing |
|---|---|---|---|---|
| Hero Headline | DM Serif Display | 5xl–6xl | 400 (Regular) | tracking-tight |
| H1 | DM Serif Display | 4xl | 400 | tracking-tight |
| H2 | DM Serif Display | 3xl | 400 | tracking-tight |
| H3 | DM Serif Display | 2xl | 400 | normal |
| H4 / Subtitle | Instrument Sans | xl | 600 (SemiBold) | normal |
| Body | Instrument Sans | base | 400 | normal |
| Body Bold | Instrument Sans | base | 600 | normal |
| Small / Caption | Instrument Sans | sm | 400 | normal |
| Label / Tag | Instrument Sans | xs | 600 | tracking-wide, uppercase |
| Button Text | Instrument Sans | sm–base | 600 | tracking-wide |

---

## 4. Spacing & Layout

### Spacing-Skala (8px Basis)

```css
:root {
  --space-1:   0.25rem;  /* 4px */
  --space-2:   0.5rem;   /* 8px */
  --space-3:   0.75rem;  /* 12px */
  --space-4:   1rem;     /* 16px */
  --space-5:   1.25rem;  /* 20px */
  --space-6:   1.5rem;   /* 24px */
  --space-8:   2rem;     /* 32px */
  --space-10:  2.5rem;   /* 40px */
  --space-12:  3rem;     /* 48px */
  --space-16:  4rem;     /* 64px */
  --space-20:  5rem;     /* 80px */
  --space-24:  6rem;     /* 96px */
}
```

### Layout

```css
:root {
  --max-width:       1200px;   /* Content Max-Width */
  --max-width-text:  720px;    /* Fließtext Max-Width */
  --gutter:          var(--space-6);  /* 24px Standard-Gutter */
  --section-gap:     var(--space-16); /* 64px zwischen Sektionen */
  --card-padding:    var(--space-6);  /* 24px in Cards */
}
```

### Breakpoints

```css
/* Mobile First */
--bp-sm:   640px;   /* Große Smartphones */
--bp-md:   768px;   /* Tablets */
--bp-lg:   1024px;  /* Desktop */
--bp-xl:   1280px;  /* Große Screens */
```

---

## 5. Komponenten

### Buttons

```css
.btn {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  padding: var(--space-3) var(--space-6);
  border-radius: 999px;               /* Pill-Shape */
  transition: all 0.2s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

/* Primary: Terracotta */
.btn-primary {
  background: var(--color-terracotta);
  color: white;
  border-color: var(--color-terracotta);
}
.btn-primary:hover {
  background: var(--color-terra-dark);
  border-color: var(--color-terra-dark);
}

/* Secondary: Teal Outlined */
.btn-secondary {
  background: transparent;
  color: var(--color-teal);
  border-color: var(--color-teal);
}
.btn-secondary:hover {
  background: var(--color-teal-light);
}
```

### Cards

```css
.card {
  background: var(--color-sand);
  border-radius: 12px;
  padding: var(--space-6);
  box-shadow: 0 2px 8px rgba(45, 45, 45, 0.06);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.card:hover {
  box-shadow: 0 4px 16px rgba(45, 45, 45, 0.1);
  transform: translateY(-2px);
}
```

### Tags / Chips

```css
.tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: var(--space-1) var(--space-3);
  border-radius: 999px;
  background: var(--color-teal-light);
  color: var(--color-teal);
}
```

### Dekorative Route-Linie (Brand-Element)

```css
.route-divider {
  border: none;
  border-top: 3px dotted var(--color-teal);
  width: 120px;
  margin: var(--space-8) auto;
  opacity: 0.6;
}
```

### Input Fields

```css
.input {
  font-family: var(--font-body);
  font-size: var(--text-base);
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--color-sand);
  border-radius: 8px;
  background: white;
  color: var(--color-charcoal);
  transition: border-color 0.2s ease;
}
.input:focus {
  outline: none;
  border-color: var(--color-teal);
}
```

---

## 6. Effekte & Texturen

### Grain Overlay (Editorial Texture)

```css
body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
}
```

### Schatten-System

```css
:root {
  --shadow-sm:  0 1px 3px rgba(45, 45, 45, 0.05);
  --shadow-md:  0 2px 8px rgba(45, 45, 45, 0.06);
  --shadow-lg:  0 4px 16px rgba(45, 45, 45, 0.1);
  --shadow-xl:  0 8px 32px rgba(45, 45, 45, 0.12);
}
```

### Border Radius

```css
:root {
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 999px;  /* Pills, Avatare */
}
```

---

## 7. Fotografie & Bildsprache

| Richtung | Beschreibung |
|---|---|
| Warme Töne | Goldene Stunde, warmes natürliches Licht, keine kalten Filter |
| Authentisch | Echte Straßenszenen, lokales Leben, keine Stock-Photo-Ästhetik |
| Aeriale Landschaften | Drohnen-Perspektiven für Routen-Übersichten |
| Menschen im Kontext | Reisende (vor allem Familien) in echten Situationen |
| Keine Übersättigung | Natürliche Farben, leicht entsättigt, passend zum Cream-Ton |

### Bildbehandlung

```css
.photo {
  border-radius: var(--radius-lg);
  filter: saturate(0.9) contrast(1.02);  /* Leicht entsättigt, warm */
}
```

---

## 8. Karten-Styling (Leaflet)

```css
/* CARTO Tiles für warmen, Editorial-Look */
/* URL: https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png */

/* Karten-Pin: Terracotta */
.map-pin {
  color: var(--color-terracotta);
}

/* Route-Linie auf Karte */
.map-route {
  stroke: var(--color-teal);
  stroke-width: 3;
  stroke-dasharray: 8 6;  /* Gepunktet, passend zum Brand */
  opacity: 0.8;
}

/* Karten-Container */
.map-container {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}
```

---

## 9. Animationen

```css
:root {
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast:   150ms;
  --duration-normal: 250ms;
  --duration-slow:   400ms;
}

/* Fade-In für Sektionen */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp var(--duration-slow) var(--ease-default) forwards;
}
```

---

## 10. Do's & Don'ts

### ✓ Do
- Cream als Basis-Hintergrund verwenden, nie reines Weiß
- Großzügigen Whitespace lassen (editorial, luftig)
- Die gepunktete Route-Linie als wiederkehrendes Dekorelement einsetzen
- DM Serif Display nur für Headlines, nie für Body-Text
- Pill-shaped Buttons (border-radius: 999px)
- Kartenansichten mit abgerundeten Ecken und Schatten
- Bilder in warmen, natürlichen Tönen

### ✗ Don't
- Reines Schwarz (#000000) für Text verwenden
- Mehr als 2 Akzentfarben gleichzeitig in einer Sektion
- Generische Stock-Fotos mit kalten Filtern
- Eckige Buttons oder scharfe Kanten
- Gradient-Hintergründe (bleibt flat/cream)
- Zu viele Animationen gleichzeitig
- Sans-Serif für Headlines (immer DM Serif Display)
