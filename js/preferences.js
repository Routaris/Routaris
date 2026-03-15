/* ============================================
   PREFERENCES.JS – Step 2: Preference-Slider Logik
   ============================================ */

const Preferences = {
  categories: [
    { key: 'Kultur',     icon: '🏛️', desc: 'Tempel, Museen, Traditionen',          color: 'var(--terracotta-pale)' },
    { key: 'Natur',      icon: '🏔️', desc: 'Berge, Seen, Nationalparks',            color: 'var(--teal-pale)' },
    { key: 'Geschichte', icon: '📜', desc: 'Historische Stätten, Architektur',      color: 'var(--gold-pale)' },
    { key: 'Großstadt',  icon: '🌆', desc: 'Skylines, Nachtleben, Shopping',        color: '#f3e8ff' },
    { key: 'Erholung',   icon: '🧘', desc: 'Wellness, Strände, Entschleunigung',   color: '#fce4ec' },
    { key: 'Abenteuer',  icon: '🧗', desc: 'Wandern, Trekking, Outdoor',            color: '#fff8e1' },
    { key: 'Kulinarik',  icon: '🍜', desc: 'Street Food, Restaurants, Lokale Küche', color: 'var(--terracotta-pale)' }
  ],

  presets: [
    { name: 'Kulturreise',   icon: '🏛️', values: { Kultur: 9, Natur: 3, Geschichte: 8, Großstadt: 7, Erholung: 2, Abenteuer: 2, Kulinarik: 6 } },
    { name: 'Naturerlebnis', icon: '🌿', values: { Kultur: 3, Natur: 9, Geschichte: 2, Großstadt: 1, Erholung: 6, Abenteuer: 7, Kulinarik: 4 } },
    { name: 'Entspannung',   icon: '🏖️', values: { Kultur: 3, Natur: 6, Geschichte: 2, Großstadt: 2, Erholung: 9, Abenteuer: 2, Kulinarik: 5 } },
    { name: 'Abenteuer',     icon: '🧗', values: { Kultur: 3, Natur: 8, Geschichte: 2, Großstadt: 2, Erholung: 2, Abenteuer: 9, Kulinarik: 4 } },
    { name: 'Foodie-Trip',   icon: '🍜', values: { Kultur: 6, Natur: 3, Geschichte: 3, Großstadt: 6, Erholung: 3, Abenteuer: 3, Kulinarik: 9 } }
  ],

  _activePreset: null,

  /**
   * Rendert Presets + Preference-Slider in den Container
   */
  render() {
    const container = document.getElementById('preferences-container');
    if (!container) return;

    // Presets als Chips
    const presetsHtml = `
      <div class="pref-presets">
        ${this.presets.map((p, i) => `
          <button class="pref-preset-chip${this._activePreset === i ? ' active' : ''}"
                  onclick="Preferences.applyPreset(${i})" type="button">
            <span>${p.icon}</span> ${p.name}
          </button>
        `).join('')}
      </div>
    `;

    // Slider
    const slidersHtml = this.categories.map(cat => {
      const val = App.state.preferences[cat.key];
      const fillPct = (val / 10) * 100;
      return `
      <div class="preference-item" style="--pref-accent: ${cat.color}">
        <div class="range-header">
          <span class="range-label"><span class="pref-icon" style="background: ${cat.color}">${cat.icon}</span> ${cat.key}</span>
          <span class="range-value" id="pref-val-${cat.key}">${val}</span>
        </div>
        <p class="text-xs text-muted" style="margin-bottom: 8px;">${(CountryConfig.current && CountryConfig.current.sliderDescs && CountryConfig.current.sliderDescs[cat.key]) || cat.desc}</p>
        <div class="range-slider">
          <input type="range"
                 min="0" max="10" step="1"
                 value="${val}"
                 data-pref="${cat.key}"
                 id="pref-${cat.key}"
                 style="--fill-pct: ${fillPct}%"
                 aria-label="Interesse an ${cat.key}">
          <div class="range-labels">
            <span>Unwichtig</span>
            <span>Sehr wichtig</span>
          </div>
        </div>
      </div>
    `;
    }).join('');

    container.innerHTML = presetsHtml + slidersHtml;
    this.bindEvents();
  },

  /**
   * Wendet ein Preset an und aktualisiert alle Slider
   */
  applyPreset(index) {
    const preset = this.presets[index];
    if (!preset) return;

    this._activePreset = index;

    // Werte setzen
    Object.entries(preset.values).forEach(([key, val]) => {
      App.state.preferences[key] = val;

      const slider = document.getElementById(`pref-${key}`);
      const display = document.getElementById(`pref-val-${key}`);
      if (slider) {
        slider.value = val;
        slider.style.setProperty('--fill-pct', `${(val / 10) * 100}%`);
      }
      if (display) display.textContent = val;
    });

    // Active-State der Chips aktualisieren
    document.querySelectorAll('.pref-preset-chip').forEach((chip, i) => {
      chip.classList.toggle('active', i === index);
    });
  },

  /**
   * Bindet Events an alle Slider
   */
  bindEvents() {
    const sliders = document.querySelectorAll('[data-pref]');
    sliders.forEach(slider => {
      slider.addEventListener('input', (e) => {
        const key = e.target.dataset.pref;
        const val = parseInt(e.target.value);
        App.state.preferences[key] = val;

        const display = document.getElementById(`pref-val-${key}`);
        if (display) display.textContent = val;

        // Slider-Fill aktualisieren
        e.target.style.setProperty('--fill-pct', `${(val / 10) * 100}%`);

        // Preset-Markierung entfernen wenn manuell geändert
        this._activePreset = null;
        document.querySelectorAll('.pref-preset-chip').forEach(chip => {
          chip.classList.remove('active');
        });
      });
    });
  },

  /**
   * Gibt die Top-Kategorien zurück (Wert >= 6), sortiert absteigend
   */
  getTopCategories() {
    return Object.entries(App.state.preferences)
      .filter(([, val]) => val >= 6)
      .sort(([, a], [, b]) => b - a)
      .map(([key]) => key);
  },

  /**
   * Berechnet einen Match-Score für eine Destination basierend auf Preferences
   */
  getMatchScore(destination) {
    let score = 0;
    destination.tags.forEach(tag => {
      score += (App.state.preferences[tag] || 0);
    });
    return score;
  }
};
