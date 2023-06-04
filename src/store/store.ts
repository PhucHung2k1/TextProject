import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import modalSlice from './modal/modalSlice';
import toastSlice from './toast/toastSlice';

export const store = configureStore({
  reducer: { toastSlice, modalSlice },
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
