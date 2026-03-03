import { createContext, useContext, useMemo, useState } from 'react'
import { AUTH_STORAGE_KEY, readStoredAuth } from '../data/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(readStoredAuth)

  const login = () => {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true')
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setIsLoggedIn(false)
  }

  const value = useMemo(
    () => ({
      isLoggedIn,
      login,
      logout,
    }),
    [isLoggedIn],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
