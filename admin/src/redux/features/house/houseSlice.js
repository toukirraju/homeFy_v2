import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  houses: [],
  pagination: {},
};

const houseSlice = createSlice({
  name: "house",
  initialState,
  reducers: {
    getHouses: (state, action) => {
      const { houses } = action.payload;
      houses.forEach((house) => {
        // Check if the house already exists in the houses array
        const existingHouse = state.houses.find((a) => a._id === house._id);

        if (!existingHouse) {
          // Add the house to the array if it doesn't already exist
          state.houses.push(house);
        }
      });
      state.pagination = action.payload.pagination;
    },
  },
});

export const { getHouses } = houseSlice.actions;
export default houseSlice.reducer;
