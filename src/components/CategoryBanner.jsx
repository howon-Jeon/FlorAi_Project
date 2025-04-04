import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // 기본 스타일
import './styles/CategoryBanner.css';

const categoryTextMap = {
  ALL: 'ALL',
  사랑: '사랑',
  감사존경: '감사 · 존경',
  우정행복: '우정 · 행복',
  순수: '순수 · 희망',
  신비: '고귀함 · 신비',
  이별: '이별 · 슬픔',
};

const CategoryBanner = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  return (
    <div className="category-container">
      {/* 배너 영역 */}
      <div className="banners">
        <h1 className="banners-text">{categoryTextMap[selectedCategory]}</h1>
      </div>

      {/* Swiper로 구현한 카테고리 버튼 */}
      <div className="category-swiper-wrapper">
        <Swiper
          spaceBetween={12}
          slidesPerView="auto"
          className="category-swiper"
        >
          {Object.keys(categoryTextMap).map((key) => (
            <SwiperSlide key={key} className="swiper-slides">
              <button
                className={`category-button ${selectedCategory === key ? 'active' : ''}`}
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
