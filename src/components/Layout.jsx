import { NavLink, Outlet, useLocation } from "react-router-dom";
import DemoControls from "./DemoControls.jsx";

// Small decorative pillar shown next to the brand on the home page only.
function PillarIcon() {
  return (
    <svg className="brand-pillar" viewBox="0 0 48 58" aria-hidden="true">
      <path d="M5 12h38M8 8h32M11 4h26M8 13l3 4h26l3-4M12 17v3m24-3v3M14 20h20M14 20v27m20-27v27M19 21v25m10-25v25M11 47h26M8 51h32M5 55h38" />
      <path d="M11 47l-3 4m29-4 3 4M14 20l-2 3m24-3 2 3" />
    </svg>
  );
}

// Shared page frame. <Outlet /> is where the matched child route renders.
// On the home page the frame gets "frame--home", which lets the header float
// over the full-screen hero image (see landing.css).
export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className={isHome ? "frame frame--home" : "frame"}>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className="site-header">
        <NavLink to="/" className="brand" end>
          {isHome && <PillarIcon />}
          <span>{isHome ? "AGORACON" : "AgoraCon"}</span>
        </NavLink>
        <nav aria-label="Main">
          <ul className="nav-list">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>
          AgoraCon is a fictional festival. All events, bookings and payments
          are simulated.
        </p>
        <DemoControls />
      </footer>
    </div>
  );
}
