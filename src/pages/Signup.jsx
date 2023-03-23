import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../components/Button'
import { Input } from '../components/Input'
import Logo from '../components/Logo'
import useInput from '../hooks/useInput'
import { apis } from '../shared/axios'
import { cookies } from '../shared/cookie'


function Signup() {
  const navigator = useNavigate()
  const [userID, userIDHandler] = useInput(``)
  const [nickName, nickNameHandler] = useInput(``)
  const [userPW, userPWHandler] = useInput(``)
  const [confirmPW, confirmPWHandler] = useInput(``)
  const [checkId, setCheckId] = useState(true)

  //*정규식
  // 영문, 숫자 (한글,특수기호,공백 불가능) 3~12자리
  const idCheck = /^[a-zA-Z0-9]{3,12}$/;
  // 영문, 숫자 (한글,특수기호,공백 불가능) 8~30자리
  const pwCheck = /^[a-zA-Z0-9]{8,30}$/;
  //!영어 한글 숫자 2~10자리(특수문자 공백 불가능)
  const nickNameCheck = /^[a-zA-Z가-힣0-9]{2,10}$/;


  //*회원가입
  const singnUpHandler = async (e) => {
    e.preventDefault()
    if (userPW !== confirmPW || !pwCheck.test(userPW)) {
      alert("비밀번호를 확인하세요")
      return
    }
    if (!nickNameCheck.test(nickName)) {
      alert("닉네임을 확인하세요")
    }
    if (!nickNameCheck.test(nickName)) {
      alert("닉네임을 확인하세요")
    }
    if (checkId) {
      alert("중복확인이 필요합니다.")
      return
    }

    const userInpo = {
      userId: userID,
      nickname: nickName,
      password: userPW,
      confirm: confirmPW,
    }
    try {
      const result = await apis.post('/api/signup', userInpo)
      alert(`회원가입 성공!! ${nickName}님 안녕하세요`)
      navigator("/");
    }
    catch (e) {
      console.log(e);
    }
  }

  //*아이디 중복확인
  const checkID = async () => {
    const checkinpo = { userId: userID, }
    try {
      const result = await apis.post('/api/signup/check', checkinpo)
      setCheckId(result.duplicationResult)
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


  // TODO닉네임 체크 디바운싱 필요함.


  return (
    <SubmitForm onSubmit={singnUpHandler}>
      <Logo />
      <BoxDiv>
        <div>
          <div style={{ display: 'inline-block' }}>
            <Input inputtype={'line'} value={userID} onChange={userIDHandler} width={'200px'} placeholder={'아이디입력'} required></Input>
          </div>
          <div style={{ display: 'inline-block' }} >
            <Button type={'button'} onClick={checkID}>중복확인</Button>
          </div>
          {
            !userID ? <StyledComentDiv color={'red'}>영문, 숫자 (한글,특수기호,공백 불가능) 3~12자리</StyledComentDiv > :
              !checkId ? <StyledComentDiv color={'green'}>사용가능한 아이디입니다.</StyledComentDiv> :
                <StyledComentDiv color={'red'}>중복 확인을 해주세요</StyledComentDiv>
          }
        </div>
        <div>
          <Input inputtype={'line'} value={nickName} onChange={nickNameHandler} width={'250px'} placeholder={'닉네임입력'} required></Input>
          {
            !nickName ? <StyledComentDiv color={'red'}>한글, 영문, 숫자만 가능하며 2-10자리 가능.</StyledComentDiv> :
              true === nickNameCheck.test(nickName) ? <StyledComentDiv color={'green'} >사용가능합니다</StyledComentDiv> :
                <StyledComentDiv color={'red'}> 형식을 확인해 주세요</StyledComentDiv>
          }
        </div>
        <div>
          <Input inputtype={'line'} type='password' value={userPW} onChange={userPWHandler} width={'250px'} placeholder={'비밀번호 입력'} required></Input>
          {
            !userPW ? <StyledComentDiv color={'red'}> 영어 숫자 8~30자리(특수문자 공백 불가능)</StyledComentDiv> :
              true === pwCheck.test(userPW) ? <StyledComentDiv color={'green'} >사용가능합니다</StyledComentDiv> :
                <StyledComentDiv color={'red'}> 형식을 확인해 주세요</StyledComentDiv>
          }
        </div>
        <Input inputtype={'line'} type='password' value={confirmPW} onChange={confirmPWHandler} width={'250px'} placeholder={'비밀번호 확인'} required></Input>
      </BoxDiv>
      <Button width={'300px'} height={'40px'}>회원가입</Button>
    </SubmitForm >
  )
}

export default Signup

const SubmitForm = styled.form`
margin-top: 40%;
  display: flex;
  justify-content: center;
  gap:30px;
  flex-direction: column;
  align-items: center;
`

const BoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px
`

const StyledComentDiv = styled.div`
  color:${({ color }) => color};
  font-size:10px ;
  margin-top: 5px;

`