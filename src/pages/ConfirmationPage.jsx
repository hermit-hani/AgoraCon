import { Link, useLocation } from "react-router-dom";
import { formatPKR } from "../rules/pricing.js";
import "../styles/plan.css";

// /confirmation: the receipt, passed here by RegisterPage through the router's `state`.
// If someone opens this URL directly there is no state, so we explain instead of crashing.
export default function ConfirmationPage() {
  const receipt = useLocation().state?.receipt;

  if (!receipt) {
    return (
      <section className="confirmation-page">
        <h1>Confirmation</h1>
        <p>There is no registration to show. Pick some events and register first.</p>
        <Link className="btn btn-primary" to="/events">Browse events</Link>
      </section>
    );
  }

  return (
    <section className="confirmation-page">
      <h1>You're registered, {receipt.nickname}</h1>
      <p>Reference number: <strong className="reference">{receipt.reference}</strong></p>
      <table>
        <caption>Your events</caption>
        <thead>
          <tr><th scope="col">Event</th><th scope="col">People</th><th scope="col">Price each</th><th scope="col">Line total</th></tr>
        </thead>
        <tbody>
          {receipt.lines.map((line) => (
            <tr key={line.id}>
              <th scope="row">
                {line.title}
                {line.team && <span className="plan-hint"> Team: {line.team}</span>}
              </th>
              <td>{line.quantity}</td>
              <td>{formatPKR(line.unit)}</td>
              <td>{formatPKR(line.total)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr><th scope="row" colSpan={3}>Full price</th><td>{formatPKR(receipt.fullPrice)}</td></tr>
          <tr><th scope="row" colSpan={3}>Early-bird discount</th><td>{receipt.savings > 0 ? `- ${formatPKR(receipt.savings)}` : "None"}</td></tr>
          <tr><th scope="row" colSpan={3}>Total</th><td><strong>{formatPKR(receipt.total)}</strong></td></tr>
        </tfoot>
      </table>
      <p className="plan-hint">This booking is simulated. No payment was taken.</p>
      <Link className="btn btn-primary" to="/events">Back to events</Link>
    </section>
  );
}
