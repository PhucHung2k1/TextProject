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

const passwordCustomerSlice = createSlice({
  name: 'passwordCustomer',
  initialState,
  reducers: {
    setInfoSignUp: (state, action) => {
      state.infoSignUp = action.payload;
    },
  },
});
export const { setInfoSignUp } = passwordCustomerSlice.actions;
export default passwordCustomerSlice.reducer;
