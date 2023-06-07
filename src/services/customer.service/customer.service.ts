import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import HttpClient from '@/utils/axios/instance';

const GET_CUSTOMER_PROFILE = 'customer/profile';
export class Customer extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_API_BASE_URL_DEV ?? '');
  }

  public getCustomerProfile = async (): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .get(GET_CUSTOMER_PROFILE)
      .catch(catchAxiosError);
    return response;
  };
}
