import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ScanProvider } from './context/ScanContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ScanProvider>
          <App />
        </ScanProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
