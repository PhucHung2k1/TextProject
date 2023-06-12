import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiGet } from '@/utils/axios/instance';

const GET_CUSTOMER_PROFILE = 'customer/profile';
export class Customer {
  public getCustomerProfile = async (): Promise<IResponse> => {
    const response: IResponse = await apiGet(GET_CUSTOMER_PROFILE).catch(
      catchAxiosError
    );
    return response;
  };
}
