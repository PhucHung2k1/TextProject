import type { ICustomerProfile } from '@/services/customer.service/customer.interface';
import { createSlice } from '@reduxjs/toolkit';

export interface IMyRole {
  Name: string;
  Active: boolean;
  IsSystemRole: boolean;
  SystemName: string;
  Permissions: Permission[];
  Id: string;
}

export interface Permission {
  Name: string;
  SystemName: string;
  Category: string;
  Id: string;
}

type IInitialState = {
  dataMyRole: IMyRole[];
  dataCustomerProfile: ICustomerProfile;
};
const initialState = {
  dataMyRole: [],
  dataCustomerProfile: {},
} as unknown as IInitialState;

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setDataMyRole: (state, action) => {
      state.dataMyRole = action.payload;
    },
    setDataCustomerProfile: (state, action) => {
      state.dataCustomerProfile = action.payload;
    },
  },
});
export const { setDataMyRole, setDataCustomerProfile } = customerSlice.actions;
export default customerSlice.reducer;
