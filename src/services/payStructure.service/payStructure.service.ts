import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiGet } from '@/utils/axios/instance';

const GET_PAY_STRUCTURE = '/pay-structure';

export class PayStructureService {
  public getPayStructure = async (): Promise<IResponse> => {
    const response: IResponse = await apiGet(GET_PAY_STRUCTURE).catch(
      catchAxiosError
    );
    return response;
  };
}
