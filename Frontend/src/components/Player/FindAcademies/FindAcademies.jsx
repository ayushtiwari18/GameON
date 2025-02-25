import React from "react";
import "./FindAcademy.css";
import AcademyCard from "./AcademyCard";
function FindAcademy() {
  return (
    <div className="academy-list">
      <div className="academy-list-header">
        <p className="academy-list-header-paragraph">
          Battle Arena <br /> Where Legends meet!
        </p>
      </div>
      <div className="academy-box-outer">
        <div className="filters">
          <input
            type="text"
            name="city"
            placeholder="City"
            className="filter-input"
          />
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="filter-input"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="filter-input"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            className="filter-input"
          />
        </div>
        <div className="academy-grid">
          <AcademyCard />
          <AcademyCard />
          <AcademyCard />
          <AcademyCard />
          <AcademyCard />
          <AcademyCard />
          <AcademyCard />
          <AcademyCard />
          <AcademyCard />
        </div>
      </div>
    </div>
  );
}

export default FindAcademy;
