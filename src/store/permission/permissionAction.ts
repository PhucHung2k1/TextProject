// import { CusServices } from "@/services/customer.service/customer.service";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PermissionService } from '@/services/permission.services/permission.service';
import { setPermissionAll } from '@/store/permission/permissionSlice';
import { setMessageToast, showToast } from '@/store/toast/toastSlice';

export const getAllPermission = createAsyncThunk(
  'permission/all',
  async (_body: any, { dispatch }) => {
    const PermissionServiceAPI = new PermissionService();

    try {
      const { data, status, error } =
        await PermissionServiceAPI.getAllPermission();

      if ((status === 200 || status === 201) && data) {
        dispatch(setPermissionAll(data));
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      dispatch(setMessageToast(err.extendData[0].Message));
      dispatch(showToast());
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
