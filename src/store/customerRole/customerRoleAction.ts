import { CustomerRole } from '@/services/customerRole.service/customerRole.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setListRole } from './customerRoleSlice';
import { setMessageToast, showToast } from '../toast/toastSlice';

export const getAllRole = createAsyncThunk(
  'account/customerRole',
  async (body: any, { dispatch }) => {
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

export const addNewRole = createAsyncThunk(
  'account/customerRole',
  async (body: any, { dispatch }) => {
    const servicesCustomerRoleAPI = new CustomerRole();

    try {
      const { data, status, error } =
        await servicesCustomerRoleAPI.createCustomerRole(body);

      if ((status === 200 || status === 201) && data) {
        dispatch(getAllRole({}));
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
export const deleteRole = createAsyncThunk(
  'account/customerRole',
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
