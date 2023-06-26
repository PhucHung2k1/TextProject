import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';
import Cookies from 'js-cookie';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import { useEffect } from 'react';
import { getStoreCustomer } from '@/store/store/storeAction';
import { useRouter } from 'next/router';
import { getCustomerProfile, getMyRole } from '@/store/customer/customerAction';
import { showLoadingLogin } from '@/store/loading/loadingSlice';

const Index = () => {
  const { data } = useSession();
  const router = useRouter();

  const showLoading = useAppSelector((state) => state.loadingSlice.isLoading);
  const isLoadingLogin = useAppSelector(
    (state) => state.loadingSlice.isLoadingLogin
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getStoreCustomer({}));
  }, []);

  const dataMyRole = useAppSelector((state) => state.customerSlice.dataMyRole);

  const handleSignOut = () => {
    dispatch(showLoadingLogin(true));
    Cookies.remove('auth-token');
    Cookies.remove('refresh-token');
    Cookies.remove('store-customer');

    signOut().finally(() => dispatch(showLoadingLogin(false)));
  };
  useEffect(() => {
    if (data?.user?.AccessToken) {
      dispatch(getMyRole({}));
      dispatch(getCustomerProfile({}));
    }
  }, [data?.user?.AccessToken]);

  useEffect(() => {
    const hasStoreCustomerCookie = Cookies.get('store-customer') !== undefined;

    if (!hasStoreCustomerCookie) {
      router.push('/select-store');
    }
  }, []);

  return showLoading || isLoadingLogin ? (
    <div className="flex h-screen w-screen items-center justify-center bg-sky-100">
      <CircularProgress />
    </div>
  ) : (
    <>
      <Main
        meta={
          <Meta title={AppConfig.title} description={AppConfig.description} />
        }
      >
        <div className="flex flex-col items-start">
          {data?.user ? (
            <Button
              onClick={handleSignOut}
              variant="contained"
              className=" bg-blue-400"
            >
              {' '}
              Sign out
            </Button>
          ) : (
            <Button
              onClick={() => signIn()}
              variant="contained"
              className=" bg-blue-400"
            >
              {' '}
              Sign in
            </Button>
          )}
          {/* <Link href="/book">Move to book</Link> */}
          <h1>
            Customers Roles{' '}
            {dataMyRole?.length === 0
              ? 'empty'
              : dataMyRole?.map((item) => {
                  return `${item.Name}, `;
                })}
          </h1>
        </div>
      </Main>
    </>
  );
};

export default Index;
