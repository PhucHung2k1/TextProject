import { CusServices } from "@/services/customer.service/customer.service";
import { Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getListCustomer = createAsyncThunk(
  "cus/getListCustomer",
  async () => {
    const cusServices = new CusServices();
    try {
      const { data } = await cusServices.getCus();

      if (data) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const addCustomer = createAsyncThunk(
  "cus/addCustomer",
  async (body: any, { dispatch, extra }) => {
    const cusServices = new CusServices();
    try {
      const { data } = await cusServices.addCus(body);
      if (data) {
        dispatch(getListCustomer());
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteCustomer = createAsyncThunk(
  "cus/deleteCustomer",
  async (id: number, { dispatch, extra }) => {
    const cusServices = new CusServices();
    try {
      const { data } = await cusServices.deleteCus(id);

      if (data) {
        dispatch(getListCustomer());
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const updateCustomer = createAsyncThunk(
  "cus/updateCustomer",
  async (body: any, { dispatch, extra }) => {
    const cusServices = new CusServices();

    try {
      const { data } = await cusServices.updateCus(body);

      if (data) {
        dispatch(getListCustomer());

        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
