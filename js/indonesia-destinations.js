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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Reisterrassen-Pfade steil und uneben, Affenwald unberechenbar für Babys' },
      '1-3':  { rating: 'yellow', note: 'Hitze und Stufen bei Tempeln anstrengend, kaum buggyfreundliche Wege' },
      '3-6':  { rating: 'green', note: 'Reisterrassen begehbar, Affenwald spannend mit Aufsicht, Kunstkurse möglich' },
      '6-12': { rating: 'green', note: 'Kulturprogramm ideal, Reisterrassen-Trekking und Kochkurse begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Perfekt für Kultur und Natur, Radtouren durch Reisfelder, Yoga-Angebote' }
    },
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
    familyRating: {
      '0-1':  { rating: 'green', note: 'Gute Infrastruktur, viele familienfreundliche Hotels und Restaurants' },
      '1-3':  { rating: 'green', note: 'Flache Strände in Sanur nahe, kinderfreundliche Resorts mit Pools' },
      '3-6':  { rating: 'green', note: 'Strandspiele, Kinderpools, kurze Wege zu Restaurants und Geschäften' },
      '6-12': { rating: 'green', note: 'Surfkurse für Anfänger, Wasserparks in der Nähe, lebhafte Atmosphäre' },
      '12+':  { rating: 'green', note: 'Surfschulen, Shopping, Streetfood-Szene – idealer Start für Bali-Erkundung' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Steile Klippenwege und ungesicherte Abgründe, nicht buggytauglich' },
      '1-3':  { rating: 'yellow', note: 'Tempel-Treppen und Hitze am Klippenrand anstrengend für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Kecak-Tanz spannend, aber Klippenwege erfordern ständige Aufsicht' },
      '6-12': { rating: 'green', note: 'Spektakuläre Klippen und Surfstrände faszinieren, Feuertanz unvergesslich' },
      '12+':  { rating: 'green', note: 'Surfen lernen, Klippenwanderungen und atemberaubende Sonnenuntergänge' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Gefährliche Klippen, raue Speedboot-Fahrt, keine medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Steile Abstiege zu Stränden, holprige Straßen, kein Kinderschutz an Klippen' },
      '3-6':  { rating: 'yellow', note: 'Nur als Tagesausflug mit Boot, Klippen erfordern ständige Aufsicht' },
      '6-12': { rating: 'yellow', note: 'Tagesausflug möglich, Schnorcheln mit Mantas beeindruckend, Wege steil' },
      '12+':  { rating: 'green', note: 'Abenteuerlich und lohnend, Schnorcheln und Klippenwanderungen machbar' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Borobudur-Treppen und Hitze belastend, aber Stadtbereich gut erschlossen' },
      '1-3':  { rating: 'yellow', note: 'Tempelanlagen mit vielen Stufen bei Hitze schwierig, Trage empfohlen' },
      '3-6':  { rating: 'green', note: 'Tempel zum Entdecken, Batik-Malen und Becak-Fahrten begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Borobudur und Prambanan faszinieren, Gamelan-Workshops und Streetfood' },
      '12+':  { rating: 'green', note: 'Kulturell bereichernd, Tempelanlagen beeindruckend, Streetart-Szene lebendig' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Luftverschmutzung und extremer Verkehr belasten, gute Kliniken vorhanden' },
      '1-3':  { rating: 'yellow', note: 'Verkehrschaos stressig, aber Malls mit Spielbereichen und Themenparks' },
      '3-6':  { rating: 'green', note: 'Ancol Dreamland Freizeitpark, Aquarium und Malls bieten Kinderunterhaltung' },
      '6-12': { rating: 'green', note: 'Taman Mini Indonesia, Ragunan Zoo und Wasserparks sind Highlights' },
      '12+':  { rating: 'green', note: 'Streetfood-Touren, Kota Tua Geschichte, moderne Malls und Escape Rooms' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Vulkangase, Kälte vor Sonnenaufgang und steile Pfade absolut ungeeignet' },
      '1-3':  { rating: 'red', note: 'Kraterrand gefährlich, Nacht-Aufstieg bei Kälte nicht machbar mit Kleinkind' },
      '3-6':  { rating: 'yellow', note: 'Jeep-Tour im Sandmeer möglich, Kraterrand nur mit großer Vorsicht' },
      '6-12': { rating: 'yellow', note: 'Jeep-Abenteuer spannend, Aufstieg zum Krater mit fitten Kindern machbar' },
      '12+':  { rating: 'green', note: 'Unvergesslicher Sonnenaufgang, Vulkantrekking und Jeep-Tour ideal für Teens' }
    },
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
    familyRating: {
      '0-1':  { rating: 'green', note: 'Angenehmes Klima in Höhenlage, gute Infrastruktur und Kliniken' },
      '1-3':  { rating: 'green', note: 'Kühleres Wetter ideal, Teeplantagen-Spaziergänge und Parks kinderfreundlich' },
      '3-6':  { rating: 'green', note: 'Kratersee Kawah Putih beeindruckend, Farmhouse Lembang mit Spielplätzen' },
      '6-12': { rating: 'green', note: 'Lembang-Freizeitparks, Vulkankrater und Floating Market machen Spaß' },
      '12+':  { rating: 'green', note: 'Art-Deco-Erkundung, Streetfood-Touren und Teeplantagenwanderungen lohnen sich' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Infrastruktur weniger ausgebaut als Bali, Kliniken nur in Mataram' },
      '1-3':  { rating: 'yellow', note: 'Holprige Straßen, wenige Kinderärzte, aber ruhige Strände geeignet' },
      '3-6':  { rating: 'green', note: 'Ruhige Strände wie Selong Belanak ideal, weniger Trubel als auf Bali' },
      '6-12': { rating: 'green', note: 'Surfstrände, Sasak-Dörfer erkunden und Schnorcheln begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Rinjani-Trekking, Surfkurse und authentische Kultur perfekt für Teens' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kein Krankenhaus auf den Inseln, nur Pferdekutschen als Transport' },
      '1-3':  { rating: 'yellow', note: 'Keine Fahrzeuge, aber auch keine Notfallmedizin – nur für kurze Aufenthalte' },
      '3-6':  { rating: 'green', note: 'Autofreie Inseln sicher, flache Strände und Schildkröten-Schnorcheln toll' },
      '6-12': { rating: 'green', note: 'Schnorcheln mit Schildkröten, Fahrrad fahren und Insel-Hopping begeistern' },
      '12+':  { rating: 'green', note: 'Tauchen lernen, Unterwasser-Skulpturen und entspanntes Inselleben ideal' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Komodo-Warane gefährlich, abgelegene Bootstouren, keine Kinderinfrastruktur' },
      '1-3':  { rating: 'red', note: 'Waranlauf-Gefahr, lange Bootsfahrten in Hitze, kein Krankenhaus vor Ort' },
      '3-6':  { rating: 'yellow', note: 'Bootstour möglich, aber Waranbesuche erst ab 6 empfohlen, Hitze belastend' },
      '6-12': { rating: 'yellow', note: 'Komodo-Warane faszinierend, Ranger-Pflicht schützt, Schnorcheln am Pink Beach' },
      '12+':  { rating: 'green', note: 'Unvergessliches Abenteuer mit Waranen, Tauchen und Padar-Viewpoint' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Sehr abgelegen, schlechte Straßen, keine medizinische Versorgung unterwegs' },
      '1-3':  { rating: 'red', note: 'Trans-Flores-Highway holprig und lang, Infrastruktur sehr einfach' },
      '3-6':  { rating: 'yellow', note: 'Kelimutu machbar per Auto, aber lange Fahrten und einfache Unterkünfte' },
      '6-12': { rating: 'yellow', note: 'Farbwechselnde Seen beeindruckend, traditionelle Dörfer lehrreich, Wege teils steil' },
      '12+':  { rating: 'green', note: 'Abenteuerliche Überlandfahrt, Kelimutu-Sonnenaufgang und Kulturerlebnisse lohnen' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem abgelegen, nur per Boot erreichbar, keinerlei medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Mehrstündige Bootsfahrten, einfachste Unterkünfte, kein Arzt vor Ort' },
      '3-6':  { rating: 'red', note: 'Zu abgelegen und einfach für kleine Kinder, lange Bootstransfers' },
      '6-12': { rating: 'yellow', note: 'Schnorchel-Paradies für wasseraffine Kinder, aber sehr abgelegen und einfach' },
      '12+':  { rating: 'yellow', note: 'Weltklasse-Schnorcheln, aber Abgeschiedenheit und einfache Verhältnisse einplanen' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegen, lange Anfahrt, Totenzeremonien nicht babygeeignet' },
      '1-3':  { rating: 'red', note: 'Mehrstündige Bergfahrt, einfache Infrastruktur, Rituale teils verstörend' },
      '3-6':  { rating: 'yellow', note: 'Tongkonan-Häuser beeindruckend, aber Totenrituale können Kinder erschrecken' },
      '6-12': { rating: 'yellow', note: 'Kulturell faszinierend, Bootshäuser und Reisfelder, Zeremonien vorher erklären' },
      '12+':  { rating: 'green', note: 'Einzigartiges Kulturerlebnis, Felsengräber und Zeremonien unvergesslich' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegene Lage, lange Anfahrt ab Medan, einfache medizinische Versorgung' },
      '1-3':  { rating: 'yellow', note: 'Ruhige Atmosphäre gut, aber Infrastruktur einfach und Anreise lang' },
      '3-6':  { rating: 'green', note: 'Samosir-Insel zum Erkunden, ruhiger See zum Schwimmen, Batak-Kultur spannend' },
      '6-12': { rating: 'green', note: 'Fahrrad fahren auf Samosir, Wasserfall-Wanderungen und Bootsfahrten toll' },
      '12+':  { rating: 'green', note: 'Batak-Kultur faszinierend, Vulkangeschichte lehrreich, Kajak und Radfahren' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Dschungeltrekking unmöglich mit Baby, keine medizinische Versorgung im Wald' },
      '1-3':  { rating: 'red', note: 'Steile Dschungelpfade und Flussdurchquerungen mit Kleinkind nicht machbar' },
      '3-6':  { rating: 'yellow', note: 'Kurze Dschungeltouren möglich, Orang-Utans am Fütterungsplatz sichtbar' },
      '6-12': { rating: 'green', note: 'Orang-Utans in freier Wildbahn sehen ist unvergesslich, Tubing auf dem Fluss' },
      '12+':  { rating: 'green', note: 'Mehrtages-Trekking im Regenwald, Orang-Utan-Begegnungen und Rafting' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kühles Klima angenehm, aber abgelegene Lage und einfache Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Sianok-Schlucht-Wege steil, Stadtbereich aber ruhig und überschaubar' },
      '3-6':  { rating: 'green', note: 'Uhrenturm und Tunnel spannend, Sianok-Schlucht beeindruckend, kühles Klima' },
      '6-12': { rating: 'green', note: 'Japanischer Tunnel abenteuerlich, Minangkabau-Kultur und Padang-Essen toll' },
      '12+':  { rating: 'green', note: 'Geschichte des Zweiten Weltkriegs, matriarchale Kultur und Schluchtwanderungen' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Giftige Schwefeldämpfe, Nachtaufstieg bei Kälte – absolut ungeeignet' },
      '1-3':  { rating: 'red', note: 'Gefährliche Gase am Krater, steiler Aufstieg in der Dunkelheit' },
      '3-6':  { rating: 'red', note: 'Schwefeldämpfe gesundheitsschädlich, Wege rutschig und ungesichert' },
      '6-12': { rating: 'yellow', note: 'Nur Kraterrand bei Tag und mit Maske, Blaues Feuer erfordert Nachtaufstieg' },
      '12+':  { rating: 'yellow', note: 'Blaues Feuer beeindruckend, aber Gasmaske nötig und anstrengende Nachttour' }
    },
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
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bootsanfahrt nötig, einfache Unterkünfte, kein Krankenhaus auf den Inseln' },
      '1-3':  { rating: 'yellow', note: 'Ruhige Strände gut, aber abgelegen und medizinische Versorgung eingeschränkt' },
      '3-6':  { rating: 'green', note: 'Flache Strände, Schildkröten beobachten und ruhiges Inselglück perfekt' },
      '6-12': { rating: 'green', note: 'Schnorcheln über Korallenriffen, Glasbodenboot und Strandspaß ideal' },
      '12+':  { rating: 'green', note: 'Tauchen lernen, Insel-Hopping und unberührte Natur abseits des Massentourismus' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Mehrtägige Bootstour im Dschungel, keine Infrastruktur, Mücken und Hitze' },
      '1-3':  { rating: 'yellow', note: 'Bootsleben eingeschränkt, aber Orang-Utans am Fütterungsplatz sichtbar' },
      '3-6':  { rating: 'green', note: 'Klotok-Bootstour abenteuerlich, Orang-Utans und Nasenaffen begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Unvergessliche Dschungeltour per Boot, Wildtier-Beobachtung am Flussufer' },
      '12+':  { rating: 'green', note: 'Mehrtägige Klotok-Tour ideal, Orang-Utans hautnah und Dschungel-Abenteuer' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem abgelegen, lange Bootsanreise, keinerlei Infrastruktur für Babys' },
      '1-3':  { rating: 'red', note: 'Nur einfachste Unterkünfte, keine medizinische Versorgung, lange Transfers' },
      '3-6':  { rating: 'yellow', note: 'Quallensee-Erlebnis einmalig, aber Abgeschiedenheit und einfachste Bedingungen' },
      '6-12': { rating: 'yellow', note: 'Schnorcheln und Bajo-Dörfer faszinierend, einfache Verhältnisse einplanen' },
      '12+':  { rating: 'green', note: 'Tauchabenteuer abseits der Massen, Quallensee und Stelzendörfer einzigartig' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Sehr abgelegen, kaum Infrastruktur, schlechte Straßen und kein Krankenhaus' },
      '1-3':  { rating: 'red', note: 'Holprige Straßen, keine Kinderärzte, einfachste Versorgungslage' },
      '3-6':  { rating: 'yellow', note: 'Megalith-Gräber und Pferde interessant, aber Infrastruktur sehr einfach' },
      '6-12': { rating: 'yellow', note: 'Pasola-Festival und Webkunst faszinierend, Strände schön, Anreise beschwerlich' },
      '12+':  { rating: 'green', note: 'Authentische Stammeskultur, Reiten und unberührte Strände perfekt für Teens' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Nur per Dschungeltrek erreichbar, keine Infrastruktur, nichts für Babys' },
      '1-3':  { rating: 'red', note: 'Mehrstündiger steiler Aufstieg, Übernachtung auf dem Boden im Dorf' },
      '3-6':  { rating: 'red', note: 'Trek zu lang und steil für kleine Kinder, Übernachtung sehr einfach' },
      '6-12': { rating: 'yellow', note: 'Mit fitten Kindern machbar, Kegelhäuser und Dorfübernachtung abenteuerlich' },
      '12+':  { rating: 'green', note: 'Unvergesslicher Dschungeltrek, UNESCO-Dorf und Übernachtung bei den Manggarai' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Sehr abgelegen, lange Bootsanreise, keine medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Abgeschieden, einfachste Unterkünfte, kein Kinderarzt erreichbar' },
      '3-6':  { rating: 'yellow', note: 'Festung und Vulkaninsel spannend, aber sehr abgelegen und einfach' },
      '6-12': { rating: 'yellow', note: 'Kolonialgeschichte und Gewürzplantagen lehrreich, Schnorcheln am Riff' },
      '12+':  { rating: 'green', note: 'Faszinierende Gewürzhandel-Geschichte, Fort Belgica und Vulkanbesteigung' }
    },
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
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem abgelegen in Papua, nur per Flug, keinerlei Babyinfrastruktur' },
      '1-3':  { rating: 'red', note: 'Hochland-Trekking unmöglich mit Kleinkind, einfachste Bedingungen' },
      '3-6':  { rating: 'red', note: 'Zu abgelegen und anstrengend für kleine Kinder, keine Kindereinrichtungen' },
      '6-12': { rating: 'yellow', note: 'Dani-Kultur faszinierend, aber nur für abenteuerlustige und fitte Familien' },
      '12+':  { rating: 'yellow', note: 'Einmaliges Kulturerlebnis, Hochland-Trekking und Baliem-Festival beeindruckend' }
    },
    offbeat: true,
    desc: 'Erst 1938 aus der Luft entdeckt, ist das Baliem-Tal Papuas verborgene Welt – ein weites Hochland auf 1.600 Metern, in dem die Dani seit Jahrtausenden ihre Gärten bestellen und uralte Traditionen am Leben halten'
  }
];
