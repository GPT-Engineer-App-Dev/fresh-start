import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Index from "./pages/Index.jsx";
import Events from "./pages/Events.jsx"; // Import the new Events page
import { SupabaseProvider } from "./integrations/supabase/index.js";

function App() {
  return (
    <SupabaseProvider>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route path="/events" element={<Events />} /> {/* Add the new route */}
          </Routes>
        </>
      </Router>
    </SupabaseProvider>
  );
}

export default App;
