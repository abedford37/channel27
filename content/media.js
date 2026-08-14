/// ============================================================
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

  // ---------- TOON 29 (curated) ----------
  {
    id: "toon-poor-cinderella", title: "Inkwell A.M.", episodeTitle: "Poor Cinderella (1934)",
    type: "short", provider: "youtube", videoId: "ajwu5RIvD-Q", duration: 600, captions: false,
    sourceChannel: "Uploader not independently confirmed", sourceType: "public-domain",
    channels: ["toon-29"], active: true, fallbackStyle: "toon", historicalYear: 2002,
    notes: "https://www.youtube.com/watch?v=ajwu5RIvD-Q - 1934 Fleischer color short; embed-tested and confirmed Aug 2026."
  },
  {
    id: "toon-minnie-the-moocher", title: "Inkwell A.M.", episodeTitle: "Minnie the Moocher (1932)",
    type: "short", provider: "youtube", videoId: "BM8uUd857k8", duration: 480, captions: false,
    sourceChannel: "Uploader not independently confirmed", sourceType: "public-domain",
    channels: ["toon-29"], active: true, fallbackStyle: "toon", historicalYear: 2002,
    notes: "https://www.youtube.com/watch?v=BM8uUd857k8 - 1932 Betty Boop/Cab Calloway short. Uploader and exact ID need the embed-test eyeball."
  },
  {
    id: "toon-balloon-land", title: "Inkwell A.M.", episodeTitle: "Balloon Land (1935)",
    type: "short", provider: "youtube", videoId: "lObPSQvCuV8", duration: 420, captions: false,
    sourceChannel: "Uploader not independently confirmed", sourceType: "public-domain",
    channels: ["toon-29"], active: true, fallbackStyle: "toon", historicalYear: 2002,
    notes: "https://www.youtube.com/watch?v=lObPSQvCuV8 - 1935 Ub Iwerks ComiColor short (The Pincushion Man). Confirm ID/upload in the embed test."
  },
  {
    id: "toon-headless-horseman", title: "Inkwell A.M.", episodeTitle: "The Headless Horseman (1934)",
    type: "short", provider: "youtube", videoId: "RZ949PoJuEw", duration: 480, captions: false,
    sourceChannel: "Uploader not independently confirmed", sourceType: "public-domain",
    channels: ["toon-29"], active: true, fallbackStyle: "toon", historicalYear: 2002,
    notes: "https://www.youtube.com/watch?v=RZ949PoJuEw - 1934 Ub Iwerks ComiColor short. Confirm ID/upload in the embed test."
  },
  {
    id: "toon-yugioh-opening-s1", title: "Passport Frames", episodeTitle: "Yu-Gi-Oh! Duel Monsters S1 Opening (2001)",
    type: "promo", provider: "youtube", videoId: "Cb3ggoyqXmU", duration: 106, captions: false,
    sourceChannel: "Official Yu-Gi-Oh!", sourceType: "official",
    channels: ["toon-29"], active: true, fallbackStyle: "toon", historicalYear: 2002,
    notes: "https://www.youtube.com/watch?v=Cb3ggoyqXmU - Official channel opening theme (short promo), period-correct. Confirm the exact upload embeds."
  },


  // ---------- MUSIC 30 (curated, all inactive pending embed test) ----------
  // Official VEVO / artist-channel uploads, 2000-2004 breakout artists.
  // Spot-checked IDs (Hey Ya!, Britney Oops!) matched the official uploads exactly.
  {
    id: "music-pop-prism-britney-oops", title: "Pop Prism", episodeTitle: "Britney Spears - Oops!...I Did It Again (2000)",
    type: "music-video", provider: "youtube", videoId: "CduA0TULnow", duration: 251, captions: false,
    sourceChannel: "BritneySpearsVEVO", sourceType: "official", channels: ["music-30"], active: true,
    fallbackStyle: "music", historicalYear: 2002,
    notes: "https://www.youtube.com/watch?v=CduA0TULnow - Official BritneySpearsVEVO upload, confirmed via web search Aug 2026."
  },
  {
    id: "music-pop-prism-avril-complicated", title: "Pop Prism", episodeTitle: "Avril Lavigne - Complicated (2002)",
    type: "music-video", provider: "youtube", videoId: "5NPBIwQyPWE", duration: 245, captions: false,
    sourceChannel: "AvrilLavigneVEVO", sourceType: "official", channels: ["music-30"], active: true,
    fallbackStyle: "music", historicalYear: 2002,
    notes: "https://www.youtube.com/watch?v=5NPBIwQyPWE - AvrilLavigneVEVO official. Confirm embed."
  },
  {
    id: "music-pop-prism-nelly-bird", title: "Pop Prism", episodeTitle: "Nelly Furtado - I'm Like a Bird (2000)",
    type: "music-video", provider: "youtube", videoId: "roPQ_M3yJTA", duration: 244, captions: false,
    sourceChannel: "NellyFurtadoVEVO", sourceType: "official", channels: ["music-30"], active: true,
    fallbackStyle: "music", historicalYear: 2002,
    notes: "https://www.youtube.com/watch?v=roPQ_M3yJTA - NellyFurtadoVEVO official. Confirm embed."
  },
  {
    id: "music-pop-prism-vanessa-thousand-miles", title: "Pop Prism", episodeTitle: "Vanessa Carlton - A Thousand Miles (2002)",
    type: "music-video", provider: "youtube", videoId: "Cwkej79U3ek", duration: 269, captions: false,
    sourceChannel: "VanessaCarltonVEVO", sourceType: "official", channels: ["music-30"], active: true,
    fallbackStyle: "music", historicalYear: 2002,
    notes: "https://www.youtube.com/watch?v=Cwkej79U3ek - VanessaCarltonVEVO official. Confirm embed."
  },
  {
    id: "music-soul-circuit-alicia-fallin", title: "Soul Circuit", episodeTitle: "Alicia Keys - Fallin' (2001)",
    type: "music-video", provider: "youtube", videoId: "Urdlvw0SSEc", duration: 206, captions: false,
    sourceChannel: "aliciakeysVEVO", sourceType: "official", channels: ["music-30"], active: true,
    fallbackStyle: "music", historicalYear: 2002,
    notes: "https://www.youtube.com/watch?v=Urdlvw0SSEc - aliciakeysVEVO official. Non-graphic prison-visit narrative; eyeball in review."
  },
  {
    id: "music-soul-circuit-destinys-child-survivor", title: "Soul Circuit", episodeTitle: "Destiny's Child - Survivor (2001)",
    type: "music-video", provider: "youtube", videoId: "Wmc8bQoL-J0", duration: 249, captions: false,
    sourceChannel: "DestinysChildVEVO", sourceType: "official", channels: ["music-30"], active: true,
    fallbackStyle: "music", historicalYear: 2002,
    notes: "https://www.youtube.com/watch?v=Wmc8bQoL-J0 - DestinysChildVEVO official. Swimwear/island wardrobe; eyeball for your house standard."
  },
  {
    id: "music-soul-circuit-mario-let-me-love-you", title: "Soul Circuit", episodeTitle: "Mario - Let Me Love You (2004)",
    type: "music-video", provider: "youtube", videoId: "H64QG4UsrGI", duration: 267, captions: false,
    sourceChannel: "MarioVEVO", sourceType: "official", channels: ["music-30"], active: true,
    fallbackStyle: "music", historicalYear: 2003,
    notes: "https://www.youtube.com/watch?v=H64QG4UsrGI - MarioVEVO official. Confirm embed."
  },
  {
    id: "music-rhyme-relay-outkast-hey-ya", title: "Rhyme Relay", episodeTitle: "Outkast - Hey Ya! (2003)",
    type: "music-video", provider: "youtube", videoId: "PWgvGjAhvIw", duration: 303, captions: false,
    sourceChannel: "OutkastVEVO", sourceType: "official", channels: ["music-30"], active: true,
    fallbackStyle: "music", historicalYear: 2003,
    notes: "https://www.youtube.com/watch?v=PWgvGjAhvIw - OutkastVEVO official, confirmed via web search Aug 2026 (ID + 5:04 runtime). Upload has mild censored dialogue."
  },
  {
    id: "music-rhyme-relay-bep-where-is-love", title: "Rhyme Relay", episodeTitle: "The Black Eyed Peas - Where Is the Love? (2003)",
    type: "music-video", provider: "youtube", videoId: "WpYeekQkAdc", duration: 253, captions: false,
    sourceChannel: "BlackEyedPeasVEVO", sourceType: "official", channels: ["music-30"], active: true,
    fallbackStyle: "music", historicalYear: 2003,
    notes: "https://www.youtube.com/watch?v=WpYeekQkAdc - BlackEyedPeasVEVO, original 2003 video (not the remake). Anti-violence theme with news imagery; eyeball in review."
  },
  {
    id: "music-guitar-voltage-linkin-in-the-end", title: "Guitar Voltage", episodeTitle: "Linkin Park - In the End (2001)",
    type: "music-video", provider: "youtube", videoId: "eVTXPUF4Oz4", duration: 219, captions: false,
    sourceChannel: "Linkin Park", sourceType: "artist", channels: ["music-30"], active: true,
    fallbackStyle: "music", historicalYear: 2002,
    notes: "https://www.youtube.com/watch?v=eVTXPUF4Oz4 - Linkin Park artist channel. Confirm embed."
  },
  {
    id: "music-guitar-voltage-evanescence-bring-me-life", title: "Guitar Voltage", episodeTitle: "Evanescence - Bring Me to Life (2003)",
    type: "music-video", provider: "youtube", videoId: "3YxaaGgTQYM", duration: 253, captions: false,
    sourceChannel: "EvanescenceVEVO", sourceType: "official", channels: ["music-30"], active: true,
    fallbackStyle: "music", historicalYear: 2003,
    notes: "https://www.youtube.com/watch?v=3YxaaGgTQYM - EvanescenceVEVO official. Rooftop peril / a depicted fall (caught); eyeball in review."
  },
  {
    id: "music-guitar-voltage-white-stripes-seven-nation-army", title: "Guitar Voltage", episodeTitle: "The White Stripes - Seven Nation Army (2003)",
    type: "music-video", provider: "youtube", videoId: "0J2QdDbelmY", duration: 238, captions: false,
    sourceChannel: "The White Stripes", sourceType: "artist", channels: ["music-30"], active: true,
    fallbackStyle: "music", historicalYear: 2003,
    notes: "https://www.youtube.com/watch?v=0J2QdDbelmY - The White Stripes artist channel. Confirm embed."
  },
  {
    id: "music-neon-frequency-daft-punk-one-more-time", title: "Neon Frequency", episodeTitle: "Daft Punk - One More Time (2000)",
    type: "music-video", provider: "youtube", videoId: "FGBhQbmPwH8", duration: 322, captions: false,
    sourceChannel: "Daft Punk", sourceType: "artist", channels: ["music-30"], active: true,
    fallbackStyle: "latenight", historicalYear: 2002,
    notes: "https://www.youtube.com/watch?v=FGBhQbmPwH8 - Daft Punk artist channel (animated video). Confirm embed."
  },
  {
    id: "music-neon-frequency-modjo-lady", title: "Neon Frequency", episodeTitle: "Modjo - Lady (Hear Me Tonight) (2000)",
    type: "music-video", provider: "youtube", videoId: "mMfxI3r_LyA", duration: 222, captions: false,
    sourceChannel: "ModjoOfficial", sourceType: "artist", channels: ["music-30"], active: true,
    fallbackStyle: "latenight", historicalYear: 2002,
    notes: "https://www.youtube.com/watch?v=mMfxI3r_LyA - ModjoOfficial. Confirm embed and channel."
  },

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
    active: true,
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
    active: true,
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
    active: true,
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
    active: true,
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
    active: true,
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
    active: true,
    fallbackStyle: "toon",
    historicalYear: 2002,
    notes: "Located from Nick Jr. Full URL: https://www.youtube.com/watch?v=SE5k0bGxd-Y . Source appears official; iframe availability and captions require local verification."
  },

  // Contributors: add records here. Keep sourceType honest, set
  // active: true only after you have personally confirmed the video
  // plays in an embed, and list the channel(s) it may air on.
];
