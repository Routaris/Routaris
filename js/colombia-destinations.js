/* ============================================
   COLOMBIA-DESTINATIONS.JS – Datenbank aller Kolumbien-Ziele
   ============================================ */

const COLOMBIA_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'bogota',
    name: 'Bogotá',
    lat: 4.7110,
    lng: -74.0721,
    tags: ['Großstadt', 'Kultur', 'Kulinarik'],
    wiki: 'Bogotá',
    highlights: 'Museo del Oro, La Candelaria, Monserrate, Plaza de Bolívar, Zona G, Botero-Museum',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Höhenlage (2.640m) kann Babys belasten – Akklimatisierung einplanen, gute Kliniken vorhanden' },
      '1-3':  { rating: 'yellow', note: 'Höhenlage erfordert langsame Eingewöhnung, aber Parkanlagen und Museen bieten Abwechslung' },
      '3-6':  { rating: 'green', note: 'Botero-Museum, Seilbahn auf den Monserrate und Simón-Bolívar-Park begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Goldmuseum, Planetarium, Graffiti-Touren in La Candelaria und interaktive Museen' },
      '12+':  { rating: 'green', note: 'Streetart-Szene, Gastronomie-Boom, Museen und lebhaftes Nachtleben in der Zona Rosa' }
    },
    desc: 'Kolumbiens pulsierende Hauptstadt auf 2.640m Höhe, wo koloniale Plätze auf eine blühende Streetart-Szene und weltklasse Gastronomie treffen'
  },
  {
    id: 'cartagena',
    name: 'Cartagena',
    lat: 10.3910,
    lng: -75.5364,
    tags: ['Geschichte', 'Kultur', 'Erholung'],
    wiki: 'Cartagena,_Colombia',
    highlights: 'Altstadt (UNESCO), Castillo San Felipe, Getsemaní, Islas del Rosario, Stadtmauer',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Tropische Hitze und Luftfeuchtigkeit belasten Babys – gute Kliniken und klimatisierte Hotels vorhanden' },
      '1-3':  { rating: 'green', note: 'Pferdekutschen durch die Altstadt, Bootsfahrten zu den Rosario-Inseln und flache Strände' },
      '3-6':  { rating: 'green', note: 'Festungsmauern erklettern, bunte Gassen und Bootstrip zu den Rosario-Inseln begeistern' },
      '6-12': { rating: 'green', note: 'Castillo San Felipe erkunden, Schnorcheln an den Rosario-Inseln und Eiscreme in Getsemaní' },
      '12+':  { rating: 'green', note: 'Kolonialgeschichte, Streetart in Getsemaní, Strandtage und lebhafte Atmosphäre' }
    },
    desc: 'Die Perle der Karibik – eine von Festungsmauern umschlossene UNESCO-Kolonialstadt mit farbenprächtigen Balkonen und karibischem Lebensgefühl'
  },
  {
    id: 'medellin',
    name: 'Medellín',
    lat: 6.2476,
    lng: -75.5658,
    tags: ['Großstadt', 'Kultur', 'Kulinarik'],
    wiki: 'Medellín',
    highlights: 'Comuna 13, Jardín Botánico, Plaza Botero, Metro-Seilbahn, Parque Arví',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Angenehmes Klima (ewiger Frühling auf 1.500m), gute Kliniken und moderne Infrastruktur' },
      '1-3':  { rating: 'green', note: 'Botanischer Garten, Metro-Seilbahnen und Parks bieten kinderfreundliche Erlebnisse' },
      '3-6':  { rating: 'green', note: 'Seilbahnfahrten, Parque Explora (Kindermuseum), Botero-Skulpturen und Botanischer Garten' },
      '6-12': { rating: 'green', note: 'Comuna-13-Graffitiführung, Metro-Seilbahn, Parque Explora und Planetarium begeistern' },
      '12+':  { rating: 'green', note: 'Streetart, innovative Stadtentwicklung, Food-Szene und Parque Arví-Wanderungen' }
    },
    desc: 'Die Stadt des ewigen Frühlings – einst berüchtigt, heute ein Innovationswunder mit spektakulären Seilbahnen und der weltweit bewunderten Comuna 13'
  },
  {
    id: 'santamarta',
    name: 'Santa Marta',
    lat: 11.2408,
    lng: -74.1990,
    tags: ['Erholung', 'Natur', 'Abenteuer'],
    wiki: 'Santa_Marta',
    highlights: 'Tayrona-Nationalpark, Minca, Playa Blanca, Quinta de San Pedro, Taganga',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Hitze und Tayrona-Wanderwege anspruchsvoll mit Baby, Strände in Santa Marta selbst aber gut' },
      '1-3':  { rating: 'yellow', note: 'Tayrona-Park mit Kleinkind herausfordernd, aber Stadtstrände und Minca bieten Alternativen' },
      '3-6':  { rating: 'green', note: 'Strandtage, Vogelbeobachtung in Minca und einfache Wanderwege im Tayrona-Park' },
      '6-12': { rating: 'green', note: 'Tayrona-Dschungelwanderung, Schnorcheln, Minca-Wasserfälle und Kakao-Touren' },
      '12+':  { rating: 'green', note: 'Tayrona-Park, Tauchen in Taganga, Minca-Kaffeetouren und Ciudad-Perdida-Trek-Start' }
    },
    desc: 'Kolumbiens älteste Stadt am Fuß der Sierra Nevada, Tor zum legendären Tayrona-Nationalpark und zur Ciudad Perdida'
  },
  {
    id: 'villadeleyva',
    name: 'Villa de Leyva',
    lat: 5.6333,
    lng: -73.5242,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Villa_de_Leyva',
    highlights: 'Plaza Mayor (größter Kopfsteinpflasterplatz Südamerikas), Fossilien-Museum, El Infiernito, Kloster Ecce Homo',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Kolonialstadt, saubere Luft auf 2.150m, gute Unterkünfte mit Innenhöfen' },
      '1-3':  { rating: 'green', note: 'Weitläufiger Plaza zum Laufen, ruhige Gassen und Dinosaurier-Fossilien faszinieren' },
      '3-6':  { rating: 'green', note: 'Fossilienmuseum mit echten Dinosauriern, Pferdereiten und der riesige Platz zum Spielen' },
      '6-12': { rating: 'green', note: 'Fossilien-Abenteuer, astronomisches Observatorium und koloniale Geschichte erleben' },
      '12+':  { rating: 'green', note: 'Gut erhaltene Kolonialarchitektur, Fossilien und Wanderungen in der Umgebung' }
    },
    desc: 'Malerisches Kolonialstädtchen mit dem größten Kopfsteinpflasterplatz Südamerikas und faszinierenden Dinosaurier-Fossilien in der Umgebung',
    dayTripFrom: [{ base: 'bogota', transit: '~3.5h Bus' }]
  },
  {
    id: 'sanandres',
    name: 'San Andrés',
    lat: 12.5847,
    lng: -81.7006,
    tags: ['Erholung', 'Natur', 'Abenteuer'],
    wiki: 'San_Andrés_(island)',
    highlights: 'Mar de los Siete Colores, Johnny Cay, Hoyo Soplador, La Piscinita, Schnorcheln',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Karibik-Insel mit flachen Stränden, gute medizinische Grundversorgung' },
      '1-3':  { rating: 'green', note: 'Flache Naturpools (La Piscinita), ruhige Strände und Bootsausflüge zu kleinen Inseln' },
      '3-6':  { rating: 'green', note: 'Hoyo Soplador (Blasloch), Johnny-Cay-Inselausflug und Schnorcheln in flachem Wasser' },
      '6-12': { rating: 'green', note: 'Schnorcheln im Siebenfarbenmeer, Glasbodenboot und Inselhopping begeistern' },
      '12+':  { rating: 'green', note: 'Tauchen, Jet-Ski, karibisches Flair und Reggae-Kultur der Raizal-Bevölkerung' }
    },
    desc: 'Karibiktraum mit dem „Meer der sieben Farben" – eine kolumbianische Insel näher an Nicaragua als am Festland, mit Reggae-Kultur und Weltklasse-Schnorcheln'
  },
  {
    id: 'salento',
    name: 'Salento / Cocora-Tal',
    lat: 4.6378,
    lng: -75.5686,
    tags: ['Natur', 'Kultur', 'Kulinarik'],
    wiki: 'Cocora_Valley',
    highlights: 'Wachspalmen im Cocora-Tal, Kaffeefarm-Touren, Buntes Dorfzentrum, Forellen-Restaurants',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Wanderung im Cocora-Tal (4-5h) mit Baby nicht machbar, Dorf selbst aber ruhig und angenehm' },
      '1-3':  { rating: 'yellow', note: 'Cocora-Wanderung zu lang für Kleinkinder, Kaffeefarmen und Dorf aber gut machbar' },
      '3-6':  { rating: 'green', note: 'Die riesigen Wachspalmen beeindrucken, kurze Kaffeefarm-Tour und buntes Dorfleben' },
      '6-12': { rating: 'green', note: 'Cocora-Tal-Wanderung, Kaffeeernte erleben und Forellen in den Bergrestaurants probieren' },
      '12+':  { rating: 'green', note: 'Wanderung durch Nebelwald zu den höchsten Palmen der Welt, Kaffeekultur und Reiten' }
    },
    desc: 'Das Herz der Kaffeeregion – ein buntes Bergdorf als Tor zum Cocora-Tal mit den höchsten Palmen der Welt, umgeben von Kaffeeplantagen'
  },
  {
    id: 'cali',
    name: 'Cali',
    lat: 3.4516,
    lng: -76.5320,
    tags: ['Kultur', 'Kulinarik', 'Großstadt'],
    wiki: 'Cali',
    highlights: 'Salsa-Schulen, Cristo Rey, San Antonio, Zoocriadero de Cali, Río Pance, Chipichape-Mall',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Tropische Hitze anstrengend, aber gute Krankenhäuser und moderne Infrastruktur vorhanden' },
      '1-3':  { rating: 'yellow', note: 'Hitze und Verkehr belasten, aber Zoo, Parks und kinderfreundliche Restaurants bieten Abwechslung' },
      '3-6':  { rating: 'green', note: 'Zoo de Cali, Río Pance zum Planschen und kindgerechte Salsa-Kurse machen Spaß' },
      '6-12': { rating: 'green', note: 'Salsa-Tanzen lernen, Zoo besuchen und die lebhafte kolumbianische Kultur hautnah erleben' },
      '12+':  { rating: 'green', note: 'Salsa-Hauptstadt der Welt, lebhaftes Nachtleben, Streetfood und Cristo-Rey-Aussicht' }
    },
    desc: 'Die Salsa-Hauptstadt der Welt – eine lebhafte Tropenstadt, in der der Rhythmus an jeder Straßenecke pulsiert und die Lebensfreude ansteckend ist'
  },
  {
    id: 'barranquilla',
    name: 'Barranquilla',
    lat: 10.9639,
    lng: -74.7964,
    tags: ['Kultur', 'Kulinarik'],
    wiki: 'Barranquilla',
    highlights: 'Karneval (UNESCO), Museo del Caribe, Malecón del Río, Kathedrale, Streetfood-Kultur',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Tropische Hitze und eher industrie-geprägt, aber gute Kliniken verfügbar' },
      '1-3':  { rating: 'yellow', note: 'Karneval mit Kleinkindern laut und voll, aber Museo del Caribe und Malecón bieten ruhigere Alternativen' },
      '3-6':  { rating: 'green', note: 'Karnevalskostüme, Museo del Caribe und lebhafter Malecón begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Karneval hautnah erleben, Karibik-Museum und kolumbianische Küche entdecken' },
      '12+':  { rating: 'green', note: 'Zweitgrößter Karneval der Welt, Cumbia-Musik und authentische Karibik-Atmosphäre' }
    },
    desc: 'Heimat des zweitgrößten Karnevals der Welt – eine authentische Karibikstadt voller Cumbia-Rhythmen und kulinarischer Schätze am Río Magdalena'
  },
  {
    id: 'barichara',
    name: 'Barichara',
    lat: 6.6350,
    lng: -73.2244,
    tags: ['Geschichte', 'Kultur', 'Natur'],
    wiki: 'Barichara',
    highlights: 'Camino Real nach Guane, Kathedrale, Steinbauten, Handwerkerateliers, Chicamocha-Canyon-Nähe',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhiges Kolonialstädtchen auf 1.300m, saubere Luft und keine Hektik – ideal zum Entspannen' },
      '1-3':  { rating: 'green', note: 'Autofreie Pflasterstraßen, ruhige Atmosphäre und kurze Spaziergänge zu Aussichtspunkten' },
      '3-6':  { rating: 'green', note: 'Camino Real (kurze Strecke) wandern, Papierherstellung beobachten und Aussichten genießen' },
      '6-12': { rating: 'green', note: 'Wanderung nach Guane, Handwerksworkshops und die Geschichte der Steinbauten erkunden' },
      '12+':  { rating: 'green', note: 'Camino-Real-Wanderung, Paragliding in der Nähe und authentisches Kolonialflair genießen' }
    },
    desc: 'Kolumbiens schönstes Dorf – ein makelloses Kolonial-Juwel aus Naturstein auf einem Hochplateau über dem Chicamocha-Canyon'
  },
  {
    id: 'leticia',
    name: 'Leticia',
    altName: 'Amazonas',
    lat: -4.2153,
    lng: -69.9406,
    tags: ['Natur', 'Abenteuer', 'Kultur'],
    wiki: 'Leticia,_Amazonas',
    highlights: 'Amazonas-Dschungeltouren, Indigene Gemeinden, Rosa Flussdelfine, Dreiländereck (Kolumbien-Brasilien-Peru)',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Tropisches Dschungelklima, Moskitos, Malaria-Risiko und eingeschränkte medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Dschungeltouren mit Kleinkindern gefährlich, Moskitos und feuchte Hitze sehr belastend' },
      '3-6':  { rating: 'yellow', note: 'Rosa Delfine beobachten faszinierend, aber Dschungeltouren und Moskitos herausfordernd' },
      '6-12': { rating: 'yellow', note: 'Delfine, Affen und Dschungel sind aufregend – guter Moskitoschutz und kurze Touren wählen' },
      '12+':  { rating: 'green', note: 'Echtes Amazonas-Abenteuer, indigene Kulturen und das Dreiländereck erleben' }
    },
    desc: 'Kolumbiens Tor zum Amazonas – eine Dschungelstadt im Dreiländereck, wo man rosa Flussdelfine beobachtet und in indigenen Gemeinden übernachtet'
  },
  {
    id: 'popayan',
    name: 'Popayán',
    altName: 'Weiße Stadt',
    lat: 2.4419,
    lng: -76.6061,
    tags: ['Geschichte', 'Kultur', 'Kulinarik'],
    wiki: 'Popayán',
    highlights: 'Weiße Kolonialarchitektur, Puente del Humilladero, Osterprozessionen (UNESCO), Gastronomie-Hauptstadt',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Stadt auf 1.760m, mildes Klima und überschaubares Zentrum – gut mit Baby' },
      '1-3':  { rating: 'green', note: 'Flache Altstadt-Spaziergänge, Parks und gemütliche Cafés mit guter Infrastruktur' },
      '3-6':  { rating: 'green', note: 'Weiße Gebäude fotografieren, Brücken erkunden und die berühmte Küche probieren' },
      '6-12': { rating: 'green', note: 'Kolonialgeschichte, Museen und Popayáns Ruf als UNESCO-Gastronomiestadt entdecken' },
      '12+':  { rating: 'green', note: 'Gastronomie-Erlebnisse, lebendige Universitätsstadt und Tor zu Tierradentro und Silvia' }
    },
    desc: 'Die strahlend weiße Kolonialstadt, deren Osterprozessionen zum UNESCO-Welterbe gehören und die als Gastronomie-Hauptstadt Kolumbiens gilt'
  },
  {
    id: 'sangil',
    name: 'San Gil',
    lat: 6.5591,
    lng: -73.1347,
    tags: ['Abenteuer', 'Natur'],
    wiki: 'Chicamocha_National_Park',
    highlights: 'Rafting auf dem Río Fonce, Paragliding, Chicamocha-Canyon, Höhlentouren, Bungee-Jumping',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extremsport-Destination – mit Baby absolut ungeeignet, keine relevante Infrastruktur' },
      '1-3':  { rating: 'red', note: 'Aktivitäten wie Rafting und Paragliding für Kleinkinder nicht machbar' },
      '3-6':  { rating: 'yellow', note: 'Chicamocha-Seilbahn und leichte Wanderungen möglich, aber hauptsächlich Abenteuer-Ort' },
      '6-12': { rating: 'green', note: 'Leichtere Rafting-Touren, Chicamocha-Canyon-Seilbahn und Höhlentouren begeistern' },
      '12+':  { rating: 'green', note: 'Abenteuer-Hauptstadt: Rafting, Paragliding, Bungee und Canyoning – Teenager-Traum' }
    },
    desc: 'Kolumbiens Abenteuer-Hauptstadt – Rafting, Paragliding und Canyoning vor der dramatischen Kulisse des Chicamocha-Canyons'
  },
  {
    id: 'bucaramanga',
    name: 'Bucaramanga',
    altName: 'Stadt der Parks',
    lat: 7.1254,
    lng: -73.1198,
    tags: ['Großstadt', 'Kulinarik', 'Natur'],
    wiki: 'Bucaramanga',
    highlights: 'Parque del Agua, Chicamocha-Canyon, Paragliding-Startplatz, Streetfood (Hormigas Culonas), Parque García Rovira',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Angenehmes Klima auf 960m, gute Krankenhäuser und zahlreiche Parks mit Grünflächen' },
      '1-3':  { rating: 'green', note: 'Zahlreiche Parks zum Spielen, gute Infrastruktur und kinderfreundliche Restaurants' },
      '3-6':  { rating: 'green', note: 'Parque del Agua (Wasserpark), Parks und die Seilbahn zum Chicamocha-Canyon begeistern' },
      '6-12': { rating: 'green', note: 'Wasserpark, Chicamocha-Seilbahn und die berühmten Ameisen (Hormigas Culonas) probieren' },
      '12+':  { rating: 'green', note: 'Paragliding über dem Canyon, authentisches Streetfood und lebhafte Universitätsstadt' }
    },
    desc: 'Die Stadt der Parks auf einem Hochplateau über dem Chicamocha-Canyon, berühmt für Paragliding und die exotischste Delikatesse Kolumbiens: geröstete Ameisen'
  },
  {
    id: 'providencia',
    name: 'Providencia',
    lat: 13.3500,
    lng: -81.3667,
    tags: ['Erholung', 'Natur', 'Abenteuer'],
    wiki: 'Providencia_Island',
    highlights: 'Crab Cay, McBean Lagoon (UNESCO-Biosphäre), Peak The Volcano, Manzanillo Beach, Raizal-Kultur',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegene Insel, nur per Flug ab San Andrés, begrenzte medizinische Versorgung' },
      '1-3':  { rating: 'yellow', note: 'Kleine Insel mit wenig Infrastruktur für Kleinkinder, aber ruhige Strände und klares Wasser' },
      '3-6':  { rating: 'green', note: 'Ruhige Strände, bunte Fische beim Schnorcheln und Schildkröten beobachten' },
      '6-12': { rating: 'green', note: 'Schnorcheln, Crab Cay erkunden und die einzigartige Raizal-Kultur kennenlernen' },
      '12+':  { rating: 'green', note: 'Unberührtes Paradies, Tauchen, Wanderung zum Peak und authentische Inselkultur' }
    },
    desc: 'Providencia ist San Andrés\' unberührte Schwesterinsel – ein karibisches Paradies mit UNESCO-Biosphärenreservat, nach Hurrikan Iota 2020 liebevoll wiederaufgebaut'
  },

  // ===== OFF THE BEATEN PATH (9) =====
  {
    id: 'tatacoa',
    name: 'Tatacoa-Wüste',
    altName: 'Desierto de la Tatacoa',
    lat: 3.2267,
    lng: -75.1714,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Tatacoa_Desert',
    highlights: 'Rote & graue Wüstenlandschaft, Sternenbeobachtung (Observatorium), Naturpools, Fossilien',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extreme Hitze (bis 45°C), kein Schatten und kaum Infrastruktur – für Babys ungeeignet' },
      '1-3':  { rating: 'yellow', note: 'Hitze tagsüber sehr belastend, aber abends kühl und Sternenhimmel faszinierend' },
      '3-6':  { rating: 'yellow', note: 'Marswüste beeindruckt Kinder, aber nur in den kühlen Morgen- oder Abendstunden besuchen' },
      '6-12': { rating: 'green', note: 'Surreale Wüstenlandschaft, Sternwarte und Fossilien bieten Abenteuer und Lernerlebnis' },
      '12+':  { rating: 'green', note: 'Nachtwanderungen, Sternenbeobachtung im Observatorium und einzigartige Wüstenfotos' }
    },
    desc: 'Kolumbiens kleine Wüste mit surrealen roten Canyons und einem der besten Sternenhimmel Südamerikas – wie ein Stück Mars mitten in den Anden'
  },
  {
    id: 'canocristales',
    name: 'Caño Cristales',
    altName: 'Regenbogenfluss',
    lat: 2.2433,
    lng: -73.7883,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Caño_Cristales',
    highlights: 'Regenbogenfarbener Fluss (Jun–Nov), Macarenia clavigera-Wasserpflanzen, Wanderungen, Naturpools',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Nur per Flug nach La Macarena erreichbar, dann Wanderungen – für Babys unmöglich' },
      '1-3':  { rating: 'red', note: 'Abgelegen, mehrstündige Wanderungen und keine Infrastruktur für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Farben des Flusses faszinieren, aber Wanderungen lang und Anreise umständlich' },
      '6-12': { rating: 'green', note: 'Einzigartiges Naturwunder – der Fluss leuchtet in Regenbogenfarben, unvergesslich' },
      '12+':  { rating: 'green', note: 'Spektakuläres Naturwunder, Wanderungen und Schwimmen in Naturpools im Dschungel' }
    },
    desc: 'Der „schönste Fluss der Welt" – ein Naturwunder, das zwischen Juni und November in Rot, Gelb, Grün und Blau erstrahlt, nur per Flug erreichbar'
  },
  {
    id: 'guatape',
    name: 'Guatapé',
    altName: 'Piedra del Peñol',
    lat: 6.2333,
    lng: -75.1667,
    tags: ['Natur', 'Kultur', 'Abenteuer'],
    wiki: 'Guatapé',
    highlights: 'Piedra del Peñol (740 Stufen), Bunter Dorfkern, Stausee-Bootstouren, Wassersport, Zócalos',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: '740 Stufen auf den Peñol-Fels mit Baby nicht machbar, buntes Dorf aber sehenswert' },
      '1-3':  { rating: 'yellow', note: 'Treppenstufen zum Fels mit Kleinkind anstrengend, Bootsfahrt und Dorf machbar' },
      '3-6':  { rating: 'green', note: 'Bunte Häuser bewundern, Bootsfahrt auf dem Stausee und Treppen-Abenteuer (mit Hilfe)' },
      '6-12': { rating: 'green', note: '740 Stufen auf den Peñol – Kinder lieben die Herausforderung und die Aussicht ist legendär' },
      '12+':  { rating: 'green', note: 'Spektakuläre Aussicht, Wassersport auf dem Stausee und instagrammable Dorf' }
    },
    desc: 'Ein farbenfroh bemaltes Seenland-Dorf mit dem ikonischen Peñol-Monolith – 740 Stufen führen zu einer der spektakulärsten Aussichten Kolumbiens',
    dayTripFrom: [{ base: 'medellin', transit: '~2h Bus' }]
  },
  {
    id: 'mompox',
    name: 'Mompox',
    altName: 'Santa Cruz de Mompox',
    lat: 9.2413,
    lng: -74.4263,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Mompós',
    highlights: 'UNESCO-Altstadt, Filigran-Goldschmiedekunst, Iglesia Santa Bárbara, Río Magdalena, Kolonialfriedhof',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen und heiß, lange Anreise – begrenzte medizinische Versorgung' },
      '1-3':  { rating: 'yellow', note: 'Hitze und lange Anfahrt belastend, aber ruhige Altstadt-Gassen zum Schlendern' },
      '3-6':  { rating: 'green', note: 'Bootsfahrten auf dem Río Magdalena und die verschlafenen Gassen laden zum Entdecken ein' },
      '6-12': { rating: 'green', note: 'Goldschmiedekunst beobachten, Bootsfahrten und die magische Zeitkapsel-Atmosphäre' },
      '12+':  { rating: 'green', note: 'García-Márquez-Atmosphäre, UNESCO-Welterbe und authentisches Kolumbien fernab der Massen' }
    },
    desc: 'Eine magische UNESCO-Zeitkapsel am Río Magdalena – das verschlafene Juwel, das Gabriel García Márquez zu seinen Romanen inspirierte'
  },
  {
    id: 'jardin',
    name: 'Jardín',
    lat: 5.5975,
    lng: -75.8194,
    tags: ['Natur', 'Kultur', 'Kulinarik'],
    wiki: 'Jardín',
    highlights: 'Kolibri-Garten, Cueva del Esplendor (Wasserfall-Höhle), Kaffeefarmen, Bunter Hauptplatz, Forellenfischen',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bergiges Terrain und lange Busfahrt ab Medellín, aber ruhiges Dorf angekommen' },
      '1-3':  { rating: 'green', note: 'Kolibris beobachten, Hauptplatz genießen und ruhige Dorfatmosphäre – kinderfreundlich' },
      '3-6':  { rating: 'green', note: 'Kolibri-Garten fasziniert, Seilbahnfahrt und Kaffeefarm-Besuche begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Wasserfall-Höhle erkunden, Kaffee-Ernte erleben und Forellen angeln' },
      '12+':  { rating: 'green', note: 'Cueva del Esplendor-Wanderung, Kaffeekultur und authentisches Dorfleben in den Anden' }
    },
    desc: 'Ein verstecktes Gartendorf in den Antioquia-Bergen, wo Kolibris durch Kaffeeplantagen schwirren und ein Wasserfall in eine Höhle stürzt',
    dayTripFrom: [{ base: 'medellin', transit: '~3.5h Bus' }]
  },
  {
    id: 'ciudadperdida',
    name: 'Ciudad Perdida Trek',
    altName: 'Lost City / Teyuna',
    lat: 11.0381,
    lng: -73.9253,
    tags: ['Abenteuer', 'Geschichte', 'Natur'],
    wiki: 'Ciudad_Perdida',
    highlights: '4-6 Tage Dschungel-Trek, Teyuna-Ruinen der Tayrona, Flussüberquerungen, Indigene Kogi-Dörfer',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Mehrtägiger Dschungeltrek – mit Baby absolut unmöglich' },
      '1-3':  { rating: 'red', note: '4-6 Tage durch dichten Dschungel, Flussquerungen – für Kleinkinder nicht machbar' },
      '3-6':  { rating: 'red', note: 'Anspruchsvoller Mehrtages-Trek durch Regenwald, Kinder unter 6 nicht zugelassen' },
      '6-12': { rating: 'yellow', note: 'Offiziell ab 8 Jahren möglich, aber körperlich sehr anspruchsvoll und keine Abkürzung' },
      '12+':  { rating: 'green', note: 'Unvergessliches Abenteuer durch den Dschungel zu einer älteren Ruinenstadt als Machu Picchu' }
    },
    desc: 'Kolumbiens Antwort auf Machu Picchu – ein 4-6-tägiger Trek durch dichten Dschungel zu den mystischen Ruinen der Tayrona-Zivilisation, älter als die Inka-Stadt'
  },
  {
    id: 'tierradentro',
    name: 'Tierradentro',
    lat: 2.5833,
    lng: -76.0333,
    tags: ['Geschichte', 'Kultur', 'Natur'],
    wiki: 'Tierradentro',
    highlights: 'UNESCO-Felsengräber, Bemalte Grabkammern, Archäologischer Park, Wanderungen, Nasa-Indigene',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Sehr abgelegen, steile Wanderwege zu den Grabkammern und kaum Infrastruktur' },
      '1-3':  { rating: 'red', note: 'Steile Auf- und Abstiege zu den Gräbern, abgelegen und wenig Kinderfreundliches' },
      '3-6':  { rating: 'yellow', note: 'Unterirdische Grabkammern können Kinder ängstigen, aber die Wanderungen sind beeindruckend' },
      '6-12': { rating: 'green', note: 'Unterirdische bemalte Gräber wie aus Indiana Jones, Wanderungen durch grüne Berge' },
      '12+':  { rating: 'green', note: 'Mysteriöse UNESCO-Felsengräber, herausfordernde Wanderungen und echte Abgelegenheit' }
    },
    desc: 'Mysteriöses UNESCO-Welterbe in den Anden – unterirdische Grabkammern mit jahrtausendealten Malereien, eines der bestgehüteten archäologischen Geheimnisse Südamerikas'
  },
  {
    id: 'nuqui',
    name: 'Nuquí / Bahía Solano',
    lat: 5.7117,
    lng: -77.2667,
    tags: ['Natur', 'Abenteuer', 'Erholung'],
    wiki: 'Nuquí',
    highlights: 'Buckelwale (Jun–Okt), Unberührte Pazifik-Strände, Thermalquellen, Dschungel-Wanderungen, Surfen',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Nur per Flug erreichbar, Dschungelgebiet, keine Straßen – für Babys nicht geeignet' },
      '1-3':  { rating: 'red', note: 'Abgelegen, rudimentäre Infrastruktur und tropisches Dschungelklima' },
      '3-6':  { rating: 'yellow', note: 'Walbeobachtung vom Boot aus fasziniert, aber Anreise und Unterkunft sehr einfach' },
      '6-12': { rating: 'yellow', note: 'Wale beobachten und im Dschungel wandern – aufregend, aber wenig Komfort' },
      '12+':  { rating: 'green', note: 'Buckelwale, Surfen, heiße Quellen im Dschungel und echte Wildnis erleben' }
    },
    desc: 'Kolumbiens wilde Pazifikküste – ein Dschungel-Paradies ohne Straßen, wo Buckelwale vor unberührten Stränden brechen und heiße Quellen aus dem Regenwald sprudeln'
  },
  {
    id: 'rincondelmar',
    name: 'Rincón del Mar',
    lat: 9.7167,
    lng: -75.6333,
    tags: ['Erholung', 'Natur'],
    wiki: 'Tolú',
    highlights: 'Biolumineszenz-Lagune, San-Bernardo-Inseln, Mangroven-Touren, Unberührte Strände, Isla Múcura',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegenes Fischerdorf mit einfacher Infrastruktur, ruhige Strände aber strandtauglich' },
      '1-3':  { rating: 'green', note: 'Ruhige, flache Strände ohne Wellen und entspannte Fischer-Atmosphäre' },
      '3-6':  { rating: 'green', note: 'Biolumineszenz im Wasser bestaunen, Bootsfahrt zu den San-Bernardo-Inseln' },
      '6-12': { rating: 'green', note: 'Leuchtende Plankton-Lagune bei Nacht, Schnorcheln an Isla Múcura und Mangroven erkunden' },
      '12+':  { rating: 'green', note: 'Biolumineszenz-Erlebnis, Inselhopping und echtes Fischer-Dorfgefühl fernab des Trubels' }
    },
    desc: 'Verschlafenes Fischerdorf mit einem der magischsten Naturphänomene Kolumbiens – einer Lagune, die nachts blau leuchtet, als Tor zu den San-Bernardo-Inseln'
  }
];
