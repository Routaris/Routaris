/* ============================================
   PDF-EXPORT.JS – PDF-Reisebroschüre v3
   Magazin-Layout, jsPDF + html2canvas
   ============================================ */

const PDFExport = {
  PW: 210, PH: 297, M: 18, CW: 174,

  C: {
    cream:     [250, 249, 247],
    creamDark: [240, 239, 233],
    ink:       [24, 23, 15],
    inkLight:  [74, 72, 64],
    inkMuted:  [138, 136, 120],
    terra:     [196, 101, 74],
    terraDark: [168, 81, 58],
    terraPale: [254, 240, 236],
    teal:      [42, 124, 118],
    tealDark:  [31, 95, 90],
    tealPale:  [230, 245, 243],
    white:     [255, 255, 255],
    border:    [232, 231, 226],
    overlay:   [24, 23, 15]
  },

  FD: 'times', FB: 'helvetica', _fontsReady: false,

  MODE_LABELS: {
    train: 'Zug', flight: 'Flug', bus: 'Bus', sleeper_bus: 'Schlafbus',
    boat: 'Boot', ferry: 'F\u00E4hre', motorbike: 'Motorrad', car: 'Auto',
    minibus: 'Minibus', domestic_flight: 'Inlandsflug', '4x4': 'Gel\u00E4ndewagen'
  },

  // ═══════════════════════════════════════
  //  PUBLIC API
  // ═══════════════════════════════════════

  async generate() {
    const result = App.state.result;
    if (!result || !result.stops) {
      App.showError('Keine Route vorhanden. Bitte erst eine Route generieren.');
      return;
    }
    try {
      this.showProgress('Bereite PDF vor...', 5);
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      this.showProgress('Lade Schriften...', 8);
      await this.loadFonts(doc);

      this.showProgress('Lade Bilder...', 12);
      const imgs = await this.prefetchAllImages(result);

      this.showProgress('Cover...', 20);
      await this.pageCover(doc, result, imgs);

      this.showProgress('Routen\u00FCbersicht...', 30);
      doc.addPage();
      await this.pageOverview(doc, result, imgs);

      const n = result.stops.length;
      for (let i = 0; i < n; i++) {
        this.showProgress(this._clean(result.stops[i].city) + '...', 35 + Math.round(i / n * 45));
        doc.addPage();
        await this.pageStop(doc, result.stops[i], i, result, imgs);
      }

      this.showProgress('Budget & Tipps...', 85);
      doc.addPage();
      await this.pageBudget(doc, result, imgs);

      this.showProgress('Finalisiere...', 92);
      doc.addPage();
      await this.pageCredits(doc, result, imgs);

      const total = doc.internal.getNumberOfPages();
      for (let p = 2; p <= total; p++) {
        doc.setPage(p);
        this._footer(doc, p, total);
      }

      this.showProgress('PDF wird heruntergeladen...', 100);
      const cc = CountryConfig.current;
      const brand = cc ? cc.brandName : 'Routaris';
      const slug = (result.routeName || 'Route')
        .replace(/[^a-zA-Z\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00DF0-9\s]/g, '')
        .trim().replace(/\s+/g, '-').substring(0, 40);
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${brand}-${slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      setTimeout(() => this.hideProgress(), 600);
    } catch (err) {
      console.error('[PDF] Fehler:', err);
      this.hideProgress();
      App.showError('PDF konnte nicht erstellt werden: ' + err.message);
    }
  },

  // ═══════════════════════════════════════
  //  FONT LOADING
  // ═══════════════════════════════════════

  async loadFonts(doc) {
    try {
      const urls = [
        'https://raw.githubusercontent.com/google/fonts/main/ofl/dmserifdisplay/DMSerifDisplay-Regular.ttf',
        'https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentsans/InstrumentSans%5Bwdth%2Cwght%5D.ttf'
      ];
      const [dmRes, isRes] = await Promise.allSettled(urls.map(u => fetch(u).then(r => r.ok ? r.arrayBuffer() : null)));
      if (dmRes.status === 'fulfilled' && dmRes.value) {
        const b64 = this._toBase64(dmRes.value);
        doc.addFileToVFS('DMSerif.ttf', b64);
        doc.addFont('DMSerif.ttf', 'DMSerif', 'normal');
        this.FD = 'DMSerif';
      }
      if (isRes.status === 'fulfilled' && isRes.value) {
        const b64 = this._toBase64(isRes.value);
        doc.addFileToVFS('InstrSans.ttf', b64);
        doc.addFont('InstrSans.ttf', 'InstrSans', 'normal');
        this.FB = 'InstrSans';
      }
      this._fontsReady = true;
    } catch { console.warn('[PDF] Font-Fallback aktiv'); }
  },

  _toBase64(buf) {
    let bin = '';
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  },

  // ═══════════════════════════════════════
  //  IMAGE PIPELINE
  // ═══════════════════════════════════════

  async prefetchAllImages(result) {
    const imgs = { hero: null, logo: null, map: null, stops: {}, hl: {} };
    const cc = CountryConfig.current;
    const tasks = [];
    const heroPath = cc ? `images/hero/${cc.id}.jpg` : 'images/hero/hero-bg.jpg';
    tasks.push(this._imgData(heroPath).then(d => { imgs.hero = d; }));
    tasks.push(this._loadSvg('CI/routaris-wordmark-notag.svg').then(d => { imgs.logo = d; }));
    tasks.push(this._loadSvg('CI/routaris-wordmark-light.svg').then(d => {
      if (d) { imgs.logoLight = d; }
      else { return this._loadSvg('CI/routaris-wordmark.svg').then(d2 => { imgs.logoLight = d2; }); }
    }));
    tasks.push(this._captureMap().then(d => { imgs.map = d; }));
    for (let i = 0; i < result.stops.length; i++) {
      const stop = result.stops[i];
      tasks.push(
        Wiki.getHeroImage(stop.wiki || stop.city)
          .then(url => url ? this._imgData(url) : null)
          .then(d => { if (d) imgs.stops[stop.city] = d; })
          .catch(() => {})
      );
      (stop.highlights || []).slice(0, 2).forEach((hl, h) => {
        tasks.push(
          Wiki.getHeroImage(hl.wiki || hl.title)
            .then(url => url ? this._imgData(url) : null)
            .then(d => { if (d) imgs.hl[`${i}-${h}`] = d; })
            .catch(() => {})
        );
      });
    }
    await Promise.allSettled(tasks);
    return imgs;
  },

  async _imgData(url) {
    if (!url) return null;
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((ok, fail) => { img.onload = ok; img.onerror = fail; img.src = url; });
      const max = 1200;
      let w = img.naturalWidth, h = img.naturalHeight;
      if (w === 0 || h === 0) return null;
      if (w > max) { h = Math.round(h * max / w); w = max; }
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      return { data: c.toDataURL('image/jpeg', 0.75), w, h };
    } catch { return null; }
  },

  async _captureMap() {
    const el = document.getElementById('result-map');
    if (!el || typeof html2canvas === 'undefined') return null;
    try {
      // Reset map to show full route before capture (without UI side effects)
      if (typeof Results !== 'undefined' && Results.map) {
        const result = App.state.result;
        if (result && result.stops && result.stops.length > 1) {
          const latlngs = result.stops.map(s => [s.lat, s.lng]);
          Results.map.fitBounds(L.latLngBounds(latlngs).pad(0.25));
        }
        // Wait for map animation + tile loading
        await new Promise(r => {
          const done = () => { clearTimeout(fallback); r(); };
          const fallback = setTimeout(done, 1200);
          Results.map.once('moveend', () => setTimeout(done, 300));
        });
      }
      const c = await html2canvas(el, { useCORS: true, scale: 2, logging: false, backgroundColor: '#faf9f7' });
      return { data: c.toDataURL('image/jpeg', 0.82), w: c.width, h: c.height };
    } catch { return null; }
  },

  async _loadSvg(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) return null;
      const svgText = await res.text();
      const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText);
      const img = new Image();
      img.src = dataUrl;
      await img.decode();
      const w = img.naturalWidth || 400;
      const h = img.naturalHeight || 170;
      const c = document.createElement('canvas');
      const scale = 3;
      c.width = w * scale; c.height = h * scale;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0, c.width, c.height);
      return { data: c.toDataURL('image/png'), w: c.width, h: c.height };
    } catch { return null; }
  },

  // ═══════════════════════════════════════
  //  PAGE: COVER
  // ═══════════════════════════════════════

  async pageCover(doc, result, imgs) {
    const C = this.C;
    doc.setFillColor(...C.cream);
    doc.rect(0, 0, this.PW, this.PH, 'F');

    const heroH = 180;
    if (imgs.hero) {
      await this._img(doc, imgs.hero, 0, 0, this.PW, heroH);
    } else {
      doc.setFillColor(...C.teal);
      doc.rect(0, 0, this.PW, heroH, 'F');
    }

    // Logo with tagline at top of cover (on hero image)
    const coverLogo = imgs.logoLight || imgs.logo;
    if (coverLogo) {
      doc.setFillColor(...C.overlay);
      doc.rect(0, 0, this.PW, 30, 'F');
      await this._img(doc, coverLogo, this.PW / 2 - 32, 4, 64, 22);
    }

    // Pre-calculate text layout to size overlay correctly
    const name = this._clean(result.routeName || 'Deine Reiseroute');
    doc.setFont(this.FD, 'normal');
    doc.setFontSize(28);
    const nameLines = doc.splitTextToSize(name, this.CW).slice(0, 2);
    const nameH = nameLines.length * 12;

    doc.setFont(this.FB, 'normal');
    doc.setFontSize(10);
    let descLines = [];
    if (result.routeDescription) {
      descLines = doc.splitTextToSize(this._clean(result.routeDescription), this.CW).slice(0, 5);
    }
    const descH = descLines.length * 5;

    // Position text from bottom of overlay upward
    const totalTextH = nameH + (descLines.length > 0 ? descH + 6 : 0);
    const textStartY = heroH - 10 - totalTextH;
    const overlayTop = textStartY - 12;

    // Dark overlay sized to fit text
    doc.setFillColor(...C.overlay);
    doc.rect(0, overlayTop, this.PW, heroH - overlayTop, 'F');

    // Route name
    let y = textStartY;
    doc.setFont(this.FD, 'normal');
    doc.setFontSize(28);
    doc.setTextColor(...C.white);
    nameLines.forEach(line => {
      doc.text(line, this.M, y);
      y += 12;
    });

    // Description – full text (up to 5 lines)
    if (descLines.length > 0) {
      y += 3;
      doc.setFont(this.FB, 'normal');
      doc.setFontSize(10);
      descLines.forEach(line => {
        doc.text(line, this.M, y);
        y += 5;
      });
    }

    // Stats bar – increased spacing
    y = heroH + 22;
    doc.setFillColor(...C.white);
    doc.roundedRect(this.M, y - 8, this.CW, 30, 5, 5, 'F');

    const seasons = { spring: 'Fr\u00FChling', summer: 'Sommer', autumn: 'Herbst', winter: 'Winter' };
    const groups = { solo: 'Solo', couple: 'Paar', family: 'Familie', friends: 'Freunde' };
    const reisezeitTop = App.state.arrivalDate && App.state.departureDate
      ? `${new Date(App.state.arrivalDate + 'T12:00:00').toLocaleDateString('de-DE', {day:'numeric',month:'short'})} – ${new Date(App.state.departureDate + 'T12:00:00').toLocaleDateString('de-DE', {day:'numeric',month:'short'})}`
      : (seasons[App.state.season] || '');
    const stats = [
      { top: String(result.totalNights), bottom: 'N\u00E4chte' },
      { top: String(result.stops.length), bottom: 'Stopps' },
      { top: reisezeitTop, bottom: 'Reisezeit' },
      { top: groups[App.state.group] || '', bottom: 'Reisegruppe' }
    ].filter(s => s.top);

    const segW = this.CW / stats.length;
    stats.forEach((s, i) => {
      const cx = this.M + segW * i + segW / 2;
      doc.setFont(this.FD, 'normal');
      doc.setFontSize(15);
      doc.setTextColor(...C.terra);
      doc.text(s.top, cx, y + 3, { align: 'center' });
      doc.setFont(this.FB, 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...C.inkMuted);
      doc.text(s.bottom, cx, y + 10, { align: 'center' });
      if (i < stats.length - 1) {
        doc.setDrawColor(...C.border);
        doc.setLineWidth(0.3);
        doc.line(this.M + segW * (i + 1), y - 4, this.M + segW * (i + 1), y + 14);
      }
    });

    // Brand name at bottom
    y = this.PH - 30;
    const cc = CountryConfig.current;
    doc.setFont(this.FB, 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...C.inkMuted);
    doc.text(cc ? cc.brandName : 'Routaris', this.PW / 2, y, { align: 'center' });
    y += 6;
    doc.setFontSize(8);
    doc.text('routaris.com', this.PW / 2, y, { align: 'center' });
  },

  // ═══════════════════════════════════════
  //  PAGE: OVERVIEW
  // ═══════════════════════════════════════

  async pageOverview(doc, result, imgs) {
    const C = this.C;
    this._bg(doc);
    await this._header(doc, imgs);
    let y = 24;

    this._sec(doc, 'Routen\u00FCbersicht', y);
    y += 14;

    // Map (proportional to actual aspect ratio)
    if (imgs.map) {
      const mapW = this.CW;
      const mapRatio = (imgs.map.w && imgs.map.h) ? imgs.map.w / imgs.map.h : 1.8;
      const mapH = Math.min(Math.round(mapW / mapRatio), 130);
      doc.setFillColor(...C.white);
      doc.roundedRect(this.M - 1, y - 1, mapW + 2, mapH + 2, 3, 3, 'F');
      await this._img(doc, imgs.map, this.M, y, mapW, mapH);
      doc.setDrawColor(...C.border);
      doc.setLineWidth(0.4);
      doc.roundedRect(this.M - 1, y - 1, mapW + 2, mapH + 2, 3, 3, 'S');
      y += mapH + 10;
    }

    this._sec(doc, 'Deine Route', y);
    y += 14;

    const stops = result.stops;
    const cx = this.M + 6;

    for (let i = 0; i < stops.length; i++) {
      const stop = stops[i];
      const neededH = i < stops.length - 1 ? 18 : 10;
      if (y + neededH > 270) { doc.addPage(); this._bg(doc); await this._header(doc, imgs); y = 24; }

      // Circle
      doc.setFillColor(...C.terra);
      doc.circle(cx, y + 1, 4, 'F');
      doc.setFont(this.FB, 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...C.white);
      doc.text(String(i + 1), cx, y + 2.8, { align: 'center' });

      // City
      doc.setFont(this.FD, 'normal');
      doc.setFontSize(12);
      doc.setTextColor(...C.ink);
      doc.text(this._clean(stop.city), this.M + 14, y + 3);

      // Nights
      doc.setFont(this.FB, 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...C.terra);
      doc.text(`${stop.nights} ${stop.nights === 1 ? 'Nacht' : 'N\u00E4chte'}`, this.M + this.CW, y + 3, { align: 'right' });

      y += 9;

      // Transport connector
      if (i < stops.length - 1) {
        doc.setDrawColor(...C.border);
        doc.setLineWidth(0.4);
        doc.line(cx, y - 4, cx, y + 4);

        const leg = Results.findLeg(result.legs, stop.city, stops[i + 1].city);
        if (leg) {
          const mode = Results.normalizeLegMode(leg.mode);
          const label = this.MODE_LABELS[mode] || 'Transfer';
          doc.setFont(this.FB, 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(...C.inkMuted);
          doc.text(`${label}, ${leg.duration}, ${leg.cost}`, this.M + 14, y + 1);
        }
        y += 8;
      }
    }
  },

  // ═══════════════════════════════════════
  //  PAGE: STOP (one page per stop)
  // ═══════════════════════════════════════

  async pageStop(doc, stop, idx, result, imgs) {
    const C = this.C;
    this._bg(doc);
    const cityImg = imgs.stops[stop.city];
    const PAGE_BOTTOM = this.PH - 18; // footer area

    // --- Calculate start day ---
    let sd = 1;
    for (let j = 0; j < idx; j++) sd += result.stops[j].nights;

    // --- Collect data ---
    const highlights = (stop.highlights || []).slice(0, 5);
    const plan = (stop.dailyPlan || []);
    const tips = (stop.tips || []).slice(0, 3);
    const hasImages = !!(imgs.hl[`${idx}-0`] || imgs.hl[`${idx}-1`]);
    const hasTransport = idx < result.stops.length - 1;
    const leg = hasTransport ? Results.findLeg(result.legs, stop.city, result.stops[idx + 1].city) : null;

    // --- Estimate space needed to determine compression ---
    const heroH = cityImg ? 68 : 44;
    const taglineH = stop.tagline ? 14 : 0;
    const hlHeaderH = highlights.length > 0 ? 12 : 0;
    const hlImgH = hasImages ? 38 : 0;
    const hlTextH = highlights.length * 6.5 + 4;
    const planHeaderH = plan.length > 0 ? 12 : 0;
    const planH = plan.length * 16;
    const tipH = tips.length > 0 ? 14 + tips.length * 8 : 0;
    const transportH = leg ? 18 : 0;
    const totalNeeded = heroH + 6 + taglineH + hlHeaderH + hlImgH + hlTextH + planHeaderH + planH + tipH + transportH;
    const available = PAGE_BOTTOM - (cityImg ? heroH + 6 : heroH);

    // Compression: if content exceeds available, reduce items and sizes
    const tight = totalNeeded > available + heroH;
    const maxActLines = tight ? 2 : 3;
    const maxHlText = tight ? Math.min(highlights.length, 4) : highlights.length;
    const showImages = !tight || (available > 180);
    const dayFontSize = tight ? 7.5 : 8;

    let y = 0;

    // ══════════════════════════════════
    //  HERO IMAGE
    // ══════════════════════════════════
    if (cityImg) {
      await this._img(doc, cityImg, 0, 0, this.PW, 68);
      doc.setFillColor(...C.overlay);
      doc.rect(0, 42, this.PW, 26, 'F');

      doc.setFillColor(...C.terra);
      doc.circle(this.M + 5, 55, 5.5, 'F');
      doc.setFont(this.FB, 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...C.white);
      doc.text(String(idx + 1), this.M + 5, 57, { align: 'center' });

      doc.setFont(this.FD, 'normal');
      doc.setFontSize(24);
      doc.text(this._clean(stop.city), this.M + 14, 59);

      doc.setFont(this.FB, 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...C.terraPale);
      const nightsLbl = stop.nights === 1 ? 'Nacht' : 'N\u00E4chte';
      doc.text(`${stop.nights} ${nightsLbl}  |  ${this._dateRange(stop, sd)}`, this.M + 14, 66);

      // Mini-map in top right corner
      this._drawMiniMap(doc, result, idx);

      y = 74;
    } else {
      await this._header(doc, imgs);

      // Consistent circle-badge header (same design as with-image version)
      const hy = 24;
      doc.setFillColor(...C.terra);
      doc.circle(this.M + 5, hy, 5.5, 'F');
      doc.setFont(this.FB, 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...C.white);
      doc.text(String(idx + 1), this.M + 5, hy + 2, { align: 'center' });

      doc.setFont(this.FD, 'normal');
      doc.setFontSize(24);
      doc.setTextColor(...C.ink);
      doc.text(this._clean(stop.city), this.M + 14, hy + 4);

      doc.setFont(this.FB, 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...C.terra);
      const nightsLabel = stop.nights === 1 ? 'Nacht' : 'N\u00E4chte';
      doc.text(`${stop.nights} ${nightsLabel}  |  ${this._dateRange(stop, sd)}`, this.M + 14, hy + 12);

      // Mini-map in top right corner
      this._drawMiniMap(doc, result, idx);

      y = 44;
    }

    // ══════════════════════════════════
    //  TAGLINE
    // ══════════════════════════════════
    if (stop.tagline) {
      doc.setFont(this.FD, 'normal');
      doc.setFontSize(11);
      doc.setTextColor(...C.inkLight);
      const tl = doc.splitTextToSize(this._clean(stop.tagline), this.CW);
      tl.slice(0, 2).forEach(line => { doc.text(line, this.M, y); y += 5.5; });
      y += 4;
    }

    // ══════════════════════════════════
    //  HIGHLIGHTS
    // ══════════════════════════════════
    if (highlights.length > 0) {
      this._sec(doc, 'Highlights', y);
      y += 12;

      // 2-column image grid with rounded corners + uniform height
      if (showImages && hasImages) {
        const gap = 8;
        const colW = (this.CW - gap) / 2;
        const imgH = 34;
        const img0 = imgs.hl[`${idx}-0`];
        const img1 = imgs.hl[`${idx}-1`];

        if (img0) {
          await this._imgRounded(doc, img0, this.M, y, colW, imgH, 3);
          // Label overlay at bottom
          doc.setFillColor(...C.overlay);
          doc.roundedRect(this.M, y + imgH - 10, colW, 10, 0, 0, 'F');
          doc.setFont(this.FB, 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(...C.white);
          if (highlights[0]) {
            const t = doc.splitTextToSize(this._clean(highlights[0].title), colW - 6);
            doc.text(t[0] || '', this.M + 3, y + imgH - 3);
          }
        }
        const rx = this.M + colW + gap;
        if (img1) {
          await this._imgRounded(doc, img1, rx, y, colW, imgH, 3);
          doc.setFillColor(...C.overlay);
          doc.roundedRect(rx, y + imgH - 10, colW, 10, 0, 0, 'F');
          doc.setFont(this.FB, 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(...C.white);
          if (highlights[1]) {
            const t = doc.splitTextToSize(this._clean(highlights[1].title), colW - 6);
            doc.text(t[0] || '', rx + 3, y + imgH - 3);
          }
        }
        y += imgH + 5;
      }

      // Highlight list with full descriptions
      highlights.slice(0, maxHlText).forEach(h => {
        if (y > PAGE_BOTTOM - 30) return;
        doc.setFillColor(...C.terra);
        doc.circle(this.M + 1.5, y + 1.5, 1.2, 'F');
        doc.setFont(this.FD, 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...C.ink);
        const title = this._clean(h.title);
        doc.text(title, this.M + 5, y + 3);
        y += 5;

        if (h.description) {
          doc.setFont(this.FB, 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(...C.inkLight);
          const descText = this._clean(h.description);
          const descLines = doc.splitTextToSize(descText, this.CW - 7);
          descLines.slice(0, 2).forEach(line => {
            if (y > PAGE_BOTTOM - 25) return;
            doc.text(line, this.M + 5, y + 1);
            y += 3.5;
          });
        }
        y += 3;
      });
      y += 2;
    }

    // ══════════════════════════════════
    //  DAILY PLAN
    // ══════════════════════════════════
    if (plan.length > 0 && y < PAGE_BOTTOM - 40) {
      this._sec(doc, 'Tagesplan', y);
      y += 12;

      plan.forEach(day => {
        if (y > PAGE_BOTTOM - 22) return;
        const dayNum = sd + day.day - 1;

        doc.setFont(this.FB, 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...C.terra);
        doc.text(this._dayLabel(stop, day.day, dayNum), this.M, y + 2);

        doc.setFont(this.FD, 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...C.ink);
        const titleLines = doc.splitTextToSize(this._clean(day.title || ''), this.CW - 22);
        doc.text(titleLines[0] || '', this.M + 20, y + 2);

        y += 5;
        doc.setDrawColor(...C.border);
        doc.setLineWidth(0.2);
        doc.line(this.M, y, this.M + this.CW, y);
        y += 3;

        doc.setFont(this.FB, 'normal');
        doc.setFontSize(dayFontSize);
        doc.setTextColor(...C.inkLight);
        const lines = doc.splitTextToSize(this._clean(day.activities || ''), this.CW);
        lines.slice(0, maxActLines).forEach(line => {
          if (y > PAGE_BOTTOM - 20) return;
          doc.text(line, this.M, y);
          y += 3.8;
        });
        y += 3;
      });
    }

    // ══════════════════════════════════
    //  TIPS (grouped card)
    // ══════════════════════════════════
    if (tips.length > 0 && y < PAGE_BOTTOM - 28) {
      doc.setFont(this.FB, 'normal');
      doc.setFontSize(7.5);
      let cardH = 12;
      const tipData = tips.map(t => {
        const lines = doc.splitTextToSize(this._clean(t.text || ''), this.CW - 16);
        const cut = lines.slice(0, 2);
        cardH += cut.length * 3.8 + 1.5;
        return cut;
      });
      cardH += 2;
      const maxCardH = PAGE_BOTTOM - y - (leg ? 24 : 4);
      cardH = Math.min(cardH, maxCardH);
      if (cardH < 16) { y += 4; } else {

      doc.setFillColor(...C.tealPale);
      doc.roundedRect(this.M, y, this.CW, cardH, 4, 4, 'F');
      doc.setFillColor(...C.teal);
      doc.roundedRect(this.M, y, 3.5, cardH, 1.5, 1.5, 'F');

      doc.setFont(this.FD, 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...C.tealDark);
      doc.text('Tipps', this.M + 8, y + 7);

      let ty = y + 12;
      doc.setFont(this.FB, 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...C.tealDark);
      tipData.forEach(lines => {
        lines.forEach(line => {
          if (ty < y + cardH - 2) { doc.text(line, this.M + 8, ty); ty += 3.8; }
        });
        ty += 1.5;
      });

      y += cardH + 4;
      } // end else (cardH >= 16)
    }

    // ══════════════════════════════════
    //  TRANSPORT BAR (pinned near bottom)
    // ══════════════════════════════════
    if (leg) {
      const barY = Math.max(y, PAGE_BOTTOM - 16);
      const mode = Results.normalizeLegMode(leg.mode);
      const label = this.MODE_LABELS[mode] || 'Transfer';
      const nextCity = this._clean(result.stops[idx + 1].city);

      // Subtle separator line
      doc.setDrawColor(...C.border);
      doc.setLineWidth(0.3);
      doc.line(this.M, barY, this.M + this.CW, barY);

      // Teal text with arrow (dezent, not a full button)
      doc.setFont(this.FB, 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...C.teal);
      const transportText = `Weiterreise nach ${nextCity}  \u2192  ${label}, ${leg.duration}, ${leg.cost}`;
      doc.text(transportText, this.M, barY + 8, { maxWidth: this.CW });
    }
  },

  // ═══════════════════════════════════════
  //  PAGE: BUDGET
  // ═══════════════════════════════════════

  async pageBudget(doc, result, imgs) {
    const C = this.C;
    this._bg(doc);
    await this._header(doc, imgs);
    let y = 24;

    this._sec(doc, 'Budget & Reisetipps', y);
    y += 14;

    if (result.budget) {
      const b = result.budget;
      const items = [
        { label: 'Unterkunft', value: b.accommodation, color: C.terra },
        { label: 'Essen & Trinken', value: b.food, color: C.teal },
        { label: 'Transport', value: b.transport, color: C.terra },
        { label: 'Aktivit\u00E4ten', value: b.activities, color: C.teal }
      ];

      const gap = 8;
      const cardW = (this.CW - gap) / 2;
      const cardH = 34;

      items.forEach((item, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = this.M + col * (cardW + gap);
        const cy = y + row * (cardH + gap);

        doc.setFillColor(...C.white);
        doc.roundedRect(x, cy, cardW, cardH, 4, 4, 'F');
        doc.setFillColor(...item.color);
        doc.roundedRect(x, cy, cardW, 3, 4, 4, 'F');
        doc.setFillColor(...C.white);
        doc.rect(x, cy + 2, cardW, 2, 'F');

        doc.setFont(this.FB, 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...C.inkMuted);
        doc.text(item.label, x + 10, cy + 14);

        doc.setFont(this.FD, 'normal');
        doc.setFontSize(14);
        doc.setTextColor(...C.ink);
        doc.text(this._clean(item.value || '-'), x + 10, cy + 25);
      });

      y += 2 * (cardH + gap) + 6;

      // Visual budget breakdown – horizontal stacked bar
      const vals = items.map(it => {
        const raw = (it.value || '0').match(/[\d.,]+/);
        if (!raw) return 0;
        // German number format: 1.200 = 1200, 1.200,50 = 1200.50
        const cleaned = raw[0].replace(/\./g, '').replace(',', '.');
        const num = parseFloat(cleaned);
        return isNaN(num) ? 0 : num;
      });
      const valTotal = vals.reduce((a, b) => a + b, 0);
      if (valTotal > 0) {
        const barH = 10;
        const barW = this.CW;
        let barX = this.M;
        const barColors = [C.terra, C.teal, C.terraDark, C.tealDark];
        const barLabels = ['Unterkunft', 'Essen', 'Transport', 'Aktivit\u00E4ten'];

        vals.forEach((v, i) => {
          const w = (v / valTotal) * barW;
          if (w > 0) {
            doc.setFillColor(...barColors[i]);
            doc.rect(barX, y, w, barH, 'F');
            if (w > 22) {
              doc.setFont(this.FB, 'normal');
              doc.setFontSize(6);
              doc.setTextColor(...C.white);
              doc.text(barLabels[i], barX + w / 2, y + 6.5, { align: 'center' });
            }
            barX += w;
          }
        });
        // Rounded corners overlay: left + right edge
        doc.setDrawColor(...C.border);
        doc.setLineWidth(0.3);
        doc.roundedRect(this.M, y, this.CW, barH, 3, 3, 'S');

        // Legend
        y += barH + 5;
        let legendX = this.M;
        vals.forEach((v, i) => {
          if (v > 0) {
            const pct = Math.round((v / valTotal) * 100);
            doc.setFillColor(...barColors[i]);
            doc.circle(legendX + 2, y + 1, 1.5, 'F');
            doc.setFont(this.FB, 'normal');
            doc.setFontSize(7);
            doc.setTextColor(...C.inkLight);
            const lt = `${barLabels[i]} ${pct}%`;
            doc.text(lt, legendX + 5, y + 2.5);
            legendX += doc.getTextWidth(lt) + 9;
          }
        });
        y += 10;
      }

      doc.setFillColor(...C.terra);
      doc.roundedRect(this.M, y, this.CW, 20, 4, 4, 'F');
      doc.setFont(this.FD, 'normal');
      doc.setFontSize(15);
      doc.setTextColor(...C.white);
      doc.text('Gesch\u00E4tzt: ' + this._clean(b.total || '-'), this.PW / 2, y + 13, { align: 'center' });
      y += 26;

      doc.setFont(this.FB, 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...C.inkMuted);
      doc.text('Ohne internationale Fl\u00FCge. Preise sind Richtwerte.', this.PW / 2, y, { align: 'center' });
      y += 14;
    }

    // Travel info
    if (result.travelInfo && result.travelInfo.length > 0) {
      this._sec(doc, 'Gut zu wissen', y);
      y += 12;

      for (const info of result.travelInfo) {
        y = await this._checkPage(doc, y, 20, imgs);
        const title = this._clean(info.title || '');
        const text = this._clean(info.text || '');
        const lines = doc.splitTextToSize(text, this.CW - 20);
        const cardH = Math.max(lines.length * 4.3 + 16, 20);

        doc.setFillColor(...C.white);
        doc.roundedRect(this.M, y, this.CW, cardH, 4, 4, 'F');
        doc.setFillColor(...C.terra);
        doc.roundedRect(this.M, y, 3.5, cardH, 1.5, 1.5, 'F');

        doc.setFont(this.FD, 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...C.ink);
        doc.text(title, this.M + 10, y + 9);

        doc.setFont(this.FB, 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...C.inkLight);
        lines.forEach((line, li) => { doc.text(line, this.M + 10, y + 15 + li * 4.3); });

        y += cardH + 8;
      }
    }
  },

  // ═══════════════════════════════════════
  //  PAGE: CREDITS
  // ═══════════════════════════════════════

  async pageCredits(doc, result, imgs) {
    const C = this.C;
    this._bg(doc);
    const cc = CountryConfig.current;
    const brand = cc ? cc.brandName : 'Routaris';

    let y = this.PH / 2 - 45;

    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.3);
    doc.line(this.PW / 2 - 30, y, this.PW / 2 + 30, y);
    y += 12;

    if (imgs.logo) {
      await this._img(doc, imgs.logo, this.PW / 2 - 35, y, 70, 30);
      y += 38;
    }

    doc.setFont(this.FB, 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...C.terra);
    doc.text(brand, this.PW / 2, y, { align: 'center' });
    y += 12;

    doc.setFont(this.FD, 'normal');
    doc.setFontSize(16);
    doc.setTextColor(...C.ink);
    doc.splitTextToSize(this._clean(result.routeName || ''), this.CW).forEach(line => {
      doc.text(line, this.PW / 2, y, { align: 'center' });
      y += 8;
    });
    y += 8;

    const now = new Date();
    doc.setFont(this.FB, 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...C.inkMuted);
    doc.text('Erstellt am ' + now.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }), this.PW / 2, y, { align: 'center' });
    y += 7;
    doc.setFontSize(8);
    doc.text('routaris.com', this.PW / 2, y, { align: 'center' });

    y += 14;
    doc.setDrawColor(...C.border);
    doc.line(this.PW / 2 - 30, y, this.PW / 2 + 30, y);
    y += 8;
    doc.setFontSize(7);
    doc.setTextColor(...C.inkMuted);
    doc.text('Bilder: Wikimedia Commons (CC) | Karten: © OpenStreetMap / © CARTO | KI: Google Gemini', this.PW / 2, y, { align: 'center' });
  },

  // ═══════════════════════════════════════
  //  HELPERS
  // ═══════════════════════════════════════

  _bg(doc) {
    doc.setFillColor(...this.C.cream);
    doc.rect(0, 0, this.PW, this.PH, 'F');
  },

  async _header(doc, imgs) {
    const cc = CountryConfig.current;
    const brand = cc ? cc.brandName : 'Routaris';
    let textX = this.M;

    if (imgs && imgs.logo) {
      const logoH = 6;
      const logoW = (imgs.logo.w / imgs.logo.h) * logoH;
      await this._img(doc, imgs.logo, this.M, 5, logoW, logoH);
      textX = this.M + logoW + 3;
    }

    doc.setFont(this.FB, 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...this.C.inkMuted);
    doc.text(brand, textX, 10);
    doc.setDrawColor(...this.C.border);
    doc.setLineWidth(0.3);
    doc.line(this.M, 12, this.PW - this.M, 12);
  },

  _footer(doc, page, total) {
    const C = this.C;
    const cc = CountryConfig.current;
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.3);
    doc.line(this.M, this.PH - 14, this.PW - this.M, this.PH - 14);
    doc.setFont(this.FB, 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...C.inkMuted);
    doc.text('Routaris' + (cc ? '  |  ' + cc.brandName : '') + '  |  routaris.com', this.M, this.PH - 8);
    doc.text(page + ' / ' + total, this.PW - this.M, this.PH - 8, { align: 'right' });
  },

  _sec(doc, title, y) {
    const C = this.C;
    doc.setFillColor(...C.terra);
    doc.roundedRect(this.M, y + 1, 3, 6, 1, 1, 'F');
    doc.setFont(this.FD, 'normal');
    doc.setFontSize(14);
    doc.setTextColor(...C.ink);
    doc.text(title, this.M + 7, y + 6);
    const tw = doc.getTextWidth(title);
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.3);
    doc.line(this.M + 9 + tw, y + 4, this.PW - this.M, y + 4);
  },

  async _checkPage(doc, y, needed, imgs) {
    if (y + needed > this.PH - 18) {
      doc.addPage();
      this._bg(doc);
      await this._header(doc, imgs);
      return 24;
    }
    return y;
  },

  /**
   * Platziert ein Bild mit "cover"-Modus: füllt den Zielbereich ohne Verzerrung.
   * Akzeptiert { data, w, h } (mit Originaldimensionen) oder plain dataURL (Fallback).
   */
  async _img(doc, imgObj, x, y, w, h) {
    if (!imgObj) return;
    try {
      let data, iw, ih;
      if (typeof imgObj === 'string') {
        data = imgObj; iw = null; ih = null;
      } else {
        data = imgObj.data; iw = imgObj.w; ih = imgObj.h;
      }
      if (!data) return;

      if (iw && ih) {
        // Cover-Crop: Bild proportional zuschneiden um Zielbereich zu füllen
        const targetR = w / h;
        const imgR = iw / ih;
        const cW = Math.round(Math.min(w * 3, 1200));
        const cH = Math.round(cW / targetR);
        const c = document.createElement('canvas');
        c.width = cW; c.height = cH;
        const ctx = c.getContext('2d');

        const img = new Image();
        img.src = data;
        await img.decode();

        let sx, sy, sw, sh;
        if (imgR > targetR) {
          // Bild breiter als Ziel → Seiten abschneiden
          sh = ih; sw = Math.round(ih * targetR);
          sx = Math.round((iw - sw) / 2); sy = 0;
        } else {
          // Bild höher als Ziel → oben/unten abschneiden
          sw = iw; sh = Math.round(iw / targetR);
          sx = 0; sy = Math.round((ih - sh) / 2);
        }
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cW, cH);
        data = c.toDataURL('image/jpeg', 0.8);
      }

      const fmt = data.includes('image/png') ? 'PNG' : 'JPEG';
      doc.addImage(data, fmt, x, y, w, h, undefined, 'FAST');
    } catch (e) { console.warn('[PDF] Bild-Fehler:', e.message); }
  },

  /**
   * Platziert ein Bild mit abgerundeten Ecken (via Canvas-Clipping).
   */
  async _imgRounded(doc, imgObj, x, y, w, h, radius) {
    if (!imgObj) return;
    try {
      let data = typeof imgObj === 'string' ? imgObj : imgObj.data;
      const iw = imgObj.w, ih = imgObj.h;
      if (!data) return;

      const cW = Math.round(Math.min(w * 3, 1200));
      const targetR = w / h;
      const cH = Math.round(cW / targetR);
      const c = document.createElement('canvas');
      c.width = cW; c.height = cH;
      const ctx = c.getContext('2d');

      // Rounded corner clipping
      const cr = radius * (cW / w);
      ctx.beginPath();
      ctx.moveTo(cr, 0);
      ctx.lineTo(cW - cr, 0);
      ctx.quadraticCurveTo(cW, 0, cW, cr);
      ctx.lineTo(cW, cH - cr);
      ctx.quadraticCurveTo(cW, cH, cW - cr, cH);
      ctx.lineTo(cr, cH);
      ctx.quadraticCurveTo(0, cH, 0, cH - cr);
      ctx.lineTo(0, cr);
      ctx.quadraticCurveTo(0, 0, cr, 0);
      ctx.closePath();
      ctx.clip();

      const img = new Image();
      img.src = data;
      await img.decode();

      if (iw && ih) {
        let sx, sy, sw, sh;
        const imgR = iw / ih;
        if (imgR > targetR) {
          sh = ih; sw = Math.round(ih * targetR);
          sx = Math.round((iw - sw) / 2); sy = 0;
        } else {
          sw = iw; sh = Math.round(iw / targetR);
          sx = 0; sy = Math.round((ih - sh) / 2);
        }
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cW, cH);
      } else {
        ctx.drawImage(img, 0, 0, cW, cH);
      }

      doc.addImage(c.toDataURL('image/jpeg', 0.8), 'JPEG', x, y, w, h, undefined, 'FAST');
      // Subtle border
      doc.setDrawColor(...this.C.border);
      doc.setLineWidth(0.3);
      doc.roundedRect(x, y, w, h, radius, radius, 'S');
    } catch {
      await this._img(doc, imgObj, x, y, w, h);
    }
  },

  /**
   * Zeichnet eine Mini-Routenkarte in der Ecke einer Stopp-Seite.
   */
  _drawMiniMap(doc, result, currentIdx) {
    const C = this.C;
    const stops = result.stops;
    if (!stops || stops.length < 2) return;

    const mapW = 34;
    const mapH = 30;
    const mapX = this.PW - this.M - mapW;
    const mapY = 5;

    doc.setFillColor(...C.white);
    doc.roundedRect(mapX, mapY, mapW, mapH, 3, 3, 'F');
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.3);
    doc.roundedRect(mapX, mapY, mapW, mapH, 3, 3, 'S');

    const lats = stops.map(s => s.lat);
    const lngs = stops.map(s => s.lng);
    const minLat = Math.min(...lats), maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
    const padLat = (maxLat - minLat) * 0.2 || 1;
    const padLng = (maxLng - minLng) * 0.2 || 1;

    const toX = lng => mapX + 4 + ((lng - minLng + padLng) / (maxLng - minLng + 2 * padLng)) * (mapW - 8);
    const toY = lat => mapY + mapH - 4 - ((lat - minLat + padLat) / (maxLat - minLat + 2 * padLat)) * (mapH - 8);

    // Route lines
    doc.setDrawColor(...C.border);
    doc.setLineWidth(0.4);
    for (let i = 0; i < stops.length - 1; i++) {
      doc.line(toX(stops[i].lng), toY(stops[i].lat), toX(stops[i + 1].lng), toY(stops[i + 1].lat));
    }

    // Stop dots
    stops.forEach((s, i) => {
      const px = toX(s.lng), py = toY(s.lat);
      if (i === currentIdx) {
        doc.setFillColor(...C.terra);
        doc.circle(px, py, 2.2, 'F');
        doc.setFont(this.FB, 'normal');
        doc.setFontSize(4.5);
        doc.setTextColor(...C.white);
        doc.text(String(i + 1), px, py + 1.1, { align: 'center' });
      } else {
        doc.setFillColor(...C.inkMuted);
        doc.circle(px, py, 1, 'F');
      }
    });
  },

  /**
   * Formatiert Datumsbereich für einen Stopp im PDF.
   * Nutzt kurzes Monatsformat um Platz zu sparen.
   */
  _dateRange(stop, startDay) {
    const opts = { day: 'numeric', month: 'short' };
    if (stop.arrivalDate && stop.departureDate) {
      const arr = new Date(stop.arrivalDate + 'T12:00:00');
      const dep = new Date(stop.departureDate + 'T12:00:00');
      return `${arr.toLocaleDateString('de-DE', opts)} – ${dep.toLocaleDateString('de-DE', opts)}`;
    }
    if (App.state && App.state.arrivalDate) {
      const base = new Date(App.state.arrivalDate + 'T12:00:00');
      const arr = new Date(base);
      arr.setDate(arr.getDate() + startDay - 1);
      const dep = new Date(base);
      dep.setDate(dep.getDate() + startDay - 1 + stop.nights - 1);
      return `${arr.toLocaleDateString('de-DE', opts)} – ${dep.toLocaleDateString('de-DE', opts)}`;
    }
    return `Tag ${startDay} bis ${startDay + stop.nights - 1}`;
  },

  /**
   * Formatiert ein einzelnes Tages-Label im PDF.
   */
  _dayLabel(stop, dayInStop, globalDay) {
    if (stop.arrivalDate) {
      const d = new Date(stop.arrivalDate + 'T12:00:00');
      d.setDate(d.getDate() + dayInStop - 1);
      return d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long' });
    }
    if (App.state && App.state.arrivalDate) {
      const base = new Date(App.state.arrivalDate + 'T12:00:00');
      base.setDate(base.getDate() + globalDay - 1);
      return base.toLocaleDateString('de-DE', { day: 'numeric', month: 'long' });
    }
    return `Tag ${globalDay}`;
  },

  _clean(text) {
    if (!text) return '';
    return text
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu, '')
      .replace(/\s{2,}/g, ' ').trim();
  },

  // ═══════════════════════════════════════
  //  PROGRESS UI
  // ═══════════════════════════════════════

  showProgress(msg, pct) {
    let el = document.getElementById('pdf-progress-modal');
    if (!el) {
      el = document.createElement('div');
      el.id = 'pdf-progress-modal';
      el.className = 'pdf-progress-overlay';
      el.innerHTML = '<div class="pdf-progress-box">' +
        '<div class="pdf-progress-spinner"></div>' +
        '<div class="pdf-progress-title">Erstelle Reisebroschu\u0308re</div>' +
        '<div class="pdf-progress-bar-track"><div class="pdf-progress-bar-fill" id="pdf-bar-fill"></div></div>' +
        '<div class="pdf-progress-msg" id="pdf-bar-msg"></div></div>';
      document.body.appendChild(el);
    }
    el.style.display = 'flex';
    const fill = document.getElementById('pdf-bar-fill');
    if (fill) fill.style.width = pct + '%';
    const m = document.getElementById('pdf-bar-msg');
    if (m) m.textContent = msg;
  },

  hideProgress() {
    const el = document.getElementById('pdf-progress-modal');
    if (el) { el.style.display = 'none'; el.remove(); }
  }
};
