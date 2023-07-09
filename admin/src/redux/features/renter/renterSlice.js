import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  renters: [],
  pagination: {},
};

const renterSlice = createSlice({
  name: "renter",
  initialState,
  reducers: {
    getRenters: (state, action) => {
      const { renters } = action.payload;
      renters.forEach((renter) => {
        // Check if the renter already exists in the renters array
        const existingRenter = state.renters.find((a) => a._id === renter._id);

        if (!existingRenter) {
          // Add the renter to the array if it doesn't already exist
          state.renters.push(renter);
        }
      });
      state.pagination = action.payload.pagination;
    },
  },
});

export const { getRenters } = renterSlice.actions;
export default renterSlice.reducer;
