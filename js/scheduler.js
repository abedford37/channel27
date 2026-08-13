// ============================================================
// CHANNEL 27 CABLE SYSTEM — SCHEDULER
// ============================================================
// Turns the real clock into a broadcast, per channel. Fully
// deterministic: two people watching the same channel at the
// same local time see the same show, scene, and commercials.
//
// No state is stored. Every channel is a pure function of time.
// All public functions take an optional channelId and default
// to Channel 27, so pre-multichannel callers keep working.
// ============================================================

(function () {
  const C27 = window.C27;
  const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  // ---------- deterministic RNG ----------
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hashStr(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  // ---------- content lookups ----------
  const SHOW_BY_ID = {};
  C27.SHOWS.forEach(s => { SHOW_BY_ID[s.id] = s; });

  const CHANNEL_BY_ID = {};
  (C27.CHANNELS || []).forEach(c => { CHANNEL_BY_ID[c.id] = c; });
  const DEFAULT_CH = C27.DEFAULT_CHANNEL || "channel-27";

  const MEDIA_BY_ID = {};
  (C27.MEDIA || []).forEach(m => { MEDIA_BY_ID[m.id] = m; });

  function getChannel(chId) {
    return CHANNEL_BY_ID[chId] || CHANNEL_BY_ID[DEFAULT_CH] || {
      id: chId, number: 0, name: chId, shortName: "??", tagline: "",
      palette: ["#111", "#222", "#888"], bugText: "?"
    };
  }

  // eligibility: an item with no `channels` array airs anywhere
  function eligible(item, chId) {
    return !item.channels || item.channels.includes(chId);
  }

  // normalize an inline media object or catalog record to one shape
  function normalizeMedia(m) {
    if (!m) return null;
    if (m.provider === "youtube" || (m.videoId && !m.src)) {
      if (!m.videoId) return null;
      return {
        provider: "youtube", videoId: m.videoId,
        duration: m.duration || 0, startAt: m.startAt || 0,
        captions: !!m.captions, loop: m.loop === true,
        fallbackStyle: m.fallbackStyle || null, key: "yt:" + m.videoId
      };
    }
    if (m.src) {
      return {
        provider: "local", src: m.src, loop: m.loop !== false,
        fallbackStyle: m.fallbackStyle || null, key: "local:" + m.src
      };
    }
    return null;
  }

  // Deterministically resolve what footage (if any) a block airs:
  // explicit episode.media wins; otherwise rotate through the
  // show's mediaPool (active, channel-eligible records) weekly.
  function resolveMedia(show, episode, block, chId) {
    if (episode && episode.media) return normalizeMedia(episode.media);
    if (!show.mediaPool || !show.mediaPool.length) return null;
    const pool = show.mediaPool
      .map(id => MEDIA_BY_ID[id])
      .filter(m => m && m.active && eligible(m, chId));
    if (!pool.length) return null;
    const week = Math.floor(block.start.getTime() / (7 * 24 * 3600 * 1000));
    const idx = (hashStr(show.id + "|m|" + block.startMin) + week) % pool.length;
    return normalizeMedia(pool[idx]);
  }

  function getShow(id) {
    return SHOW_BY_ID[id] || {
      id: "off-air",
      title: "TECHNICAL DIFFICULTIES",
      genre: "Please Stand By",
      rating: "TV-G",
      style: "latenight",
      palette: ["#111", "#222", "#888"],
      tagline: "A show id in schedule.js doesn't exist in shows.js.",
      episodes: [{ title: "Please Stand By", synopsis: "", scenes: ["Please stand by."] }]
    };
  }

  function seasonOk(c, date) {
    if (!c.season) return true;
    const m = date.getMonth(); // 0-11
    if (c.season === "halloween") return m === 9;            // October
    if (c.season === "christmas") return m === 11;           // December
    if (c.season === "summer") return m >= 5 && m <= 7;      // Jun-Aug
    return true;
  }

  // ---------- blocks ----------
  function parseHM(hm) {
    const [h, m] = hm.split(":").map(Number);
    return h * 60 + m;
  }

  // Returns the list of blocks for a given date's day, with
  // startMin/endMin (minutes since local midnight).
  function scheduleFor(chId) {
    const S = C27.SCHEDULES || {};
    const ch = getChannel(chId);
    return S[ch.scheduleId || chId] || S[chId] || C27.SCHEDULE || {};
  }

  function dayBlocks(date, chId) {
    const key = DAY_KEYS[date.getDay()];
    const raw = scheduleFor(chId)[key] || [["00:00", "off-air"]];
    const blocks = raw.map(([t, id]) => ({ startMin: parseHM(t), showId: id }));
    blocks.sort((a, b) => a.startMin - b.startMin);
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].endMin = i + 1 < blocks.length ? blocks[i + 1].startMin : 1440;
    }
    return blocks;
  }

  // Find the block airing at `date`, plus its absolute start Date.
  function blockAt(date, chId) {
    const blocks = dayBlocks(date, chId);
    const minOfDay = date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
    let blk = blocks[0];
    for (const b of blocks) {
      if (minOfDay >= b.startMin) blk = b; else break;
    }
    const start = new Date(date);
    start.setHours(Math.floor(blk.startMin / 60), blk.startMin % 60, 0, 0);
    const end = new Date(date);
    end.setHours(Math.floor(blk.endMin / 60), blk.endMin % 60, 0, 0); // 24:00 rolls to next midnight
    return { ...blk, start, end, durSec: (end - start) / 1000 };
  }

  // The block that airs immediately after the given block.
  function nextBlock(block, chId) {
    const probe = new Date(block.end.getTime() + 1000);
    return blockAt(probe, chId);
  }

  // ---------- episode selection ----------
  // Rotates weekly so the loop doesn't feel identical every week.
  function pickEpisode(show, block) {
    const week = Math.floor(block.start.getTime() / (7 * 24 * 3600 * 1000));
    const idx = (hashStr(show.id + "|" + block.startMin) + week) % show.episodes.length;
    return show.episodes[idx];
  }

  // ---------- timeline: content + commercial breaks ----------
  // Deterministically slices a block into segments. Seeded by the
  // block's absolute start time, so all viewers are in sync.
  const BUMPER_SEC = 7;
  const COMMERCIAL_SEC = 24;

  function pickBumper(rng, kinds, hour, chId) {
    const all = C27.BUMPERS.filter(b => eligible(b, chId));
    let pool = all.filter(b => kinds.includes(b.kind));
    if (hour >= 23 || hour < 5) {
      const late = all.filter(b => b.kind === "latenight");
      if (late.length && rng() < 0.5) pool = late;
    } else if (hour >= 5 && hour < 9) {
      const morn = all.filter(b => b.kind === "morning");
      if (morn.length && rng() < 0.35) pool = morn;
    }
    if (!pool.length) pool = all.length ? all : C27.BUMPERS;
    return pool[Math.floor(rng() * pool.length)];
  }

  function buildTimeline(block, chId) {
    // channel-27 keeps its historical seed prefix so the original
    // broadcast timeline is bit-identical to the single-channel era
    const seedName = chId === "channel-27" ? "c27" : chId;
    const seed = hashStr(seedName + "|" + Math.floor(block.start.getTime() / 60000));
    const rng = mulberry32(seed);
    const show = getShow(block.showId);
    const episode = pickEpisode(show, block);
    const D = block.durSec;
    const hour = block.start.getHours();

    const segs = [];
    let t = 0;
    const usedCommercials = new Set();

    function pushContent(dur) {
      segs.push({ type: "content", start: t, dur, show, episode });
      t += dur;
    }
    function pushBreak(isLast) {
      const items = [];
      const bumper = pickBumper(rng, ["back", "id"], hour, chId);
      items.push({ type: "bumper", bumper });
      const n = 2 + (rng() < 0.5 ? 1 : 0);
      let pool = C27.COMMERCIALS.filter(c => eligible(c, chId) && seasonOk(c, block.start) && !usedCommercials.has(c.id));
      for (let i = 0; i < n && pool.length; i++) {
        const c = pool[Math.floor(rng() * pool.length)];
        usedCommercials.add(c.id);
        pool = pool.filter(x => x.id !== c.id);
        items.push({ type: "commercial", commercial: c });
      }
      if (isLast) {
        const nexts = C27.BUMPERS.filter(b => b.kind === "next" && eligible(b, chId));
        items.push({ type: "bumper", bumper: nexts[Math.floor(rng() * nexts.length)], isNext: true });
      } else if (rng() < 0.35) {
        items.push({ type: "bumper", bumper: pickBumper(rng, ["id"], hour, chId) });
      }
      for (const it of items) {
        const dur = it.type === "bumper" ? BUMPER_SEC : COMMERCIAL_SEC;
        segs.push({ ...it, start: t, dur, show, episode });
        t += dur;
      }
    }

    // Short blocks (< 12 min): one break in the middle.
    if (D <= 720) {
      const brk = BUMPER_SEC * 2 + COMMERCIAL_SEC * 2;
      const half = Math.max(60, Math.floor((D - brk) / 2));
      pushContent(half);
      pushBreak(true);
      pushContent(Math.max(30, D - t));
    } else {
      // Long blocks: content 6-9 min, break, repeat.
      while (true) {
        const remaining = D - t;
        if (remaining <= 660) { pushContent(remaining); break; }
        const c = Math.min(remaining - 120, 360 + Math.floor(rng() * 180));
        pushContent(c);
        const remAfter = D - t;
        pushBreak(remAfter < 780);
      }
    }

    // Precompute how much content time precedes each content segment,
    // so scene captions progress across commercial breaks.
    let contentSoFar = 0;
    for (const s of segs) {
      if (s.type === "content") { s.contentBefore = contentSoFar; contentSoFar += s.dur; }
    }
    return { segs, show, episode, totalContent: contentSoFar };
  }

  // ---------- public API ----------
  // Everything the renderer needs about "right now".
  function broadcastState(now, chId) {
    now = now || new Date();
    chId = chId || DEFAULT_CH;
    const channel = getChannel(chId);
    const block = blockAt(now, chId);
    const next = nextBlock(block, chId);
    const timeline = buildTimeline(block, chId);
    const elapsed = (now - block.start) / 1000;

    let seg = timeline.segs[0];
    for (const s of timeline.segs) {
      if (elapsed >= s.start) seg = s; else break;
    }
    const segElapsed = elapsed - seg.start;

    return {
      now, block, next,
      channel, channelId: chId,
      show: timeline.show,
      episode: timeline.episode,
      media: resolveMedia(timeline.show, timeline.episode, block, chId),
      nextShow: getShow(next.showId),
      nextEpisode: pickEpisode(getShow(next.showId), next),
      seg, segElapsed,
      blockElapsed: elapsed,
      blockRemaining: Math.max(0, block.durSec - elapsed),
      totalContent: timeline.totalContent,
      segKey: chId + "|" + block.start.getTime() + "|" + seg.start + "|" + seg.type
    };
  }

  // Upcoming programs for the TV Guide (next `count` blocks).
  function upcoming(now, count, chId) {
    now = now || new Date();
    chId = chId || DEFAULT_CH;
    const out = [];
    let b = blockAt(now, chId);
    for (let i = 0; i < count; i++) {
      const show = getShow(b.showId);
      out.push({ block: b, show, episode: pickEpisode(show, b) });
      b = nextBlock(b, chId);
    }
    return out;
  }

  // ---------- development validation (console.warn only) ----------
  function validateContent() {
    const warn = (...a) => console.warn("[C27 content]", ...a);
    const chans = C27.CHANNELS || [];
    const seenNum = {}, seenId = {};
    for (const c of chans) {
      if (seenId[c.id]) warn("duplicate channel id:", c.id);
      if (seenNum[c.number] !== undefined) warn("duplicate channel number:", c.number);
      seenId[c.id] = true; seenNum[c.number] = true;
      if (!(C27.SCHEDULES || {})[c.scheduleId || c.id]) warn("channel has no schedule:", c.id);
    }
    const showIds = new Set(C27.SHOWS.map(s => s.id));
    const dupShow = new Set();
    C27.SHOWS.forEach(s => {
      if (dupShow.has(s.id)) warn("duplicate show id:", s.id);
      dupShow.add(s.id);
      if (!s.episodes || !s.episodes.length) warn("show has no episodes:", s.id);
      (s.mediaPool || []).forEach(mid => { if (!MEDIA_BY_ID[mid]) warn("show", s.id, "references unknown media id:", mid); });
    });
    const chanIds = new Set(chans.map(c => c.id));
    const timeRe = /^([01]\d|2[0-3]):[0-5]\d$/;
    for (const [schedId, days] of Object.entries(C27.SCHEDULES || {})) {
      for (const [day, rows] of Object.entries(days)) {
        if (!rows.length) { warn(schedId, day, "is empty"); continue; }
        if (rows[0][0] !== "00:00") warn(schedId, day, "does not start at 00:00");
        for (const [t, id] of rows) {
          if (!timeRe.test(t)) warn(schedId, day, "invalid time:", t);
          if (!showIds.has(id)) warn(schedId, day, "unknown show id:", id);
        }
      }
    }
    const dupMedia = new Set();
    (C27.MEDIA || []).forEach(m => {
      if (dupMedia.has(m.id)) warn("duplicate media id:", m.id);
      dupMedia.add(m.id);
      if (m.provider !== "youtube" && m.provider !== "local") warn("media", m.id, "unknown provider:", m.provider);
      if (m.provider === "youtube" && !m.videoId) warn("media", m.id, "missing videoId");
      if (m.provider === "local" && !m.src) warn("media", m.id, "missing src");
      (m.channels || []).forEach(c => { if (!chanIds.has(c)) warn("media", m.id, "unknown channel:", c); });
    });
    [["bumper", C27.BUMPERS], ["commercial", C27.COMMERCIALS]].forEach(([label, arr]) => {
      (arr || []).forEach(x => (x.channels || []).forEach(c => {
        if (!chanIds.has(c)) warn(label, x.id, "unknown channel:", c);
      }));
    });
  }
  try { validateContent(); } catch (e) { console.warn("[C27 content] validation crashed:", e); }

  C27.scheduler = { broadcastState, upcoming, getShow, getChannel, blockAt, normalizeMedia };
})();
