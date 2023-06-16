import type { IInvitationListData } from '@/services/customer.service/customer.interface';
import type { IAllCustomerRole } from '@/services/customerRole.service/customerRole.interface';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  listRole: IAllCustomerRole[];
  invitationList: IInvitationListData[];
};
const initialState = {
  listRole: [
    {
      Name: '',
      Active: true,
      IsSystemRole: true,
      SystemName: '',
      Permissions: [],
      Id: '',
    },
  ],
  invitationList: [],
} as IInitialState;

const customerRoleSlice = createSlice({
  name: 'customerRole',
  initialState,
  reducers: {
    setListRole: (state, action) => {
      state.listRole = action.payload;
    },
    setInvitationList: (state, action) => {
      state.invitationList = action.payload;
    },
  },
});
export const { setListRole, setInvitationList } = customerRoleSlice.actions;
export default customerRoleSlice.reducer;
