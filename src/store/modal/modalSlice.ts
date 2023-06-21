import { createSlice } from '@reduxjs/toolkit';
import type React from 'react';

type ModalModel = {
  isShowModal: boolean;
  modalContent?: React.ReactNode;
  isShowModalMUI: boolean;
  modalContentMUI?: React.ReactNode;
  hideModalCustom: boolean;
};

const initialState = {
  isShowModal: false,
  modalContent: null,
  isShowModalMUI: false,
  modalContentMUI: undefined,
  hideModalCustom: false,
} as ModalModel;

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state) => {
      state.isShowModal = true;
    },
    hideModal: (state) => {
      state.isShowModal = false;
    },
    setModalContent: (state, action) => {
      state.modalContent = action.payload;
    },
    clearModalContent: (state) => {
      state.modalContent = null;
    },
    showModalMUI: (state) => {
      state.isShowModalMUI = true;
    },
    hideModalMUI: (state) => {
      state.isShowModalMUI = false;
    },
    setModalContentMUI: (state, action) => {
      state.modalContentMUI = action.payload;
    },
    clearModalContentMUI: (state) => {
      state.modalContentMUI = undefined;
    },
    hideModalCustom: (state) => {
      state.hideModalCustom = true;
    },
    resetStatusModalCustom: (state) => {
      state.hideModalCustom = false;
    },
  },
});

export const {
  showModal,
  hideModal,
  setModalContent,
  clearModalContent,
  showModalMUI,
  hideModalMUI,
  setModalContentMUI,
  clearModalContentMUI,
  hideModalCustom,
  resetStatusModalCustom,
} = modalSlice.actions;
export default modalSlice.reducer;
