import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import AnniversaryModal from "../components/AnniversaryModal"; // 모달 import
import "./styles/AnniversaryPage.css";

const AnniversaryPage = () => {
  const [anniversaries, setAnniversaries] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchAnniversaries = async () => {
      try {
        const res = await axios.get("http://192.168.219.70:8085/anniversary");
        const sorted = res.data.sort((a, b) => a.dday - b.dday); // D-day 오름차순
        setAnniversaries(sorted);
      } catch (err) {
        console.error("기념일 불러오기 실패:", err);
        alert("기념일을 불러오는 데 실패했습니다.");
      }
    };

    fetchAnniversaries();
  }, []);

  const getFormattedDate = (month, day) => {
    const date = new Date(2025, month - 1, day); // 연도는 임시 고정
    const dayOfWeek = date.toLocaleDateString("ko-KR", { weekday: "short" });
    return `${month.toString().padStart(2, "0")}.${day
      .toString()
      .padStart(2, "0")}(${dayOfWeek})`;
  };

  const handleCardClick = (item) => {
    setSelected(item);
    setModalOpen(true);
  };

  return (
    <div>
      <Header />
      <div className="anniversary-container">
        {anniversaries.map((item) => (
          <div
            key={item.anniversaryId}
            className="anniversary-box"
            onClick={() => handleCardClick(item)}
          >
            <h3>{item.anniversaryName}</h3>
            <p className="date">{getFormattedDate(item.month, item.day)}</p>
            <div className="dday-box">D - {item.dday === 0 ? "Day":item.dday}</div>
          </div>
        ))}
      </div>
      <Navbar />

      {/* 모달 컴포넌트 */}
      {selected && (
        <AnniversaryModal
          visible={modalOpen}
          onClose={() => setModalOpen(false)}
          name={selected.anniversaryName}
          date={getFormattedDate(selected.month, selected.day)}
          desc={selected.anniversaryDesc}
        />
      )}
    </div>
  );
};

export default AnniversaryPage;
