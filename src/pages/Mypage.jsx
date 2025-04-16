import React from "react";
import "./styles/Mypage.css";
import Header from "../components/Header"; // 재사용 헤더
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Mypage = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // 처음 진입했는지 확인할 수 있는 플래그
  const isFirstRender = React.useRef(true);

  const handleLogout = () => {
    sessionStorage.clear(); // 또는 sessionStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  useEffect(() => {
    // StrictMode로 인해 useEffect가 두 번 실행되는 것 방지
    if (!isFirstRender.current) return;
    isFirstRender.current = false;

    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      const name = sessionStorage.getItem("userName");
      if (name) setUserName(name);
    }
  }, [navigate]);

  return (
    <div className="mypage-container">
      <Header title="마이페이지" />

      <div className="mypage-welcome">
        안녕하세요, <strong>{userName || "고객"}님!</strong>
      </div>

      <ul className="mypage-menu">
        <li>
          공지사항 <span>›</span>
        </li>
        <li onClick={() => navigate(`/order-history`)}>
          주문내역 <span>›</span>
        </li>
        <li>
          이벤트 <span>›</span>
        </li>
        <li>
          고객센터 <span>›</span>
        </li>
        <li onClick={handleLogout}>
          로그아웃 <span>›</span>
        </li>
      </ul>
      <Navbar></Navbar>
    </div>
  );
};

export default Mypage;
