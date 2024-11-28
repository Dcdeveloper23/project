import React from 'react';

interface GridProps {
  guesses: string[];
  currentGuess: string;
  targetWord: string;
  maxGuesses: number;
}

export const Grid: React.FC<GridProps> = ({ guesses, currentGuess, targetWord, maxGuesses }) => {
  const getLetterClass = (letter: string, index: number, word: string) => {
    const baseClass = 'w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold rounded m-1 ';
    
    if (!letter) return baseClass + 'border-gray-300';
    
    const upperLetter = letter.toUpperCase();
    if (word === guesses[guesses.length - 1]) {
      if (upperLetter === targetWord[index]) {
        return baseClass + 'bg-green-500 text-white border-green-500';
      }
      if (targetWord.includes(upperLetter)) {
        return baseClass + 'bg-yellow-500 text-white border-yellow-500';
      }
      return baseClass + 'bg-gray-600 text-white border-gray-600';
    }
    
    return baseClass + 'border-gray-300';
  };

  const rows = Array(maxGuesses).fill('');

  return (
    <div className="grid gap-1 mb-8">
      {rows.map((_, rowIndex) => {
        const guess = guesses[rowIndex] || '';
        const isCurrentRow = rowIndex === guesses.length;
        const rowContent = isCurrentRow ? currentGuess : guess;
        
        return (
          <div key={rowIndex} className="flex justify-center">
            {Array(5).fill('').map((_, colIndex) => (
              <div
                key={colIndex}
                className={getLetterClass(rowContent[colIndex] || '', colIndex, rowContent)}
              >
                {rowContent[colIndex]?.toUpperCase() || ''}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};