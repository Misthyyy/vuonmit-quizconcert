import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuizQuestion from "../components/quiz/QuizQuestion";
import ResultScreen from "../components/quiz/ResultScreen";
import { QuizQuestion as QuizQuestionType, QuizResult } from "../types/quiz";
import { fetchQuestionsByCategory } from "../services/sheetApi";

const QuizPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuizQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [currentResult, setCurrentResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!categoryId) {
      navigate("/");
      return;
    }

    const loadQuestions = async () => {
      try {
        const data = await fetchQuestionsByCategory(categoryId);
        if (data.length === 0) {
          navigate("/");
          return;
        }

        // Randomize questions order
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 10)); // Limit to 10 questions
      } catch (error) {
        console.error("Failed to load questions:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [categoryId, navigate]);

  const handleAnswer = (selectedOption: number, timeSpent: number) => {
    if (!questions.length) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const result: QuizResult = {
      questionId: currentQuestion.id,
      isCorrect,
      userAnswer: selectedOption === -1 ? null : selectedOption,
      timeSpent,
    };

    setCurrentResult(result);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowResult(false);
    } else {
      navigate(`/results?score=${score}&total=${questions.length}`);
    }
  };

  if (loading) {
    return (
      <div className="text-center font-pixel text-pixelpink-500 p-8">
        Loading quiz...
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="text-center font-pixel text-pixelpink-500 p-8">
        No questions found
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen p-4">
      <header className="text-center mb-8">
        <h1 className="text-xl font-pixel text-pixelpink-500 mb-2">
          Question {currentQuestionIndex + 1}/{questions.length}
        </h1>
        <div className="text-sm font-pixel">Score: {score}</div>
      </header>

      {showResult && currentResult ? (
        <ResultScreen
          question={currentQuestion}
          result={currentResult}
          onNextQuestion={handleNextQuestion}
        />
      ) : (
        <QuizQuestion question={currentQuestion} onAnswer={handleAnswer} />
      )}
    </div>
  );
};

export default QuizPage;
