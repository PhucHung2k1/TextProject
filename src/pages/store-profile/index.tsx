import { lookupData } from '@/store/common/commonAction';
import { getAllRole } from '@/store/customerRole/customerRoleAction';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { listStepConfigStore } from '../../components/StoreProfile/helper/listStepConfigStore';
import { getWorkingHours } from '@/store/workingHours/workingHoursAction';
import { getListPayStructure } from '@/store/payStructure/payStructureAction';

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
      dispatch(getListPayStructure({}));
      dispatch(getWorkingHours({}));
    }
  }, [router.pathname]);

  return (
    <main className="flex h-screen items-center justify-center bg-mango-gray-light-2">
      {
        listStepConfigStore.find((item) => item.step === progressSetupStore)
          ?.component
      }
    </main>
  );
};
export default StoreProfile;
