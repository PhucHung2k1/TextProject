import type { IResponse } from '@/utils/axios/entities';
import { apiPost } from '@/utils/axios/instance';
import type {
  ISignUp,
  ISignUpSendVerify,
  ISignUpVerify,
} from './account.interface';
import { catchAxiosError } from '@/utils/axios/error';

const SIGN_UP = '/account/sign-up';
const SIGN_UP_VERIFY = '/account/sign-up-verify';
const SIGN_UP_SEND_VERIFY = '/account/sign-up-send-verify';
const CHECK_EXIST_EMAIL = '/common/check-exist-email';

export class Account {
  public signUp = async (data: ISignUp): Promise<IResponse> => {
    const response: IResponse = await apiPost(SIGN_UP, data).catch(
      catchAxiosError
    );
    return response;
  };

  public checkExistEmail = async (data: ISignUp): Promise<IResponse> => {
    const response: IResponse = await apiPost(CHECK_EXIST_EMAIL, data).catch(
      catchAxiosError
    );
    return response;
  };

  public signUpVerify = async (data: ISignUpVerify): Promise<IResponse> => {
    const response: IResponse = await apiPost(SIGN_UP_VERIFY, data).catch(
      catchAxiosError
    );
    return response;
  };

  public signUpSendVerify = async (
    data: ISignUpSendVerify
  ): Promise<IResponse> => {
    const response: IResponse = await apiPost(SIGN_UP_SEND_VERIFY, data).catch(
      catchAxiosError
    );
    return response;
  };
}
