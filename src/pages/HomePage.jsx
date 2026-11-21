import { Link } from "react-router-dom";
import heroBg from "../assets/mainbg.png";

// Pillar icon reused inside the buttons.
function ButtonIcon() {
  return (
    <svg className="button-icon" viewBox="0 0 24 30" aria-hidden="true">
      <path d="M3 5h18M5 2h14M5 5l1 3h12l1-3M7 8v17m10-17v17M12 8v17M4 25h16M2 28h20" />
    </svg>
  );
}

export default function HomePage() {
  return (
    // The imported image path is handed to CSS through a custom property,
    // so Vite can rewrite it correctly for the production build.
    <section className="hero" style={{ "--hero-bg": `url(${heroBg})` }}>
      {/* purely decorative atmosphere */}
      <div className="atmosphere atmosphere-one" aria-hidden="true" />
      <div className="atmosphere atmosphere-two" aria-hidden="true" />
      <div className="glow glow-one" aria-hidden="true" />
      <div className="glow glow-two" aria-hidden="true" />

      <div className="hero-content">
        <p className="eyebrow">An Invitation from Mount Olympus</p>
        <h1>AGORACON</h1>
        <div className="hero-copy">
          <p className="tagline">
            Three days. Twelve Olympians. Countless legends.
          </p>
          <p className="invitation">
            By order of Zeus, attendance is strongly encouraged.
          </p>
        </div>
        <span className="panel-ornament" aria-hidden="true">
          ✧
        </span>
      </div>

      <div className="hero-actions">
        <Link to="/sessions" className="action-button action-button-filled">
          <ButtonIcon />
          <span>Browse Sessions</span>
        </Link>
      </div>
    </section>
  );
}
