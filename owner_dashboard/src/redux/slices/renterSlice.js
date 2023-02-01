import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import RenterService from "../services/renter.api.service";

export const createRenter = createAsyncThunk(
  "renter/create",
  async (formData, thunkAPI) => {
    try {
      const data = await RenterService.createRenter(formData);
      // return  data
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

export const getAllrenters = createAsyncThunk(
  "mod/getRenters",
  async (args, thunkAPI) => {
    try {
      const data = await RenterService.getAllRenter();

      return { renters: data };
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

export const searchRenter = createAsyncThunk(
  "renter/getRenter",
  async (searchId, thunkAPI) => {
    try {
      const data = await RenterService.findRenter(searchId);

      return { renter: data };
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

export const updateRenterInfo = createAsyncThunk(
  "renter/update",
  async (formData, thunkAPI) => {
    try {
      await RenterService.updateRenter(formData);
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

export const removeRenter = createAsyncThunk(
  "renter/remove",
  async (removeData, thunkAPI) => {
    try {
      await RenterService.removeRenter(removeData);
      // return { renters: data };
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
  renters: [],
  searchData: null,
};

const renterSlice = createSlice({
  name: "renter",
  initialState,
  extraReducers: {
    [createRenter.pending]: (state, action) => {
      state.isPending = true;
    },
    [createRenter.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      //   state.floors = action.payload.floors;
    },
    [createRenter.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    [updateRenterInfo.pending]: (state, action) => {
      state.isPending = true;
    },
    [updateRenterInfo.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      // state.data = action.payload;
    },
    [updateRenterInfo.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },
    [getAllrenters.pending]: (state, action) => {
      state.isPending = true;
    },
    [getAllrenters.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.renters = action.payload.renters;
    },
    [getAllrenters.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },
    [searchRenter.pending]: (state, action) => {
      state.isPending = true;
    },
    [searchRenter.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.searchData = action.payload.renter;
    },
    [searchRenter.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },
    [searchRenter.pending]: (state, action) => {
      state.isPending = true;
    },
    [removeRenter.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [removeRenter.rejected]: (state, action) => {
      state.isSuccess = false;
    },
  },
});

const { reducer } = renterSlice;
export default reducer;
