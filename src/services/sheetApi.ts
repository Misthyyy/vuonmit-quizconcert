/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { QuizQuestion, QuizCategory } from "../types/quiz";

// Replace with your published Google Sheet ID
const SHEET_ID = "1BwF_5IR_0MGFD_yHugypiBKN5qMNHWA5vQcT7QeCqf4";
const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}`;
const API_KEY = "AIzaSyADK7u-ptZPZZSpRnS-RQk1vgcIRRgd46w";

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
    `${BASE_URL}/values/Questions?key=${API_KEY}`
  );

  return response.data.values
    .filter((row: any[]) => row[5] === categoryId)
    .map((row: any[]) => ({
      id: row[0],
      question: row[1],
      options: [row[2], row[3], row[4], row[5]].filter(Boolean),
      correctAnswer: parseInt(row[6]),
      category: row[5],
      timeLimit: parseInt(row[6]) || 30,
    }));
};
