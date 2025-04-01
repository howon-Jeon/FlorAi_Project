import React from "react";
import "./Header.css";
import backIcon from "../assets/icons/Arrow_back.svg"; // 뒤로가기 아이콘 파일명에 맞게 수정하세요
import cartIcon from "../assets/icons/basket.svg";
import userIcon from "../assets/icons/profile.svg";
import { Link } from "react-router-dom";
const Header = () => {
  

  return (
    <header className="header">
      <div className="icon-button">
        <Link to="/back"><img src={backIcon} alt="Back" className="icon back" /></Link>
      </div>
      <h1 className="title">회원가입</h1>
      <div className="right-icons">
        <Link to="#"><img src={userIcon} alt="User" className="icon user" /></Link>
        <Link to= "#"><img src={cartIcon} alt="Cart" className="icon cart" /></Link>
      </div>
    </header>
  );
};

export default Header;
