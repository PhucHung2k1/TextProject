import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiGet, apiPost } from '@/utils/axios/instance';
// import { IStoreProfile } from "./store.interface"

const GET_EMPLOYEE = '/employee/list';
const ADD_REMOVE_MULTIPLE_ROLE_EMPLOYEE = '/role/{roleId}/add-customers';

export class EmployeeService {
  public getEmployeeList = async (): Promise<IResponse> => {
    const response: IResponse = await apiGet(GET_EMPLOYEE).catch(
      catchAxiosError
    );
    return response;
  };

  public addRemoveRoleEmployee = async (
    roleId: string,
    data: any
  ): Promise<IResponse> => {
    const response: IResponse = await apiPost(
      ADD_REMOVE_MULTIPLE_ROLE_EMPLOYEE.replace('{roleId}', roleId),
      data
    ).catch(catchAxiosError);
    return response;
  };
}
