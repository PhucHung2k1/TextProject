import type { ILookupData } from '@/services/common/common.interface';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  lookupData: ILookupData;
  openDrawerRolePermission: boolean;
};
const initialState = {
  lookupData: {
    CountryPhone: [{ Description: '', Name: '', Value: '' }],
    ProductType: [{ Description: '', Name: '', Value: '' }],
    TimeZone: [{ Description: '', Name: '', Value: '' }],
    PayStructure: [{ Description: '', Name: '', Value: '' }],
  },
  openDrawerRolePermission: false,
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
  },
});
export const {
  setLookupData,
  hideDrawerRolePermission,
  showDrawerRolePermission,
} = commonSlice.actions;
export default commonSlice.reducer;
