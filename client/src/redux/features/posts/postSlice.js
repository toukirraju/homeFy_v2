import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "../../slices/message";
import { getFilteredPost, getMorePost, getPost } from "./thunkApi";

const initialState = {
  isLoading: false,
  isError: false,
  postResponse: {
    posts: [],
    totalPosts: 0,
  },
};

export const fetchPosts = createAsyncThunk(
  "post/fetch",
  async (args, thunkAPI) => {
    try {
      const data = await getPost();
      return data;
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

export const fetchMorePosts = createAsyncThunk(
  "post/morefetch",
  async (page, thunkAPI) => {
    try {
      const data = await getMorePost(page);
      //   console.log(data);
      return data;
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

export const fetchFilteredPosts = createAsyncThunk(
  "post/fetchFiltered",
  async ({ budget, rooms, homeId }, thunkAPI) => {
    try {
      const data = await getFilteredPost({ budget, rooms, homeId });
      //   console.log(data);
      return data;
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

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.postResponse = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder
      .addCase(fetchMorePosts.pending, (state) => {
        // state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchMorePosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.postResponse = {
          posts: [...state.postResponse.posts, ...action.payload.posts],
          totalPosts: Number(action.payload.totalPosts),
        };
      })
      .addCase(fetchMorePosts.rejected, (state) => {
        state.isLoading = false;
        // state.isError = true;
      });

    builder
      .addCase(fetchFilteredPosts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchFilteredPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.postResponse = action.payload;
      })
      .addCase(fetchFilteredPosts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default postSlice.reducer;
