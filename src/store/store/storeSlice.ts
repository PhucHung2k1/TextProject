import type { IStoreProfile } from '@/services/store.service/store.interface';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  StoreProfile: IStoreProfile;
  CurrentStepConfigStore?: number;
};
const initialState = {
  StoreProfile: {},
  CurrentStepConfigStore: -1,
} as IInitialState;

const StoreSlice = createSlice({
  name: 'Store',
  initialState,
  reducers: {
    setStoreProfile: (state, action) => {
      state.StoreProfile = action.payload;
    },
    setCurrentStepConfigStore: (state, action) => {
      state.CurrentStepConfigStore = action.payload;
    },
  },
});
export const { setStoreProfile, setCurrentStepConfigStore } =
  StoreSlice.actions;
export default StoreSlice.reducer;
