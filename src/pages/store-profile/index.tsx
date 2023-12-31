import { lookupData } from '@/store/common/commonAction';
import { getAllRole } from '@/store/customerRole/customerRoleAction';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { listStepConfigStore } from '../../components/StoreProfile/helper/listStepConfigStore';
import { getWorkingHours } from '@/store/workingHours/workingHoursAction';
import { getListPayStructure } from '@/store/payStructure/payStructureAction';
import { getEmployeeList } from '@/store/employee/employeeAction';

const StoreProfile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const progressSetupStore = useAppSelector(
    (state) => state.storeSlice.progressSetupStore
  );

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (router.pathname === '/store-profile') {
        dispatch(getAllRole({}));
        dispatch(lookupData({}));
        dispatch(getListPayStructure({}));
        dispatch(getWorkingHours({}));
        dispatch(getEmployeeList({}));
      }
    }
    // cleanup side effects before unmounting
    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <main className="h-screen bg-mango-gray-light-2 py-[8%]">
      {
        listStepConfigStore.find((item) => item.step === progressSetupStore)
          ?.component
      }
    </main>
  );
};
export default StoreProfile;
