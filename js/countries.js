/* ============================================
   COUNTRIES.JS – Länderkonfiguration
   Zentrales System für Multi-Country-Support
   ============================================ */

const CountryConfig = {
  current: null,

  configs: {
    // ============================
    // CHINA
    // ============================
    china: {
      id: 'china',
      name: 'China',
      brandName: 'Jaderoute',
      brandEmoji: '🏯',
      brandDescription: 'Personalisierte Routenplanung für China-Individualreisen',
      heroTitle: 'Dein perfektes <em>China-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch China – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'China-Reiseexperte',
      countryInText: 'China',
      mapCenter: [33, 108],
      mapZoom: 4,

      destinations: null, // wird in init() gesetzt (DESTINATIONS aus destinations.js)

      airports: [
        { id: 'pvg', label: 'Shanghai', desc: 'Flughafen PVG', value: 'Shanghai (Flughafen Pudong)' },
        { id: 'pek', label: 'Peking', desc: 'Flughafen PEK', value: 'Peking (Flughafen Capital)' },
        { id: 'hkg', label: 'Hongkong', desc: 'Flughafen HKG', value: 'Hongkong (Flughafen HKG)' },
        { id: 'can', label: 'Guangzhou', desc: 'Flughafen CAN', value: 'Guangzhou (Flughafen Baiyun)' },
        { id: 'tfu', label: 'Chengdu', desc: 'Flughafen TFU', value: 'Chengdu (Flughafen Tianfu)' },
        { id: 'szx', label: 'Shenzhen', desc: 'Flughafen SZX', value: 'Shenzhen (Flughafen Bao\'an)' }
      ],
      defaultAirport: 'Shanghai (Flughafen Pudong)',

      airportDestMap: {
        'shanghai': 'shanghai',
        'peking': 'beijing',
        'guangzhou': 'guangzhou',
        'hongkong': 'hongkong',
        'chengdu': 'chengdu',
        'shenzhen': 'shenzhen'
      },

      cityPairs: {
        'chengdu': ['chongqing', 'emeishan'],
        'chongqing': ['chengdu'],
        'shanghai': ['suzhou', 'hangzhou', 'moganshan'],
        'suzhou': ['shanghai', 'hangzhou'],
        'hangzhou': ['shanghai', 'suzhou', 'moganshan'],
        'moganshan': ['shanghai', 'hangzhou'],
        'beijing': ['pingyao', 'nanjing'],
        'nanjing': ['shanghai', 'hangzhou', 'huangshan'],
        'xian': ['luoyang'],
        'luoyang': ['xian'],
        'guilin': ['fenghuang', 'zhangjiajie', 'yunnan'],
        'yunnan': ['tiger-leaping-gorge'],
        'guangzhou': ['shenzhen', 'hongkong', 'xiamen'],
        'hongkong': ['shenzhen', 'guangzhou'],
        'shenzhen': ['guangzhou', 'hongkong'],
        'emeishan': ['chengdu'],
        'zhangjiajie': ['fenghuang', 'guilin'],
        'fenghuang': ['zhangjiajie', 'guilin'],
        'xiamen': ['guangzhou']
      },

      transportModes: [
        { id: 'train-only', icon: '🚄', label: 'Nur Zug', desc: 'Keine Inlandsflüge' },
        { id: 'train-preferred', icon: '🚄', label: 'Zug bevorzugt', desc: 'Flug nur bei weiten Strecken' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Zug oder Flug' }
      ],
      defaultTransport: 'no-preference',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'train-only': 'Nur Zug (keine Inlandsflüge)',
          'train-preferred': `Zug bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Zugfahrt`,
          'no-preference': 'Zug oder Flug (keine Präferenz)'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'train-only') {
          return 'NUR Zugverbindungen verwenden – keine Inlandsflüge. Chinas HSR-Netz ist das größte der Welt. Wichtige Zugstrecken: Shanghai–Suzhou (30min), Shanghai–Hangzhou (1h), Shanghai–Nanjing (1.5h), Nanjing–Hangzhou (1.5h), Peking–Xi\'an (4.5h), Peking–Nanjing (3.5h), Peking–Shanghai (4.5h), Chengdu–Chongqing (1.5h), Xi\'an–Luoyang (1.5h), Guangzhou–Shenzhen (30min), Shenzhen–Hongkong (20min Hochgeschwindigkeit). Längere Strecken: Guilin–Guangzhou (3h), Guilin–Kunming (5h), Xi\'an–Chengdu (3.5h), Shanghai–Xiamen (4h). Route so planen, dass alle Strecken per Zug machbar sind.';
        } else if (transport === 'train-preferred') {
          return `Zug bevorzugt. Inlandsflug erst empfehlen, wenn die Zugfahrt länger als ${trainMaxHours} Stunden dauert. Wichtige Zugstrecken: Shanghai–Hangzhou (1h), Shanghai–Suzhou (30min), Shanghai–Nanjing (1.5h), Peking–Xi'an (4.5h), Chengdu–Chongqing (1.5h), Xi'an–Luoyang (1.5h), Guangzhou–Shenzhen (30min). Längere Strecken ggf. per Flug: Peking–Shanghai (4.5h Zug), Guilin–Kunming (5h), Shanghai–Chengdu (12h+ Zug → Flug empfehlen).`;
        }
        return 'Kombiniere Hochgeschwindigkeitszüge und Inlandsflüge. Wichtige Zugstrecken: Shanghai–Hangzhou (1h), Shanghai–Suzhou (30min), Shanghai–Nanjing (1.5h), Peking–Xi\'an (4.5h), Chengdu–Chongqing (1.5h), Xi\'an–Luoyang (1.5h), Guangzhou–Shenzhen (30min), Shenzhen–Hongkong (20min). Für Strecken über 6h Zugfahrt empfehle Inlandsflug (z.B. Peking–Guilin, Shanghai–Chengdu, Shanghai–Kunming). Moganshan ist per Bus/Taxi ab Shanghai oder Hangzhou erreichbar (~1.5h).';
      },

      legModes: 'train|flight',

      facts: [
        'China hat über 50.000 km Hochgeschwindigkeitsstrecken – mehr als der Rest der Welt zusammen.',
        'Die Chinesische Mauer ist über 21.000 km lang und wurde über 2.000 Jahre hinweg gebaut.',
        'In China gibt es 56 anerkannte ethnische Gruppen mit eigenen Sprachen und Traditionen.',
        'Chengdu ist die Heimat von über 80% aller Großen Pandas weltweit.',
        'Der Li-Fluss in Guilin ist auf dem 20-Yuan-Schein abgebildet.',
        'Shanghai hat mehr Wolkenkratzer als New York City.',
        'Die Terrakotta-Armee in Xi\'an umfasst über 8.000 lebensgroße Figuren.',
        'Chinas Hochgeschwindigkeitszüge fahren bis zu 350 km/h.',
        'Der Westsee in Hangzhou inspirierte Dichter und Maler seit über 1.000 Jahren.',
        'Hot Pot aus Chongqing ist so berühmt, dass die Stadt ein eigenes Hot-Pot-Festival hat.'
      ],

      bookingLinks: {
        transport: {
          train:  { name: 'Trip.com', url: 'https://www.trip.com/trains/', icon: '🎫' },
          flight: { name: 'Trip.com', url: 'https://www.trip.com/flights/', icon: '✈️' }
        },
        general: [
          { name: 'Trip.com', url: 'https://www.trip.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'Viator', url: 'https://www.viator.com/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Shanghai", "Beijing", "Xi'an", "Hangzhou", "Chengdu", "Chongqing", "Guilin", "Suzhou", "Nanjing", "Guangzhou", "Shenzhen", "Hong_Kong", "Xiamen", "Kunming", "Dali_City", "Lijiang", "Zhangjiajie", "Harbin", "Lhasa", "Sanya", "Luoyang", "Dunhuang", "Pingyao"
  Sehenswürdigkeiten: "The_Bund" (Bund Shanghai), "Forbidden_City" (Verbotene Stadt), "Temple_of_Heaven" (Himmelstempel), "Great_Wall_of_China" (Große Mauer), "Summer_Palace" (Sommerpalast), "Terracotta_Army" (Terrakotta-Armee), "Giant_Wild_Goose_Pagoda" (Wildganspagode), "West_Lake" (Westsee), "Lingyin_Temple" (Lingyin-Tempel), "Chengdu_Research_Base_of_Giant_Panda_Breeding" (Panda-Basis), "Yu_Garden" (Yu-Garten), "Li_River" (Li-Fluss), "Longmen_Grottoes" (Longmen-Grotten), "Potala_Palace" (Potala-Palast), "Mogao_Caves" (Mogao-Grotten), "Humble_Administrator%27s_Garden" (Garten des bescheidenen Beamten), "Tiger_Leaping_Gorge", "Mount_Emei", "Leshan_Giant_Buddha", "Jiuzhaigou", "Victoria_Peak", "Canton_Tower", "Gulangyu"`,

      adjustWikiReferences: `"Shanghai", "Beijing", "Xi'an", "Hangzhou", "Chengdu", "Chongqing", "Guilin", "Suzhou", "Nanjing", "The_Bund", "Forbidden_City", "Terracotta_Army", "West_Lake", "Li_River", "Giant_Wild_Goose_Pagoda", "Leshan_Giant_Buddha", "Humble_Administrator%27s_Garden"`
    },

    // ============================
    // VIETNAM
    // ============================
    vietnam: {
      id: 'vietnam',
      name: 'Vietnam',
      brandName: 'Lotuspfad',
      brandEmoji: '🪷',
      brandDescription: 'Personalisierte Routenplanung für Vietnam-Individualreisen',
      heroTitle: 'Dein perfektes <em>Vietnam-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Vietnam – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'Vietnam-Reiseexperte',
      countryInText: 'Vietnam',
      mapCenter: [16, 107],
      mapZoom: 5,

      destinations: null, // wird in init() gesetzt (VIETNAM_DESTINATIONS)

      airports: [
        { id: 'sgn', label: 'Ho-Chi-Minh-Stadt', desc: 'Flughafen SGN', value: 'Ho-Chi-Minh-Stadt (Flughafen Tan Son Nhat)' },
        { id: 'han', label: 'Hanoi', desc: 'Flughafen HAN', value: 'Hanoi (Flughafen Noi Bai)' },
        { id: 'dad', label: 'Da Nang', desc: 'Flughafen DAD', value: 'Da Nang (Flughafen)' },
        { id: 'cxr', label: 'Nha Trang', desc: 'Flughafen CXR', value: 'Nha Trang (Flughafen Cam Ranh)' },
        { id: 'pqc', label: 'Phu Quoc', desc: 'Flughafen PQC', value: 'Phu Quoc (Flughafen)' }
      ],
      defaultAirport: 'Ho-Chi-Minh-Stadt (Flughafen Tan Son Nhat)',

      airportDestMap: {
        'ho-chi-minh': 'hochiminh',
        'saigon': 'hochiminh',
        'hanoi': 'hanoi',
        'da nang': 'danang',
        'danang': 'danang',
        'nha trang': 'nhatrang',
        'phu quoc': 'phuquoc'
      },

      cityPairs: {
        'hanoi': ['halong', 'ninhbinh', 'sapa', 'maichau', 'tamdao'],
        'halong': ['hanoi', 'catba'],
        'catba': ['halong'],
        'ninhbinh': ['hanoi'],
        'sapa': ['hanoi', 'hagiang'],
        'hagiang': ['sapa', 'caobang'],
        'caobang': ['hagiang'],
        'maichau': ['hanoi'],
        'tamdao': ['hanoi'],
        'hue': ['hoian', 'danang', 'phongnha'],
        'hoian': ['danang', 'hue'],
        'danang': ['hoian', 'hue'],
        'phongnha': ['hue'],
        'quynhon': ['phuyen'],
        'phuyen': ['quynhon'],
        'nhatrang': ['dalat', 'phuquoc'],
        'dalat': ['nhatrang', 'hochiminh'],
        'hochiminh': ['cantho', 'muine', 'vungtau'],
        'cantho': ['hochiminh'],
        'muine': ['hochiminh'],
        'vungtau': ['hochiminh'],
        'phuquoc': ['hochiminh'],
        'condao': ['hochiminh'],
        'kontum': ['danang']
      },

      transportModes: [
        { id: 'no-fly', icon: '🚌', label: 'Ohne Fliegen', desc: 'Zug & Bus, keine Flüge' },
        { id: 'ground-preferred', icon: '🚂', label: 'Boden bevorzugt', desc: 'Flug nur bei weiten Strecken' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Zug, Bus oder Flug' },
        { id: 'fast', icon: '✈️', label: 'Schnell & bequem', desc: 'Fliegen wo möglich' }
      ],
      defaultTransport: 'no-preference',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'no-fly': 'Kein Fliegen – nur Zug (Reunification Express) und Bus (Sleeper Bus, Open Tour Bus)',
          'ground-preferred': `Zug/Bus bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Fahrt`,
          'no-preference': 'Zug, Bus oder Flug (keine Präferenz)',
          'fast': 'Inlandsflüge bevorzugt, wo verfügbar und sinnvoll'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'no-fly') {
          return 'KEINE Flüge verwenden. Züge: Reunification Express (Hanoi–Ninh Binh–Vinh–Dong Hoi–Hue–Da Nang–Quy Nhon–Nha Trang–Phan Thiet–Saigon, Gesamtstrecke ~34h). Wichtige Zugzeiten: Hanoi–Ninh Binh (2.5h), Hanoi–Hue (13h, Nachtzug), Hue–Da Nang (2.5h), Da Nang–Hoi An (30min Bus), Da Nang–Nha Trang (8-10h), Nha Trang–Saigon (7-9h). Busse (Open Tour Bus, Sleeper Bus): Hanoi–Sa Pa (5-6h Bus), Hanoi–Ha Giang (6-7h Bus), Hanoi–Mai Chau (3h Bus), Hanoi–Tam Dao (2h Bus), Ha Long–Cat Ba (Fähre ~45min), Hue–Phong Nha (3.5-4h Bus), Nha Trang–Da Lat (3.5-4h Bus), Saigon–Da Lat (6-7h Bus), Saigon–Can Tho/Mekong (3h Bus), Saigon–Mui Ne (4-5h Bus), Saigon–Phu Quoc (Schnellboot ab Ha Tien ~1.5h oder Rach Gia ~2.5h). Nachtbusse sparen eine Hotelnacht. Route so planen, dass alle Strecken per Zug, Bus oder Boot machbar sind.';
        } else if (transport === 'ground-preferred') {
          return `Zug (Reunification Express) oder Bus (Sleeper Bus, Open Tour Bus) bevorzugt. Inlandsflug erst empfehlen, wenn die Fahrt per Zug/Bus länger als ${trainMaxHours} Stunden dauert. Wichtige Verbindungen: Hanoi–Sa Pa (5-6h Bus), Hanoi–Ha Giang (6-7h Bus), Ha Long–Cat Ba (Fähre ~45min), Hue–Phong Nha (3.5-4h Bus), Da Nang–Hoi An (30min Bus), Nha Trang–Da Lat (3.5-4h Bus), Saigon–Can Tho (3h Bus), Saigon–Mui Ne (4-5h Bus), Saigon–Phu Quoc (Schnellboot oder Flug). Con Dao nur per Schnellboot ab Saigon (~4h) oder Flug (~1h). Nachtbusse (Sleeper Bus) sind für Strecken von 5-10h eine beliebte und günstige Option.`;
        } else if (transport === 'fast') {
          return 'Inlandsflüge bevorzugen, wo verfügbar: Hanoi–Da Nang (~1.5h), Hanoi–Saigon (~2h), Saigon–Phu Quoc (~1h), Saigon–Da Lat (~1h), Saigon–Con Dao (~1h), Hanoi–Hue (~1h). Für kurze Strecken unter 3h Zug oder Bus nutzen: Da Nang–Hoi An (30min Bus), Hue–Da Nang (2.5h Zug), Hanoi–Ninh Binh (2.5h Zug), Nha Trang–Da Lat (3.5h Bus). Hanoi–Sa Pa und Hanoi–Ha Giang nur per Bus erreichbar (5-7h).';
        }
        return 'Kombiniere Züge (Reunification Express), Busse (Sleeper Bus, Open Tour Bus) und Inlandsflüge je nach Strecke. Wichtige Verbindungen: Hanoi–Sa Pa (5-6h Bus), Hanoi–Ha Giang (6-7h Bus), Ha Long–Cat Ba (Fähre ~45min), Hue–Phong Nha (3.5-4h Bus), Da Nang–Hoi An (30min Bus), Nha Trang–Da Lat (3.5-4h Bus), Saigon–Can Tho (3h Bus), Saigon–Mui Ne (4-5h Bus), Saigon–Phu Quoc (Flug 1h oder Schnellboot). Con Dao per Flug (~1h) oder Schnellboot (~4h) ab Saigon. Für Distanzen unter 6h empfehle Zug oder Bus, darüber Inlandsflug. Nachtbusse/Nachtzüge sparen eine Nacht Hotel.';
      },

      legModes: 'train|bus|sleeper_bus|flight|boat',

      facts: [
        'Vietnam hat mehr Motorräder als Einwohner: Mit rund 45 Millionen registrierten Motorrädern bei 100 Millionen Einwohnern ist das Moped das unangefochtene Transportmittel Nummer eins.',
        'Die größte Höhle der Welt liegt in Vietnam: Die Son-Doong-Höhle im Phong-Nha-Nationalpark ist so groß, dass ein Boeing 747 hindurchfliegen könnte.',
        'Vietnam ist der zweitgrößte Kaffee-Exporteur der Welt: Nur Brasilien exportiert mehr. Cà phê sữa đá (Eiskaffee mit Kondensmilch) ist das Nationalgetränk.',
        '40 % aller Vietnamesen heißen Nguyen: Der häufigste Familienname der Welt geht auf die letzte Kaiserdynastie zurück.',
        'Die Ha-Long-Bucht verdankt ihren Namen Drachen: "Ha Long" bedeutet "herabsteigender Drache" – der Legende nach spie ein Drache Juwelen ins Meer.',
        'Vietnam hat 54 anerkannte ethnische Gruppen: Von den Hmong in Sa Pa bis zu den Cham in Zentralvietnam, jede mit eigener Sprache und Tracht.',
        'Der Wiedervereinigungszug braucht 34 Stunden: Die Strecke Hanoi–Saigon (1.726 km) ist eine der schönsten Bahnreisen Asiens.',
        'Vietnam hat die Form eines Bambusstabs mit zwei Reiskörben: Die Reisdeltas im Norden und Süden bilden die Körbe am Tragebalken.',
        'Pho ist in Vietnam ein Frühstücksgericht: Die berühmte Nudelsuppe wird traditionell morgens gegessen und kostet nur etwa 1 Euro.',
        'Die Lotusblüte ist Vietnams Nationalblume: Sie symbolisiert Reinheit und Stärke – aus schlammigem Wasser wächst eine makellose Blüte.'
      ],

      bookingLinks: {
        transport: {
          train:  { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' },
          bus:    { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' },
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' },
          boat:   { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' }
        },
        general: [
          { name: 'Agoda', url: 'https://www.agoda.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'Viator', url: 'https://www.viator.com/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Ho_Chi_Minh_City", "Hanoi", "Da_Nang", "Huế", "Hội_An", "Sa_Pa", "Nha_Trang", "Phú_Quốc", "Da_Lat", "Cần_Thơ", "Hà_Giang_province", "Ninh_Bình_province", "Mũi_Né"
  Sehenswürdigkeiten: "Hạ_Long_Bay" (Ha-Long-Bucht), "Phong_Nha_–_Kẻ_Bàng_National_Park" (Phong Nha), "Imperial_City,_Huế" (Kaiserliche Zitadelle), "Japanese_Covered_Bridge" (Japanische Brücke Hoi An), "Temple_of_Literature,_Hanoi" (Literaturtempel), "Cham_Islands" (Cham-Inseln), "Marble_Mountains_(Vietnam)" (Marble Mountains), "Mekong_Delta", "Cu_Chi_tunnels" (Cu-Chi-Tunnel), "Golden_Bridge_(Vietnam)" (Goldene Brücke), "Fansipan" (Fansipan-Gipfel), "Cát_Bà_Island" (Cat Ba)`,

      adjustWikiReferences: `"Ho_Chi_Minh_City", "Hanoi", "Da_Nang", "Huế", "Hội_An", "Sa_Pa", "Nha_Trang", "Phú_Quốc", "Da_Lat", "Hạ_Long_Bay", "Phong_Nha_–_Kẻ_Bàng_National_Park", "Imperial_City,_Huế", "Japanese_Covered_Bridge", "Mekong_Delta", "Cu_Chi_tunnels"`
    },

    // ============================
    // JAPAN
    // ============================
    japan: {
      id: 'japan',
      name: 'Japan',
      brandName: 'Sakurapfad',
      brandEmoji: '⛩️',
      brandDescription: 'Personalisierte Routenplanung für Japan-Individualreisen',
      heroTitle: 'Dein perfektes <em>Japan-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Japan – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'Japan-Reiseexperte',
      countryInText: 'Japan',
      mapCenter: [36.5, 137.5],
      mapZoom: 5,

      destinations: null, // wird in init() gesetzt (JAPAN_DESTINATIONS)

      airports: [
        { id: 'nrt', label: 'Tokio-Narita', desc: 'Flughafen NRT', value: 'Tokio (Flughafen Narita)' },
        { id: 'hnd', label: 'Tokio-Haneda', desc: 'Flughafen HND', value: 'Tokio (Flughafen Haneda)' },
        { id: 'kix', label: 'Osaka-Kansai', desc: 'Flughafen KIX', value: 'Osaka (Flughafen Kansai)' },
        { id: 'fuk', label: 'Fukuoka', desc: 'Flughafen FUK', value: 'Fukuoka (Flughafen)' },
        { id: 'cts', label: 'Sapporo', desc: 'Flughafen CTS', value: 'Sapporo (Flughafen New Chitose)' }
      ],
      defaultAirport: 'Tokio (Flughafen Narita)',

      airportDestMap: {
        'tokio': 'tokio',
        'tokyo': 'tokio',
        'narita': 'tokio',
        'haneda': 'tokio',
        'osaka': 'osaka',
        'kansai': 'osaka',
        'fukuoka': 'fukuoka',
        'sapporo': 'sapporo'
      },

      cityPairs: {
        'tokio': ['hakone', 'nikko', 'kamakura'],
        'hakone': ['tokio'],
        'nikko': ['tokio'],
        'kamakura': ['tokio'],
        'kyoto': ['osaka', 'nara', 'koyasan', 'kinosaki'],
        'osaka': ['kyoto', 'nara', 'koyasan'],
        'nara': ['kyoto', 'osaka'],
        'koyasan': ['osaka', 'kyoto'],
        'kinosaki': ['kyoto'],
        'kanazawa': ['takayama', 'shirakawago'],
        'takayama': ['kanazawa', 'matsumoto', 'shirakawago', 'magome-tsumago'],
        'matsumoto': ['takayama', 'magome-tsumago'],
        'shirakawago': ['takayama', 'kanazawa'],
        'magome-tsumago': ['takayama', 'matsumoto'],
        'hiroshima': ['miyajima', 'onomichi'],
        'miyajima': ['hiroshima'],
        'onomichi': ['hiroshima', 'naoshima'],
        'naoshima': ['onomichi'],
        'fukuoka': ['beppu', 'kagoshima'],
        'beppu': ['fukuoka'],
        'kagoshima': ['fukuoka', 'yakushima'],
        'yakushima': ['kagoshima'],
        'sapporo': [],
        'naha': [],
        'tottori': ['kinosaki']
      },

      transportModes: [
        { id: 'train-only', icon: '🚅', label: 'Nur Zug', desc: 'Shinkansen & JR, keine Flüge' },
        { id: 'train-preferred', icon: '🚅', label: 'Zug bevorzugt', desc: 'Flug nur bei weiten Strecken' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Zug oder Flug' },
        { id: 'budget', icon: '💰', label: 'Budget', desc: 'Highway-Bus & günstige Optionen' }
      ],
      defaultTransport: 'no-preference',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'train-only': 'Nur Zug (Shinkansen & JR-Züge, Japan Rail Pass empfohlen)',
          'train-preferred': `Zug bevorzugt (Shinkansen/JR), Inlandsflug erst ab ${trainMaxHours}h Zugfahrt`,
          'no-preference': 'Zug oder Flug (keine Präferenz)',
          'budget': 'Highway-Bus & günstige Optionen bevorzugt'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'train-only') {
          return 'NUR Zugverbindungen verwenden (Shinkansen, Limited Express, JR-Züge). Keine Inlandsflüge. Empfehle einen Japan Rail Pass (7/14/21 Tage). Wichtige Shinkansen-Strecken (Tokaido/Sanyo): Tokio–Hakone (Romancecar ~1.5h), Tokio–Kyoto (Nozomi ~2h15), Tokio–Osaka (Nozomi ~2.5h), Kyoto–Osaka (Shinkansen ~15min oder JR ~30min), Kyoto–Nara (JR ~45min), Osaka–Hiroshima (Shinkansen ~1.5h), Hiroshima–Fukuoka (Shinkansen ~1h). Hokuriku-Linie: Tokio–Kanazawa (Shinkansen ~2.5h). Alpen-Route: Kanazawa–Takayama (Bus ~2h), Takayama–Matsumoto (Bus/Zug ~2h), Matsumoto–Tokio (Limited Express ~2.5h). Kyushu: Fukuoka–Beppu (Zug ~2h), Fukuoka–Kagoshima (Shinkansen ~1.5h). Fähren: Hiroshima–Miyajima (JR-Fähre ~10min), Kagoshima–Yakushima (Jetfoil ~2h oder Fähre ~4h), Uno–Naoshima (Fähre ~20min). Tokio-Tagesausflüge: Nikko (Zug ~2h), Kamakura (JR ~1h). Koyasan ab Osaka (Zug ~2h). Kinosaki Onsen ab Kyoto (Limited Express ~2.5h). HINWEIS: Sapporo und Okinawa/Naha sind per Zug NICHT erreichbar.';
        } else if (transport === 'train-preferred') {
          return `Zug bevorzugt (Shinkansen, JR-Züge). Inlandsflug erst empfehlen, wenn die Zugfahrt länger als ${trainMaxHours} Stunden dauert. Wichtige Zugzeiten: Tokio–Kyoto (2h15), Tokio–Osaka (2.5h), Tokio–Kanazawa (2.5h), Osaka–Hiroshima (1.5h), Kyoto–Nara (45min), Fukuoka–Kagoshima (1.5h). Alpen-Route: Kanazawa–Takayama (Bus ~2h), Takayama–Matsumoto (Bus/Zug ~2h). Fähren: Miyajima (~10min), Yakushima (Jetfoil ~2h), Naoshima (~20min). Inlandsflüge sinnvoll für: Tokio–Sapporo (~1.5h Flug vs. unmöglich per Zug), Tokio/Osaka–Okinawa (Flug ~2.5h, kein Zug). Empfehle einen Japan Rail Pass.`;
        } else if (transport === 'budget') {
          return 'Highway-Busse (Nachtbusse!) und günstige Transportoptionen bevorzugen. Wichtige Nachtbus-Strecken: Tokio–Osaka/Kyoto (~8h, ab ~3000¥), Tokio–Kanazawa (~7h), Osaka–Hiroshima (~5h), Tokio–Takayama (~5.5h). Nachtbusse sparen eine Hotelnacht. Shinkansen nur für kurze Strecken oder mit Japan Rail Pass. Fähren: Miyajima (~10min), Yakushima (Fähre ~4h günstiger als Jetfoil), Naoshima (~20min). JR-Lokalzüge für kurze Strecken (Kyoto–Nara ~45min, Kyoto–Osaka ~30min). Inlandsflüge nur bei extremen Entfernungen (Okinawa, Sapporo) – LCC wie Peach oder Jetstar nutzen.';
        }
        return 'Kombiniere Shinkansen, JR-Züge und Inlandsflüge je nach Strecke. Wichtige Zugzeiten: Tokio–Kyoto (2h15), Tokio–Osaka (2.5h), Tokio–Kanazawa (2.5h), Osaka–Hiroshima (1.5h), Kyoto–Nara (45min), Fukuoka–Kagoshima (1.5h), Tokio–Hakone (Romancecar 1.5h). Alpen-Route: Kanazawa–Takayama (Bus ~2h), Takayama–Matsumoto (~2h). Fähren: Miyajima (~10min), Yakushima (Jetfoil ~2h), Naoshima (~20min). Für Sapporo und Okinawa Inlandsflug empfehlen (kein Shinkansen). Empfehle einen Japan Rail Pass bei zugdominierten Routen.';
      },

      legModes: 'train|bus|flight|boat',

      facts: [
        'Japans Shinkansen-Züge hatten seit dem Start 1964 keinen einzigen tödlichen Unfall – und die durchschnittliche Verspätung beträgt unter einer Minute.',
        'In Japan gibt es über 6.800 Inseln, aber 97% der Bevölkerung lebt auf den vier Hauptinseln.',
        'Japan hat mehr als 68.000 Tempel und Schreine – mehr als die Anzahl der Convenience Stores (ca. 57.000).',
        'Die Kirschblüte (Sakura) wird so ernst genommen, dass der japanische Wetterdienst eine offizielle Blütenprognose veröffentlicht.',
        'Japan hat 25 UNESCO-Welterbestätten und zählt zu den Ländern mit den meisten Welterbe-Einträgen in Asien.',
        'Auf der Insel Ōkunoshima leben über 1.000 wilde Kaninchen – sie wird auch „Kanincheninsel" genannt.',
        'In Japan gibt es über 25.000 heiße Quellen (Onsen). Baden in Onsen ist ein jahrhundertealtes Kulturritual.',
        'Japanische Vending Machines verkaufen alles von heißem Kaffee bis hin zu frischen Eiern – es gibt über 5 Millionen Automaten im Land.',
        'Der Tsukiji-/Toyosu-Fischmarkt in Tokio ist der größte Fischmarkt der Welt – hier wird der teuerste Thunfisch der Welt versteigert.',
        'Japan hat über 1.500 Erdbeben pro Jahr – die meisten davon so leicht, dass sie kaum spürbar sind.'
      ],

      bookingLinks: {
        transport: {
          train:  { name: 'Japan Rail Pass', url: 'https://www.japanrailpass.net/de/', icon: '🎫' },
          bus:    { name: 'Japan Bus Online', url: 'https://japanbusonline.com/', icon: '🎫' },
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' },
          boat:   { name: 'Direct Ferries', url: 'https://www.directferries.de/', icon: '🎫' }
        },
        general: [
          { name: 'Booking.com', url: 'https://www.booking.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'Viator', url: 'https://www.viator.com/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Tokyo", "Kyoto", "Osaka", "Hiroshima", "Nara_(city)", "Hakone", "Nikkō", "Kamakura", "Kanazawa", "Takayama,_Gifu", "Itsukushima", "Mount_Kōya", "Naha", "Sapporo", "Fukuoka"
  Sehenswürdigkeiten: "Sensō-ji" (Sensoji-Tempel), "Fushimi_Inari-taisha" (Fushimi-Inari-Schrein), "Kinkaku-ji" (Goldener Pavillon), "Arashiyama" (Bambuswald), "Shibuya_Crossing", "Meiji_Shrine" (Meiji-Schrein), "Osaka_Castle" (Osaka-Burg), "Dōtonbori" (Dotonbori), "Hiroshima_Peace_Memorial_Park" (Friedensgedenkpark), "Atomic_Bomb_Dome" (Atombomben-Kuppel), "Tōdai-ji" (Todai-ji-Tempel), "Nara_Park", "Tōshō-gū" (Toshogu-Schrein), "Kenroku-en" (Kenroku-en-Garten), "Itsukushima_Shrine" (Itsukushima-Schrein), "Kōtoku-in" (Großer Buddha Kamakura), "Shuri_Castle" (Shuri-Burg), "Chichu_Art_Museum", "Historic_Villages_of_Shirakawa-gō_and_Gokayama" (Shirakawa-go), "Matsumoto_Castle" (Matsumoto-Burg), "Magome-juku", "Yakushima"`,

      adjustWikiReferences: `"Tokyo", "Kyoto", "Osaka", "Hiroshima", "Nara_(city)", "Hakone", "Nikkō", "Kamakura", "Kanazawa", "Fushimi_Inari-taisha", "Kinkaku-ji", "Sensō-ji", "Osaka_Castle", "Hiroshima_Peace_Memorial_Park", "Tōdai-ji"`
    },

    // ============================
    // THAILAND
    // ============================
    thailand: {
      id: 'thailand',
      name: 'Thailand',
      brandName: 'Siamroute',
      brandEmoji: '🐘',
      brandDescription: 'Personalisierte Routenplanung für Thailand-Individualreisen',
      heroTitle: 'Dein perfektes <em>Thailand-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Thailand – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'Thailand-Reiseexperte',
      countryInText: 'Thailand',
      mapCenter: [13.5, 101.0],
      mapZoom: 5,

      destinations: null, // wird in init() gesetzt (THAILAND_DESTINATIONS)

      airports: [
        { id: 'bkk', label: 'Bangkok', desc: 'Flughafen BKK', value: 'Bangkok (Flughafen Suvarnabhumi)' },
        { id: 'cnx', label: 'Chiang Mai', desc: 'Flughafen CNX', value: 'Chiang Mai (Flughafen)' },
        { id: 'hkt', label: 'Phuket', desc: 'Flughafen HKT', value: 'Phuket (Flughafen)' },
        { id: 'kbv', label: 'Krabi', desc: 'Flughafen KBV', value: 'Krabi (Flughafen)' },
        { id: 'usm', label: 'Ko Samui', desc: 'Flughafen USM', value: 'Ko Samui (Flughafen)' }
      ],
      defaultAirport: 'Bangkok (Flughafen Suvarnabhumi)',

      airportDestMap: {
        'bangkok': 'bangkok',
        'suvarnabhumi': 'bangkok',
        'chiang mai': 'chiang-mai',
        'phuket': 'phuket',
        'krabi': 'krabi',
        'ko samui': 'ko-samui',
        'samui': 'ko-samui'
      },

      cityPairs: {
        'bangkok': ['ayutthaya', 'kanchanaburi', 'hua-hin', 'khao-yai', 'lopburi', 'phetchaburi', 'chiang-mai', 'ko-chang'],
        'ayutthaya': ['bangkok', 'lopburi', 'sukhothai'],
        'kanchanaburi': ['bangkok', 'sangkhlaburi'],
        'hua-hin': ['bangkok', 'phetchaburi'],
        'chiang-mai': ['bangkok', 'pai', 'chiang-rai', 'sukhothai', 'lampang'],
        'chiang-rai': ['chiang-mai'],
        'pai': ['chiang-mai', 'mae-hong-son'],
        'sukhothai': ['chiang-mai', 'ayutthaya'],
        'lampang': ['chiang-mai'],
        'phuket': ['krabi', 'khao-sok', 'ko-phi-phi'],
        'krabi': ['phuket', 'ko-phi-phi', 'ko-lanta', 'khao-sok'],
        'ko-phi-phi': ['krabi', 'phuket', 'ko-lanta'],
        'khao-sok': ['phuket', 'krabi', 'ko-samui'],
        'ko-samui': ['ko-phangan', 'ko-tao', 'khao-sok'],
        'ko-tao': ['ko-samui', 'ko-phangan'],
        'ko-phangan': ['ko-samui', 'ko-tao'],
        'ko-lipe': ['ko-lanta'],
        'mae-hong-son': ['pai'],
        'ko-lanta': ['krabi', 'ko-phi-phi', 'ko-lipe'],
        'ko-chang': ['bangkok'],
        'lopburi': ['bangkok', 'ayutthaya'],
        'khao-yai': ['bangkok'],
        'nan': ['chiang-mai'],
        'sangkhlaburi': ['kanchanaburi'],
        'phetchaburi': ['bangkok', 'hua-hin']
      },

      transportModes: [
        { id: 'no-fly', icon: '🚌', label: 'Ohne Fliegen', desc: 'Zug, Bus & Boot, keine Flüge' },
        { id: 'ground-preferred', icon: '🚂', label: 'Boden bevorzugt', desc: 'Flug nur bei weiten Strecken' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Zug, Bus, Boot oder Flug' },
        { id: 'fast', icon: '✈️', label: 'Schnell & bequem', desc: 'Fliegen wo möglich' }
      ],
      defaultTransport: 'no-preference',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'no-fly': 'Kein Fliegen – nur Zug (SRT), Bus (VIP-Bus, Minivan) und Fähre',
          'ground-preferred': `Zug/Bus/Fähre bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Fahrt`,
          'no-preference': 'Zug, Bus, Fähre oder Flug (keine Präferenz)',
          'fast': 'Inlandsflüge bevorzugt, wo verfügbar und sinnvoll'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'no-fly') {
          return 'KEINE Flüge verwenden. Züge (SRT): Bangkok–Ayutthaya (1.5h), Bangkok–Lopburi (2.5h), Bangkok–Chiang Mai (Nachtzug Sleeper ~11-13h, Erlebnis!), Bangkok–Hua Hin (3.5-4h), Bangkok–Surat Thani (Nachtzug ~9h). VIP-Busse/Minivans: Bangkok–Kanchanaburi (2.5-3h), Bangkok–Khao Yai (3h), Chiang Mai–Pai (3-4h, kurvige Bergstraße), Chiang Mai–Chiang Rai (3h), Chiang Mai–Sukhothai (5h), Chiang Mai–Mae Hong Son (7-8h Bus oder via Pai). Ko Chang: Bus Bangkok–Trat (5h) + Fähre Trat–Ko Chang (30min). Fähren obligatorisch für Inseln: Ko Samui ab Don Sak/Surat Thani (Fähre 1.5-2h), Ko Phangan ab Ko Samui (30min-1h), Ko Tao ab Chumphon (Schnellboot 1.5-2h) oder ab Ko Phangan (1-2h), Ko Phi Phi ab Krabi (1.5h) oder Phuket (2h), Ko Lanta ab Krabi (2h), Ko Lipe ab Ko Lanta (Speedboat 1.5h) oder Pak Bara/Satun (1.5h). Khao Sok: ab Surat Thani (1.5h) oder Takua Pa (1h). Joint Tickets (Bus+Fähre) für Inselverbindungen verfügbar. Route so planen, dass alle Strecken ohne Flug machbar sind.';
        } else if (transport === 'ground-preferred') {
          return `Zug, Bus oder Fähre bevorzugt. Inlandsflug erst empfehlen, wenn die Fahrt länger als ${trainMaxHours} Stunden dauert. Wichtige Verbindungen: Bangkok–Ayutthaya (Zug 1.5h), Bangkok–Chiang Mai (Nachtzug 11-13h oder Bus 9-10h), Bangkok–Kanchanaburi (Bus 2.5-3h), Bangkok–Hua Hin (Zug/Bus 3.5-4h), Chiang Mai–Pai (Bus 3-4h), Chiang Mai–Chiang Rai (Bus 3h). Fähren: Ko Samui (Fähre 1.5-2h ab Don Sak), Ko Phangan (30min-1h ab Samui), Ko Tao (1.5-2h ab Chumphon), Ko Phi Phi (1.5h ab Krabi), Ko Lanta (2h ab Krabi), Ko Lipe (1.5h ab Ko Lanta). Ko Chang: Bus+Fähre ab Bangkok (~6h gesamt). Nachtzüge und VIP-Nachtbusse sparen eine Hotelnacht.`;
        } else if (transport === 'fast') {
          return 'Inlandsflüge bevorzugen: Bangkok–Chiang Mai (1.5h), Bangkok–Phuket (1.5h), Bangkok–Krabi (1.5h), Bangkok–Ko Samui (1h, Bangkok Airways direkt), Bangkok–Chiang Rai (1.5h). Für kurze Strecken unter 2h Minivan oder Zug: Bangkok–Ayutthaya (Zug 1.5h), Bangkok–Kanchanaburi (Bus 2.5h), Chiang Mai–Pai (Bus 3-4h, kein Flug möglich), Chiang Mai–Chiang Rai (Bus 3h). Fähren für Inseln weiterhin nötig: Ko Phi Phi (1.5h ab Krabi), Ko Tao (1.5h ab Chumphon), Ko Lanta (2h ab Krabi), Ko Lipe (1.5h ab Ko Lanta). Ko Chang: Flug nach Trat (~1h) + Fähre (30min).';
        }
        return 'Kombiniere Züge (SRT), VIP-Busse, Minivans, Inlandsflüge und Fähren. Wichtige Verbindungen: Bangkok–Ayutthaya (Zug 1.5h), Bangkok–Chiang Mai (Nachtzug 11-13h oder Flug 1.5h), Bangkok–Kanchanaburi (Bus 2.5-3h), Bangkok–Hua Hin (3.5-4h), Chiang Mai–Pai (Bus 3-4h), Chiang Mai–Chiang Rai (Bus 3h), Chiang Mai–Sukhothai (Bus 5h). Fähren: Ko Samui (1.5-2h ab Don Sak), Ko Phangan (30min-1h ab Samui), Ko Tao (1.5-2h ab Chumphon), Ko Phi Phi (1.5h ab Krabi), Ko Lanta (2h ab Krabi), Ko Lipe (1.5h ab Ko Lanta). Ko Chang: Bus+Fähre ab Bangkok (~6h). Nachtzug Bangkok–Chiang Mai ist ein Erlebnis. Joint Tickets (Bus+Fähre) für Inselverbindungen empfehlen.';
      },

      legModes: 'train|bus|flight|boat',

      facts: [
        'Bangkok hat den längsten Städtenamen der Welt: Der zeremonielle Name umfasst 168 Buchstaben und beginnt mit „Krung Thep Mahanakhon Amon Rattanakosin…".',
        'Thailand hat über 40.000 buddhistische Tempel (Wats) – davon sind rund 37.000 aktiv in Benutzung.',
        'Thailand ist das einzige Land Südostasiens, das nie von einer europäischen Macht kolonisiert wurde – der Name bedeutet „Land der Freien".',
        'In Thailand lebt die kleinste Fledermaus der Welt: Die Hummelfledermaus wiegt nur 2 Gramm und ist kaum größer als eine Hummel.',
        'Der Chatuchak-Wochenendmarkt in Bangkok ist einer der größten Märkte der Welt: Über 15.000 Stände auf 35 Hektar empfangen jedes Wochenende 200.000 Besucher.',
        'Bangkok hat rund 20.000 Tuk-Tuks – die ikonischen Dreirad-Taxis sind nach dem Geräusch ihrer Zweitaktmotoren benannt.',
        'Jay Fai in Bangkok ist das einzige Straßenessen-Restaurant Thailands mit einem Michelin-Stern – berühmt für ihr Krabben-Omelett.',
        'Thailands Orchideen-Vielfalt ist legendär: Über 1.300 Orchideenarten aus 180 Gattungen wachsen wild in den Wäldern des Landes.',
        'Der Khao Sok Nationalpark in Südthailand beherbergt Regenwald, der älter und artenreicher ist als der Amazonas-Regenwald.',
        'Songkran, das Thai-Neujahrsfest im April, ist die größte Wasserschlacht der Welt – drei Tage lang werden Straßen, Fremde und Mönche mit Wasser übergossen.'
      ],

      bookingLinks: {
        transport: {
          train:  { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' },
          bus:    { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' },
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' },
          boat:   { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' }
        },
        general: [
          { name: 'Agoda', url: 'https://www.agoda.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'Viator', url: 'https://www.viator.com/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Bangkok", "Chiang_Mai", "Phuket_Province", "Krabi", "Chiang_Rai", "Hua_Hin_district", "Kanchanaburi", "Pai,_Thailand", "Mae_Hong_Son", "Lampang", "Lopburi", "Phetchaburi"
  Inseln: "Ko_Samui", "Ko_Pha-ngan", "Ko_Tao", "Ko_Lanta_Yai", "Phi_Phi_Islands", "Ko_Lipe", "Ko_Chang"
  Sehenswürdigkeiten: "Grand_Palace" (Großer Palast), "Wat_Pho" (Liegender Buddha), "Wat_Arun" (Tempel der Morgenröte), "Wat_Phra_Kaew" (Smaragd-Buddha), "Wat_Rong_Khun" (Weißer Tempel), "Wat_Phra_That_Doi_Suthep" (Doi Suthep), "Ayutthaya_Historical_Park" (Ayutthaya), "Sukhothai_Historical_Park" (Sukhothai), "Railay_Beach", "Chatuchak_Weekend_Market" (Chatuchak-Markt), "Elephant_Nature_Park", "Erawan_National_Park" (Erawan-Wasserfall), "Khao_Sok_National_Park", "Khao_Yai_National_Park", "Damnoen_Saduak_Floating_Market" (Schwimmender Markt)`,

      adjustWikiReferences: `"Bangkok", "Chiang_Mai", "Phuket_Province", "Krabi", "Chiang_Rai", "Ko_Samui", "Ko_Pha-ngan", "Phi_Phi_Islands", "Grand_Palace", "Wat_Pho", "Wat_Arun", "Ayutthaya_Historical_Park", "Sukhothai_Historical_Park", "Railay_Beach", "Khao_Sok_National_Park"`
    },

    // ============================
    // INDONESIA
    // ============================
    indonesia: {
      id: 'indonesia',
      name: 'Indonesien',
      brandName: 'Inselroute',
      brandEmoji: '🌋',
      brandDescription: 'Personalisierte Routenplanung für Indonesien-Individualreisen',
      heroTitle: 'Dein perfektes <em>Indonesien-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Indonesien – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'Indonesien-Reiseexperte',
      countryInText: 'Indonesien',
      mapCenter: [-2.5, 118],
      mapZoom: 4,

      destinations: null, // wird in init() gesetzt (INDONESIA_DESTINATIONS)

      airports: [
        { id: 'dps', label: 'Bali', desc: 'Flughafen DPS', value: 'Bali (Flughafen Ngurah Rai)' },
        { id: 'cgk', label: 'Jakarta', desc: 'Flughafen CGK', value: 'Jakarta (Flughafen Soekarno-Hatta)' },
        { id: 'jog', label: 'Yogyakarta', desc: 'Flughafen YIA', value: 'Yogyakarta (Flughafen YIA)' },
        { id: 'sub', label: 'Surabaya', desc: 'Flughafen SUB', value: 'Surabaya (Flughafen Juanda)' },
        { id: 'kno', label: 'Medan', desc: 'Flughafen KNO', value: 'Medan (Flughafen Kualanamu)' },
        { id: 'upg', label: 'Makassar', desc: 'Flughafen UPG', value: 'Makassar (Flughafen Sultan Hasanuddin)' }
      ],
      defaultAirport: 'Bali (Flughafen Ngurah Rai)',

      airportDestMap: {
        'bali': 'seminyak',
        'ngurah rai': 'seminyak',
        'jakarta': 'jakarta',
        'soekarno': 'jakarta',
        'yogyakarta': 'yogyakarta',
        'jogja': 'yogyakarta',
        'surabaya': 'bromo',
        'medan': 'lake-toba',
        'makassar': 'toraja'
      },

      cityPairs: {
        // Bali-Cluster (alle per kurzer Fahrt/Boot verbunden)
        'ubud': ['seminyak', 'uluwatu', 'nusa-penida', 'lombok', 'gili-islands'],
        'seminyak': ['ubud', 'uluwatu', 'nusa-penida', 'lombok', 'gili-islands'],
        'uluwatu': ['ubud', 'seminyak', 'nusa-penida', 'lombok', 'gili-islands'],
        'nusa-penida': ['ubud', 'seminyak', 'uluwatu'],
        // Lombok & Gili (Schnellboot ab Bali ~2-3h)
        'lombok': ['ubud', 'seminyak', 'uluwatu', 'gili-islands'],
        'gili-islands': ['ubud', 'seminyak', 'uluwatu', 'lombok'],
        // Java
        'jakarta': ['bandung', 'yogyakarta'],
        'bandung': ['jakarta', 'yogyakarta'],
        'yogyakarta': ['jakarta', 'bandung', 'bromo'],
        'bromo': ['ijen', 'yogyakarta'],
        'ijen': ['bromo'],
        // Flores / Komodo
        'labuan-bajo': ['flores', 'wae-rebo'],
        'flores': ['labuan-bajo', 'wae-rebo'],
        'wae-rebo': ['labuan-bajo', 'flores'],
        // Sumatra
        'lake-toba': ['bukit-lawang'],
        'bukit-lawang': ['lake-toba'],
        'bukittinggi': [],
        // Remote Inseln (nur per Flug erreichbar)
        'raja-ampat': [],
        'toraja': [],
        'tanjung-puting': [],
        'togean-islands': [],
        'sumba': [],
        'banda-islands': [],
        'baliem-valley': [],
        'karimunjawa': []
      },

      transportModes: [
        { id: 'island-hopper', icon: '🚢', label: 'Insel-Hopping', desc: 'Flüge zwischen Inseln, Boot & Boden vor Ort' },
        { id: 'minimize-flying', icon: '🚌', label: 'Wenig fliegen', desc: 'Fähren & Boden wo möglich' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'KI entscheidet den besten Mix' },
        { id: 'comfort', icon: '💎', label: 'Komfort', desc: 'Flüge & Privatwagen, wenig Bus' }
      ],
      defaultTransport: 'no-preference',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'island-hopper': 'Insel-Hopping (Flüge zwischen Inseln, Boot & Boden vor Ort)',
          'minimize-flying': 'Wenig fliegen (Fähren & Boden wo möglich, Flug nur wenn unvermeidbar)',
          'no-preference': 'Flug, Boot, Zug oder Bus (keine Präferenz)',
          'comfort': 'Komfort (Flüge & Privatwagen, wenig Bus)'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'minimize-flying') {
          return 'Flüge minimieren. Java-Züge: Whoosh HSR Jakarta–Bandung (40min), Executive-Zug Jakarta–Yogyakarta (6-8h), Yogyakarta–Surabaya (4-5h), Surabaya–Probolinggo (2h, für Mt Bromo). Java↔Bali: Zug nach Banyuwangi + Ketapang–Gilimanuk-Fähre (30min). Bali↔Lombok per Schnellboot (2-3h). Bali↔Nusa Penida per Schnellboot (30-45min). Lombok↔Gili per Boot (15-30min). Flores überland: Labuan Bajo–Ruteng (5h Bus), Ruteng–Bajawa (4h), Bajawa–Ende (3h, für Kelimutu), Ende–Maumere (3h). Sumatra: Medan–Bukit Lawang (3-4h Bus), Medan–Parapat/Lake Toba (4-5h Bus + Fähre). Flüge NUR wenn keine Alternative existiert (z.B. nach Flores/Komodo, Sulawesi, Papua, Raja Ampat, Sumba). Route möglichst auf einer Inselgruppe halten.';
        } else if (transport === 'island-hopper') {
          return 'Insel-Hopping-Modus: Inlandsflüge zwischen verschiedenen Inseln. Flughubs: Bali (DPS) → Lombok, Labuan Bajo/Flores, Makassar/Sulawesi, Surabaya. Jakarta (CGK) → Yogyakarta, Medan, Makassar. Makassar (UPG) → Toraja (Bus 8-10h). Sorong → Raja Ampat (Boot 2h). Jayapura/Wamena → Baliem Valley. Auf Java Züge nutzen: Whoosh Jakarta–Bandung (40min), Executive Jakarta–Yogyakarta (6-8h). Auf Bali/Lombok Shuttle oder Privatwagen. Schnellboote: Bali↔Nusa Penida (30min), Bali↔Lombok (2-3h), Lombok↔Gili (15-30min). PELNI-Fähren NICHT empfehlen (zu langsam).';
        } else if (transport === 'comfort') {
          return 'Komfort priorisieren: Inlandsflüge für alle Inter-Insel-Strecken (Garuda Indonesia oder Batik Air bevorzugen). Auf Java Whoosh HSR Jakarta–Bandung (40min) oder Executive-Zug. Innerhalb von Bali/Lombok Privatwagen mit Fahrer empfehlen (~40-60€/Tag). Schnellboote (nicht öffentliche Fähren) für: Bali↔Nusa Penida (30min), Bali↔Lombok (2-3h), Lombok↔Gili (15-30min). Auf Flores: Privatwagen Labuan Bajo–Ende (~10h überland) oder Flug. Toraja ab Makassar: Privatwagen (~8h). Keine Langstrecken-Busse. Keine PELNI-Fähren.';
        }
        return 'Kombination aus Inlandsflügen, Zügen (auf Java), Bussen, Schnellbooten und Fähren. Zwischen verschiedenen Inseln empfehle Inlandsflüge. Java-Züge: Whoosh Jakarta–Bandung (40min), Executive-Zug Jakarta–Yogyakarta (6-8h), Yogyakarta–Surabaya (4-5h), Surabaya–Probolinggo (2h, für Mt Bromo). Ketapang–Gilimanuk-Fähre für Java↔Bali (30min). Bali↔Lombok per Schnellboot (2-3h) oder Flug (25min). Bali↔Nusa Penida per Schnellboot (30min). Lombok↔Gili per Boot (15-30min). Flores: Labuan Bajo–Ende überland (~10h) oder Flug. Sumatra: Medan–Lake Toba (4-5h Bus+Fähre), Medan–Bukit Lawang (3-4h Bus). Sulawesi: Makassar–Toraja (Bus 8-10h). Remote Inseln (Raja Ampat, Sumba, Banda, Baliem Valley) NUR per Flug erreichbar.';
      },

      legModes: 'train|bus|flight|boat',

      facts: [
        'Indonesien besteht aus über 17.380 Inseln – davon sind nur rund 6.000 bewohnt. Es ist der größte Inselstaat der Welt.',
        'Der Komodo-Waran auf den Komodo-Inseln ist die größte lebende Eidechse der Welt: Bis zu 3 Meter lang und 150 kg schwer.',
        'Borobudur auf Java ist der größte buddhistische Tempel der Welt (9. Jh.) – mit 2.672 Relieftafeln und 504 Buddha-Statuen.',
        'Indonesien liegt auf dem Pazifischen Feuerring und hat über 127 aktive Vulkane – mehr als jedes andere Land der Welt.',
        'Bali ist die einzige überwiegend hinduistische Insel im größten muslimischen Land der Welt (87% der Indonesier sind Muslime).',
        'Der Kopi Luwak aus Indonesien ist einer der teuersten Kaffees der Welt – die Bohnen werden von Schleichkatzen gefressen und wieder ausgeschieden.',
        'Auf Sumatra und Borneo leben die letzten wilden Orang-Utans der Welt – nur noch etwa 100.000 Tiere in drei vom Aussterben bedrohten Arten.',
        'Gamelan, die traditionelle Percussion-Orchestermusik Indonesiens, ist seit 2021 UNESCO-Weltkulturerbe.',
        'Die Rafflesia Arnoldii, die größte Blume der Welt, wächst in Indonesiens Regenwäldern – sie kann 1 Meter Durchmesser erreichen und riecht nach verwesendem Fleisch.',
        'Indonesien hat über 700 Sprachen und 300 ethnische Gruppen – es ist das zweit-sprachvielfältigste Land der Welt nach Papua-Neuguinea.'
      ],

      bookingLinks: {
        transport: {
          train:  { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' },
          bus:    { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' },
          flight: { name: 'Traveloka', url: 'https://www.traveloka.com/', icon: '✈️' },
          boat:   { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' }
        },
        general: [
          { name: 'Agoda', url: 'https://www.agoda.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'GetYourGuide', url: 'https://www.getyourguide.de/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Jakarta", "Yogyakarta", "Ubud", "Denpasar", "Makassar", "Medan", "Bandung", "Surabaya", "Labuan_Bajo"
  Inseln: "Bali", "Lombok", "Java", "Sumatra", "Flores", "Sulawesi", "Komodo_(island)", "Nusa_Penida", "Gili_Islands", "Sumba"
  Sehenswürdigkeiten: "Borobudur" (Borobudur-Tempel), "Prambanan" (Prambanan-Tempel), "Tanah_Lot" (Tanah-Lot-Tempel), "Uluwatu_Temple" (Uluwatu-Tempel), "Tegallalang" (Reisterrassen), "Mount_Bromo" (Mount Bromo), "Komodo_National_Park" (Komodo-Nationalpark), "Raja_Ampat_Islands" (Raja Ampat), "Lake_Toba" (Toba-See), "Ubud_Monkey_Forest" (Affenwald Ubud), "Kelimutu" (Kelimutu-Kraterseen), "Ijen" (Ijen-Vulkan), "Tana_Toraja_Regency" (Tana Toraja), "Banda_Islands" (Banda-Inseln), "Baliem_Valley" (Baliem-Tal)`,

      adjustWikiReferences: `"Jakarta", "Yogyakarta", "Ubud", "Bali", "Lombok", "Borobudur", "Prambanan", "Tanah_Lot", "Uluwatu_Temple", "Mount_Bromo", "Komodo_National_Park", "Raja_Ampat_Islands", "Lake_Toba", "Kelimutu", "Ubud_Monkey_Forest"`
    },

    // ============================
    // KAMBODSCHA
    // ============================
    cambodia: {
      id: 'cambodia',
      name: 'Kambodscha',
      brandName: 'Tempelroute',
      brandEmoji: '🛕',
      brandDescription: 'Personalisierte Routenplanung für Kambodscha-Individualreisen',
      heroTitle: 'Dein perfektes <em>Kambodscha-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Kambodscha – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'Kambodscha-Reiseexperte',
      countryInText: 'Kambodscha',
      mapCenter: [12.5, 105],
      mapZoom: 7,

      destinations: null, // wird in init() gesetzt (CAMBODIA_DESTINATIONS)

      airports: [
        { id: 'pnh', label: 'Phnom Penh', desc: 'Flughafen PNH', value: 'Phnom Penh (Flughafen)' },
        { id: 'rep', label: 'Siem Reap', desc: 'Flughafen REP', value: 'Siem Reap (Flughafen Angkor)' },
        { id: 'kos', label: 'Sihanoukville', desc: 'Flughafen KOS', value: 'Sihanoukville (Flughafen)' }
      ],
      defaultAirport: 'Phnom Penh (Flughafen)',

      airportDestMap: {
        'phnom penh': 'phnom-penh',
        'siem reap': 'siem-reap',
        'angkor': 'siem-reap',
        'sihanoukville': 'sihanoukville'
      },

      cityPairs: {
        'phnom-penh': ['siem-reap', 'kampong-cham', 'kampot', 'sihanoukville', 'battambang', 'mondulkiri', 'kampong-thom'],
        'siem-reap': ['phnom-penh', 'battambang', 'tonle-sap', 'preah-vihear', 'kampong-thom', 'phnom-kulen'],
        'battambang': ['siem-reap', 'phnom-penh', 'banteay-chhmar'],
        'kampot': ['kep', 'phnom-penh', 'sihanoukville', 'cardamom'],
        'kep': ['kampot'],
        'sihanoukville': ['kampot', 'phnom-penh', 'koh-rong', 'koh-rong-samloem', 'koh-sdach'],
        'koh-rong': ['sihanoukville', 'koh-rong-samloem'],
        'koh-rong-samloem': ['sihanoukville', 'koh-rong'],
        'kratie': ['kampong-cham', 'stung-treng', 'mondulkiri', 'koh-trong'],
        'mondulkiri': ['kratie', 'phnom-penh'],
        'kampong-cham': ['phnom-penh', 'kratie', 'kampong-thom'],
        'tonle-sap': ['siem-reap'],
        'preah-vihear': ['siem-reap'],
        'cardamom': ['sihanoukville', 'kampot', 'chi-phat'],
        'sambor-prei-kuk': ['kampong-thom'],
        'ratanakiri': ['stung-treng'],
        'stung-treng': ['kratie', 'ratanakiri'],
        'chi-phat': ['cardamom'],
        'koh-sdach': ['sihanoukville'],
        'koh-trong': ['kratie'],
        'banteay-chhmar': ['battambang', 'siem-reap'],
        'phnom-kulen': ['siem-reap'],
        'kampong-thom': ['siem-reap', 'phnom-penh', 'kampong-cham', 'sambor-prei-kuk']
      },

      transportModes: [
        { id: 'no-fly', icon: '🚌', label: 'Ohne Fliegen', desc: 'Bus & Boot, keine Flüge' },
        { id: 'ground-preferred', icon: '🚐', label: 'Bus bevorzugt', desc: 'Flug nur bei weiten Strecken' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Bus, Boot oder Flug' },
        { id: 'fast', icon: '✈️', label: 'Schnell & bequem', desc: 'Fliegen wo möglich' }
      ],
      defaultTransport: 'no-preference',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'no-fly': 'Kein Fliegen – nur Bus (Giant Ibis, Mekong Express) und Boot',
          'ground-preferred': `Bus/Boot bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Fahrt`,
          'no-preference': 'Bus, Boot oder Flug (keine Präferenz)',
          'fast': 'Inlandsflüge bevorzugt, wo verfügbar und sinnvoll'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'no-fly') {
          return 'KEINE Flüge verwenden. Nur Busse (Giant Ibis und Mekong Express = Premium mit WiFi/Snacks, Capitol/Sorya = Budget) und Boote. WICHTIG: Kambodscha hat keinen nennenswerten Zugverkehr – Busse und Minivans sind das Haupttransportmittel. Wichtige Busverbindungen: Phnom Penh–Siem Reap (6-7h, NH6), Phnom Penh–Sihanoukville (4-5h, Autobahn), Phnom Penh–Kampot (2.5-3h), Phnom Penh–Battambang (5-6h), Phnom Penh–Kampong Cham (2-3h Bus/Minivan), Siem Reap–Battambang (3-4h), Siem Reap–Kampong Thom (2-3h), Kampong Thom–Phnom Penh (3h), Kampot–Sihanoukville (2-3h), Kampot–Kep (30min Tuk-Tuk/Minivan), Kampong Cham–Kratie (3-4h), Kratie–Stung Treng (3h), Stung Treng–Banlung/Ratanakiri (3-4h), Phnom Penh–Sen Monorom/Mondulkiri (7-8h), Kratie–Mondulkiri/Sen Monorom (4-5h), Siem Reap–Preah Vihear (3-4h Privatwagen). Bootverbindungen: Sihanoukville–Koh Rong (Speedboat ~45min), Sihanoukville–Koh Rong Samloem (~1h), Sihanoukville–Koh Sdach (Speedboat ~2h), Kratie–Koh Trong (Fähre ~10min). Route so planen, dass alle Strecken per Bus oder Boot machbar sind.';
        } else if (transport === 'ground-preferred') {
          return `Bus/Minivan/Boot bevorzugt. Inlandsflug erst empfehlen, wenn die Fahrt länger als ${trainMaxHours} Stunden dauert. Giant Ibis und Mekong Express für Premium-Komfort mit WiFi und Snacks. WICHTIG: Kambodscha hat keinen Zugverkehr – Busse sind das Haupttransportmittel. Wichtige Verbindungen: Phnom Penh–Siem Reap (6-7h Bus), Phnom Penh–Sihanoukville (4-5h Bus), Phnom Penh–Kampot (2.5-3h), Phnom Penh–Battambang (5-6h), Siem Reap–Battambang (3-4h), Kampot–Sihanoukville (2-3h), Kampot–Kep (30min), Kampong Cham–Kratie (3-4h), Kratie–Stung Treng (3h). Bootverbindungen: Sihanoukville–Koh Rong (~45min), Sihanoukville–Koh Rong Samloem (~1h), Kratie–Koh Trong (Fähre ~10min). Nachtbusse möglich auf der Strecke Phnom Penh–Siem Reap.`;
        } else if (transport === 'fast') {
          return 'Inlandsflüge bevorzugen, wo verfügbar: Phnom Penh↔Siem Reap (~45min, mehrere Flüge täglich), Phnom Penh↔Sihanoukville (~40min). Für kürzere Strecken Premium-Busse (Giant Ibis) oder Privatwagen mit Fahrer (~50-80$/Tag). Wichtige Busverbindungen: Phnom Penh–Kampot (2.5-3h), Kampot–Kep (30min), Kampot–Sihanoukville (2-3h), Siem Reap–Battambang (3-4h), Kampong Cham–Kratie (3-4h). Speedboats für Inseln ab Sihanoukville (Koh Rong ~45min, Koh Rong Samloem ~1h).';
        }
        return 'Kombiniere Busse (Giant Ibis/Mekong Express für Komfort), Minivans und ggf. Inlandsflüge. WICHTIG: Kambodscha hat keinen Zugverkehr. Wichtige Verbindungen: Phnom Penh↔Siem Reap: Flug (45min) oder Premium-Bus (6-7h). Phnom Penh↔Sihanoukville: Bus (4-5h) oder Flug (40min). Phnom Penh–Kampot (2.5-3h), Phnom Penh–Battambang (5-6h), Siem Reap–Battambang (3-4h), Kampot–Sihanoukville (2-3h), Kampot–Kep (30min), Siem Reap–Kampong Thom (2-3h), Kampong Cham–Kratie (3-4h), Kratie–Stung Treng (3h). Inseln ab Sihanoukville per Speedboat (Koh Rong ~45min, Koh Rong Samloem ~1h). Für Strecken unter 5h empfehle Bus/Minivan, darüber Inlandsflug.';
      },

      legModes: 'bus|flight|boat',

      facts: [
        'Angkor Wat ist das größte religiöse Bauwerk der Welt – mit einer Fläche von über 162 Hektar, größer als jede Kathedrale oder Moschee.',
        'Kambodscha ist das einzige Land der Welt, dessen Flagge ein Gebäude zeigt: Angkor Wat prangt auf der Nationalflagge.',
        'Kampot-Pfeffer gilt als der beste Pfeffer der Welt und war im 19. Jahrhundert das Lieblingsgewürz der französischen Haute Cuisine.',
        'Der Tonle Sap ist Südostasiens größter Süßwassersee – er verdreifacht seine Fläche während der Regenzeit auf bis zu 16.000 km².',
        'In der Mekong-Region bei Kratié leben die letzten Irrawaddy-Süßwasserdelfine – weniger als 100 Tiere.',
        'Die Khmer-Schrift hat mit 74 Zeichen das größte Alphabet der Welt – ein Eintrag im Guinness-Buch der Rekorde.',
        'Das antike Angkor war mit über 1.000 km² die größte vorindustrielle Stadt der Welt – größer als das heutige London.',
        'Kambodschas Kardamomgebirge beherbergt den größten zusammenhängenden Regenwald Südostasiens.',
        'Amok, Kambodschas Nationalgericht, ist ein gedämpfter Fischcurry in Bananenblättern – gewürzt mit Zitronengras, Galgant und Kurkuma.',
        'Die Bambusbrücke in Kampong Cham wird jedes Jahr komplett neu gebaut, wenn die Regenzeit endet – ein Meisterwerk temporärer Architektur.'
      ],

      bookingLinks: {
        transport: {
          bus:    { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' },
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' },
          boat:   { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' }
        },
        general: [
          { name: 'Agoda', url: 'https://www.agoda.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'GetYourGuide', url: 'https://www.getyourguide.de/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Phnom_Penh", "Siem_Reap", "Battambang", "Kampot", "Kep,_Cambodia", "Sihanoukville", "Kratié", "Kampong_Cham", "Kampong_Thom", "Stung_Treng"
  Inseln: "Koh_Rong", "Koh_Rong_Sanloem", "Koh_Sdach", "Koh_Trong"
  Sehenswürdigkeiten: "Angkor_Wat" (Angkor Wat), "Bayon" (Bayon-Tempel), "Ta_Prohm" (Ta Prohm), "Angkor_Thom" (Angkor Thom), "Banteay_Srei" (Banteay Srei), "Royal_Palace,_Phnom_Penh" (Königspalast), "Silver_Pagoda" (Silberpagode), "Tuol_Sleng_Genocide_Museum" (Tuol Sleng), "Choeung_Ek" (Killing Fields), "Tonlé_Sap" (Tonle Sap), "Preah_Vihear_Temple" (Preah Vihear), "Sambor_Prei_Kuk" (Sambor Prei Kuk), "Bokor_Hill_Station" (Bokor), "Cardamom_Mountains" (Kardamomgebirge), "Phnom_Kulen_National_Park" (Phnom Kulen), "Banteay_Chhmar" (Banteay Chhmar), "Mondulkiri_Province" (Mondulkiri)`,

      adjustWikiReferences: `"Phnom_Penh", "Siem_Reap", "Battambang", "Kampot", "Sihanoukville", "Angkor_Wat", "Bayon", "Ta_Prohm", "Angkor_Thom", "Royal_Palace,_Phnom_Penh", "Tonlé_Sap", "Preah_Vihear_Temple", "Koh_Rong", "Sambor_Prei_Kuk", "Mondulkiri_Province"`
    },

    // ============================
    // SRI LANKA
    // ============================
    srilanka: {
    id: 'srilanka',
    name: 'Sri Lanka',
    brandName: 'Perlenroute',
    brandEmoji: '🍃',
    brandDescription: 'Personalisierte Routenplanung für Sri-Lanka-Individualreisen',
    heroTitle: 'Entdecke die Perle des Indischen Ozeans',
    heroSubtitle: 'Tempel, Teeplantagen und tropische Strände auf einer kompakten Insel',
    expertRole: 'Sri-Lanka-Reiseexperte',
    countryInText: 'Sri Lanka',
    mapCenter: [7.8, 80.7],
    mapZoom: 7,

    destinations: null, // wird in init() gesetzt (SRILANKA_DESTINATIONS)

    airports: [
      { id: 'cmb', label: 'Colombo', desc: 'Flughafen CMB', value: 'Colombo (Bandaranaike International)' }
    ],
    defaultAirport: 'Colombo (Bandaranaike International)',

    airportDestMap: {
      'colombo': 'colombo',
      'bandaranaike': 'colombo'
    },

    cityPairs: {
      'colombo': ['kandy', 'galle', 'hikkaduwa', 'unawatuna'],
      'kandy': ['colombo', 'sigiriya', 'dambulla', 'nuwara-eliya', 'knuckles'],
      'sigiriya': ['dambulla', 'kandy', 'polonnaruwa', 'anuradhapura'],
      'dambulla': ['sigiriya', 'kandy', 'polonnaruwa', 'anuradhapura'],
      'galle': ['colombo', 'unawatuna', 'mirissa', 'hikkaduwa'],
      'ella': ['nuwara-eliya', 'haputale', 'yala', 'udawalawe'],
      'nuwara-eliya': ['kandy', 'ella', 'haputale', 'adams-peak'],
      'trincomalee': ['anuradhapura', 'polonnaruwa', 'batticaloa', 'jaffna'],
      'mirissa': ['galle', 'unawatuna', 'tangalle'],
      'unawatuna': ['galle', 'mirissa', 'hikkaduwa'],
      'anuradhapura': ['sigiriya', 'dambulla', 'polonnaruwa', 'trincomalee', 'jaffna', 'wilpattu'],
      'polonnaruwa': ['sigiriya', 'dambulla', 'anuradhapura', 'trincomalee', 'batticaloa'],
      'jaffna': ['anuradhapura', 'trincomalee'],
      'arugam-bay': ['batticaloa', 'ella', 'yala'],
      'yala': ['ella', 'tangalle', 'udawalawe', 'mirissa'],
      'haputale': ['ella', 'nuwara-eliya'],
      'udawalawe': ['ella', 'yala', 'tangalle'],
      'adams-peak': ['nuwara-eliya', 'kandy'],
      'tangalle': ['mirissa', 'yala', 'udawalawe'],
      'knuckles': ['kandy'],
      'batticaloa': ['trincomalee', 'arugam-bay', 'polonnaruwa'],
      'hikkaduwa': ['galle', 'colombo', 'unawatuna'],
      'wilpattu': ['anuradhapura']
    },

    transportModes: [
      { id: 'no-fly', label: 'Ohne Fliegen', desc: 'Zug & Bus, keine Flüge', icon: '🚂', value: 'no-fly' },
      { id: 'train-preferred', label: 'Zug bevorzugt', desc: 'Flug nur bei weiten Strecken', icon: '🚃', value: 'train-preferred', default: true },
      { id: 'no-preference', label: 'Egal', desc: 'Zug, Bus oder Flug', icon: '🗺️', value: 'no-preference' },
      { id: 'ground-preferred', label: 'Schnell & bequem', desc: 'Privatwagen/Flug bevorzugt', icon: '✈️', value: 'ground-preferred' }
    ],
    defaultTransport: 'train-preferred',

    legModes: 'train|bus|flight',

    transportPrompt(transport, trainMaxHours) {
      const names = {
        'no-fly': 'Kein Fliegen – nur Zug und Bus',
        'train-preferred': `Zug bevorzugt, Flug nur bei extremen Entfernungen (max. ${trainMaxHours}h Zugfahrt)`,
        'no-preference': 'Zug, Bus oder Flug (keine Präferenz)',
        'ground-preferred': 'Schnell & bequem – Privatwagen/Flug bevorzugt'
      };
      return names[transport] || names['no-preference'];
    },

    transportRules(transport, trainMaxHours) {
      if (transport === 'no-fly') {
        return 'Kein Fliegen: Ausschließlich Züge und Busse verwenden. Zugstrecken: Colombo–Kandy (3h), Colombo–Galle (Küstenzug 2-3h, landschaftlich schön!), Colombo–Jaffna (Yal Devi, 6-7h), HIGHLIGHT: Kandy–Nuwara Eliya–Ella (~6h, eine der spektakulärsten Bahnstrecken der Welt – 2nd Class Reserved Seat buchen!). Busverbindungen (kein Zug): Kandy–Sigiriya/Dambulla (3h Bus), Sigiriya–Polonnaruwa (1.5-2h Bus), Anuradhapura–Sigiriya (2-3h Bus), Ella–Arugam Bay (4-5h Bus via Wellawaya), Ella–Yala/Tissamaharama (3-4h Bus), Ella–Udawalawe (3h Bus), Galle–Mirissa (30-45min), Mirissa–Tangalle (45min-1h), Trincomalee–Batticaloa (3-4h Bus). Privatwagen mit Fahrer ist eine beliebte Alternative (~40-60$/Tag).';
      } else if (transport === 'train-preferred') {
        return `Zug bevorzugt (max. ${trainMaxHours}h pro Fahrt). Zugstrecken: Colombo–Kandy (3h), Colombo–Galle (Küstenzug 2-3h), Colombo–Jaffna (Yal Devi, 6-7h). HIGHLIGHT: Kandy→Ella (~6h) – eine der schönsten Bahnstrecken der Welt, 2nd Class Reserved empfehlen! Busse für Strecken ohne Bahnanbindung: Kandy–Sigiriya/Dambulla (3h), Ella–Arugam Bay (4-5h), Ella–Yala (3-4h), Ella–Udawalawe (3h), Sigiriya–Polonnaruwa (1.5-2h). Privatwagen mit Fahrer (~40-60$/Tag) für flexible Strecken. Inlandsflüge nur bei extremen Entfernungen.`;
      } else if (transport === 'ground-preferred') {
        return 'Schnell & bequem: Privatwagen mit Fahrer ist in Sri Lanka die komfortabelste Option (~40-60$/Tag) und ideal für Sigiriya, Yala, Arugam Bay. Inlandsflüge begrenzt verfügbar (Cinnamon Air: Colombo→Jaffna ~1h, Colombo→Batticaloa). TROTZDEM die Zugfahrt Kandy→Ella einplanen (~6h) – sie ist ein Erlebnis, kein reines Transportmittel! Colombo–Kandy per Zug (3h). Colombo–Galle per Küstenzug (2-3h). Busse: Kandy–Sigiriya (3h), Ella–Arugam Bay (4-5h), Ella–Yala (3-4h).';
      }
      return 'Kombiniere Züge (Sri Lanka Railway), Busse (Intercity Express) und ggf. Inlandsflüge. MUST-DO: Zugfahrt Kandy→Nuwara Eliya→Ella (~6h) – eine der spektakulärsten Bahnstrecken der Welt (2nd Class Reserved Seat buchen!). Colombo→Kandy per Zug (3h). Colombo→Galle per Küstenzug (2-3h, landschaftlich schön!). Jaffna per Zug (Yal Devi, 6-7h). Busverbindungen: Kandy–Sigiriya/Dambulla (3h), Sigiriya–Polonnaruwa (1.5-2h), Ella–Arugam Bay (4-5h Bus), Ella–Yala (3-4h Bus), Ella–Udawalawe (3h Bus), Galle–Mirissa (30-45min), Mirissa–Tangalle (45min-1h), Trincomalee–Batticaloa (3-4h). Privatwagen mit Fahrer ist eine beliebte flexible Option (~40-60$/Tag). Sri Lanka ist kompakt – die meisten Transfers dauern 3-5h.';
    },

    facts: [
      'Sri Lanka hat 8 UNESCO-Welterbestätten auf einer Fläche kleiner als Bayern – eine der höchsten Dichten weltweit.',
      'Die Zugstrecke Kandy–Ella gilt als eine der schönsten Bahnfahrten der Welt – vorbei an Teeplantagen, Wasserfällen und Berglandschaften.',
      'Sigiriya, der Löwenfelsen, ist eine 200m hohe Festung aus dem 5. Jahrhundert mit Fresken und einer Aussicht über den endlosen Dschungel.',
      'Sri Lanka ist der viertgrößte Teeproduzent der Welt – Ceylon-Tee wird in Höhenlagen bis 2.500m angebaut.',
      'Die Insel hat die höchste Biodiversität pro Quadratkilometer in ganz Asien – mit Leoparden, Elefanten und Blauwalen.',
      'In Mirissa und Trincomalee kann man Blauwale beobachten – die größten Tiere, die je auf der Erde gelebt haben.',
      'Sri Lankas Küche ist eine der schärfsten der Welt – ein typisches Rice & Curry besteht aus bis zu 12 verschiedenen Beilagen.',
      'Der Zahntempel in Kandy bewahrt angeblich einen Zahn Buddhas auf und ist das spirituelle Zentrum des Landes.',
      'Polonnaruwa und Anuradhapura waren antike Königsstädte mit monumentalen Stupas und Buddha-Statuen aus dem 3. Jahrhundert v. Chr.',
      'Adam\'s Peak (Sri Pada) wird von vier Religionen als heilig verehrt – Buddhisten, Hindus, Muslime und Christen pilgern gemeinsam auf den Gipfel.'
    ],

    bookingLinks: {
      transport: {
        train:  { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' },
        bus:    { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' },
        flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' }
      },
      general: [
        { name: 'Agoda', url: 'https://www.agoda.com/', icon: '🏨', label: 'Unterkünfte' },
        { name: 'Viator', url: 'https://www.viator.com/', icon: '🎭', label: 'Aktivitäten & Touren' }
      ]
    },

    wikiReferences: `Städte: "Colombo", "Kandy", "Galle,_Sri_Lanka" (Galle), "Jaffna", "Trincomalee", "Batticaloa", "Nuwara_Eliya", "Ella,_Sri_Lanka" (Ella)
  Natur: "Sigiriya" (Löwenfelsen), "Yala_National_Park" (Yala), "Udawalawe_National_Park" (Udawalawe), "Wilpattu_National_Park" (Wilpattu), "Knuckles_Mountain_Range" (Knuckles Range), "Horton_Plains_National_Park" (Horton Plains), "Adam's_Peak" (Adam's Peak)
  Kultur: "Dambulla_cave_temple" (Dambulla), "Anuradhapura" (Anuradhapura), "Polonnaruwa" (Polonnaruwa), "Temple_of_the_Tooth" (Zahntempel), "Galle_Fort" (Galle Fort)
  Strände: "Mirissa", "Unawatuna", "Arugam_Bay", "Hikkaduwa", "Tangalle", "Nilaveli"
  Transport: "Sri_Lanka_Railways" (Zugverkehr)`,

    adjustWikiReferences: `"Colombo", "Kandy", "Sigiriya", "Galle,_Sri_Lanka", "Ella,_Sri_Lanka", "Anuradhapura", "Polonnaruwa", "Jaffna", "Yala_National_Park", "Temple_of_the_Tooth", "Dambulla_cave_temple", "Mirissa", "Nuwara_Eliya", "Trincomalee", "Adam's_Peak"`
    },

    // ==========================================
    // PHILIPPINEN
    // ==========================================
    philippines: {
      id: 'philippines',
      name: 'Philippinen',
      brandName: 'Archipelroute',
      brandEmoji: '🏝️',
      brandDescription: 'Personalisierte Routenplanung für Philippinen-Individualreisen',
      heroTitle: 'Dein perfektes <em>Philippinen-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch die Philippinen – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'Philippinen-Reiseexperte mit tiefem Wissen über die 7.641 Inseln',
      countryInText: 'die Philippinen',
      mapCenter: [12.5, 122],
      mapZoom: 6,

      destinations: null,

      airports: [
        { id: 'mnl', label: 'Manila', desc: 'Ninoy Aquino International (MNL)', value: 'Manila (Ninoy Aquino International)' },
        { id: 'ceb', label: 'Cebu', desc: 'Mactan-Cebu International (CEB)', value: 'Cebu (Mactan-Cebu International)' },
        { id: 'crk', label: 'Clark', desc: 'Clark International (CRK)', value: 'Clark (Clark International)' },
        { id: 'dvo', label: 'Davao', desc: 'Francisco Bangoy International (DVO)', value: 'Davao (Francisco Bangoy International)' },
        { id: 'pps', label: 'Puerto Princesa', desc: 'Puerto Princesa International (PPS)', value: 'Puerto Princesa (Flughafen PPS)' },
        { id: 'klo', label: 'Kalibo', desc: 'Kalibo International (KLO, Boracay)', value: 'Kalibo (Kalibo International, Boracay)' }
      ],
      defaultAirport: 'Manila (Ninoy Aquino International)',

      airportDestMap: {
        'manila': 'manila',
        'ninoy': 'manila',
        'cebu': 'cebu',
        'mactan': 'cebu',
        'clark': 'manila',
        'davao': 'davao',
        'bangoy': 'davao',
        'puerto princesa': 'palawan',
        'kalibo': 'boracay',
        'boracay': 'boracay'
      },

      cityPairs: {
        'manila': ['baguio', 'vigan', 'banaue'],
        'baguio': ['manila', 'sagada', 'vigan', 'banaue'],
        'sagada': ['baguio', 'banaue'],
        'banaue': ['baguio', 'sagada', 'manila'],
        'vigan': ['baguio', 'manila'],
        'cebu': ['bohol', 'dumaguete', 'moalboal'],
        'bohol': ['cebu', 'dumaguete', 'camiguin'],
        'dumaguete': ['cebu', 'bohol', 'siquijor'],
        'elnido': ['coron', 'palawan'],
        'coron': ['elnido', 'palawan'],
        'palawan': ['elnido', 'coron'],
        'boracay': ['iloilo'],
        'iloilo': ['boracay', 'guimaras'],
        'siargao': ['cebu', 'davao'],
        'davao': ['siargao'],
        'moalboal': ['cebu'],
        'siquijor': ['dumaguete'],
        'camiguin': ['bohol', 'cebu'],
        'guimaras': ['iloilo'],
        'donsol': ['manila'],
        'caramoan': ['manila'],
        'romblon': ['manila'],
        'batanes': ['manila']
      },

      transportModes: [
        { id: 'no-fly', icon: '⛴️', label: 'Ohne Fliegen', desc: 'Fähre & Bus, keine Flüge' },
        { id: 'island-hop', icon: '🚐', label: 'Wenig fliegen', desc: 'Fähre/Bus bevorzugt, Flug nur bei weiten Strecken' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Fähre, Bus oder Flug' },
        { id: 'fast', icon: '✈️', label: 'Schnell & bequem', desc: 'Fliegen zwischen Inseln' }
      ],
      defaultTransport: 'no-preference',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'no-fly': 'Kein Fliegen – nur Fähren und Busse',
          'island-hop': `Fähre/Bus bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Reisezeit`,
          'no-preference': 'Fähre, Bus oder Flug (keine Präferenz)',
          'fast': 'Inlandsflüge bevorzugt – schnell zwischen den Inseln'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'no-fly') {
          return 'KEINE Flüge verwenden. Nur Fähren und Busse/Vans. WICHTIG: Die Philippinen sind ein Archipel – Reisen zwischen den Inselgruppen erfordern Fähren. Wichtige Fährverbindungen: Cebu↔Bohol/Tagbilaran (Schnellfähre ~2h, OceanJet/Lite Ferries), Dumaguete↔Siquijor (~1h Fähre), Iloilo↔Guimaras (~20min Fähre), El Nido↔Coron (~3.5-5h Speedboot, wetterabhängig), Manila↔Coron (2GO Nachtfähre ~12h), Batangas↔Romblon (~7-12h Fähre). Busverbindungen (innerhalb Luzon): Manila–Baguio (5-6h Bus, Victory Liner/JoyBus), Baguio–Sagada (5-6h Bus/Van), Manila–Banaue (9-10h Nachtbus, Ohayami Trans), Manila–Vigan (8-10h Bus, Partas), Manila–Legazpi (10-12h Bus). Innerhalb Cebu: Cebu City–Moalboal (~3h Bus). Innerhalb Palawan: Puerto Princesa–El Nido (~5-6h Van). EINSCHRÄNKUNG: Ohne Flüge sind die Inselgruppen Luzon, Visayas, Palawan und Mindanao nur schwer kombinierbar – Route auf 1-2 Inselgruppen beschränken!';
        } else if (transport === 'island-hop') {
          return `Fähre/Bus bevorzugt. Inlandsflug erst empfehlen, wenn die Reisezeit länger als ${trainMaxHours} Stunden ist. Wichtige Fähren: Cebu↔Bohol (~2h Schnellfähre), Dumaguete↔Siquijor (~1h), Iloilo↔Guimaras (~20min), El Nido↔Coron (~3.5-5h Boot). Busse auf Luzon: Manila–Baguio (5-6h), Baguio–Sagada (5-6h), Manila–Banaue (9-10h Nachtbus), Manila–Vigan (8-10h). Palawan: Puerto Princesa–El Nido (~5-6h Van). Cebu: Cebu City–Moalboal (~3h Bus). Flüge nur für Verbindungen zwischen weit entfernten Inselgruppen: Manila↔Cebu (1.5h), Manila↔Davao (1.5h), Manila↔Puerto Princesa (1.5h), Manila↔Siargao (2.5h), Cebu↔Siargao (1.5h).`;
        } else if (transport === 'fast') {
          return 'Inlandsflüge bevorzugen für alle Verbindungen zwischen Inselgruppen. Philippines AirAsia, Cebu Pacific und Philippine Airlines bieten günstige Inlandsflüge. Wichtige Flugverbindungen: Manila↔Cebu (1.5h), Manila↔Davao (1.5h), Manila↔Puerto Princesa (1.5h), Manila↔Boracay/Kalibo (1h), Manila↔Siargao (2.5h direkt oder via Cebu), Manila↔Bohol/Panglao (1.5h), Manila↔Coron/Busuanga (1h), Manila↔Iloilo (1h), Manila↔Legazpi (1h), Manila↔Batanes/Basco (2h), Cebu↔Siargao (1.5h), Cebu↔Davao (1h). Für kurze Strecken innerhalb einer Insel: Fähren oder Vans. Cebu↔Bohol (~2h Schnellfähre), Iloilo↔Guimaras (~20min Fähre), Puerto Princesa–El Nido (~5-6h Van oder 1h Flug nach El Nido/Lio Airport).';
        }
        return 'Kombiniere Inlandsflüge, Fähren und Busse/Vans. WICHTIG: Die Philippinen sind ein Archipel – zwischen Inselgruppen sind Flüge oder Fähren nötig. Flugverbindungen: Manila↔Cebu (1.5h), Manila↔Davao (1.5h), Manila↔Puerto Princesa (1.5h), Manila↔Boracay/Kalibo (1h), Manila↔Siargao (2.5h), Manila↔Bohol (1.5h), Manila↔Coron (1h), Manila↔Iloilo (1h), Cebu↔Siargao (1.5h). Fähren: Cebu↔Bohol (~2h Schnellfähre), Dumaguete↔Siquijor (~1h), El Nido↔Coron (~3.5-5h Boot), Iloilo↔Guimaras (~20min). Busse/Vans auf Luzon: Manila–Baguio (5-6h), Baguio–Sagada (5-6h), Manila–Banaue (9-10h Nachtbus), Manila–Vigan (8-10h). Palawan: Puerto Princesa–El Nido (~5-6h Van). Für Strecken unter 5h empfehle Bus/Fähre, darüber Inlandsflug. Airlines: Cebu Pacific, Philippine Airlines, AirAsia Philippines.';
      },

      legModes: 'flight|bus|boat',

      facts: [
        'Die Philippinen bestehen aus 7.641 Inseln – davon sind nur etwa 2.000 bewohnt und über 5.000 haben nicht einmal einen Namen.',
        'Filipinos feiern ab September Weihnachten (die „Ber Months") – mit fast fünf Monaten die längste Weihnachtssaison der Welt.',
        'Das Chinatown in Manila (Binondo) wurde 1594 gegründet und ist damit das älteste Chinatown der Welt.',
        'Der Philippinische Koboldmaki (Tarsier) auf Bohol ist nur 8–16 cm groß – seine Augen sind größer als sein Gehirn.',
        'Der Underground River in Palawan ist mit 8,2 km der längste schiffbare unterirdische Fluss der Welt (UNESCO-Welterbe).',
        'Die 1.268 Chocolate Hills auf Bohol sind geologisch einzigartig – kegelförmige Hügel, die sich in der Trockenzeit schokoladenbraun färben.',
        'Die bunten Jeepneys, das Wahrzeichen der Philippinen, sind umgebaute US-Militär-Jeeps aus dem Zweiten Weltkrieg.',
        'Karaoke ist in den Philippinen quasi Nationalsport – selbst im kleinsten Dorf steht eine Karaoke-Maschine.',
        'Das Yo-Yo wurde auf den Philippinen erfunden und diente ursprünglich als Jagdwaffe. Das Wort kommt aus dem Tagalog.',
        'Die Philippinen sind das drittgrößte englischsprachige Land der Welt – nach den USA und Indien.'
      ],

      bookingLinks: {
        transport: {
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' },
          bus:    { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' },
          boat:   { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' }
        },
        general: [
          { name: 'Agoda', url: 'https://www.agoda.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'Viator', url: 'https://www.viator.com/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Manila", "Cebu_City", "Davao_City", "Iloilo_City", "Baguio", "Dumaguete", "Vigan", "Puerto_Princesa"
Inseln & Strände: "Boracay", "Siargao", "Bohol", "Coron,_Palawan", "El_Nido,_Palawan", "Batanes", "Siquijor", "Camiguin", "Romblon", "Guimaras", "Caramoan"
Sehenswürdigkeiten: "Banaue_Rice_Terraces" (UNESCO Reisterrassen), "Chocolate_Hills" (Chocolate Hills), "Puerto_Princesa_Underground_River" (Underground River UNESCO), "Intramuros" (Intramuros Manila), "Magellan's_Cross" (Magellan-Kreuz Cebu), "Sagada" (Hängende Särge), "Kawasan_Falls" (Kawasan Falls), "Tubbataha_Reefs_Natural_Park" (Tubbataha Riff)
Natur: "Philippine_Eagle" (Philippinenadler), "Whale_shark" (Walhaie Donsol), "Tarsier" (Koboldmaki Bohol), "Mount_Apo" (höchster Berg)
Transport: "Jeepney" (Jeepneys), "2GO_Travel" (Fähren)`,

      adjustWikiReferences: `"Manila", "Cebu_City", "Boracay", "El_Nido,_Palawan", "Bohol", "Siargao", "Coron,_Palawan", "Puerto_Princesa", "Banaue_Rice_Terraces", "Vigan", "Davao_City", "Sagada", "Baguio", "Iloilo_City", "Dumaguete"`
    },

    // ==========================================
    // SÜDKOREA
    // ==========================================
    southkorea: {
      id: 'southkorea',
      name: 'Südkorea',
      brandName: 'Morgenroute',
      brandEmoji: '🎭',
      brandDescription: 'Personalisierte Routenplanung für Südkorea-Individualreisen',
      heroTitle: 'Dein perfektes <em>Südkorea-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Südkorea – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'Südkorea-Reiseexperte mit tiefem Wissen über K-Culture, Tempel und KTX-Netz',
      countryInText: 'Südkorea',
      mapCenter: [36.0, 127.8],
      mapZoom: 7,

      destinations: null,

      airports: [
        { id: 'icn', label: 'Seoul/Incheon', desc: 'Incheon International (ICN)', value: 'Seoul (Incheon International)' },
        { id: 'gmp', label: 'Seoul/Gimpo', desc: 'Gimpo International (GMP)', value: 'Seoul (Gimpo International)' },
        { id: 'pus', label: 'Busan', desc: 'Gimhae International (PUS)', value: 'Busan (Gimhae International)' },
        { id: 'cju', label: 'Jeju', desc: 'Jeju International (CJU)', value: 'Jeju (Jeju International)' }
      ],
      defaultAirport: 'Seoul (Incheon International)',

      airportDestMap: {
        'seoul': 'seoul',
        'incheon': 'incheon',
        'gimpo': 'seoul',
        'busan': 'busan',
        'gimhae': 'busan',
        'jeju': 'jeju'
      },

      cityPairs: {
        'seoul': ['suwon', 'incheon', 'chuncheon', 'ganghwa'],
        'suwon': ['seoul'],
        'incheon': ['seoul', 'ganghwa'],
        'chuncheon': ['seoul', 'sokcho'],
        'sokcho': ['gangneung', 'chuncheon'],
        'gangneung': ['sokcho'],
        'andong': ['gyeongju', 'danyang', 'daegu'],
        'danyang': ['andong'],
        'daegu': ['gyeongju', 'andong', 'busan'],
        'gyeongju': ['busan', 'daegu', 'andong'],
        'busan': ['gyeongju', 'daegu', 'tongyeong'],
        'tongyeong': ['busan', 'yeosu'],
        'yeosu': ['suncheon', 'tongyeong', 'hadong'],
        'suncheon': ['yeosu', 'boseong', 'gwangju'],
        'boseong': ['suncheon', 'gwangju'],
        'gwangju': ['damyang', 'boseong', 'suncheon', 'jeonju'],
        'damyang': ['gwangju'],
        'jeonju': ['gwangju', 'buyeo', 'gongju'],
        'buyeo': ['gongju', 'jeonju'],
        'gongju': ['buyeo', 'jeonju'],
        'hadong': ['yeosu'],
        'ganghwa': ['incheon', 'seoul'],
        'jeju': [],
        'ulleungdo': []
      },

      transportModes: [
        { id: 'no-fly', icon: '🚅', label: 'Nur KTX/Zug', desc: 'Keine Inlandsflüge' },
        { id: 'train-preferred', icon: '🚅', label: 'KTX bevorzugt', desc: 'Flug nur bei weiten Strecken' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'KTX, Bus oder Flug' },
        { id: 'fast', icon: '✈️', label: 'Schnell & bequem', desc: 'KTX + Flüge' }
      ],
      defaultTransport: 'no-preference',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'no-fly': 'Kein Fliegen – nur KTX, Zug und Bus',
          'train-preferred': `KTX/Zug bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Reisezeit`,
          'no-preference': 'KTX, Bus oder Flug (keine Präferenz)',
          'fast': 'KTX + Inlandsflüge – schnellste Verbindungen'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'no-fly') {
          return 'NUR Zug und Bus verwenden – keine Inlandsflüge. Südkoreas KTX-Netz ist exzellent. Wichtige KTX-Strecken: Seoul–Busan (2h15), Seoul–Gyeongju/Singyeongju (2h), Seoul–Daegu (1h40), Seoul–Daejeon (50min), Seoul–Gangneung (2h), Seoul–Jeonju (1h40), Seoul–Gwangju (1h50), Seoul–Yeosu (2h40). Weitere Verbindungen: Seoul–Chuncheon ITX (1h15), Seoul–Suwon (30min S-Bahn), Seoul–Sokcho (2.5h Expressbus), Seoul–Andong (2.5h Bus), Busan–Gyeongju (30min KTX). WICHTIG: Jeju ist nur per Fähre ab Mokpo erreichbar (~4.5h) – bei reiner Zug-Präferenz Jeju als Ausnahme behandeln oder meiden. Ulleungdo per Fähre ab Pohang/Gangneung (~3h).';
        } else if (transport === 'train-preferred') {
          return `KTX/Zug bevorzugt. Inlandsflug erst empfehlen, wenn Reisezeit länger als ${trainMaxHours} Stunden. KTX: Seoul–Busan (2h15), Seoul–Gyeongju (2h), Seoul–Daegu (1h40), Seoul–Gangneung (2h), Seoul–Jeonju (1h40), Seoul–Gwangju (1h50), Seoul–Yeosu (2h40). Bus: Seoul–Sokcho (2.5h), Seoul–Andong (2.5h), Gwangju–Damyang (30min), Gwangju–Boseong (1.5h). Jeju per Flug ab Gimpo (1h10) oder Busan (55min).`;
        } else if (transport === 'fast') {
          return 'Schnellste Verbindungen nutzen: KTX für alle Festland-Strecken + Flüge für Jeju. KTX: Seoul–Busan (2h15), Seoul–Daegu (1h40), Seoul–Gangneung (2h), Seoul–Gwangju (1h50). Flüge: Seoul/Gimpo–Jeju (1h10), Busan–Jeju (55min). Expressbusse für Strecken ohne KTX: Seoul–Sokcho (2.5h), Seoul–Andong (2.5h). Ulleungdo per Fähre ab Pohang (~3h).';
        }
        return 'Kombiniere KTX (Hochgeschwindigkeitszug), Expressbusse und Inlandsflüge. KTX: Seoul–Busan (2h15), Seoul–Gyeongju (2h), Seoul–Daegu (1h40), Seoul–Gangneung (2h), Seoul–Jeonju (1h40), Seoul–Gwangju (1h50), Seoul–Yeosu (2h40). Bus: Seoul–Sokcho (2.5h), Seoul–Andong (2.5h), Gwangju–Damyang (30min). Flüge: Seoul/Gimpo–Jeju (1h10), Busan–Jeju (55min). Fähren: Pohang–Ulleungdo (~3h). Airlines: Korean Air, Asiana, Jin Air, T-way. Für Strecken unter 3h empfehle KTX/Bus, darüber je nach Verfügbarkeit Flug.';
      },

      legModes: 'train|bus|flight|boat',

      facts: [
        'Südkorea hat das schnellste Internet der Welt – mit Durchschnittsgeschwindigkeiten von über 200 Mbit/s ist das Land seit Jahren Spitzenreiter.',
        'Seoul–Jeju ist eine der meistgeflogenen Flugrouten der Welt – über 60.000 Flüge pro Jahr pendeln zwischen Hauptstadt und Vulkaninsel.',
        'Fast jeder koreanische Haushalt besitzt einen speziellen Kimchi-Kühlschrank zur perfekten Fermentierung des Nationalgerichts.',
        'Die Hallyu-Welle (koreanische Welle) hat K-Pop und K-Drama zu einem milliardenschweren Kulturexport gemacht – von BTS bis Squid Game.',
        'In Südkorea sagt man beim Fotografieren nicht „Cheese", sondern „Kimchi!" – das i am Ende erzeugt das gleiche Lächeln.',
        'Das KTX-Hochgeschwindigkeitsnetz verbindet Seoul mit Busan in nur 2 Stunden 15 Minuten bei bis zu 305 km/h.',
        'Südkorea ist die E-Sport-Welthauptstadt – professionelle Gamer genießen Prominentenstatus und StarCraft-Turniere laufen im Fernsehen.',
        'Koreaner feiern zwei Neujahrstage: den westlichen 1. Januar und das Seollal (Mondneujahr) mit traditionellen Hanbok-Trachten.',
        'Trinkgeld zu geben gilt in Korea als unhöflich – in Restaurants, Taxis und Hotels wird keines erwartet.',
        'Über 40% aller Dolmen weltweit stehen in Südkorea – mit über 40.000 prähistorischen Steingrabanlagen ist das Land absoluter Dolmen-Weltmeister.'
      ],

      bookingLinks: {
        transport: {
          train:  { name: 'Korail', url: 'https://www.letskorail.com/', icon: '🎫' },
          bus:    { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' },
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' },
          boat:   { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' }
        },
        general: [
          { name: 'Agoda', url: 'https://www.agoda.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'Viator', url: 'https://www.viator.com/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Seoul", "Busan", "Jeju_Island", "Gyeongju", "Jeonju", "Gangneung", "Sokcho", "Suwon", "Yeosu", "Andong", "Tongyeong", "Gwangju", "Chuncheon", "Incheon", "Daegu"
Sehenswürdigkeiten: "Gyeongbokgung" (Gyeongbokgung-Palast), "Changdeokgung" (Changdeokgung), "Bukchon_Hanok_Village" (Bukchon Hanok), "N_Seoul_Tower" (N Seoul Tower), "Bulguksa" (Bulguksa-Tempel), "Seokguram" (Seokguram-Grotte), "Gamcheon_Culture_Village" (Gamcheon Culture Village), "Haeundae_Beach" (Haeundae Beach), "Hallasan" (Hallasan-Vulkan), "Seongsan_Ilchulbong" (Seongsan Ilchulbong), "Seoraksan" (Seoraksan-Nationalpark), "Hwaseong_Fortress" (Hwaseong-Festung), "Hahoe_Folk_Village" (Hahoe-Dorf), "Namiseom" (Nami-Insel), "Haeinsa" (Haeinsa-Tempel), "Korean_Demilitarized_Zone" (DMZ)
Natur: "Jirisan" (Jirisan-Nationalpark), "Dadohaehaesang_National_Park" (Hallyeo-Nationalpark)
Transport: "Korea_Train_Express" (KTX Hochgeschwindigkeitszug)`,

      adjustWikiReferences: `"Seoul", "Busan", "Jeju_Island", "Gyeongju", "Jeonju", "Gangneung", "Seoraksan", "Suwon", "Andong", "Gwangju", "Tongyeong", "Yeosu", "Gyeongbokgung", "Bulguksa", "Hallasan"`
    },

    // ==================== LAOS ====================
    laos: {
      id: 'laos',
      name: 'Laos',
      brandName: 'Mekongpfad',
      brandEmoji: '🐘',
      brandDescription: 'Personalisierte Routenplanung für Laos-Individualreisen',
      heroTitle: 'Dein perfektes <em>Laos-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Laos – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'Laos-Reiseexperte mit tiefem Wissen über Mekong-Kultur, buddhistische Tempel und die neue Laos-China-Eisenbahn',
      countryInText: 'Laos',
      mapCenter: [18.5, 103.5],
      mapZoom: 6,

      destinations: null,

      airports: [
        { id: 'vte', label: 'Vientiane', desc: 'Wattay International (VTE)', value: 'Vientiane (Flughafen Wattay)' },
        { id: 'lpq', label: 'Luang Prabang', desc: 'Luang Prabang International (LPQ)', value: 'Luang Prabang (Flughafen)' },
        { id: 'pkz', label: 'Pakse', desc: 'Pakse International (PKZ)', value: 'Pakse (Flughafen)' }
      ],
      defaultAirport: 'Vientiane (Flughafen Wattay)',

      airportDestMap: {
        'vientiane': 'vientiane',
        'wattay': 'vientiane',
        'luang prabang': 'luangprabang',
        'pakse': 'pakse'
      },

      cityPairs: {
        'vientiane': ['vangvieng'],
        'vangvieng': ['vientiane', 'luangprabang'],
        'luangprabang': ['vangvieng', 'nongkhiaw', 'muangxay', 'kuangsi'],
        'nongkhiaw': ['luangprabang', 'muangngoi'],
        'muangngoi': ['nongkhiaw'],
        'muangxay': ['luangprabang', 'luangnamtha', 'phongsali', 'muangla'],
        'muangla': ['muangxay'],
        'luangnamtha': ['muangxay', 'muangsing', 'houayxay'],
        'muangsing': ['luangnamtha'],
        'houayxay': ['luangnamtha', 'pakbeng'],
        'pakbeng': ['houayxay', 'luangprabang'],
        'phongsali': ['muangxay'],
        'phonsavan': ['luangprabang'],
        'thakhek': ['savannakhet', 'konglorhoehle'],
        'konglorhoehle': ['thakhek'],
        'savannakhet': ['thakhek', 'pakse'],
        'pakse': ['savannakhet', 'champasak', 'bolavenplateau', 'siphandon'],
        'champasak': ['pakse', 'watphou'],
        'watphou': ['champasak', 'pakse'],
        'bolavenplateau': ['pakse'],
        'siphandon': ['pakse'],
        'viengxai': ['phonsavan'],
        'kuangsi': ['luangprabang']
      },

      transportModes: [
        { id: 'no-fly', icon: '🚂', label: 'Ohne Fliegen', desc: 'Bahn, Bus & Boot, keine Flüge' },
        { id: 'ground-preferred', icon: '🚂', label: 'Boden bevorzugt', desc: 'Flug nur bei weiten Strecken' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Bahn, Bus, Boot oder Flug' },
        { id: 'slow-travel', icon: '🚢', label: 'Slow Travel', desc: 'Slow Boat & Bahn bevorzugt' }
      ],
      defaultTransport: 'no-preference',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'no-fly': 'Kein Fliegen – nur Laos-China-Bahn, Bus und Boot',
          'ground-preferred': `Boden bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Reisezeit`,
          'no-preference': 'Bahn, Bus, Boot oder Flug (keine Präferenz)',
          'slow-travel': 'Slow Travel – Slow Boat auf dem Mekong und Laos-China-Bahn bevorzugt'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'no-fly') {
          return 'NUR Zug, Bus und Boot verwenden – keine Inlandsflüge. Laos-China-Eisenbahn (seit 2021): Vientiane–Vang Vieng (~1h), Vang Vieng–Luang Prabang (~50min), Luang Prabang–Muang Xay (~1h), Muang Xay–Boten (~1h). Busse: Vientiane–Pakse (10-13h Nachtbus), Pakse–Si Phan Don (2.5-3h), Pakse–Champasak (1.5h), Pakse–Bolaven-Plateau (1.5h), Luang Prabang–Nong Khiaw (3h), Luang Namtha–Muang Sing (1h), Thakhek–Kong-Lor-Höhle (3h), Vientiane–Phonsavan (8-10h). Mekong Slow Boat: Houayxay–Pakbeng (Tag 1, ~6h), Pakbeng–Luang Prabang (Tag 2, ~6h). HINWEIS: Nord-Süd-Verbindung Luang Prabang–Pakse dauert per Bus über 20h – Alternativen planen!';
        } else if (transport === 'ground-preferred') {
          return `Boden bevorzugt. Inlandsflug erst empfehlen, wenn Reisezeit länger als ${trainMaxHours} Stunden. Laos-China-Bahn: Vientiane–Vang Vieng (~1h), Vang Vieng–Luang Prabang (~50min), LP–Muang Xay (~1h). Busse: Pakse–Si Phan Don (2.5h), LP–Nong Khiaw (3h), Pakse–Champasak (1.5h). Slow Boat: Houayxay–Luang Prabang (2 Tage). Flüge: VTE–LPQ (~1h), VTE–PKZ (~1.5h).`;
        } else if (transport === 'slow-travel') {
          return 'Slow Travel – Mekong Slow Boat und Laos-China-Bahn bevorzugt. Mekong Slow Boat: Houayxay–Pakbeng (Tag 1, ~6h), Pakbeng–Luang Prabang (Tag 2, ~6h) – unvergessliches Erlebnis! Laos-China-Bahn: Vientiane–Vang Vieng (~1h), Vang Vieng–Luang Prabang (~50min), LP–Muang Xay (~1h). Busse nur wo nötig: Pakse–Si Phan Don (2.5h), LP–Nong Khiaw (3h), Thakhek–Kong-Lor-Höhle (3h). Inlandsflüge nur bei extremen Distanzen (z.B. Luang Prabang–Pakse).';
        }
        return 'Kombiniere Laos-China-Eisenbahn, Busse, Boote und Inlandsflüge. Laos-China-Bahn (seit 2021): Vientiane–Vang Vieng (~1h), Vang Vieng–Luang Prabang (~50min), LP–Muang Xay (~1h), Muang Xay–Boten (~1h). Busse: Vientiane–Pakse (10-13h Nachtbus), Pakse–Si Phan Don (2.5-3h), Pakse–Champasak (1.5h), LP–Nong Khiaw (3h), Luang Namtha–Muang Sing (1h), Thakhek–Kong-Lor-Höhle (3h). Slow Boat: Houayxay–Pakbeng–Luang Prabang (2 Tage). Flüge: VTE–LPQ (~1h), VTE–PKZ (~1.5h), VTE–Phonsavan (~30min). Lao Airlines (Hauptcarrier), Bangkok Airways (international). Für Strecken unter 5h empfehle Bahn/Bus, darüber je nach Verfügbarkeit Flug.';
      },

      legModes: 'train|bus|flight|boat',

      facts: [
        'Laos wurde einst Lan Xang genannt – das „Land der Million Elefanten". Heute leben dort leider nur noch etwa 800.',
        'Laos ist das am stärksten bombardierte Land der Welt pro Kopf: Zwischen 1964 und 1973 warfen die USA über 2 Millionen Tonnen Bomben ab.',
        'Klebreis (Khao Niao) ist DAS Nationalgericht – Laoten essen pro Person über 150 kg davon im Jahr, mehr als jedes andere Volk der Welt.',
        'Die Baci-Zeremonie ist ein animistisches Ritual, bei dem weiße Baumwollfäden ums Handgelenk gebunden werden, um die 32 Schutzgeister des Körpers zu besänftigen.',
        'Die Ebene der Tonkrüge (Plain of Jars) enthält über 2.000 mysteriöse Steinkrüge, die bis zu 3.000 Jahre alt sein könnten – ihr Zweck ist bis heute ungeklärt.',
        'Seit 2021 verbindet die Laos-China-Eisenbahn Vientiane mit der chinesischen Grenze – die Fahrt von der Hauptstadt nach Luang Prabang dauert nur noch 2 Stunden statt 10.',
        'Laos ist das einzige Binnenland Südostasiens – dafür fließt der Mekong auf fast 1.900 km durch das Land.',
        'In der Kong-Lor-Höhle fährt man mit dem Boot 7 km durch pechschwarze Dunkelheit auf einem unterirdischen Fluss – eine der längsten Flusshöhlen der Welt.',
        'Die Khone-Phapheng-Fälle in Si Phan Don sind der breiteste Wasserfall Südostasiens – breiter als die Niagarafälle.',
        'Beim Gibbon Experience in Bokeo schläft man in Baumhäusern auf 40 Metern Höhe und gleitet per Zipline durch den Dschungel.'
      ],

      bookingLinks: {
        transport: {
          train:  { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' },
          bus:    { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' },
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' },
          boat:   { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' }
        },
        general: [
          { name: 'Agoda', url: 'https://www.agoda.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'GetYourGuide', url: 'https://www.getyourguide.de/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Vientiane", "Luang_Prabang", "Vang_Vieng", "Pakse", "Phonsavan", "Luang_Namtha", "Thakhek", "Savannakhet", "Houayxay", "Champasak_(town)", "Phongsali", "Nong_Khiaw", "Muang_Xay"
Sehenswürdigkeiten: "Pha_That_Luang" (Goldene Stupa Vientiane), "Wat_Xieng_Thong" (Tempel Luang Prabang), "Kuang_Si_Falls" (Kuang-Si-Wasserfälle), "Vat_Phou" (Wat Phou UNESCO), "Plain_of_Jars" (Ebene der Tonkrüge), "Tham_Kong_Lo" (Kong-Lor-Höhle), "Bolaven_Plateau", "Don_Det" (Si Phan Don/4000 Inseln), "Don_Khon", "Khone_Phapheng_Falls" (Khone-Phapheng-Fälle)
Natur: "Mekong" (Mekong-Fluss), "Si_Phan_Don" (4000 Inseln)
Transport: "Boten–Vientiane_railway" (Laos-China-Eisenbahn)`,

      adjustWikiReferences: `"Vientiane", "Luang_Prabang", "Vang_Vieng", "Pakse", "Phonsavan", "Savannakhet", "Pha_That_Luang", "Wat_Xieng_Thong", "Kuang_Si_Falls", "Vat_Phou", "Plain_of_Jars", "Tham_Kong_Lo", "Bolaven_Plateau", "Don_Det"`
    },

    // ==================== NAMIBIA ====================
    namibia: {
      id: 'namibia',
      name: 'Namibia',
      brandName: 'Wüstenroute',
      brandEmoji: '🦁',
      brandDescription: 'Personalisierte Routenplanung für Namibia-Individualreisen',
      heroTitle: 'Dein perfektes <em>Namibia-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Namibia – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'Namibia-Reiseexperte mit tiefem Wissen über Selbstfahrer-Routen, Wüstenlandschaften und Safari-Camps',
      countryInText: 'Namibia',
      mapCenter: [-22, 17],
      mapZoom: 5,

      destinations: null,

      airports: [
        { id: 'wdh', label: 'Windhoek', desc: 'Hosea Kutako International (WDH)', value: 'Windhoek (Hosea Kutako International)' },
        { id: 'wvb', label: 'Walvis Bay', desc: 'Flughafen WVB', value: 'Walvis Bay (Flughafen)' },
        { id: 'mpa', label: 'Katima Mulilo', desc: 'Mpacha Airport (MPA)', value: 'Katima Mulilo (Mpacha Airport)' }
      ],
      defaultAirport: 'Windhoek (Hosea Kutako International)',

      airportDestMap: {
        'windhoek': 'windhoek',
        'hosea kutako': 'windhoek',
        'walvis bay': 'walvisbay',
        'walvis': 'walvisbay',
        'katima mulilo': 'caprivi',
        'katima': 'caprivi',
        'mpacha': 'caprivi'
      },

      cityPairs: {
        'windhoek': ['waterberg', 'sossusvlei', 'swakopmund', 'keetmanshoop', 'okonjima'],
        'sossusvlei': ['windhoek', 'swakopmund', 'luederitz', 'namibrand', 'duwisib', 'walvisbay'],
        'etosha': ['damaraland', 'waterberg', 'caprivi', 'okonjima', 'palmwag'],
        'swakopmund': ['walvisbay', 'spitzkoppe', 'skeletoncoast', 'sossusvlei', 'windhoek', 'damaraland', 'brandberg'],
        'fishrivercanyon': ['keetmanshoop', 'luederitz', 'aiais'],
        'skeletoncoast': ['swakopmund', 'damaraland', 'palmwag'],
        'damaraland': ['twyfelfontein', 'etosha', 'spitzkoppe', 'palmwag', 'brandberg', 'skeletoncoast', 'swakopmund'],
        'waterberg': ['windhoek', 'etosha', 'okonjima', 'bushmanland'],
        'luederitz': ['kolmanskop', 'keetmanshoop', 'fishrivercanyon', 'sossusvlei', 'duwisib'],
        'kolmanskop': ['luederitz'],
        'caprivi': ['etosha', 'bushmanland'],
        'spitzkoppe': ['swakopmund', 'damaraland', 'brandberg'],
        'walvisbay': ['swakopmund', 'sossusvlei'],
        'twyfelfontein': ['damaraland', 'palmwag', 'brandberg'],
        'keetmanshoop': ['windhoek', 'fishrivercanyon', 'luederitz'],
        'epupa': ['palmwag', 'damaraland'],
        'brandberg': ['spitzkoppe', 'damaraland', 'twyfelfontein', 'swakopmund'],
        'okonjima': ['windhoek', 'waterberg', 'etosha'],
        'namibrand': ['sossusvlei'],
        'aiais': ['fishrivercanyon'],
        'bushmanland': ['waterberg', 'caprivi'],
        'palmwag': ['damaraland', 'epupa', 'skeletoncoast', 'etosha', 'twyfelfontein'],
        'duwisib': ['sossusvlei', 'luederitz']
      },

      transportModes: [
        { id: 'self-drive', icon: '🚙', label: 'Selbstfahrer', desc: 'Mietwagen/4x4, eigene Route' },
        { id: 'self-drive-preferred', icon: '🚙', label: 'Selbstfahrer + Flug', desc: 'Fahren, Flug bei weiten Strecken' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Fahren, Flug oder Shuttle' },
        { id: 'guided', icon: '🦁', label: 'Geführte Tour', desc: 'Mit Fahrer/Guide' }
      ],
      defaultTransport: 'self-drive',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'self-drive': 'Selbstfahrer mit Mietwagen/4x4 (keine Inlandsflüge)',
          'self-drive-preferred': `Selbstfahrer bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Fahrzeit`,
          'no-preference': 'Selbstfahrer, Inlandsflug oder Shuttle (keine Präferenz)',
          'guided': 'Geführte Tour mit Fahrer/Guide'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'self-drive') {
          return 'NUR Selbstfahrer-Strecken mit Mietwagen oder 4x4 verwenden – keine Inlandsflüge. Namibia ist das beste Selbstfahrer-Land Afrikas. Wichtige Straßen: B1 (Windhoek–Keetmanshoop, Teer), B2 (Windhoek–Swakopmund, Teer), B1/B2 (Windhoek–Etosha via Otjiwarongo, Teer), B4 (Keetmanshoop–Lüderitz, Teer), B8 (Otjiwarongo–Caprivi/Rundu, Teer). Schotterstraßen: C24 (zu Sossusvlei), C34 (Skeleton Coast), C35/C39 (Damaraland), C43 (Palmwag). 4x4 zwingend für: Kaokoland/Epupa Falls, Teile der Skeleton Coast, einige D-Straßen. Maximal 300-400 km pro Tag. Wichtige Fahrzeiten: Windhoek–Sossusvlei (~5h), Windhoek–Swakopmund (~4h), Windhoek–Etosha (~5h), Swakopmund–Spitzkoppe (~2h), Etosha–Damaraland (~4h), Windhoek–Fish River Canyon (~6h), Lüderitz–Keetmanshoop (~4h).';
        } else if (transport === 'self-drive-preferred') {
          return `Selbstfahrer bevorzugt. Inlandsflug erst empfehlen bei Strecken über ${trainMaxHours} Stunden Fahrzeit. Wichtige Fahrzeiten: Windhoek–Sossusvlei (~5h), Windhoek–Swakopmund (~4h), Windhoek–Etosha (~5h), Etosha–Caprivi/Rundu (~6h), Windhoek–Fish River Canyon (~6h), Etosha–Damaraland (~4h). Inlandsflüge sinnvoll für: Windhoek–Katima Mulilo/Caprivi (~1.5h Flug vs. 12h+ Fahrt), Windhoek–Etosha-Region (Charter). 4x4 empfehlen für Schotterstraßen und Kaokoland.`;
        } else if (transport === 'guided') {
          return 'Geführte Tour mit Fahrer/Guide. Lodge-Transfers und Game Drives inklusive. Route über B-Straßen (Teer) und C-Straßen (Schotter) planen. Übliche geführte Routen: Windhoek–Sossusvlei–Swakopmund–Damaraland–Etosha–Windhoek (Classic Namibia, ~14 Tage).';
        }
        return 'Kombiniere Selbstfahrer-Strecken mit Inlandsflügen und Shuttles. Namibia ist ideal für Selbstfahrer mit 4x4. Teerstraßen: B1 (Windhoek–Süden), B2 (Windhoek–Küste), B8 (Norden–Caprivi). Inlandsflüge: Windhoek–Walvis Bay (~30min), Windhoek–Katima Mulilo (~1.5h). Für Strecken über 6h Fahrzeit Flug als Alternative. Maximal 300-400 km pro Tag. Wichtige Fahrzeiten: Windhoek–Sossusvlei (~5h), Windhoek–Swakopmund (~4h), Windhoek–Etosha (~5h), Etosha–Damaraland (~4h).';
      },

      legModes: 'car|flight',

      facts: [
        'Namibia war das erste afrikanische Land, das Umweltschutz in seine Verfassung aufnahm – heute stehen über 40% der Landesfläche unter Schutz.',
        'Die Namib ist die älteste Wüste der Welt – seit mindestens 55 Millionen Jahren existiert sie und beherbergt Sanddünen von über 300 Metern Höhe.',
        'Namibia hat mit nur 2,7 Einwohnern pro Quadratkilometer eine der geringsten Bevölkerungsdichten weltweit – perfekt für Einsamkeit und Sternenhimmel.',
        'In Kolmanskop bei Lüderitz stand einst die reichste Stadt Afrikas: Diamantensucher bauten Kegelbahnen und Eisfabriken mitten in der Wüste.',
        'Der Hoba-Meteorit bei Tsumeb ist mit 60 Tonnen der größte jemals gefundene Meteorit der Welt – und er liegt noch immer dort, wo er einschlug.',
        'Namibias Skelettküste trägt ihren Namen durch die zahllosen Schiffswracks und Walskelette, die den nebelverhangenen Küstenstreifen säumen.',
        'Die Welwitschia-Pflanze in der Namib-Wüste kann über 1.000 Jahre alt werden und bildet in ihrem gesamten Leben nur zwei Blätter aus.',
        'Etosha bedeutet in der Oshivambo-Sprache „Großer weißer Platz" – die Salzpfanne ist so riesig, dass man sie aus dem Weltraum sehen kann.',
        'Namibia hat die größte freilebende Gepardenpopulation der Welt – rund 1.500 Tiere streifen durch das zentrale Farmland.',
        'Die Felsgravuren von Twyfelfontein sind über 6.000 Jahre alt und zeigen Elefanten, Giraffen und Nashörner – gemalt von den San-Ureinwohnern.'
      ],

      bookingLinks: {
        transport: {
          car:    { name: 'DiscoverCars', url: 'https://www.discovercars.com/', icon: '🚙' },
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' }
        },
        general: [
          { name: 'Booking.com', url: 'https://www.booking.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'DiscoverCars', url: 'https://www.discovercars.com/', icon: '🚙', label: 'Mietwagen' },
          { name: 'Viator', url: 'https://www.viator.com/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Windhoek", "Swakopmund", "Lüderitz", "Walvis_Bay", "Keetmanshoop"
Nationalparks: "Etosha_National_Park" (Etosha), "Namib-Naukluft_National_Park" (Namib-Naukluft), "Skeleton_Coast" (Skelettküste), "Fish_River_Canyon", "NamibRand_Nature_Reserve" (NamibRand), "Waterberg_Plateau_Park" (Waterberg)
Sehenswürdigkeiten: "Sossusvlei", "Deadvlei" (Dead Vlei), "Twyfelfontein" (UNESCO-Felsgravuren), "Kolmanskop" (Geisterstadt), "Spitzkoppe", "Epupa_Falls" (Epupa-Wasserfälle), "Brandberg_Mountain" (Brandberg), "Quiver_Tree_Forest" (Köcherbaumwald), "Duwisib_Castle" (Duwisib-Schloss), "Cape_Cross" (Robbenkolonie), "Damaraland", "AfriCat_Foundation" (AfriCat/Okonjima), "Ai-Ais_Hot_Springs" (Ai-Ais), "Palmwag"
Kultur: "Himba_people" (Himba), "San_people" (San/Buschleute), "Herero_people" (Herero), "Welwitschia"`,

      adjustWikiReferences: `"Windhoek", "Swakopmund", "Etosha_National_Park", "Sossusvlei", "Fish_River_Canyon", "Skeleton_Coast", "Damaraland", "Twyfelfontein", "Kolmanskop", "Spitzkoppe", "Walvis_Bay", "Waterberg_Plateau", "Lüderitz", "Epupa_Falls", "Brandberg_Mountain"`
    },

    // ==================== SÜDAFRIKA ====================
    southafrica: {
      id: 'southafrica',
      name: 'Südafrika',
      brandName: 'Regenbogenroute',
      brandEmoji: '🌈',
      brandDescription: 'Personalisierte Routenplanung für Südafrika-Individualreisen',
      heroTitle: 'Dein perfektes <em>Südafrika-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Südafrika – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'Südafrika-Reiseexperte mit tiefem Wissen über Selbstfahrer-Routen, Safari-Parks und Küstenstraßen',
      countryInText: 'Südafrika',
      mapCenter: [-29, 25],
      mapZoom: 5,

      destinations: null,

      airports: [
        { id: 'cpt', label: 'Kapstadt', desc: 'Cape Town International (CPT)', value: 'Kapstadt (Cape Town International)' },
        { id: 'jnb', label: 'Johannesburg', desc: 'O.R. Tambo International (JNB)', value: 'Johannesburg (O.R. Tambo International)' },
        { id: 'dur', label: 'Durban', desc: 'King Shaka International (DUR)', value: 'Durban (King Shaka International)' },
        { id: 'plz', label: 'Gqeberha', desc: 'Chief Dawid Stuurman International (PLZ)', value: 'Gqeberha (Chief Dawid Stuurman International)' },
        { id: 'grj', label: 'George', desc: 'Flughafen GRJ', value: 'George (Flughafen)' }
      ],
      defaultAirport: 'Kapstadt (Cape Town International)',

      airportDestMap: {
        'kapstadt': 'capetown',
        'cape town': 'capetown',
        'johannesburg': 'johannesburg',
        'joburg': 'johannesburg',
        'durban': 'durban',
        'gqeberha': 'gqeberha',
        'port elizabeth': 'gqeberha',
        'george': 'gardenroute'
      },

      cityPairs: {
        'capetown': ['stellenbosch', 'franschhoek', 'hermanus', 'cederberg', 'route62'],
        'stellenbosch': ['capetown', 'franschhoek', 'hermanus'],
        'franschhoek': ['capetown', 'stellenbosch'],
        'hermanus': ['capetown', 'stellenbosch', 'dehoop'],
        'dehoop': ['hermanus', 'gardenroute', 'oudtshoorn'],
        'cederberg': ['capetown'],
        'route62': ['capetown', 'oudtshoorn', 'karoo', 'gardenroute'],
        'oudtshoorn': ['gardenroute', 'route62', 'karoo', 'dehoop'],
        'gardenroute': ['knysna', 'gqeberha', 'oudtshoorn', 'dehoop', 'route62'],
        'knysna': ['gardenroute', 'gqeberha'],
        'gqeberha': ['gardenroute', 'knysna', 'addo', 'wildcoast'],
        'addo': ['gqeberha'],
        'wildcoast': ['gqeberha', 'durban'],
        'durban': ['wildcoast', 'drakensberg', 'isimangaliso'],
        'drakensberg': ['durban', 'johannesburg'],
        'isimangaliso': ['durban'],
        'johannesburg': ['pretoria', 'pilanesberg', 'drakensberg', 'kruger', 'blyderivercanyon', 'mapungubwe'],
        'pretoria': ['johannesburg', 'pilanesberg'],
        'pilanesberg': ['johannesburg', 'pretoria'],
        'kruger': ['johannesburg', 'blyderivercanyon'],
        'blyderivercanyon': ['kruger', 'johannesburg'],
        'mapungubwe': ['johannesburg'],
        'karoo': ['route62', 'oudtshoorn', 'gqeberha']
      },

      transportModes: [
        { id: 'self-drive', icon: '🚙', label: 'Selbstfahrer', desc: 'Mietwagen, eigene Route' },
        { id: 'self-drive-fly', icon: '🚙', label: 'Selbstfahrer + Flug', desc: 'Fahren, Flug bei weiten Strecken' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Fahren, Flug oder Bus' },
        { id: 'budget', icon: '🚌', label: 'Budget / Baz Bus', desc: 'Bus & Shuttle, kein Mietwagen' }
      ],
      defaultTransport: 'self-drive',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'self-drive': 'Selbstfahrer mit Mietwagen (keine Inlandsflüge)',
          'self-drive-fly': `Selbstfahrer bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Fahrzeit`,
          'no-preference': 'Selbstfahrer, Inlandsflug oder Shuttle (keine Präferenz)',
          'budget': 'Budget: Baz Bus, Intercape, Greyhound & Shuttle-Services'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'self-drive') {
          return 'NUR Selbstfahrer-Strecken mit Mietwagen – keine Inlandsflüge. LINKSVERKEHR beachten! Südafrika hat ein exzellentes Straßennetz. Wichtige Routen: N1 (Kapstadt–Johannesburg, ~14h), N2 (Garden Route: Kapstadt–Gqeberha, ~8h), N3 (Johannesburg–Durban, ~6h), N4 (Johannesburg–Kruger/Nelspruit, ~4h). Fahrzeiten: Kapstadt–Stellenbosch (~1h), Kapstadt–Hermanus (~1.5h), Kapstadt–Oudtshoorn (~5h), Oudtshoorn–Knysna (~2h), Knysna–Gqeberha (~3h), Gqeberha–Addo (~1h), Johannesburg–Pilanesberg (~2.5h), Johannesburg–Pretoria (~45min), Johannesburg–Kruger (~5h), Kruger–Blyde River Canyon (~2h), Durban–Drakensberg (~3h), Durban–iSimangaliso (~3h). Maximal 400-500 km pro Tag.';
        } else if (transport === 'self-drive-fly') {
          return `Selbstfahrer bevorzugt, LINKSVERKEHR! Inlandsflug empfehlen bei Strecken über ${trainMaxHours} Stunden Fahrzeit. Fahrzeiten: Kapstadt–Stellenbosch (1h), Kapstadt–Hermanus (1.5h), Garden Route gesamt (~8h), Johannesburg–Kruger (5h), Johannesburg–Durban (6h), Durban–Drakensberg (3h). Inlandsflüge sinnvoll: Kapstadt–Johannesburg (~2h Flug vs. 14h Fahrt), Kapstadt–Durban (~2h), Kapstadt–George (~1h), Johannesburg–Gqeberha (~1.5h). Airlines: FlySafair, Airlink, Lift. Mietwagen am Zielflughafen.`;
        } else if (transport === 'budget') {
          return 'Budget-Reise ohne Mietwagen. Baz Bus (Hop-on-Hop-off): Kapstadt–Johannesburg via Garden Route und Durban. Intercape und Greyhound für Fernstrecken: Kapstadt–Johannesburg (~18h), Johannesburg–Durban (~8h). Für Kruger/Pilanesberg: geführte Touren ab Johannesburg buchen. Uber/Bolt funktioniert in Kapstadt, Johannesburg, Durban. FlySafair oft sehr günstig (ab ~30€).';
        }
        return 'Kombiniere Selbstfahrer-Strecken mit Inlandsflügen. LINKSVERKEHR in Südafrika! Fahrzeiten: Kapstadt–Stellenbosch (1h), Kapstadt–Hermanus (1.5h), Garden Route (~8h), Johannesburg–Kruger (~5h), Johannesburg–Durban (~6h), Durban–Drakensberg (~3h). Flüge: Kapstadt–Johannesburg (~2h), Kapstadt–George (~1h), Kapstadt–Durban (~2h). Maximal 400-500 km pro Tag. Airlines: FlySafair, Airlink, Lift.';
      },

      legModes: 'car|bus|flight',

      facts: [
        'Südafrika hat elf offizielle Amtssprachen – mehr als fast jedes andere Land der Welt, darunter Zulu, Xhosa, Afrikaans und Englisch.',
        'Der Tafelberg in Kapstadt ist einer der ältesten Berge der Erde – etwa sechsmal älter als das Himalaya-Gebirge.',
        'Südafrika ist das einzige Land der Welt, das freiwillig sein Atomwaffenprogramm aufgegeben hat – sechs Bomben wurden in den 1990ern demontiert.',
        'Die Wiege der Menschheit bei Johannesburg enthält die ältesten Hominiden-Fossilien der Welt – hier begann die Geschichte der Menschheit vor über 3 Millionen Jahren.',
        'Südafrika besitzt die längste Weinroute der Welt: Die Route 62 schlängelt sich über 850 km durch das Hinterland der Westkap-Provinz.',
        'Der Krüger-Nationalpark ist mit fast 20.000 km² so groß wie das Bundesland Sachsen – und beherbergt über 147 Säugetierarten.',
        'Südafrikas Sardine Run (Juni/Juli) gilt als die größte Tiermigration der Ozeane – Milliarden Sardinen ziehen entlang der Küste KwaZulu-Natals.',
        'In Südafrika findet man die „Big Seven": Löwe, Leopard, Elefant, Nashorn, Büffel plus Wal und Weißer Hai – alles in einem Land.',
        'Der Bloukrans Bridge Bungee an der Garden Route ist mit 216 Metern der höchste kommerzielle Bungee-Sprung der Welt.',
        'Nelson Mandela verbrachte 18 seiner 27 Gefängnisjahre auf Robben Island – heute UNESCO-Welterbe und Symbol des Freiheitskampfes.'
      ],

      bookingLinks: {
        transport: {
          car:    { name: 'DiscoverCars', url: 'https://www.discovercars.com/', icon: '🚙' },
          bus:    { name: 'Bookaway', url: 'https://www.bookaway.com/', icon: '🎫' },
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' }
        },
        general: [
          { name: 'Booking.com', url: 'https://www.booking.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'DiscoverCars', url: 'https://www.discovercars.com/', icon: '🚙', label: 'Mietwagen' },
          { name: 'Viator', url: 'https://www.viator.com/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Cape_Town" (Kapstadt), "Johannesburg", "Durban", "Pretoria", "Gqeberha" (Port Elizabeth), "Stellenbosch", "Franschhoek", "Knysna", "Hermanus", "Oudtshoorn"
Nationalparks: "Kruger_National_Park" (Krüger), "Addo_Elephant_National_Park" (Addo), "Pilanesberg_National_Park" (Pilanesberg), "iSimangaliso_Wetland_Park", "Mapungubwe_National_Park", "De_Hoop_Nature_Reserve", "Garden_Route", "Tsitsikamma"
Sehenswürdigkeiten: "Table_Mountain" (Tafelberg), "Cape_of_Good_Hope" (Kap der Guten Hoffnung), "Robben_Island", "Blyde_River_Canyon", "Drakensberg" (Drakensberge), "Apartheid_Museum", "Kirstenbosch_National_Botanical_Garden" (Kirstenbosch), "Cango_Caves" (Cango-Höhlen), "Soweto", "Cederberg"
Kultur: "Karoo", "Route_62_(South_Africa)" (Route 62), "Coffee_Bay" (Wild Coast)`,

      adjustWikiReferences: `"Cape_Town", "Johannesburg", "Durban", "Kruger_National_Park", "Garden_Route", "Stellenbosch", "Drakensberg", "Table_Mountain", "Robben_Island", "Blyde_River_Canyon", "Addo_Elephant_National_Park", "Hermanus", "Knysna", "Pilanesberg_National_Park", "Apartheid_Museum"`
    },

    // ==========================================
    // COSTA RICA
    // ==========================================
    costarica: {
      id: 'costarica',
      name: 'Costa Rica',
      brandName: 'Puravida-Pfad',
      brandEmoji: '🦜',
      brandDescription: 'Personalisierte Routenplanung für Costa-Rica-Individualreisen',
      heroTitle: 'Dein perfektes <em>Costa-Rica-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Costa Rica – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'Costa-Rica-Reiseexperte mit tiefem Wissen über Öko-Lodges, Nationalparks und Shuttle-Routen',
      countryInText: 'Costa Rica',
      mapCenter: [9.8, -84.2],
      mapZoom: 7,

      destinations: null,

      airports: [
        { id: 'sjo', label: 'San José', desc: 'Juan Santamaría (SJO)', value: 'San José (Flughafen Juan Santamaría)' },
        { id: 'lir', label: 'Liberia', desc: 'Daniel Oduber Quirós (LIR)', value: 'Liberia (Flughafen Daniel Oduber Quirós)' }
      ],
      defaultAirport: 'San José (Flughafen Juan Santamaría)',

      airportDestMap: {
        'san josé': 'sanjose',
        'san jose': 'sanjose',
        'sjo': 'sanjose',
        'liberia': 'rincondelavieja',
        'lir': 'rincondelavieja',
        'guanacaste': 'tamarindo'
      },

      cityPairs: {
        'sanjose': ['poas', 'arenal', 'jaco', 'turrialba', 'sarapiqui', 'tortuguero', 'manuelantonio', 'sangerardo'],
        'poas': ['sanjose', 'arenal', 'sarapiqui'],
        'turrialba': ['sanjose', 'pacuare'],
        'pacuare': ['turrialba', 'sanjose'],
        'sangerardo': ['sanjose', 'uvita'],
        'arenal': ['monteverde', 'sanjose', 'rioceleste', 'sarapiqui'],
        'monteverde': ['arenal', 'santateresa'],
        'rioceleste': ['arenal', 'rincondelavieja'],
        'sarapiqui': ['sanjose', 'arenal', 'tortuguero', 'poas'],
        'rincondelavieja': ['papagayo', 'tamarindo', 'rioceleste'],
        'papagayo': ['rincondelavieja', 'tamarindo'],
        'tamarindo': ['papagayo', 'nosara', 'rincondelavieja'],
        'nosara': ['tamarindo', 'santateresa'],
        'santateresa': ['montezuma', 'nosara', 'monteverde', 'jaco'],
        'montezuma': ['santateresa'],
        'jaco': ['sanjose', 'manuelantonio', 'santateresa'],
        'manuelantonio': ['jaco', 'uvita', 'sanjose'],
        'uvita': ['manuelantonio', 'corcovado', 'sangerardo'],
        'corcovado': ['uvita', 'osa'],
        'osa': ['corcovado'],
        'tortuguero': ['sanjose', 'sarapiqui', 'puertoviejo'],
        'puertoviejo': ['cahuita', 'tortuguero'],
        'cahuita': ['puertoviejo']
      },

      transportModes: [
        { id: 'no-fly', icon: '🚌', label: 'Ohne Fliegen', desc: 'Shuttle-Bus & Mietwagen' },
        { id: 'ground-preferred', icon: '🚐', label: 'Boden bevorzugt', desc: 'Flug nur bei weiten Strecken' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Shuttle, Mietwagen oder Flug' },
        { id: 'rental-car', icon: '🚗', label: 'Mietwagen', desc: '4x4 empfohlen' }
      ],
      defaultTransport: 'no-preference',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'no-fly': 'Kein Fliegen – nur Shuttle-Bus (Interbus, Caribe Shuttle) und Mietwagen',
          'ground-preferred': `Shuttle/Mietwagen bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Fahrt`,
          'no-preference': 'Shuttle-Bus, Mietwagen oder Inlandsflug (keine Präferenz)',
          'rental-car': 'Mietwagen (4x4 empfohlen) als Haupttransportmittel'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'no-fly') {
          return 'KEINE Flüge verwenden. Haupttransport: Shuttle-Busse (Interbus, Caribe Shuttle) und Mietwagen (4x4 empfohlen). Fahrzeiten: San José–La Fortuna (3-3.5h), San José–Monteverde (4-4.5h, Schotterpiste), San José–Manuel Antonio (3h), San José–Jacó (1.5h), San José–Puerto Viejo (4.5h), San José–Tortuguero (Bus La Pavona 3h + Boot 1.5h), Arenal–Monteverde (Jeep-Boot-Jeep 3.5h), San José–Tamarindo (4.5h), San José–Liberia (4h), Manuel Antonio–Uvita (1.5h), Drake Bay nur per Boot ab Sierpe (1.5h). Fähre Puntarenas–Paquera (1.5h) für Nicoya-Halbinsel.';
        } else if (transport === 'ground-preferred') {
          return `Shuttle/Mietwagen bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Fahrt. Fahrzeiten: San José–La Fortuna (3-3.5h), San José–Monteverde (4-4.5h), San José–Manuel Antonio (3h), San José–Puerto Viejo (4.5h), San José–Tamarindo (4.5h). Arenal–Monteverde: Jeep-Boot-Jeep (3.5h, Erlebnis!). Tortuguero nur per Boot. Drake Bay/Corcovado: Flug ab San José (~45min empfehlenswert). Fähre Puntarenas–Paquera für Nicoya. 4x4-Mietwagen empfohlen für Monteverde, Osa und Nicoya.`;
        } else if (transport === 'rental-car') {
          return 'Mietwagen (4x4 dringend empfohlen). Fahrzeiten: San José–La Fortuna (3-3.5h), San José–Monteverde (4-4.5h, letzte 35km Schotterpiste), San José–Manuel Antonio (3h), San José–Puerto Viejo (4.5h), San José–Liberia (4h). 4x4 PFLICHT für: Monteverde, Santa Teresa/Nicoya-Südspitze, Drake Bay/Osa. Fähre Puntarenas–Paquera mit Auto (1.5h, vorbuchen). Tortuguero: Auto in La Pavona parken, weiter per Boot (1.5h). Nachtfahrten vermeiden (Schlaglöcher, schlechte Beleuchtung).';
        }
        return 'Kombination aus Shuttle-Bussen (Interbus, Caribe Shuttle), Mietwagen und Inlandsflügen. San José–La Fortuna (3-3.5h Shuttle), San José–Monteverde (4-4.5h), San José–Manuel Antonio (3h), San José–Puerto Viejo (4.5h). Arenal–Monteverde: Jeep-Boot-Jeep (3.5h, Erlebnis!). Tortuguero nur per Boot. Drake Bay: Flug ab San José (~45min) oder Boot ab Sierpe (1.5h). Inlandsflüge (Sansa Airlines): San José–Drake Bay (45min), San José–Tortuguero (30min), San José–Tambor (30min), San José–Quepos (25min). 4x4 empfohlen für Monteverde, Osa und Nicoya.';
      },

      legModes: 'car|bus|flight|boat',

      facts: [
        'Costa Rica hat keine Armee: Als einziges Land der Amerikas schaffte Costa Rica 1948 sein Militär ab und investiert das Budget in Bildung und Gesundheit.',
        'Über 25% der Landesfläche stehen unter Naturschutz – Costa Rica erzeugt über 99% seines Stroms aus erneuerbaren Energien.',
        'Costa Rica beherbergt 5% der weltweiten Artenvielfalt auf nur 0,03% der Erdoberfläche – mehr Vogelarten als die USA und Kanada zusammen.',
        '"Pura Vida" ist mehr als ein Gruß: Die Redewendung bedeutet „pures Leben" und drückt die entspannte Lebensphilosophie der Ticos aus.',
        'Der Río Celeste hat eine unwirklich himmelblaue Farbe, die durch eine chemische Reaktion vulkanischer Mineralien mit dem Flusswasser entsteht.',
        'Costa Rica kehrte die Abholzung komplett um: Von nur 21% Wald in den 1980ern auf über 52% heute.',
        'Die Nicoya-Halbinsel ist eine von nur fünf „Blue Zones" weltweit – hier leben einige der ältesten Menschen der Erde.',
        'In Tortuguero nisten jährlich bis zu 40.000 grüne Meeresschildkröten – der Name bedeutet „Ort der Schildkröten".',
        'Costa Rica hat mehr Schmetterlingsarten als ganz Afrika – über 1.250 verschiedene Spezies flattern durch die Regen- und Nebelwälder.',
        'Das Land ist kleiner als Niedersachsen, hat aber 12 verschiedene Klimazonen – von tropischen Stränden bis zu 3.800m hohen Vulkangipfeln.'
      ],

      bookingLinks: {
        transport: {
          car:    { name: 'DiscoverCars', url: 'https://www.discovercars.com/', icon: '🚙' },
          bus:    { name: 'Bookaway', url: 'https://www.bookaway.com/', icon: '🎫' },
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' },
          boat:   { name: 'Bookaway', url: 'https://www.bookaway.com/', icon: '🎫' }
        },
        general: [
          { name: 'Booking.com', url: 'https://www.booking.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'DiscoverCars', url: 'https://www.discovercars.com/', icon: '🚙', label: 'Mietwagen' },
          { name: 'Viator', url: 'https://www.viator.com/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "San_José,_Costa_Rica" (San José), "Jacó,_Costa_Rica" (Jacó), "Tamarindo,_Costa_Rica", "Puerto_Viejo_de_Talamanca", "Montezuma,_Costa_Rica", "Nosara"
Nationalparks: "Manuel_Antonio_National_Park", "Corcovado_National_Park", "Tortuguero_National_Park", "Tenorio_Volcano_National_Park", "Cahuita_National_Park", "Los_Quetzales_National_Park", "Rincón_de_la_Vieja_Volcano"
Sehenswürdigkeiten: "Arenal_Volcano" (Vulkan Arenal), "Monteverde" (Nebelwald), "Poás_Volcano" (Vulkan Poás), "Nicoya_Peninsula" (Nicoya-Halbinsel), "Osa_Peninsula" (Osa-Halbinsel), "Pacuare_River" (Pacuare-Fluss), "Gulf_of_Papagayo" (Papagayo), "Sarapiquí_River"`,

      adjustWikiReferences: `"San_José,_Costa_Rica", "Arenal_Volcano", "Monteverde", "Manuel_Antonio_National_Park", "Corcovado_National_Park", "Tortuguero_National_Park", "Poás_Volcano", "Tamarindo,_Costa_Rica", "Puerto_Viejo_de_Talamanca", "Nicoya_Peninsula", "Osa_Peninsula", "Pacuare_River"`
    },

    // ==========================================
    // AUSTRALIEN
    // ==========================================
    australia: {
      id: 'australia',
      name: 'Australien',
      brandName: 'Outbackroute',
      brandEmoji: '🦘',
      brandDescription: 'Personalisierte Routenplanung für Australien-Individualreisen',
      heroTitle: 'Dein perfektes <em>Australien-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Australien – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'Australien-Reiseexperte mit tiefem Wissen über Roadtrips, Outback-Abenteuer und Küstenrouten',
      countryInText: 'Australien',
      mapCenter: [-25, 134],
      mapZoom: 4,

      destinations: null,

      airports: [
        { id: 'syd', label: 'Sydney', desc: 'Kingsford Smith (SYD)', value: 'Sydney (Kingsford Smith International)' },
        { id: 'mel', label: 'Melbourne', desc: 'Tullamarine (MEL)', value: 'Melbourne (Tullamarine International)' },
        { id: 'bne', label: 'Brisbane', desc: 'Flughafen BNE', value: 'Brisbane (Flughafen)' },
        { id: 'per', label: 'Perth', desc: 'Flughafen PER', value: 'Perth (Flughafen)' },
        { id: 'cns', label: 'Cairns', desc: 'Flughafen CNS', value: 'Cairns (Flughafen)' },
        { id: 'adl', label: 'Adelaide', desc: 'Flughafen ADL', value: 'Adelaide (Flughafen)' },
        { id: 'drw', label: 'Darwin', desc: 'Flughafen DRW', value: 'Darwin (Flughafen)' }
      ],
      defaultAirport: 'Sydney (Kingsford Smith International)',

      airportDestMap: {
        'sydney': 'sydney',
        'melbourne': 'melbourne',
        'brisbane': 'brisbane',
        'perth': 'perth',
        'cairns': 'cairns',
        'adelaide': 'adelaide',
        'darwin': 'darwin'
      },

      cityPairs: {
        'sydney': ['bluemountains', 'melbourne', 'brisbane'],
        'bluemountains': ['sydney'],
        'melbourne': ['sydney', 'greatoceanroad', 'adelaide', 'hobart'],
        'greatoceanroad': ['melbourne'],
        'brisbane': ['goldcoast', 'whitsundays', 'cairns'],
        'goldcoast': ['brisbane'],
        'cairns': ['daintree', 'whitsundays'],
        'daintree': ['cairns'],
        'whitsundays': ['cairns', 'brisbane'],
        'uluru': ['adelaide', 'darwin', 'cooperpedy'],
        'adelaide': ['kangarooisland', 'flindersranges', 'cooperpedy', 'melbourne', 'uluru'],
        'kangarooisland': ['adelaide'],
        'flindersranges': ['adelaide', 'cooperpedy'],
        'cooperpedy': ['adelaide', 'uluru', 'flindersranges'],
        'hobart': ['melbourne'],
        'perth': ['rottnest', 'margaretriver', 'ningaloo'],
        'rottnest': ['perth'],
        'margaretriver': ['perth'],
        'ningaloo': ['perth'],
        'darwin': ['kakadu', 'kimberley', 'uluru'],
        'kakadu': ['darwin'],
        'kimberley': ['darwin', 'perth'],
        'lordhowe': ['sydney']
      },

      transportModes: [
        { id: 'self-drive', icon: '🚙', label: 'Selbstfahrer', desc: 'Mietwagen / Campervan' },
        { id: 'self-drive-fly', icon: '🚙', label: 'Selbstfahrer + Flug', desc: 'Fahren regional, Flug zwischen Regionen' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Flug, Fahren oder Zug' },
        { id: 'fly-mostly', icon: '✈️', label: 'Fliegen + Touren', desc: 'Inlandsflüge, geführte Touren' }
      ],
      defaultTransport: 'self-drive-fly',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'self-drive': 'Selbstfahrer mit Mietwagen/Campervan (keine Inlandsflüge)',
          'self-drive-fly': `Selbstfahrer bevorzugt für regionale Strecken, Inlandsflug ab ${trainMaxHours}h Fahrzeit`,
          'no-preference': 'Selbstfahrer, Inlandsflug oder Zug (keine Präferenz)',
          'fly-mostly': 'Inlandsflüge bevorzugt, geführte Touren vor Ort'
        };
        return names[transport] || names['self-drive-fly'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'self-drive') {
          return 'NUR Selbstfahrer-Strecken mit Mietwagen oder Campervan – keine Inlandsflüge. LINKSVERKEHR! Australien ist RIESIG – Route so planen, dass Fahrstrecken realistisch sind. Max. 400-500 km pro Tag. Fahrzeiten: Sydney–Blue Mountains (2h), Sydney–Melbourne (9h), Melbourne–Great Ocean Road (2.5h), Melbourne–Adelaide (8h), Adelaide–Kangaroo Island (Fähre 45min ab Cape Jervis), Adelaide–Flinders Ranges (5h), Adelaide–Coober Pedy (8h), Brisbane–Gold Coast (1.5h), Cairns–Daintree (2h), Darwin–Kakadu (3h), Perth–Margaret River (3h), Perth–Rottnest (Fähre 30min). NICHT fahrbar: Sydney–Perth (40h!), Sydney–Cairns (25h), Darwin–Perth (40h). Outback-Strecken oft 4WD nötig.';
        } else if (transport === 'self-drive-fly') {
          return `Selbstfahrer bevorzugt regional, LINKSVERKEHR! Inlandsflug ab ${trainMaxHours}h Fahrzeit. Australien ist RIESIG – Inlandsflüge essenziell zwischen Regionen! Regional: Sydney–Blue Mountains (2h), Melbourne–Great Ocean Road (2.5h), Adelaide–Barossa (1h), Cairns–Daintree (2h), Darwin–Kakadu (3h), Perth–Margaret River (3h). Flüge NÖTIG: Sydney–Melbourne (1.5h Flug vs. 9h Fahrt), Sydney–Cairns (3h Flug vs. 25h!), Melbourne–Adelaide (1.5h vs. 8h), Perth (4h+ von Ostküste!), Uluru (3h Flug), Darwin, Melbourne–Hobart (1h). Airlines: Qantas, Virgin Australia, Jetstar, Rex. Legendäre Roadtrips: Great Ocean Road, Red Centre Way.`;
        } else if (transport === 'fly-mostly') {
          return 'Inlandsflüge bevorzugen. Australien ist RIESIG – fliegen spart enorm Zeit. Flüge: Sydney–Melbourne (1.5h), Sydney–Cairns (3h), Sydney–Brisbane (1.5h), Sydney–Perth (5h!), Sydney–Uluru (3.5h), Melbourne–Hobart (1h), Melbourne–Adelaide (1.5h), Brisbane–Cairns (2.5h), Brisbane–Whitsundays (1.5h), Darwin–Cairns (2.5h). Airlines: Qantas, Virgin Australia, Jetstar, Rex. Vor Ort: Geführte Touren (Great Barrier Reef, Uluru, Kakadu, Kimberley), kurze Mietwagen-Abschnitte (Great Ocean Road, Margaret River). The Ghan (Adelaide–Darwin, 2 Tage) und Indian Pacific (Sydney–Perth, 3 Tage) als Erlebnis-Alternative.';
        }
        return `Kombination aus Inlandsflügen und Selbstfahrer-Abschnitten. LINKSVERKEHR! Australien ist RIESIG – zwischen Regionen fast immer fliegen. Flüge: Sydney–Melbourne (1.5h), Sydney–Cairns (3h), Sydney–Perth (5h!), Sydney–Uluru (3.5h), Melbourne–Hobart (1h), Brisbane–Whitsundays (1.5h). Mietwagen regional: Great Ocean Road (Melbourne), Daintree (Cairns), Blue Mountains (Sydney), Margaret River (Perth), Kakadu (Darwin). Fähren: Melbourne–Tasmanien (Spirit of Tasmania, 11h), Rottnest Island (30min), Kangaroo Island (45min). Legendäre Züge: The Ghan (Adelaide–Darwin, 2 Tage), Indian Pacific (Sydney–Perth, 3 Tage). Airlines: Qantas, Virgin Australia, Jetstar, Rex.`;
      },

      legModes: 'car|train|bus|flight|boat',

      facts: [
        'Australien ist der einzige Kontinent, der gleichzeitig ein Land ist – mit 7,7 Millionen km² fast so groß wie ganz Europa.',
        'Das Great Barrier Reef erstreckt sich über 2.300 km und ist das einzige lebende Gebilde der Erde, das man aus dem Weltall sehen kann.',
        'Australien hat mehr als 10.000 Strände – wer jeden Tag einen besucht, braucht über 27 Jahre, um alle zu sehen.',
        'Die Aborigines sind die älteste lebende Kultur der Welt – ihre Geschichte reicht mindestens 65.000 Jahre zurück.',
        'In Australien leben mehr Kängurus als Menschen: rund 50 Millionen Kängurus bei nur 26 Millionen Einwohnern.',
        'Der australische Outback ist so dünn besiedelt, dass manche Cattle Stations größer sind als ganze europäische Länder.',
        'Coober Pedy im Outback ist so heiß, dass die meisten Bewohner in unterirdischen Wohnungen leben.',
        'Die Great Ocean Road wurde von heimkehrenden Soldaten nach dem Ersten Weltkrieg gebaut – die größte Kriegerdenkmal-Straße der Welt.',
        'Rottnest Island verdankt seinen Namen dem Niederländer Willem de Vlamingh, der die Quokkas 1696 für große Ratten hielt.',
        'Australien hat die giftigsten Tiere der Welt: Inlandtaipan, Blaugeringelte Krake, Box-Qualle und Trichternetzspinne leben alle hier.'
      ],

      bookingLinks: {
        transport: {
          car:    { name: 'DiscoverCars', url: 'https://www.discovercars.com/', icon: '🚙' },
          train:  { name: 'Rome2Rio', url: 'https://www.rome2rio.com/', icon: '🎫' },
          bus:    { name: 'Rome2Rio', url: 'https://www.rome2rio.com/', icon: '🎫' },
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' },
          boat:   { name: 'Direct Ferries', url: 'https://www.directferries.de/', icon: '🎫' }
        },
        general: [
          { name: 'Booking.com', url: 'https://www.booking.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'DiscoverCars', url: 'https://www.discovercars.com/', icon: '🚙', label: 'Mietwagen' },
          { name: 'Viator', url: 'https://www.viator.com/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Hobart", "Darwin,_Northern_Territory" (Darwin), "Cairns", "Gold_Coast,_Queensland" (Gold Coast)
Nationalparks: "Great_Barrier_Reef", "Kakadu_National_Park" (Kakadu), "Blue_Mountains_(New_South_Wales)" (Blue Mountains), "Daintree_Rainforest" (Daintree), "Purnululu_National_Park" (Kimberley), "Flinders_Ranges", "Ningaloo_Reef", "Great_Ocean_Road"
Sehenswürdigkeiten: "Sydney_Opera_House" (Oper), "Uluru" (Ayers Rock), "Whitehaven_Beach", "Twelve_Apostles_(Victoria)" (Twelve Apostles), "Bondi_Beach", "Kangaroo_Island", "Whitsunday_Islands", "Lord_Howe_Island", "Rottnest_Island", "Coober_Pedy", "Margaret_River,_Western_Australia" (Margaret River)
Kultur: "Aboriginal_Australians" (Aboriginal-Kultur), "Quokka", "Barossa_Valley"`,

      adjustWikiReferences: `"Sydney", "Melbourne", "Brisbane", "Cairns", "Perth", "Adelaide", "Uluru", "Great_Barrier_Reef", "Sydney_Opera_House", "Whitehaven_Beach", "Twelve_Apostles_(Victoria)", "Kakadu_National_Park", "Daintree_Rainforest", "Kangaroo_Island", "Blue_Mountains_(New_South_Wales)"`
    },

    // ==========================================
    // PERU
    // ==========================================
    peru: {
      id: 'peru',
      name: 'Peru',
      brandName: 'Inkapfad',
      brandEmoji: '🏔️',
      brandDescription: 'Personalisierte Routenplanung für Peru-Individualreisen',
      heroTitle: 'Dein perfektes <em>Peru-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Peru – von Machu Picchu über den Titicacasee bis in den Amazonas.',
      expertRole: 'Peru-Reiseexperte mit tiefem Wissen über Inka-Geschichte, Andentrekking und Amazonas-Expeditionen',
      countryInText: 'Peru',
      mapCenter: [-10, -75],
      mapZoom: 5,

      destinations: null,

      airports: [
        { id: 'lim', label: 'Lima', desc: 'Flughafen Jorge Chávez (LIM)', value: 'Lima (Flughafen Jorge Chávez)' },
        { id: 'cuz', label: 'Cusco', desc: 'Flughafen CUZ', value: 'Cusco (Flughafen Alejandro Velasco Astete)' },
        { id: 'aqp', label: 'Arequipa', desc: 'Flughafen AQP', value: 'Arequipa (Flughafen Rodríguez Ballón)' },
        { id: 'iqt', label: 'Iquitos', desc: 'Flughafen IQT', value: 'Iquitos (Flughafen Francisco Secada)' }
      ],
      defaultAirport: 'Lima (Flughafen Jorge Chávez)',

      airportDestMap: {
        'lima': 'lima',
        'cusco': 'cusco',
        'arequipa': 'arequipa',
        'iquitos': 'iquitos'
      },

      cityPairs: {
        'lima': ['paracas', 'huacachina', 'lunahuana'],
        'paracas': ['lima', 'huacachina', 'nazca'],
        'huacachina': ['paracas', 'nazca'],
        'nazca': ['huacachina', 'arequipa'],
        'arequipa': ['colca-canyon', 'puno'],
        'colca-canyon': ['arequipa'],
        'puno': ['arequipa', 'cusco'],
        'cusco': ['sacred-valley', 'machu-picchu', 'puno', 'puerto-maldonado'],
        'sacred-valley': ['cusco', 'machu-picchu'],
        'machu-picchu': ['cusco', 'sacred-valley'],
        'puerto-maldonado': ['cusco', 'tambopata'],
        'tambopata': ['puerto-maldonado'],
        'trujillo': ['cajamarca'],
        'cajamarca': ['trujillo', 'chachapoyas'],
        'chachapoyas': ['cajamarca'],
        'huaraz': [],
        'iquitos': [],
        'mancora': [],
        'huancayo': [],
        'ayacucho': [],
        'pucallpa': [],
        'lamas': [],
        'oxapampa': []
      },

      transportModes: [
        { id: 'bus-only', icon: '🚌', label: 'Nur Bus', desc: 'Keine Inlandsflüge' },
        { id: 'bus-preferred', icon: '🚌', label: 'Bus bevorzugt', desc: 'Flug nur bei weiten Strecken' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Bus oder Flug' }
      ],
      defaultTransport: 'no-preference',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'bus-only': 'Nur Bus/Colectivo (keine Inlandsflüge)',
          'bus-preferred': `Bus bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Busfahrt`,
          'no-preference': 'Bus oder Flug (keine Präferenz)'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'bus-only') {
          return 'NUR Bus- und Bodenverbindungen verwenden – keine Inlandsflüge. Peru hat ein gutes Fernbusnetz (Cruz del Sur, Oltursa, TEPSA). Wichtige Busrouten: Lima–Paracas (3.5h), Lima–Ica/Huacachina (4.5h), Lima–Nazca (7h), Lima–Huaraz (8h), Lima–Trujillo (9h), Nazca–Arequipa (9h), Arequipa–Chivay/Colca (3.5h), Arequipa–Puno (6-7h), Puno–Cusco (7-8h), Cusco–Ollantaytambo (1.5h Colectivo). ACHTUNG: Iquitos und Puerto Maldonado sind per Bus NICHT erreichbar (nur Flug). Route so planen, dass keine isolierten Städte vorkommen.';
        } else if (transport === 'bus-preferred') {
          return `Bus bevorzugt. Inlandsflug erst empfehlen, wenn die Busfahrt länger als ${trainMaxHours} Stunden dauert. Wichtige Busrouten: Lima–Paracas (3.5h), Lima–Ica (4.5h), Lima–Nazca (7h), Arequipa–Puno (6-7h), Puno–Cusco (7-8h), Cusco–Ollantaytambo (1.5h). Für Lima–Cusco (21h Bus) oder Lima–Arequipa (16h) Flug empfehlen. Iquitos und Puerto Maldonado NUR per Flug erreichbar.`;
        }
        return 'Kombiniere Fernbusse und Inlandsflüge. Kurze Strecken per Bus: Lima–Paracas (3.5h), Lima–Ica (4.5h), Arequipa–Colca (3.5h), Arequipa–Puno (6-7h), Puno–Cusco (7-8h), Cusco–Ollantaytambo (1.5h Colectivo). Für Strecken über 8h Busfahrt empfehle Inlandsflug (z.B. Lima–Cusco, Lima–Arequipa, Lima–Iquitos, Lima–Puerto Maldonado, Lima–Trujillo). Cusco–Machu Picchu NUR per Zug (PeruRail/Inca Rail, ~1.5-4h ab Ollantaytambo). Iquitos und Puerto Maldonado NUR per Flug erreichbar.';
      },

      legModes: 'bus|flight|train',

      facts: [
        'Peru hat 28 der 32 Klimazonen der Welt – von Wüste über Hochgebirge bis Regenwald auf einer Fläche dreimal so groß wie Deutschland.',
        'Machu Picchu wurde erst 1911 vom amerikanischen Forscher Hiram Bingham wiederentdeckt – die lokale Bevölkerung kannte die Ruinen jedoch schon vorher.',
        'Peru ist die kulinarische Hauptstadt Südamerikas: Lima hat mehr Top-Restaurants als jede andere Stadt des Kontinents.',
        'Der Titicacasee auf 3.812m ist der höchste schiffbare See der Welt und wird von Peru und Bolivien geteilt.',
        'Die Nazca-Linien sind über 2.000 Jahre alt und nur aus der Luft erkennbar – ihr Zweck ist bis heute ein Rätsel.',
        'Peru hat mehr als 4.000 verschiedene Kartoffelsorten – das Ursprungsland der Kartoffel pflegt bis heute traditionellen Anbau auf über 3.000m Höhe.',
        'Der Colca Canyon ist mit 3.270m doppelt so tief wie der Grand Canyon und Heimat des Andenkondors.',
        'Perus Amazonas-Regenwald bedeckt über 60% der Landesfläche und beherbergt die größte Biodiversität der Erde.',
        'Die Inka bauten ein Straßennetz von über 40.000 km Länge durch die Anden – ohne Rad und ohne Pferde.',
        'Ceviche, Perus Nationalgericht aus rohem Fisch in Limettensaft, wurde 2023 zum UNESCO-Weltkulturerbe erklärt.'
      ],

      bookingLinks: {
        transport: {
          bus:    { name: 'Bookaway', url: 'https://www.bookaway.com/', icon: '🎫' },
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' },
          train:  { name: 'Bookaway', url: 'https://www.bookaway.com/', icon: '🎫' }
        },
        general: [
          { name: 'Booking.com', url: 'https://www.booking.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'GetYourGuide', url: 'https://www.getyourguide.de/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Lima", "Cusco", "Arequipa", "Puno", "Trujillo,_Peru", "Iquitos", "Huaraz", "Cajamarca", "Ayacucho", "Huancayo", "Chachapoyas,_Peru", "Puerto_Maldonado", "Máncora", "Pucallpa", "Oxapampa"
  Sehenswürdigkeiten: "Machu_Picchu", "Sacred_Valley", "Nazca_Lines" (Nazca-Linien), "Lake_Titicaca" (Titicacasee), "Colca_Canyon", "Huacachina" (Wüstenoase), "Paracas_National_Reserve" (Ballestas-Inseln), "Chan_Chan" (Lehmziegelstadt), "Ollantaytambo" (Inka-Festung), "Sacsayhuamán" (Inka-Ruine), "Cordillera_Blanca" (Trekking), "Tambopata_National_Reserve" (Amazonas), "Kuélap" (Wolkenkrieger-Festung), "Pisac" (Inka-Ruinen), "Lunahuaná" (Rafting)`,

      adjustWikiReferences: `"Lima", "Cusco", "Machu_Picchu", "Arequipa", "Puno", "Lake_Titicaca", "Sacred_Valley", "Nazca_Lines", "Colca_Canyon", "Huacachina", "Paracas_National_Reserve", "Chan_Chan", "Ollantaytambo", "Cordillera_Blanca"`
    },

    // ==========================================
    // MEXIKO
    // ==========================================
    mexico: {
      id: 'mexico',
      name: 'Mexiko',
      brandName: 'Aztekenpfad',
      brandEmoji: '🌮',
      brandDescription: 'Personalisierte Routenplanung für Mexiko-Individualreisen',
      heroTitle: 'Dein perfektes <em>Mexiko-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Mexiko – von Maya-Ruinen über koloniale Traumstädte bis zu Karibikstränden.',
      expertRole: 'Mexiko-Reiseexperte mit tiefem Wissen über Maya-Kultur, koloniale Städte, Cenoten und regionale Küche',
      countryInText: 'Mexiko',
      mapCenter: [23.5, -102],
      mapZoom: 5,

      destinations: null,

      airports: [
        { id: 'mex', label: 'Mexiko-Stadt', desc: 'Flughafen Benito Juárez (MEX)', value: 'Mexiko-Stadt (Flughafen Benito Juárez)' },
        { id: 'cun', label: 'Cancún', desc: 'Flughafen CUN', value: 'Cancún (Flughafen Internacional)' },
        { id: 'gdl', label: 'Guadalajara', desc: 'Flughafen GDL', value: 'Guadalajara (Flughafen Miguel Hidalgo)' },
        { id: 'sjd', label: 'Los Cabos', desc: 'Flughafen SJD', value: 'Los Cabos (Flughafen San José del Cabo)' },
        { id: 'pvr', label: 'Puerto Vallarta', desc: 'Flughafen PVR', value: 'Puerto Vallarta (Flughafen Gustavo Díaz Ordaz)' },
        { id: 'oax', label: 'Oaxaca', desc: 'Flughafen OAX', value: 'Oaxaca (Flughafen Xoxocotlán)' }
      ],
      defaultAirport: 'Mexiko-Stadt (Flughafen Benito Juárez)',

      airportDestMap: {
        'mexiko-stadt': 'mexico-city',
        'mexico city': 'mexico-city',
        'cdmx': 'mexico-city',
        'cancún': 'cancun',
        'cancun': 'cancun',
        'guadalajara': 'guadalajara',
        'los cabos': 'los-cabos',
        'cabo': 'los-cabos',
        'puerto vallarta': 'puerto-vallarta',
        'oaxaca': 'oaxaca'
      },

      cityPairs: {
        'mexico-city': ['puebla', 'guanajuato', 'san-miguel-de-allende', 'taxco', 'oaxaca'],
        'puebla': ['mexico-city', 'oaxaca'],
        'oaxaca': ['puebla', 'mexico-city', 'hierve-el-agua', 'san-cristobal'],
        'hierve-el-agua': ['oaxaca'],
        'san-cristobal': ['oaxaca', 'palenque'],
        'palenque': ['san-cristobal', 'campeche'],
        'campeche': ['palenque', 'merida'],
        'merida': ['campeche', 'valladolid', 'izamal', 'cancun'],
        'valladolid': ['merida', 'cancun', 'playa-del-carmen', 'tulum'],
        'izamal': ['merida'],
        'cancun': ['merida', 'valladolid', 'playa-del-carmen', 'holbox'],
        'playa-del-carmen': ['cancun', 'tulum', 'valladolid'],
        'tulum': ['playa-del-carmen', 'bacalar', 'valladolid'],
        'bacalar': ['tulum'],
        'holbox': ['cancun'],
        'guanajuato': ['san-miguel-de-allende', 'mexico-city', 'guadalajara'],
        'san-miguel-de-allende': ['guanajuato', 'mexico-city'],
        'guadalajara': ['guanajuato', 'puerto-vallarta'],
        'puerto-vallarta': ['guadalajara', 'sayulita'],
        'sayulita': ['puerto-vallarta'],
        'taxco': ['mexico-city'],
        'los-cabos': [],
        'real-de-catorce': [],
        'copper-canyon': []
      },

      transportModes: [
        { id: 'bus-only', icon: '🚌', label: 'Nur Bus', desc: 'Keine Inlandsflüge' },
        { id: 'bus-preferred', icon: '🚌', label: 'Bus bevorzugt', desc: 'Flug nur bei weiten Strecken' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Bus oder Flug' }
      ],
      defaultTransport: 'no-preference',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'bus-only': 'Nur Bus/Colectivo und Tren Maya (keine Inlandsflüge)',
          'bus-preferred': `Bus bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Busfahrt`,
          'no-preference': 'Bus oder Flug (keine Präferenz)'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'bus-only') {
          return 'NUR Bus- und Bodenverbindungen verwenden – keine Inlandsflüge. Mexiko hat ein exzellentes Fernbusnetz. Wichtige Busrouten: Mexiko-Stadt–Puebla (2h, Estrella Roja/ADO), Mexiko-Stadt–Oaxaca (6-7h, ADO), Mexiko-Stadt–Guanajuato (5h, ETN/Primera Plus), Mexiko-Stadt–San Miguel de Allende (4h, ETN), Mexiko-Stadt–Guadalajara (6-7h, ETN), Mexiko-Stadt–Taxco (3h, Estrella de Oro), Puebla–Oaxaca (4.5h, ADO), Oaxaca–San Cristóbal (10-12h, Nachtbus ADO/OCC), San Cristóbal–Palenque (5h, ADO/OCC), Palenque–Campeche (5h, ADO), Campeche–Mérida (2.5h, ADO), Mérida–Valladolid (2h, ADO), Cancún–Playa del Carmen (1h, ADO), Playa del Carmen–Tulum (1h, Colectivo), Tulum–Bacalar (3h, ADO), Guadalajara–Puerto Vallarta (5h, Primera Plus). Tren Maya auf Yucatán: Cancún–Mérida (~3h), Mérida–Campeche (~2h), Campeche–Palenque (~4h). Los Cabos und Kupfercanyon sind per Bus SEHR lang – Route ohne sie planen oder Nachtbusse nutzen.';
        } else if (transport === 'bus-preferred') {
          return `Bus bevorzugt. Inlandsflug erst empfehlen, wenn die Busfahrt länger als ${trainMaxHours} Stunden dauert. Wichtige Busrouten: Mexiko-Stadt–Puebla (2h), Mexiko-Stadt–Oaxaca (6-7h), Mexiko-Stadt–Guanajuato (5h), Mexiko-Stadt–San Miguel de Allende (4h), Mexiko-Stadt–Guadalajara (6-7h), Cancún–Playa del Carmen (1h), Playa del Carmen–Tulum (1h), Cancún–Mérida (4-5h Bus oder ~3h Tren Maya), Mérida–Campeche (2.5h), San Cristóbal–Palenque (5h). Für Mexiko-Stadt–Cancún (20h+ Bus) oder Mexiko-Stadt–Los Cabos (22h+) Flug empfehlen.`;
        }
        return 'Kombiniere Fernbusse, Tren Maya und Inlandsflüge. Kurze Strecken per Bus: Mexiko-Stadt–Puebla (2h), Mexiko-Stadt–San Miguel de Allende (4h), Cancún–Playa del Carmen (1h), Playa del Carmen–Tulum (1h Colectivo), Mérida–Valladolid (2h), Mérida–Campeche (2.5h), San Cristóbal–Palenque (5h). Tren Maya auf Yucatán: Cancún–Mérida (~3h), Mérida–Campeche (~2h), Campeche–Palenque (~4h). Für Strecken über 7h Busfahrt empfehle Inlandsflug: Mexiko-Stadt–Cancún (2.5h Flug), Mexiko-Stadt–Los Cabos (2.5h Flug), Mexiko-Stadt–Puerto Vallarta (1.5h Flug), Mexiko-Stadt–Mérida (2h Flug). Budget-Airlines: Volaris und VivaAerobus. Colectivos für kurze Strecken.';
      },

      legModes: 'bus|flight|train',

      facts: [
        'Mexiko hat 35 UNESCO-Welterbestätten – mehr als jedes andere Land in Amerika und das siebtmeiste weltweit.',
        'Die Mexikaner haben die Schokolade erfunden: Die Azteken tranken „xocolātl" – bitteres Kakaogetränk mit Chili und Vanille.',
        'Mexiko-Stadt wurde auf den Ruinen der Azteken-Hauptstadt Tenochtitlán erbaut, die einst auf einer Insel im Texcoco-See lag.',
        'In Yucatán gibt es über 6.000 Cenoten – natürliche Kalkstein-Dolinen, die die Maya als heilige Eingänge zur Unterwelt betrachteten.',
        'Mexiko ist Heimat von über 60 indigenen Sprachen – Nahuatl, die Sprache der Azteken, wird noch von 1,7 Millionen Menschen gesprochen.',
        'Die Pyramide von Cholula bei Puebla ist nach Volumen die größte Pyramide der Welt – viermal größer als die Cheops-Pyramide.',
        'Der Día de los Muertos ist kein trauriges Fest: Familien feiern ihre Verstorbenen mit Musik, Essen, Blumen und farbenfrohen Altären.',
        'Mexikos Küche ist UNESCO-Weltkulturerbe – das erste Land, dessen Küche diese Auszeichnung erhielt (2010).',
        'Die Kupferschlucht (Barrancas del Cobre) in Chihuahua ist viermal so groß wie der Grand Canyon und wird von einem spektakulären Zug durchquert.',
        'Mexiko ist der weltweit größte Silberproduzent – die Silberstadt Taxco verarbeitet seit über 500 Jahren das Edelmetall zu Kunstwerken.'
      ],

      bookingLinks: {
        transport: {
          bus:    { name: 'Bookaway', url: 'https://www.bookaway.com/', icon: '🎫' },
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' },
          train:  { name: 'Bookaway', url: 'https://www.bookaway.com/', icon: '🎫' }
        },
        general: [
          { name: 'Booking.com', url: 'https://www.booking.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'Viator', url: 'https://www.viator.com/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Mexico_City" (Mexiko-Stadt), "Oaxaca", "San_Cristóbal_de_las_Casas", "Cancún", "Mérida,_Yucatán" (Mérida), "Valladolid,_Yucatán" (Valladolid), "Guanajuato", "San_Miguel_de_Allende", "Puerto_Vallarta", "Guadalajara", "Puebla", "Cabo_San_Lucas" (Los Cabos), "Campeche_(city)" (Campeche), "Taxco", "Izamal", "Bacalar", "Sayulita"
  Sehenswürdigkeiten: "Tulum" (Maya-Ruinen am Meer), "Palenque" (Maya-Dschungelstadt), "Chichen_Itza" (Chichén Itzá), "Teotihuacan" (Teotihuacán-Pyramiden), "Monte_Albán" (Zapoteken-Hauptstadt), "Uxmal" (Maya-Ruinen), "Hierve_el_Agua" (Versteinerte Wasserfälle), "Copper_Canyon" (Kupferschlucht), "Isla_Holbox" (Walhai-Insel), "Cenote" (Heilige Kalkstein-Dolinen), "Riviera_Maya", "Frida_Kahlo_Museum", "Chapultepec_Castle"`,

      adjustWikiReferences: `"Mexico_City", "Oaxaca", "Cancún", "Tulum", "Palenque", "Chichen_Itza", "Teotihuacan", "Guanajuato", "Mérida,_Yucatán", "Puerto_Vallarta", "Guadalajara", "Cabo_San_Lucas", "Monte_Albán", "Copper_Canyon", "San_Miguel_de_Allende", "Hierve_el_Agua"`
    },

    // ==========================================
    // CHILE
    // ==========================================
    chile: {
      id: 'chile',
      name: 'Chile',
      brandName: 'Andenpfad',
      brandEmoji: '🗻',
      brandDescription: 'Personalisierte Routenplanung für Chile-Individualreisen',
      heroTitle: 'Dein perfektes <em>Chile-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Chile – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'Chile-Reiseexperte mit tiefem Wissen über Atacama-Wüste, Patagonien, Weinregionen und chilenische Kultur',
      countryInText: 'Chile',
      mapCenter: [-33, -71],
      mapZoom: 4,

      destinations: null,

      airports: [
        { id: 'scl', label: 'Santiago', desc: 'Arturo Merino Benítez (SCL)', value: 'Santiago (Flughafen Arturo Merino Benítez)' },
        { id: 'cjc', label: 'Calama/Atacama', desc: 'El Loa Airport (CJC)', value: 'Calama (Flughafen El Loa – für San Pedro de Atacama)' },
        { id: 'puq', label: 'Punta Arenas', desc: 'Carlos Ibáñez (PUQ)', value: 'Punta Arenas (Flughafen Carlos Ibáñez del Campo)' },
        { id: 'pmc', label: 'Puerto Montt', desc: 'El Tepual (PMC)', value: 'Puerto Montt (Flughafen El Tepual)' },
        { id: 'zco', label: 'Temuco', desc: 'La Araucanía (ZCO)', value: 'Temuco (Flughafen La Araucanía)' },
        { id: 'iqq', label: 'Iquique', desc: 'Diego Aracena (IQQ)', value: 'Iquique (Flughafen Diego Aracena)' }
      ],
      defaultAirport: 'Santiago (Flughafen Arturo Merino Benítez)',

      airportDestMap: {
        'santiago': 'santiago',
        'arturo merino': 'santiago',
        'scl': 'santiago',
        'calama': 'sanpedro',
        'atacama': 'sanpedro',
        'el loa': 'sanpedro',
        'cjc': 'sanpedro',
        'punta arenas': 'puntaarenas',
        'carlos ibáñez': 'puntaarenas',
        'puq': 'puntaarenas',
        'puerto montt': 'puertovaras',
        'el tepual': 'puertovaras',
        'pmc': 'puertovaras',
        'temuco': 'pucon',
        'la araucanía': 'pucon',
        'zco': 'pucon',
        'iquique': 'iquique',
        'diego aracena': 'iquique',
        'iqq': 'iquique'
      },

      cityPairs: {
        'santiago': ['valparaiso', 'vinadelmar', 'pichilemu', 'sewell', 'laserena'],
        'valparaiso': ['santiago', 'vinadelmar'],
        'vinadelmar': ['valparaiso', 'santiago'],
        'sanpedro': ['iquique', 'arica'],
        'torresdelpaine': ['puertonatales'],
        'pucon': ['valdivia', 'puertovaras'],
        'puertovaras': ['pucon', 'valdivia', 'chiloe', 'chaiten'],
        'easterisland': [],
        'laserena': ['santiago', 'elquivalley'],
        'puertonatales': ['torresdelpaine', 'puntaarenas'],
        'chiloe': ['puertovaras', 'chaiten'],
        'puntaarenas': ['puertonatales'],
        'iquique': ['sanpedro', 'arica', 'humberstone'],
        'arica': ['iquique', 'sanpedro'],
        'valdivia': ['pucon', 'puertovaras'],
        'elquivalley': ['laserena'],
        'carreteraaustral': ['chaiten', 'marblecaves', 'futaleufu'],
        'marblecaves': ['carreteraaustral'],
        'robinsoncrusoe': [],
        'humberstone': ['iquique'],
        'pichilemu': ['santiago'],
        'sewell': ['santiago'],
        'chaiten': ['puertovaras', 'chiloe', 'carreteraaustral', 'futaleufu'],
        'futaleufu': ['chaiten', 'carreteraaustral']
      },

      transportModes: [
        { id: 'bus-only', icon: '🚌', label: 'Nur Bus', desc: 'Fernbusse und lokale Busse, keine Flüge' },
        { id: 'bus-preferred', icon: '🚌', label: 'Bus bevorzugt', desc: 'Bus bevorzugt, Flug bei langen Strecken' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Beste Kombination aus Bus und Flug' },
        { id: 'flight-preferred', icon: '✈️', label: 'Flug bevorzugt', desc: 'Inlandsflüge bevorzugt, Bus für kurze Strecken' }
      ],
      defaultTransport: 'no-preference',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'bus-only': 'Nur Fernbusse – keine Inlandsflüge',
          'bus-preferred': `Bus bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Busfahrt`,
          'no-preference': 'Beste Kombination aus Bus und Inlandsflug',
          'flight-preferred': 'Inlandsflüge bevorzugt, Bus nur für kurze Strecken unter 3h'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'bus-only') {
          return 'NUR Fernbusse verwenden – keine Inlandsflüge. Chile hat exzellente Fernbusse (Turbus, Pullman Bus, Cruz del Sur) mit Salón Cama (Liegesitze) für Nachtfahrten. WICHTIG: Chile ist 4.300 km lang! Bus-only bedeutet: Norden (Atacama) und Patagonien sind mit extrem langen Fahrten verbunden. Santiago–Calama ~22h, Santiago–Punta Arenas ~40h+. Strecken über 12h als Nachtbus empfehlen (Salón Cama). Osterinsel NUR per Flug erreichbar – bei Bus-only als Ziel ausschließen! Wichtige Buszeiten: Santiago–Valparaíso (~1.5h), Santiago–La Serena (~6h), Santiago–Pucón (~10h Nachtbus), Pucón–Puerto Varas (~4.5h), Pucón–Valdivia (~2h), Puerto Montt–Chiloé (~2h inkl. Fähre), Punta Arenas–Puerto Natales (~3h), Iquique–Arica (~4h), Iquique–Calama (~5h).';
        } else if (transport === 'bus-preferred') {
          return `Bus bevorzugt. Inlandsflug erst empfehlen bei Strecken über ${trainMaxHours} Stunden Busfahrt. Chile hat exzellente Fernbusse mit Salón Cama. Buszeiten: Santiago–Valparaíso (~1.5h), Santiago–La Serena (~6h), Santiago–Pucón (~10h), Santiago–Puerto Montt (~12h), Pucón–Valdivia (~2h), Pucón–Puerto Varas (~4.5h), Punta Arenas–Puerto Natales (~3h). Flüge sinnvoll: Santiago–Calama (~2h Flug vs. 22h Bus), Santiago–Punta Arenas (~3.5h Flug vs. 40h+ Bus), Santiago–Iquique (~2.5h Flug vs. 24h Bus). Osterinsel nur per Flug erreichbar (~5h ab Santiago).`;
        } else if (transport === 'flight-preferred') {
          return 'Inlandsflüge bevorzugt. LATAM, JetSmart und Sky Airline bedienen alle wichtigen Routen ab Santiago. Bus nur für kurze Strecken unter 3h empfehlen. Flugzeiten: Santiago–Calama (~2h), Santiago–Punta Arenas (~3.5h), Santiago–Puerto Montt (~1.5h), Santiago–Iquique (~2.5h), Santiago–Temuco (~1.5h, für Pucón), Santiago–Osterinsel (~5h, nur LATAM). Kurze Busstrecken: Santiago–Valparaíso (~1.5h), Pucón–Valdivia (~2h), Punta Arenas–Puerto Natales (~3h), Calama–San Pedro (~1.5h), Puerto Montt–Chiloé (~2h Fähre). Osterinsel nur LATAM (~5h, teuer – früh buchen!).';
        }
        return `Beste Kombination aus Bus und Inlandsflug. Chile ist 4.300 km lang – Flüge für große Sprünge, Busse für regionale Strecken. Flüge sinnvoll: Santiago–Calama (~2h), Santiago–Punta Arenas (~3.5h), Santiago–Puerto Montt (~1.5h), Santiago–Iquique (~2.5h), Santiago–Osterinsel (~5h, nur LATAM). Busse optimal: Santiago–Valparaíso (~1.5h), Santiago–La Serena (~6h), Pucón–Valdivia (~2h), Pucón–Puerto Varas (~4.5h), Punta Arenas–Puerto Natales (~3h), Puerto Montt–Chiloé (~2h Fähre), Calama–San Pedro (~1.5h). Maximal 6h Bus zwischen Stopps empfehlen, darüber Flug. Airlines: LATAM, JetSmart (Budget), Sky Airline (Budget). Busunternehmen: Turbus, Pullman Bus, Cruz del Sur. Für Strecken über ${trainMaxHours}h Bus einen Inlandsflug empfehlen.`;
      },

      legModes: 'bus|flight',

      facts: [
        'Chile ist mit 4.300 km Länge das längste Land der Welt – aber im Durchschnitt nur 175 km breit, schmaler als Bayern.',
        'In der Atacama-Wüste gibt es Orte, an denen seit Beginn der Wetteraufzeichnungen noch nie Regen gefallen ist.',
        'Die Osterinsel liegt 3.700 km vom chilenischen Festland entfernt – das entspricht der Strecke von Lissabon nach Moskau.',
        'Chile produziert über ein Drittel des weltweiten Kupfers – die Mine Chuquicamata bei Calama ist einer der größten Tagebaue der Erde.',
        'Pablo Neruda liebte Chile so sehr, dass er drei Häuser voller Kuriositäten baute – in Santiago, Valparaíso und Isla Negra.',
        'Die Chinchorro-Mumien in Arica sind mit 7.000 Jahren die ältesten künstlich mumifizierten Überreste der Welt – 2.000 Jahre älter als die ägyptischen.',
        'Auf der Osterinsel stehen 887 Moai-Statuen, die größte wiegt über 80 Tonnen – wie sie transportiert wurden, ist bis heute ein Rätsel.',
        'Chile hat über 2.000 aktive und schlafende Vulkane – die höchste Dichte entlang der gesamten Andenkette.',
        'Die Sterne über der Atacama-Wüste sind so klar, dass hier die größten Teleskope der Welt stehen – darunter das ALMA und das geplante E-ELT.',
        'Chiloés Holzkirchen sind so einzigartig, dass 16 von ihnen UNESCO-Welterbe sind – erbaut ohne einen einzigen Nagel, nur mit Holzverbindungen.'
      ],

      bookingLinks: {
        transport: {
          bus:    { name: 'Recorrido', url: 'https://www.recorrido.cl/', icon: '🎫' },
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' }
        },
        general: [
          { name: 'Booking.com', url: 'https://www.booking.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'GetYourGuide', url: 'https://www.getyourguide.de/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Santiago", "Valparaiso" (Valparaíso), "Vina_del_Mar" (Viña del Mar), "La_Serena,_Chile", "Iquique", "Arica", "Punta_Arenas", "Puerto_Natales", "Puerto_Varas", "Valdivia", "Pucon" (Pucón), "Coyhaique", "Pichilemu"
  Nationalparks & Naturgebiete: "Torres_del_Paine_National_Park" (Torres del Paine), "Atacama_Desert" (Atacama-Wüste), "Carretera_Austral", "General_Carrera_Lake" (Lago General Carrera/Marmorhöhlen), "Chilean_Lake_District" (Seengebiet), "Chiloé_Archipelago" (Chiloé)
  Sehenswürdigkeiten: "Easter_Island" (Osterinsel/Rapa Nui), "San_Pedro_de_Atacama", "Humberstone_and_Santa_Laura_Saltpeter_Works" (Humberstone-Salpeterwerke), "Robinson_Crusoe_Island", "Sewell,_Chile" (Sewell-Bergbaustadt), "Elqui_Province" (Elqui-Tal)
  Kultur & Geschichte: "Pablo_Neruda", "Moai" (Osterinsel-Statuen), "Chinchorro_mummies" (Chinchorro-Mumien), "Mapuche_people" (Mapuche), "Rapa_Nui_people" (Rapa Nui), "Chilean_wine" (Chilenischer Wein), "Pisco"`,

      adjustWikiReferences: `"Santiago", "Valparaiso", "San_Pedro_de_Atacama", "Torres_del_Paine_National_Park", "Easter_Island", "Puerto_Varas", "Pucon", "Punta_Arenas", "Chiloe_Island", "Iquique", "Valdivia", "La_Serena,_Chile", "Carretera_Austral", "Puerto_Natales", "Atacama_Desert"`
    },

    // ==========================================
    // KOLUMBIEN
    // ==========================================
    colombia: {
      id: 'colombia',
      name: 'Kolumbien',
      brandName: 'Smaragdpfad',
      brandEmoji: '🦜',
      brandDescription: 'Personalisierte Routenplanung für Kolumbien-Individualreisen',
      heroTitle: 'Dein perfektes <em>Kolumbien-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Kolumbien – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'Kolumbien-Reiseexperte mit tiefem Wissen über koloniale Städte, Karibikküste, Kaffeezone und indigene Kulturen',
      countryInText: 'Kolumbien',
      mapCenter: [4.5, -74.0],
      mapZoom: 5,

      destinations: null,

      airports: [
        { id: 'bog', label: 'Bogotá', desc: 'El Dorado (BOG)', value: 'Bogotá (Flughafen El Dorado)' },
        { id: 'mde', label: 'Medellín', desc: 'José María Córdova (MDE)', value: 'Medellín (Flughafen José María Córdova)' },
        { id: 'ctg', label: 'Cartagena', desc: 'Rafael Núñez (CTG)', value: 'Cartagena (Flughafen Rafael Núñez)' },
        { id: 'clo', label: 'Cali', desc: 'Alfonso Bonilla Aragón (CLO)', value: 'Cali (Flughafen Alfonso Bonilla Aragón)' },
        { id: 'smr', label: 'Santa Marta', desc: 'Simón Bolívar (SMR)', value: 'Santa Marta (Flughafen Simón Bolívar)' },
        { id: 'baq', label: 'Barranquilla', desc: 'Ernesto Cortissoz (BAQ)', value: 'Barranquilla (Flughafen Ernesto Cortissoz)' }
      ],
      defaultAirport: 'Bogotá (Flughafen El Dorado)',

      airportDestMap: {
        'bogotá': 'bogota',
        'bogota': 'bogota',
        'el dorado': 'bogota',
        'bog': 'bogota',
        'medellín': 'medellin',
        'medellin': 'medellin',
        'rionegro': 'medellin',
        'mde': 'medellin',
        'cartagena': 'cartagena',
        'ctg': 'cartagena',
        'cali': 'cali',
        'clo': 'cali',
        'santa marta': 'santamarta',
        'smr': 'santamarta',
        'barranquilla': 'barranquilla',
        'baq': 'barranquilla'
      },

      cityPairs: {
        'bogota': ['villadeleyva', 'salento', 'medellin', 'cali', 'bucaramanga', 'popayan', 'tatacoa'],
        'cartagena': ['barranquilla', 'mompox', 'rincondelmar'],
        'barranquilla': ['cartagena', 'santamarta'],
        'santamarta': ['barranquilla', 'ciudadperdida'],
        'rincondelmar': ['cartagena'],
        'medellin': ['bogota', 'guatape', 'jardin', 'salento'],
        'guatape': ['medellin'],
        'jardin': ['medellin'],
        'salento': ['medellin', 'bogota', 'cali'],
        'bucaramanga': ['bogota', 'sangil', 'barichara'],
        'sangil': ['bucaramanga', 'barichara'],
        'barichara': ['sangil', 'bucaramanga'],
        'cali': ['bogota', 'salento', 'popayan'],
        'popayan': ['cali', 'bogota', 'tierradentro', 'tatacoa'],
        'tierradentro': ['popayan'],
        'tatacoa': ['popayan', 'bogota'],
        'villadeleyva': ['bogota'],
        'sanandres': ['providencia'],
        'providencia': ['sanandres'],
        'leticia': [],
        'canocristales': [],
        'nuqui': [],
        'mompox': ['cartagena'],
        'ciudadperdida': ['santamarta']
      },

      transportModes: [
        { id: 'bus-only', icon: '🚌', label: 'Nur Bus', desc: 'Fernbusse, keine Inlandsflüge' },
        { id: 'bus-preferred', icon: '🚌', label: 'Bus bevorzugt', desc: 'Bus bevorzugt, Flug bei langen Strecken' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Beste Kombination aus Bus und Flug' },
        { id: 'flight-preferred', icon: '✈️', label: 'Flug bevorzugt', desc: 'Inlandsflüge bevorzugt, Bus für kurze Strecken' }
      ],
      defaultTransport: 'no-preference',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'bus-only': 'Nur Fernbusse – keine Inlandsflüge',
          'bus-preferred': `Bus bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Busfahrt`,
          'no-preference': 'Beste Kombination aus Bus und Inlandsflug',
          'flight-preferred': 'Inlandsflüge bevorzugt, Bus nur für kurze Strecken unter 3h'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'bus-only') {
          return 'KEINE Flüge verwenden. Kolumbien hat KEIN Personenzugnetz – nur Fernbusse (Bolivariano, Copetran, Expreso Brasilia). Wichtige Buszeiten: Bogotá–Medellín (~9h), Bogotá–Cali (~10h), Bogotá–Bucaramanga (~7-8h), Bogotá–Villa de Leyva (~3.5h), Bogotá–Salento/Armenia (~7h), Medellín–Guatapé (~2h), Medellín–Jardín (~3.5h), Medellín–Salento (~6h), Cartagena–Barranquilla (~2h), Barranquilla–Santa Marta (~2h), Cartagena–Santa Marta (~4h), Cali–Popayán (~3h), Bucaramanga–San Gil (~2.5h), San Gil–Barichara (~30min). ACHTUNG: Leticia, San Andrés, Providencia, Caño Cristales und Nuquí sind NUR per Flug erreichbar – bei Bus-only als Ziel ausschließen!';
        } else if (transport === 'bus-preferred') {
          return `Bus bevorzugt. Inlandsflug erst empfehlen bei Strecken über ${trainMaxHours} Stunden Busfahrt. Buszeiten: Bogotá–Villa de Leyva (3.5h), Medellín–Guatapé (2h), Medellín–Jardín (3.5h), Cartagena–Barranquilla (2h), Barranquilla–Santa Marta (2h), Cali–Popayán (3h), Bucaramanga–San Gil (2.5h). Flüge sinnvoll: Bogotá–Medellín (9h Bus / 1h Flug), Bogotá–Cartagena (20h Bus / 1.5h Flug), Bogotá–Cali (10h Bus / 1h Flug), Medellín–Cartagena (13h Bus / 1h Flug). NUR per Flug: Leticia, San Andrés, Providencia, Caño Cristales, Nuquí.`;
        } else if (transport === 'flight-preferred') {
          return 'Inlandsflüge bevorzugt. Avianca, LATAM und Viva bedienen alle Hauptstrecken. Bus nur für kurze Strecken unter 3h. Flugzeiten: Bogotá–Medellín (1h), Bogotá–Cartagena (1.5h), Bogotá–Cali (1h), Bogotá–Barranquilla (1.5h), Bogotá–Santa Marta (1.5h), Bogotá–Bucaramanga (1h), Bogotá–Leticia (2h), Bogotá–San Andrés (2h), Medellín–Cartagena (1h). Kurze Busstrecken: Medellín–Guatapé (2h), Cartagena–Barranquilla (2h), Barranquilla–Santa Marta (2h), Cali–Popayán (3h), Bucaramanga–San Gil (2.5h), San Gil–Barichara (30min).';
        }
        return `Beste Kombination aus Bus und Inlandsflug. Kolumbien hat KEIN Personenzugnetz. Buszeiten: Bogotá–Villa de Leyva (3.5h), Medellín–Guatapé (2h), Medellín–Jardín (3.5h), Cartagena–Barranquilla (2h), Barranquilla–Santa Marta (2h), Cali–Popayán (3h), Bucaramanga–San Gil (2.5h). Für Strecken über ${trainMaxHours}h Bus empfehle Flug: Bogotá–Medellín (9h Bus / 1h Flug), Bogotá–Cartagena (20h Bus / 1.5h Flug), Bogotá–Cali (10h Bus / 1h Flug). NUR per Flug: Leticia (2h ab Bogotá), San Andrés (2h ab Bogotá), Providencia (20min ab San Andrés), Caño Cristales (via La Macarena), Nuquí (1h ab Medellín). Airlines: Avianca, LATAM, Viva.`;
      },

      legModes: 'bus|flight',

      facts: [
        'Kolumbien ist nach dem weltweit größten Smaragd-Exporteur benannt – rund 70% aller Smaragde weltweit stammen aus kolumbianischen Minen.',
        'Im Cocora-Tal stehen die höchsten Palmen der Welt: Die Quindío-Wachspalme wird bis zu 60 Meter hoch und ist Kolumbiens Nationalbaum.',
        'Kolumbien ist das zweitartenreichste Land der Erde – mit über 1.900 Vogelarten leben hier mehr Vogelspezies als in ganz Europa und Nordamerika zusammen.',
        'Cartagenas Altstadt ist komplett von einer 11 km langen Festungsmauer umgeben, die im 16. Jahrhundert zum Schutz vor Piraten erbaut wurde.',
        'Der Karneval von Barranquilla ist der zweitgrößte der Welt (nach Rio) und gehört zum UNESCO-Weltkulturerbe.',
        'Medellíns Metrosystem mit integrierten Seilbahnen in die Armenviertel gilt weltweit als Vorbild für innovative Stadtentwicklung und soziale Inklusion.',
        'In Santander isst man Hormigas Culonas – geröstete Blattschneiderameisen, die nach Popcorn schmecken und als Delikatesse gelten.',
        'Kolumbien hat als einziges Land Südamerikas Küsten an zwei Ozeanen: dem Pazifik und dem Atlantik (Karibik).',
        'Die Ciudad Perdida in der Sierra Nevada de Santa Marta wurde rund 650 Jahre vor Machu Picchu erbaut und erst 1972 von Grabräubern wiederentdeckt.',
        'Bogotá liegt auf 2.640m Höhe – höher als viele Alpengipfel – und hat dennoch über 8 Millionen Einwohner.'
      ],

      bookingLinks: {
        transport: {
          bus:    { name: 'Bookaway', url: 'https://www.bookaway.com/', icon: '🎫' },
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' }
        },
        general: [
          { name: 'Booking.com', url: 'https://www.booking.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'Viator', url: 'https://www.viator.com/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Bogotá", "Medellín", "Cartagena,_Colombia", "Cali", "Barranquilla", "Santa_Marta", "Bucaramanga", "Popayán", "Leticia,_Amazonas", "San_Andrés_(island)", "Providencia_Island"
  Sehenswürdigkeiten: "Cocora_Valley" (Cocora-Tal), "Museo_del_Oro" (Goldmuseum Bogotá), "Castillo_San_Felipe_de_Barajas" (Festung Cartagena), "Tayrona_National_Natural_Park" (Tayrona-Nationalpark), "Ciudad_Perdida" (Verlorene Stadt), "Caño_Cristales" (Regenbogenfluss), "Guatapé" (Piedra del Peñol), "Tatacoa_Desert" (Tatacoa-Wüste), "Chicamocha_National_Park" (Chicamocha-Canyon), "Barichara", "Villa_de_Leyva", "Tierradentro" (UNESCO-Felsengräber), "Mompós" (Mompox), "Nuquí" (Pazifikküste), "Jardín" (Antioquia)`,

      adjustWikiReferences: `"Bogotá", "Medellín", "Cartagena,_Colombia", "Cali", "Santa_Marta", "Cocora_Valley", "Guatapé", "Ciudad_Perdida", "Tayrona_National_Natural_Park", "Caño_Cristales", "Tatacoa_Desert", "Barichara", "Villa_de_Leyva", "San_Andrés_(island)", "Popayán"`
    },

    // ==========================================
    // INDIEN
    // ==========================================
    india: {
      id: 'india',
      name: 'Indien',
      brandName: 'Mogulpfad',
      brandEmoji: '🕌',
      brandDescription: 'Personalisierte Routenplanung für Indien-Individualreisen',
      heroTitle: 'Dein perfektes <em>Indien-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Indien – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'Indien-Reiseexperte mit tiefem Wissen über Mogul-Architektur, Rajasthan, Kerala-Backwaters, Himalaya und indische Spiritualität',
      countryInText: 'Indien',
      mapCenter: [22, 79],
      mapZoom: 5,

      destinations: null,

      airports: [
        { id: 'del', label: 'Delhi', desc: 'Indira Gandhi International (DEL)', value: 'Delhi (Flughafen Indira Gandhi)' },
        { id: 'bom', label: 'Mumbai', desc: 'Chhatrapati Shivaji (BOM)', value: 'Mumbai (Flughafen Chhatrapati Shivaji)' },
        { id: 'blr', label: 'Bangalore', desc: 'Kempegowda International (BLR)', value: 'Bangalore (Flughafen Kempegowda)' },
        { id: 'cok', label: 'Kochi', desc: 'Cochin International (COK)', value: 'Kochi (Flughafen Cochin)' },
        { id: 'goi', label: 'Goa', desc: 'Manohar International (GOI)', value: 'Goa (Flughafen Manohar)' },
        { id: 'jai', label: 'Jaipur', desc: 'Jaipur International (JAI)', value: 'Jaipur (Flughafen)' },
        { id: 'vns', label: 'Varanasi', desc: 'Lal Bahadur Shastri (VNS)', value: 'Varanasi (Flughafen Lal Bahadur Shastri)' }
      ],
      defaultAirport: 'Delhi (Flughafen Indira Gandhi)',

      airportDestMap: {
        'delhi': 'delhi',
        'indira gandhi': 'delhi',
        'del': 'delhi',
        'mumbai': 'mumbai',
        'bombay': 'mumbai',
        'bom': 'mumbai',
        'bangalore': 'mysore',
        'bengaluru': 'mysore',
        'blr': 'mysore',
        'kochi': 'kochi',
        'cochin': 'kochi',
        'cok': 'kochi',
        'goa': 'goa',
        'goi': 'goa',
        'jaipur': 'jaipur',
        'jai': 'jaipur',
        'varanasi': 'varanasi',
        'vns': 'varanasi'
      },

      cityPairs: {
        'delhi': ['agra', 'jaipur', 'rishikesh', 'amritsar', 'varanasi'],
        'agra': ['delhi', 'jaipur', 'orchha', 'khajuraho', 'varanasi'],
        'jaipur': ['delhi', 'agra', 'pushkar', 'jodhpur', 'udaipur', 'bundi'],
        'pushkar': ['jaipur', 'jodhpur'],
        'jodhpur': ['jaipur', 'pushkar', 'jaisalmer', 'udaipur'],
        'jaisalmer': ['jodhpur'],
        'udaipur': ['jodhpur', 'jaipur', 'mumbai', 'bundi'],
        'bundi': ['jaipur', 'udaipur'],
        'rishikesh': ['delhi'],
        'amritsar': ['delhi'],
        'varanasi': ['delhi', 'agra', 'khajuraho'],
        'darjeeling': [],
        'khajuraho': ['agra', 'varanasi', 'orchha'],
        'orchha': ['agra', 'khajuraho'],
        'mumbai': ['goa', 'udaipur'],
        'rannofkutch': [],
        'goa': ['mumbai', 'hampi'],
        'hampi': ['goa', 'mysore'],
        'mysore': ['hampi', 'kochi', 'pondicherry'],
        'kochi': ['mysore', 'munnar'],
        'munnar': ['kochi'],
        'pondicherry': ['mysore'],
        'spiti': [],
        'majuli': []
      },

      transportModes: [
        { id: 'train-only', icon: '🚂', label: 'Nur Zug & Bus', desc: 'Keine Inlandsflüge' },
        { id: 'train-preferred', icon: '🚂', label: 'Zug bevorzugt', desc: 'Flug nur bei weiten Strecken' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Zug, Bus oder Flug' },
        { id: 'flight-preferred', icon: '✈️', label: 'Flug bevorzugt', desc: 'Inlandsflüge bevorzugt, Bus für kurze Strecken' }
      ],
      defaultTransport: 'no-preference',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'train-only': 'Nur Zug und Bus (keine Inlandsflüge)',
          'train-preferred': `Zug bevorzugt, Inlandsflug erst ab ${trainMaxHours}h Zugfahrt`,
          'no-preference': 'Zug, Bus oder Flug (keine Präferenz)',
          'flight-preferred': 'Inlandsflüge bevorzugt, wo verfügbar und sinnvoll'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'train-only') {
          return 'NUR Zug- und Busverbindungen verwenden – keine Inlandsflüge. Indian Railways ist eines der größten Zugnetze der Welt. Wichtige Zugstrecken: Delhi–Agra (2h Gatimaan/Vande Bharat), Delhi–Jaipur (2.5h Vande Bharat), Delhi–Varanasi (8h Vande Bharat), Delhi–Amritsar (5h Shatabdi), Jaipur–Jodhpur (5h Express), Jodhpur–Jaisalmer (5.5h Express), Jodhpur–Udaipur (4h Express), Agra–Jaipur (4h Zug), Mumbai–Goa (8-10h Konkan Railway). Bus: Jaipur–Pushkar (2.5h), Delhi–Rishikesh (6h), Goa–Hampi (7h), Kochi–Munnar (4h). Für Nord-Süd max. 12-14h pro Etappe.';
        } else if (transport === 'train-preferred') {
          return `Zug bevorzugt. Inlandsflug erst bei Strecken über ${trainMaxHours}h Zugfahrt. Zugstrecken: Delhi–Agra (2h), Delhi–Jaipur (2.5h), Delhi–Varanasi (8h), Delhi–Amritsar (5h), Jaipur–Jodhpur (5h), Jodhpur–Jaisalmer (5.5h), Mumbai–Goa (8-10h). Flug empfohlen: Delhi–Kochi (2.5h Flug vs. 30h+ Zug), Delhi–Goa (2h Flug vs. 24h+ Zug), Delhi–Mumbai (2h Flug vs. 16h Zug), Mumbai–Kochi (1.5h Flug vs. 17h Zug), Delhi–Darjeeling (Flug nach Bagdogra). Jaisalmer/Pushkar: kein Flughafen. Spiti: nur per Straße.`;
        } else if (transport === 'flight-preferred') {
          return 'Inlandsflüge bevorzugt. IndiGo, SpiceJet, Air India Express sind günstig und effizient. Flüge: Delhi–Mumbai (2h), Delhi–Goa (2.5h), Delhi–Kochi (2.5h), Delhi–Varanasi (1.5h), Mumbai–Goa (1h), Mumbai–Kochi (1.5h), Delhi–Darjeeling/Bagdogra (2h), Delhi–Amritsar (1h). Per Zug trotzdem: Delhi–Agra (2h), Delhi–Jaipur (2.5h), Jaipur–Jodhpur (5h), Jodhpur–Jaisalmer (5.5h – kein Flughafen!). Jaisalmer, Pushkar: keine Flughäfen. Spiti: nur per Straße.';
        }
        return `Kombiniere Züge, Busse und Inlandsflüge. Indiens Zugnetz ist exzellent: Delhi–Agra (2h), Delhi–Jaipur (2.5h), Delhi–Varanasi (8h), Delhi–Amritsar (5h), Jaipur–Jodhpur (5h), Jodhpur–Jaisalmer (5.5h), Jodhpur–Udaipur (4h), Mumbai–Goa (8-10h Konkan Railway). Für Strecken über ${trainMaxHours}h Zug empfehle Flug: Delhi–Mumbai (2h Flug), Delhi–Kochi (2.5h), Delhi–Goa (2.5h). Darjeeling per Flug nach Bagdogra + 3h Taxi. Spiti nur per Bus/Auto (Jun-Okt). Jaisalmer/Pushkar: kein Flughafen, nur Zug/Bus.`;
      },

      legModes: 'train|bus|flight',

      facts: [
        'Indian Railways transportiert täglich über 23 Millionen Passagiere – das sind mehr Menschen als in ganz Australien leben.',
        'Das Taj Mahal ändert seine Farbe je nach Tageszeit: rosa am Morgen, weiß am Tag und golden im Mondlicht.',
        'In Amritsars Goldenem Tempel werden täglich bis zu 100.000 Menschen kostenlos in der Langar-Gemeinschaftsküche verköstigt.',
        'Indien hat über 30 UNESCO-Welterbestätten – von den Höhlen von Ajanta bis zum Himalaya-Nationalpark.',
        'Die Wüste Thar bei Jaisalmer ist eine der am dichtesten besiedelten Wüsten der Welt – hier leben mehr Menschen als in Island.',
        'Varanasi gilt als eine der ältesten durchgehend bewohnten Städte der Welt – über 3.000 Jahre alt.',
        'Keralas Backwaters umfassen über 900 km Wasserstraßen, auf denen einst der gesamte Gewürzhandel der Region abgewickelt wurde.',
        'Darjeelings Toy Train (DHR) fährt seit 1881 und war eine der ersten Eisenbahnen der Welt, die zum UNESCO-Welterbe erklärt wurde.',
        'Indiens größte Salzwüste, der Rann of Kutch, wird während des Monsuns komplett überflutet und verwandelt sich in einen riesigen See.',
        'In Rajasthan gibt es über 60 prachtvolle Maharaja-Paläste, von denen viele heute als Luxushotels dienen – sogenannte Heritage Hotels.'
      ],

      bookingLinks: {
        transport: {
          train:  { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' },
          bus:    { name: '12go.asia', url: 'https://12go.asia/de', icon: '🎫' },
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' }
        },
        general: [
          { name: 'Booking.com', url: 'https://www.booking.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'Viator', url: 'https://www.viator.com/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Delhi", "Agra", "Jaipur", "Varanasi", "Mumbai", "Udaipur", "Jodhpur", "Jaisalmer", "Kochi", "Goa", "Rishikesh", "Amritsar", "Darjeeling", "Mysore", "Pushkar", "Pondicherry"
  Sehenswürdigkeiten: "Taj_Mahal" (Taj Mahal), "Amber_Fort" (Amber Fort Jaipur), "Hawa_Mahal" (Hawa Mahal Jaipur), "Mehrangarh" (Mehrangarh Fort Jodhpur), "Red_Fort" (Red Fort Delhi), "Qutub_Minar" (Qutub Minar Delhi), "Gateway_of_India" (Gateway of India Mumbai), "Hampi", "Fatehpur_Sikri" (Fatehpur Sikri), "Elephanta_Caves" (Elephanta-Höhlen), "Jantar_Mantar,_Jaipur" (Jantar Mantar), "Mysore_Palace" (Mysore Palace), "Harmandir_Sahib" (Goldener Tempel), "Khajuraho_Group_of_Monuments" (Khajuraho), "Auroville", "Kerala_backwaters" (Kerala Backwaters), "Darjeeling_Himalayan_Railway" (Toy Train)
  Natur: "Spiti_Valley" (Spiti), "Rann_of_Kutch" (Rann of Kutch), "Munnar", "Western_Ghats" (Western Ghats)
  Kultur: "Majuli", "Orchha", "Taragarh_Fort,_Bundi" (Bundi)`,

      adjustWikiReferences: `"Delhi", "Agra", "Jaipur", "Varanasi", "Mumbai", "Udaipur", "Jodhpur", "Jaisalmer", "Kochi", "Goa", "Rishikesh", "Amritsar", "Taj_Mahal", "Amber_Fort", "Mehrangarh", "Red_Fort", "Hampi", "Mysore_Palace", "Harmandir_Sahib"`
    },

    // ==========================================
    // GUATEMALA
    // ==========================================
    guatemala: {
      id: 'guatemala',
      name: 'Guatemala',
      brandName: 'Mayapfad',
      brandEmoji: '🌋',
      brandDescription: 'Personalisierte Routenplanung für Guatemala-Individualreisen',
      heroTitle: 'Dein perfektes <em>Guatemala-Abenteuer</em> beginnt hier',
      heroSubtitle: 'Erstelle in wenigen Klicks eine maßgeschneiderte Reiseroute durch Guatemala – mit interaktiver Karte, Tagesplänen und praktischen Tipps.',
      expertRole: 'Guatemala-Reiseexperte mit tiefem Wissen über Maya-Kultur, Vulkane und Shuttle-Routen',
      countryInText: 'Guatemala',
      mapCenter: [15.0, -90.3],
      mapZoom: 7,

      destinations: null,

      airports: [
        { id: 'gua', label: 'Guatemala-Stadt', desc: 'La Aurora (GUA)', value: 'Guatemala-Stadt (Flughafen La Aurora)' },
        { id: 'frs', label: 'Flores/Tikal', desc: 'Mundo Maya (FRS)', value: 'Flores (Flughafen Mundo Maya)' }
      ],
      defaultAirport: 'Guatemala-Stadt (Flughafen La Aurora)',

      airportDestMap: {
        'guatemala-stadt': 'guatemalacity',
        'guatemala city': 'guatemalacity',
        'guatemala': 'guatemalacity',
        'gua': 'guatemalacity',
        'la aurora': 'guatemalacity',
        'flores': 'flores',
        'tikal': 'flores',
        'frs': 'flores',
        'mundo maya': 'flores',
        'petén': 'flores'
      },

      cityPairs: {
        'guatemalacity': ['antiguaguatemala', 'monterrico', 'panajachel', 'coban', 'flores', 'riodulce', 'lakeizabal'],
        'antiguaguatemala': ['guatemalacity', 'panajachel', 'monterrico', 'chichicastenango', 'iximche', 'acatenango'],
        'panajachel': ['antiguaguatemala', 'chichicastenango', 'quetzaltenango', 'sanpedrolalaguna', 'guatemalacity'],
        'chichicastenango': ['panajachel', 'quetzaltenango', 'nebaj', 'antiguaguatemala'],
        'quetzaltenango': ['panajachel', 'chichicastenango', 'huehuetenango', 'todossantos'],
        'huehuetenango': ['quetzaltenango', 'todossantos', 'nebaj'],
        'todossantos': ['huehuetenango', 'quetzaltenango'],
        'nebaj': ['chichicastenango', 'huehuetenango', 'coban'],
        'sanpedrolalaguna': ['panajachel'],
        'coban': ['guatemalacity', 'lanquin', 'semucchampey', 'sancristobalverapaz', 'biotopoquetzal', 'nebaj'],
        'lanquin': ['coban', 'semucchampey'],
        'semucchampey': ['lanquin', 'coban'],
        'sancristobalverapaz': ['coban'],
        'biotopoquetzal': ['coban', 'guatemalacity'],
        'riodulce': ['guatemalacity', 'livingston', 'lakeizabal', 'flores'],
        'livingston': ['riodulce'],
        'lakeizabal': ['riodulce', 'coban', 'guatemalacity'],
        'flores': ['tikal', 'yaxha', 'elmirador', 'guatemalacity', 'riodulce'],
        'tikal': ['flores', 'yaxha'],
        'yaxha': ['flores', 'tikal'],
        'elmirador': ['flores'],
        'acatenango': ['antiguaguatemala'],
        'iximche': ['antiguaguatemala', 'panajachel'],
        'monterrico': ['antiguaguatemala', 'guatemalacity']
      },

      transportModes: [
        { id: 'bus-only', icon: '🚌', label: 'Nur Bus', desc: 'Shuttle & Chicken Bus, kein Flug' },
        { id: 'bus-preferred', icon: '🚐', label: 'Bus bevorzugt', desc: 'Flug nur nach Flores/Petén' },
        { id: 'no-preference', icon: '🗺️', label: 'Egal', desc: 'Shuttle-Bus oder Flug' },
        { id: 'flight-preferred', icon: '✈️', label: 'Flug bevorzugt', desc: 'Fliegen wo möglich' }
      ],
      defaultTransport: 'no-preference',

      transportPrompt(transport, trainMaxHours) {
        const names = {
          'bus-only': 'Nur Bus – Tourist Shuttles und Chicken Buses, keine Inlandsflüge',
          'bus-preferred': 'Bus/Shuttle bevorzugt, Inlandsflug nur nach Flores/Petén',
          'no-preference': 'Shuttle-Bus oder Inlandsflug (keine Präferenz)',
          'flight-preferred': 'Inlandsflug nach Flores/Petén bevorzugt, sonst Shuttle'
        };
        return names[transport] || names['no-preference'];
      },

      transportRules(transport, trainMaxHours) {
        if (transport === 'bus-only') {
          return 'KEINE Flüge verwenden. Guatemala hat KEIN Zugnetz – nur Tourist Shuttles und Chicken Buses. Wichtige Shuttle-Strecken: Guatemala-Stadt–Antigua (~1h), Antigua–Panajachel (~2.5h), Panajachel–Chichicastenango (~1.5h), Antigua–Quetzaltenango (~4h), Guatemala-Stadt–Cobán (~4.5h), Cobán–Lanquín (~3h, holprig), Guatemala-Stadt–Flores (~8-10h Nachtbus). Lanchas: Panajachel–San Pedro (~30min). Boote: Río Dulce–Livingston (~1.5h). Route so planen, dass Tagesetappen unter 6h bleiben.';
        } else if (transport === 'bus-preferred') {
          return 'Bus/Shuttle bevorzugt. Inlandsflug nur für Guatemala-Stadt–Flores empfehlen (TAG Airlines, ~1h statt 8-10h Bus). Alle anderen Strecken per Tourist Shuttle. Fahrzeiten: Guatemala-Stadt–Antigua (~1h), Antigua–Panajachel (~2.5h), Panajachel–Chichicastenango (~1.5h), Antigua–Quetzaltenango (~4h), Guatemala-Stadt–Cobán (~4.5h), Cobán–Lanquín (~3h). Lanchas auf dem Atitlán-See. Boote: Río Dulce–Livingston (~1.5h).';
        } else if (transport === 'flight-preferred') {
          return 'Inlandsflug nach Flores/Petén bevorzugt (TAG Airlines, Guatemala-Stadt–Flores ~1h). Dies ist die EINZIGE relevante Inlandsflugstrecke Guatemalas. Alle anderen Verbindungen per Tourist Shuttle: Guatemala-Stadt–Antigua (~1h), Antigua–Panajachel (~2.5h), Panajachel–Chichicastenango (~1.5h), Antigua–Quetzaltenango (~4h), Guatemala-Stadt–Cobán (~4.5h). Lanchas auf Atitlán-See. Boote: Río Dulce–Livingston (~1.5h).';
        }
        return 'Kombiniere Tourist Shuttles und Inlandsflug je nach Distanz. Guatemala hat KEIN Zugnetz. Einzige Inlandsflugstrecke: Guatemala-Stadt–Flores (TAG Airlines, ~1h vs. 8-10h Bus). Alle anderen Strecken per Tourist Shuttle. Fahrzeiten: Guatemala-Stadt–Antigua (~1h), Antigua–Panajachel (~2.5h), Panajachel–Chichicastenango (~1.5h), Antigua–Quetzaltenango (~4h), Guatemala-Stadt–Cobán (~4.5h), Cobán–Lanquín (~3h), Flores–Tikal (~1.5h). Lanchas: Panajachel–San Pedro (~30min). Boote: Río Dulce–Livingston (~1.5h). Für die Strecke nach Flores Flug empfehlen.';
      },

      legModes: 'bus|flight',

      facts: [
        'Guatemala ist die Wiege der Schokolade: Die Maya tranken bereits vor 3.000 Jahren Kakao als heiliges Getränk – das Wort Schokolade stammt aus dem Maya-Nahuatl.',
        'Der Quetzal-Vogel ist Guatemalas Nationalvogel und Namensgeber der Währung – die Maya verehrten seine bis zu 65 cm langen Schwanzfedern als göttlich.',
        'Tikal war einst eine Metropole mit über 100.000 Einwohnern – seine Pyramiden überragen den Dschungel und dienten als Drehort für Star Wars.',
        'Guatemala hat 37 Vulkane, von denen drei derzeit aktiv sind – der Volcán de Fuego bricht regelmäßig aus und ist von Antigua sichtbar.',
        'Der Lago de Atitlán liegt auf 1.562 m Höhe und ist von drei Vulkanen umgeben – Aldous Huxley nannte ihn den schönsten See der Welt.',
        'In Guatemala werden 25 verschiedene Sprachen gesprochen – 22 davon sind Maya-Sprachen, dazu kommen Spanisch, Garífuna und Xinca.',
        'Semuc Champey entstand, weil der Río Cahabón unter einer Kalksteinbrücke hindurchfließt und darüber türkise Naturpools gebildet hat – ein geologisches Wunder.',
        'Antigua Guatemala wurde dreimal durch Erdbeben und Vulkanausbrüche zerstört und dreimal wiederaufgebaut – die Ruinen stehen noch heute neben lebendigen Kirchen.',
        'El Mirador im Petén-Dschungel beherbergt La Danta, die größte Pyramide der Maya-Welt nach Volumen – sie ist nur durch einen 5-tägigen Fußmarsch erreichbar.',
        'Das Popol Vuh, die heilige Schöpfungsgeschichte der K\'iche\'-Maya, wurde in Chichicastenango niedergeschrieben und gilt als bedeutendstes Dokument der Maya-Mythologie.'
      ],

      bookingLinks: {
        transport: {
          bus:    { name: 'Bookaway', url: 'https://www.bookaway.com/', icon: '🎫' },
          flight: { name: 'Skyscanner', url: 'https://www.skyscanner.de/', icon: '✈️' }
        },
        general: [
          { name: 'Booking.com', url: 'https://www.booking.com/', icon: '🏨', label: 'Unterkünfte' },
          { name: 'GetYourGuide', url: 'https://www.getyourguide.de/', icon: '🎭', label: 'Aktivitäten & Touren' }
        ]
      },

      wikiReferences: `Städte: "Antigua_Guatemala" (Antigua), "Guatemala_City" (Guatemala-Stadt), "Quetzaltenango" (Xela), "Cobán", "Huehuetenango", "Flores,_Petén" (Flores), "Livingston,_Guatemala" (Livingston), "Panajachel", "Chichicastenango", "San_Pedro_La_Laguna"
  Archäologische Stätten: "Tikal" (Tikal), "Yaxhá" (Yaxhá), "El_Mirador" (El Mirador), "Iximché" (Iximché)
  Sehenswürdigkeiten: "Semuc_Champey" (Semuc Champey), "Lake_Izabal" (Izabal-See), "Castillo_de_San_Felipe_de_Lara" (Castillo San Felipe/Río Dulce), "Acatenango" (Vulkan Acatenango), "Resplendent_quetzal" (Quetzal-Vogel), "Monterrico,_Guatemala" (Monterrico), "Nebaj" (Nebaj/Ixil-Dreieck), "Todos_Santos_Cuchumatán" (Todos Santos), "Lanquín" (Lanquín-Höhlen), "San_Cristóbal_Verapaz"
  Kultur: "Maya_peoples" (Maya-Völker), "Garífuna_people" (Garífuna), "K%27iche%27_people" (K'iche'-Maya)`,

      adjustWikiReferences: `"Antigua_Guatemala", "Guatemala_City", "Tikal", "Panajachel", "Flores,_Petén", "Chichicastenango", "Semuc_Champey", "Quetzaltenango", "Livingston,_Guatemala", "Castillo_de_San_Felipe_de_Lara", "Lake_Izabal", "Cobán", "Acatenango", "El_Mirador", "Yaxhá"`
    }
  },

  /**
   * Gibt alle verfügbaren Länder zurück
   */
  getAvailableCountries() {
    return Object.values(this.configs).map(c => ({
      id: c.id,
      name: c.name,
      brandName: c.brandName,
      brandEmoji: c.brandEmoji
    }));
  },

  /**
   * Setzt das aktive Land und aktualisiert die globale DESTINATIONS-Variable
   */
  setCountry(countryId) {
    const config = this.configs[countryId];
    if (!config) {
      console.error(`Unbekanntes Land: ${countryId}`);
      return false;
    }

    // Destinations aus den globalen Arrays zuweisen
    if (countryId === 'china') {
      config.destinations = typeof DESTINATIONS !== 'undefined' ? DESTINATIONS : [];
    } else if (countryId === 'vietnam') {
      config.destinations = typeof VIETNAM_DESTINATIONS !== 'undefined' ? VIETNAM_DESTINATIONS : [];
    } else if (countryId === 'japan') {
      config.destinations = typeof JAPAN_DESTINATIONS !== 'undefined' ? JAPAN_DESTINATIONS : [];
    } else if (countryId === 'thailand') {
      config.destinations = typeof THAILAND_DESTINATIONS !== 'undefined' ? THAILAND_DESTINATIONS : [];
    } else if (countryId === 'indonesia') {
      config.destinations = typeof INDONESIA_DESTINATIONS !== 'undefined' ? INDONESIA_DESTINATIONS : [];
    } else if (countryId === 'cambodia') {
      config.destinations = typeof CAMBODIA_DESTINATIONS !== 'undefined' ? CAMBODIA_DESTINATIONS : [];
    } else if (countryId === 'srilanka') {
      config.destinations = typeof SRILANKA_DESTINATIONS !== 'undefined' ? SRILANKA_DESTINATIONS : [];
    } else if (countryId === 'philippines') {
      config.destinations = typeof PHILIPPINES_DESTINATIONS !== 'undefined' ? PHILIPPINES_DESTINATIONS : [];
    } else if (countryId === 'southkorea') {
      config.destinations = typeof SOUTHKOREA_DESTINATIONS !== 'undefined' ? SOUTHKOREA_DESTINATIONS : [];
    } else if (countryId === 'laos') {
      config.destinations = typeof LAOS_DESTINATIONS !== 'undefined' ? LAOS_DESTINATIONS : [];
    } else if (countryId === 'namibia') {
      config.destinations = typeof NAMIBIA_DESTINATIONS !== 'undefined' ? NAMIBIA_DESTINATIONS : [];
    } else if (countryId === 'southafrica') {
      config.destinations = typeof SOUTHAFRICA_DESTINATIONS !== 'undefined' ? SOUTHAFRICA_DESTINATIONS : [];
    } else if (countryId === 'costarica') {
      config.destinations = typeof COSTARICA_DESTINATIONS !== 'undefined' ? COSTARICA_DESTINATIONS : [];
    } else if (countryId === 'australia') {
      config.destinations = typeof AUSTRALIA_DESTINATIONS !== 'undefined' ? AUSTRALIA_DESTINATIONS : [];
    } else if (countryId === 'peru') {
      config.destinations = typeof PERU_DESTINATIONS !== 'undefined' ? PERU_DESTINATIONS : [];
    } else if (countryId === 'mexico') {
      config.destinations = typeof MEXICO_DESTINATIONS !== 'undefined' ? MEXICO_DESTINATIONS : [];
    } else if (countryId === 'chile') {
      config.destinations = typeof CHILE_DESTINATIONS !== 'undefined' ? CHILE_DESTINATIONS : [];
    } else if (countryId === 'colombia') {
      config.destinations = typeof COLOMBIA_DESTINATIONS !== 'undefined' ? COLOMBIA_DESTINATIONS : [];
    } else if (countryId === 'india') {
      config.destinations = typeof INDIA_DESTINATIONS !== 'undefined' ? INDIA_DESTINATIONS : [];
    } else if (countryId === 'guatemala') {
      config.destinations = typeof GUATEMALA_DESTINATIONS !== 'undefined' ? GUATEMALA_DESTINATIONS : [];
    }

    this.current = config;

    // Globale DESTINATIONS-Variable aktualisieren für Abwärtskompatibilität
    window.ACTIVE_DESTINATIONS = config.destinations;

    console.log(`Land gewechselt: ${config.brandEmoji} ${config.brandName} (${config.name})`);
    return true;
  },

  /**
   * Gibt die aktiven Destinations zurück
   */
  getDestinations() {
    return this.current ? this.current.destinations : [];
  },

  /**
   * Gibt die City-Pairs zurück
   */
  getCityPairs() {
    return this.current ? this.current.cityPairs : {};
  },

  /**
   * Initialisiert mit Standard-Land (China)
   */
  init(countryId) {
    this.setCountry(countryId || 'china');
  }
};
