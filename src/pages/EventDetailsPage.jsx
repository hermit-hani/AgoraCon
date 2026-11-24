import { Link, useParams } from "react-router-dom";
import DataStatus from "../components/DataStatus.jsx";
import AddToPlanButton from "../components/AddToPlanButton.jsx";
import { formatWhen } from "../components/EventCard.jsx";
import { useEvents } from "../context/EventsContext.jsx";
import { isTeamEvent, rangeLabel, seatsLabel } from "../rules/seats.js";
import { formatPKR, isEarlyBird, todayISO, unitPrice } from "../rules/pricing.js";
import "../styles/details.css";

// "2026-11-27" -> "27 Nov 2026". We build the date from its parts so the day can't
// shift with the visitor's time zone (new Date("2026-11-27") is read as UTC).
function formatDay(isoDay) {
  const [y, m, d] = isoDay.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// What "cash" in the prize list is paid to, depending on the event.
const PRIZE_PER = {
  team: "per winning team",
  player: "per winning player",
  act: "per winning act",
  entry: "per winning entry",
  troupe: "per winning troupe",
};

function Details() {
  // useParams reads the :id part of the URL (/events/:id).
  const { id } = useParams();
  const { events } = useEvents();
  const event = events.find((e) => e.id === id);

  // FR02: an invalid ID gets useful feedback and a way forward.
  if (!event) {
    return (
      <div className="notice">
        <h1>Event not found</h1>
        <p>
          We couldn&rsquo;t find an event called &ldquo;{id}&rdquo;. It may
          have been removed or the link may be wrong.
        </p>
        <Link to="/events" className="btn btn-primary">
          Back to all events
        </Link>
      </div>
    );
  }

  const today = todayISO();
  const early = isEarlyBird(event, today);
  const team = isTeamEvent(event);
  const { about, schedule, prize } = event; // schedule and prize are optional: check before using

  return (
    <article className="details-page">
      <p>
        <Link to="/events">&larr; All events</Link>
      </p>

      <header className="details-head">
        <p className="card-kicker">
          {event.type}
          {event.format && <> &middot; {event.format}</>} &middot; hosted by {event.host}
        </p>
        <h1>{event.title}</h1>
        <p className="details-summary">{event.summary}</p>
      </header>

      <div className="details-layout">
        <div className="details-main">
          {about && (
            <section aria-labelledby="happens-heading">
              <h2 id="happens-heading">What happens</h2>
              <p>{about}</p>
            </section>
          )}

          {schedule && schedule.length > 0 && (
            <section aria-labelledby="timeline-heading">
              <h2 id="timeline-heading">Timeline</h2>
              {/* An ordered list: the order of the steps IS the information. */}
              <ol className="timeline">
                {schedule.map((step) => (
                  <li key={step.time}>
                    <time>{step.time}</time>
                    <span>{step.item}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {prize && (
            <section aria-labelledby="prize-heading">
              <h2 id="prize-heading">Prizes</h2>
              <p className="details-note">Cash is {PRIZE_PER[prize.per] ?? "per winner"}.</p>
              <ol className="prizes">
                {prize.placings.map((p) => (
                  <li key={p.place}>
                    <strong>{p.place}</strong>
                    <span>{formatPKR(p.cash)}</span>
                    <span>{p.item}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <aside className="details-book" aria-labelledby="book-heading">
          <h2 id="book-heading">Book this event</h2>

          <p className="details-price">
            {early && (
              <del>
                <span className="visually-hidden">Normal price </span>
                {formatPKR(event.price)}
              </del>
            )}{" "}
            <strong>{formatPKR(unitPrice(event, today))}</strong>
            {event.price > 0 && " per person"}
          </p>
          {early && <p className="details-note">Early-bird price until {formatDay(event.earlyBirdUntil)}.</p>}

          <dl className="details-facts">
            <div>
              <dt>When</dt>
              <dd>{formatWhen(event.start, event.end)}</dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>{event.zone}</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>
                {seatsLabel(event)} (capacity {event.capacity})
              </dd>
            </div>
            <div>
              <dt>Age</dt>
              <dd>{event.minAge > 0 ? `${event.minAge}+` : "Everyone"}</dd>
            </div>
            <div>
              <dt>{team ? "Team size" : "Booking"}</dt>
              <dd>{team ? (event.minTeam === event.maxTeam ? `${event.minTeam} people` : `${event.minTeam} to ${event.maxTeam} people`) : rangeLabel(event)}</dd>
            </div>
          </dl>

          <AddToPlanButton event={event} />
          <p className="details-note">
            Added events appear in <Link to="/plan">My plan</Link>, where you can check the total and any clashes.
          </p>
        </aside>
      </div>
    </article>
  );
}

export default function EventDetailsPage() {
  return (
    <DataStatus>
      <Details />
    </DataStatus>
  );
}
