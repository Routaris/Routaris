/* ============================================
   RESULTS.JS – Step 5: Ergebnis-Rendering
   ============================================ */

const Results = {
  map: null,
  markers: [],
  activeStop: 0,

  /**
   * Normalisiert einen Leg-Mode-String auf die bekannten Werte: train|flight|bus|sleeper_bus|boat|motorbike
   * Behandelt Varianten die Gemini zurückgeben kann (ferry, fast_boat, shuttle, car, combined modes etc.)
   */
  normalizeLegMode(mode) {
    if (!mode) return 'train';
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
    // Bus / Ground transport
    if (m.includes('bus') || m.includes('shuttle') || m.includes('minivan') || m.includes('van') || m.includes('taxi') || m.includes('car') || m.includes('driver') || m.includes('wagen') || m.includes('private')) return 'bus';
    // Motorbike
    if (m.includes('motorbike') || m.includes('motorcycle') || m.includes('scooter') || m.includes('roller') || m.includes('moto')) return 'motorbike';
    // Train
    if (m.includes('train') || m.includes('zug') || m.includes('rail') || m.includes('shinkansen') || m.includes('whoosh') || m.includes('hsr') || m.includes('express')) return 'train';
    return 'train';
  },

  /**
   * Fuzzy City-Name Matching
   */
  matchCity(a, b) {
    if (!a || !b) return false;
    const normalize = s => s.toLowerCase().replace(/[-''`]/g, ' ').replace(/\s+/g, ' ').trim();
    const na = normalize(a);
    const nb = normalize(b);
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
    this.activeStop = 0;
    this._readOnly = readOnly;

    this.renderHeader(result);
    this.renderStopPills(result.stops, result.legs);
    this.renderStopDetail(result.stops[0], 0);
    this.renderTransport(result.legs, 0);
    this.renderBudget(result.budget);
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
      motorbike: 'Motorrad'
    };
    return Object.entries(counts).map(([mode, count]) => `
      <div class="result-stat">
        <div class="result-stat-value">${count}</div>
        <div class="result-stat-label">${labels[mode] || mode}</div>
      </div>
    `).join('');
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

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OSM &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 18
    }).addTo(this.map);

    this.markers = [];
    const latlngs = [];

    // Prüfen ob erster und letzter Stopp dieselbe Stadt sind
    const lastIdx = result.stops.length - 1;
    const firstStop = result.stops[0];
    const lastStop = result.stops[lastIdx];
    const sameStartEnd = lastIdx > 0 &&
      firstStop.city === lastStop.city &&
      Math.abs(firstStop.lat - lastStop.lat) < 0.1 &&
      Math.abs(firstStop.lng - lastStop.lng) < 0.1;

    // Nummerierte Marker mit Hover-Tooltips
    result.stops.forEach((stop, i) => {
      // Bei gleichem Start/Ende: kombinierten Marker für die erste Position
      if (sameStartEnd && i === lastIdx) {
        const combinedIcon = L.divIcon({
          className: 'result-marker',
          html: `<div style="
            display: flex; align-items: center; gap: 2px;
            background: #c4654a;
            border-radius: 16px;
            padding: 0 10px;
            height: 30px;
            color: white;
            font-weight: 700;
            font-size: 12px;
            font-family: 'Instrument Sans', sans-serif;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            border: 2.5px solid white;
            white-space: nowrap;
          "><span>1</span><span style="opacity:0.6;margin:0 1px;">↔</span><span>${lastIdx + 1}</span></div>`,
          iconSize: [52, 30],
          iconAnchor: [26, 15]
        });
        if (this.markers[0]) {
          this.markers[0].setIcon(combinedIcon);
          this.markers[0].unbindTooltip();
          this.markers[0].bindTooltip(
            `<strong>${firstStop.city}</strong><br>${firstStop.nights + lastStop.nights} ${(firstStop.nights + lastStop.nights) === 1 ? 'Nacht' : 'Nächte'} (Start + Rückkehr)`,
            { direction: 'top', offset: [0, -18], className: 'map-city-label' }
          );
        }
        const clickMarker = L.marker([stop.lat, stop.lng], {
          icon: L.divIcon({ className: 'result-marker-hidden', html: '', iconSize: [0, 0] }),
          opacity: 0
        }).addTo(this.map);
        clickMarker.on('click', () => this.selectStop(i));
        this.markers.push(clickMarker);
        latlngs.push([stop.lat, stop.lng]);
        return;
      }

      const isFirst = i === 0;
      const isLast = i === lastIdx && !sameStartEnd;

      const marker = L.marker([stop.lat, stop.lng], {
        icon: L.divIcon({
          className: 'result-marker',
          html: `<div style="
            width: 30px; height: 30px;
            background: ${isFirst ? '#2a7c76' : isLast ? '#18170f' : '#c4654a'};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 13px;
            font-family: 'Instrument Sans', sans-serif;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            border: 2.5px solid white;
          ">${i + 1}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        })
      }).addTo(this.map);

      // Hover-Tooltip mit Stadt + Nächte
      marker.bindTooltip(
        `<strong>${stop.city}</strong><br>${stop.nights} ${stop.nights === 1 ? 'Nacht' : 'Nächte'}`,
        { direction: 'top', offset: [0, -18], className: 'map-city-label' }
      );

      marker.on('click', () => this.selectStop(i));
      this.markers.push(marker);
      latlngs.push([stop.lat, stop.lng]);
    });

    // Verbindungslinien + Transport-Badges auf der Karte
    const drawnPairs = new Set();

    // Hilfsfunktion: Transport-Badge am Mittelpunkt einer Linie platzieren
    const addLegBadge = (fromStop, toStop, leg) => {
      const midLat = (fromStop.lat + toStop.lat) / 2;
      const midLng = (fromStop.lng + toStop.lng) / 2;
      const badgeIcons = { train: '🚄', flight: '✈️', bus: '🚌', sleeper_bus: '🚌', boat: '⛴️', motorbike: '🏍️' };
      const mode = Results.normalizeLegMode(leg.mode);
      const icon = badgeIcons[mode] || '🚄';
      const badge = L.marker([midLat, midLng], {
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
        drawnPairs.add(pairKey);

        const legMode = Results.normalizeLegMode(leg.mode);
        const isFlightLeg = legMode === 'flight';
        const isBusLeg = legMode === 'bus' || legMode === 'sleeper_bus';
        L.polyline(
          [[fromStop.lat, fromStop.lng], [toStop.lat, toStop.lng]],
          {
            color: isFlightLeg ? '#c4654a' : isBusLeg ? '#2a7c76' : '#c4654a',
            weight: 3,
            opacity: isFlightLeg ? 0.5 : 0.6,
            dashArray: isFlightLeg ? '8, 8' : isBusLeg ? '5, 5' : null
          }
        ).addTo(this.map);

        // Transport-Badge am Mittelpunkt
        addLegBadge(fromStop, toStop, leg);
      });
    }

    // Fallback: gestrichelte graue Linie für Paare ohne Leg
    for (let i = 0; i < result.stops.length - 1; i++) {
      const a = result.stops[i];
      const b = result.stops[i + 1];
      const pairKey = `${a.lat},${a.lng}-${b.lat},${b.lng}`;
      if (!drawnPairs.has(pairKey)) {
        L.polyline(
          [[a.lat, a.lng], [b.lat, b.lng]],
          { color: '#8a8878', weight: 1.5, opacity: 0.4, dashArray: '6, 6' }
        ).addTo(this.map);
      }
    }

    // Karte auf Route fitten
    if (latlngs.length > 1) {
      this.map.fitBounds(L.latLngBounds(latlngs).pad(0.15));
    } else if (latlngs.length === 1) {
      this.map.setView(latlngs[0], 10);
    }
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

    let html = '';

    stops.forEach((stop, i) => {
      const isFirst = i === 0;
      const isLast = i === lastI;
      const isActive = i === 0;
      const dotClass = isFirst ? 'dot-start' : isLast ? 'dot-end' : '';
      const activeClass = isActive ? 'active' : '';
      const returnIcon = (isLast && isRoundTrip) ? ' ✈' : '';

      html += `
        <button class="stop-pill-tl ${activeClass}" data-stop="${i}" onclick="Results.selectStop(${i})">
          <span class="stop-pill-tl-dot ${dotClass}"></span>
          <span class="stop-pill-tl-city">${stop.city}${returnIcon}</span>
          <span class="stop-pill-tl-nights">${stop.nights}N</span>
        </button>`;

      // Transport-Connector
      if (i < lastI) {
        const leg = this.findLeg(legs, stop.city, stops[i + 1].city);
        if (leg) {
          const connectorIcons = { train: '🚄', flight: '✈️', bus: '🚌', sleeper_bus: '🚌', boat: '⛴️', motorbike: '🏍️' };
          const mode = this.normalizeLegMode(leg.mode);
          const icon = connectorIcons[mode] || '🚄';
          html += `<div class="stop-connector stop-connector-${mode}">
            <span class="stop-connector-line"></span>
            <span class="stop-connector-label">${icon} ${leg.duration}</span>
            <span class="stop-connector-line"></span>
          </div>`;
        } else {
          html += `<div class="stop-connector">
            <span class="stop-connector-line"></span>
          </div>`;
        }
      }
    });

    container.innerHTML = html;
  },

  /**
   * Wählt einen Stopp aus
   */
  selectStop(index) {
    const result = App.state.result;
    if (!result) return;

    this.activeStop = index;

    // Pill aktiv setzen
    document.querySelectorAll('.stop-pill-tl').forEach((pill, i) => {
      pill.classList.toggle('active', i === index);
    });

    // Detail rendern
    this.renderStopDetail(result.stops[index], index);

    // Transportverbindungen für diesen Stop aktualisieren
    this.renderTransport(result.legs, index);

    // Karte zum Stopp fliegen
    const stop = result.stops[index];
    if (this.map && stop) {
      this.map.flyTo([stop.lat, stop.lng], 8, { duration: 1 });
    }

    // Zum Detail scrollen
    const detail = document.getElementById('stop-detail-container');
    if (detail) {
      detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
              <img class="highlight-card-img" id="highlight-img-${index}-${i}" alt="${h.title}" onerror="this.style.display='none'">
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
      const dests = CountryConfig.getDestinations();
      const dest = dests.find(d =>
        stop.city.toLowerCase().includes(d.name.split('/')[0].trim().toLowerCase()) ||
        d.name.split('/')[0].trim().toLowerCase().includes(stop.city.toLowerCase()) ||
        (d.altName && stop.city.toLowerCase().includes(d.altName.toLowerCase()))
      );
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
              motorbike: { icon: '🏍️', label: 'Motorrad' }
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
            </div>`;
          }).join('')}
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
          <h4><span class="suggestions-icon">&#x2728;</span> Deine Route könnte noch besser werden</h4>
          <p>Basierend auf deiner Route und deinen Interessen</p>
        </div>
        <div class="suggestions-list">
          ${suggestions.map((s, i) => `
            <div class="suggestion-card" data-suggestion-index="${i}">
              <div class="suggestion-img-wrap">
                <img class="suggestion-img" id="suggestion-img-${i}" alt="${s.dest.name}"
                     onerror="this.style.display='none'; this.parentElement.classList.remove('loaded'); this.parentElement.classList.add('no-image')">
              </div>
              <div class="suggestion-body">
                <div class="suggestion-name">${s.dest.name}</div>
                <div class="suggestion-reason">${s.reason}</div>
                <div class="suggestion-highlights">${s.dest.highlights}</div>
                <div class="suggestion-footer">
                  <span class="suggestion-nights">empf. ${s.extraNights}N</span>
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

    // Bilder asynchron laden
    suggestions.forEach(async (s, i) => {
      const url = await Wiki.getThumbnail(s.dest.wiki);
      const imgEl = document.getElementById(`suggestion-img-${i}`);
      if (url && imgEl) {
        imgEl.src = url;
        imgEl.parentElement.classList.add('loaded');
      } else if (imgEl) {
        imgEl.parentElement.classList.add('no-image');
      }
    });
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
    if (!text) return;

    App.adjustRoute(text);
  },

  /**
   * Baut den Share-Text aus dem Ergebnis
   */
  buildShareText(result) {
    const cc = CountryConfig.current;
    const brandEmoji = cc ? cc.brandEmoji : '🧭';
    const brandName = cc ? cc.brandName : 'NomadRoute';

    const stops = result.stops.map((s, i) =>
      `${i + 1}. ${s.city} (${s.nights} ${s.nights === 1 ? 'Nacht' : 'Nächte'})`
    ).join('\n');

    const trains = result.legs ? result.legs.filter(l => l.mode === 'train').length : 0;
    const flights = result.legs ? result.legs.filter(l => l.mode === 'flight').length : 0;
    const buses = result.legs ? result.legs.filter(l => l.mode === 'bus' || l.mode === 'sleeper_bus').length : 0;

    const transportParts = [];
    if (trains > 0) transportParts.push(`🚄 ${trains} Zugfahrten`);
    if (buses > 0) transportParts.push(`🚌 ${buses} Busfahrten`);
    if (flights > 0) transportParts.push(`✈️ ${flights} Flüge`);
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
   * Rendert Share-Buttons in den result-actions Bereich
   */
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
      const btn = document.querySelector('.share-btn[onclick*="copyShareLink"]');
      if (btn) {
        const label = btn.querySelector('.share-btn-label');
        if (label) {
          label.textContent = 'Kopiert!';
          setTimeout(() => { label.textContent = 'Link kopieren'; }, 2000);
        }
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
    const brandName = cc ? cc.brandName : 'NomadRoute';
    const subject = encodeURIComponent(`${brandName}: ${result.routeName}`);

    // Web Share API verfügbar?
    const hasNativeShare = typeof navigator.share === 'function';

    const wrapper = document.createElement('div');
    wrapper.className = 'share-wrapper';
    wrapper.innerHTML = `
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
        <button class="share-btn" onclick="Results.copyShareLink()" title="Route-Link kopieren">
          <span class="share-btn-icon">🔗</span>
          <span class="share-btn-label">Link kopieren</span>
        </button>
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
      const brandName = cc ? cc.brandName : 'NomadRoute';
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
   * Cleanup
   */
  destroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
      this.markers = [];
    }
    const suggestionsEl = document.getElementById('suggestions-container');
    if (suggestionsEl) suggestionsEl.innerHTML = '';
    const adjustEl = document.getElementById('route-adjust-container');
    if (adjustEl) adjustEl.innerHTML = '';
  }
};
