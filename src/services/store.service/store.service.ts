import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiGet, apiPatch } from '@/utils/axios/instance';
// import { IStoreProfile } from "./store.interface"

const GET_STORE_PROFILE = '/store/store-customer';
const UPDATE_STORE_PROFILE = '/store/';
export class Store {
  public getStoreCustomer = async (): Promise<IResponse> => {
    const response: IResponse = await apiGet(GET_STORE_PROFILE).catch(
      catchAxiosError
    );
    return response;
  };

  public updateStore = async (
    idStore: string,
    body: any
  ): Promise<IResponse> => {
    const response: IResponse = await apiPatch(
      `${UPDATE_STORE_PROFILE}${idStore}`,
      body
    ).catch(catchAxiosError);
    return response;
  };
}
