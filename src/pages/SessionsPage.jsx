import DataStatus from "../components/DataStatus.jsx";
import SessionCard from "../components/SessionCard.jsx";
import { useSessions } from "../context/SessionsContext.jsx";

function SessionList() {
  const { sessions } = useSessions();

  // FR15 (part 1): an EMPTY DATASET is different from "no search matches".
  // Search/filter comes in a later stage; this covers the empty dataset.
  if (sessions.length === 0) {
    return (
      <p className="notice">
        No sessions have been announced yet. Check back soon.
      </p>
    );
  }

  return (
    <ul className="card-grid">
      {sessions.map((session) => (
        // key = stable id (never the array index)
        <li key={session.id}>
          <SessionCard session={session} />
        </li>
      ))}
    </ul>
  );
}

export default function SessionsPage() {
  return (
    <section>
      <h1>Sessions</h1>
      <DataStatus>
        <SessionList />
      </DataStatus>
    </section>
  );
}
