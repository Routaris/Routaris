# Routaris – KI-gestützter Reiseplaner

## Projektübersicht

Single-Page Web-App (Vanilla HTML/CSS/JS, kein Framework), die Individualreisenden personalisierte Reiserouten erstellt. Multi-Country-Support (aktuell China & Vietnam). KI-gestützt via Google Gemini API. Kostenlos nutzbar, Visual-first, mit Fokus auf Familien und Erstbesucher.

## Projektpfad

```
C:\Users\puetz\Desktop\Reiselust\
```

## Design-System

Alle visuellen Regeln (Farben, Typografie, Spacing, Komponenten, Schatten, Animationen, Do's & Don'ts) sind definiert in:

> **`routaris-design-system.md`** — Single Source of Truth für Brand & Design

Bei Änderungen am Design immer zuerst das Design-System konsultieren. CSS-Variablen in `css/base.css` müssen mit den Tokens aus dem Design-System übereinstimmen.

## Logo-Dateien

Alle Logos liegen im Ordner `CI/`:

| Datei | Verwendung | Größe |
|-------|-----------|-------|
| `CI/routaris-icon-flat.svg` | Flat Vector Icon (transparent) | SVG skalierbar |
| `CI/routaris-icon-3d.png` | 3D App-Icon (Embossed) | 1024x1024 (approx) |
| `CI/routaris-wordmark.svg` | Wordmark mit Tagline (transparent) | SVG skalierbar |
| `CI/Logo.png` | Original Icon-Logo (Globus, cream bg) (alt/legacy) | 2048×2048 |
| `CI/Logo weiss.png` | Icon-Logo auf weißem Hintergrund (alt/legacy) | 2048×2048 |
| `CI/Wordicon.png` | Original Wordmark (cream bg) (alt/legacy) | 3168×1344 |
| `CI/logo-icon.png` | Web-optimiertes Icon (transparent) (alt/legacy) | 128×128 |
| `CI/logo-icon-64.png` | Kleines Icon (Favicon-Größe) (alt/legacy) | 64×64 |
| `CI/logo-icon-512.png` | Großes Icon (Social/OG) (alt/legacy) | 512×512 |
| `CI/logo-header.png` | Wordmark für Header (transparent) (alt/legacy) | 250×106 |
| `CI/logo-hero.png` | Wordmark für Hero-Sektion (transparent) (alt/legacy) | 450×190 |
| `CI/logo-wordmark.png` | Wordmark groß (transparent) (alt/legacy) | 800×339 |

## Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript (modulare Dateien, kein Bundler)
- **Karten:** Leaflet.js + OpenStreetMap (CARTO Light Tiles)
- **KI:** Google Gemini API (Free Tier, gemini-2.5-flash, Thinking Model)
- **Bilder:** Wikipedia REST API (dynamisch)
- **Hosting:** Statische Dateien, deploybar auf Vercel/Netlify
- **Datenbank:** Keine – alles client-side

## Dateistruktur

```
C:\Users\puetz\Desktop\Reiselust\
├── index.html                    # Hauptseite, lädt alle CSS/JS Dateien
├── CLAUDE.md                     # Diese Datei (Projekt-Instruktionen)
├── routaris-design-system.md     # Design-System & Brand Tokens
├── CI/                           # Logo-Dateien (Originale + web-optimiert)
├── css/
│   ├── base.css                  # Reset, CSS-Variablen, Typografie, Grain-Overlay
│   ├── components.css            # Buttons, Cards, Modals, Forms, Slider, Radio-Cards
│   ├── steps.css                 # Styles pro Step (Hero, Formular, Karte, Loading, Results)
│   └── responsive.css            # Media Queries (Tablet ≤1024px, Mobile ≤768px, Small ≤480px)
├── js/
│   ├── app.js                    # Haupt-Controller: globaler State, Step-Navigation, API-Key Modal
│   ├── countries.js              # Multi-Country-Config (Airports, Branding, Map-Center pro Land)
│   ├── destinations.js           # Datenbank China-Ziele (15 Hauptziele + Off-the-beaten-path)
│   ├── vietnam-destinations.js   # Datenbank Vietnam-Ziele (15 Hauptziele + 9 Off-the-beaten-path)
│   ├── preferences.js            # Step 2: Preference-Slider Logik
│   ├── map.js                    # Step 3: Leaflet Must-See-Karte + Destination-Grid + Pin-Logik
│   ├── gemini.js                 # Gemini API: Prompt-Builder, API-Call, Error-Handling
│   ├── results.js                # Step 5: Ergebnis-Rendering (Route-Karte, Stopps, Details)
│   ├── suggestions.js            # KI-Vorschläge: Alternative Ziele nach Routengenerierung
│   └── wiki.js                   # Wikipedia REST API: Thumbnail-Loader für Destinations
└── docs/
    └── vietnam-destinations.md   # Vietnam-Ziele Recherche
```

