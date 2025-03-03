// src/routes/AuthRoutes.jsx
import { Route, Routes } from "react-router-dom";
import PlayerSignup from "../components/landing page/Signup/PlayerSignup";
import PlayerLogin from "../components/landing page/login/PlayerLogin";
import AcademySignup from "../components/landing page/Signup/AcademySignup";
import AcademyLogin from "../components/landing page/login/AcademyLogin";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/player/signup" element={<PlayerSignup />} />
      <Route path="/player/login" element={<PlayerLogin />} />
      <Route path="/academy/signup" element={<AcademySignup />} />
      <Route path="/academy/login" element={<AcademyLogin />} />
    </Routes>
  );
};

export default AuthRoutes;
