"use client";

type ChallengeHeaderProps = {
  title: string;
  instructions: string;
  isSpeaking?: boolean;
};

export default function ChallengeHeader({ title, instructions, isSpeaking = false }: ChallengeHeaderProps) {
  return (
    <div className="bg-zinc-800 p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {isSpeaking && (
          <svg className="w-6 h-6 text-cyan-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 8.464a5 5 0 000 7.072m2.828 2.828a9 9 0 000-12.728" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.5a4.5 4.5 0 01-4.5-4.5v-3a4.5 4.5 0 019 0v3a4.5 4.5 0 01-4.5 4.5z" />
          </svg>
        )}
      </div>
      <p className="text-gray-300 mb-4">{instructions}</p>
    </div>
  );
}
