import { CustomerRole } from '@/services/customerRole.service/customerRole.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setListRole,
  setListPermissionCustomById,
  setAddNewRoleId,
} from './customerRoleSlice';
import { setMessageToast, showToast } from '../toast/toastSlice';
import type { IAddRemoveMultiRole } from '@/services/customerRole.service/customerRole.interface';

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
}
export const addNewRole = createAsyncThunk(
  'account/addNewRole',
  async (body: IAddNewRolePayload, { dispatch }) => {
    const servicesCustomerRoleAPI = new CustomerRole();

    try {
      const { data, status, error } =
        await servicesCustomerRoleAPI.createCustomerRole(body);

      if (status === 200 || status === 201) {
        dispatch(setAddNewRoleId(data));
        dispatch(getListRoleCustomById(data));
        dispatch(getAllRole({}));
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
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
      const { status, error } =
        await servicesCustomerRoleAPI.addRemoveMultiRole(id, body);

      if (status === 200 || status === 201 || status === 204) {
        dispatch(getAllRole({}));
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
