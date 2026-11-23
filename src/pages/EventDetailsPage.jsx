import { Link, useParams } from "react-router-dom";
import DataStatus from "../components/DataStatus.jsx";
import { formatWhen } from "../components/EventCard.jsx";
import { useEvents } from "../context/EventsContext.jsx";

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

  const seatsLeft = event.capacity - event.registered; // derived, not stored

  return (
    <article>
      <p>
        <Link to="/events">&larr; All events</Link>
      </p>
      <p className="card-kicker">
        {event.type} &middot; hosted by {event.host}
      </p>
      <h1>{event.title}</h1>
      <p>{event.summary}</p>
      <dl className="card-facts">
        <div>
          <dt>When</dt>
          <dd>{formatWhen(event.start, event.end)}</dd>
        </div>
        <div>
          <dt>Where</dt>
          <dd>{event.zone}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>PKR {event.price.toLocaleString("en-US")}</dd>
        </div>
        <div>
          <dt>Seats left</dt>
          <dd>{seatsLeft} of {event.capacity}</dd>
        </div>
        <div>
          <dt>Age</dt>
          <dd>{event.minAge > 0 ? `${event.minAge}+` : "Everyone"}</dd>
        </div>
        <div>
          <dt>Team size</dt>
          <dd>
            {event.maxTeam === 1
              ? "Individual"
              : `${event.minTeam}-${event.maxTeam} people`}
          </dd>
        </div>
      </dl>
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