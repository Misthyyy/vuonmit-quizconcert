import React from "react";
import { useNavigate } from "react-router-dom";
import { QuizCategory } from "../../types/quiz";

type CategorySelectionProps = {
  categories: QuizCategory[];
  loading: boolean;
};

const CategorySelection: React.FC<CategorySelectionProps> = ({
  categories,
  loading,
}) => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/quiz/${categoryId}`);
  };

  if (loading) {
    return (
      <div className="text-center font-pixel text-pixelpink-500">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategorySelect(category.id)}
          className="pixel-button p-6 flex flex-col items-center gap-3 rounded"
          style={{ backgroundColor: category.color }}
        >
          <div className="text-3xl">{category.icon}</div>
          <div className="text-white text-sm">{category.name}</div>
        </button>
      ))}
    </div>
  );
};

export default CategorySelection;
