"use client";

type FeedbackDisplayProps = {
  message: string;
  isCorrect: boolean | null;
};

export default function FeedbackDisplay({ message, isCorrect }: FeedbackDisplayProps) {
  if (!message) return null;

  const textColorClass = isCorrect === true ? "text-green-400" : isCorrect === false ? "text-red-400" : "text-gray-300";

  return (
    <div className="mt-4 p-4 rounded-md bg-zinc-800">
      <p className={`text-lg font-semibold ${textColorClass}`}>{message}</p>
    </div>
  );
}
