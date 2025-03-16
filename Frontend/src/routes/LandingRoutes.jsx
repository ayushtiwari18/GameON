// src/routes/LandingRoutes.jsx
import { Route, Routes } from "react-router-dom";
import LandingLayout from "../components/landingPage/LandingLayout";
import Home from "../components//home/Home";

const LandingRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingLayout>
            <Home />
          </LandingLayout>
        }
      />
    </Routes>
  );
};

export default LandingRoutes;
