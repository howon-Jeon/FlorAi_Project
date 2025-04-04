import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import "./styles/Floword.css";

const Floword = () => {
  const [flowers, setFlowers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleScrollToTop = () => {
    const container = document.querySelector(".app-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await axios.get(
          "http://192.168.219.70:8085/FlowerWord"
        );
        console.log("받은 꽃 데이터:", response.data);
        setFlowers(response.data);
      } catch (error) {
        console.error("꽃 데이터를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchFlowers();
  }, []);

  const filteredFlowers = flowers.filter(
    (flower) =>
      flower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flower.flwLang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header />

      {/* 검색창 */}
      <div className="search-box">
        <input
          type="text"
          placeholder="찾고 싶은 꽃을 검색해보세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 꽃 카드 리스트 */}
      <div className="flower-grid">
        {filteredFlowers.map((flower) => (
          <div key={flower.id} className="flower-card">
            <img
              src={"/assets/images/flowerword/" + flower.img}
              alt={flower.name}
              className="flower-image-word"
            />
            <div className="flower-name-word">{flower.name}</div>
            <div className="flower-lang-word">{flower.flwLang}</div>
          </div>
        ))}
      </div>

      {/* 항상 보이는 위로가기 버튼 */}
      <button className="scroll-to-top" onClick={handleScrollToTop}>
        ↑
      </button>

      <Navbar />
    </div>
  );
};

export default Floword;
