import Pillar from "./Pillar.jsx";

// Big pillar on the left; the page title and intro line sit to its right.
export default function PageHeading({ title, intro }) {
  return (
    <div className="page-heading">
      <Pillar className="title-pillar" />
      <div>
        <h1>{title}</h1>
        {intro && <p className="page-intro">{intro}</p>}
      </div>
    </div>
  );
}
