/* ============================================
   INDONESIA-DESTINATIONS.JS – Datenbank aller Indonesien-Ziele
   ============================================ */

const INDONESIA_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====

  // --- BALI (4 Ziele) ---
  {
    id: 'ubud',
    name: 'Ubud',
    lat: -8.5069,
    lng: 115.2625,
    tags: ['Kultur', 'Natur'],
    wiki: 'Ubud',
    highlights: 'Tegallalang-Reisterrassen, Affenwald, Kunstgalerien, Tirta-Empul-Tempel',
    family: true,
    desc: 'Balis kulturelles Herz inmitten smaragdgrüner Reisterrassen, wo balinesische Kunst, Yoga und Spiritualität verschmelzen'
  },
  {
    id: 'seminyak',
    name: 'Seminyak / Kuta',
    altName: 'Südbali Küste',
    lat: -8.6913,
    lng: 115.1683,
    tags: ['Erholung', 'Kulinarik', 'Großstadt'],
    wiki: 'Seminyak',
    highlights: 'Strandclubs, Sunset-Bars, Boutique-Shopping, Kuta Beach Surfen',
    family: true,
    desc: 'Balis glamouröse Küstenmeile mit schicken Beachclubs, erstklassigen Restaurants und legendären Sonnenuntergängen am Indischen Ozean'
  },
  {
    id: 'uluwatu',
    name: 'Uluwatu',
    lat: -8.8291,
    lng: 115.0849,
    tags: ['Kultur', 'Abenteuer', 'Natur'],
    wiki: 'Uluwatu,_Bali',
    highlights: 'Uluwatu-Tempel, Kecak-Feuertanz, Padang-Padang-Strand, Weltklasse-Surfen',
    family: true,
    desc: 'Dramatische Klippen am südlichsten Zipfel Balis, wo ein uralter Meerestempel über der Brandung thront und Affen den Sonnenuntergang bewachen'
  },
  {
    id: 'nusa-penida',
    name: 'Nusa Penida',
    lat: -8.7275,
    lng: 115.5444,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Nusa_Penida',
    highlights: 'Kelingking Beach (T-Rex-Klippe), Angel\'s Billabong, Crystal Bay, Manta-Schnorcheln',
    family: false,
    desc: 'Balis wilde Schwesterinsel mit atemberaubenden Steilklippen, türkisfarbenen Naturpools und majestätischen Mantarochen unter Wasser',
    dayTripFrom: [{ base: 'seminyak', transit: '~45min Speedboot ab Sanur' }]
  },

  // --- JAVA (4 Ziele) ---
  {
    id: 'yogyakarta',
    name: 'Yogyakarta',
    altName: 'Jogja',
    lat: -7.7956,
    lng: 110.3695,
    tags: ['Kultur', 'Geschichte', 'Kulinarik'],
    wiki: 'Yogyakarta',
    highlights: 'Borobudur-Tempel (UNESCO), Prambanan-Tempel (UNESCO), Kraton-Sultanspalast, Malioboro-Straße',
    family: true,
    desc: 'Javas Kulturhauptstadt und Tor zu den mächtigsten Tempelanlagen Südostasiens, wo javanische Tradition auf lebendige Straßenkunst trifft'
  },
  {
    id: 'jakarta',
    name: 'Jakarta',
    lat: -6.2088,
    lng: 106.8456,
    tags: ['Großstadt', 'Kulinarik', 'Geschichte'],
    wiki: 'Jakarta',
    highlights: 'Altstadt Kota Tua, Nationalmuseum, Tausend-Inseln-Archipel, Streetfood-Szene',
    family: true,
    desc: 'Indonesiens pulsierende Hauptstadt, ein Schmelztiegel aus kolonialer Vergangenheit, modernen Wolkenkratzern und der vielfältigsten Küche des Archipels'
  },
  {
    id: 'bromo',
    name: 'Mount Bromo',
    altName: 'Bromo-Tengger-Semeru',
    lat: -7.9425,
    lng: 112.9530,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Mount_Bromo',
    highlights: 'Sonnenaufgang am Kraterrand, Sandmeer (Tengger), Jeep-Tour, Hindu-Tempel im Vulkankrater',
    family: false,
    desc: 'Surreale Mondlandschaft mit einem rauchenden Vulkankrater inmitten eines endlosen Sandmeers, wo der Sonnenaufgang zum mystischen Erlebnis wird'
  },
  {
    id: 'bandung',
    name: 'Bandung',
    lat: -6.9175,
    lng: 107.6191,
    tags: ['Natur', 'Kulinarik', 'Kultur'],
    wiki: 'Bandung',
    highlights: 'Kawah-Putih-Kratersee, Teeplantagen, Art-Deco-Architektur, Sundanesische Küche',
    family: true,
    desc: 'Javas kühle Bergstadt umgeben von Teeplantagen und Vulkankratern, berühmt für Art-Deco-Charme und die raffinierte sundanesische Küche',
    dayTripFrom: [{ base: 'jakarta', transit: '~2.5h Zug' }]
  },

  // --- LOMBOK & GILI ISLANDS (2 Ziele) ---
  {
    id: 'lombok',
    name: 'Lombok',
    lat: -8.5833,
    lng: 116.1167,
    tags: ['Natur', 'Abenteuer', 'Erholung'],
    wiki: 'Lombok',
    highlights: 'Mount Rinjani (3.726m), Kuta Lombok Strände, Selong Belanak, Sasak-Dörfer',
    family: true,
    desc: 'Balis ruhigere Nachbarinsel mit dem majestätischen Vulkan Rinjani, unberührten Stränden und der authentischen Kultur der Sasak'
  },
  {
    id: 'gili-islands',
    name: 'Gili-Inseln',
    altName: 'Gili Trawangan / Meno / Air',
    lat: -8.3500,
    lng: 116.0500,
    tags: ['Erholung', 'Abenteuer'],
    wiki: 'Gili_Islands',
    highlights: 'Schnorcheln mit Meeresschildkröten, Autofreie Inseln, Unterwasser-Skulpturen, Sunset-Schaukeln',
    family: true,
    desc: 'Drei autofreie Trauminseln vor Lomboks Küste, wo man mit Schildkröten schnorchelt und das Leben im Rhythmus der Gezeiten vergeht',
    dayTripFrom: [{ base: 'lombok', transit: '~30min Speedboot' }]
  },

  // --- FLORES & KOMODO (2 Ziele) ---
  {
    id: 'labuan-bajo',
    name: 'Labuan Bajo',
    altName: 'Komodo-Nationalpark',
    lat: -8.4964,
    lng: 119.8877,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Labuan_Bajo',
    highlights: 'Komodo-Warane, Padar Island Viewpoint, Pink Beach, Weltklasse-Tauchen',
    family: false,
    desc: 'Tor zum legendären Komodo-Nationalpark, wo urzeitliche Riesenechsen die Inseln beherrschen und unter Wasser ein Paradies für Taucher wartet'
  },
  {
    id: 'flores',
    name: 'Flores',
    altName: 'Kelimutu / Ende',
    lat: -8.7667,
    lng: 121.3833,
    tags: ['Natur', 'Kultur', 'Abenteuer'],
    wiki: 'Flores',
    highlights: 'Kelimutu-Dreifarbenseen, Traditionelle Ngada-Dörfer, Wae-Rebo-Dorf, Trans-Flores-Highway',
    family: false,
    desc: 'Mystische Vulkaninsel mit drei Kraterseen, die ihre Farbe wechseln, und uralten Dörfern, in denen die Zeit stehen geblieben ist'
  },

  // --- RAJA AMPAT (1 Ziel) ---
  {
    id: 'raja-ampat',
    name: 'Raja Ampat',
    lat: -1.0500,
    lng: 130.5167,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Raja_Ampat_Islands',
    highlights: 'Weltbestes Tauchen/Schnorcheln, Pianemo-Viewpoint, Wayag-Inseln, Mantarochen',
    family: false,
    desc: 'Das unangefochtene Kronjuwel der Unterwasserwelt mit der höchsten marinen Biodiversität der Erde, eingebettet in eine surreale Insellandschaft'
  },

  // --- SULAWESI (1 Ziel) ---
  {
    id: 'toraja',
    name: 'Tana Toraja',
    altName: 'Toraja',
    lat: -3.0544,
    lng: 119.8500,
    tags: ['Kultur', 'Geschichte', 'Natur'],
    wiki: 'Tana_Toraja_Regency',
    highlights: 'Tongkonan-Bootshäuser, Felsengräber, Totenzeremonien, Reisterrassen im Hochland',
    family: false,
    desc: 'Eines der faszinierendsten Kulturgebiete der Welt, wo aufwendige Totenrituale und spektakuläre Bootsdach-Häuser von einer uralten Hochlandkultur zeugen'
  },

  // --- SUMATRA (1 Ziel) ---
  {
    id: 'lake-toba',
    name: 'Toba-See',
    altName: 'Danau Toba / Samosir',
    lat: 2.6167,
    lng: 98.8333,
    tags: ['Natur', 'Kultur', 'Erholung'],
    wiki: 'Lake_Toba',
    highlights: 'Größter Vulkansee der Welt, Samosir-Insel, Batak-Kultur, Sipiso-piso-Wasserfall',
    family: true,
    desc: 'Der größte Vulkansee der Erde, entstanden aus einer Supereruption, mit der kulturreichen Insel Samosir in seinem Herzen und der stolzen Tradition der Batak'
  },

  // ===== OFF THE BEATEN PATH (10) =====

  // --- SUMATRA ---
  {
    id: 'bukit-lawang',
    name: 'Bukit Lawang',
    lat: 3.5553,
    lng: 98.1448,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Bukit_Lawang',
    highlights: 'Orang-Utan-Rehabilitationszentrum, Gunung-Leuser-Nationalpark, Dschungeltrekking, Tubing auf dem Bohorok-Fluss',
    family: false,
    offbeat: true,
    desc: 'Am Rand des uralten Regenwalds von Gunung Leuser gelegen, einer der letzten Orte der Welt, an dem man Sumatra-Orang-Utans in freier Wildbahn beobachten kann'
  },
  {
    id: 'bukittinggi',
    name: 'Bukittinggi',
    altName: 'Fort de Kock',
    lat: -0.3056,
    lng: 100.3692,
    tags: ['Kultur', 'Geschichte', 'Kulinarik'],
    wiki: 'Bukittinggi',
    highlights: 'Jam-Gadang-Uhrenturm, Sianok-Schlucht, Minangkabau-Kultur, Japanischer Tunnel aus dem Zweiten Weltkrieg',
    family: true,
    offbeat: true,
    desc: 'Hochgelegen im Herzen des Minangkabau-Hochlands, wo koloniale Geschichte und matriarchale Tradition auf eine der reichsten Küchen Indonesiens treffen'
  },

  // --- JAVA ---
  {
    id: 'ijen',
    name: 'Ijen',
    altName: 'Kawah Ijen',
    lat: -8.058,
    lng: 114.242,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Ijen',
    highlights: 'Blaues-Feuer-Phänomen, Türkisfarbener Kratersee, Schwefelabbau, UNESCO-Geopark',
    family: false,
    offbeat: true,
    desc: 'Im Dunkel vor der Morgendämmerung tanzen elektrisch-blaue Flammen über dem größten Säuresee der Erde – ein Vulkan, der die Grenzen zwischen Schönheit und Gefahr auflöst'
  },
  {
    id: 'karimunjawa',
    name: 'Karimunjawa',
    altName: 'Karimun Jawa',
    lat: -5.8192,
    lng: 110.459,
    tags: ['Natur', 'Erholung', 'Abenteuer'],
    wiki: 'Karimunjawa',
    highlights: 'Meeresnationalpark, Korallenriffe mit 90+ Arten, Schildkröten-Nistplätze, Unberührte Strände',
    family: true,
    offbeat: true,
    desc: 'Ein stilles Archipel aus 27 Inseln mitten in der Javasee, wo türkises Wasser über unberührte Korallengärten fließt und die Zeit im Rhythmus der Gezeiten vergeht'
  },

  // --- KALIMANTAN / BORNEO ---
  {
    id: 'tanjung-puting',
    name: 'Tanjung Puting',
    lat: -2.9353,
    lng: 112.0402,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Tanjung_Puting',
    highlights: 'Camp Leakey Orang-Utans, Klotok-Bootsfahrt, Nasenaffen, Tropischer Tieflandregenwald',
    family: true,
    offbeat: true,
    desc: 'Auf einem hölzernen Klotok-Boot gleitet man durch schwarzes Flusswasser tief in den Regenwald Borneos, wo die letzten wilden Orang-Utans zwischen den Baumkronen schwingen'
  },

  // --- SULAWESI ---
  {
    id: 'togean-islands',
    name: 'Togean-Inseln',
    altName: 'Togian Islands',
    lat: -0.3333,
    lng: 122.0,
    tags: ['Natur', 'Erholung', 'Abenteuer'],
    wiki: 'Togian_Islands',
    highlights: 'Quallensee, Barriereriff & Atoll & Saumriff, Bajo-Stelzendörfer, Unberührte Tauchplätze',
    family: false,
    offbeat: true,
    desc: 'Versteckt im Golf von Tomini liegt eines der letzten unentdeckten Tauchparadiese Indonesiens – 56 Inseln, auf denen drei Rifftypen aufeinandertreffen und Seenomaden in Stelzenhütten leben'
  },

  // --- NUSA TENGGARA ---
  {
    id: 'sumba',
    name: 'Sumba',
    lat: -9.6667,
    lng: 120.0,
    tags: ['Kultur', 'Natur', 'Abenteuer'],
    wiki: 'Sumba',
    highlights: 'Megalithgräber, Pasola-Reiterfest, Ikat-Webkunst, Nihiwatu-Strand',
    family: false,
    offbeat: true,
    desc: 'Auf Sumba scheint die Zeit stehen geblieben zu sein – hier werden noch heute megalithische Gräber errichtet und Reiterkrieger messen sich beim Pasola-Festival'
  },
  {
    id: 'wae-rebo',
    name: 'Wae Rebo',
    lat: -8.7697,
    lng: 120.2842,
    tags: ['Kultur', 'Abenteuer', 'Natur'],
    wiki: 'Waerebo',
    highlights: 'UNESCO-Kulturerbe, 7 traditionelle Mbaru-Niang-Kegelhäuser, Dschungeltrekking, Übernachtung im Dorf',
    family: false,
    offbeat: true,
    desc: 'Hoch in den Bergen von Flores versteckt sich ein Dorf aus sieben kegelförmigen Häusern, das nur per mehrstündigem Dschungeltrek erreichbar ist und Reisende mit einer Nacht bei den Manggarai belohnt'
  },

  // --- MALUKU ---
  {
    id: 'banda-islands',
    name: 'Banda-Inseln',
    altName: 'Gewürzinseln',
    lat: -4.5833,
    lng: 129.9167,
    tags: ['Geschichte', 'Natur', 'Kulinarik'],
    wiki: 'Banda_Islands',
    highlights: 'Historische Muskatnuss-Plantagen, Fort Belgica, Vulkan Gunung Api, Koloniale Architektur',
    family: true,
    offbeat: true,
    desc: 'Die einst begehrtesten Inseln der Welt – um diese winzigen Vulkaninseln führten Europas Mächte Krieg, und noch heute duftet die Luft nach Muskatnuss zwischen verfallenden Kolonialfestungen'
  },

  // --- PAPUA ---
  {
    id: 'baliem-valley',
    name: 'Baliem-Tal',
    altName: 'Lembah Baliem',
    lat: -4.0218,
    lng: 138.896,
    tags: ['Kultur', 'Abenteuer', 'Natur'],
    wiki: 'Baliem_Valley',
    highlights: 'Dani-Stammeskultur, Baliem-Festival, Trekking durch Hochland, Traditionelle Dörfer',
    family: false,
    offbeat: true,
    desc: 'Erst 1938 aus der Luft entdeckt, ist das Baliem-Tal Papuas verborgene Welt – ein weites Hochland auf 1.600 Metern, in dem die Dani seit Jahrtausenden ihre Gärten bestellen und uralte Traditionen am Leben halten'
  }
];
