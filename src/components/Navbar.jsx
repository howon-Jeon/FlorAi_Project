import React from 'react'
import "./BottomNav.css";
import homeIcon from "../assets/icons/Home.svg";
import bookIcon from "../assets/icons/Book.svg";
import aiIcon from "../assets/icons/Aipick.svg";
import shopIcon from "../assets/icons/Shop.svg";
import calendarIcon from "../assets/icons/story.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bottom-nav">
      <Link to="/" className="nav-item">
        <img src={homeIcon} alt="홈" className="icon" />
        <span>홈</span>
      </Link>
      <Link to="#" className="nav-item">
        <img src={bookIcon} alt="꽃 도감" className="icon" />
        <span>꽃 도감</span>
      </Link>
      <Link to="#" className="nav-item">
        <img src={aiIcon} alt="AI 추천" className="icon" />
        <span>AI 추천</span>
      </Link>
      <Link to="#" className="nav-item">
        <img src={shopIcon} alt="Shop" className="icon" />
        <span>Shop</span>
      </Link>
      <Link to="#" className="nav-item">
        <img src={calendarIcon} alt="기념일" className="icon" />
        <span>기념일</span>
      </Link>
    </nav>
  );
  
}

export default Navbar