/* ============================================
   MAP-EXPORT.JS – Karten-Bild-Export ("Karte teilen")
   Exportiert die Routenkarte als gebrandetes PNG
   ============================================ */

const MapExport = {

  SIZES: {
    landscape: { w: 1200, h: 630, label: 'Querformat', desc: 'Social Media / OG', mapRatio: 0.72 },
    square:    { w: 1080, h: 1080, label: 'Quadrat', desc: 'Instagram Post', mapRatio: 0.72 },
    story:     { w: 1080, h: 1920, label: 'Story', desc: 'Instagram / WhatsApp', mapRatio: 0.68 }
  },

  /**
   * Zeigt das Format-Auswahl-Modal
   */
  showExportModal() {
    const existing = document.getElementById('map-export-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'map-export-modal';
    modal.className = 'modal-backdrop';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

    modal.innerHTML = `
      <div class="modal map-export-modal-inner">
        <button class="about-modal-close" onclick="document.getElementById('map-export-modal').remove()" aria-label="Schließen">&times;</button>
        <h3 style="margin-bottom: var(--space-sm); text-align: center;">Karte als Bild exportieren</h3>
        <p style="text-align: center; color: var(--ink-muted); font-size: 0.85rem; margin-bottom: var(--space-xl);">Wähle ein Format für dein Karten-Bild</p>
        <div class="map-export-formats">
          ${Object.entries(this.SIZES).map(([key, s]) => `
            <button class="map-export-format-btn" onclick="MapExport.exportMap('${key}')">
              <div class="map-export-format-preview map-export-preview-${key}">
                ${this._buildMiniPreview(key, s)}
              </div>
              <div class="map-export-format-label">${s.label}</div>
              <div class="map-export-format-desc">${s.desc}</div>
              <div class="map-export-format-size">${s.w} × ${s.h}px</div>
            </button>
          `).join('')}
        </div>
        <div class="map-export-progress" id="map-export-progress" style="display: none;">
          <div class="loading-spinner" style="width: 40px; height: 40px;"></div>
          <span>Karte wird gerendert...</span>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.appendChild(modal);
  },

  /**
   * Exportiert die Karte als PNG
   */
  async exportMap(format) {
    const result = App.state.result;
    if (!result) return;

    const size = this.SIZES[format];
    const progress = document.getElementById('map-export-progress');
    if (progress) progress.style.display = 'flex';

    document.querySelectorAll('.map-export-format-btn').forEach(b => b.disabled = true);

    let container = null;
    try {
      container = this._createExportContainer(size, format, result);
      document.body.appendChild(container);

      // Karte initialisieren
      const mapEl = container.querySelector('.map-export-map');
      const map = L.map(mapEl, {
        scrollWheelZoom: false,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        doubleClickZoom: false
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 18
      }).addTo(map);

      // Farben
      const cs = getComputedStyle(document.documentElement);
      const cv = (n) => cs.getPropertyValue(n).trim();
      const C = {
        terracotta: cv('--terracotta'),
        teal: cv('--teal'),
        ink: cv('--ink'),
        inkMuted: cv('--ink-muted'),
        gold: cv('--car')
      };

      const lastIdx = result.stops.length - 1;
      const firstStop = result.stops[0];
      const lastStop = result.stops[lastIdx];
      const sameStartEnd = lastIdx > 0 &&
        firstStop.city === lastStop.city &&
        Math.abs(firstStop.lat - lastStop.lat) < 0.1 &&
        Math.abs(firstStop.lng - lastStop.lng) < 0.1;

      // Thumbnails (wiederverwendet vom Hauptmap)
      const thumbs = Results.stopThumbnails || {};
      const useThumbExport = result.stops.length <= 8 && Object.keys(thumbs).length > 0;
      const thumbSize = useThumbExport ? (result.stops.length <= 5 ? 56 : 48) : 0;

      const latlngs = [];

      result.stops.forEach((stop, i) => {
        if (sameStartEnd && (i === 0 || i === lastIdx)) {
          latlngs.push([stop.lat, stop.lng]);
          return;
        }
        const isFirst = i === 0;
        const isLast = i === lastIdx && !sameStartEnd;
        const color = isFirst ? C.teal : isLast ? C.ink : C.terracotta;
        const thumb = thumbs[i];
        const icon = (useThumbExport && thumb)
          ? Results._createThumbnailIcon(i + 1, color, thumb, thumbSize)
          : Results.createPremiumMarker(i + 1, color, false);
        const m = L.marker([stop.lat, stop.lng], { icon }).addTo(map);

        // City-Label – optimale Richtung basierend auf Nachbar-Stopps
        const labelDir = this._optimalLabelDir(result.stops, i);
        const hasThumb = useThumbExport && thumb;
        const th = hasThumb ? thumbSize / 2 : 0;
        const labelOff =
          labelDir === 'bottom' ? [0, th + 10] :
          labelDir === 'top'    ? [0, -(th + 10)] :
          labelDir === 'right'  ? [th + 18, hasThumb ? 0 : -20] :
                                  [-(th + 18), hasThumb ? 0 : -20];
        m.bindTooltip(stop.city, {
          permanent: true, direction: labelDir, offset: labelOff,
          className: 'map-stop-label'
        });
        latlngs.push([stop.lat, stop.lng]);
      });

      // Rundreise-Kombi-Marker
      if (sameStartEnd) {
        const thumb0 = thumbs[0];
        const combiIcon = (useThumbExport && thumb0)
          ? Results._createThumbnailCombiIcon(thumb0, thumbSize, `1 ↔ ${lastIdx + 1}`, C.terracotta)
          : Results.createPremiumMarker(null, C.terracotta, true, `1 ↔ ${lastIdx + 1}`);
        const cm = L.marker([firstStop.lat, firstStop.lng], { icon: combiIcon }).addTo(map);
        cm.bindTooltip(firstStop.city, {
          permanent: true, direction: 'bottom',
          offset: [0, (useThumbExport && thumb0) ? thumbSize / 2 + 4 : 6],
          className: 'map-stop-label'
        });
      }

      // Bezier-Kurven (dicker als auf der Hauptkarte)
      const useCurve = typeof L.curve === 'function';
      const drawnPairs = new Set();

      if (result.legs) {
        result.legs.forEach(leg => {
          const fromStop = result.stops.find(s => Results.matchCity(s.city, leg.from));
          const toStop = result.stops.find(s => Results.matchCity(s.city, leg.to));
          if (!fromStop || !toStop) return;

          const pairKey = `${fromStop.lat},${fromStop.lng}-${toStop.lat},${toStop.lng}`;
          const reverseKey = `${toStop.lat},${toStop.lng}-${fromStop.lat},${fromStop.lng}`;
          const side = drawnPairs.has(reverseKey) ? -1 : 1;
          drawnPairs.add(pairKey);

          const legMode = Results.normalizeLegMode(leg.mode);
          const isFlightLeg = legMode === 'flight';
          const isBusLeg = legMode === 'bus' || legMode === 'sleeper_bus';
          const isBoatLeg = legMode === 'boat';
          const isCarLeg = legMode === 'car';
          const opts = {
            color: isFlightLeg ? C.terracotta : isCarLeg ? C.gold : (isBusLeg || isBoatLeg) ? C.teal : C.terracotta,
            weight: 3.5,
            opacity: isFlightLeg ? 0.55 : 0.65,
            dashArray: isFlightLeg ? '10, 8' : isBusLeg ? '6, 5' : isBoatLeg ? '4, 6' : null,
            fill: false,
            lineCap: 'round',
            lineJoin: 'round'
          };

          const from = [fromStop.lat, fromStop.lng];
          const to = [toStop.lat, toStop.lng];
          if (useCurve) {
            const cp = Results._curveControlPoint(from, to, side);
            L.curve(['M', from, 'Q', cp, to], opts).addTo(map);
          } else {
            L.polyline([from, to], opts).addTo(map);
          }

          // Transport-Badge
          const badgeIcons = { train: '🚄', flight: '✈️', bus: '🚌', sleeper_bus: '🚌', boat: '⛴️', motorbike: '🏍️', car: '🚙' };
          const bIcon = badgeIcons[legMode] || '🚄';
          let badgePos;
          if (useCurve) {
            const cp2 = Results._curveControlPoint(from, to, side);
            badgePos = Results._bezierPoint(from, cp2, to, 0.5);
          } else {
            badgePos = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2];
          }
          L.marker(badgePos, {
            icon: L.divIcon({
              className: 'map-leg-badge',
              html: `<div class="map-leg-badge-inner map-leg-badge-${legMode}">${bIcon} ${leg.duration}</div>`,
              iconSize: [70, 20], iconAnchor: [35, 10]
            }),
            interactive: false, zIndexOffset: -100
          }).addTo(map);
        });
      }

      // Fallback-Kurven
      for (let i = 0; i < result.stops.length - 1; i++) {
        const a = result.stops[i];
        const b = result.stops[i + 1];
        const pairKey = `${a.lat},${a.lng}-${b.lat},${b.lng}`;
        if (!drawnPairs.has(pairKey)) {
          const from = [a.lat, a.lng];
          const to = [b.lat, b.lng];
          const opts = { color: C.inkMuted, weight: 2, opacity: 0.4, dashArray: '6, 6', fill: false, lineCap: 'round' };
          if (useCurve) {
            const cp = Results._curveControlPoint(from, to);
            L.curve(['M', from, 'Q', cp, to], opts).addTo(map);
          } else {
            L.polyline([from, to], opts).addTo(map);
          }
        }
      }

      // Karte fitten
      if (latlngs.length > 1) {
        map.fitBounds(L.latLngBounds(latlngs).pad(0.25));
      } else if (latlngs.length === 1) {
        map.setView(latlngs[0], 10);
      }

      // Warten bis Tiles geladen
      await new Promise(resolve => {
        let loaded = false;
        const checkTiles = () => {
          if (loaded) return;
          loaded = true;
          resolve();
        };
        map.whenReady(() => setTimeout(checkTiles, 2500));
        setTimeout(checkTiles, 6000);
      });

      // Mit dom-to-image-more capturen
      const scale = 2;
      const dataUrl = await domtoimage.toPng(container, {
        width: size.w * scale,
        height: size.h * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: size.w + 'px',
          height: size.h + 'px'
        }
      });

      // Download
      const cc = CountryConfig.current;
      const brandName = cc ? cc.brandName : 'Routaris';
      const routeSlug = (result.routeName || 'route').replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, '-').replace(/-+/g, '-').substring(0, 40);
      const link = document.createElement('a');
      link.download = `${brandName}-${routeSlug}-${format}.png`;
      link.href = dataUrl;
      link.click();

      map.remove();

    } catch (err) {
      console.error('Map export failed:', err);
      if (typeof App !== 'undefined' && App.showError) {
        App.showError('Export fehlgeschlagen. Bitte versuche es erneut.');
      }
    } finally {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
      const modal = document.getElementById('map-export-modal');
      if (modal) modal.remove();
    }
  },

  /**
   * Erzeugt ein CSS-basiertes Mini-Preview für das Export-Modal
   */
  _buildMiniPreview(format, size) {
    const mapPct = Math.round(size.mapRatio * 100);
    const barPct = 100 - mapPct;
    const result = App.state.result;
    const stopCount = result ? Math.min(result.stops.length, 5) : 3;

    // Mini route dots
    const dots = Array.from({ length: stopCount }, (_, i) => {
      const color = i === 0 ? '#2A7C76' : i === stopCount - 1 ? '#18170F' : '#C4654A';
      return `<span style="width:4px;height:4px;border-radius:50%;background:${color};"></span>`;
    }).join('<span style="width:6px;height:1px;background:#D4D0C8;border-radius:1px;"></span>');

    return `
      <div style="width:100%;height:${mapPct}%;background:linear-gradient(135deg,#e8e4dd 0%,#d5d0c8 40%,#c8d4d0 100%);border-radius:3px 3px 0 0;position:relative;overflow:hidden;">
        <svg style="position:absolute;inset:0;width:100%;height:100%;opacity:0.3;" viewBox="0 0 80 50" preserveAspectRatio="none">
          <path d="M10,35 Q25,15 40,25 T70,20" fill="none" stroke="#C4654A" stroke-width="1.5" stroke-dasharray="2,2"/>
          <circle cx="15" cy="33" r="2.5" fill="#2A7C76"/>
          <circle cx="40" cy="24" r="2.5" fill="#C4654A"/>
          <circle cx="65" cy="21" r="2.5" fill="#18170F"/>
        </svg>
      </div>
      <div style="width:100%;height:${barPct}%;background:linear-gradient(180deg,#FAF9F7,#EFEDE9);border-radius:0 0 3px 3px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:2px;">
        <span style="font-family:'DM Serif Display',serif;font-size:5px;color:#18170F;line-height:1;">Routenname</span>
        <span style="display:flex;align-items:center;gap:1px;">${dots}</span>
        <span style="font-size:3px;color:#B5B0A5;">routaris.com</span>
      </div>
    `;
  },

  /**
   * Berechnet die optimale Label-Richtung basierend auf Nachbar-Stopps.
   * Platziert das Label weg vom Schwerpunkt der umliegenden Stopps.
   */
  _optimalLabelDir(stops, idx) {
    const curr = stops[idx];
    const neighbors = [];
    // Berücksichtige direkte Nachbarn (±2 Stopps)
    for (let j = Math.max(0, idx - 2); j <= Math.min(stops.length - 1, idx + 2); j++) {
      if (j === idx) continue;
      neighbors.push(stops[j]);
    }
    if (neighbors.length === 0) return 'bottom';

    // Schwerpunkt der Nachbarn
    const cLat = neighbors.reduce((s, n) => s + n.lat, 0) / neighbors.length;
    const cLng = neighbors.reduce((s, n) => s + n.lng, 0) / neighbors.length;

    // Vektor vom Schwerpunkt weg
    const dLat = curr.lat - cLat;
    const dLng = curr.lng - cLng;

    // Wähle Richtung mit größter Komponente (weg von Nachbarn)
    if (Math.abs(dLat) > Math.abs(dLng)) {
      return dLat > 0 ? 'top' : 'bottom';
    } else {
      return dLng > 0 ? 'right' : 'left';
    }
  },

  /**
   * Erstellt den Off-Screen-Container für den Export (Premium Layout)
   */
  _createExportContainer(size, format, result) {
    const cc = CountryConfig.current;
    const brandName = cc ? cc.brandName : 'Routaris';

    const mapH = Math.round(size.h * size.mapRatio);
    const barH = size.h - mapH;

    const isStory = format === 'story';
    const isSquare = format === 'square';

    // Format-abhängige Design-Tokens
    const f = {
      logoPx:   isStory ? 32 : isSquare ? 26 : 22,
      brandFz:  isStory ? '1.3rem'  : isSquare ? '1rem'   : '0.85rem',
      titleFz:  isStory ? '1.5rem'  : isSquare ? '1.25rem': '1.05rem',
      descFz:   isStory ? '0.82rem' : '0.7rem',
      dotSz:    isStory ? 9  : isSquare ? 7  : 6,
      cityFz:   isStory ? '0.7rem'  : isSquare ? '0.6rem' : '0.52rem',
      nightsFz: isStory ? '0.6rem'  : isSquare ? '0.52rem': '0.45rem',
      statsFz:  isStory ? '0.8rem'  : isSquare ? '0.7rem' : '0.62rem',
      urlFz:    isStory ? '0.65rem' : isSquare ? '0.55rem': '0.48rem',
      lineW:    isStory ? 24 : isSquare ? 16 : 12,
      fadePx:   isStory ? 60 : isSquare ? 45 : 35,
      padV:     isStory ? 28 : isSquare ? 20 : 14,
      padH:     isStory ? 40 : isSquare ? 36 : 28,
      gap:      isStory ? 14 : isSquare ? 10 : 6,
      accentW:  isStory ? 80 : isSquare ? 60 : 50
    };

    // Visuelle Stop-Timeline erstellen
    const maxTlStops = isStory ? 12 : isSquare ? 9 : 7;
    const tlStops = result.stops.slice(0, maxTlStops);
    const moreCount = result.stops.length > maxTlStops ? result.stops.length - maxTlStops : 0;

    const timelineHtml = tlStops.map((stop, idx) => {
      const isFirst = idx === 0;
      const isLast = idx === result.stops.length - 1;
      const dotColor = isFirst ? '#2A7C76' : isLast ? '#18170F' : '#C4654A';

      const dot = `<span style="display:inline-block;width:${f.dotSz}px;height:${f.dotSz}px;border-radius:50%;background:${dotColor};flex-shrink:0;box-shadow:0 0 0 1.5px #fff,0 1px 3px rgba(0,0,0,0.12);"></span>`;
      const city = `<span style="font-size:${f.cityFz};font-weight:600;color:#18170F;white-space:nowrap;">${stop.city}</span>`;
      const nights = `<span style="font-size:${f.nightsFz};color:#B5B0A5;font-weight:400;">${stop.nights}N</span>`;

      // Connector-Linie zum nächsten Stopp
      let connector = '';
      if (idx < tlStops.length - 1) {
        const leg = result.legs ? result.legs.find(l =>
          Results.matchCity(stop.city, l.from) && Results.matchCity(result.stops[idx + 1].city, l.to)
        ) : null;
        const mode = leg ? Results.normalizeLegMode(leg.mode) : null;
        const lineColor = !mode ? '#D4D0C8' :
          mode === 'flight' ? '#C4654A' :
          mode === 'car' ? '#8B6914' :
          (mode === 'bus' || mode === 'boat' || mode === 'sleeper_bus') ? '#2A7C76' : '#8A857A';
        const dash = (mode === 'flight') ? 'stroke-dasharray="5 4"' :
                     (mode === 'bus' || mode === 'sleeper_bus') ? 'stroke-dasharray="4 3"' :
                     (mode === 'boat') ? 'stroke-dasharray="2 3"' : '';
        connector = `<span style="flex-shrink:0;margin:0 1px;display:flex;align-items:center;"><svg width="${f.lineW}" height="4" style="display:block;"><line x1="0" y1="2" x2="${f.lineW}" y2="2" stroke="${lineColor}" stroke-width="1.5" stroke-linecap="round" ${dash} opacity="0.55"/></svg></span>`;
      }

      return `${dot}<span style="margin:0 3px 0 2px;display:inline-flex;align-items:baseline;gap:3px;">${city} ${nights}</span>${connector}`;
    }).join('') + (moreCount > 0 ? `<span style="font-size:${f.cityFz};color:#B5B0A5;margin-left:2px;">+${moreCount}</span>` : '');

    // Route-Beschreibung (gekürzt)
    const desc = result.routeDescription || '';
    const maxDescLen = isStory ? 200 : isSquare ? 130 : 0;
    const shortDesc = maxDescLen > 0 && desc.length > 0
      ? (desc.length > maxDescLen ? desc.substring(0, maxDescLen).replace(/\s+\S*$/, '') + '…' : desc)
      : '';

    // Saison-Label
    const seasonLabels = { spring: 'Frühling', summer: 'Sommer', autumn: 'Herbst', winter: 'Winter' };
    const season = (typeof App !== 'undefined' && App.state && App.state.season)
      ? seasonLabels[App.state.season] || '' : '';

    const container = document.createElement('div');
    container.className = 'map-export-container';
    container.style.cssText = `
      position: fixed; left: -9999px; top: -9999px;
      width: ${size.w}px; height: ${size.h}px;
      overflow: hidden; z-index: -1;
      font-family: 'Instrument Sans', sans-serif;
      background: #FAF9F7;
    `;

    container.innerHTML = `
      <div class="map-export-map" style="width: ${size.w}px; height: ${mapH}px;"></div>

      <!-- Sanfter Übergang Karte → Brand-Bar -->
      <div style="position: absolute; top: ${mapH - f.fadePx}px; left: 0; right: 0; height: ${f.fadePx}px;
           background: linear-gradient(transparent, rgba(250,249,247,0.9)); z-index: 500; pointer-events: none;"></div>

      <div class="map-export-brand-bar" style="
        width: ${size.w}px; height: ${barH}px;
        background: linear-gradient(180deg, #FAF9F7 0%, #F4F2EE 40%, #EFEDE9 100%);
        display: flex; flex-direction: column; justify-content: center; align-items: center;
        padding: ${f.padV}px ${f.padH}px;
        box-sizing: border-box; overflow: hidden;
        position: relative;
      ">
        <!-- Terracotta Akzentlinie -->
        <div style="width: ${f.accentW}px; height: 2px; background: linear-gradient(90deg, transparent, #C4654A, transparent); border-radius: 2px; margin-bottom: ${f.gap}px; opacity: 0.7;"></div>

        <!-- Logo + Brand -->
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: ${f.gap}px;">
          <img src="CI/logo-icon.png" style="height: ${f.logoPx}px; width: auto;" crossorigin="anonymous" onerror="this.style.display='none'">
          <span style="font-family: 'DM Serif Display', serif; font-size: ${f.brandFz}; color: #18170F; letter-spacing: 0.02em;">${brandName}</span>
        </div>

        <!-- Routenname -->
        <div style="font-family: 'DM Serif Display', serif; font-size: ${f.titleFz}; color: #18170F; text-align: center; line-height: 1.3; margin-bottom: ${shortDesc ? '4' : f.gap}px; max-width: ${size.w - 80}px;">
          ${result.routeName}
        </div>

        ${shortDesc ? `
          <!-- Route-Beschreibung -->
          <div style="font-size: ${f.descFz}; color: #8A857A; text-align: center; margin-bottom: ${f.gap}px; max-width: ${size.w - 100}px; line-height: 1.55; font-style: italic;">
            ${shortDesc}
          </div>
        ` : ''}

        <!-- Visuelle Stop-Timeline -->
        <div style="display: flex; align-items: center; justify-content: center; flex-wrap: nowrap; gap: 0; margin-bottom: ${f.gap + 2}px; max-width: ${size.w - 50}px; overflow: hidden;">
          ${timelineHtml}
        </div>

        <!-- Stats -->
        <div style="display: flex; align-items: center; gap: ${isStory ? '20px' : isSquare ? '14px' : '10px'}; font-size: ${f.statsFz}; color: #8A857A;">
          <span>🌙 ${result.totalNights} Nächte</span>
          <span style="color: #D4D0C8;">·</span>
          <span>📍 ${result.stops.length} Stopps</span>
          ${season ? `<span style="color: #D4D0C8;">·</span><span>🗓 ${season}</span>` : ''}
        </div>

        <!-- URL + Attribution -->
        <div style="margin-top: auto; padding-top: ${f.gap}px; text-align: center; line-height: 1.6;">
          <div style="font-size: ${f.urlFz}; color: #B5B0A5; letter-spacing: 0.06em; text-transform: lowercase;">
            Geplant mit routaris.com
          </div>
          <div style="font-size: ${isStory ? '0.5rem' : isSquare ? '0.42rem' : '0.38rem'}; color: #C8C4BC; letter-spacing: 0.03em;">
            Karte: © OpenStreetMap · © CARTO · Ortsbilder: Wikimedia Commons (CC)
          </div>
        </div>
      </div>
    `;

    return container;
  }
};
