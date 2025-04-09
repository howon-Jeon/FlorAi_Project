import React from 'react';
import styled from 'styled-components';
import Spinner from '../assets/images/loading.gif'; // 경로 다시 확인

const Loading = () => {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src={Spinner} alt="로딩중" style={{ width: "80px", height: "80px" }} />
    </Background>
  );
};

export const Background = styled.div`
  position: absolute;
  width: 100vw;
  max-width: 500px;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb9;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;  
  justify-content: center;
`;

export const LoadingText = styled.div`
  color: #333; 
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 20px;
  font-family: "Pretendard-Bold", sans-serif;
`;

export default Loading;
