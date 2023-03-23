import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loding from "../components/Loding";
import { MainPostCard } from "../components/PostComponents";
import { MainContainer, PostCard } from "../components/StyledComponents";
import { __getPosts } from "../redux/modules/postsSlice";

//메인페이지
function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, error, posts } = useSelector((state) => {
    return state.postsSlice;
  });
  useEffect(() => {
    dispatch(__getPosts());
    console.log(posts);
  }, [JSON.stringify(posts)]);

  if (isLoading) {
    return <Loding />;
  } else if (isError) {
    alert(error);
  };

  return (
    <>
      <Header />
      <MainContainer>
        {posts?.map((item) => {
          return (
            <Link to={`/posts/${item.postId}`} key={item.postId}>
              <PostCard>
                <MainPostCard
                  img={item.img}
                  title={item.title}
                  nickname={item.nickname}
                  createdAt={item.createdAt}
                />
              </PostCard>
            </Link>
          );
        })}
      </MainContainer>
    </>
  );
}
export default Main;