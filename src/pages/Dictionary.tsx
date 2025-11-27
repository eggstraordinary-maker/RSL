import React, { useState } from 'react';
import LeftTOC from '../components/LeftTOC';
import VideoStub from '../components/VideoStub';

const SAMPLE_WORDS = ['Привет', 'Спасибо', 'Извините', 'Да', 'Нет', 'Помогите', 'Я люблю', 'Пока'];

export default function Dictionary() {
  const [selected, setSelected] = useState<string>(SAMPLE_WORDS[0]);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-4 lg:gap-6">
      <LeftTOC items={SAMPLE_WORDS} active={selected} onSelect={setSelected} />

      <div className="space-y-4">
        <VideoStub title={`Видео: жест для «${selected}» (заглушка)`} />

        <div>
          <label className="block text-sm font-medium mb-1">Слово для распознавания</label>
          <input value={selected} onChange={(e) => setSelected(e.target.value)} readOnly className="w-full rounded-md border px-3 py-2 bg-gray-100 cursor-not-allowed" placeholder="Слово" />
        </div>

        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold mb-2">Описание и советы по повторению жеста</h4>
          <p className="text-sm text-gray-600">Здесь будет текстовое описание выбранного жеста: положение рук, направление движений, темп и советы по запоминанию и повторению. (Заглушка)</p>
          <ul className="mt-3 text-sm text-gray-600 list-disc list-inside">
            <li>Разбейте жест на этапы и тренируйте по частям.</li>
            <li>Записывайте себя на видео и сравнивайте с эталоном.</li>
            <li>Тренируйтесь в медленном темпе, затем увеличивайте скорость.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
