import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ModeratorService from "../services/moderator.service";

export const getSub_Man = createAsyncThunk(
  "mod/getSub_Man",
  async (srcId, thunkAPI) => {
    try {
      const data = await ModeratorService.getSub_Man(srcId);
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

export const getRoledSub_Man = createAsyncThunk(
  "mod/getRoledSub_Man",
  async (args, thunkAPI) => {
    try {
      const data = await ModeratorService.getRoledMan();
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

export const assignRole = createAsyncThunk(
  "mod/assignRole",
  async ({ _id, assignData }, thunkAPI) => {
    try {
      await ModeratorService.updateRole({ _id, assignData });
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

export const removeRole = createAsyncThunk(
  "mod/removeRole",
  async (_id, thunkAPI) => {
    try {
      await ModeratorService.removeRole(_id);
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
  sub_manager: {},
  roled_sub_manager: [],
};

const roleSlice = createSlice({
  name: "search",
  initialState,
  extraReducers: {
    //////////////////// search user /////////////////////
    [getSub_Man.pending]: (state, action) => {
      state.isPending = true;
    },
    [getSub_Man.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.sub_manager = action.payload;
    },
    [getSub_Man.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    //////////////////// getRoledSub_Man /////////////////////
    [getRoledSub_Man.pending]: (state, action) => {
      state.isPending = true;
    },
    [getRoledSub_Man.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.roled_sub_manager = action.payload;
    },
    [getRoledSub_Man.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    //////////////////// assign Role /////////////////////
    [assignRole.pending]: (state, action) => {
      state.isPending = true;
    },
    [assignRole.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      // state.sub_manager = action.payload;
    },
    [assignRole.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },
  },

  //////////////////// remove Role /////////////////////
  [removeRole.pending]: (state, action) => {
    state.isPending = true;
  },
  [removeRole.fulfilled]: (state, action) => {
    state.isSuccess = true;
    state.isPending = false;
  },
  [removeRole.rejected]: (state, action) => {
    state.isSuccess = false;
    state.isPending = false;
  },
});

const { reducer } = roleSlice;
export default reducer;
