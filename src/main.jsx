import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { EventsProvider } from "./context/EventsContext.jsx";
import { PlanProvider } from "./context/PlanContext.jsx";
import "./styles/global.css";
import "./styles/landing.css"; // after global.css so its overrides win
import "./styles/events.css";
import "./styles/plan.css";

// Provider order: Router -> events data -> plan -> App.
// PlanProvider sits INSIDE EventsProvider because it reads the events to check the plan.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <EventsProvider>
        <PlanProvider>
          <App />
        </PlanProvider>
      </EventsProvider>
    </BrowserRouter>
  </StrictMode>,
);
