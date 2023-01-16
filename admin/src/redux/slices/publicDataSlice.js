import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import PublicService from "../services/public.service";

export const getProfileDetails = createAsyncThunk(
  "public/getProfileDetails",
  async (renterId, thunkAPI) => {
    try {
      const data = await PublicService.getProfileDetails(renterId);

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

// let temp;
const initialState = {
  isSuccess: false,
  isAdded: false,
  isPending: false,
  userDetails: {},
};

const publicDataSlice = createSlice({
  name: "public",
  initialState,
  extraReducers: {
    [getProfileDetails.pending]: (state, action) => {
      state.isPending = true;
    },
    [getProfileDetails.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      state.isPending = false;
      state.userDetails = action.payload;
    },

    [getProfileDetails.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },
  },
});

const { reducer } = publicDataSlice;
export default reducer;
