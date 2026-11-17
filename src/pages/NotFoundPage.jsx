import { Link } from "react-router-dom";

// Catch-all route: any URL that matches nothing else lands here.
export default function NotFoundPage() {
  return (
    <section className="notice">
      <h1>Lost on the way to Olympus</h1>
      <p>That page doesn&rsquo;t exist.</p>
      <Link to="/" className="btn btn-primary">
        Back to the home page
      </Link>
    </section>
  );
}
