import { CustomerRole } from '@/services/customerRole.service/customerRole.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setListRole,
  setListPermissionCustomById,
  setAddNewRoleId,
  setDetailRoleById,
} from './customerRoleSlice';
import { setMessageToast, showToast } from '../toast/toastSlice';
import type {
  IAddRemoveMultiRole,
  IAddRemoveMultiRoleEmployee,
  IPatchPayloadData,
} from '@/services/customerRole.service/customerRole.interface';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { getEmployeeList } from '../employee/employeeAction';

export const getAllRole = createAsyncThunk(
  'account/getAllRole',
  async (_body: any, { dispatch }) => {
    const servicesCustomerRoleAPI = new CustomerRole();

    try {
      const { data, status, error } =
        await servicesCustomerRoleAPI.getAllRole();

      if ((status === 200 || status === 201) && data) {
        dispatch(setListRole(data));
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      dispatch(setMessageToast(err.extendData[0].Message));
      dispatch(showToast());
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
export interface IUpdateRole {
  id: string;
  data: IPatchPayloadData[];
}
export const updateRole = createAsyncThunk(
  'account/getAllRole',
  async (_body: IUpdateRole, { dispatch }) => {
    const servicesCustomerRoleAPI = new CustomerRole();

    try {
      const { status, error } = await servicesCustomerRoleAPI.updateRole(
        _body.id,
        _body.data
      );

      if (status === 200 || status === 201) {
        showToastMessage(dispatch, 'Successfully', 'success');
        dispatch(getAllRole({}));
      }
      if (error) {
        showToastMessage(dispatch, error?.data?.extendData[0].Message, 'error');
      }
      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      dispatch(setMessageToast(err.extendData[0].Message));
      dispatch(showToast());
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
export const getListRoleCustomById = createAsyncThunk(
  'role/getListRoleCustomById',
  async (id: string, { dispatch }) => {
    const servicesCustomerRoleAPI = new CustomerRole();

    try {
      const { status, data } =
        await servicesCustomerRoleAPI.getListRoleCustomById(id);

      if (status === 200 || status === 201 || status === 204) {
        dispatch(setListPermissionCustomById(data));
      }
    } catch (err: any) {
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);

interface IAddNewRolePayload {
  name: string;
  active?: boolean;
  isTechnician: boolean;
  takeAppointment: boolean;
  availableBookingOnline: boolean;
  allowQuickPayment: boolean;
}
export const addNewRole = createAsyncThunk(
  'account/addNewRole',
  async (body: IAddNewRolePayload, { dispatch }) => {
    const servicesCustomerRoleAPI = new CustomerRole();

    try {
      const { data, status, error } =
        await servicesCustomerRoleAPI.createCustomerRole(body);

      if (status === 200 || status === 201) {
        dispatch(setAddNewRoleId(data?.Id));
        dispatch(getListRoleCustomById(data?.Id));
        dispatch(getAllRole({}));
        return { data, status, message: 'Successfully' };
      }
      if (error) {
        showToastMessage(
          dispatch,
          error?.data?.extendData[0]?.Message,
          'error'
        );
        return error;
      }
    } catch (err: any) {
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
export const deleteRole = createAsyncThunk(
  'account/deleteRole',
  async (id: string, { dispatch }) => {
    const servicesCustomerRoleAPI = new CustomerRole();

    try {
      const { status, error } =
        await servicesCustomerRoleAPI.deleteCustomerRole(id);

      if (status === 200 || status === 201 || status === 204) {
        dispatch(getAllRole({}));
        showToastMessage(dispatch, 'Delelte Successful!', 'success');
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
interface IAddRemoveMultiRoleRequest {
  id: string;
  body: IAddRemoveMultiRole;
}
export const addRemoveMultiRole = createAsyncThunk(
  'role/addRemoveMultiRole',
  async ({ id, body }: IAddRemoveMultiRoleRequest, { dispatch }) => {
    const servicesCustomerRoleAPI = new CustomerRole();

    try {
      const { data, status, error } =
        await servicesCustomerRoleAPI.addRemoveMultiRole(id, body);

      if (status === 200 || status === 201 || status === 204) {
        dispatch(getAllRole({}));
        dispatch(getListRoleCustomById(id));
        return { data, status, message: 'Successfully' };
      }
      return error;
    } catch (err: any) {
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
export const getRoleDetailById = createAsyncThunk(
  'role/getRoleDetailById',
  async (id: string, { dispatch }) => {
    const servicesCustomerRoleAPI = new CustomerRole();

    try {
      const { status, data } = await servicesCustomerRoleAPI.getById(id);

      if (status === 200 || status === 201 || status === 204) {
        dispatch(setDetailRoleById(data));
      }
    } catch (err: any) {
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);

export const addRemoveMultiRoleEmployee = createAsyncThunk(
  '/role/addRemoveMultiRoleEmployee',
  async (body: IAddRemoveMultiRoleEmployee, { dispatch }) => {
    const servicesRole = new CustomerRole();
    try {
      const { data, status, error } =
        await servicesRole.addRemoveMultiRoleEmployee(body.roleId, body.data);

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
