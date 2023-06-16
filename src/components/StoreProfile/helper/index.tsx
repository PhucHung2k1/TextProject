import {
  setDecreaseProgressSetupStore,
  setIncreaseProgressSetupStore,
  setPrevProgress,
} from '@/store/store/storeSlice';

export const handlePreviousProgressSetupStore = (
  dispatch: (arg0: { payload: any; type: any }) => void
) => {
  dispatch(setPrevProgress());
  dispatch(setDecreaseProgressSetupStore());
};
export const handleForwardProgressSetupStore = (
  dispatch: (arg0: { payload: any; type: any }) => void
) => {
  dispatch(setPrevProgress());
  dispatch(setIncreaseProgressSetupStore());
};
