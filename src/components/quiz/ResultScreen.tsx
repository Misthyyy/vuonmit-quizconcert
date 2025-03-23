import React from "react";
import { useNavigate } from "react-router-dom";
import { QuizQuestion, QuizResult } from "../../types/quiz";

type ResultScreenProps = {
  question: QuizQuestion;
  result: QuizResult;
  onNextQuestion: () => void;
};

const ResultScreen: React.FC<ResultScreenProps> = ({
  question,
  result,
  onNextQuestion,
}) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <div
        className={`text-4xl mb-6 font-pixel ${
          result.isCorrect ? "text-green-500" : "text-red-500"
        }`}
      >
        {result.isCorrect ? "CORRECT!" : "WRONG!"}
      </div>

      <div className="mb-6 font-pixel pixel-border bg-white p-4">
        <div className="mb-4">{question.question}</div>

        <div className="text-sm">
          <p className="mb-2">
            Correct answer: {question.options[question.correctAnswer]}
          </p>
          {result.userAnswer !== null && (
            <p>Your answer: {question.options[result.userAnswer]}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate("/")}
          className="pixel-button bg-pixelpink-200 text-pixelpink-500"
        >
          Menu
        </button>
        <button onClick={onNextQuestion} className="pixel-button">
          Next →
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
