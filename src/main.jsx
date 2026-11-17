import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { SessionsProvider } from "./context/SessionsContext.jsx";
import "./styles/global.css";

// Provider order: Router -> data provider -> App.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SessionsProvider>
        <App />
      </SessionsProvider>
    </BrowserRouter>
  </StrictMode>,
);
