/* ============================================
   AUSTRALIA-DESTINATIONS.JS – Datenbank aller Australien-Ziele
   ============================================ */

const AUSTRALIA_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'sydney',
    name: 'Sydney',
    lat: -33.8688,
    lng: 151.2093,
    tags: ['Großstadt', 'Kultur', 'Kulinarik'],
    wiki: 'Sydney',
    highlights: 'Opera House, Harbour Bridge, Bondi Beach, The Rocks, Royal Botanic Garden',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Erstklassige Infrastruktur, Parks, Strände und Krankenhäuser' },
      '1-3':  { rating: 'green', note: 'Botanic Garden, Taronga Zoo und Fähren begeistern Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Zoo, Aquarium, Bondi Beach und Harbour Bridge Spaziergang' },
      '6-12': { rating: 'green', note: 'Opera House, Bridge Climb (ab 8) und Bondi-Coogee Walk' },
      '12+':  { rating: 'green', note: 'Kultur, Strände, Surfen und Weltstadt-Erlebnis für Teenager' }
    },
    desc: 'Australiens schillernde Hafenmetropole mit der ikonischen Oper, goldenen Stränden und einer der schönsten Buchten der Welt'
  },
  {
    id: 'melbourne',
    name: 'Melbourne',
    lat: -37.8136,
    lng: 144.9631,
    tags: ['Großstadt', 'Kultur', 'Kulinarik'],
    wiki: 'Melbourne',
    highlights: 'Laneways & Street Art, Federation Square, Melbourne Cricket Ground, Queen Victoria Market, St. Kilda',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ausgezeichnete Infrastruktur, Parks und kinderfreundliche Cafés' },
      '1-3':  { rating: 'green', note: 'Melbourne Museum, Spielplätze und St. Kilda Pinguine am Pier' },
      '3-6':  { rating: 'green', note: 'Scienceworks, Pinguine, Street Art und Queen Victoria Market' },
      '6-12': { rating: 'green', note: 'Cricket Ground, Street Art Tour und Melbourne Museum begeistern' },
      '12+':  { rating: 'green', note: 'Laneways, Kaffeekultur und Sportstadt-Erlebnis für Teenager' }
    },
    desc: 'Australiens Kulturhauptstadt mit versteckten Gassen voller Street Art, erstklassiger Kaffeekultur und einem pulsierenden Food-Universum'
  },
  {
    id: 'cairns',
    name: 'Cairns / Great Barrier Reef',
    altName: 'Port Douglas',
    lat: -16.9186,
    lng: 145.7781,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Cairns',
    highlights: 'Great Barrier Reef, Schnorcheln & Tauchen, Kuranda Scenic Railway, Green Island, Esplanade Lagoon',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Tropisches Klima heiß, Bootstouren zum Riff mit Baby anstrengend' },
      '1-3':  { rating: 'yellow', note: 'Esplanade Lagoon gut zum Planschen, aber Riff-Ausflüge zu lang' },
      '3-6':  { rating: 'green', note: 'Esplanade Lagoon, Kuranda-Bahn und Green Island für Familien' },
      '6-12': { rating: 'green', note: 'Schnorcheln am Riff (ab 6+), Kuranda Railway und Regenwald' },
      '12+':  { rating: 'green', note: 'Tauchen lernen, Great Barrier Reef und Daintree erkunden' }
    },
    desc: 'Tor zum Great Barrier Reef – dem größten lebenden Organismus der Erde – mit tropischem Regenwald direkt an der Küste'
  },
  {
    id: 'uluru',
    name: 'Uluru / Kata Tjuta',
    altName: 'Ayers Rock',
    lat: -25.3444,
    lng: 131.0369,
    tags: ['Natur', 'Kultur', 'Geschichte'],
    wiki: 'Uluru',
    highlights: 'Uluru (Ayers Rock), Kata Tjuta (Olgas), Field of Light, Aboriginal-Kultur, Wüstensonnenuntergang',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Extreme Hitze im Sommer, abgelegen und wenig Schatten am Monolith' },
      '1-3':  { rating: 'yellow', note: 'Wüstenhitze und Fliegen, Sonnenuntergang spät für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Field of Light magisch, Basiswanderung und Aboriginal-Kultur' },
      '6-12': { rating: 'green', note: 'Uluru-Umrundung, Kata Tjuta und Field of Light begeistern' },
      '12+':  { rating: 'green', note: 'Spirituelle Stätte, Aboriginal-Kultur und Wüsten-Erlebnis' }
    },
    desc: 'Australiens spirituelles Herz – ein 600 Millionen Jahre alter Monolith, der bei Sonnenuntergang in allen Rottönen leuchtet'
  },
  {
    id: 'brisbane',
    name: 'Brisbane',
    lat: -27.4698,
    lng: 153.0251,
    tags: ['Großstadt', 'Kultur', 'Erholung'],
    wiki: 'Brisbane',
    highlights: 'South Bank Parklands, Lone Pine Koala Sanctuary, Story Bridge, Moreton Island, GOMA',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'South Bank mit Strandlagune, gute Infrastruktur und mildes Klima' },
      '1-3':  { rating: 'green', note: 'Lone Pine Koala Sanctuary, South Bank Lagune und Parks ideal' },
      '3-6':  { rating: 'green', note: 'Koalas kuscheln, South Bank Spielplatz und Fähren auf dem Fluss' },
      '6-12': { rating: 'green', note: 'Koala Sanctuary, GOMA Museum und Moreton Island Abenteuer' },
      '12+':  { rating: 'green', note: 'Story Bridge Climb, Moreton Island und entspannter Lifestyle' }
    },
    desc: 'Subtropische Flussstadt mit ganzjährigem Sonnenschein, Koala-Begegnungen und einem entspannten Outdoor-Lifestyle'
  },
  {
    id: 'goldcoast',
    name: 'Gold Coast',
    lat: -28.0167,
    lng: 153.4000,
    tags: ['Erholung', 'Abenteuer', 'Natur'],
    wiki: 'Gold_Coast,_Queensland',
    highlights: 'Surfers Paradise, Themenparks (Dreamworld, Movie World), Springbrook National Park, Currumbin Wildlife Sanctuary, Burleigh Heads',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Flache Strände, familienfreundliche Hotels und milde Temperaturen' },
      '1-3':  { rating: 'green', note: 'Currumbin Wildlife Sanctuary mit Tieren, flache Strandabschnitte' },
      '3-6':  { rating: 'green', note: 'Themenparks (Dreamworld, Movie World), Strand und Tierbegegnungen' },
      '6-12': { rating: 'green', note: 'Themenparks, Surfen lernen und Springbrook Regenwald erkunden' },
      '12+':  { rating: 'green', note: 'Surfen, Themenparks und Regenwald-Hinterland begeistern Teens' }
    },
    dayTripFrom: [{ base: 'brisbane', transit: '~1.5h Auto/Zug' }]
  },
  {
    id: 'hobart',
    name: 'Hobart / Tasmanien',
    lat: -42.8821,
    lng: 147.3272,
    tags: ['Natur', 'Kultur', 'Kulinarik'],
    wiki: 'Hobart',
    highlights: 'MONA Museum, Salamanca Market, Mount Wellington, Cradle Mountain, Port Arthur',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Stadt mit guter Infrastruktur und gemäßigtem Klima' },
      '1-3':  { rating: 'green', note: 'Salamanca Market, Parks und kurze Autofahrten zu Natur' },
      '3-6':  { rating: 'green', note: 'MONA Museum interaktiv, Cradle Mountain und Tierbegegnungen' },
      '6-12': { rating: 'green', note: 'MONA, Port Arthur Geschichte und Tasmanische Teufel erleben' },
      '12+':  { rating: 'green', note: 'MONA Museum, Wanderungen und Gourmet-Szene beeindrucken Teens' }
    },
    desc: 'Tasmaniens charmante Hauptstadt am Fuße des Mount Wellington, mit Weltklasse-Museum, Wildnis und der besten Whisky- und Gourmetszene Australiens'
  },
  {
    id: 'perth',
    name: 'Perth',
    lat: -31.9505,
    lng: 115.8605,
    tags: ['Großstadt', 'Erholung', 'Natur'],
    wiki: 'Perth',
    highlights: 'Kings Park, Cottesloe Beach, Fremantle, Swan Valley Winelands, Perth Mint',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Sonnige Stadt mit Parks, Stränden und erstklassiger Infrastruktur' },
      '1-3':  { rating: 'green', note: 'Kings Park Spielplatz, Cottesloe Beach und Fremantle erkunden' },
      '3-6':  { rating: 'green', note: 'Perth Zoo, Kings Park und Rottnest Island Quokkas als Highlight' },
      '6-12': { rating: 'green', note: 'Quokka-Selfies auf Rottnest, Strände und Perth Mint entdecken' },
      '12+':  { rating: 'green', note: 'Surfen, Fremantle und Rottnest Island für entspannte Teenager' }
    },
    desc: 'Australiens sonnigste Großstadt an der Westküste, mit entspannten Stränden, dem hippen Hafenviertel Fremantle und endloser Weite'
  },
  {
    id: 'adelaide',
    name: 'Adelaide',
    lat: -34.9285,
    lng: 138.6007,
    tags: ['Kultur', 'Kulinarik', 'Erholung'],
    wiki: 'Adelaide',
    highlights: 'Barossa Valley, Adelaide Central Market, Glenelg Beach, Adelaide Oval, Hahndorf',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Entspannte Stadt mit Parks, Central Market und guter Infrastruktur' },
      '1-3':  { rating: 'green', note: 'Central Market, Glenelg Beach und Hahndorf zum Bummeln' },
      '3-6':  { rating: 'green', note: 'Adelaide Zoo, Glenelg Beach und Hahndorf mit deutschen Kuchen' },
      '6-12': { rating: 'green', note: 'Adelaide Oval Tour, Barossa Valley und Haigh\'s Schokoladenfabrik' },
      '12+':  { rating: 'green', note: 'Festivals, Weinregion und Kulinarik für genussfreudige Teenager' }
    },
    desc: 'Australiens genussvolle Festivalstadt, umgeben von Weltklasse-Weinregionen, deutschen Siedlerdörfern und mediterranem Flair'
  },
  {
    id: 'kangarooisland',
    name: 'Kangaroo Island',
    lat: -35.7752,
    lng: 137.2142,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Kangaroo_Island',
    highlights: 'Remarkable Rocks, Seal Bay, Flinders Chase National Park, Kängurus & Koalas, Honigfarm',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Fähre komfortabel, Wildtiere vom Auto aus beobachtbar' },
      '1-3':  { rating: 'green', note: 'Seelöwen am Strand, Kängurus und Koalas direkt am Weg' },
      '3-6':  { rating: 'green', note: 'Remarkable Rocks klettern, Seal Bay und Honigfarm besuchen' },
      '6-12': { rating: 'green', note: 'Seelöwen hautnah, Remarkable Rocks und Wildtier-Begegnungen' },
      '12+':  { rating: 'green', note: 'Natur-Fotografie, Wanderungen und einzigartiges Ökosystem' }
    },
    dayTripFrom: [{ base: 'adelaide', transit: '~2.5h Fähre + Auto' }]
  },
  {
    id: 'bluemountains',
    name: 'Blue Mountains',
    lat: -33.7150,
    lng: 150.3120,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Blue_Mountains_(New_South_Wales)',
    highlights: 'Three Sisters, Scenic World, Jenolan Caves, Katoomba, Wanderwege durch Eukalyptuswälder',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Scenic World Seilbahn und Aussichtspunkte mit Baby gut machbar' },
      '1-3':  { rating: 'green', note: 'Scenic World mit Bahn und Skyway, Three Sisters vom Aussichtspunkt' },
      '3-6':  { rating: 'green', note: 'Scenic World Rides, Jenolan Caves Tour und kurze Wanderungen' },
      '6-12': { rating: 'green', note: 'Wanderwege, Scenic Railway und Jenolan Caves begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Anspruchsvolle Wanderungen durch Eukalyptuswälder und Schluchten' }
    },
    dayTripFrom: [{ base: 'sydney', transit: '~2h Zug/Auto' }]
  },
  {
    id: 'greatoceanroad',
    name: 'Great Ocean Road',
    lat: -38.6624,
    lng: 143.1045,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Great_Ocean_Road',
    highlights: 'Twelve Apostles, Loch Ard Gorge, Bells Beach, Otway Rainforest, London Arch',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Aussichtspunkte vom Auto aus, viele Stopps zum Stillen und Wickeln' },
      '1-3':  { rating: 'green', note: 'Twelve Apostles vom Aussichtspunkt, Koalas im Otway Rainforest' },
      '3-6':  { rating: 'green', note: 'Koalas, Twelve Apostles und kurze Regenwald-Spaziergänge' },
      '6-12': { rating: 'green', note: 'Twelve Apostles, Otway Treetop Walk und Loch Ard Gorge' },
      '12+':  { rating: 'green', note: 'Bells Beach surfen, Regenwald-Walks und Küsten-Fotografie' }
    },
    dayTripFrom: [{ base: 'melbourne', transit: '~2.5h Auto' }]
  },
  {
    id: 'daintree',
    name: 'Daintree Rainforest',
    lat: -16.2500,
    lng: 145.4185,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Daintree_Rainforest',
    highlights: 'Cape Tribulation, Mossman Gorge, Krokodil-Flussfahrt, Nachtwanderungen, Regenwald trifft Riff',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Tropische Hitze, Krokodile an Stränden und einfache Unterkünfte' },
      '1-3':  { rating: 'yellow', note: 'Krokodil-Warnschilder am Strand, Mossman Gorge mit Kleinkind ok' },
      '3-6':  { rating: 'green', note: 'Krokodil-Flussfahrt, Mossman Gorge und Regenwald-Boardwalks' },
      '6-12': { rating: 'green', note: 'Krokodile, Regenwald-Wanderungen und Cape Tribulation Strand' },
      '12+':  { rating: 'green', note: 'Nachtwanderungen, Krokodile und Regenwald-trifft-Riff-Erlebnis' }
    },
    dayTripFrom: [{ base: 'cairns', transit: '~2h Auto' }]
  },
  {
    id: 'darwin',
    name: 'Darwin',
    lat: -12.4634,
    lng: 130.8456,
    tags: ['Kultur', 'Natur', 'Abenteuer'],
    wiki: 'Darwin,_Northern_Territory',
    highlights: 'Mindil Beach Sunset Market, Crocosaurus Cove, Museum of NT, Litchfield National Park, WWII-Geschichte',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Tropische Hitze und Krokodile überall, aber gute Stadt-Infrastruktur' },
      '1-3':  { rating: 'green', note: 'Crocosaurus Cove, Mindil Beach Market und Strandlagune' },
      '3-6':  { rating: 'green', note: 'Krokodil-Park, Mindil Market und Litchfield Wasserlöcher' },
      '6-12': { rating: 'green', note: 'Crocosaurus Cove, Litchfield Park und WWII-Geschichte' },
      '12+':  { rating: 'green', note: 'Outback-Erlebnis, Krokodile und tropische Sunset Markets' }
    },
    desc: 'Tropische Outback-Hauptstadt im Top End, mit spektakulären Sonnenuntergängen, Krokodilen und dem Tor zu Kakadu und Litchfield'
  },
  {
    id: 'whitsundays',
    name: 'Whitsunday Islands',
    lat: -20.2294,
    lng: 148.9556,
    tags: ['Erholung', 'Natur', 'Abenteuer'],
    wiki: 'Whitsunday_Islands',
    highlights: 'Whitehaven Beach, Heart Reef, Segeltörns, Hill Inlet Lookout, Great Barrier Reef Schnorcheln',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Segeltörns und Bootstouren mit Baby anstrengend und schaukelig' },
      '1-3':  { rating: 'yellow', note: 'Whitehaven Beach wunderschön, aber Bootsfahrten lang für Kleine' },
      '3-6':  { rating: 'green', note: 'Whitehaven Beach zum Spielen, Hill Inlet Lookout und Schnorcheln' },
      '6-12': { rating: 'green', note: 'Schnorcheln am Riff, Whitehaven Beach und Segeltörns' },
      '12+':  { rating: 'green', note: 'Segeltörn, Tauchen und Heart Reef Helikopter-Flug unvergesslich' }
    },
    desc: '74 tropische Inseln mit dem blendend weißen Whitehaven Beach, türkisem Wasser und dem herzförmigen Heart Reef aus der Luft'
  },

  // ===== OFF THE BEATEN PATH (8) =====
  {
    id: 'ningaloo',
    name: 'Ningaloo Reef',
    lat: -22.6956,
    lng: 113.6800,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Ningaloo_Reef',
    highlights: 'Walhai-Schwimmen, Schnorcheln vom Strand, Mantarochen, Cape Range National Park, Turquoise Bay',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen, aber ruhige Strände und komfortable Holiday Parks' },
      '1-3':  { rating: 'yellow', note: 'Turquoise Bay zum Planschen, Walhai-Touren erst für Ältere' },
      '3-6':  { rating: 'green', note: 'Schnorcheln direkt vom Strand, Schildkröten und Cape Range Park' },
      '6-12': { rating: 'green', note: 'Schnorcheln am Riff, Schildkröten und Mantarochen erleben' },
      '12+':  { rating: 'green', note: 'Walhai-Schwimmen (ab 12+), Mantarochen und Weltklasse-Schnorcheln' }
    },
    desc: 'Australiens bestgehütetes Geheimnis – ein UNESCO-Riff direkt am Strand, wo man neben Walhaien und Mantarochen schwimmt'
  },
  {
    id: 'kakadu',
    name: 'Kakadu National Park',
    lat: -13.0000,
    lng: 132.3833,
    tags: ['Natur', 'Geschichte', 'Kultur'],
    wiki: 'Kakadu_National_Park',
    highlights: 'Aboriginal-Felskunst (Ubirr, Nourlangie), Jim Jim Falls, Yellow Water Billabong, Salzwasserkrokodile, Wetlands',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Hitze und Krokodile erfordern Vorsicht, aber Fahrten vom Auto aus' },
      '1-3':  { rating: 'yellow', note: 'Krokodilgefahr am Wasser, Yellow Water Cruise vom Boot sicher' },
      '3-6':  { rating: 'green', note: 'Felsmalereien, Krokodil-Bootstour und Billabong-Vögel faszinieren' },
      '6-12': { rating: 'green', note: 'Aboriginal-Kunst, Wasserfälle und Krokodil-Bootsfahrten spannend' },
      '12+':  { rating: 'green', note: '40.000 Jahre alte Kunst, Schwimmlöcher und Outback-Erlebnis' }
    },
    dayTripFrom: [{ base: 'darwin', transit: '~3h Auto' }]
  },
  {
    id: 'kimberley',
    name: 'Kimberley',
    altName: 'Broome & Bungle Bungles',
    lat: -17.9644,
    lng: 125.3176,
    tags: ['Natur', 'Abenteuer', 'Kultur'],
    wiki: 'Purnululu_National_Park',
    highlights: 'Bungle Bungle Range (Purnululu), Cable Beach Broome, Horizontal Falls, Gibb River Road, El Questro',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extreme Abgelegenheit, Allrad-Pflicht und keine Baby-Versorgung' },
      '1-3':  { rating: 'red', note: 'Gibb River Road und Hitze zu extrem für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Broome mit Cable Beach ok, Bungle Bungles per Helikopter machbar' },
      '6-12': { rating: 'yellow', note: 'Cable Beach und Bungle Bungles faszinierend, lange Fahrten nötig' },
      '12+':  { rating: 'green', note: 'Ultimatives Outback-Abenteuer mit Schluchten und Wüste' }
    },
    desc: 'Australiens letzte große Wildnis – eine Region so groß wie Deutschland mit den gestreiften Bienenkorbfelsen der Bungle Bungles und dramatischen Schluchten'
  },
  {
    id: 'flindersranges',
    name: 'Flinders Ranges',
    lat: -31.3300,
    lng: 138.6300,
    tags: ['Natur', 'Geschichte', 'Abenteuer'],
    wiki: 'Flinders_Ranges',
    highlights: 'Wilpena Pound, Aboriginal-Felskunst, Wandern, Fossilien, Prairie Hotel',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Lange Anfahrt und Outback-Hitze, aber Wilpena Pound Resort ok' },
      '1-3':  { rating: 'yellow', note: '5 Stunden Fahrt lang, aber Resort mit Pool und kurzen Walks' },
      '3-6':  { rating: 'green', note: 'Fossilien suchen, Kängurus und kurze Wanderungen um Wilpena Pound' },
      '6-12': { rating: 'green', note: 'Fossilien, Aboriginal-Kunst und Wilpena Pound Wanderungen' },
      '12+':  { rating: 'green', note: 'Geologie, Wanderungen und Outback-Erlebnis beeindrucken Teens' }
    },
    dayTripFrom: [{ base: 'adelaide', transit: '~5h Auto' }]
  },
  {
    id: 'lordhowe',
    name: 'Lord Howe Island',
    lat: -31.5553,
    lng: 159.0821,
    tags: ['Natur', 'Erholung'],
    wiki: 'Lord_Howe_Island',
    highlights: 'Mount Gower Trek, Neds Beach Fischfütterung, Weltklasse-Tauchen, Balls Pyramid, max. 400 Besucher',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Ruhige Insel mit sauberer Natur, aber begrenzte Baby-Versorgung' },
      '1-3':  { rating: 'green', note: 'Neds Beach Fischfütterung, ruhige Buchten und autofreie Wege' },
      '3-6':  { rating: 'green', note: 'Fische füttern, Radfahren und Korallen am Strand entdecken' },
      '6-12': { rating: 'green', note: 'Schnorcheln, Radfahren und nachhaltige Insel erleben' },
      '12+':  { rating: 'green', note: 'Mount Gower Trek, Tauchen und exklusives Insel-Erlebnis' }
    },
    desc: 'UNESCO-Paradies im Pazifik mit nur 400 Besuchern gleichzeitig – eine der nachhaltigsten Inseln der Welt mit dem südlichsten Korallenriff'
  },
  {
    id: 'rottnest',
    name: 'Rottnest Island',
    altName: 'Wadjemup',
    lat: -32.0067,
    lng: 115.5124,
    tags: ['Natur', 'Erholung'],
    wiki: 'Rottnest_Island',
    highlights: 'Quokka-Selfies, Radfahren, Schnorcheln, The Basin, Pinky Beach',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Autofreie Insel, kurze Fähre und flache Buchten zum Planschen' },
      '1-3':  { rating: 'green', note: 'Quokkas überall, flache Strände und Fahrrad mit Kindersitz' },
      '3-6':  { rating: 'green', note: 'Quokka-Selfies, Schnorcheln in The Basin und Radfahren' },
      '6-12': { rating: 'green', note: 'Radtour um die Insel, Schnorcheln und Quokka-Abenteuer' },
      '12+':  { rating: 'green', note: 'Rad, Schnorcheln und die berühmtesten Selfies Australiens' }
    },
    dayTripFrom: [{ base: 'perth', transit: '~30min Fähre' }]
  },
  {
    id: 'cooperpedy',
    name: 'Coober Pedy',
    lat: -29.0135,
    lng: 134.7544,
    tags: ['Kultur', 'Abenteuer', 'Geschichte'],
    wiki: 'Coober_Pedy',
    highlights: 'Unterirdische Wohnungen, Opalminen, Mondlandschaft, unterirdische Kirchen, Breakaways',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extreme Wüstenhitze, offene Minenschächte und keine Baby-Infrastruktur' },
      '1-3':  { rating: 'red', note: 'Gefährliche Minenschächte, extreme Hitze und isolierte Wüstenstadt' },
      '3-6':  { rating: 'yellow', note: 'Unterirdische Wohnungen faszinierend, aber Hitze und Schächte beachten' },
      '6-12': { rating: 'green', note: 'Unterirdische Kirchen und Häuser sind ein einzigartiges Erlebnis' },
      '12+':  { rating: 'green', note: 'Opalsuche, unterirdische Stadt und Mondlandschaft beeindrucken' }
    },
    desc: 'Opal-Hauptstadt der Welt, wo die Bewohner unter der Erde leben – eine surreale Wüstenstadt mit unterirdischen Kirchen, Hotels und Häusern'
  },
  {
    id: 'margaretriver',
    name: 'Margaret River',
    lat: -33.9540,
    lng: 115.0750,
    tags: ['Kulinarik', 'Natur', 'Erholung'],
    wiki: 'Margaret_River,_Western_Australia',
    highlights: 'Weltklasse-Weingüter, Mammoth Cave, Surfen, Gourmet-Restaurants, Wildblumen',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Weingut-Gärten, mildes Klima und gute Unterkünfte' },
      '1-3':  { rating: 'green', note: 'Weingut-Gärten mit Spielflächen, kurze Strände und Farmbesuche' },
      '3-6':  { rating: 'green', note: 'Mammoth Cave, Schokoladenfabriken und Strand für Kinder' },
      '6-12': { rating: 'green', note: 'Höhlen erkunden, Surfen lernen und Farmbesuche genießen' },
      '12+':  { rating: 'green', note: 'Surfen, Höhlen und Farm-to-Table-Genuss für Teenager' }
    },
    dayTripFrom: [{ base: 'perth', transit: '~3h Auto' }]
  }
];
