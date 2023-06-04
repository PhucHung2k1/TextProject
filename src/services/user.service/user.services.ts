import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import HttpClient from '@/utils/axios/instance';

const URL_GET_ALL_USER = '/users';

export class UserServices extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_API_BASE_URL ?? '');
  }

  public fetchUser = async (): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .get(`${URL_GET_ALL_USER}`)
      .catch(catchAxiosError);
    return response;
  };
}
