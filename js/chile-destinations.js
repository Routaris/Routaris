/* ============================================
   CHILE-DESTINATIONS.JS – Datenbank aller Chile-Ziele
   ============================================ */

const CHILE_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'santiago',
    name: 'Santiago de Chile',
    lat: -33.4489,
    lng: -70.6693,
    tags: ['Großstadt', 'Kultur', 'Kulinarik'],
    wiki: 'Santiago',
    highlights: 'Cerro San Cristóbal, La Moneda, Barrio Lastarria, Mercado Central, Barrio Bellavista',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Moderne Infrastruktur, gute Krankenhäuser, Parks und kinderfreundliche Restaurants' },
      '1-3':  { rating: 'green', note: 'Parque Bicentenario, Seilbahn zum Cerro San Cristóbal und Kindermuseum MIM' },
      '3-6':  { rating: 'green', note: 'MIM Kindermuseum, Zoo im Cerro San Cristóbal, Parks und Eiscafés' },
      '6-12': { rating: 'green', note: 'Seilbahn, Mercado Central, Planetarium und Stadterkundung per Fahrrad' },
      '12+':  { rating: 'green', note: 'Street Art in Bellavista, Kulinarik-Touren und Blick vom Sky Costanera' }
    },
    desc: 'Chiles pulsierende Hauptstadt im Andenschatten, wo koloniale Architektur auf moderne Wolkenkratzer und lebendige Barrios trifft'
  },
  {
    id: 'valparaiso',
    name: 'Valparaíso',
    lat: -33.0472,
    lng: -71.6127,
    tags: ['Kultur', 'Geschichte', 'Kulinarik'],
    wiki: 'Valparaiso',
    highlights: 'Cerros mit Street Art (UNESCO), Ascensores, La Sebastiana (Neruda-Haus), Hafen, Concón',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Steile Hügel mit Kopfsteinpflaster schwierig mit Buggy, aber Aufzüge helfen' },
      '1-3':  { rating: 'yellow', note: 'Ascensores (historische Aufzüge) spannend, aber steile Gassen anstrengend mit Kleinkindern' },
      '3-6':  { rating: 'green', note: 'Aufzug-Fahrten, bunte Häuser entdecken und Hafenrundfahrten begeistern' },
      '6-12': { rating: 'green', note: 'Street-Art-Touren, Neruda-Museum und Hafenbesichtigung faszinieren' },
      '12+':  { rating: 'green', note: 'UNESCO-Kulturerbe, Street Art, Bohème-Flair und Kulinarik-Szene' }
    },
    desc: 'UNESCO-Welterbe mit bunten Hügeln voller Street Art, historischen Aufzügen und dem Geist des Dichters Pablo Neruda',
    dayTripFrom: [{ base: 'santiago', transit: '~1.5h Bus (Turbus/Pullman)' }]
  },
  {
    id: 'sanpedro',
    name: 'San Pedro de Atacama',
    lat: -22.9087,
    lng: -68.1997,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'San_Pedro_de_Atacama',
    highlights: 'Valle de la Luna, Geysire El Tatio, Salar de Atacama, Lagunas Altiplánicas, Sternenhimmel',
    family: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Höhenlage (2.400m) und extreme Trockenheit gefährlich für Babys' },
      '1-3':  { rating: 'red', note: 'Höhenkrankheit-Risiko, extreme Temperaturschwankungen und karge Infrastruktur' },
      '3-6':  { rating: 'yellow', note: 'Valle de la Luna möglich, aber Höhe und Hitze erfordern Vorsicht und Akklimatisierung' },
      '6-12': { rating: 'green', note: 'Mondtal-Wanderung, Flamingos am Salar und Sternbeobachtung begeistern' },
      '12+':  { rating: 'green', note: 'Geysire, Sandboarding, Vulkanbesteigungen und spektakulärer Sternenhimmel' }
    },
    desc: 'Oasendorf in der trockensten Wüste der Welt – Tor zu Mondlandschaften, Geysiren und dem klarsten Sternenhimmel der Erde'
  },
  {
    id: 'torresdelpaine',
    name: 'Torres del Paine',
    lat: -51.0000,
    lng: -73.0000,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Torres_del_Paine_National_Park',
    highlights: 'W-Trek, Grey-Gletscher, Cuernos del Paine, Lago Nordenskjöld, Guanakos, Kondore',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extremes Wetter, mehrtägige Trekkings und keine Baby-Infrastruktur im Park' },
      '1-3':  { rating: 'red', note: 'Wind, Kälte und lange Wanderstrecken ungeeignet für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Nur Tagesausflüge zu Aussichtspunkten möglich, Mehrtages-Treks nicht machbar' },
      '6-12': { rating: 'yellow', note: 'Kurze Wanderungen möglich, W-Trek erst ab 12+ empfohlen' },
      '12+':  { rating: 'green', note: 'W-Trek als Abenteuer, Gletscher-Kayak und Wildtierbeobachtung' }
    },
    desc: 'Patagoniens Kronjuwel – majestätische Granitnadeln, türkise Seen und gewaltige Gletscher in einem der schönsten Nationalparks der Welt'
  },
  {
    id: 'pucon',
    name: 'Pucón',
    lat: -39.2825,
    lng: -71.9544,
    tags: ['Natur', 'Abenteuer', 'Erholung'],
    wiki: 'Pucon',
    highlights: 'Vulkan Villarrica, Thermalquellen, Huerquehue-Nationalpark, Lago Villarrica, Rafting',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Ruhige Umgebung, aber eingeschränkte Baby-Infrastruktur außerhalb der Stadt' },
      '1-3':  { rating: 'green', note: 'Thermalquellen, Seeufer und leichte Spaziergänge ideal für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Thermalquellen, Strandspiele am See und Tierbeobachtung im Nationalpark' },
      '6-12': { rating: 'green', note: 'Canopy-Touren, Rafting (ab 8) und Wanderungen im Huerquehue-Park' },
      '12+':  { rating: 'green', note: 'Vulkanbesteigung, Rafting, Zip-Lining und Thermalquellen nach dem Abenteuer' }
    },
    desc: 'Chiles Abenteuerhauptstadt am Fuße des rauchenden Vulkans Villarrica, umgeben von Seen, Wäldern und heißen Quellen'
  },
  {
    id: 'puertovaras',
    name: 'Puerto Varas',
    altName: 'Seengebiet',
    lat: -41.3167,
    lng: -72.9833,
    tags: ['Natur', 'Erholung', 'Kultur'],
    wiki: 'Puerto_Varas',
    highlights: 'Vulkan Osorno, Lago Llanquihue, Petrohué-Wasserfälle, deutsche Kolonialarchitektur, Vicente Pérez Rosales NP',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Kleinstadt, gute Infrastruktur und gemütliche Spaziergänge am See' },
      '1-3':  { rating: 'green', note: 'Seeufer, Bauernhöfe und kurze Ausflüge zu den Petrohué-Wasserfällen' },
      '3-6':  { rating: 'green', note: 'Wasserfälle, Bootsfahrten und Kuchen in den deutschen Cafés begeistern' },
      '6-12': { rating: 'green', note: 'Vulkan Osorno Seilbahn, Petrohué Rafting (leicht) und Bauernhof-Besuche' },
      '12+':  { rating: 'green', note: 'Canyoning, Rafting, Wanderungen und Andensee-Überquerung nach Argentinien' }
    },
    desc: 'Idyllische Seenstadt mit Blick auf den schneebedeckten Vulkan Osorno – Chiles kleine Schweiz mit deutscher Kuchentradition'
  },
  {
    id: 'easterisland',
    name: 'Osterinsel',
    altName: 'Rapa Nui',
    lat: -27.1127,
    lng: -109.3497,
    tags: ['Kultur', 'Geschichte', 'Natur'],
    wiki: 'Easter_Island',
    highlights: 'Moai-Statuen, Rano Raraku, Ahu Tongariki, Orongo, Anakena-Strand, Rapa-Nui-Kultur',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen (5h Flug von Santiago), eingeschränkte medizinische Versorgung' },
      '1-3':  { rating: 'yellow', note: 'Wenig Infrastruktur, aber Moai faszinieren auch Kleinkinder, kurze Autofahrten' },
      '3-6':  { rating: 'green', note: 'Moai als Riesen-Entdeckung, Strand Anakena zum Baden und Reiten' },
      '6-12': { rating: 'green', note: 'Moai-Geschichte, Vulkankrater Rano Kau und Schnorcheln begeistern' },
      '12+':  { rating: 'green', note: 'Mysteriöse Geschichte, Radtouren zu Moai und Tauchen an Unterwasser-Moai' }
    },
    desc: 'Die isolierteste bewohnte Insel der Welt – Heimat der rätselhaften Moai-Statuen und der einzigartigen Rapa-Nui-Kultur'
  },
  {
    id: 'vinadelmar',
    name: 'Viña del Mar',
    lat: -33.0153,
    lng: -71.5500,
    tags: ['Erholung', 'Kultur', 'Großstadt'],
    wiki: 'Vina_del_Mar',
    highlights: 'Blumenuhr, Strand Reñaca, Quinta Vergara, Casino, Museo Fonck mit Moai',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flache Strandpromenade, gute Infrastruktur und kinderfreundliche Hotels' },
      '1-3':  { rating: 'green', note: 'Breite Strände, Parks und Blumenuhr als Spaziergang-Highlight' },
      '3-6':  { rating: 'green', note: 'Strand, Spielplätze und der botanische Garten sind ideal' },
      '6-12': { rating: 'green', note: 'Surfversuche, Museo Fonck mit Moai und Strandaktivitäten' },
      '12+':  { rating: 'green', note: 'Surfen, Strandleben und Ausflüge nach Valparaíso nebenan' }
    },
    desc: 'Chiles eleganter Badeort mit gepflegten Gärten, breiten Stränden und der berühmten Blumenuhr – direkt neben Valparaíso',
    dayTripFrom: [{ base: 'valparaiso', transit: '~20min Metro/Bus' }, { base: 'santiago', transit: '~1.5h Bus' }]
  },
  {
    id: 'laserena',
    name: 'La Serena',
    lat: -29.9027,
    lng: -71.2519,
    tags: ['Erholung', 'Kultur', 'Natur'],
    wiki: 'La_Serena,_Chile',
    highlights: 'Kolonialkirchen, Avenida del Mar, Observatorien, Isla Damas (Pinguine), Valle del Elqui',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Mildes Klima, ruhige Strände und gute Infrastruktur für Familien' },
      '1-3':  { rating: 'green', note: 'Breite Sandstrände, Spielplätze an der Avenida del Mar und Parkanlagen' },
      '3-6':  { rating: 'green', note: 'Strand, Pinguine auf Isla Damas und Observatoriums-Besuche faszinieren' },
      '6-12': { rating: 'green', note: 'Sternwarten, Bootstour zu Pinguinen und Delfinen, Strandtage' },
      '12+':  { rating: 'green', note: 'Astronomie-Touren, Elqui-Tal Ausflüge und Pisco-Destillerien-Geschichte' }
    },
    desc: 'Koloniale Hafenstadt mit Traumstränden und den besten Sternwarten der Welt – Tor zum mystischen Elqui-Tal'
  },
  {
    id: 'puertonatales',
    name: 'Puerto Natales',
    lat: -51.7333,
    lng: -72.5000,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Puerto_Natales',
    highlights: 'Tor zum Torres del Paine, Fjord Última Esperanza, Cueva del Milodón, Kayak zu Gletschern',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegene Lage, Wind und Kälte schwierig mit Babys' },
      '1-3':  { rating: 'yellow', note: 'Kaltes windiges Klima, aber Cueva del Milodón ist familientauglich' },
      '3-6':  { rating: 'green', note: 'Milodón-Höhle als Dinosaurier-Erlebnis, Bootsfahrten im Fjord' },
      '6-12': { rating: 'green', note: 'Kajaktouren, Gletscherboote und die mysteriöse Milodón-Höhle begeistern' },
      '12+':  { rating: 'green', note: 'Basislager für Torres del Paine, Kayak und Gletscherwanderungen' }
    },
    desc: 'Gemütliche Kleinstadt am Fjord Última Esperanza – das Basislager für alle Abenteuer im Torres del Paine Nationalpark'
  },
  {
    id: 'chiloe',
    name: 'Chiloé',
    lat: -42.4667,
    lng: -73.9667,
    tags: ['Kultur', 'Natur', 'Kulinarik'],
    wiki: 'Chiloe_Island',
    highlights: 'UNESCO-Holzkirchen, Palafitos (Stelzenhäuser), Pinguinkolonien, Curanto-Erdofen, Mythologie',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Feuchtes Klima und abgelegene Lage, aber ruhig und sicher' },
      '1-3':  { rating: 'green', note: 'Bunte Holzkirchen, Pinguine beobachten und Bauernhöfe erkunden' },
      '3-6':  { rating: 'green', note: 'Pinguinkolonien, Stelzenhäuser und die märchenhafte Mythologie faszinieren' },
      '6-12': { rating: 'green', note: 'Holzkirchen-Rallye, Pinguine, traditionelles Curanto und Fischerboote' },
      '12+':  { rating: 'green', note: 'Einzigartige Kultur, Mythologie-Wanderungen und Kayak durch Fjorde' }
    },
    desc: 'Mystische Insel mit UNESCO-Holzkirchen, bunten Stelzenhäusern und einer Mythologie voller Geisterschiffe und Waldwesen'
  },
  {
    id: 'puntaarenas',
    name: 'Punta Arenas',
    lat: -53.1500,
    lng: -70.9167,
    tags: ['Geschichte', 'Natur'],
    wiki: 'Punta_Arenas',
    highlights: 'Magellanstraße, Isla Magdalena (Pinguine), Cementerio Municipal, Museo Nao Victoria, Fuerte Bulnes',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Extreme Südlage, sehr windig und kalt – nur mit guter Ausrüstung' },
      '1-3':  { rating: 'yellow', note: 'Wind und Kälte anstrengend, aber Pinguinausflug zur Isla Magdalena möglich' },
      '3-6':  { rating: 'green', note: 'Pinguinkolonie auf Isla Magdalena und Schiffsmuseum Nao Victoria begeistern' },
      '6-12': { rating: 'green', note: 'Pinguine, Magellanstraße und das Nachbau-Schiff von Magellans Reise' },
      '12+':  { rating: 'green', note: 'Historische Entdecker-Geschichte, Pinguine und Tor nach Feuerland' }
    },
    desc: 'Südlichste Großstadt Chiles an der legendären Magellanstraße – Tor zu Feuerland und den Pinguinkolonien der Isla Magdalena'
  },
  {
    id: 'iquique',
    name: 'Iquique',
    lat: -20.2141,
    lng: -70.1524,
    tags: ['Erholung', 'Abenteuer', 'Geschichte'],
    wiki: 'Iquique',
    highlights: 'Playa Cavancha, Paragliding, Zona Franca, Humberstone-Geisterstadt, Baquedano-Straße',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Warmes Klima, Stadtstrand und gute Infrastruktur das ganze Jahr' },
      '1-3':  { rating: 'green', note: 'Flacher Sandstrand Cavancha und Promenade ideal für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Strand, Fischmarkt und Ausflug zur Geisterstadt Humberstone' },
      '6-12': { rating: 'green', note: 'Paragliding zuschauen, Sandboarding und Salpeterwerk-Geschichte' },
      '12+':  { rating: 'green', note: 'Paragliding, Surfen, Sandboarding und die Geisterstadt erkunden' }
    },
    desc: 'Nordchilenische Küstenstadt zwischen Pazifik und Wüste – berühmt für Paragliding, Duty-Free-Shopping und nahe Geisterstädte'
  },
  {
    id: 'arica',
    name: 'Arica',
    lat: -18.4783,
    lng: -70.3126,
    tags: ['Erholung', 'Geschichte', 'Kultur'],
    wiki: 'Arica',
    highlights: 'Morro de Arica, Chinchorro-Mumien (UNESCO), Surfstrände, Azapa-Tal, San Marcos Kirche (Eiffel)',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ganzjährig warmes Klima, ruhige Strände und gute medizinische Versorgung' },
      '1-3':  { rating: 'green', note: 'Warme Strände, Azapa-Tal mit Olivenhainen und kinderfreundliche Parks' },
      '3-6':  { rating: 'green', note: 'Morro besteigen, Strandtage und die Mumien im Museum entdecken' },
      '6-12': { rating: 'green', note: 'Älteste Mumien der Welt, Surfen lernen und Geoglyphen im Azapa-Tal' },
      '12+':  { rating: 'green', note: 'Surfen, Chinchorro-Mumien, Geschichte und Ausflüge ins Altiplano' }
    },
    desc: 'Chiles nördlichste Stadt mit ewigem Sommer – Heimat der ältesten Mumien der Welt und einer von Gustave Eiffel entworfenen Kirche'
  },
  {
    id: 'valdivia',
    name: 'Valdivia',
    lat: -39.8142,
    lng: -73.2459,
    tags: ['Kultur', 'Natur', 'Kulinarik'],
    wiki: 'Valdivia',
    highlights: 'Feria Fluvial, Seelöwen am Fischmarkt, Cervecería Kunstmann, Spanische Festungen, Isla Teja',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Universitätsstadt, gute Infrastruktur und gemütliches Ambiente' },
      '1-3':  { rating: 'green', note: 'Seelöwen am Fischmarkt faszinieren, Flussfahrten und Parks' },
      '3-6':  { rating: 'green', note: 'Seelöwen füttern, Bootsfahrten und Besuch der Brauerei Kunstmann' },
      '6-12': { rating: 'green', note: 'Flussfahrt zu spanischen Festungen, Seelöwen und Bier-Erlebnis (alkoholfrei)' },
      '12+':  { rating: 'green', note: 'Craft-Beer-Kultur, Festungen, Universitätsflair und Flussfahrten' }
    },
    desc: 'Chiles Bierhauptstadt an der Flussmündung, wo Seelöwen am Fischmarkt warten und spanische Festungen die Fjorde bewachen'
  },

  // ===== OFF-THE-BEATEN-PATH (9) =====
  {
    id: 'elquivalley',
    name: 'Elqui-Tal',
    altName: 'Valle del Elqui',
    lat: -30.0282,
    lng: -70.5898,
    tags: ['Natur', 'Kultur', 'Erholung'],
    wiki: 'Elqui_Province',
    highlights: 'Pisco-Destillerien, Observatorien, Gabriela Mistral Geburtsort, Weinberge, mystische Energie',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegenes Tal mit eingeschränkter Infrastruktur, aber ruhig und sicher' },
      '1-3':  { rating: 'green', note: 'Ruhige Natur, Bauernhöfe und Sternenhimmel als Abenderlebnis' },
      '3-6':  { rating: 'green', note: 'Sterne gucken, Pisco-Trauben probieren und Esel streicheln' },
      '6-12': { rating: 'green', note: 'Astronomie-Nächte, Wanderungen und die Geschichte von Gabriela Mistral' },
      '12+':  { rating: 'green', note: 'Sternenbeobachtung, Pisco-Geschichte und mystische Energie-Orte' }
    },
    desc: 'Mystisches Tal der Sterne und des Pisco – Heimat der Nobelpreisträgerin Gabriela Mistral und der klarsten Nächte der Welt',
    dayTripFrom: [{ base: 'laserena', transit: '~1h Bus/Auto' }]
  },
  {
    id: 'carreteraaustral',
    name: 'Carretera Austral',
    altName: 'Coyhaique',
    lat: -45.5712,
    lng: -72.0685,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Carretera_Austral',
    highlights: 'Schotterpiste durch Patagonien, Queulat-Hängegletscher, heiße Quellen, Fjorde, Regenwälder',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Teils unbefestigte Straße, abgelegen und mit Baby nicht empfehlenswert' },
      '1-3':  { rating: 'red', note: 'Lange Fahrten auf Schotterpiste, minimale Infrastruktur unterwegs' },
      '3-6':  { rating: 'yellow', note: 'Nur Teilabschnitte machbar, Queulat-Gletscher als Highlight erreichbar' },
      '6-12': { rating: 'green', note: 'Roadtrip-Abenteuer, Hängegletscher und heiße Quellen unterwegs' },
      '12+':  { rating: 'green', note: 'Ultimativer Roadtrip, Camping, Wandern und unberührte Natur' }
    },
    desc: 'Chiles legendäre Traumstraße durch Patagonien – 1.240 km teils unbefestigte Abenteuerroute durch Regenwälder, Fjorde und Gletscher'
  },
  {
    id: 'marblecaves',
    name: 'Marmorhöhlen',
    altName: 'Capillas de Mármol',
    lat: -46.6500,
    lng: -72.6167,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'General_Carrera_Lake',
    highlights: 'Catedral de Mármol, Capilla de Mármol, Lago General Carrera, türkises Wasser, Bootstour',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Sehr abgelegen, lange Anreise und Bootstour nicht babytauglich' },
      '1-3':  { rating: 'yellow', note: 'Bootstour möglich, aber kalter Wind und Spritzwasser auf dem See' },
      '3-6':  { rating: 'green', note: 'Magische Höhlen vom Boot aus bestaunen – ein Märchenerlebnis' },
      '6-12': { rating: 'green', note: 'Bootstour durch die leuchtenden Höhlen und Kayak auf dem See' },
      '12+':  { rating: 'green', note: 'Kayak durch die Marmorhöhlen und Wanderungen am Seeufer' }
    },
    desc: 'Surreale Marmorkathedralen im türkisen Lago General Carrera – vom Wasser geschliffene Höhlen in unwirklichen Farben'
  },
  {
    id: 'robinsoncrusoe',
    name: 'Robinson-Crusoe-Insel',
    lat: -33.6167,
    lng: -78.8500,
    tags: ['Natur', 'Abenteuer', 'Geschichte'],
    wiki: 'Robinson_Crusoe_Island',
    highlights: 'Selkirk-Aussichtspunkt, endemische Flora, Hummerfischen, Tauchen, Juan-Fernández-Archipel',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem abgelegen, kein Krankenhaus, nur per Kleinflugzeug erreichbar' },
      '1-3':  { rating: 'red', note: 'Keine Infrastruktur für Kleinkinder, Anreise anstrengend' },
      '3-6':  { rating: 'yellow', note: 'Abenteuerlich, aber kaum kindgerechte Aktivitäten und Infrastruktur' },
      '6-12': { rating: 'yellow', note: 'Robinson-Crusoe-Geschichte spannend, aber Aktivitäten limitiert' },
      '12+':  { rating: 'green', note: 'Tauchen, Wandern und das echte Robinson-Crusoe-Erlebnis' }
    },
    desc: 'Die echte Insel des Robinson Crusoe – vulkanischer Archipel im Pazifik mit einzigartiger Tierwelt und Abenteuer-Atmosphäre'
  },
  {
    id: 'humberstone',
    name: 'Humberstone',
    altName: 'Salpeterwerke',
    lat: -20.2069,
    lng: -69.7933,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Humberstone_and_Santa_Laura_Saltpeter_Works',
    highlights: 'UNESCO-Geisterstadt, Salpeterwerk Santa Laura, Theater, Pool, Arbeiterhäuser der 1930er',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Heiß und staubig, aber flach und mit Buggy befahrbar' },
      '1-3':  { rating: 'yellow', note: 'Hitze der Wüste anstrengend, aber Geisterstadt kurz besuchbar' },
      '3-6':  { rating: 'green', note: 'Geisterstadt-Erkundung wie ein Abenteuer – Theater und leerer Pool faszinieren' },
      '6-12': { rating: 'green', note: 'UNESCO-Geisterstadt erkunden, Arbeiterleben verstehen und Fotosafari' },
      '12+':  { rating: 'green', note: 'Industriegeschichte, Fotografie und die Stille der verlassenen Stadt' }
    },
    desc: 'UNESCO-Geisterstadt der Salpeterära in der Atacama-Wüste – verlassene Arbeitersiedlung mit Theater, Pool und stiller Melancholie',
    dayTripFrom: [{ base: 'iquique', transit: '~45min Auto' }]
  },
  {
    id: 'pichilemu',
    name: 'Pichilemu',
    lat: -34.3872,
    lng: -72.0028,
    tags: ['Abenteuer', 'Erholung'],
    wiki: 'Pichilemu',
    highlights: 'Punta de Lobos (Surfspot), Playa Infiernillo, Wald von Cáhuil, Salinas de Cáhuil, Reitausflüge',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kleiner Ort mit basaler Infrastruktur, aber ruhig und naturnah' },
      '1-3':  { rating: 'green', note: 'Strand, Salzlagune und ruhige Atmosphäre eines Surfortes' },
      '3-6':  { rating: 'green', note: 'Reiten am Strand, Salzgewinnung beobachten und Wellenreiten zuschauen' },
      '6-12': { rating: 'green', note: 'Surfen lernen, Reiten und die Salinen von Cáhuil erkunden' },
      '12+':  { rating: 'green', note: 'Weltklasse-Surfen an Punta de Lobos, Reiten und Strandleben' }
    },
    desc: 'Chiles Surf-Mekka mit der legendären Welle von Punta de Lobos – entspannter Küstenort mit Salzlagunen und Reitausflügen',
    dayTripFrom: [{ base: 'santiago', transit: '~3h Auto/Bus' }]
  },
  {
    id: 'sewell',
    name: 'Sewell',
    altName: 'Stadt der Treppen',
    lat: -34.0833,
    lng: -70.3833,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Sewell,_Chile',
    highlights: 'UNESCO-Bergbaustadt, bunte Häuser am Berghang, keine Straßen (nur Treppen), Kupfermine El Teniente',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Nur per geführter Tour erreichbar, viele Treppen und Höhenlage (2.200m)' },
      '1-3':  { rating: 'yellow', note: 'Viele Treppen ohne Aufzüge, aber geführte Tour mit kurzen Etappen möglich' },
      '3-6':  { rating: 'green', note: 'Bunte Häuser und Treppen als Abenteuer – geführte Tour kindertauglich' },
      '6-12': { rating: 'green', note: 'Faszinierende Bergbaugeschichte, bunte Stadt ohne Autos und Treppen-Rallye' },
      '12+':  { rating: 'green', note: 'UNESCO-Geschichte, Industriekultur und einzigartige Architektur im Gebirge' }
    },
    desc: 'UNESCO-Bergbaustadt in den Anden – eine autofreie Stadt aus bunten Häusern, verbunden nur durch Treppen und Passagen',
    dayTripFrom: [{ base: 'santiago', transit: '~2.5h Auto + geführte Tour ab Rancagua' }]
  },
  {
    id: 'chaiten',
    name: 'Chaitén',
    lat: -42.9167,
    lng: -72.7167,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Chaiten',
    highlights: 'Vulkan Chaitén (Ausbruch 2008), Pumalín-Douglas-Tompkins-NP, Thermalquellen, Urwälder',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegen, nur per Fähre erreichbar, minimale Infrastruktur' },
      '1-3':  { rating: 'red', note: 'Lange Fähranreise und abgelegene Lage nicht geeignet für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Pumalín-Park mit kurzen Wanderungen und heißen Quellen machbar' },
      '6-12': { rating: 'green', note: 'Vulkan-Geschichte, Wanderungen im Urwald und heiße Quellen' },
      '12+':  { rating: 'green', note: 'Vulkan besteigen, Alerce-Urwälder erkunden und Abenteuer pur' }
    },
    desc: 'Vom Vulkanausbruch 2008 wiederauferstandene Kleinstadt – Tor zum Pumalín-Nationalpark mit uralten Alerce-Wäldern'
  },
  {
    id: 'futaleufu',
    name: 'Futaleufú',
    lat: -43.1833,
    lng: -71.8667,
    tags: ['Abenteuer', 'Natur'],
    wiki: 'Futaleufu_River',
    highlights: 'Weltklasse-Wildwasser-Rafting, Río Futaleufú, Kayak, Canyoning, Reiten, Fly-Fishing',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegenes Outdoor-Dorf, extreme Aktivitäten und keine Baby-Infrastruktur' },
      '1-3':  { rating: 'red', note: 'Wildwasser und Abgeschiedenheit nicht geeignet für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Ruhigere Flussabschnitte zum Picknicken, Reiten auf Bauernhöfen' },
      '6-12': { rating: 'yellow', note: 'Leichtes Rafting möglich (ab 8), Reiten und Angeln am Fluss' },
      '12+':  { rating: 'green', note: 'Weltklasse-Rafting, Kayak und Canyoning für abenteuerlustige Teenager' }
    },
    desc: 'Welthauptstadt des Wildwasser-Raftings – der türkise Río Futaleufú gilt als einer der besten Flüsse der Erde für Extremsport'
  }
];
