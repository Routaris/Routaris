/* ============================================
   HERO-PREVIEW.JS – Statisches Routenvorschau-Bild im Vintage-Rahmen
   Zeigt einen echten Kartenexport als Preview auf der Startseite
   ============================================ */

const HeroPreview = {
  _observer: null,
  _initialized: false,

  /**
   * Initialisiert den Preview mit IntersectionObserver (Lazy Load)
   */
  init() {
    const container = document.getElementById('hero-preview');
    if (!container) return;

    // Bereits initialisiert? Nicht nochmal
    if (this._initialized) return;

    // IntersectionObserver: Bild erst laden wenn sichtbar
    this._observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this._initialized) {
          this._loadImage();
          this._initialized = true;
        }
      });
    }, { threshold: 0.1 });

    this._observer.observe(container);
  },

  /**
   * Bild in den Container laden
   */
  _loadImage() {
    const imgEl = document.getElementById('hero-preview-img');
    if (!imgEl) return;

    // Lazy: <source> data-srcset und <img> data-src aktivieren
    const source = imgEl.parentElement?.querySelector('source[data-srcset]');
    if (source) {
      source.srcset = source.dataset.srcset;
      source.removeAttribute('data-srcset');
    }
    const src = imgEl.dataset.src;
    if (src) {
      imgEl.src = src;
      imgEl.removeAttribute('data-src');
    }
  },

  /**
   * Cleanup bei Step-Wechsel (Observer stoppen)
   */
  destroy() {
    this._initialized = false;
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }
};
