/*
  CHANNEL 30 - MUSIC
  Original synthesized schedule; no legacy network or program branding reproduced.
  All Channel 30 program names are original.

  Historical grounding:
  - Weekday afternoon request-countdown pattern (TRL-era, ~3:30-5:00 PM):
    https://www.forbes.com/2007/02/15/mtv-trl-viacom-tech-media-cx_lh_0215mtv.html
  - Weekend video countdown expanding to twenty videos (2001):
    https://en.wikipedia.org/wiki/VH1_Top_20_Video_Countdown
  - Weekend/late-evening acoustic sessions (2001-2002 archives):
    https://www.fernsehserien.de/mtv-unplugged/sendetermine/mtv/-1

  Rhythm: morning rotation, a 15:30 weekday request countdown, rotating evening
  genre blocks, electronic after 23:00, weekend countdown and acoustic sessions.
*/

window.C27 = window.C27 || {};
window.C27.SCHEDULES = window.C27.SCHEDULES || {};

window.C27.SCHEDULES["music-30"] = {
  mon: [
    ["00:00", "music-neon-frequency"], ["02:00", "music-full-spectrum"], ["06:00", "music-sunrise-rotation"],
    ["10:00", "music-full-spectrum"], ["13:00", "music-pop-prism"], ["15:30", "music-request-line-ten"],
    ["17:00", "music-soul-circuit"], ["19:00", "music-rhyme-relay"], ["21:00", "music-guitar-voltage"],
    ["23:00", "music-neon-frequency"]
  ],
  tue: [
    ["00:00", "music-neon-frequency"], ["02:00", "music-full-spectrum"], ["06:00", "music-sunrise-rotation"],
    ["10:00", "music-full-spectrum"], ["13:00", "music-soul-circuit"], ["15:30", "music-request-line-ten"],
    ["17:00", "music-pop-prism"], ["19:00", "music-guitar-voltage"], ["21:00", "music-soul-circuit"],
    ["23:00", "music-neon-frequency"]
  ],
  wed: [
    ["00:00", "music-neon-frequency"], ["02:00", "music-full-spectrum"], ["06:00", "music-sunrise-rotation"],
    ["10:00", "music-full-spectrum"], ["13:00", "music-rhyme-relay"], ["15:30", "music-request-line-ten"],
    ["17:00", "music-soul-circuit"], ["19:00", "music-rhyme-relay"], ["21:00", "music-guitar-voltage"],
    ["23:00", "music-neon-frequency"]
  ],
  thu: [
    ["00:00", "music-neon-frequency"], ["02:00", "music-full-spectrum"], ["06:00", "music-sunrise-rotation"],
    ["10:00", "music-full-spectrum"], ["13:00", "music-guitar-voltage"], ["15:30", "music-request-line-ten"],
    ["17:00", "music-pop-prism"], ["19:00", "music-soul-circuit"], ["21:00", "music-guitar-voltage"],
    ["23:00", "music-neon-frequency"]
  ],
  fri: [
    ["00:00", "music-neon-frequency"], ["02:00", "music-full-spectrum"], ["06:00", "music-sunrise-rotation"],
    ["10:00", "music-full-spectrum"], ["13:00", "music-pop-prism"], ["15:30", "music-request-line-ten"],
    ["17:00", "music-full-spectrum"], ["20:00", "music-guitar-voltage"], ["22:00", "music-neon-frequency"]
  ],
  sat: [
    ["00:00", "music-neon-frequency"], ["03:00", "music-full-spectrum"], ["06:00", "music-sunrise-rotation"],
    ["09:00", "music-weekend-twenty"], ["12:00", "music-bare-wire-sessions"], ["14:00", "music-full-spectrum"],
    ["16:00", "music-request-line-ten"], ["18:00", "music-pop-prism"], ["20:00", "music-guitar-voltage"],
    ["22:00", "music-neon-frequency"]
  ],
  sun: [
    ["00:00", "music-neon-frequency"], ["03:00", "music-full-spectrum"], ["07:00", "music-sunrise-rotation"],
    ["09:00", "music-bare-wire-sessions"], ["11:00", "music-weekend-twenty"], ["14:00", "music-soul-circuit"],
    ["16:00", "music-rhyme-relay"], ["18:00", "music-full-spectrum"], ["20:00", "music-guitar-voltage"],
    ["22:00", "music-neon-frequency"]
  ]
};
