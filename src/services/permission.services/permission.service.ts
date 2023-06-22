import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiGet } from '@/utils/axios/instance';

const GET_ALL_PERMISSION = '/permission';
export interface IGetPermissionPayload {
  Appointments: boolean;
  Marketings: boolean;
  ClientManagements: boolean;
  CreateCharges: boolean;
  TicketManagers: boolean;
  GiftCards: boolean;
  SalonExchanges: boolean;
  SalonCenters: boolean;
  NeedHelps: boolean;
  TechPortals: boolean;
  SalonSettings: boolean;
}

export class PermissionService {
  public getAllPermission = async (
    body: IGetPermissionPayload
  ): Promise<IResponse> => {
    const response: IResponse = await apiGet(GET_ALL_PERMISSION, body).catch(
      catchAxiosError
    );
    return response;
  };
}
