import React, { useState, useEffect } from "react";
import type { QuizQuestion } from "../../types/quiz";

type QuizQuestionProps = {
  question: QuizQuestion;
  onAnswer: (selectedOption: number, timeSpent: number) => void;
};

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onAnswer }) => {
  const [timeLeft, setTimeLeft] = useState(question.timeLimit);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onAnswer(-1, question.timeLimit);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [question, onAnswer]);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(index);
    onAnswer(index, question.timeLimit - timeLeft);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-6 font-pixel">
        <div className="w-full bg-pixelpink-100 h-8 pixel-border">
          <div
            className="h-full bg-pixelpink-400"
            style={{ width: `${(timeLeft / question.timeLimit) * 100}%` }}
          ></div>
        </div>
        <div className="text-center mt-1 text-sm">{timeLeft}s</div>
      </div>

      <div className="mb-6 font-pixel text-center pixel-border bg-white p-4">
        {question.question}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(index)}
            disabled={selectedOption !== null}
            className={`pixel-button text-left p-4 ${
              selectedOption === index ? "bg-pixelpink-400" : "bg-pixelpink-200"
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
