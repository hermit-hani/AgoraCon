import { sessions } from "../data/sessions.js";

// Demo control (FR14 / Task 6.1): when this localStorage flag is "true" the
// loader rejects, so we can show the error + retry state on purpose.
// The footer checkbox in the app flips this flag.
export const FAIL_FLAG_KEY = "agoracon:simulateLoadFailure";

const FAKE_DELAY_MS = 900;

// Pretends to be a network request. Returns a Promise so the rest of the app
// is written exactly as it would be with a real API.
export async function loadSessions() {
  await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_MS));

  let shouldFail = false;
  try {
    shouldFail = localStorage.getItem(FAIL_FLAG_KEY) === "true";
  } catch {
    // localStorage can be blocked (private mode); treat as "no failure".
  }

  if (shouldFail) {
    throw new Error("The messengers could not reach Olympus (simulated failure).");
  }

  // Return a copy so callers can never mutate the original data module.
  return sessions.map((s) => ({ ...s }));
}
