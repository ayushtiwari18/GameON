// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";
import playerService from "../services/playerService";
import academyService from "../services/academyService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // First check localStorage for role to determine which service to use
        const storedRole =
          localStorage.getItem("userRole") ||
          localStorage.getItem("playerRole");

        if (storedRole === "academy") {
          const { authenticated, academyId, academyName } =
            await academyService.auth.checkAuth();
          setIsAuthenticated(authenticated);
          if (authenticated) {
            setUserRole("academy");
            setUserId(academyId);
            setUserName(academyName);
          }
        } else if (storedRole === "player") {
          const { authenticated, playerId, playerName } =
            await playerService.auth.checkAuth();
          setIsAuthenticated(authenticated);
          if (authenticated) {
            setUserRole("player");
            setUserId(playerId);
            setUserName(playerName);
          }
        } else {
          // If no role in localStorage, check both services
          try {
            const academyCheck = await academyService.auth.checkAuth();
            if (academyCheck.authenticated) {
              setIsAuthenticated(true);
              setUserRole("academy");
              setUserId(academyCheck.academyId);
              setUserName(academyCheck.academyName);
              authenticated = true;
            }
          } catch (e) {
            // If academy check fails, try player service
            try {
              const playerCheck = await playerService.auth.checkAuth();
              if (playerCheck.authenticated) {
                setIsAuthenticated(true);
                setUserRole("player");
                setUserId(playerCheck.playerId);
                setUserName(playerCheck.playerName);
                authenticated = true;
              }
            } catch (e) {
              // Both checks failed, user is not authenticated
              authenticated = false;
            }
          }
        }

        // if (!authenticated) {
        //   // Clear any potentially stale data
        //   setIsAuthenticated(false);
        //   setUserRole(null);
        //   setUserId(null);
        //   setUserName(null);
        // }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        setUserRole(null);
        setUserId(null);
        setUserName(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password, role) => {
    try {
      if (role === "academy") {
        const response = await academyService.auth.login(email, password);
        setIsAuthenticated(true);
        setUserRole("academy");
        setUserId(response.academy.id);
        setUserName(response.academy.name);
        return response;
      } else {
        const response = await playerService.auth.login(email, password);
        setIsAuthenticated(true);
        setUserRole("player");
        setUserId(response.player.id);
        setUserName(response.player.name);
        return response;
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (userRole === "academy") {
        await academyService.auth.logout();
      } else if (userRole === "player") {
        await playerService.auth.logout();
      }

      setIsAuthenticated(false);
      setUserRole(null);
      setUserId(null);
      setUserName(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        userId,
        userName,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
