import { createSlice } from "@reduxjs/toolkit";

const waiterSlice = createSlice({
  name: "Waiter",
  initialState: {
    isLoading: false,
    waiters: [],
    waiterServiceInfo: [],
  },
  reducers: {
    getWaiterStart: (state) => {
      state.isLoading = true;
    },
    getWaiterSuccess: (state, action) => {
      state.isLoading = false;
      state.waiters = action.payload;
    },
    getWaiterFailure: (state) => {
      state.isLoading = false;
    },
    getWaiterServiceInfo: (state, action) => {
      state.isLoading = false;
      state.waiterServiceInfo = action.payload;
    },
  },
});

export const {
  getWaiterFailure,
  getWaiterStart,
  getWaiterSuccess,
  getWaiterServiceInfo,
} = waiterSlice.actions;
export default waiterSlice.reducer;
