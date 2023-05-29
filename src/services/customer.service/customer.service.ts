import HttpClient from "@/utils/axios/instance";
import { catchAxiosError } from "@/utils/axios/error";
import { IResponse } from "@/utils/axios/entities";

export const URL_GET_ALL_CUS = "/api/Cus/Get";
export const URL_DELETE_CUS = "/api/Cus/Delete";
export const URL_ADD_CUS = "/api/Cus/AddCus";
export const URL_UPDATE_CUS = "/api/Cus/Update";
export class CusServices extends HttpClient {
  constructor() {
    super(process.env.NEXT_PUBLIC_API_NGROK_URL ?? "");
  }
  public getCus = async (): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .get(URL_GET_ALL_CUS, {})
      .catch(catchAxiosError);
    return response;
  };
  public deleteCus = async (id: number): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .delete(URL_DELETE_CUS, { params: { id } })
      .catch(catchAxiosError);
    return response;
  };
  public addCus = async (body: any): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .post(URL_ADD_CUS, body)
      .catch(catchAxiosError);
    return response;
  };
  public updateCus = async (body: any): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .put(URL_UPDATE_CUS, body)
      .catch(catchAxiosError);
    return response;
  };
}
