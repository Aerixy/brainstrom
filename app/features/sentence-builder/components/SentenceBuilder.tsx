"use client";

import React, { useState, useEffect, useCallback } from 'react';
import './SentenceBuilder.css';

// Helper to shuffle an array
const shuffleArray = (array: string[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Never underestimate the power of a good book.",
  "The early bird catches the worm.",
  "Innovation distinguishes between a leader and a follower.",
  "The only way to do great work is to love what you do."
];

const SentenceBuilder = () => {
  const [currentSentence, setCurrentSentence] = useState<string>('');
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [userSentence, setUserSentence] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateChallenge = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const targetSentence = sentences[randomIndex];
    setCurrentSentence(targetSentence);
    const words = targetSentence.replace(/[.,!?]/g, '').split(' ');
    setScrambledWords(shuffleArray([...words]));
    setUserSentence([]);
    setFeedback(null);
    setIsCorrect(null);
  }, []);

  useEffect(() => {
    generateChallenge();
  }, [generateChallenge]);

  const handleWordClick = (word: string, index: number) => {
    setUserSentence(prev => [...prev, word]);
    setScrambledWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveWord = (word: string, index: number) => {
    setScrambledWords(prev => [...prev, word]);
    setUserSentence(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const builtSentence = userSentence.join(' ');
    const targetWords = currentSentence.replace(/[.,!?]/g, '').split(' ');
    const userWords = builtSentence.split(' ');

    if (userWords.length !== targetWords.length) {
      setFeedback("Incorrect length. Try again!");
      setIsCorrect(false);
      return;
    }

    const correct = userWords.every((word, index) => word.toLowerCase() === targetWords[index].toLowerCase());

    if (correct) {
      setFeedback("Correct! Well done!");
      setIsCorrect(true);
    } else {
      setFeedback("Incorrect. Keep trying!");
      setIsCorrect(false);
    }
  };

  const handleReset = () => {
    generateChallenge();
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-gray-900 text-white neon-border">
      <h2 className="text-2xl font-bold mb-6 text-center neon-text">Sentence Builder Challenge</h2>

      <div className="mb-6 p-4 bg-gray-800 rounded-md">
        <p className="text-lg mb-2">Arrange the words to form the correct sentence:</p>
        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {scrambledWords.map((word, index) => (
            <button
              key={`scrambled-${index}`}
              onClick={() => handleWordClick(word, index)}
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 neon-button"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-800 rounded-md">
        <p className="text-lg mb-2">Your Sentence:</p>
        <div className="flex flex-wrap gap-2 min-h-[40px] border-b-2 border-gray-700 pb-2">
          {userSentence.map((word, index) => (
            <button
              key={`user-${index}`}
              onClick={() => handleRemoveWord(word, index)}
              className="px-4 py-2 rounded-full bg-green-600 hover:bg-green-700 transition-colors duration-200 neon-button"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {feedback && (
        <div className={`mb-6 text-center text-xl font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
          {feedback}
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 neon-button"
          disabled={userSentence.length === 0}
        >
          Check Sentence
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200 neon-button"
        >
          New Challenge
        </button>
      </div>
    </div>
  );
};

export default SentenceBuilder;
