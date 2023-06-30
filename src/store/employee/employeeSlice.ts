import type { IEmployeeEdit } from '@/services/employee.service/employee.edit.interface';
import type {
  IEmployee,
  IEmployeeSearch,
} from '@/services/employee.service/employee.interface';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  employees: IEmployee[];
  valueSearchName: string;
  employeeDetail: IEmployeeEdit;
  employeesSearch: IEmployeeSearch[];
};
const initialState = {
  employees: [],
  valueSearchName: '',
  employeeDetail: {},
  employeesSearch: [],
} as unknown as IInitialState;

const EmployeeSlice = createSlice({
  name: 'employee-list',
  initialState,
  reducers: {
    setEmployee: (state: any, action: any) => {
      state.employees = action.payload;
    },
    setValueSearchName: (state: any, action: any) => {
      state.valueSearchName = action.payload;
    },
    setEmployeeDetail: (state: any, action: any) => {
      state.employeeDetail = action.payload;
    },
    setEmployeesSearch: (state: any, action: any) => {
      state.employeesSearch = action.payload;
    },
  },
});

export const {
  setEmployee,
  setValueSearchName,
  setEmployeeDetail,
  setEmployeesSearch,
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
