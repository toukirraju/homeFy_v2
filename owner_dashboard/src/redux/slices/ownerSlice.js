import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ownerService from "../services/owner.api.service";

////********* Get Personal info ************\\\\
export const GetProfileInfo = createAsyncThunk(
  "owner/getpersonalinfo",
  async (args, thunkAPI) => {
    try {
      const data = await ownerService.getPersonalInfo();

      return { profileData: data };
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

//********* Update owner Personal Profile ************//
export const UpdatePersonalProfile = createAsyncThunk(
  "owner/UpdatePersonalProfile",
  async (formData, thunkAPI) => {
    try {
      const data = await ownerService.updateOwnerPersonalProfile(formData);
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

////********* Create new home ************\\\\
export const CreateHouse = createAsyncThunk(
  "owner/CreateHouse",
  async (formData, thunkAPI) => {
    try {
      const data = await ownerService.createNewHouse(formData);
      // thunkAPI.dispatch(setMessage(data.message));

      // return { houses: data };
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

////********* Get All Houses ************\\\\
export const GetHouses = createAsyncThunk(
  "owner/gethouses",
  async (args, thunkAPI) => {
    try {
      const data = await ownerService.getAllHouses();

      return { houses: data };
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

////********* Update House info ************\\\\
export const UpdateHouse = createAsyncThunk(
  "owner/UpdateHouse",
  async (formData, thunkAPI) => {
    try {
      const data = await ownerService.updateHouseInfo(formData);
      // thunkAPI.dispatch(setMessage(data.message));

      // return { houses: data };
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

////********* Delete House ************\\\\
export const DeleteHouse = createAsyncThunk(
  "owner/DeleteHouse",
  async (formData, thunkAPI) => {
    try {
      const data = await ownerService.deleteHouse(formData);
      // thunkAPI.dispatch(setMessage(data.message));

      // return { houses: data };
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

////********* Make Default House ************\\\\
export const MakeDefaultHouse = createAsyncThunk(
  "owner/defaultHouse",
  async (formData, thunkAPI) => {
    try {
      const data = await ownerService.makeDefaultHouse(formData);
      // thunkAPI.dispatch(setMessage(data.message));

      // return { houses: data };
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

////********* Assign manager role ************\\\\
export const AssignRole = createAsyncThunk(
  "owner/assignRole",
  async (formData, thunkAPI) => {
    try {
      const data = await ownerService.assignRole(formData);
      // thunkAPI.dispatch(setMessage(data.message));

      // return { houses: data };
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

////********* Get Assigned managers ************\\\\
export const GetManagers = createAsyncThunk(
  "owner/allManager",
  async (args, thunkAPI) => {
    try {
      const data = await ownerService.getAllAssignedManagers();
      // thunkAPI.dispatch(setMessage(data.message));

      return { managers: data };
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

////********* Search Manager ************\\\\
export const SearchManager = createAsyncThunk(
  "owner/searchManager",
  async (formData, thunkAPI) => {
    try {
      const data = await ownerService.searchManager(formData);
      // thunkAPI.dispatch(setMessage(data.message));
      return data;
      // return { houses: data };
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

////********* Remove manager role ************\\\\
export const RemoveRole = createAsyncThunk(
  "owner/RemoveRole",
  async (formData, thunkAPI) => {
    try {
      const data = await ownerService.removeRole(formData);
      // thunkAPI.dispatch(setMessage(data.message));
      // return data
      // return { houses: data };
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

const initialState = {
  isPending: false,
  success: false,
  profileData: {},
  houses: [],
  managers: [],
};

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  extraReducers: {
    //********* owner Personal Profile ************//
    [GetProfileInfo.pending]: (state, action) => {
      state.isPending = true;
    },
    [GetProfileInfo.fulfilled]: (state, action) => {
      state.isPending = false;
      state.success = true;
      state.profileData = action.payload.profileData;
    },
    [GetProfileInfo.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },

    //********* Update owner Personal Profile ************//
    [UpdatePersonalProfile.pending]: (state, action) => {
      state.isPending = true;
    },
    [UpdatePersonalProfile.fulfilled]: (state, action) => {
      state.isPending = false;
      state.success = true;
      // state.houseData = action.payload.houseData;
    },
    [UpdatePersonalProfile.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },

    ////********* Create new home ************\\\\
    [CreateHouse.pending]: (state, action) => {
      state.isPending = true;
    },
    [CreateHouse.fulfilled]: (state, action) => {
      state.isPending = false;
      state.success = true;
    },
    [CreateHouse.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },

    ////********* Get All Houses ************\\\\
    [GetHouses.pending]: (state, action) => {
      state.isPending = true;
    },
    [GetHouses.fulfilled]: (state, action) => {
      state.isPending = false;
      state.success = true;
      state.houses = action.payload.houses;
    },
    [GetHouses.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },

    ////********* Update House info ************\\\\
    [UpdateHouse.pending]: (state, action) => {
      state.isPending = true;
    },
    [UpdateHouse.fulfilled]: (state, action) => {
      state.isPending = false;
      state.success = true;
    },
    [UpdateHouse.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },

    ////********* Delete House ************\\\\
    [DeleteHouse.pending]: (state, action) => {
      state.isPending = true;
    },
    [DeleteHouse.fulfilled]: (state, action) => {
      state.isPending = false;
      state.success = true;
    },
    [DeleteHouse.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },

    ////********* Make Default House ************\\\\
    [MakeDefaultHouse.pending]: (state, action) => {
      state.isPending = true;
    },
    [MakeDefaultHouse.fulfilled]: (state, action) => {
      state.isPending = false;
      state.success = true;
    },
    [MakeDefaultHouse.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },

    ////********* Assign manager role ************\\\\
    [AssignRole.pending]: (state, action) => {
      state.isPending = true;
    },
    [AssignRole.fulfilled]: (state, action) => {
      state.isPending = false;
      state.success = true;
    },
    [AssignRole.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },

    ////********* Get Assigned managers ************\\\\
    [GetManagers.pending]: (state, action) => {
      state.isPending = true;
    },
    [GetManagers.fulfilled]: (state, action) => {
      state.isPending = false;
      state.success = true;
      state.managers = action.payload.managers;
    },
    [GetManagers.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },
    ////********* Search Manager ************\\\\
    [SearchManager.pending]: (state, action) => {
      state.isPending = true;
    },
    [SearchManager.fulfilled]: (state, action) => {
      state.isPending = false;
      state.success = true;
    },
    [SearchManager.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },
    ////********* Remove manager role ************\\\\
    [RemoveRole.pending]: (state, action) => {
      state.isPending = true;
    },
    [RemoveRole.fulfilled]: (state, action) => {
      state.isPending = false;
      state.success = true;
    },
    [RemoveRole.rejected]: (state, action) => {
      state.isPending = false;
      state.success = false;
    },
  },
});

const { reducer } = ownerSlice;
export default reducer;
