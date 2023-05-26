import { Customer } from "@/services/customer.service/customer.interface";
import { createSlice } from "@reduxjs/toolkit";
import {
  addCustomer,
  deleteCustomer,
  getListCustomer,
  updateCustomer,
} from "./customerAction";

export interface CusDataState {
  listCustomer: Customer[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string | any;
}
const initialState: CusDataState = {
  listCustomer: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
};

const cusSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setListCustomer: (state, action) => {
      state.listCustomer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListCustomer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListCustomer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.listCustomer = action.payload;
    });
    builder.addCase(getListCustomer.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = action.payload;
    });

    builder.addCase(addCustomer.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addCustomer.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(addCustomer.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = action.payload;
    });

    builder.addCase(deleteCustomer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCustomer.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteCustomer.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(updateCustomer.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
  },
});

export const { setListCustomer } = cusSlice.actions;
export default cusSlice.reducer;
