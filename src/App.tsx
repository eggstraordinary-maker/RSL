import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import Dictionary from './pages/Dictionary';
import Translator from './pages/Translator';
import Learning from './pages/Learning';
import LoginPage from './pages/LogIn';
import { useAuth } from './contexts/AuthContext';
import LanguageSwitcher from './components/LanguageSwitcher';

type Tab = 'dictionary' | 'translator' | 'learning';

const AppContent: React.FC = () => {
  const [tab, setTab] = useState<Tab>('dictionary');
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout, isLoading, error } = useAuth();

  // Показываем загрузку при проверке авторизации
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="mt-4 text-lg text-gray-600">Проверка авторизации...</div>
        {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
      </div>
    );
  }

  // Если пользователь авторизован, показываем основное приложение
  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">РЖЯ</div>
              <div className="text-lg font-semibold">РЖЯ помощник</div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden sm:inline">
                {user.username} ({user.email})
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-6 pb-20">
          <div className="mb-4">
            <h2 className="text-xl font-bold capitalize">
              {tab === 'dictionary' && 'Словарь'}
              {tab === 'translator' && 'Переводчик'}
              {tab === 'learning' && 'Обучение'}
            </h2>
            <div className="mt-2 text-sm text-green-600 bg-green-50 p-2 rounded inline-block">
              ✅ Вы вошли как {user.username}
            </div>
          </div>

          <div className="w-full">
            {tab === 'dictionary' && <Dictionary />}
            {tab === 'translator' && <Translator />}
            {tab === 'learning' && <Learning />}
          </div>
        </main>

        <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-30">
          <BottomNav active={tab} onChange={(t) => setTab(t)} />
        </footer>
      </div>
    );
  }

  // Если пользователь НЕ авторизован, показываем страницу выбора
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">РЖЯ</div>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            РЖЯ помощник
          </h1>
          <p className="mt-2 text-gray-600">
            Распознавание и изучение русского жестового языка
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-xl font-semibold text-center">Добро пожаловать!</h2>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <button
              onClick={() => setShowLogin(true)}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Войти в аккаунт
            </button>
            
            <button
              onClick={() => {
                window.location.href = '/register';
              }}
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Создать новый аккаунт
            </button>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>Или продолжите как гость с ограниченным доступом</p>
            <button
              onClick={() => {
                localStorage.setItem('guest_mode', 'true');
                window.location.reload();
              }}
              className="mt-2 text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Продолжить без регистрации →
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно входа */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <LoginPage 
              onClose={() => setShowLogin(false)} 
              onLoginSuccess={() => {
                setShowLogin(false);
                // Не нужно перезагружать страницу - AuthContext обновит состояние
              }}
              onGuestMode={() => {
                localStorage.setItem('guest_mode', 'true');
                window.location.reload();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;