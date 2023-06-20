import { createAsyncThunk } from '@reduxjs/toolkit';

import { setMessageToast, showToast } from '../toast/toastSlice';
import { Customer } from '@/services/customer.service/customer.service';
import {
  setDataCustomerProfile,
  setDataMyRole,
  setInvitationToken,
  setIsInviteEmail,
} from './customerSlice';
import type {
  IConfirmInvitationPayload,
  ISendInvitationPayload,
} from '@/services/customer.service/customer.interface';
import { clearModalContentMUI, hideModalMUI } from '../modal/modalSlice';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { setInvitationList } from '../customerRole/customerRoleSlice';

export const getMyRole = createAsyncThunk(
  'account/getMyRole',
  async (_body: any, { dispatch }) => {
    const servicesCustomerAPI = new Customer();

    try {
      const { data, status, error } = await servicesCustomerAPI.getMyRole();

      if ((status === 200 || status === 201) && data) {
        dispatch(setDataMyRole(data));
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      dispatch(setMessageToast(err.extendData[0].Message));
      dispatch(showToast());
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);

export const invitationList = createAsyncThunk(
  'customer/invitationList',
  async (_body: any, { dispatch }) => {
    const servicesCustomerAPI = new Customer();

    try {
      const { data, status, error } =
        await servicesCustomerAPI.invitationList();

      if (status === 200 || status === 201) {
        dispatch(setInvitationList(data));
      }
      if (error) {
        showToastMessage(dispatch, error?.data.extendData[0]?.Message, 'error');
      }
    } catch (err: any) {
      // showToastMessage(dispatch, err?.extendData[0]?.Message, 'error');
    }
  }
);

export const sendInvitation = createAsyncThunk(
  'customer/sendInvitation',
  async (_body: ISendInvitationPayload, { dispatch }) => {
    const servicesCustomerAPI = new Customer();

    try {
      const { status, error } = await servicesCustomerAPI.sendInvitation(_body);

      if (status === 200 || status === 201) {
        dispatch(invitationList({}));
        dispatch(hideModalMUI());
        dispatch(clearModalContentMUI());
        showToastMessage(
          dispatch,
          'Invitation sent successfully, Please check your email!',
          'success'
        );
      }
      if (error) {
        showToastMessage(dispatch, error?.data.extendData[0]?.Message, 'error');
      }
    } catch (err: any) {
      // showToastMessage(dispatch, err?.extendData[0]?.Message, 'error');
    }
  }
);

export const confirmInvitation = createAsyncThunk(
  'customer/confirmInvitation',
  async (_body: IConfirmInvitationPayload, { dispatch }) => {
    const servicesCustomerAPI = new Customer();

    try {
      const { data, status, error } =
        await servicesCustomerAPI.confirmInvitation(_body);

      if (status === 200) {
        dispatch(invitationList({}));
        showToastMessage(dispatch, 'Join Store Success', 'success');
        return { data, status };
      }
      if (error) {
        showToastMessage(dispatch, error?.data.message, 'error');
        return error?.data;
      }
    } catch (err: any) {
      // showToastMessage(dispatch, err?.extendData[0]?.Message, 'error');
    }
  }
);
export const getCustomerProfile = createAsyncThunk(
  'account/getDataCustomerProfile',
  async (_body: any, { dispatch }) => {
    const servicesCustomerAPI = new Customer();

    try {
      const { data, status, error } =
        await servicesCustomerAPI.getCustomerProfile();

      if ((status === 200 || status === 201) && data) {
        dispatch(setDataCustomerProfile(data));
      }

      throw new Error(error ? JSON.stringify(error) : 'Failed.');
    } catch (err: any) {
      dispatch(setMessageToast(err.extendData[0].Message));
      dispatch(showToast());
      // throw new Error(`Error signing in: ${err.message}`);
    }
  }
);
export const checkExistCustomerByToken = createAsyncThunk(
  'account/checkExistCustomerByToken',
  async (_body: any, { dispatch }) => {
    const servicesCustomerAPI = new Customer();

    try {
      const { data, status, error } =
        await servicesCustomerAPI.checkExistCustomerByToken(_body);

      if (status === 200) {
        dispatch(setIsInviteEmail(true));
        dispatch(setInvitationToken(_body.Token));
        return { data };
      }
      if (error) {
        showToastMessage(dispatch, error?.data.message, 'error');
      }
    } catch (err: any) {
      // console.log(err);
    }
  }
);
