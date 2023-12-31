import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import loadingSlice from './loading/loadingSlice';
import modalSlice from './modal/modalSlice';
import toastSlice from './toast/toastSlice';
import customerRoleSlice from './customerRole/customerRoleSlice';
import permissionSlice from './permission/permissionSlice';
import customerSlice from './customer/customerSlice';
import accountSlice from './account/accountSlice';
import storeSlice from './store/storeSlice';
import commonSlice from './common/commonSlice';
import workingHoursSlice from './workingHours/workingHoursSlice';
import payStructureSlice from './payStructure/payStructureSlice';
import employeeSlice from './employee/employeeSlice';

export const store = configureStore({
  reducer: {
    toastSlice,
    modalSlice,
    loadingSlice,
    customerRoleSlice,
    permissionSlice,
    customerSlice,
    accountSlice,
    storeSlice,
    commonSlice,
    workingHoursSlice,
    payStructureSlice,
    employeeSlice,
  },
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
