import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import NoAccessPage from "./pages/NoAccessPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz/:categoryId" element={<QuizPage />} />
      <Route path="/no" element={<NoAccessPage />} />
    </Routes>
  );
};

export default AppRoutes;
