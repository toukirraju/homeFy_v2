import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admins: [],
  pagination: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getAdmins: (state, action) => {
      state.admins = [...state.admins, ...action.payload.admins];
      state.pagination = action.payload.pagination;
    },
  },
});

export const { getAdmins } = profileSlice.actions;
export default profileSlice.reducer;
