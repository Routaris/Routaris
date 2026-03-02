/* ============================================
   FAMILY.JS – Familien-Ampelsystem
   Altersabhängige Bewertung von Destinations
   ============================================ */

const Family = {

  /**
   * Holt die Familienbewertung für eine Destination + Altersgruppe
   * @param {Object} dest - Destination-Objekt (mit familyRating)
   * @param {string} childAge - Altersgruppe ('0-1'|'1-3'|'3-6'|'6-12'|'12+')
   * @returns {{ rating: string, note: string }} oder null
   */
  getRating(dest, childAge) {
    if (!dest || !childAge) return null;
    if (!dest.familyRating) return null;
    return dest.familyRating[childAge] || null;
  },

  /**
   * Rendert einen kompakten Badge für Step 3 Dest-Cards
   * @returns {string} HTML-String
   */
  renderBadge(dest, childAge) {
    const r = this.getRating(dest, childAge);
    if (!r) {
      // Fallback: Wenn dest.family === true, zeige generischen Badge
      if (dest.family) {
        return '<span class="family-badge family-badge-gray">Familienfreundlich</span>';
      }
      return '';
    }

    const icons = { green: '🟢', yellow: '🟡', red: '🔴' };
    const labels = { green: 'Gut geeignet', yellow: 'Bedingt geeignet', red: 'Wenig geeignet' };
    const icon = icons[r.rating] || '';
    const label = labels[r.rating] || 'k.A.';
    const cls = `family-badge-${r.rating || 'gray'}`;

    return `<span class="family-badge ${cls}" title="${r.note || ''}">${icon} ${label}</span>`;
  },

  /**
   * Rendert ein Detail-Panel für Step 5 Stopp-Detail
   * @returns {string} HTML-String
   */
  renderDetailPanel(dest, childAge) {
    const r = this.getRating(dest, childAge);

    const ageLabels = {
      '0-1': 'Baby (0–1)',
      '1-3': 'Kleinkind (1–3)',
      '3-6': 'Vorschulkind (3–6)',
      '6-12': 'Schulkind (6–12)',
      '12+': 'Teenager (12+)'
    };

    if (!r) {
      return `
        <div class="family-check-panel">
          <div class="family-check-header">
            <span class="family-check-icon">👨‍👩‍👧</span>
            <span class="family-check-title">Familien-Check · ${ageLabels[childAge] || childAge}</span>
          </div>
          <div class="family-check-note">Keine spezifische Bewertung für diesen Ort verfügbar.</div>
        </div>
      `;
    }

    const icons = { green: '✅', yellow: '⚠️', red: '❌' };
    const titles = { green: 'Gut geeignet', yellow: 'Bedingt geeignet', red: 'Wenig geeignet' };
    const panelCls = `panel-${r.rating || 'gray'}`;

    return `
      <div class="family-check-panel ${panelCls}">
        <div class="family-check-header">
          <span class="family-check-icon">${icons[r.rating] || '👨‍👩‍👧'}</span>
          <span class="family-check-title">Familien-Check · ${ageLabels[childAge] || childAge} · ${titles[r.rating] || 'k.A.'}</span>
        </div>
        <div class="family-check-note">${r.note}</div>
      </div>
    `;
  },

  /**
   * Findet eine Destination anhand des Stadtnamens (fuzzy)
   * Wird für Gemini-Ergebnisse verwendet, die nur Stadtnamen haben
   */
  findDestByCity(cityName) {
    if (!cityName) return null;
    const cc = typeof CountryConfig !== 'undefined' && CountryConfig.current;
    if (!cc) return null;

    const dests = cc.destinations;
    if (!dests) return null;
    const strip = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    const lower = strip(cityName);

    return dests.find(d => {
      const dLower = strip(d.name);
      const firstWord = lower.split(/[\s\/,]+/)[0];
      const dFirst = dLower.split(/[\s\/,]+/)[0];
      return dFirst === firstWord
        || dLower.includes(lower)
        || lower.includes(dLower)
        || (d.altName && strip(d.altName).includes(lower));
    }) || null;
  }
};
