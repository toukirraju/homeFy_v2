import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ApartmentService from "../services/apartment.api.service";

export const createMultiApartment = createAsyncThunk(
  "apartment/createMultiApartment",
  async (numOfapartment, thunkAPI) => {
    try {
      const data = await ApartmentService.createApartments(numOfapartment);
      return { apartments: data };
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

export const allApartments = createAsyncThunk(
  "apartment/getApartments",
  async (args, thunkAPI) => {
    try {
      const data = await ApartmentService.getApartments();

      return { apartments: data };
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

export const update = createAsyncThunk(
  "apartment/updateApartment",
  async (updatedData, thunkAPI) => {
    try {
      await ApartmentService.updateApartment(updatedData);
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

export const removeLevels = createAsyncThunk(
  "apartment/removeLevels",
  async (apartmentId, thunkAPI) => {
    try {
      await ApartmentService.removeApartment(apartmentId);
      // return { apartments: data };
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
  apartmentData: [],
};

const apartmentSlice = createSlice({
  name: "apartments",
  initialState,
  extraReducers: {
    [createMultiApartment.pending]: (state, action) => {
      state.isPending = true;
    },
    [createMultiApartment.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      // state.apartmentData = action.payload.apartments;
    },
    [createMultiApartment.rejected]: (state, action) => {
      state.isSuccess = false;
      state.apartments = null;
    },

    [update.pending]: (state, action) => {
      state.isPending = true;
      state.isSuccess = false;
    },
    [update.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      // state.apartments = action.payload;
    },
    [update.rejected]: (state, action) => {
      state.isSuccess = false;
    },
    [allApartments.pending]: (state, action) => {
      state.isPending = true;
      state.isSuccess = false;
    },
    [allApartments.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.apartmentData = action.payload.apartments;
    },
    [allApartments.rejected]: (state, action) => {
      state.isSuccess = false;
      state.apartmentData = [];
    },
    [removeLevels.pending]: (state, action) => {
      state.isPending = true;
      state.isSuccess = false;
    },
    [removeLevels.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [removeLevels.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },
  },
});

const { reducer } = apartmentSlice;
export default reducer;
