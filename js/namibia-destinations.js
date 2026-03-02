/* ============================================
   NAMIBIA-DESTINATIONS.JS – Datenbank aller Namibia-Ziele
   ============================================ */

const NAMIBIA_DESTINATIONS = [
  // ===== HAUPTZIELE (15) =====
  {
    id: 'windhoek',
    name: 'Windhoek',
    lat: -22.5609,
    lng: 17.0658,
    tags: ['Großstadt', 'Kultur', 'Geschichte'],
    wiki: 'Windhoek',
    highlights: 'Christuskirche, Alte Feste, Independence Avenue, Craft Centre, Joe\'s Beerhouse',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Gute Infrastruktur, Krankenhäuser, Supermärkte und angenehmes Klima' },
      '1-3':  { rating: 'green', note: 'Craft Centre, Parks und Restaurants mit guter Ausstattung für Familien' },
      '3-6':  { rating: 'green', note: 'Zoo, Craft Centre und Independence Avenue bieten Abwechslung' },
      '6-12': { rating: 'green', note: 'Museen, Geschichte und Kultur gut vermittelbar als Reise-Einstieg' },
      '12+':  { rating: 'green', note: 'Kolonialgeschichte, Märkte und gute Restaurants für Jugendliche' }
    },
    desc: 'Namibias gemütliche Hauptstadt im Hochland, wo deutsche Kolonialarchitektur auf afrikanische Lebensfreude trifft'
  },
  {
    id: 'sossusvlei',
    name: 'Sossusvlei',
    altName: 'Namib-Sandmeer',
    lat: -24.7275,
    lng: 15.3417,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Sossusvlei',
    highlights: 'Düne 45, Deadvlei, Big Daddy, Sesriem Canyon, Sternenbeobachtung',
    family: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extreme Hitze, Sand und keine Schatten – für Babys gefährlich' },
      '1-3':  { rating: 'red', note: 'Wüstenhitze, Sandstürme und lange Autofahrten zu belastend' },
      '3-6':  { rating: 'yellow', note: 'Sesriem Canyon machbar, Dünen nur früh morgens wenn es kühl ist' },
      '6-12': { rating: 'green', note: 'Düne 45 und Deadvlei begeistern, früher Aufbruch vor der Hitze nötig' },
      '12+':  { rating: 'green', note: 'Big Daddy besteigen und Sternenhimmel erleben – unvergesslich' }
    },
    desc: 'Die höchsten Sanddünen der Welt in surrealer Wüstenlandschaft – Namibias ikonischstes Naturwunder'
  },
  {
    id: 'etosha',
    name: 'Etosha-Nationalpark',
    lat: -18.8556,
    lng: 16.3293,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Etosha_National_Park',
    highlights: 'Beleuchtete Wasserlöcher, Big Five, Etosha-Salzpfanne, Selbstfahrer-Safari',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Lange Fahrten in der Hitze, aber beleuchtete Wasserlöcher vom Camp aus' },
      '1-3':  { rating: 'yellow', note: 'Im Auto-Safari machbar, aber Hitze und Staubpisten anstrengend' },
      '3-6':  { rating: 'green', note: 'Tiere vom Auto aus beobachten, beleuchtete Wasserlöcher abends magisch' },
      '6-12': { rating: 'green', note: 'Selbstfahrer-Safari begeistert Kinder, Big Five hautnah erleben' },
      '12+':  { rating: 'green', note: 'Safari-Abenteuer mit Tierbeobachtung und Fotografie unvergesslich' }
    },
    desc: 'Namibias Premier-Wildreservat mit riesiger Salzpfanne, ideal für Selbstfahrer-Safaris an beleuchteten Wasserlöchern'
  },
  {
    id: 'swakopmund',
    name: 'Swakopmund',
    lat: -22.6784,
    lng: 14.5269,
    tags: ['Kultur', 'Abenteuer', 'Erholung'],
    wiki: 'Swakopmund',
    highlights: 'Jugendstil-Architektur, Sandboarding, Quadbiking, Küstenpromenade, Brauhaus',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Mildes Küstenklima, gute Infrastruktur und deutsche Apotheken' },
      '1-3':  { rating: 'green', note: 'Promenade, Spielplätze und kinderfreundliche Restaurants vorhanden' },
      '3-6':  { rating: 'green', note: 'Aquarium, Strand und Sandburgen bauen zwischen Wüste und Meer' },
      '6-12': { rating: 'green', note: 'Sandboarding, Quadbiken und Robben-Bootstouren begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Abenteuer-Aktivitäten, Brauhaus-Kultur und Küsten-Atmosphäre top' }
    },
    desc: 'Charmante Küstenstadt mit deutscher Kolonialarchitektur, wo die Namib-Dünen auf den Atlantik treffen'
  },
  {
    id: 'fishrivercanyon',
    name: 'Fish River Canyon',
    lat: -27.5922,
    lng: 17.5842,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Fish_River_Canyon',
    highlights: 'Zweitgrößter Canyon der Welt, Mehrtageswanderung, Aussichtspunkte, Ai-Ais Hot Springs',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extreme Hitze, keine Schatten und Absturzgefahr an den Klippen' },
      '1-3':  { rating: 'red', note: 'Ungesicherte Canyon-Kanten, Hitze und lange Anfahrt zu gefährlich' },
      '3-6':  { rating: 'yellow', note: 'Aussichtspunkte machbar, aber Kinder unbedingt festhalten am Rand' },
      '6-12': { rating: 'yellow', note: 'Beeindruckende Aussichten, Mehrtageswanderung erst ab 12 erlaubt' },
      '12+':  { rating: 'green', note: 'Canyon-Wanderung (ab 12) und Ai-Ais Hot Springs belohnen den Trip' }
    },
    desc: 'Afrikas größter Canyon – 160 km lang, 550 m tief, ein geologisches Meisterwerk von atemberaubender Weite'
  },
  {
    id: 'skeletoncoast',
    name: 'Skeleton Coast',
    altName: 'Skelettküste',
    lat: -20.2000,
    lng: 13.2000,
    tags: ['Natur', 'Abenteuer', 'Geschichte'],
    wiki: 'Skeleton_Coast',
    highlights: 'Schiffswracks, Robbenkolonien, Wüste-trifft-Meer, Walschädel, Cape Cross',
    family: false,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem abgelegen, keine Infrastruktur und raues Küstenklima' },
      '1-3':  { rating: 'red', note: 'Isolierte Küste ohne jegliche Versorgung, Wind und Kälte' },
      '3-6':  { rating: 'yellow', note: 'Cape Cross Robbenkolonie als Tagesausflug machbar, Geruch intensiv' },
      '6-12': { rating: 'yellow', note: 'Schiffswracks und Robben faszinierend, aber wenig Komfort unterwegs' },
      '12+':  { rating: 'green', note: 'Gespenstische Atmosphäre und raue Natur beeindrucken Teenager' }
    },
    desc: 'Gespenstische Nebelküste mit Schiffswracks und Robbenkolonien, wo die älteste Wüste der Welt den Atlantik berührt'
  },
  {
    id: 'damaraland',
    name: 'Damaraland',
    lat: -20.5083,
    lng: 14.5750,
    tags: ['Natur', 'Kultur', 'Geschichte'],
    wiki: 'Damaraland',
    highlights: 'Twyfelfontein-Felsgravuren (UNESCO), Wüstenelefanten, Versteinerter Wald, Orgelpfeifen',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Lange Schotterpisten, Hitze und kaum Versorgung unterwegs' },
      '1-3':  { rating: 'yellow', note: 'Holprige Anfahrt und Hitze anstrengend, Lodges oft gut ausgestattet' },
      '3-6':  { rating: 'green', note: 'Wüstenelefanten suchen und Felsen bestaunen begeistert kleine Kinder' },
      '6-12': { rating: 'green', note: 'Felsgravuren, Wüstenelefanten und versteinerte Bäume faszinieren' },
      '12+':  { rating: 'green', note: 'UNESCO-Felskunst, Geologie und Wildtier-Tracking beeindrucken' }
    },
    desc: 'Urzeitliche Landschaft mit UNESCO-Felsgravuren, freilebenden Wüstenelefanten und surrealen Felsformationen'
  },
  {
    id: 'waterberg',
    name: 'Waterberg Plateau',
    lat: -20.4167,
    lng: 17.2333,
    tags: ['Natur', 'Geschichte'],
    wiki: 'Waterberg_Plateau',
    highlights: 'Tafelberg-Wanderungen, Nashörner, Geschichte der Herero, Vogelparadies',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen, aber Restcamp mit Grundversorgung und Wanderwege' },
      '1-3':  { rating: 'yellow', note: 'Wanderungen zu steil für Kleinkinder, Camp selbst gemütlich' },
      '3-6':  { rating: 'green', note: 'Nashörner und Vögel beobachten, einfache Wanderwege am Plateau' },
      '6-12': { rating: 'green', note: 'Tafelberg-Wanderung und Wildtiere begeistern abenteuerlustige Kinder' },
      '12+':  { rating: 'green', note: 'Geschichte, Natur und anspruchsvolle Wanderungen für Jugendliche' }
    },
    dayTripFrom: [{ base: 'windhoek', transit: '~3h Auto' }]
  },
  {
    id: 'luederitz',
    name: 'Lüderitz',
    lat: -26.6481,
    lng: 15.1592,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Lüderitz',
    highlights: 'Jugendstil-Häuser, Haifischinsel, Diaz Point, Penguin Island, Geisterstadt Kolmanskop',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Windige Küstenstadt, gute Grundversorgung aber kaltes Klima' },
      '1-3':  { rating: 'yellow', note: 'Wind und Kälte am Atlantik, aber bunte Häuser und Pinguine nett' },
      '3-6':  { rating: 'green', note: 'Pinguine, bunte Häuser und Kolmanskop als spannender Tagesausflug' },
      '6-12': { rating: 'green', note: 'Geisterstadt Kolmanskop, Pinguine und Haifischinsel begeistern' },
      '12+':  { rating: 'green', note: 'Fotogene Geisterstadt, Diamanten-Geschichte und raue Küste' }
    },
    desc: 'Skurrile Küstenstadt am Rand der Namib mit farbenprächtiger deutscher Architektur und rauer Atlantikküste'
  },
  {
    id: 'kolmanskop',
    name: 'Kolmanskop',
    altName: 'Kolmannskuppe',
    lat: -26.7047,
    lng: 15.2284,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Kolmanskop',
    highlights: 'Geisterstadt, Sand-überflutete Häuser, Diamantengeschichte, Fotografie-Paradies',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Sandige Ruinen und Hitze, kurzer Besuch als Tagesausflug möglich' },
      '1-3':  { rating: 'green', note: 'Kurze Tour durch sandige Häuser, faszinierend und überschaubar' },
      '3-6':  { rating: 'green', note: 'Sand-überflutete Häuser sind wie ein riesiger Spielplatz mit Abenteuer' },
      '6-12': { rating: 'green', note: 'Geisterstadt-Atmosphäre und Diamanten-Geschichte begeistern Kinder' },
      '12+':  { rating: 'green', note: 'Fotografie-Paradies und faszinierende Vergänglichkeits-Geschichte' }
    },
    dayTripFrom: [{ base: 'luederitz', transit: '~15min Auto' }]
  },
  {
    id: 'caprivi',
    name: 'Zambezi-Region',
    altName: 'Caprivi-Streifen',
    lat: -18.0000,
    lng: 23.5000,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Zambezi_Region',
    highlights: 'Chobe-Nahgebiet, Bwabwata-Nationalpark, Popa Falls, Bootssafaris, Vogelparadies',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Malariagebiet, lange Anfahrt und abgelegen – Vorsicht mit Babys' },
      '1-3':  { rating: 'yellow', note: 'Malariaschutz nötig, Bootssafaris mit Kleinkind anspruchsvoll' },
      '3-6':  { rating: 'green', note: 'Bootssafaris mit Hippos und Vögeln, tropische Natur faszinierend' },
      '6-12': { rating: 'green', note: 'Tierbeobachtung vom Boot aus, Krokodile und Flusspferde hautnah' },
      '12+':  { rating: 'green', note: 'Bootsafaris und Vier-Länder-Eck bieten abwechslungsreiches Erlebnis' }
    },
    desc: 'Namibias tropischer Panhandle – ein grünes Paradies aus Flüssen, Sümpfen und üppiger Tierwelt zwischen vier Ländern'
  },
  {
    id: 'spitzkoppe',
    name: 'Spitzkoppe',
    altName: 'Matterhorn Namibias',
    lat: -21.8242,
    lng: 15.1933,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Spitzkoppe',
    highlights: 'Granitfelsen, Felsbogen, Buschmann-Felsmalereien, Camping unter Sternen, Klettern',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Camping-Gebiet ohne Infrastruktur, aber ruhig und beeindruckend' },
      '1-3':  { rating: 'yellow', note: 'Klettergelände nicht kindersicher, Camping mit Kleinkind möglich' },
      '3-6':  { rating: 'green', note: 'Felsen zum Erkunden, Felsmalereien und Sternenhimmel begeistern' },
      '6-12': { rating: 'green', note: 'Kletterfelsen, Buschmann-Malereien und Camping unter Sternen' },
      '12+':  { rating: 'green', note: 'Klettern, Fotografie und Wüsten-Camping für Abenteurer ideal' }
    },
    desc: 'Namibias Matterhorn – majestätische Granitberge mit jahrtausendealten Felsmalereien und spektakulären Sonnenuntergängen'
  },
  {
    id: 'walvisbay',
    name: 'Walvis Bay',
    lat: -22.9576,
    lng: 14.5053,
    tags: ['Natur', 'Erholung'],
    wiki: 'Walvis_Bay',
    highlights: 'Flamingos, Pelikane, Kayak mit Robben, Sandwich Harbour, Dune 7',
    family: true,
    familyRating: {
      '0-1':  { rating: 'green', note: 'Ruhige Lagune, Flamingos vom Auto aus beobachtbar, mildes Klima' },
      '1-3':  { rating: 'green', note: 'Flamingos und Pelikane vom Ufer aus, kinderfreundliche Promenade' },
      '3-6':  { rating: 'green', note: 'Flamingos, Pelikane und Robben begeistern, Strandspaziergang schön' },
      '6-12': { rating: 'green', note: 'Robben-Kayaking und Flamingo-Lagune sind tierreiche Highlights' },
      '12+':  { rating: 'green', note: 'Kayak-Tour mit Robben und Sandwich Harbour Ausflug beeindrucken' }
    },
    dayTripFrom: [{ base: 'swakopmund', transit: '~30min Auto' }]
  },
  {
    id: 'twyfelfontein',
    name: 'Twyfelfontein',
    altName: '/Ui-//aes',
    lat: -20.5928,
    lng: 14.3764,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Twyfelfontein',
    highlights: 'UNESCO-Welterbe Felsgravuren, Orgelpfeifen, Versteinerter Wald, Wüstenelefanten-Tracking',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Kurzer Rundgang möglich, aber Hitze und holprige Anfahrt' },
      '1-3':  { rating: 'yellow', note: 'Felsgravuren-Tour kurz, aber Hitze und kein Schatten herausfordernd' },
      '3-6':  { rating: 'green', note: 'Felszeichnungen faszinieren Kinder, Orgelpfeifen und Versteinerte Bäume' },
      '6-12': { rating: 'green', note: 'UNESCO-Felskunst zum Anfassen, Naturphänomene und Wüstenelefanten' },
      '12+':  { rating: 'green', note: 'Archäologie und Naturwunder kombiniert an einem faszinierenden Ort' }
    },
    dayTripFrom: [{ base: 'damaraland', transit: '~1h Auto' }]
  },
  {
    id: 'keetmanshoop',
    name: 'Keetmanshoop',
    lat: -26.5833,
    lng: 18.1333,
    tags: ['Natur', 'Geschichte'],
    wiki: 'Quiver_Tree_Forest',
    highlights: 'Köcherbaumwald, Giants Playground, Mesosaurus-Fossilien, Karas-Region',
    family: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Durchgangsort mit Grundversorgung, Hitze im Sommer beachten' },
      '1-3':  { rating: 'green', note: 'Köcherbäume und Felsen zum Bestaunen, überschaubarer Rundgang' },
      '3-6':  { rating: 'green', note: 'Giants Playground ist ein natürlicher Klettergarten für Kinder' },
      '6-12': { rating: 'green', note: 'Bizarre Felsen zum Klettern und Köcherbäume bei Sonnenuntergang' },
      '12+':  { rating: 'green', note: 'Einzigartige Landschaft für Fotografie und Naturerlebnis' }
    },
    desc: 'Tor zum berühmten Köcherbaumwald und Giants Playground – bizarre Felsformationen in der weiten Karas-Landschaft'
  },

  // ===== OFF THE BEATEN PATH (8) =====
  {
    id: 'epupa',
    name: 'Epupa Falls',
    lat: -17.0042,
    lng: 13.2500,
    tags: ['Natur', 'Kultur', 'Abenteuer'],
    wiki: 'Epupa_Falls',
    highlights: 'Epupa-Wasserfälle, Himba-Dörfer, Kunene-Fluss, Krokodile, Allrad-Abenteuer',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem abgelegen, nur mit Allrad, keine medizinische Versorgung' },
      '1-3':  { rating: 'red', note: 'Tagelange Allrad-Anfahrt, Krokodile im Fluss und extreme Hitze' },
      '3-6':  { rating: 'yellow', note: 'Himba-Dörfer und Wasserfälle faszinierend, aber Anfahrt sehr lang' },
      '6-12': { rating: 'yellow', note: 'Abenteuer-Feeling und Himba-Kultur beeindruckend, Allrad-Pflicht' },
      '12+':  { rating: 'green', note: 'Echtes Outback-Abenteuer mit Himba-Begegnung und Wasserfällen' }
    },
    desc: 'Spektakuläre Wasserfälle am Kunene-Fluss im abgelegenen Kaokoland – Heimat der traditionell lebenden Himba'
  },
  {
    id: 'brandberg',
    name: 'Brandberg',
    lat: -21.1472,
    lng: 14.5750,
    tags: ['Natur', 'Geschichte', 'Abenteuer'],
    wiki: 'Brandberg_Mountain',
    highlights: 'Namibias höchster Berg (2.573m), White Lady Felsmalerei, Wüstenlandschaft, Tracking',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Anspruchsvolle Bergwanderung in der Hitze, nichts für Babys' },
      '1-3':  { rating: 'red', note: 'Steile Wanderung und Wüstenhitze für Kleinkinder gefährlich' },
      '3-6':  { rating: 'yellow', note: 'White Lady kurze Wanderung machbar, Gipfel erst ab 12 sinnvoll' },
      '6-12': { rating: 'yellow', note: 'Felsmalerei-Wanderung spannend, Bergbesteigung zu anspruchsvoll' },
      '12+':  { rating: 'green', note: 'Bergwanderung und uralte Felskunst für sportliche Jugendliche' }
    },
    desc: 'Namibias höchster Berg mit der berühmten White Lady Felsmalerei – heiliger Berg der San in mystischer Wüstenlandschaft'
  },
  {
    id: 'okonjima',
    name: 'Okonjima',
    altName: 'AfriCat Foundation',
    lat: -20.8667,
    lng: 16.7167,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'AfriCat_Foundation',
    highlights: 'Leoparden-Tracking, Geparden-Rehabilitation, AfriCat-Stiftung, Busch-Camping',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Lodge-basiert und sicher, aber Tracking-Touren mit Baby schwierig' },
      '1-3':  { rating: 'yellow', note: 'Lodges komfortabel, Raubkatzen-Tracking erst für ältere Kinder' },
      '3-6':  { rating: 'green', note: 'Geparden und Leoparden beobachten, kindgerechte Lodge-Programme' },
      '6-12': { rating: 'green', note: 'Raubkatzen-Tracking hautnah erleben, Artenschutz zum Anfassen' },
      '12+':  { rating: 'green', note: 'Leoparden-Tracking und Wildlife-Fotografie unvergesslich' }
    },
    dayTripFrom: [
      { base: 'windhoek', transit: '~2.5h Auto' },
      { base: 'waterberg', transit: '~1.5h Auto' }
    ]
  },
  {
    id: 'namibrand',
    name: 'NamibRand Nature Reserve',
    lat: -25.0833,
    lng: 15.9500,
    tags: ['Natur', 'Erholung'],
    wiki: 'NamibRand_Nature_Reserve',
    highlights: 'Dark Sky Reserve, Sternenbeobachtung, Heißluftballon, Wüsten-Wanderungen, Luxus-Lodges',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Luxus-Lodges komfortabel, aber abgelegen und wenig Baby-Aktivitäten' },
      '1-3':  { rating: 'yellow', note: 'Stille Wüste und Lodges nett, aber kaum Kleinkind-Unterhaltung' },
      '3-6':  { rating: 'green', note: 'Sternenhimmel und Wüstenwanderungen begeistern neugierige Kinder' },
      '6-12': { rating: 'green', note: 'Sternbeobachtung, Heißluftballon und Wüsten-Abenteuer faszinieren' },
      '12+':  { rating: 'green', note: 'Astro-Fotografie und Wüsten-Erlebnis in absoluter Stille' }
    },
    desc: 'Afrikas erstes International Dark Sky Reserve – unberührte Wüstenlandschaft mit dem klarsten Sternenhimmel der Welt'
  },
  {
    id: 'aiais',
    name: 'Ai-Ais Hot Springs',
    lat: -27.9625,
    lng: 17.4764,
    tags: ['Erholung', 'Natur'],
    wiki: 'Ai-Ais_Hot_Springs',
    highlights: 'Heiße Quellen, Endpunkt Fish River Canyon Trail, Thermalpool, Wüstenoase',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Thermalpool angenehm, aber abgelegen und Wassertemperatur prüfen' },
      '1-3':  { rating: 'green', note: 'Warme Thermalpools zum Planschen, Oase in der Wüstenlandschaft' },
      '3-6':  { rating: 'green', note: 'Thermalbad-Spaß und Natur erkunden in wunderschöner Umgebung' },
      '6-12': { rating: 'green', note: 'Schwimmen in heißen Quellen und Wanderungen in der Schlucht' },
      '12+':  { rating: 'green', note: 'Entspannung nach Canyon-Besuch, Thermalpools und Wanderwege' }
    },
    dayTripFrom: [{ base: 'fishrivercanyon', transit: '~1.5h Auto' }]
  },
  {
    id: 'bushmanland',
    name: 'Bushmanland',
    altName: 'Nyae Nyae Conservancy',
    lat: -19.5833,
    lng: 20.5000,
    tags: ['Kultur', 'Abenteuer'],
    wiki: 'San_people',
    highlights: 'San-Bushmen-Kultur, traditionelle Jagd, Fährtenlesen, Kalahari-Wildnis, Sternenhimmel',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Extrem abgelegen, keine Infrastruktur und Kalahari-Hitze' },
      '1-3':  { rating: 'red', note: 'Kalahari-Wildnis ohne jegliche Versorgung, zu herausfordernd' },
      '3-6':  { rating: 'yellow', note: 'San-Bushmen-Begegnung faszinierend, aber sehr abgelegen' },
      '6-12': { rating: 'yellow', note: 'Fährtenlesen und Buschmann-Kultur lehrreich, Allrad-Anfahrt nötig' },
      '12+':  { rating: 'green', note: 'Einzigartige Kultur-Begegnung und Überleben in der Wildnis lernen' }
    },
    desc: 'Letzte Heimat der San-Buschleute in der Kalahari – authentische Begegnungen mit einer der ältesten Kulturen der Menschheit'
  },
  {
    id: 'palmwag',
    name: 'Palmwag',
    lat: -19.8833,
    lng: 13.9500,
    tags: ['Natur', 'Abenteuer'],
    wiki: 'Palmwag',
    highlights: 'Wüstenangepasste Nashörner, Löwen-Tracking, Etendeka-Konzession, Wüstenelefanten',
    family: false,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'red', note: 'Tracking zu Fuß bei Nashörnern und Löwen viel zu gefährlich' },
      '1-3':  { rating: 'red', note: 'Wildtier-Tracking zu Fuß mit Kleinkind unverantwortlich' },
      '3-6':  { rating: 'red', note: 'Fußpirsch bei Großwild zu gefährlich für kleine Kinder' },
      '6-12': { rating: 'yellow', note: 'Fahrzeug-basierte Safari möglich, Fußpirsch erst ab 16 erlaubt' },
      '12+':  { rating: 'yellow', note: 'Konzessions-Regeln prüfen, Fußpirsch oft erst ab 16 Jahren' }
    },
    desc: 'Abgelegene Konzession mit den letzten freilebenden Wüstennashörnern und -löwen – Big Game Tracking zu Fuß'
  },
  {
    id: 'duwisib',
    name: 'Duwisib Castle',
    lat: -25.3567,
    lng: 16.1728,
    tags: ['Geschichte', 'Kultur'],
    wiki: 'Duwisib_Castle',
    highlights: 'Deutsche Ritterburg in der Wüste, Baron von Wolf, historische Waffen, Wüstenpferde von Aus',
    family: true,
    offbeat: true,
    familyRating: {
      '0-1':  { rating: 'yellow', note: 'Abgelegen in der Wüste, kurzer Besuch als Zwischenstopp möglich' },
      '1-3':  { rating: 'green', note: 'Burg besichtigen ist kurz und spannend, guter Zwischenstopp' },
      '3-6':  { rating: 'green', note: 'Eine echte Ritterburg in der Wüste – Kindertraum wird wahr' },
      '6-12': { rating: 'green', note: 'Ritterburg, Waffen und tragische Geschichte fesseln Kinder' },
      '12+':  { rating: 'green', note: 'Skurrile Kolonialgeschichte und surreale Wüsten-Architektur' }
    },
    desc: 'Surreale deutsche Ritterburg mitten in der namibischen Wüste – erbaut 1909 von einem sächsischen Baron mit tragischer Geschichte'
  }
];
