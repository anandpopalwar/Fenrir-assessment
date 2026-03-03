export const AUTH_STORAGE_KEY = 'fenrir_is_logged_in'

export function readStoredAuth() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
}
