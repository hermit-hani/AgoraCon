import { Link, useParams } from "react-router-dom";
import DataStatus from "../components/DataStatus.jsx";
import { formatWhen } from "../components/SessionCard.jsx";
import { useSessions } from "../context/SessionsContext.jsx";

function Details() {
  // useParams reads the :id part of the URL (/sessions/:id).
  const { id } = useParams();
  const { sessions } = useSessions();
  const session = sessions.find((s) => s.id === id);

  // FR02: an invalid ID gets useful feedback and a way forward.
  if (!session) {
    return (
      <div className="notice">
        <h1>Session not found</h1>
        <p>
          We couldn&rsquo;t find a session called &ldquo;{id}&rdquo;. It may
          have been removed or the link may be wrong.
        </p>
        <Link to="/sessions" className="btn btn-primary">
          Back to all sessions
        </Link>
      </div>
    );
  }

  const seatsLeft = session.capacity - session.registered; // derived, not stored

  return (
    <article>
      <p>
        <Link to="/sessions">&larr; All sessions</Link>
      </p>
      <p className="card-kicker">
        {session.type} &middot; hosted by {session.host}
      </p>
      <h1>{session.title}</h1>
      <p>{session.summary}</p>
      <dl className="card-facts">
        <div>
          <dt>When</dt>
          <dd>{formatWhen(session.start, session.end)}</dd>
        </div>
        <div>
          <dt>Where</dt>
          <dd>{session.zone}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>PKR {session.price.toLocaleString("en-US")}</dd>
        </div>
        <div>
          <dt>Seats left</dt>
          <dd>{seatsLeft} of {session.capacity}</dd>
        </div>
        <div>
          <dt>Age</dt>
          <dd>{session.minAge > 0 ? `${session.minAge}+` : "Everyone"}</dd>
        </div>
        <div>
          <dt>Team size</dt>
          <dd>
            {session.maxTeam === 1
              ? "Individual"
              : `${session.minTeam}-${session.maxTeam} people`}
          </dd>
        </div>
      </dl>
    </article>
  );
}

export default function SessionDetailsPage() {
  return (
    <DataStatus>
      <Details />
    </DataStatus>
  );
}
