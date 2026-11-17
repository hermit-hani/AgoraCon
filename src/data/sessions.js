// Local data for AgoraCon. Every record has a stable `id` (FR03) that is used
// for React keys and for the /sessions/:id route.
//
// Field guide (each field exists because a rule or feature needs it):
//   start / end      ISO local date-time strings -> used by the clash rule
//   capacity         total seats for THIS session (capacity rule)
//   registered       seats already taken at the start (seed data); seats left
//                    is DERIVED later as capacity - registered, never stored
//   minTeam/maxTeam  1/1 means an individual session; otherwise a team event
//   minAge           0 = everyone, otherwise the minimum age (age rule)
//   earlyBirdUntil   last day the early-bird price applies, or null (pricing rule)
//   price            in PKR, before any discount
//
// NOTE: these are sample sessions to prove the pipeline works. The full list
// of 10+ sessions is added in a later stage. All names and text are original.

export const sessions = [
  {
    id: "zeus-opening-keynote",
    title: "The Thunder Opening",
    host: "Zeus",
    type: "Ceremony",
    zone: "Main Lawn",
    start: "2026-12-04T17:00",
    end: "2026-12-04T18:30",
    price: 500,
    capacity: 400,
    registered: 212,
    minTeam: 1,
    maxTeam: 1,
    minAge: 0,
    earlyBirdUntil: "2026-11-30",
    summary:
      "The king of the gods opens AgoraCon with a keynote on ruling an unruly pantheon, followed by a lightning-themed light show.",
  },
  {
    id: "athena-strategy-showdown",
    title: "Athena's Strategy Showdown",
    host: "Athena",
    type: "Competition",
    zone: "Library Hall",
    start: "2026-12-05T11:00",
    end: "2026-12-05T14:00",
    price: 800,
    capacity: 60,
    registered: 57,
    minTeam: 2,
    maxTeam: 4,
    minAge: 0,
    earlyBirdUntil: "2026-11-30",
    summary:
      "Teams of two to four outwit each other in a board-and-bluff tournament judged by the goddess of wisdom herself.",
  },
  {
    id: "apollo-sunset-concert",
    title: "Apollo's Sunset Concert",
    host: "Apollo",
    type: "Concert",
    zone: "Amphitheatre",
    start: "2026-12-05T18:00",
    end: "2026-12-05T20:30",
    price: 1200,
    capacity: 300,
    registered: 300,
    minTeam: 1,
    maxTeam: 1,
    minAge: 0,
    earlyBirdUntil: null,
    summary:
      "Lyres, strings and verse as the sun sets. A full-house evening of music from the god of the arts.",
  },
  {
    id: "hades-midnight-tour",
    title: "Hades' Underworld Night Tour",
    host: "Hades",
    type: "Workshop",
    zone: "Basement Corridor",
    start: "2026-12-05T22:00",
    end: "2026-12-05T23:30",
    price: 700,
    capacity: 60,
    registered: 20,
    minTeam: 1,
    maxTeam: 1,
    minAge: 18,
    earlyBirdUntil: "2026-11-30",
    summary:
      "A late-night guided walk through the realm of the dead, with grim storytelling. Not for the faint-hearted.",
  },
];
