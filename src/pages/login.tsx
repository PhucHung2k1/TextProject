import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import LayoutAuthen from '@/components/Authentication/LayoutAuthen';
import LoginForm from '@/components/Authentication/LoginForm';

const Login = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status]);

  return (
    <LayoutAuthen>
      <LoginForm />
    </LayoutAuthen>
  );
};

export default Login;
