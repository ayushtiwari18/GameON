import React, { useState } from "react";
import { Award, Users, Loader, Trophy, IndianRupee } from "lucide-react";
import { useEffect } from "react";
import { format } from "date-fns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./VenueCard.css";

function VenueCard({ venue, onClick, isLoading }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Add this useEffect to handle cases where the image URL is empty or null
  useEffect(() => {
    if (!venue.image_url) {
      setImageLoading(false);
      setImageError(true);
    }
  }, [venue.image_url]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "dd MMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRegistrationStatus = () => {
    if (!venue.registration_deadline) return "OPEN";
    const deadline = new Date(venue.registration_deadline);
    const now = new Date();
    return deadline > now ? "OPEN" : "CLOSED";
  };

  const DefaultImage = () => (
    <div className="default-image">
      <Trophy size={48} strokeWidth={1.5} color="#ffffff" />
    </div>
  );

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const registrationStatus = getRegistrationStatus();

  if (isLoading) {
    return (
      <div className="card skeleton-card">
        <div className="card-image-container">
          <Skeleton height="100%" />
        </div>
        <div style={{ marginTop: "15px" }}>
          <Skeleton width={100} height={32} />
        </div>
        <div className="tags" style={{ marginTop: "15px" }}>
          <Skeleton width={100} height={32} />
          <Skeleton width={80} height={32} />
        </div>
        <div className="content">
          <Skeleton height={28} width="80%" style={{ marginBottom: "10px" }} />
          <Skeleton count={3} style={{ marginBottom: "5px" }} />
        </div>
        <div className="details-grid">
          <Skeleton width={150} height={24} />
        </div>
        <div
          className="footer"
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Skeleton width={120} height={24} />
          <Skeleton width={100} height={36} borderRadius="30px" />
        </div>
      </div>
    );
  }

  return (
    <div className="card" onClick={onClick}>
      <div className="card-image-container">
        {imageLoading && (
          <div className="image-loading">
            <Loader className="animate-spin" size={24} />
          </div>
        )}
        {imageError || !venue.image_url ? (
          <DefaultImage />
        ) : (
          <img
            src={venue.image_url}
            alt={`${venue.Name || "Tournament"}`}
            className={`card-img ${imageLoading ? "hidden" : ""}`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />
        )}

        <div className="card-badges">
          <span className={`status-badge ${registrationStatus.toLowerCase()}`}>
            {registrationStatus}
          </span>
          {venue.Prize_pool && (
            <span className="prize-badge">
              <Award size={16} />
              {formatCurrency(venue.Prize_pool)}
            </span>
          )}
        </div>
      </div>

      <span className="tag-tournament">{venue.Category || "Tournament"}</span>

      <div className="tags">
        <span className="tag teams-tag">
          <Users size={16} />
          {venue.Max_Teams
            ? `${venue.Max_Teams} Teams Max`
            : "Open Registration"}
        </span>
        <span className="date">{formatDate(venue.Start_Date)}</span>
      </div>

      <div className="content">
        <h2>{truncateText(venue.Name || "Tournament Name", 50)}</h2>
        <p>
          {truncateText(
            venue.description ||
              "Join this exciting tournament and showcase your skills!",
            150
          )}
        </p>
      </div>

      <div className="details-grid">
        {venue.Registration_fee && (
          <div className="detail-item">
            <IndianRupee size={16} />
            <span>Entry Fee: {formatCurrency(venue.Registration_fee)}</span>
          </div>
        )}
      </div>

      <div className="footer">
        <span className="location">
          {venue.City || venue.Location || "Location TBA"}
        </span>
        <button
          className={`apply-btn ${
            registrationStatus === "CLOSED" ? "disabled" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (registrationStatus !== "CLOSED") {
              // Add registration logic here
            }
          }}
          disabled={registrationStatus === "CLOSED"}
        >
          {registrationStatus === "CLOSED"
            ? "Registration Closed"
            : "Apply Now"}
        </button>
      </div>
    </div>
  );
}

export default VenueCard;
