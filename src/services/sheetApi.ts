/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { QuizQuestion, QuizCategory } from "../types/quiz";

const SHEET_ID = "1BwF_5IR_0MGFD_yHugypiBKN5qMNHWA5vQcT7QeCqf4";
const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}`;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;

export const fetchCategories = async (): Promise<QuizCategory[]> => {
  const response = await axios.get(
    `${BASE_URL}/values/Categories?key=${API_KEY}`
  );

  return response.data.values.map((row: any[]) => ({
    id: row[0],
    name: row[1],
    icon: row[2],
    color: row[3],
  }));
};

export const fetchQuestionsByCategory = async (
  categoryId: string
): Promise<QuizQuestion[]> => {
  const response = await axios.get(
    `${BASE_URL}/values/Question${categoryId}?key=${API_KEY}`
  );

  return response.data.values.slice(1).map((row: any[]) => {
    const options = row.slice(2, 6);
    return {
      id: row[0],
      question: row[1],
      options: options,
      correctAnswer: options[0],
      timeLimit: parseInt(row[6], 10),
    };
  });
};
