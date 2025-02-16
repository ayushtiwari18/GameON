import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Hero from "./hero"; // ✅ Correct
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
    // <div className="home">
    //   <section className="hero">
    //     <div className="container hero-content">
    //       <h1>GameOn: Where Every Click is a Victory!</h1>
    //       <p>
    //         Step into the ultimate gaming universe with GameOn, where passion
    //         meets competition, and every player has a chance to shine. Whether
    //         you're a casual gamer
    //       </p>
    //       <div className="hero-buttons">
    //         <Link to="/player-registration" className="hero-btn btn-primary">
    //           Join as Player
    //         </Link>
    //         <Link to="/academy-registration" className="hero-btn btn-secondary">
    //           Register Academy
    //         </Link>
    //       </div>
    //     </div>
    //   </section>

    //   <section className="features">
    //     <div className="container">
    //       <h2>Play. Train. Excel.</h2>
    //       <h3>All in One Place!</h3>
    //       <div className="feature-buttons">
    //         <button className="feature-btn">
    //           <i className="fas fa-clock"></i>
    //           Latest Update
    //         </button>
    //         <button className="feature-btn">
    //           <i className="fas fa-users"></i>
    //           Top Players
    //         </button>
    //         <button className="feature-btn">
    //           <i className="fas fa-trophy"></i>
    //           Tournaments
    //         </button>
    //         <button className="feature-btn">
    //           <i className="fas fa-graduation-cap"></i>
    //           Academy
    //         </button>
    //       </div>
    //     </div>
    //   </section>

    //   <section className="achievers">
    //     <div className="container">
    //       <h2>Top Achievers - Rising Stars of GameOn</h2>
    //       <div className="achievers-content">
    //         <div className="achiever-card">
    //           <img
    //             src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(7)-M4ujqOrS8nhNc05DFDTXn5oDuRvroa.png"
    //             alt="Players"
    //           />
    //           <div className="achiever-info">
    //             <h3>Players</h3>
    //             <p>
    //               Showcase your achievements, connect with elite academies, and
    //               get recognized for your dedication and talent!
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
  );
}

export default Home;
