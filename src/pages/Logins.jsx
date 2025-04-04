import React, { useState } from "react";
import "./styles/Login.css";
import logo from "../assets/icons/logo-no.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Logins = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  
  
  const handleLogin = async () => {
    try {
      const loginData = {
        id: id,
        pw: pwd,
      };
  
      // 보낼 데이터 콘솔에서 먼저 확인
      console.log("보내는 로그인 데이터:", loginData);
  
      const response = await axios.post("http://192.168.219.70:8085/Login/login", loginData);
  
      const { token, userId, name } = response.data;
      console.log("서버 응답:", response.data);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("userName", name);
      console.log("세션 토큰:", sessionStorage.getItem("token"));
      console.log("세션 사용자 이름:", sessionStorage.getItem("userName"));
      console.log("세션 사용자 ID:", sessionStorage.getItem("userId"));
  
      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };
  return (
    <div className="login-container" onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleLogin();
      }
    }}>
      
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
        <Link to="/Singup" style={{ textDecoration: "none", color: "#666" }}>
          <span>회원가입</span>
        </Link>
        <span className="divider">|</span>
        <span>비밀번호 찾기</span>
      </div>

      <button className="login-button" onClick={handleLogin}>
        로그인
      </button>
      <button className="back-button" onClick={function(){navigate("/")}}>
        돌아가기
      </button>
    </div>
  );
};

export default Logins;
