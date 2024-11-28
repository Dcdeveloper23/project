import React from 'react';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  usedLetters: Record<string, 'correct' | 'present' | 'absent' | undefined>;
}

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, usedLetters }) => {
  const getKeyClass = (key: string) => {
    const status = usedLetters[key];
    const baseClass = 'p-2 m-1 rounded font-bold transition-colors duration-200 ';
    
    if (key === 'ENTER' || key === '⌫') {
      return baseClass + 'bg-gray-300 hover:bg-gray-400 text-sm px-4';
    }

    switch (status) {
      case 'correct':
        return baseClass + 'bg-green-500 text-white';
      case 'present':
        return baseClass + 'bg-yellow-500 text-white';
      case 'absent':
        return baseClass + 'bg-gray-600 text-white';
      default:
        return baseClass + 'bg-gray-200 hover:bg-gray-300';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex justify-center mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={getKeyClass(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};