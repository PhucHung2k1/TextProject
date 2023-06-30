import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiDelete, apiGet } from '@/utils/axios/instance';

const GET_PAY_STRUCTURE = '/pay-structure';
export class PayStructureService {
  public getPayStructure = async (): Promise<IResponse> => {
    const response: IResponse = await apiGet(GET_PAY_STRUCTURE).catch(
      catchAxiosError
    );
    return response;
  };

  public deletePayStructure = async (id: string): Promise<IResponse> => {
    const response: IResponse = await apiDelete(`${GET_PAY_STRUCTURE}/${id}`).catch(
      catchAxiosError
    );
    return response;
  };
}