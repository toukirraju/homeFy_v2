import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import DashboardService from "../services/dashboard.service";

/////////////////////////  Activity widget  \\\\\\\\\\\\\\\\\\\\\\\\
export const getRenterActivity = createAsyncThunk(
  "dashboard/getRenterActivity",
  async (args, thunkAPI) => {
    try {
      const data = await DashboardService.getRenterActivityWidget();
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

/////////////////////////  Apartment widget  \\\\\\\\\\\\\\\\\\\\\\\\
export const getApartmentWidget = createAsyncThunk(
  "dashboard/getApartmentWidget",
  async (args, thunkAPI) => {
    try {
      const data = await DashboardService.getWidget();
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

/////////////////////////   Pie Chart  \\\\\\\\\\\\\\\\\\\\\\\\
export const getPieChartData = createAsyncThunk(
  "dashboard/getPieChartData",
  async (args, thunkAPI) => {
    try {
      const data = await DashboardService.getPieChartData();
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

/////////////////////////  Yearly Bills  \\\\\\\\\\\\\\\\\\\\\\\\
export const getYearlyBills = createAsyncThunk(
  "dashboard/getYearlyBill",
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

const initialState = {
  isReload: false,
  isSuccess: false,
  isPending: false,
  apartmentWidgets: {},
  yearlyBills: {},
  renterActivity: {},
  pieChartData: {},
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,

  extraReducers: {
    //////////////////// getRenterActivity /////////////////////
    [getRenterActivity.pending]: (state, action) => {
      state.isPending = true;
    },
    [getRenterActivity.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.renterActivity = action.payload;
    },
    [getRenterActivity.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

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

    //////////////////// getPieChartData /////////////////////
    [getPieChartData.pending]: (state, action) => {
      state.isPending = true;
    },
    [getPieChartData.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.pieChartData = action.payload;
    },
    [getPieChartData.rejected]: (state, action) => {
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
  },
});

const { reducer } = dashboardSlice;
export default reducer;
