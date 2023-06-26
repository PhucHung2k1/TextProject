import type {
  IInvitationListData,
  IListRoleCustomById as IListPermissionCustomById,
} from '@/services/customer.service/customer.interface';
import type {
  IAddRemoveMultiRole,
  IAllCustomerRole,
  IDetailRoleById,
} from '@/services/customerRole.service/customerRole.interface';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  listRole: IAllCustomerRole[];
  invitationList: IInvitationListData[];
  listPermissionCustomById: IListPermissionCustomById[];
  addNewRoleId: string;
  addRemoveMultiRoleIds: IAddRemoveMultiRole; //
  detailRoleById: IDetailRoleById;
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
  listPermissionCustomById: [],
  addNewRoleId: '',
  addRemoveMultiRoleIds: {
    AddedPermissions: [],
    RemovedPermissions: [],
  },
  detailRoleById: {
    Name: '',
    Active: true,
    IsSystemRole: false,
    SystemName: null,
    StoreId: '',
    Type: null,
    Permissions: [],
    Id: '',
    CreateBy: null,
    CreateDate: '',
    LastModifiedBy: null,
    LastModifiedDate: null,
  },
} as unknown as IInitialState;

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
    setAddRemoveMultiRoleIds: (state, action) => {
      state.addRemoveMultiRoleIds = action.payload;
    },
    setDetailRoleById: (state, action) => {
      state.detailRoleById = action.payload;
    },
  },
});
export const {
  setListRole,
  setInvitationList,
  setListPermissionCustomById,
  setAddNewRoleId,
  setAddRemoveMultiRoleIds,
  setDetailRoleById,
} = customerRoleSlice.actions;
export default customerRoleSlice.reducer;
