import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import Dictionary from './pages/Dictionary';
import Translator from './pages/Translator';
import Learning from './pages/Learning';

type Tab = 'dictionary' | 'translator' | 'learning';

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>('dictionary');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">R</div>
            <div className="text-lg font-semibold">Жестовый помощник</div>
          </div>
          <button 
            onClick={() => window.location.href = '/register'}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Регистрация
          </button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 pb-20">
        <div className="mb-4">
          <h2 className="text-xl font-bold capitalize">
            {tab === 'dictionary' && 'Словарь'}
            {tab === 'translator' && 'Переводчик'}
            {tab === 'learning' && 'Обучение'}
          </h2>
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
};

export default App;