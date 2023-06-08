import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  infoSignUp: {
    email: string;
    customerId: string;
  };
};
const initialState = {
  infoSignUp: {
    email: '',
    customerId: '',
  },
} as IInitialState;

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setInfoSignUp: (state, action) => {
      state.infoSignUp = action.payload;
    },
  },
  extraReducers: () => {},
});
export const { setInfoSignUp } = accountSlice.actions;
export default accountSlice.reducer;
