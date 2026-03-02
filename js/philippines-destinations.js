/* ============================================
   PHILIPPINES-DESTINATIONS.JS – Datenbank aller Philippinen-Ziele
   ============================================ */

const PHILIPPINES_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'manila',
    name: 'Manila',
    altName: 'Metro Manila',
    lat: 14.5995,
    lng: 120.9842,
    tags: ['Großstadt', 'Geschichte', 'Kulinarik'],
    wiki: 'Manila',
    highlights: 'Intramuros, Rizal Park, Binondo Chinatown, BGC, Manila Ocean Park',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Verkehr, Lärm und Luftverschmutzung belasten Babys – kurze Aufenthalte ok' },
      '1-3':  { rating: 'yellow', note: 'Chaotischer Verkehr und wenig Gehwege – Buggy kaum nutzbar' },
      '3-6':  { rating: 'yellow', note: 'Manila Ocean Park und Rizal Park kindgerecht, ansonsten anstrengend' },
      '6-12': { rating: 'green', note: 'Intramuros, Museen und Chinatown bieten spannende Entdeckungen' },
      '12+':  { rating: 'green', note: 'Shopping in BGC, Geschichte in Intramuros und vielfältige Streetfood-Szene' }
    },
    desc: 'Philippinens pulsierende Hauptstadt mit spanischer Kolonialgeschichte und dem ältesten Chinatown der Welt'
  },
  {
    id: 'cebu',
    name: 'Cebu City',
    altName: 'Queen City of the South',
    lat: 10.3157,
    lng: 123.8854,
    tags: ['Großstadt', 'Geschichte', 'Kulinarik'],
    wiki: 'Cebu_City',
    highlights: 'Magellan-Kreuz, Basilica del Santo Niño, Temple of Leah, Lechón',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Gute Resort-Infrastruktur, Krankenhäuser und Supermärkte vorhanden' },
      '1-3':  { rating: 'green', note: 'Strandresorts mit Pools, flache Strände und kinderfreundliche Hotels' },
      '3-6':  { rating: 'green', note: 'Strände, Aquarium und kindgerechte Bootstouren machen Spaß' },
      '6-12': { rating: 'green', note: 'Walhai-Schwimmen ab 6 möglich, Schnorcheln und Inselhopping begeistern' },
      '12+':  { rating: 'green', note: 'Tauchen, Canyoneering und Walhai-Erlebnisse für Abenteuerlustige' }
    },
    desc: 'Historische Hafenstadt und Wiege des Christentums in Asien – berühmt für Sinulog-Festival und das beste Lechón'
  },
  {
    id: 'elnido',
    name: 'El Nido',
    lat: 11.1955,
    lng: 119.4075,
    tags: ['Natur', 'Abenteuer', 'Erholung'],
    wiki: 'El_Nido,_Palawan',
    highlights: 'Island Hopping, Big & Small Lagoon, Secret Beach, Nacpan Beach',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen, lange Bootsfahrten und wenig medizinische Versorgung' },
      '1-3':  { rating: 'yellow', note: 'Island-Hopping mit Kleinkind anstrengend, einfache Unterkünfte' },
      '3-6':  { rating: 'yellow', note: 'Bootstouren möglich, aber Lagunen-Einstiege teils nur kletternd erreichbar' },
      '6-12': { rating: 'green', note: 'Lagunen, Schnorcheln und Kajakfahren – ein echtes Abenteuerparadies' },
      '12+':  { rating: 'green', note: 'Island-Hopping, Klettern und Tauchen sind unvergessliche Erlebnisse' }
    },
    desc: 'Paradiesisches Inselparadies in Palawan mit türkisblauen Lagunen und dramatischen Kalksteinfelsen'
  },
  {
    id: 'boracay',
    name: 'Boracay',
    lat: 11.9674,
    lng: 121.9249,
    tags: ['Erholung', 'Abenteuer', 'Kulinarik'],
    wiki: 'Boracay',
    highlights: 'White Beach, Puka Shell Beach, Kitesurfen, Sonnenuntergänge, Nachtleben',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flacher Strand, gute Resort-Infrastruktur und Apotheken vorhanden' },
      '1-3':  { rating: 'green', note: 'White Beach ideal zum Planschen, viele familienfreundliche Resorts' },
      '3-6':  { rating: 'green', note: 'Sandburgen, Glasbodenboote und flaches warmes Wasser perfekt für Kids' },
      '6-12': { rating: 'green', note: 'Schnorcheln, Helmet-Diving und Inselhopping sorgen für Begeisterung' },
      '12+':  { rating: 'green', note: 'Kitesurfen, Stand-Up-Paddling und lebendige Inselatmosphäre' }
    },
    desc: 'Weltberühmte Tropeninsel mit puderweißem White Beach und spektakulären Sonnenuntergängen'
  },
  {
    id: 'siargao',
    name: 'Siargao',
    altName: 'Surfing Capital',
    lat: 9.8482,
    lng: 126.0458,
    tags: ['Abenteuer', 'Natur', 'Erholung'],
    wiki: 'Siargao',
    highlights: 'Cloud 9 Surfspot, Magpupungko Tide Pools, Sugba Lagoon, Inselhopping',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Sehr abgelegen, kaum medizinische Versorgung und einfache Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Lange Anreise, wenig Kleinkind-Infrastruktur, starke Strömungen' },
      '3-6':  { rating: 'yellow', note: 'Naturpools bei Magpupungko toll, aber Strände teils mit starker Brandung' },
      '6-12': { rating: 'green', note: 'Lagunen, Inselhopping und erste Surfversuche begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Surfen lernen, Inselhopping und entspannter Backpacker-Vibe ideal für Teens' }
    },
    desc: 'Surfhauptstadt der Philippinen mit legendärem Cloud-9-Break und entspanntem Insel-Vibe'
  },
  {
    id: 'palawan',
    name: 'Puerto Princesa',
    lat: 9.7392,
    lng: 118.7353,
    tags: ['Natur', 'Abenteuer', 'Geschichte'],
    wiki: 'Puerto_Princesa',
    highlights: 'Underground River (UNESCO), Honda Bay, Iwahig, Firefly-Watching',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Begrenzte Infrastruktur außerhalb der Stadt, aber Hotels familientauglich' },
      '1-3':  { rating: 'yellow', note: 'Underground River mit Boot möglich, aber Honda Bay teils wackelig' },
      '3-6':  { rating: 'green', note: 'Underground River fasziniert Kinder, Honda Bay Schnorcheln kindgerecht' },
      '6-12': { rating: 'green', note: 'Firefly-Watching, Höhlenfahrt und Inselhopping begeistern Kinder' },
      '12+':  { rating: 'green', note: 'UNESCO-Underground-River, Kajakfahren und Schnorcheln sehr erlebnisreich' }
    },
    desc: 'Tor zum schönsten Inselparadies – mit dem längsten schiffbaren unterirdischen Fluss der Welt (UNESCO)'
  },
  {
    id: 'coron',
    name: 'Coron',
    lat: 12.0000,
    lng: 120.2000,
    tags: ['Natur', 'Abenteuer', 'Erholung'],
    wiki: 'Coron,_Palawan',
    highlights: 'Kayangan Lake, Twin Lagoon, WWII-Schiffswracks, Barracuda Lake',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegen, Bootstouren anstrengend und kaum Baby-Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Lange Bootsfahrten, steile Aufstiege zu Kayangan Lake schwierig' },
      '3-6':  { rating: 'yellow', note: 'Schnorcheln möglich, aber viele Spots nur über steile Leitern erreichbar' },
      '6-12': { rating: 'green', note: 'Schnorcheln bei Wracks, kristallklare Seen und Lagunen faszinieren' },
      '12+':  { rating: 'green', note: 'Wrack-Tauchen, Kayangan Lake und spektakuläre Unterwasserwelt' }
    },
    desc: 'Tauch- und Schnorchelparadies mit kristallklaren Seen und versunkenen Weltkriegswracks'
  },
  {
    id: 'bohol',
    name: 'Bohol',
    altName: 'Tagbilaran',
    lat: 9.8500,
    lng: 124.0000,
    tags: ['Natur', 'Kultur', 'Abenteuer'],
    wiki: 'Bohol',
    highlights: 'Chocolate Hills, Tarsier-Schutzgebiet, Loboc River, Panglao-Strände',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Panglao-Resorts familienfreundlich, Tarsier-Besuch im Schatten möglich' },
      '1-3':  { rating: 'green', note: 'Chocolate Hills per Auto erreichbar, Loboc River Cruise kindgerecht' },
      '3-6':  { rating: 'green', note: 'Tarsiere beobachten, Bootsfahrt und flache Strände begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Chocolate Hills, Tarsier-Schutzgebiet und Zip-Line sorgen für Staunen' },
      '12+':  { rating: 'green', note: 'Tauchen in Panglao, SUP auf dem Loboc River und Natur pur' }
    },
    desc: 'Naturwunder-Insel mit den ikonischen Chocolate Hills und den kleinsten Primaten der Welt'
  },
  {
    id: 'vigan',
    name: 'Vigan',
    altName: 'Ciudad Fernandina',
    lat: 17.5747,
    lng: 120.3869,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Vigan',
    highlights: 'Calle Crisologo (UNESCO), Kalesa-Kutschfahrt, Heritage-Häuser, Vigan Empanada',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Ruhig, aber Kopfsteinpflaster für Buggy unpraktisch, Hitze belastend' },
      '1-3':  { rating: 'green', note: 'Kalesa-Kutschfahrt begeistert Kleinkinder, überschaubares Zentrum' },
      '3-6':  { rating: 'green', note: 'Pferdekutschen, Empanada-Probieren und Bummel durch bunte Gassen' },
      '6-12': { rating: 'green', note: 'Lebendige Geschichte, Kutschfahrten und leckere Vigan-Empanadas' },
      '12+':  { rating: 'green', note: 'UNESCO-Altstadt, Kolonialgeschichte und authentische Ilocano-Küche' }
    },
    desc: 'Am besten erhaltene spanische Kolonialstadt Asiens (UNESCO) mit Kopfsteinpflastergassen und Pferdekutschen'
  },
  {
    id: 'banaue',
    name: 'Banaue',
    altName: 'Ifugao Rice Terraces',
    lat: 16.9186,
    lng: 121.0525,
    tags: ['Natur', 'Kultur', 'Abenteuer'],
    wiki: 'Banaue_Rice_Terraces',
    highlights: 'Reisterrassen (UNESCO), Batad, Tappiya-Wasserfall, Ifugao-Kultur',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Kurvige Bergstraßen, abgelegen und kaum medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Steile Wanderwege, lange Anfahrt und keine Kleinkind-Infrastruktur' },
      '3-6':  { rating: 'yellow', note: 'Aussichtspunkte per Auto erreichbar, aber Wanderungen zu anstrengend' },
      '6-12': { rating: 'green', note: 'Reisterrassen-Wanderungen lehrreich, Ifugao-Kultur faszinierend' },
      '12+':  { rating: 'green', note: 'Trekking nach Batad, Wasserfälle und UNESCO-Welterbe hautnah erleben' }
    },
    desc: 'Über 2.000 Jahre alte Reisterrassen in den Bergen – das achte Weltwunder auf 1.500m Höhe'
  },
  {
    id: 'baguio',
    name: 'Baguio',
    altName: 'Summer Capital',
    lat: 16.4023,
    lng: 120.5960,
    tags: ['Kultur', 'Erholung', 'Natur'],
    wiki: 'Baguio',
    highlights: 'Burnham Park, Mines View Park, BenCab Museum, Strawberry Farm',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Angenehm kühles Klima, Parks und gute medizinische Versorgung' },
      '1-3':  { rating: 'green', note: 'Burnham Park mit Tretbooten, Erdbeerpflücken und milde Temperaturen' },
      '3-6':  { rating: 'green', note: 'Erdbeerfarmen, Ponyreiten im Park und Mines View Park begeistern' },
      '6-12': { rating: 'green', note: 'Erdbeerpflücken, Museen und botanischer Garten bieten viel Abwechslung' },
      '12+':  { rating: 'green', note: 'Kunstszene, coole Cafés und angenehmes Bergklima als Kontrast zur Hitze' }
    },
    desc: 'Kühle Sommerhauptstadt in den Bergen auf 1.500m – bekannt für Erdbeeren, Kunstszene und mildes Klima'
  },
  {
    id: 'dumaguete',
    name: 'Dumaguete',
    altName: 'City of Gentle People',
    lat: 9.3068,
    lng: 123.3055,
    tags: ['Erholung', 'Natur', 'Kulinarik'],
    wiki: 'Dumaguete',
    highlights: 'Rizal Boulevard, Apo Island (Tauchen), Twin Lakes, Casaroro Falls',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Stadt, gute Krankenhäuser und entspannte Atmosphäre' },
      '1-3':  { rating: 'green', note: 'Boulevard zum Spazieren, ruhige Strände und freundliche Einheimische' },
      '3-6':  { rating: 'green', note: 'Rizal Boulevard, Twin Lakes und kinderfreundliche Strandresorts' },
      '6-12': { rating: 'green', note: 'Schnorcheln auf Apo Island, Wasserfälle und Schildkröten beobachten' },
      '12+':  { rating: 'green', note: 'Tauchen auf Apo Island, Canyoneering und entspannte Unistadt-Atmosphäre' }
    },
    desc: 'Charmante Universitätsstadt am Meer mit tollem Tauchen auf Apo Island und entspannter Atmosphäre'
  },
  {
    id: 'iloilo',
    name: 'Iloilo City',
    altName: 'City of Love',
    lat: 10.7202,
    lng: 122.5620,
    tags: ['Kultur', 'Geschichte', 'Kulinarik'],
    wiki: 'Iloilo_City',
    highlights: 'Dinagyang Festival, Miag-ao Kirche (UNESCO), Heritage District, La Paz Batchoy',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Überschaubare Stadt mit guter Infrastruktur und Krankenhäusern' },
      '1-3':  { rating: 'green', note: 'Ruhiges Stadtzentrum, Fähre nach Guimaras für Kleinkinder geeignet' },
      '3-6':  { rating: 'green', note: 'Fähre nach Guimaras, Mango-Probieren und Heritage-Kirchen entdecken' },
      '6-12': { rating: 'green', note: 'Dinagyang-Festival, UNESCO-Kirche und die besten Mangos der Welt' },
      '12+':  { rating: 'green', note: 'Food-Tour durch La Paz Batchoy-Gassen und lebendige Festivalkultur' }
    },
    desc: 'Kulinarische Hauptstadt der Western Visayas mit dem farbenprächtigen Dinagyang-Festival'
  },
  {
    id: 'davao',
    name: 'Davao City',
    altName: 'Durian Capital',
    lat: 7.1963,
    lng: 125.4618,
    tags: ['Großstadt', 'Natur', 'Kulinarik'],
    wiki: 'Davao_City',
    highlights: 'Mount Apo, Philippine Eagle Center, Eden Nature Park, Durian-Markt, Samal Island',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Sauberste Großstadt der Philippinen, gute Infrastruktur und sicher' },
      '1-3':  { rating: 'green', note: 'Eden Nature Park kinderfreundlich, Samal Island mit ruhigen Stränden' },
      '3-6':  { rating: 'green', note: 'Philippine Eagle Center, Eden Nature Park und Obstmärkte begeistern' },
      '6-12': { rating: 'green', note: 'Adler-Zentrum, Zip-Lines im Eden Park und Samal Island Abenteuer' },
      '12+':  { rating: 'green', note: 'Durian probieren, Crocodile Park und Trekking am Mount Apo' }
    },
    desc: 'Entspannte Großstadt in Mindanao – Tor zum höchsten Berg der Philippinen und Heimat des Philippinenadlers'
  },
  {
    id: 'sagada',
    name: 'Sagada',
    lat: 17.0981,
    lng: 120.9073,
    tags: ['Abenteuer', 'Kultur', 'Natur'],
    wiki: 'Sagada',
    highlights: 'Hängende Särge, Sumaguing-Höhle, Kiltepan-Aussicht, Bomod-Ok-Wasserfall',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem kurvige Bergstraßen, abgelegen und keine Baby-Infrastruktur' },
      '1-3':  { rating: 'red', note: 'Lange Anreise über Serpentinen, Höhlen nicht für Kleinkinder geeignet' },
      '3-6':  { rating: 'yellow', note: 'Echo Valley begehbar, aber Höhlentouren zu anspruchsvoll für Kleine' },
      '6-12': { rating: 'yellow', note: 'Hängende Särge faszinierend, aber Höhlen erfordern Klettern und Robben' },
      '12+':  { rating: 'green', note: 'Höhlen-Abenteuer, Kiltepan-Sonnenaufgang und Bergkultur hautnah' }
    },
    desc: 'Mystischer Bergort mit hängenden Särgen an Kalksteinfelsen und atemberaubenden Höhlen'
  },

  // ===== OFF THE BEATEN PATH (8) =====
  {
    id: 'batanes',
    name: 'Batanes',
    altName: 'Home of the Ivatans',
    lat: 20.4487,
    lng: 121.9708,
    tags: ['Natur', 'Kultur', 'Abenteuer'],
    wiki: 'Batanes',
    highlights: 'Ivatan-Steinhäuser, Leuchtturm, Marlboro Hills, Honesty Coffee Shop',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem abgelegen, Flüge oft gestrichen und kaum medizinische Hilfe' },
      '1-3':  { rating: 'red', note: 'Unberechenbare Flugverbindungen, starker Wind und einfache Unterkünfte' },
      '3-6':  { rating: 'yellow', note: 'Leuchtturm und Steinhaus-Dörfer interessant, aber Anreise beschwerlich' },
      '6-12': { rating: 'yellow', note: 'Einzigartige Landschaft beeindruckend, aber wenig kinderfreundliche Aktivitäten' },
      '12+':  { rating: 'green', note: 'Abenteuerliche Abgeschiedenheit, Honesty Coffee Shop und raue Natur' }
    },
    desc: 'Abgelegenste Provinz der Philippinen an der Grenze zu Taiwan – wild-romantische Küsten und einzigartige Ivatan-Kultur'
  },
  {
    id: 'siquijor',
    name: 'Siquijor',
    altName: 'Island of Fire',
    lat: 9.1852,
    lng: 123.5886,
    tags: ['Natur', 'Erholung', 'Kultur'],
    wiki: 'Siquijor',
    highlights: 'Cambugahay Falls, Salagdoong Beach, Alter Balete-Baum, mystische Heiler',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kleine Insel mit einfacher Infrastruktur, Fähre bei Wellengang wackelig' },
      '1-3':  { rating: 'green', note: 'Cambugahay Falls mit natürlichem Pool perfekt zum Planschen' },
      '3-6':  { rating: 'green', note: 'Wasserfälle, Schildkröten und der alte Balete-Baum begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Schnorcheln, Klippenspringen an Cambugahay und mystische Geschichten' },
      '12+':  { rating: 'green', note: 'Motorrad-Tour, Cliff-Jumping und entspannte Inselatmosphäre' }
    },
    desc: 'Mystische Insel der Magie mit geheimnisvollen Heilern und türkisblauen Wasserfällen',
    dayTripFrom: [{ base: 'dumaguete', transit: '~1h Fähre' }]
  },
  {
    id: 'camiguin',
    name: 'Camiguin',
    altName: 'Island Born of Fire',
    lat: 9.1732,
    lng: 124.7299,
    tags: ['Natur', 'Abenteuer', 'Erholung'],
    wiki: 'Camiguin',
    highlights: 'Sunken Cemetery, White Island, Katibawasan Falls, Ardent Hot Springs',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kleine Insel mit begrenzter Infrastruktur, aber ruhig und sicher' },
      '1-3':  { rating: 'green', note: 'Heiße Quellen zum Planschen, White Island mit flachem Wasser' },
      '3-6':  { rating: 'green', note: 'Wasserfälle, White Island und heiße Quellen – Natur zum Anfassen' },
      '6-12': { rating: 'green', note: 'Schnorcheln über dem versunkenen Friedhof und vulkanische Landschaft' },
      '12+':  { rating: 'green', note: 'Tauchen, Vulkanwanderungen und versunkener Friedhof faszinieren' }
    },
    desc: 'Vulkaninsel mit versunkenem Friedhof im Meer und mehr Vulkanen pro km² als jede andere Insel der Welt'
  },
  {
    id: 'caramoan',
    name: 'Caramoan',
    lat: 13.7700,
    lng: 123.8600,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Caramoan',
    highlights: 'Matukad Island, Lahos Island, Kalksteinklippen, Survivor-Drehort',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Sehr abgelegen, schwierige Anreise und kaum Infrastruktur vorhanden' },
      '1-3':  { rating: 'red', note: 'Lange holprige Anfahrt, keine Kleinkind-Ausstattung, einfachste Unterkünfte' },
      '3-6':  { rating: 'yellow', note: 'Schöne Strände, aber Anreise und Bootstouren für Kleine anstrengend' },
      '6-12': { rating: 'yellow', note: 'Unberührte Inseln toll, aber Infrastruktur sehr einfach und abgelegen' },
      '12+':  { rating: 'green', note: 'Survivor-Feeling, unberührte Strände und echtes Abenteuer abseits der Masse' }
    },
    desc: 'Abgelegenes Inselarchipel – bekannt als Drehort von Survivor mit unberührten Stränden'
  },
  {
    id: 'romblon',
    name: 'Romblon',
    altName: 'Marble Capital',
    lat: 12.5778,
    lng: 122.2691,
    tags: ['Natur', 'Erholung', 'Kultur'],
    wiki: 'Romblon',
    highlights: 'Bonbon Beach, Tiamban Beach, Marmorwerkstätten, Fort San Andres',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegen, wenige Fährverbindungen und kaum touristische Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Ruhige Strände, aber einfache Unterkünfte und wenig Kinderangebote' },
      '3-6':  { rating: 'yellow', note: 'Bonbon Beach toll zum Planschen, aber wenig weitere Aktivitäten' },
      '6-12': { rating: 'green', note: 'Einsame Strände, Marmorwerkstätten besichtigen und Inselleben erleben' },
      '12+':  { rating: 'green', note: 'Authentisches Inselleben fernab vom Tourismus und tolle Schnorchelspots' }
    },
    desc: 'Marmorhauptstadt der Philippinen mit menschenleeren Stränden und authentischem Inselleben'
  },
  {
    id: 'guimaras',
    name: 'Guimaras',
    altName: 'Mango Capital',
    lat: 10.5833,
    lng: 122.6000,
    tags: ['Natur', 'Erholung', 'Kulinarik'],
    wiki: 'Guimaras',
    highlights: 'Süßeste Mangos der Welt, Alubihod Beach, Trappist Monastery, Mango-Pizza',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Kurze Fähre von Iloilo, ruhige Insel und entspannte Atmosphäre' },
      '1-3':  { rating: 'green', note: 'Mango-Probieren, flache Strände und kurze Wege auf der kleinen Insel' },
      '3-6':  { rating: 'green', note: 'Mangoplantagen besuchen, Mango-Pizza probieren und am Strand spielen' },
      '6-12': { rating: 'green', note: 'Süßeste Mangos der Welt, Insel-Tour per Trike und Strandabenteuer' },
      '12+':  { rating: 'green', note: 'Mango-Festival, Kloster-Besuch und authentisches Inselleben erleben' }
    },
    desc: 'Mangohauptstadt der Philippinen mit den süßesten Mangos der Welt und versteckten Stränden',
    dayTripFrom: [{ base: 'iloilo', transit: '~20min Fähre' }]
  },
  {
    id: 'donsol',
    name: 'Donsol',
    lat: 12.9080,
    lng: 123.5980,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Donsol',
    highlights: 'Walhai-Schwimmen, Firefly-Tour, Ticao Island, Manta-Schnorcheln',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegen, offenes Meer und keine Baby-Infrastruktur vor Ort' },
      '1-3':  { rating: 'red', note: 'Walhai-Touren nicht für Kleinkinder geeignet, starke Strömungen' },
      '3-6':  { rating: 'yellow', note: 'Firefly-Tour abends möglich, aber Walhai-Schwimmen erst ab 6 Jahren' },
      '6-12': { rating: 'green', note: 'Walhai-Schwimmen ab 6 ein unvergessliches Erlebnis, Firefly-Tour toll' },
      '12+':  { rating: 'green', note: 'Mit Walhaien schnorcheln, Manta-Watching und Firefly-Abenteuer' }
    },
    desc: 'Walhai-Hauptstadt der Welt – von November bis Juni mit den sanften Riesen schnorcheln'
  },
  {
    id: 'moalboal',
    name: 'Moalboal',
    lat: 9.9557,
    lng: 123.4008,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Moalboal',
    highlights: 'Sardinen-Tornado, Pescador Island, Kawasan Falls, Canyoneering',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Ruhiger Ort, aber lange Busfahrt von Cebu und einfache Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Strand mit Sardinen-Schwarm toll zum Schauen, aber Strömung beachten' },
      '3-6':  { rating: 'yellow', note: 'Kawasan Falls zum Planschen, aber Canyoneering noch zu gefährlich' },
      '6-12': { rating: 'green', note: 'Sardinen-Tornado beim Schnorcheln und Kawasan Falls begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Canyoneering bei Kawasan Falls, Tauchen und Sardinen-Schnorcheln' }
    },
    desc: 'Tauch-Paradies nahe Cebu – berühmt für den gigantischen Sardinen-Tornado direkt am Strand',
    dayTripFrom: [{ base: 'cebu', transit: '~3h Bus' }]
  }
];
