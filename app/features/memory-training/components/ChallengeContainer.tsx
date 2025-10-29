"use client";

import { env } from 'process';
import ChallengeHeader from './ChallengeHeader';
import TypingDisplay from './TypingDisplay';

type ChallengeContainerProps = {
  title: string;
  instructions: string;
  challengeSentence: string;
  isAnimating: boolean;
  onAnimationComplete?: () => void;
  countdown: number;
  isSpeaking?: boolean;
};

export default function ChallengeContainer({ title, instructions, challengeSentence, isAnimating, onAnimationComplete, countdown, isSpeaking }: ChallengeContainerProps) {
  return (
    <div className="bg-zinc-800 p-4 rounded-md">
      <ChallengeHeader title={title} instructions={instructions} isSpeaking={isSpeaking} />
      {isAnimating ? (
        <div className="text-white text-center text-xl mt-4">
          {challengeSentence && <TypingDisplay text={challengeSentence} onComplete={onAnimationComplete!} />}
          <div className="mt-2 text-3xl font-bold text-cyan-400">{countdown}</div>
        </div>
      ) : (
        <div className="text-white text-center text-xl mt-4">
           
        </div>
      )}
    </div>
  );
}
