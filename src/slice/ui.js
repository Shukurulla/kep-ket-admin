import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    activePage: "",
    showSide: true,
    toast: {},
  },
  reducers: {
    changeActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    changeShowSide: (state, action) => {
      state.showSide = action.payload;
    },
    showToast: (state, action) => {
      state.toast = action.payload;
    },
  },
});

export const { changeActivePage, changeShowSide, showToast } = uiSlice.actions;
export default uiSlice.reducer;
