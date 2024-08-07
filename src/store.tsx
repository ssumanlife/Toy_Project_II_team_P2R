import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './Reducers/ModalSlice.ts';
import employeeSalarySlice from './Reducers/EmployeeSalarySlice.tsx';

const store = configureStore({
  reducer: {
    modal: modalSlice,
    employeeSalary: employeeSalarySlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
