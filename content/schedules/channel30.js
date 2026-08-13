// ============================================================
// MUSIC 30 — WEEKLY SCHEDULE
// ============================================================
// Programming rhythm informed by archived listings for music
// video networks circa 1997-1999 (MTV/VH1/The Box-era pattern:
// video rotation through the morning, an afternoon
// request-driven countdown in the TRL manner, genre blocks in
// the evening — R&B, hip-hop, alternative, rock — dance and
// electronic programming late, and unplugged-style sessions on
// weekends). This is a synthesized homage, not a reproduced
// network schedule. All program titles are original.
//
// Several programs carry mediaPools of officially uploaded
// era-appropriate music videos (see content/media.js).
// ============================================================

window.C27 = window.C27 || {};
window.C27.SCHEDULES = window.C27.SCHEDULES || {};

(function () {
  const weekday = [
    ["00:00", "dance-transmission"],   // late-night dance
    ["03:00", "wake-up-videos"],       // overnight rotation into morning
    ["06:00", "wake-up-videos"],       // the morning wake-up block
    ["10:00", "the-request-line"],     // late-morning countdown warmup
    ["12:00", "wake-up-videos"],       // midday rotation
    ["15:00", "the-request-line"],     // THE after-school countdown
    ["17:00", "rnb-avenue"],
    ["19:00", "beats-and-rhymes"],
    ["21:00", "left-of-the-dial"],
    ["22:00", "the-loud-room"],
    ["23:00", "dance-transmission"]
  ];

  window.C27.SCHEDULES["music-30"] = {
    mon: weekday.map(e => e.slice()),
    tue: weekday.map(e => e.slice()),
    wed: weekday.map(e => e.slice()),
    thu: weekday.map(e => e.slice()),
    fri: weekday.map(e => e.slice()),

    sat: [
      ["00:00", "dance-transmission"],   // Saturday club hours run long
      ["04:00", "wake-up-videos"],
      ["09:00", "the-request-line"],     // weekend countdown marathon
      ["12:00", "acoustic-couch"],       // sessions & interviews
      ["14:00", "left-of-the-dial"],
      ["16:00", "the-request-line"],
      ["18:00", "beats-and-rhymes"],
      ["20:00", "the-loud-room"],
      ["22:00", "dance-transmission"]
    ],

    sun: [
      ["00:00", "dance-transmission"],
      ["04:00", "wake-up-videos"],
      ["09:00", "acoustic-couch"],       // slow Sunday sessions
      ["12:00", "rnb-avenue"],
      ["14:00", "the-request-line"],     // week-in-review countdown
      ["17:00", "acoustic-couch"],
      ["19:00", "left-of-the-dial"],
      ["21:00", "rnb-avenue"],
      ["23:00", "dance-transmission"]
    ]
  };
})();
