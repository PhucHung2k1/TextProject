// import { CusServices } from "@/services/customer.service/customer.service";
import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  IChangePasswordByToken,
  IForgotPassword,
} from '@/services/passwordCustomer.service/passwordCustomer.service';
import { PasswordCustomerService } from '@/services/passwordCustomer.service/passwordCustomer.service';
import { showToastMessage } from '@/utils/helper/showToastMessage';

export const forgotPassword = createAsyncThunk(
  'paswordCustomer/forgotPassword',
  async (_body: IForgotPassword, { dispatch }) => {
    const PasswordCustomerServiceAPI = new PasswordCustomerService();

    const { status, error } = await PasswordCustomerServiceAPI.forgotPassword(
      _body
    );

    if (status === 200) {
      showToastMessage(dispatch, 'Email Sent Successfully', 'success');
    } else {
      showToastMessage(
        dispatch,
        'UserName Does Not Exist In The System',
        'error'
      );

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    }
  }
);
export const changePasswordByToken = createAsyncThunk(
  'paswordCustomer/changePasswordByToken',
  async (_body: IChangePasswordByToken, { dispatch }) => {
    const PasswordCustomerServiceAPI = new PasswordCustomerService();

    try {
      const { status, error } =
        await PasswordCustomerServiceAPI.changePasswordByToken(_body);

      if (status === 200) {
        showToastMessage(dispatch, 'Password Reset Successful', 'success');
      } else {
        throw new Error(error && JSON.stringify(error));
      }
    } catch (err: any) {
      throw new Error(err && JSON.stringify(err.message));
    }
  }
);
export const validateForgotPasswordToken = createAsyncThunk(
  'paswordCustomer/validateForgotPasswordToken',
  async (_body: any, { dispatch }) => {
    const PasswordCustomerServiceAPI = new PasswordCustomerService();

    try {
      const { status, error } =
        await PasswordCustomerServiceAPI.validateForgotPasswordToken(_body);

      if (status === 200) {
      } else {
        showToastMessage(dispatch, error?.message, 'error');
        throw new Error(error ? JSON.stringify(error.message) : 'Failed.');
      }
    } catch (err: any) {
      throw new Error(err && JSON.stringify(err.message));
    }
  }
);
