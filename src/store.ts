import { configureStore } from '@reduxjs/toolkit';
import employeeSalarySlice from './Reducers/employeeSalarySlice.ts';

const store = configureStore({
  reducer: {
    employeeSalary: employeeSalarySlice,
  },
});
export default store;
