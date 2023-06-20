import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiGet, apiPost } from '@/utils/axios/instance';
import type { IWorkingHours } from './workingHours.interface';
// import { IStoreProfile } from "./store.interface"

const GET_STORE_HOURS = '/store/store-hours';
export class WorkingHours {
  public getWorkingHours = async (): Promise<IResponse> => {
    const response: IResponse = await apiGet(GET_STORE_HOURS).catch(
      catchAxiosError
    );
    return response;
  };

  public updateWorkingHours = async (
    data: IWorkingHours
  ): Promise<IResponse> => {
    const response: IResponse = await apiPost(GET_STORE_HOURS, data).catch(
      catchAxiosError
    );
    return response;
  };
}
