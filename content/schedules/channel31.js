// ============================================================
// FAMILY 31 — WEEKLY SCHEDULE
// ============================================================
// Programming rhythm informed by archived listings for family
// cable networks circa 1997-1999 (Disney Channel-era pattern:
// preschool mornings, family animation midday, educational
// programming after school, live-action youth shows in the
// early evening, a nightly family movie, music/performance
// programming, and calm overnight filler). This is a
// synthesized homage, not a reproduced network schedule.
// All program titles are original.
// ============================================================

window.C27 = window.C27 || {};
window.C27.SCHEDULES = window.C27.SCHEDULES || {};

(function () {
  const weekday = [
    ["00:00", "quiet-hours"],           // calm overnight
    ["06:00", "sunrise-storybook"],     // preschool morning
    ["09:00", "cartoon-clubhouse-31"],
    ["11:00", "sunrise-storybook"],
    ["12:00", "cartoon-clubhouse-31"],
    ["14:00", "discovery-den"],         // educational afternoon
    ["16:00", "clubhouse-afternoon"],   // live-action youth
    ["18:00", "cartoon-clubhouse-31"],
    ["19:00", "family-movie-31"],       // the nightly family movie
    ["21:00", "sing-along-stage"],
    ["22:00", "quiet-hours"]
  ];

  window.C27.SCHEDULES["family-31"] = {
    mon: weekday.map(e => e.slice()),
    tue: weekday.map(e => e.slice()),
    wed: weekday.map(e => e.slice()),
    thu: weekday.map(e => e.slice()),
    fri: weekday.map(e => e.slice()),

    sat: [
      ["00:00", "quiet-hours"],
      ["06:00", "sunrise-storybook"],
      ["08:00", "cartoon-clubhouse-31"],
      ["11:00", "weekend-matinee"],      // Saturday matinee
      ["13:00", "clubhouse-afternoon"],
      ["15:00", "discovery-den"],
      ["17:00", "sing-along-stage"],
      ["19:00", "family-movie-31"],      // Saturday night feature
      ["21:00", "family-movie-31"],      // double feature
      ["23:00", "quiet-hours"]
    ],

    sun: [
      ["00:00", "quiet-hours"],
      ["06:00", "sunrise-storybook"],
      ["09:00", "discovery-den"],        // Sunday learning morning
      ["11:00", "weekend-matinee"],
      ["13:00", "cartoon-clubhouse-31"],
      ["15:00", "discovery-den"],
      ["17:00", "clubhouse-afternoon"],
      ["19:00", "family-movie-31"],
      ["21:00", "quiet-hours"]
    ]
  };
})();
