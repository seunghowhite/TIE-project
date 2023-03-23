import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import { Input } from '../components/Input';
import Logo from '../components/Logo';
import useInput from '../hooks/useInput';
import { apis } from '../shared/axios';
import { cookies } from '../shared/cookie';

function Login() {
  const navigator = useNavigate()
  const [idValue, idHandler] = useInput('')
  const [pwValue, pwHandler] = useInput('')
  const logindata = {
    userId: idValue,
    password: pwValue
  }

  //*login POST
  const loginHandler = async (e) => {
    e.preventDefault();
    try {

      const logindata = {
        userId: idValue,
        password: pwValue
      }
      const result = await apis.post('api/login', logindata)
      const payload = jwtDecode(result.data.token)
      const nickname = payload.nickname
      cookies.set("token", result.data.token, { path: "/" })
      cookies.set("nickname", nickname, { path: "/" })
      alert(`로그인성공!! ${nickname} 님 안녕하세요!`)
      navigator("/")
    }
    catch (e) {
      alert(e.response.data.errorMessage)
    }
  }

  //*프론트 가드. 토큰값 가지고 있으면 홈으로
  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      navigator("/");
    }
  }, []);

  return (
    <>
      <SubmitForm onSubmit={loginHandler}>
        <Logo />
        <Input inputtype={'line'} value={idValue} onChange={idHandler} required width={'300px'} placeholder={'ID'} />
        <Input inputtype={'line'} value={pwValue} onChange={pwHandler} required width={'300px'} placeholder={'PassWord'} type={'password'} />
        <StyledDiv onClick={() => navigator('/signup')}>회원가입🏋️‍♂️</StyledDiv>
        <Button width={'300px'} height={'40px'}> 로그인</Button>
      </SubmitForm>
    </>
  )
}

export default Login;

const SubmitForm = styled.form`
margin-top: 40%;
  display: flex;
  justify-content: center;
  gap:40px;
  flex-direction: column;
  align-items: center;
`

const StyledDiv = styled.div`
  cursor: pointer;  
  font-weight:bolder;
`