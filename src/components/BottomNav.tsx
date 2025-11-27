import React from 'react';

type Tab = 'dictionary' | 'translator' | 'learning';

const Icon = {
  dictionary: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 5h4l2 2h8v12H3V5z" />
    </svg>
  ),
  translator: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 8h16M4 16h9" />
    </svg>
  ),
  learning: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 6l8 4-8 4-8-4 8-4zM4 10v6a2 2 0 002 2h12" />
    </svg>
  ),
};

export default function BottomNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const button = (t: Tab, label: string) => {
    const isActive = active === t;
    return (
      <button
        aria-current={isActive ? 'true' : undefined}
        onClick={() => onChange(t)}
        className={`flex-1 py-2 px-2 flex flex-col items-center justify-center focus:outline-none ${isActive ? 'text-indigo-600' : 'text-gray-600'}`}
      >
        <div className="mb-1">{Icon[t]}</div>
        <div className="text-xs font-medium">{label}</div>
      </button>
    );
  };

  return <nav className="bg-white/95 backdrop-blur border rounded-3xl shadow-lg flex p-1">{button('translator', 'Переводчик')}{button('dictionary', 'Словарь')}{button('learning', 'Обучение')}</nav>;
}
