import React, { useState } from "react";
import axios from "axios";
import "./Singup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    id: "",
    pw: "",
    passwordCheck: "",
    nick: "",
    addr: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (form.pw !== form.passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    console.log("전체 입력값:", form);
  
    const { passwordCheck, ...requestData } = form;
  
    console.log("서버로 보낼 데이터:", requestData);
  
    try {
      await axios.post("http://192.168.219.70:8085/Signup/register", requestData);
      alert("회원가입 완료!");
      window.location.href = "/Login";  
    } catch (err) {
      console.error("회원가입 오류:", err);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <h2>가입을 위한 정보를 입력해주세요</h2>

      {step === 1 && (
        <>
          <label>아이디</label>
          <input
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="아이디를 입력해주세요."
          />

          <label>비밀번호</label>
          <input
            name="pw"
            type="password"
            value={form.pw}
            onChange={handleChange}
            placeholder="비밀번호 (8자 이상, 문자/숫자/기호 사용)"
          />

          <label>비밀번호 확인</label>
          <input
            name="passwordCheck"
            type="password"
            value={form.passwordCheck}
            onChange={handleChange}
            placeholder="비밀번호 확인"
          />

          <button onClick={handleNext}>다음</button>
          <button className="backs-button" onClick={function(){navigate("/login")}}>
            돌아가기
          </button>
        </>
      )}

      {step === 2 && (
        <>
          

          <label>이름</label>
          <input
            name="nick"
            value={form.nick}
            onChange={handleChange}
            placeholder="이름을 입력해주세요."
          />

          <label>주소</label>
          <input
            name="addr"
            value={form.addr}
            onChange={handleChange}
            placeholder="주소를 입력해주세요."
          />

          <label>전화번호</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="전화번호를 입력해주세요."
          />

          <button onClick={handleSubmit}>완료</button>
          
        </>
      )}
    </div>
  );
};

export default Signup;