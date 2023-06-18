import type {
  IStoreCustomer,
  IStoreProfile,
} from '@/services/store.service/store.interface';
import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  StoreProfile: IStoreProfile[];
  progressSetupStore: number;
  prevProgress: number;
  storeCustomer: IStoreCustomer[];
};
const initialState = {
  StoreProfile: [],
  progressSetupStore: 1,
  prevProgress: 1,
  storeCustomer: [],
} as IInitialState;

const StoreSlice = createSlice({
  name: 'Store',
  initialState,
  reducers: {
    setResetProgressSetupStore: (state) => {
      state.prevProgress = 0;
      state.progressSetupStore = 1;
    },
    setResetProgressSetupStore: (state) => {
      state.prevProgress = 0;
      state.progressSetupStore = 1;
    },
    setIncreaseProgressSetupStore: (state) => {
      state.progressSetupStore += 1;
    },
    setDecreaseProgressSetupStore: (state: any) => {
      state.progressSetupStore -= 1;
    },
    setPrevProgress: (state: any) => {
      state.prevProgress = state.progressSetupStore;
    },
    setStoreCustomer: (state, action) => {
      state.storeCustomer = action.payload;
    },
  },
});

export const {
  setIncreaseProgressSetupStore,
  setDecreaseProgressSetupStore,
  setResetProgressSetupStore,
  setPrevProgress,
  setStoreCustomer,
} = StoreSlice.actions;

export default StoreSlice.reducer;
