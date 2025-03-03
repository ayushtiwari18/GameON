// src/routes/PlayerRoutes.jsx
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import PlayerLayout from "../components/Player/PlayerLayout";
import PlayerHome from "../components/Player/Home/Home";
import Tournaments from "../components/Player/Tournaments/Tournaments";
import TournamentDetail from "../components/Player/Tournaments/TournamentDetail/TournamentDetail";
import FindVacancy from "../components/Player/Tournaments/Vacancies/FindVacancy";
import FindAcademy from "../components/Player/FindAcademies/FindAcademies";
import PlayerProfile from "../components/Player/Profile/PlayerProfile";

const PlayerRoutes = () => {
  return (
    <Routes>
      {/* Public player page */}
      <Route
        path="/"
        element={
          <PlayerLayout>
            <PlayerHome />
          </PlayerLayout>
        }
      />

      {/* Protected player routes */}
      <Route
        path="/tournaments"
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
        path="/tournaments/:id"
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
        path="/tournaments/:id/find-vacancy"
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
        path="/academies"
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
        path="/profile/:id"
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
    </Routes>
  );
};

export default PlayerRoutes;
