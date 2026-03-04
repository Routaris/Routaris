# Peru Destinations Research – Routaris (Inkapfad)

## Wikipedia-Verifikation

Alle Wikipedia-Artikel wurden per REST API verifiziert (Status 200 + Thumbnail vorhanden):

### Hauptziele (15)
| ID | Wiki-Artikel | Thumbnail |
|----|-------------|-----------|
| lima | `Lima` | Ja |
| cusco | `Cusco` | Ja |
| machu-picchu | `Machu_Picchu` | Ja |
| sacred-valley | `Sacred_Valley` | Ja |
| arequipa | `Arequipa` | Ja |
| puno | `Puno` | Ja |
| nazca | `Nazca` | Ja |
| huacachina | `Huacachina` | Ja |
| paracas | `Paracas_National_Reserve` | Ja (Alternativ, da `Paracas` kein Thumbnail hat) |
| huaraz | `Huaraz` | Ja |
| iquitos | `Iquitos` | Ja |
| trujillo | `Trujillo,_Peru` | Ja |
| puerto-maldonado | `Puerto_Maldonado` | Ja |
| colca-canyon | `Colca_Canyon` | Ja |
| mancora | `Máncora` | Ja |

### Off-the-beaten-path (9)
| ID | Wiki-Artikel | Thumbnail |
|----|-------------|-----------|
| chachapoyas | `Chachapoyas,_Peru` | Ja |
| ayacucho | `Ayacucho` | Ja |
| huancayo | `Huancayo` | Ja |
| cajamarca | `Cajamarca` | Ja |
| lunahuana | `Lunahuaná` | Ja |
| tambopata | `Tambopata_National_Reserve` | Ja |
| pucallpa | `Pucallpa` | Ja |
| lamas | `Lamas,_Peru` | Ja |
| oxapampa | `Oxapampa` | Ja |

---

## 1. Internationale Flughäfen

| Flughafen | IATA | Stadt | Internationale Verbindungen |
|-----------|------|-------|----------------------------|
| Jorge Chávez | LIM | Lima | Hauptdrehkreuz, alle internationalen Flüge |
| Alejandro Velasco Astete | CUZ | Cusco | Einige Flüge aus Bolivien/Chile |
| Rodríguez Ballón | AQP | Arequipa | Vereinzelt international |
| Coronel FAP Francisco Secada Vignetta | IQT | Iquitos | Nur national (kein Straßenzugang) |
| Padre Aldamiz | PEM | Puerto Maldonado | Nur national |
| Capitán FAP Carlos Martínez de Pinillos | TRU | Trujillo | Nur national |

**Für die App relevant als Ankunftsorte:**
- Lima (Jorge Chávez) – Standard, fast alle internationalen Flüge
- Cusco – für direkte Andenreisen (nationale Zubringer)

---

## 2. Wichtige Stadt-zu-Stadt-Verbindungen

### Flugverbindungen (ab Lima)
| Route | Dauer | Airlines |
|-------|-------|---------|
| Lima → Cusco | ~1h 20min | LATAM, JetSmart, Sky |
| Lima → Arequipa | ~1h 30min | LATAM, JetSmart, Sky |
| Lima → Iquitos | ~2h | LATAM, Star Peru |
| Lima → Juliaca/Puno | ~1h 45min | LATAM, JetSmart |
| Lima → Puerto Maldonado | ~1h 40min | LATAM |
| Lima → Trujillo | ~1h 10min | LATAM, JetSmart |
| Lima → Cajamarca | ~1h 20min | LATAM |
| Lima → Tarapoto | ~1h 15min | LATAM, Star Peru |
| Lima → Piura (für Máncora) | ~1h 45min | LATAM, JetSmart |
| Cusco → Puerto Maldonado | ~45min | LATAM |
| Cusco → Juliaca/Puno | ~1h (selten, meist Bus) | – |

