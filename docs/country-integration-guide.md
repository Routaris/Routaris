# Neues Land integrieren – Recherche & Implementierung

Dieser Leitfaden definiert den vollständigen Workflow, um ein neues Land in Routaris einzubauen. Jeder Schritt muss abgearbeitet werden, bevor der nächste beginnt.

---

## Phase 1: Recherche

Alle Daten werden gesammelt, bevor eine einzige Zeile Code geschrieben wird.

### 1.1 Branding & Identität

| Frage | Ergebnis |
|-------|---------|
| Welches kulturelle Symbol repräsentiert das Land? (Emoji) | → `brandEmoji` |
| Poetischer Sub-Brand-Name? (Muster: Landestypisches Element + Route/Pfad/Weg) | → `brandName` |
| Hero-Headline mit `<em>`-Highlight? | → `heroTitle` |
| Hero-Untertitel (1 Satz, CTA-orientiert)? | → `heroSubtitle` |
| Marketing-Einzeiler für Footer? | → `brandDescription` |
| Gemini-Rollenbezeichnung? (z.B. "Thailand-Reiseexperte") | → `expertRole` |
| Landesname für Textreferenzen und Wiki-Suche? | → `countryInText` |

### 1.2 Geographie & Karte

| Frage | Ergebnis |
|-------|---------|
| Zentrum des touristisch relevanten Gebiets? (Dezimalgrad) | → `mapCenter` [lat, lng] |
| Leaflet-Zoom, der das ganze Land mit Rand zeigt? (4 = groß, 5 = mittel, 6 = klein) | → `mapZoom` |
| Landesform? (lang/schmal, kompakt, Inselgruppe — beeinflusst Routing-Logik) | → Notiz für Routing |

### 1.3 Ankunftsorte (Flughäfen)

4–6 internationale Flughäfen, die von Europa/Nordamerika direkt oder mit einem Umstieg erreichbar sind.

Pro Flughafen:

| Feld | Beispiel |
|------|---------|
| IATA-Code | `bkk` |
| Stadt-Label | `Bangkok` |
| Beschreibung | `Flughafen BKK` |
| Vollständiger Wert (für State) | `Bangkok (Flughafen Suvarnabhumi)` |

Zusätzlich:
- Welcher Flughafen ist der häufigste Einstiegspunkt? → `defaultAirport`
- Mapping: Welche Airport-Stadt gehört zu welcher Destination-ID? → `airportDestMap`
- Gibt es relevante Landgrenzen als alternative Ankunftsorte? (z.B. Grenzübergang per Zug)

### 1.4 Transport-Infrastruktur

**Kernfrage:** Wie bewegen sich Individualreisende realistisch durch dieses Land?

| Frage | Ergebnis |
|-------|---------|
| Gibt es ein Fernzugnetz? Qualität, Abdeckung, wichtige Strecken? | → Kontext für `transportRules()` |
| Fernbusse / Sleeper Busse / Open Tour Busse? | → Kontext für `transportRules()` |
| Inlandsflüge: Welche Routen, welche Airlines, Preisniveau? | → Kontext für `transportRules()` |
| Fähren / Boote als reguläres Transportmittel? | → ggf. neuer `legMode` |
| Besondere Transportmittel? (Motorrad-Tour, Tuk-Tuk, Minivan, Speedboat) | → ggf. neuer `legMode` |
| Ab welcher Distanz/Fahrzeit wird ein Inlandsflug sinnvoll? | → Default für `trainMaxHours` |

**Daraus ableiten:**

- **3–4 Transport-Präferenzen als Radio-Cards** (`transportModes[]`)
  - Nicht von anderem Land kopieren — die Optionen müssen die Reiserealität abbilden
  - Jede Option: `id`, `icon`, `label`, `desc`
- **Default-Transport** (`defaultTransport`)
- **Prompt-Texte**: `transportPrompt()` (kurz, für Gemini-Kontext) und `transportRules()` (ausführlich, Routing-Regeln für Gemini)
- **Leg-Modes**: Pipe-separierte Liste aller Transportmittel, die in Ergebnissen vorkommen können (`legModes`, z.B. `'train|bus|flight'`)

**Prüfen:** Falls ein neues Transportmittel eingeführt wird, das noch nicht existiert — notieren! Es muss dann an 5 Stellen in `results.js` ergänzt werden (siehe Phase 3).

