import type {
  IInvitationListData,
  IListRoleCustomById as IListPermissionCustomById,
} from '@/services/customer.service/customer.interface';
import type { IAllCustomerRole } from '@/services/customerRole.service/customerRole.interface';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  listRole: IAllCustomerRole[];
  invitationList: IInvitationListData[];
  listPermissionCustomById: IListPermissionCustomById[];
  addNewRoleId: string;
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
      Employees: [],
    },
  ],
  invitationList: [],
  listPermissionCustomById: [],
  addNewRoleId: '',
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
    setListPermissionCustomById: (state, action) => {
      state.listPermissionCustomById = action.payload;
    },
    setAddNewRoleId: (state, action) => {
      state.addNewRoleId = action.payload;
    },
  },
});
export const {
  setListRole,
  setInvitationList,
  setListPermissionCustomById,
  setAddNewRoleId,
} = customerRoleSlice.actions;
export default customerRoleSlice.reducer;