### Busverbindungen
| Route | Dauer | Anmerkungen |
|-------|-------|------------|
| Lima → Paracas | ~3.5h | Cruz del Sur, Peru Hop |
| Lima → Ica/Huacachina | ~4.5h | Via Paracas möglich |
| Lima → Nazca | ~7h | Via Ica |
| Lima → Arequipa | ~15-17h | Nachtbus empfohlen |
| Lima → Huaraz | ~8h | Über 4.000m Pass |
| Lima → Huancayo | ~7h | Alternative: Zug (saisonal) |
| Lima → Trujillo | ~9h | Panamericana Norte |
| Arequipa → Chivay (Colca) | ~3.5h | Tourist-Bus/Tour |
| Arequipa → Puno | ~6-7h | Über 4.500m Pass |
| Puno → Cusco | ~7-8h | Kulturbus mit Stopps: ~10h |
| Cusco → Ollantaytambo | ~1.5h | Colectivo/Minibus |
| Cusco → Pisac | ~1h | Colectivo |
| Trujillo → Chiclayo → Chachapoyas | ~15h total | Anstrengend, besser fliegen |
| Piura → Máncora | ~2.5h | Colectivo |

### Zugverbindungen (sehr begrenzt!)
| Route | Dauer | Anbieter | Anmerkungen |
|-------|-------|----------|------------|
| Cusco/Ollantaytambo → Aguas Calientes | ~1.5-4h | PeruRail, Inca Rail | Einziger Zugang zu Machu Picchu |
| Cusco → Puno | ~10.5h | PeruRail Titicaca | Luxus-Tageszug, nur Mi/Fr/So |
| Lima → Huancayo | ~12h | Ferrocarril Central | Einer der höchsten Züge der Welt, saisonal (Apr-Nov) |

---

## 3. cityPairs für countries.js

```javascript
cityPairs: {
  'lima': ['paracas', 'huacachina', 'lunahuana'],
  'paracas': ['lima', 'huacachina', 'nazca'],
  'huacachina': ['paracas', 'nazca'],
  'nazca': ['huacachina', 'arequipa'],
  'arequipa': ['colca-canyon', 'puno'],
  'colca-canyon': ['arequipa'],
  'puno': ['arequipa', 'cusco'],
  'cusco': ['sacred-valley', 'machu-picchu', 'puno', 'puerto-maldonado'],
  'sacred-valley': ['cusco', 'machu-picchu'],
  'machu-picchu': ['cusco', 'sacred-valley'],
  'puerto-maldonado': ['cusco', 'tambopata'],
  'tambopata': ['puerto-maldonado'],
  'trujillo': ['cajamarca'],
  'cajamarca': ['trujillo', 'chachapoyas'],
  'chachapoyas': ['cajamarca'],
  'huaraz': [],
  'iquitos': [],
  'mancora': [],
  'huancayo': [],
  'ayacucho': [],
  'pucallpa': [],
  'lamas': [],
  'oxapampa': []
}
```

---

## 4. Saisonale Reiseinfos

### Trockenzeit (Mai-Oktober) – "Winter" / Beste Reisezeit Anden
- **Anden/Hochland:** Sonnig, trocken, kalte Nächte (bis -5°C auf >3.500m). Perfekt für Machu Picchu, Cusco, Colca Canyon, Titicacasee
- **Amazonas:** Weniger Regen, niedrigerer Wasserstand, bessere Tierbeobachtung, weniger Moskitos
- **Küste:** Lima grau und kühl (garúa/Nebel), Nordküste (Máncora) ganzjährig warm
- **Hinweis:** Hochsaison Jun-Aug, Inka Trail muss Monate vorher gebucht werden. Juli besonders voll (Fiestas Patrias 28.7.)

### Regenzeit (November-April) – "Sommer"
- **Anden:** Nachmittags-Regenschauer, Wanderwege rutschig, Inka Trail im Februar geschlossen
- **Amazonas:** Hoher Wasserstand, überflutete Wälder per Boot erreichbar, mehr Moskitos
- **Küste:** Lima sonnig und warm (Dez-März), Strände belebt. Nordküste heiß
- **Hinweis:** Weniger Touristen, günstigere Preise. Februar ist der regenreichste Monat

