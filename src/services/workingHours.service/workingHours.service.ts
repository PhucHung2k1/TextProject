import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiGet } from '@/utils/axios/instance';
// import { IStoreProfile } from "./store.interface"

const GET_STORE_HOURS = '/store/store-hours';
export class WorkingHours {
  public getWorkingHours = async (): Promise<IResponse> => {
    const response: IResponse = await apiGet(GET_STORE_HOURS).catch(
      catchAxiosError
    );
    return response;
  };
}
