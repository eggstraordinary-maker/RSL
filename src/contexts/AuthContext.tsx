// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { User, LoginResponse } from '../types/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isGuest: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  enterGuestMode: () => void;
  exitGuestMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Проверяем состояние при загрузке
  useEffect(() => {
    const loadUser = async () => {
      // Сначала проверяем гостевой режим
      const guestMode = localStorage.getItem('guest_mode') === 'true';
      
      if (guestMode) {
        setIsGuest(true);
        setIsLoading(false);
        return;
      }
      
      // Затем проверяем токен и загружаем пользователя
      if (token) {
        try {
          const response = await axios.get<User>('http://localhost:8000/users/me');
          setUser(response.data);
        } catch (error) {
          console.error('Ошибка загрузки пользователя', error);
          setToken(null);
          localStorage.removeItem('access_token');
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, [token]);

  // Настройка axios заголовков
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('access_token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('access_token');
    }
  }, [token]);

  const enterGuestMode = () => {
    setIsGuest(true);
    localStorage.setItem('guest_mode', 'true');
    // Удаляем токены если есть
    setToken(null);
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const exitGuestMode = () => {
    setIsGuest(false);
    localStorage.removeItem('guest_mode');
  };

  const login = async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const response = await axios.post<LoginResponse>(
      'http://localhost:8000/auth/login',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token } = response.data;
    setToken(access_token);
    localStorage.setItem('refresh_token', refresh_token);
    // Выходим из гостевого режима при входе
    exitGuestMode();
  };

  const register = async (username: string, email: string, password: string) => {
    await axios.post('http://localhost:8000/auth/register', {
      username,
      email,
      password,
    });
    // После регистрации автоматически входим
    await login(email, password);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('guest_mode');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isGuest,
        isLoading,
        login,
        register,
        logout,
        enterGuestMode,
        exitGuestMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};