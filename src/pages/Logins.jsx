import React, { useState } from "react";
import "./Login.css";
import logo from "../assets/icons/logo-no.svg";
import { Link, useNavigate } from "react-router-dom";


const Logins = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://192.168.219.70:8085/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, pwd }),
      });
  
      if (!res.ok) {
        throw new Error("로그인 실패");
      }
  
      const data = await res.json();
  
      sessionStorage.setItem("userId", data.userId);   
      sessionStorage.setItem("token", data.token);     
      sessionStorage.setItem("userName", data.name);  
  
      alert("로그인 성공!");
      window.location.href = navigate("/"); // 또는 navigate("/mypage")
    } catch (error) {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      console.error("로그인 오류:", error);
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="플로라이 로고" className="login-logo" />

      <div className="input-box">
      <input
          type="text"
          name="id"
          placeholder="아이디를 입력해주세요."
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>

      <div className="input-box">
      <input
          type="password"
          name="pwd"
          placeholder="비밀번호를 입력해주세요."
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
      </div>

      <div className="login-links">
        <Link to="/Singup" style={{ textDecoration: "none", color: "#666"}}><span>회원가입</span></Link>
        <span className="divider">|</span>
        <span>비밀번호 찾기</span>
      </div>

      <button className="login-button" onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default Logins;
