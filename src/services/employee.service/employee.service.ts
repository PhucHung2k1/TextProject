import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiDelete, apiGet, apiPost } from '@/utils/axios/instance';
// import { IStoreProfile } from "./store.interface"

const GET_EMPLOYEE = '/employee/list';
const GET_EMPLOYEE_LIST_SEARCH = '/employee/search';

const GET_EMPLOYEE_DETAIL = '/employee';
const ADD_REMOVE_MULTIPLE_ROLE_EMPLOYEE = '/role/{roleId}/add-customers';
const DELETE_EMPLOYEE = '/employee';

export interface IGetEmployeeListSearch {
  PageIndex: number;
  PageSize: number;
  OrderBy: string;
  Condition: Condition;
  Fields: string;
  ViewMode: string;
  Cache: boolean;
  FilterCondition?: FilterCondition;
}

interface Condition {
  SearchText: string;
  Status: boolean;
  PayStructureId: string;
  RoleIds: string[];
}

interface FilterCondition {
  Fields: Field[];
}
interface Field {
  NAME: string;
  VALUE: string;
}

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

  public deleteEmployee = async (id: string): Promise<IResponse> => {
    const response: IResponse = await apiDelete(
      `${DELETE_EMPLOYEE}/${id}`
    ).catch(catchAxiosError);
    return response;
  };

  public getEmployeeDetail = async (id: string): Promise<IResponse> => {
    const response: IResponse = await apiGet(
      `${GET_EMPLOYEE_DETAIL}/${id}`
    ).catch(catchAxiosError);
    return response;
  };

  public getEmployeeListSearch = async (
    data: IGetEmployeeListSearch
  ): Promise<IResponse> => {
    const response: IResponse = await apiPost(
      GET_EMPLOYEE_LIST_SEARCH,
      data
    ).catch(catchAxiosError);
    return response;
  };
}
