import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  emailSignUp: string;
};
const initialState = {
  emailSignUp: '',
} as IInitialState;

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setEmailSignUp: (state, action) => {
      state.emailSignUp = action.payload;
    },
  },
  extraReducers: () => {},
});
export const { setEmailSignUp } = accountSlice.actions;
export default accountSlice.reducer;
