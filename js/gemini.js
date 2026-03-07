/* ============================================
   GEMINI.JS – KI-API: Prompt-Builder, API-Call, Error-Handling
   Multi-Country-fähig via CountryConfig
   Google AI Studio (Gemini 2.5 Flash)
   ============================================ */

const Gemini = {

  // Gemini Direct via Google AI Studio
  GEMINI_BASE_URL: 'https://generativelanguage.googleapis.com/v1beta/models/',
  GEMINI_MODEL: 'gemini-2.5-flash',

  // Timeout & Retry
  FETCH_TIMEOUT_MS: 120000,
  MAX_RETRIES: 1,
  RETRY_DELAY_MS: 5000,

  /**
   * Baut den Prompt basierend auf App.state und CountryConfig
   */
  buildPrompt() {
    const s = App.state;
    const cc = CountryConfig.current;

    const seasonNames = {
      spring: 'Frühling (März–Mai)',
      summer: 'Sommer (Juni–August)',
      autumn: 'Herbst (September–November)',
      winter: 'Winter (Dezember–Februar)'
    };

    const groupNames = {
      solo: 'Alleinreisender',
      couple: 'Paar',
      family: 'Familie mit Kind',
      friends: 'Freundesgruppe'
    };

    const prefStr = Object.entries(s.preferences)
      .filter(([, val]) => val > 0)
      .sort(([, a], [, b]) => b - a)
      .map(([key, val]) => `${key}: ${val}/10`)
      .join(', ');

    // Travel Pace für KI-Inspiration Modus
    const paceLabels = {
      fast: 'Viel sehen: 2-3 Nächte pro Stopp, möglichst viele verschiedene Orte',
      balanced: 'Ausgewogen: 3-4 Nächte pro Stopp',
      slow: 'Slow Travel: mindestens 4-5 Nächte pro Stopp, weniger Orte, mehr Tiefe'
    };
    const showPace = s.routeMode === 'inspired' || (s.routeMode === 'custom' && !s.strictPins);
    const paceStr = showPace ? paceLabels[s.travelPace] || paceLabels.balanced : '';

    const dests = cc.destinations;
    const pinnedStr = s.pinnedCities.length > 0
      ? s.pinnedCities.map(id => {
          const d = dests.find(dest => dest.id === id);
          return d ? d.name : id;
        }).join(', ')
      : 'Keine';

    const childStr = (s.group === 'family' && s.childAge)
      ? `\nAlter des Kindes: ${s.childAge} Jahre`
      : '';

    const mainDests = dests.filter(d => !d.offbeat);
    const offbeatDests = dests.filter(d => d.offbeat);

    const destRef = mainDests.map(d =>
      `- ${d.name} (${d.lat}, ${d.lng}) – Tags: ${d.tags.join(', ')} – ${d.highlights}`
    ).join('\n');

    const offbeatRef = offbeatDests.map(d =>
      `- ${d.name} (${d.lat}, ${d.lng}) – Tags: ${d.tags.join(', ')} – ${d.highlights}`
    ).join('\n');

    const returnStr = s.sameReturn
      ? `${s.airport} (gleicher Ort)`
      : (s.departureAirport || s.airport);

    const transportStr = cc.transportPrompt(s.transport, s.trainMaxHours);
    const transportRule = cc.transportRules(s.transport, s.trainMaxHours);

    // Day-Trip-Optionen aus Destinations generieren
    const dayTripDests = dests.filter(d => d.dayTripFrom && d.dayTripFrom.length > 0);
    const dayTripRef = dayTripDests.map(d => {
      const bases = d.dayTripFrom.map(dt => {
        const baseDest = dests.find(b => b.id === dt.base);
        return `${baseDest ? baseDest.name : dt.base} (${dt.transit})`;
      }).join(' oder ');
      return `- ${d.name}: Tagesausflug ab ${bases}`;
    }).join('\n');

    return `Du bist ein erfahrener ${cc.expertRole} und erstellst eine optimale Individualreiseroute.

## Nutzereingaben

- Ankunftsort: ${s.airport}
- Abreise ab: ${returnStr}
- Transportpräferenz: ${transportStr}
- Reisedauer: ${s.days} Tage (${s.days - 1} Nächte)
- Reisezeitraum: ${seasonNames[s.season]}
- Reisegruppe: ${groupNames[s.group]}${childStr}
- Interessen-Gewichtung: ${prefStr}
- Pflicht-Stopps: ${pinnedStr}
${showPace ? `- Reisestil: ${paceStr}` : ''}
${s.additionalNotes ? `- Zusätzliche Wünsche des Nutzers: "${s.additionalNotes}"` : ''}

## Verfügbare Ziele in ${cc.countryInText}

### Hauptziele
${destRef}

### Off the Beaten Path${s.routeMode === 'inspired' && s.preferences['Abenteuer'] >= 6 ? ' (darf bei hohem Abenteuer-Interesse auch ohne Pin verwendet werden – maximal 1-2 Offbeat-Ziele einbauen)' : ' (nur verwenden wenn vom Nutzer gepinnt)'}
${offbeatRef}
${dayTripRef ? `
### Tagesausflug-Optionen
Diese Ziele können ENTWEDER als Tagesausflug vom Basis-Stopp aus besucht werden ODER als eigener Stopp mit Übernachtung:
${dayTripRef}
Bei kurzen Reisen (≤14 Tage): bevorzuge Tagesausflüge (in den dailyPlan des Basis-Stopps einbauen, kein eigener Stopp).
Bei langen Reisen (≥21 Tage): eigener Stopp mit Übernachtung ist sinnvoll.
Wenn ein Tagesausflug-Ziel als gepinnter Pflicht-Stopp gewählt wurde, mache es IMMER zum eigenen Stopp.` : ''}

## Regeln

1. Minimum 2 Nächte pro Stopp (bei Reisen über 21 Tage: minimum 3 Nächte pro Stopp)
2. Transport: ${transportRule}
3. Logische geographische Reihenfolge – keine Zickzack-Routen. Die Route muss geographisch sinnvoll zum Abreiseort (${returnStr}) hinführen.
4. Route MUSS am Ankunftsort (${s.airport}) starten und am Abreiseort (${returnStr}) enden.
${s.sameReturn
  ? `5. WICHTIG: Start- und Endstadt sind IDENTISCH (${s.airport}). Der erste Stopp ist die ausführliche Erkundung der Stadt (mehrere Nächte, alle Highlights). Der LETZTE Stopp MUSS ebenfalls ${s.airport} sein, aber NUR mit 1 Nacht als reiner Abreisetag (Ankunft am Vorabend, Abreise am nächsten Tag). Beim letzten Stopp KEINE Sightseeing-Highlights wiederholen – stattdessen Tipps wie „letzte Souvenirs kaufen", „Transfer zum Flughafen/Bahnhof" oder ein nahegelegenes Viertel, das beim ersten Besuch nicht dabei war. Das letzte "leg" muss den Rücktransfer vom vorletzten Stopp nach ${s.airport} enthalten.`
  : `5. WICHTIG: Die Abreise geht von ${returnStr} – einem ANDEREN Ort als die Ankunft. Der LETZTE Stopp in "stops" MUSS die Abreisestadt (${returnStr}) sein, damit der Reisende dort abreisen kann. Das letzte "leg" muss den Transport vom vorletzten Stopp nach ${returnStr} enthalten. Plane genügend Nächte in ${returnStr} ein (mindestens 2), damit der Reisende die Stadt erleben kann, bevor er abreist.`}
6. ALLE Pflicht-Stopps (${pinnedStr}) müssen in der Route enthalten sein
${s.strictPins ? `7. STRIKT: Der Nutzer hat sich BEWUSST für NUR diese ${s.pinnedCities.length} Orte entschieden. Verwende AUSSCHLIESSLICH die Pflicht-Stopps als Reiseziele. Füge KEINE zusätzlichen Städte/Orte hinzu! Verteile die gesamte Reisezeit (${s.days - 1} Nächte) auf diese Orte. Plane mehr Nächte pro Stopp ein und erstelle ausführlichere Tagespläne mit Tagesausflügen, versteckten Vierteln und Geheimtipps.` : '7. Wähle zusätzliche Stopps passend zu den Interessen-Gewichtungen'}
8. Die Gesamtzahl der Nächte muss ${s.days - 1} betragen
${s.group === 'family' && s.childAge && (s.childAge === '0-1' || s.childAge === '1-3')
  ? '9. Familie mit Kleinkind: Bevorzuge buggyfreundliche Orte, vermeide zu viele Ortswechsel, maximal 4 Stopps.'
  : ''}
${s.season === 'summer' ? `- Beachte: Im Sommer ist es in ${cc.countryInText} oft sehr heiß und feucht. Empfehle kühlere Regionen oder Bergorte.` : ''}
${s.season === 'spring' && cc.id === 'china' ? '- Beachte: Frühling ist angenehm (15–25°C), aber Sandstürme im Norden (Peking, Xi\'an) möglich im März/April. Qingming-Fest (Anfang April) – viele Inlandsreisende. Kirschblüte in Shanghai und Wuhan (Ende März). Generell gute Reisezeit, Nebensaison = günstigere Preise.' : ''}
${s.season === 'summer' && cc.id === 'china' ? '- Beachte: HEISS und SCHWÜL (30–40°C). Monsun/Regenzeit im Süden (Guilin, Yunnan) Juni–August. Taifun-Saison an der Ostküste (Shanghai, Xiamen, Hongkong) Juli–September. Sichuan und Yunnan können Erdrutsche haben. Hokuriku und Bergorte (Emeishan, Zhangjiajie) als kühlere Alternativen. Sommerferien = volle Züge und Hotels.' : ''}
${s.season === 'autumn' && cc.id === 'china' ? '- Beachte: Golden Week (1.-7. Oktober) – extrem volle Sehenswürdigkeiten, Züge und Hotels weit im Voraus ausgebucht! Nach Golden Week beste Reisezeit: angenehme 15–25°C, klare Luft. Herbstlaub in Jiuzhaigou (Okt) und Große Mauer (Nov). Yunnan ganzjährig angenehm.' : ''}
${s.season === 'winter' && cc.id === 'china' ? '- Beachte: Norden EXTREM KALT (Peking –10°C, Harbin –25°C!) – Harbin Eisfestival (Jan–Feb) spektakulär aber bitterkalt. Süden (Hongkong, Xiamen, Sanya, Yunnan) mild und angenehm (15–22°C). Chinese New Year (Jan/Feb) = größte Reisewelle der Welt, Transport und Hotels wochenlang ausgebucht! Viele Geschäfte in Kleinstädten geschlossen.' : ''}
${s.season === 'spring' && cc.id === 'vietnam' ? '- Beachte: Nordvietnam (Hanoi, Ha Long, Sapa) im Frühling angenehm warm (20–28°C), gelegentlich Nieselregen. Zentralvietnam (Hoi An, Hue) trocken und sonnig – ideale Reisezeit! Südvietnam (Ho-Chi-Minh-Stadt, Mekong) wird zunehmend heiß (35°C+). Tet-Nachklang im Februar – einige Geschäfte noch geschlossen.' : ''}
${s.season === 'summer' && cc.id === 'vietnam' ? '- Beachte: REGENZEIT im ganzen Land, aber regional unterschiedlich. Nordvietnam: heftige Nachmittagsschauer, Sapa oft neblig. Zentralvietnam (Hoi An, Hue): trockener als Nord/Süd, aber zunehmend heiß (35°C+). Südvietnam: tägliche Monsun-Schauer (kurz aber heftig). Nha Trang und Mui Ne haben Sommer-Trockenzeit! ACHTUNG: Taifun-Saison beginnt im Norden.' : ''}
${s.season === 'autumn' && cc.id === 'vietnam' ? '- Beachte: Zentralvietnam hat im Herbst Taifun-Saison (Sept–Nov) – Hoi An und Hue können überschwemmt werden! Alternativen im Norden oder Süden empfehlen. Nordvietnam (Sapa, Ha Giang): Reisterrassen golden im September/Oktober – spektakulär! Südvietnam: Regenzeit endet, zunehmend angenehm.' : ''}
${s.season === 'winter' && cc.id === 'vietnam' ? '- Beachte: BESTE REISEZEIT für Südvietnam – trocken, angenehm (25–30°C). Nordvietnam kühl und feucht (15–20°C in Hanoi), Sapa kann empfindlich kalt werden (5–10°C), gelegentlich Nebel. Zentralvietnam (Hoi An, Hue): Regenzeit bis Januar, danach trocken. Weihnachten/Neujahr = Hochsaison in beliebten Orten. Tet (Mondneujahr, Jan/Feb): viele Geschäfte geschlossen, Transport ausgebucht – aber atmosphärisch einmalig!' : ''}
${s.season === 'spring' && cc.id === 'cambodia' ? '- Beachte: HEISSESTE ZEIT (35–40°C)! März–Mai ist die Hitze-Saison – Angkor Wat bei Tagesanbruch besuchen, Mittagshitze meiden. Khmer New Year (13.–16. April) = größtes Fest, Hotels in Siem Reap und Phnom Penh ausgebucht, viele Geschäfte geschlossen. Genug Wasser und Sonnenschutz einplanen. Strandorte (Koh Rong, Sihanoukville) bieten Abkühlung.' : ''}
${s.season === 'summer' && cc.id === 'cambodia' ? '- Beachte: REGENZEIT beginnt (Südwest-Monsun). Tägliche Nachmittagsschauer (1–2h), danach oft sonnig. Unbefestigte Straßen können matschig werden (Koh Ker, abgelegene Tempel). Tonle Sap füllt sich – Schwimmende Dörfer beeindruckend. Weniger Touristen = günstigere Preise. Grüne Reisfelder und Wasserfälle am schönsten. Pchum Ben (Sept/Okt) – wichtiges Ahnenfest.' : ''}
${s.season === 'autumn' && cc.id === 'cambodia' ? '- Beachte: MONSUN-HÖHEPUNKT (Sept–Okt) – stärkste Regenfälle, Überschwemmungsrisiko in Tieflandgebieten. Tonle Sap auf Maximalstand – einzigartige Bootstouren. Bon Om Touk (Wasserfest, Nov) in Phnom Penh: Bootsrennen, Feuerwerk, riesige Menschenmengen! Ab November wird es trockener und kühler. Angkor Wat umgeben von grünem Dschungel – atmosphärisch einmalig.' : ''}
${s.season === 'winter' && cc.id === 'cambodia' ? '- Beachte: BESTE REISEZEIT – trocken, angenehm (25–32°C). Hochsaison: Angkor Wat und Siem Reap sehr voll, Hotels und Tuk-Tuks im Voraus buchen! Weihnachten/Neujahr = Spitzenpreise. Tonle Sap zieht sich zurück – Schwimmende Dörfer gut erreichbar. Strandorte (Koh Rong, Kampot) perfekt. Phnom Penh angenehm warm.' : ''}
${s.season === 'spring' && cc.id === 'srilanka' ? '- Beachte: INTER-MONSUN-ZEIT – vereinzelte Schauer landesweit. Sinhala/Tamil New Year (13.–14. April) = wichtigstes Fest, viele Geschäfte geschlossen, Transport voll. Ostküste (Trincomalee, Arugam Bay) beginnt Trockenzeit – gute Strandzeit ab April. Kulturdreieck (Sigiriya, Kandy) angenehm warm (28–32°C). Yala-Nationalpark: Leopardensichtung am besten Feb–Jul.' : ''}
${s.season === 'summer' && cc.id === 'srilanka' ? '- Beachte: YALA-MONSUN (Südwest-Monsun, Mai–Sep) – Westküste und Süden (Galle, Mirissa, Unawatuna) bekommen starken Regen! OSTKÜSTE ist die Alternative: Trincomalee, Arugam Bay und Batticaloa haben BESTE Bedingungen. Arugam Bay = Surf-Hochsaison. Hill Country (Ella, Nuwara Eliya) oft neblig und regnerisch. Esala Perahera in Kandy (Juli/Aug) = spektakulärstes Festival mit Elefanten-Prozession!' : ''}
${s.season === 'autumn' && cc.id === 'srilanka' ? '- Beachte: ZWEITE INTER-MONSUN-ZEIT – unberechenbarstes Wetter, Schauer überall möglich. Nordost-Monsun beginnt Ende Oktober – Ostküste wird nass. Übergangszeit: weder West noch Ost ideal, aber Kulturdreieck und Hill Country bereisbar. Deepavali (Lichterfest, Okt/Nov). Ab November: Westküste und Süden werden wieder trocken.' : ''}
${s.season === 'winter' && cc.id === 'srilanka' ? '- Beachte: BESTE REISEZEIT für Westküste und Süden! Trocken, sonnig, 28–32°C. Mirissa: Walbeobachtung (Blauwale Nov–Apr)! Galle, Unawatuna, Hikkaduwa: perfekte Strandzeit. Ostküste (Trincomalee, Arugam Bay): Nordost-Monsun bringt Regen. Hochsaison: Hotels in Strandorten teuer, im Voraus buchen. Weihnachten/Neujahr = Spitzenpreise an der Südküste. Adam\'s Peak Pilgersaison (Dez–Mai).' : ''}
${s.season === 'spring' && cc.id === 'japan' ? '- Beachte: Kirschblüte (Ende März–Mitte April) – extrem beliebt, Tempel und Parks überfüllt. Golden Week (29. April–5. Mai) – Hotels und Züge weit im Voraus ausgebucht!' : ''}
${s.season === 'summer' && cc.id === 'japan' ? '- Beachte: Tsuyu-Regenzeit (Juni–Mitte Juli), danach extreme Schwüle. Taifun-Saison beginnt im August. Hokkaido und Bergregionen als kühlere Alternativen empfehlen.' : ''}
${s.season === 'autumn' && cc.id === 'japan' ? '- Beachte: Taifun-Saison (Sept–Okt) kann Reisepläne stören. Ab November: Koyo (Herbstlaub) – wunderschön, aber Kyoto und Nikko sind extrem voll. Reservierungen empfehlen!' : ''}
${s.season === 'winter' && cc.id === 'japan' ? '- Beachte: Shogatsu (28. Dez–4. Jan) – viele Geschäfte geschlossen. Hokkaido und Japan-See-Seite mit starkem Schneefall – ideal für Onsen, Ski und Schneefestivals.' : ''}
${s.season === 'spring' && cc.id === 'thailand' ? '- Beachte: Songkran (13.–15. April) – landesweites Wasserfest, Transport-Chaos, Hotels ausgebucht. Heißeste Zeit (35–40°C). ACHTUNG: Burning Season (Feb–April) – extrem schlechte Luftqualität im Norden (Chiang Mai, Chiang Rai, Pai). Empfehle bei Nordthailand im März/April Alternativen im Süden.' : ''}
${s.season === 'summer' && cc.id === 'thailand' ? '- Beachte: Regenzeit (Südwest-Monsun). Andamanküste (Phuket, Krabi, Ko Phi Phi, Ko Lanta) bekommt starken Regen, einige Fähren eingestellt. Golfküste (Ko Samui, Ko Phangan, Ko Tao) ist dagegen Juni–Aug gut bereisbar. Green Season = günstiger, weniger Touristen.' : ''}
${s.season === 'autumn' && cc.id === 'thailand' ? '- Beachte: Monsun-Höhepunkt (Sept–Okt) – Überschwemmungsrisiko, besonders Bangkok. Golfküste (Ko Samui, Ko Phangan) hat Okt–Nov schlechtestes Wetter. Loy Krathong (Nov, Vollmond) – wunderschönes Laternenfest, Yi Peng in Chiang Mai besonders spektakulär.' : ''}
${s.season === 'winter' && cc.id === 'thailand' ? '- Beachte: Hochsaison – bestes Wetter, aber teuerste und vollste Reisezeit. Weihnachten/Neujahr extrem ausgebucht. Chinese New Year (Ende Jan/Feb) zusätzlicher Ansturm in Bangkok. Im Norden nachts kühl (10–15°C in den Bergen).' : ''}
${s.season === 'spring' && cc.id === 'indonesia' ? '- Beachte: Übergang von Regen- zu Trockenzeit. WICHTIG: Nyepi (Balinesischer Tag der Stille, März) – auf Bali schließen ALLE Betriebe und der Flughafen für 24h, keine Flüge möglich! Waisak/Vesak am Borobudur (Mai, Vollmond) – wunderschönes Laternenfest. Generell gutes Wetter, weniger Touristen als in der Hochsaison. Ramadan (variiert, ca. Feb–Mär) kann in muslimischen Gebieten die Essensversorgung tagsüber einschränken.' : ''}
${s.season === 'summer' && cc.id === 'indonesia' ? '- Beachte: TROCKENZEIT – beste Reisezeit für Bali, Java, Komodo und Lombok. Hochsaison = teurer und voller, besonders Bali. Beste Zeit für Trekking (Rinjani, Bromo, Ijen) und Tauchen (Komodo). ACHTUNG: Raja Ampat hat UMGEKEHRTE Saison – beste Tauchbedingungen sind Okt–Apr! Surfen an der Südküste Balis optimal.' : ''}
${s.season === 'autumn' && cc.id === 'indonesia' ? '- Beachte: Übergang zur Regenzeit. Oktober noch gut, ab November beginnen stärkere Regenfälle (meist nachmittags). Nebensaison = günstigere Preise und weniger Touristen. Raja Ampat wird ab Oktober wieder gut zum Tauchen (Manta-Saison beginnt).' : ''}
${s.season === 'winter' && cc.id === 'indonesia' ? '- Beachte: REGENZEIT – schwere Regenfälle, besonders nachmittags. Überschwemmungsrisiko in Jakarta und Tieflandgebieten. ABER: Raja Ampat hat BESTE Tauchbedingungen (Manta-Saison Dez–Feb)! Weihnachten/Neujahr in Bali = extrem teuer und überfüllt. Einige Fährrouten könnten wetterbedingt ausfallen.' : ''}
${s.season === 'spring' && cc.id === 'philippines' ? '- Beachte: TROCKENZEIT – beste Reisezeit, aber März–Mai ist die heißeste Periode (bis 38°C). Semana Santa (Heilige Woche/Ostern) – Inlandsflüge und Fähren extrem ausgebucht, weit im Voraus planen! Pahiyas Festival (15. Mai, Lucban) – farbenprächtigstes Erntefest der Philippinen. Walhai-Saison in Donsol endet im Juni.' : ''}
${s.season === 'summer' && cc.id === 'philippines' ? '- Beachte: REGENZEIT (Habagat/Südwest-Monsun) beginnt Juni. TAIFUN-SAISON (Juli–Oktober) – besonders Luzon und Ost-Visayas betroffen! Manila, Baguio, Banaue, Vigan sind taifungefährdet. Palawan, West-Visayas und Mindanao (Davao, Siargao) deutlich weniger betroffen. Island-Hopping bei El Nido/Coron kann bei Wellengang ausfallen. Surfsaison in Siargao beginnt (beste Wellen Sept–Nov). Kadayawan Festival in Davao (August).' : ''}
${s.season === 'autumn' && cc.id === 'philippines' ? '- Beachte: TAIFUN-HÖHEPUNKT (Sept–Nov) – besonders Luzon und östliche Visayas betroffen. Route möglichst auf Palawan, West-Visayas oder Mindanao konzentrieren. El Nido/Coron-Boote oft wetterbedingt gestrichen. Siargao hat beste Surfbedingungen (Cloud 9). MassKara Festival in Bacolod (Oktober). Ab November wird das Wetter besser.' : ''}
${s.season === 'winter' && cc.id === 'philippines' ? '- Beachte: HOCHSAISON – bestes Wetter (Amihan/Nordost-Monsun, trocken und kühler). Weihnachten ist das wichtigste Fest der Philippinen – Sinulog (Cebu, 3. Sonntag im Januar) und Ati-Atihan (Kalibo, gleicher Termin) sind die größten Festivals. Dinagyang (Iloilo, 4. Sonntag im Januar). Hotels und Flüge um Weihnachten/Neujahr extrem teuer. Batanes hat Nov–Feb starken Wind – beste Reisezeit dort März–Juni.' : ''}
${s.season === 'spring' && cc.id === 'southkorea' ? '- Beachte: KIRSCHBLÜTE – Jeju ab ca. 20. März, Busan/Gyeongju Anfang April, Seoul Mitte April. Jinhae Cherry Blossom Festival (Ende März/Anfang April) = größtes Kirschblütenfest Koreas, extrem voll! Golden Week (29. April–5. Mai) = erhöhtes Reiseaufkommen. Beste Reisezeit neben Herbst, milde 10–20°C.' : ''}
${s.season === 'summer' && cc.id === 'southkorea' ? '- Beachte: JANGMA (장마) Monsun-Regenzeit Ende Juni bis Ende Juli – schwüle Hitze 30°C+, starke Regenfälle. Taifun-Saison August–September (besonders Südküste und Jeju). Strandzeit an Haeundae (Busan) und Gyeongpo (Gangneung). Boryeong Mud Festival (Juli). Empfehle Bergregionen als kühlere Alternative.' : ''}
${s.season === 'autumn' && cc.id === 'southkorea' ? '- Beachte: BESTE REISEZEIT! Klarer Himmel, angenehme 15–25°C. Herbstlaub: Seoraksan ab Ende September, Seoul/Jeonju Mitte–Ende Oktober, Jeju November. Andong Maskentanz-Festival (Sept/Okt). Jinju Laternenfestival (Oktober) = größtes Laternenfest Koreas. Seoraksan und Naejangsan haben die spektakulärsten Herbstfarben.' : ''}
${s.season === 'winter' && cc.id === 'southkorea' ? '- Beachte: KALT – Seoul –5 bis –10°C, Busan milder ~2–5°C, Jeju mild 5–10°C. Ski-Saison in Pyeongchang/Yongpyong (Olympia 2018). Hwacheon Sancheoneo Ice Festival (Januar) = spektakuläres Eisfischen-Festival. Seoul Lantern Festival (Nov–Jan). Shogatsu-ähnlich: Seollal (Mondneujahr, Jan/Feb) – viele Geschäfte geschlossen, Transport ausgebucht.' : ''}
${s.season === 'spring' && cc.id === 'laos' ? '- Beachte: HEISSESTE ZEIT & BURNING SEASON – März bis Mai ist die heißeste Periode (35–40°C). Brandrodung verursacht starken Rauch/Dunst besonders im Norden (Luang Prabang, Phongsali, Luang Namtha) – Atemmasken empfohlen, Panorama-Aussichten eingeschränkt. Pi Mai (Lao New Year, 13.–16. April) = größtes Fest des Jahres, landesweit Wasserschlachten! Hotels und Transport extrem ausgebucht, weit im Voraus planen. Mekong-Wasserstand am niedrigsten – Slow Boat evtl. nicht möglich.' : ''}
${s.season === 'summer' && cc.id === 'laos' ? '- Beachte: MONSUN/REGENZEIT beginnt Mai/Juni. Starke Regenfälle besonders Juli–September. Unbefestigte Straßen oft unpassierbar (Thakhek Loop, Phongsali, Bolaven-Plateau-Nebenstraßen). Mekong-Pegel steigt stark – Slow Boat läuft. Landschaft am grünsten und Wasserfälle (Kuang Si, Tad Fane) am beeindruckendsten. Bun Ok Phansa und Bootsrennen-Festivals im September/Oktober. Weniger Touristen, günstigere Preise.' : ''}
${s.season === 'autumn' && cc.id === 'laos' ? '- Beachte: ÜBERGANGSZEIT – Regen lässt im Oktober nach, Landschaft noch saftig grün. Wasserfälle (Kuang Si, Tad Fane, Khone Phapheng) auf dem Höhepunkt. Bun That Luang Festival (November, Vientiane) = wichtigstes religiöses Fest. Ab November beginnt Hochsaison – Luang Prabang kann voll werden. Perfekte Bedingungen für Trekking in Luang Namtha und Phongsali.' : ''}
${s.season === 'winter' && cc.id === 'laos' ? '- Beachte: BESTE REISEZEIT – trocken, angenehm (20–28°C im Tiefland). In den Bergen (Phongsali, Xieng Khouang) kann es nachts bis nahe 0°C fallen – warme Kleidung nötig! Hochsaison: Luang Prabang und Vang Vieng am vollsten, Unterkünfte im Voraus buchen. Hmong New Year (Dezember). Bun Pha Wet (Januar/Februar). Perfekte Bedingungen für Slow Boat, Trekking und Radfahren.' : ''}
${s.season === 'spring' && cc.id === 'namibia' ? '- Beachte: NAMIBIA HERBST (Südhalbkugel) – Ende der Regenzeit. Landschaft noch grün, gute Tierbeobachtung da Vegetation zurückgeht. Angenehme 20–28°C. Einige Schotterpisten können nach Regen schwer befahrbar sein. Fish River Canyon Wanderung ab Mitte April möglich. Etosha: Tiere beginnen sich an Wasserlöchern zu sammeln.' : ''}
${s.season === 'summer' && cc.id === 'namibia' ? '- Beachte: NAMIBIA WINTER = BESTE REISEZEIT! Trockene Tage, klare Nächte, kühle Morgen (bis 0°C in der Wüste!). Etosha-Wasserlöcher optimal – Tiere sammeln sich an den wenigen Wasserquellen. Warme Kleidung für Morgen/Abend einpacken! Sossusvlei bei Sonnenaufgang: perfektes Licht für Fotografie. Hochsaison – Lodges und Mietwagen unbedingt im Voraus buchen!' : ''}
${s.season === 'autumn' && cc.id === 'namibia' ? '- Beachte: NAMIBIA FRÜHLING – heißeste Zeit, Temperaturen bis 40°C in der Wüste und im Süden. Weniger Touristen als Jun–Aug. Tierbeobachtung in Etosha sehr gut (maximale Trockenheit). Gegen November erste Regenschauer möglich. Ab Oktober blüht die Wüste stellenweise. Caprivi/Zambezi-Region wird üppig grün.' : ''}
${s.season === 'winter' && cc.id === 'namibia' ? '- Beachte: NAMIBIA SOMMER = REGENZEIT (Green Season). Dramatische Gewitterstürme am Nachmittag. Schotterstraßen und Flussdurchquerungen können überflutet sein! Kalahari und Etosha sehr grün, viele Jungtiere. Sossusvlei kann nach Starkregen schwer erreichbar sein. Günstigere Lodge-Preise. Caprivi-Streifen besonders üppig. Straßenzustand vorab prüfen!' : ''}
${s.season === 'spring' && cc.id === 'southafrica' ? '- Beachte: SÜDAFRIKA HERBST – angenehmes Wetter (18–25°C), ideale Reisezeit! Safari-Bedingungen werden besser (Vegetation lichtet sich). Krüger-Park: Trockenzeit beginnt, Tiere sammeln sich an Wasserstellen. Walbeobachtung endet (letzte Wale bis Mai). Kapstadt und Garden Route: mildes, sonniges Wetter, weniger Touristen. Weinlese im Westkap (Feb–Apr). Herbstlaub in den Winelands.' : ''}
${s.season === 'summer' && cc.id === 'southafrica' ? '- Beachte: SÜDAFRIKA WINTER – BESTE SAFARI-ZEIT! Trockene Tage, kühle Nächte (Kruger: 5–25°C). Tiere sammeln sich an Wasserlöchern. Kapstadt: Regenzeit (Westkap-Winterregen), 8–18°C, kann nass und stürmisch sein. Garden Route: milder, aber auch Regen möglich. Durban/KwaZulu-Natal: trocken und angenehm (18–24°C). Drakensberg: kalt, Schnee möglich. Walbeobachtung in Hermanus beginnt (Juni–Nov). TIPP: Warme Kleidung für Safari-Morgenfahrten!' : ''}
${s.season === 'autumn' && cc.id === 'southafrica' ? '- Beachte: SÜDAFRIKA FRÜHLING – Wildblumenblüte im Namaqualand und Westkap (Aug–Sep, spektakulär!). Walbeobachtung in Hermanus auf dem Höhepunkt (Sept–Okt). Jacaranda-Blüte in Pretoria (Oktober). Temperaturen 20–28°C. Safari noch gut (Ende Trockenzeit). Kapstadt wird sonniger und wärmer. Ab Ende November beginnen Schulferien – Preise steigen.' : ''}
${s.season === 'winter' && cc.id === 'southafrica' ? '- Beachte: SÜDAFRIKA SOMMER – HOCHSAISON! Heiß (25–35°C+). Weihnachten/Neujahr: Küstenorte extrem voll und teuer, Hotels weit im Voraus buchen! Kruger-Park: üppige Vegetation erschwert Tierbeobachtung, aber Vogelwelt am besten. Nachmittags-Gewitter im Landesinneren häufig. Kapstadt: beste Zeit, sonnig und warm (25–30°C), aber Wind. LINKSVERKEHR beachten!' : ''}
${s.season === 'spring' && cc.id === 'costarica' ? '- Beachte: TROCKENZEIT in Costa Rica (Dez–Apr). Beste Reisezeit für Pazifikküste (Guanacaste, Nicoya, Manuel Antonio). Sonnig und warm (25–35°C). HOCHSAISON = höhere Preise, volle Hotels, besonders Weihnachten–Ostern. Semana Santa extrem voll. Monteverde und Manuel Antonio früh buchen. Karibikküste kann auch in Trockenzeit Regen bekommen.' : ''}
${s.season === 'summer' && cc.id === 'costarica' ? '- Beachte: Beginn der REGENZEIT (Green Season). Morgens oft sonnig, nachmittags heftige aber kurze Schauer. Vorteile: günstiger, weniger Touristen, üppig grün. Tortuguero ideal: Schildkröten-Nistzeit Juli–Oktober. Karibikküste hat September–Oktober Mini-Trockenzeit. Osa/Corcovado: Wege matschig, einige Lodges schließen Sep–Okt. 4x4-Mietwagen empfohlen.' : ''}
${s.season === 'autumn' && cc.id === 'costarica' ? '- Beachte: HÖHEPUNKT der Regenzeit (Sep–Nov). Stärkste Niederschläge, besonders Oktober. Drake Bay/Osa schwer erreichbar – Straßen überflutet, Lodges geschlossen. Karibikküste hat paradoxerweise Sep–Okt oft gutes Wetter (Mini-Trockenzeit). Walbeobachtung in Uvita: Buckelwale Aug–Okt aus dem Südpazifik! 4x4 PFLICHT. Budget-Reisende profitieren von Nebensaison-Preisen.' : ''}
${s.season === 'winter' && cc.id === 'costarica' ? '- Beachte: Beginn der TROCKENZEIT (Dez–Feb). Weihnachts-/Neujahrs-HOCHSAISON: höchste Preise, Hotels und Mietwagen Wochen im Voraus ausgebucht! Perfektes Wetter an der Pazifikküste. Karibikküste kann regnerisch sein (Dez–Jan). Vulkane Arenal und Poás oft wolkenverhangen am Morgen. Frühbucher-Empfehlung für alle Unterkünfte.' : ''}
${s.season === 'spring' && cc.id === 'australia' ? '- Beachte: AUSTRALIEN HERBST (Südhalbkugel) – angenehme 15–25°C, ideal für die meisten Regionen. Top End (Darwin, Kakadu): Ende Wet Season, einige Straßen noch überflutet, Wasserfälle spektakulär. Weinlese im Barossa Valley und Margaret River (Feb–Apr). Great Barrier Reef: ruhige See, gute Sicht. Sydney und Melbourne: angenehm warm, weniger Touristen.' : ''}
${s.season === 'summer' && cc.id === 'australia' ? '- Beachte: AUSTRALIEN WINTER – milde Reisezeit! BESTE ZEIT für Top End (Darwin, Kakadu, Kimberley): Trockenzeit, alle Straßen passierbar, 30°C. Beste Zeit für Great Barrier Reef. Outback (Uluru, Coober Pedy): angenehme Tage (20°C), kalte Nächte (bis 0°C!). Sydney: mild (10–18°C). Melbourne: kühl (7–14°C). Tasmanien: kalt (3–11°C). Walbeobachtung Ostküste (Jun–Nov). LINKSVERKEHR!' : ''}
${s.season === 'autumn' && cc.id === 'australia' ? '- Beachte: AUSTRALIEN FRÜHLING – Wildblumen in Westaustralien (Aug–Nov, spektakulär!). Top End: Build-up Season – extrem schwül, erste Gewitter, noch nicht ideal. Great Barrier Reef: Korallen-Laichzeit (Nov). Melbourne und Sydney: angenehm (18–25°C), perfekt. Walbeobachtung auf Höhepunkt (Sep–Nov). Ab November Schulferien – Preise steigen.' : ''}
${s.season === 'winter' && cc.id === 'australia' ? '- Beachte: AUSTRALIEN SOMMER = HOCHSAISON! Heiß bis extrem (Sydney 25–30°C, Outback 35–45°C!). Weihnachten/Neujahr: Küste extrem voll und teuer! ACHTUNG: Top End hat WET SEASON – Straßen überflutet, Kakadu teilweise geschlossen, Kimberley NICHT bereisbar! Zyklongefahr im Norden. Buschbrandrisiko im Südosten. Queensland: Stinger Season (giftige Quallen Nov–Mai). LINKSVERKEHR!' : ''}
${s.season === 'spring' && cc.id === 'peru' ? '- Beachte: Übergangssaison (Sep–Nov) – weniger Touristen, gutes Wetter in den Anden. Regenzeit beginnt Ende November. Gute Balance aus Wetter und Preisen. HÖHENKRANKHEIT: Bei Cusco (3.400m), Puno (3.830m), Colca-Anfahrt (4.910m Pass) IMMER warnen – erst Sacred Valley (2.800m) zum Akklimatisieren, dann Cusco. Inka Trail normal buchbar.' : ''}
${s.season === 'summer' && cc.id === 'peru' ? '- Beachte: REGENZEIT in Anden und Amazonas (Dez–Feb)! Wanderwege rutschig, Erdrutsche möglich. INKA TRAIL IM FEBRUAR GESCHLOSSEN (Wartung)! Lima dagegen sonnig und warm – beste Küstenzeit. Máncora/Nordküste: Hochsaison, heiß. HÖHENKRANKHEIT: Bei Cusco (3.400m), Puno (3.830m) IMMER warnen. Amazonas (Iquitos, Puerto Maldonado): hoher Wasserstand, überflutete Wälder per Boot erreichbar, mehr Moskitos, Malaria-Prophylaxe nötig.' : ''}
${s.season === 'autumn' && cc.id === 'peru' ? '- Beachte: Regen lässt nach (Mär–Mai). April noch feucht in den Anden, Mai bereits trocken – GEHEIMTIPP mit wenig Touristen. Landschaft grün. HÖHENKRANKHEIT: Bei Cusco (3.400m), Puno (3.830m), Colca (4.910m Pass) IMMER warnen – erst Sacred Valley (2.800m) zum Akklimatisieren. Amazonas: Wasserstand noch hoch, gute Tierbeobachtung.' : ''}
${s.season === 'winter' && cc.id === 'peru' ? '- Beachte: TROCKENZEIT = HOCHSAISON Anden (Jun–Aug)! Perfekt für Machu Picchu, Cusco, Colca Canyon, Titicacasee. ABER: Kalt in der Höhe – Nachtfrost über 3.500m (Cusco bis -5°C, Puno bis -10°C)! Warme Kleidung unbedingt nötig. Juli Fiestas Patrias (28.7.) = interne Hochsaison, Hotels ausgebucht. Inka Trail sehr voll – Monate vorher buchen! Lima grau und kühl (garúa/Nebel). HÖHENKRANKHEIT: IMMER warnen bei Cusco, Puno, Colca. Amazonas (Iquitos, Puerto Maldonado): trockenere Monate, beste Tierbeobachtung, weniger Moskitos.' : ''}
${s.season === 'spring' && cc.id === 'mexico' ? '- Beachte: Beste Reisezeit für Zentralmexiko, heißeste Monate vor der Regenzeit (30–35°C). ACHTUNG: Semana Santa (Osterwoche) = ganz Mexiko reist, Strände überfüllt, Preise verdoppelt! Spring Break (März) = Cancún/Riviera Maya überlaufen mit US-Partytouristen. Höhenlage: Mexiko-Stadt (2.240m), Puebla (2.160m), San Cristóbal (2.200m) – Akklimatisierung nötig bei Familien mit Kleinkindern.' : ''}
${s.season === 'summer' && cc.id === 'mexico' ? '- Beachte: REGENZEIT – nachmittags kurze, heftige Schauer, morgens meist sonnig. Hochland bleibt bereisbar. HURRIKAN-SAISON an Karibik- und Pazifikküste (Jun–Nov)! Cancún, Tulum, Playa del Carmen, Puerto Vallarta betroffen. Walhai-Saison bei Holbox/Isla Mujeres (Jun–Sep) – einmaliges Erlebnis. Oaxaca: Guelaguetza-Festival im Juli. Weniger Touristen, günstigere Preise (Green Season).' : ''}
${s.season === 'autumn' && cc.id === 'mexico' ? '- Beachte: September = regenreichster Monat. HÖCHSTES HURRIKAN-RISIKO an Küsten (Sep–Okt)! Ab November wird es trockener. DÍA DE LOS MUERTOS (31. Okt – 2. Nov) = Highlight in Oaxaca und Mexiko-Stadt – Hotels WEIT im Voraus buchen! Guanajuato: Cervantino-Festival (Oktober). Cenoten-Besuche in Yucatán ganzjährig möglich.' : ''}
${s.season === 'winter' && cc.id === 'mexico' ? '- Beachte: TROCKENZEIT = beste Reisezeit! Dezember-Januar = Hochsaison (Weihnachten/Silvester), Hotels und Flüge teuer. Walbeobachtung in Los Cabos (Dez–Apr). Hochland nachts kühl (5–10°C), warme Kleidung für Abende. Yucatán angenehm warm (25–30°C). Cenoten perfekt. Tren Maya verbindet Yucatán bequem. Höhenlage beachten: Mexiko-Stadt (2.240m), Puebla (2.160m), San Cristóbal (2.200m).' : ''}
${s.season === 'spring' && cc.id === 'chile' ? '- Beachte: SÜDHALBKUGEL – europäischer Frühling = chilenischer Herbst (Mär–Mai). Zentralchile angenehm (15-25°C), Weinlese im Maipo/Colchagua-Tal, herbstliche Färbung im Seengebiet. Atacama ganzjährig gut, nachts kalt. PATAGONIEN: SAISON ENDET – Torres del Paine schließt teils ab April, starke Winde und Kälte. Patagonien-Reisen nur bis Ende März/Mitte April empfehlen! Osterinsel angenehm warm. Höhenlage: San Pedro de Atacama (2.400m) – Akklimatisierung nötig, Geysire El Tatio (4.300m) nur für Akklimatisierte.' : ''}
${s.season === 'summer' && cc.id === 'chile' ? '- Beachte: SÜDHALBKUGEL – europäischer Sommer = chilenischer Winter (Jun–Aug). Santiago/Valparaíso: Regenzeit (5-15°C), Skigebiete in den Anden geöffnet (Valle Nevado, Portillo). Seengebiet: Kalt und regnerisch, manche Unterkünfte geschlossen. Atacama weiterhin trocken und sonnig, aber nachts bis -10°C in San Pedro. PATAGONIEN GESCHLOSSEN – Torres del Paine weitgehend unzugänglich, Schnee und Eis! Nur Punta Arenas bereisbar. Osterinsel kühler (18-22°C) aber besuchbar. WICHTIG: Patagonien und Seengebiet im chilenischen Winter NICHT empfehlen! Atacama und Norden ganzjährig möglich.' : ''}
${s.season === 'autumn' && cc.id === 'chile' ? '- Beachte: SÜDHALBKUGEL – europäischer Herbst = chilenischer Frühling (Sep–Nov). Zentralchile wärmer werdend (18-28°C). Mögliches Desierto Florido (blühende Atacama). Seengebiet erwacht aus dem Winter, Vulkan Osorno schneebedeckt. PATAGONIEN: SAISON BEGINNT – Torres del Paine ab Oktober/November wieder zugänglich aber unberechenbar. Windstärken im Frühling extrem. Torres del Paine ab November empfehlen, Oktober ist Übergang. Höhenlage: San Pedro (2.400m) Akklimatisierung nötig.' : ''}
${s.season === 'winter' && cc.id === 'chile' ? '- Beachte: SÜDHALBKUGEL – europäischer Winter = chilenischer Sommer (Dez–Feb) = BESTE REISEZEIT für fast alles! Zentralchile warm und trocken (25-35°C), Strände voll, Weingüter geöffnet. Seengebiet perfekt (20-28°C). PATAGONIEN HOCHSAISON – längste Tage (bis 22h hell), windig und wechselhaft (5-18°C). W-Trek-Refugios MONATE im Voraus buchen! Atacama heiß tagsüber (30°C+), nachts kühl. Osterinsel warm und feucht (25-30°C). HOCHSAISON überall – Hotels und Torres del Paine Permits FRÜH buchen! Höhenlage: San Pedro (2.400m), Geysire El Tatio (4.300m) – bei Familie mit Kleinkindern Höhenwarnung ab 2.000m!' : ''}
${s.season === 'spring' && cc.id === 'colombia' ? '- Beachte: Trockenzeit endet (Mär–Mai), ideal für die meisten Regionen. SEMANA SANTA (Ostern) ist Hochsaison – Kolonialstädte wie Popayán und Mompox sehr voll, Hotels weit im Voraus buchen! Bogotá angenehm (14-20°C), Höhenlage 2.640m – Akklimatisierung einplanen! Karibikküste (Cartagena, Santa Marta) warm und trocken. Caño Cristales noch geschlossen (öffnet Juni).' : ''}
${s.season === 'summer' && cc.id === 'colombia' ? '- Beachte: Regenzeit in den Anden (Bogotá, Eje Cafetero) – nachmittägliche Schauer, morgens meist sonnig. ABER: Beste Zeit für Karibikküste (Cartagena, Santa Marta, San Andrés)! Caño Cristales geöffnet ab Juni – einzigartiger Regenbogenfluss! Buckelwale an der Pazifikküste (Nuquí/Bahía Solano) ab Juni. Ciudad Perdida Trek gut machbar. Bogotá 2.640m – Höhenwarnung bei Familien mit Kleinkindern.' : ''}
${s.season === 'autumn' && cc.id === 'colombia' ? '- Beachte: Regenreichste Monate in vielen Regionen (Sep–Nov). Letzte Chance für Caño Cristales (schließt Mitte November)! Wale an der Pazifikküste bis Oktober. Weniger Touristen und günstigere Preise – gute Nebensaison. Bogotá 2.640m Höhe, kühl und regnerisch (12-18°C). Tayrona-Nationalpark bei Santa Marta teilweise geschlossen (Sep–Okt zur Regeneration).' : ''}
${s.season === 'winter' && cc.id === 'colombia' ? '- Beachte: TROCKENZEIT = BESTE REISEZEIT für Kolumbien! Dezember–Februar ideal für Anden und Karibikküste. HOCHSAISON: Weihnachten/Silvester/Neujahr – Cartagena, San Andrés und Strände extrem voll und teuer, früh buchen! Bogotá kühler (12-18°C), aber trocken und sonnig. Perfekt für Eje Cafetero (Salento, Cocora-Tal), Santander (San Gil, Barichara), und Kolonialstädte. Caño Cristales geschlossen (öffnet erst Juni). Bogotá 2.640m – Höhenwarnung.' : ''}
${s.season === 'spring' && cc.id === 'india' ? '- Beachte: HOT SEASON! Extreme Hitze in Nordindien (40-48°C in Delhi, Rajasthan, Varanasi). Holi-Festival im März – buntes Farbfestival, aber chaotisch in Großstädten. Rajasthan und Nordindien vor Mai meiden wenn möglich. Süd-Indien erträglicher (30-35°C). Kerala-Backwaters vor dem Monsun noch gut. Spiti Valley GESPERRT (Schnee). Hill Stations (Darjeeling, Munnar) angenehm kühl. HITZE-WARNUNG für Familien mit kleinen Kindern im Norden!' : ''}
${s.season === 'summer' && cc.id === 'india' ? '- Beachte: MONSUN! Schwere Regenfälle in fast ganz Indien. Mumbai und Kerala stark betroffen – Überschwemmungen möglich. Straßen und Zugstrecken können unterbrochen sein. ABER: Ladakh/Spiti Valley haben JETZT beste Reisezeit (Regenschatten des Himalaya). Rajasthan erträglicher als im Frühling. Goa: Strände leer, viele Restaurants geschlossen. NICHT empfohlen für die meisten Reiserouten außer Spiti/Ladakh.' : ''}
${s.season === 'autumn' && cc.id === 'india' ? '- Beachte: Monsun klingt ab (Sep), danach BESTE ÜBERGANGSZEIT. Landschaft grün und frisch. Oktober/November: Diwali-Festsaison! Pushkar Camel Fair (November). Temperaturen angenehm (25-32°C). Rajasthan, Kerala und Goa werden wieder gut bereisbar. Rann of Kutch: Rann Utsav startet November. Darjeeling: klare Himalaya-Sicht. Gute Zeit für fast alle Destinationen.' : ''}
${s.season === 'winter' && cc.id === 'india' ? '- Beachte: BESTE REISEZEIT für die meisten Regionen! Nordindien kühl und angenehm (15-25°C in Delhi/Rajasthan, nachts bis 5°C). Rajasthan: perfektes Reisewetter, aber Hochsaison und teuer. Kerala: warm und trocken, ideales Backwater-Wetter. Goa: Hochsaison, Strände voll. ABER: Dichte Nebel in Nordindien (Dez–Jan) – Flüge und Züge oft massive Verspätungen! Darjeeling: kalt (bis -5°C), aber klare Sicht. Spiti: GESPERRT (Schnee). Warme Kleidung für Nordindien-Abende nötig.' : ''}
${s.season === 'spring' && cc.id === 'guatemala' ? '- Beachte: Ende der TROCKENZEIT, ab Mai beginnende Regenzeit. März–April ideal mit sonnigem Wetter. SEMANA SANTA (Osterwoche) in Antigua = spektakuläre Prozessionen mit Blumenteppichen, aber Hotels Monate im Voraus ausgebucht und Preise verdreifacht! Ab Mai erste Nachmittagsschauer. Insgesamt gute Reisezeit.' : ''}
${s.season === 'summer' && cc.id === 'guatemala' ? '- Beachte: REGENZEIT. Vormittags sonnig, nachmittags heftige kurze Schauer. Petén (Tikal/Flores) heiß und schwül (35°C+). Bergstraßen zu Todos Santos und Nebaj können schlammig werden. Semuc Champey: höherer Wasserstand, türkisere Becken. Weniger Touristen und günstigere Preise. 4x4 für abgelegene Ziele empfohlen.' : ''}
${s.season === 'autumn' && cc.id === 'guatemala' ? '- Beachte: STÄRKSTE Niederschläge (Sep–Okt). Hurrikan-Risiko an Karibikküste (Livingston, Río Dulce). Einige Bergstraßen überflutet oder unpassierbar. Nebaj, Todos Santos und Semuc Champey schwerer erreichbar. Ab November Wetterbesserung (Trockenzeit beginnt). Budget-Reisende profitieren von Nebensaison-Preisen.' : ''}
${s.season === 'winter' && cc.id === 'guatemala' ? '- Beachte: BESTE REISEZEIT = Trockenzeit! Sonnig und angenehm (Hochland 15–25°C, Tiefland 25–32°C). Hochsaison Weihnachten–Neujahr: höhere Preise, Hotels in Antigua und am Atitlán-See ausgebucht. Hochland-Nächte kühl (bis 5°C in Quetzaltenango, Todos Santos). Tikal perfekt: trockener Dschungel, gute Sicht. Ideales Wetter für Acatenango-Vulkan-Trek.' : ''}

## Antwortformat

Antworte NUR mit validem JSON in exakt diesem Format (keine Erklärungen, kein Markdown):

{
  "routeName": "Kreativer Name der Route auf Deutsch",
  "routeDescription": "Poetische Beschreibung der Route in 2-3 Sätzen auf Deutsch",
  "totalNights": ${s.days - 1},
  "stops": [
    {
      "city": "Stadtname",
      "wiki": "English_Wikipedia_article_title_for_city",
      "nights": 3,
      "lat": 31.23,
      "lng": 121.47,
      "tagline": "Poetische Kurzbeschreibung auf Deutsch",
      "highlights": [
        { "icon": "emoji", "title": "Highlight-Name", "description": "Ausführliche Beschreibung auf Deutsch, 2-3 Sätze", "wiki": "English_Wikipedia_article_name" }
      ],
      "dailyPlan": [
        { "day": 1, "title": "Tagestitel auf Deutsch", "activities": "Detaillierte Aktivitäten-Beschreibung auf Deutsch" }
      ],
      "tips": [
        { "icon": "emoji", "text": "Praktischer Tipp auf Deutsch" }
      ]
    }
  ],
  "legs": [
    { "from": "Stadtname", "to": "Stadtname", "mode": "${cc.legModes}", "duration": "~Xh", "cost": "~X€" }
  ],
  "budget": {
    "accommodation": "~X€/Nacht (Mittelklasse)",
    "food": "~X€/Tag",
    "transport": "~X€ gesamt",
    "activities": "~X€ gesamt",
    "total": "~X€ gesamt (geschätzt)"
  },
  "travelInfo": [
    { "icon": "emoji", "title": "Kategorie", "text": "Praktischer Hinweis auf Deutsch" }
  ]
}

Wichtig:
${s.group === 'family' && s.childAge ? `- FAMILIEN-TIPPS: Da eine Familie mit Kind (${s.childAge} Jahre) reist, MUSS jeder Stopp mindestens einen familienspezifischen Tipp enthalten (z.B. Buggy-Tauglichkeit, Kindermenu, nächstes Krankenhaus, Spielplätze, kindgerechte Aktivitäten).` : ''}
- Pro Stopp genau 3 Highlights, einen dailyPlan pro Nacht, und 2-3 praktische Tipps
- TAGESPLAN-STRUKTUR: Die Weiterreise zum nächsten Stopp gehört IMMER in den LETZTEN Tag des AKTUELLEN Stopps (z.B. "Vormittag: Letzte Erkundung der Altstadt. Nachmittag: Schnellzug nach Hangzhou (~1h)"). Der ERSTE Tag eines neuen Stopps beginnt mit der Ankunft dort (z.B. "Ankunft, Einchecken. Nachmittag: West Lake erkunden"). Ausnahme: Der allererste Stopp beginnt mit der Ankunft am Flughafen/Bahnhof und Transfer zum Hotel.

BILDER – EXTREM WICHTIG:
- JEDER Stopp braucht ein "wiki"-Feld mit dem EXAKTEN englischen Wikipedia-Artikelnamen der Stadt.
- JEDES Highlight braucht ein "wiki"-Feld mit dem EXAKTEN englischen Wikipedia-Artikelnamen der Sehenswürdigkeit.
- Die wiki-Felder werden zum Laden von Fotos verwendet. KEINE deutschen Namen! NUR englische Wikipedia-Titel!
- Nutze NUR bekannte Wikipedia-Artikel die garantiert ein Foto haben.
- Hier eine Referenzliste – verwende GENAU diese Titel wenn der Stopp/das Highlight vorkommt:
  ${cc.wikiReferences}
  Für andere Sehenswürdigkeiten: Verwende den genauen englischen Wikipedia-Artikeltitel. Prüfe gedanklich, ob der Artikel existiert und ein Bild hat.
- "legs" enthält die Transportverbindungen zwischen ALLEN aufeinanderfolgenden Stopps, INKLUSIVE dem Rücktransfer zum Abreiseort (${returnStr}) als letztes Leg (auch wenn Start- und Endstadt identisch sind!)
- Alle Texte auf Deutsch
- Nutze passende Emojis für Icons
- Kosten in Euro (ungefähre Umrechnung)
- "budget" enthält eine grobe Kostenschätzung für die gesamte Reise pro Person (Mittelklasse-Hotels, lokales Essen, alle Transportkosten, Eintritte)
- "travelInfo" enthält 4-5 allgemeine Reisetipps passend zur Reise: z.B. Visum, SIM-Karte/Internet, Bezahlen, Sprache/Apps, beste Reise-Apps, Gesundheit – je nach Saison und Reisegruppe anpassen`;
  },

  /**
   * Baut einen Anpassungs-Prompt basierend auf der aktuellen Route + Nutzerwunsch
   */
  buildAdjustPrompt(adjustText, currentResult) {
    const s = App.state;
    const cc = CountryConfig.current;

    // Aktuelle Route kompakt zusammenfassen
    const currentStops = currentResult.stops.map((stop, i) =>
      `${i + 1}. ${stop.city} (${stop.nights} Nächte)`
    ).join('\n');

    const currentLegs = (currentResult.legs || []).map(leg => {
      const modeLabels = { flight: 'Flug', bus: 'Bus', sleeper_bus: 'Bus', boat: 'Boot', motorbike: 'Motorrad', train: 'Zug', car: 'Auto' };
      const normalized = Results.normalizeLegMode(leg.mode);
      const modeLabel = modeLabels[normalized] || 'Auto';
      return `${leg.from} → ${leg.to}: ${modeLabel}, ${leg.duration}`;
    }).join('\n');

    const returnStr = s.sameReturn
      ? `${s.airport} (gleicher Ort)`
      : (s.departureAirport || s.airport);

    const dests = cc.destinations;
    const mainDests = dests.filter(d => !d.offbeat);
    const offbeatDests = dests.filter(d => d.offbeat);

    const destRef = mainDests.map(d =>
      `- ${d.name} (${d.lat}, ${d.lng}) – Tags: ${d.tags.join(', ')} – ${d.highlights}`
    ).join('\n');

    const offbeatRef = offbeatDests.map(d =>
      `- ${d.name} (${d.lat}, ${d.lng}) – Tags: ${d.tags.join(', ')} – ${d.highlights}`
    ).join('\n');

    return `Du bist ein erfahrener ${cc.expertRole}. Der Nutzer hat bereits eine Reiseroute und möchte diese ANPASSEN.

## Aktuelle Route

Name: ${currentResult.routeName}
Gesamtdauer: ${currentResult.totalNights} Nächte (${s.days} Tage)
Ankunftsort: ${s.airport}
Abreise ab: ${returnStr}

### Aktuelle Stopps:
${currentStops}

### Aktuelle Transportverbindungen:
${currentLegs}

## Änderungswunsch des Nutzers

"${adjustText}"

## Verfügbare Ziele

### Hauptziele
${destRef}

### Off the Beaten Path
${offbeatRef}

## WICHTIGE Regeln für die Anpassung

1. **Gesamtdauer bleibt EXAKT gleich: ${currentResult.totalNights} Nächte (${s.days} Tage)**
2. **ALLE bestehenden Stopps MÜSSEN erhalten bleiben**, es sei denn der Nutzer bittet EXPLIZIT darum, einen Stopp zu entfernen oder zu ersetzen. Entferne NIEMALS eigenständig Stopps!
3. Der Nutzerwunsch hat HÖCHSTE Priorität – aber NUR wenn er explizit ist
4. Wenn ein Stopp hinzugefügt wird: kürze die Nächte bei 1-2 bestehenden Stopps um jeweils 1 Nacht (minimum 2 Nächte pro Stopp). Füge den neuen Stopp an der geographisch sinnvollen Position ein.
5. Wenn der Nutzer einen Stopp entfernen will: NUR DANN entferne ihn und verteile dessen Nächte auf die verbleibenden Stopps
6. Wenn der Nutzer mehr/weniger Zeit an einem Ort will: passe die Nächte an und kürze/verlängere an anderer Stelle
7. Die Reihenfolge der bestehenden Stopps soll möglichst beibehalten werden – nur bei neuem Stopp geographisch sinnvoll einsortieren
8. Route muss weiterhin geographisch sinnvoll sein (keine Zickzack-Routen)
9. Route MUSS am Ankunftsort (${s.airport}) starten und am Abreiseort (${returnStr}) enden
10. Minimum 2 Nächte pro Stopp
${s.sameReturn
  ? `11. Start- und Endstadt sind IDENTISCH (${s.airport}). Der letzte Stopp ist nur 1 Nacht als Abreisetag.`
  : `11. Letzter Stopp ist ${returnStr} mit mindestens 2 Nächten.`}

## Antwortformat

Antworte NUR mit validem JSON in exakt diesem Format (keine Erklärungen, kein Markdown):

{
  "routeName": "Kreativer Name der Route auf Deutsch",
  "routeDescription": "Poetische Beschreibung der Route in 2-3 Sätzen auf Deutsch",
  "totalNights": ${currentResult.totalNights},
  "stops": [
    {
      "city": "Stadtname",
      "wiki": "English_Wikipedia_article_title_for_city",
      "nights": 3,
      "lat": 31.23,
      "lng": 121.47,
      "tagline": "Poetische Kurzbeschreibung auf Deutsch",
      "highlights": [
        { "icon": "emoji", "title": "Highlight-Name", "description": "Ausführliche Beschreibung auf Deutsch, 2-3 Sätze", "wiki": "English_Wikipedia_article_name" }
      ],
      "dailyPlan": [
        { "day": 1, "title": "Tagestitel auf Deutsch", "activities": "Detaillierte Aktivitäten-Beschreibung auf Deutsch" }
      ],
      "tips": [
        { "icon": "emoji", "text": "Praktischer Tipp auf Deutsch" }
      ]
    }
  ],
  "legs": [
    { "from": "Stadtname", "to": "Stadtname", "mode": "${cc.legModes}", "duration": "~Xh", "cost": "~X€" }
  ],
  "budget": {
    "accommodation": "~X€/Nacht (Mittelklasse)",
    "food": "~X€/Tag",
    "transport": "~X€ gesamt",
    "activities": "~X€ gesamt",
    "total": "~X€ gesamt (geschätzt)"
  },
  "travelInfo": [
    { "icon": "emoji", "title": "Kategorie", "text": "Praktischer Hinweis auf Deutsch" }
  ]
}

Wichtig:
- Pro Stopp genau 3 Highlights, einen dailyPlan pro Nacht, und 2-3 praktische Tipps
- TAGESPLAN-STRUKTUR: Die Weiterreise zum nächsten Stopp gehört IMMER in den LETZTEN Tag des AKTUELLEN Stopps (z.B. "Vormittag: Letzte Erkundung der Altstadt. Nachmittag: Schnellzug nach Hangzhou (~1h)"). Der ERSTE Tag eines neuen Stopps beginnt mit der Ankunft dort (z.B. "Ankunft, Einchecken. Nachmittag: West Lake erkunden"). Ausnahme: Der allererste Stopp beginnt mit der Ankunft am Flughafen/Bahnhof.
- JEDER Stopp braucht ein "wiki"-Feld mit dem EXAKTEN englischen Wikipedia-Artikelnamen
- JEDES Highlight braucht ein "wiki"-Feld mit dem EXAKTEN englischen Wikipedia-Artikelnamen
- "legs" enthält Transportverbindungen zwischen ALLEN aufeinanderfolgenden Stopps
- Alle Texte auf Deutsch, Kosten in Euro
- Referenz-Wiki-Titel: ${cc.adjustWikiReferences}`;
  },

  /**
   * Generiert eine angepasste Route basierend auf der aktuellen Route + Nutzerwunsch
   */
  async adjustRoute(adjustText, currentResult) {
    const prompt = this.buildAdjustPrompt(adjustText, currentResult);

    try {
      console.log(`[Adjust] Gemini – versuche: ${this.GEMINI_MODEL}...`);
      const text = await this.callGemini(prompt);
      const result = this.parseResponse(text);
      console.log(`[Adjust] Erfolg mit ${this.GEMINI_MODEL}`);
      return result;
    } catch (err) {
      console.error(`[Adjust] Gemini fehlgeschlagen:`, err.message);
      const isQuota = err.message?.includes('quota') || err.message?.includes('rate') || err.status === 429;
      if (isQuota) {
        throw new Error('Gemini ist gerade überlastet (Rate-Limit). Bitte warte 1-2 Minuten und versuche es erneut.');
      }
      throw new Error(err.message || 'Anpassung fehlgeschlagen. Bitte versuche es erneut.');
    }
  },

  /**
   * Wartet eine bestimmte Anzahl Millisekunden
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * Fetch mit Timeout – bricht ab wenn die Antwort zu lange dauert
   */
  async fetchWithTimeout(url, options) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.FETCH_TIMEOUT_MS);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      return response;
    } catch (err) {
      if (err.name === 'AbortError') {
        throw new Error('Die Routenplanung hat zu lange gedauert. Bitte versuche es erneut.');
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }
  },

  /**
   * API-Call via Google AI Studio (Gemini) mit Retry bei Rate-Limit
   */
  async callGemini(prompt, retryCount = 0) {
    // Proxy-Modus (Vercel) oder Direkt-Modus (lokaler API-Key)
    const useProxy = !App.apiKey;

    let response;
    if (useProxy) {
      response = await this.fetchWithTimeout('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 65536,
            responseMimeType: 'application/json'
          }
        })
      });
    } else {
      const url = `${this.GEMINI_BASE_URL}${this.GEMINI_MODEL}:generateContent?key=${App.apiKey}`;
      response = await this.fetchWithTimeout(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 65536,
            responseMimeType: 'application/json'
          }
        })
      });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const msg = errorData?.error?.message || `HTTP ${response.status}`;

      // Rate-Limit / Quota: einmal warten und erneut versuchen
      if (response.status === 429 && retryCount < this.MAX_RETRIES) {
        const retryMatch = msg.match(/retry\s+in\s+([\d.]+)s/i);
        const delay = retryMatch ? Math.ceil(parseFloat(retryMatch[1]) * 1000) : this.RETRY_DELAY_MS;
        const clampedDelay = Math.min(delay, 60000);
        console.log(`[Gemini] Rate-Limit – warte ${clampedDelay / 1000}s...`);
        this.updateLoadingStatus(`Rate-Limit – warte ${Math.ceil(clampedDelay / 1000)}s...`);
        await this.sleep(clampedDelay);
        return this.callGemini(prompt, retryCount + 1);
      }

      const err = new Error(msg);
      err.status = response.status;
      throw err;
    }

    const data = await response.json();

    // Thinking-Modelle können mehrere Parts zurückgeben (thought + output)
    const candidate = data?.candidates?.[0];
    if (!candidate) throw new Error('Leere Antwort von Gemini');

    // Abbruchgrund prüfen
    if (candidate.finishReason && candidate.finishReason !== 'STOP') {
      console.warn(`[Gemini] finishReason: ${candidate.finishReason}`);
    }

    // Den Part mit dem JSON finden (letzter Text-Part oder der mit '{')
    const parts = candidate.content?.parts || [];
    let text = null;
    for (let i = parts.length - 1; i >= 0; i--) {
      if (parts[i].text && parts[i].text.includes('{')) {
        text = parts[i].text;
        break;
      }
    }
    if (!text) text = parts[parts.length - 1]?.text;
    if (!text) throw new Error('Leere Antwort von Gemini');

    console.log(`[Gemini] Response: ${text.length} Zeichen, ${parts.length} Part(s), finishReason: ${candidate.finishReason}`);
    return text;
  },

  /**
   * Parst den JSON-Text aus der API-Antwort
   */
  parseResponse(text) {
    // Markdown-Code-Fences entfernen
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

    // Nur den JSON-Block extrahieren (alles vor dem ersten '{' wegwerfen)
    const jsonStart = text.indexOf('{');
    if (jsonStart > 0) {
      text = text.substring(jsonStart);
    }

    // Unescapte Steuerzeichen innerhalb von JSON-Strings reparieren
    text = this.fixJsonStrings(text);

    // Erst direkt versuchen
    try {
      const result = JSON.parse(text);
      if (result.stops && Array.isArray(result.stops) && result.stops.length > 0) {
        return result;
      }
      throw new Error('Keine Stopps im Ergebnis');
    } catch (firstError) {
      console.warn('[Gemini] Erster Parse fehlgeschlagen:', firstError.message);
    }

    // Abgeschnittenes JSON reparieren
    console.warn('[Gemini] Versuche JSON-Reparatur...');
    text = this.repairTruncatedJson(text);

    const result = JSON.parse(text);
    if (!result.stops || !Array.isArray(result.stops) || result.stops.length === 0) {
      throw new Error('Keine Stopps im Ergebnis');
    }
    return result;
  },

  /**
   * Repariert unescapte Steuerzeichen in JSON-Strings
   */
  fixJsonStrings(text) {
    let result = '';
    let inString = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      // String-Begrenzer toggling (escaped quotes ignorieren)
      if (ch === '"' && (i === 0 || text[i - 1] !== '\\')) {
        inString = !inString;
        result += ch;
        continue;
      }
      // Innerhalb eines Strings: Steuerzeichen escapen
      if (inString) {
        if (ch === '\n') { result += '\\n'; continue; }
        if (ch === '\r') { result += '\\r'; continue; }
        if (ch === '\t') { result += '\\t'; continue; }
      }
      result += ch;
    }
    return result;
  },

  /**
   * Repariert abgeschnittenes JSON (offene Strings, Arrays, Objekte schließen)
   */
  repairTruncatedJson(text) {
    // Offenen String erkennen und abschneiden
    let inString = false;
    let lastStringStart = -1;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '"' && (i === 0 || text[i - 1] !== '\\')) {
        if (!inString) lastStringStart = i;
        inString = !inString;
      }
    }
    // Wenn String noch offen → an letztem vollständigen Punkt abschneiden + schließen
    if (inString) {
      text = text.substring(0, lastStringStart) || text + '"';
    }

    // Trailing Kommas, unvollständige Key-Value-Paare entfernen
    text = text.replace(/,\s*$/, '');
    text = text.replace(/,\s*"[^"]*"\s*:\s*$/, '');
    text = text.replace(/,\s*"[^"]*$/, '');

    // Offene Klammern zählen und schließen
    let braces = 0, brackets = 0;
    inString = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '"' && (i === 0 || text[i - 1] !== '\\')) { inString = !inString; continue; }
      if (inString) continue;
      if (ch === '{') braces++;
      if (ch === '}') braces--;
      if (ch === '[') brackets++;
      if (ch === ']') brackets--;
    }

    // Trailing Komma nochmal prüfen (nach String-Abschnitt)
    text = text.replace(/,\s*$/, '');
    text += ']'.repeat(Math.max(0, brackets)) + '}'.repeat(Math.max(0, braces));

    return text;
  },

  /**
   * Aktualisiert den Status-Text im Loading-Screen
   */
  updateLoadingStatus(text) {
    const el = document.getElementById('loading-status');
    if (el) el.textContent = text;
  },

  /**
   * Generiert die Route via Gemini 2.5 Flash
   */
  // Inspirierende Reise-Zitate für den Ladescreen
  TRAVEL_QUOTES: [
    '„Die Welt ist ein Buch, und wer nicht reist, liest nur eine Seite."',
    '„Reisen ist die Sehnsucht nach dem Leben."',
    '„Nicht alle, die wandern, sind verloren."',
    '„Man reist nicht, um anzukommen, sondern um zu reisen."',
    '„Die beste Bildung findet ein gescheiter Mensch auf Reisen."',
    '„Einmal im Jahr solltest du einen Ort besuchen, an dem du noch nie warst."',
    '„Reisen veredelt den Geist und räumt mit Vorurteilen auf."'
  ],

  async generateRoute() {
    const prompt = this.buildPrompt();
    const quote = this.TRAVEL_QUOTES[Math.floor(Math.random() * this.TRAVEL_QUOTES.length)];
    this.updateLoadingStatus(quote);

    try {
      console.log(`Gemini – versuche: ${this.GEMINI_MODEL}...`);
      const text = await this.callGemini(prompt);
      const result = this.parseResponse(text);
      console.log(`Erfolg mit ${this.GEMINI_MODEL}`);
      this.updateLoadingStatus('');
      return result;
    } catch (err) {
      this.updateLoadingStatus('');
      console.error(`Gemini ${this.GEMINI_MODEL} fehlgeschlagen:`, err.message);

      const isQuota = err.message?.includes('quota') || err.message?.includes('rate') || err.status === 429;
      if (isQuota) {
        throw new Error('Gemini ist gerade überlastet (Rate-Limit). Bitte warte 1-2 Minuten und versuche es erneut.');
      }
      throw new Error(err.message || 'Route konnte nicht generiert werden. Bitte versuche es erneut.');
    }
  }
};
