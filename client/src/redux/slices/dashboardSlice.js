import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import DashboardService from "../services/dashboard.service";

export const getApartmentWidget = createAsyncThunk(
  "common/getApartmentWidget",
  async (args, thunkAPI) => {
    try {
      const data = await DashboardService.getApartmentWidget();
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

export const getRenterWidget = createAsyncThunk(
  "common/getRenterWidget",
  async (args, thunkAPI) => {
    try {
      const data = await DashboardService.getRenterWidget();
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

export const getBillWidget = createAsyncThunk(
  "common/getBillWidget",
  async (args, thunkAPI) => {
    try {
      const data = await DashboardService.getBillWidget();
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

export const getYearlyBills = createAsyncThunk(
  "common/getYearlyBill",
  async (year, thunkAPI) => {
    try {
      const data = await DashboardService.getYearlyBill(year);
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
  isSuccess: false,
  isPending: false,
  apartmentWidgets: {},
  renterWidgets: {},
  billWidgets: {},
  yearlyBills: {},
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  extraReducers: {
    //////////////////// getApartmentWidget /////////////////////
    [getApartmentWidget.pending]: (state, action) => {
      state.isPending = true;
    },
    [getApartmentWidget.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.apartmentWidgets = action.payload;
    },
    [getApartmentWidget.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    //////////////////// getRenterWidget /////////////////////
    [getRenterWidget.pending]: (state, action) => {
      state.isPending = true;
    },
    [getRenterWidget.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.renterWidgets = action.payload;
    },
    [getRenterWidget.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    //////////////////// getBillWidget /////////////////////
    [getBillWidget.pending]: (state, action) => {
      state.isPending = true;
    },
    [getBillWidget.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.billWidgets = action.payload;
    },
    [getBillWidget.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    //////////////////// getYearlyBills /////////////////////
    [getYearlyBills.pending]: (state, action) => {
      state.isPending = true;
    },
    [getYearlyBills.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.yearlyBills = action.payload;
    },
    [getYearlyBills.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

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

const { reducer } = dashboardSlice;
export default reducer;
