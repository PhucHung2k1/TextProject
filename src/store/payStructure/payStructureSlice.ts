import type { IAddRemoveMultiPayStructureEmployee } from '@/services/customerRole.service/customerRole.interface';
import type {
  ICreatePayStructurePayLoad,
  IPayStructureData,
} from '../../services/payStructure.service/payStructure.interface';
import { createSlice } from '@reduxjs/toolkit';

export interface PayStructureDataState {
  listPayStructure: IPayStructureData[];
  payloadAddPayStructure: ICreatePayStructurePayLoad;
  idPayStructureAssignEmployee: string;
  addRemoveMultiPayStructureEmployee: IAddRemoveMultiPayStructureEmployee;
}
const initialState: PayStructureDataState = {
  listPayStructure: [],
  payloadAddPayStructure: {
    PayStructure: {},
    Configuration: {},
  },
  idPayStructureAssignEmployee: '',
  addRemoveMultiPayStructureEmployee: {
    payStructureId: '',
    data: { AddedEmployeeIds: [], RemovedEmployeeIds: [] },
  },
};

const payStructureSlice = createSlice({
  name: 'payStructure',
  initialState,
  reducers: {
    setListPayStructure: (state, action) => {
      state.listPayStructure = action.payload;
    },
    setPayloadAddPayStructure: (state, action) => {
      state.payloadAddPayStructure = action.payload;
    },
    setIdPayStructureAssignEmployee: (state, action) => {
      state.idPayStructureAssignEmployee = action.payload;
    },
    setAddRemoveMultiPayStructureEmployee: (state, action) => {
      state.addRemoveMultiPayStructureEmployee = action.payload;
    },
  },
  extraReducers: () => {
    // builder.addCase(getListCustomer.pending, (state) => {
    //   state.isLoading = true;
    // });
  },
});

export const {
  setListPayStructure,
  setPayloadAddPayStructure,
  setIdPayStructureAssignEmployee,
  setAddRemoveMultiPayStructureEmployee,
} = payStructureSlice.actions;
export default payStructureSlice.reducer;
