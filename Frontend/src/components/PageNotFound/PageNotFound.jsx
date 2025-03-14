import React from "react";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-content">
          <div className="error-text">
            <h1>Uh, ohh!</h1>
            <h2>We Sincerely Apologize</h2>
            <p>We can't find the page that you are looking for!</p>

            <button className="home-button">Go Home</button>
          </div>

          <div className="error-illustration">
            <div className="error-code">
              <img src="/assets/pageNotFound.png" className="error-code" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
