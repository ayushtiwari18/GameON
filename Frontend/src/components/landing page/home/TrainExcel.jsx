import React from "react";
import "./TrainExcel.css";
import {
  FaClock,
  FaChessKing,
  FaTrophy,
  FaGraduationCap,
} from "react-icons/fa";
import Buttoncustom from "../../../common/Buttoncustom";

const TrainExcel = () => {
  return (
    <div className="hero-section-landing">
      <div className="hero-content-landing">
        <h1>“ Play. Train. Excel. All in One Place! ”</h1>
        <p>
          Join us now to master your sport, connect with top coaches, and reach
          your goals.
        </p>
        <div className="button-group-landing">
          <Buttoncustom
            text="Latest Update"
            Icon={FaClock}
            style={{
              fontSize: "23px",
              fontFamily: "sans-serif",
              boxShadow: "8px 8px 16px rgba(58, 58, 240, 0.5) ",
            }}
          />
          <Buttoncustom
            text="Top Players"
            Icon={FaChessKing}
            style={{
              fontSize: "25px",
              fontFamily: "sans-serif",
              boxShadow: "8px 8px 16px rgba(58, 58, 240, 0.5) ",
            }}
          />
          <Buttoncustom
            text="Tournaments"
            Icon={FaTrophy}
            style={{
              fontSize: "25px",
              fontFamily: "sans-serif",
              boxShadow: "8px 8px 16px rgba(58, 58, 240, 0.5) ",
            }}
          />
          <Buttoncustom
            text="Academy"
            Icon={FaGraduationCap}
            style={{
              fontSize: "25px",
              fontFamily: "sans-serif",
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
