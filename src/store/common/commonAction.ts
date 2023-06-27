import { createAsyncThunk } from '@reduxjs/toolkit';
import { Common } from '@/services/common/common.service';
import { setLookupData } from './commonSlice';

export const lookupData = createAsyncThunk(
  'common/lookupData',
  async (_body: any, { dispatch }) => {
    const servicesCommonAPI = new Common();

    try {
      const { data, status, error } = await servicesCommonAPI.lookupData();

      if (status === 200) {
        dispatch(setLookupData(data));
        return data;
      }
      return error;
    } catch (err: any) {
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
