// settingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settingTab: "عام",
  loading: false,
  error: null,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSettingTab: (state, action) => {
      state.settingTab = action.payload;
    },
  },
});

export const { setSettingTab } = settingSlice.actions;
export default settingSlice.reducer;
