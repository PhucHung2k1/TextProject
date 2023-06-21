import type { IPayStructureData } from '../../services/payStructure.service/payStructure.interface';
import { createSlice } from '@reduxjs/toolkit';

export interface PayStructureDataState {
  listPayStructure: IPayStructureData[];
}
const initialState: PayStructureDataState = {
  listPayStructure: [],
};

const payStructureSlice = createSlice({
  name: 'payStructure',
  initialState,
  reducers: {
    setListPayStructure: (state, action) => {
      state.listPayStructure = action.payload;
    },
  },
  extraReducers: () => {
    // builder.addCase(getListCustomer.pending, (state) => {
    //   state.isLoading = true;
    // });
  },
});

export const { setListPayStructure } = payStructureSlice.actions;
export default payStructureSlice.reducer;
