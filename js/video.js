// ============================================================
// CHANNEL 27 CABLE SYSTEM — TAPE DECK & MEDIA CONTROLLER
// ============================================================
// The controller decides, each tick, which output carries the
// current segment:
//
//   local file  → the <video> tape deck (contributor mp4s)
//   youtube     → the YouTube adapter (js/youtube.js)
//   neither     → nothing: the procedural cartoon underneath
//                 IS the broadcast (it never stops rendering)
//
// Failures are remembered for the session so a dead source is
// not retried every frame. Media shapes are normalized by the
// scheduler; episodes may still use the original
// `media: { src, loop }` contributor format.
// ============================================================

(function () {
  const C27 = window.C27;

  // ---------------- local tape deck ----------------
  let el = null;
  let currentKey = null;
  const failed = new Set();     // media keys that errored this session
  let mutedPref = true;

  function ensureEl() {
    if (el) return el;
    el = document.createElement("video");
    el.id = "tape";
    el.muted = true;
    el.setAttribute("playsinline", "");
    el.preload = "auto";
    el.addEventListener("error", () => { failed.add(currentKey); hideTape(); });
    el.addEventListener("playing", () => el.classList.add("on"));
    document.getElementById("screen").insertBefore(el, document.getElementById("overlay"));
    return el;
  }

  function hideTape() { if (el) el.classList.remove("on"); }

  function stopTape() {
    if (!el) return;
    hideTape();
    el.pause();
    el.removeAttribute("src");
    el.load();
    currentKey = null;
  }

  function syncLocal(media, elapsed) {
    const v = ensureEl();
    if (currentKey !== media.key) {
      currentKey = media.key;
      v.src = media.src;
      v.loop = media.loop !== false;
      v.muted = mutedPref;
      v.play().catch(() => { /* retry next tick */ });
    }
    if (v.readyState >= 1 && v.duration > 0 && isFinite(v.duration)) {
      const target = v.loop ? (elapsed % v.duration) : Math.min(elapsed, v.duration - 0.05);
      if (Math.abs(v.currentTime - target) > 0.75) v.currentTime = target;
      if (v.paused) v.play().catch(() => {});
    }
  }

  // ---------------- controller ----------------
  // status for the renderer: "video" (external media visible or
  // loading), "failed" (media declared but unplayable → standby
  // notice may show), or "procedural" (no media declared).
  let lastStatus = "procedural";

  function markFailed(key) { if (key) failed.add(key); }

  function currentMedia(state) {
    const seg = state.seg;
    if (seg.type === "content" && state.media) {
      const elapsed = state.media.atSeconds != null
        ? state.media.atSeconds                       // sequenced pool: exact offset into the current clip
        : seg.contentBefore + state.segElapsed;       // single clip: time since content began
      return { media: state.media, elapsed };
    }
    if (seg.type === "commercial" && seg.commercial.media) {
      const m = C27.scheduler.normalizeMedia(seg.commercial.media);
      if (m) return { media: m, elapsed: state.segElapsed };
    }
    return null;
  }

  function sync(state, prefs) {
    prefs = prefs || {};
    mutedPref = !prefs.sound;
    const cur = currentMedia(state);

    if (!cur) {
      stopTape();
      if (C27.youtube) C27.youtube.stop();
      lastStatus = "procedural";
      return lastStatus;
    }
    if (failed.has(cur.media.key)) {
      stopTape();
      if (C27.youtube) C27.youtube.stop();
      lastStatus = "failed";
      return lastStatus;
    }

    if (cur.media.provider === "local") {
      if (C27.youtube) C27.youtube.stop();
      syncLocal(cur.media, cur.elapsed);
    } else if (cur.media.provider === "youtube" && C27.youtube) {
      stopTape();
      C27.youtube.sync(cur.media, cur.elapsed, {
        muted: !prefs.sound,
        onFail: markFailed
      });
    }
    lastStatus = "video";
    return lastStatus;
  }

  function setMuted(m) {
    mutedPref = m;
    if (el) el.muted = m;
    if (C27.youtube) C27.youtube.setMuted(m);
  }

  C27.mediactl = { sync, setMuted, markFailed, get status() { return lastStatus; } };

  // legacy surface kept for forks that called C27.tape directly
  C27.tape = { sync: (state) => sync(state, {}), stop: stopTape };
})();
