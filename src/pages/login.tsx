import LayoutAuthen from "@/components/Authentication/LayoutAuthen";
import LoginForm from "@/components/Authentication/LoginForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "authenticated") {
      router.replace("/");
    }
  }, [status]);

  return (
    <LayoutAuthen type="login">
      <LoginForm />
    </LayoutAuthen>
  );
};

export default Login;
