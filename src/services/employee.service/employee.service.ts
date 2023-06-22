import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiGet, apiPost } from '@/utils/axios/instance';
// import { IStoreProfile } from "./store.interface"

const GET_EMPLOYEE = '/employee/list';
const UPDATE_MULTIPLE_ROLE_EMPLOYEE = '/role/{customerRoleId}/add-customers';
export class EmployeeService {
  public getEmployeeList = async (): Promise<IResponse> => {
    const response: IResponse = await apiGet(GET_EMPLOYEE).catch(
      catchAxiosError
    );
    return response;
  };

  public updateRoleMultipleEmployee = async (customerRoleId: string, data: any): Promise<IResponse> => {
    const response: IResponse = await apiPost(UPDATE_MULTIPLE_ROLE_EMPLOYEE.replace('{customerRoleId}', customerRoleId), data).catch(
      catchAxiosError
    );
    return response;
  };
}


