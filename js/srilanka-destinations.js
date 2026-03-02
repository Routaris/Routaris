/* ============================================
   SRILANKA-DESTINATIONS.JS – Datenbank aller Sri-Lanka-Ziele
   ============================================ */

const SRILANKA_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'colombo',
    name: 'Colombo',
    lat: 6.9271,
    lng: 79.8612,
    tags: ['Großstadt', 'Kultur', 'Kulinarik'],
    wiki: 'Colombo',
    highlights: 'Gangaramaya-Tempel, Pettah-Markt, Galle Face Green, Colombo National Museum',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Gute Krankenhäuser, internationale Küche, klimatisierte Räume verfügbar' },
      '1-3':  { rating: 'green', note: 'Parks, kinderfreundliche Restaurants und gute medizinische Versorgung' },
      '3-6':  { rating: 'green', note: 'Galle Face Green, Museen und Parks bieten Abwechslung für Kinder' },
      '6-12': { rating: 'green', note: 'Märkte, Tempel und moderne Stadt – vielseitig und gut erreichbar' },
      '12+':  { rating: 'green', note: 'Lebendige Großstadt mit Street Food, Kultur und Shopping' }
    },
    desc: 'Sri Lankas pulsierende Hauptstadt – Märkte, Kolonialarchitektur und moderne Skyline'
  },
  {
    id: 'kandy',
    name: 'Kandy',
    lat: 7.2906,
    lng: 80.6337,
    tags: ['Kultur', 'Geschichte', 'Natur'],
    wiki: 'Kandy',
    highlights: 'Zahntempel, Royal Botanic Gardens, Kandy Lake, Kandyan Dance',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Angenehmes Klima, gute Krankenhäuser, flache Wege im Botanischen Garten' },
      '1-3':  { rating: 'green', note: 'Botanischer Garten, See und Tanz-Shows – abwechslungsreich für Kleine' },
      '3-6':  { rating: 'green', note: 'Kandy Lake, Tempel und Gärten – kinderfreundlich und gut zu Fuß machbar' },
      '6-12': { rating: 'green', note: 'Zahntempel, Kandyan Dance und Botanik begeistern neugierige Kinder' },
      '12+':  { rating: 'green', note: 'Kulturelles Zentrum mit Geschichte, Tanz und Hochland-Atmosphäre' }
    },
    desc: 'Kulturelle Hauptstadt im Hochland – Heimat des heiligen Zahntempels und üppiger Botanik'
  },
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    lat: 7.9570,
    lng: 80.7603,
    tags: ['Geschichte', 'Abenteuer', 'Kultur'],
    wiki: 'Sigiriya',
    highlights: 'Löwenfelsen, Spiegelwand, Wolkenmädchen-Fresken, Wassergärten',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Steiler Aufstieg in der Hitze – mit Baby nur Wassergärten unten möglich' },
      '1-3':  { rating: 'yellow', note: 'Enge Treppen und Höhe – Kleinkinder müssen getragen werden, anstrengend' },
      '3-6':  { rating: 'yellow', note: 'Aufstieg für kleine Kinder fordernd, aber Wassergärten unten wunderschön' },
      '6-12': { rating: 'green', note: 'Löwenfelsen-Aufstieg wird zum Abenteuer – Fresken und Aussicht belohnen' },
      '12+':  { rating: 'green', note: 'Spektakulärer Aufstieg mit Geschichte – UNESCO-Highlight zum Anfassen' }
    },
    desc: 'Spektakulärer Löwenfelsen – UNESCO-Welterbe und Wahrzeichen Sri Lankas'
  },
  {
    id: 'dambulla',
    name: 'Dambulla',
    lat: 7.8742,
    lng: 80.6511,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Dambulla_cave_temple',
    highlights: 'Goldener Höhlentempel, 150 Buddha-Statuen, Deckenmalereien, Panorama-Aussicht',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Aufstieg zum Höhlentempel steil und heiß – anstrengend mit Baby' },
      '1-3':  { rating: 'yellow', note: 'Treppen zum Tempel fordern, aber oben ist es überschaubar und schattig' },
      '3-6':  { rating: 'green', note: 'Goldene Höhlen mit Buddha-Statuen faszinieren Kinder – kurzer Aufstieg' },
      '6-12': { rating: 'green', note: 'Beeindruckende Höhlen mit 150 Statuen – Geschichte zum Anfassen' },
      '12+':  { rating: 'green', note: 'Kunstvolle Deckenmalereien und Panorama-Aussicht vom Felsen' }
    },
    dayTripFrom: [{ base: 'sigiriya', transit: '~30min Tuk-Tuk' }],
    desc: 'Fünf goldene Höhlentempel mit 150 Buddha-Statuen auf einem Granitfelsen'
  },
  {
    id: 'galle',
    name: 'Galle',
    lat: 6.0535,
    lng: 80.2210,
    tags: ['Geschichte', 'Kultur', 'Erholung'],
    wiki: 'Galle,_Sri_Lanka',
    highlights: 'Dutch Fort, Leuchtturm, Stiltfischer, Altstadt-Gassen',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flache Gassen im Fort, Strand nebenan, gute Versorgung – ideal mit Baby' },
      '1-3':  { rating: 'green', note: 'Autofreies Fort, Leuchtturm und Strand – perfekt für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Festungsmauern zum Spazieren, Eis am Strand, Schildkröten beobachten' },
      '6-12': { rating: 'green', note: 'Kolonialer Charme, Leuchtturm und Schnorcheln – vielseitig und sicher' },
      '12+':  { rating: 'green', note: 'UNESCO-Altstadt mit Cafes, Galerien und Strandleben zum Genießen' }
    },
    desc: 'Bezaubernde holländische Festungsstadt an der Südwestküste – UNESCO-Welterbe'
  },
  {
    id: 'ella',
    name: 'Ella',
    lat: 6.8667,
    lng: 81.0466,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Ella,_Sri_Lanka',
    highlights: 'Nine Arch Bridge, Little Adam\'s Peak, Ella Rock, Ravana-Wasserfall',
    family: false,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Steiles Terrain, lange Zugfahrt, einfache Unterkünfte – fordernd mit Baby' },
      '1-3':  { rating: 'yellow', note: 'Steil und bergig, Zugfahrt sehr lang – für Kleinkinder anstrengend' },
      '3-6':  { rating: 'yellow', note: 'Nine Arch Bridge und Zugfahrt toll, aber steile Wanderwege fordern' },
      '6-12': { rating: 'green', note: 'Legendäre Zugfahrt und Wanderungen – Ella Rock wird zum Abenteuer' },
      '12+':  { rating: 'green', note: 'Zugfahrt, Wasserfälle und Bergwanderungen – Highlight für Teenager' }
    },
    desc: 'Bergdorf im Hochland – Endstation der legendärsten Zugfahrt der Welt'
  },
  {
    id: 'nuwara-eliya',
    name: 'Nuwara Eliya',
    lat: 6.9497,
    lng: 80.7891,
    tags: ['Natur', 'Erholung', 'Kulinarik'],
    wiki: 'Nuwara_Eliya',
    highlights: 'Gregory Lake, Teefabriken, Horton Plains, Hakgala Botanical Garden',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Mildes Klima, Gärten und Parks – angenehme Abkühlung vom Tiefland' },
      '1-3':  { rating: 'green', note: 'Kühl und grün, Gregory Lake und Gärten – entspannt mit Kleinkindern' },
      '3-6':  { rating: 'green', note: 'Teefabriken, Bootsfahrten und kühles Wetter – Kinder fühlen sich wohl' },
      '6-12': { rating: 'green', note: 'Teeplantagen, Botanischer Garten und Horton Plains zum Wandern' },
      '12+':  { rating: 'green', note: 'Koloniale Atmosphäre, Teefabriken und Hochland-Wanderungen' }
    },
    desc: 'Little England – Teeplantagen, kühle Bergluft und koloniale Eleganz auf 1.868m'
  },
  {
    id: 'trincomalee',
    name: 'Trincomalee',
    lat: 8.5874,
    lng: 81.2152,
    tags: ['Erholung', 'Natur', 'Geschichte'],
    wiki: 'Trincomalee',
    highlights: 'Koneswaram-Tempel, Nilaveli Beach, Pigeon Island, Walbeobachtung',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flache Strände, ruhige Atmosphäre, gute Grundversorgung vor Ort' },
      '1-3':  { rating: 'green', note: 'Nilaveli Beach flach und sicher – ideal zum Planschen für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Pigeon Island, Strände und Tempel – abwechslungsreich und kinderfreundlich' },
      '6-12': { rating: 'green', note: 'Schnorcheln bei Pigeon Island, Walbeobachtung und Tempelbesuche' },
      '12+':  { rating: 'green', note: 'Wale, Korallenriffe und historische Tempel – vielseitige Ostküste' }
    },
    desc: 'Natürlicher Tiefwasserhafen an der Ostküste – Tempel, Strände und Blauwale'
  },
  {
    id: 'mirissa',
    name: 'Mirissa',
    lat: 5.9483,
    lng: 80.4716,
    tags: ['Erholung', 'Natur'],
    wiki: 'Mirissa',
    highlights: 'Walbeobachtung, Coconut Tree Hill, Secret Beach, Parrot Rock',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Starke Strömung am Strand, Whale-Watching-Boote rau – Vorsicht mit Baby' },
      '1-3':  { rating: 'yellow', note: 'Wellengang oft stark, Walbeobachtung mit Kleinkind seekrankheitsgefährdet' },
      '3-6':  { rating: 'green', note: 'Coconut Tree Hill, Strand und mit Glück Wale – aufregend für Kinder' },
      '6-12': { rating: 'green', note: 'Whale Watching, Schnorcheln und Strandleben – unvergessliche Erlebnisse' },
      '12+':  { rating: 'green', note: 'Wale hautnah, Surfen und entspanntes Backpacker-Flair am Strand' }
    },
    desc: 'Palmengesäumter Strand und Sri Lankas bester Ort für Walbeobachtungen'
  },
  {
    id: 'unawatuna',
    name: 'Unawatuna',
    lat: 6.0098,
    lng: 80.2494,
    tags: ['Erholung', 'Natur'],
    wiki: 'Unawatuna',
    highlights: 'Japanese Peace Pagoda, Schnorcheln, Rumassala Hill, Jungle Beach',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Geschützte Bucht mit ruhigem Wasser – sicher und entspannt mit Baby' },
      '1-3':  { rating: 'green', note: 'Flaches, ruhiges Wasser in der Bucht – perfekt zum Planschen' },
      '3-6':  { rating: 'green', note: 'Schnorcheln im flachen Wasser, Jungle Beach und Peace Pagoda' },
      '6-12': { rating: 'green', note: 'Korallenriffe, Jungle Beach und Rumassala Hill zum Erkunden' },
      '12+':  { rating: 'green', note: 'Türkises Wasser, Schnorcheln und entspanntes Strandleben' }
    },
    dayTripFrom: [{ base: 'galle', transit: '~10min Tuk-Tuk' }],
    desc: 'Geschützte Bucht mit türkisem Wasser – einer der schönsten Strände Asiens'
  },
  {
    id: 'anuradhapura',
    name: 'Anuradhapura',
    lat: 8.3114,
    lng: 80.4037,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Anuradhapura',
    highlights: 'Sri Maha Bodhi, Ruwanwelisaya Dagoba, Jetavanaramaya, Isurumuniya',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Heiß und weitläufig, Tempel-Ruinen mit wenig Schatten – anstrengend' },
      '1-3':  { rating: 'yellow', note: 'Große Distanzen zwischen Ruinen, Hitze – Tuk-Tuk zwischen Stopps nötig' },
      '3-6':  { rating: 'green', note: 'Alte Dagobas und freie Affen – mit Tuk-Tuk-Touren gut machbar' },
      '6-12': { rating: 'green', note: 'Fahrrad-Rundtour durch Ruinen – lebendige Geschichte zum Anfassen' },
      '12+':  { rating: 'green', note: '2.500 Jahre alte Heiligtümer per Rad erkunden – beeindruckend' }
    },
    desc: 'Erste Hauptstadt Sri Lankas – heilige Stadt mit 2.500 Jahre alten Dagobas'
  },
  {
    id: 'polonnaruwa',
    name: 'Polonnaruwa',
    lat: 7.9403,
    lng: 81.0188,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Polonnaruwa',
    highlights: 'Gal Vihara, Parakramabahu-Palast, Vatadage, Fahrrad-Rundtour',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Heiß und weitläufig, aber flaches Gelände – mit Sonnenschutz machbar' },
      '1-3':  { rating: 'yellow', note: 'Große Anlage in der Hitze – Fahrradanhänger oder Tuk-Tuk empfohlen' },
      '3-6':  { rating: 'green', note: 'Flaches Gelände per Fahrrad – Kinder lieben die Ruinen-Erkundung' },
      '6-12': { rating: 'green', note: 'Gal Vihara und Ruinen per Rad – idealer Größe für Familien-Rundtour' },
      '12+':  { rating: 'green', note: 'Mittelalterliche Königsstadt kompakt per Fahrrad – tolles Erlebnis' }
    },
    desc: 'Mittelalterliche Königsstadt – beeindruckende Ruinen per Fahrrad erkundbar'
  },
  {
    id: 'jaffna',
    name: 'Jaffna',
    lat: 9.6615,
    lng: 80.0255,
    tags: ['Kultur', 'Geschichte', 'Kulinarik'],
    wiki: 'Jaffna',
    highlights: 'Nallur Kandaswamy Tempel, Jaffna Fort, Nagadeepa Island, Jaffna-Küche',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Heiß und trocken, Infrastruktur noch im Aufbau – medizinisch okay' },
      '1-3':  { rating: 'yellow', note: 'Tamilische Küche oft scharf, Hitze fordernd – kindgerechtes Essen finden' },
      '3-6':  { rating: 'green', note: 'Bunte Tempel, Inseln per Boot und freundliche Atmosphäre für Kinder' },
      '6-12': { rating: 'green', note: 'Tamilische Kultur, Nagadeepa-Insel und Fort – spannend und lehrreich' },
      '12+':  { rating: 'green', note: 'Einzigartige tamilische Kultur, Geschichte und Küche im Norden' }
    },
    desc: 'Tamilische Kulturhauptstadt im Norden – Tempel, Inseln und einzigartige Küche'
  },
  {
    id: 'arugam-bay',
    name: 'Arugam Bay',
    lat: 6.8406,
    lng: 81.8361,
    tags: ['Erholung', 'Abenteuer'],
    wiki: 'Arugam_Bay',
    highlights: 'Surfen, Pottuvil Lagune, Kumana Nationalpark, Whiskey Point',
    family: false,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen, starke Strömung – ruhige Lagunen aber möglich mit Baby' },
      '1-3':  { rating: 'yellow', note: 'Surfer-Ort mit starkem Wellengang – Lagune sicherer für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Strand gefährlich zum Baden, aber Lagune und Natur sind schön' },
      '6-12': { rating: 'green', note: 'Surf-Anfängerkurse, Lagune und Nationalpark – spannend für Kinder' },
      '12+':  { rating: 'green', note: 'Surfen lernen, Leoparden im Nationalpark – Traumziel für Teenager' }
    },
    desc: 'Sri Lankas Surf-Mekka an der wilden Ostküste – Wellen, Lagunen und Leoparden'
  },
  {
    id: 'yala',
    name: 'Yala',
    altName: 'Yala National Park',
    lat: 6.3798,
    lng: 81.5182,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Yala_National_Park',
    highlights: 'Leoparden, Elefanten, Krokodile, Flamingos, Sithulpawwa-Felsentempel',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Holprige Jeep-Safari, Hitze und Staub – für Babys anstrengend' },
      '1-3':  { rating: 'yellow', note: 'Lange Jeep-Fahrten auf Schotterpisten – Kleinkinder werden unruhig' },
      '3-6':  { rating: 'green', note: 'Elefanten, Krokodile und Pfauen aus dem Jeep – Safari begeistert Kinder' },
      '6-12': { rating: 'green', note: 'Leoparden und Elefanten in freier Wildbahn – unvergessliches Erlebnis' },
      '12+':  { rating: 'green', note: 'Weltklasse-Safari mit Leoparden, Elefanten und Vogelwelt' }
    },
    desc: 'Leoparden-Hauptstadt der Welt – Sri Lankas berühmtester Nationalpark'
  },

  // ===== OFF THE BEATEN PATH (8) =====
  {
    id: 'haputale',
    name: 'Haputale',
    lat: 6.7656,
    lng: 80.9594,
    tags: ['Natur', 'Erholung'],
    wiki: 'Haputale',
    highlights: "Lipton's Seat, Dambatenne Teefabrik, Horton Plains, World's End",
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kühles Bergklima, steile Wege – mit guter Ausrüstung aber machbar' },
      '1-3':  { rating: 'yellow', note: 'Steile Pfade und kühle Temperaturen – nur für wandererprobte Familien' },
      '3-6':  { rating: 'yellow', note: 'Teefabriken spannend, aber World\'s End zu weit für kleine Kinder' },
      '6-12': { rating: 'green', note: 'Lipton\'s Seat und Teeplantagen – Wandern mit Aussicht begeistert' },
      '12+':  { rating: 'green', note: 'World\'s End, Teeplantagen und Nebelwälder – Natur pur im Hochland' }
    },
    desc: 'Stille Teeplantagen am Rande der Wolken – Horton Plains und World\'s End'
  },
  {
    id: 'udawalawe',
    name: 'Udawalawe',
    altName: 'Udawalawe National Park',
    lat: 6.4385,
    lng: 80.8880,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Udawalawe_National_Park',
    highlights: 'Elephant Transit Home, Jeep-Safari, Vogelbeobachtung, Stausee',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Holprige Jeep-Safari und Hitze – für Babys anstrengend, aber möglich' },
      '1-3':  { rating: 'yellow', note: 'Elefanten faszinieren, aber Jeep-Fahrt kann für Kleine ruppig werden' },
      '3-6':  { rating: 'green', note: 'Elephant Transit Home und wilde Elefantenherden – magisch für Kinder' },
      '6-12': { rating: 'green', note: 'Elefanten-Safaris und Vogelwelt – Naturerlebnis wie in Afrika' },
      '12+':  { rating: 'green', note: 'Jeep-Safari mit Elefantenherden hautnah – beeindruckende Wildnis' }
    },
    desc: 'Elefanten-Safaris in freier Wildbahn – Sri Lankas Antwort auf die afrikanische Savanne'
  },
  {
    id: 'adams-peak',
    name: "Adam's Peak",
    altName: 'Sri Pada',
    lat: 6.8094,
    lng: 80.4994,
    tags: ['Abenteuer', 'Kultur'],
    wiki: "Adam's_Peak",
    highlights: '5.500 Stufen, Sonnenaufgangs-Pilgern, Heiliger Fußabdruck, Schmetterlingsweg',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Nachtaufstieg mit 5.500 Stufen – absolut unmöglich mit Baby' },
      '1-3':  { rating: 'red', note: 'Steiler Nachtaufstieg über Stunden – für Kleinkinder nicht machbar' },
      '3-6':  { rating: 'red', note: '5.500 Stufen in der Nacht – viel zu anstrengend für kleine Kinder' },
      '6-12': { rating: 'yellow', note: 'Nur für sehr fitte Kinder – Nachtaufstieg dauert 4-6 Stunden' },
      '12+':  { rating: 'green', note: 'Pilgererlebnis mit Sonnenaufgang über den Wolken – unvergesslich' }
    },
    desc: 'Heiliger Berg mit 5.500 Stufen – Pilgerweg und Sonnenaufgang über den Wolken'
  },
  {
    id: 'tangalle',
    name: 'Tangalle',
    lat: 6.0241,
    lng: 80.7948,
    tags: ['Erholung', 'Natur'],
    wiki: 'Tangalle',
    highlights: 'Rekawa Turtle Watch, Mulkirigala-Felsentempel, Hiriketiya Beach',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Ruhig und abgelegen, aber Strömung und wenig Infrastruktur beachten' },
      '1-3':  { rating: 'yellow', note: 'Schildkröten toll, aber starke Strömung – nicht überall sicher zum Baden' },
      '3-6':  { rating: 'green', note: 'Schildkröten-Beobachtung abends am Strand – magisch für Kinder' },
      '6-12': { rating: 'green', note: 'Turtle Watch, Felsentempel und ruhige Strände – Natur und Abenteuer' },
      '12+':  { rating: 'green', note: 'Schildkröten-Nesting, Hiriketiya Beach und unberührte Küstenlandschaft' }
    },
    desc: 'Ruhige Strände und Schildkröten-Brutplätze an der unberührten Südküste'
  },
  {
    id: 'knuckles',
    name: 'Knuckles Range',
    altName: 'Knuckles Mountain Range',
    lat: 7.4333,
    lng: 80.7833,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Knuckles_Mountain_Range',
    highlights: 'Nebelwälder, Wasserfälle, Reisterrassen, endemische Flora',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegene Bergwildnis, steile Pfade, keine Infrastruktur – ungeeignet' },
      '1-3':  { rating: 'red', note: 'Mehrstündige Trekkings durch Nebelwald – für Kleinkinder nicht machbar' },
      '3-6':  { rating: 'yellow', note: 'Reisterrassen schön, aber Trekking-Wege zu anspruchsvoll für Kleine' },
      '6-12': { rating: 'yellow', note: 'Wanderungen möglich, aber nur mit erfahrener Outdoor-Familie' },
      '12+':  { rating: 'green', note: 'Nebelwälder, Wasserfälle und endemische Flora – Wander-Abenteuer' }
    },
    desc: 'UNESCO-Welterbe – Nebelwälder und Reisterrassen zum Wandern und Staunen'
  },
  {
    id: 'batticaloa',
    name: 'Batticaloa',
    lat: 7.7310,
    lng: 81.6747,
    tags: ['Kultur', 'Erholung'],
    wiki: 'Batticaloa',
    highlights: 'Singende Fische, Batticaloa Fort, Pasikuda Beach, Lagune',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen und einfach, aber ruhig und mit Strand – für mutige Familien' },
      '1-3':  { rating: 'yellow', note: 'Wenig touristische Infrastruktur, aber Pasikuda Beach ist kinderfreundlich' },
      '3-6':  { rating: 'green', note: 'Pasikuda Beach flach und sicher, Fort und Lagune zum Erkunden' },
      '6-12': { rating: 'green', note: 'Singende Fische, Fort und ruhige Strände – einzigartiges Erlebnis' },
      '12+':  { rating: 'green', note: 'Authentische Ostküste mit Geschichte, Lagune und versteckten Stränden' }
    },
    desc: 'Singende Fische und holländische Festung – verschlafene Ostküsten-Perle'
  },
  {
    id: 'hikkaduwa',
    name: 'Hikkaduwa',
    lat: 6.1395,
    lng: 80.1036,
    tags: ['Erholung', 'Natur'],
    wiki: 'Hikkaduwa',
    highlights: 'Coral Sanctuary, Turtle Hatchery, Schnorcheln, Strandleben',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Strandabschnitte, Turtle Hatchery und gute Anbindung an Galle' },
      '1-3':  { rating: 'green', note: 'Schildkröten-Aufzucht und flache Korallenbereiche – toll für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Coral Sanctuary, Schildkröten und Schnorcheln – Kinder lieben es' },
      '6-12': { rating: 'green', note: 'Schnorcheln an Korallenriffen und Schildkröten-Station – vielseitig' },
      '12+':  { rating: 'green', note: 'Korallenriffe, Strandleben und Tauchen – lebhafte Küstenatmosphäre' }
    },
    dayTripFrom: [{ base: 'galle', transit: '~30min Bus/Tuk-Tuk' }],
    desc: 'Korallenriffe, Meeresschildkröten und lebhaftes Strandleben'
  },
  {
    id: 'wilpattu',
    name: 'Wilpattu',
    altName: 'Wilpattu National Park',
    lat: 8.4500,
    lng: 80.0333,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Wilpattu_National_Park',
    highlights: 'Villus (natürliche Seen), Leoparden, Lippenbären, Krokodile',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegener Nationalpark, holprige Jeep-Pisten – fordernd für Babys' },
      '1-3':  { rating: 'yellow', note: 'Lange Jeep-Safari auf Schotterwegen – Kleinkinder werden unruhig' },
      '3-6':  { rating: 'green', note: 'Leoparden, Krokodile und Seen – Safari ohne Menschenmassen' },
      '6-12': { rating: 'green', note: 'Ruhigere Alternative zu Yala – Wildtiere fast für sich allein' },
      '12+':  { rating: 'green', note: 'Exklusive Safari mit Leoparden und Lippenbären – weniger Touristen' }
    },
    desc: 'Ältester Nationalpark Sri Lankas – Leoparden und Lippenbären ohne Menschenmassen'
  }
];
