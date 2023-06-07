import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import loadingSlice from './loading/loadingSlice';
import modalSlice from './modal/modalSlice';
import toastSlice from './toast/toastSlice';
import customerRoleSlice from './customerRole/customerRoleSlice';

export const store = configureStore({
  reducer: { toastSlice, modalSlice, loadingSlice, customerRoleSlice },
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
