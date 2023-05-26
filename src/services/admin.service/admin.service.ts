import HttpClient from "@/utils/axios/instance";
import { catchAxiosError } from "@/utils/axios/error";
import { IResponse } from "@/utils/axios/entities";

const URL_GET_ALL_USER = "/users";

export class UserServices extends HttpClient {
  constructor() {
    super(process.env.API_BASE_URL ?? "");
  }

  public fetchUser = async (): Promise<IResponse> => {
    const response: IResponse = await this.instance
      .get(`${URL_GET_ALL_USER}`)
      .catch(catchAxiosError);
    return response;
  };
}
