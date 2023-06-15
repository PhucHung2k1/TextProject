import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiGet } from '@/utils/axios/instance';
// import { IStoreProfile } from "./store.interface"

const GET_STORE_PROFILE = '/store/my-store-profile';
export class Store {
  public getStoreProfile = async (): Promise<IResponse> => {
    const response: IResponse = await apiGet(GET_STORE_PROFILE).catch(
      catchAxiosError
    );
    return response;
  };
}
