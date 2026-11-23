import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext.jsx";
import { usePlan } from "../context/PlanContext.jsx";
import { buildPlan } from "../rules/plan.js";
import { isTeamEvent, rangeLabel, seatsLabel } from "../rules/seats.js";
import { formatPKR, todayISO } from "../rules/pricing.js";
import "../styles/plan.css";

// /plan: the visitor's chosen events, with a live total.
// Nothing about prices or problems is stored. buildPlan() works it all out from the
// saved items + the current events on EVERY render (a "derived value"), so if the
// events data changes, the page changes with it.
export default function PlanPage() {
  const { events, errorMessage, retry } = useEvents();
  const { items, removeItem, setQuantity } = usePlan();

  // Conditional rendering: pick what to show.
  if (items.length === 0) {
    return (
      <section className="plan-page">
        <h1>My plan</h1>
        <p>Your plan is empty. Pick events and they appear here with a running total.</p>
        <Link className="btn btn-primary" to="/events">Browse events</Link>
      </section>
    );
  }
  if (events.length === 0) {
    return (
      <section className="plan-page">
        <h1>My plan</h1>
        {errorMessage ? (
          <div className="plan-problem" role="alert">
            <p><strong>Problem:</strong> {errorMessage}</p>
            <button type="button" className="btn" onClick={retry}>Retry</button>
          </div>
        ) : (
          <p>Loading your events…</p>
        )}
      </section>
    );
  }

  const plan = buildPlan(items, events, todayISO());

  return (
    <section className="plan-page">
      <h1>My plan</h1>
      <div className="plan-layout">
        <ul className="plan-lines">
          {plan.lines.map((line) => {
            const { event, check } = line;
            const team = isTeamEvent(event);
            const qtyId = `qty-${event.id}`;
            return (
              <li key={line.id} className={`plan-line${check.ok ? "" : " plan-line-bad"}`}>
                <h2><Link to={`/events/${event.id}`}>{event.title}</Link></h2>
                <p className="plan-meta">{event.host} &middot; {event.zone} &middot; {seatsLabel(event)}</p>

                <div className="plan-qty">
                  <label htmlFor={qtyId}>{team ? "Team size" : "Seats"}</label>
                  <input
                    id={qtyId}
                    type="number"
                    inputMode="numeric"
                    step="1"
                    value={line.quantity}
                    onChange={(e) => setQuantity(event.id, Number(e.target.value))}
                    aria-describedby={`${qtyId}-hint`}
                  />
                  <span id={`${qtyId}-hint`} className="plan-hint">{rangeLabel(event)}</span>
                </div>

                <p className="plan-price">
                  {formatPKR(line.unit)}{team ? " per person" : " per seat"} &times; {line.quantity} ={" "}
                  <strong>{formatPKR(line.total)}</strong>
                  {line.earlyBird && <span className="plan-tag"> Early bird: saves {formatPKR(line.saving)} (until {event.earlyBirdUntil})</span>}
                </p>

                {!check.ok && (
                  <div className="plan-problem" role="alert">
                    <p><strong>Problem:</strong> {check.reason}</p>
                    {check.suggested !== null && check.suggested !== line.quantity && (
                      <button type="button" className="btn" onClick={() => setQuantity(event.id, check.suggested)}>
                        Set to {check.suggested}
                      </button>
                    )}
                  </div>
                )}
                <button type="button" className="btn" onClick={() => removeItem(event.id)}>
                  Remove<span className="visually-hidden"> {event.title}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <aside className="plan-summary" aria-live="polite">
          <h2>Summary</h2>
          <dl>
            <div><dt>Events</dt><dd>{plan.lines.length}</dd></div>
            <div><dt>People / seats</dt><dd>{plan.people}</dd></div>
            <div><dt>Full price</dt><dd>{formatPKR(plan.fullPrice)}</dd></div>
            <div><dt>Early-bird saving</dt><dd>{plan.savings > 0 ? `- ${formatPKR(plan.savings)}` : "None"}</dd></div>
            <div className="plan-total"><dt>Total</dt><dd>{formatPKR(plan.total)}</dd></div>
          </dl>
          {plan.hasProblem ? (
            <>
              <button type="button" className="btn btn-primary" disabled>Continue</button>
              <p className="plan-hint">Fix or remove the lines marked "Problem" to continue.</p>
            </>
          ) : (
            <Link className="btn btn-primary" to="/register">Continue</Link>
          )}
        </aside>
      </div>
    </section>
  );
}
