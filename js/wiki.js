/* ============================================
   WIKI.JS – Wikipedia REST API: Bild-Loader
   Mit Suchfallback für zuverlässigere Bildergebnisse
   ============================================ */

const Wiki = {
  cache: {},
  _negativeCache: new Set(),

  /**
   * Prüft ob eine Bild-URL ein echtes, ansprechendes Foto ist
   */
  isPhotoUrl(url) {
    if (!url) return false;
    const lower = url.toLowerCase();
    // SVG-Dateien sind fast immer Karten/Diagramme
    if (lower.includes('.svg')) return false;
    // Typische nicht-Foto-Indikatoren im Dateinamen
    const badPatterns = [
      // Karten
      'location_map', 'locator_map', 'district_map', 'province_map',
      'region_map', 'administrative_map', '_map.', '_map_',
      'topographic', 'relief_map', 'political_map', 'blank_map',
      // Wappen, Flaggen, Logos
      'flag_of_', 'coat_of_arms', 'emblem_of', 'seal_of',
      'logo_of', 'insignia_of', 'escudo_de', 'blason_',
      // Panorama-Header, Stubs, Diagramme
      'panorama_of', 'icon_', 'pictogram', 'diagram',
      'graph_of', 'chart_of', 'timeline_of',
      'question_mark', 'no_image', 'replace_this',
      'placeholder', 'default_', 'stub_',
      // Sehr kleine Bilder (Icons)
      '15px', '20px', '25px', '30px'
    ];
    return !badPatterns.some(p => lower.includes(p));
  },

  /**
   * Prüft Mindestgröße eines Bildes (filtert winzige Icons heraus)
   */
  _isLargeEnough(data) {
    if (!data) return false;
    const w = data.thumbnail_width || data.width;
    const h = data.thumbnail_height || data.height;
    if (w && h && (w < 100 || h < 80)) return false;
    return true;
  },

  /**
   * Prüft ob ein Wikipedia-Artikel thematisch zu Reise/Ort passt (nicht Person/Band/Film).
   * Nutzt das description-Feld der Wikipedia REST API.
   */
  _isPlaceRelated(description) {
    if (!description) return true; // Im Zweifel durchlassen
    const d = description.toLowerCase();
    // Definitiv KEIN Ort (Personen, Medien, Unternehmen)
    const nonPlacePatterns = [
      'singer', 'musician', 'band', 'rapper', 'songwriter', 'composer', 'dj',
      'actor', 'actress', 'comedian', 'model', 'influencer', 'youtuber',
      'film', 'movie', 'television series', 'tv series', 'anime', 'manga',
      'album', 'song', 'single', 'ep by', 'soundtrack',
      'novel', 'book by', 'short story', 'poem',
      'video game', 'board game', 'card game',
      'footballer', 'basketball', 'athlete', 'tennis', 'cricketer', 'boxer',
      'politician', 'president of', 'prime minister', 'governor',
      'company', 'corporation', 'brand', 'software', 'app',
      'fictional character', 'superhero', 'anime character'
    ];
    return !nonPlacePatterns.some(p => d.includes(p));
  },

  /**
   * Holt Bilddaten von der Wikipedia REST API (mit Cache)
   */
  async fetchSummary(title, requirePlace = false) {
    if (!title) return null;
    const key = title.trim();
    const cacheKey = key + (requirePlace ? ':place' : '');
    if (this.cache[cacheKey]) return this.cache[cacheKey];
    if (this._negativeCache.has(cacheKey)) return null;

    try {
      // Basis-Daten könnten schon gecacht sein (ohne Place-Check)
      let data;
      if (this.cache[key + ':_raw']) {
        data = this.cache[key + ':_raw'];
      } else {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(key)}`
        );
        if (!response.ok) {
          this._negativeCache.add(cacheKey);
          return null;
        }
        data = await response.json();
        this.cache[key + ':_raw'] = data;
      }

      // Relevanz-Check: Ist der Artikel über einen Ort/Sehenswürdigkeit?
      if (requirePlace && !this._isPlaceRelated(data.description)) {
        this._negativeCache.add(cacheKey);
        return null;
      }

      const thumb = data.thumbnail?.source || null;
      const orig = data.originalimage?.source || null;
      const thumbW = data.thumbnail?.width || 0;

      // Karten, SVGs, Wappen und winzige Bilder filtern
      const result = {
        thumbnail: (this.isPhotoUrl(thumb) && thumbW >= 100) ? thumb : null,
        original: this.isPhotoUrl(orig) ? orig : null
      };

      // Nur cachen wenn mindestens ein brauchbares Bild vorhanden
      if (result.thumbnail || result.original) {
        this.cache[cacheKey] = result;
        return result;
      }
      this._negativeCache.add(cacheKey);
      return null;
    } catch (err) {
      console.warn(`Wiki für "${key}" nicht geladen:`, err.message);
      return null;
    }
  },

  /**
   * Wikipedia-Suche: Findet den besten Ort/Sehenswürdigkeits-Artikel mit Bild
   * Prüft bis zu 5 Ergebnisse, überspringt Personen/Bands/Filme
   * @param {string} query - Suchbegriff
   * @param {boolean} requirePlace - Wenn true, nur Ort-bezogene Artikel akzeptieren
   */
  async searchTitle(query, requirePlace = false) {
    if (!query) return null;
    try {
      const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=5&format=json&origin=*`;
      const response = await fetch(url);
      if (!response.ok) return null;
      const data = await response.json();
      const results = data?.query?.search;
      if (!results || results.length === 0) return null;

      // Ergebnis mit Bild bevorzugen, Personen/Medien überspringen
      for (const r of results) {
        // Disambiguation-Seiten überspringen
        if (r.snippet && r.snippet.includes('may refer to')) continue;
        if (r.snippet && r.snippet.includes('disambiguation')) continue;
        const summary = await this.fetchSummary(r.title, requirePlace);
        if (summary && (summary.original || summary.thumbnail)) {
          return r.title;
        }
      }
      return null;
    } catch {
      return null;
    }
  },

  /**
   * Gibt die Thumbnail-URL zurück (~320px)
   */
  async getThumbnail(title) {
    const result = await this.fetchSummary(title);
    return result?.thumbnail || null;
  },

  /**
   * Gibt ein hochauflösendes Bild zurück
   * Versucht: 1) Direkter Titel → 2) Varianten → 3) Wikipedia-Suche → 4) null
   */
  async getHeroImage(title) {
    if (!title) return null;

    // 1) Direkter Titel
    const result = await this.fetchSummary(title);
    if (result?.original || result?.thumbnail) {
      return result.original || result.thumbnail;
    }

    // 2) Titel variieren (Unterstriche → Leerzeichen, Klammern entfernen)
    const cleaned = title.replace(/_/g, ' ').replace(/\(.*?\)/g, '').trim();
    if (cleaned !== title && cleaned.length > 2) {
      const result2 = await this.fetchSummary(cleaned);
      if (result2?.original || result2?.thumbnail) {
        return result2.original || result2.thumbnail;
      }
    }

    // 3) Wikipedia-Suche als Fallback
    const searchResult = await this.searchTitle(title);
    if (searchResult && searchResult !== title && searchResult !== cleaned) {
      const result3 = await this.fetchSummary(searchResult);
      if (result3?.original || result3?.thumbnail) {
        return result3.original || result3.thumbnail;
      }
    }

    return null;
  },

  /**
   * Sucht ein Bild für ein Highlight (Sehenswürdigkeit)
   * Versucht mehrere Strategien in Reihenfolge
   * @param {Set} usedUrls - bereits verwendete Bild-URLs (für Deduplizierung pro Stop)
   */
  async getHighlightImage(wikiTitle, highlightTitle, cityName, usedUrls = new Set()) {
    // Hilfsfunktion: URL nur zurückgeben wenn noch nicht verwendet
    const tryUrl = (result) => {
      const url = result?.original || result?.thumbnail || null;
      if (url && !usedUrls.has(url)) return url;
      return null;
    };

    // 1) Wiki-Feld direkt (mit Retry/Suche in getHeroImage)
    if (wikiTitle) {
      const url = await this.getHeroImage(wikiTitle);
      if (url && !usedUrls.has(url)) return url;
    }

    // 2) Suche: "highlight city" – nur Orte/Sehenswürdigkeiten akzeptieren
    if (highlightTitle && cityName) {
      const title2 = await this.searchTitle(`${highlightTitle} ${cityName}`, true);
      if (title2) {
        const result = await this.fetchSummary(title2, true);
        const url = tryUrl(result);
        if (url) return url;
      }
    }

    // 3) Suche: highlight + Landesname – nur Orte
    if (highlightTitle) {
      const countryName = CountryConfig.current ? CountryConfig.current.countryInText : '';
      if (countryName) {
        const title3 = await this.searchTitle(`${highlightTitle} ${countryName}`, true);
        if (title3) {
          const result = await this.fetchSummary(title3, true);
          const url = tryUrl(result);
          if (url) return url;
        }
      }
    }

    // 4) Suche: "highlight landmark/place" – mit Kontext-Keyword
    if (highlightTitle && highlightTitle.length > 3) {
      const title4 = await this.searchTitle(`${highlightTitle} landmark`, true);
      if (title4) {
        const result = await this.fetchSummary(title4, true);
        const url = tryUrl(result);
        if (url) return url;
      }
    }

    // 5) Letzter Versuch: Stadt-Bild als Fallback (nur wenn noch nicht verwendet)
    if (cityName) {
      const cityUrl = await this.getHeroImage(cityName);
      if (cityUrl && !usedUrls.has(cityUrl)) return cityUrl;
    }

    return null;
  },

  /**
   * Lädt Thumbnails für alle Destinations und setzt sie als img.src
   */
  async loadAllThumbnails() {
    const dests = CountryConfig.getDestinations();
    const promises = dests.map(async (dest) => {
      const url = await this.getThumbnail(dest.wiki);
      const imgs = document.querySelectorAll(`[data-wiki="${dest.id}"]`);
      if (url) {
        imgs.forEach(img => {
          img.src = url;
          img.alt = dest.name;
        });
      } else {
        // Kein Bild gefunden: Shimmer stoppen, dezenten Platzhalter zeigen
        imgs.forEach(img => {
          img.classList.add('no-image');
        });
      }
    });

    await Promise.allSettled(promises);
  }
};
