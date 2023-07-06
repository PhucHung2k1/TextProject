import type { IAddRemoveMultiPayStructureEmployee } from '@/services/customerRole.service/customerRole.interface';
import type {
  ICreatePayStructurePayLoad,
  IPayStructureById,
  IPayStructureData,
} from '../../services/payStructure.service/payStructure.interface';
import { createSlice } from '@reduxjs/toolkit';
import { initConfigurationPayStructure } from '@/utils/helper/initPayStructure';

export interface PayStructureDataState {
  listPayStructure: IPayStructureData[];
  payloadAddPayStructure: ICreatePayStructurePayLoad;
  idPayStructureAssignEmployee: string;
  addRemoveMultiPayStructureEmployee: IAddRemoveMultiPayStructureEmployee;
  payStructureById: IPayStructureById;
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
  payStructureById: {
    PayStructure: {
      Id: '',
      StoreId: '',
      Name: 'Commission',
      Description: null,
      CreateBy: null,
      CreateDate: '2023-06-30T11:27:16.553992Z',
      LastModifiedBy: null,
      LastModifiedDate: null,
    },
    Configuration: initConfigurationPayStructure,
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
    setPayStructureById: (state, action) => {
      state.payStructureById = action.payload;
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
  setPayStructureById,
} = payStructureSlice.actions;
export default payStructureSlice.reducer;
