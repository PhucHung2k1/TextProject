import HttpClient from "@/utils/axios/instance";
import { catchAxiosError } from "@/utils/axios/error";
import { IResponse } from "@/utils/axios/entities";

export const URL_GET_ALL_CUSTOMER = "/api/Cus/Get";
export const URL_DELETE_CUSTOMER = "/api/Cus/Delete";
export const URL_ADD_CUSTOMER = "/api/Cus/AddCus";
export const URL_UPDATE_CUSTOMER = "/api/Cus/Update";
export class CusServices extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_API_NGROK_URL ?? "");
  }
  public getCustomer = async (): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .get(URL_GET_ALL_CUSTOMER, {})
      .catch(catchAxiosError);
    return response;
  };
  public deleteCustomer = async (id: number): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .delete(URL_DELETE_CUSTOMER, { params: { id } })
      .catch(catchAxiosError);
    return response;
  };
  public addCustomer = async (body: any): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .post(URL_ADD_CUSTOMER, body)
      .catch(catchAxiosError);
    return response;
  };
  public updateCustomer = async (body: any): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .put(URL_UPDATE_CUSTOMER, body)
      .catch(catchAxiosError);
    return response;
  };
}
