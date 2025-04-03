import React from "react";
import bannerImage1 from "../assets/images/banner.svg"; // PNG or JPG도 가능
import "./Banner.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import bannerImage2 from "../assets/images/아이유 꽃.png"; 
const Banner = () => {
  return (
    <>
      <Swiper loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}>
        <SwiperSlide>
          <div className="banner">
            <img src={bannerImage1} alt="꽃 배너" className="banner-bg" />
            <div className="banner-text">
              <h1>
                당신의 마음을
                <br />
                꽃으로 전하세요
              </h1>
              <Link to="/aipick">
                <button className="banner-button">AI로 나만의<br/>꽃 찾기</button>
              </Link>
            </div>  
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner">
            <img src={bannerImage2} alt="꽃 배너" className="banner-bg" />
            <div className="banner-text">
              <h1>
                당신의 마음을
                <br />
                꽃으로 전하세요
              </h1>
              <Link to="/aipick">
                <button className="banner-button">AI로 나만의<br/>꽃 찾기</button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
