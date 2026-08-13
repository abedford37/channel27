// ============================================================
// CHANNEL 27 — BUMPERS & STATION IDs
// ============================================================
// Short interstitials (~6-8 seconds each).
// kind: id | back | next | latenight | morning
// channels: optional array restricting where a bumper airs
// palette: optional [bg, glow, accent] override for the card
//   id        — station identity
//   back      — "we'll be right back"
//   next      — "coming up next" (show title injected at runtime)
//   latenight — only aired 11 PM - 5 AM
//   morning   — only aired 5 AM - 9 AM
// ============================================================

window.C27 = window.C27 || {};

window.C27.BUMPERS = [
  { id: "id-1", channels: ["channel-27"], kind: "id", lines: ["CHANNEL 27", "The channel that never went off the air."] },
  { id: "id-2", channels: ["channel-27"], kind: "id", lines: ["You're watching CHANNEL 27.", "We know. We're glad."] },
  { id: "id-3", channels: ["channel-27"], kind: "id", lines: ["CHANNEL 27", "Broadcasting from a building that definitely exists."] },
  { id: "id-4", channels: ["channel-27"], kind: "id", lines: ["CHANNEL 27", "Adjust your antenna. Or don't. This is fine."] },
  { id: "id-5", channels: ["channel-27"], kind: "id", lines: ["This is CHANNEL 27.", "Thank you for not changing the channel."] },

  { id: "back-1", kind: "back", lines: ["We'll be right back.", "Don't go anywhere. Seriously, where would you go?"] },
  { id: "back-2", kind: "back", lines: ["BE RIGHT BACK", "Perfect time to check on your snacks."] },
  { id: "back-3", kind: "back", lines: ["We'll return after these messages.", "The messages are excited to meet you."] },
  { id: "back-4", kind: "back", lines: ["Commercial break!", "Stretch. Hydrate. Wonder about the Yogurt Phone."] },

  { id: "next-1", kind: "next", lines: ["UP NEXT", "{SHOW}"] },
  { id: "next-2", kind: "next", lines: ["COMING UP", "{SHOW}", "Stay tuned!"] },
  { id: "next-3", channels: ["channel-27"], kind: "next", lines: ["DON'T TOUCH THAT DIAL", "{SHOW} is next on Channel 27."] },

  { id: "late-1", channels: ["channel-27"], kind: "latenight", lines: ["It's late.", "Channel 27 is still here.", "So are you. Cool."] },
  { id: "late-2", channels: ["channel-27"], kind: "latenight", lines: ["CHANNEL 27 AFTER DARK", "The shows get weirder. We get quieter."] },
  { id: "late-3", channels: ["channel-27"], kind: "latenight", lines: ["You should probably be asleep.", "One more show, though. We get it."] },

  { id: "morn-1", channels: ["channel-27"], kind: "morning", lines: ["GOOD MORNING", "Channel 27 has been up for hours. We never left."] },
  { id: "morn-2", kind: "morning", lines: ["RISE AND SHINE", "Cartoons and cereal ahead."] },

  // ---------- channel-specific station IDs (28-31) ----------
  // `channels` restricts a bumper to those channels; when omitted,
  // a bumper may air anywhere. `palette` overrides the card colors.
  { id: "orng-id-1", kind: "id", channels: ["orange-28"], palette: ["#ED6B21", "#5A2B81", "#F8C537"],
    lines: ["ORANGE 28", "The weird part of growing up."] },
  { id: "orng-id-2", kind: "id", channels: ["orange-28"], palette: ["#ED6B21", "#5A2B81", "#F8C537"],
    lines: ["You're watching ORANGE.", "Wash your hands before dinner."] },
  { id: "orng-late-1", kind: "latenight", channels: ["orange-28"], palette: ["#2B2340", "#ED6B21", "#F8C537"],
    lines: ["The kids are asleep.", "The reruns are for you now."] },

  { id: "toon-id-1", kind: "id", channels: ["toon-29"], palette: ["#111318", "#E23B3B", "#F5F0E6"],
    lines: ["TOON 29", "Drawn all day."] },
  { id: "toon-id-2", kind: "id", channels: ["toon-29"], palette: ["#111318", "#E23B3B", "#F5F0E6"],
    lines: ["TOON 29", "The ink never sleeps."] },
  { id: "toon-late-1", kind: "latenight", channels: ["toon-29"], palette: ["#111318", "#8A7BC4", "#E23B3B"],
    lines: ["It's late.", "The drawings know it's late."] },

  { id: "musc-id-1", kind: "id", channels: ["music-30"], palette: ["#160A2E", "#FF4FA0", "#63E2C6"],
    lines: ["MUSIC 30", "Still waiting for your request."] },
  { id: "musc-id-2", kind: "id", channels: ["music-30"], palette: ["#160A2E", "#FF4FA0", "#63E2C6"],
    lines: ["You're watching MUSIC 30.", "Turn it up. We can't hear you."] },
  { id: "musc-late-1", kind: "latenight", channels: ["music-30"], palette: ["#0A1030", "#63E2C6", "#FF4FA0"],
    lines: ["MUSIC 30 AFTER HOURS", "The request line is dreaming."] },

  { id: "fmly-id-1", kind: "id", channels: ["family-31"], palette: ["#1D3A5F", "#7BC4A4", "#F2D06B"],
    lines: ["FAMILY 31", "Meet us on the couch."] },
  { id: "fmly-id-2", kind: "id", channels: ["family-31"], palette: ["#1D3A5F", "#7BC4A4", "#F2D06B"],
    lines: ["FAMILY 31", "Blankets encouraged."] },
  { id: "fmly-morn-1", kind: "morning", channels: ["family-31"], palette: ["#7BC4A4", "#F2D06B", "#1D3A5F"],
    lines: ["GOOD MORNING", "The storybook is already open."] }
];
