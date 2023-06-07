import { createAsyncThunk } from '@reduxjs/toolkit';

import { setMessageToast, showToast } from '../toast/toastSlice';
import { Customer } from '@/services/customer.service/customer.service';
import { setCustomerProfile } from './customerSlice';

export const getCustomerProfile = createAsyncThunk(
  'account/customerRole',
  async (_body: any, { dispatch }) => {
    const servicesCustomerAPI = new Customer();

    try {
      const { data, status, error } =
        await servicesCustomerAPI.getCustomerProfile();

      if ((status === 200 || status === 201) && data) {
        dispatch(setCustomerProfile(data));
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      dispatch(setMessageToast(err.extendData[0].Message));
      dispatch(showToast());
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
