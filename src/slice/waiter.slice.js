import { createSlice } from "@reduxjs/toolkit";

const waiterSlice = createSlice({
  name: "Waiter",
  initialState: {
    isLoading: false,
    waiters: [],
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
  },
});

export const { getWaiterFailure, getWaiterStart, getWaiterSuccess } =
  waiterSlice.actions;
export default waiterSlice.reducer;
