// TournamentSkeleton.jsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function TournamentCardSkeleton() {
  return (
    <div className="card-academy">
      <div className="card-image-container-academy">
        <Skeleton height={200} borderRadius={12} />
      </div>

      <Skeleton
        width={120}
        height={35}
        borderRadius={10}
        style={{ margin: "15px 0" }}
      />

      <div className="tags-academy">
        <Skeleton width={100} height={32} borderRadius={8} />
        <Skeleton width={85} height={32} borderRadius={8} />
      </div>

      <div className="content-academy">
        <Skeleton height={26} width="90%" style={{ marginBottom: "8px" }} />
        <Skeleton count={3} style={{ marginBottom: "12px" }} />
      </div>

      <div className="details-grid">
        <Skeleton width={150} height={24} />
      </div>

      <div
        className="footer"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Skeleton width={120} height={20} />
        <Skeleton width={130} height={40} borderRadius={30} />
      </div>
    </div>
  );
}

export function TournamentSkeletonGrid({ count = 6 }) {
  return (
    <div className="venues-grid-academy">
      {Array(count)
        .fill()
        .map((_, index) => (
          <TournamentCardSkeleton key={index} />
        ))}
    </div>
  );
}
