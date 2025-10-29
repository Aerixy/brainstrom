"use client";

type ResponseInputProps = {
  options: string[];
  onSubmit: (selectedOption: string) => void;
  onSkip: () => void;
  disabled?: boolean;
};

export default function ResponseInput({ options, onSubmit, onSkip, disabled = false }: ResponseInputProps) {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-4 mb-4">
        {options.map((option) => (
          <button
            key={option}
            className="px-4 py-3 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition-colors text-lg font-medium"
            onClick={() => onSubmit(option)}
            disabled={disabled}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex justify-end items-center mt-4">
        <button
          className="px-4 py-2 bg-zinc-700 text-white rounded-md hover:bg-zinc-600 transition-colors mr-2"
          onClick={onSkip}
          disabled={disabled}
        >
          Skip
        </button>
      </div>
    </div>
  );
}