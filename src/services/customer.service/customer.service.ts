import type { IResponse } from '@/utils/axios/entities';
import { catchAxiosError } from '@/utils/axios/error';
import { apiGet, apiPost } from '@/utils/axios/instance';
import type {
  IConfirmInvitationPayload,
  ISendInvitationPayload,
} from './customer.interface';

const GET_CUSTOMER_PROFILE = 'customer/profile';
const SEND_INVITATION = 'customer/send-invitation';
const CONFIRM_INVITATION = 'customer/confirm-invitation';
const INVITATION_LIST = 'customer/invitation-list';
export class Customer {
  public getCustomerProfile = async (): Promise<IResponse> => {
    const response: IResponse = await apiGet(GET_CUSTOMER_PROFILE).catch(
      catchAxiosError
    );
    return response;
  };

  public sendInvitation = async (
    body: ISendInvitationPayload
  ): Promise<IResponse> => {
    const response: IResponse = await apiPost(SEND_INVITATION, body).catch(
      catchAxiosError
    );
    return response;
  };

  public confirmInvitation = async (
    body: IConfirmInvitationPayload
  ): Promise<IResponse> => {
    const response: IResponse = await apiPost(CONFIRM_INVITATION, body).catch(
      catchAxiosError
    );
    return response;
  };

  public invitationList = async (): Promise<IResponse> => {
    const response: IResponse = await apiGet(INVITATION_LIST).catch(
      catchAxiosError
    );
    return response;
  };
}
