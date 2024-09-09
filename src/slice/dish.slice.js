import { createSlice } from "@reduxjs/toolkit";

const dishSlice = createSlice({
  name: "Dish",
  initialState: {
    isLoading: false,
    dishes: [],
  },
  reducers: {
    getDishesStart: (state) => {
      state.isLoading = true;
    },
    getDishesSuccess: (state, action) => {
      state.isLoading = false;
      state.dishes = action.payload;
    },
    getDishesFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getDishesFailure, getDishesStart, getDishesSuccess } =
  dishSlice.actions;
export default dishSlice.reducer;
