// ============================================================
// CHANNEL 27 CABLE SYSTEM — RENDERER
// ============================================================
// Ticks the clock, asks the scheduler what's airing on the
// active channel, and paints the tube. The only state that
// survives a refresh: which channel you're on, and your
// sound / caption / effects preferences. Never your position
// in a program — the broadcast doesn't wait for anyone.
// ============================================================

(function () {
  const C27 = window.C27;
  const $ = sel => document.querySelector(sel);

  const els = {
    tv: $("#tv"),
    screen: $("#screen"),
    canvas: $("#signal"),
    staticCanvas: $("#staticfx"),
    overlay: $("#overlay"),
    caption: $("#caption"),
    ccNote: $("#cc-note"),
    signalNote: $("#signal-note"),
    ratingBug: $("#rating-bug"),
    chBug: $("#channel-bug"),
    osd: $("#osd"),
    announcer: $("#announcer"),
    infobar: $("#infobar"),
    infoNow: $("#info-now"),
    infoRemain: $("#info-remain"),
    infoNext: $("#info-next"),
    clock: $("#clock"),
    guide: $("#guide"),
    guideList: $("#guide-list"),
    guideClock: $("#guide-clock"),
    guideBtn: $("#guide-btn"),
    guideClose: $("#guide-close"),
    tabNow: $("#gtab-now"),
    tabList: $("#gtab-list")
  };

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- preferences (localStorage) ----------
  function loadPref(key, dflt) {
    try { const v = localStorage.getItem("c27." + key); return v === null ? dflt : v === "1"; }
    catch (e) { return dflt; }
  }
  function savePref(key, val) {
    try { localStorage.setItem("c27." + key, val ? "1" : "0"); } catch (e) { /* private mode */ }
  }
  const prefs = {
    sound: false,                                  // always starts off
    cc: loadPref("cc", true),
    crt: loadPref("crt", true),
    calm: loadPref("calm", reducedMotion)          // reduce flashing
  };

  function applyEffectPrefs() {
    els.screen.classList.toggle("no-crt", !prefs.crt);
    document.body.classList.toggle("calm", prefs.calm);
    els.caption.classList.toggle("cc-off", !prefs.cc);
    if (C27.youtube) C27.youtube.setCaptionsEnabled(prefs.cc);
  }

  // ---------- channel state ----------
  const CHANNELS = (C27.CHANNELS || []).slice().sort((a, b) => a.number - b.number);
  function channelById(id) { return CHANNELS.find(c => c.id === id); }
  function channelByNumber(n) { return CHANNELS.find(c => c.number === n); }

  let activeCh = (function () {
    try {
      const saved = localStorage.getItem("c27.channel");
      if (saved && channelById(saved)) return saved;
    } catch (e) { /* fine */ }
    return C27.DEFAULT_CHANNEL || CHANNELS[0].id;
  })();

  function announce(text) {
    els.announcer.textContent = "";
    // swap forces SRs to re-read even if text repeats
    setTimeout(() => { els.announcer.textContent = text; }, 30);
  }

  function applyChannelIdentity() {
    const ch = channelById(activeCh);
    els.chBug.textContent = ch.bugText;
    document.documentElement.style.setProperty("--ch-accent", ch.palette[1]);
    document.documentElement.style.setProperty("--ch-accent-2", ch.palette[2]);
  }

  function setChannel(chId, opts) {
    opts = opts || {};
    if (!channelById(chId) || (chId === activeCh && !opts.force)) return;
    activeCh = chId;
    try { localStorage.setItem("c27.channel", chId); } catch (e) { /* fine */ }
    const ch = channelById(chId);
    applyChannelIdentity();
    lastSegKey = null;                 // force overlay rebuild this tick
    triggerStatic(prefs.calm ? 140 : 480);
    if (!opts.silent) C27.audio.pop(true);
    flashOSD("CH " + ch.number);
    const st = update();
    announce(`Channel ${ch.number}, ${ch.name}. Now: ${st.show.title}. Next: ${st.nextShow.title}.`);
    showInfo();
  }

  function channelStep(dir) {
    const i = CHANNELS.findIndex(c => c.id === activeCh);
    const next = CHANNELS[(i + dir + CHANNELS.length) % CHANNELS.length];
    setChannel(next.id);
  }

  // ---------- number entry ----------
  let numBuf = "";
  let numTimer = null;
  function numberKey(d) {
    numBuf += d;
    flashOSD("CH " + numBuf + (numBuf.length < 2 ? "–" : ""), 2600);
    clearTimeout(numTimer);
    if (numBuf.length >= 2) { numTimer = setTimeout(commitNumber, 350); }
    else numTimer = setTimeout(commitNumber, 2400);
  }
  function commitNumber() {
    clearTimeout(numTimer);
    if (!numBuf) return;
    const n = parseInt(numBuf, 10);
    numBuf = "";
    const ch = channelByNumber(n);
    if (ch) setChannel(ch.id, { force: true });
    else {
      flashOSD("CH " + n + " · ·", 1400);   // dead air up there
      C27.audio.pop();
    }
  }

  // ---------- OSD ----------
  let osdTimer = null;
  function flashOSD(text, ms) {
    els.osd.textContent = text;
    els.osd.classList.add("show");
    clearTimeout(osdTimer);
    osdTimer = setTimeout(() => els.osd.classList.remove("show"), ms || 2600);
  }

  // ---------- canvas setup ----------
  const ctx = els.canvas.getContext("2d");
  const sctx = els.staticCanvas.getContext("2d");
  els.staticCanvas.width = 160; els.staticCanvas.height = 120;
  sctx.imageSmoothingEnabled = false;

  function sizeCanvas() {
    const r = els.screen.getBoundingClientRect();
    const scale = Math.min(window.devicePixelRatio || 1, 1.5);
    els.canvas.width = Math.max(320, r.width * scale * 0.6);
    els.canvas.height = Math.max(240, r.height * scale * 0.6);
  }
  window.addEventListener("resize", sizeCanvas);
  sizeCanvas();

  // ---------- helpers ----------
  function fmtTime(d) {
    let h = d.getHours(); const m = d.getMinutes();
    const ap = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${String(m).padStart(2, "0")} ${ap}`;
  }
  function fmtRemain(sec) {
    sec = Math.max(0, Math.round(sec));
    const m = Math.floor(sec / 60), s = sec % 60;
    if (m >= 60) return `${Math.floor(m / 60)}h ${m % 60}m left`;
    if (m > 0) return `${m} min left`;
    return `${s}s left`;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  // ---------- static transition ----------
  let staticUntil = 0;
  function triggerStatic(ms) {
    if (reducedMotion && !prefs.calm) { /* reducedMotion implies calm default */ }
    if (reducedMotion || prefs.calm) ms = Math.min(ms || 380, 140);
    staticUntil = performance.now() + (ms || 380);
    els.staticCanvas.classList.add("on");
  }

  // ---------- overlay builders ----------
  function buildContentOverlay(state) {
    const { show, episode } = state;
    els.overlay.innerHTML = `
      <div class="titlecard" style="--a:${show.palette[2]}">
        <div class="tc-genre">${esc(show.genre)}</div>
        <div class="tc-title">${esc(show.title)}</div>
        <div class="tc-ep">"${esc(episode.title)}"</div>
      </div>
      <div class="returncard" style="--a:${show.palette[2]}">${esc(show.title)}</div>`;
  }

  function buildCommercialOverlay(seg) {
    const c = seg.commercial;
    els.overlay.innerHTML = `
      <div class="ad" style="--a:${c.palette[1]};--b:${c.palette[0]}">
        <div class="ad-product">${esc(c.product)}</div>
        <div class="ad-line" id="ad-line"></div>
        <div class="ad-tagline">${esc(c.tagline)}</div>
        <div class="ad-fine">${esc(c.fine || "")}</div>
      </div>`;
  }

  function buildBumperOverlay(seg, state) {
    const ch = channelById(activeCh);
    const b = seg.bumper;
    const lines = b.lines.map(l => l.replace("{SHOW}", state.nextShow.title));
    const pal = b.palette;
    const style = pal ? `style="--bump-bg:${pal[0]};--bump-glow:${pal[1]};--bump-accent:${pal[2]}"` : "";
    const logo = activeCh === "channel-27"
      ? `CH<span>27</span>`
      : `${esc(ch.shortName)}<span>${ch.number}</span>`;
    els.overlay.innerHTML = `
      <div class="bumper" ${style}>
        ${lines.map((l, i) => `<div class="bump-line ${i === 0 ? "big" : ""}">${esc(l)}</div>`).join("")}
        <div class="bump-logo">${logo}</div>
      </div>`;
  }

  // ---------- per-tick updates ----------
  let lastSegKey = null;
  let lastCaptionIdx = -1;
  let lastAdLineIdx = -1;
  let lastGuideMin = -1;
  let ccNoteShownFor = null;

  function update() {
    const state = C27.scheduler.broadcastState(new Date(), activeCh);
    const { seg } = state;

    // Segment changed → static pop + rebuild overlay
    if (state.segKey !== lastSegKey) {
      const firstTick = lastSegKey === null;
      lastSegKey = state.segKey;
      lastCaptionIdx = -1; lastAdLineIdx = -1;
      triggerStatic(seg.type === "content" && seg.contentBefore === 0 ? 520 : 340);
      if (!firstTick) {
        C27.audio.pop(seg.type === "content" && seg.contentBefore === 0);
        if (seg.type === "bumper") C27.audio.stinger();
      }
      els.screen.dataset.mode = seg.type;
      if (seg.type === "content") buildContentOverlay(state);
      else if (seg.type === "commercial") buildCommercialOverlay(seg);
      else buildBumperOverlay(seg, state);
      els.caption.textContent = "";
    }

    // media controller: local tape / youtube / procedural
    const mediaStatus = C27.mediactl.sync(state, prefs);

    // standby notice when declared media can't play
    const showSignalNote = mediaStatus === "failed" && seg.type === "content" && state.segElapsed < 8;
    els.signalNote.classList.toggle("show", showSignalNote);

    // "CC unavailable" notice: captions on, video playing, no captions on it
    const wantCcNote = prefs.cc && mediaStatus === "video" &&
      state.media && state.media.provider === "youtube" && !state.media.captions;
    if (wantCcNote && ccNoteShownFor !== state.segKey) {
      ccNoteShownFor = state.segKey;
      els.ccNote.classList.add("show");
      setTimeout(() => els.ccNote.classList.remove("show"), 4000);
    }

    if (seg.type === "content") {
      const isShowStart = seg.contentBefore === 0;
      const tc = els.overlay.querySelector(".titlecard");
      const rc = els.overlay.querySelector(".returncard");
      if (tc) tc.classList.toggle("show", isShowStart && state.segElapsed < 8);
      if (rc) rc.classList.toggle("show", !isShowStart && state.segElapsed < 4);

      // rating bug for the first 20s of a show
      els.ratingBug.textContent = state.show.rating;
      els.ratingBug.classList.toggle("show", isShowStart && state.segElapsed > 1 && state.segElapsed < 20);

      // captions progress across breaks (procedural dialogue)
      const contentElapsed = seg.contentBefore + state.segElapsed;
      const scenes = state.episode.scenes;
      const hideForTitle = isShowStart && state.segElapsed < 8;
      const idx = Math.floor(contentElapsed / 13) % scenes.length;
      if (!hideForTitle && idx !== lastCaptionIdx) {
        lastCaptionIdx = idx;
        els.caption.textContent = scenes[idx];
        els.caption.classList.remove("pop"); void els.caption.offsetWidth;
        els.caption.classList.add("pop");
      }
      // hide procedural captions while real footage is playing (it has its own)
      const hideCaption = hideForTitle || !prefs.cc || mediaStatus === "video";
      els.caption.style.visibility = hideCaption ? "hidden" : "visible";
    } else {
      els.ratingBug.classList.remove("show");
      els.caption.style.visibility = "hidden";
      if (seg.type === "commercial") {
        const c = seg.commercial;
        const per = Math.max(2.5, seg.dur / c.lines.length);
        const idx = Math.min(c.lines.length - 1, Math.floor(state.segElapsed / per));
        if (idx !== lastAdLineIdx) {
          lastAdLineIdx = idx;
          const lineEl = $("#ad-line");
          if (lineEl) {
            lineEl.textContent = c.lines[idx];
            lineEl.classList.remove("pop"); void lineEl.offsetWidth;
            lineEl.classList.add("pop");
          }
        }
      }
    }

    // info bar
    const ch = channelById(activeCh);
    els.infoNow.innerHTML =
      `<span class="ib-ch">${ch.number}</span> <span class="label">NOW</span> ${esc(state.show.title)} <span class="dim">— "${esc(state.episode.title)}"</span>`;
    els.infoRemain.textContent = fmtRemain(state.blockRemaining);
    els.infoNext.innerHTML =
      `<span class="label">NEXT</span> ${esc(state.nextShow.title)} <span class="dim">${fmtTime(state.next.start)}</span>`;
    els.clock.textContent = fmtTime(state.now);

    // guide (refresh once per minute while open)
    if (!els.guide.hidden) {
      els.guideClock.textContent = fmtTime(state.now);
      const min = state.now.getMinutes();
      if (min !== lastGuideMin) { lastGuideMin = min; renderGuide(new Date()); }
    }

    return state;
  }

  // ---------- render loop ----------
  let lastState = null;
  let lastTickAt = 0;
  let lastFrame = performance.now();
  let rafId = null;

  function frame(nowMs) {
    rafId = requestAnimationFrame(frame);
    lastFrame = nowMs;

    if (nowMs - lastTickAt > 200 || !lastState) {
      lastTickAt = nowMs;
      lastState = update();
    }

    // ambient signal — the procedural broadcast. Runs on segment-elapsed
    // time so the picture itself is synchronized across viewers. Always
    // rendered; external media simply covers it when playing.
    const seg = lastState.seg;
    let style, palette;
    if (seg.type === "commercial") {
      style = "infomercial"; palette = [seg.commercial.palette[0], seg.commercial.palette[0], seg.commercial.palette[1]];
    } else if (seg.type === "bumper") {
      const bp = seg.bumper.palette;
      style = "latenight";
      palette = bp ? [bp[0], bp[1], bp[2]] : ["#0B0B14", "#1D1160", "#FFC24B"];
    } else {
      style = lastState.show.style; palette = lastState.show.palette;
      // a failed tape may declare its own standby look
      if (C27.mediactl.status === "failed" && lastState.media && lastState.media.fallbackStyle) {
        style = lastState.media.fallbackStyle;
      }
    }
    const syncT = (lastState.segElapsed + (nowMs - lastTickAt) / 1000) * (reducedMotion ? 0.25 : 1);
    C27.ambient.draw(ctx, els.canvas.width, els.canvas.height, syncT, style, palette, lastState.segKey);

    // static overlay
    if (performance.now() < staticUntil) {
      C27.ambient.drawStatic(sctx, 160, 120);
    } else if (els.staticCanvas.classList.contains("on")) {
      els.staticCanvas.classList.remove("on");
    }
  }

  // pause rendering entirely while the tab is hidden; the clock,
  // not the loop, owns the broadcast, so resuming just recalculates
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId) {
      lastState = null; lastSegKey = null;  // full refresh on wake
      rafId = requestAnimationFrame(frame);
    }
  });

  // ---------- info bar show/hide ----------
  let infoTimer = null;
  function showInfo() {
    els.infobar.classList.add("show");
    clearTimeout(infoTimer);
    infoTimer = setTimeout(() => els.infobar.classList.remove("show"), 4500);
  }
  ["pointermove", "pointerdown", "keydown"].forEach(evt =>
    window.addEventListener(evt, e => {
      if (e.type === "keydown" && (e.key === "g" || e.key === "G" || e.key === "Escape")) return;
      showInfo();
    }, { passive: true }));

  // ---------- TV guide (NOW view + channel listings) ----------
  let guideView = "now";

  function renderGuide(now) {
    els.tabNow.setAttribute("aria-selected", String(guideView === "now"));
    els.tabList.setAttribute("aria-selected", String(guideView === "list"));
    if (guideView === "now") {
      els.guideList.innerHTML = CHANNELS.map(ch => {
        const st = C27.scheduler.broadcastState(now, ch.id);
        const cur = ch.id === activeCh;
        return `
        <button class="g-chrow ${cur ? "current" : ""}" data-ch="${ch.id}"
                aria-label="Tune to channel ${ch.number}, ${esc(ch.name)}, now airing ${esc(st.show.title)}">
          <span class="g-num">${ch.number}</span>
          <span class="g-chname">${esc(ch.shortName)}</span>
          <span class="g-show">
            <span class="g-title">${esc(st.show.title)}</span>
            <span class="g-ep">${fmtTime(st.block.start)}–${fmtTime(st.block.end)} · ${esc(st.show.genre)}</span>
          </span>
          <span class="g-tune">${cur ? "WATCHING" : "TUNE"}</span>
        </button>`;
      }).join("");
      els.guideList.querySelectorAll(".g-chrow").forEach(btn =>
        btn.addEventListener("click", () => { setChannel(btn.dataset.ch, { force: true }); toggleGuide(false); }));
    } else {
      const ch = channelById(activeCh);
      const items = C27.scheduler.upcoming(now, 16, activeCh);
      els.guideList.innerHTML =
        `<div class="g-listhead">${ch.number} · ${esc(ch.name)} — upcoming</div>` +
        items.map((it, i) => `
        <div class="g-row ${i === 0 ? "on-now" : ""}">
          <div class="g-time">${i === 0 ? "NOW" : fmtTime(it.block.start)}</div>
          <div class="g-show">
            <div class="g-title">${esc(it.show.title)} <span class="g-rating">${esc(it.show.rating)}</span></div>
            <div class="g-ep">"${esc(it.episode.title)}" — ${esc(it.show.genre)}</div>
          </div>
        </div>`).join("");
      // upcoming rows are intentionally not interactive: this is
      // broadcast television — you can look ahead, not skip ahead
    }
  }

  function setGuideView(v) {
    guideView = v;
    renderGuide(new Date());
  }
  els.tabNow.addEventListener("click", () => setGuideView("now"));
  els.tabList.addEventListener("click", () => setGuideView("list"));

  function toggleGuide(force) {
    const show = force !== undefined ? force : els.guide.hidden;
    els.guide.hidden = !show;
    if (show) { lastGuideMin = -1; renderGuide(new Date()); els.tabNow.focus(); }
    else els.guideBtn.focus();
  }
  els.guideBtn.addEventListener("click", () => toggleGuide());
  els.guideClose.addEventListener("click", () => toggleGuide(false));
  els.guide.addEventListener("click", e => { if (e.target === els.guide) toggleGuide(false); });

  // ---------- keyboard ----------
  window.addEventListener("keydown", e => {
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.key === "g" || e.key === "G") { toggleGuide(); return; }
    if (e.key === "Escape" && !els.guide.hidden) { toggleGuide(false); return; }
    if (e.key === "m" || e.key === "M") { toggleSound(); return; }
    if (e.key === "c" || e.key === "C") { toggleCC(); return; }
    if (e.key === "f" || e.key === "F") { toggleFullscreen(); return; }
    if (els.guide.hidden) {
      if (e.key === "ArrowUp") { e.preventDefault(); channelStep(1); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); channelStep(-1); return; }
      if (/^[0-9]$/.test(e.key)) { numberKey(e.key); return; }
      if (e.key === "Enter" && numBuf) { commitNumber(); return; }
    }
  });

  // ---------- controls ----------
  const soundBtn = $("#sound-btn");
  function toggleSound() {
    const on = C27.audio.setEnabled(!C27.audio.enabled);
    prefs.sound = on;
    soundBtn.textContent = on ? "SOUND ON" : "SOUND OFF";
    soundBtn.setAttribute("aria-pressed", String(on));
    C27.mediactl.setMuted(!on);
  }
  soundBtn.addEventListener("click", toggleSound);

  const ccBtn = $("#cc-btn");
  function toggleCC() {
    prefs.cc = !prefs.cc;
    savePref("cc", prefs.cc);
    ccBtn.setAttribute("aria-pressed", String(prefs.cc));
    applyEffectPrefs();
    flashOSD(prefs.cc ? "CC ON" : "CC OFF", 1400);
  }
  ccBtn.addEventListener("click", toggleCC);

  const fsBtn = $("#fs-btn");
  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (els.tv.requestFullscreen) els.tv.requestFullscreen();
  }
  fsBtn.addEventListener("click", toggleFullscreen);

  $("#ch-up").addEventListener("click", () => channelStep(1));
  $("#ch-down").addEventListener("click", () => channelStep(-1));

  // effects preferences (guide footer)
  const crtToggle = $("#pref-crt");
  const calmToggle = $("#pref-calm");
  crtToggle.checked = prefs.crt;
  calmToggle.checked = prefs.calm;
  crtToggle.addEventListener("change", () => {
    prefs.crt = crtToggle.checked; savePref("crt", prefs.crt); applyEffectPrefs();
  });
  calmToggle.addEventListener("change", () => {
    prefs.calm = calmToggle.checked; savePref("calm", prefs.calm);
  });

  // ---------- power on ----------
  applyEffectPrefs();
  applyChannelIdentity();
  ccBtn.setAttribute("aria-pressed", String(prefs.cc));
  const bootCh = channelById(activeCh);
  els.osd.textContent = "CH " + bootCh.number;
  els.osd.classList.add("show");
  setTimeout(() => els.osd.classList.remove("show"), 3000);
  triggerStatic(650);
  showInfo();
  rafId = requestAnimationFrame(frame);
  const bootState = lastState || C27.scheduler.broadcastState(new Date(), activeCh);
  announce(`Channel ${bootCh.number}, ${bootCh.name}. Now: ${bootState.show.title}.`);
})();
