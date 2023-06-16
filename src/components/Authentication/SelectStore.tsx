import { Button, Typography } from '@mui/material';
import LayoutAuthen from './LayoutAuthen';
import { getStoreCustomer } from '@/store/store/storeAction';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import type { IStoreCustomer } from '@/services/store.service/store.interface';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const SelectStore = () => {
  const dispatch = useAppDispatch();
  const storeCustomer = useAppSelector(
    (state) => state.storeSlice.storeCustomer
  );
  const router = useRouter();

  const [selectItemStore, setSelectItemStore] = useState<IStoreCustomer>();

  useEffect(() => {
    dispatch(getStoreCustomer({}));
    const hasStoreCustomerCookie = Cookies.get('store-customer') !== undefined;

    if (hasStoreCustomerCookie) {
      router.push('/');
    }
  }, []);

  const handleSelectCustomer = () => {
    if (!selectItemStore) {
      showToastMessage(dispatch, `Please Select Store!`, 'error');
    } else {
      Cookies.set('store-customer', selectItemStore.Id);
      showToastMessage(dispatch, `Choose Successful Store!`, 'success');
      router.push('/');
    }
  };
  return (
    <LayoutAuthen type="selectstore">
      <div className="flex  max-h-80 w-full overflow-y-auto overflow-x-hidden pb-16 pt-5">
        <div className="flex w-full flex-col items-center gap-0 ">
          {storeCustomer &&
            storeCustomer.map((item: IStoreCustomer, index) => {
              return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={` flex h-20 w-full cursor-pointer flex-row items-center justify-between border-b border-line-main p-5 ${
                    selectItemStore?.Id === item.Id && ' bg-blue-gray'
                  }`}
                  onClick={() => {
                    setSelectItemStore(item);
                  }}
                >
                  <div className="flex items-center gap-3 ">
                    <div className="flex h-full flex-col justify-between">
                      <Typography
                        variant="h6"
                        className="text-base font-semibold text-primary-dark"
                      >
                        Name: {item.Name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Email: {item.Email}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Button
        variant="contained"
        className="mt-3 h-12 w-full rounded-lg bg-mango-primary-blue font-semibold text-white "
        type="button"
        sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
        onClick={handleSelectCustomer}
      >
        SELECT
      </Button>
    </LayoutAuthen>
  );
};
export default SelectStore;
