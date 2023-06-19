import { IWorkingHours } from "@/services/workingHours.service/workingHours.interface";
import { createSlice } from "@reduxjs/toolkit";

type IInitialState = {
  workingHours: IWorkingHours[];
};
const initialState = {
  workingHours: [],
} as IInitialState;

const WorkingHoursSlice = createSlice({
  name: 'store-hours',
  initialState,
  reducers: {
    setWorkingHours: (state: any, action: any) => {
      state.workingHours = action.payload;
    },
  }
}
)

export const {
  setWorkingHours
} = WorkingHoursSlice.actions;

export default WorkingHoursSlice.reducer;