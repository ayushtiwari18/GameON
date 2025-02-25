import { Routes, Route } from "react-router-dom";
// ✅ No BrowserRouter here
import { BrowserRouter as Router } from "react-router-dom";
//landing imports
import LandingLayout from "./components/landing page/LandingLayout";
import Home from "./components/landing page/home/Home";
import PlayerSignup from "./components/landing page/Signup/PlayerSignup";
import PlayerLogin from "./components/landing page/login/PlayerLogin.jsx";
//player imports
import PlayerLayout from "./components/Player/PlayerLayout";
import PlayerHome from "./components/Player/Home/Home";
import Tournaments from "./components/Player/Tournaments/Tournaments";
import TournamentDetail from "./components/Player/Tournaments/TournamentDetail/TournamentDetail";
import FindVacancy from "./components/Player/Tournaments/Vacancies/FindVacancy";
import FindAcademy from "./components/Player/FindAcademies/FindAcademies.jsx";
import PlayerProfile from "./components/Player/Profile/PlayerProfile.jsx";

function App() {
  return (
    <>
      <Routes>
        {/*Sign up login routes*/}
        <Route path="/player/signup" element={<PlayerSignup />} />
        <Route path="/player/login" element={<PlayerLogin />} />
        {/* Landing Page Routes */}
        <Route
          path="/"
          element={
            <LandingLayout>
              <Home />
            </LandingLayout>
          }
        />

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
        <Route
          path="/player/profile/:id"
          element={
            <PlayerLayout>
              <PlayerProfile />
            </PlayerLayout>
          }
        />
        <Route path="/signin" />
      </Routes>
    </>
  );
}

export default App;
