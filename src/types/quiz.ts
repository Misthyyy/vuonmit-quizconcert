export type QuizCategory = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  timeLimit: number;
};

export type QuizResult = {
  questionId: string;
  isCorrect: boolean;
  userAnswer: number | null;
  timeSpent: number;
};
