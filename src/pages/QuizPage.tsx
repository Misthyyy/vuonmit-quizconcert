import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuizQuestion from "../components/quiz/QuizQuestion";
import { QuizQuestion as QuizQuestionType, QuizResult } from "../types/quiz";
import { fetchQuestionsByCategory } from "../services/sheetApi";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use"; // Helps get screen size
import { useQuizStore } from "../components/quiz/quizStore";

const QuizPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [currentResult, setCurrentResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestion, setCurrentQuestion] =
    useState<QuizQuestionType | null>(null);
  const [showPopup, setShowPopup] = useState(false); // Controls popup visibility
  const [triggerEffect, setTriggerEffect] = useState(false); // Controls animation effects
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (!categoryId) {
      navigate("/");
      return;
    }

    const loadQuestions = async () => {
      try {
        const data = await fetchQuestionsByCategory(categoryId);
        const randomQuestion = data[Math.floor(Math.random() * data.length)];
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
    if (timeLeft <= 0 || showPopup) return;
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showPopup]);

  useEffect(() => {
    if (triggerEffect) {
      const timer = setTimeout(() => setTriggerEffect(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [triggerEffect]);

  const handleAnswer = (selectedOption: string) => {
    if (!currentQuestion) return;

    const { hasAnswered, markAnswered } = useQuizStore.getState();
    if (hasAnswered(currentQuestion.id)) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    const result: QuizResult = {
      questionId: currentQuestion.id,
      isCorrect,
      userAnswer: Number(selectedOption),
      timeSpent: currentQuestion.timeLimit - timeLeft,
    };

    markAnswered(currentQuestion.id); // Mark question as answered

    console.log("Result stored:", result); // Debugging

    setTimeout(() => {
      setCurrentResult(result);
      setShowPopup(true);
      setTriggerEffect(true);
    }, 0);
  };

  useEffect(() => {
    if (currentResult) {
      setShowPopup(true);
      setTriggerEffect(true);
    }
  }, [currentResult]);

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
    <div className="min-h-screen p-4 relative">
      {triggerEffect && currentResult?.isCorrect && (
        <ReactConfetti
          width={width}
          height={height}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}
        />
      )}
      <header className="quiz-header">
        <h1 className="quiz-title">Câu hỏi</h1>
        <div className="quiz-timer-container">
          <svg width="70" height="70">
            <circle
              className="quiz-timer-circle"
              cx="35"
              cy="35"
              r="30"
              strokeWidth="5"
              strokeDasharray={2 * Math.PI * 30}
              strokeDashoffset={
                ((currentQuestion.timeLimit - timeLeft) /
                  currentQuestion.timeLimit) *
                2 *
                Math.PI *
                30
              }
            />
          </svg>
          <div className="quiz-timer-text">{timeLeft}s</div>
        </div>
      </header>

      <QuizQuestion question={currentQuestion} onAnswer={handleAnswer} />

      {showPopup && currentResult && (
        <div
          className={`quiz-popup ${
            triggerEffect && !currentResult?.isCorrect ? "shake" : ""
          }`}
        >
          <div className="quiz-popup-content">
            <img
              src={currentResult.isCorrect ? "/img/0002.png" : "/img/0001.png"}
              alt={currentResult.isCorrect ? "Correct" : "Wrong"}
              className="popup-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
