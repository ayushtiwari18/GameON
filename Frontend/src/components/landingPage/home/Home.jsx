import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Hero from "./Hero.jsx"; // ✅ Correct
import { Train } from "lucide-react";
import TrainExcel from "./TrainExcel";
import TopAchievers from "./TopAchievers/TopAchievers";
import FAQSection from "./FAQ/FAQSection";

function Home() {
  return (
    <>
      <Hero />
      <TrainExcel />
      <TopAchievers />
      <FAQSection />
    </>
  );
}

export default Home;
