import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiDelete, apiGet, apiPatch, apiPost } from '@/utils/axios/instance';
import type { IAddRemoveMultiRole } from './customerRole.interface';

const GET_ALL_ROLE = 'role/all';
const URL_ROLE = 'role';
const URL_ADD_REMOVE_ROLE = '/add-or-remove-permission';

export class CustomerRole {
  public getAllRole = async (): Promise<IResponse> => {
    const response: IResponse = await apiGet(GET_ALL_ROLE).catch(
      catchAxiosError
    );
    return response;
  };

  public createCustomerRole = async (body: any): Promise<IResponse> => {
    const response: IResponse = await apiPost(URL_ROLE, body).catch(
      catchAxiosError
    );
    return response;
  };

  public updateCustomerRole = async (
    id: string,
    body: any
  ): Promise<IResponse> => {
    const response: IResponse = await apiPatch(`${URL_ROLE}/${id}`, body).catch(
      catchAxiosError
    );
    return response;
  };

  public deleteCustomerRole = async (id: string): Promise<IResponse> => {
    const response: IResponse = await apiDelete(`${URL_ROLE}/${id}`).catch(
      catchAxiosError
    );
    return response;
  };

  public getById = async (id: string): Promise<IResponse> => {
    const response: IResponse = await apiGet(`${URL_ROLE}/${id}`).catch(
      catchAxiosError
    );
    return response;
  };

  public getListRoleCustomById = async (id: string): Promise<IResponse> => {
    const response: IResponse = await apiGet(
      `${URL_ROLE}/${id}/permissions`
    ).catch(catchAxiosError);
    return response;
  };

  public addRemoveMultiRole = async (
    id: string,
    body: IAddRemoveMultiRole
  ): Promise<IResponse> => {
    const response: IResponse = await apiPost(
      `${URL_ROLE}/${id}${URL_ADD_REMOVE_ROLE}`,
      body
    ).catch(catchAxiosError);
    return response;
  };
}
