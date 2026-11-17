import { Link } from "react-router-dom";

// Formats an ISO string like "2026-12-05T18:00" for display.
// Kept tiny and local for now; it can move to a utils file later.
function formatWhen(startIso, endIso) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const day = start.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const time = (d) =>
    d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return `${day}, ${time(start)}-${time(end)}`;
}

// Props in: one session object. No state here: it only displays data.
export default function SessionCard({ session }) {
  const { id, title, host, type, zone, start, end, price, summary } = session;
  return (
    <article className="card">
      <p className="card-kicker">
        {type} &middot; hosted by {host}
      </p>
      <h3 className="card-title">
        <Link to={`/sessions/${id}`}>{title}</Link>
      </h3>
      <p className="card-summary">{summary}</p>
      <dl className="card-facts">
        <div>
          <dt>When</dt>
          <dd>{formatWhen(start, end)}</dd>
        </div>
        <div>
          <dt>Where</dt>
          <dd>{zone}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>PKR {price.toLocaleString("en-US")}</dd>
        </div>
      </dl>
    </article>
  );
}

export { formatWhen };
