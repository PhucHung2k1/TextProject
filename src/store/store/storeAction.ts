import { createAsyncThunk } from '@reduxjs/toolkit';
import { Store } from '@/services/store.service/store.service';
import { setStoreCustomer } from './storeSlice';
import { showToastMessage } from '@/utils/helper/showToastMessage';
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
interface IUpdateLocationPayload {
  id: string;
  body: any;
}
export const updateLocationStoreProfile = createAsyncThunk(
  'store/updateLocationStoreProfile',
  async ({ id, body }: IUpdateLocationPayload, { dispatch }) => {
    const servicesStoreApi = new Store();

    try {
      const { status, error } = await servicesStoreApi.updateStore(id, body);

      if (status === 200 || status === 201 || status === 204) {
        dispatch(getStoreCustomer({}));
        showToastMessage(dispatch, 'Update successfully', 'success');
      }
      if (error) {
        showToastMessage(dispatch, error?.data.message, 'error');
      }
    } catch (err: any) {
      // console.log(err);
    }
  }
);
