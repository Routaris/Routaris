/* ============================================
   HERO-PREVIEW.JS – Interaktive Beispielroute im Vintage-Kartenrahmen
   Hardcoded China-Familienroute (21 Tage, 6 Stopps)
   ============================================ */

const HeroPreview = {
  map: null,
  _observer: null,
  _initialized: false,

  // Hardcoded Beispielroute: 21 Tage China mit Familie
  route: {
    label: 'Beispielroute: 21 Tage China mit Familie',
    stops: [
      { city: 'Shanghai',  nights: 3, lat: 31.23, lng: 121.47, emoji: '🌃' },
      { city: 'Hangzhou',  nights: 2, lat: 30.25, lng: 120.17, emoji: '🍵' },
      { city: 'Guilin',    nights: 3, lat: 25.27, lng: 110.29, emoji: '🏔️' },
      { city: 'Chengdu',   nights: 3, lat: 30.57, lng: 104.07, emoji: '🐼' },
      { city: "Xi'an",     nights: 3, lat: 34.26, lng: 108.94, emoji: '🏛️' },
      { city: 'Beijing',   nights: 4, lat: 39.90, lng: 116.40, emoji: '🏯' }
    ],
    legs: [
      { from: 0, to: 1, mode: 'train', duration: '~1h' },
      { from: 1, to: 2, mode: 'flight', duration: '~2h' },
      { from: 2, to: 3, mode: 'flight', duration: '~1.5h' },
      { from: 3, to: 4, mode: 'train', duration: '~3.5h' },
      { from: 4, to: 5, mode: 'train', duration: '~4.5h' }
    ]
  },

  /**
   * Initialisiert den Preview mit IntersectionObserver (Lazy Init)
   */
  init() {
    const container = document.getElementById('hero-preview');
    if (!container) return;

    // IntersectionObserver: Map erst rendern wenn sichtbar
    this._observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this._initialized) {
          this._initMap();
          this._renderTimeline();
          this._initialized = true;
        }
      });
    }, { threshold: 0.1 });

    this._observer.observe(container);
  },

  /**
   * Leaflet-Map initialisieren (nicht-interaktiv, Sepia-Tiles)
   */
  _initMap() {
    const mapEl = document.getElementById('hero-preview-map');
    if (!mapEl || this.map) return;

    // Map-Center: Mitte von China
    this.map = L.map(mapEl, {
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: false,
      attributionControl: false
    }).setView([32, 112], 4);

    // CARTO Tiles (Sepia-Filter wird per CSS angewandt)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd'
    }).addTo(this.map);

    // Marker + Verbindungslinien zeichnen
    this._drawRoute();

    // Bounds anpassen – links mehr Padding (westl. China), rechts weniger (Ozean abschneiden)
    const bounds = this.route.stops.map(s => [s.lat, s.lng]);
    this.map.fitBounds(bounds, { paddingTopLeft: [40, 25], paddingBottomRight: [20, 25] });
  },

  /**
   * Nummerierte Marker + Polylines zeichnen
   * WICHTIG: Marker-Style muss mit Results.createPremiumMarker() übereinstimmen!
   * Bei Änderungen an der Ergebnis-Karte (results.js) auch hier anpassen.
   */
  _drawRoute() {
    const stops = this.route.stops;

    // Verbindungslinien – gleiche Farben/Dash wie results.js _drawRouteOnMap()
    this.route.legs.forEach(leg => {
      const from = stops[leg.from];
      const to = stops[leg.to];
      const isFlight = leg.mode === 'flight';

      L.polyline([[from.lat, from.lng], [to.lat, to.lng]], {
        color: isFlight ? '#c4654a' : '#c4654a',  // results.js: terracotta für Zug, terracotta für Flug
        weight: 3,
        opacity: isFlight ? 0.5 : 0.6,
        dashArray: isFlight ? '8, 8' : null
      }).addTo(this.map);
    });

    // Nummerierte Teardrop-Marker – identisch mit Results.createPremiumMarker()
    stops.forEach((stop, i) => {
      // Erster + Letzter Stopp = Rundreise-Start/Ende
      const isFirstOrLast = i === 0 || i === stops.length - 1;
      const color = isFirstOrLast ? '#2a7c76' : '#c4654a';  // teal für Start/Ende, terracotta für Mitte

      const icon = L.divIcon({
        className: 'hero-preview-marker',
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 36 48">
          <defs>
            <filter id="hps${i}" x="-20%" y="-10%" width="140%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
            </filter>
          </defs>
          <path d="M18 47C18 47 2 28 2 17C2 8.16 9.16 1 18 1C26.84 1 34 8.16 34 17C34 28 18 47 18 47Z"
                fill="${color}" stroke="white" stroke-width="2.5" filter="url(#hps${i})"/>
          <text x="18" y="22" text-anchor="middle" fill="white" font-family="'Instrument Sans',sans-serif" font-weight="700" font-size="14">${i + 1}</text>
        </svg>`,
        iconSize: [30, 40],
        iconAnchor: [15, 40]
      });

      L.marker([stop.lat, stop.lng], { icon, interactive: false }).addTo(this.map);
    });
  },

  /**
   * Timeline mit Stopp-Dots + Transport-Connectors rendern
   */
  _renderTimeline() {
    const container = document.getElementById('hero-preview-timeline');
    if (!container) return;

    const stops = this.route.stops;
    const legs = this.route.legs;
    let html = '';

    stops.forEach((stop, i) => {
      // Stopp-Dot
      html += `<div class="hero-tl-stop">
        <span class="hero-tl-emoji">${stop.emoji}</span>
        <span class="hero-tl-city">${stop.city}</span>
        <span class="hero-tl-nights">${stop.nights}N</span>
      </div>`;

      // Transport-Connector (außer nach letztem Stopp)
      if (i < stops.length - 1) {
        const leg = legs[i];
        const icon = leg.mode === 'flight' ? '✈' : '🚄';
        html += `<div class="hero-tl-connector">
          <span class="hero-tl-transport">${icon}</span>
        </div>`;
      }
    });

    container.innerHTML = html;
  },

  /**
   * Map zerstören (Memory-Leak-Schutz bei Step-Wechsel)
   */
  destroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    this._initialized = false;
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }
};
