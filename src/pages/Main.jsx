//import React, { useEffect, useState } from 'react';
import MainHeader from '../components/MainHeader';
import Banner from '../components/Banner';
import Navbar from '../components/Navbar';
import IntroBox from '../components/IntroBox';
import Footer from '../components/Footer';
import aimethod from '../assets/images/AI사용법.png'

const Main = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userName, setUserName] = useState("");

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   const name = sessionStorage.getItem("userName");
  
  //   if (token) {
  //     setIsLoggedIn(true);
  //     setUserName(name || "사용자");
  //     console.log("✅ 로그인 상태: 토큰 있음");
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, []);

  return (
    <div>
      <MainHeader />
      <Banner />

      {/* {isLoggedIn ? (
        <div style={{ padding: '20px', fontWeight: 'bold' }}>
          안녕하세요, {userName}님! 
        </div>
      ) : (
        <div style={{ padding: '20px', fontWeight: 'bold' }}>
          로그인 후 이용해주세요.
        </div>
      )} */}

      <IntroBox />
      <img src={aimethod} alt='ai' style={{ width: '500px' }}></img>

      <Footer />
      <Navbar />
    </div>
  );
};

export default Main;
