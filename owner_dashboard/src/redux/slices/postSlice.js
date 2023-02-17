import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import PostService from "../services/post.api.service";

////////////////////// Create Post \\\\\\\\\\\\\\\\\\\\\\\
export const createPost = createAsyncThunk(
  "post/create",
  async (post, thunkAPI) => {
    try {
      await PostService.createPost(post);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
////////////////////// Get Specific Houses Post \\\\\\\\\\\\\\\\\\\\\\\
export const getSpecificHousePosts = createAsyncThunk(
  "post/UserPosts",
  async (args, thunkAPI) => {
    try {
      const data = await PostService.getSpecificHousePosts();

      return { posts: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

////////////////////// Post Widget \\\\\\\\\\\\\\\\\\\\\\\
export const getPostWidget = createAsyncThunk(
  "post/widget",
  async (args, thunkAPI) => {
    try {
      const data = await PostService.postWidget();
      return { widgets: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
////////////////////// Delete Post \\\\\\\\\\\\\\\\\\\\\\\
export const deletePost = createAsyncThunk(
  "apartment/deletePost",
  async (postId, thunkAPI) => {
    try {
      await PostService.deletePost(postId);
      // return { apartments: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  isSuccess: false,
  isPending: false,
  specificPosts: [],
  widgetData: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: {
    ////////////////////// Create Post \\\\\\\\\\\\\\\\\\\\\\\
    [createPost.pending]: (state, action) => {
      state.isPending = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [createPost.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },
    ////////////////////// Post Widget \\\\\\\\\\\\\\\\\\\\\\\
    [getPostWidget.pending]: (state, action) => {
      state.isPending = true;
      state.isSuccess = false;
    },
    [getPostWidget.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.widgetData = action.payload.widgets;
    },
    [getPostWidget.rejected]: (state, action) => {
      state.isSuccess = false;
      state.widgetData = {};
    },
    ////////////////////// Get Specific Houses Post \\\\\\\\\\\\\\\\\\\\\\\
    [getSpecificHousePosts.pending]: (state, action) => {
      state.isPending = true;
      state.isSuccess = false;
    },
    [getSpecificHousePosts.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.specificPosts = action.payload.posts;
    },
    [getSpecificHousePosts.rejected]: (state, action) => {
      state.isSuccess = false;
      state.apartmentData = [];
    },
    ////////////////////// Delete Post \\\\\\\\\\\\\\\\\\\\\\\
    [deletePost.pending]: (state, action) => {
      state.isPending = true;
      state.isSuccess = false;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [deletePost.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },
  },
});

const { reducer } = postSlice;
export default reducer;
