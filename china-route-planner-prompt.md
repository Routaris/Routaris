# Starter-Prompt: China Route Planner Prototyp

Kopiere diesen Prompt in ein neues Claude-Projekt, um den Prototyp zu bauen.

---

## Prompt

```
Baue einen interaktiven Prototyp für einen KI-gestützten China-Reiseplaner als Single-Page Web-App (HTML/CSS/JS, kein Framework nötig für v1).

## Was die App tun soll

Der Nutzer gibt seine Reiseparameter ein und bekommt eine visuell ansprechende, personalisierte China-Route generiert.

## User Flow

### Schritt 1: Basis-Eingabe
- Ankunftsflughafen (Dropdown: Shanghai Pudong, Peking Capital, Hongkong)
- Reisedauer (Slider: 7–35 Tage)
- Reisezeitraum (Monat/Jahreszeit)
- Reisegruppe (allein / Paar / Familie mit Kind – bei Kind: Alter des Kindes)

### Schritt 2: Präferenzen
- Interaktive Tags oder Schieberegler für: Kultur, Natur, Geschichte, Großstadt, Erholung, Abenteuer, Kulinarik
- Der Nutzer gewichtet, was ihm wichtig ist (z.B. viel Natur, wenig Großstadt)

### Schritt 3: Must-See Auswahl
- Zeige eine Karte von China (Leaflet + OSM) mit den ~15 beliebtesten Reisezielen als Pins
- Jeder Pin hat Name, Kurzbeschreibung, kleines Foto (Wikipedia API), und Tags (Natur/Kultur/etc.)
- Der Nutzer kann Ziele anklicken um sie als "Muss dabei sein" zu markieren
- Vorauswahl basierend auf den Präferenzen aus Schritt 2

Ziele-Datenbank (eingebaut im Code):
- Shanghai (Stadt, Kultur) – The Bund, Yu-Garten, French Concession
- Peking (Geschichte, Kultur) – Verbotene Stadt, Große Mauer Mutianyu, Hutongs
- Xi'an (Geschichte) – Terrakotta-Armee, Stadtmauer, Muslim Quarter
- Hangzhou (Natur, Kultur) – Westsee, Longjing-Teeplantagen, Lingyin-Tempel
- Guilin/Yangshuo (Natur) – Li-Fluss, Karstberge, Reisterrassen
- Chengdu (Natur, Kultur) – Pandas, Teehaus-Kultur, Sichuan-Küche
- Chongqing (Stadt, Kulinarik) – Hongya Cave, Hot Pot, Jangtse-Seilbahn
- Suzhou (Kultur, Erholung) – UNESCO-Gärten, Kanäle, Seidenmuseum
- Nanjing (Geschichte) – Stadtmauer, Xuanwu-See, Purple Mountain
- Huangshan (Natur) – Hongcun/Xidi UNESCO-Dörfer, Bambuswälder
- Emeishan/Leshan (Natur, Geschichte) – 71m Buddha, heiliger Berg
- Moganshan (Erholung, Natur) – Bambuswälder, Boutique-Resorts
- Zhangjiajie (Natur, Abenteuer) – Avatar-Berge, Glasbrücke
- Kunming/Dali/Lijiang (Natur, Kultur) – Yunnan-Region, Erhai-See, Altstadt
- Xiamen (Erholung, Kultur) – Gulangyu-Insel, Strandpromenade

### Schritt 4: Route generieren
- Button "Route erstellen" → API-Call an Google Gemini (Free Tier)
- Zeige Ladeanimation
- Gemini bekommt einen strukturierten Prompt mit allen Inputs und soll JSON zurückgeben

### Schritt 5: Ergebnis anzeigen
- Interaktive Karte mit Routenlinie (Leaflet, durchgezogen = Zug, gestrichelt = Flug)
- Scrollbare Stopp-Leiste unter der Karte
- Pro Stopp beim Klick:
  - Stadtname, Aufenthaltsdauer, Tagline
  - 3 Highlight-Karten mit Icon, Titel, ausführliche Beschreibung
  - Praktische Tipps (Transport, Essen, Kinder-Tipps falls Familie)
  - Tagesablauf-Vorschlag (Tag 1: ..., Tag 2: ...)
- Transport-Infos zwischen den Stopps (Zug/Flug, Dauer, ungefähre Kosten)

## Gemini API Integration

Nutze die Google Gemini API (kostenloser Tier):
- Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
- API Key wird vom Nutzer selbst eingegeben (Eingabefeld + localStorage) ODER du nutzt einen Platzhalter den ich später ersetze
- Der Prompt an Gemini soll klar strukturiert sein und JSON-Ausgabe erzwingen

System-Prompt für Gemini (eingebaut):
```
Du bist ein Experte für China-Individualreisen. Erstelle eine optimale Reiseroute basierend auf den Nutzereingaben. 

