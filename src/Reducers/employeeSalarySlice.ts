/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCollectionData } from '../API/Firebase/GetUserData.tsx';
import { EmployeeSalaryType } from '../Pages/Payroll/PayrollHistory.tsx';
import { RootState } from '../store.ts';

interface EmployeeSalaryState {
  employeeSalaryData: EmployeeSalaryType[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

export const fetchEmployeeSalaryData = createAsyncThunk<EmployeeSalaryType[], string, { state: RootState }>(
  'employeeSalary/getEmployeeSalaryData',
  async (month, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { user } = state.auth;
      const newMonth = Number(month.slice(6, 7));
      const employeeSalaryData = await getCollectionData('payrollDetails');
      const getEmployeeSalaryData: EmployeeSalaryType[] = [];
      for (let i = 0; i < employeeSalaryData.length; i++) {
        if (user?.isAdmin || employeeSalaryData[i].name === user?.name) {
          if (user?.isAdmin && employeeSalaryData[i].month !== newMonth) {
            continue;
          }
          const data: EmployeeSalaryType = {
            id: i + 1,
            name: employeeSalaryData[i].name,
            month: employeeSalaryData[i].month,
            payData: {
              baseSalary: employeeSalaryData[i].baseSalary,
              weeklyHolidayAllowance: employeeSalaryData[i].weeklyHolidayAllowance,
              additionalAllowance: employeeSalaryData[i].additionalAllowance,
              nationalPension: employeeSalaryData[i].nationalPension,
              healthInsurance: employeeSalaryData[i].healthInsurance,
              longTermCare: employeeSalaryData[i].longTermCare,
              employmentInsurance: employeeSalaryData[i].employmentInsurance,
            },
            isViewed: employeeSalaryData[i].isViewed,
            adminViewed: employeeSalaryData[i].adminViewed,
          };
          getEmployeeSalaryData.push(data);
        }
      }
      return getEmployeeSalaryData.sort((a, b) => b.month - a.month);
    } catch (error) {
      return rejectWithValue('Failed to fetch employee salary data');
    }
  },
);

export const employeeSalarySlice = createSlice({
  name: 'employeeSalary',
  initialState: {
    employeeSalaryData: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setEmployeeSalary: (state, action) => {
      state.employeeSalaryData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeSalaryData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployeeSalaryData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employeeSalaryData = action.payload;
      })
      .addCase(fetchEmployeeSalaryData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setEmployeeSalary } = employeeSalarySlice.actions;
export default employeeSalarySlice.reducer;
