/* ============================================
   SUGGESTIONS.JS – Intelligente Routenvorschläge
   Client-seitige Analyse: Paar-Bonus, Interessen-Match, Nähe
   ============================================ */

const Suggestions = {

  // Cache für aktuelle Vorschläge
  currentSuggestions: [],

  /**
   * Haversine-Distanz in km zwischen zwei Koordinaten
   */
  haversine(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  },

  /**
   * Findet den nächsten Stopp in der Route zu einer Destination
   */
  findNearestStop(dest, stops) {
    let nearest = null;
    let minDist = Infinity;
    for (const stop of stops) {
      const dist = this.haversine(dest.lat, dest.lng, stop.lat, stop.lng);
      if (dist < minDist) {
        minDist = dist;
        nearest = stop;
      }
    }
    return { stop: nearest, distance: minDist };
  },

  /**
   * Sucht passende Transit-Info aus dayTripFrom-Daten
   * @returns Transit-String oder null
   */
  getTransitInfo(dest, partnerCityName) {
    const allDests = CountryConfig.getDestinations();

    // 1. Prüfe ob dest.dayTripFrom eine Basis hat, die zum Partner passt
    if (dest.dayTripFrom) {
      for (const dt of dest.dayTripFrom) {
        const baseDest = allDests.find(d => d.id === dt.base);
        if (baseDest) {
          const baseName = baseDest.name.split('/')[0].trim().toLowerCase();
          const partnerLower = partnerCityName.toLowerCase();
          if (partnerLower.includes(baseName) || baseName.includes(partnerLower)) {
            return dt.transit;
          }
        }
      }
    }

    // 2. Reverse: Prüfe ob der Partner dayTripFrom hat, das auf dest zeigt
    const partnerLower = partnerCityName.toLowerCase();
    for (const d of allDests) {
      const dName = d.name.split('/')[0].trim().toLowerCase();
      if (partnerLower.includes(dName) || dName.includes(partnerLower)) {
        if (d.dayTripFrom) {
          for (const dt of d.dayTripFrom) {
            if (dt.base === dest.id) {
              return dt.transit;
            }
          }
        }
        break;
      }
    }

    return null;
  },

  /**
   * Prüft ob eine Destination zu einer Route-Stadt passt (Paar-Bonus)
   */
  getPairBonus(destId, routeCityIds) {
    const pairs = CountryConfig.getCityPairs();
    const partners = pairs[destId];
    if (!partners) return 0;
    for (const partner of partners) {
      if (routeCityIds.has(partner)) return 30;
    }
    return 0;
  },

  /**
   * Mappt einen Route-Stadtnamen auf eine DESTINATIONS-ID
   */
  matchCityToDestId(cityName) {
    const stripAccents = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const lower = stripAccents(cityName);
    const dests = CountryConfig.getDestinations();
    const dest = dests.find(d => {
      const nameNorm = stripAccents(d.name.split('/')[0].trim());
      return lower.includes(nameNorm) ||
        nameNorm.includes(lower) ||
        d.id === lower ||
        (d.altName && lower.includes(stripAccents(d.altName)));
    });
    return dest ? dest.id : null;
  },

  /**
   * Generiert Vorschläge basierend auf der Route und dem State
   * @returns Array von { dest, nearestStop, reason, extraNights, score, distance }
   */
  generate(result, state) {
    if (!result || !result.stops || result.stops.length === 0) return [];

    // Kapazität prüfen: Wenn kein Platz mehr (max 35 Tage), keine Vorschläge
    if (state.days >= 33) return [];

    // Routenstädte sammeln (als DESTINATIONS-IDs)
    const routeCityIds = new Set();
    for (const stop of result.stops) {
      const id = this.matchCityToDestId(stop.city);
      if (id) routeCityIds.add(id);
    }

    const suggestions = [];

    const allDests = CountryConfig.getDestinations();
    for (const dest of allDests) {
      // Überspringe Ziele die schon in der Route sind
      if (routeCityIds.has(dest.id)) continue;

      // Familie-Check: Wenn Familie mit kleinem Kind, nur familientaugliche Ziele
      if (state.group === 'family' && state.childAge &&
          (state.childAge === '0-1' || state.childAge === '1-3') && !dest.family) {
        continue;
      }

      // Score berechnen
      let score = 0;

      // 1) Paar-Bonus (sehr hoch)
      const pairBonus = this.getPairBonus(dest.id, routeCityIds);
      score += pairBonus;

      // Finde den Partner-Stopp für die Begründung
      let pairPartnerName = null;
      if (pairBonus > 0) {
        const pairs = CountryConfig.getCityPairs();
        const partners = pairs[dest.id];
        for (const partner of partners) {
          if (routeCityIds.has(partner)) {
            const partnerDest = allDests.find(d => d.id === partner);
            pairPartnerName = partnerDest ? partnerDest.name : partner;
            break;
          }
        }
      }

      // 2) Interessen-Match
      const matchScore = Preferences.getMatchScore(dest);
      score += matchScore * 2;

      // 3) Nähe zum nächsten Routenstopp (< 400km = Bonus)
      const { stop: nearestStop, distance } = this.findNearestStop(dest, result.stops);
      if (distance < 200) {
        score += 15;
      } else if (distance < 400) {
        score += 8;
      }

      // 4) Familien-Bonus
      if (state.group === 'family' && dest.family) {
        score += 5;
      }

      // Schwellenwert: Mindest-Score für einen Vorschlag
      if (score < 15) continue;

      // Grund-Text generieren
      let reason = '';
      const topTag = [...dest.tags].sort((a, b) =>
        (state.preferences[b] || 0) - (state.preferences[a] || 0)
      )[0];

      if (pairBonus > 0 && pairPartnerName && distance < 500) {
        const transitInfo = this.getTransitInfo(dest, pairPartnerName);
        if (transitInfo) {
          // Transit-Text enthält manchmal schon "ab X", dann kein "von Partner" nötig
          if (transitInfo.toLowerCase().includes(' ab ')) {
            reason = `${transitInfo} – ${dest.desc}`;
          } else {
            reason = `${transitInfo} von ${pairPartnerName} – ${dest.desc}`;
          }
        } else {
          reason = `Perfekte Ergänzung zu ${pairPartnerName} – ${dest.desc}`;
        }
      } else if (distance < 200 && nearestStop) {
        reason = `Liegt ganz in der Nähe von ${nearestStop.city} – ${dest.desc}`;
      } else if (matchScore >= 10 && topTag) {
        reason = `Passt ideal zu deinem Interesse an ${topTag} – ${dest.desc}`;
      } else {
        reason = dest.desc;
      }

      // Extra-Nächte: 2 Standard, 3 bei längerer Reise
      const extraNights = state.days >= 21 ? 3 : 2;

      suggestions.push({
        dest,
        nearestStop,
        reason,
        extraNights,
        score,
        distance
      });
    }

    // Sortieren nach Score (absteigend) und Top 3 zurückgeben
    suggestions.sort((a, b) => b.score - a.score);
    this.currentSuggestions = suggestions.slice(0, 3);
    return this.currentSuggestions;
  },

  /**
   * Akzeptiert einen Vorschlag und startet Neugenerierung
   */
  accept(index) {
    const suggestion = this.currentSuggestions[index];
    if (!suggestion) return;

    const { dest, nearestStop } = suggestion;
    const result = App.state.result;
    if (!result) return;

    // Bestehende Stopps auflisten, damit die KI weiß was bleiben MUSS
    const existingStops = result.stops.map(s => s.city).join(', ');
    const nearCity = nearestStop ? nearestStop.city : '';

    // Gezielter Adjust-Befehl: bestehende Route erhalten, nur neue Stadt einfügen
    const adjustText = nearCity
      ? `Füge ${dest.name} als neuen Stopp in die Route ein, geographisch sinnvoll in der Nähe von ${nearCity}. `
        + `WICHTIG: Alle bestehenden Stopps (${existingStops}) MÜSSEN erhalten bleiben! `
        + `Entferne KEINEN existierenden Stopp. `
        + `Kürze stattdessen die Nächte bei 1-2 Stopps um jeweils 1 Nacht, um Platz für ${dest.name} (2 Nächte) zu schaffen. `
        + `Die Reihenfolge der bestehenden Stopps bleibt gleich – füge ${dest.name} nur an der geographisch passenden Stelle ein.`
      : `Füge ${dest.name} als neuen Stopp in die Route ein. `
        + `WICHTIG: Alle bestehenden Stopps (${existingStops}) MÜSSEN erhalten bleiben! `
        + `Entferne KEINEN existierenden Stopp. `
        + `Kürze stattdessen die Nächte bei 1-2 Stopps um jeweils 1 Nacht, um Platz für ${dest.name} (2 Nächte) zu schaffen.`;

    // Adjust-Route nutzen statt komplett neu generieren
    App.adjustRoute(adjustText);
  },

  /**
   * Schließt/entfernt einen Vorschlag
   */
  dismiss(index) {
    const container = document.getElementById('suggestions-container');
    if (!container) return;

    const card = container.querySelector(`[data-suggestion-index="${index}"]`);
    if (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateX(20px)';
      setTimeout(() => {
        card.remove();
        // Wenn keine Vorschläge mehr, Section ausblenden
        const remaining = container.querySelectorAll('.suggestion-card');
        if (remaining.length === 0) {
          container.innerHTML = '';
        }
      }, 300);
    }
  }
};
