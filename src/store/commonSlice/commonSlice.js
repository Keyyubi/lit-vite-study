import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEY } from "../localStorageUtils";

const initializeLanguage = () => {
  const existing = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (existing) return JSON.parse(existing).common.lang;

  const browserLang = navigator.language.split("-")[0] || "en";
  const isLangTrOrEn = ["en", "tr"].includes(browserLang);

  return isLangTrOrEn ? browserLang : "en";
};

const initialState = {
  currentRoute: "EmployeeList",
  isLoading: false,
  itemsPerPage: 0,
  lang: initializeLanguage(),
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCurrentRoute: (state, action) => {
      state.currentRoute = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { setCurrentRoute, setLoading, setItemsPerPage, setLang } = commonSlice.actions;
export default commonSlice.reducer;
