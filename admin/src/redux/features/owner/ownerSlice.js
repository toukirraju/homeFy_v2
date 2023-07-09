import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  owners: [],
  pagination: {},
};

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    getOwners: (state, action) => {
      const { owners } = action.payload;
      owners.forEach((owner) => {
        // Check if the owner already exists in the owners array
        const existingOwner = state.owners.find((a) => a._id === owner._id);

        if (!existingOwner) {
          // Add the owner to the array if it doesn't already exist
          state.owners.push(owner);
        }
      });
      state.pagination = action.payload.pagination;
    },
  },
});

export const { getOwners } = ownerSlice.actions;
export default ownerSlice.reducer;
