import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import HttpClient from '@/utils/axios/instance';
import type { ISignUp } from './account.interface';

const SIGN_UP = '/account/sign-up';

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
}
