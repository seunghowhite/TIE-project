import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import { cookies } from '../shared/cookie';
import FormTemplate from '../components/FormTemplate';

//*작성페이지 토큰이 없으면 입장 불가.
function Form() {
  const token = cookies.get("token");

  //*가드 토큰이 없으면 내보내기.
  const navigator = useNavigate();
  useEffect(() => {
    if (!token) {
      alert("로그인이 필요한 서비스 입니다.")
      navigator("/login");
    }
  }, [])

  return (
    <>
      <Header />
      <FormTemplate token={token} />
    </>
  )
}


export default Form;