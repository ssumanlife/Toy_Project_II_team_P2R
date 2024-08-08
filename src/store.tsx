import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import modalSlice from './Reducers/ModalSlice.ts';
import employeeSalarySlice from './Reducers/EmployeeSalarySlice.tsx';
import calendarSlice from './Reducers/CalendarEventSlice.ts';

const store = configureStore({
  reducer: {
    modal: modalSlice,
    employeeSalary: employeeSalarySlice,
    calendar: calendarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
