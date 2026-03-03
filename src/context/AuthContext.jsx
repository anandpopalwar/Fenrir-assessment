import { createContext, useContext, useMemo, useState } from "react";
import {
  AUTH_STORAGE_KEY,
  AUTH_USER_STORAGE_KEY,
  readStoredAuth,
  readStoredUser,
} from "../data/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(readStoredAuth());
  const [user, setUser] = useState(readStoredUser());
  const [isScanRunning, setIsScanRunning] = useState(false);

  const login = (userData = {}) => {
    const sanitizedUser = {
      firstName: userData.firstName ?? "",
      lastName: userData.lastName ?? "",
      email: userData.email ?? "",
      role: userData.role ?? "Security Analyst",
      avatarUrl: userData.avatarUrl ?? "",
    };
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(sanitizedUser));
    setIsLoggedIn(true);
    setUser(sanitizedUser);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_USER_STORAGE_KEY);
    setIsLoggedIn(false);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
      isScanRunning,
      setIsScanRunning,
      toggleScanRunning: () => setIsScanRunning((value) => !value),
      login,
      logout,
    }),
    [isLoggedIn, user, isScanRunning],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
