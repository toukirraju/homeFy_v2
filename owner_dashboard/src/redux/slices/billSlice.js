import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import billService from "../services/bills.api.service";

export const payableUsers = createAsyncThunk(
  "bill/payableUsers",
  async ({ month, year }, thunkAPI) => {
    try {
      const data = await billService.getPayableRenters({ month, year });

      return { payableRenters: data };
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.response.data ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const monthlyBill = createAsyncThunk(
  "bill/monthly",
  async ({ month, year }, thunkAPI) => {
    try {
      const data = await billService.getMonthlyBill({ month, year });

      return { billData: data };
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.response.data ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const temporaryBill = createAsyncThunk(
  "bill/temporary",
  async (args, thunkAPI) => {
    try {
      const data = await billService.getTempBills();

      return { temporaryData: data };
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.response.data ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const renterTemporaryBill = createAsyncThunk(
  "bill/renterTemporary",
  async (renterId, thunkAPI) => {
    try {
      const data = await billService.getRenterTempBIll(renterId);

      return { renterTempBill: data };
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.response.data ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const createBill = createAsyncThunk(
  "bill/create",
  async (billData, thunkAPI) => {
    try {
      await billService.createBill(billData);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.response.data ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const createTemporaryBill = createAsyncThunk(
  "bill/tempCreate",
  async (tempBillData, thunkAPI) => {
    try {
      await billService.createTempBill(tempBillData);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.response.data ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updateTemporaryBill = createAsyncThunk(
  "bill/tempUpdate",
  async (tempBillData, thunkAPI) => {
    try {
      await billService.updateTempBill(tempBillData);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.response.data ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const removeBill = createAsyncThunk(
  "bill/remove",
  async (id, thunkAPI) => {
    try {
      await billService.removeBill(id);
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

export const removeTemporaryBill = createAsyncThunk(
  "temporaryBill/remove",
  async (id, thunkAPI) => {
    try {
      await billService.removeTempBill(id);
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
  isPending: false,
  success: false,
  billData: [],
  temporaryData: [],
  payableRenters: [],
  renterTempBill: {},
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  extraReducers: {
    [payableUsers.pending]: (state, action) => {
      state.isPending = true;
    },
    [payableUsers.fulfilled]: (state, action) => {
      state.isPending = false;
      state.success = true;
      state.payableRenters = action.payload.payableRenters;
    },
    [payableUsers.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },

    [monthlyBill.pending]: (state, action) => {
      state.isPending = true;
    },
    [monthlyBill.fulfilled]: (state, action) => {
      state.isPending = false;
      state.success = true;
      state.billData = action.payload.billData;
    },
    [monthlyBill.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },
    [temporaryBill.pending]: (state, action) => {
      state.isPending = true;
    },
    [temporaryBill.fulfilled]: (state, action) => {
      state.isPending = false;
      state.success = true;
      state.temporaryData = action.payload.temporaryData;
    },
    [temporaryBill.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },
    [renterTemporaryBill.pending]: (state, action) => {
      state.isPending = true;
    },
    [renterTemporaryBill.fulfilled]: (state, action) => {
      state.isPending = false;
      state.success = true;
      state.renterTempBill = action.payload.renterTempBill;
    },
    [renterTemporaryBill.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },
    [createBill.pending]: (state, action) => {
      state.isPending = true;
    },
    [createBill.fulfilled]: (state, action) => {
      state.success = true;
      state.isPending = false;
    },
    [createBill.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },

    [createTemporaryBill.pending]: (state, action) => {
      state.isPending = true;
    },
    [createTemporaryBill.fulfilled]: (state, action) => {
      state.success = true;
      state.isPending = false;
    },
    [createTemporaryBill.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },

    [updateTemporaryBill.pending]: (state, action) => {
      state.isPending = true;
    },
    [updateTemporaryBill.fulfilled]: (state, action) => {
      state.success = true;
      state.isPending = false;
    },
    [updateTemporaryBill.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },

    [removeBill.pending]: (state, action) => {
      state.isPending = true;
    },
    [removeBill.fulfilled]: (state, action) => {
      state.success = true;
      state.isPending = false;
    },
    [removeBill.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },

    [removeTemporaryBill.pending]: (state, action) => {
      state.isPending = true;
    },
    [removeTemporaryBill.fulfilled]: (state, action) => {
      state.success = true;
      state.isPending = false;
    },
    [removeTemporaryBill.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },
  },
});

const { reducer } = billSlice;
export default reducer;
