import type { IResponse } from '@/utils/axios/entities';
import { apiGet } from '@/utils/axios/instance';

import { catchAxiosError } from '@/utils/axios/error';

const LOOKUP_DATA =
  '/common/lookup-data/TimeZone,CountryPhone,PayStructure,ProductType';

export class Common {
  public lookupData = async (): Promise<IResponse> => {
    const response: IResponse = await apiGet(LOOKUP_DATA).catch(
      catchAxiosError
    );
    return response;
  };
}
