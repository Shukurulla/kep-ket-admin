import { createSlice } from "@reduxjs/toolkit";

const kassaSlice = createSlice({
  name: "kassa",
  initialState: {
    isLoading: true,
    reports: [],
  },
  reducers: {
    getReportsStart: (state) => {
      state.isLoading = true;
    },
    getReportsSuccess: (state, action) => {
      state.isLoading = false;
      state.reports = action.payload;
    },
    getReportsFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getReportsFailure, getReportsStart, getReportsSuccess } =
  kassaSlice.actions;

export default kassaSlice.reducer;
