// ============================================================
// CHANNEL 27 — SOUND ENGINE
// ============================================================
// All audio is synthesized with WebAudio — no sound files.
// Sound is OFF by default (browsers require a user gesture to
// start audio anyway). The SOUND button / M key toggles it.
//
//   pop()      channel-change static burst
//   stinger()  little synth mnemonic for station bumpers
//   hum        constant, very quiet CRT bed while sound is on
// ============================================================

(function () {
  const C27 = window.C27;

  let ac = null;          // AudioContext, created on first enable
  let master = null;      // master gain
  let bed = null;         // hum + noise bed nodes
  let enabled = false;

  function ensureContext() {
    if (ac) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ac = new AC();
    master = ac.createGain();
    master.gain.value = 0.9;
    master.connect(ac.destination);
  }

  function noiseBuffer(seconds) {
    const len = Math.floor(ac.sampleRate * seconds);
    const buf = ac.createBuffer(1, len, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  // ---------- the CRT bed: faint hum + hiss ----------
  function startBed() {
    if (bed) return;
    const humOsc = ac.createOscillator();
    humOsc.type = "sine"; humOsc.frequency.value = 120;
    const humGain = ac.createGain(); humGain.gain.value = 0.006;

    const hiss = ac.createBufferSource();
    hiss.buffer = noiseBuffer(2); hiss.loop = true;
    const hissFilter = ac.createBiquadFilter();
    hissFilter.type = "highpass"; hissFilter.frequency.value = 5000;
    const hissGain = ac.createGain(); hissGain.gain.value = 0.004;

    humOsc.connect(humGain).connect(master);
    hiss.connect(hissFilter).connect(hissGain).connect(master);
    humOsc.start(); hiss.start();
    bed = { humOsc, hiss, humGain, hissGain };
  }

  function stopBed() {
    if (!bed) return;
    try { bed.humOsc.stop(); bed.hiss.stop(); } catch (e) { /* already stopped */ }
    bed = null;
  }

  // ---------- one-shots ----------
  function pop(long) {
    if (!enabled || !ac) return;
    const now = ac.currentTime;
    const src = ac.createBufferSource();
    src.buffer = noiseBuffer(0.5);
    const filt = ac.createBiquadFilter();
    filt.type = "bandpass"; filt.frequency.value = 1800; filt.Q.value = 0.6;
    const g = ac.createGain();
    const dur = long ? 0.42 : 0.24;
    g.gain.setValueAtTime(0.32, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);
    src.connect(filt).connect(g).connect(master);
    src.start(now); src.stop(now + dur + 0.05);
  }

  function stinger() {
    if (!enabled || !ac) return;
    const now = ac.currentTime;
    // a tiny three-note station mnemonic (major-ish, ends up a fifth)
    const notes = [392, 523.25, 587.33]; // G4 C5 D5
    notes.forEach((f, i) => {
      const o = ac.createOscillator();
      o.type = "triangle"; o.frequency.value = f;
      const g = ac.createGain();
      const t0 = now + i * 0.14;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.14, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.5);
      o.connect(g).connect(master);
      o.start(t0); o.stop(t0 + 0.55);
    });
  }

  // ---------- toggle ----------
  function setEnabled(on) {
    if (on) {
      ensureContext();
      if (!ac) return false;             // WebAudio unavailable
      if (ac.state === "suspended") ac.resume();
      enabled = true;
      startBed();
      pop();                              // satisfying click-on
    } else {
      enabled = false;
      stopBed();
    }
    return enabled;
  }

  C27.audio = {
    setEnabled,
    get enabled() { return enabled; },
    pop, stinger
  };
})();
