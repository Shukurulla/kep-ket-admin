import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "Table",
  initialState: {
    isLoading: false,
    tables: [],
  },
  reducers: {
    getTablesStart: (state) => {
      state.isLoading = true;
    },
    getTablesSuccess: (state, action) => {
      state.isLoading = false;
      state.tables = action.payload;
    },
    getTablesFailure: (state) => {
      state.isLoading = false;
    },
  },
});
export const { getTablesFailure, getTablesStart, getTablesSuccess } =
  tableSlice.actions;
export default tableSlice.reducer;
