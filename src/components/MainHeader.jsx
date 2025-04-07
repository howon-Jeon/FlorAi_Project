import React from 'react'
import logo from "../assets/icons/logo.svg";
import cartIcon from "../assets/icons/basket.svg";
import userIcon from "../assets/icons/profile.svg";
import "./styles/Header.css";
import { Link } from 'react-router-dom';


const MainHeader = () => {
  const userId = sessionStorage.getItem("userId");
  return (
    <header className="header">
      <div className="icon-logo">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="right-icons">
        <Link to="/mypage"><img src={userIcon} alt="User" className="icon user" /></Link>
        <Link to={`/basket/${userId}`}>
          <img src={cartIcon} alt="Cart" className="icon cart" />
        </Link>
      </div>
    </header>
  )
}

export default MainHeader