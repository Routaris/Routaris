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
    offbeat: true,
    desc: 'Zwei perfekt erhaltene Poststädte an der historischen Nakasendo-Route – die Wanderung durch Zedernwälder ist eine Zeitreise ins feudale Japan',
    dayTripFrom: [
      { base: 'takayama', transit: '~2h Zug über Nagoya' },
      { base: 'matsumoto', transit: '~1.5h Zug' }
    ]
  }
];
