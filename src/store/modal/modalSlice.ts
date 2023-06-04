import { createSlice } from '@reduxjs/toolkit';

type ModalModel = {
  isShowModal: boolean;
  modalContent?: React.ReactNode;
};

const initialState = {
  isShowModal: false,
  modalContent: null,
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
  },
});

export const { showModal, hideModal, setModalContent, clearModalContent } =
  modalSlice.actions;
export default modalSlice.reducer;
