// ============================================================
// CHANNEL 27 CABLE SYSTEM — YOUTUBE ADAPTER
// ============================================================
// A thin wrapper around the official YouTube IFrame player.
// One player, ever. It gets reused across videos and channels.
//
// The adapter's whole job: keep the embedded video parked at
// the deterministic broadcast offset, and get out of the way
// (report failure, hide) when a video can't play — the
// procedural cartoon underneath is always the real signal.
//
// Requires a real http(s) origin; from file:// the IFrame API
// may refuse to load, in which case everything stays procedural.
// ============================================================

(function () {
  const C27 = window.C27;

  let apiPromise = null;    // loading the IFrame API, once
  let apiState = "idle";    // idle | loading | ready | failed
  let player = null;
  let wrap = null;          // positioned container div
  let currentKey = null;    // media.key currently loaded
  let currentVideoId = null;
  let visible = false;
  let mutedPref = true;
  let captionsPref = true;
  let endedKey = null;      // non-loop video finished for this key
  let currentLoop = false;  // is the current clip a looping/sequenced pool clip
  let fbIframe = null;      // plain-embed fallback when the IFrame API is blocked
  let fbKey = null;
  let failCb = null;
  let lastError = null;

  const DRIFT_TOLERANCE = 1.6; // seconds before we correct

  function loadAPI() {
    if (apiPromise) return apiPromise;
    apiState = "loading";
    apiPromise = new Promise(resolve => {
      if (window.YT && window.YT.Player) { apiState = "ready"; return resolve(); }
      const giveUp = setTimeout(() => {
        if (apiState === "loading") { apiState = "failed"; lastError = "api-timeout"; resolve(); }
      }, 30000);   // generous for slow connections; the plain-embed fallback still covers a true failure
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev();
        clearTimeout(giveUp); apiState = "ready"; resolve();
      };
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.onerror = () => {
        clearTimeout(giveUp); apiState = "failed"; lastError = "api-load"; resolve();
      };
      document.head.appendChild(s);
    });
    return apiPromise;
  }

  function ensureWrap() {
    if (wrap) return wrap;
    wrap = document.createElement("div");
    wrap.id = "yt-layer";
    wrap.setAttribute("aria-hidden", "true");
    const inner = document.createElement("div");
    inner.id = "yt-player";
    wrap.appendChild(inner);
    const screen = document.getElementById("screen");
    screen.insertBefore(wrap, document.getElementById("overlay"));
    return wrap;
  }

  function show() { if (!visible && wrap) { wrap.classList.add("on"); visible = true; } }
  function hide() { if (visible && wrap) { wrap.classList.remove("on"); visible = false; } }

  function destroyPlayer() {
    hide();   // drop back to the procedural signal while rebuilding; never a black layer
    if (player) { try { player.destroy(); } catch (e) { /* fine */ } player = null; }
    currentKey = null; currentVideoId = null;
    if (wrap) {
      wrap.innerHTML = "";
      const inner = document.createElement("div");
      inner.id = "yt-player"; wrap.appendChild(inner);
    }
  }

  function targetTime(media, elapsed) {
    const base = (media.startAt || 0) + elapsed;
    if (media.loop && media.duration > 0) return media.startAt + (elapsed % media.duration);
    return base;
  }

  // When the IFrame API can't load (commonly blocked by tracking prevention or a
  // privacy extension), fall back to a plain nocookie embed so the clip still
  // plays. We lose frame-accurate sync and end-detection, but the scheduler
  // still swaps clips by updating the src, so the channel keeps showing video
  // instead of dropping to the procedural cartoon.
  function fallbackEmbed(media, elapsed) {
    ensureWrap();
    if (!fbIframe) {
      wrap.innerHTML = "";               // no API player div in fallback mode
      fbIframe = document.createElement("iframe");
      fbIframe.id = "yt-fallback";
      fbIframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
      fbIframe.setAttribute("allowfullscreen", "");
      fbIframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      fbIframe.setAttribute("frameborder", "0");
      wrap.appendChild(fbIframe);
    }
    if (media.key !== fbKey) {           // only reload when the clip actually changes
      fbKey = media.key;
      currentVideoId = media.videoId;
      const start = Math.max(0, Math.floor(targetTime(media, elapsed)));
      const cc = captionsPref ? 1 : 0;
      const params = "autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&cc_load_policy=" + cc + "&start=" + start;
      fbIframe.src = "https://www.youtube-nocookie.com/embed/" + media.videoId + "?" + params;
    }
    show();
  }

  function createPlayer(media, elapsed) {
    const start = Math.max(0, Math.floor(targetTime(media, elapsed)));
    // Only a real http(s) origin can satisfy YouTube's referrer check; from
    // file:// origin is "null" and playback fails with Error 153 regardless.
    const httpOrigin = /^https?:$/.test(location.protocol) ? location.origin : undefined;
    const playerVars = {
      autoplay: 1, mute: 1, controls: 0, disablekb: 1, fs: 0, rel: 0,
      iv_load_policy: 3, playsinline: 1, modestbranding: 1,
      start, cc_load_policy: captionsPref ? 1 : 0
    };
    if (httpOrigin) playerVars.origin = httpOrigin;
    player = new window.YT.Player("yt-player", {
      // nocookie host is more tolerant of privacy/referrer restrictions
      host: "https://www.youtube-nocookie.com",
      videoId: media.videoId,
      playerVars,
      events: {
        onReady: e => {
          // belt-and-suspenders: tag the generated iframe too
          try {
            const f = e.target.getIframe && e.target.getIframe();
            if (f) f.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
          } catch (err) { /* fine */ }
          if (mutedPref) e.target.mute(); else { e.target.unMute(); e.target.setVolume(70); }
          e.target.playVideo();
        },
        onStateChange: e => {
          const S = window.YT.PlayerState;
          if (e.data === S.PLAYING) show();
          if (e.data === S.ENDED) {
            if (currentLoop) {
              // sequenced/looping clip: restart rather than go procedural;
              // the next sync tick re-seeks (and swaps to the next clip)
              try { e.target.seekTo(0, true); e.target.playVideo(); } catch (err) { /* fine */ }
            } else {
              endedKey = currentKey;
              hide();
            }
          }
        },
        onError: e => {
          // 2: bad id · 5: html5 error · 100: removed/private ·
          // 101/150: embedding disabled by owner
          lastError = "yt-" + e.data;
          hide();
          if (failCb) failCb(currentKey, lastError);
        }
      }
    });
  }

  // Keep the tape on broadcast time. Called every tick (~200ms).
  function sync(media, elapsed, opts) {
    opts = opts || {};
    failCb = opts.onFail || failCb;
    if (opts.muted !== undefined) setMuted(opts.muted);
    currentLoop = !!media.loop;

    ensureWrap();
    if (apiState === "idle") loadAPI();
    if (apiState === "loading") return;   // procedural stays visible meanwhile
    if (apiState === "failed" || !window.YT || !window.YT.Player) {
      // IFrame API unavailable (offline, file://, or blocked by tracking
      // prevention). Over http(s) we can still show a plain embed; from
      // file:// there is no valid origin, so stay procedural.
      if (/^https?:$/.test(location.protocol)) {
        fallbackEmbed(media, elapsed);
      } else if (failCb) {
        failCb(media.key, lastError || "api-unavailable");
      }
      return;
    }

    if (currentKey !== media.key) {
      endedKey = null;
      currentKey = media.key;
      currentVideoId = media.videoId;
      if (!player) createPlayer(media, elapsed);
      else {
        hide(); // hide until PLAYING fires for the new video
        player.loadVideoById({ videoId: media.videoId, startSeconds: Math.max(0, Math.floor(targetTime(media, elapsed))) });
      }
      return;
    }

    if (endedKey === currentKey && !media.loop) return; // played out; procedural continues

    if (player && player.getPlayerState) {
      const st = player.getPlayerState();
      const S = window.YT.PlayerState;
      if (!media.loop && media.duration > 0 && elapsed > media.duration + 1) {
        endedKey = currentKey; hide();
        try { player.pauseVideo(); } catch (e) { /* fine */ }
        return;
      }
      if (st === S.PLAYING) {
        const want = targetTime(media, elapsed);
        const have = player.getCurrentTime();
        if (Math.abs(have - want) > DRIFT_TOLERANCE) player.seekTo(want, true);
      } else if (st === S.ENDED && media.loop) {
        try { player.seekTo(targetTime(media, elapsed), true); player.playVideo(); } catch (e) { /* fine */ }
      } else if (st === S.PAUSED || st === S.CUED) {
        try { player.playVideo(); } catch (e) { /* autoplay policy; retry next tick */ }
      }
    }
  }

  function stop() {
    hide();
    if (player && player.pauseVideo) { try { player.pauseVideo(); } catch (e) { /* fine */ } }
    if (fbIframe) { fbIframe.src = "about:blank"; fbKey = null; }   // stop background playback
  }

  function setMuted(m) {
    mutedPref = m;
    if (player && player.mute) {
      try { if (m) player.mute(); else { player.unMute(); player.setVolume(70); } } catch (e) { /* fine */ }
    }
  }

  // cc_load_policy is construction-time only, so a caption change
  // rebuilds the player; the next sync() re-cues at broadcast time.
  function setCaptionsEnabled(v) {
    if (captionsPref === v) return;
    captionsPref = v;
    if (player) destroyPlayer();       // API player rebuilds with the new policy next sync
    else if (fbIframe) fbKey = null;   // fallback embed reloads with the new cc param next sync
  }

  function getStatus() {
    return {
      apiLoaded: !!(window.YT && window.YT.Player),
      fallback: !!fbIframe,
      visible, currentVideoId, endedKey, lastError
    };
  }

  C27.youtube = { sync, stop, setMuted, setCaptionsEnabled, getStatus };
})();
