// src/components/ProtectedRoute.jsx

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({
  children,
  allowedRoles = [], // Array of allowed roles, empty means any authenticated user
  redirectPath = "/signin",
}) => {
  const { isAuthenticated, userRole, loading } = useAuth();
  const location = useLocation();

  // Show loading state if still checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If we need to check roles and user doesn't have required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to different pages based on role
    if (userRole === "academy") {
      return <Navigate to="/academy" replace />;
    } else {
      return <Navigate to="/player" replace />;
    }
  }

  // If all checks pass, render the protected component
  return children;
};

export default ProtectedRoute;
