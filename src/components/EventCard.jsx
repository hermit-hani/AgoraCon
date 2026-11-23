import { Link } from "react-router-dom";
import { dayOf, seatsLeft } from "../rules/filtering.js";

// One emoji per host god, shown before the event title.
const GOD_EMOJI = {
  Zeus: "⚡",
  Poseidon: "🔱",
  Hera: "👑",
  Demeter: "🌾",
  Athena: "🦉",
  Hermes: "🪽",
  Apollo: "🎶",
  Artemis: "🏹",
  Aphrodite: "💘",
  Hephaestus: "🔨",
  Ares: "⚔️",
  Dionysus: "🍇",
};

// Formats ISO strings like "2026-12-05T18:00" for display: "Sat 5 Dec, 18:00-20:00".
// Exported because the details page uses it too.
function formatWhen(startIso, endIso) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const day = start.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  const time = (d) => d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return `${day}, ${time(start)}-${time(end)}`;
}

// Availability is always shown as TEXT (never colour alone).
function seatStatus(event) {
  const left = seatsLeft(event);
  // Team events are sold per team (one registration = one team), so count teams.
  const noun = event.maxTeam > 1 && event.minTeam === event.maxTeam ? (left === 1 ? "team" : "teams") : left === 1 ? "seat" : "seats";
  if (left === 0) return { text: `Sold out: no ${noun === "team" || noun === "teams" ? "teams" : "seats"} left`, tone: "out" };
  if (left <= Math.max(5, Math.round(event.capacity * 0.1)))
    return { text: `Almost full: only ${left} ${noun} left`, tone: "low" };
  return { text: `${left} ${noun} left`, tone: "ok" };
}

// Props in: one event. No state here: it only displays data.
// (The "Add to plan" button does nothing yet; plan logic comes in the next stage.)
export default function EventCard({ event }) {
  const { id, title, host, type, zone, start, end, price, summary, minAge, minTeam, maxTeam } = event;
  const status = seatStatus(event);
  const soldOut = seatsLeft(event) === 0;
  const team = maxTeam === 1 ? "Individual" : minTeam === maxTeam ? `Teams of ${minTeam}` : `Teams of ${minTeam}-${maxTeam}`;

  return (
    <article className="event-card">
      <p className="event-kicker">
        {type} &middot; {host}
      </p>
      <h2 className="event-title">
        <span className="event-emoji" aria-hidden="true">
          {GOD_EMOJI[host] ?? "🏛️"}
        </span>
        <Link to={`/events/${id}`}>{title}</Link>
      </h2>
      <p className="event-summary">{summary}</p>
      <dl className="event-facts">
        <div>
          <dt>When</dt>
          <dd>
            Day {dayOf(event)} &middot; {formatWhen(start, end)}
          </dd>
        </div>
        <div>
          <dt>Where</dt>
          <dd>{zone}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>
            {price === 0 ? "Free" : `PKR ${price.toLocaleString("en-US")}`}
            {maxTeam > 1 && price > 0 ? " per person" : ""}
          </dd>
        </div>
      </dl>
      <ul className="chips" aria-label="Event conditions">
        <li>{minAge > 0 ? `Age ${minAge}+` : "Everyone"}</li>
        <li>{team}</li>
      </ul>
      <p className={`seat-status seat-${status.tone}`}>{status.text}</p>
      <button type="button" className="btn btn-primary" disabled={soldOut}>
        {soldOut ? "Sold out" : "Add to plan"}
      </button>
    </article>
  );
}

export { formatWhen };