import React, { useState } from "react";
import Header from "../components/Header";
import "./styles/Aipick.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const Aipick = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [inputValue, setInputValue] = useState(""); // 주관식 입력 상태
  const [loading, setLoading] = useState(false);

  const [answers, setAnswers] = useState({
    성별: "",
    대상: "",
    감정: "",
    세부감정: "",
    향기선호: "",
  });

  const emotionMap = {
    사랑: { step: 4, label: "어떤 사랑을 전달할까요?", options: ["강렬한", "순수한", "영원한", "따뜻한", "행복한"] },
    슬픔: { step: 5, label: "어떤 슬픔을 전달할까요?", options: ["위로", "그리움", "이별", "화해"] },
    축하: { step: 6, label: "어떤 축하를 전달할까요?", options: ["졸업", "생일", "합격", "출산", "승진", "개업"] },
    응원: { step: 7, label: "어떤 응원을 전달할까요?", options: ["새로운 시작", "합격 기원", "격려", "꿈을 향한 도전"] },
    행복: { step: 8, label: "어떤 행복을 전달할까요?", options: ["영원한 행복", "순수한 행복", "함께한 행복", "다가올 행복"] },
    특별함: { step: 9, label: "어떤 특별함을 전달할까요?", options: ["비밀스러운", "신비한", "마법같은", "고귀한", "고급스러운"] },
  };

  const handleNext = () => {
    if (step === 1 && selected) {
      setAnswers((prev) => ({ ...prev, 성별: selected }));
      setSelected(null);
      setStep(2);
    } else if (step === 2 && inputValue.trim()) {
      setAnswers((prev) => ({ ...prev, 대상: inputValue.trim() }));
      setInputValue("");
      setStep(3);
    } else if (step === 3 && selected) {
      setAnswers((prev) => ({ ...prev, 감정: selected }));
      const next = emotionMap[selected];
      setSelected(null);
      setStep(next?.step || 10);
    } else if ([4, 5, 6, 7, 8, 9].includes(step) && selected) {
      setAnswers((prev) => ({ ...prev, 세부감정: selected }));
      setSelected(null);
      setStep(10);
    } else if (step === 10 && selected) {
      const finalAnswers = { ...answers, 향기선호: selected };
      setAnswers(finalAnswers);
      setLoading(true);

      const queryArray = Object.values(finalAnswers);
      axios
        .post("http://192.168.219.70:8085/api/recommend", { query: queryArray }, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log("전송 성공:", res.data);
          localStorage.setItem("flowerResults", JSON.stringify(res.data));
          navigate("/result");
        })
        .catch((err) => {
          console.error("전송 실패:", err);
          console.log("에러 응답:", err.response?.data);
          alert("데이터 전송에 실패했습니다.");
        })
        .finally(() => setLoading(false));
    }
  };

  const handlePrev = () => {
    if (step === 10) {
      const emotionStep = emotionMap[answers.감정]?.step || 3;
      setStep(emotionStep);
    } else if ([4, 5, 6, 7, 8, 9].includes(step)) setStep(3);
    else if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  const currentEmotion = emotionMap[answers.감정];

  const fragranceOptions = [
    "현실적이고 실용적인 스타일이에요",
    "감성적이고 분위기를 중요하게 여겨요",
    "차분하고 조용한 편이에요",
    "밝고 활발한 에너지를 가졌어요",
    "독특하고 개성 있는 매력을 가졌어요",
  ];

  const getQuestionAndOptions = () => {
    if (step === 1)
      return {
        question: "전하고 싶은 사람의 성별이 어떻게 되나요?",
        options: ["남성", "여성"],
      };
    if (step === 2)
      return {
        question: "누구에게 전하고 싶나요? (직접 입력해주세요)",
        options: null,
      };
    if (step === 3)
      return {
        question: "지금 전하고 싶은 감정은?",
        options: Object.keys(emotionMap),
      };
    if ([4, 5, 6, 7, 8, 9].includes(step))
      return {
        question: currentEmotion?.label,
        options: currentEmotion?.options,
      };
    if (step === 10)
      return {
        question: "이 꽃을 받는 사람은 어떤 사람인가요?",
        options: fragranceOptions,
      };
    return { question: "", options: [] };
  };

  const { question, options } = getQuestionAndOptions();

  return (
    <div className="aipick-container">
      {loading && <Loading />}
      <Header />
      <div className="aipick-content">
        <div className="icon">🌸</div>
        <h2>{question}</h2>

        {step === 2 ? (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="text-input"
            placeholder="ex) 여자친구, 어머니, 친구 등"
          />
        ) : (
          <div className="emotion-list">
            {options?.map((item, idx) => (
              <button
                key={idx}
                className={`emotion-button ${selected === item ? "selected" : ""}`}
                onClick={() => setSelected(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        <div className="button-row">
          {step !== 1 ? (
            <button className="prev-button" onClick={handlePrev}>
              이전
            </button>
          ) : (
            <div></div>
          )}

          <button
            className={`next-button ${
              (step === 2 && !inputValue.trim()) || (step !== 2 && !selected)
                ? "disabled"
                : ""
            }`}
            disabled={
              (step === 2 && !inputValue.trim()) || (step !== 2 && !selected)
            }
            onClick={handleNext}
          >
            {step === 10 ? "제출" : "다음"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Aipick;
