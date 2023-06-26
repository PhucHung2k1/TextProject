import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isLoadingLogin: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoadingLogin: (state, action) => {
      state.isLoadingLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.endsWith('/pending');
        },
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/fulfilled') ||
          action.type.endsWith('/rejected'),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});
export const { showLoadingLogin } = loadingSlice.actions;
export default loadingSlice.reducer;
