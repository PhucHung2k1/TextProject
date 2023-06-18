import AboutYourBusiness from '@/components/StoreProfile/AboutYourBusiness';
import AddYourEmployee from '@/components/StoreProfile/AddYourEmployee';
import AddYourService from '@/components/StoreProfile/AddYourService';
import ConfirmYourAddress from '@/components/StoreProfile/ConfirmYourAddress';
import Congratulations from '@/components/StoreProfile/Congratulations';
import StoreWorkingHoursSetup from '@/components/StoreProfile/StoreWorkingHoursSetup';
import { lookupData } from '@/store/common/commonAction';
import { getAllRole } from '@/store/customerRole/customerRoleAction';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const StoreProfile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const progressSetupStore = useAppSelector(
    (state) => state.storeSlice.progressSetupStore
  );

  useEffect(() => {
    if (router.pathname === '/store-profile') {
      dispatch(getAllRole({}));
      dispatch(lookupData({}));
    }
  }, [router.pathname]);

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
