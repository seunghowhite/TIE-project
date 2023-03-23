import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
import { cookies } from "../shared/cookie";
import Logo from './Logo';
import Pencil from './pencil';
// import Pencil from './pencil';



function Header() {
  const navigator = useNavigate()
  const loaction = useLocation()
  // *쿠키 받아와서 토큰 값 저장. cookie get ()
  const token = cookies.get("token");

  const formHandler = () => {
    navigator('/posts')
  }
  const logInHandler = () => {
    navigator('/login')
  }
  const logOutHandler = () => {
    if (window.confirm('로그아웃 하실려구요?')) {
      cookies.remove("token")
      navigator(`/`)
    }
  }
  return (
    <HeaderContainer>
      <Logo>TIE</Logo>
      {token ? <StyledDiv>{cookies.get("nickname")}님</StyledDiv> : <StyledDiv></StyledDiv>}
      {'/posts' === loaction.pathname ? <SDiv /> : <Pencil onClick={formHandler} ></Pencil>}
      {!token ? <Button onClick={logInHandler} height={'38px'} width={'60px'}>login</Button> :
        <Button onClick={logOutHandler} height={'38px'} width={'60px'}>logout</Button>}
    </HeaderContainer >
  );
};

export default Header;


const HeaderContainer = styled.div`
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  height: 80px;
  justify-content:space-around;
`

const StyledDiv = styled.div`
  text-align: center;
  font-weight: bolder;
  margin-left: 30px;
  width: 100px;
`

const SDiv = styled.div`
  width: 25px;
  height: 25px;
`
