import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShowToast: false,
  messageToast: '',
  propertiesToast: {
    autoHideDuration: 3000,
    position: {
      vertical: 'top',
      horizontal: 'center',
    },
    typeAlert: 'success',
  },
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state) => {
      state.isShowToast = true;
    },
    hideToast: (state) => {
      state.isShowToast = false;
    },
    setMessageToast: (state, action) => {
      state.messageToast = action.payload;
    },
    setPropertiesToast: (state, action) => {
      state.propertiesToast = action.payload;
    },
  },
});

export const { showToast, hideToast, setMessageToast, setPropertiesToast } =
  toastSlice.actions;
export default toastSlice.reducer;
