import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { User, LoginResponse } from '../types/api';

// interface User {
//   id: number;
//   public_id: string;
//   email: string;
//   username: string;
//   is_verified: boolean;
// }

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Устанавливаем токен в axios по умолчанию
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('access_token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('access_token');
    }
  }, [token]);

  // При загрузке приложения проверяем, есть ли токен и загружаем пользователя
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await axios.get<User>('http://localhost:8000/users/me');
          setUser(response.data);
          setError(null);
          // Удаляем демо-режим при успешной загрузке пользователя
          localStorage.removeItem('guest_mode');
        } catch (error: any) {
          console.error('Ошибка загрузки пользователя', error);
          setError('Не удалось загрузить данные пользователя');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
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
      
      // Удаляем демо-режим при успешном входе
      localStorage.removeItem('guest_mode');
      
      // Устанавливаем токен - это запустит useEffect для загрузки пользователя
      setToken(access_token);
      localStorage.setItem('refresh_token', refresh_token);
      
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка входа');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    await axios.post('http://localhost:8000/auth/register', {
      username,
      email,
      password,
    });
    // После регистрации можно автоматически войти или перенаправить на страницу входа
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('refresh_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading, error }}>
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