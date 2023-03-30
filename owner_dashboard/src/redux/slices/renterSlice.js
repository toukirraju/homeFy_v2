import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import RenterService from "../services/renter.api.service";

//////////////////////////////////////////    Create  Renter      //////////////////////////////////////////
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

//////////////////////////////////////////     Get all Renters      //////////////////////////////////////////
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

export const getAllQueryrenters = createAsyncThunk(
  "mod/queryRenters",
  async ({ startRow, endRow }, thunkAPI) => {
    try {
      const data = await RenterService.getQueryRenters({
        startRow,
        endRow,
      });

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

//////////////////////////////////////////    Search  Renter      //////////////////////////////////////////
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

//////////////////////////////////////////    Update  Renter      //////////////////////////////////////////
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

//////////////////////////////////////////     Remove Renter      //////////////////////////////////////////
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
  loading: false,
  renters: [],
  searchData: null,
};

const renterSlice = createSlice({
  name: "renter",
  initialState,
  extraReducers: {
    //////////////////////////////////////////    Create  Renter      //////////////////////////////////////////
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
    //////////////////////////////////////////    Update  Renter      //////////////////////////////////////////
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
    //////////////////////////////////////////     All Renter      //////////////////////////////////////////
    [getAllrenters.pending]: (state, action) => {
      state.isPending = true;
      state.loading = true;
    },
    [getAllrenters.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.loading = false;
      state.renters = action.payload.renters;
    },
    [getAllrenters.rejected]: (state, action) => {
      state.isSuccess = false;
      state.loading = false;
      state.isPending = false;
    },
    //////////////////////////////////////////     Query Renter      //////////////////////////////////////////
    [getAllQueryrenters.pending]: (state, action) => {
      state.isPending = true;
    },
    [getAllQueryrenters.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.renters = action.payload.renters;
    },
    [getAllQueryrenters.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },
    //////////////////////////////////////////     Search Renter      //////////////////////////////////////////
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
    //////////////////////////////////////////     Remove Renter      //////////////////////////////////////////
    [removeRenter.pending]: (state, action) => {
      state.isPending = true;
    },
    [removeRenter.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [removeRenter.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },
  },
});

const { reducer } = renterSlice;
export default reducer;
