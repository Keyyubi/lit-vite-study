import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: "home",
  isLoading: false,
  currentPageTitle: "Home",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCurrentPageTitle: (state, action) => {
      state.currentPageTitle = action.payload;
    },
  },
});

export const { setCurrentPage, setLoading, setCurrentPageTitle } = commonSlice.actions;
export default commonSlice.reducer;
