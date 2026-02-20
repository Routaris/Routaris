/* ============================================
   PREFERENCES.JS – Step 2: Preference-Slider Logik
   ============================================ */

const Preferences = {
  categories: [
    { key: 'Kultur',     icon: '🏛️', desc: 'Tempel, Museen, Traditionen' },
    { key: 'Natur',      icon: '🏔️', desc: 'Berge, Seen, Nationalparks' },
    { key: 'Geschichte', icon: '📜', desc: 'Historische Stätten, Dynastien' },
    { key: 'Großstadt',  icon: '🌆', desc: 'Skylines, Nachtleben, Shopping' },
    { key: 'Erholung',   icon: '🧘', desc: 'Wellness, Gärten, Entschleunigung' },
    { key: 'Abenteuer',  icon: '🧗', desc: 'Wandern, Glasbrücken, Outdoor' },
    { key: 'Kulinarik',  icon: '🍜', desc: 'Street Food, Restaurants, Teekultur' }
  ],

  /**
   * Rendert die Preference-Slider in den Container
   */
  render() {
    const container = document.getElementById('preferences-container');
    if (!container) return;

    container.innerHTML = this.categories.map(cat => `
      <div class="preference-item">
        <div class="range-header">
          <span class="range-label">${cat.icon} ${cat.key}</span>
          <span class="range-value" id="pref-val-${cat.key}">${App.state.preferences[cat.key]}</span>
        </div>
        <p class="text-xs text-muted" style="margin-bottom: 8px;">${cat.desc}</p>
        <div class="range-slider">
          <input type="range"
                 min="0" max="10" step="1"
                 value="${App.state.preferences[cat.key]}"
                 data-pref="${cat.key}"
                 id="pref-${cat.key}"
                 aria-label="Interesse an ${cat.key}">
          <div class="range-labels">
            <span>Unwichtig</span>
            <span>Sehr wichtig</span>
          </div>
        </div>
      </div>
    `).join('');

    this.bindEvents();
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
