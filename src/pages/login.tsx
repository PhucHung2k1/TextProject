import LayoutAuthen from "@/components/Authentication/LayoutAuthen";
import LoginForm from "@/components/Authentication/LoginForm";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" flex item-center h-full w-[60%] justify-between bg-mango-primary-blue ">
        <div className="flex m-auto h-full w-full">
          <img
            src="/assets/images/Authentication/mangoforsalon.png"
            className="m-auto"
          />
        </div>
      </div>
      <div className="w-[40%] h-full bg-white flex items-center justify-center">
        <LayoutAuthen type="login">
          <LoginForm />
        </LayoutAuthen>
      </div>
    </div>
  );
};

export default Login;
