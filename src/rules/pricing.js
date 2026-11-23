// RULE 3: PRICING (early-bird).  The data holds both prices; this rule picks one.
// If the registration date is on or before event.earlyBirdUntil, use earlyBirdPrice.
// Free events (price 0) never change. `today` is PASSED IN as "YYYY-MM-DD" so tests
// can pin the date (27 Nov vs 28 Nov) and the result is always the same for the same input.
// "YYYY-MM-DD" strings compare correctly with <=.

export function isEarlyBird(event, today) {
  return (
    event.price > 0 &&
    typeof event.earlyBirdPrice === "number" &&
    Boolean(event.earlyBirdUntil) &&
    today <= event.earlyBirdUntil
  );
}

// Price for ONE person/seat.
export const unitPrice = (event, today) => (isEarlyBird(event, today) ? event.earlyBirdPrice : event.price);

// Team price = price x members, individual = price x seats: the same formula,
// because for both kinds `quantity` is the number of people.
export const lineTotal = (event, quantity, today) => unitPrice(event, today) * quantity;

// How much the early-bird discount saves on this line (0 when it doesn't apply).
export const lineSaving = (event, quantity, today) => (event.price - unitPrice(event, today)) * quantity;

// Today's date as "YYYY-MM-DD" in the visitor's own time zone.
export function todayISO(now = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export const formatPKR = (n) => (n === 0 ? "Free" : `PKR ${n.toLocaleString("en-US")}`);
