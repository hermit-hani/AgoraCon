import { NavLink, Outlet } from "react-router-dom";
import DemoControls from "./DemoControls.jsx";

// Shared page frame. <Outlet /> is where the matched child route renders.
export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className="site-header">
        <NavLink to="/" className="brand" end>
          AgoraCon
        </NavLink>
        <nav aria-label="Main">
          <ul className="nav-list">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/sessions">Sessions</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>
          AgoraCon is a fictional festival. All sessions, bookings and payments
          are simulated.
        </p>
        <DemoControls />
      </footer>
    </>
  );
}
