// import { CusServices } from "@/services/customer.service/customer.service";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PayStructureService } from '@/services/payStructure.service/payStructure.service';
import { setListPayStructure } from './payStructureSlice';
import { showToastMessage } from '@/utils/helper/showToastMessage';

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

export const deletePayStructure = createAsyncThunk(
  'payStructure/deletePayStructure',
  async (id: string, { dispatch }) => {
    const PayStructureServiceAPI = new PayStructureService();

    try {
      const { data, status } = await PayStructureServiceAPI.deletePayStructure(id);

      if (status === 200 || status === 201 || status === 204) {
        showToastMessage(dispatch, `Update success!`, 'success');
        dispatch(getListPayStructure({}));
      }
    } catch (err: any) {
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
