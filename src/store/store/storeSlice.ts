import type { IStoreProfile } from '@/services/store.service/store.interface';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  StoreProfile: IStoreProfile;
};
const initialState = {
  StoreProfile: {},
} as IInitialState;

const StoreSlice = createSlice({
  name: 'Store',
  initialState,
  reducers: {
    setStoreProfile: (state, action) => {
      state.StoreProfile = action.payload;
    },
  },
});
export const { setStoreProfile } = StoreSlice.actions;
export default StoreSlice.reducer;
