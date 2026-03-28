import React from 'react';

interface LeftTOCProps {
  items: Array<{ id: string; label: string }>;
  active: string;
  onSelect: (label: string) => void;
}

export const LeftTOC: React.FC<LeftTOCProps> = ({ items, active, onSelect }) => {
  return (
    <aside className="...">
      <ul>
        {items.map(item => (
          <li key={item.id}>   
            <button
              className={item.label === active ? 'active' : ''}
              onClick={() => onSelect(item.label)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
