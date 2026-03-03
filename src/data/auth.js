export const AUTH_STORAGE_KEY = 'fenrir_is_logged_in'
export const AUTH_USER_STORAGE_KEY = 'fenrir_user'

export function readStoredAuth() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
}

export function readStoredUser() {
  const raw = localStorage.getItem(AUTH_USER_STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}
