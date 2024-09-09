import { createSlice } from "@reduxjs/toolkit";
const promocodeSlice = createSlice({
  name: "PromoCode",
  initialState: {
    isLoading: false,
    promocodes: [],
  },
  reducers: {
    getPromoCodeStart: (state) => {
      state.isLoading = true;
    },
    getPromoCodeSuccess: (state, action) => {
      state.isLoading = false;
      state.promocodes = action.payload;
    },
    getPromoCodeFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getPromoCodeFailure, getPromoCodeStart, getPromoCodeSuccess } =
  promocodeSlice.actions;

export default promocodeSlice.reducer;
