"use client";

import { useState, useEffect, useCallback } from 'react';

const DIFFICULTY_SETTINGS = {
  easy: { countdown: 3, promptModifier: "easy, short sentences" },
  medium: { countdown: 3, promptModifier: "medium length sentences" },
  hard: { countdown: 4, promptModifier: "challenging, longer sentences with complex vocabulary" },
  extreme: { countdown: 5, promptModifier: "extreme, very long and complex sentences with intricate context and advanced vocabulary, often metaphorical or abstract" },
};

export const useMemoryChallenge = () => {
  const [difficultyLevel, setDifficultyLevel] = useState<"easy" | "medium" | "hard" | "extreme">("medium");
  const [challenge, setChallenge] = useState<any>(null); // Set initial state to null or a default empty challenge
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showChallenge, setShowChallenge] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [countdown, setCountdown] = useState(DIFFICULTY_SETTINGS[difficultyLevel].countdown);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isChallengeReady, setIsChallengeReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const speakSentence = useCallback((sentence: string) => {
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = 'id-ID';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.cancel(); // Clear any existing speech to avoid overlap
      speechSynthesis.speak(utterance);
    } else {
      console.warn("Text-to-speech not supported in this browser.");
    }
  }, []);

  const loadNewChallenge = useCallback(async () => {
    setIsChallengeReady(false);
    setFeedbackMessage('');
    setIsCorrect(null);
    setShowChallenge(true);
    setIsAnimating(false); // Ensure animation is off initially
    setCountdown(DIFFICULTY_SETTINGS[difficultyLevel].countdown);
    setIsLoading(true); // Start loading

    try {
      const response = await fetch(`/api/generate-challenge?difficulty=${difficultyLevel}`);
      const newChallenge = await response.json();
      setChallenge(newChallenge);
      setIsAnimating(true); // Start typing animation
      speakSentence(newChallenge.sentence);
      setIsChallengeReady(true);
    } catch (error) {
      console.error("Failed to fetch challenge:", error);
      setFeedbackMessage("Gagal memuat tantangan. Coba lagi.");
    } finally {
      setIsLoading(false); // End loading
    }
  }, [difficultyLevel, speakSentence]);

  useEffect(() => {
    loadNewChallenge();
  }, [loadNewChallenge]);

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false);
    setCountdown(DIFFICULTY_SETTINGS[difficultyLevel].countdown); // Start countdown after typing animation
  }, [difficultyLevel]);

  useEffect(() => {
    if (isChallengeReady && !isAnimating && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isChallengeReady && !isAnimating && countdown === 0 && !isSpeaking) {
      setShowChallenge(false);
    }
  }, [isChallengeReady, isAnimating, countdown, isSpeaking]);

  const handleSubmit = (selectedOption: string) => {
    const correct = selectedOption.toLowerCase().trim() === challenge.answer.toLowerCase().trim();
    setIsCorrect(correct);
    setFeedbackMessage(correct ? "Benar! Kerja bagus." : "Salah. Coba lagi!");
  };

  const handleSkip = () => {
    loadNewChallenge();
  };

  return {
    challenge,
    feedbackMessage,
    isCorrect,
    showChallenge,
    countdown,
    isSpeaking,
    isChallengeReady,
    isLoading,
    handleSubmit,
    handleSkip,
    handleAnimationComplete,
    difficultyLevel,
    setDifficultyLevel
  };
};
