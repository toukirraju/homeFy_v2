import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

export const setReload = createAsyncThunk(
  "common/reload",
  async (args, thunkAPI) => {
    try {
      // const data = await DashboardService.getYearlyBill(year);
      // return data;
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
  isReload: false,
  isPending: false,
};

const reloadSlice = createSlice({
  name: "reload",
  initialState,

  extraReducers: {
    ////////////////// setReload /////////////////////
    [setReload.pending]: (state, action) => {
      state.isPending = true;
      state.isReload = false;
    },
    [setReload.fulfilled]: (state, action) => {
      state.isPending = false;
      state.isReload = true;
    },
    [setReload.rejected]: (state, action) => {
      state.isPending = false;
      state.isReload = false;
    },
  },
});

const { reducer } = reloadSlice;
export default reducer;
