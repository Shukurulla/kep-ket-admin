import { createSlice } from "@reduxjs/toolkit";
const orderSlice = createSlice({
  name: "Order",
  initialState: {
    isLoading: false,
    orders: [],
  },
  reducers: {
    getOrderStart: (state) => {
      state.isLoading = true;
    },
    getOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    },
    getOrderFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getOrderFailure, getOrderStart, getOrderSuccess } =
  orderSlice.actions;
export default orderSlice.reducer;
