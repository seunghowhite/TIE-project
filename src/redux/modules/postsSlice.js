import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../hooks/getToken";
import { apis } from "../../shared/axios";

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  posts: [],
};

//메인페이지 데이터 불러오기
export const __getPosts = createAsyncThunk(
  "GET_POSTS",
  async (payload, thunkAPI) => {
    try {
      const response = await apis.get(`api/posts`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    };
  }
);

//게시글 삭제
export const __deletePost = createAsyncThunk(
  "DELETE_POST",
  async (payload, thunkAPI) => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      try {
        const [token, tokenPayload] = getToken();
        const response = await apis.delete(`/api/posts/${payload.postId}`, {
          headers: { authorization: `Bearer ${token}` }
        });
        const postList = payload.posts.filter((item) => item.postId !== Number(payload.postId));
        return thunkAPI.fulfillWithValue({ data: response.data, posts: postList });
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.errorMessage);
      }
    }
  }
);

const postsSlice = createSlice({
  name: "postList",
  initialState,
  reducers: {},
  extraReducers: {
    //GET_POSTS
    [__getPosts.pending]: (state, action) => {
      //로딩중
      state.isLoading = true;
      state.isError = false;
    },
    [__getPosts.fulfilled]: (state, action) => {
      //응답 성공
      state.isLoading = false;
      state.isError = false;
      state.posts = action.payload;
    },
    [__getPosts.rejected]: (state, action) => {
      //응답 실패
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },

    //게시글 삭제
    [__deletePost.pending]: (state, action) => {
      //로딩중
      state.isLoading = true;
      state.isError = false;
    },
    [__deletePost.fulfilled]: (state, action) => {
      //응답 성공
      state.isLoading = false;
      state.isError = false;
      state.posts = action.payload.posts;
    },
    [__deletePost.rejected]: (state, action) => {
      //응답 실패
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  }
});

export default postsSlice.reducer;