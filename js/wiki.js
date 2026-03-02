/* ============================================
   WIKI.JS – Wikipedia REST API: Bild-Loader
   Mit Suchfallback für zuverlässigere Bildergebnisse
   ============================================ */

const Wiki = {
  cache: {},

  /**
   * Prüft ob eine Bild-URL ein echtes Foto ist (keine Karte, kein SVG, kein Diagramm)
   */
  isPhotoUrl(url) {
    if (!url) return false;
    const lower = url.toLowerCase();
    // SVG-Dateien sind fast immer Karten/Diagramme
    if (lower.includes('.svg')) return false;
    // Typische Karten/Map-Indikatoren im Dateinamen
    const mapPatterns = [
      'location_map', 'locator_map', 'district_map', 'province_map',
      'region_map', 'administrative_map', '_map.', '_map_',
      'flag_of_', 'coat_of_arms', 'emblem_of', 'seal_of',
      'logo_of', 'insignia_of'
    ];
    return !mapPatterns.some(p => lower.includes(p));
  },

  /**
   * Holt Bilddaten von der Wikipedia REST API (mit Cache)
   */
  async fetchSummary(title) {
    if (!title) return null;
    const key = title.trim();
    if (this.cache[key]) return this.cache[key];

    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(key)}`
      );

      if (!response.ok) return null;

      const data = await response.json();
      const thumb = data.thumbnail?.source || null;
      const orig = data.originalimage?.source || null;

      // Karten, SVGs und Wappen herausfiltern
      const result = {
        thumbnail: this.isPhotoUrl(thumb) ? thumb : null,
        original: this.isPhotoUrl(orig) ? orig : null
      };

      // Nur cachen wenn mindestens ein Bild vorhanden
      if (result.thumbnail || result.original) {
        this.cache[key] = result;
        return result;
      }
      return null;
    } catch (err) {
      console.warn(`Wiki für "${key}" nicht geladen:`, err.message);
      return null;
    }
  },

  /**
   * Wikipedia-Suche: Findet den besten Artikel für einen Suchbegriff
   * Gibt den Titel des ersten Treffers zurück
   */
  async searchTitle(query) {
    if (!query) return null;
    try {
      const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=3&format=json&origin=*`;
      const response = await fetch(url);
      if (!response.ok) return null;
      const data = await response.json();
      const results = data?.query?.search;
      if (results && results.length > 0) {
        return results[0].title;
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
   * Versucht: 1) Direkter Titel → 2) Wikipedia-Suche → 3) null
   */
  async getHeroImage(title) {
    if (!title) return null;

    // 1) Direkter Titel
    const result = await this.fetchSummary(title);
    if (result?.original || result?.thumbnail) {
      return result.original || result.thumbnail;
    }

    // 2) Titel leicht variieren (Unterstriche, Klammern entfernen)
    const cleaned = title.replace(/_/g, ' ').replace(/\(.*?\)/g, '').trim();
    if (cleaned !== title) {
      const result2 = await this.fetchSummary(cleaned);
      if (result2?.original || result2?.thumbnail) {
        return result2.original || result2.thumbnail;
      }
    }

    // 3) Wikipedia-Suche als Fallback
    const searchTitle = await this.searchTitle(title);
    if (searchTitle && searchTitle !== title) {
      const result3 = await this.fetchSummary(searchTitle);
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

    // 2) Suche: "highlight city" auf Englisch
    if (highlightTitle && cityName) {
      const searchTitle = await this.searchTitle(`${highlightTitle} ${cityName}`);
      if (searchTitle) {
        const result = await this.fetchSummary(searchTitle);
        const url = tryUrl(result);
        if (url) return url;
      }
    }

    // 3) Suche: nur highlight + Landesname
    if (highlightTitle) {
      const countryName = CountryConfig.current ? CountryConfig.current.countryInText : '';
      const searchTitle = await this.searchTitle(`${highlightTitle} ${countryName}`);
      if (searchTitle) {
        const result = await this.fetchSummary(searchTitle);
        const url = tryUrl(result);
        if (url) return url;
      }
    }

    // 4) Letzter Versuch: Stadt-Bild als Fallback (nur wenn noch nicht verwendet)
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
