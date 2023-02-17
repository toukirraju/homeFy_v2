import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import PostService from "../services/post.api.service";

export const getTimelinePosts = createAsyncThunk(
  "post/Timeline",
  async (lastPostId, thunkAPI) => {
    // console.log(lastPostId);
    try {
      const data = await PostService.getTimelinePost(lastPostId);
      // console.log(data);
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

const initialState = {
  posts: [],
  status: "idle",
  error: null,
  hasMore: true,
  lastPostId: null,
  limit: 4, // set initial limit here
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
      state.status = "idle";
      state.error = null;
      state.hasMore = true;
      state.lastPostId = null;
      state.limit = 4; // reset limit when posts are reset
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTimelinePosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTimelinePosts.fulfilled, (state, action) => {
        // console.log(state.posts);
        state.status = "succeeded";
        state.posts = [...state.posts, ...action.payload.posts];
        if (action.payload.posts.length === 0) {
          state.hasMore = false;
        } else {
          state.lastPostId =
            action.payload.posts[action.payload.posts.length - 1]._id;
        }
      })
      .addCase(getTimelinePosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetPosts } = postSlice.actions;
const { reducer } = postSlice;
export default reducer;
