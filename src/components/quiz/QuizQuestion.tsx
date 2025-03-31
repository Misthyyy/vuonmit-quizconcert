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

    const savedAnswer = localStorage.getItem(`quiz_answer_${question.id}`);
    if (savedAnswer) {
      const { answer } = JSON.parse(savedAnswer);
      setSelectedOption(answer);
    }

    // Load quiz start time from localStorage or set it
    const savedStartTime = localStorage.getItem(`quiz_start_${question.id}`);
    if (savedStartTime) {
      const elapsedTime = Math.floor(
        (Date.now() - Number(savedStartTime)) / 1000
      );
      setTimeLeft(Math.max(question.timeLimit - elapsedTime, 0));
    } else {
      localStorage.setItem(`quiz_start_${question.id}`, Date.now().toString());
    }
  }, [question]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onAnswer("", question.timeLimit);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onAnswer, question.timeLimit]);

  // Handle tab switching: recalculate time left on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const savedStartTime = localStorage.getItem(
          `quiz_start_${question.id}`
        );
        if (savedStartTime) {
          const elapsedTime = Math.floor(
            (Date.now() - Number(savedStartTime)) / 1000
          );
          setTimeLeft(Math.max(question.timeLimit - elapsedTime, 0));
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [question]);

  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null) return;

    setSelectedOption(option);
    const isCorrect = option === question.correctAnswer;

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