## Multi-Country-System

Das Projekt unterstützt mehrere Länder über `CountryConfig` in `js/countries.js`. Jedes Land definiert:

```javascript
{
  id: 'china',
  name: 'China',
  brandName: 'Jaderoute',        // Länderspezifischer Sub-Brand
  brandEmoji: '🏯',
  heroTitle: '...',               // Hero-Headline
  expertRole: 'China-Reiseexperte', // Gemini-Prompt Rolle
  countryInText: 'China',        // Für Suchanfragen (Wikipedia etc.)
  mapCenter: [33, 108],          // Leaflet Map Center
  mapZoom: 4,                    // Leaflet Zoom Level
  destinations: [...],           // Referenz auf Destinations-Array
  airports: [...],               // Ankunftsorte (Flughäfen + Freitextfeld)
  defaultAirport: '...',         // Standard-Ankunftsort
  cityPairs: {...}               // Geographische Nachbarschaften für Routing
}
```

**Aktuelle Länder:** China (`Jaderoute`), Vietnam (`Lotusroute`)

## User Flow (5 Steps + Hero)

| Step | Name | Beschreibung |
|------|------|-------------|
| 0 | Hero | Landingpage mit Länderauswahl + CTA "Route planen" |
| 1 | Basics | Ankunftsort, Reisedauer (Slider 7–35), Reisezeitraum, Reisegruppe |
| 2 | Präferenzen | 7 Schieberegler (Kultur, Natur, Geschichte, Großstadt, Erholung, Abenteuer, Kulinarik) |
| 3 | Must-See | Leaflet-Karte + Grid mit Zielen, Nutzer pinnt Pflicht-Stopps |
| 4 | Loading | Ladeanimation mit Phasen-Anzeige, Timer, Fortschrittsbalken |
| 5 | Ergebnis | Route-Karte, Stopp-Pills, Detail-Ansichten, Tagesabläufe, Tipps, Suggestions |

## Globaler State (App.state)

```javascript
App.state = {
  airport: 'Shanghai (Flughafen Pudong)', // Gewählter Ankunftsort (Freitext oder Preset)
  days: 14,                      // 7–35
  season: 'spring',              // 'spring' | 'summer' | 'autumn' | 'winter'
  group: 'solo',                 // 'solo' | 'couple' | 'family' | 'friends'
  childAge: null,                // '0-1' | '1-3' | '3-6' | '6-12' | '12+' | null
  preferences: {
    'Kultur': 5, 'Natur': 5, 'Geschichte': 5,
    'Großstadt': 5, 'Erholung': 3, 'Abenteuer': 3, 'Kulinarik': 5
  },
  pinnedCities: [],              // Array von Destination-IDs
  result: null                   // Gemini API Response (parsed JSON)
};
```

## Destinations-Datenbank

Jedes Ziel hat folgende Felder:
```javascript
{
  id: 'shanghai',                // Eindeutige ID
  name: 'Shanghai',             // Anzeigename
  altName: 'Alternate Name',    // Optional: alternativer Name
  lat: 31.23,                   // Breitengrad
  lng: 121.47,                  // Längengrad
  tags: ['Großstadt', 'Kultur'], // Kategorien (matchbar mit Preferences)
  wiki: 'Shanghai',             // Wikipedia-Artikelname für Thumbnail
  highlights: 'The Bund, Yu-Garten, French Concession',
  family: true,                 // Familientauglich
  offbeat: false,               // Optional: Off-the-beaten-path Ziel
  desc: 'Kurzbeschreibung',
  dayTripFrom: [                // Optional: Tagesausflug möglich von Basis-Stadt
    { base: 'hangzhou', transit: '~1.5h Bus/Taxi' }
  ]
}
```

Ziel-Listen: `js/destinations.js` (China), `js/vietnam-destinations.js` (Vietnam)

## Externe Abhängigkeiten (alle per CDN)

```html
<!-- Google Fonts: DM Serif Display + Instrument Sans -->
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Leaflet -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<!-- LZ-String (URL-Kompression für teilbare Routen) -->
<script src="https://unpkg.com/lz-string@1.5.0/libs/lz-string.min.js"></script>
```

