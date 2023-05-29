import LayoutAuthen from "@/components/Authentication/LayoutAuthen";
import LoginForm from "@/components/Authentication/LoginForm";

const Login = () => {
  return (
    <LayoutAuthen type="login">
      <LoginForm />
    </LayoutAuthen>
  );
};

export default Login;
