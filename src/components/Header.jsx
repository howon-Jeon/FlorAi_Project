import React from "react";
import "./styles/Header.css";
import backIcon from "../assets/icons/Arrow_back.svg";
import cartIcon from "../assets/icons/basket.svg";
import userIcon from "../assets/icons/profile.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = sessionStorage.getItem("userId"); // ✅ 사용자 ID 불러오기

  const goBack = () => {
    navigate(-1);
  };

  const getTitle = () => {
    const path = location.pathname;

    if (path.startsWith("/product/")) return "상품 정보";

    switch (path) {
      case "/aipick":
        return "AI PICK";
      case "/signup":
        return "회원가입";
      case "/mypage":
        return "마이페이지";
      case "/result":
        return "추천 결과";
      case "/shop":
        return "Shop";
      case "/floword":
        return "꽃말 도감";
      case `/basket/${userId}`:
        return "장바구니";
      case `/order`:
        return "주문서 작성";
      case `/order-success`:
        return "주문 완료";
      default:
        return "페이지";
    }
  };

  return (
    <header className="header">
      <div className="icon-button" onClick={goBack}>
        <img src={backIcon} alt="Back" className="icon back" />
      </div>
      <h1 className="title">{getTitle()}</h1>
      <div className="right-icons">
        <Link to="/mypage">
          <img src={userIcon} alt="User" className="icon user" />
        </Link>
        <Link to={`/basket/${userId}`}>
          <img src={cartIcon} alt="Cart" className="icon cart" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
