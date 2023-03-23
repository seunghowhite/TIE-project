import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import FormTemplate from '../components/FormTemplate';
import Header from '../components/Header'
import { cookies } from '../shared/cookie';
import defaltImg from "../assets/image/defalt-img.jpg";
import { __getPosts } from "../redux/modules/postsSlice";

//수정
function Update() {
  const token = cookies.get("token");
  const dispatch = useDispatch();
  const [postList, setPostList] = useState();
  const { posts } = useSelector((state) => {
    return state.postsSlice;
  });
  console.log('posts', posts);
  let decodetoken = null;
  if (token) {
    decodetoken = jwtDecode(token);
  }
  const navigator = useNavigate();
  const param = useParams();
  const id = param.postId
  const foudData = posts?.find((data) => data.postId === Number(id));
  console.log(foudData, 'fondData');
  let foundimg = null
  if (foudData.img && !foudData.img && foudData.img !== 'false') {
    foundimg = `${process.env.REACT_APP_IMAGE_URL}` + foudData.img
  }


  const foundtitle = foudData.title
  const foundcontent = foudData.content

  //*가드 토큰이 없으면 내보내기.
  useEffect(() => {
    if (!token) {
      alert("로그인이 필요한 서비스 입니다.");
      navigator("/login");
    }
    if (foudData.userId !== decodetoken.userId) {
      alert("작성자가 아닙니다!");
      navigator("/");
    }
    dispatch(__getPosts());
  }, [])

  return (
    < >
      <Header />
      <FormTemplate id={id} foundtitle={foundtitle} foundimg={foundimg} foundcontent={foundcontent} token={token} />
    </>
  )
}

export default Update;
