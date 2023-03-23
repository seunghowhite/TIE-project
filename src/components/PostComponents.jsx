import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cookies } from '../shared/cookie';
import { useNavigate } from 'react-router';
import { __deletePost } from '../redux/modules/postsSlice';
import { deleteComment } from '../utils/commentUtils';
import { fetchPost, imgResult, isUpdated } from '../utils/postUtils';
import { Authentication } from './Authentication';
import Button from './Button';
import { InputImgComponent } from './InputComponent';

/*메인페이지 post cardbox*/
export function MainPostCard({ img, title, nickname, createdAt }) {
  let alt = title;
  let arr = createdAt.split(' ');
  createdAt = arr[0];

  return (
    <>
      <InputImgComponent img={img} alt={alt} />
      <div>
        <h5>{title}</h5>
        <label>{nickname}</label>
        <label>{createdAt}</label>
      </div>
    </>
  );
};

/*게시물*/
export const PostComponent = ({ postId }) => {
  const { posts } = useSelector((state) => {
    return state.postsSlice;
  });
  const foudData = posts?.find((data) => data.postId == postId)
  const [onePost, setOnePost] = useState(null);
  const [updateResult, setUpdateResult] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = cookies.get("token");
  let tokenuserId = '';
  if (token) {
    tokenuserId = jwtDecode(token).userId;
  }

  const deletePost = () => {
    dispatch(__deletePost({ postId, posts }));
    alert("게시글이 삭제되었습니다.");
    navigate('/');
  };

  useEffect(() => {
    fetchPost({ postId, setOnePost, setUpdateResult });
  }, []);

  const goDetail = () => {
    if (tokenuserId !== foudData.userId) {
      alert("접근 권한이 없습니다.")
      return
    }
    navigate(`/update/${postId}`)
  }

  return (
    <>
      <h1>{onePost?.title}</h1>
      <div>
        <label>{onePost?.nickname}</label>
        <Authentication targetUserId={onePost?.userId}>
          <span>
            <Button onClick={goDetail}>수정</Button>
            <Button onClick={deletePost}>삭제</Button>
          </span>
        </Authentication>
      </div>
      <span>
        <label>{onePost?.createdAt}</label>
        {" "}
        {isUpdated(updateResult)}
      </span>
      {imgResult(onePost)}
      <pre>{onePost?.content}</pre>
    </>
  );
};

/*댓글*/
export const PostCommentComponent = ({ postId, userId, comment, comments, commentId, setComments }) => {
  return (
    <>
      <div className="post-comment">
        <div className="space-between">
          <span className="column">
            <label>{comment.nickname}</label>
            <label>{comment.createdAt}</label>
          </span>
          {/* 댓글 삭제 버튼 */}
          <Authentication targetUserId={userId}>
            <Button onClick={() => deleteComment({ postId, commentId, comments, setComments })}>
              삭제
            </Button>
          </Authentication>
        </div>
        <pre>{comment.comment}</pre>
      </div>
    </>
  );
}
