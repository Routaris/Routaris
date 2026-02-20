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
    desc: 'Heilige Stadt auf dem Dach der Welt (Sondergenehmigung nötig)',
    offbeat: true
  }
];
