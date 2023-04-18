import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { message: action.payload };
    },
    setError: (state, action) => {
      return { errorMessage: action.payload };
    },
    clearMessage: () => {
      return { message: "", errorMessage: "" };
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setMessage, setError, clearMessage } = actions;
export default reducer;
