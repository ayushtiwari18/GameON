import { Routes, Route } from "react-router-dom";
// ✅ No BrowserRouter here
import { BrowserRouter as Router } from "react-router-dom";
//landing imports
import LandingLayout from "./components/landing page/LandingLayout";
import Home from "./components/landing page/home/Home";
import PlayerSignup from "./components/landing page/Signup/PlayerSignup";

//player imports
import PlayerLayout from "./components/Player/PlayerLayout";
import PlayerHome from "./components/Player/Home/Home";
import Tournaments from "./components/Player/Tournaments/Tournaments";
import TournamentDetail from "./components/Player/Tournaments/TournamentDetail/TournamentDetail";

function App() {
  return (
    <>
      <Routes>
        {/* Landing Page Routes */}
        <Route
          path="/"
          element={
            <LandingLayout>
              <Home />
            </LandingLayout>
          }
        />
        <Route path="/player/signup" element={<PlayerSignup />} />
        {/* Player Routes */}
        <Route
          path="/player"
          element={
            <PlayerLayout>
              <PlayerHome />
            </PlayerLayout>
          }
        />
        <Route
          path="/player/tournaments"
          element={
            <PlayerLayout>
              <Tournaments />
            </PlayerLayout>
          }
        />
        <Route
          path="/player/tournaments/:id"
          element={
            <PlayerLayout>
              <TournamentDetail />
            </PlayerLayout>
          }
        />
        <Route path="/signin" />
      </Routes>
    </>
  );
}

export default App;
