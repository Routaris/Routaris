/* ============================================
   SOUTHKOREA-DESTINATIONS.JS – Datenbank aller Südkorea-Ziele
   ============================================ */

const SOUTHKOREA_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'seoul',
    name: 'Seoul',
    lat: 37.56,
    lng: 126.99,
    tags: ['Großstadt', 'Kultur', 'Geschichte', 'Kulinarik'],
    wiki: 'Seoul',
    highlights: 'Gyeongbokgung-Palast, Bukchon Hanok Village, Myeongdong, N Seoul Tower, Gwangjang-Markt',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Exzellente Infrastruktur, sauber, sicher und Stillräume überall vorhanden' },
      '1-3':  { rating: 'green', note: 'U-Bahn mit Aufzügen, kinderfreundliche Cafés und Parks überall' },
      '3-6':  { rating: 'green', note: 'Lotte World, Kindermuseen, Paläste mit Hanbok-Anprobe begeistern' },
      '6-12': { rating: 'green', note: 'Lotte World, N Seoul Tower, Paläste und Gwangjang-Markt sind Highlights' },
      '12+':  { rating: 'green', note: 'K-Pop-Kultur, Shopping in Myeongdong und Streetfood-Paradies' }
    },
    desc: 'Südkoreas pulsierende Hauptstadt, wo königliche Paläste auf K-Pop-Kultur, traditionelle Märkte und futuristische Architektur treffen'
  },
  {
    id: 'busan',
    name: 'Busan',
    lat: 35.18,
    lng: 129.08,
    tags: ['Großstadt', 'Erholung', 'Kulinarik'],
    wiki: 'Busan',
    highlights: 'Haeundae Beach, Gamcheon Culture Village, Jagalchi Fischmarkt, Haedong Yonggungsa Tempel',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Moderne Großstadt mit exzellenter Infrastruktur und sauberen Stränden' },
      '1-3':  { rating: 'green', note: 'Haeundae Beach flach und sicher, SEA LIFE Aquarium perfekt für Kleine' },
      '3-6':  { rating: 'green', note: 'Aquarium, Gamcheon Village bunt und fotogen, Strand zum Spielen' },
      '6-12': { rating: 'green', note: 'Gamcheon Culture Village, Jagalchi Markt und Haeundae-Strand begeistern' },
      '12+':  { rating: 'green', note: 'Streetfood am Fischmarkt, BIFF-Square und Strandkultur erleben' }
    },
    desc: 'Südkoreas zweitgrößte Stadt an der Südostküste mit spektakulären Stränden, bunten Vierteln und dem größten Fischmarkt des Landes'
  },
  {
    id: 'jeju',
    name: 'Jeju',
    altName: 'Jejudo',
    lat: 33.38,
    lng: 126.53,
    tags: ['Natur', 'Erholung', 'Abenteuer'],
    wiki: 'Jeju_Island',
    highlights: 'Hallasan-Vulkan, Seongsan Ilchulbong, Manjanggul-Lavahöhle, Hyeopjae Beach, Olle-Wanderwege',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Mildes Klima, familienfreundliche Resorts und gute medizinische Versorgung' },
      '1-3':  { rating: 'green', note: 'Eco-Land-Zug, Strandresorts und viele Indoor-Spielplätze vorhanden' },
      '3-6':  { rating: 'green', note: 'Teddy Bear Museum, Lavahöhle, Ponyreiten und flache Strände ideal' },
      '6-12': { rating: 'green', note: 'Hallasan wandern, Lavahöhlen erkunden und Haenyeo-Taucherinnen sehen' },
      '12+':  { rating: 'green', note: 'Olle-Wanderwege, Hallasan-Gipfel und subtropische Natur erleben' }
    },
    desc: 'Vulkaninsel im Süden mit subtropischem Klima, UNESCO-Weltnaturerbe und Südkoreas beliebtestes Urlaubsziel'
  },
  {
    id: 'gyeongju',
    name: 'Gyeongju',
    altName: 'Museum ohne Mauern',
    lat: 35.85,
    lng: 129.22,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Gyeongju',
    highlights: 'Bulguksa-Tempel (UNESCO), Seokguram-Grotte, Tumuli-Park, Anapji-Teich, Nationalmuseum',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Stadt, flache Wege zwischen Tumuli und Parks buggytauglich' },
      '1-3':  { rating: 'green', note: 'Tumuli-Park zum Spazieren, Anapji-Teich und flaches Gelände ideal' },
      '3-6':  { rating: 'green', note: 'Hügelgräber erklimmen, Rad fahren und am Teich Fische beobachten' },
      '6-12': { rating: 'green', note: 'Fahrradtour zwischen UNESCO-Stätten, Museum und Bulguksa-Tempel' },
      '12+':  { rating: 'green', note: 'Silla-Geschichte hautnah, Seokguram-Grotte und Radtour durch die Stadt' }
    },
    desc: 'Ehemalige Hauptstadt des Silla-Königreichs mit über 1.000 Jahren Geschichte, Hügelgräbern und UNESCO-Welterbestätten'
  },
  {
    id: 'jeonju',
    name: 'Jeonju',
    lat: 35.82,
    lng: 127.15,
    tags: ['Kultur', 'Kulinarik', 'Geschichte'],
    wiki: 'Jeonju',
    highlights: 'Jeonju Hanok Village, Bibimbap-Hauptstadt, Gyeonggijeon-Schrein, Hanji-Papierkunst',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flaches Hanok-Dorf, ruhige Gassen und gemütliche Atmosphäre' },
      '1-3':  { rating: 'green', note: 'Hanok-Übernachtung aufregend, Bibimbap kinderfreundlich und flache Wege' },
      '3-6':  { rating: 'green', note: 'Hanbok anprobieren, Hanji-Papier basteln und Bibimbap zusammenstellen' },
      '6-12': { rating: 'green', note: 'Bibimbap-Kochkurs, Hanok-Village erkunden und Papierschöpfen lernen' },
      '12+':  { rating: 'green', note: 'Food-Tour, traditionelle Hanok-Übernachtung und koreanische Teekultur' }
    },
    desc: 'Koreas kulinarische Hauptstadt mit dem größten traditionellen Hanok-Dorf und Geburtsort des legendären Bibimbap'
  },
  {
    id: 'gangneung',
    name: 'Gangneung',
    lat: 37.75,
    lng: 128.90,
    tags: ['Erholung', 'Kultur', 'Kulinarik'],
    wiki: 'Gangneung',
    highlights: 'Gyeongpo Beach, Anmok Kaffee-Straße, Ojukheon, Seongyojang, Jumunjin Beach',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Küstenstadt, saubere Strände und gute Infrastruktur vorhanden' },
      '1-3':  { rating: 'green', note: 'Flache Sandstrände zum Planschen und kinderfreundliche Cafés' },
      '3-6':  { rating: 'green', note: 'Gyeongpo Beach zum Spielen, Kaffee-Straße und Seongyojang erkunden' },
      '6-12': { rating: 'green', note: 'Strand, Radfahren entlang der Küste und Jumunjin-Hafen entdecken' },
      '12+':  { rating: 'green', note: 'Trendige Kaffee-Kultur, BTS-Strand Jumunjin und Surfen ausprobieren' }
    },
    desc: 'Beliebte Küstenstadt an der Ostküste, bekannt für endlose Strände, die beste Kaffee-Kultur Koreas und frischen Tintenfisch'
  },
  {
    id: 'sokcho',
    name: 'Sokcho',
    altName: 'Seoraksan',
    lat: 38.19,
    lng: 128.57,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Sokcho',
    highlights: 'Seoraksan-Nationalpark, Ulsanbawi-Felsen, Sinheungsa-Tempel, Biryong-Wasserfall, Daepo-Hafen',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bergwanderungen nicht mit Baby machbar, Seilbahn als Alternative' },
      '1-3':  { rating: 'yellow', note: 'Seilbahn zum Gwongeumseong möglich, aber Wanderwege zu steil für Kleine' },
      '3-6':  { rating: 'green', note: 'Seilbahn und kurze Tempelwege machbar, Sinheungsa-Tempel kindgerecht' },
      '6-12': { rating: 'green', note: 'Biryong-Wasserfall wandern, Seilbahn und Herbstfarben faszinierend' },
      '12+':  { rating: 'green', note: 'Ulsanbawi-Aufstieg, spektakuläre Herbstfarben und Granitgipfel erleben' }
    },
    desc: 'Tor zum spektakulären Seoraksan-Nationalpark mit Südkoreas dramatischsten Granitgipfeln und den besten Herbstfarben'
  },
  {
    id: 'suwon',
    name: 'Suwon',
    lat: 37.27,
    lng: 127.02,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Suwon',
    highlights: 'Hwaseong-Festung (UNESCO), Hwaseong Haenggung-Palast, Suwon-Markt, Korean Folk Village',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Nur 1h von Seoul, flache Wege an der Festung und gute Infrastruktur' },
      '1-3':  { rating: 'green', note: 'Korean Folk Village mit Aufführungen, Festungsmauer zum Spazieren' },
      '3-6':  { rating: 'green', note: 'Folk Village mit Schmied und Seiltänzer, Festungsbahn für Kinder' },
      '6-12': { rating: 'green', note: 'Bogenschießen an der Festung, Folk Village und Markt erkunden' },
      '12+':  { rating: 'green', note: 'UNESCO-Festung, historische Stadttore und koreanische Traditionen erleben' }
    },
    desc: 'UNESCO-Welterbestadt südlich von Seoul mit der beeindruckenden Hwaseong-Festung aus der Joseon-Dynastie',
    dayTripFrom: [{ base: 'seoul', transit: '~1h U-Bahn/Zug' }]
  },
  {
    id: 'yeosu',
    name: 'Yeosu',
    lat: 34.73,
    lng: 127.73,
    tags: ['Natur', 'Erholung', 'Kulinarik'],
    wiki: 'Yeosu',
    highlights: 'Odongdo-Insel, Hyangiram-Einsiedelei, Yeosu Night Sea, Expo-Park, Dolsan-Brücke',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Hafenstadt, Expo-Park kinderfreundlich und gute Infrastruktur' },
      '1-3':  { rating: 'green', note: 'Aqua Planet Aquarium, Expo-Park und beleuchtete Brücke abends toll' },
      '3-6':  { rating: 'green', note: 'Aquarium, Seilbahn zur Odongdo-Insel und bunte Nachtbeleuchtung' },
      '6-12': { rating: 'green', note: 'Night Sea, Hyangiram-Kletterweg und Expo-Park mit Riesenrad' },
      '12+':  { rating: 'green', note: 'Romantisches Nachtmeer, Insel-Bootstouren und Meeresfrüchte-Genuss' }
    },
    desc: 'Malerische Hafenstadt an der Südküste mit atemberaubender Inselkulisse, legendären Meeresfrüchten und dem berühmten Nachtmeer'
  },
  {
    id: 'andong',
    name: 'Andong',
    lat: 36.56,
    lng: 128.73,
    tags: ['Kultur', 'Geschichte', 'Kulinarik'],
    wiki: 'Andong',
    highlights: 'Hahoe Folk Village (UNESCO), Maskentanz-Festival, Andong Jjimdak, Bongjeongsa-Tempel',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Kleinstadt, Hahoe-Dorf buggytauglich und entspannte Atmosphäre' },
      '1-3':  { rating: 'green', note: 'Hahoe-Dorf mit Fluss, Masken zum Anschauen und ruhige Spazierwege' },
      '3-6':  { rating: 'green', note: 'Maskentanz-Aufführung lustig für Kinder, Dorf erkunden und Flussufer' },
      '6-12': { rating: 'green', note: 'UNESCO-Hahoe-Dorf, Maskentanz-Festival und Jjimdak-Essen begeistern' },
      '12+':  { rating: 'green', note: 'Konfuzianische Kultur, Maskentanz und traditionelles Dorfleben erleben' }
    },
    desc: 'Koreas spirituelle Hauptstadt mit dem UNESCO-Welterbe Hahoe-Dorf, traditionellen Maskentänzen und dem berühmten Jjimdak-Schmortopf'
  },
  {
    id: 'tongyeong',
    name: 'Tongyeong',
    altName: 'Neapel des Ostens',
    lat: 34.83,
    lng: 128.42,
    tags: ['Natur', 'Kultur', 'Kulinarik'],
    wiki: 'Tongyeong',
    highlights: 'Hallyeo-Meeresnationalpark, Dongpirang Wandmalerei-Dorf, Yi-Sun-sin-Park, Chungmu-Gimbap',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Küstenstadt, Seilbahn kinderfreundlich und gute Infrastruktur' },
      '1-3':  { rating: 'green', note: 'Seilbahn über den Hafen, Dongpirang-Wandmalereien und flache Promenade' },
      '3-6':  { rating: 'green', note: 'Bunte Wandmalerei-Dorf, Seilbahn und Fischmarkt faszinieren Kinder' },
      '6-12': { rating: 'green', note: 'Dongpirang bemalen, Insel-Bootstour und Yi-Sun-sin-Geschichte lernen' },
      '12+':  { rating: 'green', note: 'Kunstszene, Hallyeo-Nationalpark und Koreas maritime Geschichte erleben' }
    },
    desc: 'Charmante Künstlerstadt an der Südküste, umgeben von Hunderten kleiner Inseln, bekannt als Koreas Neapel'
  },
  {
    id: 'gwangju',
    name: 'Gwangju',
    lat: 35.17,
    lng: 126.85,
    tags: ['Kultur', 'Geschichte', 'Kulinarik'],
    wiki: 'Gwangju',
    highlights: 'Gwangju Biennale, 18.-Mai-Demokratie-Bewegung, Mudeungsan-Nationalpark, Yangdong-Markt',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Großstadt mit guter Infrastruktur, Parks und Krankenhäusern' },
      '1-3':  { rating: 'green', note: 'Yangdong-Markt zum Probieren, Parks und kinderfreundliche Umgebung' },
      '3-6':  { rating: 'green', note: 'Biennale-Kunstpark, Mudeungsan leichte Wege und bunte Märkte' },
      '6-12': { rating: 'green', note: 'Kunstbiennale, Mudeungsan-Wanderung und Demokratie-Geschichte lernen' },
      '12+':  { rating: 'green', note: 'Lebendige Kunstszene, Demokratiebewegung und kreative Kulinarik' }
    },
    desc: 'Koreas Kulturhauptstadt und Wiege der Demokratiebewegung mit lebendiger Kunstszene und hervorragender Küche'
  },
  {
    id: 'chuncheon',
    name: 'Chuncheon',
    lat: 37.87,
    lng: 127.73,
    tags: ['Natur', 'Kulinarik', 'Erholung'],
    wiki: 'Chuncheon',
    highlights: 'Nami-Insel, Dak-galbi-Straße, Soyang-See, Gangchon Rail Bike',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Nami-Insel flach und schattig, Fähre kurz und ruhige Atmosphäre' },
      '1-3':  { rating: 'green', note: 'Nami-Insel zum Spazieren, Tretboot auf dem See und schattige Alleen' },
      '3-6':  { rating: 'green', note: 'Nami-Insel mit Tieren, Rail Bike fahren und Dak-galbi essen' },
      '6-12': { rating: 'green', note: 'Gangchon Rail Bike, Nami-Insel und Zip-Line sorgen für Begeisterung' },
      '12+':  { rating: 'green', note: 'K-Drama-Spots auf Nami, Rail Bike und Dak-galbi-Streetfood erleben' }
    },
    desc: 'Idyllische Seenstadt nordöstlich von Seoul, Heimat der Nami-Insel und der legendären Dak-galbi-Pfanne'
  },
  {
    id: 'incheon',
    name: 'Incheon',
    lat: 37.48,
    lng: 126.63,
    tags: ['Großstadt', 'Geschichte', 'Kultur'],
    wiki: 'Incheon',
    highlights: 'Chinatown, Songdo International Business District, Wolmido-Insel, Ganghwa-Insel',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Moderne Stadt mit Top-Infrastruktur, Songdo Central Park buggytauglich' },
      '1-3':  { rating: 'green', note: 'Songdo Park mit Kanal, Wolmido-Vergnügungspark und Chinatown bummeln' },
      '3-6':  { rating: 'green', note: 'Wolmido-Vergnügungspark, Chinatown-Jajangmyeon und Songdo Park' },
      '6-12': { rating: 'green', note: 'Futuristische Songdo-Stadt, Ganghwa-Insel und Jajangmyeon probieren' },
      '12+':  { rating: 'green', note: 'Songdo Smart City, Koreas ältestes Chinatown und Ganghwa-Geschichte' }
    },
    desc: 'Moderne Hafenstadt mit Koreas ältestem Chinatown, der futuristischen Songdo-Smart-City und den historischen Ganghwa-Inseln'
  },
  {
    id: 'daegu',
    name: 'Daegu',
    lat: 35.87,
    lng: 128.60,
    tags: ['Kultur', 'Kulinarik', 'Geschichte'],
    wiki: 'Daegu',
    highlights: 'Seomun-Markt, Apsan-Park, Kim-Gwangseok-Straße, Donghwasa-Tempel, Suseong-See',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Großstadt mit guter Infrastruktur, Parks und U-Bahn-Netz vorhanden' },
      '1-3':  { rating: 'green', note: 'Apsan-Park mit Seilbahn, Suseong-See und kinderfreundliche Cafés' },
      '3-6':  { rating: 'green', note: 'Suseong-See mit Tretboot, Seilbahn und bunter Kim-Gwangseok-Straße' },
      '6-12': { rating: 'green', note: 'Donghwasa-Tempel, Seomun-Markt und Musik-Straße bieten Abwechslung' },
      '12+':  { rating: 'green', note: 'Lebendige Musik-Szene, Nachtmärkte und vielfältige Streetfood-Kultur' }
    },
    desc: 'Südkoreas viertgrößte Stadt im Landesinneren, bekannt für den größten Textilmarkt, scharfes Essen und die lebendige Musik-Szene'
  },

  // ===== OFF THE BEATEN PATH (9) =====
  {
    id: 'danyang',
    name: 'Danyang',
    lat: 36.99,
    lng: 128.36,
    tags: ['Natur', 'Abenteuer', 'Kultur'],
    wiki: 'Danyang_County',
    highlights: 'Dodamsambong-Felsen, Guinsa-Tempel, Gosu-Tropfsteinhöhle, Sobaeksan-Nationalpark, Paragliding',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bergregion mit kurvigen Straßen, aber Tropfsteinhöhle buggytauglich' },
      '1-3':  { rating: 'green', note: 'Gosu-Höhle begehbar, Dodamsambong-Felsen vom Ufer aus sichtbar' },
      '3-6':  { rating: 'green', note: 'Tropfsteinhöhle fasziniert Kinder, Boot zu den Felsen und Seilbahn' },
      '6-12': { rating: 'green', note: 'Paragliding anschauen, Höhle erkunden und Nationalpark-Wanderungen' },
      '12+':  { rating: 'green', note: 'Paragliding, Sobaeksan-Wanderung und Guinsa-Tempel in den Bergen' }
    },
    desc: 'Verstecktes Naturjuwel in den Bergen mit bizarren Felsformationen, dem größten buddhistischen Tempel Koreas und drei Nationalparks'
  },
  {
    id: 'boseong',
    name: 'Boseong',
    lat: 34.77,
    lng: 127.08,
    tags: ['Natur', 'Kulinarik'],
    wiki: 'Boseong_County',
    highlights: 'Daehan Dawon Teeplantagen, grüne Hügellandschaft, Grüntee-Festival, Yulpo Beach',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Teefelder, flache Spazierwege und frische Bergluft' },
      '1-3':  { rating: 'green', note: 'Teeplantagen zum Spazieren, Grüntee-Eis und schattige Wege' },
      '3-6':  { rating: 'green', note: 'Durch Teefelder laufen, Grüntee-Eis probieren und Yulpo Beach' },
      '6-12': { rating: 'green', note: 'Tee-Ernte probieren, fotogene Felder und K-Drama-Drehorte entdecken' },
      '12+':  { rating: 'green', note: 'K-Drama-Spots, Teezeremonie und Instagram-perfekte Plantagen' }
    },
    desc: 'Koreas größte Grüntee-Plantagen mit endlosen smaragdgrünen Teefeldern auf sanften Hügeln, bekannt aus zahlreichen K-Dramas',
    dayTripFrom: [
      { base: 'suncheon', transit: '~1h Zug' },
      { base: 'gwangju', transit: '~1.5h Bus' }
    ]
  },
  {
    id: 'suncheon',
    name: 'Suncheon',
    lat: 34.95,
    lng: 127.49,
    tags: ['Natur', 'Kultur'],
    wiki: 'Suncheon',
    highlights: 'Suncheonman-Bucht (UNESCO), Schilffelder, National Garden, Seonamsa-Tempel, Naganeupseong',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flache Wege im National Garden, ruhig und kinderwagentauglich' },
      '1-3':  { rating: 'green', note: 'National Garden mit Spielplatz, Schilffelder per Holzsteg begehbar' },
      '3-6':  { rating: 'green', note: 'Naganeupseong-Festungsdorf, Skybike und Schilffelder erkunden' },
      '6-12': { rating: 'green', note: 'Feuchtgebiet-Ökologie lernen, Skybike fahren und Tempel besuchen' },
      '12+':  { rating: 'green', note: 'UNESCO-Ökosystem, Tempelgärten und nachhaltige Stadtentwicklung erleben' }
    },
    desc: 'Koreas Ökostadt mit UNESCO-geschütztem Feuchtgebiet, riesigen Schilffeldern und einem der schönsten Tempelgärten des Landes',
    dayTripFrom: [
      { base: 'yeosu', transit: '~30min Zug' },
      { base: 'gwangju', transit: '~1.5h Bus' }
    ]
  },
  {
    id: 'buyeo',
    name: 'Buyeo',
    lat: 36.28,
    lng: 126.91,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Buyeo_County',
    highlights: 'Busosanseong-Festung, Baekje-Königsgräber (UNESCO), Gungnamji-Lotussteich, Baekje-Kulturkomplex',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Kleinstadt, flache Wege am Lotussteich und entspannt' },
      '1-3':  { rating: 'green', note: 'Gungnamji-Lotussteich zum Spazieren und Kulturkomplex mit Spielplatz' },
      '3-6':  { rating: 'green', note: 'Lotusblüten anschauen, Baekje-Kulturkomplex mit Nachbauten erkunden' },
      '6-12': { rating: 'green', note: 'Baekje-Königsgräber, Festung erkunden und Lotusblüten im Sommer' },
      '12+':  { rating: 'green', note: 'UNESCO-Welterbe, Baekje-Geschichte und romantischer Lotusblütenteich' }
    },
    desc: 'Stille Hauptstadt des untergegangenen Baekje-Königreichs mit UNESCO-Welterbestätten und dem berühmten Lotusblütenteich',
    dayTripFrom: [{ base: 'jeonju', transit: '~1.5h Bus' }]
  },
  {
    id: 'gongju',
    name: 'Gongju',
    lat: 36.45,
    lng: 127.12,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Gongju',
    highlights: 'Gongsanseong-Festung (UNESCO), Königsgräber von Muryeong, Magoksa-Tempel, Baekje-Museum',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Kleinstadt, Festungswege eben und kinderwagentauglich' },
      '1-3':  { rating: 'green', note: 'Gongsanseong-Festung zum Spazieren, Museum mit Goldschätzen' },
      '3-6':  { rating: 'green', note: 'Festungsmauer entlanglaufen, Baekje-Museum und Tempel erkunden' },
      '6-12': { rating: 'green', note: 'Goldene Königsgräber, Festung und Magoksa-Tempel beeindrucken' },
      '12+':  { rating: 'green', note: 'UNESCO-Geschichte, archäologische Schätze und Baekje-Kultur erleben' }
    },
    desc: 'Zweite historische Baekje-Hauptstadt mit der UNESCO-Welterbe-Festung und den goldenen Grabschätzen von König Muryeong',
    dayTripFrom: [{ base: 'jeonju', transit: '~1.5h Bus' }]
  },
  {
    id: 'ulleungdo',
    name: 'Ulleungdo',
    lat: 37.50,
    lng: 130.86,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Ulleungdo',
    highlights: 'Vulkanische Klippen, Dodong-Hafen, Bongnae-Wasserfall, Nari-Becken, kristallklares Wasser',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Lange Fähre (3h), Seegang häufig und begrenzte medizinische Versorgung' },
      '1-3':  { rating: 'yellow', note: 'Fähre bei Wellengang anstrengend, einfache Infrastruktur auf der Insel' },
      '3-6':  { rating: 'yellow', note: 'Hafen und Küstenwege interessant, aber lange Anreise per Fähre' },
      '6-12': { rating: 'green', note: 'Vulkanische Klippen, Nari-Becken und kristallklares Wasser faszinieren' },
      '12+':  { rating: 'green', note: 'Abenteuerliche Insel, Küstenwanderungen und unberührte Vulkannatur' }
    },
    desc: 'Abgelegene Vulkaninsel im Japanischen Meer mit dramatischen Klippen, kristallklarem Wasser und unberührter Natur'
  },
  {
    id: 'damyang',
    name: 'Damyang',
    lat: 35.32,
    lng: 126.98,
    tags: ['Natur', 'Kultur'],
    wiki: 'Damyang_County',
    highlights: 'Juknokwon-Bambuswald, Metasequoia-Allee, Soswaewon-Garten, Damyang-Nudeln',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Bambuswald schattig und ruhig, befestigte Wege kinderwagentauglich' },
      '1-3':  { rating: 'green', note: 'Bambuswald zum Staunen, Metasequoia-Allee und flache Spazierwege' },
      '3-6':  { rating: 'green', note: 'Riesige Bambushalme bestaunen, Allee entlangspazieren und Nudeln essen' },
      '6-12': { rating: 'green', note: 'Bambuswald erkunden, Soswaewon-Garten und Bambus-Handwerk entdecken' },
      '12+':  { rating: 'green', note: 'Fotogener Bambuswald, traditionelle Gärten und K-Drama-Drehorte' }
    },
    desc: 'Malerische Bambusstadt mit dem berühmten Juknokwon-Bambuswald und einer der schönsten Baumalleen Koreas',
    dayTripFrom: [{ base: 'gwangju', transit: '~30min Bus' }]
  },
  {
    id: 'hadong',
    name: 'Hadong',
    lat: 35.07,
    lng: 127.75,
    tags: ['Natur', 'Kultur'],
    wiki: 'Hadong_County',
    highlights: 'Ssanggyesa-Tempel, Wildtee-Plantagen, Hwagae-Markt, Seomjingang-Fluss',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Natur, frische Luft und entspanntes Tempo perfekt für Babys' },
      '1-3':  { rating: 'green', note: 'Teefelder zum Spazieren, Fluss anschauen und ruhige Atmosphäre' },
      '3-6':  { rating: 'green', note: 'Hwagae-Markt bummeln, Tee probieren und am Fluss Steine sammeln' },
      '6-12': { rating: 'green', note: 'Wildtee-Plantagen, Tempelbesuch und Flusslandschaft erkunden' },
      '12+':  { rating: 'green', note: 'Älteste Tee-Tradition Koreas, Tempelwanderung und Natur am Fluss' }
    },
    desc: 'Idyllische Tee-Region am Seomjin-Fluss mit Koreas ältesten Wildtee-Plantagen und dem atmosphärischen Ssanggyesa-Tempel',
    dayTripFrom: [{ base: 'yeosu', transit: '~1.5h Bus' }]
  },
  {
    id: 'ganghwa',
    name: 'Ganghwa-Insel',
    altName: 'Ganghwado',
    lat: 37.71,
    lng: 126.44,
    tags: ['Geschichte', 'Natur'],
    wiki: 'Ganghwa_Island',
    highlights: 'Dolmen (UNESCO), Jeondeungsa-Tempel, Friedens-Observatorium, Schlickwatt-Erlebnis',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Nahe Seoul, ruhige Insel mit frischer Luft und flachen Wegen' },
      '1-3':  { rating: 'green', note: 'Schlickwatt-Erlebnis fasziniert Kleine, Tempel und flache Felder' },
      '3-6':  { rating: 'green', note: 'Im Schlickwatt matschen, Friedens-Observatorium und Dolmen bestaunen' },
      '6-12': { rating: 'green', note: 'Blick nach Nordkorea, UNESCO-Dolmen und Schlickwatt-Abenteuer' },
      '12+':  { rating: 'green', note: 'Grenz-Observatorium, koreanische Geschichte und UNESCO-Welterbe hautnah' }
    },
    desc: 'Geschichtsträchtige Insel vor den Toren Seouls mit prähistorischen UNESCO-Dolmen und Blick auf die nordkoreanische Grenze',
    dayTripFrom: [
      { base: 'seoul', transit: '~1.5h Bus' },
      { base: 'incheon', transit: '~1h Bus' }
    ]
  }
];
