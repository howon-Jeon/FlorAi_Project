import React from 'react'
import logo from "../assets/icons/logo.svg";
import cartIcon from "../assets/icons/basket.svg";
import userIcon from "../assets/icons/profile.svg";
import "./MainHeader.css";

const MainHeader = () => {
  return (
    <header className="header">
      <div className="icon-logo">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="right-icons">
        <img src={userIcon} alt="User" className="icon user" />
        <img src={cartIcon} alt="Cart" className="icon cart" />
      </div>
    </header>
  )
}

export default MainHeader