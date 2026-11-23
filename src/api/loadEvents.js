import { events } from "../data/events.js";

// Demo control (FR14 / Task 6.1): when this localStorage flag is "true" the
// loader rejects, so we can show the error + retry state on purpose.
// The footer checkbox in the app flips this flag.
export const FAIL_FLAG_KEY = "agoracon:simulateLoadFailure";

// Second demo flag: when "true", the next load reports "Wild Discoveries" as sold out,
// so we can show what happens to a saved plan when availability changes.
export const SELL_OUT_FLAG_KEY = "agoracon:sellOutWildDiscoveries";

const FAKE_DELAY_MS = 900;

// Reads a true/false flag from localStorage. localStorage can be blocked
// (private mode), so a failure just means "flag is off".
export function readFlag(key) {
  try {
    return localStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

// Pretends to be a network request. Returns a Promise so the rest of the app
// is written exactly as it would be with a real API.
export async function loadEvents() {
  await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_MS));

  if (readFlag(FAIL_FLAG_KEY)) {
    throw new Error("The messengers could not reach Olympus (simulated failure).");
  }

  // Return a copy so callers can never mutate the original data module.
  const copy = events.map((s) => ({ ...s }));

  // Demo: make the event full by filling every seat. (A new object, not an edit.)
  if (readFlag(SELL_OUT_FLAG_KEY)) {
    return copy.map((e) => (e.title === "Wild Discoveries" ? { ...e, registered: e.capacity } : e));
  }
  return copy;
}
