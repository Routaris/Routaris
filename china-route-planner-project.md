# China Route Planner – Projektinformation

## Vision

Eine Web-App, die Individualreisenden in wenigen Klicks eine maßgeschneiderte China-Route erstellt – visuell ansprechend, mit Tagesplänen, Karte und praktischen Tipps. KI-gestützt, kostenlos nutzbar, China-first.

## Problem

China-Individualreisen zu planen ist komplex: riesige Distanzen, undurchsichtiges Zugnetz, Sprachbarriere, Visa-Regeln, regionale Unterschiede. Die meisten Reisenden buchen deshalb Gruppenreisen oder verbringen Wochen mit Recherche auf Blogs, YouTube und Reddit. Es gibt kein Tool, das schnell eine durchdachte, personalisierte Route generiert.

## Lösung

Ein interaktiver Route Planner mit folgenden Schritten:

1. **Eingabe:** Ankunftsflughafen, Reisedauer, Reisezeitraum, Reisegruppe (mit Kind? Alter?)
2. **Präferenzen:** Schieberegler oder Tags für Kultur / Natur / Geschichte / Stadt / Erholung / Abenteuer
3. **Must-See Auswahl:** Kartenbasierte Vorauswahl der beliebtesten Ziele (Große Mauer, Pandas, Guilin etc.) – Nutzer kann Pflicht-Stopps anpinnen
4. **KI-Routengenerierung:** Auf Basis aller Inputs erstellt die KI 2–3 Routenvorschläge
5. **Ergebnis:** Interaktive Karte mit Route, Stadtbeschreibungen, Highlights pro Stopp, Tagesabläufe, praktische Tipps, Transportverbindungen

## Tech Stack

| Komponente | Technologie |
|---|---|
| Frontend | React (Single Page App) oder statisches HTML/JS |
| KI-Backend | Google Gemini API (Free Tier) – modell-agnostisch austauschbar |
| Karten | Leaflet + OpenStreetMap (CARTO Tiles) |
| Bilder | Wikipedia REST API (dynamisch) |
| Hosting | Vercel / Netlify (kostenlos) |
| Datenbank | Zunächst keine – alles client-side. Später optional Supabase für gespeicherte Routen |

## Wissensbasis (System-Prompt für KI)

Die KI braucht eine kuratierte Datenbasis mit:

- **Alle relevanten Städte/Ziele** mit Koordinaten, Highlights, Familientauglichkeit, beste Reisezeit
- **Transportverbindungen:** Schnellzug-Strecken mit Fahrtzeiten, Inlandsflüge
- **Constraint-Regeln:** Min. 3 Nächte pro Stopp, max. Transportzeit pro Leg, logische Routen-Reihenfolge (nicht kreuz und quer)
- **Saisonale Hinweise:** Kirschblüte, Regenzeit, Golden Week vermeiden etc.

## MVP-Scope (Prototyp v1)

- Nur China
- Ankunft: Shanghai, Peking oder Hongkong
- Reisedauer: 7–35 Tage
- 1 Routenvorschlag (später 2–3)
- Ergebnis: Interaktive Karte + Stopp-Details + Tagesabläufe
- Kein User-Login, kein Speichern, kein PDF-Export

## Spätere Features

- Mehrere Routenvorschläge zum Vergleichen
- PDF-Export der Route als Reise-Broschüre
- Hotel-Empfehlungen (Booking/Trip.com Affiliate)
- Zug-Buchungslinks (12Go Asia Affiliate)
- Gespeicherte Routen (mit Login)
- Erweiterung auf Südostasien, Japan, Indien
- Community: Nutzer teilen ihre Routen

## Monetarisierung (perspektivisch)

| Modell | Details |
|---|---|
| Freemium | Basisroute kostenlos. Detaillierte Tagesabläufe, Hotel-Tipps, PDF-Export hinter Paywall (~5€/Route) |
| Affiliate | Booking.com, Trip.com, 12Go.Asia für Hotel- und Zugbuchungen |
| B2B | Reisebüros nutzen das Tool für Angebotserstellung (White-Label) |

## Zielgruppe

- Erstbesucher in China, die individuell reisen wollen
- Familien mit kleinen Kindern (Nische!)
- Backpacker mit begrenzter Zeit
- Digital Nomads, die 2–4 Wochen bleiben

## Differenzierung

- **Visual-first:** Schön illustrierte Routen statt nüchterner Tabellen
- **China-Expertise:** Kuratierte Datenbasis statt generischer KI-Antworten
- **Familienfreundlich:** Buggy vs. Babytrage, kinderfreundliche Restaurants, Reisezeit-Empfehlungen
- **Kostenlos nutzbar:** Kein Paywall für die Basisroute

## Arbeitstitel

**RouteChina** / **ChinaTrails** / **WanderChina** (noch offen)
