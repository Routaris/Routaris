/* ============================================
   MAP.JS – Step 3: Leaflet Must-See-Karte + Destination-Grid + Pin-Logik
   Multi-Country-fähig via CountryConfig
   ============================================ */

const MapModule = {
  map: null,
  markers: {},
  tileLayer: null,
  offbeatOpen: false,

  /**
   * Gibt die aktiven Destinations zurück (aus CountryConfig)
   */
  getActiveDestinations() {
    return CountryConfig.current ? CountryConfig.current.destinations : DESTINATIONS;
  },

  /**
   * Ermittelt die Destination-ID zum gewählten Flughafen
   */
  getDestIdForAirport(airportStr) {
    if (!airportStr) return null;
    const cc = CountryConfig.current;

    // Länderspezifisches Airport-Mapping verwenden
    if (cc && cc.airportDestMap) {
      const lower = airportStr.toLowerCase();
      for (const [key, destId] of Object.entries(cc.airportDestMap)) {
        if (lower.includes(key)) return destId;
      }
    }

    // Fallback: Name-Matching
    const dests = this.getActiveDestinations();
    const city = airportStr.split(/\s/)[0].toLowerCase();
    const match = dests.find(d =>
      d.name.toLowerCase().includes(city) || d.id.includes(city)
    );
    return match ? match.id : null;
  },

  /**
   * Pinnt den Ankunftsort automatisch an (falls passende Destination existiert)
   */
  pinArrivalCity() {
    const destId = this.getDestIdForAirport(App.state.airport);
    if (destId && !App.state.pinnedCities.includes(destId)) {
      App.state.pinnedCities.unshift(destId);
    }
  },

  /**
   * Gibt nur die Hauptziele zurück (nicht offbeat)
   */
  getMainDestinations() {
    return this.getActiveDestinations().filter(d => !d.offbeat);
  },

  /**
   * Gibt nur die Off-the-beaten-path Ziele zurück
   */
  getOffbeatDestinations() {
    return this.getActiveDestinations().filter(d => d.offbeat);
  },

  /**
   * Initialisiert die Must-See Karte (Step 3)
   */
  init() {
    this.pinArrivalCity();

    const cc = CountryConfig.current;
    const center = cc ? cc.mapCenter : [33, 108];
    const zoom = cc ? cc.mapZoom : 4;

    if (this.map) {
      this.updateAll();
      this.map.setView(center, zoom);
      this.map.invalidateSize();
      return;
    }

    this.map = L.map('mustsee-map', {
      scrollWheelZoom: true,
      zoomControl: true
    }).setView(center, zoom);

    this.tileLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 18
      }
    ).addTo(this.map);

    this.addMarkers();
  },

  /**
   * Erstellt einen Marker-Icon basierend auf Status
   */
  createIcon(status, isOffbeat) {
    const colors = {
      pinned: { bg: '#c4654a', border: '#a8513a' },
      suggested: { bg: '#2a7c76', border: '#1f5f5a' },
      neutral: { bg: '#8a8878', border: '#6a6860' },
      offbeat: { bg: '#c8a951', border: '#a88d3a' }
    };
    // Offbeat-Ziele bekommen eigene Farbe, außer wenn gepinnt
    const c = (status === 'pinned') ? colors.pinned
            : isOffbeat ? colors.offbeat
            : (colors[status] || colors.neutral);

    const size = isOffbeat && status !== 'pinned' ? 12 : 14;
    const half = size / 2;

    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: ${size}px; height: ${size}px;
        background: ${c.bg};
        border: 2.5px solid ${c.border};
        border-radius: ${isOffbeat && status !== 'pinned' ? '3px' : '50%'};
        box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      "></div>`,
      iconSize: [size, size],
      iconAnchor: [half, half]
    });
  },

  /**
   * Fügt Marker hinzu – Hauptziele immer, Offbeat nur wenn gepinnt
   */
  addMarkers() {
    const dests = this.getActiveDestinations();
    dests.forEach(dest => {
      if (dest.offbeat && !App.state.pinnedCities.includes(dest.id)) return;
      this.addSingleMarker(dest);
    });
  },

  addSingleMarker(dest) {
    if (this.markers[dest.id]) return; // schon vorhanden
    const status = this.getDestStatus(dest.id);
    const marker = L.marker([dest.lat, dest.lng], {
      icon: this.createIcon(status, dest.offbeat)
    }).addTo(this.map);

    marker.bindTooltip(dest.name, {
      direction: 'top',
      offset: [0, -10],
      className: 'map-tooltip'
    });

    marker.on('click', () => this.togglePin(dest.id));
    this.markers[dest.id] = marker;
  },

  /**
   * Bestimmt den Status einer Destination
   */
  getDestStatus(destId) {
    if (App.state.pinnedCities.includes(destId)) return 'pinned';
    const dests = this.getActiveDestinations();
    const dest = dests.find(d => d.id === destId);
    if (dest && Preferences.getMatchScore(dest) >= 10) return 'suggested';
    return 'neutral';
  },

  /**
   * Toggled den Pin-Status einer Destination
   */
  togglePin(destId) {
    const dests = this.getActiveDestinations();
    const idx = App.state.pinnedCities.indexOf(destId);
    if (idx > -1) {
      App.state.pinnedCities.splice(idx, 1);
      // Offbeat-Marker nur entfernen wenn Sektion geschlossen
      const dest = dests.find(d => d.id === destId);
      if (dest && dest.offbeat && !this.offbeatOpen && this.markers[destId]) {
        this.map.removeLayer(this.markers[destId]);
        delete this.markers[destId];
      }
    } else {
      App.state.pinnedCities.push(destId);
      // Offbeat-Marker zur Karte hinzufügen (falls noch nicht da)
      const dest = dests.find(d => d.id === destId);
      if (dest && dest.offbeat) {
        this.addSingleMarker(dest);
      }
    }
    this.updateAll();
  },

  /**
   * Aktualisiert alle Marker und Cards
   */
  updateAll() {
    const dests = this.getActiveDestinations();
    dests.forEach(dest => {
      const status = this.getDestStatus(dest.id);
      const marker = this.markers[dest.id];
      if (marker) {
        marker.setIcon(this.createIcon(status, dest.offbeat));
      }
    });

    this.renderGrid();

    const counter = document.getElementById('pin-counter');
    if (counter) {
      counter.textContent = App.state.pinnedCities.length;
    }
  },

  /**
   * Rendert das Destination-Grid (Haupt + Offbeat-Sektion)
   */
  renderGrid() {
    const container = document.getElementById('dest-grid');
    if (!container) return;

    const arrivalDestId = this.getDestIdForAirport(App.state.airport);

    // Hauptziele sortieren
    const mainDests = this.sortDestinations(this.getMainDestinations(), arrivalDestId);

    // Offbeat sortieren (gepinnte oben)
    const offbeatDests = this.sortDestinations(this.getOffbeatDestinations(), arrivalDestId);

    let html = mainDests.map(dest => this.renderCard(dest, arrivalDestId)).join('');

    // Off the Beaten Path Sektion
    html += `
      <div class="offbeat-section" id="offbeat-section">
        <button class="offbeat-toggle" onclick="MapModule.toggleOffbeat()">
          <span class="offbeat-toggle-icon" id="offbeat-icon">+</span>
          <span>Off the Beaten Path</span>
          <span class="offbeat-toggle-count">${offbeatDests.length} Geheimtipps</span>
        </button>
        <div class="offbeat-list" id="offbeat-list">
          <div class="offbeat-hint">Weniger bekannte Ziele abseits der typischen Touristenrouten. Klicke zum Anpinnen.</div>
          ${offbeatDests.map(dest => this.renderCard(dest, arrivalDestId)).join('')}
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Offbeat-Sektion offen halten wenn sie es vorher war, oder wenn Offbeat-Ziele gepinnt sind
    const hasOffbeatPinned = offbeatDests.some(d => App.state.pinnedCities.includes(d.id));
    if (this.offbeatOpen || hasOffbeatPinned) {
      this.toggleOffbeat(true);
    }

    Wiki.loadAllThumbnails();
  },

  sortDestinations(dests, arrivalDestId) {
    return [...dests].sort((a, b) => {
      if (a.id === arrivalDestId) return -1;
      if (b.id === arrivalDestId) return 1;
      const statusOrder = { pinned: 0, suggested: 1, neutral: 2 };
      const sa = statusOrder[this.getDestStatus(a.id)];
      const sb = statusOrder[this.getDestStatus(b.id)];
      if (sa !== sb) return sa - sb;
      return Preferences.getMatchScore(b) - Preferences.getMatchScore(a);
    });
  },

  renderCard(dest, arrivalDestId) {
    const status = this.getDestStatus(dest.id);
    const isPinned = status === 'pinned';
    const isSuggested = status === 'suggested';

    return `
      <div class="dest-card ${status}${dest.offbeat ? ' offbeat' : ''}" data-dest="${dest.id}"
           onclick="MapModule.togglePin('${dest.id}')"
           onmouseenter="MapModule.highlightDest('${dest.id}')"
           onmouseleave="MapModule.unhighlightDest('${dest.id}')">
        <img class="dest-card-img" data-wiki="${dest.id}" src="" alt="${dest.name}">
        <div class="dest-card-body">
          <div class="dest-card-name">${dest.name}</div>
          <div class="dest-card-desc">${dest.desc}</div>
          <div class="dest-card-highlights">${dest.highlights}</div>
          <div class="dest-card-tags">
            ${dest.tags.map(t => `<span class="tag tag-teal">${t}</span>`).join('')}
            ${dest.family ? '<span class="tag tag-gold">Familienfreundlich</span>' : ''}
            ${dest.offbeat ? '<span class="tag tag-terracotta">Geheimtipp</span>' : ''}
          </div>
          <div class="dest-card-pin">
            ${dest.id === arrivalDestId && isPinned ? '🛬 Ankunftsort – klicken zum Entfernen' :
              isPinned ? '📌 Angepinnt – klicken zum Entfernen' :
              isSuggested ? '✨ KI-Vorschlag – klicken zum Anpinnen' :
              '📍 Klicken zum Anpinnen'}
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Hebt einen Marker auf der Karte hervor (bei Card-Hover)
   */
  highlightDest(destId) {
    const marker = this.markers[destId];
    const dests = this.getActiveDestinations();
    const dest = dests.find(d => d.id === destId);
    if (!marker || !dest) return;

    // Vergrößerter, leuchtender Marker
    marker.setIcon(L.divIcon({
      className: 'custom-marker custom-marker-highlight',
      html: `<div style="
        width: 24px; height: 24px;
        background: #c4654a;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 0 4px rgba(196,101,74,0.35), 0 2px 8px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }));

    // Tooltip öffnen
    marker.openTooltip();

    // Marker in den Vordergrund
    marker.setZIndexOffset(1000);
  },

  /**
   * Setzt den Marker-Highlight zurück
   */
  unhighlightDest(destId) {
    const marker = this.markers[destId];
    const dests = this.getActiveDestinations();
    const dest = dests.find(d => d.id === destId);
    if (!marker || !dest) return;

    const status = this.getDestStatus(destId);
    marker.setIcon(this.createIcon(status, dest.offbeat));
    marker.closeTooltip();
    marker.setZIndexOffset(0);
  },

  /**
   * Klappt die Offbeat-Sektion auf/zu
   */
  toggleOffbeat(forceOpen) {
    const list = document.getElementById('offbeat-list');
    const gridIcon = document.getElementById('offbeat-icon');
    const topToggle = document.getElementById('offbeat-top-toggle');
    const topIcon = document.getElementById('offbeat-top-icon');
    if (!list) return;
    const isOpen = forceOpen === true || !list.classList.contains('open');
    list.classList.toggle('open', isOpen);
    if (gridIcon) gridIcon.textContent = isOpen ? '−' : '+';
    if (topToggle) topToggle.classList.toggle('active', isOpen);
    if (topIcon) topIcon.textContent = isOpen ? '✦' : '✦';
    this.offbeatOpen = isOpen;

    const offbeatDests = this.getOffbeatDestinations();
    if (isOpen) {
      // Alle Offbeat-Marker auf der Karte anzeigen
      offbeatDests.forEach(dest => this.addSingleMarker(dest));
      // Zur Offbeat-Sektion scrollen
      const section = document.getElementById('offbeat-section');
      if (section && forceOpen !== true) {
        setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    } else {
      // Nicht-gepinnte Offbeat-Marker wieder entfernen
      offbeatDests.forEach(dest => {
        if (!App.state.pinnedCities.includes(dest.id) && this.markers[dest.id]) {
          this.map.removeLayer(this.markers[dest.id]);
          delete this.markers[dest.id];
        }
      });
    }
  },

  /**
   * Zerstört die Karte (Cleanup)
   */
  destroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
      this.markers = {};
    }
  }
};
