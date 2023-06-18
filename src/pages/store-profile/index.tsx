import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setCurrentStepConfigStore } from '@/store/store/storeSlice';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { listStepConfigStore } from './listStepConfigStore';

const StoreProfile = () => {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(
    (state) => state.storeSlice.CurrentStepConfigStore
  );

  useEffect(() => {
    const currentStepInCookies = Cookies.get('current-step');
    dispatch(
      setCurrentStepConfigStore(
        currentStepInCookies
          ? Number(currentStepInCookies)
          : listStepConfigStore[0]?.step
      )
    );
  }, []);

  return (
    <main className="flex h-screen items-center justify-center bg-mango-gray-light-2">
      {listStepConfigStore.find((x) => x.step === currentStep)?.component}
    </main>
  );
};
export default StoreProfile;
