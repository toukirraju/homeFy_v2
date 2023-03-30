import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  markerAddressHomeID: "",
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    getMarkerHomeID: (state, action) => {
      state.markerAddressHomeID = action.payload;
    },
  },
});

export const { getMarkerHomeID } = mapSlice.actions;
const { reducer } = mapSlice;
export default reducer;
