// import { VITE_AUTH_STORAGE_KEY } from "../config/env";

// console.log(VITE_AUTH_STORAGE_KEY);

export const VITE_AUTH_STORAGE_KEY = "fenrir_is_logged_in";
export const VITE_AUTH_USER_STORAGE_KEY = "fenrir_user";

export function readStoredAuth() {
  return localStorage.getItem(VITE_AUTH_STORAGE_KEY) === "true";
}

export function readStoredUser() {
  const raw = localStorage.getItem(VITE_AUTH_USER_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
