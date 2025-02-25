import React, { useState } from "react";
import {
  Award,
  Users,
  Loader,
  Medal,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Youtube,
  MessageSquare,
} from "lucide-react";

const AcademyCard = ({ academy, onClick }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Extract specialization as tags
  const tags = academy?.Specialization
    ? academy.Specialization.split(",").map((tag) => tag.trim())
    : [];

  // Create a rating display
  const renderRating = () => {
    const rating = academy?.Rating || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="star star-filled">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="star star-filled">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star star-empty">
            ☆
          </span>
        );
      }
    }

    return (
      <div className="academy-rating-stars">
        {stars}
        <span className="academy-rating-value">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const DefaultImage = () => (
    <div className="default-image">
      <Medal size={48} strokeWidth={1.5} />
    </div>
  );

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // If no academy data is provided, return null
  if (!academy) return null;

  return (
    <div className="card" onClick={onClick}>
      <div className="card-image-container">
        {imageLoading && (
          <div className="image-loading">
            <Loader className="animate-spin" size={24} />
          </div>
        )}
        {imageError || !academy.Image_url ? (
          <DefaultImage />
        ) : (
          <img
            src={academy.Image_url}
            alt={`${academy.Name || "Academy"}`}
            className={`card-img ${imageLoading ? "hidden" : ""}`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />
        )}

        <div className="card-badges">
          <span
            className={`status-badge ${
              academy.Has_vacancy ? "open" : "closed"
            }`}
          >
            {academy.Has_vacancy ? "VACANCIES OPEN" : "NO VACANCIES"}
          </span>
          {academy.Rating && (
            <span className="prize-badge">
              <Award size={16} />
              {academy.Rating.toFixed(1)} Rating
            </span>
          )}
        </div>
      </div>

      <span className="tag-tournament">
        {tags.length > 0 ? tags[0] : "Sports Academy"}
      </span>

      <div className="tags">
        <span className="tag teams-tag">
          <Users size={16} />
          {academy.Students_count
            ? `${academy.Students_count} Students`
            : "Join Now"}
        </span>
        <span className="date">{academy.Established || "Est. NA"}</span>
      </div>

      <div className="content">
        <h2>{truncateText(academy.Name || "Academy Name", 50)}</h2>
        <p>
          {truncateText(
            academy.Description ||
              "Join this renowned sports academy and enhance your skills!",
            150
          )}
        </p>
      </div>

      <div className="details-grid">
        {academy.Contact_phone && (
          <div className="detail-item">
            <Phone size={16} />
            <span>Contact: {academy.Contact_phone}</span>
          </div>
        )}
        {academy.Location && (
          <div className="detail-item">
            <MapPin size={16} />
            <span>Location: {truncateText(academy.Location, 30)}</span>
          </div>
        )}
      </div>

      <div className="footer">
        <div className="academy-rating-container">{renderRating()}</div>
        <button
          className={`apply-btn ${!academy.Has_vacancy ? "disabled" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            if (academy.Has_vacancy) {
              window.location.href = `/academy/${academy.Academy_id}`;
            }
          }}
          disabled={!academy.Has_vacancy}
        >
          {academy.Has_vacancy ? "Join Now" : "No Vacancies"}
        </button>
      </div>

      {/* Social Icons - Fixed in single line */}
      {(academy.Whatsapp ||
        academy.Linkedin ||
        academy.Youtube ||
        academy.Twitter) && (
        <div className="social-icons">
          {academy.Whatsapp && (
            <a
              href={`https://wa.me/${academy.Whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              title="WhatsApp"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="social-icon-container whatsapp">
                <MessageSquare size={18} />
                <span className="sr-only">WhatsApp</span>
              </div>
            </a>
          )}
          {academy.Linkedin && (
            <a
              href={academy.Linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              title="LinkedIn"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="social-icon-container linkedin">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </div>
            </a>
          )}
          {academy.Youtube && (
            <a
              href={academy.Youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              title="YouTube"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="social-icon-container youtube">
                <Youtube size={18} />
                <span className="sr-only">YouTube</span>
              </div>
            </a>
          )}
          {academy.Twitter && (
            <a
              href={academy.Twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              title="Twitter"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="social-icon-container twitter">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </div>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default AcademyCard;
