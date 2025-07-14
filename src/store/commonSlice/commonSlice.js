import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: "home",
  isLoading: false,
  currentPageTitle: "Home",
  itemsPerPage: 0,
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
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const { setCurrentPage, setLoading, setCurrentPageTitle, setItemsPerPage } = commonSlice.actions;
export default commonSlice.reducer;
