import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSlice from "./features/auth/authSlice";
import errorSlice from "./features/errorSlice";
import profileSlice from "./features/profile/profileSlice";
import houseSlice from "./features/house/houseSlice";
import ownerSlice from "./features/owner/ownerSlice";
import renterSlice from "./features/renter/renterSlice";
import apartmentSlice from "./features/apartment/apartmentSlice";
import billSlice from "./features/bills/billSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    profile: profileSlice,
    houses: houseSlice,
    owners: ownerSlice,
    renters: renterSlice,
    apartments: apartmentSlice,
    bills: billSlice,
    error: errorSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
