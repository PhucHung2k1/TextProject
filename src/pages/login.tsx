import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import LayoutAuthen from '@/components/Authentication/LayoutAuthen';
import LoginForm from '@/components/Authentication/LoginForm';
import { useAppSelector } from '@/store/hook';
import { CircularProgress } from '@mui/material';

const Login = () => {
  const { status } = useSession();
  const router = useRouter();
  const isLoadingLogin = useAppSelector(
    (state) => state.loadingSlice.isLoadingLogin
  );
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status]);

  return isLoadingLogin ? (
    <div className="flex h-screen w-screen items-center justify-center bg-sky-100">
      <CircularProgress />
    </div>
  ) : (
    <>
      <LayoutAuthen type="login">
        <LoginForm />
      </LayoutAuthen>
    </>
  );
};

export default Login;
