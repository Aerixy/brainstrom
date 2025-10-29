"use client";

import { useState, useEffect } from 'react';

type TypingDisplayProps = {
  text: string;
  typingSpeed?: number;
  onComplete: () => void;
};

export default function TypingDisplay({ text, typingSpeed = 70, onComplete }: TypingDisplayProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else {
      // Animation complete
      onComplete();
    }
  }, [currentIndex, text, typingSpeed, onComplete]);

  return (
    <span className="font-bold text-3xl text-white">
      {displayedText}
      <span className="animate-blink">|</span>
    </span>
  );
}
