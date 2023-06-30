import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiGet, apiPost, apiDelete } from '@/utils/axios/instance';
import type { ICreatePayStructurePayLoad } from './payStructure.interface';
import type { IAddRemoveMultiRoleEmployeeData } from '../customerRole.service/customerRole.interface';

const GET_PAY_STRUCTURE = '/pay-structure';
const ADD_REMOVE_EMPLOYEE = '/add-or-remove-employees';

export class PayStructureService {
  public getPayStructure = async (): Promise<IResponse> => {
    const response: IResponse = await apiGet(GET_PAY_STRUCTURE).catch(
      catchAxiosError
    );
    return response;
  };

  public addPayStructure = async (
    body: ICreatePayStructurePayLoad
  ): Promise<IResponse> => {
    const response: IResponse = await apiPost(GET_PAY_STRUCTURE, body).catch(
      catchAxiosError
    );
    return response;
  };

  public deletePayStructure = async (id: string): Promise<IResponse> => {
    const response: IResponse = await apiDelete(
      `${GET_PAY_STRUCTURE}/${id}`
    ).catch(catchAxiosError);
    return response;
  };

  public addRemoveMultiPayStructureEmployee = async (
    id: string,
    body: IAddRemoveMultiRoleEmployeeData
  ): Promise<IResponse> => {
    const response: IResponse = await apiPost(
      `${GET_PAY_STRUCTURE}/${id}${ADD_REMOVE_EMPLOYEE}`,
      body
    ).catch(catchAxiosError);
    return response;
  };
}
