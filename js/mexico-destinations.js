/* ============================================
   MEXICO-DESTINATIONS.JS – Datenbank aller Mexiko-Ziele
   ============================================ */

const MEXICO_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'mexico-city',
    name: 'Mexiko-Stadt',
    altName: 'CDMX',
    lat: 19.4326,
    lng: -99.1332,
    tags: ['Großstadt', 'Kultur', 'Kulinarik'],
    wiki: 'Mexico_City',
    highlights: 'Zócalo, Chapultepec-Park, Museo Frida Kahlo, Coyoacán, Teotihuacán-Pyramiden',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Höhenlage (2.240m) und Smog können Babys belasten – exzellente Krankenhäuser und moderne Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Verkehr und Höhenluft anstrengend, aber Chapultepec-Park, Kindermuseum Papalote und gute Kliniken bieten Komfort' },
      '3-6':  { rating: 'green', note: 'Kindermuseum Papalote, Chapultepec-Zoo, Xochimilco-Bootsfahrt und bunte Märkte begeistern' },
      '6-12': { rating: 'green', note: 'Pyramiden von Teotihuacán, Frida-Kahlo-Museum, Chapultepec-Schloss und Xochimilco-Trajineras' },
      '12+':  { rating: 'green', note: 'Weltklasse-Museen, Street Food, Stadtviertel Roma/Condesa und lebendige Kultur' }
    },
    desc: 'Eine der größten Metropolen der Welt, wo aztekische Tempel neben Kolonialpalästen stehen und die Street-Food-Szene ihresgleichen sucht'
  },
  {
    id: 'oaxaca',
    name: 'Oaxaca',
    altName: 'Oaxaca de Juárez',
    lat: 17.0732,
    lng: -96.7266,
    tags: ['Kultur', 'Kulinarik', 'Geschichte'],
    wiki: 'Oaxaca',
    highlights: 'Monte Albán (UNESCO), Mercado Benito Juárez, Mezcal-Verkostung, Día de los Muertos, Textilkunst',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kopfsteinpflaster in der Altstadt, aber gute Kliniken und ruhige Atmosphäre auf 1.550m Höhe' },
      '1-3':  { rating: 'green', note: 'Bunte Märkte, Schokoladen-Manufakturen und flache Altstadtgassen zum Entdecken' },
      '3-6':  { rating: 'green', note: 'Schokolade selber machen, Monte-Albán-Ruinen erkunden und bunte Alebrijes bestaunen' },
      '6-12': { rating: 'green', note: 'Kochkurse, Monte Albán, Weberei-Workshops und farbenfrohe Märkte begeistern' },
      '12+':  { rating: 'green', note: 'Kulinarik-Hauptstadt Mexikos, Mezcal-Kultur, Street Art und indigene Traditionen' }
    },
    desc: 'Mexikos kulinarische und kulturelle Seele mit UNESCO-Altstadt, zapotekischen Ruinen und der lebendigsten Día-de-los-Muertos-Feier des Landes'
  },
  {
    id: 'san-cristobal',
    name: 'San Cristóbal de las Casas',
    lat: 16.7370,
    lng: -92.6376,
    tags: ['Kultur', 'Geschichte', 'Natur'],
    wiki: 'San_Cristóbal_de_las_Casas',
    highlights: 'Indigene Tzotzil-Dörfer, Cañón del Sumidero, Bernstein-Museum, Bunter Kunsthandwerk-Markt',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Höhenlage (2.200m) und kühle Nächte, begrenzte medizinische Versorgung für Babys' },
      '1-3':  { rating: 'yellow', note: 'Kopfsteinpflaster und Höhe anstrengend, aber bunte Märkte und ruhige Atmosphäre' },
      '3-6':  { rating: 'green', note: 'Bernstein-Museum, Bootsfahrt Cañón del Sumidero und bunte Kunsthandwerk-Läden' },
      '6-12': { rating: 'green', note: 'Indigene Dorfbesuche, Cañón del Sumidero und Kakao-Workshops faszinieren' },
      '12+':  { rating: 'green', note: 'Authentische indigene Kulturen, Wandern, Kaffeeplantagen und alternatives Flair' }
    },
    desc: 'Charmante Kolonialstadt im Hochland von Chiapas, Tor zur lebendigen Maya-Kultur der Tzotzil und Tzeltal'
  },
  {
    id: 'playa-del-carmen',
    name: 'Playa del Carmen',
    altName: 'Riviera Maya',
    lat: 20.6296,
    lng: -87.0739,
    tags: ['Erholung', 'Abenteuer', 'Kulinarik'],
    wiki: 'Playa_del_Carmen',
    highlights: 'Quinta Avenida, Cenoten-Schnorcheln, Xcaret Eco-Park, Fähre nach Cozumel, Akumal-Schildkröten',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Familienresorts mit Babysitting, flache Strände, internationale Kliniken und gute Infrastruktur' },
      '1-3':  { rating: 'green', note: 'Kinderpools in Resorts, flache Karibikstrände und Xcaret-Park mit Kinderbereichen' },
      '3-6':  { rating: 'green', note: 'Xcaret/Xel-Há Eco-Parks, Cenoten-Schwimmen und Schildkröten in Akumal beobachten' },
      '6-12': { rating: 'green', note: 'Schnorcheln in Cenoten, Eco-Parks, Ruinen von Tulum und Cozumel-Fähre' },
      '12+':  { rating: 'green', note: 'Tauchen, Cenoten-Abenteuer, lebhafte Quinta Avenida und Wassersport' }
    },
    desc: 'Kosmopolitischer Karibikort an der Riviera Maya mit türkisem Meer, mystischen Cenoten und dem weltberühmten Xcaret-Naturpark'
  },
  {
    id: 'cancun',
    name: 'Cancún',
    lat: 21.1619,
    lng: -86.8515,
    tags: ['Erholung', 'Großstadt'],
    wiki: 'Cancún',
    highlights: 'Hotelzone mit Karibikstränden, Unterwasser-Museum MUSA, Isla Mujeres, Chichén Itzá-Ausflug',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'All-Inclusive-Resorts mit Babybetreuung, exzellente Kliniken und flache Lagunenstrände' },
      '1-3':  { rating: 'green', note: 'Kinderpools, Aquarium, flache Lagunenstrände und Resort-Kinderbetreuung' },
      '3-6':  { rating: 'green', note: 'Aquarium, Isla Mujeres per Fähre, Delphin-Erlebnisse und Wasserparks' },
      '6-12': { rating: 'green', note: 'Schnorcheln, Unterwasser-Museum MUSA, Chichén Itzá und Zip-Line-Parks' },
      '12+':  { rating: 'green', note: 'Wassersport, Isla Mujeres, Shopping und lebhaftes Nachtleben' }
    },
    desc: 'Mexikos meistbesuchtes Reiseziel mit endlosen Karibikstränden, All-Inclusive-Resorts und dem Tor zur Welt der Maya'
  },
  {
    id: 'merida',
    name: 'Mérida',
    lat: 20.9674,
    lng: -89.5926,
    tags: ['Kultur', 'Geschichte', 'Kulinarik'],
    wiki: 'Mérida,_Yucatán',
    highlights: 'Paseo de Montejo, Gran Museo del Mundo Maya, Chichén Itzá, Uxmal, Cenoten-Route',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Sehr heiß (bis 40°C), aber gute Krankenhäuser und koloniale Gastfreundschaft' },
      '1-3':  { rating: 'green', note: 'Ruhige Kolonialstadt, Cenoten zum Abkühlen und familienfreundliche Restaurants' },
      '3-6':  { rating: 'green', note: 'Maya-Museum interaktiv, Cenoten-Schwimmen und Pferdekutschen-Fahrten' },
      '6-12': { rating: 'green', note: 'Chichén Itzá, Uxmal-Pyramiden, Cenoten und lebhafte Sonntags-Märkte' },
      '12+':  { rating: 'green', note: 'Kulturhauptstadt Yucatáns, Gastronomie, Maya-Geschichte und Cenoten-Hopping' }
    },
    desc: 'Die „Weiße Stadt" Yucatáns mit prächtiger Kolonialarchitektur, Tor zu den großen Maya-Stätten Chichén Itzá und Uxmal'
  },
  {
    id: 'valladolid',
    name: 'Valladolid',
    lat: 20.6890,
    lng: -88.2014,
    tags: ['Kultur', 'Geschichte'],
    wiki: 'Valladolid,_Yucatán',
    highlights: 'Cenote Zací, Cenote Suytun, Convento de San Bernardino, Chichén Itzá (40 Min.), Ek Balam',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kleine Kolonialstadt mit begrenzter medizinischer Versorgung, aber ruhig und sicher' },
      '1-3':  { rating: 'green', note: 'Überschaubare Altstadt, Cenote Zací zum Planschen und entspannte Atmosphäre' },
      '3-6':  { rating: 'green', note: 'Cenoten wie natürliche Schwimmbäder, bunte Häuser und Eis auf dem Zócalo' },
      '6-12': { rating: 'green', note: 'Cenoten-Abenteuer, Ek Balam kletterbar und Chichén Itzá in 40 Minuten' },
      '12+':  { rating: 'green', note: 'Authentisches Yucatán, Cenoten-Erkundung, Maya-Ruinen und ruhiges Flair' }
    },
    desc: 'Verschlafenes Kolonialstädtchen mit spektakulären Cenoten direkt im Stadtgebiet, perfekte Basis für Chichén Itzá und Ek Balam',
    dayTripFrom: [{ base: 'merida', transit: '~2h Bus (ADO)' }]
  },
  {
    id: 'guanajuato',
    name: 'Guanajuato',
    lat: 21.0190,
    lng: -101.2574,
    tags: ['Kultur', 'Geschichte', 'Großstadt'],
    wiki: 'Guanajuato',
    highlights: 'Unterirdische Straßen, Callejón del Beso, Teatro Juárez, Universität, Cervantino-Festival',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Steile Gassen und viele Treppen, aber sichere und charmante Atmosphäre' },
      '1-3':  { rating: 'yellow', note: 'Steile Gassen anstrengend mit Buggy, aber Funicular und bunte Häuser faszinieren' },
      '3-6':  { rating: 'green', note: 'Mumien-Museum (für Mutige!), Funicular-Seilbahn und unterirdische Tunnel-Straßen' },
      '6-12': { rating: 'green', note: 'Unterirdische Straßen, Callejón del Beso-Legende und bunte Häuser erkunden' },
      '12+':  { rating: 'green', note: 'Lebendige Uni-Stadt, Callejoneadas (Musikumzüge), Kunst und Geschichte' }
    },
    desc: 'UNESCO-Welterbe mit einem Labyrinth aus unterirdischen Straßen, bunten Häusern an steilen Hängen und der romantischsten Gasse Mexikos'
  },
  {
    id: 'san-miguel-de-allende',
    name: 'San Miguel de Allende',
    lat: 20.9144,
    lng: -100.7452,
    tags: ['Kultur', 'Erholung'],
    wiki: 'San_Miguel_de_Allende',
    highlights: 'Parroquia de San Miguel Arcángel, Kunstgalerien, Hot Springs, Jardín Principal, Fabrica La Aurora',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige, sichere Kolonialstadt mit angenehmem Klima auf 1.900m und guter Infrastruktur' },
      '1-3':  { rating: 'green', note: 'Flacher Jardín Principal, Eisdiele am Zócalo und entspannte Atmosphäre' },
      '3-6':  { rating: 'green', note: 'Heiße Quellen, Kunstworkshops und Papiermaché-Figuren auf den Märkten' },
      '6-12': { rating: 'green', note: 'Kunstgalerien, Hot Springs und die ikonische Parroquia-Kirche begeistern' },
      '12+':  { rating: 'green', note: 'Kreative Kunstszene, Fotomotive, Gastronomie und entspanntes Flair' }
    },
    desc: 'Mexikos schönste Kolonialstadt mit der ikonischen neugotischen Pfarrkirche, lebendiger Kunstszene und heißen Quellen',
    dayTripFrom: [{ base: 'guanajuato', transit: '~1.5h Bus' }]
  },
  {
    id: 'puerto-vallarta',
    name: 'Puerto Vallarta',
    lat: 20.6534,
    lng: -105.2253,
    tags: ['Erholung', 'Abenteuer', 'Kulinarik'],
    wiki: 'Puerto_Vallarta',
    highlights: 'Malecón-Promenade, Los Arcos, Islas Marietas, Sierra-Madre-Dschungel, Romantische Zone',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Familienresorts, flache Strandabschnitte, internationale Kliniken und gute Infrastruktur' },
      '1-3':  { rating: 'green', note: 'Malecón-Promenade, Kinderpools in Resorts und ruhige Strandbuchen' },
      '3-6':  { rating: 'green', note: 'Bootsfahrten, Delfin-Beobachtung, Strand und Malecón-Skulpturen entdecken' },
      '6-12': { rating: 'green', note: 'Schnorcheln bei Los Arcos, Zip-Lines im Dschungel und Whale Watching (Winter)' },
      '12+':  { rating: 'green', note: 'Surfen, Dschungel-Abenteuer, Wassersport und lebhafte Strandpromenade' }
    },
    desc: 'Charmante Pazifikstadt zwischen Sierra Madre und türkisem Meer, wo Dschungelabenteuer auf goldene Strände treffen'
  },
  {
    id: 'guadalajara',
    name: 'Guadalajara',
    lat: 20.6597,
    lng: -103.3496,
    tags: ['Großstadt', 'Kultur', 'Kulinarik'],
    wiki: 'Guadalajara',
    highlights: 'Hospicio Cabañas (UNESCO), Tlaquepaque, Tequila-Ausflug, Mariachi-Platz, Mercado San Juan de Dios',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Große Stadt mit Verkehr und Smog, aber exzellente Krankenhäuser und angenehmes Klima' },
      '1-3':  { rating: 'yellow', note: 'Verkehr stressig, aber Parks, Malls und Tlaquepaque-Fußgängerzone bieten Komfort' },
      '3-6':  { rating: 'green', note: 'Tlaquepaque-Kunsthandwerk, Mariachi-Konzerte und Schokoladen-Manufakturen' },
      '6-12': { rating: 'green', note: 'Tequila-Zugfahrt, Hospicio Cabañas und riesiger Mercado San Juan de Dios' },
      '12+':  { rating: 'green', note: 'Mariachi-Geburtsort, Tequila-Ausflug, Shopping und lebendige Kultur' }
    },
    desc: 'Mexikos zweitgrößte Stadt und Geburtsort von Mariachi, Tequila und der Charrería – eine kulturelle Schatzkammer im Hochland'
  },
  {
    id: 'tulum',
    name: 'Tulum',
    lat: 20.2145,
    lng: -87.4291,
    tags: ['Geschichte', 'Erholung', 'Natur'],
    wiki: 'Tulum',
    highlights: 'Maya-Ruinen über dem Meer, Gran Cenote, Sian Ka\'an Biosphäre (UNESCO), Boho-Strandclubs',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Viele Boutique-Hotels ohne Kinderausstattung, aber ruhige Strände und entspannte Atmosphäre' },
      '1-3':  { rating: 'green', note: 'Flache Karibikstrände, Cenoten zum Planschen und ruhige Umgebung' },
      '3-6':  { rating: 'green', note: 'Maya-Ruinen am Meer, Gran Cenote und Schildkröten-Saison (Mai-Oktober)' },
      '6-12': { rating: 'green', note: 'Ruinen klettern, Cenoten-Schnorcheln und Sian Ka\'an Bootstouren' },
      '12+':  { rating: 'green', note: 'Instagram-Hotspot, Cenoten-Tauchen, Ruinen und Boho-Lifestyle' }
    },
    desc: 'Einzige Maya-Stadt direkt am Karibischen Meer, umgeben von mystischen Cenoten und dem UNESCO-Biosphärenreservat Sian Ka\'an',
    dayTripFrom: [{ base: 'playa-del-carmen', transit: '~1h Colectivo/Bus' }]
  },
  {
    id: 'puebla',
    name: 'Puebla',
    lat: 19.0414,
    lng: -98.2063,
    tags: ['Kultur', 'Kulinarik', 'Geschichte'],
    wiki: 'Puebla',
    highlights: 'Talavera-Keramik, Kathedrale, Biblioteca Palafoxiana, Mole Poblano, Cholula-Pyramide',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Kolonialstadt auf 2.160m mit guten Kliniken und angenehmer Atmosphäre' },
      '1-3':  { rating: 'green', note: 'Überschaubare Altstadt, süße Bäckereien (Calle de los Dulces) und Parks' },
      '3-6':  { rating: 'green', note: 'Talavera-Werkstatt besuchen, Cholula-Pyramide und Süßigkeiten-Straße' },
      '6-12': { rating: 'green', note: 'Größte Pyramide der Welt (Cholula), Keramik-Workshops und Tunnelmuseum' },
      '12+':  { rating: 'green', note: 'Kulinarik (Mole Poblano!), Kolonialarchitektur, Cholula und Streetfood' }
    },
    desc: 'UNESCO-Kolonialstadt am Fuß schneebedeckter Vulkane, Geburtsort des berühmten Mole Poblano und der kunstvollen Talavera-Keramik',
    dayTripFrom: [{ base: 'mexico-city', transit: '~2h Bus (ADO/Estrella Roja)' }]
  },
  {
    id: 'palenque',
    name: 'Palenque',
    lat: 17.4838,
    lng: -92.0460,
    tags: ['Geschichte', 'Natur', 'Abenteuer'],
    wiki: 'Palenque',
    highlights: 'Maya-Ruinen im Dschungel (UNESCO), Templo de las Inscripciones, Agua Azul, Misol-Há Wasserfall',
    family: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Tropische Hitze, Dschungel-Mücken und begrenzte medizinische Versorgung vor Ort' },
      '1-3':  { rating: 'yellow', note: 'Hitze und Insekten belasten Kleinkinder, aber die Ruinen sind auch mit Buggy zugänglich' },
      '3-6':  { rating: 'green', note: 'Dschungel-Ruinen wie im Abenteuerfilm, Wasserfälle Agua Azul zum Baden' },
      '6-12': { rating: 'green', note: 'Maya-Pyramiden im Urwald erkunden, Dschungel-Wanderung und Wasserfall-Abenteuer' },
      '12+':  { rating: 'green', note: 'Imposante Dschungel-Ruinen, Geschichte der Maya-Könige und Naturerlebnis' }
    },
    desc: 'Majestätische Maya-Ruinenstadt mitten im dampfenden Dschungel von Chiapas, umgeben von türkisen Wasserfällen'
  },
  {
    id: 'los-cabos',
    name: 'Los Cabos',
    altName: 'Cabo San Lucas & San José del Cabo',
    lat: 22.8905,
    lng: -109.9167,
    tags: ['Erholung', 'Abenteuer', 'Natur'],
    wiki: 'Cabo_San_Lucas',
    highlights: 'El Arco Felsbogen, Whale Watching (Dez-Apr), Luxus-Resorts, Schnorcheln, Wüste trifft Meer',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Luxus-Resorts mit Kinderbetreuung, exzellente Kliniken und ruhige Strandabschnitte' },
      '1-3':  { rating: 'green', note: 'Resort-Kinderpools, flache Strände in San José del Cabo und gute Infrastruktur' },
      '3-6':  { rating: 'green', note: 'Glasbodenboot zum El Arco, Whale Watching und Wüsten-Abenteuer' },
      '6-12': { rating: 'green', note: 'Schnorcheln bei Cabo Pulmo, Whale Watching und Kamel-Ritte durch die Wüste' },
      '12+':  { rating: 'green', note: 'Surfen, Tauchen, Zip-Lines und lebhaftes Nachtleben in Cabo San Lucas' }
    },
    desc: 'Spektakuläre Wüstenlandschaft trifft auf den Pazifik an der Südspitze Baja Californias, berühmt für den Felsbogen El Arco und Walbeobachtung'
  },

  // ===== OFF THE BEATEN PATH (9) =====
  {
    id: 'hierve-el-agua',
    name: 'Hierve el Agua',
    lat: 16.8654,
    lng: -96.2758,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Hierve_el_Agua',
    highlights: 'Versteinerte Wasserfälle, Natürliche Infinity-Pools, Panoramablick, Wanderung zum Fuß der Fälle',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegene Bergstraße, keine medizinische Versorgung und rutschige Wege' },
      '1-3':  { rating: 'yellow', note: 'Steile Wege zum Pool, aber das Schwimmen im natürlichen Becken ist möglich' },
      '3-6':  { rating: 'green', note: 'Natürliche Pools zum Planschen mit unglaublichem Panorama-Ausblick' },
      '6-12': { rating: 'green', note: 'Wanderung zu den versteinerten Wasserfällen und Schwimmen in Infinity-Pools' },
      '12+':  { rating: 'green', note: 'Fotogene Naturpools, Wanderung und einmaliges geologisches Phänomen' }
    },
    desc: 'Spektakuläre versteinerte Wasserfälle und natürliche Infinity-Pools hoch über dem Tal von Oaxaca',
    dayTripFrom: [{ base: 'oaxaca', transit: '~1.5h Colectivo/Tour' }]
  },
  {
    id: 'bacalar',
    name: 'Bacalar',
    lat: 18.6809,
    lng: -88.3944,
    tags: ['Natur', 'Erholung'],
    wiki: 'Bacalar',
    highlights: 'Lagune der sieben Farben, Cenote Azul, Piraten-Festung, Kajakfahren, Stromatolithen',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kleine Stadt mit begrenzter Infrastruktur, aber ruhige Lagune und entspannte Atmosphäre' },
      '1-3':  { rating: 'green', note: 'Flache Lagune zum sicheren Planschen, ruhiger als die Karibikküste' },
      '3-6':  { rating: 'green', note: 'Lagune in sieben Blautönen, Bootsfahrt und Cenote Azul zum Schwimmen' },
      '6-12': { rating: 'green', note: 'Kajakfahren, Piratenfort erkunden und in der magischen Lagune schwimmen' },
      '12+':  { rating: 'green', note: 'SUP auf der Lagune, Cenoten-Schnorcheln und entspanntes Backpacker-Flair' }
    },
    desc: 'Die „Lagune der sieben Farben" – ein unberührtes Süßwasserparadies in über 50 Blauschattierungen, Mexikos bestgehütetes Geheimnis'
  },
  {
    id: 'sayulita',
    name: 'Sayulita',
    lat: 20.8690,
    lng: -105.4421,
    tags: ['Erholung', 'Abenteuer', 'Kulinarik'],
    wiki: 'Sayulita',
    highlights: 'Surf-Strand, Islas Marietas-Bootstour, Huichol-Kunsthandwerk, Fischerdorf-Charme',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kleines Fischerdorf ohne große Klinik, aber freundliche Atmosphäre und flacher Strand' },
      '1-3':  { rating: 'green', note: 'Flacher Surfstrand für Anfänger, Sandburgen-Paradies und bunte Gassen' },
      '3-6':  { rating: 'green', note: 'Surfstunden für Kinder, Huichol-Perlenkunst und Strandspielplatz' },
      '6-12': { rating: 'green', note: 'Surfen lernen, Bootstour zu den Marietas-Inseln und Whale Watching' },
      '12+':  { rating: 'green', note: 'Surf-Mekka, Boho-Lifestyle, Beachbars und versteckte Buchten erkunden' }
    },
    desc: 'Buntes Surf-Dorf an der Pazifikküste Nayarits mit lässigem Bohème-Charme und perfekten Anfänger-Wellen',
    dayTripFrom: [{ base: 'puerto-vallarta', transit: '~1h Bus/Taxi' }]
  },
  {
    id: 'real-de-catorce',
    name: 'Real de Catorce',
    lat: 23.6903,
    lng: -100.8868,
    tags: ['Geschichte', 'Abenteuer', 'Kultur'],
    wiki: 'Real_de_Catorce',
    highlights: 'Geisterstadt-Atmosphäre, Ogarrio-Tunnel, Wirikuta-Wüste, Huichol-Pilgerort, Silberbergbau-Geschichte',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegen auf 2.750m, keine medizinische Versorgung und nur per Jeep erreichbar' },
      '1-3':  { rating: 'red', note: 'Schwierige Anreise durch Tunnel, keine Infrastruktur für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Tunnel-Fahrt aufregend, aber Geisterstadt-Atmosphäre kann Kinder ängstigen' },
      '6-12': { rating: 'yellow', note: 'Geisterstadt-Abenteuer und Wüstenlandschaft faszinierend, aber abgelegen' },
      '12+':  { rating: 'green', note: 'Mystische Geisterstadt, Huichol-Spiritualität und Wüsten-Abenteuer' }
    },
    desc: 'Mystische Silber-Geisterstadt auf 2.750m Höhe, nur durch einen jahrhundertealten Tunnel erreichbar, heiliger Pilgerort der Huichol'
  },
  {
    id: 'copper-canyon',
    name: 'Kupfercanyon',
    altName: 'Barrancas del Cobre',
    lat: 27.5120,
    lng: -108.3885,
    tags: ['Natur', 'Abenteuer', 'Kultur'],
    wiki: 'Copper_Canyon',
    highlights: 'El Chepe Zugfahrt, Urique-Schlucht, Tarahumara-Indigene, Seilbahn über die Schlucht, Wanderungen',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegen, lange Zugfahrt und keine gute medizinische Versorgung im Canyon' },
      '1-3':  { rating: 'red', note: 'Steile Schluchten und mehrstündige Zugfahrt anstrengend für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Zugfahrt faszinierend, aber Seilbahn und Wanderwege erfordern Aufsicht' },
      '6-12': { rating: 'green', note: 'Spektakuläre Zugfahrt, Seilbahn über die Schlucht und Tarahumara-Kultur' },
      '12+':  { rating: 'green', note: 'El-Chepe-Zugreise, Canyon-Wanderungen und indigene Tarahumara-Kultur' }
    },
    desc: 'Schluchtensystem viermal größer als der Grand Canyon, durchquert vom legendären El-Chepe-Zug, Heimat der Tarahumara-Läufer'
  },
  {
    id: 'izamal',
    name: 'Izamal',
    lat: 20.9313,
    lng: -89.0175,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Izamal',
    highlights: 'Gelbe Stadt, Convento de San Antonio de Padua, Maya-Pyramide Kinich Kakmó, Pferdekutschen',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kleine Stadt mit begrenzter Infrastruktur, aber ruhig und sicher' },
      '1-3':  { rating: 'green', note: 'Flache Gassen, Pferdekutschen-Fahrten und alles in leuchtendem Gelb' },
      '3-6':  { rating: 'green', note: 'Kutschfahrt durch die gelbe Stadt, Maya-Pyramide klettern und Eis essen' },
      '6-12': { rating: 'green', note: 'Maya-Pyramide im Stadtzentrum, Kloster und die gelbe Farbwelt erkunden' },
      '12+':  { rating: 'green', note: 'Fotogene gelbe Stadt, Maya-Geschichte und authentisches Yucatán-Leben' }
    },
    desc: 'Die „Gelbe Stadt" – komplett in leuchtendem Gelb gestrichene Kolonialstadt, erbaut auf und zwischen Maya-Pyramiden',
    dayTripFrom: [{ base: 'merida', transit: '~1h Bus/Colectivo' }]
  },
  {
    id: 'taxco',
    name: 'Taxco',
    lat: 18.5564,
    lng: -99.6050,
    tags: ['Kultur', 'Geschichte'],
    wiki: 'Taxco',
    highlights: 'Silberschmuck-Werkstätten, Kirche Santa Prisca, Seilbahn, Weiße Häuser am Berghang, Grutas de Cacahuamilpa',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Steile Kopfsteinpflaster-Gassen und begrenzte medizinische Versorgung' },
      '1-3':  { rating: 'yellow', note: 'Steile Gassen mit Buggy schwierig, aber Seilbahn und Kirchplatz sind reizvoll' },
      '3-6':  { rating: 'green', note: 'Seilbahnfahrt, Silberschmuck-Workshops und Tropfsteinhöhle Cacahuamilpa' },
      '6-12': { rating: 'green', note: 'Silberschmied-Workshops, Seilbahn und die riesige Cacahuamilpa-Tropfsteinhöhle' },
      '12+':  { rating: 'green', note: 'Silberschmuck selbst designen, Kolonial-Architektur und Höhlen-Abenteuer' }
    },
    desc: 'Die Silberstadt Mexikos mit weißen Häusern am steilen Berghang, berühmt für Silberschmuck-Handwerkskunst seit der Kolonialzeit',
    dayTripFrom: [{ base: 'mexico-city', transit: '~3h Bus (Estrella de Oro)' }]
  },
  {
    id: 'campeche',
    name: 'Campeche',
    lat: 19.8445,
    lng: -90.5253,
    tags: ['Geschichte', 'Kultur', 'Erholung'],
    wiki: 'Campeche_(city)',
    highlights: 'UNESCO-Festungsstadt, Pastellfarbene Kolonialgebäude, Calakmul-Maya-Ruinen, Malecón, Piratenforts',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Heißes tropisches Klima, aber sichere und ruhige Kolonialstadt mit Krankenhäusern' },
      '1-3':  { rating: 'green', note: 'Malecón-Promenade, bunte Häuser und ruhige Atmosphäre ohne Massentourismus' },
      '3-6':  { rating: 'green', note: 'Piratenforts erkunden, bunte Straßen fotografieren und Malecón-Spielplatz' },
      '6-12': { rating: 'green', note: 'Piraten-Geschichte, Festungsmauern besteigen und Calakmul-Dschungel-Ruinen' },
      '12+':  { rating: 'green', note: 'UNESCO-Altstadt, Piratengeschichte, Calakmul und authentisches Mexiko' }
    },
    desc: 'UNESCO-Festungsstadt mit pastellfarbenen Kolonialgebäuden und Piratenforts, Tor zu den Dschungel-Ruinen von Calakmul'
  },
  {
    id: 'holbox',
    name: 'Isla Holbox',
    lat: 21.5234,
    lng: -87.3792,
    tags: ['Erholung', 'Natur'],
    wiki: 'Isla_Holbox',
    highlights: 'Biolumineszenz, Walhai-Schnorcheln (Jun-Sep), Sandstraßen (keine Autos), Flamingos, Sonnenuntergänge',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegene Insel mit begrenzter medizinischer Versorgung, nur per Fähre erreichbar' },
      '1-3':  { rating: 'green', note: 'Autofreie Sandstraßen, flaches Meer und entspannte Inselatmosphäre' },
      '3-6':  { rating: 'green', note: 'Flamingo-Beobachtung, Sandstraßen per Golfcart und biolumineszentes Wasser' },
      '6-12': { rating: 'green', note: 'Walhaie beobachten, Biolumineszenz bei Nacht und Flamingo-Lagunen' },
      '12+':  { rating: 'green', note: 'Walhai-Schnorcheln, Kitesurfen, Biolumineszenz und Digital-Detox-Insel' }
    },
    desc: 'Autofreie Karibikinsel mit Sandstraßen, nächtlicher Biolumineszenz und der Möglichkeit, mit den größten Fischen der Welt zu schnorcheln'
  }
];
