import React, { useEffect, useState } from "react";
import CategorySelection from "../components/quiz/CategorySelection";
import { QuizCategory } from "../types/quiz";
import { fetchCategories } from "../services/sheetApi";
import { Container, Row } from "react-bootstrap";

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);
  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <div>
            <img src="/img/quiz.png" alt="Header Img" />

            <span className="tagline">Chọn chủ đề để bắt đầu</span>

            <CategorySelection categories={categories} loading={loading} />
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default HomePage;
