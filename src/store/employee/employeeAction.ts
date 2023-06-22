import { createAsyncThunk } from '@reduxjs/toolkit';
import { setEmployee } from './employeeSlice';
import { EmployeeService } from '@/services/employee.service/employee.service';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { getAllRole } from '../customerRole/customerRoleAction';

// import { showToastMessage } from '@/utils/helper/showToastMessage';

export const getEmployeeList = createAsyncThunk(
  '/store/getEmployeeList',
  async (_body: any, { dispatch }) => {
    const servicesEmployees = new EmployeeService();
    try {
      const { data, status, error } = await servicesEmployees.getEmployeeList();

      if ((status === 200 || status === 201) && data) {
        dispatch(setEmployee(data));
        return data;
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      // err
    }
  }
);

export const updateRoleMultipeEmployee = createAsyncThunk(
  '/store/updateRoleMultipeEmployee',
  async (body: any, { dispatch }) => {
    const servicesEmployees = new EmployeeService();
    try {
      const { data, status, error } =
        await servicesEmployees.updateRoleMultipleEmployee(
          body.roleId,
          body.data
        );

      if (status === 200 || status === 201) {
        showToastMessage(dispatch, `Update success!`, 'success');
        dispatch(getEmployeeList({}));
        return data;
      }
      showToastMessage(dispatch, error?.message || 'Send failed', 'error');
    } catch (err: any) {
      // err
    }
  }
);

export const deleteRoleMultipeEmployee = createAsyncThunk(
  '/store/deleteRoleMultipeEmployee',
  async (body: any, { dispatch }) => {
    const servicesEmployees = new EmployeeService();
    try {
      const { data, status, error } =
        await servicesEmployees.deleteRoleMultipleEmployee(
          body.roleId,
          JSON.stringify(body.data)
        );

      if (status === 200 || status === 201) {
        showToastMessage(dispatch, `Update success!`, 'success');
        dispatch(getAllRole({}));
        dispatch(getEmployeeList({}));
        return data;
      }
      showToastMessage(dispatch, error?.message || 'Send failed', 'error');
    } catch (err: any) {
      // err
    }
  }
);
