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
    routeMode: 'custom',       // 'custom' | 'inspired'
    travelPace: 'balanced',    // 'fast' | 'balanced' | 'slow'
    strictPins: false,         // true = NUR gepinnte Orte, keine KI-Ergänzungen
    result: null
  },

  /**
   * Initialisiert die App
   */
  _isSharedView: false,

  init() {
    this.bindNavigation();
    this.bindBasicsForm();
    this.initFavorites();

    // Geteilte Route im URL-Hash erkennen
    if (this.loadSharedRoute()) return;

    this.showStep(0);
    this.updateProgressDots();
  },

  /**
   * Initialisiert die Favoriten-Hearts auf Country-Cards
   */
  initFavorites() {
    const favs = this.getFavorites();

    document.querySelectorAll('.country-card').forEach(card => {
      const countryId = card.dataset.country;
      if (!countryId) return;

      const heartBtn = document.createElement('button');
      heartBtn.className = 'country-card-fav' + (favs.includes(countryId) ? ' active' : '');
      heartBtn.setAttribute('aria-label', 'Favorit');
      heartBtn.innerHTML = favs.includes(countryId) ? '❤️' : '🤍';
      heartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleFavorite(countryId, heartBtn);
      });
      card.appendChild(heartBtn);
    });

    // Favoriten nach oben sortieren
    this.sortCountryCardsByFavorites();
  },

  getFavorites() {
    try {
      return JSON.parse(localStorage.getItem('nomadroute-favorites') || '[]');
    } catch { return []; }
  },

  toggleFavorite(countryId, btn) {
    let favs = this.getFavorites();
    const idx = favs.indexOf(countryId);
    if (idx > -1) {
      favs.splice(idx, 1);
      btn.classList.remove('active');
      btn.innerHTML = '🤍';
    } else {
      favs.push(countryId);
      btn.classList.add('active');
      btn.innerHTML = '❤️';
    }
    localStorage.setItem('nomadroute-favorites', JSON.stringify(favs));
    this.sortCountryCardsByFavorites();
  },

  sortCountryCardsByFavorites() {
    const grid = document.getElementById('country-selector');
    if (!grid) return;
    const favs = this.getFavorites();
    const cards = [...grid.querySelectorAll('.country-card')];
    cards.sort((a, b) => {
      const aFav = favs.includes(a.dataset.country) ? 0 : 1;
      const bFav = favs.includes(b.dataset.country) ? 0 : 1;
      return aFav - bFav;
    });
    cards.forEach(c => grid.appendChild(c));
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

    // Initiale Slider-Fills setzen
    const daysSlider = document.getElementById('days-slider');
    if (daysSlider) {
      const daysPct = ((this.state.days - 7) / (35 - 7)) * 100;
      daysSlider.style.setProperty('--fill-pct', `${daysPct}%`);
    }
    const trainSlider = document.getElementById('train-hours-slider');
    if (trainSlider) {
      const trainPct = ((this.state.trainMaxHours - 3) / (12 - 3)) * 100;
      trainSlider.style.setProperty('--fill-pct', `${trainPct}%`);
    }

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
          <div class="radio-card-icon" aria-hidden="true">✈️</div>
          <div class="radio-card-label">${ap.label}</div>
          <div class="radio-card-desc">${ap.desc}</div>
        </div>
      `).join('');
    }

    if (returnContainer) {
      returnContainer.innerHTML = cc.airports.map(ap => `
        <div class="radio-card" data-return-airport="${ap.value}" role="button" tabindex="0">
          <div class="radio-card-icon" aria-hidden="true">✈️</div>
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

    // Bei Loading (4) und Ergebnis (5) immer nach oben scrollen
    if (step === 4 || step === 5) {
      window.scrollTo({ top: 0 });
    }

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

    // Scroll zum Step-Container + Focus-Management
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Focus auf die Überschrift des neuen Steps setzen (Barrierefreiheit)
      const heading = el.querySelector('h2, h3');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        setTimeout(() => heading.focus({ preventScroll: true }), 400);
      }
    }
  },

  /**
   * Geht zum nächsten Step
   */
  async nextStep() {
    // Doppelklick-Schutz während Routengenerierung
    if (this._generating) return;

    let next = this.currentStep + 1;

    // KI-Inspiration: Von Step 2 direkt Step 3 überspringen
    if (next === 3 && this.state.routeMode === 'inspired') {
      this.state.pinnedCities = [];
      this.state.additionalNotes = '';
      next = 4; // direkt zum Loading
    }

    // Custom-Modus: Bestätigungsdialog + Pace-Auswahl
    if (next === 4 && this.state.routeMode === 'custom') {
      const pinCount = this.state.pinnedCities.length;
      if (pinCount > 0) {
        // IMMER Dialog zeigen wenn mindestens 1 Pin gesetzt
        const confirmed = await this.showPinConfirmation(pinCount);
        if (confirmed === null) return; // User hat abgebrochen
        this.state.strictPins = confirmed; // true = nur diese Orte
      } else {
        // Keine Pins → KI plant frei, aber Pace-Dialog zeigen
        const pace = await this.showPaceOnlyDialog();
        if (pace === null) return; // User hat abgebrochen
        this.state.travelPace = pace;
        this.state.strictPins = false;
      }
    }

    // Vor dem Wechsel zu Step 4 (Loading): Route generieren
    if (next === 4) {
      this._generating = true;
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
        this.showStep(this.state.routeMode === 'inspired' ? 2 : 3);
      } finally {
        this._generating = false;
      }
      return;
    }

    if (next <= 5) {
      this.showStep(next);
    }
  },

  /**
   * Zeigt den Bestätigungsdialog wenn wenige Pins gewählt wurden
   * @returns {Promise<boolean|null>} true = nur diese Orte, false = KI ergänzt, null = abgebrochen
   */
  showPinConfirmation(pinCount) {
    return new Promise((resolve) => {
      const days = this.state.days;
      const dests = MapModule.getActiveDestinations();
      const pinNames = this.state.pinnedCities
        .map(id => { const d = dests.find(x => x.id === id); return d ? d.name : id; })
        .join(', ');

      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop active';
      backdrop.id = 'pin-confirm-modal';
      backdrop.innerHTML = `
        <div class="modal pin-confirm-modal">
          <div class="pin-confirm-header">
            <span class="pin-confirm-icon">🤔</span>
            <h3>Kurze Rückfrage</h3>
          </div>
          <p class="pin-confirm-text">
            Du hast <strong>${pinCount} ${pinCount === 1 ? 'Ort' : 'Orte'}</strong> für <strong>${days} Tage</strong> gewählt: <em>${pinNames}</em>.
            <br>Soll die KI passende Ziele ergänzen, oder möchtest du nur diese Orte besuchen?
          </p>
          <div class="pin-confirm-options">
            <button class="pin-confirm-btn pin-confirm-strict" data-choice="strict">
              <span class="pin-confirm-btn-icon">📌</span>
              <span class="pin-confirm-btn-title">Nur diese Orte</span>
              <span class="pin-confirm-btn-desc">Mehr Zeit pro Stopp, keine Überraschungen</span>
            </button>
            <button class="pin-confirm-btn pin-confirm-fill" data-choice="fill">
              <span class="pin-confirm-btn-icon">✨</span>
              <span class="pin-confirm-btn-title">KI soll ergänzen</span>
              <span class="pin-confirm-btn-desc">Passende Ziele werden automatisch hinzugefügt</span>
            </button>
          </div>
          <div class="pin-confirm-pace" id="pin-confirm-pace" style="display:none;">
            <div class="pin-confirm-pace-label">Dein Reisetempo:</div>
            <div class="pin-confirm-pace-cards">
              <button class="pace-card-mini" data-pace-choice="fast">
                <span class="pace-card-mini-icon">🚀</span>
                <span class="pace-card-mini-title">Viel sehen</span>
                <span class="pace-card-mini-desc">2–3 Nächte pro Stopp</span>
              </button>
              <button class="pace-card-mini active" data-pace-choice="balanced">
                <span class="pace-card-mini-icon">⚖️</span>
                <span class="pace-card-mini-title">Ausgewogen</span>
                <span class="pace-card-mini-desc">3–4 Nächte pro Stopp</span>
              </button>
              <button class="pace-card-mini" data-pace-choice="slow">
                <span class="pace-card-mini-icon">🐢</span>
                <span class="pace-card-mini-title">Slow Travel</span>
                <span class="pace-card-mini-desc">4–5 Nächte pro Stopp</span>
              </button>
            </div>
            <button class="btn btn-primary pin-confirm-go" data-choice="fill-go">Route erstellen ✨</button>
          </div>
          <button class="pin-confirm-cancel" data-choice="cancel">← Zurück zur Karte</button>
        </div>
      `;

      let selectedPace = 'balanced';

      const cleanup = (choice) => {
        backdrop.classList.remove('active');
        setTimeout(() => backdrop.remove(), 300);
        document.removeEventListener('keydown', escHandler);
        if (choice === 'strict') resolve(true);
        else if (choice === 'fill' || choice === 'fill-go') {
          this.state.travelPace = selectedPace;
          resolve(false);
        } else resolve(null);
      };

      backdrop.addEventListener('click', (e) => {
        // Pace-Card auswählen
        const paceBtn = e.target.closest('[data-pace-choice]');
        if (paceBtn) {
          selectedPace = paceBtn.dataset.paceChoice;
          backdrop.querySelectorAll('[data-pace-choice]').forEach(b => b.classList.remove('active'));
          paceBtn.classList.add('active');
          return;
        }

        const btn = e.target.closest('[data-choice]');
        if (btn) {
          const choice = btn.dataset.choice;
          // "KI soll ergänzen" → Pace-Section einblenden statt sofort abschließen
          if (choice === 'fill') {
            const paceSection = backdrop.querySelector('#pin-confirm-pace');
            const optionsSection = backdrop.querySelector('.pin-confirm-options');
            if (paceSection && optionsSection) {
              optionsSection.style.display = 'none';
              paceSection.style.display = '';
            }
            return;
          }
          cleanup(choice);
        } else if (e.target === backdrop) {
          cleanup('cancel');
        }
      });

      const escHandler = (e) => {
        if (e.key === 'Escape') {
          cleanup('cancel');
        }
      };
      document.addEventListener('keydown', escHandler);

      document.body.appendChild(backdrop);
    });
  },

  /**
   * Zeigt einen reinen Pace-Dialog wenn keine Pins gesetzt sind
   * @returns {Promise<string|null>} Pace ('fast'|'balanced'|'slow') oder null bei Abbruch
   */
  showPaceOnlyDialog() {
    return new Promise((resolve) => {
      const days = this.state.days;
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop active';
      backdrop.id = 'pace-only-modal';
      backdrop.innerHTML = `
        <div class="modal pin-confirm-modal">
          <div class="pin-confirm-header">
            <span class="pin-confirm-icon">✨</span>
            <h3>Die KI plant für dich</h3>
          </div>
          <p class="pin-confirm-text">
            Du hast keine Orte ausgewählt. Die KI erstellt eine komplette Route für <strong>${days} Tage</strong> basierend auf deinen Interessen.
          </p>
          <div class="pin-confirm-pace" style="display:block;">
            <div class="pin-confirm-pace-label">Wähle dein Reisetempo:</div>
            <div class="pin-confirm-pace-cards">
              <button class="pace-card-mini" data-pace-choice="fast">
                <span class="pace-card-mini-icon">🚀</span>
                <span class="pace-card-mini-title">Viel sehen</span>
                <span class="pace-card-mini-desc">2–3 Nächte pro Stopp</span>
              </button>
              <button class="pace-card-mini active" data-pace-choice="balanced">
                <span class="pace-card-mini-icon">⚖️</span>
                <span class="pace-card-mini-title">Ausgewogen</span>
                <span class="pace-card-mini-desc">3–4 Nächte pro Stopp</span>
              </button>
              <button class="pace-card-mini" data-pace-choice="slow">
                <span class="pace-card-mini-icon">🐢</span>
                <span class="pace-card-mini-title">Slow Travel</span>
                <span class="pace-card-mini-desc">4–5 Nächte pro Stopp</span>
              </button>
            </div>
            <button class="btn btn-primary pin-confirm-go" data-choice="go">Route erstellen ✨</button>
          </div>
          <button class="pin-confirm-cancel" data-choice="cancel">← Zurück zur Karte</button>
        </div>
      `;

      let selectedPace = 'balanced';

      const cleanup = (choice) => {
        backdrop.classList.remove('active');
        setTimeout(() => backdrop.remove(), 300);
        document.removeEventListener('keydown', escHandler);
        if (choice === 'go') resolve(selectedPace);
        else resolve(null);
      };

      backdrop.addEventListener('click', (e) => {
        const paceBtn = e.target.closest('[data-pace-choice]');
        if (paceBtn) {
          selectedPace = paceBtn.dataset.paceChoice;
          backdrop.querySelectorAll('[data-pace-choice]').forEach(b => b.classList.remove('active'));
          paceBtn.classList.add('active');
          return;
        }
        const btn = e.target.closest('[data-choice]');
        if (btn) cleanup(btn.dataset.choice);
        else if (e.target === backdrop) cleanup('cancel');
      });

      const escHandler = (e) => {
        if (e.key === 'Escape') {
          cleanup('cancel');
        }
      };
      document.addEventListener('keydown', escHandler);

      document.body.appendChild(backdrop);
    });
  },

  /**
   * Geht zum vorherigen Step
   */
  prevStep() {
    let prev = this.currentStep - 1;
    // Step 4 (Loading) überspringen — direkt zu Step 3 (oder Step 2 im Inspired-Modus)
    if (prev === 4) {
      prev = this.state.routeMode === 'inspired' ? 2 : 3;
    }
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

    // Map currentStep (1-5) to progress-step index (0-3)
    const activeIndex = Math.min(this.currentStep - 1, 3);

    document.querySelectorAll('.progress-step').forEach((step, i) => {
      step.classList.remove('active', 'completed');
      if (i === activeIndex) step.classList.add('active');
      else if (i < activeIndex) step.classList.add('completed');
      step.style.cursor = i < activeIndex ? 'pointer' : '';
    });

    // Update connectors
    document.querySelectorAll('.progress-connector').forEach((conn, i) => {
      conn.classList.toggle('completed', i < activeIndex);
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
      if (e.target.closest('[data-action="restart"]')) {
        if (this.currentStep > 0 && !confirm('Alle Eingaben gehen verloren. Möchtest du wirklich neu starten?')) return;
        this.restart();
      }
    });

    // Stepper-Steps: Klick auf bereits besuchte Steps
    document.addEventListener('click', (e) => {
      const step = e.target.closest('.progress-step');
      if (!step) return;
      const steps = [...document.querySelectorAll('.progress-step')];
      const stepIndex = steps.indexOf(step);
      // progress-step index 0 = app step 1, etc.
      const targetStep = stepIndex + 1;
      if (targetStep >= 1 && targetStep < this.currentStep) {
        this.showStep(targetStep);
      }
    });

    // Kontinent-Filter für Länderauswahl
    document.addEventListener('click', (e) => {
      const chip = e.target.closest('.continent-chip');
      if (!chip) return;
      const continent = chip.dataset.continent;
      document.querySelectorAll('.continent-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      document.querySelectorAll('.country-card').forEach(card => {
        if (continent === 'all' || card.dataset.continent === continent) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
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
        // Slider-Fill
        const pct = ((this.state.trainMaxHours - 3) / (12 - 3)) * 100;
        e.target.style.setProperty('--fill-pct', `${pct}%`);
      }
    });

    // Days Slider + Number Input (bidirektional synchronisiert)
    document.addEventListener('input', (e) => {
      if (e.target.id === 'days-slider') {
        this.state.days = parseInt(e.target.value);
        const numInput = document.getElementById('days-input');
        if (numInput) numInput.value = this.state.days;
        const pct = ((this.state.days - 7) / (35 - 7)) * 100;
        e.target.style.setProperty('--fill-pct', `${pct}%`);
      }
      if (e.target.id === 'days-input') {
        let val = parseInt(e.target.value);
        if (isNaN(val)) return;
        val = Math.max(7, Math.min(35, val));
        this.state.days = val;
        const slider = document.getElementById('days-slider');
        if (slider) {
          slider.value = val;
          const pct = ((val - 7) / (35 - 7)) * 100;
          slider.style.setProperty('--fill-pct', `${pct}%`);
        }
      }
    });
    // Clamp on blur for number input
    document.addEventListener('change', (e) => {
      if (e.target.id === 'days-input') {
        let val = parseInt(e.target.value);
        if (isNaN(val)) val = 14;
        val = Math.max(7, Math.min(35, val));
        e.target.value = val;
        this.state.days = val;
        const slider = document.getElementById('days-slider');
        if (slider) {
          slider.value = val;
          const pct = ((val - 7) / (35 - 7)) * 100;
          slider.style.setProperty('--fill-pct', `${pct}%`);
        }
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

    // Route Mode Cards (Eigene Auswahl / KI-Inspiration)
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.mode-card[data-mode]');
      if (card) {
        this.state.routeMode = card.dataset.mode;
        document.querySelectorAll('.mode-card[data-mode]').forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // Pace-Auswahl nur bei KI-Inspiration zeigen
        const paceGroup = document.getElementById('pace-group');
        if (paceGroup) {
          paceGroup.classList.toggle('visible', this.state.routeMode === 'inspired');
        }

        // Step 2 Button-Text anpassen
        const nextBtn = document.querySelector('#step-2 [data-action="next"]');
        if (nextBtn) {
          nextBtn.textContent = this.state.routeMode === 'inspired'
            ? 'Route erstellen ✨'
            : 'Weiter zur Kartenauswahl';
        }
      }
    });

    // Travel Pace Cards
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.pace-card[data-pace]');
      if (card) {
        this.state.travelPace = card.dataset.pace;
        document.querySelectorAll('.pace-card[data-pace]').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      }
    });
  },

  /**
   * Startet die Loading-Animation mit Timer, Fortschritts-Phasen und Facts
   */
  startLoading() {
    const cc = CountryConfig.current;
    const facts = cc ? cc.facts : [];
    this._loadingStart = Date.now();
    // Shuffled facts für wiederholungsfreie Rotation
    this._shuffledFacts = [...facts].sort(() => Math.random() - 0.5);
    this._factIndex = 0;

    // Facts initialisieren
    const factEl = document.getElementById('loading-fact');
    if (factEl && this._shuffledFacts.length > 0) {
      factEl.innerHTML = `<strong>Wusstest du?</strong> ${this._shuffledFacts[0]}`;
      this._factIndex = 1;
    }

    // Fortschrittsbalken und Phasen zurücksetzen
    const barFill = document.getElementById('loading-bar-fill');
    if (barFill) barFill.style.width = '0%';

    const phases = document.querySelectorAll('.loading-phase');
    phases.forEach((p, i) => {
      p.classList.remove('active', 'done');
      if (i === 0) p.classList.add('active');
    });

    // Phasen-Zeitpunkte (in Sekunden) – simuliert den KI-Prozess
    const phaseTimings = [0, 8, 20, 40];
    // Fortschrittsbalken: wächst asymptotisch bis ~92% (nie 100% bis fertig)
    const estimatedDuration = 60; // geschätzte Sekunden

    // Interval: Timer + Phasen + Bar jede Sekunde aktualisieren
    this._loadingInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this._loadingStart) / 1000);

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

      // Facts alle 6 Sekunden rotieren (ohne Wiederholung)
      if (elapsed > 0 && elapsed % 6 === 0 && factEl && this._shuffledFacts.length > 0) {
        if (this._factIndex >= this._shuffledFacts.length) this._factIndex = 0;
        factEl.innerHTML = `<strong>Wusstest du?</strong> ${this._shuffledFacts[this._factIndex]}`;
        this._factIndex++;
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
    if (this._generating) return;
    this._generating = true;
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
    } finally {
      this._generating = false;
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
   * Setzt alle Formular-DOM-Elemente auf ihre Defaults zurück
   */
  resetFormDOM() {
    // Days Slider
    const daysSlider = document.getElementById('days-slider');
    if (daysSlider) {
      daysSlider.value = 14;
      daysSlider.style.setProperty('--fill-pct', `${((14 - 7) / (35 - 7)) * 100}%`);
    }
    const daysInput = document.getElementById('days-input');
    if (daysInput) daysInput.value = 14;

    // Train Hours Slider
    const trainSlider = document.getElementById('train-hours-slider');
    if (trainSlider) {
      trainSlider.value = 6;
      trainSlider.style.setProperty('--fill-pct', `${((6 - 3) / (12 - 3)) * 100}%`);
    }
    const trainDisplay = document.getElementById('train-hours-value');
    if (trainDisplay) trainDisplay.textContent = '6 Stunden';
    const trainGroup = document.getElementById('train-hours-group');
    if (trainGroup) trainGroup.classList.remove('visible');

    // Season Cards → Spring als Default
    document.querySelectorAll('.radio-card[data-season]').forEach(c => c.classList.remove('active'));
    const springCard = document.querySelector('.radio-card[data-season="spring"]');
    if (springCard) springCard.classList.add('active');

    // Group Cards → Solo als Default
    document.querySelectorAll('.radio-card[data-group]').forEach(c => c.classList.remove('active'));
    const soloCard = document.querySelector('.radio-card[data-group="solo"]');
    if (soloCard) soloCard.classList.add('active');

    // Child Age ausblenden + Reset
    const childGroup = document.getElementById('child-age-group');
    if (childGroup) childGroup.classList.remove('visible');
    document.querySelectorAll('.radio-card[data-age]').forEach(c => c.classList.remove('active'));

    // Return-Airport Felder zurücksetzen
    document.querySelectorAll('.radio-card[data-return]').forEach(c => c.classList.remove('active'));
    const sameReturnCard = document.querySelector('.radio-card[data-return="same"]');
    if (sameReturnCard) sameReturnCard.classList.add('active');
    const depGroup = document.getElementById('return-airport-group');
    if (depGroup) depGroup.classList.remove('visible');

    // Additional Notes Textarea
    const notesField = document.getElementById('additional-notes');
    if (notesField) notesField.value = '';

    // Custom Airport Input
    const customAirport = document.getElementById('custom-airport');
    if (customAirport) customAirport.value = '';

    // Route Mode → Custom als Default
    document.querySelectorAll('.mode-card[data-mode]').forEach(c => c.classList.remove('active'));
    const customModeCard = document.querySelector('.mode-card[data-mode="custom"]');
    if (customModeCard) customModeCard.classList.add('active');

    // Pace Group ausblenden + Balanced als Default
    const paceGroup = document.getElementById('pace-group');
    if (paceGroup) paceGroup.classList.remove('visible');
    document.querySelectorAll('.pace-card[data-pace]').forEach(c => c.classList.remove('active'));
    const balancedCard = document.querySelector('.pace-card[data-pace="balanced"]');
    if (balancedCard) balancedCard.classList.add('active');

    // Step 2 Next-Button Text zurücksetzen
    const nextBtn = document.querySelector('#step-2 [data-action="next"]');
    if (nextBtn) nextBtn.textContent = 'Weiter zur Kartenauswahl';

    // Preference Sliders werden durch Preferences.render() beim nächsten Step-2-Besuch neu gerendert
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
    const restartLink = document.querySelector('.header-nav a[onclick*="restart"]');
    if (restartLink) restartLink.textContent = 'Neu starten';

    this.state.country = null;
    this.state.airport = null;
    this.state.sameReturn = true;
    this.state.departureAirport = null;
    this.state.transport = 'no-preference';
    this.state.trainMaxHours = 6;
    this.state.days = 14;
    this.state.season = 'spring';
    this.state.group = 'solo';
    this.state.childAge = null;
    this.state.pinnedCities = [];
    this.state.additionalNotes = '';
    this.state.routeMode = 'custom';
    this.state.travelPace = 'balanced';
    this.state.strictPins = false;
    this.state.result = null;
    this.state.preferences = {
      'Kultur': 5, 'Natur': 5, 'Geschichte': 5,
      'Großstadt': 5, 'Erholung': 3, 'Abenteuer': 3, 'Kulinarik': 5
    };
    Preferences._activePreset = null;
    this.stopLoading();
    Results.destroy();
    MapModule.destroy();

    // DOM-Elemente auf Defaults zurücksetzen
    this.resetFormDOM();

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
