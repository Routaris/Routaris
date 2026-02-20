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
${s.additionalNotes ? `- Zusätzliche Wünsche des Nutzers: "${s.additionalNotes}"` : ''}

## Verfügbare Ziele in ${cc.countryInText}

### Hauptziele
${destRef}

### Off the Beaten Path (nur verwenden wenn vom Nutzer gepinnt)
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
7. Wähle zusätzliche Stopps passend zu den Interessen-Gewichtungen
8. Die Gesamtzahl der Nächte muss ${s.days - 1} betragen
${s.group === 'family' && s.childAge && (s.childAge === '0-1' || s.childAge === '1-3')
  ? '9. Familie mit Kleinkind: Bevorzuge buggyfreundliche Orte, vermeide zu viele Ortswechsel, maximal 4 Stopps.'
  : ''}
${s.season === 'summer' ? `- Beachte: Im Sommer ist es in ${cc.countryInText} oft sehr heiß und feucht. Empfehle kühlere Regionen oder Bergorte.` : ''}
${s.season === 'autumn' && cc.id === 'china' ? '- Beachte: Golden Week (1.-7. Oktober) – extrem volle Sehenswürdigkeiten. Empfehle das zu erwähnen.' : ''}
${s.season === 'autumn' && cc.id === 'vietnam' ? '- Beachte: Zentralvietnam hat im Herbst Taifun-Saison (Sept–Nov). Empfehle das zu erwähnen und ggf. Alternativen vorzuschlagen.' : ''}
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
      const modeLabel = leg.mode === 'flight' ? 'Flug' : leg.mode === 'bus' || leg.mode === 'sleeper_bus' ? 'Bus' : 'Zug';
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
        throw new Error(`Timeout nach ${this.FETCH_TIMEOUT_MS / 1000}s`);
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
    const url = `${this.GEMINI_BASE_URL}${this.GEMINI_MODEL}:generateContent?key=${App.apiKey}`;

    const response = await this.fetchWithTimeout(url, {
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
  async generateRoute() {
    if (!App.apiKey) {
      App.showApiKeyModal();
      throw new Error('API Key fehlt');
    }

    const prompt = this.buildPrompt();
    this.updateLoadingStatus(this.GEMINI_MODEL);

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
