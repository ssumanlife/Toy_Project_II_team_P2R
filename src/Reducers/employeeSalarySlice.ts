import { createSlice } from '@reduxjs/toolkit';

export const employeeSalarySlice = createSlice({
  name: 'employeeSalary',
  initialState: {
    employeeSalaryData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

// export const {} = employeeSalarySlice.actions;
export default employeeSalarySlice.reducer;
