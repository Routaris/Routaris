/* ============================================
   APP.JS – Haupt-Controller: State, Navigation, API-Key Modal
   Multi-Country-fähig via CountryConfig
   ============================================ */

const App = {
  apiKey: 'AIzaSyBRWaRIfTE81BpNLUrvIsGdkQXPuIa3lGA',
  currentStep: 0,

  state: {
    country: null,
    airport: null,
    sameReturn: true,
    departureAirport: null,
    transport: 'no-preference',
    trainMaxHours: 6,
    days: 14,
    season: 'spring',
    group: 'solo',
    childAge: null,
    preferences: {
      'Kultur': 5,
      'Natur': 5,
      'Geschichte': 5,
      'Großstadt': 5,
      'Erholung': 3,
      'Abenteuer': 3,
      'Kulinarik': 5
    },
    pinnedCities: [],
    additionalNotes: '',
    result: null
  },

  /**
   * Initialisiert die App
   */
  _isSharedView: false,

  init() {
    this.bindNavigation();
    this.bindBasicsForm();

    // Geteilte Route im URL-Hash erkennen
    if (this.loadSharedRoute()) return;

    this.showStep(0);
    this.updateProgressDots();
  },

  /**
   * Prüft ob ein geteilter Routen-Link im URL-Hash existiert
   * Format: #route=<lz-string-compressed-data>
   */
  loadSharedRoute() {
    const hash = window.location.hash;
    if (!hash.startsWith('#route=')) return false;

    const compressed = hash.substring(7);
    if (!compressed) return false;

    try {
      if (typeof LZString === 'undefined') {
        console.error('[Share] LZString nicht geladen');
        return false;
      }

      const json = LZString.decompressFromEncodedURIComponent(compressed);
      if (!json) return false;

      const shareData = JSON.parse(json);
      if (!shareData.result || !shareData.result.stops) return false;

      // Country setzen
      const countryId = shareData.country || 'china';
      CountryConfig.setCountry(countryId);
      const cc = CountryConfig.current;

      this.state.country = countryId;
      this.state.result = shareData.result;
      this._isSharedView = true;

      // Branding
      this.updateBranding(cc);

      // Progress-Bar verstecken
      const progressBar = document.querySelector('.progress-bar');
      if (progressBar) progressBar.style.display = 'none';

      // Header anpassen
      const apiKeyLink = document.querySelector('.header-nav a[onclick*="showApiKeyModal"]');
      if (apiKeyLink) apiKeyLink.style.display = 'none';
      const restartLink = document.querySelector('.header-nav a[onclick*="restart"]');
      if (restartLink) restartLink.textContent = 'Eigene Route planen';

      // Banner einblenden
      const banner = document.createElement('div');
      banner.className = 'shared-route-banner';
      banner.innerHTML = '📍 Du siehst eine geteilte Route. <a href="' + window.location.pathname + '" style="color: var(--terracotta); text-decoration: underline;">Eigene Route planen</a>';
      const main = document.querySelector('main');
      if (main) main.prepend(banner);

      // Direkt Ergebnis anzeigen
      this.showStep(5);
      Results.render(shareData.result, true);

      console.log(`[Share] Geteilte Route geladen: ${shareData.result.routeName}`);
      return true;
    } catch (err) {
      console.error('[Share] Fehler beim Laden:', err);
      return false;
    }
  },

  /**
   * Wählt ein Land aus und startet den Planungsprozess
   */
  selectCountry(countryId) {
    CountryConfig.setCountry(countryId);
    const cc = CountryConfig.current;

    this.state.country = countryId;
    this.state.airport = cc.defaultAirport;
    this.state.transport = cc.defaultTransport;

    // Branding aktualisieren
    this.updateBranding(cc);

    // Dynamische UI-Elemente rendern
    this.renderAirports(cc);
    this.renderTransportCards(cc);

    // Zum Basics-Step navigieren
    this.showStep(1);
  },

  /**
   * Aktualisiert Branding-Elemente im DOM
   */
  updateBranding(cc) {
    // Header – Logo-Bild bleibt gleich, Subtitle zeigt länderspezifische Marke
    const logoSubtitle = document.getElementById('logo-subtitle');
    if (logoSubtitle) {
      logoSubtitle.textContent = `${cc.brandEmoji} ${cc.brandName}`;
      logoSubtitle.classList.add('visible');
    }

    // Favicon
    const favicon = document.getElementById('favicon');
    if (favicon) {
      favicon.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${encodeURIComponent(cc.brandEmoji)}</text></svg>`;
    }

    // Footer
    const footerDesc = document.getElementById('footer-desc');
    if (footerDesc) footerDesc.textContent = cc.brandDescription;

    // Page title
    document.title = `NomadRoute – ${cc.brandName} | Reiseplaner für ${cc.name}`;
  },

  /**
   * Rendert die Flughafen-Karten basierend auf dem aktiven Land
   */
  renderAirports(cc) {
    const arrivalContainer = document.getElementById('arrival-cards');
    const returnContainer = document.getElementById('return-cards');

    if (arrivalContainer) {
      arrivalContainer.innerHTML = cc.airports.map((ap, i) => `
        <div class="radio-card${i === 0 ? ' active' : ''}" data-airport="${ap.value}" role="button" tabindex="0">
          <div class="radio-card-icon" aria-hidden="true">📍</div>
          <div class="radio-card-label">${ap.label}</div>
          <div class="radio-card-desc">${ap.desc}</div>
        </div>
      `).join('');
    }

    if (returnContainer) {
      returnContainer.innerHTML = cc.airports.map(ap => `
        <div class="radio-card" data-return-airport="${ap.value}" role="button" tabindex="0">
          <div class="radio-card-icon" aria-hidden="true">📍</div>
          <div class="radio-card-label">${ap.label}</div>
          <div class="radio-card-desc">${ap.desc}</div>
        </div>
      `).join('');
    }
  },

  /**
   * Rendert die Transport-Karten basierend auf dem aktiven Land
   */
  renderTransportCards(cc) {
    const container = document.getElementById('transport-cards');
    if (!container) return;

    container.innerHTML = cc.transportModes.map(tm => `
      <div class="radio-card${tm.id === cc.defaultTransport ? ' active' : ''}" data-transport="${tm.id}" role="button" tabindex="0">
        <div class="radio-card-icon" aria-hidden="true">${tm.icon}</div>
        <div class="radio-card-label">${tm.label}</div>
        <div class="radio-card-desc">${tm.desc}</div>
      </div>
    `).join('');
  },

  /**
   * Zeigt einen bestimmten Step an
   */
  showStep(step) {
    // Alle Steps ausblenden
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));

    // Ziel-Step einblenden
    const el = document.getElementById(`step-${step}`);
    if (el) {
      el.classList.add('active');
      // Re-trigger animation
      el.style.animation = 'none';
      el.offsetHeight; // force reflow
      el.style.animation = '';
    }

    this.currentStep = step;
    this.updateProgressDots();

    // Header-Modus: transparent auf Hero, normal auf anderen Steps
    const header = document.querySelector('.site-header');
    if (header) {
      header.classList.toggle('hero-mode', step === 0);
    }

    // Step-spezifische Initialisierung
    if (step === 2) {
      Preferences.render();
    }
    if (step === 3) {
      setTimeout(() => {
        MapModule.init();
        MapModule.renderGrid();
      }, 100);
    }

    // Scroll zum Step-Container
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  /**
   * Geht zum nächsten Step
   */
  async nextStep() {
    const next = this.currentStep + 1;

    // Vor dem Wechsel zu Step 4 (Loading): API Key prüfen und Route generieren
    if (next === 4) {
      if (!this.apiKey) {
        this.showApiKeyModal();
        return;
      }
      this.showStep(4);
      this.startLoading();
      try {
        const result = await Gemini.generateRoute();
        this.stopLoading();
        this.showStep(5);
        Results.render(result);
      } catch (err) {
        this.stopLoading();
        console.error('Route generation error:', err);
        this.showError(err.message);
        this.showStep(3);
      }
      return;
    }

    if (next <= 5) {
      this.showStep(next);
    }
  },

  /**
   * Express-Route: Überspringt Präferenzen + Must-See, KI entscheidet alles
   */
  async expressRoute() {
    if (!this.apiKey) {
      this.showApiKeyModal();
      return;
    }

    // Balanced Defaults beibehalten, keine Pins
    this.state.pinnedCities = [];
    this.state.additionalNotes = '';

    this.showStep(4);
    this.startLoading();
    try {
      const result = await Gemini.generateRoute();
      this.stopLoading();
      this.showStep(5);
      Results.render(result);
    } catch (err) {
      this.stopLoading();
      console.error('Express route error:', err);
      this.showError(err.message);
      this.showStep(1);
    }
  },

  /**
   * Geht zum vorherigen Step
   */
  prevStep() {
    const prev = this.currentStep - 1;
    if (prev >= 0) {
      this.showStep(prev);
    }
  },

  /**
   * Aktualisiert die Progress-Dots
   */
  updateProgressDots() {
    // Progress-Bar auf Hero ausblenden
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.style.display = this.currentStep === 0 ? 'none' : 'flex';
    }

    document.querySelectorAll('.progress-dot').forEach((dot, i) => {
      dot.classList.remove('active', 'completed');
      if (i === this.currentStep) dot.classList.add('active');
      else if (i < this.currentStep) dot.classList.add('completed');
      dot.style.cursor = i < this.currentStep ? 'pointer' : '';
    });
  },

  /**
   * Bindet die Navigation-Buttons
   */
  bindNavigation() {
    // Event Delegation
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-action="next"]')) {
        this.nextStep();
      }
      if (e.target.closest('[data-action="prev"]')) {
        this.prevStep();
      }
      if (e.target.closest('[data-action="start"]')) {
        this.showStep(1);
      }
      if (e.target.closest('[data-action="express"]')) {
        this.expressRoute();
      }
      if (e.target.closest('[data-action="restart"]')) {
        if (this.currentStep > 0 && !confirm('Alle Eingaben gehen verloren. Möchtest du wirklich neu starten?')) return;
        this.restart();
      }
    });

    // Stepper-Dots: Klick auf bereits besuchte Steps
    document.addEventListener('click', (e) => {
      const dot = e.target.closest('.progress-dot');
      if (!dot) return;
      const dots = [...document.querySelectorAll('.progress-dot')];
      const dotIndex = dots.indexOf(dot);
      if (dotIndex >= 0 && dotIndex < this.currentStep) {
        this.showStep(dotIndex);
      }
    });

    // Keyboard-Navigation für Radio-Cards und Country-Cards (Enter/Space)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.radio-card[role="button"], .country-card[role="button"]');
        if (card) {
          e.preventDefault();
          card.click();
        }
      }
    });
  },

  /**
   * Bindet die Basics-Form (Step 1)
   */
  bindBasicsForm() {
    // Arrival Airport Cards
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.radio-card[data-airport]');
      if (card) {
        this.state.airport = card.dataset.airport;
        document.querySelectorAll('.radio-card[data-airport]').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const customInput = document.getElementById('custom-airport');
        if (customInput) {
          customInput.value = '';
          customInput.closest('.custom-airport-wrap').classList.remove('active');
        }
      }
    });

    // Arrival Airport Custom Text – Fokus deselektiert Cards
    document.addEventListener('focus', (e) => {
      if (e.target.id === 'custom-airport') {
        document.querySelectorAll('.radio-card[data-airport]').forEach(c => c.classList.remove('active'));
        e.target.closest('.custom-airport-wrap').classList.add('active');
      }
    }, true);

    document.addEventListener('input', (e) => {
      if (e.target.id === 'custom-airport') {
        const val = e.target.value.trim();
        if (val) {
          this.state.airport = val;
        }
      }
    });

    // Return Toggle Cards
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.radio-card[data-return]');
      if (card) {
        const isSame = card.dataset.return === 'same';
        this.state.sameReturn = isSame;
        document.querySelectorAll('.radio-card[data-return]').forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const returnGroup = document.getElementById('return-airport-group');
        if (returnGroup) {
          returnGroup.classList.toggle('visible', !isSame);
        }
        if (isSame) {
          this.state.departureAirport = null;
          const customReturn = document.getElementById('custom-return-airport');
          if (customReturn) {
            customReturn.value = '';
            customReturn.closest('.custom-airport-wrap').classList.remove('active');
          }
          document.querySelectorAll('.radio-card[data-return-airport]').forEach(c => c.classList.remove('active'));
        }
      }
    });

    // Return Airport Cards
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.radio-card[data-return-airport]');
      if (card) {
        this.state.departureAirport = card.dataset.returnAirport;
        document.querySelectorAll('.radio-card[data-return-airport]').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const customInput = document.getElementById('custom-return-airport');
        if (customInput) {
          customInput.value = '';
          customInput.closest('.custom-airport-wrap').classList.remove('active');
        }
      }
    });

    // Return Airport Custom Text – Fokus deselektiert Cards
    document.addEventListener('focus', (e) => {
      if (e.target.id === 'custom-return-airport') {
        document.querySelectorAll('.radio-card[data-return-airport]').forEach(c => c.classList.remove('active'));
        e.target.closest('.custom-airport-wrap').classList.add('active');
      }
    }, true);

    document.addEventListener('input', (e) => {
      if (e.target.id === 'custom-return-airport') {
        const val = e.target.value.trim();
        if (val) {
          this.state.departureAirport = val;
        }
      }
    });

    // Transport Preference Cards
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.radio-card[data-transport]');
      if (card) {
        this.state.transport = card.dataset.transport;
        document.querySelectorAll('.radio-card[data-transport]').forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const hoursGroup = document.getElementById('train-hours-group');
        if (hoursGroup) {
          hoursGroup.classList.toggle('visible', this.state.transport === 'train-preferred' || this.state.transport === 'ground-preferred');
        }
      }
    });

    // Train Max Hours Slider
    document.addEventListener('input', (e) => {
      if (e.target.id === 'train-hours-slider') {
        this.state.trainMaxHours = parseInt(e.target.value);
        const display = document.getElementById('train-hours-value');
        if (display) display.textContent = `${this.state.trainMaxHours} Stunden Zugfahrt`;
      }
    });

    // Days Slider
    document.addEventListener('input', (e) => {
      if (e.target.id === 'days-slider') {
        this.state.days = parseInt(e.target.value);
        const display = document.getElementById('days-value');
        if (display) display.textContent = `${this.state.days} Tage`;
      }
    });

    // Season Radio Cards
    document.addEventListener('click', (e) => {
      const seasonCard = e.target.closest('.radio-card[data-season]');
      if (seasonCard) {
        this.state.season = seasonCard.dataset.season;
        document.querySelectorAll('.radio-card[data-season]').forEach(c => c.classList.remove('active'));
        seasonCard.classList.add('active');
      }
    });

    // Group Radio Cards
    document.addEventListener('click', (e) => {
      const groupCard = e.target.closest('.radio-card[data-group]');
      if (groupCard) {
        this.state.group = groupCard.dataset.group;
        document.querySelectorAll('.radio-card[data-group]').forEach(c => c.classList.remove('active'));
        groupCard.classList.add('active');

        // Child-Age Feld anzeigen/verstecken
        const childGroup = document.getElementById('child-age-group');
        if (childGroup) {
          childGroup.classList.toggle('visible', this.state.group === 'family');
        }
        if (this.state.group !== 'family') {
          this.state.childAge = null;
        }
      }
    });

    // Child Age Radio Cards
    document.addEventListener('click', (e) => {
      const ageCard = e.target.closest('.radio-card[data-age]');
      if (ageCard) {
        this.state.childAge = ageCard.dataset.age;
        document.querySelectorAll('.radio-card[data-age]').forEach(c => c.classList.remove('active'));
        ageCard.classList.add('active');
      }
    });

    // Additional Notes Textarea
    document.addEventListener('input', (e) => {
      if (e.target.id === 'additional-notes') {
        this.state.additionalNotes = e.target.value;
      }
    });
  },

  /**
   * Zeigt das API-Key Modal
   */
  showApiKeyModal() {
    const backdrop = document.getElementById('apikey-modal');
    if (backdrop) backdrop.classList.add('active');
  },

  /**
   * Schließt das API-Key Modal
   */
  closeApiKeyModal() {
    const backdrop = document.getElementById('apikey-modal');
    if (backdrop) backdrop.classList.remove('active');
  },

  /**
   * Speichert den API Key und fährt fort
   */
  saveApiKey() {
    const input = document.getElementById('apikey-input');
    if (!input) return;

    const key = input.value.trim();
    if (!key) {
      input.style.borderColor = 'var(--danger)';
      return;
    }

    this.apiKey = key;
    this.closeApiKeyModal();

    // Wenn wir von Step 3 kamen, jetzt Route generieren
    if (this.currentStep === 3) {
      this.nextStep();
    }
  },

  /**
   * Startet die Loading-Animation mit Timer, Fortschritts-Phasen und Facts
   */
  startLoading() {
    const cc = CountryConfig.current;
    const facts = cc ? cc.facts : [];
    this._loadingStart = Date.now();

    // Facts initialisieren
    const factEl = document.getElementById('loading-fact');
    if (factEl && facts.length > 0) {
      const fact = facts[Math.floor(Math.random() * facts.length)];
      factEl.innerHTML = `<strong>Wusstest du?</strong> ${fact}`;
    }

    // Fortschrittsbalken und Phasen zurücksetzen
    const barFill = document.getElementById('loading-bar-fill');
    if (barFill) barFill.style.width = '0%';

    const phases = document.querySelectorAll('.loading-phase');
    phases.forEach((p, i) => {
      p.classList.remove('active', 'done');
      if (i === 0) p.classList.add('active');
    });

    const timerEl = document.getElementById('loading-timer');
    if (timerEl) timerEl.textContent = '⏱ 0s';

    // Phasen-Zeitpunkte (in Sekunden) – simuliert den KI-Prozess
    const phaseTimings = [0, 8, 20, 40];
    // Fortschrittsbalken: wächst asymptotisch bis ~92% (nie 100% bis fertig)
    const estimatedDuration = 60; // geschätzte Sekunden

    // Interval: Timer + Phasen + Bar jede Sekunde aktualisieren
    this._loadingInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this._loadingStart) / 1000);

      // Timer aktualisieren
      if (timerEl) timerEl.textContent = `⏱ ${elapsed}s`;

      // Phasen aktualisieren
      let currentPhase = 0;
      for (let i = phaseTimings.length - 1; i >= 0; i--) {
        if (elapsed >= phaseTimings[i]) {
          currentPhase = i;
          break;
        }
      }
      phases.forEach((p, i) => {
        p.classList.remove('active', 'done');
        if (i < currentPhase) p.classList.add('done');
        else if (i === currentPhase) p.classList.add('active');
      });

      // Fortschrittsbalken: asymptotisch (1 - e^(-t/k)) * max
      const progress = Math.min(92, (1 - Math.exp(-elapsed / (estimatedDuration * 0.5))) * 92);
      if (barFill) barFill.style.width = `${progress.toFixed(1)}%`;

      // Facts alle 6 Sekunden rotieren
      if (elapsed > 0 && elapsed % 6 === 0 && factEl && facts.length > 0) {
        const fact = facts[Math.floor(Math.random() * facts.length)];
        factEl.innerHTML = `<strong>Wusstest du?</strong> ${fact}`;
      }
    }, 1000);
  },

  /**
   * Stoppt die Loading-Animation und setzt den Balken auf 100%
   */
  stopLoading() {
    if (this._loadingInterval) clearInterval(this._loadingInterval);
    this._loadingInterval = null;

    // Balken auf 100% setzen, alle Phasen als erledigt markieren
    const barFill = document.getElementById('loading-bar-fill');
    if (barFill) barFill.style.width = '100%';
    document.querySelectorAll('.loading-phase').forEach(p => {
      p.classList.remove('active');
      p.classList.add('done');
    });
  },

  /**
   * Zeigt eine Fehlermeldung
   */
  showError(message) {
    this.stopLoading();

    const errorEl = document.getElementById('error-message');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
      setTimeout(() => { errorEl.style.display = 'none'; }, 8000);
    } else {
      alert(message);
    }
  },

  /**
   * Regeneriert die Route (z.B. nach Vorschlag-Akzeptanz)
   * Zeigt Loading, generiert neu, bei Fehler alte Route beibehalten
   */
  async regenerateRoute() {
    const oldResult = this.state.result;

    this.showStep(4);
    this.startLoading();

    try {
      const result = await Gemini.generateRoute();
      this.stopLoading();
      this.showStep(5);
      Results.render(result);
    } catch (err) {
      this.stopLoading();
      console.error('Route regeneration error:', err);
      this.showError('Neugenerierung fehlgeschlagen: ' + err.message);
      // Alte Route beibehalten
      if (oldResult) {
        this.state.result = oldResult;
        this.showStep(5);
        Results.render(oldResult);
      } else {
        this.showStep(3);
      }
    }
  },

  /**
   * Passt die bestehende Route anhand eines Freitext-Wunsches an
   * Nutzt einen dedizierten Adjust-Prompt mit der aktuellen Route als Kontext
   */
  async adjustRoute(adjustText) {
    const currentResult = this.state.result;
    if (!currentResult) return;

    this.showStep(4);
    this.startLoading();

    try {
      const result = await Gemini.adjustRoute(adjustText, currentResult);
      this.stopLoading();
      this.showStep(5);
      Results.render(result);
    } catch (err) {
      this.stopLoading();
      console.error('Route adjustment error:', err);
      this.showError('Anpassung fehlgeschlagen: ' + err.message);
      // Alte Route beibehalten
      this.state.result = currentResult;
      this.showStep(5);
      Results.render(currentResult);
    }
  },

  /**
   * Startet die App neu (zurück zum Hero / Länderauswahl)
   */
  restart() {
    // Shared-View-State aufräumen
    this._isSharedView = false;
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
    const banner = document.querySelector('.shared-route-banner');
    if (banner) banner.remove();

    // Progress-Bar wieder einblenden
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) progressBar.style.display = '';

    // Header-Links wiederherstellen
    const apiKeyLink = document.querySelector('.header-nav a[onclick*="showApiKeyModal"]');
    if (apiKeyLink) apiKeyLink.style.display = '';
    const restartLink = document.querySelector('.header-nav a[onclick*="restart"]');
    if (restartLink) restartLink.textContent = 'Neu starten';

    this.state.country = null;
    this.state.airport = null;
    this.state.sameReturn = true;
    this.state.departureAirport = null;
    this.state.transport = 'no-preference';
    this.state.trainMaxHours = 6;
    this.state.pinnedCities = [];
    this.state.additionalNotes = '';
    this.state.result = null;
    this.state.preferences = {
      'Kultur': 5, 'Natur': 5, 'Geschichte': 5,
      'Großstadt': 5, 'Erholung': 3, 'Abenteuer': 3, 'Kulinarik': 5
    };
    this.stopLoading();
    Results.destroy();
    MapModule.destroy();

    // Branding zurücksetzen
    const logoSubtitle = document.getElementById('logo-subtitle');
    if (logoSubtitle) {
      logoSubtitle.textContent = '';
      logoSubtitle.classList.remove('visible');
    }
    const footerDesc = document.getElementById('footer-desc');
    if (footerDesc) footerDesc.textContent = 'Personalisierte Routenplanung für Individualreisen';
    document.title = 'NomadRoute – Dein Reiseplaner für Individualreisen';

    this.showStep(0);
  }
};

// App starten
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
