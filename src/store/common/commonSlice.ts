import type { ILookupData } from '@/services/common/common.interface';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  lookupData: ILookupData;
};
const initialState = {
  lookupData: {
    CountryPhone: [{ Description: '', Name: '', Value: '' }],
    ProductType: [{ Description: '', Name: '', Value: '' }],
    TimeZone: [{ Description: '', Name: '', Value: '' }],
    PayStructure: [{ Description: '', Name: '', Value: '' }],
  },
} as IInitialState;

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLookupData(state, action) {
      state.lookupData = action.payload;
    },
  },
});
export const { setLookupData } = commonSlice.actions;
export default commonSlice.reducer;
