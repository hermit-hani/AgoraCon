import { createContext, useContext, useEffect, useState } from "react";
import { loadSessions } from "../api/loadSessions.js";

// ONE source of truth for session data (FR08). Any page can read it with
// useSessions() instead of each page loading its own copy.
const SessionsContext = createContext(null);

export function SessionsProvider({ children }) {
  const [sessions, setSessions] = useState([]);
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
        const data = await loadSessions();
        if (cancelled) return;
        setSessions(data);
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

  const value = { sessions, status, errorMessage, retry };
  return (
    <SessionsContext.Provider value={value}>{children}</SessionsContext.Provider>
  );
}

export function useSessions() {
  const ctx = useContext(SessionsContext);
  if (ctx === null) {
    throw new Error("useSessions must be used inside <SessionsProvider>");
  }
  return ctx;
}
