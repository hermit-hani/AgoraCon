// RULE 2b: ELIGIBILITY (time clash).  Two events in the plan may not overlap.
// Overlap test: each one starts BEFORE the other ends.
//      startA < endB  &&  startB < endA
// "<" not "<=" means back-to-back events (one ends 14:00, next starts 14:00) are fine.
// ISO strings like "2026-12-05T14:00" sort correctly as plain text, so no Date objects.

export function eventsClash(a, b) {
  return a.start < b.end && b.start < a.end;
}

// For each event id, the list of OTHER events in `events` that it overlaps.
// Returns an object like { "athena": [eventB], "artemis": [eventA] }.
export function clashMap(events) {
  const map = {};
  for (const a of events) {
    map[a.id] = events.filter((b) => b.id !== a.id && eventsClash(a, b));
  }
  return map;
}
