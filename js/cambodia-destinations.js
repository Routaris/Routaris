/* ============================================
   CAMBODIA-DESTINATIONS.JS – Datenbank aller Kambodscha-Ziele
   ============================================ */

const CAMBODIA_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'phnom-penh',
    name: 'Phnom Penh',
    lat: 11.5564,
    lng: 104.9282,
    tags: ['Großstadt', 'Geschichte', 'Kultur'],
    wiki: 'Phnom_Penh',
    highlights: 'Königspalast, Silberpagode, Tuol Sleng, Russischer Markt',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Hitze, Verkehr und Abgase belasten Babys – gute Krankenhäuser vorhanden' },
      '1-3':  { rating: 'yellow', note: 'Chaotischer Verkehr, wenig Gehwege – Tragen/Buggy schwierig' },
      '3-6':  { rating: 'green', note: 'Königspalast, Flussfahrten und Märkte begeistern kleine Kinder' },
      '6-12': { rating: 'green', note: 'Museen, Flusspromenade und lebhafte Märkte ideal zum Entdecken' },
      '12+':  { rating: 'green', note: 'Geschichte (Tuol Sleng), Street Food und Stadtleben faszinieren Teenager' }
    },
    desc: 'Kambodschas lebendige Hauptstadt am Zusammenfluss von Mekong und Tonle Sap'
  },
  {
    id: 'siem-reap',
    name: 'Siem Reap',
    lat: 13.3633,
    lng: 103.8564,
    tags: ['Kultur', 'Geschichte'],
    wiki: 'Siem_Reap',
    highlights: 'Angkor Wat, Angkor Thom, Ta Prohm, Pub Street',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Extreme Hitze in den Tempelanlagen, wenig Schatten – anstrengend für Babys' },
      '1-3':  { rating: 'yellow', note: 'Große Distanzen zwischen Tempeln, steile Treppen – Buggy kaum nutzbar' },
      '3-6':  { rating: 'yellow', note: 'Hitze und lange Wege fordern kleine Kinder, aber Tempel beeindrucken' },
      '6-12': { rating: 'green', note: 'Angkor Wat wird zum Abenteuer – Klettern, Entdecken, Staunen' },
      '12+':  { rating: 'green', note: 'Weltgeschichte zum Anfassen – spektakuläre Tempelanlagen begeistern' }
    },
    desc: 'Tor zu den legendären Tempeln von Angkor – Kambodschas kulturelles Herz'
  },
  {
    id: 'battambang',
    name: 'Battambang',
    lat: 13.1023,
    lng: 103.1986,
    tags: ['Kultur', 'Geschichte', 'Kulinarik'],
    wiki: 'Battambang',
    highlights: 'Bamboo Train, Kolonialarchitektur, Phare Circus, Bat Caves',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen, lange Anfahrt auf holprigen Straßen – medizinisch eingeschränkt' },
      '1-3':  { rating: 'yellow', note: 'Begrenzte Infrastruktur, aber ruhig und überschaubar für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Bamboo Train, Phare Circus und Fledermaus-Höhlen begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Streetart, Zirkus und Kolonialarchitektur – charmant und spannend' },
      '12+':  { rating: 'green', note: 'Authentisches Kambodscha mit Kunstszene, Küche und Circus' }
    },
    desc: 'Kolonialcharme, Streetart und Kambodschas beste Küche am Sangker-Fluss'
  },
  {
    id: 'kampot',
    name: 'Kampot',
    lat: 10.5940,
    lng: 104.1640,
    tags: ['Erholung', 'Kulinarik', 'Natur'],
    wiki: 'Kampot',
    highlights: 'Pfefferplantagen, Bokor Hill Station, Flussfahrten, Salzfelder',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhig, entspannt, wenig Verkehr – ideal zum Ankommen mit Baby' },
      '1-3':  { rating: 'green', note: 'Pfefferplantagen, Flussfahrten und gemütliches Tempo perfekt für Kleine' },
      '3-6':  { rating: 'green', note: 'Flussfahrten, Salzfelder und Pfefferfarm – spielerisch entdecken' },
      '6-12': { rating: 'green', note: 'Bokor Hill, Kajak und Pfefferplantagen bieten Abwechslung' },
      '12+':  { rating: 'green', note: 'Französisches Flair, Natur und Kayaking am Fluss' }
    },
    desc: 'Verschlafene Flussstadt berühmt für Kampot-Pfeffer und französisches Flair'
  },
  {
    id: 'kep',
    name: 'Kep',
    lat: 10.4838,
    lng: 104.3178,
    tags: ['Erholung', 'Kulinarik'],
    wiki: 'Kep,_Cambodia',
    highlights: 'Krabbenmarkt, Kep Beach, Rabbit Island, Nationalpark',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhiger Küstenort mit flachem Strand – entspannt für Babys' },
      '1-3':  { rating: 'green', note: 'Flacher Strand, Krabbenmarkt und Rabbit Island für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Strand, Bootsausflüge und frischer Fisch – unkompliziert mit Kindern' },
      '6-12': { rating: 'green', note: 'Schnorcheln, Nationalpark und Krabbenmarkt ideal für Entdecker' },
      '12+':  { rating: 'green', note: 'Küstencharme, Natur und kulinarische Erlebnisse am Meer' }
    },
    dayTripFrom: [{ base: 'kampot', transit: '~30min Tuk-Tuk/Minivan' }],
    desc: 'Kambodschas charmantester Badeort – berühmt für fangfrische Pfefferkrabben'
  },
  {
    id: 'sihanoukville',
    name: 'Sihanoukville',
    lat: 10.6093,
    lng: 103.5228,
    tags: ['Erholung', 'Großstadt'],
    wiki: 'Sihanoukville',
    highlights: 'Otres Beach, Fähren zu den Inseln, Ream Nationalpark',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Massive Baustellen, chinesische Casino-Zone – für Babys ungeeignet' },
      '1-3':  { rating: 'red', note: 'Stadt im Umbruch, wenig Infrastruktur – nicht empfehlenswert für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Nur als Durchgangsstation zu Inseln, Stadt selbst wenig kinderfreundlich' },
      '6-12': { rating: 'yellow', note: 'Hauptsächlich Transitort – Otres Beach und Ream Nationalpark gehen' },
      '12+':  { rating: 'yellow', note: 'Nur als Sprungbrett zu den Inseln sinnvoll, Stadt wenig attraktiv' }
    },
    desc: 'Küstenstadt und Sprungbrett zu Kambodschas paradiesischen Inseln'
  },
  {
    id: 'koh-rong',
    name: 'Koh Rong',
    lat: 10.6975,
    lng: 103.2353,
    tags: ['Erholung', 'Abenteuer', 'Natur'],
    wiki: 'Koh_Rong',
    highlights: 'Long Beach, Biolumineszenz-Plankton, Schnorcheln, Dschungel-Trekking',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Keine medizinische Versorgung, raue Bootsüberfahrt – für Babys tabu' },
      '1-3':  { rating: 'red', note: 'Eingeschränkte Infrastruktur, kein Arzt auf der Insel – zu riskant' },
      '3-6':  { rating: 'yellow', note: 'Traumstrände, aber medizinisch abgelegen – nur für erfahrene Reisefamilien' },
      '6-12': { rating: 'yellow', note: 'Schnorcheln und Strand toll, aber Basisversorgung eingeschränkt' },
      '12+':  { rating: 'green', note: 'Dschungel-Trekking, Biolumineszenz und Inselabenteuer begeistern' }
    },
    desc: 'Tropische Insel mit weißen Stränden und leuchtendem Plankton bei Nacht'
  },
  {
    id: 'koh-rong-samloem',
    name: 'Koh Rong Samloem',
    altName: 'Koh Rong Sanloem',
    lat: 10.6100,
    lng: 103.2450,
    tags: ['Erholung', 'Natur'],
    wiki: 'Koh_Rong_Sanloem',
    highlights: 'Saracen Bay, Lazy Beach, Schnorcheln, Sunset Beach',
    family: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Bootsüberfahrt und fehlende Medizin – für Babys nicht geeignet' },
      '1-3':  { rating: 'yellow', note: 'Ruhiger als Koh Rong, aber immer noch abgelegen und medizinisch dünn' },
      '3-6':  { rating: 'yellow', note: 'Flache Buchten perfekt, aber Infrastruktur sehr begrenzt' },
      '6-12': { rating: 'green', note: 'Ruhige Strände, Schnorcheln und Natur – Inselparadies für Kinder' },
      '12+':  { rating: 'green', note: 'Entspannte Inselatmosphäre mit Schnorcheln und Strandleben' }
    },
    desc: 'Die ruhigere Schwesterinsel – türkises Wasser und unberührte Strände'
  },
  {
    id: 'kratie',
    name: 'Kratié',
    altName: 'Kratie',
    lat: 12.4880,
    lng: 106.0189,
    tags: ['Natur', 'Kultur'],
    wiki: 'Kratié_Province',
    highlights: 'Irrawaddy-Delfine, Mekong-Uferpromenade, Phnom Sambok',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen, lange Busfahrt auf holprigen Straßen – anstrengend für Babys' },
      '1-3':  { rating: 'yellow', note: 'Wenig Infrastruktur, aber Delfin-Bootsfahrten für Kleinkinder spannend' },
      '3-6':  { rating: 'green', note: 'Irrawaddy-Delfine vom Boot aus beobachten – magisch für Kinder' },
      '6-12': { rating: 'green', note: 'Delfine, Mekong-Ufer und Fahrradtouren auf Koh Trong' },
      '12+':  { rating: 'green', note: 'Entschleunigtes Mekong-Leben und einzigartige Delfinbeobachtung' }
    },
    desc: 'Verschlafene Mekong-Stadt – Heimat der seltenen Irrawaddy-Flussdelfine'
  },
  {
    id: 'mondulkiri',
    name: 'Mondulkiri',
    altName: 'Sen Monorom',
    lat: 12.4560,
    lng: 107.1875,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Mondulkiri_Province',
    highlights: 'Elephant Valley Project, Bou Sra Wasserfall, Bunong-Dörfer',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem abgelegen, schlechte Straßen, keine Medizin – für Babys tabu' },
      '1-3':  { rating: 'red', note: 'Schwer erreichbar, holprige Pisten – für Kleinkinder nicht geeignet' },
      '3-6':  { rating: 'yellow', note: 'Elefanten faszinieren, aber Anreise und Infrastruktur herausfordernd' },
      '6-12': { rating: 'yellow', note: 'Elefanten-Sanctuary und Wasserfälle toll, aber anstrengende Anreise' },
      '12+':  { rating: 'green', note: 'Elefanten, Trekking und Bunong-Kultur – echtes Abenteuer' }
    },
    desc: 'Kambodschas wildes Hochland – Elefanten, Wasserfälle und indigene Bunong-Kultur'
  },
  {
    id: 'kampong-cham',
    name: 'Kampong Cham',
    lat: 11.9939,
    lng: 105.4553,
    tags: ['Kultur', 'Geschichte'],
    wiki: 'Kampong_Cham_(city)',
    highlights: 'Bambusbrücke, Phnom Pros & Phnom Srei, Wat Nokor',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Ruhige Kleinstadt, aber medizinische Versorgung eingeschränkt' },
      '1-3':  { rating: 'green', note: 'Überschaubarer Ort, Bambusbrücke und Fluss – entspannt mit Kleinkindern' },
      '3-6':  { rating: 'green', note: 'Bambusbrücke und Tempel laden zum Erkunden ein – familienfreundlich' },
      '6-12': { rating: 'green', note: 'Saisonale Bambusbrücke ist einzigartig – spannend für Kinder' },
      '12+':  { rating: 'green', note: 'Authentische Mekong-Stadt mit interessanter Geschichte und Tempeln' }
    },
    desc: 'Malerische Mekong-Stadt mit saisonaler Bambusbrücke und uralten Tempeln'
  },
  {
    id: 'tonle-sap',
    name: 'Tonle Sap',
    altName: 'Schwimmende Dörfer',
    lat: 13.00,
    lng: 104.10,
    tags: ['Natur', 'Kultur'],
    wiki: 'Tonlé_Sap',
    highlights: 'Kompong Khleang, Chong Khneas, Schwimmende Märkte, Vogelreservat',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bootstouren auf offenem Wasser – Sonnenschutz und Vorsicht nötig' },
      '1-3':  { rating: 'yellow', note: 'Schwimmende Dörfer spannend, aber Bootssicherheit beachten' },
      '3-6':  { rating: 'green', note: 'Schwimmende Häuser und Schulen faszinieren Kinder – unvergesslich' },
      '6-12': { rating: 'green', note: 'Einzigartige schwimmende Dörfer – Geografie und Kultur hautnah' },
      '12+':  { rating: 'green', note: 'Beeindruckendes Ökosystem und schwimmendes Dorfleben zum Staunen' }
    },
    dayTripFrom: [{ base: 'siem-reap', transit: '~1h Tuk-Tuk/Bus' }],
    desc: 'Südostasiens größter Süßwassersee mit faszinierenden schwimmenden Dörfern'
  },
  {
    id: 'preah-vihear',
    name: 'Preah Vihear',
    lat: 14.3921,
    lng: 104.6793,
    tags: ['Geschichte', 'Kultur', 'Abenteuer'],
    wiki: 'Preah_Vihear_Temple',
    highlights: 'UNESCO-Klippen-Tempel, Panorama-Ausblick, Koh Ker Tempelgruppe',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem abgelegen, steiler Aufstieg, keine Infrastruktur – ungeeignet' },
      '1-3':  { rating: 'red', note: 'Schwer erreichbar, steile Klippe – für Kleinkinder nicht machbar' },
      '3-6':  { rating: 'red', note: 'Gefährlicher Aufstieg, lange Anfahrt – für kleine Kinder zu anstrengend' },
      '6-12': { rating: 'yellow', note: 'Steiler Aufstieg und Abgeschiedenheit, aber spektakuläre Aussicht' },
      '12+':  { rating: 'green', note: 'Abenteuerlicher UNESCO-Tempel auf der Klippe – beeindruckend für Teens' }
    },
    desc: 'Spektakulärer UNESCO-Tempel auf einer 525m hohen Klippe an der Thai-Grenze'
  },
  {
    id: 'cardamom',
    name: 'Kardamomgebirge',
    altName: 'Cardamom Mountains',
    lat: 11.50,
    lng: 103.10,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Cardamom_Mountains',
    highlights: 'Community-Trekking, Wildtierbeobachtung, Flussfahrten, Chi Phat',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Dschungel, keine Medizin, schwierige Wege – für Babys absolut ungeeignet' },
      '1-3':  { rating: 'red', note: 'Kein Mobilfunk, keine Straßen – für Kleinkinder zu abgelegen' },
      '3-6':  { rating: 'red', note: 'Mehrtages-Trekking im Regenwald – für kleine Kinder zu anspruchsvoll' },
      '6-12': { rating: 'yellow', note: 'Abenteuerlich, aber nur für erfahrene Outdoor-Familien mit Vorbereitung' },
      '12+':  { rating: 'green', note: 'Echtes Dschungel-Abenteuer mit Kajak und Trekking – ideal für Teens' }
    },
    desc: 'Südostasiens größter zusammenhängender Regenwald – Ökotourismus pur'
  },
  {
    id: 'sambor-prei-kuk',
    name: 'Sambor Prei Kuk',
    lat: 12.9000,
    lng: 105.0300,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Sambor_Prei_Kuk',
    highlights: 'UNESCO-Welterbe, Prä-Angkor-Tempel, Chenla-Reichshauptstadt',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen und heiß, aber flaches Gelände – mit Schutz machbar' },
      '1-3':  { rating: 'yellow', note: 'Ruhige Tempelanlage ohne Touristenmassen – Hitze beachten' },
      '3-6':  { rating: 'green', note: 'Überschaubare Tempel im Wald – wie ein Dschungel-Spielplatz' },
      '6-12': { rating: 'green', note: 'Tempel im Dschungel erkunden – Indiana-Jones-Feeling für Kinder' },
      '12+':  { rating: 'green', note: 'Faszinierende prä-angkorianische Geschichte ohne Touristenmassen' }
    },
    dayTripFrom: [{ base: 'kampong-thom', transit: '~30min Tuk-Tuk' }],
    desc: 'UNESCO-Welterbe mit über 100 prä-angkorianischen Tempeln aus dem 6. Jahrhundert'
  },

  // ===== OFF THE BEATEN PATH (8) =====
  {
    id: 'ratanakiri',
    name: 'Ratanakiri',
    altName: 'Banlung',
    lat: 13.7396,
    lng: 107.0025,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Ratanakiri_Province',
    highlights: 'Yeak Laom Vulkansee, Wasserfälle, Kautschukplantagen, indigene Dörfer',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Sehr abgelegen, schlechte Straßen und keine Medizin – nicht geeignet' },
      '1-3':  { rating: 'red', note: 'Extrem holprige Anreise, kaum Infrastruktur – für Kleinkinder tabu' },
      '3-6':  { rating: 'yellow', note: 'Vulkansee fasziniert, aber Anreise und Unterkünfte sehr einfach' },
      '6-12': { rating: 'yellow', note: 'Abenteuerlich mit Vulkansee und Dschungel – nur für robuste Familien' },
      '12+':  { rating: 'green', note: 'Echte Wildnis mit Vulkansee und indigenen Dörfern – spannendes Abenteuer' }
    },
    desc: 'Kambodschas wilder Nordosten – rote Erde, Vulkanseen und Dschungel'
  },
  {
    id: 'stung-treng',
    name: 'Stung Treng',
    lat: 13.5253,
    lng: 106.0167,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Stung_Treng',
    highlights: 'Mekong-Delfine, Ramsar-Feuchtgebiet, Grenzübergang Laos',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Sehr abgelegen, lange Fahrt, minimale medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Kaum touristische Infrastruktur – für Kleinkinder nicht empfehlenswert' },
      '3-6':  { rating: 'yellow', note: 'Delfine und Mekong-Landschaft schön, aber sehr abgelegen' },
      '6-12': { rating: 'yellow', note: 'Mekong-Delfine und Feuchtgebiete toll, Infrastruktur jedoch dünn' },
      '12+':  { rating: 'yellow', note: 'Grenzgebiet zu Laos mit Natur – für abenteuerlustige Teenager' }
    },
    desc: 'Ruhige Mekong-Stadt am Grenzfluss zu Laos – Tor zum Nordosten'
  },
  {
    id: 'chi-phat',
    name: 'Chi Phat',
    lat: 11.43,
    lng: 103.28,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Cardamom_Mountains',
    highlights: 'Community-Based Ecotourism, Kayaking, Trekking, Vogelbeobachtung',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Nur per Boot erreichbar, kein Arzt – absolut ungeeignet für Babys' },
      '1-3':  { rating: 'red', note: 'Dschungeldorf ohne Infrastruktur – für Kleinkinder nicht machbar' },
      '3-6':  { rating: 'red', note: 'Mehrstündige Bootsfahrt, keine Komfort-Unterkünfte – zu anspruchsvoll' },
      '6-12': { rating: 'yellow', note: 'Ökotourismus-Abenteuer für robuste Familien – einfache Bedingungen' },
      '12+':  { rating: 'green', note: 'Community-Trekking, Kajak und Vogelbeobachtung – Öko-Abenteuer pur' }
    },
    dayTripFrom: [{ base: 'cardamom', transit: '~2h Boot' }],
    desc: 'Preisgekröntes Ökotourismus-Dorf mitten im Kardamomgebirge'
  },
  {
    id: 'koh-sdach',
    name: 'Koh Sdach',
    lat: 10.87,
    lng: 103.15,
    tags: ['Erholung', 'Natur'],
    wiki: 'Koh_Kong_Province',
    highlights: 'Unberührte Inseln, Schnorcheln, Fischerdörfer, Ruhe',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Keine medizinische Versorgung, einfache Boote – für Babys tabu' },
      '1-3':  { rating: 'red', note: 'Kaum Tourismus-Infrastruktur, abgelegene Inseln – nicht für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Traumhaft ruhig, aber Versorgung und Anreise sehr eingeschränkt' },
      '6-12': { rating: 'yellow', note: 'Fischerdörfer und unberührte Natur – nur für erfahrene Reisefamilien' },
      '12+':  { rating: 'yellow', note: 'Abseits aller Pfade – echtes Inselabenteuer ohne Touristentrubel' }
    },
    desc: 'Verschlafenes Inselarchipel ohne Tourismus – das echte Kambodscha am Meer'
  },
  {
    id: 'koh-trong',
    name: 'Koh Trong',
    lat: 12.50,
    lng: 106.02,
    tags: ['Erholung', 'Natur', 'Kultur'],
    wiki: 'Mekong_River',
    highlights: 'Homestays, Radtouren, Mekong-Landleben, schwimmende Gärten',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Ruhig und sicher, aber nur per Fähre erreichbar – Grundversorgung dünn' },
      '1-3':  { rating: 'green', note: 'Friedliches Dorfleben, Radtouren und Homestays – ideal für Familien' },
      '3-6':  { rating: 'green', note: 'Radfahren, Tiere beobachten und Dorfleben entdecken – perfekt für Kinder' },
      '6-12': { rating: 'green', note: 'Fahrradtouren durch Dörfer und schwimmende Gärten – unvergesslich' },
      '12+':  { rating: 'green', note: 'Authentisches Mekong-Landleben und Homestay-Erfahrung' }
    },
    dayTripFrom: [{ base: 'kratie', transit: '~10min Fähre' }],
    desc: 'Idyllische Mekong-Insel bei Kratié – Homestays und entschleunigtes Dorfleben'
  },
  {
    id: 'banteay-chhmar',
    name: 'Banteay Chhmar',
    lat: 13.7000,
    lng: 103.1900,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Banteay_Chhmar',
    highlights: 'Gigantischer Tempelkomplex, Gesichtertürme, Community-Homestays',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Sehr abgelegen, holprige Straßen, keine Infrastruktur – ungeeignet' },
      '1-3':  { rating: 'red', note: 'Lange Anfahrt über schlechte Straßen – für Kleinkinder nicht machbar' },
      '3-6':  { rating: 'yellow', note: 'Tempel ohne Touristen spannend, aber Anreise und Hitze anstrengend' },
      '6-12': { rating: 'yellow', note: 'Geheime Tempel im Dschungel – abenteuerlich für robuste Kinder' },
      '12+':  { rating: 'green', note: 'Angkor ohne Massen – faszinierende Gesichtertürme und Homestays' }
    },
    desc: 'Kambodschas geheimes Angkor – riesiger Tempelkomplex ohne Touristenmassen'
  },
  {
    id: 'phnom-kulen',
    name: 'Phnom Kulen',
    lat: 13.58,
    lng: 104.03,
    tags: ['Natur', 'Geschichte'],
    wiki: 'Phnom_Kulen_National_Park',
    highlights: 'Heiliger Berg, Tausend Lingas, Wasserfall, Liegender Buddha',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Holprige Anfahrt und Hitze – als Tagesausflug mit Baby anstrengend' },
      '1-3':  { rating: 'yellow', note: 'Wasserfall und Buddha toll, aber steinige Wege schwierig mit Buggy' },
      '3-6':  { rating: 'green', note: 'Wasserfall zum Planschen und riesiger Buddha – Kinder lieben es' },
      '6-12': { rating: 'green', note: 'Heiliger Berg mit Wasserfall und Lingas im Flussbett – spannend' },
      '12+':  { rating: 'green', note: 'Geschichte und Natur vereint – Geburtsstätte des Khmer-Reiches' }
    },
    dayTripFrom: [{ base: 'siem-reap', transit: '~1.5h Auto' }],
    desc: 'Kambodschas heiligster Berg – Geburtsstätte des Khmer-Reiches'
  },
  {
    id: 'kampong-thom',
    name: 'Kampong Thom',
    lat: 12.7111,
    lng: 104.8886,
    tags: ['Kultur', 'Geschichte'],
    wiki: 'Kampong_Thom_province',
    highlights: 'Sambor Prei Kuk, Phnom Santuk, Stung Sen Fluss',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Ruhige Kleinstadt, aber medizinisch und touristisch eingeschränkt' },
      '1-3':  { rating: 'green', note: 'Überschaubare Stadt mit Fluss und Tempelausflügen – angenehm ruhig' },
      '3-6':  { rating: 'green', note: 'Tempel im Wald und Phnom Santuk – perfekt für kleine Entdecker' },
      '6-12': { rating: 'green', note: 'Sambor Prei Kuk als Tagesausflug – Tempel ohne Touristenmassen' },
      '12+':  { rating: 'green', note: 'Prä-angkorianische Geschichte und authentisches Provinzleben' }
    },
    desc: 'Ruhige Provinzhauptstadt – Basis für die prä-angkorianischen Tempel von Sambor Prei Kuk'
  }
];
