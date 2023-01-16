import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import houseOwnerReducer from "./slices/ownerSlice";
import apartmentReducer from "./slices/apartmentSlice";
import renterReducer from "./slices/renterSlice";
import assignReducer from "./slices/assignRenterSlice";
import billReducer from "./slices/billSlice";
import publicReducer from "./slices/publicDataSlice";
import dashboardReducer from "./slices/dashboardSlice";
import reloadReducer from "./slices/reloadSlice";
import roleReducer from "./slices/roleSlice";
import postReducer from "./slices/postSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    houseInfo: houseOwnerReducer,
    posts: postReducer,
    apartmentInfo: apartmentReducer,
    renterInfo: renterReducer,
    assingRenter: assignReducer,
    billInfo: billReducer,
    publicData: publicReducer,
    dashboardData: dashboardReducer,
    role: roleReducer,
    reload: reloadReducer,
  },
  // devTools: false,
});
