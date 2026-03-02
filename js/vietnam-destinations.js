/* ============================================
   VIETNAM-DESTINATIONS.JS – Datenbank aller Vietnam-Ziele
   ============================================ */

const VIETNAM_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'hochiminh',
    name: 'Ho-Chi-Minh-Stadt',
    altName: 'Saigon',
    lat: 10.7626,
    lng: 106.6601,
    tags: ['Großstadt', 'Geschichte', 'Kulinarik'],
    wiki: 'Ho_Chi_Minh_City',
    highlights: 'Ben-Thanh-Markt, Kriegsreste-Museum, Notre-Dame-Kathedrale, Cu-Chi-Tunnel',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Chaotischer Verkehr und Hitze, aber gute Krankenhäuser und internationale Küche' },
      '1-3':  { rating: 'yellow', note: 'Verkehr stressig mit Kleinkindern, Parks und Malls bieten Abwechslung' },
      '3-6':  { rating: 'green', note: 'Wasserpark, Zoo und kindgerechte Restaurants in allen Bezirken' },
      '6-12': { rating: 'green', note: 'Kriegsmuseum, Cu-Chi-Tunnel und Street-Food-Touren begeistern' },
      '12+':  { rating: 'green', note: 'Shopping, Nachtmärkte, Geschichte und vielfältige Kulinarik' }
    },
    desc: 'Vietnams pulsierende Wirtschaftsmetropole, wo französische Kolonialarchitektur auf moderne Wolkenkratzer trifft'
  },
  {
    id: 'hanoi',
    name: 'Hanoi',
    lat: 21.0285,
    lng: 105.8048,
    tags: ['Kultur', 'Geschichte', 'Kulinarik'],
    wiki: 'Hanoi',
    highlights: 'Altstadt (Old Quarter), Hoan-Kiem-See, Ho-Chi-Minh-Mausoleum, Literaturtempel',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Chaotischer Verkehr in der Altstadt, aber gute Kliniken und Babyausstattung verfügbar' },
      '1-3':  { rating: 'yellow', note: 'Rollerverkehr anstrengend, Hoan-Kiem-See-Umgebung am Wochenende autofrei und sicher' },
      '3-6':  { rating: 'green', note: 'Wasserpuppentheater, Parkanlagen und kinderfreundliche Pho-Restaurants' },
      '6-12': { rating: 'green', note: 'Altstadt-Erkundung, Tempel, Streetfood-Touren und Geschichte hautnah' },
      '12+':  { rating: 'green', note: 'Kultur, Kochkurse, Nachtmärkte und spannende Museen' }
    },
    desc: 'Vietnams charmante Hauptstadt mit tausendjähriger Geschichte, legendärer Streetfood-Kultur und französischem Flair'
  },
  {
    id: 'halong',
    name: 'Ha-Long-Bucht',
    lat: 20.9101,
    lng: 107.1839,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Hạ_Long_Bay',
    highlights: 'UNESCO-Karstfelsen, Dschunken-Kreuzfahrt, Sung-Sot-Höhle, Schwimmende Dörfer',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bootsfahrten mit Baby heikel, enge Kabinen und eingeschränkte Bewegungsfreiheit' },
      '1-3':  { rating: 'yellow', note: 'Bootsgeländer nicht kindersicher, Schwimmwesten-Pflicht und wenig Auslauf' },
      '3-6':  { rating: 'green', note: 'Höhlenbesichtigungen, Kajakfahren und Schwimmen begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Kajak-Abenteuer, Höhlen erkunden und schwimmende Dörfer entdecken' },
      '12+':  { rating: 'green', note: 'Klettern, Tauchen, Kajaktouren und spektakuläre Sonnenuntergänge' }
    },
    desc: 'UNESCO-Welterbe mit fast 2.000 Kalksteinfelsen, die wie Drachenzähne aus dem smaragdgrünen Meer ragen',
    dayTripFrom: [{ base: 'hanoi', transit: '~2.5h Bus' }]
  },
  {
    id: 'hoian',
    name: 'Hoi An',
    lat: 15.8794,
    lng: 108.3350,
    tags: ['Kultur', 'Kulinarik', 'Geschichte'],
    wiki: 'Hội_An',
    highlights: 'Japanische Brücke, Laternen-Altstadt (UNESCO), Schneiderkunst, An-Bang-Strand',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flache Altstadt, buggyfreundlich, gute Kliniken und ruhige Atmosphäre' },
      '1-3':  { rating: 'green', note: 'Strand An Bang zum Planschen, Laternen basteln und Fahrrad-Rikschas' },
      '3-6':  { rating: 'green', note: 'Kochkurse für Kinder, Laternen-Workshops und Strandspielplätze' },
      '6-12': { rating: 'green', note: 'Radtouren, Laternen basteln, Kochkurse und Schneiderei-Erlebnis' },
      '12+':  { rating: 'green', note: 'Kochkurse, Schneider-Shopping, Radtouren und Strandtage' }
    },
    desc: 'Märchenhafte UNESCO-Handelsstadt mit Hunderten bunter Laternen, berühmt für maßgeschneiderte Kleidung und Cao Lau-Nudeln'
  },
  {
    id: 'hue',
    name: 'Hue',
    altName: 'Huế',
    lat: 16.4619,
    lng: 107.5955,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Huế',
    highlights: 'Kaiserliche Zitadelle (UNESCO), Königsgräber, Parfümfluss, Thien-Mu-Pagode',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Stadt, gute Infrastruktur, flache Wege entlang des Parfümflusses' },
      '1-3':  { rating: 'green', note: 'Bootsfahrten auf dem Parfümfluss, schattige Pagoden-Gärten und Parks' },
      '3-6':  { rating: 'green', note: 'Zitadelle wie eine Ritterburg, Drachenboote und königliche Gärten' },
      '6-12': { rating: 'green', note: 'Kaiserpalast, Königsgräber und spannende Geschichten über Dynastien' },
      '12+':  { rating: 'green', note: 'Geschichte, königliche Küche, Parfümfluss-Bootsfahrt und Fotomotive' }
    },
    desc: 'Vietnams ehemalige Kaiserstadt mit der prachtvollen Zitadelle und der feinsten königlichen Küche des Landes'
  },
  {
    id: 'danang',
    name: 'Da Nang',
    lat: 16.0678,
    lng: 108.2208,
    tags: ['Großstadt', 'Erholung', 'Abenteuer'],
    wiki: 'Da_Nang',
    highlights: 'Goldene Brücke (Ba Na Hills), Marble Mountains, My-Khe-Strand, Drachenbrücke',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Moderne Stadt, internationales Krankenhaus, flache Strandpromenade' },
      '1-3':  { rating: 'green', note: 'Breiter Sandstrand My Khe, Spielplätze und familienfreundliche Resorts' },
      '3-6':  { rating: 'green', note: 'Ba-Na-Hills-Freizeitpark, Strand und die beeindruckende Drachenbrücke' },
      '6-12': { rating: 'green', note: 'Marble Mountains klettern, Ba Na Hills und Drachenbrücken-Feuershow' },
      '12+':  { rating: 'green', note: 'Surfen, Ba Na Hills, Nachtleben an der Strandpromenade' }
    },
    desc: 'Moderne Küstenstadt mit spektakulären Brücken, herrlichen Stränden und dem ikonischen Goldene-Hände-Bauwerk'
  },
  {
    id: 'sapa',
    name: 'Sa Pa',
    lat: 22.3364,
    lng: 103.8438,
    tags: ['Natur', 'Kultur', 'Abenteuer'],
    wiki: 'Sa_Pa',
    highlights: 'Reisterrassen, Fansipan-Gipfel (3.143m), Hmong-Märkte, Trekking durch Bergdörfer',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Steile Bergpfade, 1.600m Höhe, kühles Klima und keine gute Klinik' },
      '1-3':  { rating: 'red', note: 'Steile Trekkingwege, Kälte und eingeschränkte medizinische Versorgung' },
      '3-6':  { rating: 'yellow', note: 'Reisterrassen faszinierend, aber anstrengende Wanderungen und kühles Wetter' },
      '6-12': { rating: 'green', note: 'Trekking durch Bergdörfer, Hmong-Märkte und Reisterrassen-Abenteuer' },
      '12+':  { rating: 'green', note: 'Fansipan-Seilbahn, Trekking, Bergvölker-Kultur und Fotomotive' }
    },
    desc: 'Nebelverhangene Bergstadt mit spektakulären Reisterrassen und farbenfrohen ethnischen Minderheiten der Hmong und Dao'
  },
  {
    id: 'nhatrang',
    name: 'Nha Trang',
    lat: 12.2451,
    lng: 109.1943,
    tags: ['Erholung', 'Abenteuer'],
    wiki: 'Nha_Trang',
    highlights: 'Strandpromenade, Schnorcheln/Tauchen, Po-Nagar-Cham-Türme, VinWonders-Freizeitpark',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flacher Strand, internationale Resorts mit Babysitting und gute Kliniken' },
      '1-3':  { rating: 'green', note: 'Kinderpools in Resorts, flacher Sandstrand und VinWonders-Freizeitpark' },
      '3-6':  { rating: 'green', note: 'VinWonders-Freizeitpark, Inselbootstouren und Schnorcheln am Strand' },
      '6-12': { rating: 'green', note: 'Schnorcheln, Freizeitpark VinWonders und Bootsausflüge zu Inseln' },
      '12+':  { rating: 'green', note: 'Tauchen, Wassersport, Nachtleben und Inselhopping' }
    },
    desc: 'Vietnams beliebteste Strandstadt mit kristallklarem Wasser, vorgelagerten Inseln und lebhaftem Nachtleben'
  },
  {
    id: 'phuquoc',
    name: 'Phu Quoc',
    altName: 'Phú Quốc',
    lat: 10.2240,
    lng: 103.9543,
    tags: ['Erholung', 'Natur'],
    wiki: 'Phú_Quốc',
    highlights: 'Sao-Strand, Fischsaucen-Fabriken, Schnorcheln, Sonnenuntergang am Long Beach',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Resortinsel, gute Infrastruktur und flache Strände zum Krabbeln' },
      '1-3':  { rating: 'green', note: 'Flache Strände, Kinderpools und familienfreundliche Resorts überall' },
      '3-6':  { rating: 'green', note: 'VinWonders-Park, Safari-Zoo, Sternewarte und Strandspielplätze' },
      '6-12': { rating: 'green', note: 'Schnorcheln, Kajak, Safari-Zoo und Nachtmarkt-Erkundungen' },
      '12+':  { rating: 'green', note: 'Tauchen, Jetski, Nachtmarkt und entspannte Strandtage' }
    },
    desc: 'Vietnams größte Insel im Golf von Thailand, bekannt für traumhafte Strände, Perlenzucht und berühmte Fischsauce'
  },
  {
    id: 'ninhbinh',
    name: 'Ninh Binh',
    altName: 'Trang An / Tam Coc',
    lat: 20.2581,
    lng: 105.9797,
    tags: ['Natur', 'Geschichte', 'Kultur'],
    wiki: 'Ninh_Bình_province',
    highlights: 'Trang An UNESCO-Komplex, Tam-Coc-Bootsfahrt, Bai-Dinh-Pagode, Mua-Höhlen-Aussicht',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bootsfahrten eng mit Baby, ländliche Gegend mit begrenzter Versorgung' },
      '1-3':  { rating: 'green', note: 'Gemütliche Ruderbootfahrten durch Tam Coc, flache Radwege verfügbar' },
      '3-6':  { rating: 'green', note: 'Bootsfahrten durch Grotten, Ziegen auf der Mua-Höhle und Radtouren' },
      '6-12': { rating: 'green', note: 'Mua-Höhle besteigen, Trang-An-Bootstour und Radfahren durch Reisfelder' },
      '12+':  { rating: 'green', note: 'Kajakfahren, Klettern auf Mua Cave und historische Tempel erkunden' }
    },
    desc: 'Die "Ha-Long-Bucht an Land" mit majestätischen Karstfelsen, verwunschenen Flusslandschaften und der alten Hauptstadt Hoa Lu',
    dayTripFrom: [{ base: 'hanoi', transit: '~2h Bus/Zug' }]
  },
  {
    id: 'dalat',
    name: 'Da Lat',
    altName: 'Đà Lạt',
    lat: 11.9465,
    lng: 108.4419,
    tags: ['Natur', 'Erholung', 'Kultur'],
    wiki: 'Da_Lat',
    highlights: 'Crazy House, Blumengärten, Kaffee-Plantagen, Canyoning-Abenteuer',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: '1.500m Höhe mit kühlem Klima, kurvenreiche Anreise und begrenzte Kliniken' },
      '1-3':  { rating: 'green', note: 'Blumengärten, angenehmes Klima und Seilbahnfahrten begeistern Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Crazy House, Blumengärten, Erdbeerpflücken und Seilbahn-Abenteuer' },
      '6-12': { rating: 'green', note: 'Canyoning light, Crazy House erkunden und Kaffee-Plantagen besuchen' },
      '12+':  { rating: 'green', note: 'Canyoning, Mountainbiking, Kaffeekultur und coole Cafés' }
    },
    desc: 'Die "Stadt des ewigen Frühlings" auf 1.500m Höhe mit französischer Kolonialarchitektur, Blumenfeldern und kühlem Klima'
  },
  {
    id: 'phongnha',
    name: 'Phong Nha',
    lat: 17.5357,
    lng: 106.1507,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Phong_Nha_–_Kẻ_Bàng_National_Park',
    highlights: 'Son-Doong-Höhle (größte der Welt), Paradise Cave, Dark Cave Zipline, Phong-Nha-Höhle',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Sehr abgelegen, keine gute medizinische Versorgung, Dschungelgebiet' },
      '1-3':  { rating: 'red', note: 'Höhlenwege rutschig und dunkel, lange Anfahrt und kaum Infrastruktur' },
      '3-6':  { rating: 'yellow', note: 'Einfachere Höhlen machbar, aber Dunkelheit kann Kinder ängstigen' },
      '6-12': { rating: 'green', note: 'Dark Cave Zipline, Paradise Cave und Dschungel-Abenteuer begeistern' },
      '12+':  { rating: 'green', note: 'Höhlen-Trekking, Zipline, Kayaking und echtes Abenteuer-Feeling' }
    },
    desc: 'UNESCO-Nationalpark mit der größten Höhle der Welt und über 300 unterirdischen Grotten im Dschungel Zentralvietnams'
  },
  {
    id: 'cantho',
    name: 'Mekong-Delta / Can Tho',
    lat: 10.0452,
    lng: 105.7469,
    tags: ['Kultur', 'Natur', 'Kulinarik'],
    wiki: 'Cần_Thơ',
    highlights: 'Cai-Rang-Schwimmender-Markt, Sampan-Bootsfahrten, Obstgärten, Reisfelder',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bootsfahrten mit Baby riskant, Hitze und feuchtes Klima belastend' },
      '1-3':  { rating: 'yellow', note: 'Wackelige Boote mit Kleinkindern anstrengend, aber Obstgärten machen Spaß' },
      '3-6':  { rating: 'green', note: 'Schwimmende Märkte, Obstgärten besuchen und Sampan-Bootsfahrten erleben' },
      '6-12': { rating: 'green', note: 'Schwimmende Märkte, Reisfelder erkunden und exotische Früchte probieren' },
      '12+':  { rating: 'green', note: 'Authentisches Dorfleben, Radtouren und Mekong-Bootsabenteuer' }
    },
    desc: 'Das grüne Labyrinth des Mekong-Deltas, wo das Leben auf dem Wasser stattfindet und Obst direkt vom Boot verkauft wird',
    dayTripFrom: [{ base: 'hochiminh', transit: '~3h Bus' }]
  },
  {
    id: 'muine',
    name: 'Mui Ne',
    altName: 'Mũi Né / Phan Thiet',
    lat: 10.9333,
    lng: 108.2833,
    tags: ['Erholung', 'Abenteuer', 'Natur'],
    wiki: 'Mũi_Né',
    highlights: 'Rote & weiße Sanddünen, Fairy Stream, Kitesurfen, Fischerdorf',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Sandige Hitze und wenig Schatten, aber Resorts bieten gute Babyausstattung' },
      '1-3':  { rating: 'green', note: 'Fairy Stream zum Plantschen, flacher Strand und Resort-Kinderpools' },
      '3-6':  { rating: 'green', note: 'Sanddünen-Rutschpartien, Fairy Stream und Sandburgen am Strand' },
      '6-12': { rating: 'green', note: 'Dünen-Sandboarding, Fairy Stream erkunden und Fischerdorf besuchen' },
      '12+':  { rating: 'green', note: 'Kitesurfen, Quad-Touren auf Dünen und lebhafte Strandszene' }
    },
    desc: 'Küstenort mit surrealen Sanddünenlandschaften, weltklasse Kitesurfen und einem malerischen Fischerdorf'
  },
  {
    id: 'hagiang',
    name: 'Ha Giang',
    lat: 22.8233,
    lng: 104.9836,
    tags: ['Abenteuer', 'Natur', 'Kultur'],
    wiki: 'Hà_Giang_province',
    highlights: 'Ha-Giang-Loop (Motorradtour), Dong-Van-Karstplateau (UNESCO), Ma-Pi-Leng-Pass, Sonntagsmarkt',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem abgelegen, gefährliche Bergstraßen, keine medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Haarnadelkurven, keine Leitplanken und stundenlange Motorrad-Etappen' },
      '3-6':  { rating: 'red', note: 'Gefährliche Passstraßen, sehr abgelegen und kaum Kinderinfrastruktur' },
      '6-12': { rating: 'yellow', note: 'Spektakuläre Landschaft, aber nur mit erfahrenem Fahrer und gutem Fahrzeug' },
      '12+':  { rating: 'yellow', note: 'Legendärer Motorrad-Loop, aber nur für abenteuerlustige Teenager geeignet' }
    },
    desc: 'Vietnams nördlichste Provinz mit dem legendären Motorrad-Loop durch dramatische Karstlandschaften und Bergvölker-Dörfer'
  },

  // ===== OFF THE BEATEN PATH (9) =====
  {
    id: 'catba',
    name: 'Cat Ba / Lan Ha Bucht',
    lat: 20.7278,
    lng: 107.0482,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Cát_Bà_Island',
    highlights: 'Lan-Ha-Bucht (ruhigere Alternative zu Ha Long), Nationalpark, Felsklettern, Kajak',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bootsfahrten mit Baby heikel, begrenzte Infrastruktur auf der Insel' },
      '1-3':  { rating: 'yellow', note: 'Steile Inselpfade und Bootstouren herausfordernd mit Kleinkindern' },
      '3-6':  { rating: 'green', note: 'Kajakfahren, Strand und ruhigere Alternative zu Ha Long begeistert Kinder' },
      '6-12': { rating: 'green', note: 'Felsklettern, Kajak-Abenteuer und Nationalpark-Wanderungen' },
      '12+':  { rating: 'green', note: 'Klettern, Tauchen, Kajaktouren und entspanntes Insel-Feeling' }
    },
    desc: 'Die wildere, ruhigere Schwester der Ha-Long-Bucht mit einem UNESCO-Biosphärenreservat und fantastischem Klettern'
  },
  {
    id: 'caobang',
    name: 'Cao Bang / Ban Gioc',
    lat: 22.6705,
    lng: 106.2500,
    tags: ['Natur', 'Abenteuer', 'Geschichte'],
    wiki: 'Cao_Bằng_province',
    highlights: 'Ban-Gioc-Wasserfall (Grenze zu China), Nguom-Ngao-Höhle, Pac-Bo-Höhle, Bergserpentinen',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Sehr abgelegen, lange Bergstraßen, keine medizinische Versorgung vor Ort' },
      '1-3':  { rating: 'red', note: 'Stundenlange Anfahrt auf Bergstraßen, kaum Infrastruktur für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Ban-Gioc-Wasserfall beeindruckend, aber lange Anreise und wenig Komfort' },
      '6-12': { rating: 'yellow', note: 'Wasserfall und Höhlen spannend, aber abgelegen und lange Fahrtzeiten' },
      '12+':  { rating: 'green', note: 'Abenteuerliche Bergstraßen, spektakulärer Wasserfall und Grenzgebiet-Flair' }
    },
    desc: 'Abgelegene Bergprovinz an der chinesischen Grenze mit Vietnams spektakulärstem Wasserfall und revolutionären Geschichtsstätten'
  },
  {
    id: 'maichau',
    name: 'Mai Chau',
    altName: 'Mai Châu',
    lat: 20.6670,
    lng: 105.0830,
    tags: ['Natur', 'Kultur', 'Erholung'],
    wiki: 'Mai_Châu_district',
    highlights: 'Stelzenhäuser der Thai-Minderheit, Reisfelder-Radtouren, Homestays, Webkunst',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Einfache Homestays ohne Babyausstattung, ländlich und begrenzte Versorgung' },
      '1-3':  { rating: 'green', note: 'Reisfelder zum Entdecken, ruhige Umgebung und freundliche Dorfbewohner' },
      '3-6':  { rating: 'green', note: 'Radtouren durch Reisfelder, Stelzenhäuser und Webkunst-Workshops' },
      '6-12': { rating: 'green', note: 'Fahrradtouren, Homestay-Erlebnis und traditionelle Thai-Kultur erleben' },
      '12+':  { rating: 'green', note: 'Trekking, Radtouren, authentisches Dorfleben und kulturelle Begegnungen' }
    },
    desc: 'Idyllisches Bergtal nur 3 Stunden von Hanoi, wo man in traditionellen Thai-Stelzenhäusern übernachtet und durch Reisfelder radelt',
    dayTripFrom: [{ base: 'hanoi', transit: '~3h Bus' }]
  },
  {
    id: 'quynhon',
    name: 'Quy Nhon',
    altName: 'Quy Nhơn',
    lat: 13.7765,
    lng: 109.2237,
    tags: ['Erholung', 'Geschichte', 'Kulinarik'],
    wiki: 'Quy_Nhon',
    highlights: 'Unberührte Strände, Cham-Türme Banh It, Bai-Xep-Fischerdorf, Meeresfrüchte-Küche',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Ruhige Küstenstadt, aber begrenzte internationale Infrastruktur und Kliniken' },
      '1-3':  { rating: 'green', note: 'Ruhige Strände ohne Massentourismus, sicheres Planschen und frischer Fisch' },
      '3-6':  { rating: 'green', note: 'Leere Strände zum Sandburgen-Bauen und Fischerdörfer zum Entdecken' },
      '6-12': { rating: 'green', note: 'Cham-Ruinen erkunden, Strandabenteuer und leckere Meeresfrüchte' },
      '12+':  { rating: 'green', note: 'Authentische Atmosphäre, Surfen, Cham-Geschichte und Seafood-Genuss' }
    },
    desc: 'Verschlafene Küstenstadt mit unberührten Stränden, alten Cham-Ruinen und der besten Meeresfrüchteküche Zentralvietnams'
  },
  {
    id: 'condao',
    name: 'Con Dao',
    altName: 'Côn Đảo',
    lat: 8.6832,
    lng: 106.6063,
    tags: ['Natur', 'Erholung', 'Geschichte'],
    wiki: 'Côn_Đảo',
    highlights: 'Meeresschildkröten-Nistplätze, Kolonial-Gefängnismuseum, Einsame Strände, Tauchen',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegene Insel, nur per Flug erreichbar, minimale medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Kaum Infrastruktur für Kleinkinder, wenige Restaurants und abgelegen' },
      '3-6':  { rating: 'yellow', note: 'Schöne Strände, aber Gefängnismuseum verstörend und wenig Kinderangebote' },
      '6-12': { rating: 'yellow', note: 'Schildkröten-Beobachtung faszinierend, aber Gefängnisgeschichte schwer verdaulich' },
      '12+':  { rating: 'green', note: 'Tauchen, Schildkröten-Nistplätze, Geschichte und Robinson-Crusoe-Feeling' }
    },
    desc: 'Abgelegenes Inselarchipel mit dunkler Gefängnisgeschichte, unberührten Stränden und den besten Tauchrevieren Vietnams'
  },
  {
    id: 'tamdao',
    name: 'Tam Dao',
    altName: 'Tam Đảo',
    lat: 21.4583,
    lng: 105.6417,
    tags: ['Natur', 'Erholung'],
    wiki: 'Tam_Đảo_National_Park',
    highlights: 'Französische Bergstation, Nebelwälder, Nationalpark, Silberwasserfall',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bergstation auf 930m, kühles Klima und eingeschränkte medizinische Versorgung' },
      '1-3':  { rating: 'green', note: 'Angenehm kühl, Nationalpark-Spaziergänge und kurze Anreise von Hanoi' },
      '3-6':  { rating: 'green', note: 'Wasserfälle, Nebel-Wälder erkunden und angenehmes Klima zum Spielen' },
      '6-12': { rating: 'green', note: 'Nationalpark-Wanderungen, Silberwasserfall und mystische Nebelwälder' },
      '12+':  { rating: 'green', note: 'Trekking, Vogelbeobachtung und entspannte Bergluft nahe Hanoi' }
    },
    desc: 'Kühle französische Bergstation auf 930m Höhe, nur 85 km von Hanoi, eingehüllt in mystischen Nebel und üppige Wälder'
  },
  {
    id: 'kontum',
    name: 'Kon Tum',
    lat: 14.3545,
    lng: 108.0076,
    tags: ['Kultur', 'Abenteuer', 'Natur'],
    wiki: 'Kon_Tum',
    highlights: 'Bahnar-Rong-Häuser, Holzkirche, Ethnische Dörfer, Trekking im Hochland',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegen im Hochland, keine internationale Klinik, kaum Babyausstattung' },
      '1-3':  { rating: 'yellow', note: 'Wenig Infrastruktur für Kleinkinder, aber ruhige und sichere Umgebung' },
      '3-6':  { rating: 'yellow', note: 'Dorfbesuche interessant, aber wenig kinderspezifische Aktivitäten' },
      '6-12': { rating: 'green', note: 'Rong-Gemeinschaftshäuser bestaunen, Dorfkultur und Hochland-Natur erleben' },
      '12+':  { rating: 'green', note: 'Ethnische Kulturen, Trekking und authentisches Hochland-Erlebnis abseits Tourismus' }
    },
    desc: 'Entspannte Hochlandstadt, Tor zu den Bahnar- und Jarai-Bergvölkern mit ihren einzigartigen Gemeinschaftshäusern'
  },
  {
    id: 'phuyen',
    name: 'Phu Yen',
    altName: 'Tuy Hoa',
    lat: 13.0956,
    lng: 109.3188,
    tags: ['Natur', 'Erholung'],
    wiki: 'Phú_Yên_province',
    highlights: 'Da-Dia-Basaltklippen, Ganh-Da-Dia-Riff, Bai-Mon-Strand, Vung-Ro-Bucht',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegene Küstenregion, wenig touristische Infrastruktur und begrenzte Kliniken' },
      '1-3':  { rating: 'yellow', note: 'Wenig kinderfreundliche Einrichtungen, aber ruhige Strände zum Planschen' },
      '3-6':  { rating: 'green', note: 'Basaltklippen wie Riesenpuzzle, leere Strände und Fischerboote bestaunen' },
      '6-12': { rating: 'green', note: 'Basaltsäulen erkunden, einsame Buchten und Natur pur erleben' },
      '12+':  { rating: 'green', note: 'Unentdeckte Küste, Fotomotive und authentisches Vietnam abseits Tourismus' }
    },
    desc: 'Vietnams östlichster Punkt mit bizarren Basaltsäulen-Formationen, menschenleeren Buchten und echtem Lokalkolorit'
  },
  {
    id: 'vungtau',
    name: 'Vung Tau',
    altName: 'Vũng Tàu',
    lat: 10.3460,
    lng: 107.0843,
    tags: ['Erholung', 'Geschichte'],
    wiki: 'Vũng_Tàu',
    highlights: 'Jesus-Statue (32m), Leuchtturm, Back Beach, Französische Festungsruinen',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Nahe Saigon, gute Infrastruktur, Krankenhäuser und flache Strände' },
      '1-3':  { rating: 'green', note: 'Flache Strände, Fähre als Erlebnis und viele vietnamesische Familien vor Ort' },
      '3-6':  { rating: 'green', note: 'Strandspiele, Jesus-Statue bestaunen und Leuchtturm-Abenteuer' },
      '6-12': { rating: 'green', note: 'Leuchtturm besteigen, Strände erkunden und Meeresfrüchte am Strand' },
      '12+':  { rating: 'green', note: 'Entspannte Strandtage, historische Festungen und lokale Atmosphäre' }
    },
    desc: 'Beliebtes Wochenendausflugsziel der Saigoner mit einer 32m-Christusstatue und entspannter Strandatmosphäre',
    dayTripFrom: [{ base: 'hochiminh', transit: '~2h Bus/Fähre' }]
  }
];
