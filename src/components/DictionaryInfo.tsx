import React from 'react';
import { Book } from 'lucide-react';
import { wordList } from '../utils/words';

export const DictionaryInfo: React.FC = () => {
  return (
    <div className="text-center mt-4 text-gray-600">
      <button
        className="flex items-center gap-2 mx-auto text-sm hover:text-gray-800"
        onClick={() => {
          alert(`This game uses a comprehensive English dictionary with ${wordList.length.toLocaleString()} five-letter words.\n\nIt includes:\n- Standard English words from 'an-array-of-english-words'\n- Custom programming-related vocabulary`);
        }}
      >
        <Book size={16} />
        <span>Dictionary Info</span>
      </button>
    </div>
  );
};