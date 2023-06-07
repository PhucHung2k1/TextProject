import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import HttpClient from '@/utils/axios/instance';

const GET_ALL_ROLE = 'role/all';
const URL_ROLE = 'role';
export class CustomerRole extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_API_BASE_URL_DEV ?? '');
  }

  public getAllRole = async (): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .get(GET_ALL_ROLE)
      .catch(catchAxiosError);
    return response;
  };

  public createCustomerRole = async (body: any): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .post(URL_ROLE, body)
      .catch(catchAxiosError);
    return response;
  };

  public updateCustomerRole = async (
    id: string,
    body: any
  ): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .patch(`${URL_ROLE}/${id}`, body)
      .catch(catchAxiosError);
    return response;
  };

  public deleteCustomerRole = async (id: string): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .delete(`${URL_ROLE}/${id}`)
      .catch(catchAxiosError);
    return response;
  };

  public getById = async (id: string): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .get(`${URL_ROLE}/${id}`)
      .catch(catchAxiosError);
    return response;
  };
}
