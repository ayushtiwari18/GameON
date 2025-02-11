import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PlayerRegistration from "./pages/PlayerRegistration";
import AcademyRegistration from "./pages/AcademyRegistration";
import PlayerLogin from "./pages/PlayerLogin";
import AcademyLogin from "./pages/AcademyLogin";
import PlayerDashboard from "./pages/PlayerDashboard";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/dashboard" element={<PlayerDashboard />} />
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/player-registration"
                    element={<PlayerRegistration />}
                  />
                  <Route
                    path="/academy-registration"
                    element={<AcademyRegistration />}
                  />
                  <Route path="/player-login" element={<PlayerLogin />} />
                  <Route path="/academy-login" element={<AcademyLogin />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
