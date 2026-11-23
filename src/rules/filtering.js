// Search, filter and sort as plain functions. They never change the array they
// receive: filter() and [...spread] make copies.

export const SORT_OPTIONS = [
  { value: "soonest", label: "Soonest first" },
  { value: "latest", label: "Latest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "seats", label: "Most seats left" },
  { value: "az", label: "Title A to Z" },
];

export const DAY_LABELS = {
  1: "Day 1 - Fri 4 Dec",
  2: "Day 2 - Sat 5 Dec",
  3: "Day 3 - Sun 6 Dec",
};

// Festival day (1-3) worked out from the start date. 4 Dec 2026 is Day 1.
export function dayOf(event) {
  const day = Number(event.start.slice(8, 10)); // "2026-12-05T18:00" -> 5
  return day - 3;
}

export function seatsLeft(event) {
  return Math.max(0, event.capacity - event.registered); // derived, never stored
}

// Search looks at several text fields at once; the other filters are exact matches.
export function filterEvents(events, { query = "", day = "all", god = "all", type = "all" }) {
  const q = query.trim().toLowerCase();
  return events.filter((event) => {
    const text = `${event.title} ${event.host} ${event.type} ${event.zone} ${event.summary}`.toLowerCase();
    return (
      (q === "" || text.includes(q)) &&
      (day === "all" || String(dayOf(event)) === day) &&
      (god === "all" || event.host === god) &&
      (type === "all" || event.type === type)
    );
  });
}

export function sortEvents(events, sortKey) {
  const copy = [...events];
  const byStart = (a, b) => a.start.localeCompare(b.start);
  switch (sortKey) {
    case "latest":
      return copy.sort((a, b) => byStart(b, a));
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price || byStart(a, b));
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price || byStart(a, b));
    case "seats":
      return copy.sort((a, b) => seatsLeft(b) - seatsLeft(a));
    case "az":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return copy.sort(byStart);
  }
}
