import { useSearchParams } from "react-router-dom";
import eventsBg from "../assets/eventsbg.png";
import DataStatus from "../components/DataStatus.jsx";
import EventCard from "../components/EventCard.jsx";
import PageHeading from "../components/PageHeading.jsx";
import { useEvents } from "../context/EventsContext.jsx";
import { DAY_LABELS, SORT_OPTIONS, filterEvents, sortEvents } from "../rules/filtering.js";

function EventBrowser() {
  const { events } = useEvents();
  // Filters live in the URL (?q=&day=&god=&type=&sort=) so the Back button,
  // refresh and shared links all keep them.
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const day = params.get("day") ?? "all";
  const god = params.get("god") ?? "all";
  const type = params.get("type") ?? "all";
  const sort = params.get("sort") ?? "soonest";

  function update(key, value) {
    const next = new URLSearchParams(params); // copy, never mutate the original
    const isDefault = value === "" || value === "all" || (key === "sort" && value === "soonest");
    if (isDefault) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  const gods = [...new Set(events.map((e) => e.host))].sort();
  const types = [...new Set(events.map((e) => e.type))].sort();

  // Derived value: recomputed from data + URL on every render, never stored.
  const visible = sortEvents(filterEvents(events, { query, day, god, type }), sort);

  const active = [];
  if (query.trim() !== "") active.push(`“${query.trim()}”`);
  if (day !== "all") active.push(DAY_LABELS[day] ?? `Day ${day}`);
  if (god !== "all") active.push(god);
  if (type !== "all") active.push(type);

  return (
    <>
      <form className="filters" role="search" aria-label="Search and filter events" onSubmit={(e) => e.preventDefault()}>
        <div className="field field-search">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="search"
            value={query}
            placeholder="Consult the Oracle: title, god, place"
            autoComplete="off"
            onChange={(e) => update("q", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="day">Day</label>
          <select id="day" value={day} onChange={(e) => update("day", e.target.value)}>
            <option value="all">All days</option>
            {Object.entries(DAY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="god">Host god</label>
          <select id="god" value={god} onChange={(e) => update("god", e.target.value)}>
            <option value="all">All gods</option>
            {gods.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="type">Type</label>
          <select id="type" value={type} onChange={(e) => update("type", e.target.value)}>
            <option value="all">All types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="sort">Sort by</label>
          <select id="sort" value={sort} onChange={(e) => update("sort", e.target.value)}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="results-bar">
        <p role="status">
          Showing <strong>{visible.length}</strong> of <strong>{events.length}</strong> events
        </p>
        {active.length > 0 && (
          <button type="button" className="link-button" onClick={() => setParams({}, { replace: true })}>
            Clear filters
          </button>
        )}
      </div>

      {/* FR15: an EMPTY DATASET and "no matches" are different situations. */}
      {events.length === 0 ? (
        <p className="notice">No events have been announced yet. Check back soon.</p>
      ) : visible.length === 0 ? (
        <div className="notice">
          <h2>The Oracle finds no matching events</h2>
          <p>Nothing matches {active.join(" + ")}. Try removing a filter, or start again.</p>
          <button type="button" className="btn btn-primary" onClick={() => setParams({}, { replace: true })}>
            Clear all filters
          </button>
        </div>
      ) : (
        <ul className="event-grid">
          {visible.map((event) => (
            // key = stable id (never the array index)
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function EventsPage() {
  return (
    <section className="events-page">
      {/* Photo layer: the image path goes to CSS through a custom property (same trick as the home page). */}
      <div className="events-bg" style={{ "--events-bg": `url(${eventsBg})` }} aria-hidden="true" />
      <PageHeading
        title="Events"
        intro="Three days, twelve Olympians. Search and filter to find your events, then add them to your plan."
      />
      <DataStatus>
        <EventBrowser />
      </DataStatus>
    </section>
  );
}
