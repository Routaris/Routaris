/* ============================================
   SAVED-ROUTES.JS – "Meine Routen" Feature
   Speichert, lädt und verwaltet generierte Routen
   in localStorage mit LZ-String-Kompression.
   ============================================ */

const SavedRoutes = {
  STORAGE_KEY: 'routaris_saved_routes',
  MAX_ROUTES: 20,
  _drawerOpen: false,

  /**
   * Gibt alle gespeicherten Routen zurück (neueste zuerst)
   */
  getAll() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      console.error('[SavedRoutes] Fehler beim Laden:', e);
      return [];
    }
  },

  /**
   * Speichert die aktuelle Route
   */
  saveCurrent() {
    const result = App.state.result;
    if (!result || !result.stops) {
      this._showToast('Keine Route zum Speichern vorhanden.');
      return false;
    }

    const cc = CountryConfig.current;
    if (!cc) {
      this._showToast('Kein Land ausgewählt.');
      return false;
    }

    // Komprimiere das result JSON mit LZ-String
    let compressed = '';
    try {
      if (typeof LZString === 'undefined') {
        console.error('[SavedRoutes] LZString nicht verfügbar');
        this._showToast('Fehler beim Speichern (Kompression nicht verfügbar).');
        return false;
      }
      compressed = LZString.compressToUTF16(JSON.stringify(result));
    } catch (e) {
      console.error('[SavedRoutes] Kompression fehlgeschlagen:', e);
      this._showToast('Fehler beim Speichern.');
      return false;
    }

    // State-Snapshot erstellen (ohne result, da separat komprimiert)
    const stateSnapshot = {
      country: App.state.country,
      airport: App.state.airport,
      days: App.state.days,
      season: App.state.season,
      group: App.state.group,
      childAge: App.state.childAge,
      preferences: { ...App.state.preferences },
      pinnedCities: [...App.state.pinnedCities],
      transport: App.state.transport,
      travelPace: App.state.travelPace,
      arrivalDate: App.state.arrivalDate,
      departureDate: App.state.departureDate,
    };

    const route = {
      id: Date.now(),
      name: result.routeName || 'Unbenannte Route',
      country: {
        id: cc.id,
        name: cc.name,
        brandName: cc.brandName,
        brandEmoji: cc.brandEmoji
      },
      date: new Date().toISOString(),
      totalNights: result.totalNights || 0,
      stopsCount: result.stops.length,
      stopNames: result.stops.map(s => s.city),
      resultCompressed: compressed,
      stateSnapshot
    };

    // Bestehende Routen laden und neue vorne einfügen
    const routes = this.getAll();

    // Duplikat-Check: gleicher Routenname + gleiches Land = überschreiben
    const existingIdx = routes.findIndex(r =>
      r.name === route.name && r.country.id === route.country.id
    );
    if (existingIdx >= 0) {
      routes.splice(existingIdx, 1);
    }

    routes.unshift(route);

    // Maximum einhalten
    while (routes.length > this.MAX_ROUTES) {
      routes.pop();
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(routes));
    } catch (e) {
      console.error('[SavedRoutes] localStorage voll:', e);
      this._showToast('Speicher voll. Lösche alte Routen und versuche es erneut.');
      return false;
    }

    this._showToast('Route gespeichert!', 'success');
    this.renderDrawerContent();
    this._updateHeaderBadge();
    return true;
  },

  /**
   * Lädt eine gespeicherte Route und zeigt sie an
   */
  load(routeId) {
    const routes = this.getAll();
    const route = routes.find(r => r.id === routeId);
    if (!route) {
      this._showToast('Route nicht gefunden.');
      return;
    }

    try {
      // Result dekomprimieren
      const json = LZString.decompressFromUTF16(route.resultCompressed);
      if (!json) throw new Error('Dekompression fehlgeschlagen');
      const result = JSON.parse(json);

      // Country setzen
      const countryId = route.country.id || (route.stateSnapshot && route.stateSnapshot.country) || 'china';
      CountryConfig.setCountry(countryId);
      const cc = CountryConfig.current;

      // State wiederherstellen
      if (route.stateSnapshot) {
        Object.assign(App.state, route.stateSnapshot);
      }
      App.state.country = countryId;
      App.state.result = result;

      // Branding aktualisieren
      App.updateBranding(cc);

      // Drawer schließen
      this.closeDrawer();

      // Ergebnis anzeigen
      App.showStep(5);
      Results.render(result);

      console.log(`[SavedRoutes] Route geladen: ${route.name}`);
    } catch (e) {
      console.error('[SavedRoutes] Fehler beim Laden:', e);
      this._showToast('Fehler beim Laden der Route.');
    }
  },

  /**
   * Löscht eine gespeicherte Route
   */
  delete(routeId) {
    const routes = this.getAll();
    const route = routes.find(r => r.id === routeId);
    if (!route) return;

    // Bestätigungsdialog
    const name = route.name;
    this._showConfirm(
      `Route "${name}" wirklich löschen?`,
      () => {
        const updated = routes.filter(r => r.id !== routeId);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
        this.renderDrawerContent();
        this._updateHeaderBadge();
        this._showToast('Route gelöscht.', 'success');
      }
    );
  },

  // ==========================================
  // Drawer UI
  // ==========================================

  /**
   * Öffnet den Drawer
   */
  openDrawer() {
    const drawer = document.getElementById('saved-routes-drawer');
    if (!drawer) return;
    this._drawerOpen = true;
    this.renderDrawerContent();
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  /**
   * Schließt den Drawer
   */
  closeDrawer() {
    const drawer = document.getElementById('saved-routes-drawer');
    if (!drawer) return;
    this._drawerOpen = false;
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  },

  /**
   * Toggle Drawer
   */
  toggleDrawer() {
    if (this._drawerOpen) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  },

  /**
   * Rendert den Inhalt des Drawers
   */
  renderDrawerContent() {
    const list = document.getElementById('saved-routes-list');
    if (!list) return;

    const routes = this.getAll();
    const hasCurrentRoute = App.state.result && App.state.result.stops;

    let html = '';

    // "Route speichern" Button oben, wenn aktuelle Route vorhanden
    if (hasCurrentRoute) {
      html += `
        <button class="saved-routes-save-btn" onclick="SavedRoutes.saveCurrent()">
          <span class="saved-routes-save-icon">+</span>
          <span>Aktuelle Route speichern</span>
        </button>
      `;
    }

    if (routes.length === 0) {
      html += `
        <div class="saved-routes-empty">
          <div class="saved-routes-empty-icon">📋</div>
          <p class="saved-routes-empty-title">Noch keine Routen gespeichert</p>
          <p class="saved-routes-empty-desc">Erstelle deine erste Route und speichere sie hier!</p>
        </div>
      `;
    } else {
      html += `<div class="saved-routes-count">${routes.length} Route${routes.length !== 1 ? 'n' : ''} gespeichert</div>`;
      routes.forEach(route => {
        const dateStr = this._formatDate(route.date);
        const stopsPreview = route.stopNames
          ? route.stopNames.slice(0, 4).join(' → ') + (route.stopNames.length > 4 ? ' → ...' : '')
          : '';

        html += `
          <div class="saved-route-card" data-route-id="${route.id}">
            <div class="saved-route-card-header">
              <span class="saved-route-country">${route.country.brandEmoji} ${route.country.brandName}</span>
              <span class="saved-route-date">${dateStr}</span>
            </div>
            <div class="saved-route-card-body">
              <h4 class="saved-route-name">${this._escapeHtml(route.name)}</h4>
              <div class="saved-route-meta">
                <span class="saved-route-meta-item">📍 ${route.stopsCount} Stopp${route.stopsCount !== 1 ? 's' : ''}</span>
                <span class="saved-route-meta-item">🌙 ${route.totalNights} Nächte</span>
              </div>
              ${stopsPreview ? `<div class="saved-route-stops-preview">${this._escapeHtml(stopsPreview)}</div>` : ''}
            </div>
            <div class="saved-route-card-actions">
              <button class="btn btn-sm btn-primary" onclick="SavedRoutes.load(${route.id})">Laden</button>
              <button class="btn btn-sm btn-outline saved-route-delete-btn" onclick="SavedRoutes.delete(${route.id})">Löschen</button>
            </div>
          </div>
        `;
      });
    }

    list.innerHTML = html;
  },

  // ==========================================
  // Header Badge
  // ==========================================

  /**
   * Aktualisiert den Badge-Counter im Header
   */
  _updateHeaderBadge() {
    const badge = document.getElementById('saved-routes-badge');
    if (!badge) return;
    const count = this.getAll().length;
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  },

  // ==========================================
  // Hilfsfunktionen
  // ==========================================

  /**
   * Formatiert ein ISO-Datum lesbar
   */
  _formatDate(isoStr) {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('de-DE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return '';
    }
  },

  /**
   * Einfaches HTML-Escaping
   */
  _escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  /**
   * Zeigt eine kurze Toast-Nachricht
   */
  _showToast(message, type = 'info') {
    // Existierenden Toast entfernen
    const existing = document.querySelector('.saved-routes-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `saved-routes-toast saved-routes-toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Einblenden
    requestAnimationFrame(() => toast.classList.add('visible'));

    // Nach 2.5s ausblenden
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  },

  /**
   * Einfacher Bestätigungsdialog innerhalb des Drawers
   */
  _showConfirm(message, onConfirm) {
    // Bestehende Confirm-Dialoge entfernen
    const existing = document.querySelector('.saved-routes-confirm');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'saved-routes-confirm';
    overlay.innerHTML = `
      <div class="saved-routes-confirm-box">
        <p>${this._escapeHtml(message)}</p>
        <div class="saved-routes-confirm-actions">
          <button class="btn btn-sm btn-primary" id="sr-confirm-yes">Ja, löschen</button>
          <button class="btn btn-sm btn-outline" id="sr-confirm-no">Abbrechen</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('#sr-confirm-yes').addEventListener('click', () => {
      overlay.remove();
      onConfirm();
    });
    overlay.querySelector('#sr-confirm-no').addEventListener('click', () => {
      overlay.remove();
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
  },

  /**
   * Initialisierung: Badge aktualisieren, Drawer-Backdrop-Click
   */
  init() {
    this._updateHeaderBadge();

    // Backdrop-Klick schließt Drawer
    const drawer = document.getElementById('saved-routes-drawer');
    if (drawer) {
      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) this.closeDrawer();
      });
    }

    // Escape-Taste schließt Drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this._drawerOpen) {
        this.closeDrawer();
      }
    });
  }
};

// Auto-Init wenn DOM bereit
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => SavedRoutes.init());
} else {
  SavedRoutes.init();
}
