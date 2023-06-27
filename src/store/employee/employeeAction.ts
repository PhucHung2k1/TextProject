import { createAsyncThunk } from '@reduxjs/toolkit';
import { setEmployee } from './employeeSlice';
import { EmployeeService } from '@/services/employee.service/employee.service';

// import { showToastMessage } from '@/utils/helper/showToastMessage';

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
