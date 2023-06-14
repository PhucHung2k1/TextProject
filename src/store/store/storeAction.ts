import { createAsyncThunk } from '@reduxjs/toolkit';
import { Store } from '@/services/store.service/store.service';
import { setStoreProfile } from './storeSlice';

export const getStoreProfile = createAsyncThunk(
  '/store/my-store-profile',
  async (_body: any, { dispatch }) => {
    const servicesStoreAPI = new Store();
    try {
      const { data, status, error } = await servicesStoreAPI.getStoreProfile();

      if ((status === 200 || status === 201) && data) {
        dispatch(setStoreProfile(data));
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {}
  }
);
