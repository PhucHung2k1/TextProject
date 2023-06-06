import { Account } from '@/services/account.service/account.service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signUp = createAsyncThunk(
  'account/signUp',
  async (body: any, { dispatch }) => {
    const servicesAccountAPI = new Account();

    try {
      const { data, status, error } = await servicesAccountAPI.signUp(body);

      if (status === 200 && data) {
        return data;
      }

      throw new Error(error ? JSON.stringify(error) : 'Sign-Up failed.');
    } catch (err: any) {
      // dispatch(showToast())
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
