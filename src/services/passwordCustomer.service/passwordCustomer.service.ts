import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiGet, apiPost } from '@/utils/axios/instance';

export interface IForgotPassword {
  UserName: string;
}
export interface IChangePasswordByToken {
  token: string;
  password: string;
  passwordConfirm: string;
}
export interface IValidatePasswordToken {
  token: string;
}
const FORGOT_PASSWORD = '/account/forgot-password';
const VALIDATE_FORGOT_PASSWORD_TOKEN = '/account/forgot-password';
const CHANGE_PASSWORD_BY_TOKEN = '/customer/change-password-by-token';
export class PasswordCustomerService {
  public forgotPassword = async (data: IForgotPassword): Promise<IResponse> => {
    const response: IResponse = await apiPost(FORGOT_PASSWORD, data).catch(
      catchAxiosError
    );
    return response;
  };

  public changePasswordByToken = async (
    data: IChangePasswordByToken
  ): Promise<IResponse> => {
    const response: IResponse = await apiPost(
      `${CHANGE_PASSWORD_BY_TOKEN}?token=${data.token}`,
      data
    ).catch(catchAxiosError);
    return response;
  };

  public validateForgotPasswordToken = async (
    token: IValidatePasswordToken
  ): Promise<IResponse> => {
    const response: IResponse = await apiGet(
      `${VALIDATE_FORGOT_PASSWORD_TOKEN}?token=${token}`
    ).catch(catchAxiosError);
    return response;
  };
}
