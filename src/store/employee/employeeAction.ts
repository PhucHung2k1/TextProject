import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setEmployee,
  setEmployeeDetail,
  setEmployeesSearch,
} from './employeeSlice';
import type { IGetEmployeeListSearch } from '@/services/employee.service/employee.service';
import { EmployeeService } from '@/services/employee.service/employee.service';
import { showToastMessage } from '@/utils/helper/showToastMessage';

export const getEmployeeList = createAsyncThunk(
  '/store/getEmployeeList',
  async (_body: any, { dispatch }) => {
    const servicesEmployees = new EmployeeService();
    try {
      const { data, status, error } = await servicesEmployees.getEmployeeList();

      if (status === 200 || status === 201) {
        dispatch(setEmployee(data));
        return data;
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      // err
    }
  }
);
export const deleteEmployee = createAsyncThunk(
  '/store/deleteEmployee',
  async (id: any, { dispatch }) => {
    const servicesEmployees = new EmployeeService();
    try {
      const { status, error } = await servicesEmployees.deleteEmployee(id);

      if (status === 200 || status === 204) {
        dispatch(getEmployeeList({}));
        showToastMessage(dispatch, 'Delete Successfull!', 'success');
      } else {
        showToastMessage(dispatch, 'Delete Employee Failed!', 'error');
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      // err
    }
  }
);
export const getEmployeeDetail = createAsyncThunk(
  '/store/deleteEmployee',
  async (id: any, { dispatch }) => {
    const servicesEmployees = new EmployeeService();
    try {
      const { data, status, error } = await servicesEmployees.getEmployeeDetail(
        id
      );

      if (status === 200 || status === 204) {
        dispatch(setEmployeeDetail(data));
        return data;
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      // err
    }
  }
);
export const getEmployeeListSearch = createAsyncThunk(
  '/store/getEmployeeList',
  async (_body: IGetEmployeeListSearch, { dispatch }) => {
    const servicesEmployees = new EmployeeService();
    try {
      const { data, status, error } =
        await servicesEmployees.getEmployeeListSearch(_body);

      if (status === 200 || status === 201) {
        dispatch(setEmployeesSearch(data));
        return data;
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      // err
    }
  }
);
