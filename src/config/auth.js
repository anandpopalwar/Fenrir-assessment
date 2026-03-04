import { AUTH_STORAGE_KEY, AUTH_USER_STORAGE_KEY } from "../config/env";
console.log("auth", AUTH_STORAGE_KEY);
export function readStoredAuth() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function readStoredUser() {
  const raw = localStorage.getItem(AUTH_USER_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
