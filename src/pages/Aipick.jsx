import React, { useState } from "react";
import Header from "../components/Header";
import "./Aipick.css";
import { useNavigate } from "react-router-dom";

const Aipick = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const emotions1 = ["연인", "부모", "자식", "친구", "지인"];
  const emotions2 = ["사랑", "슬픔", "축하", "응원", "행복", "특별함"];
  const emotions3 = ["강렬한", "순수한", "영원한", "행복한", "따뜻한"];
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    setStep(2);
  };

  return (
    <div className="aipick-container">
      <Header />

      <div className="aipick-content">
        <div className="icon">🌸</div>

        {step === 1 && (
          <>
            <h2>지금 전하고 싶은 감정이 있다면 무엇인가요?</h2>

            <div className="emotion-list">
              {emotions1.map((emotion, idx) => (
                <button
                  key={idx}
                  className={`emotion-button ${
                    selected === emotion ? "selected" : ""
                  }`}
                  onClick={() => setSelected(emotion)}
                >
                  {emotion}
                </button>
              ))}
            </div>

            <div className="button-row">
              <button className="prev-button">이전</button>
              <button onClick={handleNext}
                className={`next-button ${!selected ? "disabled" : ""}`}
                disabled={!selected}
              >
                다음
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2>어떤 마음인가요?</h2>

            <div className="emotion-list">
              {emotions2.map((emotion, idx) => (
                <button
                  key={idx}
                  className={`emotion-button ${
                    selected === emotion ? "selected" : ""
                  }`}
                  onClick={() => setSelected(emotion)}
                >
                  {emotion}
                </button>
              ))}
            </div>

            <div className="button-row">
              <button className="prev-button">이전</button>
              <button
                className={`next-button ${!selected ? "disabled" : ""}`}
                disabled={!selected}
              >
                다음
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Aipick;
