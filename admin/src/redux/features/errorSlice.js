import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: null,
  reducers: {
    setError: (state, action) => action.payload,
    clearError: (state) => null,
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
