// RULE 2a: ELIGIBILITY (age).  Every person covered by a registration must be
// at least event.minAge. "At least" means the boundary itself is allowed:
// a 16+ event accepts 16 and rejects 15.

// Turns the text from an <input> into a whole number, or null if it isn't one.
// (An empty string, "abc" and "12.5" all give null.)
export function parseAge(text) {
  const clean = String(text ?? "").trim();
  if (!/^\d{1,3}$/.test(clean)) return null;
  const age = Number(clean);
  return age <= 120 ? age : null;
}

// age is a number (use parseAge first). Returns { ok } or { ok:false, reason }.
export function checkAge(event, age) {
  if (!Number.isInteger(age) || age < 0 || age > 120) {
    return { ok: false, reason: "Enter an age between 0 and 120." };
  }
  if (age < event.minAge) {
    return { ok: false, reason: `${event.title} is for ages ${event.minAge}+, and the age given is ${age}.` };
  }
  return { ok: true };
}
