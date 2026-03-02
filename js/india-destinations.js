/* ============================================
   INDIA-DESTINATIONS.JS – Datenbank aller Indien-Ziele
   ============================================ */

const INDIA_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'delhi',
    name: 'Delhi',
    altName: 'Neu-Delhi',
    lat: 28.6139,
    lng: 77.2090,
    tags: ['Großstadt', 'Kultur', 'Geschichte'],
    wiki: 'Delhi',
    highlights: 'Red Fort (UNESCO), Qutub Minar (UNESCO), Chandni Chowk, Humayuns Grab, India Gate, Jama Masjid',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Extreme Hitze im Sommer, Luftverschmutzung und chaotischer Verkehr – aber gute Krankenhäuser vorhanden' },
      '1-3':  { rating: 'yellow', note: 'Verkehr und Menschenmassen stressig, aber Metro funktioniert gut und Malls bieten Abwechslung' },
      '3-6':  { rating: 'green', note: 'Red Fort, Humayuns Grab und der Zoo bieten kindgerechte Erlebnisse, gute Metro-Anbindung' },
      '6-12': { rating: 'green', note: 'Geschichtsträchtige Monumente, Science Centre und bunte Basare begeistern Schulkinder' },
      '12+':  { rating: 'green', note: 'Street Food in Chandni Chowk, Hauz Khas Village und historische Stätten fesseln Teenager' }
    },
    desc: 'Indiens pulsierende Hauptstadt, wo Mogul-Festungen auf britische Kolonialarchitektur treffen und jede Gasse in der Altstadt nach frischem Street Food duftet'
  },
  {
    id: 'agra',
    name: 'Agra',
    lat: 27.1767,
    lng: 78.0081,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Agra',
    highlights: 'Taj Mahal (UNESCO), Agra Fort (UNESCO), Fatehpur Sikri (UNESCO), Itimad-ud-Daulah, Mehtab Bagh',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Hitze und Luftverschmutzung belasten Babys, aber kurze Besichtigungszeiten am Taj Mahal machbar' },
      '1-3':  { rating: 'yellow', note: 'Taj-Mahal-Gelände weitläufig und heiß, Buggy auf den Wegen schwierig – kurze Besuche planen' },
      '3-6':  { rating: 'green', note: 'Das Taj Mahal als „Märchenschloss" begeistert Kinder, Tongas (Pferdekutschen) machen Spaß' },
      '6-12': { rating: 'green', note: 'Taj Mahal, Agra Fort und Fatehpur Sikri bieten spannende Geschichtsstunden für Kinder' },
      '12+':  { rating: 'green', note: 'Eines der beeindruckendsten Bauwerke der Welt hautnah erleben – unvergesslich für Teenager' }
    },
    desc: 'Heimat des Taj Mahal, dem unsterblichen Denkmal der Liebe, und zweier weiterer UNESCO-Welterbestätten aus der großen Mogul-Ära',
    dayTripFrom: [{ base: 'delhi', transit: '~2h Gatimaan Express / ~3h Auto' }]
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    altName: 'Pink City',
    lat: 26.9124,
    lng: 75.7873,
    tags: ['Kultur', 'Geschichte', 'Großstadt'],
    wiki: 'Jaipur',
    highlights: 'Hawa Mahal (Palast der Winde), Amber Fort (UNESCO), City Palace, Jantar Mantar (UNESCO), Nahargarh Fort',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Hitze im Sommer extrem (bis 45°C), aber gute Krankenhäuser und Hotels mit Babyausstattung' },
      '1-3':  { rating: 'yellow', note: 'Fort-Besichtigungen mit vielen Treppen anstrengend, Elefantenritte aber faszinierend für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Amber Fort wie eine Ritterburg, Affen am Galtaji-Tempel und bunte Basare begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Forts, Paläste und Jantar Mantar (Sternwarte) machen Geschichte lebendig für Schulkinder' },
      '12+':  { rating: 'green', note: 'Bazare zum Shoppen, Bollywood-Kinos, Kochkurse und die Pink City bei Sonnenuntergang fesseln Teens' }
    },
    desc: 'Die „rosarote Stadt" Rajasthans mit majestätischen Forts und Palästen, wo der Glanz der Maharajas bis heute lebendig ist'
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    altName: 'Benares / Kashi',
    lat: 25.3176,
    lng: 83.0068,
    tags: ['Kultur', 'Geschichte'],
    wiki: 'Varanasi',
    highlights: 'Ghats am Ganges, Ganga Aarti-Zeremonie, Kashi Vishwanath Tempel, Sarnath, Bootsfahrt bei Sonnenaufgang',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem überfüllt, steile Ghats, Hygiene-Herausforderungen und Verbrennungsstätten – nicht für Babys geeignet' },
      '1-3':  { rating: 'red', note: 'Enge, steile Gassen, Menschenmassen und Verbrennungsrituale – für Kleinkinder überwältigend' },
      '3-6':  { rating: 'yellow', note: 'Bootsfahrt auf dem Ganges faszinierend, aber die Intensität der Stadt kann Kinder überfordern' },
      '6-12': { rating: 'yellow', note: 'Ganga Aarti beeindruckend, aber die Verbrennungszeremonien und Armut sind schwer zu verarbeiten' },
      '12+':  { rating: 'green', note: 'Eine der intensivsten Erfahrungen Indiens – tiefe spirituelle und kulturelle Eindrücke für reife Teenager' }
    },
    desc: 'Die heiligste Stadt des Hinduismus am Ganges, wo seit über 3.000 Jahren Pilger an den Ghats beten und die Grenze zwischen Leben und Tod verschwimmt'
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    altName: 'Bombay',
    lat: 19.0760,
    lng: 72.8777,
    tags: ['Großstadt', 'Kultur', 'Kulinarik'],
    wiki: 'Mumbai',
    highlights: 'Gateway of India, Marine Drive, Dharavi, Elephanta-Höhlen (UNESCO), Dabbawala-System, Bollywood',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Monsun-Überschwemmungen und Hitze belasten, aber exzellente Krankenhäuser und internationale Hotels vorhanden' },
      '1-3':  { rating: 'yellow', note: 'Verkehr chaotisch und Züge überfüllt, aber Marine Drive und Malls bieten kinderfreundliche Zonen' },
      '3-6':  { rating: 'green', note: 'Aquarium, Marine Drive, Fähre nach Elephanta und Strandpromenaden bieten Abwechslung für Kinder' },
      '6-12': { rating: 'green', note: 'Bollywood-Erlebnisse, Gateway of India und die Dabbawalas faszinieren neugierige Schulkinder' },
      '12+':  { rating: 'green', note: 'Street Food, Bollywood, Shopping und das Nachtleben der Megacity begeistern Teenager' }
    },
    desc: 'Indiens Traumfabrik und Finanzmetropole am Arabischen Meer, wo Bollywood-Glamour auf viktorianische Architektur und legendäres Street Food trifft'
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    altName: 'Stadt der Seen',
    lat: 24.5854,
    lng: 73.7125,
    tags: ['Kultur', 'Geschichte', 'Erholung'],
    wiki: 'Udaipur',
    highlights: 'City Palace, Lake Pichola, Jag Mandir, Jagdish-Tempel, Monsoon Palace, Fateh Sagar See',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Relativ ruhige Stadt mit guten Hotels, Bootsfahrten auf dem See und angenehmer Atmosphäre' },
      '1-3':  { rating: 'green', note: 'Bootsfahrten, Gärten und der City Palace bieten entspannte Erlebnisse für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Bootsfahrt auf dem Pichola-See, City Palace und Puppenmuseum begeistern kleine Kinder' },
      '6-12': { rating: 'green', note: 'Maharaja-Palast, Bootsfahrten und Miniaturmalerei-Workshops bieten tolles Programm' },
      '12+':  { rating: 'green', note: 'Romantische Altstadt, James-Bond-Kulisse (Octopussy), Rooftop-Restaurants und Kunstszene' }
    },
    desc: 'Das „Venedig des Ostens" – eine märchenhafte Rajasthan-Stadt mit weißen Palästen, die sich in glitzernden Seen spiegeln'
  },
  {
    id: 'jodhpur',
    name: 'Jodhpur',
    altName: 'Blue City',
    lat: 26.2389,
    lng: 73.0243,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Jodhpur',
    highlights: 'Mehrangarh Fort, blaue Altstadt, Jaswant Thada, Umaid Bhawan Palace, Mandore Gardens, Gewürzmarkt',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Hitze im Sommer extrem, Mehrangarh Fort hat viele Stufen – aber kompakte Stadt mit guter Versorgung' },
      '1-3':  { rating: 'yellow', note: 'Steile Festungswege anstrengend mit Kleinkindern, aber die blaue Altstadt ist flach und sicher' },
      '3-6':  { rating: 'green', note: 'Mehrangarh Fort wie ein Abenteuerspielplatz, blaue Häuser faszinieren und Zipline über die Stadt' },
      '6-12': { rating: 'green', note: 'Imposantes Fort, Zipline-Abenteuer und Gewürzmarkt bieten spannende Erlebnisse für Kinder' },
      '12+':  { rating: 'green', note: 'Episches Mehrangarh Fort, Rooftop-Cafés mit Blick auf die blaue Stadt und Wüstenausflüge' }
    },
    desc: 'Die „blaue Stadt" am Rand der Thar-Wüste, überragt vom mächtigen Mehrangarh Fort – einer der eindrucksvollsten Festungen Indiens'
  },
  {
    id: 'jaisalmer',
    name: 'Jaisalmer',
    altName: 'Golden City',
    lat: 26.9157,
    lng: 70.9083,
    tags: ['Geschichte', 'Abenteuer', 'Kultur'],
    wiki: 'Jaisalmer',
    highlights: 'Jaisalmer Fort (lebende Festung), Sam-Sanddünen, Kamelritt, Patwon Ki Haveli, Wüstennacht unter Sternen',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Extreme Wüstenhitze im Sommer, Sandstürme möglich, eingeschränkte medizinische Versorgung' },
      '1-3':  { rating: 'yellow', note: 'Wüstenhitze und Sand herausfordernd, aber kurze Kamelritte und Fort-Erkundung machbar' },
      '3-6':  { rating: 'green', note: 'Kamelreiten, Sanddünen und die lebende Festung – ein echtes Wüstenabenteuer für Kinder' },
      '6-12': { rating: 'green', note: 'Wüsten-Kamelritt, Übernachtung in den Dünen und die goldene Festung begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Wüstensafari, Sternenhimmel in den Sam-Dünen und die lebende Festung sind unvergesslich' }
    },
    desc: 'Die goldene Festungsstadt mitten in der Thar-Wüste, wo jahrhundertealte Havelis im Sandstein leuchten und Kamelkarawanen in die Dünen aufbrechen'
  },
  {
    id: 'kochi',
    name: 'Kochi',
    altName: 'Cochin / Kerala',
    lat: 9.9312,
    lng: 76.2673,
    tags: ['Kultur', 'Kulinarik', 'Geschichte'],
    wiki: 'Kochi',
    highlights: 'Chinesische Fischernetze, Fort Kochi, Kerala Backwaters, Kathakali-Tanz, Gewürzmärkte, Jüdische Synagoge',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Kerala hat Indiens beste Gesundheitsversorgung, ruhige Atmosphäre und saubere Strände in Fort Kochi' },
      '1-3':  { rating: 'green', note: 'Backwater-Bootsfahrten, flache Straßen in Fort Kochi und kinderfreundliche Restaurants' },
      '3-6':  { rating: 'green', note: 'Chinesische Fischernetze, Bootsfahrten durch die Backwaters und Kathakali-Shows begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Gewürzplantagen, Backwater-Hausboote und die multikulturelle Geschichte Kochis fesseln Kinder' },
      '12+':  { rating: 'green', note: 'Street Art in Fort Kochi, Kochkurse, Backwater-Erlebnis und Ayurveda für Neugierige' }
    },
    desc: 'Keralas charmante Hafenstadt, wo chinesische Fischernetze, portugiesische Kirchen und jüdische Synagogen die kosmopolitische Geschichte Indiens erzählen'
  },
  {
    id: 'goa',
    name: 'Goa',
    lat: 15.2993,
    lng: 74.1240,
    tags: ['Erholung', 'Kultur', 'Kulinarik'],
    wiki: 'Goa',
    highlights: 'Palolem Beach, Basilika Bom Jesus (UNESCO), Old Goa, Spice Plantations, Dudhsagar-Wasserfall, Nachtmärkte',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Familienresorts mit Babypools, flache Strände und gute medizinische Versorgung vorhanden' },
      '1-3':  { rating: 'green', note: 'Ruhige Strände in Süd-Goa, Resorts mit Kinderpools und entspannte Atmosphäre für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Strandspiele, Gewürzplantagen-Touren und Delfin-Bootsfahrten begeistern kleine Kinder' },
      '6-12': { rating: 'green', note: 'Wassersport, Dudhsagar-Wasserfall und Old Goa bieten Abenteuer und Kultur für Schulkinder' },
      '12+':  { rating: 'green', note: 'Strandleben, Wassersport, Nachtmärkte und entspannte Atmosphäre – perfekt für Teenager' }
    },
    desc: 'Indiens tropisches Strandparadies mit portugiesischem Erbe, wo goldene Strände auf barocke Kirchen und würzige Vindaloo-Küche treffen'
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    lat: 30.0869,
    lng: 78.2676,
    tags: ['Abenteuer', 'Kultur', 'Natur'],
    wiki: 'Rishikesh',
    highlights: 'Laxman Jhula & Ram Jhula, Wildwasser-Rafting, Yoga-Ashrams, Beatles-Ashram, Ganga Aarti, Bungee-Jumping',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bergige Lage, hängende Brücken und begrenzte Kliniken – besser als Tagesausflug planen' },
      '1-3':  { rating: 'yellow', note: 'Steile Wege und hängende Brücken herausfordernd, aber Ganga Aarti und Ashram-Atmosphäre ruhig' },
      '3-6':  { rating: 'green', note: 'Hängebrücken überqueren, Affen beobachten und Ganga Aarti erleben begeistert kleine Kinder' },
      '6-12': { rating: 'green', note: 'Rafting (leichte Strecken), Beatles-Ashram und Hängebrücken sind perfekte Abenteuer für Kids' },
      '12+':  { rating: 'green', note: 'Rafting, Bungee-Jumping, Yoga-Einführung und die spirituelle Atmosphäre fesseln Teenager' }
    },
    desc: 'Yoga-Hauptstadt der Welt am heiligen Ganges, wo einst die Beatles meditierten und heute Wildwasser-Rafting auf Spiritualität trifft'
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    lat: 31.6340,
    lng: 74.8723,
    tags: ['Kultur', 'Geschichte', 'Kulinarik'],
    wiki: 'Amritsar',
    highlights: 'Goldener Tempel (Harmandir Sahib), Wagah-Grenzzeremonie, Jallianwala Bagh, Langar (Gemeinschaftsküche)',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Menschenmassen am Goldenen Tempel, aber Langar-Gemeinschaftsküche und ruhige Atmosphäre im Tempel' },
      '1-3':  { rating: 'green', note: 'Goldener Tempel barrierefrei, Langar faszinierend und Wagah-Zeremonie beeindruckt auch Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Der glitzernde Goldene Tempel, die Langar-Küche und die Wagah-Show begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Goldener Tempel, dramatische Wagah-Grenzzeremonie und Sikh-Geschichte fesseln Schulkinder' },
      '12+':  { rating: 'green', note: 'Spirituelle Tiefe des Goldenen Tempels, Wagah-Patriotismus und legendäres Punjab-Essen beeindrucken' }
    },
    desc: 'Heilige Stadt der Sikhs mit dem atemberaubenden Goldenen Tempel, dessen vergoldete Kuppel sich im heiligen Amrit Sarovar spiegelt'
  },
  {
    id: 'darjeeling',
    name: 'Darjeeling',
    lat: 27.0360,
    lng: 88.2627,
    tags: ['Natur', 'Kultur', 'Erholung'],
    wiki: 'Darjeeling',
    highlights: 'Toy Train (UNESCO), Tiger Hill Sonnenaufgang, Teeplantagen, Blick auf Kangchendzönga, Peace Pagoda',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Höhenlage (2.050m) und kühles Klima, kurvenreiche Anreise – mit Baby anstrengend' },
      '1-3':  { rating: 'green', note: 'Toy-Train-Fahrt begeistert Kleinkinder, angenehmes Klima und überschaubare Stadt' },
      '3-6':  { rating: 'green', note: 'Dampflok-Fahrt, Teegärten erkunden und den schneebedeckten Kangchendzönga bestaunen' },
      '6-12': { rating: 'green', note: 'UNESCO-Toy-Train, Tiger Hill Sonnenaufgang und Teefabrik-Besuch begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Himalaya-Panorama, Trekking-Optionen und die koloniale Hill-Station-Atmosphäre faszinieren Teens' }
    },
    desc: 'Die berühmte Himalaya-Hill-Station mit dem legendären UNESCO-Toy-Train, Teeplantagen und einem atemberaubenden Blick auf den Kangchendzönga'
  },
  {
    id: 'hampi',
    name: 'Hampi',
    lat: 15.3350,
    lng: 76.4600,
    tags: ['Geschichte', 'Kultur', 'Natur'],
    wiki: 'Hampi',
    highlights: 'Virupaksha-Tempel, Steinerner Streitwagen, Lotus Mahal, Hemakuta Hill, Felslandschaft, Matanga Hill Sonnenuntergang',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen, extreme Hitze im Sommer, kaum Schatten auf dem Ruinengelände und wenig Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Weitläufiges Gelände bei Hitze mit Kleinkind schwierig, aber Coracle-Bootfahrten möglich' },
      '3-6':  { rating: 'green', note: 'Riesige Felslandschaft wie ein Abenteuerspielplatz, Affen und der Steinerne Streitwagen faszinieren' },
      '6-12': { rating: 'green', note: 'Ruinen erkunden, auf Felsen klettern und die Geschichte des Vijayanagara-Reiches erleben' },
      '12+':  { rating: 'green', note: 'Epische Ruinenlandschaft, Felsklettern, Radtouren und Sonnenuntergang vom Matanga Hill' }
    },
    desc: 'Surreale UNESCO-Ruinenstadt des Vijayanagara-Reiches, verstreut zwischen gigantischen Granitfelsen – wie ein Museum unter freiem Himmel'
  },
  {
    id: 'mysore',
    name: 'Mysore',
    altName: 'Mysuru',
    lat: 12.3083,
    lng: 76.6553,
    tags: ['Kultur', 'Geschichte'],
    wiki: 'Mysore',
    highlights: 'Mysore Palace (Amba Vilas), Chamundi Hill, Devaraja Market, Brindavan Gardens, Mysore-Sandelholz',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Saubere Stadt mit guter Infrastruktur, gemäßigtes Klima und kinderfreundliche Umgebung' },
      '1-3':  { rating: 'green', note: 'Palast und Gärten gut begehbar, Brindavan-Springbrunnen abends faszinieren Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Der Palast wie aus einem Märchen, Chamundi Hill und der Zoo bieten tolle Erlebnisse' },
      '6-12': { rating: 'green', note: 'Prunkvoller Palast, Chamundi-Tempel und der berühmte Devaraja-Markt begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Palast-Geschichte, Yoga-Zentrum (Ashtanga), Kunsthandwerk und entspannte Stadt für Teenager' }
    },
    desc: 'Königliche Stadt Karnatakas mit dem prachtvollsten Palast Indiens, der bei nächtlicher Beleuchtung mit 100.000 Glühbirnen erstrahlt'
  },

  // ===== OFF THE BEATEN PATH (9) =====
  {
    id: 'khajuraho',
    name: 'Khajuraho',
    lat: 24.8318,
    lng: 79.9199,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Khajuraho_Group_of_Monuments',
    highlights: 'UNESCO-Tempelgruppe, erotische Skulpturen, Kandariya-Mahadeva-Tempel, Sound & Light Show',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen im ländlichen Madhya Pradesh, begrenzte medizinische Versorgung' },
      '1-3':  { rating: 'yellow', note: 'Tempelgelände weitläufig, Hitze und wenig Schatten – kurze Besuche empfehlenswert' },
      '3-6':  { rating: 'green', note: 'Skulpturen und Tempelarchitektur faszinieren, Tiere am Gelände beobachten macht Spaß' },
      '6-12': { rating: 'green', note: 'Beeindruckende Tempelkunst und Architektur – erotische Skulpturen altersgerecht erklären' },
      '12+':  { rating: 'green', note: 'UNESCO-Welterbe mit faszinierender Kunstgeschichte – reife Teenager schätzen die Meisterwerke' }
    },
    desc: 'UNESCO-Welterbe mit meisterhaft gemeißelten Tempeln aus dem 10. Jahrhundert, deren kunstvolle erotische Skulpturen die Sinnlichkeit des mittelalterlichen Indiens feiern'
  },
  {
    id: 'pushkar',
    name: 'Pushkar',
    lat: 26.4900,
    lng: 74.5514,
    tags: ['Kultur', 'Erholung'],
    wiki: 'Pushkar',
    highlights: 'Pushkar-See, Brahma-Tempel (einziger weltweit), Pushkar Camel Fair, Ghats, Rooftop-Cafés',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kleine Stadt mit begrenzter Infrastruktur, aber ruhige Atmosphäre und wenig Verkehr' },
      '1-3':  { rating: 'green', note: 'Ruhige, autofreie Atmosphäre am See, Kamele beobachten und Ghats erkunden – ideal für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Kamele streicheln, heiliger See und bunte Märkte – entspanntes Rajasthan-Erlebnis für Kinder' },
      '6-12': { rating: 'green', note: 'Kamelmarkt (November), heiliger See und der einzige Brahma-Tempel der Welt faszinieren' },
      '12+':  { rating: 'green', note: 'Entspannte Hippie-Atmosphäre, Rooftop-Cafés und spirituelle Erfahrungen am heiligen See' }
    },
    desc: 'Heilige Pilgerstadt am Rand der Wüste mit dem einzigen Brahma-Tempel der Welt und dem legendären Kamelmarkt im November',
    dayTripFrom: [{ base: 'jaipur', transit: '~2.5h Bus/Auto' }]
  },
  {
    id: 'orchha',
    name: 'Orchha',
    lat: 25.3519,
    lng: 78.6400,
    tags: ['Geschichte', 'Kultur', 'Natur'],
    wiki: 'Orchha',
    highlights: 'Jahangir Mahal, Raja Mahal, Chaturbhuj-Tempel, Cenotaphs am Betwa-Fluss, Orchha-Wildreservat',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kleine Ortschaft mit begrenzter medizinischer Versorgung, aber ruhig und unkompliziert' },
      '1-3':  { rating: 'green', note: 'Ruhiger Ort, Palastgelände zum Entdecken und Flussufer zum Spielen – stressfrei mit Kleinkindern' },
      '3-6':  { rating: 'green', note: 'Paläste wie Burgen erkunden, Affen und Geier beobachten, am Fluss spielen – ideal für Kinder' },
      '6-12': { rating: 'green', note: 'Verlassene Paläste erkunden, Rafting auf dem Betwa und Vogelbeobachtung begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Unentdecktes Mogul-Juwel abseits der Massen, Fotomotive und authentisches Indien für Teens' }
    },
    desc: 'Verschlafene ehemalige Bundela-Hauptstadt mit prächtigen Mogul-Palästen und Cenotaphs am Betwa-Fluss – Indiens bestgehütetes Geheimnis',
    dayTripFrom: [{ base: 'khajuraho', transit: '~4h Bus/Auto' }]
  },
  {
    id: 'spiti',
    name: 'Spiti Valley',
    altName: 'Spiti / Kaza',
    lat: 32.2466,
    lng: 78.0500,
    tags: ['Natur', 'Abenteuer', 'Kultur'],
    wiki: 'Spiti_Valley',
    highlights: 'Key Monastery, Chandratal Lake, Kunzum Pass (4.551m), Dhankar Monastery, Pin Valley, Kibber',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extreme Höhe (3.800-4.500m), keine medizinische Versorgung, gefährliche Bergstraßen – absolut ungeeignet' },
      '1-3':  { rating: 'red', note: 'Höhenkrankheit-Risiko, lange Fahrten auf unbefestigten Bergstraßen, keine Infrastruktur' },
      '3-6':  { rating: 'red', note: 'Höhe, Kälte und extreme Abgelegenheit – für kleine Kinder nicht empfehlenswert' },
      '6-12': { rating: 'yellow', note: 'Nur für abenteuerlustige Familien mit akklimatisierten Kindern – spektakuläre Landschaft belohnt' },
      '12+':  { rating: 'yellow', note: 'Unvergessliches Himalaya-Abenteuer, aber nur für fitte und höhenangepasste Teenager geeignet' }
    },
    desc: 'Tibetisch-buddhistische Hochgebirgswüste auf über 4.000m mit uralten Klöstern, nur zugänglich von Juni bis Oktober über halsbrecherische Passstraßen'
  },
  {
    id: 'pondicherry',
    name: 'Pondicherry',
    altName: 'Puducherry',
    lat: 11.9139,
    lng: 79.8145,
    tags: ['Kultur', 'Erholung', 'Kulinarik'],
    wiki: 'Pondicherry',
    highlights: 'Französisches Viertel, Promenade Beach, Auroville, Sri Aurobindo Ashram, Französische Bäckereien',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Küstenstadt, gute Infrastruktur und gemäßigtes Klima – entspannt mit Baby' },
      '1-3':  { rating: 'green', note: 'Flache Promenade zum Flanieren, Strände und französische Bäckereien – ideal für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Promenade, Auroville-Spielplätze und bunte französische Straßen begeistern kleine Kinder' },
      '6-12': { rating: 'green', note: 'Französische Kolonialarchitektur, Auroville und Radtouren bieten vielseitiges Programm' },
      '12+':  { rating: 'green', note: 'Frankreich in Indien, trendige Cafés, Surfstrände und die utopische Kommune Auroville faszinieren' }
    },
    desc: 'Indiens kleines Frankreich an der Koromandelküste – pastellfarbene Kolonialgebäude, Croissants und die utopische Gemeinschaft Auroville'
  },
  {
    id: 'munnar',
    name: 'Munnar',
    lat: 10.0892,
    lng: 77.0597,
    tags: ['Natur', 'Erholung'],
    wiki: 'Munnar',
    highlights: 'Teeplantagen, Eravikulam-Nationalpark, Top Station, Mattupetty-Staudamm, Nilgiri-Tahr (Bergziege)',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: '1.600m Höhe mit kühlem Klima, kurvenreiche Anfahrt – aber erfrischend nach der Hitze der Ebene' },
      '1-3':  { rating: 'green', note: 'Teegärten zum Spazieren, kühles Klima und Bootsfahrt am Mattupetty-Dam begeistern Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Teeplantagen, Bergziegen im Nationalpark und Bootsfahrten – Naturerlebnis für kleine Kinder' },
      '6-12': { rating: 'green', note: 'Teefabrik besuchen, Nilgiri-Tahr beobachten und durch Teegärten wandern fesselt Schulkinder' },
      '12+':  { rating: 'green', note: 'Trekking durch Teeplantagen, Paragliding und die grüne Berglandschaft faszinieren Teenager' }
    },
    desc: 'Keralas Tee-Hauptstadt in den Western Ghats, wo sich endlose smaragdgrüne Teeplantagen über sanfte Bergkuppen ergießen',
    dayTripFrom: [{ base: 'kochi', transit: '~4h Bus/Auto' }]
  },
  {
    id: 'rannofkutch',
    name: 'Rann of Kutch',
    altName: 'Weißer Rann / Great Rann',
    lat: 23.7333,
    lng: 69.8597,
    tags: ['Natur', 'Abenteuer', 'Kultur'],
    wiki: 'Rann_of_Kutch',
    highlights: 'Weiße Salzwüste, Rann Utsav Festival (Nov-Feb), Vollmond-Panorama, Banni-Dörfer, Wildesel-Schutzgebiet',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen, extreme Temperaturen und Salzwüste – nur während des Rann Utsav mit Infrastruktur' },
      '1-3':  { rating: 'yellow', note: 'Während Rann Utsav gute Zeltstadt-Infrastruktur, sonst sehr abgelegen und heiß' },
      '3-6':  { rating: 'green', note: 'Weiße Salzwüste wie ein Winterwunderland, Kamelritte und Kutchi-Handwerk begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Surreale Salzwüste, Wildesel beobachten und das Rann-Utsav-Kulturfestival fesseln Kinder' },
      '12+':  { rating: 'green', note: 'Unwirkliche Landschaft bei Vollmond, Kutchi-Kultur und ein einzigartiges Naturwunder' }
    },
    desc: 'Surreale weiße Salzwüste so weit das Auge reicht, die bei Vollmond wie eine endlose Schneelandschaft erstrahlt – eines der ungewöhnlichsten Naturwunder Indiens'
  },
  {
    id: 'majuli',
    name: 'Majuli Island',
    lat: 27.0000,
    lng: 94.2167,
    tags: ['Kultur', 'Natur'],
    wiki: 'Majuli',
    highlights: 'Größte Flussinsel der Welt, Sattra-Klöster (Neo-Vaishnavismus), Mishing-Stamm, Maskenkunst, Reisfelder',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem abgelegen, keine medizinische Versorgung, Fähre als einziger Zugang – nicht für Babys' },
      '1-3':  { rating: 'red', note: 'Infrastruktur minimal, Fähre überfüllt und kaum Unterkünfte für Familien mit Kleinkindern' },
      '3-6':  { rating: 'yellow', note: 'Fährabenteuer und Reisfelder spannend, aber sehr abgelegen und einfache Unterkünfte' },
      '6-12': { rating: 'yellow', note: 'Maskenherstellung, Flussinsel-Leben und Klöster faszinierend – nur für abenteuerlustige Familien' },
      '12+':  { rating: 'green', note: 'Einzigartiges Insel-Erlebnis, traditionelle Kunst und authentisches ländliches Indien abseits aller Touristenpfade' }
    },
    desc: 'Die größte Flussinsel der Welt im Brahmaputra, ein spirituelles Zentrum des Neo-Vaishnavismus mit jahrhundertealter Maskenkunst und Stammestraditionen'
  },
  {
    id: 'bundi',
    name: 'Bundi',
    lat: 25.4305,
    lng: 75.6499,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Taragarh_Fort,_Bundi',
    highlights: 'Taragarh Fort, Garh Palace, Stufenbrunnen (Raniji Ki Baori), Bundi-Miniaturmalerei, blaue Häuser',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kleine Stadt mit begrenzter Versorgung, aber ruhig und stressfrei im Vergleich zu größeren Städten' },
      '1-3':  { rating: 'yellow', note: 'Steile Fort-Wege herausfordernd, aber die ruhige Altstadt ist entspannt mit Kleinkindern' },
      '3-6':  { rating: 'green', note: 'Stufenbrunnen wie geheimnisvolle Labyrinthe, Fort und Affen beobachten – Abenteuer für Kinder' },
      '6-12': { rating: 'green', note: 'Verlassenes Fort erkunden, Stufenbrunnen entdecken und die blaue Altstadt faszinieren Kinder' },
      '12+':  { rating: 'green', note: 'Unentdecktes Rajasthan-Juwel, Kipling-Atmosphäre und authentische Miniaturmalerei-Tradition' }
    },
    desc: 'Rajasthans bestgehütetes Geheimnis – eine verschlafene Kleinstadt mit einem verfallenden Palast, kunstvollen Stufenbrunnen und der Atmosphäre, die Rudyard Kipling inspirierte',
    dayTripFrom: [{ base: 'jaipur', transit: '~4h Zug/Bus' }]
  }
];
