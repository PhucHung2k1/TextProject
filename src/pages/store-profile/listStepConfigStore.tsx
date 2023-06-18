import AddYourEmployee from '@/components/StoreProfile/AddYourEmployee';
import AddYourLocation from '@/components/StoreProfile/AddYourLocation';
import AddYourService from '@/components/StoreProfile/AddYourService';
import ConfirmYourAddress from '@/components/StoreProfile/ConfirmYourAddress';
import Congratulations from '@/components/StoreProfile/Congratulations';
import StoreWorkingHoursSetup from '@/components/StoreProfile/StoreWorkingHoursSetup';
import type { IConfigStore } from '@/services/store.service/store.interface';

export const listStepConfigStore: IConfigStore[] = [
  {
    step: 1,
    component: <ConfirmYourAddress />,
  },
  {
    step: 2,
    component: <AddYourLocation />,
  },
  {
    step: 3,
    component: <StoreWorkingHoursSetup />,
  },
  {
    step: 4,
    component: <AddYourService />,
  },
  {
    step: 5,
    component: <AddYourEmployee />,
  },
  {
    step: 6,
    component: <Congratulations />,
  },
];
