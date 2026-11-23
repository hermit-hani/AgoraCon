import { usePlan } from "../context/PlanContext.jsx";
import { isSoldOut, isTeamEvent } from "../rules/seats.js";
import "../styles/plan.css";

// The button on every event card. It has three looks, chosen from the data:
//   in the plan  -> "In your plan: remove"
//   sold out     -> disabled "Sold out"
//   otherwise    -> "Add to plan"
export default function AddToPlanButton({ event }) {
  const { items, addItem, removeItem } = usePlan();
  const inPlan = items.some((item) => item.id === event.id);

  if (inPlan) {
    return (
      <button type="button" className="btn" onClick={() => removeItem(event.id)}>
        In your plan: remove
        <span className="visually-hidden"> {event.title}</span>
      </button>
    );
  }

  const soldOut = isSoldOut(event);
  // A team starts at its minimum size; an individual starts at 1 seat.
  const startQuantity = isTeamEvent(event) ? event.minTeam : 1;
  return (
    <button
      type="button"
      className="btn btn-primary"
      disabled={soldOut}
      onClick={() => addItem(event.id, startQuantity)}
    >
      {soldOut ? "Sold out" : "Add to plan"}
      <span className="visually-hidden"> {event.title}</span>
    </button>
  );
}
