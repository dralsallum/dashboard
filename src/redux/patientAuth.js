import { createSlice } from "@reduxjs/toolkit";

const patientAuthSlice = createSlice({
  name: "patientAuth",
  initialState: {
    currentPatient: null,
    accessToken: null,
    refreshToken: null,
    isFetching: false,
    error: null,
    errorMessage: null,
  },
  reducers: {
    // ── Login ─────────────────────────────────────────────────────
    loginStart(state) {
      state.isFetching = true;
      state.error = false;
      state.errorMessage = null;
    },
    loginSuccess(state, action) {
      const { accessToken, refreshToken, ...userData } = action.payload;
      state.isFetching = false;
      state.error = false;
      state.currentPatient = userData;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      // redux-persist writes to localStorage automatically via persist:root
    },
    loginFailure(state, action) {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload || "فشل تسجيل الدخول";
    },

    // ── Register ──────────────────────────────────────────────────
    registerStart(state) {
      state.isFetching = true;
      state.error = false;
      state.errorMessage = null;
    },
    registerSuccess(state, action) {
      const { accessToken, refreshToken, ...userData } = action.payload;
      state.isFetching = false;
      state.error = false;
      state.currentPatient = userData;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      // redux-persist writes to localStorage automatically via persist:root
    },
    registerFailure(state, action) {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload || "فشل إنشاء الحساب";
    },

    // ── Logout ────────────────────────────────────────────────────
    logout(state) {
      state.currentPatient = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = false;
      state.errorMessage = null;
      // redux-persist clears its slice automatically on next persist cycle
    },

    // ── Delete Account ────────────────────────────────────────────
    deleteStart(state) {
      state.isFetching = true;
      state.error = false;
      state.errorMessage = null;
    },
    deleteSuccess(state) {
      state.isFetching = false;
      state.currentPatient = null;
      state.accessToken = null;
      state.refreshToken = null;
      // redux-persist clears its slice automatically on next persist cycle
    },
    deleteFailure(state, action) {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload || "فشل حذف الحساب";
    },

    // ── Token Refresh ─────────────────────────────────────────────
    refreshTokenSuccess(state, action) {
      const { accessToken, refreshToken, ...userData } = action.payload;
      state.currentPatient = userData;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      // redux-persist writes to localStorage automatically via persist:root
    },

    // ── Clear error ───────────────────────────────────────────────
    clearError(state) {
      state.error = false;
      state.errorMessage = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  refreshTokenSuccess,
  clearError,
} = patientAuthSlice.actions;

// ── Thunks ─────────────────────────────────────────────────────────
export const loginPatient = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const { publicRequest } = await import("../requestMethods");
    const res = await publicRequest.post("/patient-auth/login", credentials);
    dispatch(loginSuccess(res.data));
    return { success: true };
  } catch (err) {
    const msg = err.response?.data?.message || "فشل تسجيل الدخول";
    dispatch(loginFailure(msg));
    return { success: false, message: msg };
  }
};

export const registerPatient = (formData) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const { publicRequest } = await import("../requestMethods");
    const res = await publicRequest.post("/patient-auth/register", formData);
    dispatch(registerSuccess(res.data));
    return { success: true };
  } catch (err) {
    const msg = err.response?.data?.message || "فشل إنشاء الحساب";
    dispatch(registerFailure(msg));
    return { success: false, message: msg };
  }
};

// patientRequest is a singleton with an interceptor that always reads
// the latest token from persist:root — no need to pass the token manually.
export const deletePatientAccount = (password) => async (dispatch) => {
  dispatch(deleteStart());
  try {
    const { patientRequest } = await import("../requestMethods");
    await patientRequest.delete("/patient-auth/delete-account", {
      data: { password },
    });
    dispatch(deleteSuccess());
    return { success: true };
  } catch (err) {
    const msg = err.response?.data?.message || "فشل حذف الحساب";
    dispatch(deleteFailure(msg));
    return { success: false, message: msg };
  }
};

export const refreshPatientToken = () => async (dispatch, getState) => {
  try {
    const { publicRequest } = await import("../requestMethods");
    const { patientAuth } = getState();
    const res = await publicRequest.post("/patient-auth/refresh", {
      refreshToken: patientAuth.refreshToken,
    });
    dispatch(refreshTokenSuccess(res.data));
    return { success: true };
  } catch {
    dispatch(logout());
    return { success: false };
  }
};

export default patientAuthSlice.reducer;
