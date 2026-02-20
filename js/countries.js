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
        { id: 'train-preferred', icon: '🚄✈️', label: 'Zug bevorzugt', desc: 'Flug ab X Stunden' },
        { id: 'no-preference', icon: '🤷', label: 'Egal', desc: 'Zug oder Flug' }
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
          return 'NUR Zugverbindungen verwenden – keine Inlandsflüge. Route so planen, dass alle Strecken per Zug machbar sind.';
        } else if (transport === 'train-preferred') {
          return `Zug bevorzugt. Inlandsflug erst empfehlen, wenn die Zugfahrt länger als ${trainMaxHours} Stunden dauert.`;
        }
        return 'Maximale Transportzeit zwischen zwei Stopps: 6 Stunden per Zug. Bei längeren Strecken empfehle einen Inlandsflug.';
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
        { id: 'no-fly', icon: '🚫✈️', label: 'Ohne Fliegen', desc: 'Zug & Bus, keine Flüge' },
        { id: 'ground-preferred', icon: '🚌🚂', label: 'Boden bevorzugt', desc: 'Flug nur bei weiten Strecken' },
        { id: 'no-preference', icon: '🤷', label: 'Egal', desc: 'Zug, Bus oder Flug' },
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
          return 'KEINE Flüge verwenden. Nur Züge (Reunification Express: Hanoi–Ninh Binh–Vinh–Dong Hoi–Hue–Da Nang–Quy Nhon–Nha Trang–Phan Thiet–Saigon) und Busse (Open Tour Bus, Sleeper Bus). Nachtbusse sparen eine Hotelnacht. Route so planen, dass alle Strecken per Zug oder Bus machbar sind.';
        } else if (transport === 'ground-preferred') {
          return `Zug (Reunification Express) oder Bus (Sleeper Bus, Open Tour Bus) bevorzugt. Inlandsflug erst empfehlen, wenn die Fahrt per Zug/Bus länger als ${trainMaxHours} Stunden dauert. Nachtbusse (Sleeper Bus) sind für Strecken von 5-10h eine beliebte und günstige Option.`;
        } else if (transport === 'fast') {
          return 'Inlandsflüge bevorzugen, wo verfügbar (z.B. Hanoi–Da Nang, Hanoi–Saigon, Saigon–Phu Quoc). Für kurze Strecken unter 3h Zug oder Bus nutzen. Effizienz und Komfort priorisieren.';
        }
        return 'Kombiniere Züge (Reunification Express), Busse (Sleeper Bus, Open Tour Bus) und Inlandsflüge je nach Strecke. Für Distanzen unter 6h empfehle Zug oder Bus, darüber Inlandsflug. Nachtbusse/Nachtzüge sparen eine Nacht Hotel.';
      },

      legModes: 'train|bus|sleeper_bus|flight',

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
        { id: 'train-preferred', icon: '🚅✈️', label: 'Zug bevorzugt', desc: 'Flug ab X Stunden' },
        { id: 'no-preference', icon: '🤷', label: 'Egal', desc: 'Zug oder Flug' },
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
          return 'NUR Zugverbindungen verwenden (Shinkansen, Limited Express, JR-Züge). Keine Inlandsflüge. Empfehle einen Japan Rail Pass (7/14/21 Tage). Route so planen, dass alle Strecken per Zug machbar sind. Fähren zu Inseln (z.B. Miyajima, Naoshima) sind erlaubt.';
        } else if (transport === 'train-preferred') {
          return `Zug bevorzugt (Shinkansen, JR-Züge). Inlandsflug erst empfehlen, wenn die Zugfahrt länger als ${trainMaxHours} Stunden dauert (z.B. Tokio–Sapporo, Tokio–Okinawa). Empfehle einen Japan Rail Pass. Fähren zu Inseln sind erlaubt.`;
        } else if (transport === 'budget') {
          return 'Highway-Busse (Nachtbusse!) und günstige Transportoptionen bevorzugen. Nachtbusse sparen eine Hotelnacht. Shinkansen nur für kurze Strecken oder wenn ein Japan Rail Pass genutzt wird. Inlandsflüge nur bei extremen Entfernungen (z.B. Okinawa). Fähren zu Inseln sind erlaubt.';
        }
        return 'Kombiniere Shinkansen, JR-Züge und Inlandsflüge je nach Strecke. Für Distanzen unter 4h empfehle Shinkansen, darüber ggf. Inlandsflug. Empfehle einen Japan Rail Pass bei zugdominierten Routen. Fähren zu Inseln (z.B. Miyajima) einplanen.';
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
        'bangkok': ['ayutthaya', 'kanchanaburi', 'hua-hin', 'khao-yai', 'lopburi', 'phetchaburi'],
        'ayutthaya': ['bangkok', 'lopburi'],
        'kanchanaburi': ['bangkok', 'sangkhlaburi'],
        'hua-hin': ['bangkok', 'phetchaburi'],
        'chiang-mai': ['pai', 'chiang-rai', 'sukhothai', 'lampang'],
        'chiang-rai': ['chiang-mai'],
        'pai': ['chiang-mai', 'mae-hong-son'],
        'sukhothai': ['chiang-mai'],
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
        'ko-chang': [],
        'lopburi': ['bangkok', 'ayutthaya'],
        'khao-yai': ['bangkok'],
        'nan': [],
        'sangkhlaburi': ['kanchanaburi'],
        'phetchaburi': ['bangkok', 'hua-hin']
      },

      transportModes: [
        { id: 'no-fly', icon: '🚫✈️', label: 'Ohne Fliegen', desc: 'Zug, Bus & Boot, keine Flüge' },
        { id: 'ground-preferred', icon: '🚌🚂', label: 'Boden bevorzugt', desc: 'Flug nur bei weiten Strecken' },
        { id: 'no-preference', icon: '🤷', label: 'Egal', desc: 'Zug, Bus, Boot oder Flug' },
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
          return 'KEINE Flüge verwenden. Nur Züge (SRT: Bangkok–Ayutthaya–Chiang Mai Nordlinie, Bangkok–Hua Hin–Surat Thani Südlinie), VIP-Busse, Minivans und Fähren. Nachtzüge und Nachtbusse sparen eine Hotelnacht. Fähren für Inseln obligatorisch (Ko Samui ab Surat Thani/Don Sak, Ko Tao ab Chumphon, Ko Phi Phi ab Krabi/Phuket). Route so planen, dass alle Strecken ohne Flug machbar sind.';
        } else if (transport === 'ground-preferred') {
          return `Zug, Bus oder Fähre bevorzugt. Inlandsflug erst empfehlen, wenn die Fahrt länger als ${trainMaxHours} Stunden dauert (z.B. Bangkok–Phuket, Bangkok–Ko Samui). Nachtzüge (Bangkok–Chiang Mai Sleeper) und VIP-Nachtbusse sind beliebte Optionen. Fähren für alle Inseln einplanen.`;
        } else if (transport === 'fast') {
          return 'Inlandsflüge bevorzugen, wo verfügbar (z.B. Bangkok–Chiang Mai, Bangkok–Phuket, Bangkok–Krabi, Bangkok–Ko Samui via Bangkok Airways). Für kurze Strecken unter 2h Minivan oder Zug nutzen. Fähren für Inseln weiterhin nötig (z.B. Ko Phi Phi, Ko Tao). Effizienz und Komfort priorisieren.';
        }
        return 'Kombiniere Züge (SRT), VIP-Busse, Minivans, Inlandsflüge und Fähren je nach Strecke. Für Distanzen unter 5h empfehle Zug oder Bus, darüber Inlandsflug. Nachtzug Bangkok–Chiang Mai ist ein Erlebnis. Fähren für alle Inseln einplanen. Joint Tickets (Bus+Fähre) für Inselverbindungen empfehlen.';
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

      wikiReferences: `Städte: "Bangkok", "Chiang_Mai", "Phuket_Province", "Krabi", "Chiang_Rai", "Hua_Hin_district", "Kanchanaburi", "Pai,_Thailand", "Mae_Hong_Son", "Lampang", "Lopburi", "Phetchaburi"
  Inseln: "Ko_Samui", "Ko_Pha-ngan", "Ko_Tao", "Ko_Lanta_Yai", "Phi_Phi_Islands", "Ko_Lipe", "Chang_Island"
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
        'jakarta': ['bandung'],
        'bandung': ['jakarta'],
        'yogyakarta': [],
        'bromo': ['ijen'],
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
        { id: 'island-hopper', icon: '✈️🚢', label: 'Insel-Hopping', desc: 'Flüge zwischen Inseln, Boot & Boden vor Ort' },
        { id: 'minimize-flying', icon: '🚫✈️', label: 'Wenig fliegen', desc: 'Fähren & Boden wo möglich' },
        { id: 'no-preference', icon: '🤷', label: 'Egal', desc: 'KI entscheidet den besten Mix' },
        { id: 'comfort', icon: '🛋️', label: 'Komfort', desc: 'Flüge & Privatwagen, wenig Bus' }
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
          return 'Flüge minimieren. Auf Java NUR Züge verwenden (Whoosh HSR Jakarta–Bandung 40 min, Executive-Züge Jakarta–Yogyakarta 6-8h, Surabaya–Probolinggo 2h). Java↔Bali per Zug nach Banyuwangi + Ketapang–Gilimanuk-Fähre (30 min). Bali↔Lombok per Schnellboot (2-3h). Bali↔Nusa Penida per Schnellboot (30-45 min). Lombok↔Gili per Boot. Flüge NUR wenn keine Alternative existiert (z.B. nach Flores/Komodo, Sulawesi, Papua, Raja Ampat). Route möglichst auf einer Inselgruppe halten.';
        } else if (transport === 'island-hopper') {
          return 'Insel-Hopping-Modus: Inlandsflüge zwischen verschiedenen Inseln (Java↔Bali↔Lombok↔Flores↔Sulawesi↔Sumatra↔Papua). Auf Java Züge nutzen (Whoosh HSR, Executive-Klasse). Auf Bali/Lombok Shuttle oder Privatwagen. Schnellboote für kurze Überfahrten (Bali↔Gili, Bali↔Nusa Penida, Bali↔Lombok). PELNI-Fähren NICHT empfehlen (zu langsam).';
        } else if (transport === 'comfort') {
          return 'Komfort priorisieren: Inlandsflüge für alle Inter-Insel-Strecken (Garuda Indonesia oder Batik Air bevorzugen). Auf Java Executive-Züge oder Whoosh HSR. Innerhalb von Bali/Lombok Privatwagen mit Fahrer empfehlen (~40-60€/Tag). Schnellboote (nicht öffentliche Fähren) für kurze Überfahrten. Keine Langstrecken-Busse. Keine PELNI-Fähren.';
        }
        return 'Kombination aus Inlandsflügen, Zügen (auf Java), Bussen, Schnellbooten und Fähren je nach Strecke. Zwischen verschiedenen Inseln empfehle Inlandsflüge. Auf Java nutze Züge (Whoosh Jakarta–Bandung 40 min, Taksaka Jakarta–Yogyakarta 6-8h, Surabaya–Probolinggo 2h für Mt Bromo). Bali↔Lombok per Schnellboot (2-3h) oder Flug (25 min). Ketapang–Gilimanuk-Fähre für Java↔Bali (30 min). Bali↔Nusa Penida per Schnellboot (30 min).';
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

      wikiReferences: `Städte: "Jakarta", "Yogyakarta", "Ubud", "Denpasar", "Makassar", "Medan", "Bandung", "Surabaya", "Labuan_Bajo"
  Inseln: "Bali", "Lombok", "Java", "Sumatra", "Flores", "Sulawesi", "Komodo_(island)", "Nusa_Penida", "Gili_Islands", "Sumba"
  Sehenswürdigkeiten: "Borobudur" (Borobudur-Tempel), "Prambanan" (Prambanan-Tempel), "Tanah_Lot" (Tanah-Lot-Tempel), "Uluwatu_Temple" (Uluwatu-Tempel), "Tegallalang" (Reisterrassen), "Mount_Bromo" (Mount Bromo), "Komodo_National_Park" (Komodo-Nationalpark), "Raja_Ampat_Islands" (Raja Ampat), "Lake_Toba" (Toba-See), "Ubud_Monkey_Forest" (Affenwald Ubud), "Kelimutu" (Kelimutu-Kraterseen), "Ijen" (Ijen-Vulkan), "Tana_Toraja_Regency" (Tana Toraja), "Banda_Islands" (Banda-Inseln), "Baliem_Valley" (Baliem-Tal)`,

      adjustWikiReferences: `"Jakarta", "Yogyakarta", "Ubud", "Bali", "Lombok", "Borobudur", "Prambanan", "Tanah_Lot", "Uluwatu_Temple", "Mount_Bromo", "Komodo_National_Park", "Raja_Ampat_Islands", "Lake_Toba", "Kelimutu", "Ubud_Monkey_Forest"`
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
