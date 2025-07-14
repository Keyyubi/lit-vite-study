import { createSlice } from "@reduxjs/toolkit";
import { employees as mockEmployees, orderedTableColumns } from "../../assets/mock/employees.json";
import { LOCAL_STORAGE_KEY } from "../localStorageUtils";

const initialState = {
  employees: [...mockEmployees],
  tableColumns: [...orderedTableColumns],
  defaultEmployee: {
    ...Object.entries(mockEmployees[0]).reduce((acc, [key]) => {
      acc[key] = "";
      return acc;
    }, {}),
  },
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    removeEmployee: (state, action) => {
      state.employees = state.employees.filter((emp) => emp.id !== action.payload.id);
    },
    updateEmployee: (state, action) => {
      state.employees = state.employees.map((emp) =>
        emp.id === action.payload.id ? { ...emp, ...action.payload } : emp
      );
    },
    bulkImportEmployees: (state, action) => {
      state.employees = [...state.employees, ...action.payload];
    },
    clearEmployees: (state) => {
      state.employees = [];
    },
  },
});

export const { addEmployee, removeEmployee, updateEmployee, bulkImportEmployees, clearEmployees } =
  employeeSlice.actions;
export default employeeSlice.reducer;
