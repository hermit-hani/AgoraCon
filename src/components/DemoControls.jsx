import { useState } from "react";
import { useEvents } from "../context/EventsContext.jsx";
import { FAIL_FLAG_KEY, SELL_OUT_FLAG_KEY, readFlag } from "../api/loadEvents.js";
import "../styles/plan.css";

// Footer panel so a marker (or you in the viva) can reproduce two situations on purpose.
// The checkboxes only store a flag; the flag is read by loadEvents() the NEXT time
// data loads, which is why the "Reload event data" button exists.
function useStoredFlag(key) {
  const [on, setOn] = useState(() => readFlag(key));
  const change = (checked) => {
    setOn(checked);
    try {
      localStorage.setItem(key, String(checked));
    } catch {
      // blocked storage: the checkbox still toggles but has no effect
    }
  };
  return [on, change];
}

export default function DemoControls() {
  const { retry } = useEvents();
  const [fail, setFail] = useStoredFlag(FAIL_FLAG_KEY);
  const [sellOut, setSellOut] = useStoredFlag(SELL_OUT_FLAG_KEY);

  return (
    <fieldset className="demo-controls">
      <legend>Demo controls</legend>
      <label className="demo-check">
        <input type="checkbox" checked={fail} onChange={(e) => setFail(e.target.checked)} />
        Make the next data load fail
      </label>
      <label className="demo-check">
        <input type="checkbox" checked={sellOut} onChange={(e) => setSellOut(e.target.checked)} />
        Sell out Wild Discoveries (applied on the next reload)
      </label>
      <button type="button" className="btn" onClick={retry}>
        Reload event data
      </button>
    </fieldset>
  );
}
