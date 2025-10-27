// tabSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "الرئيسية",
  storeName: "غير اسم المتجر",
  loading: false,
  error: null,
};

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setStoreName: (state, action) => {
      state.storeName = action.payload;
    },
  },
});

export const { setActiveTab, setStoreName } = tabSlice.actions;
export default tabSlice.reducer;
