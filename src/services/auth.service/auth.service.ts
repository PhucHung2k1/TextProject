import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import HttpClient from '@/utils/axios/instance';
import process from 'process';

const SIGN_IN_ACCESS_TOKEN = '/access-token';

export interface ISignInForm {
  username: string;
  password: string;
  remember?: boolean;
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
}
