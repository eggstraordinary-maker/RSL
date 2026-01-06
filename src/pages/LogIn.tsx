import React, { useState } from "react";
import PasswordReset from "./PasswordReset";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from 'react-i18next';

// ОБНОВЛЕННЫЙ интерфейс - добавлен onGuestMode
interface LoginProps {
  onClose: () => void;
  onLoginSuccess: () => void;
  onGuestMode: () => void; // Добавьте эту строку
}

const LoginPage: React.FC<LoginProps> = ({ onClose, onLoginSuccess, onGuestMode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { t } = useTranslation(['auth', 'common']);

  // ОБНОВЛЕННЫЙ PasswordReset вызов - добавлен onBack
  if (showForgot) return <PasswordReset onBack={() => setShowForgot(false)} />;

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  try {
    await login(username, password);
    onLoginSuccess(); // Просто закрываем модальное окно
  } catch (err: any) {
    setError(err.response?.data?.detail || "Ошибка входа");
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">{t('auth:login_title')}</h2>

      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">{t('auth:email')}</label>
          <input
            className="w-full p-2 border rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t('auth:email')}
          />
        </div>

        <div>
          <label className="block mb-1">{t('auth:password')}</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth:password')}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {t('common:login')}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition"
        >
          Назад
        </button>
      </form>

      {/* ДОБАВЬТЕ ЭТОТ БЛОК ДЛЯ ГОСТЕВОГО РЕЖИМА */}
      <div className="mt-6 text-center space-y-3">
        <div className="text-sm text-gray-600">
          Нет аккаунта?{' '}
          <button
            type="button"
            onClick={() => {
              onClose();
              window.location.href = '/register';
            }}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Зарегистрироваться
          </button>
        </div>
        
        {/* <div className="border-t pt-3">
          <button
            type="button"
            onClick={onGuestMode}
            className="w-full py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
          >
            Продолжить как гость (демо)
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
