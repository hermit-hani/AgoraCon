// Local data for AgoraCon: the 24 official events (12 Olympians x 2 each).
// Every record has a stable `id` (a slug) used for React keys and the /events/:id route.
//
// Field guide:
//   type             the main category used by the Type filter (Talk, Workshop, Competition, Social)
//   format           the detail from the catalogue (Quiz, Scavenger Hunt...), not filtered on
//   start / end      ISO local date-times; Day 1 = Fri 4 Dec 2026
//   capacity         total seats. For team events (fixed team size) it counts TEAMS: one
//                    registration = one team = one seat
//   registered       seats already taken. SIMULATED seed data: seats left is DERIVED as
//                    capacity - registered and is never stored
//   minTeam / maxTeam 1/1 = individual; otherwise the allowed team or group size
//   minAge           minimum age (age rule)
//   price            PKR per participant, before any discount
//   earlyBirdPrice   catalogue price with 15% off, valid until earlyBirdUntil
//                    (7 days before Day 1 = 27 Nov 2026)
//   about            2-3 sentences on what actually happens (shown on the details page)
//   schedule         timeline: [{ time: "HH:MM", item }] inside the event's start and end
//   prize            competitions only: { per: "team" | "player" | "act" | "entry" | "troupe",
//                    placings: [{ place, cash (PKR), item }] }

