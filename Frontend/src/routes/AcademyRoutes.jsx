// src/routes/AcademyRoutes.jsx
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AcademyLayout from "../components/Academy/AcademyLayout";
import AcademyHome from "../components/Academy/Home/AcademyHome";
import AcademyTournament from "../components/Academy/AcademyTournaments/AcademyTournaments";
import AcademyTournamentDetail from "../components/Academy/AcademyTournaments/AcademyTournamentDetails/AcademyTournamentDetail";
import AcademyProfile from "../components/Academy/AcademyProfile/AcademyProfile";
import MyTournament from "../components/Academy/MyTournaments/MyTournaments";
import TournamentCreationForm from "../components/Academy/MyTournaments/TournamentCreationForm";

const AcademyRoutes = () => {
  return (
    <Routes>
      {/* Public academy page */}
      <Route
        path="/"
        element={
          <AcademyLayout>
            <AcademyHome />
          </AcademyLayout>
        }
      />

      {/* Protected academy routes */}
      <Route
        path="/:academyId/home"
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
        path="/tournament"
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
        path="/tournament/:id"
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
        path="/:academyId/tournament"
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
        path="/:academyId/tournament/create-tournament"
        element={
          <ProtectedRoute
            allowedRoles={["academy"]}
            redirectPath="/academy/login"
          >
            <AcademyLayout>
              <TournamentCreationForm />
            </AcademyLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/:id"
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

export default AcademyRoutes;
