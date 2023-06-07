import type { ISignUpVerify } from '@/services/account.service/account.interface';
import { Account } from '@/services/account.service/account.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setEmailSignUp } from './accountSlice';

export const signUp = createAsyncThunk(
  'account/signUp',
  async (body: any, { dispatch }) => {
    const servicesAccountAPI = new Account();

    try {
      const { data, status, error } = await servicesAccountAPI.signUp(body);

      if (status === 200 && data) {
        dispatch(setEmailSignUp(body.email));
        return data;
      }

      throw new Error(error ? JSON.stringify(error) : 'Sign-Up failed.');
    } catch (err: any) {}
  }
);
export const signUpVerify = createAsyncThunk(
  'account/signUpVerify',
  async (body: ISignUpVerify) => {
    const servicesAccountAPI = new Account();
    try {
      const { data, status, error } = await servicesAccountAPI.signUpVerify(
        body
      );

      if (status === 200 && data) {
        return data;
      }

      return error;
    } catch (err: any) {
      // dispatch(showToast())
    }
  }
);
export const signUpSendVerify = createAsyncThunk(
  'account/signUp',
  async (body: any) => {
    const servicesAccountAPI = new Account();

    try {
      const { data, status } = await servicesAccountAPI.signUpSendVerify(body);

      if (status === 200 && data) {
        return data;
      }

      // throw new Error(error ? JSON.stringify(error) : 'Sign-Up failed.');
    } catch (err: any) {
      // dispatch(showToast())
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
