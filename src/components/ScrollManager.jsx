import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Controls the scroll position when you move between pages.
//
// The problem: in a React app, changing route does NOT reset the scroll position, so a page
// you open from the middle of a long list starts scrolled down. And on Back the browser can't
// restore your place, because the list is rebuilt after it has already tried.
//
// The rules this component applies:
//   - Opening a different page (link click)  -> start at the top.
//   - Back / Forward (the browser's buttons) -> return to where you were on that page.
//   - Only the query string changed (typing in search, picking a filter) -> don't move.
//
// It renders nothing. Put it once inside the router (App.jsx does).

const STORAGE_KEY = "agoracon:scroll";

// Positions are kept per history entry (location.key) in sessionStorage, so they also
// survive a page refresh. Both functions are in try/catch because storage can be blocked.
function readPositions() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}
function writePositions(positions) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch {
    // ignore: scroll restoring is a nicety, not a requirement
  }
}

// Scrolls to y. If the page is not tall enough yet (after a refresh the event list takes a moment
// to appear), keep trying for up to about 3 seconds. If the visitor starts scrolling themselves,
// stop at once so we never fight them.
function scrollToWhenReady(y) {
  let tries = 0;
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchmove", cancel);
    window.removeEventListener("keydown", cancel);
  };
  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchmove", cancel, { passive: true });
  window.addEventListener("keydown", cancel);

  function attempt() {
    if (cancelled) return;
    window.scrollTo(0, y);
    const reached = Math.abs(window.scrollY - y) < 2;
    if (reached || tries++ >= 180) cancel();
    else requestAnimationFrame(attempt);
  }
  attempt();
}

export default function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType(); // "PUSH" (link), "REPLACE", or "POP" (back / forward)

  // What we know about the page we are on right now: its history key, path, and last scroll.
  const current = useRef({ key: null, pathname: null, y: 0 });

  // We take over from the browser's own (unreliable) restoring.
  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  // Remember how far the visitor has scrolled on the current page.
  useEffect(() => {
    const onScroll = () => {
      current.current.y = window.scrollY;
    };
    // Saving normally happens when we leave a page (below). A refresh or closing the tab leaves
    // without a route change, so save then too. "pagehide" fires in both cases.
    const onLeave = () => {
      const { key, y } = current.current;
      if (key === null) return;
      writePositions({ ...readPositions(), [key]: y });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", onLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onLeave);
    };
  }, []);

  // Runs when the location changes. useLayoutEffect runs BEFORE the browser paints and before
  // it adjusts the scroll for the new (shorter or taller) page, so current.y is still the
  // position we left.
  useLayoutEffect(() => {
    const previous = current.current;

    // 1. Save where we were on the page we are leaving.
    if (previous.key !== null) {
      const positions = readPositions();
      positions[previous.key] = previous.y;
      writePositions(positions);
    }

    // 2. Decide where to scroll on the new page.
    const samePage = previous.pathname === location.pathname;
    if (navigationType === "POP") {
      const saved = readPositions()[location.key];
      scrollToWhenReady(typeof saved === "number" ? saved : 0);
    } else if (!samePage) {
      window.scrollTo(0, 0);
    } // same page, query string only: leave the scroll alone

    // 3. Now this is the current page.
    current.current = { key: location.key, pathname: location.pathname, y: window.scrollY };
  }, [location.key, location.pathname, navigationType]);

  return null;
}
