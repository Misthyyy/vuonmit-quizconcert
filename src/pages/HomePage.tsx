import React, { useEffect } from "react";
// import CategorySelection from "../components/quiz/CategorySelection";
// import { QuizCategory } from "../types/quiz";
// import { fetchCategories } from "../services/sheetApi";
import { Banner } from "../components/Banner";

const HomePage: React.FC = () => {
  // const [categories, setCategories] = useState<QuizCategory[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        // const data = await fetchCategories();
        // setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        // setLoading(false);
      }
    };

    loadCategories();
  }, []);
  return (
    <>
      <Banner />
      {/* <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-pixel text-pixelpink-500 mb-2">QUIZ</h1>
          <p className="font-pixel text-sm">Chọn chủ đề để bắt đầu</p>
        </header>

        <CategorySelection categories={categories} loading={loading} />
      </div> */}
    </>
  );
};

export default HomePage;
