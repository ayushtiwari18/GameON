function AcademyCard({ academy }) {
  return (
    <div className="academy-card">
      <div className="academy-info">
        <div className="academy-avatar"></div>
        <div className="academy-details">
          <h4>{academy.name}</h4>
          <p>{academy.category}</p>
          <p>{academy.ageRange}</p>
        </div>
      </div>
      <div className="action-buttons">
        {academy.canApply && <button className="apply-btn">Apply</button>}
        <button className={`follow-btn ${!academy.canApply ? "only" : ""}`}>
          Follow
        </button>
      </div>
    </div>
  );
}

export default AcademyCard;
