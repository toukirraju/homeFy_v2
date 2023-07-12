import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apartments: [],
  pagination: {},
};

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {
    getApartments: (state, action) => {
      const { apartments } = action.payload;
      apartments.forEach((apartment) => {
        // Check if the apartment already exists in the apartments array
        const existingApartment = state.apartments.find(
          (a) => a._id === apartment._id
        );

        if (!existingApartment) {
          // Add the apartment to the array if it doesn't already exist
          state.apartments.push(apartment);
        }
      });
      state.pagination = action.payload.pagination;
    },
  },
});

export const { getApartments } = apartmentSlice.actions;
export default apartmentSlice.reducer;
