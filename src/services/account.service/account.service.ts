import type { IResponse } from '@/utils/axios/entities';
import HttpClient from '@/utils/axios/instance';
import type {
  ISignUp,
  ISignUpSendVerify,
  ISignUpVerify,
} from './account.interface';
import { catchAxiosError } from '@/utils/axios/error';

const SIGN_UP = '/account/sign-up';
const SIGN_UP_VERIFY = '/account/sign-up-verify';
const SIGN_UP_SEND_VERIFY = '/account/sign-up-send-verify';
export class Account extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_API_BASE_URL_DEV ?? '');
  }

  public signUp = async (data: ISignUp): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .post(SIGN_UP, data)
      .catch(catchAxiosError);
    return response;
  };

  public signUpVerify = async (data: ISignUpVerify): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .post(SIGN_UP_VERIFY, data)
      .catch(catchAxiosError);

    return response;
  };

  public signUpSendVerify = async (
    data: ISignUpSendVerify
  ): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .post(SIGN_UP_SEND_VERIFY, data)
      .catch(catchAxiosError);
    return response;
  };
}
