import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/quiz.png";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Banner: React.FC = () => {
  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }: { isVisible: boolean }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  <img src={headerImg} alt="Header Img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
