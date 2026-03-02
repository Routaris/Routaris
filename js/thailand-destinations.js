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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Hitze, Smog und chaotischer Verkehr belasten Babys – gute Krankenhäuser (Bumrungrad) gleichen teilweise aus' },
      '1-3':  { rating: 'yellow', note: 'Straßenverkehr und wenig Grünflächen erfordern Vorsicht, aber Malls und Kliniken bieten Komfort' },
      '3-6':  { rating: 'green', note: 'Tempel, Bootsfahrten und Kindermuseen bieten viel Abwechslung, gute Infrastruktur vorhanden' },
      '6-12': { rating: 'green', note: 'Grand Palace, Tuk-Tuk-Fahrten und Chatuchak-Markt begeistern Kinder, exzellente medizinische Versorgung' },
      '12+':  { rating: 'green', note: 'Street Food, Kultur und Shopping – Bangkok ist für Teenager ein unvergessliches Erlebnis' }
    },
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
    familyRating: {
      '0-1':  { rating: 'green', note: 'Entspanntes Klima, saubere Luft (außer Burning Season), gute Kliniken und ruhige Atmosphäre' },
      '1-3':  { rating: 'green', note: 'Nachtbasar, Tempelgärten und Elefanten-Schutzprojekte sind auch für Kleinkinder geeignet' },
      '3-6':  { rating: 'green', note: 'Kinder-Kochkurse, Elefanten-Sanctuaries und Insektenmuseum bieten tolle Erlebnisse' },
      '6-12': { rating: 'green', note: 'Elefanten füttern, Kochkurse, Dschungelwanderungen – Chiang Mai ist ein Familienparadies' },
      '12+':  { rating: 'green', note: 'Zipline-Abenteuer, Kochkurse und Night Bazaar begeistern Teenager' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Entfernungen zwischen Sehenswürdigkeiten groß, wenig Infrastruktur für Babys vor Ort' },
      '1-3':  { rating: 'yellow', note: 'Tempelbesuche mit Kleinkindern anstrengend, aber Goldenes Dreieck und Bootsfahrten machbar' },
      '3-6':  { rating: 'green', note: 'Weißer und Blauer Tempel faszinieren Kinder, kurze Wege in der Stadt' },
      '6-12': { rating: 'green', note: 'Fantasievolle Tempelkunst und Goldenes Dreieck bieten spannende Geschichten für Kinder' },
      '12+':  { rating: 'green', note: 'Kunstvolle Tempel und die Grenze zu Myanmar/Laos machen Geschichte greifbar' }
    },
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
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flache Wege, als Tagesausflug ab Bangkok machbar, keine großen Anstrengungen nötig' },
      '1-3':  { rating: 'green', note: 'Weitläufige Tempelanlagen laden zum Entdecken ein, gut mit Buggy befahrbar' },
      '3-6':  { rating: 'green', note: 'Ruinen-Erkundung wie ein Abenteuerspielplatz, Radtouren im Park möglich' },
      '6-12': { rating: 'green', note: 'Geschichte wird lebendig – Radtour durch die Ruinen und Boot auf dem Fluss begeistern' },
      '12+':  { rating: 'green', note: 'UNESCO-Welterbe mit spannender Geschichte, ideal kombinierbar mit Bangkok' }
    },
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
    familyRating: {
      '0-1':  { rating: 'green', note: 'Familienresorts mit Babypools, gute Krankenhäuser und Apotheken flächendeckend vorhanden' },
      '1-3':  { rating: 'green', note: 'Flache Strände, Familienresorts und Aquarium bieten perfekte Kleinkind-Unterhaltung' },
      '3-6':  { rating: 'green', note: 'Elefanten-Sanctuary, Aquarium und ruhige Strände an der Westküste ideal für Familien' },
      '6-12': { rating: 'green', note: 'Schnorcheln, Phang-Nga-Bay-Bootstouren und Big Buddha begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Wassersport, Altstadt-Erkundung und Insel-Hopping bieten Abwechslung für Teenager' }
    },
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
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Strände, Familienresorts und Bangkok Hospital Samui bieten Sicherheit für Babys' },
      '1-3':  { rating: 'green', note: 'Seichte Buchten, kinderfreundliche Resorts und gute medizinische Versorgung vorhanden' },
      '3-6':  { rating: 'green', note: 'Strand, Wasserfälle und Ang-Thong-Bootstour bieten perfekte Familientage' },
      '6-12': { rating: 'green', note: 'Schnorcheln, Kajak und der Big Buddha machen die Insel zum Kinderparadies' },
      '12+':  { rating: 'green', note: 'Wassersport, Muay-Thai-Kurse und lebhafte Strandpromenade für Teenager' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Railay nur per Boot erreichbar, abgelegene Strände erschweren den Alltag mit Baby' },
      '1-3':  { rating: 'green', note: 'Ao Nang hat familienfreundliche Strände und Resorts, Bootstouren gut machbar' },
      '3-6':  { rating: 'green', note: 'Emerald Pool, Tiger Cave (kurze Strecke) und Four Islands Tour begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Kajak, Schnorcheln und Klettertouren machen Krabi zum Abenteuer für Kinder' },
      '12+':  { rating: 'green', note: 'Klettern an Kalksteinfelsen, Tauchen und Insel-Hopping – Teenager-Traum' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Ländlich und abgelegen, wenig Infrastruktur – Hitze auf dem Tempelgelände belastend' },
      '1-3':  { rating: 'yellow', note: 'Weitläufiges Gelände bei Hitze anstrengend, aber Radtour mit Kindersitz möglich' },
      '3-6':  { rating: 'green', note: 'Radtour durch Ruinen wie ein Abenteuerspielplatz, Lotusteiche faszinieren Kinder' },
      '6-12': { rating: 'green', note: 'Fahrradtour durch den Geschichtspark macht Geschichte zum Erlebnis' },
      '12+':  { rating: 'green', note: 'Atmosphärische UNESCO-Ruinen und die Geschichte des Thai-Königreichs beeindrucken Teens' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Wasserfall-Wanderungen und Kriegsmuseen wenig babygeeignet, einfache Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Erawan-Wasserfall mit Kleinkind anstrengend, aber Brücke und Flussfahrt machbar' },
      '3-6':  { rating: 'green', note: 'Erawan-Wasserfall (untere Stufen), Zugfahrt und Fluss machen Spaß für Kinder' },
      '6-12': { rating: 'green', note: 'Spannende Kriegsgeschichte, Erawan-Wasserfall und Floßhäuser begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Death Railway, Hellfire Pass und Erawan-Wasserfall bieten Geschichte und Abenteuer' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegen, nächstes Krankenhaus weit entfernt, Anreise nur über 762 Kurven' },
      '1-3':  { rating: 'red', note: 'Kurvige Anfahrt (3h), Motorrad-Kultur und kaum Infrastruktur für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Heiße Quellen und Natur schön, aber Anfahrt kurvig und Ort auf Motorräder ausgelegt' },
      '6-12': { rating: 'green', note: 'Canyon-Wanderung, Tham-Lot-Höhle und heiße Quellen bieten tolle Naturerlebnisse' },
      '12+':  { rating: 'green', note: 'Entspannte Backpacker-Atmosphäre, Canyon und Höhlen – perfekt für abenteuerlustige Teens' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Nur per Boot erreichbar, Party-Insel ohne Krankenhaus – für Babys ungeeignet' },
      '1-3':  { rating: 'red', note: 'Steile Wege, kein Autoverkehr, keine Klinik – mit Kleinkind sehr schwierig' },
      '3-6':  { rating: 'yellow', note: 'Strand und Schnorcheln schön, aber Party-Lärm nachts und steile Viewpoint-Pfade' },
      '6-12': { rating: 'yellow', note: 'Maya Bay und Schnorcheln toll, aber Party-Atmosphäre und steile Wege zu bedenken' },
      '12+':  { rating: 'green', note: 'Schnorcheln, Maya Bay und Viewpoint-Wanderung – ideales Inselabenteuer für Teenager' }
    },
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
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhiger Badeort mit guten Hotels, nah an Bangkok – ideal für Familien mit Baby' },
      '1-3':  { rating: 'green', note: 'Flache Strände, Wasserparks und entspannte Atmosphäre perfekt für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Wasserpark Vana Nava, Cicada-Markt und breite Strände bieten Familienunterhaltung' },
      '6-12': { rating: 'green', note: 'Wasserpark, Nachtmarkt und Pferdepark – Hua Hin ist auf Familien ausgelegt' },
      '12+':  { rating: 'green', note: 'Kitesurfen, Nachtmarkt und Wasserpark bieten auch Teenagern Abwechslung' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegener Dschungel, schwimmende Bungalows und keine medizinische Versorgung vor Ort' },
      '1-3':  { rating: 'yellow', note: 'Schwimmende Bungalows und Dschungel riskant für Kleinkinder, aber machbar mit Vorsicht' },
      '3-6':  { rating: 'green', note: 'Kanu fahren, Dschungeltiere beobachten und schwimmende Bungalows faszinieren Kinder' },
      '6-12': { rating: 'green', note: 'Dschungelwanderung, Kanufahren und Übernachtung auf dem See – unvergessliches Abenteuer' },
      '12+':  { rating: 'green', note: 'Nachtsafari, Kajaktouren und Urwald-Erlebnis begeistern abenteuerlustige Teenager' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Kleine Insel ohne Krankenhaus, Anreise per Boot – für Babys nicht empfohlen' },
      '1-3':  { rating: 'red', note: 'Steile Straßen, keine Klinik und eingeschränkte Infrastruktur für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Schnorcheln an flachen Buchten möglich, aber wenig kinderspezifische Angebote' },
      '6-12': { rating: 'green', note: 'Schildkröten beobachten, Schnorcheln und Strandleben – Kinder lieben die Unterwasserwelt' },
      '12+':  { rating: 'green', note: 'Tauchschein machen, Schnorcheln mit Riffhaien – Trauminsel für Teenager' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Party-Insel mit nächtlichem Lärm, begrenzte Klinik – für Babys ungeeignet' },
      '1-3':  { rating: 'red', note: 'Laute Full-Moon-Partys, schwierige Straßen und wenig Infrastruktur für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Ruhigere Strände im Norden vorhanden, aber Party-Kultur dominiert die Insel' },
      '6-12': { rating: 'yellow', note: 'Bottle Beach und Dschungelwanderungen schön, Full-Moon-Nächte aber störend' },
      '12+':  { rating: 'green', note: 'Abseits der Partys tolle Strände und Dschungelwanderungen, Tagesausflug ab Ko Samui möglich' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Nur per Speedboot erreichbar, keine Klinik auf der Insel – für Babys anspruchsvoll' },
      '1-3':  { rating: 'yellow', note: 'Kleine Insel ohne Auto, flache Strände schön, aber medizinische Versorgung begrenzt' },
      '3-6':  { rating: 'green', note: 'Kristallklares Wasser zum Planschen, bunte Fische direkt am Strand sichtbar' },
      '6-12': { rating: 'green', note: 'Schnorcheln im Tarutao-Nationalpark, kleine Insel zu Fuß erkundbar' },
      '12+':  { rating: 'green', note: 'Paradiesische Strände, Schnorcheln und Tauchen – entspanntes Inselfeeling für Teens' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem abgelegen, keine gute Klinik, Anreise über 1.864 Kurven – für Babys ungeeignet' },
      '1-3':  { rating: 'red', note: 'Sehr kurvige Anfahrt, abgelegen und auf Motorradtouristen ausgelegt' },
      '3-6':  { rating: 'yellow', note: 'Morgennebel und Tham-Lot-Höhle spannend, aber Anreise und Abgelegenheit herausfordernd' },
      '6-12': { rating: 'yellow', note: 'Tolle Natur und Höhlen, aber schwierige Anreise und wenig Kinderinfrastruktur' },
      '12+':  { rating: 'green', note: 'Motorrad-Loop und wilde Berglandschaften bieten Abenteuer für Jugendliche' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen und ländlich, begrenzte medizinische Versorgung – nur mit Vorbereitung' },
      '1-3':  { rating: 'yellow', note: 'Ruhig und sicher, aber wenig touristische Infrastruktur für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Ruhige Tempel, Salzterrassen und Natur bieten kindgerechte Erkundungen' },
      '6-12': { rating: 'green', note: 'Berühmte Wandmalereien, Bergwanderungen und authentisches Thailand abseits der Massen' },
      '12+':  { rating: 'green', note: 'Unberührte Natur und kulturelle Highlights fernab der Touristenpfade für neugierige Teens' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Sehr abgelegen an der Grenze zu Myanmar, lange Anfahrt und kaum Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Holzbrücke ohne Geländer und abgelegene Lage erfordern Vorsicht mit Kleinkindern' },
      '3-6':  { rating: 'green', note: 'Holzbrücke überqueren, Mon-Dorf erkunden und versunkenen Tempel bestaunen begeistert Kinder' },
      '6-12': { rating: 'green', note: 'Bootsfahrt zum versunkenen Tempel und die lange Holzbrücke sind tolle Abenteuer' },
      '12+':  { rating: 'green', note: 'Kultureller Grenzort mit Holzbrücke und Mon-Dorf – authentisches Thailand-Erlebnis' }
    },
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
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Familienresorts, flache Strände und entspannte Atmosphäre – ideal für Babys' },
      '1-3':  { rating: 'green', note: 'Klong-Dao-Strand flach und ruhig, gute Familienresorts mit Kleinkind-Ausstattung' },
      '3-6':  { rating: 'green', note: 'Ruhige Strände, Nationalpark und Stelzenhäuser bieten abwechslungsreiche Familientage' },
      '6-12': { rating: 'green', note: 'Kajak, Schnorcheln und Old Town erkunden – Ko Lanta ist das familienfreundliche Phuket' },
      '12+':  { rating: 'green', note: 'Weltklasse-Tauchen, Kajak und entspannte Inselatmosphäre für Teenager' }
    },
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
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Kleinstadt, Pferdekutschen-Fahrten und flache Wege sind babyfreundlich' },
      '1-3':  { rating: 'green', note: 'Pferdekutschen-Fahrt und Keramikdorf bieten sanfte Unterhaltung für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Pferdekutschen und Keramik bemalen – charmante Aktivitäten für Kinder' },
      '6-12': { rating: 'green', note: 'Pferdekutschen, historische Tempel und Töpferwerkstätten begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Authentische Lanna-Kultur und ältester Holztempel als Tagesausflug ab Chiang Mai' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Aggressive Affen können gefährlich sein, Essen und Kinderwagen schützen' },
      '1-3':  { rating: 'yellow', note: 'Makaken greifen nach Essen und Gegenständen – Kleinkinder gut im Auge behalten' },
      '3-6':  { rating: 'green', note: 'Kinder lieben die Affen, aber Abstand halten – als Tagesausflug gut machbar' },
      '6-12': { rating: 'green', note: 'Affen-Stadt fasziniert Kinder, Khmer-Ruinen bieten spannende Erkundungen' },
      '12+':  { rating: 'green', note: 'Einzigartiges Affen-Erlebnis und Khmer-Architektur – perfekter Tagesausflug' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Treppen zur Grotte und Palast anstrengend mit Baby, aber als Tagesausflug machbar' },
      '1-3':  { rating: 'yellow', note: 'Steile Treppen zum Hügelpalast schwierig, Höhlen-Buddha aber beeindruckend' },
      '3-6':  { rating: 'green', note: 'Lichtgrotte mit goldenen Buddhas fasziniert Kinder, Süßigkeiten-Tradition zum Naschen' },
      '6-12': { rating: 'green', note: 'Höhlengrotte, Hügelpalast und lokale Süßspeisen bieten vielseitige Erlebnisse' },
      '12+':  { rating: 'green', note: 'Historische Grotte und Palast – spannender Tagesausflug ab Hua Hin oder Bangkok' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Dschungelwege uneben, wilde Tiere möglich – besser als Kurzbesuch planen' },
      '1-3':  { rating: 'yellow', note: 'Wasserfälle und Wanderwege mit Kleinkind anspruchsvoll, aber kurze Wege möglich' },
      '3-6':  { rating: 'green', note: 'Wilde Elefanten und Gibbons beobachten, kurze Wanderwege zu Wasserfällen machbar' },
      '6-12': { rating: 'green', note: 'Nachtsafari, wilde Elefanten und Wasserfälle – Dschungelabenteuer nahe Bangkok' },
      '12+':  { rating: 'green', note: 'UNESCO-Dschungel mit Nachtsafari und Tierbeobachtungen – Natur pur für Teens' }
    },
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
    wiki: 'Ko_Chang',
    highlights: 'Klong-Plu-Wasserfall, White Sand Beach, Mu-Ko-Chang-Nationalpark, Schnorcheln bei Ko Rang',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bergige Straßen und begrenzte Kliniken, aber ruhiger als Phuket oder Ko Samui' },
      '1-3':  { rating: 'green', note: 'White Sand Beach flach und ruhig, Familienresorts vorhanden, entspannte Atmosphäre' },
      '3-6':  { rating: 'green', note: 'Wasserfälle, Schnorcheln und ruhige Strände bieten perfekte Familientage' },
      '6-12': { rating: 'green', note: 'Dschungel-Wasserfall, Schnorcheln und Nationalpark – Inselabenteuer für Kinder' },
      '12+':  { rating: 'green', note: 'Kajaktouren, Schnorcheln bei Ko Rang und weniger Tourismus als auf den Andamanen-Inseln' }
    },
    offbeat: true,
    desc: 'Thailands drittgrößte Insel an der kambodschanischen Grenze – ein bergiges Dschungelparadies mit Wasserfällen, Korallenriffen und deutlich weniger Trubel als die Andamanen-Inseln'
  }
];
