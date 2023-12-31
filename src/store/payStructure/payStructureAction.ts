// import { CusServices } from "@/services/customer.service/customer.service";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PayStructureService } from '@/services/payStructure.service/payStructure.service';
import {
  setIdPayStructureAssignEmployee,
  setListPayStructure,
  setPayStructureById,
} from './payStructureSlice';
import type { ICreatePayStructurePayLoad } from '@/services/payStructure.service/payStructure.interface';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import type {
  IAddRemoveMultiPayStructureEmployee,
  IPatchPayloadData,
} from '@/services/customerRole.service/customerRole.interface';

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
export const addPayStructure = createAsyncThunk(
  'payStructure/addPayStructure',
  async (_body: ICreatePayStructurePayLoad, { dispatch }) => {
    const PayStructureServiceAPI = new PayStructureService();

    try {
      const { data, status, error } =
        await PayStructureServiceAPI.addPayStructure(_body);

      if (status === 200 || status === 201) {
        showToastMessage(dispatch, 'Successfully', 'success');
        dispatch(setIdPayStructureAssignEmployee(data?.Id));
        dispatch(getListPayStructure({}));
        return { data, status };
      }
      if (error) {
        showToastMessage(
          dispatch,
          error?.data?.extendData[0]?.Message,
          'error'
        );
        return error;
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
      const { status } = await PayStructureServiceAPI.deletePayStructure(id);

      if (status === 200 || status === 201 || status === 204) {
        showToastMessage(dispatch, `Update success!`, 'success');
        dispatch(getListPayStructure({}));
      }
    } catch (err: any) {
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);

export const addRemoveMultiPayStructureEmployee = createAsyncThunk(
  '/role/addRemoveMultiRoleEmployee',
  async (body: IAddRemoveMultiPayStructureEmployee, { dispatch }) => {
    const servicesRole = new PayStructureService();
    try {
      const { data, status, error } =
        await servicesRole.addRemoveMultiPayStructureEmployee(
          body.payStructureId,
          body.data
        );

      if (status === 200 || status === 201) {
        showToastMessage(dispatch, `Update success!`, 'success');
        dispatch(getListPayStructure({}));

        return data;
      }

      if (error) {
        showToastMessage(dispatch, error?.message || 'Send failed', 'error');
        return error;
      }
    } catch (err: any) {
      // err
    }
  }
);

export const getPayStructureById = createAsyncThunk(
  'payStructure/getPayStructureById',
  async (id: string, { dispatch }) => {
    const PayStructureServiceAPI = new PayStructureService();

    try {
      const { data, status, error } =
        await PayStructureServiceAPI.getPayStructureById(id);

      if (status === 200 || status === 201) {
        dispatch(setPayStructureById(data));
        return { data, status };
      }
      if (error) {
        return error;
      }
    } catch (err: any) {
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);

interface IUpdatePayStructureById {
  id: string;
  data: IPatchPayloadData[];
}
export const updatePayStructureById = createAsyncThunk(
  'payStructure/updatePayStructureById',
  async (body: IUpdatePayStructureById, { dispatch }) => {
    const PayStructureServiceAPI = new PayStructureService();

    try {
      const { data, status, error } =
        await PayStructureServiceAPI.updatePayStructureById(body.id, body.data);

      if (status === 200 || status === 201) {
        dispatch(getListPayStructure({}));
        return { data, status };
      }
      if (error) {
        return error;
      }
    } catch (err: any) {
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
