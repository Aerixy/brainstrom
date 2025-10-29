"use client";

import MemoryChallenge from './components/MemoryChallenge';
import FeedbackDisplay from './components/FeedbackDisplay';
import { useMemoryChallenge } from './hooks/useMemoryChallenge';

export default function MemoryTraining() {
  const {
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
  } = useMemoryChallenge();

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-8">Memory Training</h1>
        
        <div className="mb-6 flex justify-center space-x-4">
          {(["easy", "medium", "hard", "extreme"] as const).map((level) => (
            <button
              key={level}
              onClick={() => setDifficultyLevel(level)}
              className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-200
                ${difficultyLevel === level 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-white text-center text-3xl font-bold py-8">
            Memuat Tantangan AI...
          </div>
        ) : (
          challenge && (
            <MemoryChallenge
              challengeSentence={challenge.sentence}
              challengeQuestion={challenge.question}
              challengeOptions={challenge.options}
              onSkip={handleSkip}
              onSubmit={handleSubmit}
              showChallenge={showChallenge}
              onAnimationComplete={handleAnimationComplete}
              countdown={countdown}
              isSpeaking={isSpeaking}
              isChallengeReady={isChallengeReady}
            />
          )
        )}
        <FeedbackDisplay message={feedbackMessage} isCorrect={isCorrect} />
      </div>
    </div>
  );
}
