import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
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
  },
});

export const { addEmployee, removeEmployee, updateEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
