"use client";

import { useState } from 'react';
import ResponseInput from './ResponseInput';
import ChallengeContainer from './ChallengeContainer';

type MemoryChallengeProps = {
  challengeSentence: string;
  challengeQuestion: string;
  challengeOptions: string[];
  onSkip: () => void;
  onSubmit: (answer: string) => void;
  showChallenge: boolean;
  onAnimationComplete: () => void;
  countdown: number;
  isSpeaking: boolean;
  isChallengeReady: boolean;
};

export default function MemoryChallenge({ challengeSentence, challengeQuestion, challengeOptions, onSkip, onSubmit, showChallenge, onAnimationComplete, countdown, isSpeaking, isChallengeReady }: MemoryChallengeProps) {
  return (
    <div className="bg-zinc-900 rounded-lg p-6">
      <div className="space-y-6">
        {/* Memory Challenge Section */}
        {!isChallengeReady && showChallenge ? (
          <div className="text-white text-center text-3xl font-bold py-8">
            Bersiap...
          </div>
        ) : (
          <ChallengeContainer
            title="Challenge #1"
            instructions={showChallenge ? "Ingat kalimat berikut:" : challengeQuestion}
            challengeSentence={challengeSentence}
            isAnimating={showChallenge}
            onAnimationComplete={onAnimationComplete}
            countdown={countdown}
            isSpeaking={isSpeaking}
          />
        )}

        {/* Response Section */}
        {!showChallenge && (
          <ResponseInput
            options={challengeOptions}
            onSubmit={onSubmit}
            onSkip={onSkip}
            disabled={isSpeaking}
          />
        )}
      </div>
    </div>
  );
}
