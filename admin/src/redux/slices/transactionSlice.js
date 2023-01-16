import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import Mod_manCommonService from "../services/mod_manCommon.service";

export const createBill = createAsyncThunk(
  "common/createBill",
  async (bill, thunkAPI) => {
    try {
      await Mod_manCommonService.createBill(bill);
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

export const getAllTransactions = createAsyncThunk(
  "common/getAllTransactions",
  async (arg, thunkAPI) => {
    try {
      const data = await Mod_manCommonService.getAllBill();

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

export const getMonthlyTransactions = createAsyncThunk(
  "common/getMonthlyTrans",
  async ({ month, year }, thunkAPI) => {
    try {
      const data = await Mod_manCommonService.getMonthlyBill({ month, year });

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

export const getPayableRenters = createAsyncThunk(
  "common/getPayableRenters",
  async ({ month, year }, thunkAPI) => {
    try {
      const data = await Mod_manCommonService.getPayableRenters({
        month,
        year,
      });

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

export const removeBill = createAsyncThunk(
  "mod/removeBill",
  async (_id, thunkAPI) => {
    try {
      await Mod_manCommonService.removeBill(_id);
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
//////////////////temp bill//////////////////

export const createTempBill = createAsyncThunk(
  "common/createTempBill",
  async (tempBill, thunkAPI) => {
    try {
      await Mod_manCommonService.createTempBill(tempBill);
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
export const getTempBill = createAsyncThunk(
  "common/getTempBill",
  async (renterId, thunkAPI) => {
    try {
      const data = await Mod_manCommonService.getTempBill(renterId);

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

export const getAllTempBill = createAsyncThunk(
  "common/getAllTempBill",
  async (args, thunkAPI) => {
    try {
      const data = await Mod_manCommonService.getAllTempBills();

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

export const updateTemp = createAsyncThunk(
  "common/updateTempBill",
  async (updatedData, thunkAPI) => {
    try {
      await Mod_manCommonService.updateTempBill(updatedData);
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
  temp: null,
  allTemp: [],
  transactions: [],
  payableRenters: [],
};

const transactiionSlice = createSlice({
  name: "common",
  initialState,
  extraReducers: {
    [createBill.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
    },
    [createBill.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isAdded = false;
    },

    [getMonthlyTransactions.pending]: (state, action) => {
      state.isPending = true;
    },
    [getMonthlyTransactions.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      state.isPending = false;
      state.transactions = action.payload;
    },

    [getMonthlyTransactions.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    [getPayableRenters.pending]: (state, action) => {
      state.isPending = true;
    },
    [getPayableRenters.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.payableRenters = action.payload;
    },

    [getPayableRenters.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    [getAllTransactions.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      state.transactions = action.payload;
    },
    [getAllTransactions.rejected]: (state, action) => {
      state.isSuccess = false;
    },

    [removeBill.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
    },
    [removeBill.rejected]: (state, action) => {
      state.isSuccess = false;
    },

    [createTempBill.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
    },
    [createTempBill.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isAdded = false;
    },

    [getTempBill.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      state.temp = action.payload;
    },
    [getTempBill.rejected]: (state, action) => {
      state.isSuccess = false;
    },

    [getAllTempBill.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      state.allTemp = action.payload;
    },
    [getAllTempBill.rejected]: (state, action) => {
      state.isSuccess = false;
    },
    [updateTemp.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
    },
    [updateTemp.rejected]: (state, action) => {
      state.isSuccess = false;
    },
  },
});

const { reducer } = transactiionSlice;
export default reducer;
