import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import houseService from "../services/owner.api.service";

export const OwnerInfo = createAsyncThunk(
  "house/OwnerInfo",
  async (formData, thunkAPI) => {
    try {
      const data = await houseService.getHouseInfo(formData);
      // thunkAPI.dispatch(setMessage(data.message));

      return { houseData: data };
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.response.data ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updateHouseInfo = createAsyncThunk(
  "house/updateInfo",
  async (formData, thunkAPI) => {
    try {
      const data = await houseService.updateHouseInfo(formData);
      return { houseData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

// export const setUser = createAsyncThunk("auth/setUser", async (thunkAPI) => {
//   try {
//     const data = await AuthService.setUserData();
//     return { user: data };
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     thunkAPI.dispatch(setMessage(message));
//     return thunkAPI.rejectWithValue();
//   }
// });

// export const logout = createAsyncThunk("auth/logout", async () => {
//   await AuthService.logout();
// });

const user = JSON.parse(localStorage.getItem("profile"));
// let user;
// const decode = jwtDecode(user.token);
// console.log(decode);
const initialState = {
  isPending: false,
  success: false,
  houseData: null,
  // AuthService.setUserData()
};

// const token = JSON.parse(localStorage.getItem("auth_token"));
// // let user;
// const initialState = token
//   ? { isLoggedIn: true, user: AuthService.setUserData() }
//   : { isLoggedIn: false, user: null };

// const initialState = {
//   isLoggedIn: false,
//   user: {},
// };

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  extraReducers: {
    [OwnerInfo.pending]: (state, action) => {
      state.isPending = true;
    },
    [OwnerInfo.fulfilled]: (state, action) => {
      state.isPending = false;
      state.success = true;
      state.houseData = action.payload.houseData;
    },
    [OwnerInfo.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },
    [updateHouseInfo.pending]: (state, action) => {
      state.isPending = true;
    },
    [updateHouseInfo.fulfilled]: (state, action) => {
      state.success = true;
      state.isPending = false;
      state.houseData = action.payload.houseData;
    },
    [updateHouseInfo.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },
    // [setUser.fulfilled]: (state, action) => {
    //   state.isLoggedIn = true;
    //   state.user = action.payload.user;
    // },
    // [setUser.rejected]: (state, action) => {
    //   state.isLoggedIn = false;
    //   state.user = null;
    // },
    // [logout.fulfilled]: (state, action) => {
    //   state.isLoggedIn = false;
    //   state.user = null;
    //   // state.user = {};
    // },
  },
});

const { reducer } = ownerSlice;
export default reducer;
