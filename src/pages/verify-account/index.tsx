import LayoutHeader from '@/components/Authentication/LayoutHeader';
import VerifyAccount from '@/components/Authentication/VerifyAccount';
import type { GetServerSideProps } from 'next';

const VerifyAccountPage = () => {
  return (
    <LayoutHeader>
      <VerifyAccount />
    </LayoutHeader>
  );
};
export default VerifyAccountPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query.email) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
