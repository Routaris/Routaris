/* ============================================
   GUATEMALA-DESTINATIONS.JS – Datenbank aller Guatemala-Ziele
   ============================================ */

const GUATEMALA_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'antiguaguatemala',
    name: 'Antigua Guatemala',
    lat: 14.5586,
    lng: -90.7295,
    tags: ['Kultur', 'Geschichte'],
    wiki: 'Antigua_Guatemala',
    highlights: 'Arco de Santa Catalina, Cerro de la Cruz, Vulkan Agua, Barock-Ruinen, Jade-Museum',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Kompakte Kolonialstadt, flache Kopfsteinpflasterwege und gute touristische Infrastruktur' },
      '1-3':  { rating: 'green', note: 'Überschaubares Zentrum, Parks und Innenhöfe zum Entdecken, viele Cafés mit Kinderstühlen' },
      '3-6':  { rating: 'green', note: 'Schokoladen-Workshops, Vulkan-Blick vom Cerro de la Cruz und bunte Märkte' },
      '6-12': { rating: 'green', note: 'Ruinen erkunden, Jade-Museum, Kochkurse und Vulkan-Wanderungen (Pacaya)' },
      '12+':  { rating: 'green', note: 'Spanischkurse, Kaffee-Touren, Vulkanbesteigungen und lebhafte Restaurantszene' }
    },
    desc: 'UNESCO-Welterbe und koloniales Juwel zwischen drei Vulkanen – Guatemalas charmanteste Stadt mit barocken Kirchenruinen und lebendiger Kulturszene'
  },
  {
    id: 'guatemalacity',
    name: 'Guatemala-Stadt',
    lat: 14.6349,
    lng: -90.5069,
    tags: ['Großstadt', 'Kultur', 'Geschichte'],
    wiki: 'Guatemala_City',
    highlights: 'Museo Ixchel, Museo Popol Vuh, Zona Viva, Nationalpalast, Mercado Central',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Großstadtverkehr und Sicherheitsbedenken in manchen Vierteln, gute Krankenhäuser' },
      '1-3':  { rating: 'yellow', note: 'Zona Viva sicher und belebt, aber Verkehr und Lärm anstrengend mit Kleinkindern' },
      '3-6':  { rating: 'yellow', note: 'Museen und Spielplätze in Zona Viva, aber begrenzte kinderfreundliche Bereiche' },
      '6-12': { rating: 'green', note: 'Museo Ixchel (Maya-Textilien), Popol Vuh und Kaminaljuyú-Ruinen spannend' },
      '12+':  { rating: 'green', note: 'Kultur, Gastronomie in Zona 10 und Gateway zu anderen Zielen' }
    },
    desc: 'Guatemalas pulsierende Hauptstadt mit erstklassigen Museen zur Maya-Kultur und als wichtigstes Drehkreuz des Landes'
  },
  {
    id: 'tikal',
    name: 'Tikal',
    lat: 17.2220,
    lng: -89.6237,
    tags: ['Geschichte', 'Natur', 'Kultur'],
    wiki: 'Tikal',
    highlights: 'Tempel I–V, Gran Plaza, Dschungel-Pyramiden, Brüllaffen, Tukane, Sonnenaufgang-Tour',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Tropische Hitze und Feuchtigkeit, lange Dschungelwege und abgelegene Lage' },
      '1-3':  { rating: 'yellow', note: 'Weite Strecken zu Fuß im Dschungel, Hitze und Mücken anstrengend' },
      '3-6':  { rating: 'green', note: 'Pyramiden wie Abenteuerspielplatz, Affen und Tukane begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Maya-Pyramiden besteigen, Dschungel-Abenteuer und Tierbeobachtung' },
      '12+':  { rating: 'green', note: 'Sonnenaufgang auf Tempel IV, Maya-Geschichte und Dschungel-Trekking' }
    },
    desc: 'Eine der mächtigsten Maya-Städte, deren Pyramiden bis zu 70 Meter hoch aus dem Dschungel von Petén ragen – UNESCO-Welterbe'
  },
  {
    id: 'panajachel',
    name: 'Lago de Atitlán',
    altName: 'Panajachel',
    lat: 14.7412,
    lng: -91.1560,
    tags: ['Natur', 'Kultur', 'Erholung'],
    wiki: 'Panajachel',
    highlights: 'Lago de Atitlán, Vulkane San Pedro & Tolimán, Maya-Dörfer, Lanchas, Calle Santander',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bootsfahrten auf dem See ruppig, steile Ufer und begrenztes Krankenhaus' },
      '1-3':  { rating: 'green', note: 'Lancha-Fahrten spannend, Dorfmärkte und ruhige Ufer zum Spielen' },
      '3-6':  { rating: 'green', note: 'Bootsausflüge zu Maya-Dörfern, Schmetterlingsreservat und Seeuferwege' },
      '6-12': { rating: 'green', note: 'Kayaking, Dorfbesuche, Maya-Kultur und Vulkan-Wanderungen für Fitte' },
      '12+':  { rating: 'green', note: 'Paragliding, Spanischkurse, Maya-Dörfer und atemberaubende Vulkankulisse' }
    },
    desc: 'Von Aldous Huxley als schönster See der Welt bezeichnet – umgeben von drei Vulkanen und traditionellen Maya-Dörfern'
  },
  {
    id: 'flores',
    name: 'Flores',
    altName: 'Petén',
    lat: 16.9306,
    lng: -89.8923,
    tags: ['Kultur', 'Erholung', 'Geschichte'],
    wiki: 'Flores,_Petén',
    highlights: 'Inselstadt im Petén-Itzá-See, Tikal-Gateway, bunte Häuser, Sonnenuntergänge, Yaxhá-Ausflüge',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kleine Inselstadt, begrenzte Infrastruktur aber ruhig und sicher' },
      '1-3':  { rating: 'green', note: 'Überschaubare Insel, See zum Planschen und bunte Gassen zum Erkunden' },
      '3-6':  { rating: 'green', note: 'Bootsfahrten auf dem See, bunte Häuser und Eis essen an der Uferpromenade' },
      '6-12': { rating: 'green', note: 'Basis für Tikal und Yaxhá, Kajakfahren und Inselerkundung' },
      '12+':  { rating: 'green', note: 'Entspanntes Insel-Feeling, Tikal-Ausflüge und Nachtleben am See' }
    },
    desc: 'Malerische Inselstadt im Petén-Itzá-See – das perfekte Basislager für Tikal und die Maya-Welt des Dschungel-Tieflands'
  },
  {
    id: 'chichicastenango',
    name: 'Chichicastenango',
    altName: 'Chichi',
    lat: 14.9431,
    lng: -91.1118,
    tags: ['Kultur', 'Kulinarik'],
    wiki: 'Chichicastenango',
    highlights: 'Donnerstag- & Sonntagsmarkt, Iglesia Santo Tomás, Maya-Rituale, Masken, Textilien',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Marktgedränge mit Baby im Tragetuch möglich, aber eng und laut' },
      '1-3':  { rating: 'yellow', note: 'Menschenmengen am Markttag anstrengend, bunte Farben faszinieren aber' },
      '3-6':  { rating: 'green', note: 'Farbenprächtiger Markt, Masken und bunte Textilien begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Marktabenteuer, Maya-Zeremonien beobachten und Handwerkskunst entdecken' },
      '12+':  { rating: 'green', note: 'Einer der authentischsten Märkte Lateinamerikas – Fotomotive und Kultur pur' }
    },
    desc: 'Heimat des farbenprächtigsten Maya-Markts Mittelamerikas, wo auf den Stufen der Kirche Santo Tomás noch heute Copal-Räucherungen stattfinden',
    dayTripFrom: [{ base: 'panajachel', transit: '~1.5h Shuttle' }]
  },
  {
    id: 'semucchampey',
    name: 'Semuc Champey',
    lat: 15.5333,
    lng: -89.9553,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Semuc_Champey',
    highlights: 'Türkise Kalksteinbecken, El Mirador Aussichtspunkt, Höhlentour K\'anba, Tubing auf dem Río Cahabón',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem abgelegen, steile Pfade und keine medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Steile Dschungelwege, rutschige Felsen und keine Infrastruktur' },
      '3-6':  { rating: 'yellow', note: 'Naturpools schön zum Baden, aber steiler Abstieg und rutschige Pfade' },
      '6-12': { rating: 'green', note: 'Naturpools, Höhlentour und Tubing als Abenteuer für aktive Kinder' },
      '12+':  { rating: 'green', note: 'Höhlen-Erkundung mit Kerzen, Tubing und das ikonische Schwimmbecken' }
    },
    desc: 'Surreale Kaskade türkiser Kalksteinbecken über einem unterirdischen Flusslauf im tiefsten Dschungel der Verapaces'
  },
  {
    id: 'quetzaltenango',
    name: 'Quetzaltenango',
    altName: 'Xela',
    lat: 14.8347,
    lng: -91.5181,
    tags: ['Kultur', 'Abenteuer', 'Geschichte'],
    wiki: 'Quetzaltenango',
    highlights: 'Parque Central, Fuentes Georginas (heiße Quellen), Cerro Quemado, Maya-Märkte, Spanischkurse',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Höhe von 2.300m beachten, kühles Klima und begrenzte Baby-Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Heiße Quellen Fuentes Georginas angenehm, aber Höhe und Kühle beachten' },
      '3-6':  { rating: 'green', note: 'Heiße Quellen, Marktbesuche und Parque Central zum Spielen' },
      '6-12': { rating: 'green', note: 'Vulkanwanderungen, heiße Quellen und authentisches guatemaltekisches Leben' },
      '12+':  { rating: 'green', note: 'Spanischkurse, Volunteering, Vulkan-Trekking und Nachtleben' }
    },
    desc: 'Guatemalas zweitgrößte Stadt auf 2.300 Metern Höhe – authentisch, ungeschliffen und Zentrum der K\'iche\'-Maya-Kultur'
  },
  {
    id: 'livingston',
    name: 'Livingston',
    lat: 15.8272,
    lng: -88.7475,
    tags: ['Kultur', 'Erholung', 'Kulinarik'],
    wiki: 'Livingston,_Guatemala',
    highlights: 'Garífuna-Kultur, Siete Altares Wasserfälle, Playa Blanca, Tapado-Fischsuppe, Bootszugang',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Nur per Boot erreichbar, begrenzte medizinische Versorgung und schwül' },
      '1-3':  { rating: 'yellow', note: 'Bootsanreise mit Kleinkind machbar, Strand und Garífuna-Trommeln spannend' },
      '3-6':  { rating: 'green', note: 'Strand, Garífuna-Musik und Siete Altares als Wasserfall-Abenteuer' },
      '6-12': { rating: 'green', note: 'Karibik-Flair, Wasserfälle und einzigartige Garífuna-Kultur erleben' },
      '12+':  { rating: 'green', note: 'Garífuna-Trommeln lernen, Karibik-Küche und tropisches Strand-Feeling' }
    },
    desc: 'Nur per Boot erreichbare Karibikstadt an der Flussmündung des Río Dulce – Heimat der afro-karibischen Garífuna-Kultur'
  },
  {
    id: 'riodulce',
    name: 'Río Dulce',
    lat: 15.6614,
    lng: -88.9969,
    tags: ['Natur', 'Geschichte', 'Erholung'],
    wiki: 'Castillo_de_San_Felipe_de_Lara',
    highlights: 'Río-Dulce-Schlucht, Castillo San Felipe, Heiße Quellen Finca Paraíso, Mangroven, Segeln',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bootsfahrten mit Baby möglich, aber abgelegen und feuchtheißes Klima' },
      '1-3':  { rating: 'green', note: 'Bootsfahrt durch die Schlucht und Castillo San Felipe begeistern' },
      '3-6':  { rating: 'green', note: 'Festung erkunden, Bootsabenteuer und heiße Quellen am Wasserfall' },
      '6-12': { rating: 'green', note: 'Bootsfahrt nach Livingston, Festung und Mangroven-Erkundung' },
      '12+':  { rating: 'green', note: 'Kajakfahren, Segeln, historische Festung und Fluss-Abenteuer' }
    },
    desc: 'Tropische Flusslandschaft mit kolonialer Festung, heißen Quellen im Dschungel und einer spektakulären Bootsfahrt nach Livingston'
  },
  {
    id: 'monterrico',
    name: 'Monterrico',
    lat: 13.8978,
    lng: -90.4847,
    tags: ['Natur', 'Erholung'],
    wiki: 'Monterrico,_Guatemala',
    highlights: 'Schwarzer Vulkanstrand, Meeresschildkröten-Aufzucht, Mangroven-Kanäle, Sonnenuntergänge, Biotopo Hawaii',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Starke Strömung am Pazifikstrand, keine guten Krankenhäuser in der Nähe' },
      '1-3':  { rating: 'yellow', note: 'Strand zu gefährlich zum Baden für Kleinkinder, Pool-Hotels vorhanden' },
      '3-6':  { rating: 'green', note: 'Schildkröten-Freilassung, Mangroven-Bootsfahrt und schwarzer Sand' },
      '6-12': { rating: 'green', note: 'Schildkröten-Aufzuchtstation, Mangroven-Kayak und Strandabenteuer' },
      '12+':  { rating: 'green', note: 'Surfen, Schildkröten-Erlebnis und entspannter Pazifikstrand' }
    },
    desc: 'Guatemalas beliebtester Pazifikstrand mit dramatisch schwarzem Vulkansand und einer wichtigen Meeresschildkröten-Aufzuchtstation',
    dayTripFrom: [{ base: 'antiguaguatemala', transit: '~2.5h Shuttle' }]
  },
  {
    id: 'coban',
    name: 'Cobán',
    lat: 15.4706,
    lng: -90.3706,
    tags: ['Natur', 'Kultur'],
    wiki: 'Cobán',
    highlights: 'Orchideenparadies, Kaffee-Plantagen, Semuc-Champey-Gateway, Grutas Rey Marcos, Rabin Ajau Festival',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Regenreiches Klima und ländliche Infrastruktur, aber ruhig und sicher' },
      '1-3':  { rating: 'green', note: 'Orchideen-Garten, Höhle Rey Marcos und Kaffeeplantagen als Ausflugsziele' },
      '3-6':  { rating: 'green', note: 'Höhlen-Abenteuer, Orchideen bestaunen und Kakao-Workshops' },
      '6-12': { rating: 'green', note: 'Semuc-Champey-Ausflug, Höhlen und Kaffee-Touren für neugierige Kinder' },
      '12+':  { rating: 'green', note: 'Abenteuer-Gateway zu Semuc Champey und authentische Q\'eqchi\'-Kultur' }
    },
    desc: 'Regenreiches Hochland der Verapaces – Tor zu Semuc Champey und Heimat von Orchideen, Kaffee und der Q\'eqchi\'-Maya-Kultur'
  },
  {
    id: 'huehuetenango',
    name: 'Huehuetenango',
    altName: 'Huehue',
    lat: 15.3194,
    lng: -91.4708,
    tags: ['Kultur', 'Abenteuer', 'Geschichte'],
    wiki: 'Huehuetenango',
    highlights: 'Zaculeu-Ruinen, Cuchumatanes-Gebirge, Hochlandmärkte, Kaffeeanbau, indigene Dörfer',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen im Hochland, lange Fahrzeiten und eingeschränkte Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Zaculeu-Ruinen als Spaziergang machbar, ansonsten wenig für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Ruinen erkunden und Märkte besuchen, Berglandschaft beeindruckend' },
      '6-12': { rating: 'green', note: 'Zaculeu-Ruinen, Cuchumatanes-Panoramastraße und Hochland-Abenteuer' },
      '12+':  { rating: 'green', note: 'Off-the-beaten-track Erlebnis, Trekking und authentische Maya-Kultur' }
    },
    desc: 'Gateway zum wilden Cuchumatanes-Gebirge mit den restaurierten Mam-Maya-Ruinen von Zaculeu und lebhaften Hochlandmärkten'
  },
  {
    id: 'sancristobalverapaz',
    name: 'San Cristóbal Verapaz',
    lat: 15.3647,
    lng: -90.4769,
    tags: ['Kultur', 'Natur'],
    wiki: 'San_Cristóbal_Verapaz',
    highlights: 'Laguna Chichoj, Poqomchí-Maya-Kultur, Silberarbeiten, Kirche, Markt',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kleines Hochlandstädtchen mit begrenzter Infrastruktur' },
      '1-3':  { rating: 'green', note: 'Laguna Chichoj als ruhiger Ausflugsort, Marktbesuche möglich' },
      '3-6':  { rating: 'green', note: 'See-Ufer zum Spielen und bunter Markt mit lokalen Leckereien' },
      '6-12': { rating: 'green', note: 'Laguna Chichoj, lokale Handwerkskunst und Maya-Traditionen' },
      '12+':  { rating: 'green', note: 'Authentisches Hochland-Erlebnis abseits des Tourismus' }
    },
    desc: 'Verschlafenes Hochlandstädtchen an der Laguna Chichoj – Zentrum der Poqomchí-Maya mit traditioneller Silberschmiedekunst',
    dayTripFrom: [{ base: 'coban', transit: '~30min Bus' }]
  },
  {
    id: 'lakeizabal',
    name: 'Lake Izabal / El Estor',
    altName: 'Izabal-See',
    lat: 15.4500,
    lng: -89.3500,
    tags: ['Natur', 'Erholung', 'Abenteuer'],
    wiki: 'Lake_Izabal',
    highlights: 'Guatemalas größter See, Bocas del Polochic Naturreservat, Denny\'s Beach, Segeln, Vogelbeobachtung',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen und tropisch heiß, begrenzte touristische Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Ruhiger See, aber wenig Baby-freundliche Einrichtungen vor Ort' },
      '3-6':  { rating: 'green', note: 'Bootsfahrten, Vogelbeobachtung und Strand am See' },
      '6-12': { rating: 'green', note: 'Naturreservat Bocas del Polochic, Kayaking und Tierwelt erkunden' },
      '12+':  { rating: 'green', note: 'Wasserabenteuer, Vogelbeobachtung und abgelegenes Naturerlebnis' }
    },
    desc: 'Guatemalas größter See, ein verstecktes Juwel mit dem artenreichen Bocas-del-Polochic-Naturreservat und entspanntem Karibik-Feeling'
  },

  // ===== OFF THE BEATEN PATH (9) =====
  {
    id: 'yaxha',
    name: 'Yaxhá',
    lat: 17.0722,
    lng: -89.3994,
    tags: ['Geschichte', 'Natur'],
    wiki: 'Yaxhá',
    highlights: 'Maya-Ruinen am See, Sonnenuntergang vom Tempel, Yaxhá-Lagune, weniger Touristen als Tikal',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Dschungel-Hitze und lange Wege, aber weniger überlaufen als Tikal' },
      '1-3':  { rating: 'yellow', note: 'Weite Wege im Dschungel, aber flachere Tempel als in Tikal' },
      '3-6':  { rating: 'green', note: 'See-Blick vom Tempel, Affen und Papageien im Dschungel' },
      '6-12': { rating: 'green', note: 'Maya-Ruinen mit weniger Touristen, See-Kulisse und Dschungeltiere' },
      '12+':  { rating: 'green', note: 'Sonnenuntergang vom Tempel über dem See – magisches Erlebnis' }
    },
    desc: 'Stimmungsvolle Maya-Ruinenstadt an einer glitzernden Lagune – die intimere Alternative zu Tikal mit unvergesslichen Sonnenuntergängen',
    dayTripFrom: [{ base: 'flores', transit: '~1.5h Shuttle' }]
  },
  {
    id: 'todossantos',
    name: 'Todos Santos Cuchumatán',
    lat: 15.5072,
    lng: -91.6039,
    tags: ['Kultur', 'Abenteuer'],
    wiki: 'Todos_Santos_Cuchumatán',
    highlights: 'Traditionelle Tracht, Allerheiligen-Pferderennen, Webkunst, Hochland-Wanderungen, Mam-Maya-Kultur',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem abgelegen auf 2.500m, gefährliche Bergstraßen und keine Klinik' },
      '1-3':  { rating: 'red', note: 'Haarnadelkurven, Höhe und kaum Infrastruktur für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Bunte Trachten faszinierend, aber anstrengende Anreise und Höhe' },
      '6-12': { rating: 'yellow', note: 'Einzigartige Kultur und Webkunst, aber Abgeschiedenheit beachten' },
      '12+':  { rating: 'green', note: 'Authentischstes Maya-Dorf Guatemalas mit einzigartiger Tracht und Kultur' }
    },
    desc: 'Eines der authentischsten Maya-Dörfer Guatemalas auf 2.500 m Höhe, wo Männer und Frauen noch ihre leuchtend roten Trachten tragen'
  },
  {
    id: 'nebaj',
    name: 'Nebaj',
    altName: 'Ixil-Dreieck',
    lat: 15.4042,
    lng: -91.1464,
    tags: ['Kultur', 'Abenteuer', 'Natur'],
    wiki: 'Nebaj',
    highlights: 'Ixil-Maya-Kultur, Hochland-Trekking, Acul-Dorf mit Käserei, Webkunst, Wolkenwald',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Sehr abgelegen im Hochland, keine medizinische Versorgung und schlechte Straßen' },
      '1-3':  { rating: 'red', note: 'Lange Fahrzeiten auf Bergstraßen und kaum touristische Infrastruktur' },
      '3-6':  { rating: 'yellow', note: 'Dorfbesuche und Webkunst interessant, aber Abgeschiedenheit und Höhe' },
      '6-12': { rating: 'yellow', note: 'Wanderungen zu Dörfern wie Acul machbar, einzigartige Ixil-Kultur' },
      '12+':  { rating: 'green', note: 'Mehrtägige Treks, authentische Maya-Kultur und Wolkenwald-Erlebnis' }
    },
    desc: 'Herz des mystischen Ixil-Dreiecks im Hochland – traditionelle Maya-Gemeinden, Wolkenwälder und Erinnerungsorte der Bürgerkriegsgeschichte'
  },
  {
    id: 'acatenango',
    name: 'Acatenango',
    lat: 14.5009,
    lng: -90.8756,
    tags: ['Abenteuer', 'Natur'],
    wiki: 'Acatenango',
    highlights: 'Vulkan-Übernachtung (3.976m), Blick auf aktiven Fuego, Eruptions-Schauspiel, Campingabend',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extremer Aufstieg auf fast 4.000m, Kälte bis -5°C nachts – unmöglich' },
      '1-3':  { rating: 'red', note: 'Mehrstündiger steiler Aufstieg, Höhenkrankheit und Kälte – ausgeschlossen' },
      '3-6':  { rating: 'red', note: 'Aufstieg zu anstrengend und gefährlich für Kinder, Höhenkrankheit-Risiko' },
      '6-12': { rating: 'yellow', note: 'Nur für sehr fitte und bergerprobte Kinder ab 10, Kälte und Höhe extrem' },
      '12+':  { rating: 'green', note: 'Legendärer Vulkan-Trek mit Blick auf Fuego-Eruptionen – Bucket-List-Erlebnis' }
    },
    desc: 'Legendärer Vulkan-Overnight-Trek auf 3.976 m mit Blick auf die nächtlichen Lava-Eruptionen des benachbarten Volcán de Fuego'
  },
  {
    id: 'elmirador',
    name: 'El Mirador',
    lat: 17.7553,
    lng: -89.9203,
    tags: ['Geschichte', 'Abenteuer'],
    wiki: 'El_Mirador',
    highlights: 'La Danta-Pyramide (größte Maya-Struktur), 5-Tages-Dschungel-Trek, unausgegrabene Ruinen, Wildnis',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: '5-Tages-Dschungeltrek ohne jede Infrastruktur – völlig unmöglich' },
      '1-3':  { rating: 'red', note: 'Mehrtägiger Marsch durch Dschungel, Schlangen, Hitze – ausgeschlossen' },
      '3-6':  { rating: 'red', note: 'Extremes Wildnis-Trekking, kein Handyempfang, keine Rettung möglich' },
      '6-12': { rating: 'red', note: 'Zu anstrengend und gefährlich, selbst für sportliche Kinder zu extrem' },
      '12+':  { rating: 'yellow', note: 'Nur für extrem fitte und abenteuerlustige Jugendliche mit Trekking-Erfahrung' }
    },
    desc: 'Die größte Maya-Pyramide der Welt, versteckt im undurchdringlichen Petén-Dschungel – erreichbar nur durch einen epischen 5-Tages-Trek'
  },
  {
    id: 'lanquin',
    name: 'Lanquín',
    lat: 15.5833,
    lng: -89.9833,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Lanquín',
    highlights: 'Lanquín-Höhlen (Fledermäuse), Gateway zu Semuc Champey, Tubing auf dem Río Cahabón, Backpacker-Vibe',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Backpacker-Ort mit Party-Atmosphäre, keine Baby-Infrastruktur' },
      '1-3':  { rating: 'red', note: 'Höhlenwege rutschig und dunkel, abgelegen und wenig Komfort' },
      '3-6':  { rating: 'yellow', note: 'Fledermaus-Spektakel am Höhlenausgang faszinierend, Weg aber rutschig' },
      '6-12': { rating: 'green', note: 'Höhlen-Abenteuer, Fledermäuse und Fluss-Tubing begeistern' },
      '12+':  { rating: 'green', note: 'Backpacker-Paradies mit Höhlen, Tubing und Semuc-Champey-Trips' }
    },
    desc: 'Verschlafenes Dorf am Eingang zu den Lanquín-Höhlen, aus denen bei Sonnenuntergang Millionen Fledermäuse ausschwärmen – Gateway zu Semuc Champey'
  },
  {
    id: 'sanpedrolalaguna',
    name: 'San Pedro La Laguna',
    lat: 14.6933,
    lng: -91.2722,
    tags: ['Kultur', 'Erholung', 'Abenteuer'],
    wiki: 'San_Pedro_La_Laguna',
    highlights: 'Tz\'utujil-Maya-Kultur, Spanischkurse, Vulkan San Pedro besteigen, Hippie-Vibe, Kayaking',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Nur per Lancha erreichbar, steile Gassen aber ruhige Atmosphäre' },
      '1-3':  { rating: 'green', note: 'Ruhiger als Panajachel, Lancha-Fahrt und Seeufer zum Spielen' },
      '3-6':  { rating: 'green', note: 'Kunstmärkte, See-Aktivitäten und bunte Maya-Kultur für Kinder' },
      '6-12': { rating: 'green', note: 'Kayaking, Maya-Malerei-Workshops und Dorf-Erkundung' },
      '12+':  { rating: 'green', note: 'Vulkan San Pedro besteigen, Spanischkurse und alternatives Flair' }
    },
    desc: 'Alternativ-bohèmes Dorf am Fuß des Volcán San Pedro mit Spanischschulen, Tz\'utujil-Kunst und spektakulärer Seelage'
  },
  {
    id: 'iximche',
    name: 'Iximché',
    lat: 14.7411,
    lng: -90.9864,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Iximché',
    highlights: 'Kaqchikel-Maya-Hauptstadt, Tempelplattformen, Ballspielplatz, Maya-Zeremonien, Panoramablick',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flaches Gelände, überschaubares Areal und schattige Rasenflächen' },
      '1-3':  { rating: 'green', note: 'Offene Wiesen zum Laufen und flache Ruinen zum Erkunden' },
      '3-6':  { rating: 'green', note: 'Tempelplattformen klettern, Ballspielplatz und Picknickmöglichkeiten' },
      '6-12': { rating: 'green', note: 'Maya-Geschichte hautnah, Zeremonien beobachten und Panoramablick' },
      '12+':  { rating: 'green', note: 'Aktiver Maya-Zeremonienort mit historischer Bedeutung und Weitblick' }
    },
    desc: 'Einstige Hauptstadt der Kaqchikel-Maya – eine der wenigen Maya-Stätten, an der heute noch traditionelle Zeremonien abgehalten werden',
    dayTripFrom: [{ base: 'antiguaguatemala', transit: '~1h Shuttle' }]
  },
  {
    id: 'biotopoquetzal',
    name: 'Biotopo del Quetzal',
    altName: 'Mario Dary Rivera',
    lat: 15.2125,
    lng: -90.2264,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Resplendent_quetzal',
    highlights: 'Quetzal-Vogelbeobachtung, Nebelwald-Wanderungen, Bromelien, Moos-Bäume, Wasserfälle',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Feuchter Nebelwald mit rutschigen Pfaden und kühlem Klima' },
      '1-3':  { rating: 'yellow', note: 'Wanderwege steil und nass, Vogelbeobachtung erfordert Geduld' },
      '3-6':  { rating: 'green', note: 'Moosbedeckte Märchenwälder und bunte Vögel faszinieren Kinder' },
      '6-12': { rating: 'green', note: 'Quetzal-Suche als Schatzjagd, Wasserfälle und Nebelwald-Abenteuer' },
      '12+':  { rating: 'green', note: 'Vogelbeobachtung, mystische Nebelwälder und Biologen-Erlebnis' }
    },
    desc: 'Geheimnisvolles Nebelwald-Reservat auf dem Weg nach Cobán – einer der besten Orte, um den heiligen Quetzal-Vogel der Maya in freier Wildbahn zu sehen',
    dayTripFrom: [{ base: 'coban', transit: '~1h Bus' }]
  }
];
