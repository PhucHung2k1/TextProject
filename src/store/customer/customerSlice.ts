import type { ICustomerProfile } from '@/services/customer.service/customer.interface';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  customerProfile: ICustomerProfile;
};
const initialState = {
  customerProfile: {},
} as IInitialState;

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomerProfile: (state, action) => {
      state.customerProfile = action.payload;
    },
  },
});
export const { setCustomerProfile } = customerSlice.actions;
export default customerSlice.reducer;
