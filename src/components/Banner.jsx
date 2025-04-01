import React from "react";
import bannerImage from "../assets/images/banner.svg"; // PNG or JPG도 가능
import "./Banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner">
      <img src={bannerImage} alt="꽃 배너" className="banner-bg" />
      <div className="banner-text">
        <h1>당신의 마음을<br />꽃으로 전하세요</h1>
        <Link to="/aipick"><button className="banner-button">꽃 추천받기</button></Link>
      </div>
    </div>
  );
};

export default Banner;
