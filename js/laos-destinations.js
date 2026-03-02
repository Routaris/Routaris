/* ============================================
   LAOS-DESTINATIONS.JS – Datenbank aller Laos-Ziele
   ============================================ */

const LAOS_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'vientiane',
    name: 'Vientiane',
    altName: 'Viangchan',
    lat: 17.97,
    lng: 102.63,
    tags: ['Kultur', 'Geschichte', 'Kulinarik'],
    wiki: 'Vientiane',
    highlights: 'Pha That Luang, Patuxai, Wat Si Saket, Mekong-Promenade, Talat Sao Markt',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Entspannte Hauptstadt mit guter Infrastruktur, Krankenhäuser vorhanden' },
      '1-3':  { rating: 'green', note: 'Flache Wege entlang des Mekong, Nachtmarkt und Parks zum Bummeln' },
      '3-6':  { rating: 'green', note: 'Tempel zum Erkunden, Mekong-Promenade und kinderfreundliche Märkte' },
      '6-12': { rating: 'green', note: 'Patuxai zum Besteigen, Talat Sao Markt und Tuk-Tuk-Abenteuer' },
      '12+':  { rating: 'green', note: 'Kultur, Geschichte und Kulinarik gut kombinierbar für Jugendliche' }
    },
    desc: 'Laos\' entspannte Hauptstadt am Mekong, wo goldene Stupas, französische Kolonialvillen und lebhafte Nachtmärkte aufeinandertreffen'
  },
  {
    id: 'luangprabang',
    name: 'Luang Prabang',
    lat: 19.89,
    lng: 102.13,
    tags: ['Kultur', 'Geschichte', 'Erholung'],
    wiki: 'Luang_Prabang',
    highlights: 'Wat Xieng Thong, Tak-Bat-Mönchsprozession, Kuang-Si-Wasserfälle, Nachtmarkt',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flache, ruhige Gassen und entspanntes Tempo ideal für Babys' },
      '1-3':  { rating: 'green', note: 'Nachtmarkt, Wasserfälle und Mekong-Ufer zum Erkunden geeignet' },
      '3-6':  { rating: 'green', note: 'Kuang-Si-Wasserfälle mit Bärenrettung, Bootsfahrten und Tempel' },
      '6-12': { rating: 'green', note: 'Mönchsprozession erleben, Wasserfälle und Kajakfahren auf dem Mekong' },
      '12+':  { rating: 'green', note: 'UNESCO-Kultur, Kochkurse und Fotografie-Möglichkeiten begeistern' }
    },
    desc: 'UNESCO-Welterbestadt zwischen Mekong und Nam Khan, wo Hunderte Mönche im Morgengrauen durch stille Gassen ziehen'
  },
  {
    id: 'vangvieng',
    name: 'Vang Vieng',
    lat: 18.92,
    lng: 102.45,
    tags: ['Natur', 'Abenteuer', 'Erholung'],
    wiki: 'Vang_Vieng',
    highlights: 'Karstfelsen, Tubing auf Nam Song, Blue Lagoon, Tham-Chang-Höhle',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abenteuer-Ort mit begrenzter Baby-Infrastruktur, Bahn-Anreise ok' },
      '1-3':  { rating: 'yellow', note: 'Blue Lagoon nett, aber Tubing und Höhlen eher für ältere Kinder' },
      '3-6':  { rating: 'green', note: 'Blue Lagoon zum Planschen, Karstlandschaft und einfache Spaziergänge' },
      '6-12': { rating: 'green', note: 'Höhlen erkunden, Kayaken und Tubing machen riesig Spaß' },
      '12+':  { rating: 'green', note: 'Ziplines, Tubing und Klettern – Abenteuer-Paradies für Teenager' }
    },
    desc: 'Abenteuer-Paradies inmitten spektakulärer Karstlandschaft, perfekt erreichbar per Laos-China-Bahn'
  },
  {
    id: 'siphandon',
    name: 'Si Phan Don',
    altName: '4000 Inseln',
    lat: 14.05,
    lng: 105.93,
    tags: ['Natur', 'Erholung'],
    wiki: 'Don_Det',
    highlights: 'Don Det, Don Khon, Khone-Phapheng-Fälle, Irrawaddy-Delfine',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen, einfache Unterkünfte und eingeschränkte medizinische Versorgung' },
      '1-3':  { rating: 'yellow', note: 'Entspannt, aber holprige Anreise und wenig Baby-Infrastruktur' },
      '3-6':  { rating: 'green', note: 'Hängematte, Flussdelfine beobachten und kleine Inselwelt entdecken' },
      '6-12': { rating: 'green', note: 'Radfahren auf Don Det, Wasserfälle und Delfin-Bootstouren' },
      '12+':  { rating: 'green', note: 'Kayaken, Radtouren und die größten Wasserfälle Südostasiens erleben' }
    },
    desc: 'Traumhaftes Insel-Archipel im Mekong mit Hängematten-Atmosphäre, Wasserfällen und seltenen Flussdelfinen'
  },
  {
    id: 'pakse',
    name: 'Pakse',
    altName: 'Pakxe',
    lat: 15.12,
    lng: 105.78,
    tags: ['Großstadt', 'Kulinarik', 'Geschichte'],
    wiki: 'Pakse',
    highlights: 'Wat Phou (Tagesausflug), Bolaven-Plateau-Tor, Dao-Heuang-Markt, Xe-Don-Fluss',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Stadt mit Grundversorgung, guter Ausgangspunkt für den Süden' },
      '1-3':  { rating: 'green', note: 'Überschaubare Stadt mit Markt, Fluss-Promenade und guten Hotels' },
      '3-6':  { rating: 'green', note: 'Markt erkunden und als entspannte Basis für Tagesausflüge nutzen' },
      '6-12': { rating: 'green', note: 'Ausflüge zu Wat Phou und zum Bolaven-Plateau gut machbar' },
      '12+':  { rating: 'green', note: 'Geschichte, Tempel und Wasserfälle bieten abwechslungsreiches Programm' }
    },
    desc: 'Tor zum Süden von Laos und Ausgangspunkt für Ausflüge zum UNESCO-Tempel Wat Phou und zum Bolaven-Plateau'
  },
  {
    id: 'phonsavan',
    name: 'Phonsavan',
    lat: 19.46,
    lng: 103.18,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Phonsavan',
    highlights: 'Ebene der Tonkrüge (UNESCO), UXO-Informationszentrum, Muang-Khoun-Ruinen',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'UXO-Gefahr abseits der Wege, abgelegen und kaum Baby-Infrastruktur' },
      '1-3':  { rating: 'red', note: 'Blindgänger-Risiko in der Region, nicht geeignet für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Nur auf markierten Wegen bleiben, UXO-Museum lehrreich aber ernst' },
      '6-12': { rating: 'yellow', note: 'UNESCO-Ebene begehbar, UXO-Geschichte eindrucksvoll und lehrreich' },
      '12+':  { rating: 'green', note: 'Faszinierende Kriegsgeschichte und mysteriöse Steinkrüge beeindrucken' }
    },
    desc: 'Ausgangspunkt zur mysteriösen Ebene der Tonkrüge, einem UNESCO-Welterbe mit über 2.000 Jahre alten Steinkrügen'
  },
  {
    id: 'luangnamtha',
    name: 'Luang Namtha',
    lat: 21.00,
    lng: 101.41,
    tags: ['Natur', 'Abenteuer', 'Kultur'],
    wiki: 'Luang_Namtha',
    highlights: 'Nam-Ha-Nationalpark-Trekking, Ethnische Dörfer, Kajakfahren, Nachtmarkt',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Mehrtägiges Dschungel-Trekking, keine Infrastruktur für Babys' },
      '1-3':  { rating: 'red', note: 'Trekking-Touren zu anstrengend und abgelegen für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Nachtmarkt und Dorf-Besuche möglich, aber Trekking zu lang' },
      '6-12': { rating: 'yellow', note: 'Einfache Halbtages-Treks und Dorfbesuche machbar für fitte Kinder' },
      '12+':  { rating: 'green', note: 'Dschungel-Trekking und Kajak perfekt für abenteuerlustige Teenager' }
    },
    desc: 'Dschungel-Trekking-Hochburg im Norden mit einem der besten Ökotourismus-Projekte Südostasiens'
  },
  {
    id: 'thakhek',
    name: 'Thakhek',
    lat: 17.40,
    lng: 104.83,
    tags: ['Natur', 'Abenteuer', 'Geschichte'],
    wiki: 'Thakhek',
    highlights: 'Thakhek-Loop (Motorrad), Kong-Lor-Höhle, Karstlandschaft, Französische Kolonialgebäude',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Motorrad-Loop ungeeignet für Babys, kaum Infrastruktur unterwegs' },
      '1-3':  { rating: 'red', note: 'Thakhek-Loop nur per Motorrad, keine kindgerechte Alternative' },
      '3-6':  { rating: 'yellow', note: 'Stadt selbst ruhig, aber die Hauptattraktionen erfordern Motorrad' },
      '6-12': { rating: 'yellow', note: 'Höhlen und Karstlandschaft faszinierend, nur einzelne Abschnitte machbar' },
      '12+':  { rating: 'green', note: 'Thakhek-Loop und Kong-Lor-Höhle sind Abenteuer für ältere Jugendliche' }
    },
    desc: 'Verschlafenes Mekong-Städtchen und Startpunkt des legendären Thakhek-Loops durch eine der spektakulärsten Karstlandschaften Südostasiens'
  },
  {
    id: 'savannakhet',
    name: 'Savannakhet',
    altName: 'Kaysone Phomvihane',
    lat: 16.55,
    lng: 104.75,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Savannakhet',
    highlights: 'Französische Kolonialarchitektur, Dinosaurier-Museum, That Ing Hang, St.-Theresa-Kirche',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige, flache Stadt mit guter Grundversorgung und Hotels' },
      '1-3':  { rating: 'green', note: 'Entspanntes Tempo, Mekong-Ufer zum Spazieren, wenig Verkehr' },
      '3-6':  { rating: 'green', note: 'Kolonialarchitektur erkunden, Dinosaurier-Museum für kleine Entdecker' },
      '6-12': { rating: 'green', note: 'Dinosaurier-Museum begeistert, Geschichte und Kultur gut vermittelbar' },
      '12+':  { rating: 'green', note: 'Kolonialgeschichte und entspannte Atmosphäre für Jugendliche angenehm' }
    },
    desc: 'Laos\' zweitgrößte Stadt mit charmant verfallener französischer Kolonialarchitektur und entspannter Mekong-Atmosphäre'
  },
  {
    id: 'houayxay',
    name: 'Houayxay',
    altName: 'Huay Xai',
    lat: 20.28,
    lng: 100.41,
    tags: ['Abenteuer', 'Natur'],
    wiki: 'Houayxay',
    highlights: 'Gibbon Experience (Baumhäuser + Ziplines), Mekong-Slow-Boat-Start, Nachtmarkt',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Gibbon Experience und Slow Boat sind für Babys nicht geeignet' },
      '1-3':  { rating: 'red', note: 'Lange Bootsfahrt und Baumhaus-Ziplines für Kleinkinder unmöglich' },
      '3-6':  { rating: 'yellow', note: 'Slow Boat machbar mit Geduld, aber 2 Tage auf engem Boot anstrengend' },
      '6-12': { rating: 'yellow', note: 'Slow-Boat-Abenteuer faszinierend, Gibbon Experience ab 12 möglich' },
      '12+':  { rating: 'green', note: 'Slow Boat und Gibbon Experience sind unvergessliche Abenteuer' }
    },
    desc: 'Grenzstadt zu Thailand und Startpunkt der legendären Slow-Boat-Fahrt den Mekong hinunter nach Luang Prabang'
  },
  {
    id: 'champasak',
    name: 'Champasak',
    lat: 14.89,
    lng: 105.88,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Champasak_(town)',
    highlights: 'Wat Phou (UNESCO), Mekong-Ufer, Tempel-Ruinen',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Verschlafenes Dorf mit kaum Infrastruktur, Tempelaufstieg mit Baby schwer' },
      '1-3':  { rating: 'yellow', note: 'Ruhig und sicher, aber Tempel-Treppen mit Kleinkind anstrengend' },
      '3-6':  { rating: 'green', note: 'Tempel-Ruinen spannend zum Erkunden, Mekong-Ufer zum Spielen' },
      '6-12': { rating: 'green', note: 'Khmer-Tempel begeistert kleine Entdecker, Mekong-Atmosphäre genießen' },
      '12+':  { rating: 'green', note: 'UNESCO-Welterbe mit faszinierender Geschichte und toller Aussicht' }
    },
    dayTripFrom: [{ base: 'pakse', transit: '~1.5h Minivan' }]
  },
  {
    id: 'bolavenplateau',
    name: 'Bolaven-Plateau',
    lat: 15.10,
    lng: 106.20,
    tags: ['Natur', 'Kulinarik', 'Abenteuer'],
    wiki: 'Bolaven_Plateau',
    highlights: 'Tad-Fane-Wasserfall, Kaffee-Plantagen, Tad-Yuang, Ethnische Dörfer',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Kurvenreiche Bergstraßen, Motorrad-Touren ungeeignet für Babys' },
      '1-3':  { rating: 'red', note: 'Holprige Anfahrt und steile Wasserfälle gefährlich für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Einzelne Wasserfälle als Tagesausflug machbar, kühles Klima angenehm' },
      '6-12': { rating: 'green', note: 'Wasserfälle und Kaffeeplantagen spannend, kühleres Wetter erfrischend' },
      '12+':  { rating: 'green', note: 'Motorrad-Loop, Kaffee-Kultur und Wasserfälle begeistern Teenager' }
    },
    dayTripFrom: [{ base: 'pakse', transit: '~1.5h Bus/Motorrad' }]
  },
  {
    id: 'phongsali',
    name: 'Phongsali',
    lat: 21.68,
    lng: 102.11,
    tags: ['Kultur', 'Natur', 'Abenteuer'],
    wiki: 'Phongsali',
    highlights: '400 Jahre alte Teeplantagen, Akha-Dörfer, Trekking, Chinesisches Viertel',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Sehr abgelegen, schlechte Straßen, keine medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Extrem abgelegene Bergregion, lange holprige Anreise unzumutbar' },
      '3-6':  { rating: 'red', note: 'Zu abgelegen und anstrengend, kaum kindgerechte Infrastruktur' },
      '6-12': { rating: 'yellow', note: 'Teeplantagen und Bergvölker faszinierend, aber lange Anfahrt nötig' },
      '12+':  { rating: 'yellow', note: 'Authentische Begegnungen und Trekking für belastbare Jugendliche' }
    },
    desc: 'Höchstgelegene Provinzhauptstadt von Laos mit jahrhundertealten Teeplantagen und authentischen Bergvolk-Begegnungen'
  },
  {
    id: 'nongkhiaw',
    name: 'Nong Khiaw',
    lat: 20.57,
    lng: 102.61,
    tags: ['Natur', 'Erholung', 'Abenteuer'],
    wiki: 'Nong_Khiaw',
    highlights: 'Karstfelsen am Nam-Ou-Fluss, Pha-Tok-Höhlen, Viewpoint-Wanderung, Bootsfahrten',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegenes Bergdorf mit schwieriger Anreise und kaum Infrastruktur' },
      '1-3':  { rating: 'red', note: 'Steile Viewpoint-Wanderungen und Boot-Anreise mit Kleinkind schwierig' },
      '3-6':  { rating: 'yellow', note: 'Ruhiges Dorf mit Flussufer, aber Wanderungen zu steil für Kleine' },
      '6-12': { rating: 'green', note: 'Bootsfahrten, Höhlen und Viewpoint-Wanderung für fitte Kinder toll' },
      '12+':  { rating: 'green', note: 'Kajakfahren, Wandern und Entschleunigung am Fluss begeistern' }
    },
    desc: 'Bilderbuch-Dorf am Nam Ou zwischen dramatischen Kalksteinfelsen, perfekt zum Wandern, Kajakfahren und Entschleunigen'
  },
  {
    id: 'muangxay',
    name: 'Muang Xay',
    altName: 'Oudomxay',
    lat: 20.49,
    lng: 101.98,
    tags: ['Kultur'],
    wiki: 'Muang_Xay',
    highlights: 'Chom-Ong-Höhle, Provinzmarkt, Tempel, Laos-China-Bahn-Station',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bahnanbindung gut, aber wenig Aktivitäten für Babys in der Stadt' },
      '1-3':  { rating: 'yellow', note: 'Durchgangsort mit Markt, eher als Zwischenstopp für Familien geeignet' },
      '3-6':  { rating: 'green', note: 'Chom-Ong-Höhle und Markt bieten Abwechslung, Bahn-Anbindung praktisch' },
      '6-12': { rating: 'green', note: 'Höhle und Zugfahrt mit der Laos-China-Bahn begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Guter Knotenpunkt für Weiterreise und Höhlenbesichtigung' }
    },
    desc: 'Verkehrsknotenpunkt im Norden mit der größten bekannten Höhle Nordlaos\' und bequemem Bahnanschluss'
  },

  // ===== OFF THE BEATEN PATH (8) =====
  {
    id: 'konglorhoehle',
    name: 'Kong-Lor-Höhle',
    lat: 17.96,
    lng: 105.11,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Tham_Kong_Lo',
    highlights: '7 km lange Flusshöhle, Bootsfahrt durch Dunkelheit, Phu Hin Bun Nationalpark',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Dunkle Flusshöhle per Boot, laut und beängstigend für Babys' },
      '1-3':  { rating: 'red', note: 'Stockdunkle 7-km-Bootsfahrt und lange Anreise ungeeignet' },
      '3-6':  { rating: 'yellow', note: 'Bootsfahrt spannend aber dunkel und lang, Kinder müssen mutig sein' },
      '6-12': { rating: 'green', note: 'Unterirdische Bootsfahrt ist ein unvergessliches Abenteuer für Kinder' },
      '12+':  { rating: 'green', note: 'Spektakuläre Höhlenfahrt, eines der Highlights von ganz Laos' }
    },
    dayTripFrom: [{ base: 'thakhek', transit: '~3h Motorrad/Bus (Thakhek Loop)' }]
  },
  {
    id: 'muangngoi',
    name: 'Muang Ngoi Neua',
    lat: 20.71,
    lng: 102.68,
    tags: ['Natur', 'Erholung'],
    wiki: 'Muang_Ngoi_Neua',
    highlights: 'Nur per Boot erreichbar, Reisfelder, Höhlen, Dorfwanderungen',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Nur per Boot erreichbar, kein Strom und keine medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Extrem einfache Verhältnisse, kein Strom und keine Infrastruktur' },
      '3-6':  { rating: 'yellow', note: 'Bootsfahrt und Reisfelder nett, aber sehr einfache Unterkünfte' },
      '6-12': { rating: 'yellow', note: 'Abenteuer-Feeling pur, Dorfwanderungen und Höhlen erkunden' },
      '12+':  { rating: 'green', note: 'Digital Detox und authentisches Dorfleben für reife Jugendliche' }
    },
    dayTripFrom: [{ base: 'nongkhiaw', transit: '~1h Boot auf dem Nam Ou' }]
  },
  {
    id: 'viengxai',
    name: 'Vieng Xai',
    lat: 20.40,
    lng: 104.23,
    tags: ['Geschichte'],
    wiki: 'Vieng_Xai',
    highlights: 'Pathet-Lao-Höhlen (480 Höhlen), unterirdische Krankenhäuser, Theater, Schulen',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegen, dunkle Höhlen und schweres Kriegsthema für Babys ungeeignet' },
      '1-3':  { rating: 'red', note: 'Dunkle Höhlensysteme und lange Anreise für Kleinkinder nicht machbar' },
      '3-6':  { rating: 'yellow', note: 'Höhlen faszinierend aber dunkel, Kriegsthema schwer vermittelbar' },
      '6-12': { rating: 'yellow', note: 'Unterirdische Stadt spannend, aber Kriegsgeschichte kann belasten' },
      '12+':  { rating: 'green', note: 'Bewegende Kriegsgeschichte und einzigartige Höhlenstadt beeindrucken' }
    },
    desc: 'Versteckte Höhlenstadt, in der bis zu 23.000 Menschen während des Vietnamkriegs unter der Erde lebten'
  },
  {
    id: 'pakbeng',
    name: 'Pakbeng',
    lat: 19.85,
    lng: 101.55,
    tags: ['Erholung', 'Natur'],
    wiki: 'Pakbeng',
    highlights: 'Slow-Boat-Zwischenstopp, Elefanten-Sanctuary, Mekong-Sonnenuntergang',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Nur per Slow Boat erreichbar, ganztägige Bootsfahrt mit Baby schwierig' },
      '1-3':  { rating: 'red', note: 'Langer Bootstag ohne Komfort, kaum Infrastruktur im Ort' },
      '3-6':  { rating: 'yellow', note: 'Elefanten-Sanctuary schön, aber die Bootsfahrt ist lang und eng' },
      '6-12': { rating: 'yellow', note: 'Elefanten hautnah und Mekong-Abenteuer, Geduld für Slow Boat nötig' },
      '12+':  { rating: 'green', note: 'Slow-Boat-Erlebnis und Elefanten-Begegnung sind unvergesslich' }
    },
    desc: 'Verschlafener Mekong-Zwischenstopp auf der Slow-Boat-Route mit Elefanten-Auffangstation und goldenem Fluss-Panorama'
  },
  {
    id: 'muangsing',
    name: 'Muang Sing',
    lat: 21.19,
    lng: 101.15,
    tags: ['Kultur', 'Abenteuer'],
    wiki: 'Muang_Sing,_Laos',
    highlights: 'Akha- und Tai-Lue-Dörfer, Morgenmarkt, Grenzgebiet zu China, Trekking',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegenes Grenzgebiet, keine Infrastruktur für Babys vorhanden' },
      '1-3':  { rating: 'red', note: 'Trekking-Ort ohne kindgerechte Einrichtungen oder Aktivitäten' },
      '3-6':  { rating: 'yellow', note: 'Morgenmarkt bunt und spannend, als Tagesausflug von Luang Namtha ok' },
      '6-12': { rating: 'yellow', note: 'Bergvolk-Märkte und Kulturerlebnis als Tagesausflug interessant' },
      '12+':  { rating: 'green', note: 'Authentische Märkte und Grenztstadt-Atmosphäre faszinierend' }
    },
    dayTripFrom: [{ base: 'luangnamtha', transit: '~1h Songthaew/Bus' }]
  },
  {
    id: 'watphou',
    name: 'Wat Phou',
    lat: 14.85,
    lng: 105.82,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Vat_Phou',
    highlights: 'UNESCO-Khmer-Tempel, Bergtempel-Aufstieg, Linga-Schnitzereien, Panorama',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Treppen zum Tempel steil, Hitze am Berghang anstrengend mit Baby' },
      '1-3':  { rating: 'yellow', note: 'Steile Tempel-Stufen mit Kleinkind herausfordernd, Trage empfohlen' },
      '3-6':  { rating: 'green', note: 'Tempel-Ruinen zum Klettern und Entdecken, Aussicht belohnt den Aufstieg' },
      '6-12': { rating: 'green', note: 'Khmer-Tempel begeistert wie Angkor im Kleinen, tolle Fotomotive' },
      '12+':  { rating: 'green', note: 'Faszinierende Archäologie und Geschichte mit grandiosem Panorama' }
    },
    dayTripFrom: [
      { base: 'champasak', transit: '~15min Tuk-Tuk' },
      { base: 'pakse', transit: '~1.5h Minivan' }
    ]
  },
  {
    id: 'kuangsi',
    name: 'Kuang-Si-Wasserfälle',
    lat: 19.75,
    lng: 101.99,
    tags: ['Natur', 'Erholung'],
    wiki: 'Kuang_Si_Falls',
    highlights: 'Türkisfarbene Kaskaden, Bärenrettungszentrum, Schmetterlingsgarten',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Waldwege uneben, aber Bärenrettung und untere Kaskaden gut erreichbar' },
      '1-3':  { rating: 'green', note: 'Untere Becken zum Planschen geeignet, Bären beobachten macht Spaß' },
      '3-6':  { rating: 'green', note: 'Türkise Pools, Schmetterlinge und Bären – ein Traum für kleine Kinder' },
      '6-12': { rating: 'green', note: 'Schwimmen in den Kaskaden, Bärenstation und Dschungelwanderung' },
      '12+':  { rating: 'green', note: 'Baden, Klettern und Natur-Fotografie an einem der schönsten Orte' }
    },
    dayTripFrom: [{ base: 'luangprabang', transit: '~45min Tuk-Tuk/Minivan' }]
  },
  {
    id: 'muangla',
    name: 'Muang La',
    lat: 20.87,
    lng: 102.11,
    tags: ['Erholung', 'Kultur'],
    wiki: 'Oudomxay_province',
    highlights: 'Heiße Quellen, Tai-Lue-Tempel, Reisterrassen, Abgeschiedenheit',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Heiße Quellen angenehm, aber abgelegen und kaum Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Thermalbäder nett, aber Wassertemperatur für Kleinkinder prüfen' },
      '3-6':  { rating: 'green', note: 'Heiße Quellen, Tempel und Reisterrassen als ruhiger Tagesausflug' },
      '6-12': { rating: 'green', note: 'Naturerlebnis mit heißen Quellen und Tempel-Besuch kombinierbar' },
      '12+':  { rating: 'green', note: 'Entspannung in heißen Quellen und authentische ländliche Atmosphäre' }
    },
    dayTripFrom: [{ base: 'muangxay', transit: '~45min Songthaew' }]
  }
];
