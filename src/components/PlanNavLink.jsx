import { NavLink } from "react-router-dom";
import { usePlan } from "../context/PlanContext.jsx";

// Nav link that shows how many events are in the plan: "My plan (2)".
export default function PlanNavLink() {
  const { items } = usePlan();
  return <NavLink to="/plan">My plan ({items.length})</NavLink>;
}
