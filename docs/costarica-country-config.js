/* ============================================
   COSTA RICA – Country Config für countries.js

   Dieses Snippet gehört in CountryConfig.configs
   in js/countries.js eingefügt.

   Brand: "Puravida-Pfad" (Pura Vida = Costa Ricas Lebensmotto)
   Emoji: 🦜 (Tukan/Papagei – ikonisch für Costa Rica)
   ============================================ */

costarica: {
  id: 'costarica',
  name: 'Costa Rica',
  brandName: 'Puravida-Pfad',
  brandEmoji: '🦜',
  brandDescription: 'Personalisierte Routenplanung für Costa-Rica-Individualreisen',
  heroTitle: 'Dein perfektes <em>Costa-Rica-Abenteuer</em> beginnt hier',
  heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Costa Rica – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
  expertRole: 'Costa-Rica-Reiseexperte',
  countryInText: 'Costa Rica',
  mapCenter: [9.8, -84.2],
  mapZoom: 7,

  destinations: null, // wird in init() gesetzt (COSTARICA_DESTINATIONS)

  airports: [
    { id: 'sjo', label: 'San José', desc: 'Flughafen SJO', value: 'San José (Flughafen Juan Santamaría)' },
    { id: 'lir', label: 'Liberia', desc: 'Flughafen LIR', value: 'Liberia (Flughafen Daniel Oduber Quirós)' }
  ],
  defaultAirport: 'San José (Flughafen Juan Santamaría)',

  airportDestMap: {
    'san josé': 'sanjose',
    'san jose': 'sanjose',
    'sjo': 'sanjose',
    'liberia': 'rincondelavieja',
    'lir': 'rincondelavieja',
    'guanacaste': 'tamarindo'
  },

  cityPairs: {
    // Zentraltal / San José Hub
    'sanjose': ['poas', 'arenal', 'jaco', 'turrialba', 'sarapiqui', 'tortuguero', 'manuelantonio', 'sangerardo'],
    'poas': ['sanjose', 'arenal', 'sarapiqui'],
    'turrialba': ['sanjose', 'pacuare'],
    'pacuare': ['turrialba', 'sanjose'],
    'sangerardo': ['sanjose', 'uvita'],

    // Arenal / Nordregion
    'arenal': ['monteverde', 'sanjose', 'rioceleste', 'sarapiqui'],
    'monteverde': ['arenal', 'santateresa'],
    'rioceleste': ['arenal', 'rincondelavieja'],
    'sarapiqui': ['sanjose', 'arenal', 'tortuguero', 'poas'],

    // Guanacaste / Nordpazifik
    'rincondelavieja': ['papagayo', 'tamarindo', 'rioceleste'],
    'papagayo': ['rincondelavieja', 'tamarindo'],
    'tamarindo': ['papagayo', 'nosara', 'rincondelavieja'],
    'nosara': ['tamarindo', 'santateresa'],

    // Nicoya-Halbinsel
    'santateresa': ['montezuma', 'nosara', 'monteverde', 'jaco'],
    'montezuma': ['santateresa'],

    // Zentralpazifik
    'jaco': ['sanjose', 'manuelantonio', 'santateresa'],
    'manuelantonio': ['jaco', 'uvita', 'sanjose'],
    'uvita': ['manuelantonio', 'corcovado', 'sangerardo'],

    // Südpazifik / Osa
    'corcovado': ['uvita', 'osa'],
    'osa': ['corcovado'],

    // Karibik
    'tortuguero': ['sanjose', 'sarapiqui', 'puertoviejo'],
    'puertoviejo': ['cahuita', 'tortuguero'],
    'cahuita': ['puertoviejo']
  },

  transportModes: [
    { id: 'no-fly', icon: '🚌', label: 'Ohne Fliegen', desc: 'Shuttle-Bus & Mietwagen, keine Flüge' },
    { id: 'ground-preferred', icon: '🚐', label: 'Boden bevorzugt', desc: 'Flug nur bei weiten Strecken' },
    { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Shuttle, Mietwagen oder Flug' },
    { id: 'rental-car', icon: '🚗', label: 'Mietwagen', desc: '4x4 empfohlen, maximale Flexibilität' }
  ],
  defaultTransport: 'no-preference',

  transportPrompt(transport, trainMaxHours) {
    const names = {
      'no-fly': 'Kein Fliegen – nur Shuttle-Bus (Interbus, Caribe Shuttle) und Mietwagen',
      'ground-preferred': `Shuttle/Mietwagen bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Fahrt`,
      'no-preference': 'Shuttle-Bus, Mietwagen oder Inlandsflug (keine Präferenz)',
      'rental-car': 'Mietwagen (4x4 empfohlen) als Haupttransportmittel'
    };
    return names[transport] || names['no-preference'];
  },

  transportRules(transport, trainMaxHours) {
    if (transport === 'no-fly') {
      return 'KEINE Flüge verwenden. Haupttransport: Shuttle-Busse (Interbus, Caribe Shuttle, Anywhere Costa Rica) und Mietwagen (4x4 empfohlen). Wichtige Fahrzeiten: San José–Arenal/La Fortuna (3-3.5h), San José–Monteverde (4-4.5h, letzte Strecke Schotterpiste), San José–Manuel Antonio (3h), San José–Jacó (1.5h), San José–Puerto Viejo (4.5h), San José–Tortuguero (nur per Boot ab La Pavona 1.5h, Bus bis La Pavona 3h), Arenal–Monteverde (Jeep-Boot-Jeep Transfer über Arenal-See ~3.5h oder Straße ~4h), San José–Tamarindo (4.5h), San José–Liberia/Rincón (4h), Liberia–Tamarindo (1.5h), Manuel Antonio–Uvita (1.5h), Uvita–Drake Bay (nur per Boot ab Sierpe ~1.5h oder Schotterpiste 4x4 ~3h). Nicoya-Halbinsel: Paquera-Fähre ab Puntarenas (1.5h Fähre) + Fahrt nach Montezuma/Santa Teresa (2h). Shuttle-Busse verbinden alle touristischen Hauptorte direkt (täglich, Reservierung 1 Tag vorher).';
    } else if (transport === 'ground-preferred') {
      return `Shuttle-Bus oder Mietwagen bevorzugt. Inlandsflug erst empfehlen, wenn die Fahrt länger als ${trainMaxHours} Stunden dauert. Wichtige Fahrzeiten: San José–La Fortuna (3-3.5h), San José–Monteverde (4-4.5h), San José–Manuel Antonio (3h), San José–Puerto Viejo (4.5h), San José–Tamarindo (4.5h), San José–Liberia (4h). Arenal–Monteverde: Jeep-Boot-Jeep (3.5h, Erlebnis!) oder Straße (4h). Tortuguero nur per Boot (ab La Pavona, 1.5h). Drake Bay/Corcovado nur per Boot ab Sierpe (1.5h) oder Inlandsflug ab San José nach Drake Bay (~45min, empfehlenswert). Fähre Puntarenas–Paquera für Nicoya-Halbinsel (1.5h). 4x4-Mietwagen empfohlen für Monteverde, Osa und Nicoya-Halbinsel.`;
    } else if (transport === 'rental-car') {
      return 'Mietwagen (4x4 dringend empfohlen) als Haupttransport. Vorteile: Maximale Flexibilität, Stopps an Wasserfällen und Aussichtspunkten möglich. Wichtige Fahrzeiten: San José–La Fortuna (3-3.5h), San José–Monteverde (4-4.5h, letzte 35km Schotterpiste), San José–Manuel Antonio (3h), San José–Puerto Viejo (4.5h), San José–Liberia (4h, Autobahn). 4x4 PFLICHT für: Monteverde, Santa Teresa/Nicoya-Südspitze, Drake Bay/Osa (Flussquerungen), Rincón de la Vieja. Fähre Puntarenas–Paquera mit Auto (1.5h, vorbuchen in Hochsaison). Tortuguero: Auto in La Pavona parken, weiter per Boot (1.5h). Tankstellen regelmäßig an Hauptstraßen, seltener auf Nicoya und Osa. Parken in San José kostenpflichtig und Sicherheit beachten. Nachtfahrten vermeiden (schlechte Beleuchtung, Schlaglöcher).';
    }
    return 'Kombination aus Shuttle-Bussen (Interbus, Caribe Shuttle), Mietwagen und Inlandsflügen. San José–La Fortuna (3-3.5h Shuttle), San José–Monteverde (4-4.5h Shuttle), San José–Manuel Antonio (3h), San José–Puerto Viejo (4.5h), San José–Tamarindo (4.5h). Arenal–Monteverde: Jeep-Boot-Jeep (3.5h, Erlebnis!). Tortuguero nur per Boot (ab La Pavona, 1.5h). Drake Bay: Flug ab San José (~45min) oder Boot ab Sierpe (1.5h). Fähre Puntarenas–Paquera für Nicoya-Halbinsel (1.5h). Inlandsflüge (Sansa Airlines): San José–Drake Bay (45min), San José–Tortuguero (30min), San José–Tambor/Nicoya (30min), San José–Quepos (25min), San José–Liberia (50min). 4x4-Mietwagen empfohlen für Monteverde, Osa und Nicoya. Shuttles verbinden alle touristischen Hauptorte täglich.';
  },

  legModes: 'shuttle|car|flight|boat',

  facts: [
    'Costa Rica hat keine Armee: Als einziges Land der Amerikas schaffte Costa Rica 1948 sein Militär ab und investiert das Budget stattdessen in Bildung und Gesundheit.',
    'Über 25% der Landesfläche stehen unter Naturschutz: Costa Rica hat 30 Nationalparks und erzeugt über 99% seines Stroms aus erneuerbaren Energien.',
    'Costa Rica beherbergt 5% der weltweiten Artenvielfalt auf nur 0,03% der Erdoberfläche – mehr Vogel- und Schmetterlingsarten als die USA und Kanada zusammen.',
    '"Pura Vida" ist mehr als ein Gruß: Die Redewendung bedeutet "pures Leben" und drückt die entspannte, lebensfreudige Philosophie der Ticos aus.',
    'Der Río Celeste im Tenorio-Nationalpark hat eine unwirklich himmelblaue Farbe, die durch eine chemische Reaktion von vulkanischen Mineralien mit dem Flusswasser entsteht.',
    'Costa Rica war das erste tropische Land, das die Abholzung komplett umkehrte: Nachdem in den 1980ern nur noch 21% Wald übrig waren, sind es heute wieder über 52%.',
    'Auf der Nicoya-Halbinsel leben einige der ältesten Menschen der Welt: Sie ist eine von nur fünf "Blue Zones" weltweit.',
    'Die Baird-Tapire im Corcovado-Nationalpark sind die größten Landsäugetiere Mittelamerikas und gelten als "lebende Fossilien".',
    'In Tortuguero nisten jährlich bis zu 40.000 grüne Meeresschildkröten – der Name bedeutet "Ort der Schildkröten".',
    'Costa Rica hat keinen offiziellen McDonald\'s-Slogan – die Ticos bevorzugen "Casados", ihr traditionelles Tellergericht mit Reis, Bohnen, Kochbanane und Fleisch.'
  ],

  wikiReferences: `Städte: "San_José,_Costa_Rica", "Liberia,_Costa_Rica", "Jacó,_Costa_Rica", "Quepos", "Tamarindo,_Costa_Rica", "Puerto_Viejo_de_Talamanca", "Cahuita", "Montezuma,_Costa_Rica", "Nosara"
Nationalparks: "Manuel_Antonio_National_Park", "Corcovado_National_Park", "Tortuguero_National_Park", "Tenorio_Volcano_National_Park", "Cahuita_National_Park", "Los_Quetzales_National_Park", "Rincón_de_la_Vieja_Volcano", "Braulio_Carrillo_National_Park"
Sehenswürdigkeiten: "Arenal_Volcano" (Vulkan Arenal), "Monteverde" (Nebelwald), "Poás_Volcano" (Vulkan Poás), "Nicoya_Peninsula" (Nicoya-Halbinsel), "Osa_Peninsula" (Osa-Halbinsel), "Pacuare_River" (Pacuare-Fluss), "Gulf_of_Papagayo" (Golf von Papagayo), "Sarapiquí_River" (Sarapiquí-Fluss), "Turrialba_Volcano" (Vulkan Turrialba), "Drake_Bay"`,

  adjustWikiReferences: `"San_José,_Costa_Rica", "Arenal_Volcano", "Monteverde", "Manuel_Antonio_National_Park", "Corcovado_National_Park", "Tortuguero_National_Park", "Poás_Volcano", "Tamarindo,_Costa_Rica", "Puerto_Viejo_de_Talamanca", "Nicoya_Peninsula", "Osa_Peninsula", "Pacuare_River", "Rincón_de_la_Vieja_Volcano"`
},

/* ============================================
   SAISONALE HINWEISE FÜR DEN GEMINI-PROMPT
   ============================================

   Costa Rica hat zwei Hauptsaisons:

   spring (Dez–Apr = Trockenzeit / Hochsaison):
   "Trockenzeit in Costa Rica (Dezember–April). Beste Reisezeit für die Pazifikküste (Guanacaste, Nicoya, Manuel Antonio).
    Sonnig und warm (25-35°C). Achtung: Hochsaison = höhere Preise und volle Hotels, besonders Weihnachten–Ostern.
    Früh buchen empfohlen für Monteverde, Manuel Antonio und Drake Bay. Karibikküste kann auch in der Trockenzeit
    Regen bekommen. Tortuguero: Grüne Schildkröten nisten Juli–Oktober (NICHT in der Trockenzeit)."

   summer (Mai–Aug = Beginn Regenzeit / Green Season):
   "Beginn der Regenzeit (Mai–August). Morgens oft sonnig, nachmittags heftige aber kurze Regenschauer.
    Vorteile: Günstigere Preise, weniger Touristen, üppig grüne Landschaft. Für Tortuguero ideal:
    Schildkröten-Nistzeit Juli–Oktober. Karibikküste hat im September–Oktober eine Mini-Trockenzeit.
    Osa/Corcovado: Wege können matschig werden, einige Lodges schließen September–Oktober.
    4x4-Mietwagen empfohlen. Pazifikküste nachmittags regnerisch."

   autumn (Sep–Nov = Höhepunkt Regenzeit):
   "Höhepunkt der Regenzeit (September–November). Stärkste Niederschläge, besonders Oktober.
    Einige abgelegene Gebiete (Drake Bay, Osa) schwer erreichbar – Straßen überflutet, Lodges geschlossen.
    Karibikküste hat paradoxerweise im September–Oktober oft gutes Wetter (Mini-Trockenzeit).
    Walbeobachtung in Uvita: Buckelwale August–Oktober aus dem Südpazifik, Dezember–März aus dem Nordpazifik.
    4x4-Mietwagen PFLICHT. Tortuguero: Letzte Schildkröten-Saison. Budget-Reisende profitieren von Nebensaison-Preisen."

   winter (Dez–Feb = Beginn Trockenzeit / Weihnachts-Hochsaison):
   "Beginn der Trockenzeit (Dezember–Februar). Weihnachts- und Neujahrs-Hochsaison: Höchste Preise,
    Hotels und Mietwagen Wochen im Voraus ausgebucht. Semana Santa (Osterwoche) ebenso.
    Perfektes Wetter an der Pazifikküste. Karibikküste kann regnerisch sein (Dez–Jan).
    Vulkane Arenal und Poás oft wolkenverhangen am Morgen. Regenwald-Gebiete (Monteverde, Sarapiquí)
    können auch in der Trockenzeit Nebel und leichten Regen haben. Frühbucher-Empfehlung für alle Unterkünfte."
   ============================================ */
