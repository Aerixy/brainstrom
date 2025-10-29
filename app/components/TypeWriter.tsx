'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypeWriterProps {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  erasingSpeed?: number;
  delayBetweenTexts?: number;
}

export default function TypeWriter({
  texts,
  className = '',
  typingSpeed = 70,
  erasingSpeed = 50,
  delayBetweenTexts = 2000,
}: TypeWriterProps) {
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const text = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (currentText === text) {
        // Finished typing current text
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, delayBetweenTexts);
      } else {
        // Still typing
        timeout = setTimeout(() => {
          setCurrentText(text.slice(0, currentText.length + 1));
        }, typingSpeed);
      }
    } else {
      if (currentText === '') {
        // Finished erasing, move to next text
        setTextIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      } else {
        // Still erasing
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, erasingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, textIndex, isTyping, texts, typingSpeed, erasingSpeed, delayBetweenTexts]);

  // Cursor blink effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {currentText}
      </motion.span>
      <AnimatePresence>
        {showCursor && (
          <motion.span
            className="inline-block w-0.5 h-5 ml-1 bg-cyan-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}