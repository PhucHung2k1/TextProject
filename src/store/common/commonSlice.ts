import type { ILookupData } from '@/services/common/common.interface';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  lookupData: ILookupData;
  openDrawerRolePermission: boolean;
  openDrawerPayStructure: boolean;
};
const initialState = {
  lookupData: {
    CountryPhone: [{ Description: '', Name: '', Value: '' }],
    ProductType: [{ Description: '', Name: '', Value: '' }],
    TimeZone: [{ Description: '', Name: '', Value: '' }],
    PayStructure: [{ Description: '', Name: '', Value: '' }],
  },
  openDrawerRolePermission: false,
  openDrawerPayStructure: false,
} as IInitialState;

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLookupData(state, action) {
      state.lookupData = action.payload;
    },
    showDrawerRolePermission(state) {
      state.openDrawerRolePermission = true;
    },
    hideDrawerRolePermission(state) {
      state.openDrawerRolePermission = false;
    },
    showDrawerPayStructure(state) {
      state.openDrawerPayStructure = true;
    },
    hideDrawerPayStructure(state) {
      state.openDrawerPayStructure = false;
    },
  },
});
export const {
  setLookupData,
  hideDrawerRolePermission,
  showDrawerRolePermission,
  showDrawerPayStructure,
  hideDrawerPayStructure,
} = commonSlice.actions;
export default commonSlice.reducer;
