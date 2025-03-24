import React, { useState, useEffect } from "react";
import type { QuizQuestion } from "../../types/quiz";

const shuffleArray = (array: string[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

type QuizQuestionProps = {
  question: QuizQuestion;
  onAnswer: (selectedOption: string, timeSpent: number) => void;
};

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onAnswer }) => {
  const [timeLeft, setTimeLeft] = useState(question.timeLimit);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    setShuffledOptions(shuffleArray(question.options));
  }, [question]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onAnswer("", question.timeLimit);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [question, onAnswer]);

  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    onAnswer(option, question.timeLimit - timeLeft);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-6 font-pixel"></div>

      <div className="mb-6 font-pixel text-center pixel-border bg-white p-4">
        {question.question}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option)}
            disabled={selectedOption !== null}
            className={`pixel-button text-left p-4 ${
              selectedOption === option
                ? "bg-pixelpink-400"
                : "bg-pixelpink-200"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
