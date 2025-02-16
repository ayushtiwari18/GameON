import React from "react";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

import "./TopAchievers.css";

function TopAchievers() {
  return (
    <div className="top-achievers-container">
      <h1 className="top-achievers-heading">
        Top Achievers – Rising Stars of GameOn
      </h1>
      <LeftSection
        image="/assets/landingPage1.png"
        text="Meet the exceptional players who have taken their football journey to new heights through GameOn! These talented athletes have trained with top academies, honed their skills, and made their mark on the field.

🌟 Players – Showcase your achievements, connect with elite academies, and get recognized for your dedication and talent.!"
      />

      <RightSection
        image="/assets/landingPage1.png"
        text="Meet the exceptional players who have taken their football journey to new heights through GameOn! These talented athletes have trained with top academies, honed their skills, and made their mark on the field.

🌟 Players – Showcase your achievements, connect with elite academies, and get recognized for your dedication and talent.!"
      />
      <LeftSection
        image="/assets/landingPage1.png"
        text="Meet the exceptional players who have taken their football journey to new heights through GameOn! These talented athletes have trained with top academies, honed their skills, and made their mark on the field.

🌟 Players – Showcase your achievements, connect with elite academies, and get recognized for your dedication and talent.!"
      />
      <RightSection
        image="/assets/landingPage1.png"
        text="Meet the exceptional players who have taken their football journey to new heights through GameOn! These talented athletes have trained with top academies, honed their skills, and made their mark on the field.

🌟 Players – Showcase your achievements, connect with elite academies, and get recognized for your dedication and talent.!"
      />
    </div>
  );
}

export default TopAchievers;