### Übergangsmonate (April/Mai und September/Oktober)
- Beste Balance: weniger Touristen als Hochsaison, trockener als Regenzeit
- September-Oktober: "Schulterzeit" – gutes Wetter, moderate Preise
- April-Mai: Regen lässt nach, Landschaft ist grün

### Spezielle Warnungen
- **Höhenkrankheit (Soroche):** Cusco (3.400m), Puno (3.830m), Colca-Anfahrt (4.910m Pass). Mindestens 1-2 Tage Akklimatisierung. Coca-Tee hilft. Kinder unter 2 sind besonders gefährdet
- **Inka Trail:** Februar komplett geschlossen (Wartung). Genehmigungen 6+ Monate im Voraus buchen
- **Amazonas/Iquitos:** Ganzjährig heiß und feucht (25-35°C). Malaria-Prophylaxe nötig. Gelbfieber-Impfung empfohlen
- **El Niño Jahre:** Können Küstenüberschwemmungen und Erdrutsche verursachen (unvorhersehbar)

---

## 5. Transportmodi für countries.js

```javascript
transportModes: [
  { id: 'bus-only', icon: '🚌', label: 'Nur Bus', desc: 'Keine Inlandsflüge' },
  { id: 'bus-preferred', icon: '🚌', label: 'Bus bevorzugt', desc: 'Flug nur bei weiten Strecken' },
  { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Bus oder Flug' }
],
defaultTransport: 'no-preference',
legModes: 'bus|flight|train',
```

**Verfügbare Modi:**
- `bus` – Haupttransportmittel, Cruz del Sur (Premium), Oltursa, TEPSA. Colectivos/Minibus für kurze Strecken
- `flight` – LATAM, JetSmart, Star Peru. Fast alle Routen über Lima
- `train` – Nur 3 Strecken: Cusco↔Machu Picchu, Cusco↔Puno (Luxus), Lima↔Huancayo (saisonal)

---

## 6. 10 Fakten über Peru (auf Deutsch)

```javascript
facts: [
  'Peru hat 28 der 32 Klimazonen der Welt – von Wüste über Hochgebirge bis Regenwald auf einer Fläche dreimal so groß wie Deutschland.',
  'Machu Picchu wurde erst 1911 vom amerikanischen Forscher Hiram Bingham wiederentdeckt – die lokale Bevölkerung kannte die Ruinen jedoch schon vorher.',
  'Peru ist die kulinarische Hauptstadt Südamerikas: Lima hat mehr Top-Restaurants als jede andere Stadt des Kontinents.',
  'Der Titicacasee auf 3.812m ist der höchste schiffbare See der Welt und wird von Peru und Bolivien geteilt.',
  'Die Nazca-Linien sind über 2.000 Jahre alt und nur aus der Luft erkennbar – ihr Zweck ist bis heute ein Rätsel.',
  'Peru hat mehr als 4.000 verschiedene Kartoffelsorten – das Ursprungsland der Kartoffel pflegt bis heute traditionellen Anbau auf über 3.000m Höhe.',
  'Der Colca Canyon ist mit 3.270m doppelt so tief wie der Grand Canyon und Heimat des Andenkondors.',
  'Perus Amazonas-Regenwald bedeckt über 60% der Landesfläche und beherbergt die größte Biodiversität der Erde.',
  'Die Inka bauten ein Straßennetz von über 40.000 km Länge durch die Anden – ohne Rad und ohne Pferde.',
  'Ceviche, Perus Nationalgericht aus rohem Fisch in Limettensaft, wurde 2023 zum UNESCO-Weltkulturerbe erklärt.'
]
```

---

## 7. Airports für countries.js

