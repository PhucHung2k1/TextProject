import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  const { status, data } = useSession();

  return status === 'authenticated' ? (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      {data?.user ? (
        <Button
          onClick={() => signOut()}
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
    </Main>
  ) : (
    <div className="flex h-screen w-screen items-center justify-center bg-sky-100">
      <CircularProgress />
    </div>
  );
};

export default Index;
