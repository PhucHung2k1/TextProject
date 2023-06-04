import { CusServices } from "@/services/customer.service/customer.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListCustomer = createAsyncThunk(
  "cus/getListCustomer",
  async () => {
    const cusServices = new CusServices();
    try {
      const { data } = await cusServices.getCustomer();

      if (data) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
<<<<<<< Updated upstream
  }
);
export const addCustomer = createAsyncThunk(
  "cus/addCustomer",
  async (body: any, { dispatch }) => {
    const cusServices = new CusServices();
    try {
      const { data } = await cusServices.addCustomer(body);
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
  async (id: number, { dispatch }) => {
    const cusServices = new CusServices();
    try {
      const { data } = await cusServices.deleteCustomer(id);
=======
  } catch (error) {}
})
export const addCustomer = createAsyncThunk('cus/addCustomer', async (body: any, { dispatch }) => {
  const cusServices = new CusServices()
  try {
    const { data } = await cusServices.addCustomer(body)
    if (data) {
      dispatch(getListCustomer())
      return data
    }
  } catch (error) {}
})
export const deleteCustomer = createAsyncThunk('cus/deleteCustomer', async (id: number, { dispatch }) => {
  const cusServices = new CusServices()
  try {
    const { data } = await cusServices.deleteCustomer(id)
>>>>>>> Stashed changes

      if (data) {
        dispatch(getListCustomer());
        return data;
      }
    } catch (error) {
      console.log(error);
    }
<<<<<<< Updated upstream
  }
);
export const updateCustomer = createAsyncThunk(
  "cus/updateCustomer",
  async (body: any, { dispatch }) => {
    const cusServices = new CusServices();
=======
  } catch (error) {}
})
export const updateCustomer = createAsyncThunk('cus/updateCustomer', async (body: any, { dispatch }) => {
  const cusServices = new CusServices()
>>>>>>> Stashed changes

    try {
      const { data } = await cusServices.updateCustomer(body);

      if (data) {
        dispatch(getListCustomer());

        return data;
      }
    } catch (error) {
      console.log(error);
    }
<<<<<<< Updated upstream
  }
);
=======
  } catch (error) {}
})
>>>>>>> Stashed changes