Aktuell unterstützte Modes: `train`, `flight`, `bus`, `sleeper_bus`, `boat`, `motorbike`

### 1.5 Destinations-Datenbank

**Der Hauptaufwand.** Minimum 15 Hauptziele + 8 Off-the-beaten-path Ziele.

#### Pro Destination:

| Feld | Beschreibung | Pflicht |
|------|-------------|---------|
| `id` | Eindeutige kebab-case ID (z.B. `chiang-mai`) | Ja |
| `name` | Anzeigename auf Deutsch | Ja |
| `altName` | Alternativer Name (z.B. `Saigon` für Ho-Chi-Minh-Stadt) | Nein |
| `lat` | Breitengrad (Dezimal, 4 Nachkommastellen) | Ja |
| `lng` | Längengrad (Dezimal, 4 Nachkommastellen) | Ja |
| `tags` | 1–3 Tags aus den 7 fixen Kategorien (siehe unten) | Ja |
| `wiki` | **Exakter** englischer Wikipedia-Artikelname | Ja |
| `highlights` | Top-3-4 Sehenswürdigkeiten, kommasepariert | Ja |
| `desc` | Kurzbeschreibung, 1–2 Sätze, deutsch, emotional | Ja |
| `family` | `true` wenn familientauglich (Buggy, sicher, kinderfreundlich) | Ja |
| `offbeat` | `true` für weniger bekannte Ziele | Nur bei Offbeat |
| `dayTripFrom` | Array: `[{ base: 'id', transit: '~Xh Bus/Zug' }]` | Nein |

#### Fixe Tag-Kategorien (keine anderen erlaubt):

`Kultur` · `Natur` · `Geschichte` · `Großstadt` · `Erholung` · `Abenteuer` · `Kulinarik`

#### Qualitätsregeln:

- Jeder Tag muss bei mindestens 3 Destinations vorkommen (damit Preference-Slider wirken)
- Falls ein Tag für das Land kaum relevant ist (z.B. "Großstadt" bei Laos): bewusst entscheiden — lieber 2 Destinations als erzwungene Tags
- Koordinaten per Stichprobe auf Google Maps/OpenStreetMap verifizieren
- `wiki`-Feld: Auf `en.wikipedia.org/wiki/{titel}` prüfen, ob der Artikel existiert **UND ein Bild hat**
- `family`-Flag konservativ setzen — nur `true` wenn Buggys realistisch nutzbar, keine gefährlichen Wege, kinderfreundliche Aktivitäten
- `dayTripFrom` nur wenn die Fahrzeit ≤3h beträgt und der Ausflug realistisch an einem Tag machbar ist

### 1.6 City Pairs (Routing-Geographie)

Welche Destinations sind per Boden-Transport in ≤6h verbunden?

Format: Objekt, das jede Destination-ID auf ein Array von Nachbar-IDs mappt.

**Regeln:**
- Bidirektional: Wenn A→B, dann auch B→A
- Nur realistische Verbindungen (existierende Zug-/Busrouten)
- Haupt-Reisekorridore identifizieren (z.B. Nord→Süd-Route entlang der Küste)
- Sackgassen markieren (Orte mit nur einer Verbindung — beeinflusst Routing)

### 1.7 Saisonale Besonderheiten

Pro Jahreszeit prüfen, ob es **Warnungen oder Besonderheiten** gibt, die Gemini kennen muss:

| Jahreszeit | Frage |
|-----------|-------|
| Frühling | Beste Reisezeit? Feiertage? (z.B. Songkran in Thailand) |
| Sommer | Extreme Hitze? Monsun? Welche Regionen betroffen? |
| Herbst | Taifun-/Zyklon-Saison? Feiertage mit Massentourismus? |
| Winter | Kälte im Norden? Trockenzeit im Süden? Hochsaison? |

Zusätzlich:
- Regionale Klimaunterschiede? (Nord vs. Süd, Küste vs. Berge)
- Nationale Feiertage mit extremem Andrang? (Daten + Auswirkung)

**Format:** Pro relevante Saison ein konkreter Warntext (deutsch), der als `if`-Block in `gemini.js` eingefügt wird.

### 1.8 Preisniveau & Reisepraktisches

