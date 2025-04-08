import React from 'react'
import Header from "../components/Header";
import Navbar from "../components/Navbar"
import cartImg from "../assets/icons/cart.svg";
import "./styles/OrderSucces.css";
const OrderSucces = () => {
  return (
  <div className="payment-success-page">
      <Header />

      <div className="payment-success-content">
        <img src={cartImg} alt="장바구니" className="cart-image" />
        <h2>결제가 완료되었습니다</h2>
        <p>이용해주셔서 감사합니다</p>
      </div>

      <Navbar />
    </div>
  );
}

export default OrderSucces