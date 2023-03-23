import React from 'react'
import styled from 'styled-components';
import loading from '../assets/image/loading.gif';

function Loding() {
  return (
    <Background>
      <img src={loading} alt="로딩 중" />
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
    </Background>
  )
};

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff89;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;

export default Loding;