import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import RenterServices from "../services/renter.api.service";

export const assign = createAsyncThunk(
  "renter/assign",
  async (assignedData, thunkAPI) => {
    try {
      await RenterServices.assignRenter(assignedData);
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

export const unAssign = createAsyncThunk(
  "renter/unassign",
  async (unAssignedData, thunkAPI) => {
    try {
      await RenterServices.unAssignRenter(unAssignedData);
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

const initialState = { isSuccess: false, isPending: false };

const assignRenterSlice = createSlice({
  name: "assign_unassign",
  initialState,
  extraReducers: {
    [assign.pending]: (state, action) => {
      state.isPending = true;
    },
    [assign.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [assign.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },
    [unAssign.pending]: (state, action) => {
      state.isPending = true;
    },
    [unAssign.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [unAssign.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },
  },
});

const { reducer } = assignRenterSlice;
export default reducer;
