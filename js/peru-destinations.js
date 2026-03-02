/* ============================================
   PERU-DESTINATIONS.JS – Datenbank aller Peru-Ziele
   ============================================ */

const PERU_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'lima',
    name: 'Lima',
    lat: -12.0464,
    lng: -77.0428,
    tags: ['Großstadt', 'Kulinarik', 'Kultur'],
    wiki: 'Lima',
    highlights: 'Miraflores, Barranco, Plaza Mayor, Larco-Museum, Ceviche-Kultur',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Beste Infrastruktur Perus, moderne Kliniken, internationale Küche und Windeln überall verfügbar' },
      '1-3':  { rating: 'green', note: 'Parque Kennedy, Miraflores-Promenade und viele kinderfreundliche Restaurants' },
      '3-6':  { rating: 'green', note: 'Parque de la Reserva (Wasserspiele), Schokoladenmuseum und Strandpromenade' },
      '6-12': { rating: 'green', note: 'Larco-Museum, Katakomben, Paragliding zuschauen und Kochkurse für Kinder' },
      '12+':  { rating: 'green', note: 'Weltklasse-Gastronomie, Surfkurse, Streetart in Barranco und Nachtleben' }
    },
    desc: 'Perus pulsierende Hauptstadt an der Pazifikküste, weltberühmt für ihre Gastronomie und koloniale Altstadt'
  },
  {
    id: 'cusco',
    name: 'Cusco',
    lat: -13.5319,
    lng: -71.9675,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Cusco',
    highlights: 'Plaza de Armas, Sacsayhuamán, San-Pedro-Markt, Inka-Mauern, Koricancha',
    family: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Auf 3.400m Höhe – Höhenkrankheit ist ein ernstes Risiko für Babys, medizinisch schwierig' },
      '1-3':  { rating: 'red', note: 'Höhenkrankheit kann Kleinkinder stark belasten, steile Gassen und wenig Buggytauglich' },
      '3-6':  { rating: 'yellow', note: 'Höhenanpassung nötig (1-2 Tage), dann Marktbesuche und Lama-Streicheln möglich' },
      '6-12': { rating: 'green', note: 'Inka-Ruinen als Abenteuerspielplatz, Schokoladenmuseum und Alpaka-Farmen' },
      '12+':  { rating: 'green', note: 'Faszinierende Inka-Geschichte, lebhafte Märkte und Tor zu Machu Picchu' }
    },
    desc: 'Einstige Hauptstadt des Inka-Reiches auf 3.400m Höhe, wo Inka-Mauern nahtlos in Kolonialbauten übergehen'
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    altName: 'Aguas Calientes',
    lat: -13.1631,
    lng: -72.5450,
    tags: ['Geschichte', 'Natur', 'Abenteuer'],
    wiki: 'Machu_Picchu',
    highlights: 'Inka-Zitadelle, Sonnentempel, Huayna Picchu, Inka-Brücke, Sonnentor',
    family: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Steile Treppen, keine Buggys möglich, nur per Zug + Bus erreichbar – sehr anstrengend' },
      '1-3':  { rating: 'red', note: 'Gefährliche Absturzkanten ohne Geländer, Kleinkinder müssen getragen werden' },
      '3-6':  { rating: 'yellow', note: 'Machbar ab 4-5 Jahren mit gutem Schuhwerk, Zugfahrt ist ein Highlight' },
      '6-12': { rating: 'green', note: 'Unvergessliches Erlebnis – Inka-Ruinen erkunden, Lamas füttern, Zugabenteuer' },
      '12+':  { rating: 'green', note: 'Weltwunder hautnah, optionaler Huayna-Picchu-Aufstieg und Inka-Trail-Trekking' }
    },
    desc: 'Das ikonische Weltwunder der Inka, majestätisch auf einem Bergrücken über dem Urubamba-Tal thronend',
    dayTripFrom: [{ base: 'cusco', transit: '~4h Zug + Bus' }, { base: 'sacred-valley', transit: '~2h Zug + Bus' }]
  },
  {
    id: 'sacred-valley',
    name: 'Heiliges Tal',
    altName: 'Sacred Valley',
    lat: -13.2586,
    lng: -72.2583,
    tags: ['Geschichte', 'Kultur', 'Natur'],
    wiki: 'Sacred_Valley',
    highlights: 'Ollantaytambo, Pisac-Ruinen, Moray-Terrassen, Salineras de Maras, Chinchero',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Niedriger als Cusco (~2.800m), aber immer noch Höhe – gute Akklimatisierungsstation' },
      '1-3':  { rating: 'yellow', note: 'Terrassen und Ruinen mit Stufen, aber Ollantaytambo-Dorf ist flach und charmant' },
      '3-6':  { rating: 'green', note: 'Salzterrassen bestaunen, Lamas streicheln, bunte Märkte in Pisac besuchen' },
      '6-12': { rating: 'green', note: 'Moray-Terrassen erkunden, Salzminen, Weberei-Workshops und Inka-Festung klettern' },
      '12+':  { rating: 'green', note: 'Inka-Archäologie, Zip-Lining, Rafting auf dem Urubamba und Reitausflüge' }
    },
    desc: 'Das fruchtbare Urubamba-Tal mit Inka-Festungen, kreisrunden Terrassen und schneebedeckten Andengipfeln',
    dayTripFrom: [{ base: 'cusco', transit: '~1.5h Colectivo/Bus' }]
  },
  {
    id: 'arequipa',
    name: 'Arequipa',
    altName: 'Die Weiße Stadt',
    lat: -16.4090,
    lng: -71.5375,
    tags: ['Kultur', 'Geschichte', 'Kulinarik'],
    wiki: 'Arequipa',
    highlights: 'Kloster Santa Catalina, Plaza de Armas, Vulkan Misti, Juanita-Mumie, Sillar-Architektur',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Auf 2.335m Höhe – moderates Risiko, gute Kliniken verfügbar' },
      '1-3':  { rating: 'yellow', note: 'Koloniale Altstadt mit Kopfsteinpflaster, aber flach und überschaubar' },
      '3-6':  { rating: 'green', note: 'Bunte Klosteranlage, Plaza-Spielplätze und kindgerechte Picanterías' },
      '6-12': { rating: 'green', note: 'Kloster Santa Catalina als Labyrinth erkunden, Mumien-Museum und Vulkanblick' },
      '12+':  { rating: 'green', note: 'Kolonialgeschichte, Gourmet-Küche, Vulkan-Trekking und Colca-Canyon-Touren' }
    },
    desc: 'Perus elegante weiße Stadt aus Vulkangestein, eingerahmt von drei mächtigen Vulkanen'
  },
  {
    id: 'puno',
    name: 'Puno',
    altName: 'Titicacasee',
    lat: -15.8402,
    lng: -70.0219,
    tags: ['Kultur', 'Natur', 'Geschichte'],
    wiki: 'Puno',
    highlights: 'Schwimmende Uros-Inseln, Taquile-Insel, Titicacasee, Sillustani-Grabtürme, Folklore-Hauptstadt',
    family: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Auf 3.830m – höchster Punkt der typischen Route, Höhenkrankheit sehr wahrscheinlich für Babys' },
      '1-3':  { rating: 'red', note: 'Extreme Höhe belastet Kleinkinder stark, kalte Nächte und eingeschränkte Infrastruktur' },
      '3-6':  { rating: 'yellow', note: 'Bootsfahrt zu Uros-Inseln fasziniert Kinder, aber Höhe und Kälte beachten' },
      '6-12': { rating: 'green', note: 'Schwimmende Inseln sind einzigartig, Bootsabenteuer und Folklore-Shows begeistern' },
      '12+':  { rating: 'green', note: 'Titicacasee-Erlebnis, Taquile-Wanderung und faszinierende Aymara-Kultur' }
    },
    desc: 'Folklore-Hauptstadt Perus am Ufer des Titicacasees, des höchsten schiffbaren Sees der Welt'
  },
  {
    id: 'nazca',
    name: 'Nazca',
    lat: -14.8390,
    lng: -75.1120,
    tags: ['Geschichte', 'Abenteuer'],
    wiki: 'Nazca',
    highlights: 'Nazca-Linien (Rundflug), Chauchilla-Friedhof, Cantalloc-Aquädukte, Maria-Reiche-Museum',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Rundflüge nicht für Babys geeignet, extreme Hitze und kaum Infrastruktur' },
      '1-3':  { rating: 'red', note: 'Hauptattraktion (Rundflug) für Kleinkinder ungeeignet, wenig andere Aktivitäten' },
      '3-6':  { rating: 'red', note: 'Rundflüge erst ab 6-8 Jahren empfohlen, Hitze und Staub belasten kleine Kinder' },
      '6-12': { rating: 'yellow', note: 'Ab 8 Jahren Rundflug möglich, Aquädukte und Wüsten-Mumien faszinierend aber gruselig' },
      '12+':  { rating: 'green', note: 'Rundflug über die Linien ist unvergesslich, archäologische Stätten und Wüstenlandschaft' }
    },
    desc: 'Geheimnisvolle Wüstenstadt, Ausgangspunkt für Rundflüge über die rätselhaften Nazca-Linien'
  },
  {
    id: 'huacachina',
    name: 'Huacachina',
    lat: -14.0875,
    lng: -75.7626,
    tags: ['Abenteuer', 'Erholung'],
    wiki: 'Huacachina',
    highlights: 'Wüstenoase, Sandboarding, Dünenbuggy-Touren, Lagune, Sonnenuntergang über Dünen',
    family: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extreme Hitze, Sand überall, keine geeignete Infrastruktur für Babys' },
      '1-3':  { rating: 'yellow', note: 'Sand und Hitze anstrengend, aber Oase selbst hat Pools und ruhige Ecken' },
      '3-6':  { rating: 'yellow', note: 'Dünenbuggy zu wild für Kleine, aber Oasen-Lagune und Sandspiele möglich' },
      '6-12': { rating: 'green', note: 'Dünenbuggy-Abenteuer und Sandboarding ab 8 Jahren, Oase wie aus 1001 Nacht' },
      '12+':  { rating: 'green', note: 'Sandboarding, Buggy-Fahrt bei Sonnenuntergang und Backpacker-Atmosphäre' }
    },
    desc: 'Surreale Wüstenoase inmitten gewaltiger Sanddünen, berühmt für Sandboarding und Buggy-Abenteuer',
    dayTripFrom: [{ base: 'lima', transit: '~4.5h Bus (via Ica)' }]
  },
  {
    id: 'paracas',
    name: 'Paracas',
    lat: -13.8369,
    lng: -76.2506,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Paracas_National_Reserve',
    highlights: 'Islas Ballestas, Paracas-Nationalreservat, Rote Strände, Seelöwen, Humboldt-Pinguine',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bootsfahrt zu den Ballestas-Inseln kann wellig sein, aber ansonsten ruhige Küstenstadt' },
      '1-3':  { rating: 'green', note: 'Seelöwen und Pinguine vom Boot aus beobachten, ruhiger Strand zum Planschen' },
      '3-6':  { rating: 'green', note: 'Tier-Safari per Boot – Seelöwen, Pinguine und Pelikane begeistern alle Kinder' },
      '6-12': { rating: 'green', note: 'Ballestas-Inseln (Klein-Galápagos), Nationalreservat und rote Sandstrände' },
      '12+':  { rating: 'green', note: 'Meeresbiologie hautnah, Kitesurfen, Quad-Touren und spektakuläre Küstenlandschaft' }
    },
    desc: 'Perus Tor zur Meereswildnis mit den Ballestas-Inseln voller Seelöwen, Pinguine und Pelikane',
    dayTripFrom: [{ base: 'lima', transit: '~3.5h Bus' }]
  },
  {
    id: 'huaraz',
    name: 'Huaraz',
    lat: -9.5300,
    lng: -77.5280,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Huaraz',
    highlights: 'Laguna 69, Cordillera Blanca, Pastoruri-Gletscher, Huascarán-Nationalpark, Santa-Cruz-Trek',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Auf 3.050m Höhe, Trekkingziel – für Babys nicht geeignet' },
      '1-3':  { rating: 'red', note: 'Höhe und anspruchsvolle Wanderwege machen es für Kleinkinder untauglich' },
      '3-6':  { rating: 'red', note: 'Mehrstündige Trekkings auf über 4.000m – für kleine Kinder zu anstrengend' },
      '6-12': { rating: 'yellow', note: 'Leichtere Tageswanderungen möglich, Pastoruri-Gletscher als Highlight' },
      '12+':  { rating: 'green', note: 'Weltklasse-Trekking, Laguna 69, Klettern und Bergsteiger-Atmosphäre' }
    },
    desc: 'Perus Trekking-Hauptstadt am Fuße der Cordillera Blanca mit den höchsten tropischen Bergen der Welt'
  },
  {
    id: 'iquitos',
    name: 'Iquitos',
    lat: -3.7491,
    lng: -73.2538,
    tags: ['Natur', 'Abenteuer', 'Kultur'],
    wiki: 'Iquitos',
    highlights: 'Amazonas-Dschungellodges, Belén-Schwimmmarkt, Kautschuk-Villen, Rosa Flussdelfine, Nachtwanderungen',
    family: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Tropenkrankheiten, Moskitos und feuchte Hitze – für Babys ungeeignet' },
      '1-3':  { rating: 'red', note: 'Moskitos, Malaria-Risiko und anstrengende Dschungeltouren – nicht empfohlen' },
      '3-6':  { rating: 'yellow', note: 'Mit guten Lodges machbar, aber Moskitoschutz essentiell und Bootsfahrten lang' },
      '6-12': { rating: 'green', note: 'Dschungelabenteuer, Piranha-Angeln, Affen und Flussdelfine beobachten' },
      '12+':  { rating: 'green', note: 'Amazonas-Survival, Nachtwanderungen, indigene Gemeinschaften und Tier-Spotting' }
    },
    desc: 'Größte Stadt der Welt ohne Straßenanbindung, mitten im Amazonas-Regenwald gelegen'
  },
  {
    id: 'trujillo',
    name: 'Trujillo',
    lat: -8.1116,
    lng: -79.0288,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Trujillo,_Peru',
    highlights: 'Chan Chan (UNESCO), Sonnenpyramide (Huaca del Sol), Mondpyramide, Huanchaco-Strand, Caballitos de Totora',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Warmes Küstenklima, aber begrenzte touristische Infrastruktur abseits des Zentrums' },
      '1-3':  { rating: 'yellow', note: 'Ruinen wenig spannend für Kleinkinder, aber Strand Huanchaco zum Planschen geeignet' },
      '3-6':  { rating: 'green', note: 'Sandskulpturen in Chan Chan, Strand und die berühmten Schilfboote bestaunen' },
      '6-12': { rating: 'green', note: 'Prä-Inka-Ruinen erkunden, Schilfboot-Surfen probieren und Archäologie erleben' },
      '12+':  { rating: 'green', note: 'Chan Chan, Moche-Pyramiden, Surfkurse in Huanchaco und Marinera-Tanz' }
    },
    desc: 'Perus Kulturhauptstadt des Nordens mit Chan Chan, der größten Lehmziegelstadt der Welt'
  },
  {
    id: 'puerto-maldonado',
    name: 'Puerto Maldonado',
    lat: -12.5933,
    lng: -69.1891,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Puerto_Maldonado',
    highlights: 'Tambopata-Reservat, Papageien-Salzlecken, Riesenotter, Canopy-Walkways, Amazonas-Lodges',
    family: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Tropische Hitze, Moskitos und abgelegene Lodges – für Babys nicht geeignet' },
      '1-3':  { rating: 'red', note: 'Malaria-Gebiet, lange Bootsfahrten und keine medizinische Versorgung in den Lodges' },
      '3-6':  { rating: 'yellow', note: 'Familien-Lodges vorhanden, aber Moskitoschutz und Geduld bei Bootsfahrten nötig' },
      '6-12': { rating: 'green', note: 'Riesenotter, Papageien, Kaimane bei Nacht und Canopy-Walkways – Dschungelabenteuer' },
      '12+':  { rating: 'green', note: 'Intensive Amazonas-Erfahrung, Nachtexkursionen, Tier-Spotting und indigene Kultur' }
    },
    desc: 'Tor zum südlichen Amazonas-Regenwald mit erstklassigen Dschungellodges und unberührter Wildnis'
  },
  {
    id: 'colca-canyon',
    name: 'Colca Canyon',
    altName: 'Chivay',
    lat: -15.6380,
    lng: -71.8830,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Colca_Canyon',
    highlights: 'Cruz del Condor, Kondor-Beobachtung, Heiße Quellen, Terrassenfelder, Canyon-Trekking',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Auf 3.600-4.900m Höhe, lange Fahrt von Arequipa – für Babys ungeeignet' },
      '1-3':  { rating: 'red', note: 'Extreme Höhe, steile Canyon-Pfade und frühe Abfahrtszeiten belasten Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Cruz del Condor ist erreichbar per Auto, heiße Quellen in Chivay für Familien' },
      '6-12': { rating: 'green', note: 'Kondore beobachten, heiße Quellen und spektakuläre Schluchtenlandschaft' },
      '12+':  { rating: 'green', note: 'Canyon-Trekking (2-3 Tage), Kondor-Flugshow und Thermalbäder' }
    },
    desc: 'Einer der tiefsten Canyons der Welt, Heimat majestätischer Andenkondore mit bis zu 3m Flügelspannweite',
    dayTripFrom: [{ base: 'arequipa', transit: '~3.5h Bus/Tour' }]
  },
  {
    id: 'mancora',
    name: 'Máncora',
    lat: -4.1034,
    lng: -81.0458,
    tags: ['Erholung', 'Abenteuer'],
    wiki: 'Máncora',
    highlights: 'Surfstrände, Walbeobachtung (Jul-Okt), Schildkröten-Schutzstation, Poza de Barro, Vichayito-Strand',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Warmes Klima, aber abgelegener Ort mit begrenzter medizinischer Versorgung' },
      '1-3':  { rating: 'green', note: 'Warmes Meer, flache Strandabschnitte und entspannte Atmosphäre' },
      '3-6':  { rating: 'green', note: 'Sandstrände, Schildkröten beobachten und warmes Meer zum Planschen' },
      '6-12': { rating: 'green', note: 'Surfkurse, Walbeobachtung (saisonal) und Schildkröten-Schutzprojekt' },
      '12+':  { rating: 'green', note: 'Surfen, Kitesurfen, Whale-Watching und Backpacker-Strandleben' }
    },
    desc: 'Perus beliebtester Badeort mit warmem Meer, perfekten Surfwellen und Walbeobachtung'
  },

  // ===== OFF-THE-BEATEN-PATH (9) =====
  {
    id: 'chachapoyas',
    name: 'Chachapoyas',
    lat: -6.2316,
    lng: -77.8689,
    tags: ['Geschichte', 'Natur', 'Abenteuer'],
    wiki: 'Chachapoyas,_Peru',
    highlights: 'Kuélap-Festung, Gocta-Wasserfall, Sarkophage von Karajía, Revash-Mausoleen, Nebelwald',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Sehr abgelegen, lange Anreise, begrenzte medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Mehrstündige Wanderungen zu den Sehenswürdigkeiten, keine Infrastruktur für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Kuélap per Seilbahn erreichbar, aber Anreise nach Chachapoyas anstrengend' },
      '6-12': { rating: 'green', note: 'Kuélap-Festung als Abenteuer, Gocta-Wasserfall und Indiana-Jones-Feeling' },
      '12+':  { rating: 'green', note: 'Prä-Inka-Archäologie, epische Wanderungen und einer der höchsten Wasserfälle der Welt' }
    },
    desc: 'Abgelegene Wolkenkrieger-Region mit der mächtigen Kuélap-Festung und dem drittdritthöchsten Wasserfall der Welt'
  },
  {
    id: 'ayacucho',
    name: 'Ayacucho',
    lat: -13.1588,
    lng: -74.2232,
    tags: ['Kultur', 'Geschichte'],
    wiki: 'Ayacucho',
    highlights: '33 Kolonialkirchen, Semana Santa (größte Osterfeier), Wari-Ruinen, Quinua-Dorf, Kunsthandwerk',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Auf 2.760m Höhe, ruhige Stadt mit guter lokaler Versorgung' },
      '1-3':  { rating: 'yellow', note: 'Beschaulich und sicher, Höhe beachten, wenig touristische Infrastruktur' },
      '3-6':  { rating: 'green', note: 'Bunte Kirchen bestaunen, Kunsthandwerk-Workshops und freundliche Atmosphäre' },
      '6-12': { rating: 'green', note: 'Wari-Ruinen, Retablo-Workshops und lebhafte Märkte mit Kunsthandwerk' },
      '12+':  { rating: 'green', note: 'Perus authentischste Kolonialstadt, Semana-Santa-Prozessionen und Geschichte' }
    },
    desc: 'Perus bestgehütetes Geheimnis mit 33 Kolonialkirchen und der spektakulärsten Osterfeier Südamerikas'
  },
  {
    id: 'huancayo',
    name: 'Huancayo',
    lat: -12.0651,
    lng: -75.2049,
    tags: ['Kultur', 'Natur'],
    wiki: 'Huancayo',
    highlights: 'Mantaro-Tal, Sonntagsmarkt, Torre Torre, Huaytapallana-Gletscher, Zugfahrt Lima-Huancayo',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Auf 3.270m Höhe, ruhige Stadt mit lokaler Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Höhe beachten, aber große Märkte und Parks bieten Abwechslung' },
      '3-6':  { rating: 'green', note: 'Riesiger Sonntagsmarkt, Bauernhöfe im Mantaro-Tal und Torre-Torre-Felsformationen' },
      '6-12': { rating: 'green', note: 'Zugfahrt von Lima (eine der höchsten der Welt!), Marktabenteuer und Naturerlebnisse' },
      '12+':  { rating: 'green', note: 'Spektakuläre Zugfahrt, authentisches Andenleben und Gletscher-Trekking' }
    },
    desc: 'Lebhafte Andenstadt im fruchtbaren Mantaro-Tal, erreichbar über eine der höchsten Eisenbahnstrecken der Welt'
  },
  {
    id: 'cajamarca',
    name: 'Cajamarca',
    lat: -7.1638,
    lng: -78.5003,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Cajamarca',
    highlights: 'Cuarto del Rescate, Ventanillas de Otuzco, Baños del Inca, Cumbe Mayo, Karneval',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Auf 2.750m Höhe, ruhige Kolonialstadt mit guter lokaler Versorgung' },
      '1-3':  { rating: 'yellow', note: 'Höhe beachten, Thermalquellen Baños del Inca zum Aufwärmen und Planschen' },
      '3-6':  { rating: 'green', note: 'Heiße Quellen, Bauernhöfe und Käseherstellung hautnah erleben' },
      '6-12': { rating: 'green', note: 'Inka-Geschichte (Atahualpas Lösegeld), Thermalquellen und mysteriöse Felsgravuren' },
      '12+':  { rating: 'green', note: 'Historischer Wendepunkt der Inka-Geschichte, Karneval und archäologische Stätten' }
    },
    desc: 'Historische Andenstadt, wo 1532 das Schicksal des Inka-Reiches besiegelt wurde'
  },
  {
    id: 'lunahuana',
    name: 'Lunahuaná',
    lat: -12.9580,
    lng: -76.1430,
    tags: ['Abenteuer', 'Kulinarik', 'Erholung'],
    wiki: 'Lunahuaná',
    highlights: 'Wildwasser-Rafting, Canopy-Zip-Lines, Weinberge (Pisco), Inka-Brücke, Kajak',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abenteuer-Destination, keine geeigneten Aktivitäten für Babys' },
      '1-3':  { rating: 'yellow', note: 'Weingüter und Natur genießbar, aber Hauptaktivitäten für Kleinkinder ungeeignet' },
      '3-6':  { rating: 'yellow', note: 'Leichtes Rafting (Klasse I-II) ab 5 Jahren, Weinberge und Picknick am Fluss' },
      '6-12': { rating: 'green', note: 'Rafting, Zip-Lining, Kajak und Pisco-Traubensaft probieren' },
      '12+':  { rating: 'green', note: 'Wildwasser-Rafting, Canopy, Mountainbike und Pisco-Verkostung (für Eltern)' }
    },
    desc: 'Perus Abenteuer-Hauptstadt nahe Lima mit Wildwasser-Rafting und Pisco-Weinbergen im Cañete-Tal',
    dayTripFrom: [{ base: 'lima', transit: '~3.5h Bus' }]
  },
  {
    id: 'tambopata',
    name: 'Tambopata',
    lat: -12.8167,
    lng: -69.2833,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Tambopata_National_Reserve',
    highlights: 'Papageien-Salzlecken, Oxbow-Seen, Riesenotter, Canopy-Tower, Nacht-Kaimantouren',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegene Dschungellodges, Moskitos und keine medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Lange Bootsfahrten, Insekten und tropische Hitze – nicht empfehlenswert' },
      '3-6':  { rating: 'yellow', note: 'Familienlodges vorhanden (z.B. Refugio Amazonas), aber Dschungel bleibt fordernd' },
      '6-12': { rating: 'green', note: 'Papageien-Salzlecken, Riesenotter, Canopy-Tower und Dschungel-Abenteuer' },
      '12+':  { rating: 'green', note: 'Multi-Tages-Lodgeaufenthalte, Nachtexkursionen und intensive Naturerfahrung' }
    },
    desc: 'Eines der artenreichsten Schutzgebiete der Erde mit riesigen Papageien-Salzlecken und Riesenottern',
    dayTripFrom: [{ base: 'puerto-maldonado', transit: '~3h Boot flussaufwärts' }]
  },
  {
    id: 'pucallpa',
    name: 'Pucallpa',
    lat: -8.3791,
    lng: -74.5539,
    tags: ['Natur', 'Kultur'],
    wiki: 'Pucallpa',
    highlights: 'Yarinacocha-Lagune, Shipibo-Kunsthandwerk, Dschungel-Bootstouren, Aguas Calientes (Amazonas)',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Tropisches Klima, Mückengefahr und eingeschränkte medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Hitze, Insekten und wenig touristische Infrastruktur für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Yarinacocha-Lagune zum Bootfahren, aber sonst wenig kindgerechte Angebote' },
      '6-12': { rating: 'yellow', note: 'Shipibo-Dörfer besuchen und Bootfahrt auf der Lagune, aber kaum Infrastruktur' },
      '12+':  { rating: 'green', note: 'Authentischer Amazonas-Einblick, Shipibo-Kunst und Dschungel-Expeditionen' }
    },
    desc: 'Amazonas-Hafenstadt mit lebendiger Shipibo-Kultur und der malerischen Yarinacocha-Lagune'
  },
  {
    id: 'lamas',
    name: 'Lamas',
    lat: -6.4219,
    lng: -76.5232,
    tags: ['Kultur', 'Natur'],
    wiki: 'Lamas,_Peru',
    highlights: 'Quechua-Lamista-Dorf, Wasserfall-Wanderungen, Schokoladen-Plantagen, Castillo de Lamas, Regenwald',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegene Region, lange Anreise und kaum medizinische Versorgung' },
      '1-3':  { rating: 'yellow', note: 'Ruhiges Dorf, aber wenig Infrastruktur und lange Anfahrt' },
      '3-6':  { rating: 'green', note: 'Schokoladen-Plantagen, Wasserfälle und die Miniaturburg begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Schokoladenherstellung, Wasserfälle und indigene Kultur hautnah' },
      '12+':  { rating: 'green', note: 'Authentische indigene Kultur, Regenwald-Wanderungen und Kakao-Workshops' }
    },
    desc: 'Malerisches Bergdorf in der San-Martín-Region mit lebendiger Quechua-Lamista-Kultur und einer kuriosen Miniaturburg',
    dayTripFrom: [{ base: 'tarapoto', transit: '~30min Colectivo' }]
  },
  {
    id: 'oxapampa',
    name: 'Oxapampa',
    lat: -10.5764,
    lng: -75.4006,
    tags: ['Natur', 'Kultur', 'Erholung'],
    wiki: 'Oxapampa',
    highlights: 'Deutsch-österreichische Kolonie, Yanachaga-Chemillén-Nationalpark, Käseproduktion, Nebelwald, Orchideen',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Auf 1.800m angenehmes Klima, aber abgelegene Region mit begrenzter Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Ruhige Gegend mit Bauernhöfen, aber lange Anfahrt von Lima' },
      '3-6':  { rating: 'green', note: 'Bauernhöfe, Käsereien, Schmetterlinge und Nebelwälder zum Staunen' },
      '6-12': { rating: 'green', note: 'Nebelwald-Wanderungen, Orchideen, Käseherstellung und deutsch-peruanische Kultur' },
      '12+':  { rating: 'green', note: 'Einzigartige Kolonialgeschichte, Trekking im Nationalpark und Kaffee-Plantagen' }
    },
    desc: 'Deutsch-österreichische Siedlung im Nebelwald, wo bayerische Tradition auf tropischen Regenwald trifft'
  }
];
