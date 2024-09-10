/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
import { createSlice, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { getCollectionData } from '../API/Firebase/GetUserData.ts';
import { EmployeeSalaryType } from '../Pages/Payroll/PayrollHistory.tsx';
import { RootState } from '../store.ts';

export interface EmployeeSalaryState {
  employeeSalaryData: EmployeeSalaryType[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: EmployeeSalaryState = {
  employeeSalaryData: [],
  status: 'idle',
  error: null,
};

type AsyncThunkConfig = {
  state: RootState;
};

export const fetchEmployeeSalaryData: AsyncThunk<
  EmployeeSalaryType[],
  {
    month: string;
    isAdmin: boolean;
    userName: string;
  },
  AsyncThunkConfig
> = createAsyncThunk<EmployeeSalaryType[], { month: string; isAdmin: boolean; userName: string }, { state: RootState }>(
  'employeeSalary/getEmployeeSalaryData',
  async ({ month, isAdmin, userName }, thunkAPI) => {
    try {
      const newMonth = Number(month.slice(6, 7));
      const employeeSalaryData = await getCollectionData('payrollDetails');
      const getEmployeeSalaryData: EmployeeSalaryType[] = [];
      for (let i = 0; i < employeeSalaryData.length; i++) {
        if (isAdmin || employeeSalaryData[i].name === userName) {
          if (isAdmin && employeeSalaryData[i].month !== newMonth) {
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
      return thunkAPI.rejectWithValue('Failed to fetch employee salary data');
    }
  },
);

export const employeeSalarySlice = createSlice({
  name: 'employeeSalary',
  initialState,
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
        state.status = 'idle';
        state.employeeSalaryData = action.payload;
      })
      .addCase(fetchEmployeeSalaryData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'error occurred';
      });
  },
});

export const { setEmployeeSalary } = employeeSalarySlice.actions;
export default employeeSalarySlice.reducer;
