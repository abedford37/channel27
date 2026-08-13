// ============================================================
// CHANNEL 27 CABLE SYSTEM — CHANNEL REGISTRY
// ============================================================
// Every channel on the dial. Contributors: add a record here,
// a schedule in content/schedules/, and any new programs in
// shows.js. Nothing else needs to change.
//
// type: "original"             — fictional alternate-timeline station
//       "historical-inspired"  — unofficial homage to a real network's
//                                programming *rhythm* (never its brand)
// ============================================================

window.C27 = window.C27 || {};

window.C27.CHANNELS = [
  {
    id: "channel-27",
    number: 27,
    shortName: "C27",
    name: "Channel 27",
    tagline: "The channel that never went off the air.",
    type: "original",
    scheduleId: "channel-27",
    palette: ["#17182B", "#FFC24B", "#FF6B53"],
    bugText: "27"
  },
  {
    id: "orange-28",
    number: 28,
    shortName: "ORNG",
    name: "Orange",
    tagline: "The weird part of growing up.",
    type: "historical-inspired",
    scheduleId: "orange-28",
    palette: ["#ED6B21", "#F8C537", "#5A2B81"],
    bugText: "28"
  },
  {
    id: "toon-29",
    number: 29,
    shortName: "TOON",
    name: "Toon",
    tagline: "Drawn all day.",
    type: "historical-inspired",
    scheduleId: "toon-29",
    palette: ["#111318", "#E23B3B", "#F5F0E6"],
    bugText: "29"
  },
  {
    id: "music-30",
    number: 30,
    shortName: "MUSC",
    name: "Music",
    tagline: "Still waiting for your request.",
    type: "historical-inspired",
    scheduleId: "music-30",
    palette: ["#160A2E", "#FF4FA0", "#63E2C6"],
    bugText: "30"
  },
  {
    id: "family-31",
    number: 31,
    shortName: "FMLY",
    name: "Family",
    tagline: "Meet us on the couch.",
    type: "historical-inspired",
    scheduleId: "family-31",
    palette: ["#1D3A5F", "#7BC4A4", "#F2D06B"],
    bugText: "31"
  }
];

window.C27.DEFAULT_CHANNEL = "channel-27";
