// RULE 1: AVAILABILITY / CAPACITY (seats).  Pure functions: plain values in, plain result out.
//
//  - Individual event (maxTeam === 1): one registration books 1 to 6 seats.
//  - Team event (maxTeam > 1): one registration is one team. The quantity is the TEAM SIZE
//    and every member takes one seat, so a team of 3 uses 3 seats.
//  - Never more than the seats left. Seats left = capacity - registered (derived, never stored).

export const MAX_INDIVIDUAL_SEATS = 6;

export const isTeamEvent = (event) => event.maxTeam > 1;

// Math.max stops bad data (registered > capacity) from giving a negative number.
export const seatsLeft = (event) => Math.max(0, event.capacity - event.registered);

export const isSoldOut = (event) => seatsLeft(event) === 0;

// The smallest and largest quantity this event accepts right now.
// { min: 0, max: 0 } means "nothing can be booked".
export function allowedRange(event) {
  const left = seatsLeft(event);
  if (isTeamEvent(event)) {
    const max = Math.min(event.maxTeam, left);
    // Fewer seats left than the smallest team: no team can be formed.
    return max < event.minTeam ? { min: 0, max: 0 } : { min: event.minTeam, max };
  }
  const max = Math.min(MAX_INDIVIDUAL_SEATS, left);
  return max < 1 ? { min: 0, max: 0 } : { min: 1, max };
}

// Pushes a number into the range. Used for the "Set to N" button.
function clamp(value, { min, max }) {
  if (!Number.isInteger(value)) return min;
  return Math.min(Math.max(value, min), max);
}

// Returns { ok: true } or { ok: false, reason, suggested }.
// `suggested` is the nearest valid quantity, or null when nothing is valid (sold out).
export function validateQuantity(event, quantity) {
  const left = seatsLeft(event);
  const range = allowedRange(event);

  if (left === 0) {
    return { ok: false, reason: "Sold out: no seats are left.", suggested: null };
  }
  if (range.max === 0) {
    return {
      ok: false,
      reason: `Only ${left} seat${left === 1 ? "" : "s"} left, but a team needs at least ${event.minTeam}.`,
      suggested: null,
    };
  }
  if (!Number.isInteger(quantity)) {
    return { ok: false, reason: "Enter a whole number.", suggested: range.min };
  }
  if (quantity >= range.min && quantity <= range.max) return { ok: true };

  const suggested = clamp(quantity, range);
  if (isTeamEvent(event)) {
    const why =
      range.max < event.maxTeam
        ? `Only ${left} seats are left, so a team can have ${range.min} to ${range.max} members.`
        : `A team needs ${range.min} to ${range.max} members.`;
    return { ok: false, reason: why, suggested };
  }
  const why =
    range.max < MAX_INDIVIDUAL_SEATS
      ? `Only ${left} seat${left === 1 ? "" : "s"} left.`
      : `You can book at most ${MAX_INDIVIDUAL_SEATS} seats for this event.`;
  return { ok: false, reason: quantity < range.min ? "Book at least 1 seat." : why, suggested };
}

// Short words for cards and the plan page ("Only 2 seats left", "Sold out").
export function seatsLabel(event) {
  const left = seatsLeft(event);
  if (left === 0) return "Sold out";
  return `${left <= 5 ? "Only " : ""}${left} seat${left === 1 ? "" : "s"} left`;
}

export function rangeLabel(event) {
  const { min, max } = allowedRange(event);
  if (max === 0) return "No seats can be booked";
  return isTeamEvent(event) ? `Team size: ${min} to ${max}` : `Allowed: ${min} to ${max} seats`;
}
