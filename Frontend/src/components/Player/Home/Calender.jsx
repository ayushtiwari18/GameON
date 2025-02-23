import React from "react";
import "./Calender.css"; // Import the CSS file

const CalendarWidget = () => {
  return (
    <div className="widget">
      <h3>Important Dates</h3>
      <div className="calendar">
        <div className="header">
          <button>{"<"}</button>
          <span>Month year</span>
          <button>{">"}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>DAY</th>
              <th>DAY</th>
              <th>DAY</th>
              <th>DAY</th>
              <th>DAY</th>
              <th>DAY</th>
              <th>DAY</th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <tr key={i}>
                  {Array(7)
                    .fill(1)
                    .map((day, j) => (
                      <td key={j}>{day}</td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="footer">
        <span>Reminder</span>
        <span>Updates</span>
        <span>Events</span>
      </div>
    </div>
  );
};

export default CalendarWidget;
