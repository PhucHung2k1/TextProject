import {
  setDecreaseProgressSetupStore,
  setIncreaseProgressSetupStore,
  setPrevProgress,
  setResetProgressSetupStore,
} from '@/store/store/storeSlice';

export const handlePreviousProgressSetupStore = (
  dispatch: (arg0: { payload: any; type: any }) => void
) => {
  dispatch(setDecreaseProgressSetupStore());
};
export const handleForwardProgressSetupStore = (
  dispatch: (arg0: { payload: any; type: any }) => void
) => {
  dispatch(setPrevProgress());
  dispatch(setIncreaseProgressSetupStore());
};
export const handleResetProgressSetupStore = (
  dispatch: (arg0: { payload: any; type: any }) => void
) => {
  dispatch(setResetProgressSetupStore());
};
