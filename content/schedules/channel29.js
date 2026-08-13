// ============================================================
// TOON 29 — WEEKLY SCHEDULE
// ============================================================
// Programming rhythm informed by archived cable listings for
// all-animation networks circa 1997-1999 (Cartoon Network-era
// pattern: theatrical classics in the morning, comedy cartoons
// after school, an action/robot block in the evening in the
// Toonami manner, imported animation at night, and experimental
// shorts after midnight). This is a synthesized homage, not a
// reproduced network schedule. All program titles are original.
//
// "Golden Age Theater" carries a mediaPool of verified
// public-domain theatrical shorts (see content/media.js).
// ============================================================

window.C27 = window.C27 || {};
window.C27.SCHEDULES = window.C27.SCHEDULES || {};

(function () {
  const weekday = [
    ["00:00", "insomniac-ink"],          // experimental overnight
    ["02:00", "golden-age-theater"],     // vault shorts for the small hours
    ["06:00", "golden-age-theater"],     // classic theatrical morning
    ["09:00", "lunch-toons"],
    ["12:00", "lunch-toons"],
    ["14:00", "after-school-scribbles"], // comedy stack
    ["17:00", "action-block-29"],        // early-evening action
    ["19:00", "big-robot-hour"],         // the robot block
    ["21:00", "action-block-29"],
    ["23:00", "insomniac-ink"]
  ];

  window.C27.SCHEDULES["toon-29"] = {
    mon: weekday.map(e => e.slice()),
    tue: weekday.map(e => e.slice()),
    wed: weekday.map(e => e.slice()),
    thu: weekday.map(e => e.slice()),
    fri: weekday.map(e => e.slice()),

    sat: [
      ["00:00", "insomniac-ink"],
      ["02:00", "golden-age-theater"],
      ["06:00", "toon-premiere-party"],  // Saturday premiere morning
      ["10:00", "after-school-scribbles"],
      ["13:00", "golden-age-theater"],   // matinee vault
      ["16:00", "action-block-29"],
      ["19:00", "toon-premiere-party"],  // premiere night
      ["21:00", "big-robot-hour"],
      ["23:00", "insomniac-ink"]
    ],

    sun: [
      ["00:00", "insomniac-ink"],
      ["03:00", "golden-age-theater"],
      ["07:00", "golden-age-theater"],   // long Sunday vault morning
      ["11:00", "lunch-toons"],
      ["13:00", "after-school-scribbles"],
      ["16:00", "golden-age-theater"],
      ["18:00", "action-block-29"],
      ["20:00", "big-robot-hour"],
      ["22:00", "insomniac-ink"]
    ]
  };
})();
