import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./styles/CategoryBanner.css";

const categoryTextMap = {
  ALL: "ALL",
  사랑: "사랑",
  감사존경: "감사 · 존경",
  우정행복: "우정 · 행복",
  순수: "순수 · 희망",
  신비: "고귀함 · 신비",
  이별: "이별 · 슬픔",
};

const CategoryBanner = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="category-container">
      {/* 배너 영역 */}
      <div className="banners">
        <div className="banners-text-wrapper">
          <h1 className="banners-text">{categoryTextMap[selectedCategory]}</h1>
          <span className="banners-textadd">
            플로라이는 1송이 기준으로 가격이 책정됩니다
          </span>
        </div>
      </div>

      {/* 카테고리 버튼 영역 */}
      <div className="category-swiper-wrapper">
        <Swiper
          spaceBetween={12}
          slidesPerView="auto"
          className="category-swiper"
        >
          {Object.keys(categoryTextMap).map((key) => (
            <SwiperSlide key={key} className="swiper-slides">
              <button
                className={`category-button ${
                  selectedCategory === key ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(key)}
              >
                {categoryTextMap[key]}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoryBanner;
