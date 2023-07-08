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
      // state.admins = [state.admins,  ...action.payload.admins];
      const { admins } = action.payload;
      admins.forEach((admin) => {
        // Check if the admin already exists in the admins array
        const existingAdmin = state.admins.find((a) => a._id === admin._id);

        if (!existingAdmin) {
          // Add the admin to the array if it doesn't already exist
          state.admins.push(admin);
        }
      });
      state.pagination = action.payload.pagination;
    },

    updateAdmin: (state, action) => {
      const { admin } = action.payload;
      state.admins = state.admins.map((existingAdmin) => {
        if (existingAdmin._id === admin._id) {
          return admin;
        }
        return existingAdmin;
      });
    },

    deleteAdmin: (state, action) => {
      // state.admins = [state.admins,  ...action.payload.admins];
      const { _id } = action.payload;

      // Check if the admin already exists in the admins array
      const updatedAdmins = state.admins.filter((a) => a._id !== _id);

      state.admins = updatedAdmins;
    },
  },
});

export const { getAdmins, deleteAdmin, updateAdmin } = profileSlice.actions;
export default profileSlice.reducer;
