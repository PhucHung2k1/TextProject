import type { IEmployee } from '@/services/employee.service/employee.interface';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  employees: IEmployee[];
};
const initialState = {
  employees: [],
} as IInitialState;

const EmployeeSlice = createSlice({
  name: 'employee-list',
  initialState,
  reducers: {
    setEmployee: (state: any, action: any) => {
      state.employees = action.payload;
    },
  },
});

export const { setEmployee } = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
