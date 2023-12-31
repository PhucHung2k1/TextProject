import type { ISignUpVerify } from '@/services/account.service/account.interface';
import { Account } from '@/services/account.service/account.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setInfoSignUp } from './accountSlice';
import { showToastMessage } from '@/utils/helper/showToastMessage';

export const signUp = createAsyncThunk(
  'account/signUp',
  async (body: any, { dispatch }) => {
    const servicesAccountAPI = new Account();

    try {
      const { data, status, error } = await servicesAccountAPI.signUp(body);

      if (status === 200) {
        dispatch(
          setInfoSignUp({
            email: data?.Customer?.Email || '',
            customerId: data?.Customer?.Id || '',
          })
        );
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
      // console.log(err);
    }
  }
);

export const checkExistEmail = createAsyncThunk(
  'account/checkExistEmail',
  async (body: any) => {
    const servicesAccountAPI = new Account();

    try {
      const { data, status, error } = await servicesAccountAPI.checkExistEmail(
        body
      );

      if (status === 200 && data) {
        return data;
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      // console.log(err);
    }
  }
);

export const signUpVerify = createAsyncThunk(
  'account/signUpVerify',
  async (body: ISignUpVerify, { dispatch }) => {
    const servicesAccountAPI = new Account();
    try {
      const { data, status, error } = await servicesAccountAPI.signUpVerify(
        body
      );

      if (status === 200) {
        return { data, status, message: 'Successfully verified your email' };
      }
      if (error) {
        showToastMessage(dispatch, error?.data.extendData[0], 'error');
        return error;
      }
    } catch (err: any) {
      // console.log(err);
    }
  }
);
export const signUpSendVerify = createAsyncThunk(
  'account/signUp',
  async (body: any, { dispatch }) => {
    const servicesAccountAPI = new Account();

    try {
      const { data, status, error } = await servicesAccountAPI.signUpSendVerify(
        body
      );

      if (status === 200) {
        showToastMessage(dispatch, 'Please check your mail.', 'success');
        return { data, status, message: 'Successfully' };
      }

      showToastMessage(dispatch, error?.message || 'Send failed', 'error');
      return error;

      // throw new Error(error ? JSON.stringify(error) : 'Sign-Up failed.');
    } catch (err: any) {
      // dispatch(showToast())
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
