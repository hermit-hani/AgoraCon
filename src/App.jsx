import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import EventDetailsPage from "./pages/EventDetailsPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import PlanPage from "./pages/PlanPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";

// Route table. Layout is the parent route; its children render in <Outlet />.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:id" element={<EventDetailsPage />} />
        <Route path="plan" element={<PlanPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