Gemini generiert `budget` und `travelInfo` — diese Recherche stellt sicher, dass die Ergebnisse realistisch sind.

| Frage | Zweck |
|-------|-------|
| Was kostet ein Mittelklasse-Hotel pro Nacht? (in €) | Budget-Schätzung |
| Was kostet lokales Essen pro Tag? (in €) | Budget-Schätzung |
| Typische Inlandstransport-Kosten? (Zug, Bus, Flug) | Budget-Schätzung |
| Visum-Regelung für Deutsche? (Visa on Arrival, e-Visa, Kosten) | travelInfo |
| SIM-Karte / Internet-Verfügbarkeit? | travelInfo |
| Bezahlen: Bargeld oder Karte? Welche Währung? | travelInfo |
| Sprachbarriere? Nützliche Apps? | travelInfo |
| Gesundheit: Impfungen, Leitungswasser, besondere Risiken? | travelInfo |

### 1.9 Content

#### 10 Loading-Facts

- Überraschend, kurz, auf Deutsch
- Mix: Geographie, Kultur, Essen, Geschichte, Kuriositäten
- Jeder Fakt = 1–2 Sätze, maximal 2 Zeilen

#### Wikipedia-Referenzliste

Zwei Listen mit **exakten** englischen Wikipedia-Artikelnamen:

1. **`wikiReferences`** (vollständig, 20–30 Einträge): Alle Städte + Top-Sehenswürdigkeiten. Format:
   ```
   Städte: "City1", "City2", ...
   Sehenswürdigkeiten: "Sight1" (deutscher Name), "Sight2" (deutscher Name), ...
   ```

2. **`adjustWikiReferences`** (kuratiert, 10–15 Einträge): Nur die wichtigsten, für Adjust-Prompts.

**Verifizierung:** Jeden Titel auf `en.wikipedia.org` prüfen. Sonderzeichen, Diakritika, Underscores müssen exakt stimmen.

---

## Phase 2: Review der Recherche-Ergebnisse

Bevor Code geschrieben wird, folgende Prüfung:

- [ ] Alle 9 Recherche-Blöcke (1.1–1.9) vollständig ausgefüllt
- [ ] Mind. 15 Hauptziele + 8 Offbeat-Ziele mit allen Pflichtfeldern
- [ ] Jeder der 7 Tags kommt bei mind. 3 Destinations vor (oder bewusst weniger mit Begründung)
- [ ] Alle Wikipedia-Titel verifiziert (Artikel existiert + hat Bild)
- [ ] Alle Koordinaten per Stichprobe geprüft (mind. 5 Destinations auf Karte kontrolliert)
- [ ] City Pairs sind bidirektional
- [ ] `airportDestMap` verweist nur auf existierende Destination-IDs
- [ ] Transport-Optionen bilden die Reiserealität ab
- [ ] Saisonale Hinweise für mind. die kritischsten Jahreszeiten vorhanden
- [ ] Falls neue `legModes` eingeführt werden: notiert für Phase 3

---

## Phase 3: Code-Integration

Nach bestandenem Review werden folgende Dateien geändert — in dieser Reihenfolge:

### 3.1 Neue Destinations-Datei erstellen

**Datei:** `js/{land}-destinations.js`

```javascript
const {LAND}_DESTINATIONS = [
  // Alle Destinations aus der Recherche
];
```

Variablenname: `{LAND}_DESTINATIONS` (Großbuchstaben, Underscores)

### 3.2 `index.html` — Script-Tag einfügen

**Stelle:** Nach den bestehenden Destinations-Scripts (Zeile ~611)

```html
<script src="js/{land}-destinations.js"></script>
```

### 3.3 `index.html` — Country-Card im Hero einfügen

**Stelle:** Im `#country-selector` Container (Zeile ~194)

```html
<div class="country-card" data-country="{id}" onclick="App.selectCountry('{id}')">
  <span class="country-card-emoji">{emoji}</span>
  <span class="country-card-name">{Name}</span>
  <span class="country-card-brand">{brandName}</span>
</div>
```

### 3.4 `js/countries.js` — Komplette Country-Config

**Stelle:** Im `configs`-Objekt, nach dem letzten Land

