import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./styles/Result.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";


const Result = () => {

  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("flowerResults");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setRecommendations(parsed.recommendations || []);
    }
  }, []);

  const getSeason = (item) => {
    const seasons = [];
    if (item.spring) seasons.push("봄");
    if (item.summer) seasons.push("여름");
    if (item.fall) seasons.push("가을");
    if (item.winter) seasons.push("겨울");
    return seasons.length > 0 ? seasons.join(", ") : "정보 없음";
  };

  return (
    <div className="result-wrapper">
      <div className="result-container">
        <Header />
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          spaceBetween={50}
          slidesPerView={1}
        >
          {recommendations.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flower-card">
                <img
                  src={"/assets/images/flowershop/" + item.image}
                  alt={item.name}
                  className="flower-image"
                />

                <div className="flower-info">
                  <h2 className="flower-name">{item.name}</h2>

                  <div className="flower-meta ">
                    <div>
                      <div className="meta-label ">향기</div>
                      <p>{item.flwSml || "무향"}</p>
                    </div>
                    <div>
                      <div className="meta-label">계절</div>
                      <p>{getSeason(item)}</p>
                    </div>
                    <div>
                      <div className="meta-label">알러지</div>
                      <p>{item.allergy === "1" ? "O" : "X"}</p>
                    </div>
                  </div>

                  <div className="flower-lang badge">{item.flwLang}</div>

                  <div className="flower-reason"><p>추천 이유</p>{item.reason}</div>

                  <div className="button-group">
                    <button className="cancel-button" onClick={function(){navigate("/")}} >취소</button>
                    <button className="buy-button" onClick={() => navigate(`/product/${item.id}`)}>구매하기</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Result;
