import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../requestMethods";

export const register = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const response = await publicRequest.post("/bus_auth/register", user);
      return response.data;
    } catch (error) {
      let message;
      if (error.response && error.response.data.message) {
        message = error.response.data.message;
      } else {
        message = error.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await publicRequest.post("/bus_auth/login", credentials);
      return response.data;
    } catch (error) {
      let message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateBusinessProfile = createAsyncThunk(
  "user/updateBusinessProfile",
  async ({ id, updateData }, thunkAPI) => {
    try {
      const response = await userRequest.put(`/business/${id}`, updateData);
      return response.data;
    } catch (error) {
      let message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateStoreName = createAsyncThunk(
  "user/updateStoreName",
  async ({ id, storeName }, thunkAPI) => {
    try {
      const response = await userRequest.put(`/business/storeName/${id}`, {
        storeName,
      });
      return response.data;
    } catch (error) {
      let message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  currentUser: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  isUpdating: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = "";
      state.isUpdating = false;
    },
    // Add reducer for optimistic updates
    updateStoreNameLocally: (state, action) => {
      if (state.currentUser) {
        state.currentUser.storeName = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.currentUser = action.payload;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(register.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.currentUser = action.payload;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      // Handle updateStoreName async thunk
      .addCase(updateStoreName.pending, (state) => {
        state.isUpdating = true;
        state.isError = false;
      })
      .addCase(updateStoreName.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.isSuccess = true;
        // Update the current user with the new data
        state.currentUser = { ...state.currentUser, ...action.payload };
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(updateStoreName.rejected, (state, action) => {
        state.isUpdating = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(updateBusinessProfile.pending, (state) => {
        state.isUpdating = true;
        state.isError = false;
      })
      .addCase(updateBusinessProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.isSuccess = true;
        // Merge the updated data with current user
        state.currentUser = { ...state.currentUser, ...action.payload };
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(updateBusinessProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

// Export the actions
export const {
  clearState,
  loginStart,
  loginSuccess,
  loginFailure,
  signOut,
  updateStoreNameLocally,
} = userSlice.actions;

export const userSelector = (state) => state.user;

export default userSlice.reducer;
