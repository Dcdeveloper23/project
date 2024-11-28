import words from 'an-array-of-english-words';

// Filter for only 5-letter words and convert to uppercase
const fiveLetterWords = words
  .filter(word => word.length === 5)
  .map(word => word.toUpperCase());

// Add our custom programming-related words
const customWords = [
  'REACT', 'STATE', 'PROPS', 'HOOKS', 'REDUX',
  'VITES', 'BUILD', 'STACK', 'CODES', 'DEBUG',
  'ARRAY', 'CLASS', 'STYLE', 'QUERY', 'FETCH'
].filter(word => !fiveLetterWords.includes(word));

export const wordList = [...new Set([...fiveLetterWords, ...customWords])];

export const getRandomWord = () => {
  return wordList[Math.floor(Math.random() * wordList.length)];
};

export const isValidWord = (word: string) => {
  const normalizedWord = word.toUpperCase();
  return wordList.includes(normalizedWord);
};

// For debugging
console.log(`Total words in dictionary: ${wordList.length}`);