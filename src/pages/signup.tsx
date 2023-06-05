import LayoutAuthen from '@/components/Authentication/LayoutAuthen';
import SignUpForm from '@/components/Authentication/SignUpForm';

const SignUp = () => {
  return (
    <LayoutAuthen type="register">
      <SignUpForm />
    </LayoutAuthen>
  );
};
export default SignUp;
