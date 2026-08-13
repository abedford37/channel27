// ============================================================
// CHANNEL 27 CABLE SYSTEM — MEDIA CATALOG
// ============================================================
// Manually curated YouTube records. The repository stores ONLY
// metadata: video IDs, titles, attribution. No video files, no
// API keys, no scraping.
//
// sourceType: official | rights-holder | artist | label |
//             public-domain | creator-approved | unknown
//
// Only records with active: true are ever scheduled. If a video
// stops being available, the procedural fallback takes over
// automatically — flip active to false at your leisure.
//
// Curation policy (see README): prefer official uploads and
// public-domain material; avoid anonymous full-episode reuploads.
// ============================================================

window.C27 = window.C27 || {};

window.C27.MEDIA = [

  // ---------- public-domain theatrical animation (Toon 29) ----------
  // The Fleischer/Famous Superman shorts (1941-43) and the Popeye
  // Color Specials (1936-39) lapsed into the U.S. public domain;
  // both series are widely documented as PD (Library of Congress /
  // Internet Archive). Multiple uploads exist; alternates listed.
  {
    id: "pd-superman-1941",
    title: "Golden Age Theater",
    episodeTitle: "Superman: The Mad Scientist (1941)",
    type: "episode",
    provider: "youtube",
    videoId: "4zTK7hI-T64",
    duration: 620,
    captions: false,
    sourceChannel: "Public-domain upload (Fleischer Studios short)",
    sourceType: "public-domain",
    channels: ["toon-29"],
    active: true,
    fallbackStyle: "space",
    notes: "ID found via web search Jul 2026; existence verified, embeddability not verified from build environment. Fallback covers."
  },
  {
    id: "pd-superman-1941-alt",
    title: "Golden Age Theater",
    episodeTitle: "Superman vs. the Mad Scientist (1941, restored)",
    type: "episode",
    provider: "youtube",
    videoId: "xG9iin9oy1M",
    duration: 620,
    captions: false,
    sourceChannel: "Public-domain upload (restored print)",
    sourceType: "public-domain",
    channels: ["toon-29"],
    active: true,
    fallbackStyle: "space",
    notes: "Alternate upload of the same PD short. Same verification status."
  },
  {
    id: "pd-popeye-sindbad",
    title: "Golden Age Theater",
    episodeTitle: "Popeye the Sailor Meets Sindbad the Sailor (1936)",
    type: "episode",
    provider: "youtube",
    videoId: "39AxDJT3sdo",
    duration: 995,
    captions: false,
    sourceChannel: "Public-domain upload (Fleischer Color Special)",
    sourceType: "public-domain",
    channels: ["toon-29"],
    active: true,
    fallbackStyle: "toon",
    notes: "National Film Registry title; all three Popeye Color Specials are PD. ID found via web search Jul 2026."
  },
  {
    id: "pd-popeye-sindbad-alt",
    title: "Golden Age Theater",
    episodeTitle: "Popeye the Sailor Meets Sindbad the Sailor (35mm print)",
    type: "episode",
    provider: "youtube",
    videoId: "iGkymewRYnw",
    duration: 995,
    captions: false,
    sourceChannel: "Public-domain upload (35mm scan via Library of Congress print)",
    sourceType: "public-domain",
    channels: ["toon-29"],
    active: true,
    fallbackStyle: "toon",
    notes: "Alternate upload of the same PD short."
  },

  // ---------- official-upload music videos (Music 30) ----------
  // Era-appropriate (1996-1998) videos from artist/label channels.
  {
    id: "mv-torn",
    title: "Music 30 Rotation",
    episodeTitle: "Natalie Imbruglia — Torn (1997)",
    type: "music-video",
    provider: "youtube",
    videoId: "VV1XWJN3nJo",
    duration: 246,
    captions: false,
    sourceChannel: "Natalie Imbruglia (official artist channel)",
    sourceType: "official",
    channels: ["music-30"],
    active: true,
    fallbackStyle: "music",
    notes: "Official video upload. ID found via web search Jul 2026; embeddability not verified from build environment."
  },
  {
    id: "mv-wannabe",
    title: "Music 30 Rotation",
    episodeTitle: "Spice Girls — Wannabe (1996)",
    type: "music-video",
    provider: "youtube",
    videoId: "gJLIiF15wjQ",
    duration: 233,
    captions: false,
    sourceChannel: "Spice Girls (official channel)",
    sourceType: "official",
    channels: ["music-30"],
    active: true,
    fallbackStyle: "music",
    notes: "The long-standing official upload (linked from the song's Wikipedia article). Same verification status."
  },
  {
    id: "mv-believe",
    title: "Music 30 Rotation",
    episodeTitle: "Cher — Believe (1998)",
    type: "music-video",
    provider: "youtube",
    videoId: "nZXRV4MezEw",
    duration: 247,
    captions: false,
    sourceChannel: "Cher (official channel, 4K remaster)",
    sourceType: "official",
    channels: ["music-30"],
    active: true,
    fallbackStyle: "latenight",
    notes: "Official 4K remaster upload. Same verification status."
  }
,

  // ---------- ORANGE 28 (curated, all inactive pending embed test) ----------
  {
    id: "orange-double-dare-classic",
    title: "Saturday Mess",
    episodeTitle: "Double Dare OFFICIAL Classic Full Episode",
    type: "episode",
    provider: "youtube",
    videoId: "XEZCY95JliY",
    duration: 1324,
    captions: false,
    sourceChannel: "Nickelodeon",
    sourceType: "official",
    channels: ["orange-28"],
    active: false,
    fallbackStyle: "game",
    historicalYear: 2002,
    notes: "Official Nickelodeon upload; ID existence-confirmed via web search Aug 2026. Embeddability still requires local iframe test (full episodes are often embed-disabled by the network)."
  },
  {
    id: "orange-rugrats-imaginary-adventures",
    title: "Early Toons",
    episodeTitle: "Rugrats Imaginary Adventures & Play Time",
    type: "compilation",
    provider: "youtube",
    videoId: "ky9HCmmxc00",
    duration: 1837,
    captions: false,
    sourceChannel: "Nick Jr.",
    sourceType: "official",
    channels: ["orange-28"],
    active: false,
    fallbackStyle: "toon",
    historicalYear: 2002,
    notes: "Located from Nick Jr. Full URL: https://www.youtube.com/watch?v=ky9HCmmxc00 . Source appears official; iframe availability and captions require local verification."
  },
  {
    id: "orange-rugrats-find-reptar",
    title: "Lunchbox Toons",
    episodeTitle: "Rugrats Fight a Robot & Find Reptar",
    type: "compilation",
    provider: "youtube",
    videoId: "ifvSjE1I5pE",
    duration: 1823,
    captions: false,
    sourceChannel: "Nick Jr.",
    sourceType: "official",
    channels: ["orange-28"],
    active: false,
    fallbackStyle: "toon",
    historicalYear: 2002,
    notes: "Located from Nick Jr. Full URL: https://www.youtube.com/watch?v=ifvSjE1I5pE . Source appears official; iframe availability and captions require local verification."
  },
  {
    id: "orange-rugrats-babies-drive",
    title: "Lunchbox Toons",
    episodeTitle: "Rugrats Babies Drive Cars",
    type: "compilation",
    provider: "youtube",
    videoId: "uYMw4bCvY8I",
    duration: 1854,
    captions: false,
    sourceChannel: "Nick Jr.",
    sourceType: "official",
    channels: ["orange-28"],
    active: false,
    fallbackStyle: "toon",
    historicalYear: 2002,
    notes: "Located from Nick Jr. Full URL: https://www.youtube.com/watch?v=uYMw4bCvY8I . Source appears official; iframe availability and captions require local verification."
  },
  {
    id: "orange-rugrats-outer-space",
    title: "Prime Pop",
    episodeTitle: "Tommy Finds Reptar In Outer Space & Chuckie Gets a Balloon",
    type: "compilation",
    provider: "youtube",
    videoId: "WrKvjYarIX8",
    duration: 2616,
    captions: false,
    sourceChannel: "Nick Jr.",
    sourceType: "official",
    channels: ["orange-28"],
    active: false,
    fallbackStyle: "toon",
    historicalYear: 2002,
    notes: "Located from Nick Jr. Full URL: https://www.youtube.com/watch?v=WrKvjYarIX8 . Source appears official; iframe availability and captions require local verification."
  },
  {
    id: "orange-rugrats-pet-rescues",
    title: "Sunday Couch",
    episodeTitle: "Rugrats Best Pet Rescues",
    type: "compilation",
    provider: "youtube",
    videoId: "SE5k0bGxd-Y",
    duration: 3653,
    captions: false,
    sourceChannel: "Nick Jr.",
    sourceType: "official",
    channels: ["orange-28"],
    active: false,
    fallbackStyle: "toon",
    historicalYear: 2002,
    notes: "Located from Nick Jr. Full URL: https://www.youtube.com/watch?v=SE5k0bGxd-Y . Source appears official; iframe availability and captions require local verification."
  },

  // Contributors: add records here. Keep sourceType honest, set
  // active: true only after you have personally confirmed the video
  // plays in an embed, and list the channel(s) it may air on.
];
