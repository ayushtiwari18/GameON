import { Routes, Route } from "react-router-dom";
// ✅ No BrowserRouter here
import { BrowserRouter as Router } from "react-router-dom";

import LandingLayout from "./components/landing page/LandingLayout";
import Home from "./components/landing page/home/Home";
import PlayerLayout from "./components/Player/PlayerLayout";
import PlayerHome from "./components/Player/Home/Home";
import PlayerSignup from "./components/landing page/Signup/PlayerSignup";

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
        <Route path="/signin" />
      </Routes>
    </>
  );
}

export default App;
