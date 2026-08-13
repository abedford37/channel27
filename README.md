# 📺 Channel 27

**The channel that never went off the air.**

Channel 27 is an open-source television station from an alternate timeline — and now it comes with basic cable. There is no login, no profile, no recommendations, and no scroll. You open the site and the TV is already on. You join whatever is currently airing, and if you don't like it, you change the channel — exactly like cable television in 1998.

Channel 27 itself is entirely original: the cartoons, the sitcoms, the game shows, the commercials for Indoor Mud and the Remote Remote. Nothing is copied from real shows or brands. Only the *feeling* is borrowed. The four newer channels on the dial are unofficial homages to the *rhythms* of late-90s cable — see [Historical Programming and Embedded Media](#historical-programming-and-embedded-media).

## The dial

| # | Channel | Identity |
|---|---------|----------|
| 27 | **Channel 27** | The original alternate-timeline station. All-procedural, all-original, unchanged. |
| 28 | **Orange** | Youth programming. Preschool mornings, after-school cartoons, slime-adjacent game shows, spooky Saturdays, comfort reruns overnight. |
| 29 | **Toon** | All animation. Public-domain theatrical classics in the morning, comedy after school, action and giant robots at night, experimental ink after midnight. |
| 30 | **Music** | Music videos. Morning rotation, an afternoon request countdown, genre blocks by night. Carries real, officially uploaded 90s videos. |
| 31 | **Family** | Storybooks, educational afternoons, a nightly family movie, and a channel that tucks itself in. |

## Try it

```bash
# any static server works; no build step, no dependencies
cd channel27
python -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` directly from `file://` also works for everything procedural; the YouTube embeds need a real `http(s)` origin, and simply stay procedural without one.

### Controls

| Input | Action |
|---|---|
| **↑ / ↓** or **CH+ / CH−** | Channel up / down |
| **Number keys**, then **Enter** | Direct channel entry (dead numbers get you snow) |
| **G** / GUIDE | TV guide — ON NOW (all channels) and LISTINGS (current channel) |
| **M** / SOUND | Sound (always off until you turn it on) |
| **C** / CC | Closed captions |
| **F** / ⛶ | Fullscreen |

The guide footer has two accessibility preferences: **CRT effects** (scanlines/vignette off) and **Reduce flashing** (shorter, dimmer channel-change static). Both persist, as do your channel and caption choices. Your *position in a program* is never saved — the broadcast doesn't wait for anyone.

## How it works

The broadcast is a **pure function of the clock, per channel**. There is no backend and no stored playback state. Two people watching the same channel at the same local time see the same show, the same scene, the same commercials — the scheduler seeds a deterministic RNG with each program block's start time (and channel) and slices the block into content segments and commercial breaks. Refreshing, channel-hopping, or waking a sleeping tab just recalculates position from the clock.

Every program *always* broadcasts as a procedural canvas cartoon — little characters with walk cycles, sitcom couches, game-show podiums — in the show's palette, with episode scenes delivered as closed-caption-style lines. When a block has real footage (a contributed local file or a curated YouTube embed), that footage plays **on top of** the cartoon, seek-synced to broadcast time. If the footage fails, ends early, or never loads, the cartoon underneath simply is the signal again; at most you'll see a brief `SIGNAL UNAVAILABLE — Original Channel 27 presentation continues.`

```
content/                ← everything a contributor usually touches
  channels.js           the dial: numbers, names, palettes, taglines
  shows.js              programs, episodes, scenes, palettes, mediaPools
  commercials.js        fake ads, PSAs, infomercials (channel-eligible)
  bumpers.js            station IDs, "be right back", "up next" (per-channel)
  media.js              curated YouTube records: IDs + attribution ONLY
  schedules/
    channel27.js …31.js one weekly grid per channel: ["HH:MM", "show-id"]
js/
  scheduler.js          clock + channel → block → segment (deterministic)
  ambient.js            per-genre procedural cartoons ("the signal")
  audio.js              synthesized static pops, stingers, CRT hum
  video.js              media controller + local tape deck
  youtube.js            one YouTube player, broadcast-synced, failure-aware
  app.js                renderer, channel surfing, guide, prefs, a11y
css/style.css           the tube, the overlays, the Prevue-blue guide
index.html
```

Content files are validated on load — duplicate channel numbers, unknown show or media IDs, days that don't start at `00:00`, bad time strings, unknown providers, and similar mistakes produce `console.warn` messages in the browser console.

## Historical Programming and Embedded Media

- **Channel 27's programming is fictional and original.** It is the heart of the project and never depends on third-party media.
- **Channels 28–31 are unofficial homages** to the programming *rhythms* of late-1990s cable networks (youth, animation, music, and family channels respectively). They are **not affiliated with, endorsed by, or connected to** the networks that inspired them, and they use none of those networks' names, logos, or branding. Schedule comments in `content/schedules/` note the historical grounding.
- **This project hosts no third-party television or music content.** The repository contains only metadata: YouTube video IDs, titles, and attribution. Embedded videos play from their original source via the official YouTube player. Copyright remains with the respective owners.
- **Availability may change.** If a video is removed, made private, or has embedding disabled, the channel doesn't break — the procedural broadcast continues, and the record can be marked `active: false` in `content/media.js`.
- **Curation policy for contributors,** in order of preference: official network/studio uploads → official artist and label uploads → rights-holder channels → public-domain material → creator-approved uploads. Avoid anonymous full-episode reuploads. When nothing suitable exists, the correct move is a procedural program — that's not a fallback of last resort, it's the house style.

Embedding a video does not grant this project any license or ownership; it simply plays the video from where its uploader published it, subject to YouTube's embedding controls.

### Attribution table

| Program | Video | Source channel | Source type | Media status |
|---|---|---|---|---|
| Golden Age Theater (29) | Superman: The Mad Scientist (1941) — `4zTK7hI-T64` | Public-domain upload (Fleischer short) | public-domain | active, embed unverified* |
| Golden Age Theater (29) | Superman vs. the Mad Scientist (1941, restored) — `xG9iin9oy1M` | Public-domain upload | public-domain | active, embed unverified* |
| Golden Age Theater (29) | Popeye Meets Sindbad the Sailor (1936) — `39AxDJT3sdo` | Public-domain upload (Fleischer Color Special) | public-domain | active, embed unverified* |
| Golden Age Theater (29) | Popeye Meets Sindbad (35mm print) — `iGkymewRYnw` | Public-domain upload (LoC print scan) | public-domain | active, embed unverified* |
| Wake-Up Videos / Request Line (30) | Natalie Imbruglia — Torn — `VV1XWJN3nJo` | Official artist channel | official | active, embed unverified* |
| Wake-Up Videos / Request Line (30) | Spice Girls — Wannabe — `gJLIiF15wjQ` | Official channel | official | active, embed unverified* |
| Rotation / Transmission (30) | Cher — Believe (4K remaster) — `nZXRV4MezEw` | Official artist channel | official | active, embed unverified* |

\* IDs were located and existence-verified via web search in July 2026, but embed playback could not be tested from the environment this was built in. Each record's `notes` field says the same. If one doesn't play for you, the procedural fallback covers it — and flipping `active: false` retires it cleanly.

## Contributing

The whole point of the architecture is that **content is data**. To contribute you should almost never need to touch `js/`.

### Add a channel
Add a record to `content/channels.js` (unique `number` and `id`), create `content/schedules/channelNN.js` registering `window.C27.SCHEDULES["your-id"]`, add its script tag to `index.html`, and give it programs in `shows.js`. That's the whole checklist — surfing, the guide, bumper eligibility, and validation pick it up automatically.

### Add a show
Add an object to `content/shows.js`:

```js
{
  id: "my-show",                 // unique, kebab-case
  title: "My Show",
  genre: "Cartoon",
  rating: "TV-Y7",               // TV-Y | TV-Y7 | TV-G | TV-PG | TV-14
  style: "toon",                 // see ambient styles below
  palette: ["#202040", "#404080", "#FFCC44"],  // [bgA, bgB, accent]
  tagline: "One sentence of attitude.",
  episodes: [
    { title: "Pilot", synopsis: "...", scenes: ["Line 1.", "Line 2."] }
  ]
}
```

Then schedule it in the channel's file under `content/schedules/`. Every day starts at `00:00`; a block runs until the next block begins.

**Ambient styles:** `toon`, `preschool`, `space`, `music`, `game`, `nature`, `cooking`, `news`, `sitcom`, `movie`, `latenight`, `infomercial`. Add new ones in `js/ambient.js`.

### Add local footage to an episode
Any episode (or commercial) can carry contributed video, exactly as before:

```js
media: { src: "media/my-show-pilot.mp4", loop: true }
// equivalently: media: { provider: "local", src: "...", loop: true }
```

The tape deck plays it over the procedural cartoon, seek-synced to broadcast time.

### Add a YouTube media record
Add to `content/media.js`:

```js
{
  id: "my-record",
  title: "Program Title",
  episodeTitle: "What this specific video is",
  type: "episode",              // episode | music-video | compilation | short | …
  provider: "youtube",
  videoId: "VIDEO_ID",
  duration: 1320,               // seconds; lets non-loop videos end cleanly
  captions: true,               // does the upload have captions?
  sourceChannel: "Who uploaded it",
  sourceType: "official",       // official | rights-holder | artist | label |
                                // public-domain | creator-approved | unknown
  channels: ["music-30"],
  active: true,                 // only after you've confirmed it embeds
  fallbackStyle: "music",       // ambient style if playback fails
  notes: "Where/when you verified it."
}
```

Then reference it from a show's `mediaPool: ["my-record", …]` — the scheduler rotates through eligible pool entries deterministically, per block, per week. Or attach it directly to one episode with `media: { provider: "youtube", videoId: "...", duration: 1320 }`.

### Add a commercial or bumper
Same as ever, in `content/commercials.js` / `content/bumpers.js`. Both now accept an optional `channels: ["orange-28"]` eligibility list (omitted = airs everywhere) and bumpers accept a `palette: [bg, glow, accent]` override. `{SHOW}` in a bumper line becomes the next program's title. Seasonal ads (`season: "halloween" | "christmas" | "summer"`) only air in the right month.

### Guidelines
- **Channel 27 stays original.** No copyrighted characters, shows, brands, lyrics, or logos in its content — not even renamed. Capture the era's energy, never its IP.
- **Channels 28–31 embed, never copy.** Real titles may appear as factual metadata for a linked authorized video; artwork, logos, and video files may not enter the repository.
- Keep it kind. Weird is great, mean isn't. Late-night can be surreal, not offensive.
- Believability is the joke. The best content sounds like it genuinely could have aired.

## Deploying to GitHub Pages

1. Push the repository to GitHub.
2. **Settings → Pages → Source:** deploy from branch, `main`, `/ (root)`.
3. Visit `https://<username>.github.io/<repo>/`.

That's it — static files only, no build step, no dependencies, no keys. The YouTube embeds work on Pages because it serves over `https`.

## Known limitations

- **Embeds are at the uploader's mercy.** Owners can disable embedding (error 101/150) or remove videos; the fallback exists precisely for this.
- **Toggling captions re-cues the current video** (the YouTube player only accepts the caption policy at construction). It re-syncs to broadcast time immediately.
- **Sound stays off until you enable it**, and browsers may additionally require that first click before any media audio plays. Local tape files start muted regardless.
- **`file://` viewing is procedural-only** — the YouTube IFrame API needs an `http(s)` origin.
- **YouTube embeds need a valid referrer.** Since late 2025 YouTube rejects embeds with no `Referer` header, failing with *Error 153: video player configuration error*. The page sets `<meta name="referrer" content="strict-origin-when-cross-origin">` and the player uses the `youtube-nocookie.com` host to satisfy this. It only works when served over http(s); from `file://` there is no origin to send, so **Error 153 on every video means you're on file:// (or a referrer-stripping context), not that the videos are blocked.**
- The seven curated video IDs shipped here were existence-verified but not embed-tested (see the attribution table).

## Roadmap ideas
- Channels 32–37 (Action, Retro, Public Access, Late Night, Game Shows, News & Weather) — the registry already supports them
- Themed weeks (Halloween, holiday specials) via seasonal schedules
- Emergency Broadcast System test; a sign-off card for stations that *do* go off air
- A community media-record review checklist

## License

MIT. Broadcast responsibly.
