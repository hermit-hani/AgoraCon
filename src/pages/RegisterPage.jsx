import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext.jsx";
import { usePlan } from "../context/PlanContext.jsx";
import { buildPlan } from "../rules/plan.js";
import { isTeamEvent } from "../rules/seats.js";
import { todayISO } from "../rules/pricing.js";
import { ids, validateRegistration } from "../rules/registration.js";
import "../styles/plan.css";

// One labelled input with its own error messages underneath.
// The error text starts with the word "Error:", so it is never colour alone.
function Field({ id, label, value, onChange, errors, hint, inputMode }) {
  const mine = errors.filter((e) => e.id === id);
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={mine.length > 0}
        aria-describedby={mine.length > 0 ? `${id}-error` : undefined}
      />
      {hint && <span className="plan-hint">{hint}</span>}
      {mine.length > 0 && (
        <div id={`${id}-error`} className="field-error">
          {mine.map((e, i) => (
            <p key={i}><strong>Error:</strong> {e.message}</p>
          ))}
        </div>
      )}
    </div>
  );
}

// /register: a controlled form (React state holds every value, inputs just show it).
// Only a nickname and ages are collected. No real personal or payment details.
export default function RegisterPage() {
  const { events, errorMessage, retry } = useEvents();
  const { items, clear } = usePlan();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  // teams = { [eventId]: { teamName, members: [{ name, age }] } }
  const [teams, setTeams] = useState({});
  const [errors, setErrors] = useState([]);
  const summaryRef = useRef(null);

  // After a failed submit, move focus to the error summary so keyboard and screen
  // reader users land on it.
  useEffect(() => {
    if (errors.length > 0) summaryRef.current?.focus();
  }, [errors]);

  if (items.length === 0) {
    return (
      <section className="register-page">
        <h1>Register</h1>
        <p>There is nothing to register for yet: your plan is empty.</p>
        <Link className="btn btn-primary" to="/events">Browse events</Link>
      </section>
    );
  }
  if (events.length === 0) {
    return (
      <section className="register-page">
        <h1>Register</h1>
        {errorMessage ? (
          <div className="plan-problem" role="alert">
            <p><strong>Problem:</strong> {errorMessage}</p>
            <button type="button" className="btn" onClick={retry}>Retry</button>
          </div>
        ) : (
          <p>Loading…</p>
        )}
      </section>
    );
  }

  const today = todayISO();
  const plan = buildPlan(items, events, today);

  // The plan is re-checked on every render. If it became invalid, registering is blocked.
  if (plan.hasProblem) {
    return (
      <section className="register-page">
        <h1>Register</h1>
        <div className="plan-problem" role="alert">
          <p><strong>Problem:</strong> Something in your plan changed and needs fixing before you can register.</p>
        </div>
        <Link className="btn btn-primary" to="/plan">Back to my plan</Link>
      </section>
    );
  }

  // Immutable updates: each helper builds a new object instead of editing the old one.
  function setTeamField(eventId, field, value) {
    setTeams((prev) => ({ ...prev, [eventId]: { teamName: "", members: [], ...prev[eventId], [field]: value } }));
  }
  function setMemberField(eventId, index, field, value) {
    setTeams((prev) => {
      const team = { teamName: "", members: [], ...prev[eventId] };
      const members = [...team.members];
      members[index] = { name: "", age: "", ...members[index], [field]: value };
      return { ...prev, [eventId]: { ...team, members } };
    });
  }

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser reloading the page
    const found = validateRegistration({ nickname, age, teams }, plan.lines);
    setErrors(found); // on failure every field keeps its value: the state is untouched
    if (found.length > 0) return;

    // Success: build a receipt, empty the plan, and go to the confirmation page.
    // The simulated reference number is random: no real booking exists.
    const receipt = {
      reference: `AGC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      nickname: nickname.trim(),
      date: today,
      total: plan.total,
      savings: plan.savings,
      fullPrice: plan.fullPrice,
      lines: plan.lines.map((l) => ({
        id: l.id,
        title: l.event.title,
        team: isTeamEvent(l.event) ? teams[l.id]?.teamName.trim() : null,
        quantity: l.quantity,
        unit: l.unit,
        total: l.total,
        saving: l.saving,
      })),
    };
    clear();
    navigate("/confirmation", { state: { receipt } });
  }

  const hasIndividual = plan.lines.some((l) => !isTeamEvent(l.event));
  const maxMinAge = Math.max(...plan.lines.map((l) => l.event.minAge));

  return (
    <section className="register-page">
      <h1>Register</h1>
      {errors.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="error-summary">
          <h2>{errors.length} {errors.length === 1 ? "problem needs" : "problems need"} fixing</h2>
          <ul>
            {errors.map((e, i) => (
              <li key={i}>
                {/* The link moves focus to the field. (A plain #hash link would also work, but this is explicit.) */}
                <a
                  href={`#${e.id}`}
                  onClick={(ev) => {
                    ev.preventDefault();
                    document.getElementById(e.id)?.focus();
                  }}
                >
                  {e.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend>About you</legend>
          <Field id={ids.nickname} label="Nickname" value={nickname} onChange={setNickname} errors={errors} />
          <Field
            id={ids.age}
            label="Your age"
            value={age}
            onChange={setAge}
            errors={errors}
            inputMode="numeric"
            hint={hasIndividual && maxMinAge > 0 ? "Some events in your plan have an age limit." : undefined}
          />
        </fieldset>

        {plan.lines.filter((l) => isTeamEvent(l.event)).map((l) => (
          <fieldset key={l.id}>
            <legend>Team for {l.event.title}</legend>
            <Field
              id={ids.teamName(l.id)}
              label="Team name"
              value={teams[l.id]?.teamName ?? ""}
              onChange={(v) => setTeamField(l.id, "teamName", v)}
              errors={errors}
            />
            {/* One row per member: Array.from builds a list of l.quantity empty slots to map over. */}
            {Array.from({ length: l.quantity }, (_, i) => (
              <div className="member-row" key={i}>
                <Field
                  id={ids.memberName(l.id, i)}
                  label={`Member ${i + 1} name`}
                  value={teams[l.id]?.members[i]?.name ?? ""}
                  onChange={(v) => setMemberField(l.id, i, "name", v)}
                  errors={errors}
                />
                <Field
                  id={ids.memberAge(l.id, i)}
                  label={`Member ${i + 1} age`}
                  value={teams[l.id]?.members[i]?.age ?? ""}
                  onChange={(v) => setMemberField(l.id, i, "age", v)}
                  errors={errors}
                  inputMode="numeric"
                  hint={l.event.minAge > 0 ? `${l.event.minAge}+ only` : undefined}
                />
              </div>
            ))}
          </fieldset>
        ))}

        <p className="plan-hint">Bookings are simulated. Do not enter real personal or payment details.</p>
        <div className="register-actions">
          <button type="submit" className="btn btn-primary">Register</button>
          <Link className="btn" to="/plan">Back to my plan</Link>
        </div>
      </form>
    </section>
  );
}
