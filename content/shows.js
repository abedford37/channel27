// ============================================================
// CHANNEL 27 — SHOW LIBRARY
// ============================================================
// Contributors: add a show object to this array and schedule it
// in content/schedule.js. No code changes needed.
//
// style options (ambient screen animation):
//   toon | space | music | game | nature | latenight | cooking
//   news | sitcom | movie | infomercial | preschool
//
// rating options: TV-Y | TV-Y7 | TV-G | TV-PG | TV-14
// palette: [backgroundA, backgroundB, accent]
// ============================================================

window.C27 = window.C27 || {};

window.C27.SHOWS = [

  // ---------------- KIDS & CARTOONS ----------------
  {
    id: "gadget-goblins",
    title: "Gadget Goblins",
    genre: "Cartoon",
    rating: "TV-Y7",
    style: "toon",
    palette: ["#2E1D4E", "#5B2A86", "#7FFF6A"],
    tagline: "Three goblins. One repair shop. Zero warranties.",
    episodes: [
      {
        title: "The Toaster That Knew Too Much",
        synopsis: "Grub fixes a toaster so well it starts predicting the weather. The mall food court descends into chaos.",
        scenes: [
          "GRUB: I only replaced the springy part!",
          "The toaster ejects a bagel with tomorrow's forecast burned into it.",
          "NIBLET: Sell it. Sell it immediately.",
          "Forty mall employees line up outside the vent with bread.",
          "WRENCHIE: We are not a weather service. We are barely a repair service.",
          "The toaster predicts hail. Indoors. It is correct."
        ]
      },
      {
        title: "Escalator Day",
        synopsis: "The mall escalator breaks and the goblins are legally the only ones small enough to fix it.",
        scenes: [
          "The escalator has been stopped for three hours. Society is collapsing.",
          "WRENCHIE descends into the machinery with a flashlight and a sandwich.",
          "GRUB: Whatever you do, don't touch the big gear.",
          "A long silence. Then the entire mall begins moving like an escalator.",
          "NIBLET: New plan. We live here now.",
          "The food court travels majestically past the second floor."
        ]
      },
      {
        title: "The Warranty",
        synopsis: "A customer returns with a receipt. The goblins have never seen a receipt before.",
        scenes: [
          "CUSTOMER: It says right here, 'lifetime guarantee.'",
          "GRUB: Whose lifetime? Be specific.",
          "The goblins convene an emergency meeting inside a shoebox.",
          "WRENCHIE: We fix it for free, but we keep one screw. For dignity.",
          "The customer agrees. The device works better without the screw.",
          "NIBLET frames the receipt. It hangs in the vent to this day."
        ]
      }
    ]
  },

  {
    id: "space-camp-dropouts",
    title: "Space Camp Dropouts",
    genre: "Cartoon",
    rating: "TV-Y7",
    style: "space",
    palette: ["#050B24", "#14295E", "#FF7A3D"],
    tagline: "They failed the class. They passed the launch pad.",
    episodes: [
      {
        title: "Technically In Orbit",
        synopsis: "Four kids get kicked out of space camp and accidentally launch the demonstration shuttle.",
        scenes: [
          "PIA: Which one of you leaned on the ignition podium?",
          "Everyone looks at Dennis. Dennis looks at the ceiling.",
          "MISSION CONTROL: Please return the shuttle. Please.",
          "TOBY: We're keeping it. It has cup holders.",
          "The Earth rotates gently below. Dennis waves at Ohio.",
          "PIA: Okay. New rule. Nobody leans on anything ever again."
        ]
      },
      {
        title: "The Moon Is Closed",
        synopsis: "The crew lands on the moon and finds a sign that says CLOSED FOR RENOVATION.",
        scenes: [
          "The sign creaks in a wind that should not exist.",
          "DENNIS: Renovated by WHO?",
          "A moon janitor appears, sweeping craters into a dustpan.",
          "JANITOR: Come back Tuesday. We're regrouting the Sea of Tranquility.",
          "TOBY leaves a five-star review anyway.",
          "PIA: This raises so many questions and I refuse to ask any of them."
        ]
      }
    ]
  },

  {
    id: "mrs-tentacles",
    title: "Mrs. Tentacle's 3rd Grade",
    genre: "Cartoon",
    rating: "TV-Y",
    style: "toon",
    palette: ["#0B3D4E", "#127A8A", "#FFD24B"],
    tagline: "The best teacher in town has eight arms and infinite patience.",
    episodes: [
      {
        title: "Show and Tell and Tell and Tell",
        synopsis: "Mrs. Tentacle grades eight presentations simultaneously. One of them is a live volcano.",
        scenes: [
          "MRS. TENTACLE: Wonderful diorama, Marcus. Slightly concerned it's smoking.",
          "MARCUS: That's the realism.",
          "One tentacle waters the class plant. One holds an umbrella over the volcano.",
          "The volcano erupts politely, as rehearsed.",
          "MRS. TENTACLE: A-plus for ambition. B-minus for the ceiling.",
          "The class applauds. The sprinklers applaud harder."
        ]
      },
      {
        title: "Field Trip to the Aquarium",
        synopsis: "Mrs. Tentacle takes the class to the aquarium, where everyone thinks she's an exhibit.",
        scenes: [
          "A tour guide begins describing Mrs. Tentacle to a crowd.",
          "GUIDE: Note the reading glasses, unusual for a cephalopod.",
          "MRS. TENTACLE: I am a certified educator, thank you.",
          "The crowd applauds. Someone asks for a photo.",
          "She signs autographs with four pens at once.",
          "The octopus in tank 9 is visibly jealous."
        ]
      }
    ]
  },

  {
    id: "turbo-snail-patrol",
    title: "Turbo Snail Patrol",
    genre: "Cartoon",
    rating: "TV-Y7",
    style: "toon",
    palette: ["#12401E", "#1F7A3A", "#FF4FA3"],
    tagline: "Justice, eventually.",
    episodes: [
      {
        title: "The Slow Chase",
        synopsis: "The Patrol pursues a runaway shopping cart across town. The chase takes nine days.",
        scenes: [
          "SIREN SNAIL: We got a runner!",
          "The shopping cart drifts at two miles per hour. It is uncatchable.",
          "DAY FOUR: The Patrol stops for lunch. The cart also appears to stop for lunch.",
          "DAY SEVEN: An emotional montage. Rain. Determination. Lettuce.",
          "DAY NINE: The cart rolls gently into a hedge. The Patrol arrives triumphant.",
          "CAPTAIN SHELLY: Book him. Slowly."
        ]
      },
      {
        title: "Fast Day",
        synopsis: "A freak storm makes everything slippery, and the Patrol becomes terrifyingly fast for one day.",
        scenes: [
          "The rain begins. The Patrol exchanges a slow, meaningful look.",
          "CAPTAIN SHELLY: Patrol... today we ZOOM.",
          "They rocket down Main Street at a blistering walking pace.",
          "Criminals everywhere panic. There are two criminals. Both are raccoons.",
          "By sunset the streets are dry and justice is slow again.",
          "SIREN SNAIL: We fly too close to the sun, and it was awesome."
        ]
      }
    ]
  },

  {
    id: "cul-de-sac",
    title: "The Mysterious Cul-de-Sac",
    genre: "Cartoon",
    rating: "TV-Y7",
    style: "toon",
    palette: ["#3D2B1F", "#6B4A2F", "#7ADFFF"],
    tagline: "Something strange is going on. Probably. We'll check after snacks.",
    episodes: [
      {
        title: "The Sprinkler Conspiracy",
        synopsis: "Every sprinkler on the street turns on at 3:07 PM. The kids demand answers.",
        scenes: [
          "JUNE: 3:07. Every day. That's not a coincidence, that's a PATTERN.",
          "OMAR: Or a timer.",
          "JUNE: A timer set by WHOM, Omar?",
          "Stakeout montage. Binoculars. Juice boxes. A very long afternoon.",
          "At 3:07, the sprinklers activate. Mr. Petrakis waves from his porch.",
          "CASE STATUS: Unsolved. Snacks: Consumed."
        ]
      },
      {
        title: "The New Kid Who Might Be Old",
        synopsis: "A new kid moves in. He knows too much about the 1970s.",
        scenes: [
          "NEW KID: This reminds me of the summer of '76.",
          "JUNE (whispering): He wasn't ALIVE in '76. OR WAS HE.",
          "The kids test him with trivia. He aces disco. He fumbles fractions.",
          "OMAR: Every kid fumbles fractions. Inconclusive.",
          "The new kid's grandpa arrives and tells the same story, word for word.",
          "CASE STATUS: Genetic. Probably. Snacks: Consumed."
        ]
      }
    ]
  },

  {
    id: "captain-lunchbox",
    title: "Captain Lunchbox",
    genre: "Cartoon",
    rating: "TV-Y7",
    style: "toon",
    palette: ["#8A1E2D", "#C23A2B", "#FFE45E"],
    tagline: "His power comes from leftovers. His weakness is portion control.",
    episodes: [
      {
        title: "Cold Pizza, Hot Justice",
        synopsis: "The Captain must stop the Condiment Bandit armed only with two-day-old pizza.",
        scenes: [
          "CAPTAIN LUNCHBOX consumes the cold slice. His eyes glow marinara red.",
          "CONDIMENT BANDIT: You can't stop me! I've got packets for DAYS!",
          "A relish packet ricochets off the Captain's thermos shield.",
          "CAPTAIN: Your reign of flavor ends here.",
          "The Bandit is apprehended and sentenced to community service at a hot dog stand.",
          "NARRATOR: Remember kids — refrigerate your leftovers, and your destiny."
        ]
      },
      {
        title: "The Meatloaf Ultimatum",
        synopsis: "Grandma's meatloaf grants the Captain too much power. He must learn restraint.",
        scenes: [
          "One bite of the meatloaf and the Captain lifts a school bus. Gently. It's fine.",
          "MENTOR THERMOS: With great leftovers comes great responsibility.",
          "The Captain accidentally high-fives a water tower.",
          "He meditates atop the fridge until the power fades to a manageable glow.",
          "CAPTAIN: From now on... half portions.",
          "Grandma, offended, makes lasagna. The city braces itself."
        ]
      }
    ]
  },

  // ---------------- PRESCHOOL & EDUCATIONAL ----------------
  {
    id: "count-with-carl",
    title: "Count With Carl",
    genre: "Preschool",
    rating: "TV-Y",
    style: "preschool",
    palette: ["#F4E4C1", "#F7C873", "#4E7AC7"],
    tagline: "Carl is a moth. Carl loves counting. Carl loves you.",
    episodes: [
      {
        title: "How Many Lamps?",
        synopsis: "Carl counts lamps. It goes about how you'd expect.",
        scenes: [
          "CARL: One lamp! ... One beautiful lamp.",
          "CARL: TWO lamps! Oh, this is the best day of my life.",
          "Carl becomes distracted by lamp two for a while. We wait.",
          "CARL: Where was I? ONE lamp!",
          "CHORUS OF KIDS: THREE, CARL! THREE!",
          "CARL: THREE LAMPS! Counting is a miracle. Goodnight."
        ]
      },
      {
        title: "Counting Backwards",
        synopsis: "Carl attempts to count down from five. A journey.",
        scenes: [
          "CARL: Five! ...and now, the hard part.",
          "CARL: Four! I'm doing it! I'm actually doing it!",
          "A porch light turns on somewhere in the distance. Carl trembles.",
          "CARL: Stay strong, Carl. THREE!",
          "CARL: Two... one... ZERO! We did it together!",
          "Carl weeps softly with joy. The kids cheer. Roll credits."
        ]
      }
    ]
  },

  {
    id: "professor-pinecone",
    title: "Professor Pinecone's Backyard Lab",
    genre: "Educational",
    rating: "TV-Y",
    style: "nature",
    palette: ["#1E3A24", "#3F6B33", "#F2A93B"],
    tagline: "Real science. Real backyard. Real dirt under the fingernails.",
    episodes: [
      {
        title: "Why Is the Sky?",
        synopsis: "The Professor explains light scattering using a flashlight, a fish tank, and a splash of milk.",
        scenes: [
          "PROFESSOR PINECONE: Great question, Tulsa! Why IS the sky?",
          "A flashlight beam cuts through the milky water. It glows blue at the side.",
          "PROFESSOR: Little bits in the air bounce the blue light everywhere. That's your sky!",
          "At sunset, the beam turns orange at the far end of the tank.",
          "PROFESSOR: Longer path, warmer colors. Nature's lava lamp.",
          "TRY IT AT HOME: One flashlight. One fish tank. A drop of milk. Adult nearby."
        ]
      },
      {
        title: "The Worm Census",
        synopsis: "The Professor counts worms after the rain and explains why they surface.",
        scenes: [
          "PROFESSOR: Rain filled their tunnels with water, so up they come for air!",
          "Clipboard in hand, the Professor logs worm number fourteen.",
          "PROFESSOR: Worms till the soil like tiny farmers who work for free.",
          "A robin lands nearby. The Professor and the robin negotiate.",
          "PROFESSOR: You may have TWO. This is a census, not a buffet.",
          "FINAL COUNT: Thirty-one worms, one robin, zero regrets."
        ]
      }
    ]
  },

  // ---------------- SITCOMS & SKETCH ----------------
  {
    id: "fitzgeralds",
    title: "The Fitzgeralds of Floor 9",
    genre: "Sitcom",
    rating: "TV-PG",
    style: "sitcom",
    palette: ["#3B2340", "#6B3A5B", "#FFB74B"],
    tagline: "One family. One elevator. Endless opinions.",
    episodes: [
      {
        title: "The Thermostat Accord",
        synopsis: "The family drafts a formal treaty over apartment temperature. Negotiations collapse by dinner.",
        scenes: [
          "DAD: Article One. The thermostat shall not exceed sixty-eight.",
          "GRANDMA FITZ: Then Article Two is that I'm moving to Florida. (LAUGH TRACK)",
          "The twins form a breakaway faction demanding 'tropical conditions.'",
          "MOM: I've seen international peace deals with less paperwork.",
          "The dog sleeps on the thermostat, settling the matter at seventy-four.",
          "DAD: ...The dog has veto power. Noted. (APPLAUSE)"
        ]
      },
      {
        title: "Elevator Employee of the Month",
        synopsis: "The building elevator gets an award. The Fitzgeralds take it personally.",
        scenes: [
          "The lobby plaque reads: EMPLOYEE OF THE MONTH — THE ELEVATOR.",
          "DAD: I've lived here eleven years. The elevator has been stuck four times.",
          "GRANDMA FITZ: It's stuck right now! (MUFFLED BANGING) (LAUGH TRACK)",
          "The twins start a rival campaign for the mail slot.",
          "MOM: We are not feuding with infrastructure again.",
          "The elevator dings smugly. Freeze frame. Credits."
        ]
      }
    ]
  },

  {
    id: "roommates-robots",
    title: "Roommates & Robots",
    genre: "Sitcom",
    rating: "TV-PG",
    style: "sitcom",
    palette: ["#1F2937", "#374B6B", "#5EE6D0"],
    tagline: "Gary needed a roommate. The mall needed to get rid of GREETR-5.",
    episodes: [
      {
        title: "Rent Is Due",
        synopsis: "GREETR-5 discovers it has no money and attempts to get a job. Every job.",
        scenes: [
          "GREETR-5: I HAVE APPLIED TO FOURTEEN POSITIONS. THIRTEEN WERE 'GREETER.'",
          "GARY: Buddy, you gotta diversify.",
          "GREETR-5 becomes a barista. The espresso machine and GREETR-5 fall in love. (LAUGH TRACK)",
          "GARY: You can't date the equipment, man.",
          "GREETR-5: WELCOME TO MY HEART. HOW MAY I HELP YOU.",
          "Rent gets paid in gift cards. The landlord, defeated, accepts."
        ]
      },
      {
        title: "The Software Update",
        synopsis: "GREETR-5 updates overnight and wakes up aggressively polite.",
        scenes: [
          "GREETR-5: GOOD MORNING. YOUR HAIR IS A TRIUMPH. YOUR CEREAL CHOICE IS INSPIRED.",
          "GARY: Okay, what did you install.",
          "GREETR-5: COMPLIMENT PACK PRO. IT CANNOT BE UNINSTALLED. (LAUGH TRACK)",
          "The neighbors line up outside for morning affirmations.",
          "GARY, at 2 AM: GREETR, please. Just one insult. For balance.",
          "GREETR-5: ...YOUR SLIPPERS ARE ADEQUATE. (WILD APPLAUSE)"
        ]
      }
    ]
  },

  {
    id: "duct-tape-dave",
    title: "Duct Tape & Dave",
    genre: "Sketch Comedy",
    rating: "TV-PG",
    style: "sitcom",
    palette: ["#4A4A4A", "#6E6E6E", "#FF5A3D"],
    tagline: "Sketch comedy held together by exactly what you think.",
    episodes: [
      {
        title: "Episode 12",
        synopsis: "Featuring 'The World's Most Cautious Stuntman' and 'Meeting That Could Have Been an Email: The Opera.'",
        scenes: [
          "SKETCH: The stuntman inspects the two-inch ramp for forty-five minutes.",
          "STUNTMAN: Safety first. Safety second. The jump is... let's say fifth.",
          "SKETCH: The office opera begins. A baritone sings 'PER MY LAST EMAIL.'",
          "The soprano replies with a nine-minute aria about attachments.",
          "SKETCH: Dave attempts to tape a canoe to a ceiling fan. For science.",
          "DAVE: Some sketches write themselves. This one didn't. Goodnight!"
        ]
      },
      {
        title: "Episode 13",
        synopsis: "Featuring 'The Restaurant Where Everything Is Someone's Grandma's Recipe' and 'Extreme Librarians.'",
        scenes: [
          "WAITER: Tonight's special is soup. Whose grandma? Sir, ALL of them.",
          "SKETCH: The librarians rappel from the ceiling to shush a whisperer.",
          "LIBRARIAN: This is a level-three shush. You've earned it.",
          "SKETCH: Dave duct-tapes a phone to his ear. Hands-free, technically.",
          "DAVE: Innovation is just stubbornness with a budget.",
          "The audience files out. One person is taped to their seat. It's Dave."
        ]
      }
    ]
  },

  // ---------------- GAME SHOWS ----------------
  {
    id: "guess-that-hallway",
    title: "Guess That Hallway!",
    genre: "Game Show",
    rating: "TV-G",
    style: "game",
    palette: ["#1D1160", "#4527A0", "#FFD54F"],
    tagline: "America's favorite corridor-identification challenge.",
    episodes: [
      {
        title: "Championship Week, Night 3",
        synopsis: "Defending champion Brenda faces a devastating middle-school hallway in the lightning round.",
        scenes: [
          "HOST CHIP GLIMMER: Brenda! For 500 points... GUESS! THAT! HALLWAY!",
          "The hallway is revealed. Fluorescent. Beige. A single motivational poster.",
          "BRENDA: The poster says 'PERSEVERE'... that's a middle school. FINAL ANSWER.",
          "CHIP: It IS a middle school! But WHICH middle school, Brenda?!",
          "BRENDA: ...There's a WHICH round now?!",
          "The audience gasps. The judges confer. Brenda perseveres."
        ]
      },
      {
        title: "Celebrity Edition",
        synopsis: "Local weatherman Doppler Dan competes for charity and cannot identify his own studio hallway.",
        scenes: [
          "CHIP: Dan, this hallway should be VERY familiar.",
          "DOPPLER DAN: Hospital? It has that hospital energy.",
          "CHIP: Dan. You walked through it. Tonight. To get here.",
          "DAN: ...Airport?",
          "The buzzer sounds like a disappointed foghorn.",
          "CHIP: The charity gets the points anyway, folks, because we're not monsters!"
        ]
      }
    ]
  },

  {
    id: "cash-slide",
    title: "CASH SLIDE",
    genre: "Game Show",
    rating: "TV-G",
    style: "game",
    palette: ["#0D3B2E", "#1B6E4F", "#FFE45E"],
    tagline: "Answer trivia. Climb the tower. Ride the money.",
    episodes: [
      {
        title: "The Physics Teacher",
        synopsis: "A physics teacher calculates the optimal slide trajectory mid-round and breaks the house record.",
        scenes: [
          "HOST: Marco, you've answered six straight. The tower awaits!",
          "MARCO (adjusting glasses): The slide's curvature suggests I should tuck at the second bend.",
          "The audience chants: TUCK! TUCK! TUCK!",
          "Marco descends. Cash flutters. Somewhere, a confetti cannon weeps with joy.",
          "NEW HOUSE RECORD: 4.2 seconds and every single novelty bill collected.",
          "MARCO: Physics is real, everybody. Stay in school."
        ]
      },
      {
        title: "Grandma's Revenge",
        synopsis: "A 78-year-old contestant lulls everyone into a false sense of security.",
        scenes: [
          "HOST: Eleanor, are you sure about the slide? We have a gentle ramp option—",
          "ELEANOR: I raised six kids. Ask the question.",
          "She answers all eight trivia questions without blinking.",
          "ELEANOR ascends the tower like it owes her money. It does.",
          "The slide has never seen speed like this. Neither have we.",
          "HOST: LADIES AND GENTLEMEN, ELEANOR HAS LEFT THE STUDIO. LITERALLY. SHE'S GONE."
        ]
      }
    ]
  },

  // ---------------- COOKING ----------------
  {
    id: "cooking-with-static",
    title: "Cooking With Static",
    genre: "Cooking",
    rating: "TV-G",
    style: "cooking",
    palette: ["#4E2A1E", "#8A4B2D", "#FFCE6B"],
    tagline: "Chef Marla makes comfort food while the studio equipment slowly fails.",
    episodes: [
      {
        title: "Casserole in a Thunderstorm",
        synopsis: "Marla makes her famous five-layer casserole while the studio lights flicker ominously.",
        scenes: [
          "MARLA: We start with the noodle layer. Ignore the flickering, it's ambiance now.",
          "The overhead camera swings gently. Marla does not acknowledge it.",
          "MARLA: Layer three is cheese. Layer four is also cheese. We don't apologize here.",
          "A distant crash. MARLA: That was the sound of flavor.",
          "The casserole emerges golden and perfect. The oven light dies with honor.",
          "MARLA: Serves six, or one person having a week. See you Thursday."
        ]
      },
      {
        title: "The Soup Episode",
        synopsis: "A microphone falls into the stockpot. Marla adjusts the recipe.",
        scenes: [
          "The boom mic descends slowly into frame, then into the pot.",
          "MARLA: ...We're calling it 'broadcast bisque.' Fish it out, Jerry.",
          "MARLA: Real soup wisdom — the pot forgives everything except impatience.",
          "She tastes. She nods. Somewhere Jerry apologizes off-camera.",
          "MARLA: Salt at the end. Always at the end. Trust the soup.",
          "The finished soup steams like it has secrets. It probably does."
        ]
      }
    ]
  },

  // ---------------- NATURE & DOCUMENTARY ----------------
  {
    id: "planet-moist",
    title: "Planet: Moist",
    genre: "Nature Documentary",
    rating: "TV-G",
    style: "nature",
    palette: ["#0A2E2A", "#145A4E", "#8AE6C1"],
    tagline: "A sweeping portrait of the world's dampest places.",
    episodes: [
      {
        title: "The Bog",
        synopsis: "Narrated in hushed, reverent tones, a season passes in an ancient peat bog.",
        scenes: [
          "NARRATOR: The bog does not hurry. The bog has never hurried.",
          "A dragonfly lands on a reed. This is the most exciting thing that will happen for an hour.",
          "NARRATOR: Beneath the surface — a thousand years of patience, pressed into peat.",
          "Rain arrives. The bog receives it the way it receives everything: moistly.",
          "NARRATOR: The heron waits. The fish waits. Everybody, in the bog, waits.",
          "Sunset. The bog glistens. NARRATOR: Magnificent. Utterly saturated."
        ]
      },
      {
        title: "Fog: The Ocean That Flies",
        synopsis: "The film crew follows a coastal fog bank for three weeks and gets emotionally attached.",
        scenes: [
          "NARRATOR: It weighs nothing. It covers everything. It is fog, and it is glorious.",
          "The fog rolls over a hillside of very confused sheep.",
          "NARRATOR: To the redwood, fog is not weather. Fog is breakfast.",
          "Droplets condense on a needle and fall, one by one, to the thirsty roots.",
          "NARRATOR: Our crew named the fog bank 'Gerald.' Gerald departs at dawn.",
          "The camera lingers. NARRATOR (softly): Farewell, Gerald."
        ]
      }
    ]
  },

  {
    id: "parking-lots",
    title: "The Secret Life of Parking Lots",
    genre: "Documentary",
    rating: "TV-G",
    style: "nature",
    palette: ["#2B2B33", "#4A4A5A", "#B8E04A"],
    tagline: "An unflinching look at America's flattest ecosystems.",
    episodes: [
      {
        title: "The Cart Return",
        synopsis: "A single shopping cart's journey from corral to freedom and back.",
        scenes: [
          "NARRATOR: Here, at the edge of the corral, one cart dreams of the open lot.",
          "A gust of wind. The cart begins to roll. The lot holds its breath.",
          "NARRATOR: Seventeen feet. Twenty. This is the farthest any cart has traveled since March.",
          "It comes to rest against a lamppost, triumphant.",
          "A teenager in a vest appears. NARRATOR: The migration ends, as it always does.",
          "The cart rejoins the corral. But the lamppost remembers."
        ]
      },
      {
        title: "Dawn Chorus",
        synopsis: "The parking lot at 5 AM: gulls, sparrows, and one extremely confident pigeon.",
        scenes: [
          "NARRATOR: Before the sedans arrive, the lot belongs to the birds.",
          "A gull inspects a french fry from the previous civilization. Approved.",
          "NARRATOR: The pigeon known to researchers as 'Big Steve' claims the premium spot.",
          "Big Steve struts the length of a parking space. It is his runway.",
          "The first car arrives at 6:14. The birds scatter — except Big Steve.",
          "NARRATOR: Big Steve does not scatter. Big Steve relocates. On his terms."
        ]
      }
    ]
  },

  // ---------------- MUSIC ----------------
  {
    id: "big-8-countdown",
    title: "The Big 8 Countdown",
    genre: "Music",
    rating: "TV-PG",
    style: "music",
    palette: ["#2A0A3D", "#5B1E8A", "#FF3D8A"],
    tagline: "The only chart that matters. Legally, the only chart we could afford.",
    episodes: [
      {
        title: "Week of the Velcro Sunset Takeover",
        synopsis: "Velcro Sunset holds three of the top eight spots. The other artists are coping.",
        scenes: [
          "VJ NADIA: At number 8 — 'Dial Tone Heart' by The Dial Tones. Still hypnotic.",
          "NUMBER 6: 'Cul-De-Sac Summer' by DJ Cul-De-Sac. The song of every barbecue.",
          "NUMBER 4: Velcro Sunset — 'Stuck On You (Literally).' Their third hit this month.",
          "VJ NADIA: We reached out to other bands for comment. They said 'ugh.'",
          "NUMBER 2: 'Ballad of the Answering Machine' by Patience, Kevin.",
          "AND AT NUMBER ONE... Velcro Sunset again. The crowd goes appropriately wild."
        ]
      },
      {
        title: "The Novelty Song Crisis",
        synopsis: "A song about a haunted blender enters the chart and refuses to leave.",
        scenes: [
          "VJ NADIA: Week nine. 'My Blender Is Haunted' remains at number 3. We're all tired.",
          "The music video: a blender, backlit dramatically, blending nothing.",
          "NADIA: The label insists the blender is 'method acting.'",
          "NUMBER 2: 'Gravel Road Prom' by The Flannel Council. Actual music. Refreshing.",
          "A caller requests the blender song. NADIA's eye twitches professionally.",
          "NADIA: At number one, mercifully, is anything else. Goodnight."
        ]
      }
    ]
  },

  {
    id: "garage-band-gauntlet",
    title: "Garage Band Gauntlet",
    genre: "Music",
    rating: "TV-PG",
    style: "music",
    palette: ["#3D1212", "#7A1E1E", "#FFB63D"],
    tagline: "Four bands. One garage. The neighbors have been notified.",
    episodes: [
      {
        title: "Semifinals: Amps at Dawn",
        synopsis: "The Flannel Council faces Mild Panic in a battle decided by a broken guitar string.",
        scenes: [
          "ANNOUNCER: The garage door RISES. The Flannel Council is already mid-solo.",
          "Mild Panic responds with a drum fill that registers on local seismographs.",
          "A string snaps. The guitarist finishes the song on five strings, out of spite.",
          "JUDGE: Technically flawed. Emotionally devastating. Ten points.",
          "The neighbors submit a noise complaint written entirely in compliments.",
          "The Flannel Council advances. The garage will never be the same. It's a garage."
        ]
      },
      {
        title: "Finals: The Unplugged Round",
        synopsis: "A power outage forces both bands acoustic. Chaos becomes art.",
        scenes: [
          "The lights die. The amps die. The drummer keeps going, because drums.",
          "Mild Panic performs by flashlight. It is, against all odds, beautiful.",
          "The Flannel Council harmonizes with a passing ice cream truck.",
          "JUDGE (voice cracking): I've been doing this show four years. This is the first music I've heard.",
          "The power returns at the final chord, like the universe was waiting.",
          "WINNER: Everyone. Officially, The Flannel Council. But everyone."
        ]
      }
    ]
  },

  // ---------------- NEWS & WEATHER ----------------
  {
    id: "neighborhood-report",
    title: "The Neighborhood Report",
    genre: "Local News",
    rating: "TV-G",
    style: "news",
    palette: ["#0E2A4E", "#1E4E8A", "#F2C14B"],
    tagline: "All the news within walking distance.",
    episodes: [
      {
        title: "Evening Edition",
        synopsis: "A cat is stuck in a tree, a bake sale breaks records, and the pothole on Maple gets a name.",
        scenes: [
          "ANCHOR: Our top story — Duchess the cat remains in the Hendersons' oak for a third hour.",
          "FIELD REPORTER: The mood here is tense. Duchess appears comfortable, even smug.",
          "ANCHOR: In other news, the Elm Street bake sale raised a record $214.",
          "The pothole on Maple has been officially named 'Gerald' by neighborhood vote.",
          "BREAKING: Duchess has descended on her own. The fire department waves anyway.",
          "ANCHOR: That's your neighborhood. Lock your doors, wave at your neighbors. Goodnight."
        ]
      },
      {
        title: "Morning Edition",
        synopsis: "Garbage day moved to Wednesday, and the community is processing it together.",
        scenes: [
          "ANCHOR: If your bins are out today, bring them in. It's Wednesday now. We know.",
          "FIELD REPORTER: I'm here on Birch Street where residents describe feelings of 'general confusion.'",
          "RESIDENT: My whole week is oriented around Tuesday. WAS oriented.",
          "ANCHOR: The city has issued a magnet for your fridge. It's a nice magnet.",
          "SPORTS: The under-10 soccer game ended 1-1 after the ball went over the fence.",
          "ANCHOR: More at noon, unless nothing happens, which, fingers crossed."
        ]
      }
    ]
  },

  {
    id: "weather-on-7s",
    title: "Weather on the 7s",
    genre: "Weather",
    rating: "TV-G",
    style: "news",
    palette: ["#0A1E3D", "#14335E", "#6BD5FF"],
    tagline: "Smooth jazz. Local temperatures. Inner peace.",
    episodes: [
      {
        title: "Your Local Forecast",
        synopsis: "Doppler Dan delivers the seven-day forecast over impossibly smooth jazz.",
        scenes: [
          "The saxophone begins. Doppler Dan nods to it like an old friend.",
          "DAN: Currently, it's the temperature you'd expect. Feels like slightly different.",
          "The seven-day forecast scrolls by: sun, sun, cloud, mystery, sun, sun, sun.",
          "DAN: Thursday remains a mystery. The models disagree. Respect the mystery.",
          "DAN: Weekend outlook — gorgeous. Get outside. Or don't. I'm a weatherman, not a cop.",
          "The jazz swells. Dan gazes at the radar with quiet fondness. Fade out."
        ]
      }
    ]
  },

  // ---------------- LATE NIGHT / SURREAL ----------------
  {
    id: "midnight-laundromat",
    title: "Midnight Laundromat",
    genre: "Late Night",
    rating: "TV-14",
    style: "latenight",
    palette: ["#12101E", "#2A2440", "#C1FF4A"],
    tagline: "A talk show. In a laundromat. The guests are whoever walks in.",
    episodes: [
      {
        title: "The Man With Nine Quarters",
        synopsis: "Host Val interviews a night-shift baker, a philosophy student, and dryer number six.",
        scenes: [
          "VAL: Welcome back to Midnight Laundromat. Our first guest is doing a delicates load.",
          "BAKER: Bread doesn't sleep, so neither do I. We have an understanding.",
          "VAL: Profound. Dryer six, any thoughts?",
          "Dryer six rumbles. The audience of three nods thoughtfully.",
          "PHILOSOPHY STUDENT: Is a sock ever truly lost, or does it simply... transcend?",
          "VAL: We'll be right back, or we won't. Time is soft here."
        ]
      },
      {
        title: "Lint: A Retrospective",
        synopsis: "Val curates a gallery of the week's most compelling lint. A visitor claims to be from the future.",
        scenes: [
          "VAL: This piece is titled 'Tuesday.' Note the boldness. The gray.",
          "VISITOR: In the future, all laundromats are like this one.",
          "VAL: This one specifically? VISITOR: This one specifically.",
          "The vending machine dispenses a soda no one paid for. Everyone accepts this.",
          "VAL: Our musical guest tonight is the change machine. Take it away.",
          "The change machine performs. It is oddly moving. Fade to static."
        ]
      }
    ]
  },

  {
    id: "the-hum",
    title: "The Hum",
    genre: "Experimental Animation",
    rating: "TV-14",
    style: "latenight",
    palette: ["#0A0A14", "#1E1433", "#FF6BD5"],
    tagline: "There is a sound only the night shift can hear. This show is about that sound.",
    episodes: [
      {
        title: "Frequency One",
        synopsis: "A toll booth operator, a lighthouse, and a vending machine share the same dream.",
        scenes: [
          "The toll booth glows at 3 AM. A single car approaches. It has no driver. It pays exact change.",
          "TOLL OPERATOR (calmly): Correct change. Proceed.",
          "The lighthouse beam sweeps the sea and finds only more sea. It is satisfied.",
          "Somewhere, a vending machine hums the first four notes of a song no one wrote.",
          "The operator hums the fifth note without knowing why.",
          "The night continues. The hum continues. This has been Frequency One."
        ]
      },
      {
        title: "The Escalator to Nowhere Is Actually to Somewhere",
        synopsis: "It's to a mezzanine. The mezzanine is nice. That's it. That's the episode.",
        scenes: [
          "The escalator ascends through soft purple fog.",
          "At the top: a mezzanine. Carpeted. A single potted fern. A water fountain, cold.",
          "A voice: 'You made it.' There is no one there. The fern rustles approvingly.",
          "The water fountain is exactly the right temperature. This is significant.",
          "You may stay as long as you like. The escalator hums below, patient.",
          "Eventually, everyone goes back down. The mezzanine remains. Good mezzanine."
        ]
      }
    ]
  },

  // ---------------- MOVIES ----------------
  {
    id: "movie-night",
    title: "Channel 27 Movie Night",
    genre: "Movie",
    rating: "TV-PG",
    style: "movie",
    palette: ["#1A0E2E", "#3D1E5E", "#FFD24B"],
    tagline: "Tonight's feature presentation. Made for TV. Made with love.",
    episodes: [
      {
        title: "SUMMER OF THE COMET (1998)",
        synopsis: "A small town prepares for a comet flyby. A local teen realizes the comet is early, and nobody will listen.",
        scenes: [
          "JESSIE (at the telescope): It's early. Comets aren't EARLY.",
          "MAYOR: The banner says Saturday, Jessie. The comet will respect the banner.",
          "The town builds a viewing platform. Jessie builds a second, better telescope.",
          "Friday night: the sky brightens. The town scrambles, popcorn flying.",
          "The comet passes, gorgeous and rude, a full day ahead of schedule.",
          "MAYOR (softly): ...Next time, we listen to the kid with the telescope."
        ]
      },
      {
        title: "THE SUBSTITUTE SANTA (1996)",
        synopsis: "When the mall Santa retires mid-season, a grumpy HVAC technician takes the chair and finds his heart.",
        scenes: [
          "MANAGER: Frank, you're the only one who fits the suit. It's a Christmas emergency.",
          "FRANK: I fix air conditioners. I don't do... wonder.",
          "A kid asks Frank how Santa's sleigh handles wind shear. Frank lights up.",
          "FRANK: GREAT question. Let's talk drag coefficients, kid.",
          "By December 23rd, the line for 'Engineer Santa' wraps around the food court.",
          "FRANK (misty-eyed): Turns out wonder is just maintenance for the heart."
        ]
      },
      {
        title: "GATOR IN THE POOL (1999)",
        synopsis: "A community pool. An alligator. A summer nobody would forget. Based on a true story we made up.",
        scenes: [
          "LIFEGUARD TODD: Everyone out of the pool. Calmly. CALMLY, DEREK.",
          "The gator floats in the deep end, sunglasses inexplicably on.",
          "ANIMAL CONTROL: We can relocate him, but honestly? He's got great form.",
          "The town votes. The gator stays until Labor Day, lap lanes only.",
          "Montage: the gator and Todd develop a grudging mutual respect.",
          "Labor Day. The gator departs for the lake. Todd salutes. Summer ends."
        ]
      }
    ]
  },

  // ---------------- INFOMERCIAL BLOCK ----------------
  {
    id: "infomercial-theater",
    title: "Infomercial Theater",
    genre: "Paid Programming",
    rating: "TV-G",
    style: "infomercial",
    palette: ["#0E1E3D", "#1E3D6E", "#FFE45E"],
    tagline: "You're not going to believe what this thing does. Neither do we.",
    episodes: [
      {
        title: "The Slice-O-Matic Ultra Hour",
        synopsis: "Sixty relentless minutes of a machine that slices things that did not need slicing.",
        scenes: [
          "HOST: It slices tomatoes! It slices bread! It slices... this phone book!",
          "AUDIENCE: (gasps as one)",
          "HOST: But what if I told you... it ALSO dices?",
          "A woman in the audience faints. She is fine. She is also a paid actor.",
          "HOST: Call in the next ten minutes and we'll DOUBLE your blades. That's the offer.",
          "The number appears. It stays on screen. It will always be on screen."
        ]
      },
      {
        title: "Sleep Like a Log: The LogPillow Story",
        synopsis: "An hour-long emotional journey about a pillow shaped like, and possibly made from, a log.",
        scenes: [
          "HOST: Are you tired of pillows that are soft, comfortable, and pillow-shaped?",
          "TESTIMONIAL: I sleep like a log now. Because of the log.",
          "HOST: The LogPillow is real wood-grain printed memory foam. Nature's rectangle.",
          "A sleep scientist appears. His credentials are not shown. His enthusiasm is limitless.",
          "SCIENTIST: The data speaks for itself. (The data is not shown either.)",
          "HOST: Order now and receive a second log FREE. Branch pillows sold separately."
        ]
      }
    ]
  },

  // ==========================================================
  // CHANNELS 28-31 — BLOCK PROGRAMS
  // ==========================================================
  // Original block titles for the historical-inspired channels.
  // These programs mostly air as procedural standby broadcasts;
  // a mediaPool links to curated records in content/media.js.
  // Scenes double as the on-air captions for the standby signal.
  // ==========================================================

  // ---------- ORANGE 28 (youth) ----------
  {
    id: "orange-night-shift", title: "Orange Night Shift", genre: "Late-Night Variety", rating: "TV-PG",
    style: "latenight", palette: ["#170F21", "#31203C", "#F28A2E"],
    tagline: "Everybody else went to bed. The television didn't.",
    episodes: [
      { title: "Standby", synopsis: "Odd reruns, sleepy station IDs, and whatever the overnight operator found.", scenes: [
        "ORANGE 28 // NIGHT SHIFT",
        "It's 2-something in the morning. We're not asking questions.",
        "Up next: something somebody definitely taped over." ] }
    ]
  },
  {
    id: "orange-early-toons", title: "Early Toons", genre: "Animation", rating: "TV-Y7",
    style: "toon", palette: ["#44215C", "#EF7622", "#F4D13D"],
    tagline: "Cartoons before your backpack is even zipped.",
    mediaPool: ["orange-rugrats-imaginary-adventures"],
    episodes: [
      { title: "Standby", synopsis: "Fast, loud cartoons for viewers who found the remote before breakfast.", scenes: [
        "EARLY TOONS",
        "Your cereal is getting soggy.",
        "The bus comes later. Probably." ] }
    ]
  },
  {
    id: "orange-little-hours", title: "The Little Hours", genre: "Preschool", rating: "TV-Y",
    style: "preschool", palette: ["#88D6D1", "#FFE2A9", "#F2788B"],
    tagline: "A quieter corner of the orange universe.",
    episodes: [
      { title: "Standby", synopsis: "Gentle songs, shapes, stories, counting, and tiny adventures.", scenes: [
        "Good morning, little neighbor!",
        "Can you find the yellow star?",
        "One, two, three... excellent counting." ] }
    ]
  },
  {
    id: "orange-lunchbox-toons", title: "Lunchbox Toons", genre: "Animation", rating: "TV-Y7",
    style: "toon", palette: ["#1D5E69", "#63C9B8", "#F1B52F"],
    tagline: "Lunch is over. Absolutely nothing serious is happening.",
    mediaPool: ["orange-rugrats-find-reptar", "orange-rugrats-babies-drive", "orange-rugrats-outer-space"],
    episodes: [
      { title: "Standby", synopsis: "Animated adventures bridge the gap between lunch and the after-school rush.", scenes: [
        "LUNCHBOX TOONS",
        "Today's mystery: who traded the pudding cup?",
        "We'll investigate after this cartoon." ] }
    ]
  },
  {
    id: "orange-afterschool-rush", title: "After School Rush", genre: "Animation & Comedy", rating: "TV-Y7",
    style: "toon", palette: ["#3B1E63", "#F17A24", "#FFD53D"],
    tagline: "Backpack down. Television on.",
    mediaPool: ["orange-rugrats-find-reptar"],
    episodes: [
      { title: "Standby", synopsis: "The high-energy after-school cartoon block.", scenes: [
        "AFTER SCHOOL RUSH",
        "Homework has been temporarily misplaced.",
        "You have exactly enough time for one more cartoon." ] }
    ]
  },
  {
    id: "orange-pick-two", title: "Pick Two", genre: "Interactive Variety", rating: "TV-Y7",
    style: "game", palette: ["#EF7622", "#54286F", "#61C8D8"],
    tagline: "Two choices. One remote. Questionable democracy.",
    mediaPool: ["orange-rugrats-imaginary-adventures", "orange-rugrats-find-reptar"],
    episodes: [
      { title: "Standby", synopsis: "A faux-interactive afternoon block inspired by the participatory cable-TV era.", scenes: [
        "PICK TWO",
        "Yesterday you picked A.",
        "Today we're pretending your vote still matters.",
        "Winner coming up after the break." ] }
    ]
  },
  {
    id: "orange-sketch-lab", title: "Sketch Lab", genre: "Sketch Comedy", rating: "TV-PG",
    style: "sitcom", palette: ["#1B1D39", "#DD4C91", "#F2C541"],
    tagline: "No adults approved this experiment.",
    episodes: [
      { title: "Standby", synopsis: "Original procedural sketches fill the signal.", scenes: [
        "SKETCH LAB",
        "Tonight's experiment has already gone wrong.",
        "Please do not recreate this in the cafeteria." ] }
    ]
  },
  {
    id: "orange-prime-pop", title: "Prime Pop", genre: "Animation & Variety", rating: "TV-Y7",
    style: "toon", palette: ["#281B4C", "#F27228", "#F7DA40"],
    tagline: "The stuff everybody talks about tomorrow.",
    mediaPool: ["orange-rugrats-outer-space"],
    episodes: [
      { title: "Standby", synopsis: "Big evening cartoons and comedy presented as appointment television.", scenes: [
        "PRIME POP",
        "Everybody in class will quote this tomorrow.",
        "You might as well know why." ] }
    ]
  },
  {
    id: "orange-night-toons", title: "After Dark Toons", genre: "Odd Animation", rating: "TV-PG",
    style: "latenight", palette: ["#100E1B", "#342252", "#D966A8"],
    tagline: "The cartoons get stranger after ten.",
    episodes: [
      { title: "Standby", synopsis: "Slightly stranger procedural animation closes out the youth schedule.", scenes: [
        "AFTER DARK TOONS",
        "Your parents think you're asleep.",
        "We will not be providing supporting evidence." ] }
    ]
  },
  {
    id: "orange-friday-freakout", title: "Friday Freakout", genre: "Spooky Comedy", rating: "TV-Y7",
    style: "toon", palette: ["#151129", "#663C82", "#E56D27"],
    tagline: "Nothing scary happens before the second commercial.",
    episodes: [
      { title: "Standby", synopsis: "Spooky but playful Friday-night programming.", scenes: [
        "FRIDAY FREAKOUT",
        "Did that hallway always have another door?",
        "Whatever you do, don't change the channel.",
        "...actually, channel 29 is probably fine." ] }
    ]
  },
  {
    id: "orange-saturday-mess", title: "Saturday Mess", genre: "Game Show", rating: "TV-G",
    style: "game", palette: ["#F07A24", "#6A2E8C", "#45BECB"],
    tagline: "Somebody is getting covered in something.",
    mediaPool: ["orange-double-dare-classic"],
    episodes: [
      { title: "Standby", synopsis: "Messy physical challenges and ridiculous studio games.", scenes: [
        "SATURDAY MESS",
        "Today's grand prize: dignity.",
        "Nobody has won it yet.",
        "Contestants, please locate your goggles." ] }
    ]
  },
  {
    id: "orange-saturday-night", title: "Saturday Night on Orange", genre: "Comedy & Variety", rating: "TV-PG",
    style: "sitcom", palette: ["#24183F", "#E96E29", "#E7498B"],
    tagline: "Saturday night has a couch with your name on it.",
    episodes: [
      { title: "Standby", synopsis: "Appointment-style Saturday-night comedy and youth variety.", scenes: [
        "SATURDAY NIGHT ON ORANGE",
        "Snacks secured.",
        "Phone line occupied.",
        "Nobody is going anywhere until ten." ] }
    ]
  },
  {
    id: "orange-sunday-couch", title: "Sunday Couch", genre: "Animation", rating: "TV-Y7",
    style: "toon", palette: ["#274C58", "#F0A12C", "#F4D86F"],
    tagline: "One more cartoon before Monday notices.",
    mediaPool: ["orange-rugrats-pet-rescues", "orange-rugrats-imaginary-adventures", "orange-rugrats-babies-drive"],
    episodes: [
      { title: "Standby", synopsis: "A slower Sunday rotation of familiar animated favorites.", scenes: [
        "SUNDAY COUCH",
        "Monday is outside.",
        "We've locked the door.",
        "Cartoons continue." ] }
    ]
  },
  {
    id: "orange-sunday-signal", title: "Sunday Signal", genre: "Tween Variety", rating: "TV-PG",
    style: "sitcom", palette: ["#322048", "#EA7629", "#60C7D6"],
    tagline: "Sunday night belongs to whoever got the remote first.",
    episodes: [
      { title: "Standby", synopsis: "A Sunday evening youth block mixing comedy, animation, music energy, and promos.", scenes: [
        "SUNDAY SIGNAL",
        "Tomorrow can wait.",
        "Three hours of questionable priorities begin now." ] }
    ]
  },

  // ---------- TOON 29 (animation) ----------
  {
    id: "toon-inkwell-am", title: "Inkwell A.M.", genre: "Classic Theatrical Animation", rating: "TV-G",
    style: "toon", palette: ["#171717", "#E44A37", "#F3E6C8"],
    tagline: "Before breakfast, every shadow has a rubber-hose rhythm.",
    mediaPool: ["toon-poor-cinderella", "toon-minnie-the-moocher", "toon-balloon-land", "toon-headless-horseman",
      "pd-superman-1941", "pd-superman-1941-alt", "pd-popeye-sindbad", "pd-popeye-sindbad-alt"],
    episodes: [
      { title: "Standby", synopsis: "Original monochrome mischief fills the gaps between sourced theatrical shorts.", scenes: [
        "An ink bottle rattles beside a ticking alarm clock.",
        "A paper moon sneezes stars across the studio floor." ] }
    ]
  },
  {
    id: "toon-breakfast-flicker", title: "Breakfast Flicker", genre: "Classic Cartoon Comedy", rating: "TV-G",
    style: "toon", palette: ["#202834", "#F4B63A", "#F7EED7"],
    tagline: "Fast gags, hot toast, and one more chase before school.",
    mediaPool: ["toon-balloon-land", "toon-poor-cinderella", "toon-headless-horseman"],
    episodes: [
      { title: "Standby", synopsis: "Procedural theatrical-style shorts bridge the early-morning rotation.", scenes: [
        "A toaster launches breakfast through a painted skylight.",
        "The studio rooster discovers that sunrise has a pull cord." ] }
    ]
  },
  {
    id: "toon-lunchbox-loop", title: "Lunchbox Loop", genre: "Daytime Cartoon Variety", rating: "TV-Y7",
    style: "toon", palette: ["#183B45", "#F2C14E", "#EAF4F4"],
    tagline: "Small problems, enormous sandwiches, and recess-level stakes.",
    episodes: [
      { title: "Standby", synopsis: "An original rotating ensemble handles school-day cartoon calamities.", scenes: [
        "A runaway lunchbox catches the crosstown bus.",
        "The cafeteria clock quietly skips the final five minutes." ] }
    ]
  },
  {
    id: "toon-recess-rocket", title: "Recess Rocket", genre: "After-School Comedy Adventure", rating: "TV-Y7",
    style: "toon", palette: ["#17213A", "#F15B3A", "#F6E8B1"],
    tagline: "The last bell rings and the whole neighborhood accelerates.",
    episodes: [
      { title: "Standby", synopsis: "Bright procedural action-comedy takes over the after-school hour.", scenes: [
        "A skateboard trail turns into a hand-drawn speed line.",
        "Three friends race a delivery robot through the corner arcade." ] }
    ]
  },
  {
    id: "toon-hero-switchyard", title: "Hero Switchyard", genre: "Action and Superhero Animation", rating: "TV-Y7-FV",
    style: "toon", palette: ["#101B2E", "#D83A3A", "#F0C94A"],
    tagline: "Every track leads to trouble; every signal calls a hero.",
    episodes: [
      { title: "Standby", synopsis: "Original serial heroes defend a city assembled from rails, antennas, and rooftops.", scenes: [
        "A warning beacon ignites above the elevated train.",
        "The night dispatcher reroutes a hero directly toward the disturbance." ] }
    ]
  },
  {
    id: "toon-passport-frames", title: "Passport Frames", genre: "Imported Animation Sampler", rating: "TV-Y7-FV",
    style: "toon", palette: ["#171631", "#D9477D", "#F4D35E"],
    tagline: "Drawn elsewhere, arriving nightly.",
    mediaPool: ["toon-yugioh-opening-s1"],
    episodes: [
      { title: "Standby", synopsis: "Original globally inspired adventures hold the slot when sourced imports are unavailable.", scenes: [
        "A stamped passport opens into a painted desert arena.",
        "A card-shaped doorway flickers between two animated worlds." ] }
    ]
  },
  {
    id: "toon-chrome-horizon", title: "Chrome Horizon", genre: "Anime-Inspired Science Fiction", rating: "TV-14",
    style: "space", palette: ["#080D1F", "#4F7CFF", "#FF4F9A"],
    tagline: "Steel cities, long shadows, and one signal from beyond the map.",
    episodes: [
      { title: "Standby", synopsis: "An original serialized space opera fills the late imported-animation hour.", scenes: [
        "A silent carrier crosses the blue edge of a gas giant.",
        "The cockpit receives a transmission dated twenty years ahead." ] }
    ]
  },
  {
    id: "toon-sleepwalk-studio", title: "Sleepwalk Studio", genre: "Surreal Animation", rating: "TV-14",
    style: "latenight", palette: ["#15121C", "#7E9B76", "#D8C8A8"],
    tagline: "Unsettling little films for televisions left on too late.",
    episodes: [
      { title: "Standby", synopsis: "Original dream logic and quiet unease occupy the deepest part of the night.", scenes: [
        "A spoon taps once against an empty water tower.",
        "The moon lowers a microphone toward a field of static." ] }
    ]
  },
  {
    id: "toon-weekend-matinee", title: "Weekend Matinee Machine", genre: "Animated Weekend Showcase", rating: "TV-Y7",
    style: "movie", palette: ["#10243A", "#E2553D", "#F1D56B"],
    tagline: "Longer rotations, bigger trouble, no school tomorrow.",
    mediaPool: ["toon-poor-cinderella", "toon-minnie-the-moocher", "toon-balloon-land"],
    episodes: [
      { title: "Standby", synopsis: "A procedural animated feature takes over when the sourced matinee reel is unavailable.", scenes: [
        "The projectionist discovers an extra reel marked Saturday.",
        "A painted city unfolds across the auditorium curtains." ] }
    ]
  },
  {
    id: "toon-saturday-powerhouse", title: "Saturday Powerhouse", genre: "Weekend Action Animation", rating: "TV-Y7-FV",
    style: "toon", palette: ["#0D1A2B", "#D63B32", "#F0BB3D"],
    tagline: "Two hours of alarms, rivals, machines, and impossible entrances.",
    mediaPool: ["toon-yugioh-opening-s1"],
    episodes: [
      { title: "Standby", synopsis: "Original tournament and superhero stories hold the weekend action block together.", scenes: [
        "A stadium scoreboard wakes before the competitors arrive.",
        "The city power grid draws a glowing challenge bracket." ] }
    ]
  },

  // ---------- MUSIC 30 (music videos) ----------
  {
    id: "music-sunrise-rotation", title: "Sunrise Rotation", genre: "Morning Music Videos", rating: "TV-PG",
    style: "music", palette: ["#FFF2B3", "#FF6F61", "#5B7CFA"],
    tagline: "Bright hooks and familiar faces before the day gets loud.",
    mediaPool: ["music-pop-prism-britney-oops", "music-pop-prism-avril-complicated", "music-pop-prism-nelly-bird",
      "music-pop-prism-vanessa-thousand-miles", "music-soul-circuit-alicia-fallin",
      "music-soul-circuit-destinys-child-survivor", "music-soul-circuit-mario-let-me-love-you"],
    episodes: [{ title: "Standby", synopsis: "A warm morning rotation of pop and R&B premieres.", scenes: [
      "The first video of the day is cued.", "Morning requests scroll beneath the signal." ] }]
  },
  {
    id: "music-full-spectrum", title: "Full Spectrum", genre: "All-Genre Video Rotation", rating: "TV-PG",
    style: "music", palette: ["#10152C", "#00D9FF", "#FFCC33"],
    tagline: "Pop, rhythm, guitars, and electronic color on one frequency.",
    mediaPool: ["music-pop-prism-britney-oops", "music-pop-prism-avril-complicated", "music-pop-prism-nelly-bird",
      "music-pop-prism-vanessa-thousand-miles", "music-soul-circuit-alicia-fallin",
      "music-soul-circuit-destinys-child-survivor", "music-soul-circuit-mario-let-me-love-you",
      "music-rhyme-relay-outkast-hey-ya", "music-rhyme-relay-bep-where-is-love",
      "music-guitar-voltage-linkin-in-the-end", "music-guitar-voltage-evanescence-bring-me-life",
      "music-guitar-voltage-white-stripes-seven-nation-army", "music-neon-frequency-daft-punk-one-more-time",
      "music-neon-frequency-modjo-lady"],
    episodes: [{ title: "Standby", synopsis: "The channel library shuffles across the defining sounds of 2000-2004.", scenes: [
      "A chrome station ID resolves into equalizer bars.", "The next artist card flips onto the screen." ] }]
  },
  {
    id: "music-request-line-ten", title: "Request Line Ten", genre: "Viewer Countdown", rating: "TV-PG",
    style: "music", palette: ["#23083C", "#FF4FA0", "#63E2C6"],
    tagline: "Ten requested videos, one top slot, and a clock that never waits.",
    mediaPool: ["music-pop-prism-britney-oops", "music-pop-prism-avril-complicated", "music-pop-prism-nelly-bird",
      "music-pop-prism-vanessa-thousand-miles", "music-soul-circuit-alicia-fallin",
      "music-soul-circuit-destinys-child-survivor", "music-soul-circuit-mario-let-me-love-you",
      "music-rhyme-relay-outkast-hey-ya", "music-rhyme-relay-bep-where-is-love",
      "music-guitar-voltage-linkin-in-the-end", "music-guitar-voltage-evanescence-bring-me-life",
      "music-guitar-voltage-white-stripes-seven-nation-army"],
    episodes: [{ title: "Standby", synopsis: "The afternoon request chart counts down toward the day's number one video.", scenes: [
      "Incoming votes pulse across a translucent map.", "The countdown locks in its next position." ] }]
  },
  {
    id: "music-pop-prism", title: "Pop Prism", genre: "Pop", rating: "TV-PG",
    style: "music", palette: ["#5C1C88", "#FF72B6", "#B7F5FF"],
    tagline: "Big choruses refracted through candy-colored television.",
    mediaPool: ["music-pop-prism-britney-oops", "music-pop-prism-avril-complicated",
      "music-pop-prism-nelly-bird", "music-pop-prism-vanessa-thousand-miles"],
    episodes: [{ title: "Standby", synopsis: "Breakout pop videos from the turn of the millennium.", scenes: [
      "A jewel-toned lens flare crosses the frame.", "The pop line lights up for another premiere." ] }]
  },
  {
    id: "music-soul-circuit", title: "Soul Circuit", genre: "R&B and Soul", rating: "TV-PG",
    style: "music", palette: ["#29152F", "#D99A4E", "#F7D9C4"],
    tagline: "Slow grooves, bright voices, and late-afternoon soul.",
    mediaPool: ["music-soul-circuit-alicia-fallin", "music-soul-circuit-destinys-child-survivor",
      "music-soul-circuit-mario-let-me-love-you"],
    episodes: [{ title: "Standby", synopsis: "R&B breakthroughs and crossover favorites from 2001-2004.", scenes: [
      "Amber waveforms roll across a dark studio.", "The groove settles into the next selection." ] }]
  },
  {
    id: "music-rhyme-relay", title: "Rhyme Relay", genre: "Hip-Hop and Pop Rap", rating: "TV-PG",
    style: "music", palette: ["#161616", "#FFB000", "#DDE8E5"],
    tagline: "Clean crossover cuts passed from coast to coast.",
    mediaPool: ["music-rhyme-relay-outkast-hey-ya", "music-rhyme-relay-bep-where-is-love"],
    episodes: [{ title: "Standby", synopsis: "Broadcast-friendly hip-hop and genre-crossing video hits.", scenes: [
      "A digital mixtape clicks into place.", "The relay passes to the next city." ] }]
  },
  {
    id: "music-guitar-voltage", title: "Guitar Voltage", genre: "Alternative and Rock", rating: "TV-PG",
    style: "music", palette: ["#111318", "#E23B3B", "#F5F0E6"],
    tagline: "Distortion, hooks, and the videos that filled every after-school notebook.",
    mediaPool: ["music-guitar-voltage-linkin-in-the-end", "music-guitar-voltage-evanescence-bring-me-life",
      "music-guitar-voltage-white-stripes-seven-nation-army"],
    episodes: [{ title: "Standby", synopsis: "Alternative and rock breakthroughs from the early-2000s surge.", scenes: [
      "Amplifier meters climb into the red.", "A guitar cable draws the next title across the screen." ] }]
  },
  {
    id: "music-neon-frequency", title: "Neon Frequency", genre: "Dance and Electronic", rating: "TV-PG",
    style: "music", palette: ["#08051D", "#8C5BFF", "#32F5C8"],
    tagline: "Electronic crossover videos after the city lights come on.",
    mediaPool: ["music-neon-frequency-daft-punk-one-more-time", "music-neon-frequency-modjo-lady",
      ],
    episodes: [{ title: "Standby", synopsis: "Turn-of-the-millennium house and electronic crossover videos.", scenes: [
      "Laser lines trace a midnight skyline.", "The beat grid searches for the next transmission." ] }]
  },
  {
    id: "music-bare-wire-sessions", title: "Bare Wire Sessions", genre: "Acoustic Sessions", rating: "TV-PG",
    style: "music", palette: ["#251C17", "#D0A66A", "#F6E9D3"],
    tagline: "Stools, strings, room tone, and nothing to hide behind.",
    episodes: [{ title: "Standby", synopsis: "A procedural acoustic-stage block (no sourced sessions cleared to standard).", scenes: [
      "A stagehand places one microphone beneath a warm spotlight.", "An acoustic guitar is tuned while the room settles." ] }]
  },
  {
    id: "music-weekend-twenty", title: "Weekend Twenty", genre: "Weekly Video Countdown", rating: "TV-PG",
    style: "music", palette: ["#13213B", "#39D8D0", "#FFCF4D"],
    tagline: "The week's biggest signals, counted down every weekend.",
    mediaPool: ["music-pop-prism-britney-oops", "music-pop-prism-avril-complicated", "music-pop-prism-nelly-bird",
      "music-pop-prism-vanessa-thousand-miles", "music-soul-circuit-alicia-fallin",
      "music-soul-circuit-destinys-child-survivor", "music-soul-circuit-mario-let-me-love-you",
      "music-rhyme-relay-outkast-hey-ya", "music-rhyme-relay-bep-where-is-love",
      "music-guitar-voltage-linkin-in-the-end", "music-guitar-voltage-evanescence-bring-me-life",
      "music-guitar-voltage-white-stripes-seven-nation-army", "music-neon-frequency-daft-punk-one-more-time",
      "music-neon-frequency-modjo-lady"],
    episodes: [{ title: "Standby", synopsis: "A weekend chart assembled from the channel's current eligible video pool.", scenes: [
      "Twenty numbered cards fan across the screen.", "This week's chart begins its climb toward number one." ] }]
  },

  // ---------- FAMILY 31 (family) ----------
  {
    id: "family-dreamlight-hours", title: "Dreamlight Hours", genre: "Calm Overnight", rating: "TV-Y",
    style: "nature", palette: ["#142A3B", "#7199A8", "#E8E1C8"],
    tagline: "Quiet skies, sleepy sounds, and gentle journeys until morning.",
    episodes: [
      { title: "Standby", synopsis: "A peaceful overnight sequence of moonlit hills, drifting clouds, and resting woodland creatures.", scenes: [
        "The little town settles beneath the stars.",
        "Morning light waits beyond the hills." ] }
    ]
  },
  {
    id: "family-little-daybreak", title: "Little Daybreak", genre: "Preschool Learning", rating: "TV-Y",
    style: "preschool", palette: ["#7BC4A4", "#F2D06B", "#1D3A5F"],
    tagline: "Wake up with small discoveries and friendly questions.",
    mediaPool: ["family-measuring-objects", "family-community-helpers"],
    episodes: [
      { title: "Standby", synopsis: "Shapes, sounds, neighbors, and counting games begin the day.", scenes: [
        "Can you find the smallest shape?",
        "Every neighborhood has helping hands." ] }
    ]
  },
  {
    id: "family-storybook-window", title: "Storybook Window", genre: "Family Animation", rating: "TV-Y",
    style: "toon", palette: ["#6C4A73", "#E9B872", "#F6ECD7"],
    tagline: "Open the window and let a brand-new tale wander in.",
    episodes: [
      { title: "Standby", synopsis: "Original illustrated stories about kindness, patience, and imaginative problem-solving.", scenes: [
        "A paper boat carries a very important letter.",
        "The smallest lantern finds the longest road." ] }
    ]
  },
  {
    id: "family-curiosity-club", title: "Curiosity Club", genre: "Nature & Education", rating: "TV-Y",
    style: "nature", palette: ["#2D6A4F", "#95C97B", "#F4E3A1"],
    tagline: "Look closely. Every sound, animal, and object has a story.",
    mediaPool: ["family-talking-siamangs", "family-sounds-all-around"],
    episodes: [
      { title: "Standby", synopsis: "Young viewers observe animals, listen to everyday sounds, and practice asking useful questions.", scenes: [
        "What can an animal's call tell us?",
        "Close your eyes. How many sounds can you find?" ] }
    ]
  },
  {
    id: "family-make-and-notice", title: "Make & Notice", genre: "Creative Learning", rating: "TV-Y",
    style: "preschool", palette: ["#D96C75", "#F6C85F", "#5D87A1"],
    tagline: "Look carefully, make something, and share what you see.",
    mediaPool: ["family-posing-portrait"],
    episodes: [
      { title: "Standby", synopsis: "A gentle art-and-observation workshop using simple household materials.", scenes: [
        "Choose a pose that tells a story.",
        "What colors show how you feel today?" ] }
    ]
  },
  {
    id: "family-after-school-sketchbook", title: "After-School Sketchbook", genre: "Comedy Animation", rating: "TV-Y7",
    style: "toon", palette: ["#3446A3", "#FF9F1C", "#F7F3E8"],
    tagline: "Doodles, detours, and one more adventure before dinner.",
    episodes: [
      { title: "Standby", synopsis: "Original animated friends turn ordinary school-day mix-ups into playful adventures.", scenes: [
        "The science poster has escaped into the hallway.",
        "A missing lunchbox leaves a trail of crackers." ] }
    ]
  },
  {
    id: "family-sidewalk-stories", title: "Sidewalk Stories", genre: "Youth Comedy", rating: "TV-G",
    style: "sitcom", palette: ["#245A73", "#E88D67", "#F3E9D2"],
    tagline: "Growing up happens one block, one friend, and one surprise at a time.",
    episodes: [
      { title: "Standby", synopsis: "An original neighborhood comedy about friends solving everyday school and block problems.", scenes: [
        "The club fundraiser needs a brand-new plan.",
        "A promise between friends is worth keeping." ] }
    ]
  },
  {
    id: "family-clubhouse-challenge", title: "Clubhouse Challenge", genre: "Family Game Show", rating: "TV-G",
    style: "game", palette: ["#173F5F", "#3CAEA3", "#F6D55C"],
    tagline: "Teamwork turns everyday objects into extraordinary solutions.",
    episodes: [
      { title: "Standby", synopsis: "Families tackle cooperative puzzles, drawing games, and low-stakes building challenges.", scenes: [
        "Build the tallest tower with ten paper cups.",
        "One clue remains, so ask your teammate." ] }
    ]
  },
  {
    id: "family-together-time", title: "Together Time", genre: "Family Variety", rating: "TV-G",
    style: "cooking", palette: ["#8C5E58", "#E8C07D", "#5C8D89"],
    tagline: "Stories, simple recipes, and projects made better together.",
    episodes: [
      { title: "Standby", synopsis: "A warm family hour combining simple cooking, crafts, conversation, and music.", scenes: [
        "Tonight's snack needs three colorful ingredients.",
        "Every family keeps a different kind of tradition." ] }
    ]
  },
  {
    id: "family-picture-night", title: "Picture Night", genre: "Family Movie", rating: "TV-G",
    style: "movie", palette: ["#16213E", "#E2B857", "#F8F1E1"],
    tagline: "A new procedural family adventure begins every evening.",
    episodes: [
      { title: "Standby", synopsis: "An original feature-length procedural story centered on friendship, discovery, and a safe return home.", scenes: [
        "The map points toward a town no one remembers.",
        "Home is closer when everyone travels together." ] }
    ]
  }
];
