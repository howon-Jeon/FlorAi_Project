import React from 'react'
import logo from "../assets/icons/logos.svg";
import "./styles/Footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <span>회사소개</span>
        <span>|</span>
        <span>이용약관</span>
        <span>|</span>
        <span>개인정보처리방침</span>
        <span>|</span>
        <span>이용안내</span>
      </div>
      <div className="footer-names">전호원 이석현 김성하</div>
      <div className="footer-logo">
        <img src={logo} alt="플로라이" />
      </div>
    </footer>
  )
}

export default Footer