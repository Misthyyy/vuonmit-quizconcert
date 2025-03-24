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

  // Load previous answer from localStorage
  useEffect(() => {
    setShuffledOptions(shuffleArray(question.options));

    const savedAnswer = localStorage.getItem(`quiz_answer_${question.id}`);
    if (savedAnswer) {
      const { answer } = JSON.parse(savedAnswer);
      setSelectedOption(answer);
    }
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
    if (selectedOption !== null) return; // Prevent re-answering

    setSelectedOption(option);
    const isCorrect = option === question.correctAnswer;

    // Save answer in localStorage
    localStorage.setItem(
      `quiz_answer_${question.id}`,
      JSON.stringify({ answer: option, isCorrect })
    );

    onAnswer(option, question.timeLimit - timeLeft);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="quiz-question">{question.question}</div>
      <div className="grid grid-cols-1">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option)}
            disabled={selectedOption !== null}
            className={`pixel-button ${
              selectedOption === option ? "selected" : ""
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