```javascript
airports: [
  { id: 'lim', label: 'Lima', desc: 'Flughafen Jorge Chávez (LIM)', value: 'Lima (Flughafen Jorge Chávez)' },
  { id: 'cuz', label: 'Cusco', desc: 'Flughafen CUZ', value: 'Cusco (Flughafen Alejandro Velasco Astete)' },
  { id: 'aqp', label: 'Arequipa', desc: 'Flughafen AQP', value: 'Arequipa (Flughafen Rodríguez Ballón)' },
  { id: 'iqt', label: 'Iquitos', desc: 'Flughafen IQT', value: 'Iquitos (Flughafen Francisco Secada)' }
],
defaultAirport: 'Lima (Flughafen Jorge Chávez)',
```

---

## 8. airportDestMap

```javascript
airportDestMap: {
  'lima': 'lima',
  'cusco': 'cusco',
  'arequipa': 'arequipa',
  'iquitos': 'iquitos'
}
```

---

## 9. transportPrompt und transportRules

```javascript
transportPrompt(transport, trainMaxHours) {
  const names = {
    'bus-only': 'Nur Bus/Colectivo (keine Inlandsflüge)',
    'bus-preferred': `Bus bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Busfahrt`,
    'no-preference': 'Bus oder Flug (keine Präferenz)'
  };
  return names[transport] || names['no-preference'];
},

transportRules(transport, trainMaxHours) {
  if (transport === 'bus-only') {
    return 'NUR Bus- und Bodenverbindungen verwenden – keine Inlandsflüge. Peru hat ein gutes Fernbusnetz (Cruz del Sur, Oltursa). Wichtige Busrouten: Lima–Paracas (3.5h), Lima–Ica/Huacachina (4.5h), Lima–Nazca (7h), Lima–Huaraz (8h), Lima–Trujillo (9h), Nazca–Arequipa (9h), Arequipa–Chivay/Colca (3.5h), Arequipa–Puno (6-7h), Puno–Cusco (7-8h), Cusco–Ollantaytambo (1.5h Colectivo). Achtung: Iquitos und Puerto Maldonado sind per Bus NICHT erreichbar (nur Flug). Route so planen, dass keine isolierten Städte vorkommen.';
  } else if (transport === 'bus-preferred') {
    return `Bus bevorzugt. Inlandsflug erst empfehlen, wenn die Busfahrt länger als ${trainMaxHours} Stunden dauert. Wichtige Busrouten: Lima–Paracas (3.5h), Lima–Ica (4.5h), Lima–Nazca (7h), Arequipa–Puno (6-7h), Puno–Cusco (7-8h), Cusco–Ollantaytambo (1.5h). Für Lima–Cusco (21h Bus) oder Lima–Arequipa (16h) Flug empfehlen. Iquitos und Puerto Maldonado NUR per Flug erreichbar.`;
  }
  return 'Kombiniere Fernbusse und Inlandsflüge. Kurze Strecken per Bus: Lima–Paracas (3.5h), Lima–Ica (4.5h), Arequipa–Colca (3.5h), Arequipa–Puno (6-7h), Puno–Cusco (7-8h), Cusco–Ollantaytambo (1.5h Colectivo). Für Strecken über 8h Busfahrt empfehle Inlandsflug (z.B. Lima–Cusco, Lima–Arequipa, Lima–Iquitos, Lima–Puerto Maldonado, Lima–Trujillo). Cusco–Machu Picchu NUR per Zug (PeruRail/Inca Rail, ~1.5-4h ab Ollantaytambo). Iquitos und Puerto Maldonado NUR per Flug erreichbar.';
}
```

---

## 10. Saisonale Warnungen für gemini.js

