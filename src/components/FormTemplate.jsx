import React, { useState } from 'react'
import styled from 'styled-components'
import useInput from '../hooks/useInput'
import defaltImg from "../assets/image/defalt-img.jpg";
import { apis } from '../shared/axios';

import Button from './Button';
import { Input } from './Input';
import { useNavigate } from 'react-router-dom';

function FormTemplate({ token, foundtitle, foundimg, foundcontent, id }) {
  const navigator = useNavigate();
  const [title, titleHandler] = useInput(foundtitle || ``)
  const [content, contenthandler] = useInput(foundcontent || ``)
  const [img, setImg] = useState(foundimg ? foundimg : defaltImg)
  const [imgPreview, setImgPreview] = useState(foundimg ? foundimg : defaltImg);

  //* 제출하기.
  const submitPost = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('title', title)
    formdata.append('content', content)
    formdata.append('img', img)
    try {
      if (foundtitle && foundcontent) {
        const result = await apis.patch(`api/posts/${id}`, formdata, {
          headers: { authorization: `Bearer ${token}` }
        })
        alert('게시글 수정완료')
      } else {
        const result = await apis.post('api/posts', formdata, {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data"
          }
        })
        alert('게시글 작성완료')
      }
      navigator("/")
    } catch (e) {
      alert(e.response.data.errorMessage);
    }
  }

  const onImageHandler = (e) => {
    if (e.target.files.length) {
      let fileReader = new FileReader();
      let imgTarget = (e.target.files)[0];
      setImg(imgTarget)
      fileReader.readAsDataURL(imgTarget);
      fileReader.onload = function (e) {
        setImgPreview(e.target.result);
      }
    } else {
      setImgPreview("");
    }
  }


  return (
    <>
      <StyledForm onSubmit={submitPost}>
        <Input inputtype={'box'} value={title} onChange={titleHandler} width='300px' placeholder={'제목'} required></Input>
        <StyledImg src={imgPreview} name="profile_files" />
        <input type="file" accept="image/*" onChange={onImageHandler} />
        <Input texttype={'textarea'} inputtype={'box'} height={'100px'} value={content} onChange={contenthandler} width='300px' placeholder={'내용'} required></Input>
        {foundtitle && foundcontent ?
          <Button type={'submit'} width={'300px'} height={'40px'}>수정</Button> :
          <Button type={'submit'} width={'300px'} height={'40px'}>제출</Button>
        }
      </StyledForm>
    </>
  )
}

export default FormTemplate

const StyledForm = styled.form`
  margin: 50px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  
`
const StyledImg = styled.img`
  margin: 10px 0px;
  height: 200px;
  width: 300px;
  border-radius: 10px;
`