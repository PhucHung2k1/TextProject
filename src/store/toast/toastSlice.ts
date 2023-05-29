import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowToast: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state) => {
      state.isShowToast = true;
    },
    hideToast: (state) => {
      state.isShowToast = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
