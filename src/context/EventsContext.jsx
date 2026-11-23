import { createContext, useContext, useEffect, useState } from "react";
import { loadEvents } from "../api/loadEvents.js";

// ONE source of truth for event data (FR08). Any page can read it with
// useEvents() instead of each page loading its own copy.
const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  // status is one of: "loading" | "error" | "success"
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  // Bumping this number re-runs the effect below -> that is how "Retry" works.
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // Cleanup flag: if the component unmounts (or retry starts) before the
    // promise resolves, we ignore the stale result instead of setting state.
    let cancelled = false;

    async function run() {
      setStatus("loading");
      try {
        const data = await loadEvents();
        if (cancelled) return;
        setEvents(data);
        setStatus("success");
      } catch (err) {
        if (cancelled) return;
        setErrorMessage(err.message);
        setStatus("error");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  // Functional update: the next value depends on the previous one.
  const retry = () => setAttempt((n) => n + 1);

  const value = { events, status, errorMessage, retry };
  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
}

export function useEvents() {
  const ctx = useContext(EventsContext);
  if (ctx === null) {
    throw new Error("useEvents must be used inside <EventsProvider>");
  }
  return ctx;
}