Regeln:
- Minimum 3 Nächte pro Stopp (bei Kurzreisen min. 2)
- Maximale Transportzeit zwischen zwei Stopps: 6h per Zug, sonst Flug
- Logische geographische Reihenfolge (nicht kreuz und quer)
- Start und Ende am Ankunftsflughafen
- Bei Familie mit Kind unter 3: bevorzuge buggyfreundliche Orte, vermeide zu viele Ortswechsel
- Reisezeit beachten (Regenzeit, Hitze, Golden Week etc.)

Antworte NUR mit validem JSON in diesem Format:
{
  "routeName": "Name der Route",
  "routeDescription": "Kurzbeschreibung",
  "totalNights": 21,
  "totalTransfers": 5,
  "flights": 1,
  "stops": [
    {
      "city": "Shanghai",
      "nights": 5,
      "lat": 31.23,
      "lng": 121.47,
      "tagline": "...",
      "highlights": [
        { "icon": "🌃", "title": "The Bund", "description": "..." }
      ],
      "dailyPlan": [
        { "day": 1, "title": "Ankommen & Bund", "activities": "..." }
      ],
      "tips": [
        { "icon": "🍜", "text": "..." }
      ]
    }
  ],
  "legs": [
    { "from": "Shanghai", "to": "Hangzhou", "mode": "train", "duration": "~1h", "cost": "~30€" }
  ]
}
```

## Design-Anforderungen

- Modernes, warmes Editorial-Design (inspiriert von Reisemagazinen)
- Fonts: DM Serif Display (Headlines) + Instrument Sans (Body) via Google Fonts
- Farbpalette: Creme-Hintergrund (#faf9f7), dunkle Schrift (#18170f), Akzente in Terracotta/Teal
- Smooth Animationen und Transitions zwischen den Schritten
- Mobile-responsive
- Karte: Leaflet + CARTO Light Tiles, zoombar mit Scroll/Pinch, dynamisch skalierende Labels
- Bilder: Dynamisch von Wikipedia REST API laden (https://en.wikipedia.org/api/rest_v1/page/summary/{title} → thumbnail.source)

## Technische Hinweise

- Alles in einer einzigen HTML-Datei (Prototyp)
- Gemini API Key: Erstelle ein Eingabefeld wo der Nutzer seinen eigenen Key eingibt. Key wird in einer Variable gespeichert (kein localStorage in Artifacts). Alternativ kann der Key hardcoded als Platzhalter rein.
- Kein Backend nötig – alles client-side
- Error Handling: Wenn Gemini kein valides JSON zurückgibt, parse-Fehler abfangen und Nutzer informieren
```

---

## Hinweise zur Nutzung

1. Erstelle ein neues Projekt in Claude
2. Füge die **Projektinformation** (separates Dokument) als Projektkontext hinzu
3. Kopiere den **Prompt oben** als erste Nachricht
4. Claude baut den Prototyp als HTML-Datei
5. Für die Gemini API brauchst du einen kostenlosen API Key von https://aistudio.google.com/apikey
