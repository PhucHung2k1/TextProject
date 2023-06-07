import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import HttpClient from '@/utils/axios/instance';

const GET_ALL_PERMISSION = 'permission';
export class PermissionService extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_API_BASE_URL_DEV ?? '');
  }

  public getAllPermission = async (): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .get(GET_ALL_PERMISSION)
      .catch(catchAxiosError);
    return response;
  };
}
