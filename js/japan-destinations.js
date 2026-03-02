/* ============================================
   JAPAN-DESTINATIONS.JS – Datenbank aller Japan-Ziele
   ============================================ */

const JAPAN_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'tokio',
    name: 'Tokio',
    lat: 35.6895,
    lng: 139.6917,
    tags: ['Großstadt', 'Kultur', 'Kulinarik'],
    wiki: 'Tokyo',
    highlights: 'Shibuya Crossing, Sensō-ji-Tempel, Meiji-Schrein, Tsukiji Outer Market',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Extrem babyfreundlich – Stillräume und Wickeltische überall in Bahnhöfen und Kaufhäusern' },
      '1-3':  { rating: 'green', note: 'Kinderwagen-tauglich dank Aufzügen an fast allen Bahnhöfen, kinderfreundliche Restaurants' },
      '3-6':  { rating: 'green', note: 'Ueno Zoo, TeamLab, Odaiba-Spielplätze – unzählige kindergerechte Attraktionen in der Stadt' },
      '6-12': { rating: 'green', note: 'Akihabara, Ghibli Museum, Disneyland – Tokio ist ein Paradies für neugierige Kinder' },
      '12+':  { rating: 'green', note: 'Shibuya, Harajuku, Gaming-Kultur und Street Food begeistern Teenager sofort' }
    },
    desc: 'Japans elektrisierendes Herz, wo uralte Tempel neben neonbeleuchteten Wolkenkratzern stehen und jede Gasse eine kulinarische Entdeckung birgt'
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    lat: 35.0116,
    lng: 135.7681,
    tags: ['Kultur', 'Geschichte'],
    wiki: 'Kyoto',
    highlights: 'Fushimi-Inari-Schrein, Kinkaku-ji (Goldener Pavillon), Arashiyama Bambuswald, Gion-Geisha-Viertel',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Stillräume verfügbar, flache Tempelanlagen gut begehbar – sehr babyfreundlich' },
      '1-3':  { rating: 'green', note: 'Bambuswald und Tempelgärten bieten viel Platz, Kinderwagen problemlos nutzbar' },
      '3-6':  { rating: 'green', note: 'Affen-Park Iwatayama, Kimono-Verleih für Kinder – spielerisch Kultur erleben' },
      '6-12': { rating: 'green', note: 'Fushimi-Inari-Torii faszinieren, Samurai- und Ninja-Erlebnisse begeistern Schulkinder' },
      '12+':  { rating: 'green', note: 'Teezeremonien, Kalligraphie-Workshops und Manga-Museum sprechen Jugendliche an' }
    },
    desc: 'Japans kulturelles Juwel mit über 2.000 Tempeln und Schreinen, wo Geishas durch jahrhundertealte Gassen gleiten'
  },
  {
    id: 'osaka',
    name: 'Osaka',
    lat: 34.6938,
    lng: 135.5022,
    tags: ['Großstadt', 'Kulinarik'],
    wiki: 'Osaka',
    highlights: 'Dotonbori, Osaka Castle, Shinsekai, Universal Studios Japan',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Hervorragende Baby-Infrastruktur in Kaufhäusern und Bahnhöfen, kompakte Innenstadt' },
      '1-3':  { rating: 'green', note: 'Osaka Aquarium Kaiyukan begeistert Kleinkinder, Kinderwagen überall akzeptiert' },
      '3-6':  { rating: 'green', note: 'Universal Studios Japan mit Kindergarten-Bereich, Cup-Noodles-Museum zum Mitmachen' },
      '6-12': { rating: 'green', note: 'USJ Harry Potter, Pokémon Center, Dotonbori-Streetfood – pures Kinderparadies' },
      '12+':  { rating: 'green', note: 'Streetfood-Touren, Gaming-Arkaden und USJ-Achterbahnen begeistern Jugendliche' }
    },
    desc: 'Japans unbestrittene Streetfood-Hauptstadt, wo Takoyaki und Okonomiyaki die Seele einer ausgelassenen Metropole widerspiegeln'
  },
  {
    id: 'hiroshima',
    name: 'Hiroshima',
    lat: 34.3853,
    lng: 132.4553,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Hiroshima',
    highlights: 'Friedensgedenkpark, Atombomben-Kuppel (UNESCO), Friedensmuseum, Shukkeien-Garten',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flache, parkähnliche Gedenkstätte mit Wickelräumen – gut mit Baby machbar' },
      '1-3':  { rating: 'green', note: 'Weitläufiger Friedenspark ideal zum Laufen lernen, Straßenbahn kinderfreundlich' },
      '3-6':  { rating: 'green', note: 'Papier-Kraniche falten und Miyajima-Ausflug mit Hirschen faszinieren Kinder' },
      '6-12': { rating: 'green', note: 'Friedensmuseum altersgerecht aufbereitet, bewegende Geschichtsstunde für Schulkinder' },
      '12+':  { rating: 'green', note: 'Tiefgreifende historische Erfahrung, Friedensbotschaft berührt und bildet Jugendliche' }
    },
    desc: 'Eine Stadt des Friedens und der Hoffnung, die aus der Asche auferstanden ist und mit ihrem Gedenkpark die ganze Welt berührt'
  },
  {
    id: 'nara',
    name: 'Nara',
    lat: 34.6851,
    lng: 135.8049,
    tags: ['Geschichte', 'Kultur', 'Natur'],
    wiki: 'Nara_(city)',
    highlights: 'Todai-ji-Tempel (Großer Buddha), Freie Hirsche im Nara-Park, Kasuga-Taisha-Schrein, Isuien-Garten',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flacher Park mit Hirschen, gemütlich mit Kinderwagen – sehr entspannt mit Baby' },
      '1-3':  { rating: 'green', note: 'Zahme Hirsche füttern begeistert Kleinkinder, überschaubares Areal ideal für kurze Beine' },
      '3-6':  { rating: 'green', note: 'Hirsche streicheln und den riesigen Buddha bestaunen – magisch für kleine Kinder' },
      '6-12': { rating: 'green', note: 'Hirsche füttern, durch Holzsäule kriechen im Todai-ji – interaktiv und spannend' },
      '12+':  { rating: 'green', note: 'UNESCO-Tempel und freundliche Hirsche bieten schöne Fotomotive für Jugendliche' }
    },
    desc: 'Japans erste permanente Hauptstadt, wo zahme Hirsche durch UNESCO-Tempelanlagen streifen und der größte Bronze-Buddha der Welt thront',
    dayTripFrom: [
      { base: 'kyoto', transit: '~35 min JR Nara Line' },
      { base: 'osaka', transit: '~45 min Kintetsu/JR' }
    ]
  },
  {
    id: 'hakone',
    name: 'Hakone',
    lat: 35.1895,
    lng: 139.0265,
    tags: ['Natur', 'Erholung'],
    wiki: 'Hakone',
    highlights: 'Blick auf den Fuji, Ashi-See Piratenschiff, Freilichtmuseum, Owakudani Heiße Quellen',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bergige Wege und Seilbahnen anspruchsvoll mit Baby, aber Piratenschiff am See möglich' },
      '1-3':  { rating: 'yellow', note: 'Steile Pfade schwierig mit Buggy, Piratenschiff und Freilichtmuseum aber gut machbar' },
      '3-6':  { rating: 'green', note: 'Piratenschiff, Seilbahn und dampfende Quellen begeistern – genug Abenteuer für kleine Entdecker' },
      '6-12': { rating: 'green', note: 'Vulkan-Eier in Owakudani, Seilbahn und Fuji-Blick – spannend und lehrreich' },
      '12+':  { rating: 'green', note: 'Onsen-Erlebnis, Wanderwege und Fuji-Panorama bieten Abwechslung für Teenager' }
    },
    desc: 'Dampfende Vulkantäler, stille Bergseen und der majestätische Fuji am Horizont – Japans beliebtester Onsen-Rückzugsort vor den Toren Tokios',
    dayTripFrom: [
      { base: 'tokio', transit: '~1.5h Odakyu Romancecar ab Shinjuku' }
    ]
  },
  {
    id: 'nikko',
    name: 'Nikko',
    lat: 36.7500,
    lng: 139.6167,
    tags: ['Geschichte', 'Natur'],
    wiki: 'Nikkō',
    highlights: 'Toshogu-Schrein (UNESCO), Shinkyo-Brücke, Kegon-Wasserfall, Chuzenji-See',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Tempelanlage flach genug für Kinderwagen, Stillräume am Besucherzentrum vorhanden' },
      '1-3':  { rating: 'green', note: 'Bunte Schnitzereien und Affen-Relief faszinieren Kleinkinder, überschaubare Wege' },
      '3-6':  { rating: 'green', note: 'Bunte Tempelschnitzereien und Kegon-Wasserfall beeindrucken kleine Kinder sehr' },
      '6-12': { rating: 'green', note: 'Shogun-Geschichte, „Drei Affen"-Original und Wasserfall-Abenteuer fesseln Schulkinder' },
      '12+':  { rating: 'green', note: 'Kunstvolle Schnitzereien und UNESCO-Status bieten spannenden Geschichtsunterricht' }
    },
    desc: 'Prachtvolle UNESCO-Schreine in mystischen Zedernwäldern, wo Japans berühmtester Shogun in goldenem Glanz begraben liegt',
    dayTripFrom: [
      { base: 'tokio', transit: '~2h Tobu Railway ab Asakusa' }
    ]
  },
  {
    id: 'kamakura',
    name: 'Kamakura',
    lat: 35.3194,
    lng: 139.5467,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Kamakura',
    highlights: 'Großer Buddha (Daibutsu), Tsurugaoka Hachimangu-Schrein, Hase-dera-Tempel, Enoshima-Insel',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Kompakter Ort, Buddha-Gelände flach und kinderwagentauglich, Strand in der Nähe' },
      '1-3':  { rating: 'green', note: 'Großer Buddha zum Staunen, Strand zum Spielen – perfekte Größe für kurze Ausflüge' },
      '3-6':  { rating: 'green', note: 'In den Buddha hineingehen, Enoshima-Insel erkunden – spannend für kleine Entdecker' },
      '6-12': { rating: 'green', note: 'Samurai-Geschichte, Strandzeit und Enoshima-Aquarium bieten tolle Abwechslung' },
      '12+':  { rating: 'green', note: 'Surf-Strand, historische Tempel und Enoshima-Insel bieten Programm für Jugendliche' }
    },
    desc: 'Ehemalige Shogunat-Hauptstadt am Meer, wo der ikonische Große Buddha seit 800 Jahren unter freiem Himmel meditiert',
    dayTripFrom: [
      { base: 'tokio', transit: '~1h JR Yokosuka-Linie' }
    ]
  },
  {
    id: 'kanazawa',
    name: 'Kanazawa',
    lat: 36.5613,
    lng: 136.6562,
    tags: ['Kultur', 'Geschichte'],
    wiki: 'Kanazawa',
    highlights: 'Kenroku-en Garten, Higashi-Chaya Geisha-Viertel, Nagamachi Samurai-Viertel, 21st Century Museum',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Kompakte Stadt, Kenroku-en kinderwagentauglich, gute Baby-Infrastruktur vorhanden' },
      '1-3':  { rating: 'green', note: 'Weitläufiger Garten zum Entdecken, ruhige Samurai-Viertel ideal für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Goldblatt-Eis, Samurai-Häuser und 21st Century Museum interaktiv für Kinder' },
      '6-12': { rating: 'green', note: 'Samurai- und Ninja-Erlebnisse, Goldblatt-Basteln und modernes Kunstmuseum fesseln' },
      '12+':  { rating: 'green', note: 'Traditionelles Handwerk, Geisha-Viertel und modernes Museum bieten Kulturtiefe' }
    },
    desc: 'Die unzerstörte Samurai-Stadt an der Japanischen See mit einem der drei schönsten Gärten Japans und lebendiger Geisha-Tradition'
  },
  {
    id: 'takayama',
    name: 'Takayama',
    lat: 36.1400,
    lng: 137.2520,
    tags: ['Kultur', 'Kulinarik'],
    wiki: 'Takayama,_Gifu',
    highlights: 'Sanmachi-Suji Altstadt, Morgenmärkte, Hida-Rindfleisch, Shirakawa-go (Tagesausflug)',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bergige Lage und enge Altstadtgassen erschweren Kinderwagen-Navigation etwas' },
      '1-3':  { rating: 'yellow', note: 'Steile Gassen anstrengend mit Buggy, aber Morgenmärkte und Altstadt trotzdem reizvoll' },
      '3-6':  { rating: 'green', note: 'Morgenmärkte zum Probieren, Festwagen-Museum und Altstadt-Bummel begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Handwerksmuseen, Hida-Rind probieren und Shirakawa-go-Ausflug sind perfekt für Kids' },
      '12+':  { rating: 'green', note: 'Traditionelle Altstadt, lokale Küche und alpine Bergkulisse sprechen Teenager an' }
    },
    desc: 'Das „Kleine Kyoto der Alpen" mit perfekt erhaltener Edo-Altstadt, täglichen Morgenmärkten und dem besten Wagyu-Rind der japanischen Berge'
  },
  {
    id: 'miyajima',
    name: 'Miyajima',
    altName: 'Itsukushima',
    lat: 34.2961,
    lng: 132.3196,
    tags: ['Kultur', 'Natur'],
    wiki: 'Itsukushima',
    highlights: 'Schwebendes Torii (UNESCO), Itsukushima-Schrein, Berg Misen, Freilebende Hirsche',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flache Insel, kurze Wege, Fähre kinderfreundlich – entspannter Ausflug mit Baby' },
      '1-3':  { rating: 'green', note: 'Zahme Hirsche und rotes Torii begeistern Kleinkinder, überschaubare Inselgröße' },
      '3-6':  { rating: 'green', note: 'Hirsche füttern, Fähre fahren und am Strand spielen – perfekt für kleine Kinder' },
      '6-12': { rating: 'green', note: 'Seilbahn auf Berg Misen, Gezeitenspiel am Torii und Hirsche sorgen für Staunen' },
      '12+':  { rating: 'green', note: 'Ikonisches UNESCO-Welterbe, Wanderung auf Berg Misen und Fotomotive begeistern' }
    },
    desc: 'Heilige Insel mit dem ikonischen roten Torii im Wasser – einer der drei schönsten Anblicke Japans und UNESCO-Welterbe',
    dayTripFrom: [
      { base: 'hiroshima', transit: '~1h (JR-Bahn + Fähre)' }
    ]
  },
  {
    id: 'koyasan',
    name: 'Koya-san',
    altName: 'Mount Koya',
    lat: 34.2130,
    lng: 135.6000,
    tags: ['Kultur', 'Geschichte', 'Erholung'],
    wiki: 'Mount_Kōya',
    highlights: 'Okunoin-Friedhof, Kongobu-ji-Tempel, Tempelübernachtung (Shukubo), Danjogaran',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Tempelübernachtung mit strengen Regeln, frühe Gebete und Stille – nicht babygeeignet' },
      '1-3':  { rating: 'red', note: 'Lange Seilbahn-Anreise, strikte Tempelregeln und frühe Rituale überfordern Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Mystische Atmosphäre fasziniert, aber strenge Ruheregeln in Tempeln fordern Disziplin' },
      '6-12': { rating: 'yellow', note: 'Friedhofswanderung eindrucksvoll, aber Tempelregeln und vegetarisches Essen gewöhnungsbedürftig' },
      '12+':  { rating: 'green', note: 'Spirituelle Tempelübernachtung ist einzigartiges Erlebnis für reife Jugendliche' }
    },
    desc: 'Japans heiligster Berg, wo buddhistische Mönche seit 1.200 Jahren beten und Besucher in Tempeln übernachten, umgeben von mystischen Zedernwäldern',
    dayTripFrom: [
      { base: 'osaka', transit: '~2.5h Nankai-Zug + Seilbahn ab Namba' }
    ]
  },
  {
    id: 'naha',
    name: 'Naha',
    altName: 'Okinawa',
    lat: 26.2124,
    lng: 127.6792,
    tags: ['Erholung', 'Kultur', 'Abenteuer'],
    wiki: 'Naha',
    highlights: 'Shuri-Burg (UNESCO), Kokusai-Straße, Naminoue-Strand, Churaumi-Aquarium (Tagesausflug)',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Warmes Klima, Resort-Infrastruktur mit Baby-Ausstattung, flache Strände ideal für Babys' },
      '1-3':  { rating: 'green', note: 'Flache Strände, Churaumi-Aquarium begeistert Kleinkinder, Resort-Hotels kinderfreundlich' },
      '3-6':  { rating: 'green', note: 'Aquarium, Glasbodenboot und Strandspiele – tropisches Paradies für kleine Kinder' },
      '6-12': { rating: 'green', note: 'Schnorcheln, Walbeobachtung und Ryukyu-Kultur bieten Abenteuer für alle Schulkinder' },
      '12+':  { rating: 'green', note: 'Tauchen, Kajakfahren und tropische Inselhüpfen begeistern aktive Jugendliche' }
    },
    desc: 'Tropisches Inselparadies mit eigenständiger Ryukyu-Kultur, türkisem Meer und Japans entspanntestem Lebensgefühl'
  },
  {
    id: 'sapporo',
    name: 'Sapporo',
    lat: 43.0621,
    lng: 141.3544,
    tags: ['Großstadt', 'Kulinarik', 'Natur'],
    wiki: 'Sapporo',
    highlights: 'Schneefestival (Februar), Sapporo Biermuseum, Odori-Park, Nijo-Markt',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Strenge Winter können mit Baby herausfordernd sein, aber Innenstadt gut beheizbar' },
      '1-3':  { rating: 'green', note: 'Schneefestival-Skulpturen faszinieren Kleinkinder, Kaufhäuser mit Spielecken vorhanden' },
      '3-6':  { rating: 'green', note: 'Schneefestival, Shiroi Koibito Schokoladenfabrik und Zoos begeistern kleine Kinder' },
      '6-12': { rating: 'green', note: 'Skifahren, Schneefestival und Ramen-Alley bieten tolles Winterprogramm für Kinder' },
      '12+':  { rating: 'green', note: 'Skigebiete, Streetfood-Szene und Natur-Abenteuer auf Hokkaido begeistern Teenager' }
    },
    desc: 'Hokkaidos lebhafte Hauptstadt, berühmt für das spektakuläre Schneefestival, erstklassige Miso-Ramen und die weitläufige Natur der Nordinsel'
  },
  {
    id: 'fukuoka',
    name: 'Fukuoka',
    lat: 33.5904,
    lng: 130.4017,
    tags: ['Großstadt', 'Kulinarik'],
    wiki: 'Fukuoka',
    highlights: 'Yatai-Essstände am Fluss, Hakata-Ramen, Canal City, Dazaifu-Tenmangu-Schrein',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Kompakte Stadt mit guter Infrastruktur, Einkaufszentren mit Stillräumen vorhanden' },
      '1-3':  { rating: 'green', note: 'Canal City mit Wassershows begeistert Kleinkinder, kinderfreundliche Nudellokale' },
      '3-6':  { rating: 'green', note: 'Yatai-Stände faszinieren Kinder, Anpanman Museum und Strandpark bieten Abwechslung' },
      '6-12': { rating: 'green', note: 'Ramen-Stadion, Yatai-Erlebnis und Dazaifu-Schrein bieten Spaß und Kultur zugleich' },
      '12+':  { rating: 'green', note: 'Streetfood-Abenteuer an den Yatai-Ständen und entspannte Atmosphäre für Jugendliche' }
    },
    desc: 'Kyushus entspannte Hafenstadt, wo nachts über 100 Yatai-Straßenstände aufklappen und Japans beste Tonkotsu-Ramen dampft'
  },

  // ===== OFF THE BEATEN PATH (10) =====
  {
    id: 'naoshima',
    name: 'Naoshima',
    lat: 34.4583,
    lng: 133.9833,
    tags: ['Kultur'],
    wiki: 'Naoshima,_Kagawa',
    highlights: 'Chichu Art Museum, Yayoi Kusamas Kürbis-Skulptur, Art House Project, Benesse House',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Fährüberfahrt und Laufwege zwischen Museen anstrengend mit Baby, wenig Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Museen verlangen Ruhe, Insel erfordert viel Laufen – für Kleinkinder herausfordernd' },
      '3-6':  { rating: 'yellow', note: 'Kusamas bunter Kürbis begeistert, aber lange Museumsbesuche fordern kleine Kinder' },
      '6-12': { rating: 'green', note: 'Interaktive Kunstinstallationen und Insel-Abenteuer faszinieren kunstinteressierte Kinder' },
      '12+':  { rating: 'green', note: 'Weltklasse-Kunstmuseen und einzigartige Insel-Atmosphäre inspirieren kreative Teenager' }
    },
    offbeat: true,
    desc: 'Eine kleine Insel im Seto-Binnenmeer, die sich in ein weltberühmtes Freiluftmuseum verwandelt hat – zeitgenössische Kunst verschmilzt mit japanischer Natur'
  },
  {
    id: 'yakushima',
    name: 'Yakushima',
    lat: 30.3439,
    lng: 130.5239,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Yakushima',
    highlights: 'Jomon-Sugi (uralte Zeder), UNESCO-Urwald, Shiratani-Unsuikyo-Moosschlucht, Oko-no-Taki-Wasserfall',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Mehrstündige Dschungelwanderungen und abgelegene Lage völlig ungeeignet für Babys' },
      '1-3':  { rating: 'red', note: 'Anspruchsvolle Wanderwege und fehlende Infrastruktur – nicht für Kleinkinder geeignet' },
      '3-6':  { rating: 'yellow', note: 'Kurze Waldwege machbar, aber Hauptattraktionen erfordern lange Wanderungen ohne Buggy' },
      '6-12': { rating: 'yellow', note: 'Mooswald wie in Mononoke fasziniert, aber lange Wanderungen erfordern gute Kondition' },
      '12+':  { rating: 'green', note: 'Abenteuerliche Trekkingtouren durch UNESCO-Urwald – unvergesslich für fitte Teenager' }
    },
    offbeat: true,
    desc: 'UNESCO-Welterbe-Insel mit uralten Zedernwäldern, die Studio Ghiblis „Prinzessin Mononoke" inspirierten – mystisch und unberührt'
  },
  {
    id: 'shirakawago',
    name: 'Shirakawa-go',
    lat: 36.2571,
    lng: 136.9062,
    tags: ['Kultur', 'Geschichte'],
    wiki: 'Historic_Villages_of_Shirakawa-gō_and_Gokayama',
    highlights: 'Gasshō-zukuri Bauernhäuser (UNESCO), Winter-Illumination, Ogimachi-Aussichtspunkt, Wada-Haus-Museum',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegenes Bergdorf mit eingeschränkter Baby-Infrastruktur, Winterkälte beachten' },
      '1-3':  { rating: 'green', note: 'Märchenhafte Häuser faszinieren Kleinkinder, kurze Spazierwege gut machbar' },
      '3-6':  { rating: 'green', note: 'Reetdachhäuser wie im Märchen, Schneespiele im Winter – magisch für kleine Kinder' },
      '6-12': { rating: 'green', note: 'UNESCO-Dorf erkunden, traditionelle Häuser besichtigen und Natur erleben begeistert Kids' },
      '12+':  { rating: 'green', note: 'Einzigartige Architektur und UNESCO-Status bieten tolle Fotomotive für Jugendliche' }
    },
    offbeat: true,
    desc: 'Ein märchenhaftes UNESCO-Bergdorf mit riesigen Reetdachhäusern – im Winter unter Schnee illuminiert ein unvergleichliches Erlebnis',
    dayTripFrom: [
      { base: 'takayama', transit: '~50 min Bus' },
      { base: 'kanazawa', transit: '~1.5h Bus' }
    ]
  },
  {
    id: 'beppu',
    name: 'Beppu',
    lat: 33.2847,
    lng: 131.4914,
    tags: ['Erholung', 'Natur'],
    wiki: 'Beppu',
    highlights: 'Jigoku Meguri (Höllen-Quellen), Sandbäder, Dampfbad-Küche, Über 2.000 heiße Quellen',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Heiße Quellen sind gefährlich für Babys, aber Höllen-Besichtigung von außen möglich' },
      '1-3':  { rating: 'yellow', note: 'Heiße Quellen erfordern Vorsicht, aber bunte Höllen-Tour fasziniert auch Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Farbige Höllen-Quellen und Sandbad sind spannend – wie ein Naturwissenschafts-Abenteuer' },
      '6-12': { rating: 'green', note: 'Dampfende Höllen, Sandbäder und in Dampf gekochtes Essen faszinieren neugierige Kinder' },
      '12+':  { rating: 'green', note: 'Onsen-Erlebnis, vulkanische Höllen und Sandbäder bieten einzigartiges Wellness-Abenteuer' }
    },
    offbeat: true,
    desc: 'Japans Onsen-Hauptstadt mit über 2.000 heißen Quellen, wo man blutrote Höllen bestaunen und sich in vulkanisch erhitztem Sand begraben lassen kann'
  },
  {
    id: 'matsumoto',
    name: 'Matsumoto',
    lat: 36.2380,
    lng: 137.9720,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Matsumoto,_Nagano',
    highlights: 'Matsumoto-Burg (Nationalschatz, „Krähenburg"), Nakamachi-Viertel, Kamikochi-Alpental, Wasabi-Farm Daio',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Kompakte Stadt, Burggelände kinderwagentauglich, gute Infrastruktur vorhanden' },
      '1-3':  { rating: 'green', note: 'Burg und Stadtzentrum überschaubar, Wasabi-Farm bietet Grünflächen zum Erkunden' },
      '3-6':  { rating: 'green', note: 'Schwarze Burg beeindruckt Kinder, Wasabi-Farm bietet Probieren und Entdecken' },
      '6-12': { rating: 'green', note: 'Historische Burg besteigen, Alpenpanorama und Wasabi-Farm besuchen begeistert Kinder' },
      '12+':  { rating: 'green', note: 'Originalburg besichtigen und Kamikochi-Alpental erwandern bieten Abwechslung für Teens' }
    },
    offbeat: true,
    desc: 'Elegante Burgstadt am Fuß der Japanischen Alpen mit einer der ältesten Originalburgen Japans und direktem Zugang zu alpiner Bergwelt'
  },
  {
    id: 'onomichi',
    name: 'Onomichi',
    lat: 34.4167,
    lng: 133.2000,
    tags: ['Kultur', 'Abenteuer'],
    wiki: 'Onomichi',
    highlights: 'Tempelwanderung (25 Tempel), Shimanami Kaido Radweg, Senkoji-Tempel & Seilbahn, Katzenpfad',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Steile Tempelwege und hügelige Gassen schwierig mit Kinderwagen, Seilbahn aber möglich' },
      '1-3':  { rating: 'yellow', note: 'Hügelige Altstadt anstrengend mit Buggy, aber Katzen und Seilbahn begeistern Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Katzenpfad, Seilbahn und Eiscreme-Läden – charmantes kleines Abenteuer für Kinder' },
      '6-12': { rating: 'green', note: 'Shimanami Kaido mit Leihrad über Brücken fahren ist ein unvergessliches Radabenteuer' },
      '12+':  { rating: 'green', note: 'Shimanami-Kaido-Radtour über sechs Inseln – legendäres Erlebnis für sportliche Teens' }
    },
    offbeat: true,
    desc: 'Verschlafene Hafenstadt mit labyrinthischen Gassen voller Tempel und Katzen – Startpunkt des legendären Shimanami Kaido über sechs Inseln',
    dayTripFrom: [
      { base: 'hiroshima', transit: '~1.5h JR Sanyo-Linie' }
    ]
  },
  {
    id: 'kinosaki',
    name: 'Kinosaki Onsen',
    lat: 35.6238,
    lng: 134.8134,
    tags: ['Erholung', 'Kultur'],
    wiki: 'Kinosaki,_Hyōgo',
    highlights: '7 öffentliche Badehäuser (Onsen-Hopping), Yukata-Flanierkultur, Weidengesäumte Kanäle',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Heiße Quellen für Babys ungeeignet, aber Yukata-Bummel und Atmosphäre genießbar' },
      '1-3':  { rating: 'yellow', note: 'Onsen-Bäder schwierig mit Kleinkindern, aber Kanäle und Yukata-Flanieren machen Spaß' },
      '3-6':  { rating: 'green', note: 'Familien-Onsen verfügbar, Kanalspaziergang im Yukata fühlt sich wie Verkleiden an' },
      '6-12': { rating: 'green', note: 'Onsen-Hopping-Abenteuer im Yukata, Stempelkarte sammeln begeistert Schulkinder' },
      '12+':  { rating: 'green', note: 'Traditionelles Bade-Erlebnis und japanische Wellness-Kultur faszinieren Jugendliche' }
    },
    offbeat: true,
    desc: 'Ein 1.300 Jahre altes Thermalstädtchen, in dem man im Yukata von Bad zu Bad schlendert – traditionelles Japan in seiner reinsten Form',
    dayTripFrom: [
      { base: 'kyoto', transit: '~2.5h Limited Express' }
    ]
  },
  {
    id: 'tottori',
    name: 'Tottori',
    lat: 35.5000,
    lng: 134.2333,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Tottori_(city)',
    highlights: 'Tottori-Sanddünen (Japans größte), Kamelreiten, Sandboarding & Paragliding, Sand-Museum',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Sand und Hitze anstrengend für Babys, Kinderwagen unbrauchbar in den Dünen' },
      '1-3':  { rating: 'yellow', note: 'Im Sand laufen anstrengend für Kleinkinder, aber Kamele anschauen macht Spaß' },
      '3-6':  { rating: 'green', note: 'Kamelreiten, im Sand buddeln und Sand-Museum – Kinder lieben dieses Naturwunder' },
      '6-12': { rating: 'green', note: 'Sandboarding, Kamelreiten und Paragliding-Zuschauen sorgen für Abenteuer-Begeisterung' },
      '12+':  { rating: 'green', note: 'Sandboarding, Paragliding und Kamelreiten – actionreiches Dünen-Abenteuer für Teens' }
    },
    offbeat: true,
    desc: 'Japans surrealstes Naturwunder – 16 Kilometer Sanddünen am Japanischen Meer, wo man Kamel reiten und Sandboarden kann'
  },
  {
    id: 'kagoshima',
    name: 'Kagoshima',
    lat: 31.5969,
    lng: 130.5572,
    tags: ['Natur', 'Geschichte', 'Kulinarik'],
    wiki: 'Kagoshima',
    highlights: 'Sakurajima-Vulkan (aktiv), Sengan-en-Garten, Ibusuki-Sandbäder, Kurobuta-Schweinefleisch',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Kompakte Stadt mit guter Infrastruktur, Fähre zum Vulkan kinderwagentauglich' },
      '1-3':  { rating: 'green', note: 'Vulkan von der Fähre bestaunen fasziniert Kleinkinder, Sandbäder in Ibusuki möglich' },
      '3-6':  { rating: 'green', note: 'Aktiver Vulkan beobachten und im heißen Sand baden – aufregend für kleine Kinder' },
      '6-12': { rating: 'green', note: 'Sakurajima-Vulkan-Erkundung, Ibusuki-Sandbad und Aquarium begeistern Schulkinder' },
      '12+':  { rating: 'green', note: 'Aktiver Vulkan, Samurai-Geschichte und lokale Küche bieten spannende Erlebnisse' }
    },
    offbeat: true,
    desc: 'Das „Neapel des Ostens" mit dem ständig rauchenden Vulkan Sakurajima direkt vor der Haustür – lebendige Südseite Japans'
  },
  {
    id: 'magome-tsumago',
    name: 'Magome & Tsumago',
    lat: 35.5268,
    lng: 137.5681,
    tags: ['Geschichte', 'Natur', 'Kultur'],
    wiki: 'Magome-juku',
    highlights: 'Nakasendo-Wanderweg (8 km), Edo-zeitliche Posthäuser, Zedernwälder & Bambushaine',
    family: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Bergiger 8-km-Wanderweg ohne Buggy-Option, keine Baby-Infrastruktur vor Ort' },
      '1-3':  { rating: 'red', note: 'Wanderung zu lang und steil für Kleinkinder, kaum Infrastruktur in den Dörfern' },
      '3-6':  { rating: 'yellow', note: 'Kürzere Abschnitte zu Fuß machbar, aber volle Wanderung zu lang für kleine Kinder' },
      '6-12': { rating: 'green', note: 'Historische Wanderung durch Zedernwälder – tolles Abenteuer für wanderfreudige Kinder' },
      '12+':  { rating: 'green', note: 'Nakasendo-Wanderung ist ein einmaliges Erlebnis – perfekt für aktive Jugendliche' }
    },
    offbeat: true,
    desc: 'Zwei perfekt erhaltene Poststädte an der historischen Nakasendo-Route – die Wanderung durch Zedernwälder ist eine Zeitreise ins feudale Japan',
    dayTripFrom: [
      { base: 'takayama', transit: '~2h Zug über Nagoya' },
      { base: 'matsumoto', transit: '~1.5h Zug' }
    ]
  }
];
