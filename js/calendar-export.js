/* ============================================
   CALENDAR-EXPORT.JS – ICS-Kalenderexport
   Exportiert die Route als .ics Datei mit
   einem Event pro Reisetag + Transportetappen
   ============================================ */

const CalendarExport = {

  // Transport-Mode Emojis (konsistent mit results.js)
  MODE_EMOJIS: {
    train: '\u{1F684}',      // 🚄
    flight: '\u2708\uFE0F',  // ✈️
    bus: '\u{1F68C}',        // 🚌
    sleeper_bus: '\u{1F68C}',// 🚌
    boat: '\u26F4\uFE0F',   // ⛴️
    motorbike: '\u{1F3CD}\uFE0F', // 🏍️
    car: '\u{1F699}'         // 🚙
  },

  MODE_LABELS: {
    train: 'Zug', flight: 'Flug', bus: 'Bus', sleeper_bus: 'Schlafbus',
    boat: 'Boot', motorbike: 'Motorrad', car: 'Auto'
  },

  // ═══════════════════════════════════════
  //  PUBLIC API
  // ═══════════════════════════════════════

  /**
   * Generiert und lädt die .ics Datei herunter
   */
  generate() {
    const result = App.state.result;
    if (!result || !result.stops) {
      App.showError('Keine Route vorhanden. Bitte erst eine Route generieren.');
      return;
    }

    const icsContent = this._buildICS(result);
    this._download(icsContent, result.routeName);
  },

  // ═══════════════════════════════════════
  //  ICS GENERATION
  // ═══════════════════════════════════════

  /**
   * Baut den kompletten ICS-String
   */
  _buildICS(result) {
    const events = [];
    const stops = result.stops || [];
    const legs = result.legs || [];
    const country = (typeof CountryConfig !== 'undefined' && CountryConfig.current)
      ? CountryConfig.current.name
      : '';

    let currentDay = 1; // Globaler Tageszähler

    stops.forEach((stop, stopIndex) => {
      const nights = stop.nights || 1;

      // Events für jeden Tag dieses Stopps
      for (let dayInStop = 1; dayInStop <= nights; dayInStop++) {
        const globalDay = currentDay + dayInStop - 1;
        const date = this._computeDate(stop, dayInStop, globalDay);

        // dailyPlan-Eintrag finden
        const dayPlan = (stop.dailyPlan || []).find(d => d.day === dayInStop);
        const dayTitle = dayPlan ? dayPlan.title : stop.city;
        const activities = dayPlan ? dayPlan.activities : '';

        // Beschreibung zusammenbauen
        let desc = '';

        // Aktivitäten
        if (activities) {
          desc += activities;
        }

        // Highlights (nur am ersten Tag des Stopps)
        if (dayInStop === 1 && stop.highlights && stop.highlights.length > 0) {
          desc += '\n\n--- Highlights ---';
          stop.highlights.forEach(h => {
            desc += `\n${h.icon || ''} ${h.title}: ${h.description || ''}`;
          });
        }

        // Tipps (nur am ersten Tag des Stopps)
        if (dayInStop === 1 && stop.tips && stop.tips.length > 0) {
          desc += '\n\n--- Tipps ---';
          stop.tips.forEach(t => {
            desc += `\n${t.icon || ''} ${t.text}`;
          });
        }

        // Tagline (erster Tag)
        if (dayInStop === 1 && stop.tagline) {
          desc = stop.tagline + '\n\n' + desc;
        }

        events.push(this._createEvent({
          date: date,
          summary: `Tag ${globalDay}: ${stop.city} \u2013 ${dayTitle}`,
          description: desc.trim(),
          location: country ? `${stop.city}, ${country}` : stop.city,
          uid: `routaris-day${globalDay}-${this._slug(stop.city)}`
        }));
      }

      // Transport-Leg zum nächsten Stopp (am letzten Tag dieses Stopps)
      if (stopIndex < stops.length - 1) {
        const nextStop = stops[stopIndex + 1];
        const leg = this._findLeg(legs, stop.city, nextStop.city);

        if (leg) {
          const lastDayOfStop = currentDay + nights - 1;
          const legDate = this._computeDate(stop, nights, lastDayOfStop);
          const mode = (typeof Results !== 'undefined' && Results.normalizeLegMode)
            ? Results.normalizeLegMode(leg.mode)
            : (leg.mode || 'train');
          const emoji = this.MODE_EMOJIS[mode] || '\u{1F684}';
          const label = this.MODE_LABELS[mode] || mode;
          const duration = leg.duration || '';
          const cost = leg.cost || '';

          let legDesc = `${label}: ${stop.city} \u2192 ${nextStop.city}`;
          if (duration) legDesc += `\nDauer: ${duration}`;
          if (cost) legDesc += `\nKosten: ${cost}`;

          const summaryParts = [emoji, stop.city, '\u2192', nextStop.city];
          if (duration) summaryParts.push(`(${duration})`);

          events.push(this._createEvent({
            date: legDate,
            summary: summaryParts.join(' '),
            description: legDesc,
            location: country ? `${stop.city}, ${country}` : stop.city,
            uid: `routaris-leg${stopIndex}-${this._slug(stop.city)}-${this._slug(nextStop.city)}`
          }));
        }
      }

      currentDay += nights;
    });

    // ICS zusammenbauen
    const calName = result.routeName || 'Routaris Reise';
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Routaris//Travel Planner//DE',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:${this._escapeICS(calName)}`,
      ...events.flat(),
      'END:VCALENDAR'
    ];

    // CRLF line endings
    return lines.join('\r\n') + '\r\n';
  },

  /**
   * Erstellt ein einzelnes VEVENT als Array von Zeilen
   */
  _createEvent({ date, summary, description, location, uid }) {
    const dtstart = this._formatDateICS(date);
    // All-day event: DTEND ist der nächste Tag
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    const dtend = this._formatDateICS(nextDay);

    const stamp = this._formatTimestampICS(new Date());

    const lines = [
      'BEGIN:VEVENT',
      `UID:${uid}@routaris.app`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${dtstart}`,
      `DTEND;VALUE=DATE:${dtend}`,
      `SUMMARY:${this._escapeICS(summary)}`,
      `DESCRIPTION:${this._escapeICS(description)}`,
      `LOCATION:${this._escapeICS(location)}`,
      'CATEGORIES:TRAVEL',
      'TRANSP:TRANSPARENT',
      'END:VEVENT'
    ];

    return lines;
  },

  // ═══════════════════════════════════════
  //  DATE COMPUTATION
  // ═══════════════════════════════════════

  /**
   * Berechnet das Datum für einen bestimmten Tag.
   * Priorität: stop.arrivalDate > App.state.arrivalDate > heute
   */
  _computeDate(stop, dayInStop, globalDay) {
    // Option 1: Stopp hat eigenes arrivalDate (von Gemini)
    if (stop.arrivalDate) {
      const base = new Date(stop.arrivalDate + 'T12:00:00');
      base.setDate(base.getDate() + dayInStop - 1);
      return base;
    }

    // Option 2: App.state.arrivalDate als Basis
    if (App.state && App.state.arrivalDate) {
      const base = new Date(App.state.arrivalDate + 'T12:00:00');
      base.setDate(base.getDate() + globalDay - 1);
      return base;
    }

    // Option 3: Fallback auf heute
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    today.setDate(today.getDate() + globalDay - 1);
    return today;
  },

  // ═══════════════════════════════════════
  //  FORMATTING & HELPERS
  // ═══════════════════════════════════════

  /**
   * Formatiert ein Date-Objekt als ICS-Datumstring (YYYYMMDD)
   */
  _formatDateICS(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
  },

  /**
   * Formatiert ein Date-Objekt als ICS-Timestamp (YYYYMMDDTHHmmssZ)
   */
  _formatTimestampICS(date) {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    const d = String(date.getUTCDate()).padStart(2, '0');
    const h = String(date.getUTCHours()).padStart(2, '0');
    const min = String(date.getUTCMinutes()).padStart(2, '0');
    const s = String(date.getUTCSeconds()).padStart(2, '0');
    return `${y}${m}${d}T${h}${min}${s}Z`;
  },

  /**
   * Escaped Sonderzeichen für ICS (RFC 5545)
   * Backslash, Semikolon, Komma und Newlines
   */
  _escapeICS(text) {
    if (!text) return '';
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\r\n/g, '\\n')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\n');
  },

  /**
   * Erstellt einen URL-freundlichen Slug
   */
  _slug(text) {
    if (!text) return 'route';
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  /**
   * Fuzzy City-Name Matching (delegiert an Results wenn verfügbar)
   */
  _matchCity(a, b) {
    if (typeof Results !== 'undefined' && Results.matchCity) {
      return Results.matchCity(a, b);
    }
    if (!a || !b) return false;
    const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    return norm(a) === norm(b) || norm(a).includes(norm(b)) || norm(b).includes(norm(a));
  },

  /**
   * Findet das passende Leg (delegiert an Results wenn verfügbar)
   */
  _findLeg(legs, fromCity, toCity) {
    if (typeof Results !== 'undefined' && Results.findLeg) {
      return Results.findLeg(legs, fromCity, toCity);
    }
    if (!legs) return null;
    return legs.find(l =>
      this._matchCity(l.from, fromCity) && this._matchCity(l.to, toCity)
    ) || null;
  },

  // ═══════════════════════════════════════
  //  DOWNLOAD
  // ═══════════════════════════════════════

  /**
   * Lädt die .ics Datei herunter
   */
  _download(icsContent, routeName) {
    const brandName = (typeof CountryConfig !== 'undefined' && CountryConfig.current)
      ? CountryConfig.current.brandName
      : 'Routaris';
    const routeSlug = this._slug(routeName || 'Reiseroute');
    const filename = `${brandName}-${routeSlug}.ics`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }
};
