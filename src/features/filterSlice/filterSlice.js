import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filterBy: "",
  },
  reducers: {
    filterBy: (state, action) => {
      state.filterBy = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { filterBy } = filterSlice.actions;
