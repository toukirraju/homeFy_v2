import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import PostService from "../services/post.api.service";

export const createPost = createAsyncThunk(
  "post/create",
  async (post, thunkAPI) => {
    try {
      const data = await PostService.createPost(post);
      return { apartments: data };
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

export const getUserPosts = createAsyncThunk(
  "post/UserPosts",
  async (args, thunkAPI) => {
    try {
      const data = await PostService.getUserPost();

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

export const update = createAsyncThunk(
  "apartment/updateApartment",
  async (updatedData, thunkAPI) => {
    try {
      await PostService.updateApartment(updatedData);
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

export const removeLevels = createAsyncThunk(
  "apartment/removeLevels",
  async (apartmentId, thunkAPI) => {
    try {
      await PostService.removeApartment(apartmentId);
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
  userPosts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: {
    [createPost.pending]: (state, action) => {
      state.isPending = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      // state.apartmentData = action.payload.apartments;
    },
    [createPost.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    [update.pending]: (state, action) => {
      state.isPending = true;
      state.isSuccess = false;
    },
    [update.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      // state.apartments = action.payload;
    },
    [update.rejected]: (state, action) => {
      state.isSuccess = false;
    },
    [getUserPosts.pending]: (state, action) => {
      state.isPending = true;
      state.isSuccess = false;
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      // state.apartments = action.payload;
      state.userPosts = action.payload.posts;
    },
    [getUserPosts.rejected]: (state, action) => {
      state.isSuccess = false;
      state.apartmentData = [];
    },
    [removeLevels.pending]: (state, action) => {
      state.isPending = true;
      state.isSuccess = false;
    },
    [removeLevels.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [removeLevels.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },
  },
});

const { reducer } = postSlice;
export default reducer;
