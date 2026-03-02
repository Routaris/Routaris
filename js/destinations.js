/* ============================================
   DESTINATIONS.JS – Datenbank aller China-Ziele
   ============================================ */

const DESTINATIONS = [
  // ==========================================
  // Hauptziele (auf der Karte sichtbar)
  // ==========================================
  {
    id: 'shanghai',
    name: 'Shanghai',
    lat: 31.23,
    lng: 121.47,
    tags: ['Großstadt', 'Kultur'],
    wiki: 'Shanghai',
    highlights: 'The Bund, Yu-Garten, French Concession',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Top Krankenhäuser, Metro mit Aufzügen, viele Parks' },
      '1-3':  { rating: 'green', note: 'Kinderwagen-freundlich, internationale Küche verfügbar' },
      '3-6':  { rating: 'green', note: 'Aquarium, Disneyland, Naturkundemuseum begeistern' },
      '6-12': { rating: 'green', note: 'Science Museum, Bund-Promenade, Maglev-Zug fasziniert' },
      '12+':  { rating: 'green', note: 'Shopping, Streetfood, moderne Kultur und Nachtleben' }
    },
    desc: 'Chinas kosmopolitische Megacity am Huangpu-Fluss'
  },
  {
    id: 'beijing',
    name: 'Peking',
    lat: 39.91,
    lng: 116.40,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Beijing',
    highlights: 'Verbotene Stadt, Große Mauer Mutianyu, Hutongs',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Exzellente Kliniken, flache Wege, gute Infrastruktur' },
      '1-3':  { rating: 'green', note: 'Parks mit Spielplätzen, Verbotene Stadt gut begehbar' },
      '3-6':  { rating: 'green', note: 'Große Mauer Mutianyu mit Seilbahn, Peking-Zoo mit Pandas' },
      '6-12': { rating: 'green', note: 'Mauer-Wanderung, Hutong-Rikscha, Geschichte erleben' },
      '12+':  { rating: 'green', note: '798 Art District, Streetfood, Geschichte und Kultur' }
    },
    desc: 'Jahrtausendealte Hauptstadt mit imperialem Erbe'
  },
  {
    id: 'xian',
    name: "Xi'an",
    lat: 34.26,
    lng: 108.94,
    tags: ['Geschichte'],
    wiki: "Xi'an",
    highlights: 'Terrakotta-Armee, Stadtmauer, Muslim Quarter',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Gute Kliniken, flaches Terrain, Stadtmauer rollstuhlgerecht' },
      '1-3':  { rating: 'green', note: 'Stadtmauer mit Fahrrad/Tandem, Muslim Quarter kindersicher' },
      '3-6':  { rating: 'green', note: 'Terrakotta-Armee beeindruckt, Stadtmauer zum Radfahren' },
      '6-12': { rating: 'green', note: 'Terrakotta-Armee, Bogenschießen auf der Stadtmauer' },
      '12+':  { rating: 'green', note: 'Streetfood im Muslim Quarter, Geschichte hautnah erleben' }
    },
    desc: 'Startpunkt der Seidenstraße und antike Kaiserstadt'
  },
  {
    id: 'guangzhou',
    name: 'Guangzhou',
    lat: 23.13,
    lng: 113.26,
    tags: ['Großstadt', 'Kulinarik'],
    wiki: 'Guangzhou',
    highlights: 'Canton Tower, Chen Clan Ancestral Hall, Dim Sum',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Moderne Kliniken, mildes Klima, gute Metro-Infrastruktur' },
      '1-3':  { rating: 'green', note: 'Dim Sum kinderfreundlich, Parks mit Spielplätzen' },
      '3-6':  { rating: 'green', note: 'Chimelong Safari Park, Canton Tower Aussichtsplattform' },
      '6-12': { rating: 'green', note: 'Chimelong Freizeitpark, Dim-Sum-Workshops, Bootsfahrten' },
      '12+':  { rating: 'green', note: 'Shopping in Tianhe, Streetfood-Touren, Chimelong Wasserpark' }
    },
    desc: 'Kantonesische Küche und jahrtausendealte Handelsstadt'
  },
  {
    id: 'shenzhen',
    name: 'Shenzhen',
    lat: 22.54,
    lng: 114.06,
    tags: ['Großstadt', 'Kultur'],
    wiki: 'Shenzhen',
    highlights: 'OCT Loft, Dafen Oil Painting Village, Coastal Greenway',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Modernste Stadt Chinas, top Kliniken, saubere Parks' },
      '1-3':  { rating: 'green', note: 'Window of the World kindgerecht, viele Indoor-Spielplätze' },
      '3-6':  { rating: 'green', note: 'Happy Valley Freizeitpark, Mangroven-Park mit Vögeln' },
      '6-12': { rating: 'green', note: 'Tech-Erlebnisse, Roboter-Cafés, Küsten-Radweg' },
      '12+':  { rating: 'green', note: 'Elektronik-Märkte, OCT Loft Kunstszene, Shopping' }
    },
    desc: 'Chinas Tech-Metropole mit kreativer Kunst- und Designszene'
  },
  {
    id: 'hongkong',
    name: 'Hongkong',
    lat: 22.32,
    lng: 114.17,
    tags: ['Großstadt', 'Kultur', 'Kulinarik'],
    wiki: 'Hong_Kong',
    highlights: 'Victoria Peak, Star Ferry, Temple Street Night Market',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Westlicher Standard, top Kliniken, saubere MTR' },
      '1-3':  { rating: 'green', note: 'Star Ferry, Disneyland, Ocean Park kinderfreundlich' },
      '3-6':  { rating: 'green', note: 'Disneyland, Peak Tram, Ocean Park mit Shows' },
      '6-12': { rating: 'green', note: 'Star Ferry, Peak Tram, Ngong Ping Seilbahn, Dim Sum' },
      '12+':  { rating: 'green', note: 'Shopping, Nachtmärkte, internationales Essen, Wandern' }
    },
    desc: 'Wo Wolkenkratzer auf Tempel und Dim-Sum-Kultur treffen'
  },
  {
    id: 'hangzhou',
    name: 'Hangzhou',
    lat: 30.27,
    lng: 120.15,
    tags: ['Natur', 'Kultur'],
    wiki: 'Hangzhou',
    highlights: 'Westsee, Longjing-Teeplantagen, Lingyin-Tempel',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flaches Seeufer, gute Kliniken, ruhige Atmosphäre' },
      '1-3':  { rating: 'green', note: 'Bootsfahrt auf dem Westsee, flache Spazierwege' },
      '3-6':  { rating: 'green', note: 'Bootsfahrt, Teeplantagen erkunden, Leifeng-Pagode' },
      '6-12': { rating: 'green', note: 'Fahrradtour am Westsee, Tee pflücken, Lingyin-Tempel' },
      '12+':  { rating: 'green', note: 'Teekultur, Alibaba-Hauptstadt, Westsee-Radtour' }
    },
    desc: 'Paradies auf Erden – Teekultur trifft Seenlandschaft'
  },
  {
    id: 'guilin',
    name: 'Guilin / Yangshuo',
    lat: 25.27,
    lng: 110.29,
    tags: ['Natur'],
    wiki: 'Guilin',
    highlights: 'Li-Fluss, Karstberge, Reisterrassen',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Li-Fluss-Bootsfahrt lang (4h), Yangshuo ländlich' },
      '1-3':  { rating: 'yellow', note: 'Bootsfahrt anstrengend, Yangshuo holprige Wege' },
      '3-6':  { rating: 'green', note: 'Bambusfloß (Teilstrecke), Höhlen erkunden, Radfahren' },
      '6-12': { rating: 'green', note: 'Bambusfloß, Radtour durch Reisfelder, Höhlentouren' },
      '12+':  { rating: 'green', note: 'Klettern in Yangshuo, Radtouren, Lichtshow am Li-Fluss' }
    },
    desc: 'Spektakuläre Karstlandschaft wie aus einem Gemälde'
  },
  {
    id: 'chengdu',
    name: 'Chengdu',
    lat: 30.57,
    lng: 104.07,
    tags: ['Natur', 'Kultur', 'Kulinarik'],
    wiki: 'Chengdu',
    highlights: 'Pandas, Teehaus-Kultur, Sichuan-Küche',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Gute Kliniken, flach, entspannte Atmosphäre' },
      '1-3':  { rating: 'green', note: 'Panda Base begeistert, Parks und Teehäuser familienfreundlich' },
      '3-6':  { rating: 'green', note: 'Panda-Aufzuchtstation, People\'s Park, Jinli-Gasse' },
      '6-12': { rating: 'green', note: 'Pandas hautnah, Sichuan-Küche probieren, Teezeremonien' },
      '12+':  { rating: 'green', note: 'Streetfood, Teekultur, Nachtmärkte, Hot-Pot-Erlebnis' }
    },
    desc: 'Entspanntes Panda-Paradies mit feuriger Küche'
  },
  {
    id: 'chongqing',
    name: 'Chongqing',
    lat: 29.56,
    lng: 106.55,
    tags: ['Großstadt', 'Kulinarik'],
    wiki: 'Chongqing',
    highlights: 'Hongya Cave, Hot Pot, Jangtse-Seilbahn',
    family: false,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Extreme Hügellage, viele Treppen, schwül im Sommer' },
      '1-3':  { rating: 'yellow', note: 'Sehr hügelig, Kinderwagen schwierig, scharfes Essen' },
      '3-6':  { rating: 'yellow', note: 'Seilbahn spannend aber Hügel anstrengend für kleine Kinder' },
      '6-12': { rating: 'green', note: 'Seilbahn über den Jangtse, Hongya Cave, Hot-Pot-Kultur' },
      '12+':  { rating: 'green', note: 'Cyberpunk-Vibes, Nachtleben, Hot Pot, Seilbahnen' }
    },
    desc: 'Cyberpunk-Bergstadt mit dem besten Hot Pot Chinas'
  },
  {
    id: 'suzhou',
    name: 'Suzhou',
    lat: 31.30,
    lng: 120.62,
    tags: ['Kultur', 'Erholung'],
    wiki: 'Suzhou',
    highlights: 'UNESCO-Gärten, Kanäle, Seidenmuseum',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flach, ruhig, nahe Shanghai für Notfälle' },
      '1-3':  { rating: 'green', note: 'Kanalfahrten ruhig, Gärten zum Spazieren, flaches Terrain' },
      '3-6':  { rating: 'green', note: 'Seidenmuseum, Bootsfahrten, klassische Gärten erkunden' },
      '6-12': { rating: 'green', note: 'UNESCO-Gärten, Seidenherstellung sehen, Kanal-Bootsfahrt' },
      '12+':  { rating: 'green', note: 'Kulturelle Gärten, Pingjiang Road, Seiden-Shopping' }
    },
    desc: 'Venedig des Ostens mit UNESCO-Meistergärten',
    dayTripFrom: [{ base: 'shanghai', transit: '~30min Schnellzug' }]
  },
  {
    id: 'nanjing',
    name: 'Nanjing',
    lat: 32.06,
    lng: 118.80,
    tags: ['Geschichte'],
    wiki: 'Nanjing',
    highlights: 'Stadtmauer, Xuanwu-See, Purple Mountain',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Gute Kliniken, Parks, Metro mit Aufzügen' },
      '1-3':  { rating: 'green', note: 'Xuanwu-See mit Booten, flache Parks, gute Infrastruktur' },
      '3-6':  { rating: 'green', note: 'Stadtmauer begehbar, Bootsfahrt, Nanjing-Museum interaktiv' },
      '6-12': { rating: 'green', note: 'Stadtmauer erkunden, Sun-Yat-sen-Mausoleum, Museum' },
      '12+':  { rating: 'green', note: 'Geschichtsträchtig, Fuzimiao-Viertel, Xuanwu-See' }
    },
    desc: 'Ehemalige Hauptstadt mit mächtiger Stadtmauer'
  },
  {
    id: 'huangshan',
    name: 'Huangshan',
    lat: 30.13,
    lng: 118.17,
    tags: ['Natur'],
    wiki: 'Huangshan',
    highlights: 'Gelbe Berge, Hongcun/Xidi UNESCO-Dörfer',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Steile Treppen, keine Kinderwagen möglich, abgelegen' },
      '1-3':  { rating: 'red', note: 'Tausende steile Stufen, Tragen nötig, sehr anstrengend' },
      '3-6':  { rating: 'yellow', note: 'Seilbahn hilft, aber viele Treppen oben, Hongcun flach' },
      '6-12': { rating: 'green', note: 'Seilbahn + Bergwanderung machbar, UNESCO-Dörfer spannend' },
      '12+':  { rating: 'green', note: 'Spektakuläre Bergwanderung, Sonnenaufgang, Fotomotive' }
    },
    desc: 'Mystische Berggipfel über dem Wolkenmeer'
  },
  {
    id: 'emeishan',
    name: 'Emeishan / Leshan',
    lat: 29.60,
    lng: 103.77,
    tags: ['Natur', 'Geschichte'],
    wiki: 'Mount_Emei',
    highlights: '71m Buddha, heiliger Berg, Affentempel',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Steiler Berg, wilde Affen, keine Infrastruktur am Berg' },
      '1-3':  { rating: 'red', note: 'Affen können aggressiv sein, steile Wege, abgelegen' },
      '3-6':  { rating: 'yellow', note: 'Leshan Buddha per Boot machbar, Berg nur mit Seilbahn' },
      '6-12': { rating: 'green', note: 'Riesiger Buddha beeindruckt, Affen beobachten, Seilbahn' },
      '12+':  { rating: 'green', note: 'Bergwanderung, Leshan Buddha, Affen, spirituelle Atmosphäre' }
    },
    desc: 'Heiliger Berg mit dem weltgrößten Buddha',
    dayTripFrom: [{ base: 'chengdu', transit: '~1.5h Schnellzug' }]
  },
  {
    id: 'moganshan',
    name: 'Moganshan',
    lat: 30.63,
    lng: 119.85,
    tags: ['Erholung', 'Natur'],
    wiki: 'Moganshan',
    highlights: 'Bambuswälder, Boutique-Resorts, Wanderwege',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Ländlich, begrenztes medizinisches Angebot, Resorts familienfreundlich' },
      '1-3':  { rating: 'green', note: 'Boutique-Resorts mit Pools, Bambuswälder zum Spazieren' },
      '3-6':  { rating: 'green', note: 'Bambuswälder erkunden, Resort-Pools, frische Bergluft' },
      '6-12': { rating: 'green', note: 'Wanderwege im Bambuswald, Zip-Lining, Resort-Aktivitäten' },
      '12+':  { rating: 'green', note: 'Wandern, Mountainbiken, Boutique-Hotel-Atmosphäre' }
    },
    desc: 'Grüne Oase der Ruhe – Bambus und Boutique-Hotels',
    dayTripFrom: [{ base: 'hangzhou', transit: '~1.5h Bus/Taxi' }]
  },
  {
    id: 'zhangjiajie',
    name: 'Zhangjiajie',
    lat: 29.12,
    lng: 110.48,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Zhangjiajie',
    highlights: 'Avatar-Berge, Glasbrücke, Tianmen Mountain',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Steile Wege, Glasbrücke nicht geeignet, abgelegen' },
      '1-3':  { rating: 'red', note: 'Steiles Gelände, lange Wege, begrenzte medizinische Versorgung' },
      '3-6':  { rating: 'yellow', note: 'Seilbahn und Aufzug helfen, aber Wanderwege steil' },
      '6-12': { rating: 'green', note: 'Avatar-Berge begeistern, Glasbrücke, Bailong-Aufzug' },
      '12+':  { rating: 'green', note: 'Glasbrücke, Tianmen-Höhle, spektakuläre Wanderungen' }
    },
    desc: 'Die schwebenden Berge aus dem Film Avatar'
  },
  {
    id: 'yunnan',
    name: 'Kunming / Dali / Lijiang',
    lat: 25.04,
    lng: 102.68,
    tags: ['Natur', 'Kultur'],
    wiki: 'Yunnan',
    highlights: 'Yunnan-Region, Erhai-See, Altstadt Lijiang',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Höhenlage (2400m Lijiang), lange Transfers zwischen Städten' },
      '1-3':  { rating: 'yellow', note: 'Höhenlage kann belasten, Kopfsteinpflaster in Altstädten' },
      '3-6':  { rating: 'green', note: 'Erhai-See-Radtour, bunte Märkte, mildes Klima in Kunming' },
      '6-12': { rating: 'green', note: 'Erhai-See, Lijiang-Altstadt, Minderheiten-Kultur erleben' },
      '12+':  { rating: 'green', note: 'Altstädte, ethnische Vielfalt, Jade-Drachen-Schneeberg' }
    },
    desc: 'Yunnans ethnische Vielfalt zwischen Bergen und Seen'
  },
  {
    id: 'xiamen',
    name: 'Xiamen',
    lat: 24.48,
    lng: 118.09,
    tags: ['Erholung', 'Kultur'],
    wiki: 'Xiamen',
    highlights: 'Gulangyu-Insel, Strandpromenade, Nanputuo-Tempel',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Mildes Klima, flache Strandpromenade, gute Kliniken' },
      '1-3':  { rating: 'green', note: 'Strand zum Planschen, Gulangyu autofrei und sicher' },
      '3-6':  { rating: 'green', note: 'Gulangyu-Insel autofrei, Strand, Muschelmuseum' },
      '6-12': { rating: 'green', note: 'Gulangyu erkunden, Strand, Nanputuo-Tempel, Meeresfrüchte' },
      '12+':  { rating: 'green', note: 'Strand, Cafés auf Gulangyu, entspannte Küstenatmosphäre' }
    },
    desc: 'Entspannte Küstenstadt mit autofreier Insel'
  },

  // ==========================================
  // Off the Beaten Path (versteckt, aufklappbar)
  // ==========================================
  {
    id: 'fenghuang',
    name: 'Fenghuang',
    lat: 27.93,
    lng: 109.60,
    tags: ['Kultur', 'Geschichte'],
    wiki: 'Fenghuang_County',
    highlights: 'Stelzenhäuser am Fluss, Miao-Kultur, Nachtbeleuchtung',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kopfsteinpflaster, ländlich, begrenzte medizinische Versorgung' },
      '1-3':  { rating: 'yellow', note: 'Unebene Gassen, Stufen zum Fluss, kein Kinderwagen möglich' },
      '3-6':  { rating: 'green', note: 'Bootsfahrt auf dem Fluss, bunte Häuser, Laternen abends' },
      '6-12': { rating: 'green', note: 'Flussfahrt, Miao-Kultur, Nachtbeleuchtung faszinierend' },
      '12+':  { rating: 'green', note: 'Fotografieren, Nachtbeleuchtung, lokale Küche probieren' }
    },
    desc: 'Märchenhafte Altstadt auf Stelzen am Tuo-Fluss',
    offbeat: true
  },
  {
    id: 'pingyao',
    name: 'Pingyao',
    lat: 37.19,
    lng: 112.18,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Pingyao',
    highlights: 'UNESCO-Altstadt, Stadtmauer, historische Banken',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kleine Stadt, begrenzte Kliniken, kalt im Winter' },
      '1-3':  { rating: 'yellow', note: 'Kopfsteinpflaster-Gassen, begrenzte Essensauswahl für Kinder' },
      '3-6':  { rating: 'green', note: 'Stadtmauer begehbar, Rikscha-Fahrten, kompakte Altstadt' },
      '6-12': { rating: 'green', note: 'Stadtmauer erkunden, alte Banken besichtigen, Rikscha fahren' },
      '12+':  { rating: 'green', note: 'Authentische Ming-Architektur, Fotomotive, Handwerkskunst' }
    },
    desc: 'Perfekt erhaltene Ming-Dynastie-Stadt mit UNESCO-Status',
    offbeat: true
  },
  {
    id: 'jiuzhaigou',
    name: 'Jiuzhaigou',
    lat: 33.26,
    lng: 103.92,
    tags: ['Natur'],
    wiki: 'Jiuzhaigou',
    highlights: 'Türkisfarbene Seen, Wasserfälle, Tibetische Dörfer',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Höhenlage (2500m+), abgelegen, begrenzte Notfallversorgung' },
      '1-3':  { rating: 'red', note: 'Hohes Gelände, lange Anreise, dünne Luft belastet Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Shuttle-Busse im Park, aber Höhe und lange Anreise' },
      '6-12': { rating: 'green', note: 'Bunte Seen faszinieren, Shuttle-Busse, Boardwalks vorhanden' },
      '12+':  { rating: 'green', note: 'Spektakuläre Naturwunder, Fotografie, Wanderwege' }
    },
    desc: 'Unwirklich bunte Seen in einem tibetischen Bergtal',
    offbeat: true
  },
  {
    id: 'harbin',
    name: 'Harbin',
    lat: 45.75,
    lng: 126.65,
    tags: ['Kultur', 'Abenteuer'],
    wiki: 'Harbin',
    highlights: 'Eisfestival, Russische Architektur, Sibirisches Flair',
    family: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem kalt (-20°C bis -30°C), Erfrierungsgefahr für Babys' },
      '1-3':  { rating: 'yellow', note: 'Bitter kalt im Winter, nur kurze Aufenthalte draußen möglich' },
      '3-6':  { rating: 'yellow', note: 'Eisfestival beeindruckend aber bitterkalt, warm einpacken' },
      '6-12': { rating: 'green', note: 'Eisfestival magisch, Schnee-Spielplätze, Schlittenfahren' },
      '12+':  { rating: 'green', note: 'Eisfestival, Eisschwimmen zusehen, russische Architektur' }
    },
    desc: 'Chinas Eisstadt – spektakuläre Eisskulpturen im Winter',
    offbeat: true
  },
  {
    id: 'dunhuang',
    name: 'Dunhuang',
    lat: 40.14,
    lng: 94.66,
    tags: ['Geschichte', 'Abenteuer'],
    wiki: 'Dunhuang',
    highlights: 'Mogao-Grotten, Singende Sanddünen, Mondsichel-See',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Wüstenklima extrem, sehr abgelegen, kaum medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Hitze und Sand gefährlich, nächste Klinik weit entfernt' },
      '3-6':  { rating: 'yellow', note: 'Kamelreiten möglich, aber Hitze und Sand anstrengend' },
      '6-12': { rating: 'green', note: 'Kamelreiten in Dünen, Mogao-Grotten, Wüstenabenteuer' },
      '12+':  { rating: 'green', note: 'Sandboarding, Kamelkarawane, antike Höhlenkunst' }
    },
    desc: 'Seidenstraßen-Oase mit 1.000 Jahre alten Höhlenmalereien',
    offbeat: true
  },
  {
    id: 'luoyang',
    name: 'Luoyang',
    lat: 34.62,
    lng: 112.45,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Luoyang',
    highlights: 'Longmen-Grotten, Shaolin-Tempel, Pfingstrosen-Festival',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Mittelstadt, solide Kliniken, Grotten erfordern Laufwege' },
      '1-3':  { rating: 'yellow', note: 'Longmen-Grotten mit vielen Stufen, Shaolin-Anfahrt lang' },
      '3-6':  { rating: 'green', note: 'Shaolin-Kung-Fu-Show begeistert, Grotten beeindruckend' },
      '6-12': { rating: 'green', note: 'Shaolin-Tempel, Kung-Fu-Vorführung, Longmen-Grotten' },
      '12+':  { rating: 'green', note: 'Shaolin-Kampfkunst, historische Grotten, Pfingstrosenfest' }
    },
    desc: 'Wiege der chinesischen Zivilisation mit UNESCO-Grotten',
    offbeat: true,
    dayTripFrom: [{ base: 'xian', transit: '~1.5h Schnellzug' }]
  },
  {
    id: 'sanya',
    name: 'Sanya (Hainan)',
    lat: 18.25,
    lng: 109.50,
    tags: ['Erholung', 'Natur'],
    wiki: 'Sanya',
    highlights: 'Tropische Strände, Nanshan-Tempel, Yalong Bay',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Resorts mit Kinderbetreuung, Kliniken, mildes Tropenklima' },
      '1-3':  { rating: 'green', note: 'Flacher Sandstrand, Resort-Pools, kinderfreundliche Hotels' },
      '3-6':  { rating: 'green', note: 'Strand, Atlantis-Wasserpark, tropische Früchte probieren' },
      '6-12': { rating: 'green', note: 'Schnorcheln, Atlantis-Wasserpark, Nanshan-Tempel' },
      '12+':  { rating: 'green', note: 'Wassersport, Surfen, tropisches Strandleben, Nachtmärkte' }
    },
    desc: 'Chinas tropisches Paradies – Palmen, Strand und Sonne',
    offbeat: true
  },
  {
    id: 'guizhou',
    name: 'Guizhou (Kaili / Zhaoxing)',
    lat: 26.58,
    lng: 106.71,
    tags: ['Kultur', 'Natur'],
    wiki: 'Guizhou',
    highlights: 'Miao-Dörfer, Huangguoshu-Wasserfall, Dong-Windbrücken',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Sehr abgelegen, kaum Kliniken, kurvige Bergstraßen' },
      '1-3':  { rating: 'red', note: 'Abgelegene Dörfer, schwierige Straßen, begrenzte Versorgung' },
      '3-6':  { rating: 'yellow', note: 'Wasserfall beeindruckend, aber lange Fahrten zwischen Dörfern' },
      '6-12': { rating: 'yellow', note: 'Ethnische Feste spannend, aber abgelegen und lange Transfers' },
      '12+':  { rating: 'green', note: 'Authentische Miao-Kultur, Wasserfälle, abseits des Massentourismus' }
    },
    desc: 'Ethnische Vielfalt in nebelverhangenen Bergdörfern',
    offbeat: true
  },
  {
    id: 'tiger-leaping-gorge',
    name: 'Tiger Leaping Gorge',
    lat: 27.19,
    lng: 100.11,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Tiger_Leaping_Gorge',
    highlights: 'Epische Schlucht, 2-Tages-Wanderung, Bergpanoramen',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Hochgebirge (2600m+), schmale Pfade, Absturzgefahr' },
      '1-3':  { rating: 'red', note: 'Gefährliche Steilpfade, keine Absicherung, Höhenlage' },
      '3-6':  { rating: 'red', note: 'Zu steil und gefährlich, schmale Pfade ohne Geländer' },
      '6-12': { rating: 'yellow', note: 'Nur untere Schlucht per Auto machbar, Trek zu anspruchsvoll' },
      '12+':  { rating: 'yellow', note: 'Trek nur für fitte Teenager, Höhenlage beachten' }
    },
    desc: 'Eine der tiefsten Schluchten der Welt – Trekking-Highlight',
    offbeat: true
  },
  {
    id: 'lhasa',
    name: 'Lhasa (Tibet)',
    lat: 29.65,
    lng: 91.10,
    tags: ['Kultur', 'Geschichte', 'Abenteuer'],
    wiki: 'Lhasa',
    highlights: 'Potala-Palast, Jokhang-Tempel, Barkhor-Straße',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extreme Höhe (3650m), Sauerstoffmangel, keine Kinderkliniken' },
      '1-3':  { rating: 'red', note: '3650m Höhe gefährlich für Kleinkinder, Höhenkrankheitsrisiko' },
      '3-6':  { rating: 'red', note: 'Höhenkrankheit-Risiko hoch, abgelegen, dünne Luft' },
      '6-12': { rating: 'yellow', note: 'Potala-Palast beeindruckend, aber Höhenanpassung nötig' },
      '12+':  { rating: 'yellow', note: 'Einzigartige Kultur, Höhenanpassung 2-3 Tage einplanen' }
    },
    desc: 'Heilige Stadt auf dem Dach der Welt (Sondergenehmigung nötig)',
    offbeat: true
  }
];
