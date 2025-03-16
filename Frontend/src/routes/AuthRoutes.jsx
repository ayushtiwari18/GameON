// src/routes/AuthRoutes.jsx
import { Route, Routes } from "react-router-dom";
import PlayerSignup from "../components/landingPage/Signup/PlayerSignup";
import PlayerLogin from "../components/landingPage/login/PlayerLogin";
import AcademySignup from "../components/landingPage/Signup/AcademySignup";
import AcademyLogin from "../components/landingPage/login/AcademyLogin";

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
