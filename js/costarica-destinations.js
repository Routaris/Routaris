/* ============================================
   COSTARICA-DESTINATIONS.JS – Datenbank aller Costa-Rica-Ziele
   ============================================ */

const COSTARICA_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'sanjose',
    name: 'San Jos\u00e9',
    lat: 9.9281,
    lng: -84.0907,
    tags: ['Gro\u00dfstadt', 'Kultur', 'Kulinarik'],
    wiki: 'San_José,_Costa_Rica',
    highlights: 'Nationalmuseum, Mercado Central, Teatro Nacional, Barrio Escalante, Jade-Museum',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Gute Infrastruktur, Krankenhäuser und internationale Flughafen-Nähe' },
      '1-3':  { rating: 'green', note: 'Mercado Central, Parks und kinderfreundliche Restaurants vorhanden' },
      '3-6':  { rating: 'green', note: 'Jade-Museum, Nationalmuseum mit Schmetterlingsgarten begeistern' },
      '6-12': { rating: 'green', note: 'Museen und Barrio Escalante als kulinarisches Erlebnis genießen' },
      '12+':  { rating: 'green', note: 'Kultur, Kulinarik und guter Ausgangspunkt für Vulkan-Ausflüge' }
    },
    desc: 'Costa Ricas lebhafte Hauptstadt im Zentraltal, Tor zu Vulkanen und Nebelw\u00e4ldern mit \u00fcberraschend vielf\u00e4ltiger Gastro-Szene'
  },
  {
    id: 'arenal',
    name: 'Arenal / La Fortuna',
    altName: 'La Fortuna de San Carlos',
    lat: 10.4678,
    lng: -84.6438,
    tags: ['Natur', 'Abenteuer', 'Erholung'],
    wiki: 'Arenal_Volcano',
    highlights: 'Vulkan Arenal, Tabac\u00f3n-Thermalquellen, H\u00e4ngebr\u00fccken-Wanderung, La-Fortuna-Wasserfall, Kayaking Arenal-See',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Thermalquellen mit Babybecken, gute Hotels und flache Wanderwege' },
      '1-3':  { rating: 'green', note: 'Warme Thermalquellen, Hängebrücken und Wildtiere beobachten' },
      '3-6':  { rating: 'green', note: 'Hängebrücken, Wasserfall, heiße Quellen und Tukane entdecken' },
      '6-12': { rating: 'green', note: 'Kayaking, Wasserfall-Wanderung und Zipline begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Canyoning, Zipline und Vulkan-Wanderung – Abenteuer-Paradies' }
    },
    desc: 'Ikonischer Kegelvulkan mit dampfenden Thermalquellen, Wasserf\u00e4llen und endlosen Abenteuer-Aktivit\u00e4ten im tropischen Regenwald'
  },
  {
    id: 'monteverde',
    name: 'Monteverde',
    lat: 10.3025,
    lng: -84.8252,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Monteverde',
    highlights: 'Nebelwald-Reservat, H\u00e4ngebr\u00fccken, Nacht-Wanderung, Kolibri-Garten, Zipline-Canopy-Tour',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bergstraße holprig, kühl und feucht – Babys warm anziehen' },
      '1-3':  { rating: 'yellow', note: 'Hängebrücken mit Kleinkind herausfordernd, kühles Klima beachten' },
      '3-6':  { rating: 'green', note: 'Kolibri-Garten und Hängebrücken begeistern, Nachtwanderung ab 5 ok' },
      '6-12': { rating: 'green', note: 'Zipline-Canopy-Tour, Nachtwanderung und Quetzal-Suche spannend' },
      '12+':  { rating: 'green', note: 'Canopy Tour, Nebelwald-Trekking und Vogelbeobachtung faszinierend' }
    },
    desc: 'Mysteri\u00f6ser Nebelwald auf 1.400\u202fm H\u00f6he, Heimat des scheuen Quetzal-Vogels und Hunderten Orchideenarten'
  },
  {
    id: 'manuelantonio',
    name: 'Manuel Antonio',
    lat: 9.3928,
    lng: -84.1368,
    tags: ['Natur', 'Erholung', 'Abenteuer'],
    wiki: 'Manuel_Antonio_National_Park',
    highlights: 'Nationalpark, Wei\u00dfsand-Str\u00e4nde, Faultiere und Kapuzineraffen, Katamaran-Tour, Quepos-Hafenviertel',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flache Wege im Park, Strand direkt dabei und gute Hotels' },
      '1-3':  { rating: 'green', note: 'Affen und Faultiere direkt am Weg, flache Strände zum Planschen' },
      '3-6':  { rating: 'green', note: 'Kapuzineraffen, Faultiere und Strand – Kinder-Traumziel schlechthin' },
      '6-12': { rating: 'green', note: 'Schnorcheln, Tierbegegnungen und Katamaran-Tour begeistern' },
      '12+':  { rating: 'green', note: 'Perfekte Mischung aus Strand, Natur und Tiererlebnissen für Teens' }
    },
    desc: 'Costa Ricas beliebtester Nationalpark, wo tropischer Regenwald direkt auf paradiesische Str\u00e4nde trifft und Affen durch die Baumwipfel turnen'
  },
  {
    id: 'tortuguero',
    name: 'Tortuguero',
    lat: 10.5425,
    lng: -83.5024,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Tortuguero_National_Park',
    highlights: 'Meeresschildkr\u00f6ten-Nistpl\u00e4tze, Bootskan\u00e4le im Dschungel, Vogelbeobachtung, Karibik-D\u00f6rfer, Nacht-Touren',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Nur per Boot erreichbar, abgelegen und schwüles Tropenklima' },
      '1-3':  { rating: 'yellow', note: 'Lange Bootsanreise, Mücken und einfache Lodges herausfordernd' },
      '3-6':  { rating: 'green', note: 'Bootsfahrt spannend, Schildkröten und Krokodile begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Kanal-Bootsfahrt, Nacht-Schildkröten-Tour und Dschungel-Erlebnis' },
      '12+':  { rating: 'green', note: 'Schildkröten-Nistplätze und Dschungel-Kanäle sind unvergesslich' }
    },
    desc: 'Nur per Boot oder Flug erreichbares Kanalsystem im Dschungel, wo gr\u00fcne Meeresschildkr\u00f6ten nachts zur Eiablage an den Strand kommen'
  },
  {
    id: 'tamarindo',
    name: 'Tamarindo',
    lat: 10.2994,
    lng: -85.8375,
    tags: ['Erholung', 'Abenteuer', 'Kulinarik'],
    wiki: 'Tamarindo,_Costa_Rica',
    highlights: 'Surfstrände, Playa Grande (Lederschildkröten), Sonnenuntergänge, Bootstouren, Estero-Mangroven',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Strandort mit guter Infrastruktur, Supermärkte und Ärzte vorhanden' },
      '1-3':  { rating: 'green', note: 'Flacher Strand zum Planschen, Mangroven-Bootstour und Sonnenuntergänge' },
      '3-6':  { rating: 'green', note: 'Strandleben, Bootstouren und Schildkröten in Playa Grande' },
      '6-12': { rating: 'green', note: 'Surfkurse, Schnorcheln und Mangroven-Kayak für aktive Kinder' },
      '12+':  { rating: 'green', note: 'Surfen lernen, Nachtleben und Strand-Lifestyle für Teenager' }
    },
    desc: 'Lebhafter Surf- und Strandort an der Pazifikküste Guanacastes mit goldenem Sand, legendären Sonnenuntergängen und entspanntem Boho-Flair'
  },
  {
    id: 'puertoviejo',
    name: 'Puerto Viejo',
    altName: 'Puerto Viejo de Talamanca',
    lat: 9.6554,
    lng: -82.7539,
    tags: ['Erholung', 'Kultur', 'Natur'],
    wiki: 'Puerto_Viejo_de_Talamanca',
    highlights: 'Playa Cocles, Afro-Karibik-Kultur, Jaguar Rescue Center, Bribr\u00ed-Schokoladen-Tour, Punta Uva',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Entspannter Ort mit flachen Stränden und guter Grundversorgung' },
      '1-3':  { rating: 'green', note: 'Jaguar Rescue Center mit Tieren, Strand und Schokoladen-Tour' },
      '3-6':  { rating: 'green', note: 'Faultiere, Affen und Karibik-Strand – tropischer Kindertraum' },
      '6-12': { rating: 'green', note: 'Schnorcheln, Schokoladen-Tour und Jaguar Rescue Center begeistern' },
      '12+':  { rating: 'green', note: 'Surfen, Karibik-Kultur, Reggae und Bribri-Schokoladen-Erlebnis' }
    },
    desc: 'Entspanntes Karibik-Dorf mit Reggae-Rhythmen, afro-karibischer K\u00fcche, t\u00fcrkisem Meer und dem nahegelegenen Cahuita-Nationalpark'
  },
  {
    id: 'corcovado',
    name: 'Corcovado / Drake Bay',
    altName: 'Bah\u00eda Drake',
    lat: 8.5353,
    lng: -83.5853,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Corcovado_National_Park',
    highlights: 'Corcovado-Nationalpark, Tapire und Aras, Walbeobachtung, Ca\u00f1o-Insel-Schnorcheln, Drake Bay',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Dschungel-Wildnis, nur per Boot/Flug, keine Baby-Infrastruktur' },
      '1-3':  { rating: 'red', note: 'Anspruchsvolle Dschungel-Trails, Hitze und abgelegen – zu hart' },
      '3-6':  { rating: 'yellow', note: 'Drake Bay als Basis ok, aber Corcovado-Trails für Kleine zu lang' },
      '6-12': { rating: 'yellow', note: 'Aras und Tapire faszinierend, kürzere Trails von Drake Bay möglich' },
      '12+':  { rating: 'green', note: 'Einmaliges Dschungel-Erlebnis mit Tapiren und Aras für fitte Teens' }
    },
    desc: 'Der artenreichste Ort der Erde laut National Geographic \u2013 unber\u00fchrter Prim\u00e4rregenwald auf der Osa-Halbinsel mit Tapiren, Jaguaren und Aras'
  },
  {
    id: 'rincondelavieja',
    name: 'Rinc\u00f3n de la Vieja',
    lat: 10.7654,
    lng: -85.3240,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Rincón_de_la_Vieja_Volcano',
    highlights: 'Vulkanwanderung, Schlamm-Bäder, Wasserfall-Wanderungen, Tubing, Heiße Quellen',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Vulkangebiet mit Schlammbädern, einige Lodges familienfreundlich' },
      '1-3':  { rating: 'yellow', note: 'Schlammbäder lustig, aber Wanderwege für Kleinkinder zu lang' },
      '3-6':  { rating: 'green', note: 'Schlammbäder und heiße Quellen begeistern, kürzere Trails machbar' },
      '6-12': { rating: 'green', note: 'Vulkanwanderung, Tubing und Schlamm-Bäder machen riesig Spaß' },
      '12+':  { rating: 'green', note: 'Vulkan-Trekking, Wasserfall-Rappelling und Abenteuer-Programm' }
    },
    desc: 'Aktiver Vulkan mit blubbernden Schlammlöchern, heißen Quellen und abenteuerlichen Wanderwegen durch trockenen Tropenwald'
  },
  {
    id: 'papagayo',
    name: 'Papagayo',
    altName: 'Golf von Papagayo',
    lat: 10.6339,
    lng: -85.6553,
    tags: ['Erholung', 'Abenteuer'],
    wiki: 'Gulf_of_Papagayo',
    highlights: 'Luxusresorts, Schnorcheln und Tauchen, Playa Hermosa, Sportfischen, Catamaran-Touren',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Luxusresorts mit Babysitting, Pools und ruhigen Buchten' },
      '1-3':  { rating: 'green', note: 'Resort-Pools, ruhige Strände und kinderfreundliche Betreuung' },
      '3-6':  { rating: 'green', note: 'Schnorcheln in ruhigem Wasser, Resortpools und Katamaran-Touren' },
      '6-12': { rating: 'green', note: 'Schnorcheln, Tauchen und Wassersport in kristallklarem Wasser' },
      '12+':  { rating: 'green', note: 'Tauchen, Sportfischen und Strandleben im Luxus-Setting' }
    },
    dayTripFrom: [{ base: 'rincondelavieja', transit: '~1h Auto' }]
  },
  {
    id: 'santateresa',
    name: 'Santa Teresa / Mal Pa\u00eds',
    altName: 'Nicoya-Halbinsel',
    lat: 9.6404,
    lng: -85.1688,
    tags: ['Erholung', 'Abenteuer'],
    wiki: 'Nicoya_Peninsula',
    highlights: 'Surf-Breaks, Playa Santa Teresa, Montezuma-Wasserfall, Cabo Blanco, Yoga-Retreats',
    family: false,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Staubige Straßen und starke Strömungen am Strand, wenig Baby-Service' },
      '1-3':  { rating: 'yellow', note: 'Starke Brandung gefährlich, aber ruhigere Buchten zum Planschen vorhanden' },
      '3-6':  { rating: 'yellow', note: 'Montezuma-Wasserfall machbar, aber Surferstrände haben starke Strömung' },
      '6-12': { rating: 'green', note: 'Surfkurse, Montezuma-Wasserfall und Cabo Blanco erkunden' },
      '12+':  { rating: 'green', note: 'Surfen, Yoga und Strand-Lifestyle perfekt für Teenager' }
    },
    desc: 'Bohèmes Surf-Paradies an der Südspitze der Nicoya-Halbinsel mit endlosen Stränden, Yoga-Retreats und spektakulären Sonnenuntergängen'
  },
  {
    id: 'sarapiqui',
    name: 'Sarapiqu\u00ed',
    lat: 10.4540,
    lng: -84.0125,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Sarapiquí_River',
    highlights: 'Wildwasser-Rafting, Tirimbina-Reservat, Schokoladen-Tour, Vogelbeobachtung, Selva-Verde-Lodge',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Rafting nicht möglich, aber Öko-Lodges mit Natur ruhig und grün' },
      '1-3':  { rating: 'yellow', note: 'Schokoladen-Tour und Vogelbeobachtung nett, Rafting erst ab 5' },
      '3-6':  { rating: 'green', note: 'Schokoladen-Tour, Tirimbina-Reservat und leichtes Rafting ab 5' },
      '6-12': { rating: 'green', note: 'Wildwasser-Rafting (Klasse II-III) und Dschungel-Abenteuer' },
      '12+':  { rating: 'green', note: 'Rafting, Vogelbeobachtung und Regenwald-Lodges für Abenteurer' }
    },
    desc: 'Wildwasser-Rafting-Mekka und Biodiversitäts-Hotspot im karibischen Tiefland mit herausragender Vogelbeobachtung und Öko-Lodges'
  },
  {
    id: 'cahuita',
    name: 'Cahuita',
    lat: 9.7348,
    lng: -82.8381,
    tags: ['Natur', 'Erholung', 'Kultur'],
    wiki: 'Cahuita_National_Park',
    highlights: 'Cahuita-Nationalpark, Korallenriff (Schnorcheln), Faultiere, Afro-Karibik-Küche, Playa Negra',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhiges Dorf mit flachen Stränden und entspannter Atmosphäre' },
      '1-3':  { rating: 'green', note: 'Flache Strände, Faultiere am Weg und ruhige Karibik-Atmosphäre' },
      '3-6':  { rating: 'green', note: 'Schnorcheln am Riff, Faultiere und Kapuzineraffen am Strand' },
      '6-12': { rating: 'green', note: 'Korallenriff schnorcheln, Regenwald-Wanderung und Strand genießen' },
      '12+':  { rating: 'green', note: 'Schnorcheln, Karibik-Kultur und kreolische Küche entdecken' }
    },
    dayTripFrom: [{ base: 'puertoviejo', transit: '~20min Bus' }]
  },
  {
    id: 'poas',
    name: 'Poás / Zentraltal',
    altName: 'Vulkan Poás',
    lat: 10.1972,
    lng: -84.2306,
    tags: ['Natur', 'Kultur'],
    wiki: 'Poás_Volcano',
    highlights: 'Poás-Vulkankrater, Doka-Kaffeeplantage, La-Paz-Wasserfallgärten, Grecia, Sarchí-Kunsthandwerk',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Kurzer Vulkan-Spaziergang möglich, La Paz Wasserfallgärten mit Baby ok' },
      '1-3':  { rating: 'green', note: 'Kratersee-Blick vom Parkplatz, La Paz Waterfall Gardens begeistern' },
      '3-6':  { rating: 'green', note: 'Wasserfallgärten, Schmetterlinge und Kaffeeplantagen-Besuch' },
      '6-12': { rating: 'green', note: 'Vulkankrater, Kaffeeplantage und Sarchí-Kunsthandwerk entdecken' },
      '12+':  { rating: 'green', note: 'Vulkanologie, Kaffeekultur und traditionelles Handwerk erleben' }
    },
    dayTripFrom: [{ base: 'sanjose', transit: '~1.5h Auto' }]
  },
  {
    id: 'jaco',
    name: 'Jacó',
    lat: 9.6155,
    lng: -84.6283,
    tags: ['Erholung', 'Abenteuer'],
    wiki: 'Jacó,_Costa_Rica',
    highlights: 'Surfstrände, Krokodil-Brücke Río Tárcoles, Carara-Nationalpark (Aras), Nachtleben, ATV-Touren',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Strand-Infrastruktur ok, aber Surfer-Strömungen und lautes Nachtleben' },
      '1-3':  { rating: 'yellow', note: 'Krokodil-Brücke spannend, aber Strand hat starke Strömung' },
      '3-6':  { rating: 'green', note: 'Krokodile am Río Tárcoles, Aras im Carara-Park und Strandleben' },
      '6-12': { rating: 'green', note: 'Surfkurse, Krokodil-Brücke und ATV-Touren für aktive Kinder' },
      '12+':  { rating: 'green', note: 'Surfen, Nachtleben-Nähe und Abenteuer-Programm für Teenager' }
    },
    dayTripFrom: [{ base: 'sanjose', transit: '~1.5h Auto' }]
  },

  // ===== OFF THE BEATEN PATH (8) =====
  {
    id: 'rioceleste',
    name: 'Río Celeste / Tenorio',
    altName: 'Volcán Tenorio',
    lat: 10.7087,
    lng: -85.0157,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Tenorio_Volcano_National_Park',
    highlights: 'Himmelblauer Río Celeste, Vulkan Tenorio, Teñidero-Färbepunkt, Wanderwege, Heiße Quellen',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Wanderweg rutschig und steil, mit Baby in Trage anstrengend' },
      '1-3':  { rating: 'yellow', note: 'Steile Treppen zum Wasserfall, für Kleinkinder zu anstrengend' },
      '3-6':  { rating: 'green', note: 'Himmelblauer Fluss fasziniert, Wanderung mit ausdauernden Kindern ok' },
      '6-12': { rating: 'green', note: 'Türkisblauer Fluss ist magisch, Wanderung gut für fitte Kinder' },
      '12+':  { rating: 'green', note: 'Vulkan-Wanderung und einzigartiger blauer Fluss beeindrucken' }
    },
    desc: 'Verborgener himmelblauer Fluss im Tenorio-Vulkan-Nationalpark, dessen überirdische Farbe durch eine einzigartige chemische Reaktion entsteht'
  },
  {
    id: 'osa',
    name: 'Osa-Halbinsel',
    altName: 'Península de Osa',
    lat: 8.4957,
    lng: -83.4843,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Osa_Peninsula',
    highlights: 'Piedras-Blancas-Nationalpark, Golfo Dulce (Delfine), Mangroven-Kajak, Gold-Waschen, Regenwald-Lodges',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Dschungel-Wildnis, nur per Boot, keine Baby-Versorgung möglich' },
      '1-3':  { rating: 'red', note: 'Abgelegen, kein Strom in manchen Lodges und schwülheiß' },
      '3-6':  { rating: 'yellow', note: 'Golfo-Dulce-Delfine und Mangroven-Kajak mit älteren Kindern möglich' },
      '6-12': { rating: 'yellow', note: 'Delfin-Beobachtung und Regenwald-Lodge als Abenteuer-Erlebnis' },
      '12+':  { rating: 'green', note: 'Wildeste Natur Costa Ricas mit Delfinen und Primärregenwald' }
    },
    dayTripFrom: [{ base: 'corcovado', transit: '~1h Boot' }]
  },
  {
    id: 'turrialba',
    name: 'Turrialba',
    lat: 9.9044,
    lng: -83.6839,
    tags: ['Abenteuer', 'Kultur', 'Natur'],
    wiki: 'Turrialba_Volcano',
    highlights: 'Guayabo-Ruinen (Prä-Kolumbianisch), Turrialba-Vulkan, CATIE-Botanischer Garten, Käserei-Besuche, Rafting',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Ruhiges Bergstädtchen, aber Rafting und Vulkan nicht mit Baby' },
      '1-3':  { rating: 'yellow', note: 'Guayabo-Ruinen als Spaziergang machbar, Rafting erst ab 5' },
      '3-6':  { rating: 'green', note: 'Archäologische Ruinen und CATIE-Garten begeistern kleine Entdecker' },
      '6-12': { rating: 'green', note: 'Guayabo-Ruinen, Käserei und leichtes Rafting (ab 5+) machen Spaß' },
      '12+':  { rating: 'green', note: 'Wildwasser-Rafting und prä-kolumbianische Ruinen für Abenteurer' }
    },
    dayTripFrom: [{ base: 'sanjose', transit: '~1.5h Auto' }]
  },
  {
    id: 'sangerardo',
    name: 'San Gerardo de Dota',
    lat: 9.5560,
    lng: -83.8076,
    tags: ['Natur', 'Erholung'],
    wiki: 'Los_Quetzales_National_Park',
    highlights: 'Quetzal-Beobachtung, Nebelwald-Wanderungen, Forellenfischen, Savegre-Flusstal, Eichenwald',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kühles Bergklima und abgelegen, aber ruhige Lodges vorhanden' },
      '1-3':  { rating: 'yellow', note: 'Vogelbeobachtung erfordert Geduld und frühe Morgen-Wanderungen' },
      '3-6':  { rating: 'green', note: 'Quetzal-Suche als Schatzjagd, Fluss und Nebelwald erkunden' },
      '6-12': { rating: 'green', note: 'Vogelbeobachtung, Forellenfischen und Nebelwald-Wanderungen' },
      '12+':  { rating: 'green', note: 'Quetzal-Fotografie und anspruchsvolle Wanderungen im Nebelwald' }
    },
    desc: 'Abgeschiedenes Bergtal auf 2.200 m Höhe und einer der besten Orte der Welt, um den prächtig schillernden Quetzal-Vogel zu beobachten'
  },
  {
    id: 'pacuare',
    name: 'Pacuare-Fluss',
    lat: 9.8741,
    lng: -83.5596,
    tags: ['Abenteuer', 'Natur'],
    wiki: 'Pacuare_River',
    highlights: 'Weltklasse-Rafting (Klasse III-IV), Dschungel-Lodge, Seilrutschen über den Fluss, Bribri-Dörfer, Wasserfälle',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Klasse III-IV Wildwasser, absolut ungeeignet für Babys' },
      '1-3':  { rating: 'red', note: 'Gefährliches Wildwasser-Rafting, Mindestalter meist 10-12 Jahre' },
      '3-6':  { rating: 'red', note: 'Rafting zu gefährlich, Dschungel-Lodge nur schwer erreichbar' },
      '6-12': { rating: 'yellow', note: 'Dschungel-Lodge spannend, Rafting oft erst ab 12 erlaubt' },
      '12+':  { rating: 'green', note: 'Weltklasse-Rafting-Erlebnis für abenteuerlustige Jugendliche' }
    },
    desc: 'Einer der Top-10-Rafting-Flüsse der Welt, der sich durch eine tiefe Dschungelschlucht mit Wasserfällen und Tukanen windet'
  },
  {
    id: 'montezuma',
    name: 'Montezuma',
    lat: 9.6558,
    lng: -85.0689,
    tags: ['Erholung', 'Natur', 'Kultur'],
    wiki: 'Montezuma,_Costa_Rica',
    highlights: 'Montezuma-Wasserfälle, Cabo-Blanco-Reservat, Bohème-Atmosphäre, Isla Tortuga-Bootstour, Gezeitenpools',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bohème-Atmosphäre ruhig, aber Wasserfälle und Wege steil' },
      '1-3':  { rating: 'yellow', note: 'Wasserfall-Wanderung rutschig und steil mit Kleinkind' },
      '3-6':  { rating: 'green', note: 'Gezeitenpools und Strand zum Spielen, Wasserfall als Abenteuer' },
      '6-12': { rating: 'green', note: 'Wasserfall-Wanderung, Cabo Blanco und Isla Tortuga Bootstour' },
      '12+':  { rating: 'green', note: 'Wasserfall, Schnorcheln und entspanntes Hippie-Dorf-Feeling' }
    },
    dayTripFrom: [{ base: 'santateresa', transit: '~30min Auto' }]
  },
  {
    id: 'uvita',
    name: 'Uvita / Costa Ballena',
    lat: 9.1633,
    lng: -83.7356,
    tags: ['Natur', 'Erholung'],
    wiki: 'Uvita_(Costa_Rica)',
    highlights: 'Walfisch-Schwanzflosse (Sandbank), Walbeobachtung (Jul–Okt), Marino-Ballena-Nationalpark, Wasserfälle, Mangroven',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhiger Küstenort mit flachem Strand und entspannter Atmosphäre' },
      '1-3':  { rating: 'green', note: 'Sandbank zum Planschen bei Ebbe, Wale von der Küste beobachten' },
      '3-6':  { rating: 'green', note: 'Walfisch-Sandbank, Wasserfälle und Walbeobachtung begeistern' },
      '6-12': { rating: 'green', note: 'Walbeobachtung per Boot, Mangroven-Kayak und Strand-Erlebnis' },
      '12+':  { rating: 'green', note: 'Whale Watching, Surfen und Marine-Nationalpark für Naturliebhaber' }
    },
    dayTripFrom: [{ base: 'manuelantonio', transit: '~1.5h Auto' }]
  },
  {
    id: 'nosara',
    name: 'Nosara',
    lat: 9.9758,
    lng: -85.6530,
    tags: ['Erholung', 'Natur', 'Abenteuer'],
    wiki: 'Nosara',
    highlights: 'Playa Guiones (Surfstrand), Yoga-Hauptstadt, Ostional-Schildkröten-Arribada, Biologisches Reservat, Stand-Up-Paddling',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Surf-Strände mit starker Strömung, ruhigere Buchten vorhanden' },
      '1-3':  { rating: 'yellow', note: 'Schildkröten-Arribada beeindruckend, aber Strand gefährlich für Kleine' },
      '3-6':  { rating: 'green', note: 'Schildkröten-Masseneiablage und Biologisches Reservat faszinieren' },
      '6-12': { rating: 'green', note: 'Surfkurse, Schildkröten und Stand-Up-Paddling für aktive Kinder' },
      '12+':  { rating: 'green', note: 'Surfen, Yoga und Schildkröten-Erlebnis in entspannter Atmosphäre' }
    },
    desc: 'Weltberühmte Yoga- und Surf-Oase an der Nicoya-Halbinsel, wo in Ostional Hunderttausende Schildkröten gleichzeitig nisten'
  }
];
