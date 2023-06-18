import type { IStoreProfile } from '@/services/store.service/store.interface';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  StoreProfile: IStoreProfile[];
  progressSetupStore: number;
  prevProgress: number;
};
const initialState = {
  StoreProfile: [],
  progressSetupStore: 1,
  prevProgress: 1,
} as IInitialState;

const StoreSlice = createSlice({
  name: 'Store',
  initialState,
  reducers: {
    setStoreProfile: (state: any, action: any) => {
      state.StoreProfile = action.payload;
    },

    setIncreaseProgressSetupStore: (state: any) => {
      state.progressSetupStore += 1;
    },
    setDecreaseProgressSetupStore: (state: any) => {
      state.progressSetupStore -= 1;
    },
    setPrevProgress: (state: any) => {
      state.prevProgress = state.progressSetupStore;
    },
  },
});
export const {
  setStoreProfile,
  setIncreaseProgressSetupStore,
  setDecreaseProgressSetupStore,
  setPrevProgress,
} = StoreSlice.actions;
export default StoreSlice.reducer;
