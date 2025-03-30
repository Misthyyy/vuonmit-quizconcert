import { create } from "zustand";

type QuizStore = {
  answeredQuestions: Set<string>;
  markAnswered: (questionId: string) => void;
  hasAnswered: (questionId: string) => boolean;
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  answeredQuestions: new Set(
    JSON.parse(localStorage.getItem("answered_questions") || "[]")
  ),
  markAnswered: (questionId) => {
    set((state) => {
      const newSet = new Set(state.answeredQuestions);
      newSet.add(questionId);
      localStorage.setItem("answered_questions", JSON.stringify([...newSet])); // Persist to localStorage
      return { answeredQuestions: newSet };
    });
  },
  hasAnswered: (questionId) => get().answeredQuestions.has(questionId),
}));
