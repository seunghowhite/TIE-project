import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from '../pages/Form';
import Login from '../pages/Login';
import Main from '../pages/Main';
import PostDetail from '../pages/PostDetail';
import Signup from '../pages/Signup';
import Update from '../pages/Update';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />                   {/*메인 페이지*/}
        <Route path="/login" element={<Login />} />              {/*로그인 페이지*/}
        <Route path="/signup" element={<Signup />} />           {/*회원가입 페이지*/}
        <Route path="/posts" element={<Form />} />              {/*게시글 작성 페이지*/}
        <Route path="/update/:postId" element={<Update />} />   {/*게시글 수정 페이지*/}
        <Route path="/posts/:postId" element={<PostDetail />} />{/*게시글 상세 페이지*/}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
