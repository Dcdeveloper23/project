import React from 'react';
import { RefreshCw } from 'lucide-react';

interface GameOverProps {
  won: boolean;
  targetWord: string;
  onNewGame: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ won, targetWord, onNewGame }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {won ? '🎉 Congratulations!' : '😔 Game Over'}
        </h2>
        <p className="text-center mb-4">
          The word was: <span className="font-bold">{targetWord}</span>
        </p>
        <button
          onClick={onNewGame}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw size={20} />
          Play Again
        </button>
      </div>
    </div>
  );
};