export const events = [
  {
    "id": "the-olympian-summit",
    "title": "The Olympian Summit",
    "host": "Zeus",
    "type": "Talk",
    "format": "Panel Discussion",
    "zone": "Main Auditorium",
    "start": "2026-12-04T09:00",
    "end": "2026-12-04T10:00",
    "price": 400,
    "earlyBirdPrice": 340,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 120,
    "registered": 54,
    "minTeam": 1,
    "maxTeam": 1,
    "minAge": 16,
    "summary": "A discussion on leadership, decision-making and the qualities that make a great leader, featuring guest speakers and interactive audience participation.",
    "about": "Zeus opens the festival by asking a panel one hard question: what makes someone worth following? Speakers share how they make decisions under pressure, when they changed their minds, and what they would tell a first-time leader. The last third is yours: questions from the floor are answered live.",
    "schedule": [
      {
        "time": "09:00",
        "item": "Doors open and seating"
      },
      {
        "time": "09:10",
        "item": "Zeus opens the Summit"
      },
      {
        "time": "09:20",
        "item": "Panel: what makes a leader?"
      },
      {
        "time": "09:45",
        "item": "Audience questions"
      },
      {
        "time": "09:55",
        "item": "Closing remarks"
      }
    ]
  },
  {
    "id": "beneath-the-waves",
    "title": "Beneath the Waves",
    "host": "Poseidon",
    "type": "Talk",
    "format": "",
    "zone": "Lecture Theatre B",
    "start": "2026-12-04T09:00",
    "end": "2026-12-04T10:00",
    "price": 300,
    "earlyBirdPrice": 255,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 80,
    "registered": 48,
    "minTeam": 1,
    "maxTeam": 1,
    "minAge": 15,
    "summary": "Explore the mysteries of the oceans, marine life and underwater ecosystems in an engaging session about exploration and environmental conservation.",
    "about": "Poseidon takes you down through the ocean's layers, from sunlit reefs to the dark deep. You will hear how marine ecosystems stay in balance, what is putting them at risk, and what ordinary people can do about it. Expect photos, short clips and time for questions.",
    "schedule": [
      {
        "time": "09:00",
        "item": "Welcome from Poseidon"
      },
      {
        "time": "09:10",
        "item": "Talk: life in the ocean zones"
      },
      {
        "time": "09:30",
        "item": "Talk: threats and conservation"
      },
      {
        "time": "09:50",
        "item": "Questions"
      }
    ]
  },
  {
    "id": "the-art-of-diplomacy",
    "title": "The Art of Diplomacy",
    "host": "Hera",
    "type": "Workshop",
    "format": "",
    "zone": "Seminar Room A",
    "start": "2026-12-04T10:30",
    "end": "2026-12-04T12:00",
    "price": 800,
    "earlyBirdPrice": 680,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 30,
    "registered": 27,
    "minTeam": 1,
    "maxTeam": 1,
    "minAge": 16,
    "summary": "Learn negotiation, communication and conflict-resolution skills through interactive exercises and real-world scenarios.",
    "about": "A practical session on getting agreement without a fight. You learn to separate what people say they want from what they need, then try it in a live role-play with two other sides. You leave with a one-page checklist for your next hard conversation.",
    "schedule": [
      {
        "time": "10:30",
        "item": "Warm-up: how we really listen"
      },
      {
        "time": "10:45",
        "item": "Negotiation basics: interests vs positions"
      },
      {
        "time": "11:05",
        "item": "Role-play: a three-party negotiation"
      },
      {
        "time": "11:35",
        "item": "Debrief: what worked and what didn't"
      },
      {
        "time": "11:50",
        "item": "Take-home checklist"
      }
    ]
  },
  {
    "id": "seeds-of-change",
    "title": "Seeds of Change",
    "host": "Demeter",
    "type": "Workshop",
    "format": "",
    "zone": "University Botanical Courtyard",
    "start": "2026-12-04T10:30",
    "end": "2026-12-04T12:00",
    "price": 700,
    "earlyBirdPrice": 595,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 25,
    "registered": 12,
    "minTeam": 1,
    "maxTeam": 1,
    "minAge": 13,
    "summary": "A hands-on introduction to sustainable gardening, planting and environmental awareness. Participants get to plant and take home their own seedlings.",
    "about": "Demeter's workshop is hands-on from the first minute. You learn what seeds and soil need, sow your own seedlings in a pot, and get a simple care guide for keeping them alive. Your seedling comes home with you. Wear clothes that can get dirty.",
    "schedule": [
      {
        "time": "10:30",
        "item": "Gather in the courtyard: tools and soil"
      },
      {
        "time": "10:40",
        "item": "Short talk: how seeds grow"
      },
      {
        "time": "11:00",
        "item": "Hands-on: sow your seedlings"
      },
      {
        "time": "11:35",
        "item": "Care guide: water and light"
      },
      {
        "time": "11:50",
        "item": "Collect your pot"
      }
    ]
  },
  {
    "id": "the-oracles-council",
    "title": "The Oracle's Council",
    "host": "Athena",
    "type": "Talk",
    "format": "Panel Discussion",
    "zone": "Lecture Theatre A",
    "start": "2026-12-04T12:30",
    "end": "2026-12-04T13:30",
    "price": 400,
    "earlyBirdPrice": 340,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 100,
    "registered": 70,
    "minTeam": 1,
    "maxTeam": 1,
    "minAge": 16,
    "summary": "An insightful discussion on critical thinking, innovation, academic research and the pursuit of knowledge, featuring university academics and guest speakers.",
    "about": "Athena's panel asks how we decide what is true. University academics and guest speakers talk about how research really works, why good ideas get tested to destruction, and how to think clearly when information is messy. Questions from the audience are welcome throughout.",
    "schedule": [
      {
        "time": "12:30",
        "item": "Opening from Athena"
      },
      {
        "time": "12:40",
        "item": "Panel: how do we know what is true?"
      },
      {
        "time": "13:05",
        "item": "Research spotlights: three short talks"
      },
      {
        "time": "13:20",
        "item": "Audience questions"
      }
    ]
  },
  {
    "id": "the-muses-workshop",
    "title": "The Muses' Workshop",
    "host": "Apollo",
    "type": "Workshop",
    "format": "",
    "zone": "Creative Arts Studio",
    "start": "2026-12-04T14:00",
    "end": "2026-12-04T15:30",
    "price": 900,
    "earlyBirdPrice": 765,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 25,
    "registered": 10,
    "minTeam": 1,
    "maxTeam": 1,
    "minAge": 15,
    "summary": "Explore your creative side through poetry, storytelling and songwriting exercises inspired by ancient mythology.",
    "about": "Apollo's workshop uses ancient myths as writing prompts. You write a fast poem, build a short story around a mythic character, and finish by turning a verse into a simple song. Nothing needs to be good, and sharing at the end is optional.",
    "schedule": [
      {
        "time": "14:00",
        "item": "Invocation: a myth as a prompt"
      },
      {
        "time": "14:15",
        "item": "Poetry sprint"
      },
      {
        "time": "14:45",
        "item": "Storytelling circle"
      },
      {
        "time": "15:05",
        "item": "Turn a verse into a song"
      },
      {
        "time": "15:20",
        "item": "Share and close"
      }
    ]
  },
  {
    "id": "the-royal-assembly",
    "title": "The Royal Assembly",
    "host": "Hera",
    "type": "Social",
    "format": "Networking",
    "zone": "Central Atrium",
    "start": "2026-12-04T16:00",
    "end": "2026-12-04T17:30",
    "price": 600,
    "earlyBirdPrice": 510,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 100,
    "registered": 55,
    "minTeam": 1,
    "maxTeam": 1,
    "minAge": 16,
    "summary": "A themed networking gathering where attendees can meet fellow mortals, exchange ideas and build new connections in a royal-inspired setting.",
    "about": "Hera hosts an evening for meeting people outside your own department. Short icebreaker rounds get conversations started, then the floor opens for free networking. Bring something to talk about besides your degree.",
    "schedule": [
      {
        "time": "16:00",
        "item": "Doors open and name badges"
      },
      {
        "time": "16:15",
        "item": "Icebreaker rounds"
      },
      {
        "time": "16:45",
        "item": "Open networking"
      },
      {
        "time": "17:15",
        "item": "Closing toast"
      }
    ]
  },
  {
    "id": "the-garden-of-aphrodite",
    "title": "The Garden of Aphrodite",
    "host": "Aphrodite",
    "type": "Social",
    "format": "",
    "zone": "Rose Courtyard",
    "start": "2026-12-04T17:30",
    "end": "2026-12-04T19:00",
    "price": 700,
    "earlyBirdPrice": 595,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 80,
    "registered": 24,
    "minTeam": 1,
    "maxTeam": 1,
    "minAge": 16,
    "summary": "An enchanting themed gathering featuring music, creative activities, photography corners and collaborative art. A celebration of beauty, creativity and connection.",
    "about": "A relaxed evening in the Rose Courtyard. Add your part to a shared mural, take portraits at the photo corners, and listen to live music while the garden fills up. It is the festival's quietest social, and the best one for making something together.",
    "schedule": [
      {
        "time": "17:30",
        "item": "The garden opens"
      },
      {
        "time": "17:45",
        "item": "Collaborative mural begins"
      },
      {
        "time": "18:10",
        "item": "Photo corners and music"
      },
      {
        "time": "18:40",
        "item": "Gallery walk"
      },
      {
        "time": "18:55",
        "item": "Close"
      }
    ]
  },
  {
    "id": "clash-of-the-titans",
    "title": "Clash of the Titans",
    "host": "Zeus",
    "type": "Competition",
    "format": "Quiz",
    "zone": "Main Auditorium",
    "start": "2026-12-05T09:00",
    "end": "2026-12-05T11:00",
    "price": 600,
    "earlyBirdPrice": 510,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 20,
    "registered": 10,
    "minTeam": 4,
    "maxTeam": 4,
    "minAge": 16,
    "summary": "Put your knowledge to the test in a fast-paced general knowledge tournament covering mythology, history, science and pop culture.",
    "about": "Teams of four face three rounds of general knowledge: mythology, history and science, then pop culture. A final round settles ties. Answers are written, scored by the judges, and the scoreboard stays on screen so everyone sees the race.",
    "schedule": [
      {
        "time": "09:00",
        "item": "Check-in and team seating"
      },
      {
        "time": "09:15",
        "item": "Rules from Zeus"
      },
      {
        "time": "09:20",
        "item": "Round 1: mythology"
      },
      {
        "time": "09:45",
        "item": "Round 2: history and science"
      },
      {
        "time": "10:10",
        "item": "Round 3: pop culture"
      },
      {
        "time": "10:35",
        "item": "Final round and tie-break"
      },
      {
        "time": "10:50",
        "item": "Results and prizes"
      }
    ],
    "prize": {
      "per": "team",
      "placings": [
        {
          "place": "1st",
          "cash": 20000,
          "item": "The Thunderbolt Trophy"
        },
        {
          "place": "2nd",
          "cash": 10000,
          "item": "A laurel crown for each member"
        },
        {
          "place": "3rd",
          "cash": 5000,
          "item": "Bronze Titan medals"
        }
      ]
    }
  },
  {
    "id": "the-seas-challenge",
    "title": "The Sea's Challenge",
    "host": "Poseidon",
    "type": "Competition",
    "format": "Quiz",
    "zone": "Lecture Theatre B",
    "start": "2026-12-05T09:00",
    "end": "2026-12-05T11:00",
    "price": 500,
    "earlyBirdPrice": 425,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 15,
    "registered": 6,
    "minTeam": 4,
    "maxTeam": 4,
    "minAge": 15,
    "summary": "Test your knowledge of oceans, geography, marine biology and Greek mythology in this team-based trivia challenge.",
    "about": "A team quiz about the sea: geography, marine biology, and the myths of Poseidon's realm. Rounds get harder as they go, and there is a picture round in the middle.",
    "schedule": [
      {
        "time": "09:00",
        "item": "Check-in and team seating"
      },
      {
        "time": "09:15",
        "item": "Rules from Poseidon"
      },
      {
        "time": "09:20",
        "item": "Round 1: oceans and geography"
      },
      {
        "time": "09:45",
        "item": "Round 2: marine biology"
      },
      {
        "time": "10:10",
        "item": "Round 3: myths of the sea"
      },
      {
        "time": "10:35",
        "item": "Final round"
      },
      {
        "time": "10:50",
        "item": "Results and prizes"
      }
    ],
    "prize": {
      "per": "team",
      "placings": [
        {
          "place": "1st",
          "cash": 15000,
          "item": "The Trident Cup"
        },
        {
          "place": "2nd",
          "cash": 8000,
          "item": "Pearl pins for each member"
        },
        {
          "place": "3rd",
          "cash": 4000,
          "item": "Shell medals"
        }
      ]
    }
  },
  {
    "id": "the-green-challenge",
    "title": "The Green Challenge",
    "host": "Demeter",
    "type": "Competition",
    "format": "",
    "zone": "Innovation Lab",
    "start": "2026-12-05T11:30",
    "end": "2026-12-05T13:00",
    "price": 500,
    "earlyBirdPrice": 425,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 20,
    "registered": 12,
    "minTeam": 4,
    "maxTeam": 4,
    "minAge": 15,
    "summary": "Teams compete to develop innovative and practical solutions to environmental challenges, including food waste, pollution and campus sustainability.",
    "about": "Each team picks one environmental problem, such as food waste, pollution or campus energy use, and designs a practical fix with a plan or a simple prototype. You pitch it to a judging panel that scores how realistic and useful it is.",
    "schedule": [
      {
        "time": "11:30",
        "item": "Briefing: three problems to choose from"
      },
      {
        "time": "11:40",
        "item": "Pick your problem and plan"
      },
      {
        "time": "12:00",
        "item": "Build your solution"
      },
      {
        "time": "12:30",
        "item": "Short pitches to the judges"
      },
      {
        "time": "12:50",
        "item": "Winners announced"
      }
    ],
    "prize": {
      "per": "team",
      "placings": [
        {
          "place": "1st",
          "cash": 15000,
          "item": "The Golden Sheaf and a campus pilot slot"
        },
        {
          "place": "2nd",
          "cash": 8000,
          "item": "Seed packs for each member"
        },
        {
          "place": "3rd",
          "cash": 4000,
          "item": "Potted olive saplings"
        }
      ]
    }
  },
  {
    "id": "battle-of-wits",
    "title": "Battle of Wits",
    "host": "Athena",
    "type": "Competition",
    "format": "Puzzle Challenge",
    "zone": "Seminar Hall A",
    "start": "2026-12-05T11:30",
    "end": "2026-12-05T13:00",
    "price": 500,
    "earlyBirdPrice": 425,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 25,
    "registered": 8,
    "minTeam": 3,
    "maxTeam": 3,
    "minAge": 16,
    "summary": "A battle of logic, intelligence and strategy featuring challenging riddles, brain teasers and problem-solving rounds.",
    "about": "Teams of three work through riddles, logic grids and one large strategy puzzle against the clock. Points go to speed as well as correct answers. No special knowledge is needed, only careful thinking.",
    "schedule": [
      {
        "time": "11:30",
        "item": "Check-in and seating"
      },
      {
        "time": "11:40",
        "item": "Round 1: riddles"
      },
      {
        "time": "12:00",
        "item": "Round 2: logic grids"
      },
      {
        "time": "12:25",
        "item": "Round 3: the strategy puzzle"
      },
      {
        "time": "12:50",
        "item": "Scores and prizes"
      }
    ],
    "prize": {
      "per": "team",
      "placings": [
        {
          "place": "1st",
          "cash": 12000,
          "item": "Athena's Owl Trophy"
        },
        {
          "place": "2nd",
          "cash": 6000,
          "item": "Engraved pens"
        },
        {
          "place": "3rd",
          "cash": 3000,
          "item": "Puzzle-box sets"
        }
      ]
    }
  },
  {
    "id": "echoes-of-olympus",
    "title": "Echoes of Olympus",
    "host": "Apollo",
    "type": "Competition",
    "format": "Talent Showcase",
    "zone": "Open-Air Stage",
    "start": "2026-12-05T14:00",
    "end": "2026-12-05T16:00",
    "price": 500,
    "earlyBirdPrice": 425,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 100,
    "registered": 40,
    "minTeam": 1,
    "maxTeam": 5,
    "minAge": 15,
    "summary": "A celebration of artistic talent featuring singing, instrumental performances, poetry and spoken word. Participants compete for the attention and favour of Apollo himself.",
    "about": "Sing, play, recite or perform. Soloists and groups of up to five get a short stage slot, and a panel judges on skill and stage presence. The audience is invited to cheer. Bring your own instrument; a sound system and a keyboard are provided.",
    "schedule": [
      {
        "time": "14:00",
        "item": "Doors and sound check"
      },
      {
        "time": "14:15",
        "item": "Singing and instrumental acts"
      },
      {
        "time": "15:00",
        "item": "Poetry and spoken word"
      },
      {
        "time": "15:40",
        "item": "Judges confer"
      },
      {
        "time": "15:50",
        "item": "Winners announced"
      }
    ],
    "prize": {
      "per": "act",
      "placings": [
        {
          "place": "1st",
          "cash": 25000,
          "item": "The Golden Lyre"
        },
        {
          "place": "2nd",
          "cash": 12000,
          "item": "A studio recording session"
        },
        {
          "place": "3rd",
          "cash": 6000,
          "item": "A laurel wreath and a medal"
        }
      ]
    }
  },
  {
    "id": "wild-discoveries",
    "title": "Wild Discoveries",
    "host": "Artemis",
    "type": "Workshop",
    "format": "",
    "zone": "Photography Studio",
    "start": "2026-12-05T14:00",
    "end": "2026-12-05T15:30",
    "price": 800,
    "earlyBirdPrice": 680,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 20,
    "registered": 20,
    "minTeam": 1,
    "maxTeam": 1,
    "minAge": 15,
    "summary": "Discover the art of nature photography, wildlife observation and documenting the natural world through a beginner-friendly interactive session.",
    "about": "Artemis teaches the basics of photographing the natural world: how to read light, frame a subject and wait for the moment. You practise on nature props and specimens, then review your pictures together. Bring a phone or a camera.",
    "schedule": [
      {
        "time": "14:00",
        "item": "Camera basics"
      },
      {
        "time": "14:20",
        "item": "Light and framing"
      },
      {
        "time": "14:40",
        "item": "Practice shoot with specimens"
      },
      {
        "time": "15:10",
        "item": "Review your images"
      },
      {
        "time": "15:25",
        "item": "Wrap-up"
      }
    ]
  },
  {
    "id": "hunt-for-the-gods",
    "title": "Hunt for the Gods",
    "host": "Artemis",
    "type": "Competition",
    "format": "Scavenger Hunt",
    "zone": "University Campus Grounds",
    "start": "2026-12-05T16:00",
    "end": "2026-12-05T18:00",
    "price": 400,
    "earlyBirdPrice": 340,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 24,
    "registered": 15,
    "minTeam": 4,
    "maxTeam": 4,
    "minAge": 15,
    "summary": "Follow hidden clues, solve riddles and complete challenges scattered across campus. Only the most observant teams will uncover the treasures of Olympus.",
    "about": "A campus-wide scavenger hunt. Each team of four gets a first clue, solves riddles to find the next location, and completes a small challenge at each stop. The first team to uncover every treasure wins. Wear comfortable shoes.",
    "schedule": [
      {
        "time": "16:00",
        "item": "Gather and receive the first clue"
      },
      {
        "time": "16:15",
        "item": "The hunt begins"
      },
      {
        "time": "17:15",
        "item": "Halfway check-in"
      },
      {
        "time": "17:40",
        "item": "All teams back"
      },
      {
        "time": "17:50",
        "item": "Winners announced"
      }
    ],
    "prize": {
      "per": "team",
      "placings": [
        {
          "place": "1st",
          "cash": 15000,
          "item": "The Golden Bow"
        },
        {
          "place": "2nd",
          "cash": 8000,
          "item": "Explorer compasses"
        },
        {
          "place": "3rd",
          "cash": 4000,
          "item": "Silver arrow pins"
        }
      ]
    }
  },
  {
    "id": "the-strategists-arena",
    "title": "The Strategist's Arena",
    "host": "Ares",
    "type": "Competition",
    "format": "",
    "zone": "Games and Recreation Room",
    "start": "2026-12-05T16:00",
    "end": "2026-12-05T18:00",
    "price": 500,
    "earlyBirdPrice": 425,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 64,
    "registered": 28,
    "minTeam": 1,
    "maxTeam": 1,
    "minAge": 15,
    "summary": "Enter the arena for a series of strategic challenges featuring chess, tactical puzzles and competitive problem-solving rounds.",
    "about": "An individual tournament of strategy: timed chess games, then tactical puzzles, then a final bracket among the top scorers. Play is by the clock and every move is final. Beginners are welcome, and the draw is random in the first round.",
    "schedule": [
      {
        "time": "16:00",
        "item": "Check-in and the draw"
      },
      {
        "time": "16:15",
        "item": "Round 1: timed chess"
      },
      {
        "time": "16:55",
        "item": "Round 2: tactical puzzles"
      },
      {
        "time": "17:25",
        "item": "Final bracket"
      },
      {
        "time": "17:50",
        "item": "Prizes"
      }
    ],
    "prize": {
      "per": "player",
      "placings": [
        {
          "place": "1st",
          "cash": 10000,
          "item": "The Spear of Ares"
        },
        {
          "place": "2nd",
          "cash": 5000,
          "item": "A wooden chess set"
        },
        {
          "place": "3rd",
          "cash": 2500,
          "item": "A bronze helm pin"
        }
      ]
    }
  },
  {
    "id": "beyond-the-battlefield",
    "title": "Beyond the Battlefield",
    "host": "Ares",
    "type": "Talk",
    "format": "",
    "zone": "Lecture Theatre A",
    "start": "2026-12-05T18:30",
    "end": "2026-12-05T19:30",
    "price": 300,
    "earlyBirdPrice": 255,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 120,
    "registered": 66,
    "minTeam": 1,
    "maxTeam": 1,
    "minAge": 16,
    "summary": "Explore the importance of resilience, teamwork, determination and leadership under pressure, with insights from experienced speakers.",
    "about": "Ares leaves war aside to talk about what it takes to keep going when things are hard. Speakers share how they handled setbacks, kept teams together, and led when the plan failed. A short panel and open questions close the hour.",
    "schedule": [
      {
        "time": "18:30",
        "item": "Welcome from Ares"
      },
      {
        "time": "18:40",
        "item": "Talks: resilience and teamwork"
      },
      {
        "time": "19:05",
        "item": "Panel: leading under pressure"
      },
      {
        "time": "19:20",
        "item": "Questions"
      }
    ]
  },
  {
    "id": "the-golden-muse",
    "title": "The Golden Muse",
    "host": "Aphrodite",
    "type": "Competition",
    "format": "Creative Design",
    "zone": "Design Studio",
    "start": "2026-12-06T09:00",
    "end": "2026-12-06T11:00",
    "price": 500,
    "earlyBirdPrice": 425,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 40,
    "registered": 12,
    "minTeam": 1,
    "maxTeam": 2,
    "minAge": 15,
    "summary": "A showcase of imagination and visual expression. Participants compete through photography, illustration, poster design and creative storytelling.",
    "about": "The theme is revealed at the start. You then make one piece (a photograph, an illustration, a poster or a short story), alone or as a pair, and submit it for judging. The best work goes on show in a mini gallery before winners are named.",
    "schedule": [
      {
        "time": "09:00",
        "item": "Brief: the theme is revealed"
      },
      {
        "time": "09:15",
        "item": "Create your piece"
      },
      {
        "time": "10:20",
        "item": "Submit your work"
      },
      {
        "time": "10:30",
        "item": "Judging and gallery"
      },
      {
        "time": "10:50",
        "item": "Winners announced"
      }
    ],
    "prize": {
      "per": "entry",
      "placings": [
        {
          "place": "1st",
          "cash": 15000,
          "item": "The Golden Muse statuette"
        },
        {
          "place": "2nd",
          "cash": 8000,
          "item": "A drawing tablet voucher"
        },
        {
          "place": "3rd",
          "cash": 4000,
          "item": "A set of art materials"
        }
      ]
    }
  },
  {
    "id": "forge-your-creation",
    "title": "Forge Your Creation",
    "host": "Hephaestus",
    "type": "Workshop",
    "format": "",
    "zone": "Makerspace Workshop",
    "start": "2026-12-06T09:00",
    "end": "2026-12-06T10:30",
    "price": 1000,
    "earlyBirdPrice": 850,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 25,
    "registered": 22,
    "minTeam": 1,
    "maxTeam": 1,
    "minAge": 15,
    "summary": "Step into the forge and explore the world of craftsmanship. Participants create their own projects using beginner-friendly materials and creative techniques.",
    "about": "Hephaestus shows you how to turn simple materials into something you made yourself. After a safety briefing and a demonstration of the techniques, you build your own small project at your own bench and take it home. Materials are provided and need no experience.",
    "schedule": [
      {
        "time": "09:00",
        "item": "Safety briefing and materials"
      },
      {
        "time": "09:15",
        "item": "Technique demonstration"
      },
      {
        "time": "09:35",
        "item": "Build your project"
      },
      {
        "time": "10:15",
        "item": "Finishing touches"
      },
      {
        "time": "10:25",
        "item": "Show and take home"
      }
    ]
  },
  {
    "id": "the-messengers-masterclass",
    "title": "The Messenger's Masterclass",
    "host": "Hermes",
    "type": "Workshop",
    "format": "",
    "zone": "Seminar Room B",
    "start": "2026-12-06T11:30",
    "end": "2026-12-06T13:00",
    "price": 800,
    "earlyBirdPrice": 680,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 30,
    "registered": 12,
    "minTeam": 1,
    "maxTeam": 1,
    "minAge": 16,
    "summary": "Learn the art of effective communication through public speaking exercises, presentation techniques and interactive activities.",
    "about": "Hermes helps with the thing most people fear: speaking in front of others. You learn a three-part structure for any message, practise a short talk in a small group, and get specific feedback on voice, pace and clarity.",
    "schedule": [
      {
        "time": "11:30",
        "item": "Warm-up: speaking without panic"
      },
      {
        "time": "11:45",
        "item": "Structure a message in three parts"
      },
      {
        "time": "12:05",
        "item": "Practice talks in small groups"
      },
      {
        "time": "12:40",
        "item": "Feedback round"
      },
      {
        "time": "12:55",
        "item": "Close"
      }
    ]
  },
  {
    "id": "the-inventors-trial",
    "title": "The Inventors' Trial",
    "host": "Hephaestus",
    "type": "Competition",
    "format": "Innovation Challenge",
    "zone": "Innovation Lab",
    "start": "2026-12-06T13:30",
    "end": "2026-12-06T15:30",
    "price": 700,
    "earlyBirdPrice": 595,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 15,
    "registered": 7,
    "minTeam": 4,
    "maxTeam": 4,
    "minAge": 16,
    "summary": "Teams are given a problem and limited resources. Their task is to develop, build and present an innovative solution before the judges.",
    "about": "Each team of four is given the same problem and a box of limited resources. You design, build and test a solution, then present it to the judges, who look at how well it works and how clearly you explain it.",
    "schedule": [
      {
        "time": "13:30",
        "item": "Problem revealed and resources handed out"
      },
      {
        "time": "13:45",
        "item": "Design"
      },
      {
        "time": "14:15",
        "item": "Build and test"
      },
      {
        "time": "14:55",
        "item": "Prepare your pitch"
      },
      {
        "time": "15:05",
        "item": "Presentations to the judges"
      },
      {
        "time": "15:25",
        "item": "Results"
      }
    ],
    "prize": {
      "per": "team",
      "placings": [
        {
          "place": "1st",
          "cash": 20000,
          "item": "The Anvil Trophy and a makerspace pass"
        },
        {
          "place": "2nd",
          "cash": 10000,
          "item": "Toolkits for each member"
        },
        {
          "place": "3rd",
          "cash": 5000,
          "item": "Engineer's notebooks"
        }
      ]
    }
  },
  {
    "id": "across-olympus",
    "title": "Across Olympus",
    "host": "Hermes",
    "type": "Competition",
    "format": "Campus Challenge",
    "zone": "University Campus Grounds",
    "start": "2026-12-06T13:30",
    "end": "2026-12-06T15:30",
    "price": 500,
    "earlyBirdPrice": 425,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 20,
    "registered": 7,
    "minTeam": 5,
    "maxTeam": 5,
    "minAge": 15,
    "summary": "A fast-paced adventure across campus involving clues, timed missions, riddles and unexpected challenges. Speed and teamwork will determine the winners.",
    "about": "A fast race across campus for teams of five. You get timed missions, riddles and surprises at every checkpoint, and all five members must finish together. Speed matters, but so does staying on the same page.",
    "schedule": [
      {
        "time": "13:30",
        "item": "Gather and team briefing"
      },
      {
        "time": "13:40",
        "item": "First mission begins"
      },
      {
        "time": "14:30",
        "item": "Midway checkpoint"
      },
      {
        "time": "15:10",
        "item": "Last team home"
      },
      {
        "time": "15:20",
        "item": "Winners announced"
      }
    ],
    "prize": {
      "per": "team",
      "placings": [
        {
          "place": "1st",
          "cash": 15000,
          "item": "The Winged Sandals Trophy"
        },
        {
          "place": "2nd",
          "cash": 8000,
          "item": "Team hoodies"
        },
        {
          "place": "3rd",
          "cash": 4000,
          "item": "Medals"
        }
      ]
    }
  },
  {
    "id": "the-theatre-of-dionysus",
    "title": "The Theatre of Dionysus",
    "host": "Dionysus",
    "type": "Competition",
    "format": "Theatre Performance",
    "zone": "Open-Air Stage",
    "start": "2026-12-06T16:00",
    "end": "2026-12-06T18:00",
    "price": 600,
    "earlyBirdPrice": 510,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 120,
    "registered": 54,
    "minTeam": 3,
    "maxTeam": 8,
    "minAge": 15,
    "summary": "Bring ancient myths to life through short theatrical performances, dramatic storytelling and creative interpretations of Greek legends.",
    "about": "Groups of three to eight retell a Greek myth on stage in a short performance. Judges look at storytelling, acting and creativity. Costumes and props are welcome, and a basic stage and lighting are provided.",
    "schedule": [
      {
        "time": "16:00",
        "item": "Gather and the running order"
      },
      {
        "time": "16:10",
        "item": "Performances begin"
      },
      {
        "time": "17:40",
        "item": "Judges confer"
      },
      {
        "time": "17:50",
        "item": "Awards"
      }
    ],
    "prize": {
      "per": "troupe",
      "placings": [
        {
          "place": "1st",
          "cash": 25000,
          "item": "The Golden Mask"
        },
        {
          "place": "2nd",
          "cash": 12000,
          "item": "Two festival passes per member"
        },
        {
          "place": "3rd",
          "cash": 6000,
          "item": "A laurel crown"
        }
      ]
    }
  },
  {
    "id": "the-dionysian-festival",
    "title": "The Dionysian Festival",
    "host": "Dionysus",
    "type": "Social",
    "format": "Closing Celebration",
    "zone": "Open-Air Amphitheatre",
    "start": "2026-12-06T18:30",
    "end": "2026-12-06T21:00",
    "price": 1200,
    "earlyBirdPrice": 1020,
    "earlyBirdUntil": "2026-11-27",
    "capacity": 200,
    "registered": 120,
    "minTeam": 1,
    "maxTeam": 1,
    "minAge": 16,
    "summary": "The ultimate celebration of AGORACON. Enjoy live music, performances, entertainment, games and an awards ceremony as the three-day gathering comes to a close.",
    "about": "The festival's closing night. Live music, performances and games fill the amphitheatre, and the awards ceremony honours the winners from all three days. Dionysus closes with a toast.",
    "schedule": [
      {
        "time": "18:30",
        "item": "Gates open"
      },
      {
        "time": "18:45",
        "item": "Live music"
      },
      {
        "time": "19:30",
        "item": "Performances and games"
      },
      {
        "time": "20:15",
        "item": "Awards ceremony"
      },
      {
        "time": "20:45",
        "item": "Closing toast"
      }
    ]
  }
];
