import type { IAllCustomerRole } from '@/services/customerRole.service/customerRole.interface';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  listRole: IAllCustomerRole[];
};
const initialState = {
  listRole: [],
} as IInitialState;

const customerRoleSlice = createSlice({
  name: 'customerRole',
  initialState,
  reducers: {
    setListRole: (state, action) => {
      state.listRole = action.payload;
    },
  },
  extraReducers: () => {
    // builder
    //   .addMatcher(
    //     (action) => {
    //       return action.type.endsWith('/pending');
    //     },
    //     (state) => {
    //       state.isLoading = true;
    //     }
    //   )
    //   .addMatcher(
    //     (action) =>
    //       action.type.endsWith('/fulfilled') ||
    //       action.type.endsWith('/rejected'),
    //     (state) => {
    //       state.isLoading = false;
    //     }
    //   );
  },
});
export const { setListRole } = customerRoleSlice.actions;
export default customerRoleSlice.reducer;