```
Peru-spezifische Saisonhinweise:
- Frühling (Sep-Nov): Übergangssaison, weniger Touristen, gutes Wetter in den Anden. Regenzeit beginnt Ende November.
- Sommer (Dez-Feb): Regenzeit in Anden und Amazonas. Lima sonnig und warm. Inka Trail im Februar GESCHLOSSEN. Erdrutsche möglich. Máncora/Nordküste Hochsaison.
- Herbst (Mär-Mai): Regen lässt nach. April noch feucht in den Anden. Mai bereits trocken und wenig Touristen – Geheimtipp.
- Winter (Jun-Aug): Trockenzeit = Hochsaison Anden. Kalt in der Höhe (Nachtfrost über 3.500m). Lima grau/Nebel (garúa). Juli Fiestas Patrias (28.7.) = interne Hochsaison. Inka Trail sehr voll.
- Höhenkrankheit: Bei Cusco (3.400m), Puno (3.830m), Colca (4.900m Pass) IMMER warnen. Empfehlung: Erst Sacred Valley (2.800m) zum Akklimatisieren, dann Cusco.
- Amazonas (Iquitos, Puerto Maldonado): Ganzjährig feucht, Malaria-Prophylaxe nötig. Trockenere Monate Jun-Okt besser für Tierbeobachtung.
```

---

## 11. wikiReferences für countries.js

```javascript
wikiReferences: `Städte: "Lima", "Cusco", "Arequipa", "Puno", "Trujillo,_Peru", "Iquitos", "Huaraz", "Cajamarca", "Ayacucho", "Huancayo", "Chachapoyas,_Peru", "Puerto_Maldonado", "Máncora", "Pucallpa", "Oxapampa"
  Sehenswürdigkeiten: "Machu_Picchu", "Sacred_Valley", "Nazca_Lines" (Nazca-Linien), "Lake_Titicaca" (Titicacasee), "Colca_Canyon", "Huacachina" (Wüstenoase), "Paracas_National_Reserve" (Ballestas-Inseln), "Chan_Chan" (Lehmziegelstadt), "Ollantaytambo" (Inka-Festung), "Sacsayhuamán" (Inka-Ruine), "Cordillera_Blanca" (Trekking), "Tambopata_National_Reserve" (Amazonas), "Kuélap" (Wolkenkrieger-Festung), "Pisac" (Inka-Ruinen), "Lunahuaná" (Rafting)`,

adjustWikiReferences: `"Lima", "Cusco", "Machu_Picchu", "Arequipa", "Puno", "Lake_Titicaca", "Sacred_Valley", "Nazca_Lines", "Colca_Canyon", "Huacachina", "Paracas_National_Reserve", "Chan_Chan", "Ollantaytambo", "Cordillera_Blanca"`
```

---

## 12. Day-Trip-Beziehungen

| Ziel | Basis-Stadt | Transit |
|------|-------------|---------|
| Machu Picchu | Cusco | ~4h Zug + Bus |
| Machu Picchu | Sacred Valley (Ollantaytambo) | ~2h Zug + Bus |
| Sacred Valley | Cusco | ~1.5h Colectivo/Bus |
| Colca Canyon | Arequipa | ~3.5h Bus/Tour |
| Huacachina | Lima | ~4.5h Bus (via Ica) |
| Paracas | Lima | ~3.5h Bus |
| Lunahuaná | Lima | ~3.5h Bus |
| Tambopata | Puerto Maldonado | ~3h Boot flussaufwärts |
| Lamas | Tarapoto* | ~30min Colectivo |

*Tarapoto ist kein eigenes Ziel in der App, aber ein Verkehrsknotenpunkt (Flughafen)

---

## 13. Country-Config Zusammenfassung

```javascript
peru: {
  id: 'peru',
  name: 'Peru',
  brandName: 'Inkapfad',
  brandEmoji: '🏔️',
  brandDescription: 'Personalisierte Routenplanung für Peru-Individualreisen',
  heroTitle: 'Dein perfektes <em>Peru-Abenteuer</em> beginnt hier',
  heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Peru – von Machu Picchu über den Titicacasee bis in den Amazonas.',
  expertRole: 'Peru-Reiseexperte',
  countryInText: 'Peru',
  mapCenter: [-10, -75],
  mapZoom: 5,
  destinations: null, // wird in init() gesetzt (PERU_DESTINATIONS)
  // ... airports, cityPairs, transportModes etc. siehe oben
}
```
