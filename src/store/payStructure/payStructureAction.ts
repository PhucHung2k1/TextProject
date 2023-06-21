// import { CusServices } from "@/services/customer.service/customer.service";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PayStructureService } from '@/services/payStructure.service/payStructure.service';
import { setListPayStructure } from './payStructureSlice';

export const getListPayStructure = createAsyncThunk(
  'payStructure/getPayStructure',
  async (_body: any, { dispatch }) => {
    const PayStructureServiceAPI = new PayStructureService();

    try {
      const { data, status } = await PayStructureServiceAPI.getPayStructure();

      if (status === 200 || status === 201) {
        dispatch(setListPayStructure(data));
      }
    } catch (err: any) {
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
