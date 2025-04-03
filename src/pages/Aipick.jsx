import React, { useState } from "react";
import Header from "../components/Header";
import "./Aipick.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
const Aipick = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const [answers, setAnswers] = useState({
    대상: "",
    감정: "",
    세부감정: "",
    향기선호: "",
  });

  const emotionMap = {
    사랑: {
      step: 3,
      label: "어떤 사랑을 전달할까요?",
      options: ["강렬한", "순수한", "영원한", "따뜻한", "행복한"],
    },
    슬픔: {
      step: 4,
      label: "어떤 슬픔을 전달할까요?",
      options: ["위로", "그리움", "애도", "후회"],
    },
    축하: {
      step: 5,
      label: "어떤 축하를 전달할까요?",
      options: ["졸업", "생일", "합격", "출산", "승진", "개업"],
    },
    응원: {
      step: 6,
      label: "어떤 응원을 전달할까요?",
      options: ["새로운 시작", "합격 기원", "격려", "꿈을 향한 도전"],
    },
    행복: {
      step: 7,
      label: "어떤 행복을 전달할까요?",
      options: ["영원한 행복", "순수한 행복", "함께한 행복", "다가올 행복"],
    },
    특별함: {
      step: 8,
      label: "어떤 특별함을 전달할까요?",
      options: ["비밀스러운", "신비한", "마법같은", "고귀한", "고급스러운"],
    },
  };

  const handleNext = () => {
    if (step === 1 && selected) {
      setAnswers((prev) => ({ ...prev, 대상: selected }));
      setSelected(null);
      setStep(2);
    } else if (step === 2 && selected) {
      setAnswers((prev) => ({ ...prev, 감정: selected }));
      const next = emotionMap[selected];
      setSelected(null);
      setStep(next?.step || 9);
    } else if ([3, 4, 5, 6, 7, 8].includes(step) && selected) {
      setAnswers((prev) => ({ ...prev, 세부감정: selected }));
      setSelected(null);
      setStep(9);
    } else if (step === 9 && selected) {
      const finalAnswers = { ...answers, 향기선호: selected };
      setAnswers(finalAnswers);

      setLoading(true); // ✅ 로딩 시작

      const payload = { query: finalAnswers };

      console.log("서버에 전송할 데이터:", JSON.stringify(payload, null, 2)); // ✅ 형식 예쁘게 보기 좋게 출력
      console.log("POST URL:", "http://192.168.219.70:8085/api/recommend");
      console.log("Headers:", { "Content-Type": "application/json" });
      
      
      const queryArray = Object.values(finalAnswers);
      console.log("전송할 쿼리 배열:", queryArray);
      axios
        .post(
          "http://192.168.219.70:8085/api/recommend",
          { query: queryArray }, // Send as an array instead of an object
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("전송 성공!");
          console.log("🪷 AI 추천 응답 전체:", res.data);
        
          // 각각 주요 필드 확인
          console.log("📌 확장된 쿼리 (expanded_query):", res.data.expanded_query);
          console.log("📌 감정 카테고리 (emotion_category):", res.data.emotion_category);
          console.log("📌 추천 결과 리스트 (recommendations):");
          res.data.recommendations.forEach((item, idx) => {
            console.log(`  [${idx + 1}] 꽃 이름: ${item.name}`);
            console.log(`     꽃말: ${item.flw_lang}`);
            console.log(`     이미지 URL: ${item.flw_img}`);
            console.log(`     추천 이유: ${item.reason}`);
          });
          console.log("전송 성공:", res.data);
          navigate("/result");
        })
        .catch((err) => {
          console.log("전송 실패:", err);
          alert("데이터 전송에 실패했습니다.");
        })
        .finally(() => {
          setLoading(false); // ✅ 로딩 종료
        });
    }
  };

  const handlePrev = () => {
    if (step === 9) setStep(3); // 이전 감정 단계로
    else if ([3, 4, 5, 6, 7, 8].includes(step)) setStep(2);
    else if (step === 2) setStep(1);
  };

  // 감정별 세부 질문 추출
  const currentEmotion = emotionMap[answers.감정];

  // 향기 선택 항목 (step 9)
  const fragranceOptions = ["강하게", "은은하게", "쿨하게"];

  const getQuestionAndOptions = () => {
    if (step === 1)
      return {
        question: "누구에게 전하고 싶나요?",
        options: ["연인", "부모", "자식", "친구", "지인"],
      };
    if (step === 2)
      return {
        question: "지금 전하고 싶은 감정은?",
        options: Object.keys(emotionMap),
      };
    if ([3, 4, 5, 6, 7, 8].includes(step))
      return {
        question: currentEmotion?.label,
        options: currentEmotion?.options,
      };
    if (step === 9)
      return {
        question: "당신의 마음을 향기로 표현한다면?",
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

        <div className="emotion-list">
          {options.map((item, idx) => (
            <button
              key={idx}
              className={`emotion-button ${
                selected === item ? "selected" : ""
              }`}
              onClick={() => setSelected(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="button-row">
          {/* step 1일 땐 이전 버튼 숨기기 */}
          {step !== 1 ? (
            <button className="prev-button" onClick={handlePrev}>
              이전
            </button>
          ) : (
            <div></div> // 빈 div로 공간 유지
          )}

          <button
            className={`next-button ${!selected ? "disabled" : ""}`}
            disabled={!selected}
            onClick={handleNext}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default Aipick;
