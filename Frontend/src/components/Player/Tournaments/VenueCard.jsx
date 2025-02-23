import { Star } from "lucide-react";
import "./VenueCard.css";

function VenueCard() {
  return (
    <div class="card">
      <img
        src="/assets/Basketball-Match.jpg"
        alt="Event Image"
        class="card-img"
      />

      <span class="tag-tournament">Basketball Tournament</span>
      <div class="tags">
        <span class="tag">Open trails</span>
        <span class="date">20 Dec 2024</span>
      </div>

      <div class="content tag">
        <h2>Get ready for the ultimate showdown!</h2>
        <p>
          The GameOn Championship brings together the most talented teams and
          rising stars for an electrifying tournament filled with skill, speed,
          and passion.
        </p>
      </div>

      <div class="footer">
        <span class="date">Jablpur</span>
        <button class="apply-btn">Apply Now</button>
      </div>
    </div>
  );
}

export default VenueCard;
