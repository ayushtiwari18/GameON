import React from "react";
import "./TrainExcel.css";
import {
  FaClock,
  FaChessKing,
  FaTrophy,
  FaGraduationCap,
} from "react-icons/fa";
import Buttoncustom from "../../../common/buttoncustom";

const TrainExcel = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>“ Play. Train. Excel. All in One Place! ”</h1>
        <p>
          Join us now to master your sport, connect with top coaches, and reach
          your goals.
        </p>
        <div className="button-group">
          <Buttoncustom
            text="Latest Update"
            Icon={FaClock}
            className="playpage-btn"
            style={{
              fontSize: "25px",
              fontFamily: "Poppins",
              boxShadow: "8px 8px 16px rgba(58, 58, 240, 0.5) ",
            }}
          />
          <Buttoncustom
            text="Top Players"
            Icon={FaChessKing}
            className="playpage-btn"
            style={{
              fontSize: "25px",
              fontFamily: "Poppins",
              boxShadow: "8px 8px 16px rgba(58, 58, 240, 0.5) ",
            }}
          />
          <Buttoncustom
            text="Tournaments"
            Icon={FaTrophy}
            className="playpage-btn"
            style={{
              fontSize: "25px",
              fontFamily: "Poppins",
              boxShadow: "8px 8px 16px rgba(58, 58, 240, 0.5) ",
            }}
          />
          <Buttoncustom
            text="Academy"
            Icon={FaGraduationCap}
            className="playpage-btn"
            style={{
              fontSize: "25px",
              fontFamily: "Poppins",
              boxShadow: "8px 8px 16px rgba(58, 58, 240, 0.5)  ",
            }}
          />
        </div>
      </div>
      <div className="hero-image">
        <img src="/assets/heroIllustration.svg" alt="Hero Illustration" />
      </div>
    </div>
  );
};

export default TrainExcel;
