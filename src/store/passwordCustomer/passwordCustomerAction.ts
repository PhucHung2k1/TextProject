// import { CusServices } from "@/services/customer.service/customer.service";
import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  IChangePasswordByToken,
  IForgotPassword,
  IValidatePasswordToken,
} from '@/services/passwordCustomer.service/passwordCustomer.service';
import { PasswordCustomerService } from '@/services/passwordCustomer.service/passwordCustomer.service';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { setPermissionAll } from '../permission/permissionSlice';
import { setMessageToast, showToast } from '../toast/toastSlice';

export const forgotPassword = createAsyncThunk(
  'paswordCustomer/forgotPassword',
  async (_body: IForgotPassword, { dispatch }) => {
    const PasswordCustomerServiceAPI = new PasswordCustomerService();

    const { status, error } = await PasswordCustomerServiceAPI.forgotPassword(
      _body
    );

    if (status === 200) {
      showToastMessage(dispatch, 'Email Sent Successfully!', 'success');
    } else {
      showToastMessage(
        dispatch,
        'UserName Does Not Exist In The System!',
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
      const { data, status, error } =
        await PasswordCustomerServiceAPI.changePasswordByToken(_body);

      if ((status === 200 || status === 201) && data) {
        dispatch(setPermissionAll(data));
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      dispatch(setMessageToast(err.extendData[0].Message));
      dispatch(showToast());
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
export const validateForgotPasswordToken = createAsyncThunk(
  'paswordCustomer/validateForgotPasswordToken',
  async (_body: IValidatePasswordToken, { dispatch }) => {
    const PasswordCustomerServiceAPI = new PasswordCustomerService();

    try {
      const { data, status, error } =
        await PasswordCustomerServiceAPI.validateForgotPasswordToken(_body);

      if ((status === 200 || status === 201) && data) {
        // dispatch(setPermissionAll(data));
        console.log(data);
        console.log(status);
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      dispatch(setMessageToast(err.extendData[0].Message));
      dispatch(showToast());
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
