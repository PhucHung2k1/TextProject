import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {},
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

export default loadingSlice.reducer;
