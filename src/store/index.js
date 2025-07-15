import { configureStore } from "@reduxjs/toolkit";
import { loadStateFromLocalStorage, saveStateToLocalStorage } from "./localStorageUtils";
import commonReducer from "./commonSlice/commonSlice";
import employeeReducer from "./employeeSlice/employeeSlice";

const existingState = loadStateFromLocalStorage();

export const store = configureStore({
  reducer: {
    common: commonReducer,
    employee: employeeReducer,
  },
  preloadedState: existingState || undefined,
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});
