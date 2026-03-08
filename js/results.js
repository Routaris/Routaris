/* ============================================
   RESULTS.JS – Step 5: Ergebnis-Rendering
   ============================================ */

const Results = {
  map: null,
  markers: [],
  activeStop: 0,
  stopThumbnails: {},

  /**
   * Normalisiert einen Leg-Mode-String auf die bekannten Werte: train|flight|bus|sleeper_bus|boat|motorbike
   * Behandelt Varianten die Gemini zurückgeben kann (ferry, fast_boat, shuttle, car, combined modes etc.)
   */
  normalizeLegMode(mode) {
    // Country-aware Default: Wenn das Land kein Zugnetz hat, fallback auf ersten legMode
    const defaultMode = (() => {
      const cc = typeof CountryConfig !== 'undefined' && CountryConfig.current;
      if (cc && cc.legModes && !cc.legModes.includes('train')) {
        return cc.legModes.split('|')[0]; // z.B. 'car' für Namibia
      }
      return 'train';
    })();
    if (!mode) return defaultMode;
    const m = mode.toLowerCase().trim();
    // Kombinierte Modi (z.B. "bus_then_boat") → ersten Teil nehmen
    if (m.includes('_then_') || m.includes(' then ')) {
      const first = m.split(/_?then_?| then /)[0].trim().replace(/^_+|_+$/g, '');
      return this.normalizeLegMode(first);
    }
    // Flight
    if (m.includes('flight') || m.includes('flug') || m.includes('plane') || m === 'air' || m === 'fly') return 'flight';
    // Boat / Ferry
    if (m.includes('boat') || m.includes('ferry') || m.includes('fähre') || m.includes('faehre') || m.includes('speedboat') || m.includes('schiff') || m.includes('fähre')) return 'boat';
    // Sleeper Bus (vor Bus prüfen!)
    if (m.includes('sleeper')) return 'sleeper_bus';
    // Car / Self-Drive (vor Bus prüfen, da 'minivan' sonst zu Bus geht)
    if (m.includes('car') || m.includes('drive') || m.includes('4x4') || m.includes('mietwagen') || m.includes('rental') || m.includes('self') || m.includes('camper')) return 'car';
    // Bus / Ground transport
    if (m.includes('bus') || m.includes('shuttle') || m.includes('minivan') || m.includes('van') || m.includes('taxi') || m.includes('driver') || m.includes('wagen') || m.includes('private')) return 'bus';
    // Motorbike
    if (m.includes('motorbike') || m.includes('motorcycle') || m.includes('scooter') || m.includes('roller') || m.includes('moto')) return 'motorbike';
    // Train
    if (m.includes('train') || m.includes('zug') || m.includes('rail') || m.includes('shinkansen') || m.includes('whoosh') || m.includes('hsr') || m.includes('express')) return 'train';
    return defaultMode;
  },

  /**
   * Fuzzy City-Name Matching
   */
  matchCity(a, b) {
    if (!a || !b) return false;
    const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[-''`]/g, ' ').replace(/\(.*?\)/g, '').replace(/\s+/g, ' ').trim();
    const na = normalize(a);
    const nb = normalize(b);
    if (na === nb) return true;
    const firstA = na.split(/[\s\/,]+/)[0];
    const firstB = nb.split(/[\s\/,]+/)[0];
    return firstA === firstB
        || na.includes(nb)
        || nb.includes(na);
  },

  /**
   * Findet das passende Leg zwischen zwei aufeinanderfolgenden Stops
   */
  findLeg(legs, fromCity, toCity) {
    if (!legs) return null;
    return legs.find(leg =>
      this.matchCity(leg.from, fromCity) && this.matchCity(leg.to, toCity)
    );
  },

  /**
   * Rendert die komplette Ergebnis-Ansicht
   */
  render(result, readOnly = false) {
    App.state.result = result;
    this.activeStop = -1;
    this._readOnly = readOnly;

    this.renderHeader(result);
    this.renderStopPills(result.stops, result.legs);
    this.renderOverview(result);

    // Stop detail + transport initially empty (overview shown)
    const detailEl = document.getElementById('stop-detail-container');
    if (detailEl) detailEl.innerHTML = '';
    const transportEl = document.getElementById('transport-container');
    if (transportEl) transportEl.innerHTML = '';

    this.renderBudget(result.budget);
    this.renderBookingLinks();
    this.renderTravelInfo(result.travelInfo);

    if (!readOnly) {
      this.renderSuggestions(result);
      this.renderAdjustField();
    } else {
      const sugEl = document.getElementById('suggestions-container');
      if (sugEl) sugEl.innerHTML = '';
      const adjEl = document.getElementById('route-adjust-container');
      if (adjEl) adjEl.innerHTML = '';
    }

    this.renderShareButtons(result);

    // In Shared-View: "Neue Route planen" Text anpassen
    if (readOnly) {
      const actions = document.querySelector('.result-actions');
      if (actions) {
        const restartBtn = actions.querySelector('[data-action="restart"]');
        if (restartBtn) restartBtn.textContent = 'Eigene Route planen';
        const printBtn = actions.querySelector('[onclick*="print"]');
        if (printBtn) printBtn.style.display = 'none';
      }
    }

    // Karte nach kurzer Verzögerung initialisieren (DOM muss fertig sein)
    setTimeout(() => this.initMap(result), 100);
  },

  /**
   * Rendert den Header mit Route-Info
   */
  renderHeader(result) {
    const container = document.getElementById('result-header');
    if (!container) return;

    const firstCity = result.stops[0]?.city || '';
    const lastCity = result.stops[result.stops.length - 1]?.city || '';
    const routeLabel = firstCity === lastCity
      ? `${firstCity} ↻ Rundreise`
      : `${firstCity} → ${lastCity}`;

    container.innerHTML = `
      <h2>${result.routeName}</h2>
      <p>${result.routeDescription}</p>
      <div class="result-route-label">${routeLabel}</div>
      <div class="result-stats">
        <div class="result-stat">
          <div class="result-stat-value">${result.totalNights}</div>
          <div class="result-stat-label">Nächte</div>
        </div>
        <div class="result-stat">
          <div class="result-stat-value">${result.stops.length}</div>
          <div class="result-stat-label">Stopps</div>
        </div>
        ${this.buildTransportStats(result.legs)}
      </div>
    `;
  },

  /**
   * Erzeugt die Transport-Statistik-Elemente für den Header
   */
  buildTransportStats(legs) {
    if (!legs) return '';
    const counts = {};
    // Kombinierte Modes (z.B. "bus_then_flight", "BUS_THEN_FLIGHT") in Einzelteile aufspalten
    legs.forEach(l => {
      const normalized = this.normalizeLegMode(l.mode);
      const mode = normalized === 'sleeper_bus' ? 'bus' : normalized;
      counts[mode] = (counts[mode] || 0) + 1;
    });
    const labels = {
      train: 'Zugfahrten',
      bus: 'Busfahrten',
      flight: 'Flüge',
      boat: 'Bootsfahrten',
      motorbike: 'Motorrad',
      car: 'Fahrten'
    };
    return Object.entries(counts).map(([mode, count]) => `
      <div class="result-stat">
        <div class="result-stat-value">${count}</div>
        <div class="result-stat-label">${labels[mode] || mode}</div>
      </div>
    `).join('');
  },

  /**
   * Berechnet einen Kontrollpunkt für eine quadratische Bezier-Kurve
   * Der Punkt liegt senkrecht zur Verbindungslinie, 15% der Distanz versetzt
   */
  _curveControlPoint(from, to, side = 1) {
    const midLat = (from[0] + to[0]) / 2;
    const midLng = (from[1] + to[1]) / 2;
    const dLat = to[0] - from[0];
    const dLng = to[1] - from[1];
    const dist = Math.sqrt(dLat * dLat + dLng * dLng);
    const offset = dist * 0.2;
    // side=1 → links, side=-1 → rechts (für gegenläufige Strecken)
    return [midLat + side * (dLng / dist) * offset, midLng - side * (dLat / dist) * offset];
  },

  /**
   * Berechnet den Punkt auf einer quadratischen Bezier-Kurve bei t
   */
  _bezierPoint(p0, cp, p1, t) {
    const mt = 1 - t;
    return [
      mt * mt * p0[0] + 2 * mt * t * cp[0] + t * t * p1[0],
      mt * mt * p0[1] + 2 * mt * t * cp[1] + t * t * p1[1]
    ];
  },

  /**
   * Erstellt einen Premium SVG-Tropfen-Marker
   * Erstellt einen Premium SVG-Tropfen-Marker
   */
  createPremiumMarker(number, color, isCombi, combiLabel) {
    if (isCombi) {
      // Pill-förmiger Kombi-Badge für Rundreise Start=Ende
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="36" viewBox="0 0 64 36">
        <defs>
          <filter id="ps" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        <rect x="2" y="2" width="60" height="32" rx="16" fill="${color}" stroke="white" stroke-width="2.5" filter="url(#ps)"/>
        <text x="32" y="22" text-anchor="middle" fill="white" font-family="'Instrument Sans',sans-serif" font-weight="700" font-size="13">${combiLabel}</text>
      </svg>`;
      return L.divIcon({
        className: 'premium-marker',
        html: svg,
        iconSize: [64, 36],
        iconAnchor: [32, 18]
      });
    }

    // Standard Teardrop-Pin
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48">
      <defs>
        <filter id="ms" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      <path d="M18 47C18 47 2 28 2 17C2 8.16 9.16 1 18 1C26.84 1 34 8.16 34 17C34 28 18 47 18 47Z"
            fill="${color}" stroke="white" stroke-width="2.5" filter="url(#ms)"/>
      <text x="18" y="22" text-anchor="middle" fill="white" font-family="'Instrument Sans',sans-serif" font-weight="700" font-size="14">${number}</text>
    </svg>`;
    return L.divIcon({
      className: 'premium-marker',
      html: svg,
      iconSize: [36, 48],
      iconAnchor: [18, 48]
    });
  },

  /**
   * Erstellt einen runden Thumbnail-Marker mit Nummer-Badge
   */
  _createThumbnailIcon(number, color, thumbUrl, size) {
    const badge = Math.max(18, Math.round(size * 0.36));
    const fs = Math.round(badge * 0.58);
    return L.divIcon({
      className: 'premium-marker premium-thumb',
      html: `<div class="thumb-marker" style="width:${size}px;height:${size}px;">
        <img src="${thumbUrl}" class="thumb-marker-img" style="width:${size}px;height:${size}px;">
        <div class="thumb-marker-badge" style="background:${color};width:${badge}px;height:${badge}px;font-size:${fs}px;">${number}</div>
      </div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  },

  /**
   * Erstellt einen runden Thumbnail-Marker für Rundreise (Kombi)
   */
  _createThumbnailCombiIcon(thumbUrl, size, label, color) {
    const bh = Math.max(18, Math.round(size * 0.32));
    return L.divIcon({
      className: 'premium-marker premium-thumb',
      html: `<div class="thumb-marker" style="width:${size}px;height:${size}px;">
        <img src="${thumbUrl}" class="thumb-marker-img" style="width:${size}px;height:${size}px;">
        <div class="thumb-marker-combi" style="background:${color};height:${bh}px;font-size:${Math.round(bh * 0.56)}px;">${label}</div>
      </div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  },

  /**
   * Lädt Wiki-Thumbnails für alle Stops (für Zoom-Bilder)
   */
  async _loadStopThumbnails(result) {
    this.stopThumbnails = {};
    const strip = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const dests = typeof CountryConfig !== 'undefined' ? CountryConfig.getDestinations() : [];

    const load = async (stop, i) => {
      let wiki = stop.wiki;
      if (!wiki) {
        const cn = strip(stop.city);
        const d = dests.find(d => {
          const n = strip(d.name.split('/')[0].trim());
          return cn.includes(n) || n.includes(cn) || (d.altName && cn.includes(strip(d.altName)));
        });
        wiki = d ? d.wiki : stop.city;
      }
      try {
        const url = await Wiki.getThumbnail(wiki);
        if (url) this.stopThumbnails[i] = url;
      } catch (e) { /* kein Thumbnail */ }
    };

    await Promise.allSettled(result.stops.map((s, i) => load(s, i)));
    this._updateMarkersForZoom();
  },

  /**
   * Aktualisiert Marker-Icons + Labels abhängig vom Zoom-Level
   * Zoom < 7: Teardrop-Pin mit Nummer + permanentes City-Label
   * Zoom ≥ 7: Rundes Thumbnail (falls verfügbar) + City-Label
   */
  _updateMarkersForZoom() {
    if (!this.map || !App.state.result) return;
    const zoom = this.map.getZoom();
    const result = App.state.result;
    const useThumb = zoom >= 5;
    const thumbSize = useThumb ? Math.min(68, 36 + (zoom - 5) * 5) : 0;

    const cs = getComputedStyle(document.documentElement);
    const cv = n => cs.getPropertyValue(n).trim();
    const C = { terracotta: cv('--terracotta'), teal: cv('--teal'), ink: cv('--ink') };

    const lastIdx = result.stops.length - 1;
    const sameStartEnd = lastIdx > 0 &&
      result.stops[0].city === result.stops[lastIdx].city &&
      Math.abs(result.stops[0].lat - result.stops[lastIdx].lat) < 0.1 &&
      Math.abs(result.stops[0].lng - result.stops[lastIdx].lng) < 0.1;

    result.stops.forEach((stop, i) => {
      const marker = this.markers[i];
      if (!marker) return;
      // Hidden click-marker für Rundreise-Ende
      if (sameStartEnd && i === lastIdx) return;

      const isFirst = i === 0;
      const isLast = i === lastIdx && !sameStartEnd;
      const isCombi = sameStartEnd && isFirst;
      const color = isCombi ? C.terracotta : isFirst ? C.teal : isLast ? C.ink : C.terracotta;
      const thumb = this.stopThumbnails[i];

      if (isCombi) {
        const combiLabel = `1 ↔ ${lastIdx + 1}`;
        if (useThumb && thumb) {
          marker.setIcon(this._createThumbnailCombiIcon(thumb, thumbSize, combiLabel, color));
        } else {
          marker.setIcon(this.createPremiumMarker(null, color, true, combiLabel));
        }
        marker.unbindTooltip();
        marker.bindTooltip(stop.city, {
          permanent: true, direction: 'bottom',
          offset: [0, useThumb && thumb ? thumbSize / 2 + 6 : 6],
          className: 'map-stop-label'
        });
      } else {
        if (useThumb && thumb) {
          marker.setIcon(this._createThumbnailIcon(i + 1, color, thumb, thumbSize));
        } else {
          marker.setIcon(this.createPremiumMarker(i + 1, color, false));
        }
        marker.unbindTooltip();
        marker.bindTooltip(stop.city, {
          permanent: true, direction: 'bottom',
          offset: [0, useThumb && thumb ? thumbSize / 2 + 6 : 4],
          className: 'map-stop-label'
        });
      }
    });
  },

  /**
   * Initialisiert die Ergebnis-Karte
   */
  initMap(result) {
    const mapEl = document.getElementById('result-map');
    if (!mapEl) return;

    // Alte Karte aufräumen
    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    const cc = CountryConfig.current;
    const mapCenter = cc ? cc.mapCenter : [33, 108];
    const mapZoom = cc ? cc.mapZoom : 4;

    this.map = L.map('result-map', {
      scrollWheelZoom: true,
      zoomControl: true
    }).setView(mapCenter, mapZoom);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OSM &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 18,
      detectRetina: true
    }).addTo(this.map);

    this.markers = [];
    const latlngs = [];

    // CSS-Variablen für Kartenfarben auslesen
    const cs = getComputedStyle(document.documentElement);
    const cv = (n) => cs.getPropertyValue(n).trim();
    const C = {
      terracotta: cv('--terracotta'),
      teal: cv('--teal'),
      ink: cv('--ink'),
      inkMuted: cv('--ink-muted'),
      gold: cv('--car')
    };

    // Prüfen ob erster und letzter Stopp dieselbe Stadt sind
    const lastIdx = result.stops.length - 1;
    const firstStop = result.stops[0];
    const lastStop = result.stops[lastIdx];
    const sameStartEnd = lastIdx > 0 &&
      firstStop.city === lastStop.city &&
      Math.abs(firstStop.lat - lastStop.lat) < 0.1 &&
      Math.abs(firstStop.lng - lastStop.lng) < 0.1;

    // Nummerierte Premium-Marker mit permanenten City-Labels
    result.stops.forEach((stop, i) => {
      // Bei gleichem Start/Ende: kombinierten Marker für die erste Position
      if (sameStartEnd && i === lastIdx) {
        const combiIcon = this.createPremiumMarker(null, C.terracotta, true, `1 ↔ ${lastIdx + 1}`);
        if (this.markers[0]) {
          this.markers[0].setIcon(combiIcon);
          this.markers[0].unbindTooltip();
          this.markers[0].bindTooltip(firstStop.city, {
            permanent: true, direction: 'bottom', offset: [0, 6],
            className: 'map-stop-label'
          });
        }
        const clickMarker = L.marker([stop.lat, stop.lng], {
          icon: L.divIcon({ className: 'premium-marker', html: '', iconSize: [0, 0] }),
          opacity: 0
        }).addTo(this.map);
        clickMarker.on('click', () => this.selectStop(i));
        this.markers.push(clickMarker);
        latlngs.push([stop.lat, stop.lng]);
        return;
      }

      const isFirst = i === 0;
      const isLast = i === lastIdx && !sameStartEnd;
      const color = isFirst ? C.teal : isLast ? C.ink : C.terracotta;

      const marker = L.marker([stop.lat, stop.lng], {
        icon: this.createPremiumMarker(i + 1, color, false)
      }).addTo(this.map);

      // Permanentes City-Name-Label
      marker.bindTooltip(stop.city, {
        permanent: true, direction: 'bottom', offset: [0, 4],
        className: 'map-stop-label'
      });

      marker.on('click', () => this.selectStop(i));
      this.markers.push(marker);
      latlngs.push([stop.lat, stop.lng]);
    });

    // Verbindungslinien (Bezier-Kurven) + Transport-Badges auf der Karte
    const drawnPairs = new Set();
    const useCurve = typeof L.curve === 'function';

    // Hilfsfunktion: Bezier-Kurve oder Fallback-Polyline zeichnen
    const drawCurve = (fromLL, toLL, opts, side = 1) => {
      if (useCurve) {
        const cp = this._curveControlPoint(fromLL, toLL, side);
        return L.curve(['M', fromLL, 'Q', cp, toLL], opts).addTo(this.map);
      }
      return L.polyline([fromLL, toLL], opts).addTo(this.map);
    };

    // Hilfsfunktion: Transport-Badge am Mittelpunkt der Bezier-Kurve platzieren
    const addLegBadge = (fromStop, toStop, leg, side = 1) => {
      const from = [fromStop.lat, fromStop.lng];
      const to = [toStop.lat, toStop.lng];
      let badgePos;
      if (useCurve) {
        const cp = this._curveControlPoint(from, to, side);
        badgePos = this._bezierPoint(from, cp, to, 0.5);
      } else {
        badgePos = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2];
      }
      const badgeIcons = { train: '🚄', flight: '✈️', bus: '🚌', sleeper_bus: '🚌', boat: '⛴️', motorbike: '🏍️', car: '🚙' };
      const mode = Results.normalizeLegMode(leg.mode);
      const icon = badgeIcons[mode] || '🚄';
      L.marker(badgePos, {
        icon: L.divIcon({
          className: 'map-leg-badge',
          html: `<div class="map-leg-badge-inner map-leg-badge-${mode}">${icon} ${leg.duration}</div>`,
          iconSize: [80, 24],
          iconAnchor: [40, 12]
        }),
        interactive: false,
        zIndexOffset: -100
      }).addTo(this.map);
    };

    if (result.legs) {
      result.legs.forEach(leg => {
        const fromStop = result.stops.find(s => this.matchCity(s.city, leg.from));
        const toStop = result.stops.find(s => this.matchCity(s.city, leg.to));
        if (!fromStop || !toStop) return;

        const pairKey = `${fromStop.lat},${fromStop.lng}-${toStop.lat},${toStop.lng}`;
        const reverseKey = `${toStop.lat},${toStop.lng}-${fromStop.lat},${fromStop.lng}`;
        // Gegenläufige Strecke? → andere Seite biegen
        const side = drawnPairs.has(reverseKey) ? -1 : 1;
        drawnPairs.add(pairKey);

        const legMode = Results.normalizeLegMode(leg.mode);
        const isFlightLeg = legMode === 'flight';
        const isBusLeg = legMode === 'bus' || legMode === 'sleeper_bus';
        const isBoatLeg = legMode === 'boat';
        const isCarLeg = legMode === 'car';

        drawCurve(
          [fromStop.lat, fromStop.lng],
          [toStop.lat, toStop.lng],
          {
            color: isFlightLeg ? C.terracotta : isCarLeg ? C.gold : (isBusLeg || isBoatLeg) ? C.teal : C.terracotta,
            weight: 3,
            opacity: isFlightLeg ? 0.5 : 0.6,
            dashArray: isFlightLeg ? '8, 8' : isBusLeg ? '5, 5' : isBoatLeg ? '4, 6' : isCarLeg ? null : null,
            fill: false
          },
          side
        );

        // Transport-Badge am Kurven-Mittelpunkt
        addLegBadge(fromStop, toStop, leg, side);
      });
    }

    // Fallback: gestrichelte graue Kurve für Paare ohne Leg
    for (let i = 0; i < result.stops.length - 1; i++) {
      const a = result.stops[i];
      const b = result.stops[i + 1];
      const pairKey = `${a.lat},${a.lng}-${b.lat},${b.lng}`;
      if (!drawnPairs.has(pairKey)) {
        drawCurve(
          [a.lat, a.lng],
          [b.lat, b.lng],
          { color: C.inkMuted, weight: 1.5, opacity: 0.4, dashArray: '6, 6', fill: false }
        );
      }
    }

    // Karte auf Route fitten – "Zoom to Layer" (maximal nah ran)
    if (latlngs.length > 1) {
      this.map.fitBounds(L.latLngBounds(latlngs), {
        padding: [30, 30],
        maxZoom: 14
      });
    } else if (latlngs.length === 1) {
      this.map.setView(latlngs[0], 10);
    }

    // Zoom-abhängige Marker: Thumbnails bei höherem Zoom laden
    this.map.on('zoomend', () => this._updateMarkersForZoom());
    this._loadStopThumbnails(result);
  },

  /**
   * Rendert die Stopp-Pills als Timeline mit Transport-Connectors
   */
  renderStopPills(stops, legs) {
    const container = document.getElementById('stop-pills');
    if (!container) return;

    const lastI = stops.length - 1;

    // Prüfe ob Start == Ende (Rundreise)
    const isRoundTrip = lastI > 0 && this.matchCity(stops[0].city, stops[lastI].city);

    let html = `
      <button class="stop-pill-tl stop-pill-overview active" onclick="Results.showOverview()">
        <span class="stop-pill-tl-dot dot-overview"></span>
        <span class="stop-pill-tl-city">Übersicht</span>
      </button>
      <div class="stop-connector">
        <span class="stop-connector-line"></span>
      </div>
    `;

    stops.forEach((stop, i) => {
      const isFirst = i === 0;
      const isLast = i === lastI;
      const dotClass = isFirst ? 'dot-start' : isLast ? 'dot-end' : '';
      const isActive = i === this.activeStop;
      const returnIcon = (isLast && isRoundTrip) ? ' ✈' : '';

      html += `
        <button class="stop-pill-tl${isActive ? ' active' : ''}" data-stop="${i}" onclick="Results.selectStop(${i})">
          <span class="stop-pill-tl-dot ${dotClass}"></span>
          <span class="stop-pill-tl-city">${stop.city}${returnIcon}</span>
          <span class="stop-pill-tl-nights">${stop.nights}N</span>
        </button>`;

      // Transport-Connector
      if (i < lastI) {
        const leg = this.findLeg(legs, stop.city, stops[i + 1].city);
        if (leg) {
          const connectorIcons = { train: '🚄', flight: '✈️', bus: '🚌', sleeper_bus: '🚌', boat: '⛴️', motorbike: '🏍️', car: '🚙' };
          const mode = this.normalizeLegMode(leg.mode);
          const icon = connectorIcons[mode] || '🚄';
          html += `<div class="stop-connector stop-connector-${mode}">
            <span class="stop-connector-line"></span>
            <span class="stop-connector-label">${icon} ${leg.duration}</span>
            <span class="stop-connector-line"></span>
          </div>`;
        } else {
          html += `<div class="stop-connector stop-connector-transfer">
            <span class="stop-connector-line"></span>
            <span class="stop-connector-label">→ Transfer</span>
            <span class="stop-connector-line"></span>
          </div>`;
        }
      }
    });

    container.innerHTML = html;

    // Scroll-Indikatoren für lange Timelines
    this.initPillsScroll(container);
  },

  /**
   * Initialisiert Scroll-Fade-Indikatoren für Stop-Pills
   */
  initPillsScroll(pills) {
    const wrap = pills.parentElement;
    if (!wrap || !wrap.classList.contains('stop-pills-wrap')) return;

    const update = () => {
      const canScrollLeft = pills.scrollLeft > 8;
      const canScrollRight = pills.scrollLeft < pills.scrollWidth - pills.clientWidth - 8;
      wrap.classList.toggle('scroll-left', canScrollLeft);
      wrap.classList.toggle('scroll-right', canScrollRight);
    };

    pills.addEventListener('scroll', update, { passive: true });
    // Initial check nach Render
    requestAnimationFrame(update);
  },

  /**
   * Wählt einen Stopp aus
   */
  selectStop(index) {
    const result = App.state.result;
    if (!result) return;

    this.activeStop = index;

    // Hide overview
    const overview = document.getElementById('route-overview');
    if (overview) overview.style.display = 'none';

    // Pill aktiv setzen (+1 weil Overview-Pill an Index 0)
    document.querySelectorAll('.stop-pill-tl').forEach((pill, i) => {
      pill.classList.toggle('active', i === index + 1);
    });

    // Detail rendern
    this.renderStopDetail(result.stops[index], index);

    // Transportverbindungen für diesen Stop aktualisieren
    this.renderTransport(result.legs, index);

    // Karte zum Stopp fliegen
    const stop = result.stops[index];
    if (this.map && stop) {
      this.map.flyTo([stop.lat, stop.lng], 8, { duration: 0.6 });
    }

    // Zum Detail scrollen
    const detail = document.getElementById('stop-detail-container');
    if (detail) {
      detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  /**
   * Rendert die Routenübersicht mit allen Stopps und Transportverbindungen
   */
  renderOverview(result) {
    const container = document.getElementById('route-overview');
    if (!container) return;

    container.style.display = '';
    const cc = CountryConfig.current;
    const brandEmoji = cc ? cc.brandEmoji : '🧭';

    let html = `
      <div class="overview-intro">
        <h3>${brandEmoji} Deine Reise auf einen Blick</h3>
      </div>
      <div class="overview-journey">
    `;

    result.stops.forEach((stop, i) => {
      let startDay = 1;
      for (let j = 0; j < i; j++) startDay += result.stops[j].nights;

      const isFirst = i === 0;
      const isLast = i === result.stops.length - 1;
      const topHighlights = (stop.highlights || []).slice(0, 3);

      html += `
        <div class="overview-stop${isFirst ? ' overview-stop-first' : ''}${isLast ? ' overview-stop-last' : ''}" onclick="Results.selectStop(${i})">
          <div class="overview-stop-marker">
            <svg width="28" height="36" viewBox="0 0 36 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 47C18 47 34 28 34 18C34 8 27 1 18 1C9 1 2 8 2 18C2 28 18 47 18 47Z" fill="currentColor" stroke="white" stroke-width="2.5"/>
              <text x="18" y="22" text-anchor="middle" fill="white" font-family="'Instrument Sans',sans-serif" font-weight="700" font-size="14">${i + 1}</text>
            </svg>
          </div>
          <div class="overview-stop-body">
            <div class="overview-stop-city">${stop.city}</div>
            <div class="overview-stop-meta">🌙 ${stop.nights} ${stop.nights === 1 ? 'Nacht' : 'Nächte'} · Tag ${startDay}–${startDay + stop.nights - 1}</div>
            ${stop.tagline ? `<p class="overview-stop-tagline">${stop.tagline}</p>` : ''}
            ${topHighlights.length ? `
              <div class="overview-stop-highlights">
                ${topHighlights.map(h => `<span>${h.icon || '📍'} ${h.title}</span>`).join('')}
              </div>
            ` : ''}
          </div>
          <div class="overview-stop-arrow">→</div>
        </div>
      `;

      // Transport-Leg nach diesem Stop
      if (i < result.stops.length - 1) {
        const leg = this.findLeg(result.legs, stop.city, result.stops[i + 1].city);
        if (leg) {
          const modeIcons = { train: '🚄', flight: '✈️', bus: '🚌', sleeper_bus: '🚌', boat: '⛴️', motorbike: '🏍️', car: '🚙' };
          const modeLabels = { train: 'Zug', flight: 'Flug', bus: 'Bus', sleeper_bus: 'Schlafbus', boat: 'Boot', motorbike: 'Motorrad', car: 'Auto' };
          const mode = this.normalizeLegMode(leg.mode);
          const icon = modeIcons[mode] || '🚄';
          const label = modeLabels[mode] || 'Zug';
          html += `
            <div class="overview-leg overview-leg-${mode}">
              <div class="overview-leg-badge">${icon} ${label} · ${leg.duration} · ${leg.cost}</div>
            </div>
          `;
        } else {
          html += `
            <div class="overview-leg">
              <div class="overview-leg-badge overview-leg-badge-neutral">➜ Transfer</div>
            </div>
          `;
        }
      }
    });

    html += '</div>';
    container.innerHTML = html;
  },

  /**
   * Zeigt die Routenübersicht (zurück aus der Detail-Ansicht)
   */
  showOverview() {
    const overview = document.getElementById('route-overview');
    if (overview) overview.style.display = '';

    const detail = document.getElementById('stop-detail-container');
    if (detail) detail.innerHTML = '';

    const transport = document.getElementById('transport-container');
    if (transport) transport.innerHTML = '';

    // Übersicht-Pill aktivieren, Stopps deaktivieren
    document.querySelectorAll('.stop-pill-tl').forEach(p => p.classList.remove('active'));
    const overviewPill = document.querySelector('.stop-pill-overview');
    if (overviewPill) overviewPill.classList.add('active');

    this.activeStop = -1;

    // Karte auf gesamte Route zurücksetzen
    const result = App.state.result;
    if (this.map && result && result.stops.length > 1) {
      const latlngs = result.stops.map(s => [s.lat, s.lng]);
      this.map.fitBounds(L.latLngBounds(latlngs), {
        padding: [30, 30],
        maxZoom: 14
      });
    }

    // Zur Übersicht scrollen
    if (overview) {
      overview.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  /**
   * Rendert die Detail-Ansicht eines Stopps
   */
  renderStopDetail(stop, index) {
    const container = document.getElementById('stop-detail-container');
    if (!container || !stop) return;

    // Berechne Startdag
    const result = App.state.result;
    let startDay = 1;
    for (let i = 0; i < index; i++) {
      startDay += result.stops[i].nights;
    }

    container.innerHTML = `
      <div class="stop-detail active">
        <!-- Hero-Bild -->
        <div class="stop-hero" id="stop-hero-${index}">
          <img class="stop-hero-img" alt="${stop.city}" onerror="this.parentElement.classList.add('no-image')">
          <div class="stop-hero-overlay">
            <span class="stop-hero-label">${stop.city}</span>
          </div>
          <span class="stop-hero-credit">© Wikimedia Commons</span>
        </div>

        <!-- Header -->
        <div class="stop-detail-header">
          <div class="stop-detail-number">${index + 1}</div>
          <div class="stop-detail-info">
            <h3>${stop.city}</h3>
            <div class="stop-detail-tagline">${stop.tagline || ''}</div>
            <div class="stop-detail-nights">🌙 ${stop.nights} ${stop.nights === 1 ? 'Nacht' : 'Nächte'} (Tag ${startDay}–${startDay + stop.nights - 1})</div>
          </div>
        </div>

        <!-- Highlights -->
        <h4 style="margin-bottom: var(--space-md);">Highlights</h4>
        <div class="highlights-grid">
          ${(stop.highlights || []).map((h, i) => `
            <div class="highlight-card" id="highlight-card-${index}-${i}">
              <img class="highlight-card-img" id="highlight-img-${index}-${i}" alt="${h.title}" title="Bild: Wikimedia Commons" onerror="this.style.display='none'">
              <div class="highlight-icon">${h.icon || '📍'}</div>
              <div class="highlight-title">${h.title}</div>
              <div class="highlight-desc">${h.description}</div>
            </div>
          `).join('')}
        </div>

        <!-- Tagesplan -->
        <div class="daily-plan">
          <h4>Tagesplan</h4>
          ${(stop.dailyPlan || []).map(day => `
            <div class="day-item">
              <div class="day-num">Tag ${startDay + day.day - 1}</div>
              <div class="day-content">
                <h5>${day.title}</h5>
                <p>${day.activities}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Tipps -->
        ${(stop.tips && stop.tips.length > 0) ? `
          <div class="tips-section">
            <h4>Praktische Tipps</h4>
            <div class="tips-grid">
              ${stop.tips.map(tip => `
                <div class="tip-card">
                  <div class="tip-icon">${tip.icon || '💡'}</div>
                  <div class="tip-text">${tip.text}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Familien-Check Panel -->
        ${(() => {
          if (App.state.group !== 'family' || !App.state.childAge) return '';
          const dest = Family.findDestByCity(stop.city);
          return Family.renderDetailPanel(dest, App.state.childAge);
        })()}

        <!-- Stopp-Navigation -->
        ${(() => {
          const total = result.stops.length;
          const prevStop = index > 0 ? result.stops[index - 1] : null;
          const nextStop = index < total - 1 ? result.stops[index + 1] : null;
          return `
            <div class="stop-nav">
              ${prevStop ? `<button class="stop-nav-btn stop-nav-prev" onclick="Results.selectStop(${index - 1})">
                <span class="stop-nav-dir">← Vorheriger Stopp</span>
                <span class="stop-nav-city">${prevStop.city}</span>
              </button>` : '<div></div>'}
              <button class="stop-nav-btn stop-nav-overview" onclick="Results.showOverview()">
                <span class="stop-nav-dir">Übersicht</span>
              </button>
              ${nextStop ? `<button class="stop-nav-btn stop-nav-next" onclick="Results.selectStop(${index + 1})">
                <span class="stop-nav-dir">Nächster Stopp →</span>
                <span class="stop-nav-city">${nextStop.city}</span>
              </button>` : '<div></div>'}
            </div>
          `;
        })()}
      </div>
    `;

    // Bilder asynchron laden
    this.loadStopImages(stop, index);
  },

  /**
   * Lädt Hero-Bild und Highlight-Bilder asynchron
   */
  async loadStopImages(stop, index) {
    // Hero-Bild: wiki-Feld vom Stopp nutzen, dann Destinations-Match, dann Stadtname
    let wikiTitle = stop.wiki;
    if (!wikiTitle) {
      const stripAccents = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      const dests = CountryConfig.getDestinations();
      const cityNorm = stripAccents(stop.city);
      const dest = dests.find(d => {
        const nameNorm = stripAccents(d.name.split('/')[0].trim());
        return cityNorm.includes(nameNorm) ||
          nameNorm.includes(cityNorm) ||
          (d.altName && cityNorm.includes(stripAccents(d.altName)));
      });
      wikiTitle = dest ? dest.wiki : stop.city;
    }

    const heroContainer = document.getElementById(`stop-hero-${index}`);
    const heroUrl = await Wiki.getHeroImage(wikiTitle);
    if (heroUrl && heroContainer) {
      const img = heroContainer.querySelector('.stop-hero-img');
      if (img) {
        img.src = heroUrl;
        heroContainer.classList.add('loaded');
      }
    } else if (heroContainer) {
      // Fallback: Farbverlauf mit Stadtname
      heroContainer.classList.add('no-image');
    }

    // Highlight-Bilder – sequentiell laden um Duplikate pro Stop zu vermeiden
    if (stop.highlights) {
      const usedUrls = new Set();
      for (let i = 0; i < stop.highlights.length; i++) {
        const h = stop.highlights[i];
        const url = await Wiki.getHighlightImage(h.wiki, h.title, stop.city, usedUrls);
        const imgEl = document.getElementById(`highlight-img-${index}-${i}`);
        if (url && imgEl && !usedUrls.has(url)) {
          usedUrls.add(url);
          imgEl.src = url;
          const card = document.getElementById(`highlight-card-${index}-${i}`);
          if (card) card.classList.add('has-image');
        }
      }
    }
  },

  /**
   * Rendert die Transport-Übersicht – nur Legs die den aktiven Stop betreffen
   */
  renderTransport(legs, stopIndex) {
    const container = document.getElementById('transport-container');
    if (!container || !legs) return;

    const result = App.state.result;
    if (!result || !result.stops) return;

    const currentStop = result.stops[stopIndex !== undefined ? stopIndex : this.activeStop];
    if (!currentStop) return;

    // Nur Legs filtern die von oder zum aktiven Stop gehen
    const relevantLegs = legs.filter(leg =>
      this.matchCity(leg.from, currentStop.city) || this.matchCity(leg.to, currentStop.city)
    );

    if (relevantLegs.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <div class="transport-section">
        <h4>Transportverbindungen</h4>
        <div class="transport-legs">
          ${relevantLegs.map(leg => {
            const modeLabels = {
              train: { icon: '🚄', label: 'Zug' },
              flight: { icon: '✈️', label: 'Flug' },
              bus: { icon: '🚌', label: 'Bus' },
              sleeper_bus: { icon: '🚌', label: 'Schlafbus' },
              boat: { icon: '⛴️', label: 'Boot' },
              motorbike: { icon: '🏍️', label: 'Motorrad' },
              car: { icon: '🚙', label: 'Auto' }
            };
            const mode = this.normalizeLegMode(leg.mode);
            const m = modeLabels[mode] || modeLabels.train;
            return `
            <div class="transport-leg">
              <span class="leg-badge ${mode}">
                ${m.icon} ${m.label}
              </span>
              <div class="transport-cities">
                ${leg.from} <span>→</span> ${leg.to}
              </div>
              <div class="transport-meta">
                <span>⏱ ${leg.duration}</span>
                <span>💰 ${leg.cost}</span>
              </div>
              ${this.renderTransportBookingLink(mode)}
            </div>`;
          }).join('')}
        </div>
      </div>
    `;
  },

  /**
   * Rendert einen Booking-Link für ein Transport-Leg
   */
  renderTransportBookingLink(mode) {
    const cc = typeof CountryConfig !== 'undefined' && CountryConfig.current;
    if (!cc || !cc.bookingLinks || !cc.bookingLinks.transport) return '';

    // Fallback: sleeper_bus → bus
    let link = cc.bookingLinks.transport[mode];
    if (!link && mode === 'sleeper_bus') link = cc.bookingLinks.transport['bus'];
    if (!link) return '';

    return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="transport-booking-link">${link.icon} Tickets suchen auf ${link.name} →</a>`;
  },

  /**
   * Rendert die Buchungsseiten-Sektion
   */
  renderBookingLinks() {
    const container = document.getElementById('booking-links-container');
    if (!container) return;

    const cc = typeof CountryConfig !== 'undefined' && CountryConfig.current;
    if (!cc || !cc.bookingLinks || !cc.bookingLinks.general || !cc.bookingLinks.general.length) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <div class="booking-links-section">
        <h4>Nützliche Buchungsseiten</h4>
        <p class="booking-links-subtitle">Empfohlene Plattformen für ${cc.name}</p>
        <div class="booking-links-grid">
          ${cc.bookingLinks.general.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="booking-link-card">
              <span class="booking-link-icon">${link.icon}</span>
              <div class="booking-link-info">
                <span class="booking-link-name">${link.name}</span>
                <span class="booking-link-label">${link.label}</span>
              </div>
              <span class="booking-link-arrow">→</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  },

  /**
   * Rendert die Budget-Schätzung
   */
  renderBudget(budget) {
    const container = document.getElementById('budget-container');
    if (!container || !budget) return;

    container.innerHTML = `
      <div class="budget-section">
        <h4>Geschätzte Kosten pro Person</h4>
        <div class="budget-grid">
          <div class="budget-item">
            <div class="budget-icon">🏨</div>
            <div class="budget-label">Unterkunft</div>
            <div class="budget-value">${budget.accommodation}</div>
          </div>
          <div class="budget-item">
            <div class="budget-icon">🍜</div>
            <div class="budget-label">Essen</div>
            <div class="budget-value">${budget.food}</div>
          </div>
          <div class="budget-item">
            <div class="budget-icon">🚄</div>
            <div class="budget-label">Transport</div>
            <div class="budget-value">${budget.transport}</div>
          </div>
          <div class="budget-item">
            <div class="budget-icon">🎫</div>
            <div class="budget-label">Aktivitäten</div>
            <div class="budget-value">${budget.activities}</div>
          </div>
        </div>
        <div class="budget-total">
          <span>Geschätzt gesamt:</span>
          <strong>${budget.total}</strong>
        </div>
        <div class="budget-hint">Ohne internationale Flüge. Preise sind Richtwerte und können variieren.</div>
      </div>
    `;
  },

  /**
   * Rendert allgemeine Reise-Infos
   */
  renderTravelInfo(travelInfo) {
    const container = document.getElementById('travelinfo-container');
    if (!container || !travelInfo || !travelInfo.length) return;

    container.innerHTML = `
      <div class="travelinfo-section">
        <h4>Gut zu wissen</h4>
        <div class="travelinfo-grid">
          ${travelInfo.map(info => `
            <div class="travelinfo-card">
              <div class="travelinfo-icon">${info.icon || '💡'}</div>
              <div class="travelinfo-content">
                <div class="travelinfo-title">${info.title}</div>
                <div class="travelinfo-text">${info.text}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  /**
   * Rendert die Routenvorschläge
   */
  renderSuggestions(result) {
    const container = document.getElementById('suggestions-container');
    if (!container) return;

    const suggestions = Suggestions.generate(result, App.state);
    if (!suggestions || suggestions.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <div class="suggestions-section">
        <div class="suggestions-header">
          <h4><span class="suggestions-icon">&#x2728;</span> Noch mehr entdecken?</h4>
          <p>Diese Ziele passen zu deiner Route – füge sie hinzu, wenn du magst</p>
        </div>
        <div class="suggestions-list">
          ${suggestions.map((s, i) => `
            <div class="suggestion-card" data-suggestion-index="${i}">
              <div class="suggestion-img-wrap">
                <img class="suggestion-img" id="suggestion-img-${i}" alt="${s.dest.name}" title="Bild: Wikimedia Commons"
                     onerror="this.style.display='none'; this.parentElement.classList.remove('loaded'); this.parentElement.classList.add('no-image')">
              </div>
              <div class="suggestion-body">
                <div class="suggestion-name">${s.dest.name}</div>
                <div class="suggestion-reason">${s.reason}</div>
                <div class="suggestion-highlights">${s.dest.highlights}</div>
                <div class="suggestion-footer">
                  <span class="suggestion-nights">empf. ${s.extraNights} ${s.extraNights === 1 ? 'Nacht' : 'Nächte'}</span>
                  <button class="btn suggestion-accept-btn" onclick="Suggestions.accept(${i})">
                    Zur Route hinzufügen
                  </button>
                  <button class="suggestion-dismiss" onclick="Suggestions.dismiss(${i})" title="Ausblenden">
                    &times;
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Bilder asynchron laden (parallel, aber sicher)
    Promise.allSettled(suggestions.map(async (s, i) => {
      const url = await Wiki.getThumbnail(s.dest.wiki);
      const imgEl = document.getElementById(`suggestion-img-${i}`);
      if (url && imgEl) {
        imgEl.src = url;
        imgEl.parentElement.classList.add('loaded');
      } else if (imgEl) {
        imgEl.parentElement.classList.add('no-image');
      }
    }));
  },

  /**
   * Rendert das Freitext-Feld für Route-Anpassungen
   */
  renderAdjustField() {
    const container = document.getElementById('route-adjust-container');
    if (!container) return;

    // Dynamischen Placeholder aus aktueller Route bauen
    const result = App.state.result;
    let placeholder = 'z.B. Einen Strandtag einbauen, mehr Natur, weniger Großstadt...';
    if (result && result.stops && result.stops.length >= 2) {
      const city1 = result.stops[0].city;
      const city2 = result.stops.length > 2 ? result.stops[1].city : result.stops[result.stops.length - 1].city;
      placeholder = `z.B. Mehr Zeit in ${city1}, weniger in ${city2}, einen Strandtag einbauen...`;
    }

    container.innerHTML = `
      <div class="route-adjust-section">
        <h4>Route anpassen</h4>
        <p class="route-adjust-subtitle">Beschreibe deine Änderungswünsche – die KI passt die Route an</p>
        <textarea class="form-input route-adjust-textarea" id="route-adjust-text" rows="3"
                  placeholder="${placeholder}"></textarea>
        <button class="btn route-adjust-btn" onclick="Results.submitAdjustment()">
          Route anpassen
        </button>
      </div>
    `;
  },

  /**
   * Sendet die Freitext-Anpassung ab – nutzt dedizierten Adjust-Prompt
   */
  submitAdjustment() {
    const textarea = document.getElementById('route-adjust-text');
    if (!textarea) return;

    const text = textarea.value.trim();
    if (!text) {
      textarea.style.borderColor = 'var(--terracotta)';
      textarea.setAttribute('placeholder', 'Bitte beschreibe zuerst, was du ändern möchtest...');
      textarea.focus();
      setTimeout(() => { textarea.style.borderColor = ''; }, 2000);
      return;
    }

    App.adjustRoute(text);
  },

  /**
   * Baut den Share-Text aus dem Ergebnis
   */
  buildShareText(result) {
    const cc = CountryConfig.current;
    const brandEmoji = cc ? cc.brandEmoji : '🧭';
    const brandName = cc ? cc.brandName : 'Routaris';

    const stops = result.stops.map((s, i) =>
      `${i + 1}. ${s.city} (${s.nights} ${s.nights === 1 ? 'Nacht' : 'Nächte'})`
    ).join('\n');

    const legModes = result.legs ? result.legs.map(l => this.normalizeLegMode(l.mode)) : [];
    const trains = legModes.filter(m => m === 'train').length;
    const flights = legModes.filter(m => m === 'flight').length;
    const buses = legModes.filter(m => m === 'bus' || m === 'sleeper_bus').length;
    const boats = legModes.filter(m => m === 'boat').length;
    const cars = legModes.filter(m => m === 'car').length;

    const transportParts = [];
    if (trains > 0) transportParts.push(`🚄 ${trains} Zugfahrten`);
    if (buses > 0) transportParts.push(`🚌 ${buses} Busfahrten`);
    if (cars > 0) transportParts.push(`🚙 ${cars} Autofahrten`);
    if (flights > 0) transportParts.push(`✈️ ${flights} Flüge`);
    if (boats > 0) transportParts.push(`⛴️ ${boats} Bootsfahrten`);
    transportParts.push(`🌙 ${result.totalNights} Nächte`);

    return [
      `${brandEmoji} ${brandName}: ${result.routeName}`,
      result.routeDescription,
      '',
      '📍 Stopps:',
      stops,
      '',
      transportParts.join(' | '),
      '',
      `Erstellt mit ${brandName}`
    ].join('\n');
  },

  /**
   * Erzeugt eine teilbare URL mit komprimierter Route im Hash
   */
  generateShareUrl() {
    const result = App.state.result;
    if (!result || typeof LZString === 'undefined') return null;

    const shareData = {
      country: App.state.country,
      result: result
    };

    const json = JSON.stringify(shareData);
    const compressed = LZString.compressToEncodedURIComponent(json);
    return `${window.location.origin}${window.location.pathname}#route=${compressed}`;
  },

  /**
   * Kopiert die Share-URL in die Zwischenablage
   */
  async copyShareLink() {
    const url = this.generateShareUrl();
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      const btn = document.querySelector('.share-copy-btn');
      if (btn) {
        btn.classList.add('copied');
        btn.innerHTML = '<span class="share-copy-icon">✓</span> Kopiert!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = '<span class="share-copy-icon">🔗</span> Link kopieren';
        }, 2500);
      }
    } catch (e) {
      prompt('Link kopieren:', url);
    }
  },

  renderShareButtons(result) {
    const actions = document.querySelector('.result-actions');
    if (!actions) return;

    // Bestehende Share-Elemente entfernen
    const existing = actions.querySelector('.share-wrapper');
    if (existing) existing.remove();

    const shareText = this.buildShareText(result);
    const shareUrl = this.generateShareUrl();
    const textWithLink = shareUrl ? shareText + '\n\n' + shareUrl : shareText;
    const encodedText = encodeURIComponent(textWithLink);
    const cc = CountryConfig.current;
    const brandName = cc ? cc.brandName : 'Routaris';
    const subject = encodeURIComponent(`${brandName}: ${result.routeName}`);

    // Web Share API verfügbar?
    const hasNativeShare = typeof navigator.share === 'function';

    const wrapper = document.createElement('div');
    wrapper.className = 'share-wrapper';
    wrapper.innerHTML = `
      <button class="btn btn-outline share-copy-btn" onclick="Results.copyShareLink()">
        <span class="share-copy-icon">🔗</span> Link kopieren
      </button>
      <button class="btn btn-outline share-toggle-btn" onclick="Results.toggleSharePanel()">
        Route teilen
      </button>
      <div class="share-panel" id="share-panel">
        ${hasNativeShare ? `
          <button class="share-btn" onclick="Results.nativeShare()" title="Teilen">
            <span class="share-btn-icon">📤</span>
            <span class="share-btn-label">Teilen</span>
          </button>
        ` : ''}
        <button class="share-btn" onclick="Results.copyShareText()" title="Text kopieren">
          <span class="share-btn-icon">📋</span>
          <span class="share-btn-label">Text kopieren</span>
        </button>
        <a class="share-btn" href="https://wa.me/?text=${encodedText}" target="_blank" rel="noopener" title="WhatsApp">
          <span class="share-btn-icon">💬</span>
          <span class="share-btn-label">WhatsApp</span>
        </a>
        <a class="share-btn" href="mailto:?subject=${subject}&body=${encodedText}" title="E-Mail">
          <span class="share-btn-icon">✉️</span>
          <span class="share-btn-label">E-Mail</span>
        </a>
      </div>
    `;

    actions.appendChild(wrapper);
  },

  /**
   * Toggled das Share-Panel
   */
  toggleSharePanel() {
    const panel = document.getElementById('share-panel');
    if (panel) panel.classList.toggle('open');
  },

  /**
   * Native Web Share API (mit Link)
   */
  async nativeShare() {
    const result = App.state.result;
    if (!result) return;
    try {
      const cc = CountryConfig.current;
      const brandName = cc ? cc.brandName : 'Routaris';
      const shareUrl = this.generateShareUrl();
      await navigator.share({
        title: `${brandName}: ${result.routeName}`,
        text: this.buildShareText(result),
        url: shareUrl || undefined
      });
    } catch (e) {
      // Nutzer hat abgebrochen – kein Fehler
    }
  },

  /**
   * Kopiert den Share-Text in die Zwischenablage
   */
  async copyShareText() {
    const result = App.state.result;
    if (!result) return;
    try {
      await navigator.clipboard.writeText(this.buildShareText(result));
      const btn = document.querySelector('.share-btn[onclick*="copyShareText"]');
      if (btn) {
        const label = btn.querySelector('.share-btn-label');
        if (label) {
          label.textContent = 'Kopiert!';
          setTimeout(() => { label.textContent = 'Text kopieren'; }, 2000);
        }
      }
    } catch (e) {
      App.showError('Kopieren fehlgeschlagen');
    }
  },

  /**
   * Druckt die komplette Route mit allen Stopps
   */
  printRoute() {
    const result = App.state.result;
    if (!result) return;

    // Print-Container erstellen oder wiederverwenden
    let container = document.getElementById('print-all-stops');
    if (!container) {
      container = document.createElement('div');
      container.id = 'print-all-stops';
      const step5Container = document.querySelector('#step-5 > .container');
      if (step5Container) step5Container.appendChild(container);
    }

    const cc = CountryConfig.current;
    const brandName = cc ? cc.brandName : 'Routaris';
    const brandEmoji = cc ? cc.brandEmoji : '🧭';

    // Route-Header
    let html = `
      <div class="print-route-header">
        <h2>${brandEmoji} ${result.routeName}</h2>
        <p>${result.routeDescription}</p>
        <div class="print-stats">
          <span><strong>${result.totalNights}</strong> Nächte</span>
          <span><strong>${result.stops.length}</strong> Stopps</span>
        </div>
      </div>
    `;

    // Alle Stopps mit Transport-Legs dazwischen
    result.stops.forEach((stop, i) => {
      let startDay = 1;
      for (let j = 0; j < i; j++) startDay += result.stops[j].nights;

      // Transport-Leg VOR diesem Stop
      if (i > 0) {
        const leg = this.findLeg(result.legs, result.stops[i - 1].city, stop.city);
        if (leg) {
          const modeLabels = { train: '🚄 Zug', flight: '✈️ Flug', bus: '🚌 Bus', sleeper_bus: '🚌 Schlafbus', boat: '⛴️ Boot', motorbike: '🏍️ Motorrad', car: '🚙 Auto' };
          const mode = this.normalizeLegMode(leg.mode);
          const label = modeLabels[mode] || '🚄 Zug';
          html += `<div class="print-transport">${label}: ${leg.from} → ${leg.to} (${leg.duration}, ${leg.cost})</div>`;
        }
      }

      html += `
        <div class="print-stop">
          <div class="print-stop-header">
            <span class="print-stop-num">${i + 1}</span>
            <span class="print-stop-city">${stop.city}</span>
            <span class="print-stop-nights">— ${stop.nights} ${stop.nights === 1 ? 'Nacht' : 'Nächte'} (Tag ${startDay}–${startDay + stop.nights - 1})</span>
          </div>
          ${stop.tagline ? `<div class="print-stop-tagline">${stop.tagline}</div>` : ''}

          ${stop.highlights && stop.highlights.length ? `
            <div class="print-section-title">Highlights</div>
            ${stop.highlights.map(h => `
              <div class="print-highlight">${h.icon || '📍'} <strong>${h.title}</strong> — ${h.description}</div>
            `).join('')}
          ` : ''}

          ${stop.dailyPlan && stop.dailyPlan.length ? `
            <div class="print-section-title">Tagesplan</div>
            ${stop.dailyPlan.map(d => `
              <div class="print-day"><strong>Tag ${startDay + d.day - 1}: ${d.title}</strong> — ${d.activities}</div>
            `).join('')}
          ` : ''}

          ${stop.tips && stop.tips.length ? `
            <div class="print-section-title">Tipps</div>
            ${stop.tips.map(t => `<div class="print-tip">${t.icon || '💡'} ${t.text}</div>`).join('')}
          ` : ''}
        </div>
      `;
    });

    container.innerHTML = html;
    window.print();
  },

  /**
   * Cleanup
   */
  destroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
      this.markers = [];
    }
    this.stopThumbnails = {};
    const overviewEl = document.getElementById('route-overview');
    if (overviewEl) overviewEl.innerHTML = '';
    const suggestionsEl = document.getElementById('suggestions-container');
    if (suggestionsEl) suggestionsEl.innerHTML = '';
    const adjustEl = document.getElementById('route-adjust-container');
    if (adjustEl) adjustEl.innerHTML = '';
    const printEl = document.getElementById('print-all-stops');
    if (printEl) printEl.remove();
  }
};
