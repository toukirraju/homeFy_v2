import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./slices/message";

import mapReducer from "./features/map/mapSlice";
import { apiSlice } from "./api/apiSlice";
import postSlice from "./features/posts/postSlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    post: postSlice,
    map: mapReducer,
    auth: authSlice,
    message: messageReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
