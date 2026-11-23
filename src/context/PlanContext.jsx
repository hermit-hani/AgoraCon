import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useEvents } from "./EventsContext.jsx";
import { addToItems, removeFromItems, setItemQuantity, reconcileItems } from "../rules/plan.js";

// The plan = the list of events the visitor has picked.
// Each item is ONLY { id, quantity }. Titles, prices and seats are looked up from
// the events data when needed, so a saved plan can never show out-of-date details.
// quantity = seats for an individual event, or team size for a team event.
const PlanContext = createContext(null);
const STORAGE_KEY = "agoracon:plan";

// Reads the saved plan. localStorage can be blocked or hold garbage, so everything
// is inside try/catch and the result is checked before it is trusted.
function readSavedPlan() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && typeof item.id === "string" && Number.isInteger(item.quantity));
  } catch {
    return [];
  }
}

export function PlanProvider({ children }) {
  const { events } = useEvents();
  // Lazy initial state: the function runs only once, on the first render.
  const [items, setItems] = useState(readSavedPlan);

  // Save after every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full or blocked: the plan still works for this visit.
    }
  }, [items]);

  // When event data arrives (or reloads), drop saved items whose event no longer
  // exists. We skip this while events is empty (still loading, or the load failed),
  // otherwise a failed load would wipe the visitor's plan.
  useEffect(() => {
    if (events.length > 0) setItems((current) => reconcileItems(current, events));
  }, [events]);

  // Each function builds a NEW array (immutable update) using the helpers in rules/plan.js.
  const addItem = useCallback((id, quantity = 1) => setItems((cur) => addToItems(cur, id, quantity)), []);
  const removeItem = useCallback((id) => setItems((cur) => removeFromItems(cur, id)), []);
  const setQuantity = useCallback((id, quantity) => setItems((cur) => setItemQuantity(cur, id, quantity)), []);
  const clear = useCallback(() => setItems([]), []);

  // useMemo: keep the same object between renders unless items changed.
  const value = useMemo(
    () => ({ items, addItem, removeItem, setQuantity, clear }),
    [items, addItem, removeItem, setQuantity, clear],
  );
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (ctx === null) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}
