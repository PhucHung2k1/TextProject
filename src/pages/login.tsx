import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const listCustomer = useAppSelector(
    (state: RootState) => state.customer.listCustomer
  );

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/2 h-full bg-red-100">1</div>
      <div className="w-1/2  h-full bg-blue-100">1</div>
    </div>
  );
};

export default Login;
