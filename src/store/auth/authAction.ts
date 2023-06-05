import { AuthAPI } from '@/services/auth.service/auth.service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (
    body: any
    // { dispatch, extra }
  ) => {
    const servicesAuthAPI = new AuthAPI();

    try {
      const { data, status, error } = await servicesAuthAPI.signUp(body);

      if (status === 200 && data) {
        console.log('success', data);

        return data;
      }

      throw new Error(error ? JSON.stringify(error) : 'Sign-Up failed.');
    } catch (err: any) {
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
