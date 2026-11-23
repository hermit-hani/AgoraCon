`import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { EventsProvider } from "./context/EventsContext.jsx";
import "./styles/global.css";
import "./styles/landing.css"; // after global.css so its overrides win
import "./styles/events.css";

// Provider order: Router -> data provider -> App.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <EventsProvider>
        <App />
      </EventsProvider>
    </BrowserRouter>
  </StrictMode>,
);