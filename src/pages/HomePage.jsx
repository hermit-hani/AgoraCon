import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="hero">
      <h1>AgoraCon</h1>
      <p className="hero-lead">
        Three days. Nine Olympians. One campus. Browse the gods&rsquo; sessions,
        build your own schedule and claim your seat.
      </p>
      <p>Friday 4 &ndash; Sunday 6 December 2026</p>
      <Link to="/sessions" className="btn btn-primary">
        Browse sessions
      </Link>
    </section>
  );
}
