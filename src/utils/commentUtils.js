import { getToken } from "../hooks/getToken";
import { apis } from "../shared/axios";

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  main: [],
};

//댓글 가져오기
export const fetchComment = async(postId, setComments) => {
  const commentResponse = await apis.get(`api/posts/${postId}/comments`);
  setComments(commentResponse.data.comments);
};

//댓글 추가하기
export const addComment = async({postId, value, comments, setComments}) => {
  const [token, tokenPayload] = getToken();
  const comment = {comment: value};
  if(token) {
    try {
      const commentResponse = await apis.post(`api/posts/${postId}/comments`, comment, {
        headers: {authorization: `Bearer ${token}`},
      });
      console.log("response", commentResponse);
      console.log("createComment", commentResponse.data.createComment);
      setComments([...comments, commentResponse.data.createComment]);
      alert(commentResponse.data.message);
    } catch(error) {
      alert(error.response.data.errorMessage);
    }
  }
};

//댓글 삭제하기
export const deleteComment = async({postId, commentId, comments, setComments}) => {
  const [token, tokenPayload] = getToken();
  if(token) {
    if(window.confirm("댓글을 삭제하시겠습니까?")){
      try {
        await apis.delete(`api/posts/${postId}/comments/${commentId}`, {
          headers: {authorization: `Bearer ${token}`}
        });
        alert("삭제되었습니다.");
        setComments(comments.filter((item) => item.commentId !== commentId));
      } catch(error) {
        alert(error.response.data.errorMessage);
      }
    }
  }
};