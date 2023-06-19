import { WorkingHours } from '@/services/workingHours.service/workingHours.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setWorkingHours } from './workingHoursSlice';

// import { showToastMessage } from '@/utils/helper/showToastMessage';

export const getWorkingHours = createAsyncThunk(
  '/store/getWorkingHours',
  async (_body: any, { dispatch }) => {
    const servicesWorkingHours = new WorkingHours();
    try {
      const { data, status, error } = await servicesWorkingHours.getWorkingHours();

      if ((status === 200 || status === 201) && data) {
        dispatch(setWorkingHours(data))
        return data;
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      // err
    }
  }
);
