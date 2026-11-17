import { useSessions } from "../context/SessionsContext.jsx";

// Wrapper that handles the loading / error states once (FR14), so pages only
// render their real content when data is ready.
//   <DataStatus>...page content...</DataStatus>
export default function DataStatus({ children }) {
  const { status, errorMessage, retry } = useSessions();

  if (status === "loading") {
    return (
      <p role="status" className="notice">
        Consulting the Oracle&hellip; loading sessions.
      </p>
    );
  }

  if (status === "error") {
    return (
      <div role="alert" className="notice notice-error">
        <p>
          <strong>Error:</strong> {errorMessage}
        </p>
        <button type="button" className="btn btn-primary" onClick={retry}>
          Retry
        </button>
      </div>
    );
  }

  return children;
}
