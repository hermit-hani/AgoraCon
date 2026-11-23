// PLAN CHECKING and plan list helpers.  Pure: no React, no storage.
// A plan item is { id, quantity }. Everything else (title, price...) is looked up
// from the events data on every render, so it can never go stale.

import { validateQuantity } from "./seats.js";
import { clashMap } from "./clash.js";
import { unitPrice, lineTotal, lineSaving, isEarlyBird } from "./pricing.js";

// ---- immutable list helpers (each returns a NEW array, never edits the old one) ----
export function addToItems(items, id, quantity) {
  if (items.some((item) => item.id === id)) return items; // an event can't be added twice
  return [...items, { id, quantity }];
}
export const removeFromItems = (items, id) => items.filter((item) => item.id !== id);
export const setItemQuantity = (items, id, quantity) =>
  items.map((item) => (item.id === id ? { ...item, quantity } : item));

// Drops items whose event no longer exists. Returns the SAME array when nothing was
// dropped, so React doesn't re-render for no reason.
export function reconcileItems(items, events) {
  const known = new Set(events.map((event) => event.id));
  const kept = items.filter((item) => known.has(item.id));
  return kept.length === items.length ? items : kept;
}

// Checks ONE line: seats rule + clash rule. Returns { ok } or { ok:false, reason, suggested }.
function checkLine(event, quantity, clashes) {
  const seats = validateQuantity(event, quantity);
  if (!seats.ok) return seats;
  if (clashes.length > 0) {
    const names = clashes.map((other) => other.title).join(", ");
    return { ok: false, reason: `Time clash with ${names}. Remove one of them.`, suggested: null };
  }
  return { ok: true };
}

// Builds everything the plan page shows, from scratch, on every render (derived value).
export function buildPlan(items, events, today) {
  const byId = new Map(events.map((event) => [event.id, event]));
  const planned = items.filter((item) => byId.has(item.id));
  const clashes = clashMap(planned.map((item) => byId.get(item.id)));

  const lines = planned.map((item) => {
    const event = byId.get(item.id);
    return {
      id: item.id,
      event,
      quantity: item.quantity,
      check: checkLine(event, item.quantity, clashes[item.id]),
      unit: unitPrice(event, today),
      total: lineTotal(event, item.quantity, today),
      saving: lineSaving(event, item.quantity, today),
      earlyBird: isEarlyBird(event, today),
    };
  });

  const total = lines.reduce((sum, line) => sum + line.total, 0);
  const savings = lines.reduce((sum, line) => sum + line.saving, 0);
  return {
    lines,
    total,
    savings,
    fullPrice: total + savings,
    people: lines.reduce((sum, line) => sum + line.quantity, 0),
    hasProblem: lines.some((line) => !line.check.ok),
  };
}
