import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import HttpClient from '@/utils/axios/instance';

const SIGN_IN_ACCESS_TOKEN = '/access-token';
const SIGN_UP = '/account/sign-up';
export interface ISignInForm {
  username: string;
  password: string;
  remember?: boolean;
}
export interface ISignUp {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  streetAddress?: string;
  city?: string;
  stateProvince?: string;
  zipPostalCode?: string;
  country?: string;
}
export class AuthAPI extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_API_BASE_URL ?? '');
  }

  public signIn = async (data: ISignInForm): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .post(SIGN_IN_ACCESS_TOKEN, data)
      .catch(catchAxiosError);
    return response;
  };

  public signUp = async (data: ISignUp): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .post(SIGN_UP, data)
      .catch(catchAxiosError);
    return response;
  };
}
