// ============================================================
// CHANNEL 27 — SIGNAL ENGINE v2 ("the toon layer")
// ============================================================
// There's no real video yet, so every show broadcasts a
// procedural cartoon: little characters with walk cycles,
// blinking eyes, sets and props — all drawn on canvas as a
// pure function of (segment time, segment seed). Because the
// scheduler is deterministic, everyone watching sees the same
// frame at the same moment.
//
// Contributors: add a new style below and reference it from
// shows.js. Everything must depend only on (t, q) — no
// Math.random(), no external state — or viewers desync.
// ============================================================

(function () {
  const C27 = window.C27;
  const TAU = Math.PI * 2;

  // ---------- deterministic helpers ----------
  function strHash(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0) / 4294967296;
  }
  // stable pseudo-random in [0,1) for a given seed + index
  function qGen(seedStr) {
    const s = strHash(seedStr || "static");
    return function q(i) {
      const x = Math.sin(s * 127.1 + i * 311.7 + 0.5) * 43758.5453;
      return x - Math.floor(x);
    };
  }

  function hex(c, a) {
    const r = parseInt(c.slice(1, 3), 16), g = parseInt(c.slice(3, 5), 16), b = parseInt(c.slice(5, 7), 16);
    return a === undefined ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`;
  }
  function shade(c, f) { // f: -1..1 darken/lighten
    let r = parseInt(c.slice(1, 3), 16), g = parseInt(c.slice(3, 5), 16), b = parseInt(c.slice(5, 7), 16);
    const t = f < 0 ? 0 : 255, k = Math.abs(f);
    r = Math.round(r + (t - r) * k); g = Math.round(g + (t - g) * k); b = Math.round(b + (t - b) * k);
    return `rgb(${r},${g},${b})`;
  }

  // ---------- shared painters ----------
  function skyGrad(ctx, w, h, top, bottom, stop) {
    const g = ctx.createLinearGradient(0, 0, 0, h * (stop || 1));
    g.addColorStop(0, top); g.addColorStop(1, bottom);
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }

  function hills(ctx, w, h, t, color, base, amp, speed, ph) {
    ctx.fillStyle = color; ctx.beginPath();
    ctx.moveTo(0, h);
    const off = t * speed;
    for (let x = 0; x <= w; x += 8) {
      const y = h * base + Math.sin((x + off) * 0.008 + ph) * amp + Math.sin((x + off) * 0.021 + ph * 2) * amp * 0.4;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h); ctx.closePath(); ctx.fill();
  }

  function cloud(ctx, x, y, s, color) {
    ctx.fillStyle = color; ctx.beginPath();
    ctx.arc(x, y, s, 0, TAU);
    ctx.arc(x + s * 0.9, y + s * 0.15, s * 0.75, 0, TAU);
    ctx.arc(x - s * 0.9, y + s * 0.2, s * 0.7, 0, TAU);
    ctx.fill();
  }

  function clouds(ctx, w, h, t, q, color, n) {
    for (let i = 0; i < n; i++) {
      const s = 14 + q(i) * 22;
      const x = ((q(i + 10) * w * 2 + t * (6 + q(i + 20) * 10)) % (w + 160)) - 80;
      cloud(ctx, x, h * (0.08 + q(i + 30) * 0.2), s, color);
    }
  }

  function stars(ctx, w, h, t, q, n, color) {
    for (let i = 0; i < n; i++) {
      const tw = 0.5 + 0.5 * Math.sin(t * (1 + q(i) * 2) + q(i + 50) * TAU);
      ctx.fillStyle = hex(color || "#FFFFFF", 0.25 + 0.6 * tw);
      const s = 1 + q(i + 99) * 2;
      ctx.fillRect(q(i) * w, q(i + 33) * h * 0.7, s, s);
    }
  }

  // eyes with periodic blink; ph desynchronizes characters
  function eyes(ctx, x, y, s, t, ph, lookX) {
    const blink = ((t * 0.45 + ph) % 3.3) < 0.09;
    for (const side of [-1, 1]) {
      const ex = x + side * s * 0.42;
      if (blink) {
        ctx.strokeStyle = "#101018"; ctx.lineWidth = Math.max(1.5, s * 0.09);
        ctx.beginPath(); ctx.moveTo(ex - s * 0.22, y); ctx.lineTo(ex + s * 0.22, y); ctx.stroke();
      } else {
        ctx.fillStyle = "#FFFFFF"; ctx.beginPath(); ctx.arc(ex, y, s * 0.26, 0, TAU); ctx.fill();
        ctx.fillStyle = "#101018"; ctx.beginPath();
        ctx.arc(ex + (lookX || 0) * s * 0.1, y + s * 0.03, s * 0.12, 0, TAU); ctx.fill();
      }
    }
  }

  function mouth(ctx, x, y, s, open, smile) {
    ctx.strokeStyle = "#101018"; ctx.lineWidth = Math.max(1.5, s * 0.08);
    if (open > 0.15) {
      ctx.fillStyle = "#5A1020"; ctx.beginPath();
      ctx.ellipse(x, y, s * 0.22, s * (0.08 + 0.2 * open), 0, 0, TAU); ctx.fill();
    } else {
      ctx.beginPath(); ctx.arc(x, y - (smile ? s * 0.1 : 0), s * 0.28, smile ? 0.15 * Math.PI : 1.15 * Math.PI, smile ? 0.85 * Math.PI : 1.85 * Math.PI); ctx.stroke();
    }
  }

  // a walking blob character. dir: +1/-1, walk: 0..1 gait energy
  function critter(ctx, x, y, s, color, t, ph, opts) {
    opts = opts || {};
    const dir = opts.dir || 1, walk = opts.walk === undefined ? 1 : opts.walk;
    const gait = t * 7 + ph * TAU;
    const bounce = walk ? Math.abs(Math.sin(gait)) * s * 0.1 : Math.sin(t * 2 + ph) * s * 0.04;
    const by = y - bounce;
    // legs
    if (walk > 0) {
      ctx.strokeStyle = shade(color, -0.35); ctx.lineWidth = Math.max(2, s * 0.16); ctx.lineCap = "round";
      for (const l of [-1, 1]) {
        const a = Math.sin(gait + (l < 0 ? 0 : Math.PI)) * 0.6 * walk;
        ctx.beginPath();
        ctx.moveTo(x + l * s * 0.25, by + s * 0.55);
        ctx.lineTo(x + l * s * 0.25 + Math.sin(a) * s * 0.45 * dir, by + s * 0.55 + Math.cos(a) * s * 0.45);
        ctx.stroke();
      }
    }
    // body
    ctx.fillStyle = color; ctx.beginPath();
    ctx.ellipse(x, by, s * 0.62, s * 0.7, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = shade(color, -0.45); ctx.lineWidth = Math.max(1.5, s * 0.05); ctx.stroke();
    // belly
    ctx.fillStyle = shade(color, 0.35); ctx.beginPath();
    ctx.ellipse(x, by + s * 0.2, s * 0.34, s * 0.36, 0, 0, TAU); ctx.fill();
    // antenna / hat
    if (opts.antenna) {
      ctx.strokeStyle = shade(color, -0.4); ctx.lineWidth = Math.max(1.5, s * 0.06);
      ctx.beginPath(); ctx.moveTo(x, by - s * 0.66);
      ctx.quadraticCurveTo(x + Math.sin(t * 3 + ph) * s * 0.2, by - s * 1.0, x + Math.sin(t * 3 + ph) * s * 0.3, by - s * 1.05);
      ctx.stroke();
      ctx.fillStyle = opts.antenna; ctx.beginPath();
      ctx.arc(x + Math.sin(t * 3 + ph) * s * 0.3, by - s * 1.05, s * 0.09, 0, TAU); ctx.fill();
    }
    // face
    eyes(ctx, x + dir * s * 0.08, by - s * 0.18, s, t, ph, dir);
    const talk = opts.talk ? Math.max(0, Math.sin(t * 9 + ph * 5)) : 0;
    mouth(ctx, x + dir * s * 0.1, by + s * 0.12, s, talk, true);
    return by;
  }

  function spotlight(ctx, w, h, x, color, a) {
    const g = ctx.createLinearGradient(x, 0, x, h);
    g.addColorStop(0, hex(color, a)); g.addColorStop(1, hex(color, 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x - h * 0.25, h); ctx.lineTo(x + h * 0.25, h);
    ctx.closePath(); ctx.fill();
  }

  // ---------- the styles ----------
  // Each: (ctx, w, h, t, p, q) — p = [bgA, bgB, accent], q = seeded rand
  const STYLES = {

    toon(ctx, w, h, t, p, q) {
      skyGrad(ctx, w, h, shade(p[1], 0.25), hex(p[1]), 0.8);
      // sun
      ctx.fillStyle = hex(p[2], 0.9); ctx.beginPath();
      ctx.arc(w * 0.82, h * 0.16, 26 + Math.sin(t) * 2, 0, TAU); ctx.fill();
      clouds(ctx, w, h, t, q, "rgba(255,255,255,0.8)", 4);
      hills(ctx, w, h, t, shade(p[0], 0.15), 0.62, 18, 12, 1);
      hills(ctx, w, h, t, hex(p[0]), 0.74, 14, 26, 4);
      // ground
      ctx.fillStyle = shade(p[0], -0.2); ctx.fillRect(0, h * 0.84, w, h);
      // a little parade of characters, walking in a loop
      const n = 2 + Math.floor(q(1) * 2);
      for (let i = 0; i < n; i++) {
        const speed = 30 + q(i + 5) * 25;
        const x = ((q(i + 9) * w * 2 + t * speed) % (w + 180)) - 90;
        const s = 26 + q(i + 14) * 22;
        // periodic hop
        const hop = Math.max(0, Math.sin(t * 1.3 + q(i + 22) * TAU)) ** 8 * s * 1.2;
        critter(ctx, x, h * 0.84 - s * 0.55 - hop, s, i % 2 ? hex(p[2]) : shade(p[1], 0.2), t, q(i + 30), { dir: 1, antenna: i % 2 ? null : hex(p[2]) });
      }
      // butterfly
      const bx = w * 0.5 + Math.sin(t * 0.7) * w * 0.35, by = h * 0.3 + Math.sin(t * 1.7) * h * 0.1;
      ctx.fillStyle = hex(p[2], 0.9);
      const flap = Math.abs(Math.sin(t * 10));
      ctx.beginPath(); ctx.ellipse(bx - 4, by, 5 * flap + 1, 6, -0.4, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(bx + 4, by, 5 * flap + 1, 6, 0.4, 0, TAU); ctx.fill();
    },

    preschool(ctx, w, h, t, p, q) {
      skyGrad(ctx, w, h, shade(p[1], 0.5), shade(p[1], 0.15), 0.9);
      // smiling sun
      const sx = w * 0.18, sy = h * 0.18, sr = 30;
      ctx.fillStyle = hex(p[2]); ctx.beginPath(); ctx.arc(sx, sy, sr, 0, TAU); ctx.fill();
      for (let i = 0; i < 10; i++) {
        const a = i / 10 * TAU + t * 0.2;
        ctx.strokeStyle = hex(p[2], 0.8); ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(sx + Math.cos(a) * (sr + 6), sy + Math.sin(a) * (sr + 6));
        ctx.lineTo(sx + Math.cos(a) * (sr + 14), sy + Math.sin(a) * (sr + 14)); ctx.stroke();
      }
      eyes(ctx, sx, sy - 4, sr * 0.8, t, 0.3, 0); mouth(ctx, sx, sy + 10, sr, 0, true);
      hills(ctx, w, h, t * 0.3, shade(p[0], 0.35), 0.68, 20, 6, 2);
      ctx.fillStyle = shade(p[0], 0.15); ctx.fillRect(0, h * 0.82, w, h);
      // one big friendly host character, center, gently talking
      critter(ctx, w * 0.5, h * 0.62, 54, hex(p[2]), t, 0.1, { walk: 0, talk: true, dir: 1 });
      // counting blocks hop by
      for (let i = 0; i < 3; i++) {
        const x = ((i * 140 + t * 35) % (w + 80)) - 40;
        const hop = Math.abs(Math.sin(t * 2.4 + i)) * 16;
        const s = 16;
        ctx.fillStyle = shade(p[1], 0.4); ctx.fillRect(x - s, h * 0.82 - s * 2 - hop, s * 2, s * 2);
        ctx.strokeStyle = shade(p[1], -0.2); ctx.strokeRect(x - s, h * 0.82 - s * 2 - hop, s * 2, s * 2);
        ctx.fillStyle = "#101018"; ctx.font = `bold ${s}px sans-serif`; ctx.textAlign = "center";
        ctx.fillText(String(i + 1), x, h * 0.82 - s * 0.6 - hop);
      }
    },

    space(ctx, w, h, t, p, q) {
      skyGrad(ctx, w, h, hex(p[0]), shade(p[0], -0.4));
      stars(ctx, w, h, t, q, 70, "#FFFFFF");
      // planet with ring
      const px = w * 0.76, py = h * 0.3, pr = 44;
      ctx.fillStyle = hex(p[1]); ctx.beginPath(); ctx.arc(px, py, pr, 0, TAU); ctx.fill();
      ctx.fillStyle = shade(p[1], -0.25);
      ctx.beginPath(); ctx.arc(px - 12, py + 8, 10, 0, TAU); ctx.arc(px + 14, py - 10, 7, 0, TAU); ctx.fill();
      ctx.strokeStyle = hex(p[2], 0.8); ctx.lineWidth = 4;
      ctx.beginPath(); ctx.ellipse(px, py, pr * 1.5, pr * 0.4, -0.3, 0, TAU); ctx.stroke();
      // alien peeking over planet horizon, periodically
      const peek = Math.max(0, Math.sin(t * 0.5 + q(3) * TAU));
      if (peek > 0.3) {
        const ay = py - pr - 8 + (1 - peek) * 26;
        ctx.fillStyle = hex(p[2]); ctx.beginPath(); ctx.arc(px, ay, 12, Math.PI, 0); ctx.fill();
        eyes(ctx, px, ay - 4, 14, t, 0.7, -1);
      }
      // rocket flying a sine path
      const rx = ((t * 55) % (w + 240)) - 120;
      const ry = h * 0.6 + Math.sin(rx * 0.02 + q(7) * TAU) * h * 0.12;
      const ang = Math.atan2(Math.cos(rx * 0.02) * h * 0.12 * 0.02, 1);
      ctx.save(); ctx.translate(rx, ry); ctx.rotate(ang);
      // flame
      const fl = 14 + Math.sin(t * 30) * 5;
      ctx.fillStyle = hex(p[2], 0.9); ctx.beginPath();
      ctx.moveTo(-22, -5); ctx.lineTo(-22 - fl, 0); ctx.lineTo(-22, 5); ctx.closePath(); ctx.fill();
      // body
      ctx.fillStyle = "#E8E8F0"; ctx.beginPath();
      ctx.ellipse(0, 0, 24, 9, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = hex(p[2]); ctx.beginPath(); ctx.arc(10, 0, 5, 0, TAU); ctx.fill(); // window
      ctx.fillStyle = hex(p[1]); ctx.beginPath();
      ctx.moveTo(-20, -6); ctx.lineTo(-28, -14); ctx.lineTo(-16, -4); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-20, 6); ctx.lineTo(-28, 14); ctx.lineTo(-16, 4); ctx.closePath(); ctx.fill();
      ctx.restore();
    },

    sitcom(ctx, w, h, t, p, q) {
      // living room
      ctx.fillStyle = shade(p[0], 0.12); ctx.fillRect(0, 0, w, h);          // wall
      ctx.fillStyle = shade(p[0], -0.25); ctx.fillRect(0, h * 0.72, w, h);  // floor
      // window with night sky
      const wx = w * 0.14, wy = h * 0.14, ww = w * 0.2, wh = h * 0.34;
      ctx.fillStyle = "#0A0F2E"; ctx.fillRect(wx, wy, ww, wh);
      for (let i = 0; i < 12; i++) {
        ctx.fillStyle = hex("#FFFFFF", 0.4 + 0.5 * Math.sin(t * 2 + i));
        ctx.fillRect(wx + q(i) * ww, wy + q(i + 40) * wh, 2, 2);
      }
      ctx.strokeStyle = shade(p[0], 0.45); ctx.lineWidth = 5; ctx.strokeRect(wx, wy, ww, wh);
      ctx.beginPath(); ctx.moveTo(wx + ww / 2, wy); ctx.lineTo(wx + ww / 2, wy + wh);
      ctx.moveTo(wx, wy + wh / 2); ctx.lineTo(wx + ww, wy + wh / 2); ctx.stroke();
      // lamp
      const lx = w * 0.86;
      ctx.strokeStyle = shade(p[0], -0.4); ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(lx, h * 0.72); ctx.lineTo(lx, h * 0.42); ctx.stroke();
      ctx.fillStyle = hex(p[2], 0.95); ctx.beginPath();
      ctx.moveTo(lx - 22, h * 0.42); ctx.lineTo(lx + 22, h * 0.42); ctx.lineTo(lx + 13, h * 0.3); ctx.lineTo(lx - 13, h * 0.3);
      ctx.closePath(); ctx.fill();
      const glow = ctx.createRadialGradient(lx, h * 0.45, 4, lx, h * 0.45, 90);
      glow.addColorStop(0, hex(p[2], 0.18)); glow.addColorStop(1, hex(p[2], 0));
      ctx.fillStyle = glow; ctx.fillRect(lx - 90, h * 0.35 - 90, 180, 180);
      // couch
      const cy = h * 0.6, cw = w * 0.42, cx = w * 0.5 - cw / 2;
      ctx.fillStyle = hex(p[1]);
      ctx.fillRect(cx, cy, cw, h * 0.16);
      ctx.fillRect(cx - 16, cy - 12, 16, h * 0.16 + 12);
      ctx.fillRect(cx + cw, cy - 12, 16, h * 0.16 + 12);
      ctx.fillStyle = shade(p[1], -0.2); ctx.fillRect(cx, cy - 26, cw, 26);
      // two characters on the couch, taking turns talking; laugh beat every ~9s
      const laugh = ((t % 9) < 1.1) ? Math.abs(Math.sin(t * 18)) * 6 : 0;
      const turn = Math.floor(t / 4) % 2;
      critter(ctx, cx + cw * 0.3, cy - 26 - laugh, 30, hex(p[2]), t, 0.2, { walk: 0, talk: turn === 0, dir: 1 });
      critter(ctx, cx + cw * 0.7, cy - 26 - laugh, 30, shade(p[1], 0.45), t, 0.8, { walk: 0, talk: turn === 1, dir: -1 });
    },

    game(ctx, w, h, t, p, q) {
      ctx.fillStyle = hex(p[0]); ctx.fillRect(0, 0, w, h);
      // flashing light grid backdrop
      const cell = 34;
      for (let y = 0; y < h * 0.7; y += cell) for (let x = 0; x < w; x += cell) {
        const on = Math.sin(t * 3 + x * 0.05 + y * 0.09) > 0.55;
        ctx.fillStyle = on ? hex(p[2], 0.55) : hex(p[1], 0.25);
        ctx.beginPath(); ctx.arc(x + cell / 2, y + cell / 2, 4, 0, TAU); ctx.fill();
      }
      spotlight(ctx, w, h, w * (0.5 + 0.35 * Math.sin(t * 0.6)), p[2], 0.14);
      // stage floor
      ctx.fillStyle = shade(p[0], -0.3); ctx.fillRect(0, h * 0.72, w, h);
      // contestant podiums with flipping scores
      for (let i = 0; i < 2; i++) {
        const px = w * (0.22 + i * 0.56), pw = 74;
        ctx.fillStyle = hex(p[1]); ctx.fillRect(px - pw / 2, h * 0.5, pw, h * 0.22);
        ctx.fillStyle = "#101018"; ctx.fillRect(px - pw / 2 + 8, h * 0.53, pw - 16, 26);
        ctx.fillStyle = hex(p[2]); ctx.font = "bold 20px monospace"; ctx.textAlign = "center";
        const score = (Math.floor(t / 3) * 137 + i * 545 + Math.floor(q(i) * 900)) % 9900;
        ctx.fillText(String(score), px, h * 0.53 + 20);
        critter(ctx, px, h * 0.44, 24, i ? shade(p[2], 0.2) : shade(p[1], 0.5), t, 0.3 + i * 0.4, { walk: 0, dir: i ? -1 : 1, talk: false });
      }
      // host at center podium, big gestures
      ctx.fillStyle = shade(p[1], -0.2); ctx.fillRect(w * 0.5 - 46, h * 0.48, 92, h * 0.24);
      ctx.fillStyle = hex(p[2]); ctx.font = "bold 15px monospace"; ctx.textAlign = "center";
      ctx.fillText("27", w * 0.5, h * 0.62);
      const hostY = critter(ctx, w * 0.5, h * 0.4, 30, hex(p[2]), t, 0.05, { walk: 0, talk: true, dir: 1 });
      // waving arm
      const a = Math.sin(t * 4) * 0.7 - 0.6;
      ctx.strokeStyle = shade(p[2], -0.3); ctx.lineWidth = 5; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(w * 0.5 + 18, hostY);
      ctx.lineTo(w * 0.5 + 18 + Math.cos(a) * 26, hostY + Math.sin(a) * 26); ctx.stroke();
    },

    nature(ctx, w, h, t, p, q) {
      skyGrad(ctx, w, h, shade(p[1], 0.2), hex(p[0]), 0.9);
      clouds(ctx, w, h, t * 0.4, q, hex(p[1], 0.35), 3);
      // slow "camera pan" via parallax offsets
      const pan = Math.sin(t * 0.08) * 60;
      hills(ctx, w, h, pan * 0.4, shade(p[0], 0.25), 0.55, 26, 0, 1.4);
      hills(ctx, w, h, pan * 0.8, shade(p[0], 0.05), 0.7, 20, 0, 3.2);
      ctx.fillStyle = shade(p[0], -0.18); ctx.fillRect(0, h * 0.82, w, h);
      // reeds
      for (let i = 0; i < 9; i++) {
        const x = (q(i) * w + pan * 1.2 + w) % w;
        const sway = Math.sin(t * 1.2 + i) * 5;
        ctx.strokeStyle = shade(p[0], -0.32); ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(x, h * 0.86);
        ctx.quadraticCurveTo(x + sway, h * 0.76, x + sway * 1.6, h * 0.7 - q(i + 8) * 14); ctx.stroke();
      }
      // the creature: a segmented snail-ish thing crossing very slowly
      const cx = ((t * 9 + q(2) * w) % (w + 160)) - 80;
      const cy = h * 0.82;
      for (let i = 4; i >= 0; i--) {
        const sx = cx - i * 13, r = 12 - i * 1.4;
        ctx.fillStyle = shade(p[2], -i * 0.08);
        ctx.beginPath(); ctx.arc(sx, cy - r + Math.sin(t * 3 + i) * 1.5, r, 0, TAU); ctx.fill();
      }
      // eye stalks
      ctx.strokeStyle = shade(p[2], -0.3); ctx.lineWidth = 2.5;
      for (const side of [-1, 1]) {
        ctx.beginPath(); ctx.moveTo(cx + 6, cy - 16);
        ctx.lineTo(cx + 10 + side * 5, cy - 28); ctx.stroke();
      }
      eyes(ctx, cx + 10, cy - 30, 12, t, 0.6, 1);
      // drifting pollen
      for (let i = 0; i < 14; i++) {
        ctx.fillStyle = hex(p[2], 0.3 + 0.3 * Math.sin(t + i));
        ctx.fillRect((q(i + 60) * w + t * 12) % w, (q(i + 70) * h + Math.sin(t + i) * 8) % h, 2, 2);
      }
    },

    cooking(ctx, w, h, t, p, q) {
      ctx.fillStyle = shade(p[0], 0.1); ctx.fillRect(0, 0, w, h);
      // tile backsplash
      ctx.strokeStyle = shade(p[0], 0.25); ctx.lineWidth = 1.5;
      for (let y = 0; y < h * 0.55; y += 26) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      for (let x = 0; x < w; x += 34) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h * 0.55); ctx.stroke(); }
      // counter
      ctx.fillStyle = shade(p[1], -0.1); ctx.fillRect(0, h * 0.62, w, h);
      ctx.fillStyle = shade(p[1], 0.15); ctx.fillRect(0, h * 0.62, w, 10);
      // chef behind counter, stirring
      const chefX = w * 0.32;
      critter(ctx, chefX, h * 0.5, 34, hex(p[2]), t, 0.15, { walk: 0, talk: ((t % 6) < 3), dir: 1 });
      // chef hat
      ctx.fillStyle = "#F4F4F8";
      ctx.fillRect(chefX - 15, h * 0.5 - 52, 30, 12);
      ctx.beginPath(); ctx.arc(chefX - 8, h * 0.5 - 54, 9, 0, TAU); ctx.arc(chefX + 2, h * 0.5 - 58, 10, 0, TAU); ctx.arc(chefX + 11, h * 0.5 - 53, 8, 0, TAU); ctx.fill();
      // stirring arm + spoon
      const sa = t * 5;
      const potX = w * 0.62, potY = h * 0.6;
      ctx.strokeStyle = shade(p[2], -0.3); ctx.lineWidth = 5; ctx.lineCap = "round";
      const hx = potX - 26 + Math.cos(sa) * 10, hy = potY - 34 + Math.sin(sa) * 4;
      ctx.beginPath(); ctx.moveTo(chefX + 20, h * 0.52); ctx.lineTo(hx, hy); ctx.stroke();
      ctx.strokeStyle = "#8A5A2B"; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + 8, hy + 16); ctx.stroke();
      // pot with rattling lid
      ctx.fillStyle = "#3A3A46"; ctx.fillRect(potX - 40, potY - 26, 80, 30);
      ctx.fillStyle = "#2C2C36"; ctx.fillRect(potX - 46, potY - 26, 6, 8); ctx.fillRect(potX + 40, potY - 26, 6, 8);
      const rattle = Math.abs(Math.sin(t * 11)) * 3;
      ctx.fillStyle = "#4A4A58"; ctx.beginPath();
      ctx.ellipse(potX, potY - 28 - rattle, 42, 7, 0, 0, TAU); ctx.fill();
      // steam curls
      for (let i = 0; i < 3; i++) {
        const ph = t * 1.3 + i * 2.1;
        ctx.strokeStyle = hex("#FFFFFF", 0.35 - ((ph % 2) / 2) * 0.3); ctx.lineWidth = 4;
        const sy = potY - 34 - (ph % 2) * 46;
        const sx2 = potX - 16 + i * 16 + Math.sin(ph * 2) * 7;
        ctx.beginPath(); ctx.moveTo(sx2, sy + 18); ctx.quadraticCurveTo(sx2 + 8, sy + 8, sx2, sy); ctx.stroke();
      }
      // ingredient hopping into the pot every few seconds
      const cyc = (t % 4) / 4;
      if (cyc < 0.5) {
        const ix = potX - 120 + cyc * 2 * 120;
        const iy = potY - 30 - Math.sin(cyc * 2 * Math.PI) * 70;
        ctx.fillStyle = hex(p[2]); ctx.beginPath(); ctx.arc(ix, iy, 7, 0, TAU); ctx.fill();
      }
    },

    news(ctx, w, h, t, p, q) {
      ctx.fillStyle = hex(p[0]); ctx.fillRect(0, 0, w, h);
      // spinning wireframe globe backdrop
      const gx = w * 0.78, gy = h * 0.3, gr = 52;
      ctx.strokeStyle = hex(p[2], 0.5); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(gx, gy, gr, 0, TAU); ctx.stroke();
      for (let i = 0; i < 4; i++) {
        const ph = (t * 0.5 + i / 4) % 1;
        const rx = Math.abs(Math.cos(ph * Math.PI)) * gr;
        ctx.beginPath(); ctx.ellipse(gx, gy, Math.max(0.5, rx), gr, 0, 0, TAU); ctx.stroke();
      }
      for (let i = 1; i < 3; i++) {
        ctx.beginPath(); ctx.ellipse(gx, gy, gr, gr, 0, 0, TAU);
        ctx.beginPath(); ctx.ellipse(gx, gy, gr * Math.cos(i * 0.5), gr * Math.cos(i * 0.5), 0, 0, TAU);
      }
      // desk
      ctx.fillStyle = shade(p[1], -0.15); ctx.fillRect(0, h * 0.6, w, h);
      ctx.fillStyle = shade(p[1], 0.05);
      ctx.beginPath(); ctx.moveTo(0, h * 0.6); ctx.lineTo(w, h * 0.6); ctx.lineTo(w * 0.9, h * 0.75); ctx.lineTo(w * 0.1, h * 0.75); ctx.closePath(); ctx.fill();
      // anchor: head+shoulders, blinking, shuffles papers every ~7s
      const ax = w * 0.38;
      ctx.fillStyle = shade(p[1], 0.3);
      ctx.beginPath(); ctx.ellipse(ax, h * 0.62, 52, 30, 0, Math.PI, 0); ctx.fill(); // shoulders
      ctx.fillStyle = hex(p[2]);
      ctx.beginPath(); ctx.arc(ax, h * 0.47, 26, 0, TAU); ctx.fill(); // head
      eyes(ctx, ax, h * 0.455, 28, t, 0.4, 0);
      mouth(ctx, ax, h * 0.5, 26, Math.max(0, Math.sin(t * 8)) * 0.7, false);
      const shuffle = ((t % 7) < 0.8) ? Math.sin(t * 25) * 3 : 0;
      ctx.fillStyle = "#F0F0E8";
      ctx.save(); ctx.translate(ax + 60, h * 0.61); ctx.rotate(shuffle * 0.05);
      ctx.fillRect(-14, -9, 28, 18); ctx.restore();
      // lower-third + ticker
      ctx.fillStyle = hex(p[2], 0.92); ctx.fillRect(0, h * 0.78, w, 8);
      ctx.fillStyle = "#101018"; ctx.fillRect(0, h * 0.86, w, h * 0.14);
      ctx.fillStyle = hex(p[2], 0.85);
      for (let i = 0; i < 8; i++) {
        const bw = 40 + q(i) * 70;
        const x = w - ((t * 45 + i * 130) % (w + 220));
        ctx.fillRect(x, h * 0.9, bw, 7);
      }
    },

    music(ctx, w, h, t, p, q) {
      ctx.fillStyle = hex(p[0]); ctx.fillRect(0, 0, w, h);
      // strobe wash
      if (Math.sin(t * 6) > 0.93) { ctx.fillStyle = hex(p[2], 0.08); ctx.fillRect(0, 0, w, h); }
      // equalizer skyline
      const bars = 24;
      for (let i = 0; i < bars; i++) {
        const bh = (0.25 + 0.7 * Math.abs(Math.sin(t * (2.4 + q(i) * 3) + i))) * h * 0.4;
        ctx.fillStyle = hex(i % 3 === 0 ? p[2] : p[1], 0.75);
        ctx.fillRect(i * (w / bars) + 2, h * 0.55 - bh, w / bars - 4, bh);
      }
      // stage
      ctx.fillStyle = shade(p[0], -0.3); ctx.fillRect(0, h * 0.62, w, h);
      spotlight(ctx, w, h, w * (0.5 + 0.3 * Math.sin(t * 1.3)), p[2], 0.16);
      // performer with mic, bouncing to the beat
      const beat = Math.abs(Math.sin(t * 3.5));
      const py = h * 0.52 - beat * 10;
      critter(ctx, w * 0.5, py, 32, hex(p[2]), t, 0.5, { walk: 0, talk: true, dir: 1 });
      ctx.strokeStyle = shade(p[2], -0.35); ctx.lineWidth = 5; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(w * 0.5 + 18, py + 4); ctx.lineTo(w * 0.5 + 34, py - 10); ctx.stroke();
      ctx.fillStyle = "#22222C"; ctx.beginPath(); ctx.arc(w * 0.5 + 37, py - 13, 6, 0, TAU); ctx.fill();
      // bouncing crowd silhouettes
      for (let i = 0; i < 10; i++) {
        const cx = (i + 0.5) * (w / 10);
        const jump = Math.abs(Math.sin(t * 3.5 + q(i) * TAU)) * 12;
        ctx.fillStyle = "rgba(6,6,12,0.92)";
        ctx.beginPath(); ctx.arc(cx, h * 0.9 - jump, 13, Math.PI, 0); ctx.fill();
        ctx.fillRect(cx - 13, h * 0.9 - jump, 26, h);
      }
    },

    latenight(ctx, w, h, t, p, q) {
      // slow morphing gradients
      const g = ctx.createRadialGradient(
        w * (0.5 + 0.25 * Math.sin(t * 0.21)), h * (0.5 + 0.25 * Math.cos(t * 0.17)), 10,
        w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
      g.addColorStop(0, hex(p[1])); g.addColorStop(1, hex(p[0]));
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      // tumbling drum (the laundromat of the mind)
      const dx = w * 0.5, dy = h * 0.52, dr = Math.min(w, h) * 0.22;
      ctx.strokeStyle = hex(p[2], 0.55); ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(dx, dy, dr, 0, TAU); ctx.stroke();
      ctx.save(); ctx.beginPath(); ctx.arc(dx, dy, dr - 6, 0, TAU); ctx.clip();
      for (let i = 0; i < 5; i++) {
        const a = t * 1.4 + i * (TAU / 5);
        const rr = dr * (0.25 + 0.35 * ((i * 53) % 3) / 2);
        ctx.save();
        ctx.translate(dx + Math.cos(a) * rr, dy + Math.sin(a) * rr);
        ctx.rotate(a * 2);
        ctx.fillStyle = hex(i % 2 ? p[2] : p[1], 0.5);
        ctx.fillRect(-10, -10, 20, 20);
        ctx.restore();
      }
      ctx.restore();
      // a single enormous eye drifts by, rarely, and blinks
      const cyc = (t * 0.04 + q(4)) % 1;
      if (cyc > 0.75) {
        const ex = w * ((cyc - 0.75) / 0.25), ey = h * 0.2;
        eyes(ctx, ex, ey, 60, t, 0.9, Math.sin(t * 0.5));
      }
      // drifting motes
      for (let i = 0; i < 12; i++) {
        ctx.fillStyle = hex(p[2], 0.2 + 0.2 * Math.sin(t + i * 2));
        ctx.beginPath();
        ctx.arc((q(i) * w + t * (4 + q(i + 5) * 8)) % w, (q(i + 20) * h + Math.sin(t * 0.4 + i) * 24 + h) % h, 2.5, 0, TAU);
        ctx.fill();
      }
    },

    movie(ctx, w, h, t, p, q) {
      skyGrad(ctx, w, h, shade(p[0], -0.25), hex(p[0]));
      stars(ctx, w, h, t, q, 40, "#FFFFFF");
      // huge moon, slow drift
      const mx = w * 0.7 + Math.sin(t * 0.05) * 12, my = h * 0.3;
      ctx.fillStyle = shade(p[2], 0.25); ctx.beginPath(); ctx.arc(mx, my, 58, 0, TAU); ctx.fill();
      ctx.fillStyle = hex(p[2], 0.35);
      ctx.beginPath(); ctx.arc(mx - 18, my + 6, 9, 0, TAU); ctx.arc(mx + 16, my - 14, 6, 0, TAU); ctx.fill();
      // hill with two silhouettes facing each other; slow dolly zoom
      const zoom = 1 + 0.06 * Math.sin(t * 0.09);
      ctx.save(); ctx.translate(w / 2, h); ctx.scale(zoom, zoom); ctx.translate(-w / 2, -h);
      hills(ctx, w, h, 0, "#05050C", 0.72, 30, 0, 2.2);
      for (const side of [-1, 1]) {
        const sx = w * 0.5 + side * 60, sy = h * 0.68 + Math.sin(t * 0.8 + side) * 2;
        ctx.fillStyle = "#05050C";
        ctx.beginPath(); ctx.arc(sx, sy - 26, 11, 0, TAU); ctx.fill();
        ctx.fillRect(sx - 9, sy - 20, 18, 34);
      }
      ctx.restore();
      // searchlights
      for (let i = 0; i < 2; i++) {
        spotlight(ctx, w, h, w * (0.3 + i * 0.4 + 0.12 * Math.sin(t * 0.5 + i * 2)), p[2], 0.07);
      }
      // letterbox
      ctx.fillStyle = "#000"; ctx.fillRect(0, 0, w, h * 0.1); ctx.fillRect(0, h * 0.9, w, h * 0.1);
    },

    infomercial(ctx, w, h, t, p, q) {
      ctx.fillStyle = hex(p[0]); ctx.fillRect(0, 0, w, h);
      // rotating starburst behind the pedestal
      ctx.save(); ctx.translate(w * 0.5, h * 0.48); ctx.rotate(t * 0.25);
      for (let i = 0; i < 12; i++) {
        ctx.rotate(TAU / 12);
        ctx.fillStyle = hex(p[2], i % 2 ? 0.1 : 0.05);
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w, -w * 0.13); ctx.lineTo(w, w * 0.13); ctx.closePath(); ctx.fill();
      }
      ctx.restore();
      // pedestal
      ctx.fillStyle = shade(p[0], 0.25);
      ctx.beginPath(); ctx.moveTo(w * 0.4, h * 0.86); ctx.lineTo(w * 0.6, h * 0.86); ctx.lineTo(w * 0.57, h * 0.62); ctx.lineTo(w * 0.43, h * 0.62); ctx.closePath(); ctx.fill();
      ctx.fillStyle = shade(p[0], 0.4);
      ctx.beginPath(); ctx.ellipse(w * 0.5, h * 0.62, w * 0.07, 8, 0, 0, TAU); ctx.fill();
      // THE PRODUCT: a gently bobbing, slowly rotating box
      const bob = Math.sin(t * 1.6) * 7;
      ctx.save(); ctx.translate(w * 0.5, h * 0.5 + bob); ctx.rotate(Math.sin(t * 0.8) * 0.12);
      ctx.fillStyle = hex(p[2]); ctx.fillRect(-34, -26, 68, 52);
      ctx.fillStyle = shade(p[2], 0.4); ctx.fillRect(-34, -26, 68, 12);
      ctx.fillStyle = "#101018"; ctx.font = "bold 13px monospace"; ctx.textAlign = "center";
      ctx.fillText("WOW!", 0, 8);
      ctx.restore();
      // sparkles
      for (let i = 0; i < 10; i++) {
        const ph = (t * (0.7 + q(i) * 0.6) + q(i + 30)) % 1;
        const s = (1 - ph) * 6;
        const sx = w * (0.3 + q(i + 60) * 0.4), sy = h * (0.3 + q(i + 90) * 0.4);
        ctx.strokeStyle = hex("#FFFFFF", 1 - ph); ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(sx - s, sy); ctx.lineTo(sx + s, sy);
        ctx.moveTo(sx, sy - s); ctx.lineTo(sx, sy + s); ctx.stroke();
      }
      // price tag swinging in the corner
      ctx.save(); ctx.translate(w * 0.82, h * 0.2); ctx.rotate(Math.sin(t * 2) * 0.15);
      ctx.fillStyle = hex(p[2]); ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(58, -14); ctx.lineTo(58, 14); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#101018"; ctx.font = "bold 12px monospace";
      ctx.fillText("$19.99", 30, 4);
      ctx.restore();
    }
  };

  // ---------- API ----------
  const qCache = { key: null, q: null };

  function draw(ctx, w, h, t, style, palette, seedStr) {
    const key = (seedStr || "") + "|" + style;
    if (qCache.key !== key) { qCache.key = key; qCache.q = qGen(key); }
    const fn = STYLES[style] || STYLES.toon;
    ctx.save();
    fn(ctx, w, h, t, palette, qCache.q);
    ctx.restore();
  }

  function drawStatic(ctx, w, h) {
    const img = ctx.createImageData(w, h);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }

  C27.ambient = { draw, drawStatic, styles: Object.keys(STYLES) };
})();
