import React, { useState } from "react";
import PasswordReset from "./PasswordReset";

interface LoginProps {
  onClose: () => void;
}

const LoginPage: React.FC<LoginProps> = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  if (showForgot) return <PasswordReset onBack={() => setShowForgot(false)} />;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt", { username, password });
    // Здесь будет запрос к бэкенду
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Вход в систему</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">Имя пользователя</label>
          <input
            className="w-full p-2 border rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите имя"
          />
        </div>

        <div>
          <label className="block mb-1">Пароль</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Войти
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition"
        >
          Назад
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setShowForgot(true)}
          className="text-blue-600 hover:underline"
        >
          Забыли пароль?
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
