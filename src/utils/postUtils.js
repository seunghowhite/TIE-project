import { InputImgComponent } from "../components/InputComponent";
import { apis } from "../shared/axios";

export const fetchPost = async({postId, setOnePost, setUpdateResult}) => {
  const postResponse = await apis.get(`api/posts/${postId}`);
  setOnePost(postResponse?.data?.post);
  setUpdateResult(postResponse?.data?.isUpdate);
};

//게시물에 img 존재할때만 보이기
export const imgResult = (onePost) => {
  return onePost?.img !== "false" && <InputImgComponent img={onePost?.img} alt={onePost?.title}/>;
};

//수정된 게시물이면 옆에 "수정됨" 띄워줌
export const isUpdated = (updateResult) => {
  return updateResult === true && <label>수정됨</label>;
};