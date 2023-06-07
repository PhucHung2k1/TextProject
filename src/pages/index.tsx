import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';
import Cookies from 'js-cookie';
import { useAppSelector, useAppDispatch } from '@/store/hook';
import { useEffect } from 'react';
import { getCustomerProfile } from '@/store/customer/customerAction';

const Index = () => {
  const { data } = useSession();

  const showLoading = useAppSelector((state) => state.loadingSlice.isLoading);

  const dispatch = useAppDispatch();
  const customerProfile = useAppSelector(
    (state) => state.customerSlice.customerProfile
  );

  const handleSignOut = () => {
    Cookies.remove('auth-token');
    Cookies.remove('refresh-token');
    signOut();
  };
  useEffect(() => {
    if (data?.user?.AccessToken) {
      dispatch(getCustomerProfile({}));
    }
  }, [data?.user?.AccessToken]);

  return showLoading ? (
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
            {customerProfile?.CustomerRoles?.length === 0
              ? 'empty'
              : customerProfile?.CustomerRoles?.length}
          </h1>
        </div>
      </Main>
    </>
  );
};

export default Index;
