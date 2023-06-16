import AboutYourBusiness from '@/components/StoreProfile/AboutYourBusiness';
import AddYourEmployee from '@/components/StoreProfile/AddYourEmployee';
import AddYourService from '@/components/StoreProfile/AddYourService';
import ConfirmYourAddress from '@/components/StoreProfile/ConfirmYourAddress';
import Congratulations from '@/components/StoreProfile/Congratulations';
import StoreWorkingHoursSetup from '@/components/StoreProfile/StoreWorkingHoursSetup';
import { useAppSelector } from '@/store/hook';

const StoreProfile = () => {
  // const dispatch = useAppDispatch();
  const progressSetupStore = useAppSelector(
    (state) => state.storeSlice.progressSetupStore
  );
  const listComponent = [
    {
      step: 1,
      content: <AboutYourBusiness />,
    },
    {
      step: 2,
      content: <ConfirmYourAddress />,
    },
    {
      step: 3,
      content: <StoreWorkingHoursSetup />,
    },
    {
      step: 4,
      content: <AddYourService />,
    },
    {
      step: 5,
      content: <AddYourEmployee />,
    },
    {
      step: 6,
      content: <Congratulations />,
    },
  ];

  return (
    <main className="flex h-screen items-center justify-center bg-mango-gray-light-2">
      {listComponent.find((item) => item.step === progressSetupStore)?.content}
    </main>
  );
};
export default StoreProfile;
