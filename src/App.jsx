import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Index from "./pages/Index.jsx";
import Events from "./pages/Events.jsx";
import EventDetails from "./pages/EventDetails.jsx"; // Import the new EventDetails page
import { SupabaseProvider } from "./integrations/supabase/index.js";

function App() {
  return (
    <SupabaseProvider>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventDetails />} /> {/* Add the new route */}
          </Routes>
        </>
      </Router>
    </SupabaseProvider>
  );
}

export default App;
