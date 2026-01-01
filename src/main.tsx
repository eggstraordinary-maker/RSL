import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom'
import App from './App'
import Register from './pages/Register'
import EmailVerification from './pages/EmailVerification'
import PasswordResetPage from './pages/PasswordResetPage' // Новый компонент
import { AuthProvider } from './contexts/AuthContext'
import './styles/index.css'

// Создаем обертку для PasswordReset с навигацией
function PasswordResetWrapper() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  
  return <PasswordResetPage 
    token={token} 
    onBack={() => navigate('/')}
  />;
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />
          <Route path="/reset-password/:token" element={<PasswordResetWrapper />} />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
)