import type { ICustomer } from '@/services/customer.service/customer.interface';
import { createSlice } from '@reduxjs/toolkit';
import type {
  IPermissionData,
  PermissionItem,
} from '@/services/permission.services/permission.interface';

export interface CusDataState {
  listCustomer: ICustomer[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string | any;
  activeTab: number;
  permissionList: PermissionItem[];
  permissionAll: IPermissionData;
}
const initialState: CusDataState = {
  listCustomer: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: '',

  activeTab: 1000,
  permissionList: [],
  permissionAll: {
    Appointments: [],
    ClientManagements: [],
    CreateCharges: [],
    Marketings: [],
    NeedHelps: [],
    SalonCenters: [],
    SalonExchanges: [],
    SalonSettings: [],
    TechPortals: [],
    TicketManagers: [],
  },
};

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    setListCustomer: (state, action) => {
      state.listCustomer = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setPermissionList: (state, action) => {
      state.permissionList = action.payload;
    },
    setPermissionAll: (state, action) => {
      state.permissionAll = action.payload;
    },
  },
  extraReducers: () => {
    // builder.addCase(getListCustomer.pending, (state) => {
    //   state.isLoading = true;
    // });
  },
});

export const {
  setListCustomer,
  setActiveTab,
  setPermissionList,
  setPermissionAll,
} = permissionSlice.actions;
export default permissionSlice.reducer;
