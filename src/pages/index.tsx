import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';
import Cookies from 'js-cookie';

const Index = () => {
  const { status, data } = useSession();

  const handleSignOut = () => {
    Cookies.remove('auth-token');
    Cookies.remove('refresh-token');
    signOut();
  };
  return status === 'authenticated' ? (
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
        <Link href="/book">Move to book</Link>
      </div>
    </Main>
  ) : (
    <div className="flex h-screen w-screen items-center justify-center bg-sky-100">
      <CircularProgress />
    </div>
  );
};

export default Index;
