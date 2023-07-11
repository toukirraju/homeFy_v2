import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bills: [],
  temporaryBills: [],
  pagination: {},
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    getBills: (state, action) => {
      const { bills } = action.payload;
      bills.forEach((bill) => {
        // Check if the bill already exists in the bills array
        const existingBill = state.bills.find((a) => a._id === bill._id);

        if (!existingBill) {
          // Add the bill to the array if it doesn't already exist
          state.bills.push(bill);
        }
      });
      state.pagination = action.payload.pagination;
    },
    getTemporaryBills: (state, action) => {
      const { temporaryBills } = action.payload;
      temporaryBills.forEach((tempBill) => {
        // Check if the tempBill already exists in the temporaryBills array
        const existingTempBill = state.temporaryBills.find(
          (a) => a._id === tempBill._id
        );

        if (!existingTempBill) {
          // Add the tempBill to the array if it doesn't already exist
          state.temporaryBills.push(tempBill);
        }
      });
      state.pagination = action.payload.pagination;
    },
  },
});

export const { getBills, getTemporaryBills } = billSlice.actions;
export default billSlice.reducer;
