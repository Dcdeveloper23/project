import React, { useEffect, useState, useCallback } from 'react';
import { Grid } from './components/Grid';
import { Keyboard } from './components/Keyboard';
import { GameOver } from './components/GameOver';
import { DictionaryInfo } from './components/DictionaryInfo';
import { getRandomWord, isValidWord } from './utils/words';
import { Toast } from './components/Toast';

function App() {
  const [targetWord, setTargetWord] = useState(getRandomWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const maxGuesses = 6;

  const usedLetters = guesses.reduce((acc, guess) => {
    guess.toUpperCase().split('').forEach((letter, index) => {
      if (letter === targetWord[index]) {
        acc[letter] = 'correct';
      } else if (targetWord.includes(letter) && acc[letter] !== 'correct') {
        acc[letter] = 'present';
      } else if (!targetWord.includes(letter)) {
        acc[letter] = 'absent';
      }
    });
    return acc;
  }, {} as Record<string, 'correct' | 'present' | 'absent'>);

  const showError = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleKeyPress = useCallback((key: string) => {
    if (gameOver) return;

    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        showError('Word must be 5 letters');
        return;
      }

      const normalizedGuess = currentGuess.toUpperCase();
      if (!isValidWord(normalizedGuess)) {
        showError('Not in word list');
        return;
      }

      const newGuesses = [...guesses, normalizedGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');

      if (normalizedGuess === targetWord) {
        setWon(true);
        setGameOver(true);
      } else if (newGuesses.length >= maxGuesses) {
        setGameOver(true);
      }
    } else if (key === '⌫') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
      setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, gameOver, guesses, targetWord]);

  const handlePhysicalKeyboard = useCallback((event: KeyboardEvent) => {
    const key = event.key.toUpperCase();
    if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-Z]$/.test(key)) {
      event.preventDefault();
      handleKeyPress(key === 'BACKSPACE' ? '⌫' : key);
    }
  }, [handleKeyPress]);

  useEffect(() => {
    window.addEventListener('keydown', handlePhysicalKeyboard);
    return () => window.removeEventListener('keydown', handlePhysicalKeyboard);
  }, [handlePhysicalKeyboard]);

  const startNewGame = () => {
    setTargetWord(getRandomWord());
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setWon(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Word Guess</h1>
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          targetWord={targetWord}
          maxGuesses={maxGuesses}
        />
        <Keyboard
          onKeyPress={handleKeyPress}
          usedLetters={usedLetters}
        />
        <DictionaryInfo />
        {gameOver && (
          <GameOver
            won={won}
            targetWord={targetWord}
            onNewGame={startNewGame}
          />
        )}
        {showToast && <Toast message={toastMessage} />}
      </div>
    </div>
  );
}

export default App;