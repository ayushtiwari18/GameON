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
import FindVacancy from "./components/Player/Tournaments/Vacancies/FindVacancy";
import FindAcademy from "./components/Player/FindAcademies/FindAcademies.jsx";

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
        <Route
          path="/player/tournaments/:id/find-vacancy"
          element={
            <PlayerLayout>
              <FindVacancy />
            </PlayerLayout>
          }
        />
        <Route
          path="/player/academies"
          element={
            <PlayerLayout>
              <FindAcademy />
            </PlayerLayout>
          }
        />
        <Route path="/signin" />
      </Routes>
    </>
  );
}

export default App;
