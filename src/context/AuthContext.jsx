import { createContext, useContext, useMemo, useState } from "react";
import {
  VITE_AUTH_STORAGE_KEY,
  VITE_AUTH_USER_STORAGE_KEY,
  readStoredAuth,
  readStoredUser,
} from "../data/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(readStoredAuth());
  const [user, setUser] = useState(readStoredUser());

  const login = (userData = {}) => {
    const sanitizedUser = {
      firstName: userData.firstName ?? "",
      lastName: userData.lastName ?? "",
      email: userData.email ?? "",
      role: userData.role ?? "Security Analyst",
      avatarUrl: userData.avatarUrl ?? "",
    };
    localStorage.setItem(VITE_AUTH_STORAGE_KEY, "true");
    localStorage.setItem(
      VITE_AUTH_USER_STORAGE_KEY,
      JSON.stringify(sanitizedUser),
    );
    setIsLoggedIn(true);
    setUser(sanitizedUser);
  };

  const logout = () => {
    localStorage.removeItem(VITE_AUTH_STORAGE_KEY);
    localStorage.removeItem(VITE_AUTH_USER_STORAGE_KEY);
    setIsLoggedIn(false);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
      login,
      logout,
    }),
    [isLoggedIn, user],
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
