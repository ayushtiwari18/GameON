// src/routes/index.jsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

// Layouts
import LandingLayout from "../components/landingPage/LandingLayout";
import PlayerLayout from "../components/Player/PlayerLayout";
import AcademyLayout from "../components/Academy/AcademyLayout";

// LandingPage components
import Home from "../components/landingPage/home/Home";
import About from "../components/landingPage/aboutUs/about";

// Auth components
import PlayerSignup from "../components/landingPage/Signup/PlayerSignup";
import PlayerLogin from "../components/landingPage/login/PlayerLogin";
import AcademySignup from "../components/landingPage/Signup/AcademySignup";
import AcademyLogin from "../components/landingPage/login/AcademyLogin";

// Player components
import PlayerHome from "../components/Player/Home/Home";
import Tournaments from "../components/Player/Tournaments/Tournaments";
import TournamentDetail from "../components/Player/Tournaments/TournamentDetail/TournamentDetail";
import FindVacancy from "../components/Player/Tournaments/Vacancies/FindVacancy";
import FindAcademy from "../components/Player/FindAcademies/FindAcademies";
import PlayerProfile from "../components/Player/Profile/PlayerProfile";
import AcademyDetail from "../components/Player/FindAcademies/AcademyDetail/AcademyDetail";

// Academy components
import AcademyHome from "../components/Academy/Home/AcademyHome";
import AcademyTournament from "../components/Academy/AcademyTournaments/AcademyTournaments";
import AcademyTournamentDetail from "../components/Academy/AcademyTournaments/AcademyTournamentDetails/AcademyTournamentDetail";
import AcademyProfile from "../components/Academy/AcademyProfile/AcademyProfile";
import MyTournament from "../components/Academy/MyTournaments/MyTournaments";
import TournamentCreationForm from "../components/Academy/MyTournaments/TournamentCreationForm";
import TournamentEditForm from "../components/Academy/MyTournaments/EditTournament";
import CreateVacancy from "../components/Academy/AcademyTournaments/CreateVacancy/CreateVacancy";
import MyVacancies from "../components/Academy/MyVacancies/MyVacancies";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Routes */}
      <Route
        path="/"
        element={
          <LandingLayout>
            <Home />
          </LandingLayout>
        }
      />
      <Route
        path="/about"
        element={
          <LandingLayout>
            <About />
          </LandingLayout>
        }
      />

      {/* Auth Routes */}
      <Route path="/player/signup" element={<PlayerSignup />} />
      <Route path="/player/login" element={<PlayerLogin />} />
      <Route path="/academy/signup" element={<AcademySignup />} />
      <Route path="/academy/login" element={<AcademyLogin />} />

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
          <ProtectedRoute
            allowedRoles={["player"]}
            redirectPath="/player/login"
          >
            <PlayerLayout>
              <Tournaments />
            </PlayerLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/player/tournaments/:id"
        element={
          <ProtectedRoute
            allowedRoles={["player"]}
            redirectPath="/player/login"
          >
            <PlayerLayout>
              <TournamentDetail />
            </PlayerLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/player/tournaments/:id/find-vacancy"
        element={
          <ProtectedRoute
            allowedRoles={["player"]}
            redirectPath="/player/login"
          >
            <PlayerLayout>
              <FindVacancy />
            </PlayerLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/player/academies"
        element={
          <ProtectedRoute
            allowedRoles={["player"]}
            redirectPath="/player/login"
          >
            <PlayerLayout>
              <FindAcademy />
            </PlayerLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/player/academies/:id"
        element={
          <ProtectedRoute
            allowedRoles={["player"]}
            redirectPath="/player/login"
          >
            <PlayerLayout>
              <AcademyDetail />
            </PlayerLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/player/profile/:id"
        element={
          <ProtectedRoute
            allowedRoles={["player"]}
            redirectPath="/player/login"
          >
            <PlayerLayout>
              <PlayerProfile />
            </PlayerLayout>
          </ProtectedRoute>
        }
      />

      {/* Academy Routes */}
      <Route
        path="/academy"
        element={
          <AcademyLayout>
            <AcademyHome />
          </AcademyLayout>
        }
      />

      <Route
        path="/academy/:academyId/home"
        element={
          <ProtectedRoute
            allowedRoles={["academy"]}
            redirectPath="/academy/login"
          >
            <AcademyLayout>
              <AcademyHome />
            </AcademyLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/academy/tournament"
        element={
          <ProtectedRoute
            allowedRoles={["academy"]}
            redirectPath="/academy/login"
          >
            <AcademyLayout>
              <AcademyTournament />
            </AcademyLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/academy/tournament/:id"
        element={
          <ProtectedRoute
            allowedRoles={["academy"]}
            redirectPath="/academy/login"
          >
            <AcademyLayout>
              <AcademyTournamentDetail />
            </AcademyLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/academy/tournament/:id/create-vacancy"
        element={
          <ProtectedRoute
            allowedRoles={["academy"]}
            redirectPath="/academy/login"
          >
            <AcademyLayout>
              <AcademyTournamentDetail />
              <CreateVacancy />
            </AcademyLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/academy/:academyId/tournament"
        element={
          <ProtectedRoute
            allowedRoles={["academy"]}
            redirectPath="/academy/login"
          >
            <AcademyLayout>
              <MyTournament />
            </AcademyLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/academy/:academyId/tournament/create-tournament"
        element={
          <ProtectedRoute
            allowedRoles={["academy"]}
            redirectPath="/academy/login"
          >
            <AcademyLayout>
              <MyTournament />
              <TournamentCreationForm />
            </AcademyLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/academy/tournament/:id/edit-tournament"
        element={
          <ProtectedRoute
            allowedRoles={["academy"]}
            redirectPath="/academy/login"
          >
            <AcademyLayout>
              <AcademyTournamentDetail />
              <TournamentEditForm />
            </AcademyLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/academy/:academyId/my-vacancy"
        element={
          <ProtectedRoute
            allowedRoles={["academy"]}
            redirectPath="/academy/login"
          >
            <AcademyLayout>
              <MyVacancies />
            </AcademyLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/academy/profile/:id"
        element={
          <ProtectedRoute
            allowedRoles={["academy"]}
            redirectPath="/academy/login"
          >
            <AcademyLayout>
              <AcademyProfile />
            </AcademyLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
