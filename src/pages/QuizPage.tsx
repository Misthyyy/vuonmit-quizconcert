import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuizQuestion from "../components/quiz/QuizQuestion";
import ResultScreen from "../components/quiz/ResultScreen";
import { QuizQuestion as QuizQuestionType, QuizResult } from "../types/quiz";
import { fetchQuestionsByCategory } from "../services/sheetApi";

const QuizPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(false);
  const [currentResult, setCurrentResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestion, setCurrentQuestion] =
    useState<QuizQuestionType | null>(null);

  useEffect(() => {
    if (!categoryId) {
      navigate("/");
      return;
    }

    const loadQuestions = async () => {
      try {
        const data = await fetchQuestionsByCategory(categoryId);
        console.log("data", data);

        // Pick a random question
        const randomQuestion = data[Math.floor(Math.random() * data.length)];
        console.log("random", randomQuestion);
        setCurrentQuestion(randomQuestion);
        setTimeLeft(randomQuestion.timeLimit);
      } catch (error) {
        console.error("Failed to load questions:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [categoryId, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswer = (selectedOption: string) => {
    if (!currentQuestion) return;

    const isCorrect = Number(selectedOption) === currentQuestion.correctAnswer;

    const result: QuizResult = {
      questionId: currentQuestion.id,
      isCorrect,
      userAnswer: Number(selectedOption),
      timeSpent: currentQuestion.timeLimit - timeLeft,
    };

    setCurrentResult(result);
    setShowResult(true);
  };

  if (loading) {
    return (
      <div className="text-center font-pixel text-pixelpink-500 p-8">
        Đang tải câu hỏi ... Chờ xíu nha
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center font-pixel text-pixelpink-500 p-8">
        Hỏng có câu hỏi nào trong chủ đề này cả. Chọn chủ đề khác nhé!
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      {showResult && currentResult ? (
        <ResultScreen result={currentResult} />
      ) : (
        <>
          <header className="text-center mb-8">
            <h1 className="text-xl font-pixel text-pixelpink-500 mb-2">
              Câu hỏi
            </h1>
            <div className="text-sm font-pixel text-red-500">
              Thời gian: {timeLeft}s
            </div>
          </header>
          <QuizQuestion question={currentQuestion} onAnswer={handleAnswer} />
        </>
      )}
    </div>
  );
};

export default QuizPage;
