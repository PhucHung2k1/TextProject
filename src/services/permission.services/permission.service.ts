import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiGet } from '@/utils/axios/instance';

const GET_ALL_PERMISSION = 'permission';
export class PermissionService {
  public getAllPermission = async (): Promise<IResponse> => {
    const response: IResponse = await apiGet(GET_ALL_PERMISSION).catch(
      catchAxiosError
    );
    return response;
  };
}
