import { useState } from "react";
import { FAIL_FLAG_KEY } from "../api/loadSessions.js";

// Clearly labelled demo control required by Task 6.1.
// A controlled checkbox whose initial value is read from localStorage.
export default function DemoControls() {
  const [failNext, setFailNext] = useState(() => {
    try {
      return localStorage.getItem(FAIL_FLAG_KEY) === "true";
    } catch {
      return false;
    }
  });

  function handleChange(event) {
    const checked = event.target.checked;
    setFailNext(checked);
    try {
      localStorage.setItem(FAIL_FLAG_KEY, String(checked));
    } catch {
      // Storage unavailable: the checkbox still updates, the flag just won't persist.
    }
  }

  return (
    <fieldset className="demo-controls">
      <legend>Demo controls (for marking)</legend>
      <label>
        <input type="checkbox" checked={failNext} onChange={handleChange} />
        Make the next data load fail
      </label>
    </fieldset>
  );
}
