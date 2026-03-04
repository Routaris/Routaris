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
    const city = airportStr.split(/\s/)[0].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const match = dests.find(d =>
      d.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(city) || d.id.includes(city)
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
      // Alte Marker entfernen (Länderwechsel)
      Object.values(this.markers).forEach(m => this.map.removeLayer(m));
      this.markers = {};
      this.map.setView(center, zoom);
      this.addMarkers();
      this.updateAll();
      this.map.invalidateSize();
      return;
    }

    this.map = L.map('mustsee-map', {
      scrollWheelZoom: true,
      zoomControl: true
    }).setView(center, zoom);

    this.tileLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 18,
        detectRetina: true
      }
    ).addTo(this.map);

    this.addMarkers();
  },

  /**
   * Erstellt einen Marker-Icon basierend auf Status
   */
  createIcon(status, isOffbeat) {
    const s = getComputedStyle(document.documentElement);
    const v = (name) => s.getPropertyValue(name).trim();
    const colors = {
      pinned:    { bg: v('--terracotta'),  border: v('--terracotta-dark') },
      suggested: { bg: v('--teal'),        border: v('--teal-dark') },
      neutral:   { bg: v('--ink-muted'),   border: '#6a6860' },
      offbeat:   { bg: v('--gold'),        border: '#a88d3a' }
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
   * Fügt Marker für alle Destinations hinzu (inkl. Offbeat)
   */
  addMarkers() {
    const dests = this.getActiveDestinations();
    dests.forEach(dest => this.addSingleMarker(dest));
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
    const idx = App.state.pinnedCities.indexOf(destId);
    if (idx > -1) {
      App.state.pinnedCities.splice(idx, 1);
    } else {
      App.state.pinnedCities.push(destId);
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

    const infoText = document.getElementById('mustsee-info-text');
    if (infoText) {
      const count = App.state.pinnedCities.length;
      if (count === 0) {
        infoText.textContent = 'Optional: Wähle Ziele, die unbedingt dabei sein sollen — oder lass die KI frei entscheiden.';
      } else {
        infoText.innerHTML = `📌 <strong>${count} Pflicht-Stopp${count > 1 ? 's' : ''}</strong> gewählt`;
      }
    }
  },

  /**
   * Rendert das Destination-Grid (Haupt + Offbeat-Sektion)
   */
  renderGrid() {
    const container = document.getElementById('dest-grid');
    if (!container) return;

    const arrivalDestId = this.getDestIdForAirport(App.state.airport);

    // Alle Ziele zusammen sortieren (Hauptziele zuerst, dann Offbeat)
    const allDests = this.sortDestinations(this.getActiveDestinations(), arrivalDestId);

    container.innerHTML = allDests.map(dest => this.renderCard(dest, arrivalDestId)).join('');

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
            ${App.state.group === 'family' && App.state.childAge
              ? Family.renderBadge(dest, App.state.childAge)
              : (dest.family ? '<span class="tag tag-gold">Familienfreundlich</span>' : '')}
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
        background: var(--terracotta);
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
   * Legacy no-op (offbeat is now always inline)
   */
  toggleOffbeat() {},

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
