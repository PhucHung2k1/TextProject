import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiLogin, apiPost } from '@/utils/axios/instance';

const SIGN_IN_ACCESS_TOKEN = '/access-token';

export interface ISignInForm {
  username: string;
  password: string;
  hasRefreshToken?: boolean;
}

export class AuthAPI {
  public signIn = async (data: ISignInForm): Promise<IResponse> => {
    const response: IResponse = await apiLogin(SIGN_IN_ACCESS_TOKEN, data).catch(
      catchAxiosError
    );
    return response;
  };
}
