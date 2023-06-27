import type {
  IInvitationListData,
  IListRoleCustomById as IListPermissionCustomById,
} from '@/services/customer.service/customer.interface';
import type {
  IAddRemoveMultiRole,
  IAddRemoveMultiRoleEmployee,
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
  addRemoveMultiRoleEmployee: IAddRemoveMultiRoleEmployee;
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
    Active: false,
    IsSystemRole: false,
    SystemName: null,
    StoreId: '',
    Type: '',
    IsTechnician: false,
    TakeAppointment: false,
    AvailableBookingOnline: false,
    AllowQuickPayment: false,
    Permissions: [],
    Id: '',
    CreateBy: null,
    CreateDate: '',
    LastModifiedBy: null,
    LastModifiedDate: null,
  },
  addRemoveMultiRoleEmployee: {
    roleId: '',
    data: { AddedEmployeeIds: [], RemovedEmployeeIds: [] },
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
    setAddRemoveMultiRoleEmployee: (state, action) => {
      state.addRemoveMultiRoleEmployee = action.payload;
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
  setAddRemoveMultiRoleEmployee,
} = customerRoleSlice.actions;
export default customerRoleSlice.reducer;