## API-Endpunkte

| API | URL | Zweck |
|-----|-----|-------|
| Gemini | `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key={KEY}` | Routengenerierung |
| Wikipedia | `https://en.wikipedia.org/api/rest_v1/page/summary/{title}` | Destination-Thumbnails |
| CARTO Tiles | `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png` | Kartenansicht |

## Gemini API – Wichtige Details

- **Modell:** gemini-2.5-flash (Thinking Model mit `thinkingConfig`)
- **API Key:** Wird vom Nutzer über ein Modal eingegeben und in `App.apiKey` gespeichert (Variable, nicht localStorage)
- **Request-Format:**
  ```javascript
  {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 1,
      maxOutputTokens: 65536,
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 8192 }
    }
  }
  ```
- **Response parsen:** `data.candidates[0].content.parts` → letzten Part mit `text` finden (nach Thinking-Parts)
- **Fallback:** Markdown-Code-Fences (```json) aus Response entfernen vor dem Parsen
- **Fehler abfangen:** HTTP-Fehler, leere Antwort, ungültiges JSON → nutzerfreundliche Meldung
- **Zwei Prompt-Typen:**
  - `buildPrompt()` — Initiale Routengenerierung
  - `buildAdjustPrompt()` — Route anpassen (bestehende Stopps werden explizit als Pflicht übergeben)

## Gemini JSON-Antwortformat

```json
{
  "routeName": "Name der Route",
  "routeDescription": "Kurzbeschreibung (2-3 Sätze)",
  "totalNights": 13,
  "stops": [
    {
      "city": "Shanghai",
      "nights": 3,
      "lat": 31.23,
      "lng": 121.47,
      "tagline": "Poetische Kurzbeschreibung",
      "highlights": [
        { "icon": "🌃", "title": "The Bund", "description": "Ausführlich, 2-3 Sätze" }
      ],
      "dailyPlan": [
        { "day": 1, "title": "Tagestitel", "activities": "Aktivitäten-Beschreibung" }
      ],
      "tips": [
        { "icon": "🚇", "text": "Praktischer Tipp" }
      ]
    }
  ],
  "legs": [
    { "from": "Shanghai", "to": "Hangzhou", "mode": "train", "duration": "~1h", "cost": "~30€" }
  ]
}
```

## Routing-Regeln (für den Gemini-Prompt)

- Minimum 2 Nächte pro Stopp (bei längeren Reisen min. 3)
- Max. 6h Zugfahrt zwischen zwei Stopps, sonst Inlandsflug empfehlen
- Logische geographische Reihenfolge (nicht kreuz und quer)
- Route startet und endet am gewählten Ankunftsort
- Alle gepinnten Pflicht-Stopps müssen enthalten sein
- Familie mit Kind unter 3: buggyfreundliche Orte, weniger Ortswechsel
- Saisonale Hinweise beachten (Regenzeit, Hitze, Golden Week etc.)
- Tagesausflug-Optionen: Destinations mit `dayTripFrom` können als Tagesausflug ODER eigener Stopp eingeplant werden

## Karten-Darstellung

### Must-See Map (Step 3)
- Map-Center und Zoom kommen aus `CountryConfig.current`
- Marker-Farben: Terracotta = gepinnt, Teal = KI-Vorschlag, Grau = neutral
- Klick auf Marker oder Card toggled Pin-Status

### Ergebnis-Map (Step 5)
- Nummerierte Marker (1, 2, 3, ...) in Terracotta
- Verbindungslinien: durchgezogen Teal = Zug/Bus, gestrichelt Terracotta = Flug
- Klick auf Marker wechselt zur Detail-Ansicht und fliegt Karte dorthin

## Coding-Konventionen

- **Kein Build-Tool** – alle JS-Dateien per `<script>` in index.html eingebunden
- **Globales App-Objekt** – alle Module registrieren sich dort (z.B. `App.map`, `App.results`)
- **CSS-Variablen** für alle Farben und Abstände in `base.css` (gemäß Design-System)
- **ES6+** Syntax (const/let, Arrow Functions, Template Literals, async/await)
- **Keine externen JS-Libraries** außer Leaflet und LZ-String
- **Mobile-first** responsive Design
- **Deutsche UI-Texte** – alle Labels, Buttons, Beschreibungen auf Deutsch
- **Kommentare** auf Deutsch oder Englisch – Hauptsache konsistent pro Datei
- **CountryConfig** für alle länderspezifischen Werte (nie hardcoded "China" oder "Vietnam")
