/* ============================================
   SOUTHAFRICA-DESTINATIONS.JS – Datenbank aller Südafrika-Ziele
   ============================================ */

const SOUTHAFRICA_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'capetown',
    name: 'Kapstadt',
    altName: 'Cape Town',
    lat: -33.9249,
    lng: 18.4241,
    tags: ['Großstadt', 'Kultur', 'Natur'],
    wiki: 'Cape_Town',
    highlights: 'Tafelberg, V&A Waterfront, Kap der Guten Hoffnung, Bo-Kaap, Kirstenbosch',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Erstklassige Infrastruktur, Krankenhäuser und familienfreundliche Hotels' },
      '1-3':  { rating: 'green', note: 'Waterfront, Kirstenbosch und Strände bieten viel für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Aquarium, Pinguine am Boulders Beach und Seilbahn auf Tafelberg' },
      '6-12': { rating: 'green', note: 'Tafelberg, Kap der Guten Hoffnung und Robben Island begeistern' },
      '12+':  { rating: 'green', note: 'Kultur, Geschichte, Strände und Abenteuer – perfekt für Teenager' }
    },
    desc: 'Südafrikas Mutterstadt am Fuße des Tafelbergs, wo Ozean, Weinberge und multikulturelle Lebensfreude aufeinandertreffen'
  },
  {
    id: 'johannesburg',
    name: 'Johannesburg',
    altName: 'Joburg / Jozi',
    lat: -26.2041,
    lng: 28.0473,
    tags: ['Großstadt', 'Geschichte', 'Kultur'],
    wiki: 'Johannesburg',
    highlights: 'Apartheid Museum, Soweto, Constitution Hill, Maboneng Precinct, Cradle of Humankind',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Gute Infrastruktur, aber Sicherheitsbedenken in manchen Stadtteilen' },
      '1-3':  { rating: 'yellow', note: 'Sicherheit beachten, nur in touristischen Vierteln wie Maboneng bewegen' },
      '3-6':  { rating: 'yellow', note: 'Apartheid Museum und Soweto lehrreich, aber Sicherheit beachten' },
      '6-12': { rating: 'yellow', note: 'Apartheid Museum und Cradle of Humankind faszinierend, Vorsicht nötig' },
      '12+':  { rating: 'green', note: 'Bewegende Geschichte, Street Art und Kulinarik beeindrucken Teenager' }
    },
    desc: 'Südafrikas pulsierendes Wirtschaftszentrum mit bewegender Apartheid-Geschichte und einer aufstrebenden Kunst- und Kulinarikszene'
  },
  {
    id: 'kruger',
    name: 'Krüger-Nationalpark',
    altName: 'Kruger National Park',
    lat: -23.9884,
    lng: 31.5547,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Kruger_National_Park',
    highlights: 'Big Five Safari, Selbstfahrer-Routen, Bush Walks, Restcamps, Sonnenaufgangs-Pirschfahrten',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Malariagebiet, lange Autofahrten und Hitze belasten Babys' },
      '1-3':  { rating: 'yellow', note: 'Malariaprophylaxe nötig, Kinder müssen lange still im Auto sitzen' },
      '3-6':  { rating: 'green', note: 'Big Five vom Auto aus, Restcamps mit Pools und Spielplätzen' },
      '6-12': { rating: 'green', note: 'Safari-Abenteuer begeistert Kinder, Tiere direkt am Restcamp' },
      '12+':  { rating: 'green', note: 'Selbstfahrer-Safari, Bush Walks (ab 12) und Fotografie-Paradies' }
    },
    desc: 'Afrikas berühmtester Nationalpark mit den Big Five – ideal für Selbstfahrer-Safaris und unvergessliche Wildtier-Begegnungen'
  },
  {
    id: 'gardenroute',
    name: 'Garden Route',
    altName: 'Gartenroute',
    lat: -33.9587,
    lng: 22.4617,
    tags: ['Natur', 'Abenteuer', 'Erholung'],
    wiki: 'Garden_Route',
    highlights: 'Tsitsikamma, Bloukrans Bungee, Knysna Heads, Plettenberg Bay, Wilderness',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Gute Infrastruktur, milde Temperaturen und familienfreundliche Orte' },
      '1-3':  { rating: 'green', note: 'Strände, Wälder und Wildparks ideal für Kleinkinder im eigenen Tempo' },
      '3-6':  { rating: 'green', note: 'Monkeys Town, Strände und Tsitsikamma-Hängebrücke begeistern' },
      '6-12': { rating: 'green', note: 'Bungee schauen, Canopy Tours und Strand-Abenteuer für Kinder' },
      '12+':  { rating: 'green', note: 'Bloukrans Bungee, Surfkurse und Tsitsikamma-Wanderungen für Teens' }
    },
    desc: 'Südafrikas spektakulärste Küstenstraße zwischen üppigen Wäldern, goldenen Stränden und dramatischen Klippen'
  },
  {
    id: 'stellenbosch',
    name: 'Stellenbosch',
    altName: 'Kap-Weinland',
    lat: -33.9321,
    lng: 18.8602,
    tags: ['Kulinarik', 'Kultur', 'Erholung'],
    wiki: 'Stellenbosch',
    highlights: 'Weinverkostungen, kapholländische Architektur, Gourmet-Restaurants, Spier Wine Farm, Dorf-Spaziergang',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Weinstadt mit guter Infrastruktur und kinderfreundlichen Weingütern' },
      '1-3':  { rating: 'green', note: 'Spier Wine Farm mit Spielplatz, Picknick-Flächen und Tieren' },
      '3-6':  { rating: 'green', note: 'Weingüter mit Spielplätzen und Tieren, gemütliche Spaziergänge' },
      '6-12': { rating: 'green', note: 'Rad fahren, Weinfarm-Tiere und historische Architektur erkunden' },
      '12+':  { rating: 'green', note: 'Genusskultur, kapholländische Architektur und Uni-Stadt-Flair' }
    },
    dayTripFrom: [{ base: 'capetown', transit: '~1h Auto' }]
  },
  {
    id: 'durban',
    name: 'Durban',
    altName: 'eThekwini',
    lat: -29.8587,
    lng: 31.0218,
    tags: ['Großstadt', 'Erholung', 'Kulinarik'],
    wiki: 'Durban',
    highlights: 'Golden Mile Strandpromenade, uShaka Marine World, Victoria Street Market, Bunny Chow, Moses-Mabhida-Stadion',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Warme Strände, gute Infrastruktur und familienfreundliche Promenade' },
      '1-3':  { rating: 'green', note: 'Strandpromenade flach und sicher, uShaka Marine World mit Kinderbecken' },
      '3-6':  { rating: 'green', note: 'uShaka Marine World, warmes Meer und Golden Mile ideal für Kinder' },
      '6-12': { rating: 'green', note: 'Aquarium, Wasserrutschen, Stadion-Seilrutsche und warme Strände' },
      '12+':  { rating: 'green', note: 'Surfen, Street Food und Zulu-Kultur bieten vielfältiges Programm' }
    },
    desc: 'Südafrikas subtropische Küstenmetropole mit indisch-afrikanischer Fusionsküche, warmen Stränden und Zulu-Kultur'
  },
  {
    id: 'drakensberg',
    name: 'Drakensberge',
    altName: 'uKhahlamba',
    lat: -29.1000,
    lng: 29.3500,
    tags: ['Natur', 'Abenteuer', 'Geschichte'],
    wiki: 'Drakensberg',
    highlights: 'Amphitheater, Tugela Falls, San-Felsmalereien (UNESCO), Royal Natal, Wanderungen',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Bergregion mit kühlen Nächten, Wanderwege nicht buggy-tauglich' },
      '1-3':  { rating: 'yellow', note: 'Resorts mit Pools vorhanden, aber Wanderungen für Kleinkinder zu lang' },
      '3-6':  { rating: 'green', note: 'Einfache Wanderungen, Felsmalereien und Bergresorts mit Pools' },
      '6-12': { rating: 'green', note: 'Wanderungen, Reiten und Felsmalereien begeistern aktive Kinder' },
      '12+':  { rating: 'green', note: 'Anspruchsvolle Wanderrouten und UNESCO-Geschichte für Jugendliche' }
    },
    desc: 'Südafrikas mächtigstes Gebirge mit UNESCO-Felsmalereien, spektakulären Wanderrouten und dem zweithöchsten Wasserfall der Welt'
  },
  {
    id: 'hermanus',
    name: 'Hermanus',
    lat: -34.4187,
    lng: 19.2345,
    tags: ['Natur', 'Erholung'],
    wiki: 'Hermanus',
    highlights: 'Walbeobachtung (Juni–Nov), Cliff Path, Grotto Beach, Hemel-en-Aarde-Weintal, Hai-Tauchen',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Wale vom Klippenweg aus beobachten, ruhiger Küstenort mit guter Versorgung' },
      '1-3':  { rating: 'green', note: 'Walbeobachtung vom Land, Strandspaziergang und ruhige Atmosphäre' },
      '3-6':  { rating: 'green', note: 'Wale hautnah von den Klippen sehen, Strand und Cliff Path ideal' },
      '6-12': { rating: 'green', note: 'Walbeobachtung per Boot, Cliff Path und Weintal-Ausflüge' },
      '12+':  { rating: 'green', note: 'Whale Watching, Hai-Tauchen und Weintal bieten Action und Genuss' }
    },
    dayTripFrom: [{ base: 'capetown', transit: '~1.5h Auto' }]
  },
  {
    id: 'knysna',
    name: 'Knysna',
    lat: -34.0356,
    lng: 23.0488,
    tags: ['Natur', 'Kulinarik', 'Erholung'],
    wiki: 'Knysna',
    highlights: 'Knysna Heads, Lagune, Austernfestival, Featherbed Nature Reserve, Garden of Eden',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Lagunenstadt mit guter Infrastruktur und mildem Klima' },
      '1-3':  { rating: 'green', note: 'Lagune zum Planschen, Waterfront mit Spielplatz und Restaurants' },
      '3-6':  { rating: 'green', note: 'Bootsfahrt auf der Lagune, Knysna Heads und Elefantenpark' },
      '6-12': { rating: 'green', note: 'Featherbed Nature Reserve, Lagune und Garden of Eden Wanderung' },
      '12+':  { rating: 'green', note: 'Kayaking, Mountainbiking und Seafood-Genuss für Teenager' }
    },
    desc: 'Malerische Lagunenstadt im Herzen der Garden Route, berühmt für frische Austern und die dramatischen Knysna Heads'
  },
  {
    id: 'addo',
    name: 'Addo Elephant Park',
    lat: -33.4431,
    lng: 25.7681,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Addo_Elephant_National_Park',
    highlights: 'Über 600 Elefanten, malariafreie Safari, Big 7, Selbstfahrer-Routen, Nachtsafari',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Malariafrei, Selbstfahrer-Safari und familienfreundliche Restcamps' },
      '1-3':  { rating: 'green', note: 'Malariafrei, Elefanten vom Auto aus und kindgerechte Camps' },
      '3-6':  { rating: 'green', note: 'Hunderte Elefanten hautnah, Nachtsafari und Spielplätze im Camp' },
      '6-12': { rating: 'green', note: 'Big 7 Safari, Nachtsafari und Elefanten-Erlebnis begeistern' },
      '12+':  { rating: 'green', note: 'Perfekte Familien-Safari ohne Malaria mit großartiger Tierwelt' }
    },
    desc: 'Malariafreier Nationalpark am Eastern Cape mit der dichtesten Elefantenpopulation Afrikas – perfekt für Familien-Safaris'
  },
  {
    id: 'blyderivercanyon',
    name: 'Blyde River Canyon',
    altName: 'Panorama Route',
    lat: -24.5847,
    lng: 30.8119,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Blyde_River_Canyon',
    highlights: 'God\'s Window, Three Rondavels, Bourke\'s Luck Potholes, Panorama Route, Lisbon Falls',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Viele Aussichtspunkte vom Auto aus, aber lange Fahrtage anstrengend' },
      '1-3':  { rating: 'green', note: 'Aussichtspunkte mit kurzen Spaziergängen, Panorama-Fahrten genießen' },
      '3-6':  { rating: 'green', note: 'Bourke\'s Luck Potholes und Wasserfälle faszinieren kleine Entdecker' },
      '6-12': { rating: 'green', note: 'God\'s Window, Three Rondavels und Wasserfälle sind beeindruckend' },
      '12+':  { rating: 'green', note: 'Panorama-Route perfekt zum Fotografieren und Wandern kombinierbar' }
    },
    desc: 'Einer der größten grünen Canyons der Welt mit atemberaubenden Panoramablicken entlang der berühmten Panorama Route'
  },
  {
    id: 'pilanesberg',
    name: 'Pilanesberg',
    altName: 'Sun City',
    lat: -25.2744,
    lng: 27.0849,
    tags: ['Natur', 'Abenteuer', 'Erholung'],
    wiki: 'Pilanesberg_National_Park',
    highlights: 'Big Five Safari, Sun City Resort, malariafreies Gebiet, Hot-Air Ballon, Vulkankrater-Landschaft',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Malariafrei, Sun City Resort mit Baby-Betreuung und Pools' },
      '1-3':  { rating: 'green', note: 'Sun City Wasserpark, malariafrei und komfortable Unterkünfte' },
      '3-6':  { rating: 'green', note: 'Sun City Valley of Waves, Big Five Safari und Ballonfahrt' },
      '6-12': { rating: 'green', note: 'Safari plus Sun City Wasserpark – perfekte Kombination für Kinder' },
      '12+':  { rating: 'green', note: 'Safari, Heißluftballon und Sun City Entertainment begeistern' }
    },
    dayTripFrom: [{ base: 'johannesburg', transit: '~2.5h Auto' }]
  },
  {
    id: 'franschhoek',
    name: 'Franschhoek',
    lat: -33.9100,
    lng: 19.1172,
    tags: ['Kulinarik', 'Kultur', 'Erholung'],
    wiki: 'Franschhoek',
    highlights: 'Wine Tram, Hugenotten-Museum, Gourmet-Hauptstadt, Weinberg-Wanderungen, La Motte',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhiges Weintal, familienfreundliche Weingüter mit Gärten' },
      '1-3':  { rating: 'green', note: 'Wine Tram für Eltern, Weingut-Gärten und Spielplätze für Kleine' },
      '3-6':  { rating: 'green', note: 'Weingüter mit Bauernhoftieren, Spielplätze und Picknick-Optionen' },
      '6-12': { rating: 'green', note: 'Wine Tram Fahrt, Hugenotten-Museum und Weinberg-Wanderungen' },
      '12+':  { rating: 'green', note: 'Gourmet-Kultur, Rad fahren durch Weinberge und Geschichte' }
    },
    dayTripFrom: [
      { base: 'capetown', transit: '~1h Auto' },
      { base: 'stellenbosch', transit: '~30min Auto' }
    ]
  },
  {
    id: 'pretoria',
    name: 'Pretoria',
    altName: 'Tshwane',
    lat: -25.7479,
    lng: 28.2293,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Pretoria',
    highlights: 'Voortrekker Monument, Union Buildings, Jacaranda-Blüte (Okt), Freedom Park, Church Square',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Gute Infrastruktur, Parks und ruhiger als Johannesburg' },
      '1-3':  { rating: 'green', note: 'Parks, Jacaranda-Alleen und Zoo für einen entspannten Tagesausflug' },
      '3-6':  { rating: 'green', note: 'Union Buildings Garten, Zoo und Voortrekker Monument erkunden' },
      '6-12': { rating: 'green', note: 'Freedom Park und Voortrekker Monument vermitteln Geschichte greifbar' },
      '12+':  { rating: 'green', note: 'Südafrikanische Geschichte und Jacaranda-Blüte im Frühling erleben' }
    },
    dayTripFrom: [{ base: 'johannesburg', transit: '~45min Auto/Zug' }]
  },
  {
    id: 'gqeberha',
    name: 'Gqeberha',
    altName: 'Port Elizabeth',
    lat: -33.9608,
    lng: 25.6022,
    tags: ['Erholung', 'Natur', 'Geschichte'],
    wiki: 'Gqeberha',
    highlights: 'Algoa Bay, Boardwalk, Route 67, Sardine Run (Jun), SAMREC Pinguinstation',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Strandstadt mit guter Infrastruktur und warmem Indischem Ozean' },
      '1-3':  { rating: 'green', note: 'Flache Strände, Boardwalk und Pinguin-Station für Kleinkinder' },
      '3-6':  { rating: 'green', note: 'Strand, Boardwalk und SAMREC Pinguinstation begeistern Kinder' },
      '6-12': { rating: 'green', note: 'Strände, Route 67 und nahegelegener Addo Park für Familien-Safari' },
      '12+':  { rating: 'green', note: 'Surfen, Tauchen und als Tor zur Garden Route und Addo Park' }
    },
    desc: 'Die „Freundliche Stadt" am Eastern Cape mit herrlichen Stränden, nahe dem Addo Park und als Tor zur Garden Route'
  },

  // ===== OFF THE BEATEN PATH (8) =====
  {
    id: 'wildcoast',
    name: 'Wild Coast',
    altName: 'Transkei-Küste',
    lat: -31.6300,
    lng: 29.5400,
    tags: ['Natur', 'Abenteuer', 'Kultur'],
    wiki: 'Coffee_Bay',
    highlights: 'Hole in the Wall, Coffee Bay, Bulungula, Wildcoast Hiking Trail, Xhosa-Dörfer',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Abgelegen, schlechte Straßen und keine medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Ungesicherte Klippen, holprige Anfahrt und kaum Infrastruktur' },
      '3-6':  { rating: 'yellow', note: 'Coffee Bay als Basis machbar, aber Wanderungen zu lang für Kleine' },
      '6-12': { rating: 'yellow', note: 'Hole in the Wall und Strände spannend, Xhosa-Kultur bereichernd' },
      '12+':  { rating: 'green', note: 'Wildcoast Hiking, Surfen und authentische Dorf-Erlebnisse' }
    },
    desc: 'Südafrikas ungezähmte Küstenwildnis mit dramatischen Klippen, einsamen Stränden und authentischen Xhosa-Dorfgemeinschaften'
  },
  {
    id: 'isimangaliso',
    name: 'iSimangaliso Wetland Park',
    altName: 'St. Lucia Wetlands',
    lat: -27.8986,
    lng: 32.5500,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'iSimangaliso_Wetland_Park',
    highlights: 'UNESCO-Feuchtgebiet, Hippos in St. Lucia, Schnorcheln in Sodwana Bay, Schildkröten-Nistplätze, Bootsafari',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Malariagebiet, Hippos in der Stadt und Krokodile erfordern Vorsicht' },
      '1-3':  { rating: 'yellow', note: 'Malariaschutz nötig, Hippos nachts auf den Straßen – Vorsicht' },
      '3-6':  { rating: 'green', note: 'Bootssafari zu Hippos und Krokodilen, Schildkröten am Strand' },
      '6-12': { rating: 'green', note: 'Schnorcheln in Sodwana Bay, Hippo-Bootstour und Schildkröten' },
      '12+':  { rating: 'green', note: 'Tauchen, Schildkröten-Nistplätze und einzigartige Feuchtgebiet-Safari' }
    },
    desc: 'UNESCO-Welterbe-Feuchtgebiet an der Küste KwaZulu-Natals, wo Nilpferde durch die Straßen von St. Lucia spazieren'
  },
  {
    id: 'cederberg',
    name: 'Cederberg',
    lat: -32.3700,
    lng: 19.0600,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Cederberg',
    highlights: 'Maltese Cross, Wolfberg Arch, Felsmalereien der San, Sternenbeobachtung, Rooibos-Felder',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Camping und Wandern in der Wildnis, einfache Unterkünfte vorhanden' },
      '1-3':  { rating: 'yellow', note: 'Grundlegende Hütten verfügbar, aber Wanderwege für Kleinkinder zu lang' },
      '3-6':  { rating: 'yellow', note: 'Einfache Wanderungen und Felsformationen spannend, aber abgelegen' },
      '6-12': { rating: 'green', note: 'Klettern, Felsmalereien und Sternenhimmel begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Mehrtägige Wanderungen, Klettern und Astro-Fotografie für Teens' }
    },
    desc: 'Zerklüftete Wildnis nördlich von Kapstadt mit bizarren Felsformationen, uralten San-Malereien und dem besten Sternenhimmel Südafrikas'
  },
  {
    id: 'route62',
    name: 'Route 62',
    lat: -33.5800,
    lng: 20.0500,
    tags: ['Kulinarik', 'Kultur', 'Natur'],
    wiki: 'Route_62_(South_Africa)',
    highlights: 'Montagu, Barrydale, Robertson Wine Valley, Ronnie\'s Sex Shop, Obstfarmen',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Gemütliche Autofahrt mit vielen Stopps, gute Unterkünfte verfügbar' },
      '1-3':  { rating: 'green', note: 'Obstfarmen zum Selbstpflücken und Weinberge mit Spielflächen' },
      '3-6':  { rating: 'green', note: 'Obstfarmen, Weingüter mit Spielplätzen und charmante Kleinstädte' },
      '6-12': { rating: 'green', note: 'Ronnie\'s Sex Shop Fotostopp, Obstfarmen und Karoo-Landschaft' },
      '12+':  { rating: 'green', note: 'Roadtrip-Feeling, lokale Kultur und Weinverkostungen für Teens' }
    },
    desc: 'Südafrikas Antwort auf die Route 66 – eine charmante Nebenstraße durch Weinberge, Obstgärten und verschlafene Kleinstädte der Klein Karoo'
  },
  {
    id: 'karoo',
    name: 'Karoo',
    altName: 'Große Karoo',
    lat: -32.2500,
    lng: 24.5300,
    tags: ['Natur', 'Geschichte', 'Kultur'],
    wiki: 'Karoo',
    highlights: 'Graaff-Reinet, Valley of Desolation, Fossilien, Sternenhimmel, Karoo-Lammfleisch',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen und weite Strecken, aber Gästehäuser komfortabel' },
      '1-3':  { rating: 'yellow', note: 'Lange Autofahrten, aber Karoo-Farmen bieten ruhige Familienzeit' },
      '3-6':  { rating: 'green', note: 'Valley of Desolation und Fossilien begeistern neugierige Kinder' },
      '6-12': { rating: 'green', note: 'Fossilien suchen, Sternenhimmel und Valley of Desolation erkunden' },
      '12+':  { rating: 'green', note: 'Geologie, Sternbeobachtung und die Weite der Karoo beeindrucken' }
    },
    desc: 'Südafrikas weite Halbwüste mit endlosen Horizonten, einem der klarsten Sternenhimmel der Erde und einer Fossiliengeschichte von 250 Millionen Jahren'
  },
  {
    id: 'mapungubwe',
    name: 'Mapungubwe',
    lat: -22.1953,
    lng: 29.2463,
    tags: ['Geschichte', 'Natur'],
    wiki: 'Mapungubwe_National_Park',
    highlights: 'UNESCO-Welterbe, Königsstadt (900–1300 n.Chr.), Zusammenfluss Limpopo & Shashe, Baobab-Bäume, Vogelparadies',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Malariagebiet, extreme Hitze und sehr abgelegen im Norden' },
      '1-3':  { rating: 'red', note: 'Malaria, Hitze und lange Anfahrt – nicht geeignet für Kleinkinder' },
      '3-6':  { rating: 'yellow', note: 'Baobab-Bäume faszinierend, aber Hitze und Malaria beachten' },
      '6-12': { rating: 'yellow', note: 'Archäologie und Baobabs spannend, Malariaprophylaxe erforderlich' },
      '12+':  { rating: 'green', note: 'Faszinierende Königsstadt-Geschichte und Drei-Länder-Eck erleben' }
    },
    desc: 'UNESCO-Welterbe an der Grenze zu Botswana und Simbabwe, wo Südafrikas ältestes Königreich inmitten uralter Baobab-Bäume verborgen liegt'
  },
  {
    id: 'dehoop',
    name: 'De Hoop',
    lat: -34.4500,
    lng: 20.5300,
    tags: ['Natur', 'Erholung'],
    wiki: 'De_Hoop_Nature_Reserve',
    highlights: 'Walbeobachtung, weiße Sanddünen, Whale Trail Wanderung, Fynbos, Vlei',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen, Schotterstraße und einfache Unterkünfte im Reservat' },
      '1-3':  { rating: 'yellow', note: 'Schotterpiste und eingeschränkte Infrastruktur, aber ruhig und sicher' },
      '3-6':  { rating: 'green', note: 'Weiße Dünen, Wale vom Strand und Fynbos-Wanderungen für Kinder' },
      '6-12': { rating: 'green', note: 'Walbeobachtung, Dünen und Vlei-Vogelwelt sind Naturerlebnisse pur' },
      '12+':  { rating: 'green', note: 'Whale Trail Wanderung und unberührte Natur für Naturliebhaber' }
    },
    desc: 'Unberührtes Naturreservat am Overberg mit schneeweißen Dünen, einem der besten Whale Trails Afrikas und einzigartiger Fynbos-Vegetation'
  },
  {
    id: 'oudtshoorn',
    name: 'Oudtshoorn',
    altName: 'Klein Karoo',
    lat: -33.5929,
    lng: 22.2019,
    tags: ['Natur', 'Abenteuer', 'Kultur'],
    wiki: 'Oudtshoorn',
    highlights: 'Cango Caves, Straußenfarmen, Swartberg Pass, Meerkat Adventures, Cango Wildlife Ranch',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Kleinstadt mit guter Versorgung und kurzen Ausflugswegen' },
      '1-3':  { rating: 'green', note: 'Straußenfarmen und Meerkat Adventures begeistern schon Kleine' },
      '3-6':  { rating: 'green', note: 'Strauße reiten, Erdmännchen und Cango Caves Standard-Tour ideal' },
      '6-12': { rating: 'green', note: 'Cango Caves, Strauße, Erdmännchen und Swartberg Pass erkunden' },
      '12+':  { rating: 'green', note: 'Abenteuer-Tour in Cango Caves und Swartberg Pass für Teens' }
    },
    desc: 'Die Straußenhauptstadt der Welt in der Klein Karoo, Tor zu den spektakulären Cango-Tropfsteinhöhlen und dem historischen Swartberg-Pass'
  }
];