Alle Felder aus Phase 1: `id`, `name`, `brandName`, `brandEmoji`, `brandDescription`, `heroTitle`, `heroSubtitle`, `expertRole`, `countryInText`, `mapCenter`, `mapZoom`, `destinations` (null), `airports`, `defaultAirport`, `airportDestMap`, `cityPairs`, `transportModes`, `defaultTransport`, `transportPrompt()`, `transportRules()`, `legModes`, `facts`, `wikiReferences`, `adjustWikiReferences`.

### 3.5 `js/countries.js` — `setCountry()` erweitern

**Stelle:** Zeile ~249, im `if/else if`-Block

```javascript
} else if (countryId === '{id}') {
  config.destinations = typeof {LAND}_DESTINATIONS !== 'undefined' ? {LAND}_DESTINATIONS : [];
}
```

### 3.6 `js/gemini.js` — Saisonale Hinweise einfügen

**Stelle:** Zeile ~130, nach den bestehenden saisonalen `if`-Blöcken

```javascript
${s.season === '{saison}' && cc.id === '{id}' ? '- Beachte: {Warnung}' : ''}
```

Pro relevante Saison einen Block. Nur Saisons mit echten Warnungen — nicht jede Saison braucht einen Block.

### 3.7 `js/results.js` — Neue Transport-Modes (nur falls nötig)

Falls das Land ein Transportmittel einführt, das noch nicht existiert, muss es an **5 Stellen** ergänzt werden:

1. `renderTransport()` → `modeLabels`-Objekt (~Zeile 545)
2. `buildTransportStats()` → `labels`-Objekt (~Zeile 123)
3. `initMap()` → `badgeIcons`-Objekt + Polyline-Styling (~Zeile 262, 287–296)
4. `renderStopPills()` → `connectorIcons`-Objekt (~Zeile 358)
5. `buildShareText()` → Transport-Zählung (~Zeile 744)

### 3.8 `js/suggestions.js` — Reason-Text prüfen (nur falls nötig)

**Stelle:** Zeile ~146 — der Text `"Nur ~30min Zug"` ist zug-zentrisch. Falls das Land primär Bus/Boot nutzt, den Fallback-Text anpassen oder generischer formulieren.

---

## Phase 4: Validierung

Nach der Implementierung, vor dem Merge:

### Funktionstest

- [ ] Land in Hero-Sektion wählen → Step 1 öffnet mit korrektem Branding
- [ ] Alle Flughäfen werden als Cards angezeigt
- [ ] Transport-Optionen zeigen die länderspezifischen Cards
- [ ] Stunden-Slider erscheint nur bei den richtigen Transport-Optionen
- [ ] Step 2: Preference-Slider funktionieren
- [ ] Step 3: Karte zeigt das Land mit korrektem Zentrum/Zoom
- [ ] Step 3: Alle Hauptziele sichtbar, Offbeat-Sektion vorhanden
- [ ] Step 3: Ankunftsort wird automatisch gepinnt
- [ ] Step 3: Wikipedia-Bilder laden für Destinations
- [ ] Route generieren → Ergebnis enthält sinnvolle Stops, korrekte Legs
- [ ] Route-Karte zeigt korrekte Marker und Verbindungslinien
- [ ] Transport-Modes in Legs werden korrekt gerendert (Icons, Labels, Linien)
- [ ] Suggestions erscheinen und sind geographisch sinnvoll
- [ ] "Route anpassen" funktioniert
- [ ] Share-Link funktioniert (generieren + laden)
- [ ] Budget-Schätzung enthält realistische Euro-Beträge
- [ ] Andere Länder funktionieren weiterhin unverändert (Regressionstest)

### Datenqualitäts-Check

- [ ] Kein Destination-Marker liegt im Meer oder falschen Land
- [ ] Alle Wikipedia-Bilder laden (keine kaputten Thumbnails)
- [ ] Loading-Facts werden angezeigt und rotieren
- [ ] Saisonale Hinweise erscheinen im generierten Ergebnis (passende Saison testen)

---

## Referenz: Bestehende Länder

| Land | ID | Brand | Destinations-Var | Transport-Schwerpunkt |
|------|----|-------|-----------------|----------------------|
| China | `china` | Jaderoute 🏯 | `DESTINATIONS` | Hochgeschwindigkeitszug |
| Vietnam | `vietnam` | Lotuspfad 🪷 | `VIETNAM_DESTINATIONS` | Reunification Express + Sleeper Bus |
