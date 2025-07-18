import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeData: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployee: (state, { payload }) => {
      state.employeeData = payload;
    },
  },
});

export const { setEmployee } = employeeSlice.actions;
export const employeeStore = (state) => state.employee;
export default employeeSlice.reducer;
