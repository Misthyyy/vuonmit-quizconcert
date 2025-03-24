import React from "react";
import { QuizResult } from "../../types/quiz";

type ResultScreenProps = {
  result: QuizResult;
};

const ResultScreen: React.FC<ResultScreenProps> = ({ result }) => {
  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <div
        className={`text-4xl mb-6 font-pixel ${
          result.isCorrect ? "text-green-500" : "text-red-500"
        }`}
      >
        {result.isCorrect ? "CORRECT!" : "WRONG!"}
      </div>
    </div>
  );
};

export default ResultScreen;
