/* ============================================
   THAILAND-DESTINATIONS.JS – Datenbank aller Thailand-Ziele
   ============================================ */

const THAILAND_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'bangkok',
    name: 'Bangkok',
    lat: 13.7563,
    lng: 100.5018,
    tags: ['Großstadt', 'Kultur', 'Kulinarik'],
    wiki: 'Bangkok',
    highlights: 'Grand Palace & Wat Phra Kaew, Wat Pho (Liegender Buddha), Chatuchak-Wochenendmarkt, Khao San Road',
    family: true,
    desc: 'Thailands schillernde Hauptstadt, wo goldene Tempelspitzen über chaotische Straßenmärkte ragen und das beste Street Food der Welt an jeder Ecke dampft'
  },
  {
    id: 'chiang-mai',
    name: 'Chiang Mai',
    lat: 18.7883,
    lng: 98.9853,
    tags: ['Kultur', 'Kulinarik', 'Natur'],
    wiki: 'Chiang_Mai',
    highlights: 'Doi Suthep-Tempel, Altstadt mit über 30 Tempeln, Nachtbasar & Sunday Walking Street, Elephant Nature Park',
    family: true,
    desc: 'Die „Rose des Nordens" – eine Lanna-Kulturperle am Fuß grüner Berge, wo hunderte Tempel neben lebhaften Nachtmärkten und ethischen Elefanten-Schutzprojekten stehen'
  },
  {
    id: 'chiang-rai',
    name: 'Chiang Rai',
    lat: 19.9105,
    lng: 99.8406,
    tags: ['Kultur', 'Natur'],
    wiki: 'Chiang_Rai',
    highlights: 'Weißer Tempel (Wat Rong Khun), Blauer Tempel, Goldenes Dreieck, Baan Dam (Schwarzes Haus)',
    family: true,
    desc: 'Nordthailands kunstvolle Grenzstadt, wo der fantastische Weiße Tempel wie aus einem Traum emporsteigt und das Goldene Dreieck drei Länder vereint'
  },
  {
    id: 'ayutthaya',
    name: 'Ayutthaya',
    lat: 14.3532,
    lng: 100.5689,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Ayutthaya_Historical_Park',
    highlights: 'Wat Mahathat (Buddha-Kopf im Baum), Wat Chaiwatthanaram, Wat Phra Si Sanphet, Historischer Park (UNESCO)',
    family: true,
    desc: 'Majestätische Ruinen einer ehemaligen Weltstadt – Ayutthayas UNESCO-Tempelanlagen erzählen von einem Königreich, das einst größer war als London',
    dayTripFrom: [
      { base: 'bangkok', transit: '~1.5h Zug' }
    ]
  },
  {
    id: 'phuket',
    name: 'Phuket',
    lat: 7.8804,
    lng: 98.3923,
    tags: ['Erholung', 'Großstadt', 'Abenteuer'],
    wiki: 'Phuket_Province',
    highlights: 'Patong Beach, Altstadt (sino-portugiesisch), Big Buddha, Phang Nga Bay Bootstouren',
    family: true,
    desc: 'Thailands größte Insel vereint tropische Traumstrände mit einer charmanten sino-portugiesischen Altstadt und dem Tor zur magischen Andamanensee'
  },
  {
    id: 'ko-samui',
    name: 'Ko Samui',
    lat: 9.5120,
    lng: 100.0134,
    tags: ['Erholung', 'Natur'],
    wiki: 'Ko_Samui',
    highlights: 'Big Buddha Tempel, Ang Thong Marine Park, Chaweng Beach, Na Muang Wasserfälle',
    family: true,
    desc: 'Palmengesäumte Tropeninsel im Golf von Thailand mit goldenen Stränden, türkisem Wasser und dem spektakulären Ang Thong Meerespark vor der Küste'
  },
  {
    id: 'krabi',
    name: 'Krabi',
    lat: 8.0863,
    lng: 98.9063,
    tags: ['Natur', 'Abenteuer', 'Erholung'],
    wiki: 'Krabi',
    highlights: 'Railay Beach (Kalksteinfelsen), Tiger Cave Tempel (1.260 Stufen), Emerald Pool, Four Islands Tour',
    family: true,
    desc: 'Dramatische Kalksteinklippen ragen aus smaragdgrünem Wasser – Krabis Railay Beach ist einer der schönsten Strände der Welt und ein Kletterparadies'
  },
  {
    id: 'sukhothai',
    name: 'Sukhothai',
    lat: 17.0070,
    lng: 99.8018,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Sukhothai_Historical_Park',
    highlights: 'UNESCO-Geschichtspark, Wat Mahathat, Wat Si Chum (riesiger Buddha), Radtour durch die Ruinen',
    family: true,
    desc: 'Wiege des Thai-Königreichs – die poetischen Ruinen der ersten Hauptstadt Siams liegen verstreut zwischen Lotusteichen und eignen sich perfekt für eine Radtour bei Sonnenuntergang'
  },
  {
    id: 'kanchanaburi',
    name: 'Kanchanaburi',
    lat: 14.0228,
    lng: 99.5328,
    tags: ['Geschichte', 'Natur', 'Abenteuer'],
    wiki: 'Kanchanaburi',
    highlights: 'Brücke am River Kwai, Erawan-Wasserfall (7 Stufen), Death Railway, Hellfire Pass Memorial',
    family: true,
    desc: 'Geschichte und Naturschönheit vereint – die berühmte Brücke am Kwai und der türkisblaue Erawan-Wasserfall machen diese Provinz zu einem bewegenden Kontrastprogramm'
  },
  {
    id: 'pai',
    name: 'Pai',
    lat: 19.3575,
    lng: 98.4428,
    tags: ['Natur', 'Erholung', 'Abenteuer'],
    wiki: 'Pai,_Thailand',
    highlights: 'Pai Canyon, Heiße Quellen, Tham Lod Höhle, Land Split',
    family: false,
    desc: 'Verträumtes Bergdorf in einer grünen Talschüssel, wo Backpacker und Yogis zwischen heißen Quellen, Reisfeldern und spektakulären Schluchten zur Ruhe kommen'
  },
  {
    id: 'ko-phi-phi',
    name: 'Ko Phi Phi',
    lat: 7.7407,
    lng: 98.7784,
    tags: ['Natur', 'Abenteuer', 'Erholung'],
    wiki: 'Phi_Phi_Islands',
    highlights: 'Maya Bay (The Beach), Viewpoint-Wanderung, Schnorcheln & Tauchen, Monkey Beach',
    family: false,
    desc: 'Die legendäre Inselgruppe aus „The Beach" – smaragdgrüne Buchten, dramatische Kalksteintürme und eines der farbenfrohsten Unterwasser-Ökosysteme Thailands'
  },
  {
    id: 'hua-hin',
    name: 'Hua Hin',
    lat: 12.5684,
    lng: 99.9577,
    tags: ['Erholung', 'Kultur'],
    wiki: 'Hua_Hin_district',
    highlights: 'Nachtmarkt, Khao Takiab (Tempelberg am Meer), Cicada-Kunstmarkt, Maruekhathaiyawan-Palast',
    family: true,
    desc: 'Thailands königlicher Badeort – ein elegantes Seebad mit nostalgischem Charme, wo der König residiert und Bangkoks Familien am Wochenende den Strand genießen'
  },
  {
    id: 'khao-sok',
    name: 'Khao Sok',
    lat: 8.9400,
    lng: 98.5284,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Khao_Sok_National_Park',
    highlights: 'Cheow Lan Lake (schwimmende Bungalows), Urzeitlicher Regenwald, Nacht-Dschungeltouren, Kanufahren',
    family: true,
    desc: 'Einer der ältesten Regenwälder der Erde, älter als der Amazonas – mit einem smaragdgrünen Stausee voller schwimmender Bungalows inmitten surrealer Karstfelsen'
  },
  {
    id: 'ko-tao',
    name: 'Ko Tao',
    lat: 10.0956,
    lng: 99.8367,
    tags: ['Abenteuer', 'Natur', 'Erholung'],
    wiki: 'Ko_Tao',
    highlights: 'Tauch- & Schnorchelparadies, Sairee Beach, John Suwan Viewpoint, Shark Bay (Riffhaie)',
    family: false,
    desc: 'Die „Schildkröteninsel" ist Südostasiens beliebtester Ort für den Tauchschein – kristallklares Wasser, Riffhaie und Schildkröten direkt vom Strand aus'
  },
  {
    id: 'ko-phangan',
    name: 'Ko Phangan',
    lat: 9.7500,
    lng: 100.0167,
    tags: ['Erholung', 'Abenteuer'],
    wiki: 'Ko_Pha-ngan',
    highlights: 'Full Moon Party (Haad Rin), Thong Nai Pan Beach, Bottle Beach, Ang Thong Marine Park',
    family: false,
    desc: 'Weltberühmt für die Full Moon Party, doch abseits von Haad Rin verbergen sich stille Buchten und unberührte Dschungelpfade auf dieser vielseitigen Golfinsel',
    dayTripFrom: [
      { base: 'ko-samui', transit: '~30 min Fähre' }
    ]
  },

  // ===== OFF THE BEATEN PATH (10) =====
  {
    id: 'ko-lipe',
    name: 'Ko Lipe',
    altName: 'Koh Lipe',
    lat: 6.49,
    lng: 99.30,
    tags: ['Erholung', 'Natur', 'Abenteuer'],
    wiki: 'Ko_Lipe',
    highlights: 'Sunrise Beach, Schnorcheln im Tarutao-Nationalpark, Sunset Beach, Pattaya Beach',
    family: true,
    offbeat: true,
    desc: 'Die „Malediven Thailands" – eine winzige Insel im äußersten Süden mit puderzuckerweißen Stränden und einem der artenreichsten Korallenriffe Südostasiens'
  },
  {
    id: 'mae-hong-son',
    name: 'Mae Hong Son',
    lat: 19.30,
    lng: 97.97,
    tags: ['Natur', 'Kultur', 'Abenteuer'],
    wiki: 'Mae_Hong_Son',
    highlights: 'Wat Phra That Doi Kong Mu, Mae-Hong-Son-Loop, Tham Lot Höhle, Morgennebel über dem Pai-Tal',
    family: false,
    offbeat: true,
    desc: 'Abgelegene Bergstadt in den Shan-Hügeln nahe der birmesischen Grenze, umhüllt von Morgennebel und Heimat der legendären Motorradschleife durch Nordthailands wildeste Landschaften'
  },
  {
    id: 'nan',
    name: 'Nan',
    lat: 18.78,
    lng: 100.78,
    tags: ['Kultur', 'Geschichte', 'Natur'],
    wiki: 'Nan,_Thailand',
    highlights: 'Wat Phumin (berühmte Wandmalereien), Nationalmuseum Nan, Bo-Kluea-Salzterrassen, Doi-Phu-Ka-Nationalpark',
    family: true,
    offbeat: true,
    desc: 'Verschlafene Nordprovinz nahe der laotischen Grenze mit Thailands berühmtesten Tempelwandmalereien und unberührten Berglandschaften fernab jeder Touristenpfade'
  },
  {
    id: 'sangkhlaburi',
    name: 'Sangkhlaburi',
    lat: 15.16,
    lng: 98.47,
    tags: ['Kultur', 'Natur', 'Geschichte'],
    wiki: 'Sangkhla_Buri_district',
    highlights: 'Uttamanusorn-Holzbrücke (längste Thailands), Versunkener Tempel im Stausee, Three Pagodas Pass, Mon-Dorf',
    family: true,
    offbeat: true,
    desc: 'Stille Grenzstadt am Khao-Laem-Stausee, wo Thailands längste Holzbrücke ein Mon-Dorf mit der Welt verbindet und ein versunkener Tempel aus dem Wasser ragt'
  },
  {
    id: 'ko-lanta',
    name: 'Ko Lanta',
    lat: 7.53,
    lng: 99.07,
    tags: ['Erholung', 'Natur', 'Abenteuer'],
    wiki: 'Ko_Lanta_Yai',
    highlights: 'Mu-Ko-Lanta-Nationalpark, Klong-Dao-Strand, Old Town (Stelzenhäuser), Tauchen bei Hin Daeng & Hin Muang',
    family: true,
    offbeat: true,
    desc: 'Die entspannte Alternative zu Phuket – eine langgestreckte Andamanen-Insel mit ruhigen Stränden, Weltklasse-Tauchplätzen und einer charmanten Stelzenhaus-Altstadt'
  },
  {
    id: 'lampang',
    name: 'Lampang',
    lat: 18.29,
    lng: 99.49,
    tags: ['Kultur', 'Geschichte'],
    wiki: 'Lampang',
    highlights: 'Wat Phra That Lampang Luang, Pferdekutschen-Fahrten, Birmanische Holztempel, Keramikdorf',
    family: true,
    offbeat: true,
    desc: 'Nordthailands bestgehütetes Geheimnis – eine charmante Lanna-Stadt, in der noch Pferdekutschen durch die Straßen rollen und der älteste Holztempel des Landes steht',
    dayTripFrom: [
      { base: 'chiang-mai', transit: '~1.5h Zug/Bus' }
    ]
  },
  {
    id: 'lopburi',
    name: 'Lopburi',
    lat: 14.80,
    lng: 100.65,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Lopburi',
    highlights: 'Prang Sam Yot (Affentempel), Phra Narai Ratchaniwet Palast, Affen-Festival, Khmer-Ruinen',
    family: true,
    offbeat: true,
    desc: 'Die Stadt der Affen – eine geschichtsträchtige ehemalige Hauptstadt mit Khmer-Tempelruinen, die von Tausenden frecher Makaken regiert werden',
    dayTripFrom: [
      { base: 'bangkok', transit: '~2.5h Zug' },
      { base: 'ayutthaya', transit: '~1.5h Zug' }
    ]
  },
  {
    id: 'phetchaburi',
    name: 'Phetchaburi',
    lat: 13.11,
    lng: 99.94,
    tags: ['Geschichte', 'Kultur', 'Natur'],
    wiki: 'Phetchaburi',
    highlights: 'Tham Khao Luang Höhle (Buddha-Grotte), Phra Nakhon Khiri Palast, Historische Tempel, Süßspeisen-Tradition',
    family: true,
    offbeat: true,
    desc: 'Die „Stadt der Diamanten" mit einer atemberaubenden Lichtgrotte voller goldener Buddhas und einem königlichen Hügelpalast, der über die Ebenen wacht',
    dayTripFrom: [
      { base: 'hua-hin', transit: '~1h Bus' },
      { base: 'bangkok', transit: '~2.5h Zug' }
    ]
  },
  {
    id: 'khao-yai',
    name: 'Khao Yai',
    lat: 14.44,
    lng: 101.37,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Khao_Yai_National_Park',
    highlights: 'UNESCO-Welterbe-Dschungel, Haew-Narok-Wasserfall, Wilde Elefanten, Nachtsafari-Touren',
    family: true,
    offbeat: true,
    desc: 'Thailands ältester und meistbesuchter Nationalpark – ein UNESCO-Welterbe-Dschungel mit wilden Elefanten, Gibbons und spektakulären Wasserfällen nur wenige Stunden von Bangkok',
    dayTripFrom: [
      { base: 'bangkok', transit: '~3h Bus/Auto' }
    ]
  },
  {
    id: 'ko-chang',
    name: 'Ko Chang',
    altName: 'Elefanteninsel',
    lat: 12.10,
    lng: 102.35,
    tags: ['Natur', 'Erholung', 'Abenteuer'],
    wiki: 'Chang_Island',
    highlights: 'Klong-Plu-Wasserfall, White Sand Beach, Mu-Ko-Chang-Nationalpark, Schnorcheln bei Ko Rang',
    family: true,
    offbeat: true,
    desc: 'Thailands drittgrößte Insel an der kambodschanischen Grenze – ein bergiges Dschungelparadies mit Wasserfällen, Korallenriffen und deutlich weniger Trubel als die Andamanen-Inseln'
  }
];
