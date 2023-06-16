import { createAsyncThunk } from '@reduxjs/toolkit';
import { Store } from '@/services/store.service/store.service';
import { setStoreCustomer } from './storeSlice';
// import { showToastMessage } from '@/utils/helper/showToastMessage';

export const getStoreCustomer = createAsyncThunk(
  '/store/getStoreCustomer',
  async (_body: any, { dispatch }) => {
    const servicesStoreAPI = new Store();
    try {
      const { data, status, error } = await servicesStoreAPI.getStoreCustomer();

      if ((status === 200 || status === 201) && data) {
        dispatch(setStoreCustomer(data));
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      // err
    }
  }
);

export const updateStoreProfile = createAsyncThunk(
  'store/updateStore',
  async (id: string, body: any) => {
    const servicesStoreApi = new Store();

    try {
      const { status, error } = await servicesStoreApi.updateStore(id, body);

      if (status === 200 || status === 201 || status === 204) {
        // showToastMessage(dispatch, '', 'success');
        return { status, message: 'Successfully' };
      }
      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
