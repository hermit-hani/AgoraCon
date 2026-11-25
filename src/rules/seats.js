// RULE 1: AVAILABILITY / CAPACITY (seats).  Pure functions: plain values in, plain result out.
//
// Three kinds of event, told apart by minTeam / maxTeam:
//  - Individual (maxTeam === 1): one registration books 1 to 6 seats.
//  - Fixed-size team (minTeam === maxTeam > 1, e.g. teams of 4): `capacity` counts TEAMS.
//    One registration is one team and takes ONE seat. The quantity is the team size,
//    which must be exactly that size and only affects the price and the member rows.
//  - Group with a range (maxTeam > minTeam, e.g. 1 to 5): `capacity` counts PEOPLE.
//    Every person takes one seat, so the group size is limited by the seats left.
// Seats left = capacity - registered (derived, never stored).

export const MAX_INDIVIDUAL_SEATS = 6;

export const isTeamEvent = (event) => event.maxTeam > 1;

// A team of one exact size (e.g. 4). For these events capacity counts teams, not people.
export const isFixedTeam = (event) => event.maxTeam > 1 && event.minTeam === event.maxTeam;

// "team" or "seat": the thing that `capacity` and `registered` count for this event.
export const capacityUnit = (event) => (isFixedTeam(event) ? "team" : "seat");

// How many seats a registration of `quantity` uses up. A fixed team uses 1 seat
// however many members it has; everyone else uses one seat per person.
export const seatsNeeded = (event, quantity) => (isFixedTeam(event) ? 1 : quantity);

// Math.max stops bad data (registered > capacity) from giving a negative number.
export const seatsLeft = (event) => Math.max(0, event.capacity - event.registered);

export const isSoldOut = (event) => seatsLeft(event) === 0;

// The smallest and largest quantity (people or seats booked) this event accepts right now.
// { min: 0, max: 0 } means "nothing can be booked".
export function allowedRange(event) {
  const left = seatsLeft(event);
  if (left === 0) return { min: 0, max: 0 };

  // Fixed team: exactly one size. One team needs one seat, and left >= 1 here.
  if (isFixedTeam(event)) return { min: event.minTeam, max: event.maxTeam };

  if (isTeamEvent(event)) {
    // Ranged group: each person takes a seat, so seats left caps the group size.
    const max = Math.min(event.maxTeam, left);
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
  if (isFixedTeam(event)) {
    return { ok: false, reason: `A team has exactly ${event.minTeam} members.`, suggested };
  }
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

// Short words for cards and pages ("Only 2 seats left", "10 teams left", "Sold out").
export function seatsLabel(event) {
  const left = seatsLeft(event);
  if (left === 0) return "Sold out";
  const unit = capacityUnit(event);
  return `${left <= 5 ? "Only " : ""}${left} ${unit}${left === 1 ? "" : "s"} left`;
}

export function rangeLabel(event) {
  const { min, max } = allowedRange(event);
  if (max === 0) return "No places can be booked";
  if (isFixedTeam(event)) return `One team of ${min}`;
  return isTeamEvent(event) ? `Team size: ${min} to ${max}` : `Allowed: ${min} to ${max} seats`;
}
