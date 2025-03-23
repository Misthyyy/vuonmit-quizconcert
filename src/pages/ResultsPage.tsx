import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const score = parseInt(searchParams.get("score") || "0");
  const total = parseInt(searchParams.get("total") || "10");
  const percentage = Math.round((score / total) * 100);

  let resultMessage = "";
  let resultColor = "";

  if (percentage >= 90) {
    resultMessage = "AMAZING!";
    resultColor = "text-green-500";
  } else if (percentage >= 70) {
    resultMessage = "GREAT JOB!";
    resultColor = "text-blue-500";
  } else if (percentage >= 50) {
    resultMessage = "GOOD EFFORT!";
    resultColor = "text-yellow-500";
  } else {
    resultMessage = "TRY AGAIN!";
    resultColor = "text-red-500";
  }

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="pixel-border bg-white p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-pixel text-pixelpink-500 mb-4">
          QUIZ COMPLETE!
        </h1>

        <div className={`text-4xl font-pixel mb-6 ${resultColor}`}>
          {resultMessage}
        </div>

        <div className="text-2xl font-pixel mb-8">
          {score}/{total} ({percentage}%)
        </div>

        <button onClick={() => navigate("/")} className="pixel-button">
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
