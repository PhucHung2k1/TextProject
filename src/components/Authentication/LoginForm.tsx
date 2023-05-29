import React from "react";
import CustomInput from "../Inputs/Input";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";

import { useState } from "react";
export interface LoginFormProps {}

export default function LoginForm(props: LoginFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const listCustomer = useAppSelector(
    (state: RootState) => state.customer.listCustomer
  );
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className="flex flex-col gap-5">
      <CustomInput
        placeholder="enter your email"
        icon="email"
        value={inputValue}
        onChange={handleInputChange}
      />
      <CustomInput
        placeholder="enter your password"
        icon="password"
        value={inputValue}
        onChange={handleInputChange}
      />

      <div className="flex items-center justify-between w-full">
        <Checkbox onChange={onChange} className="text-26 text-base">
          Remember me
        </Checkbox>
        <div className="text-mango-primary-blue text-base font-medium">
          Forgot Password?
        </div>
      </div>
      <div className="flex items-center justify-center bg-mango-primary-blue text-white h-12 rounded cursor-pointer">
        Log in
      </div>
      <div className="flex items-center justify-center gap-2">
        <div>Don't have an account? </div>
        <div className="text-mango-primary-blue text-base font-medium">
          Create an account
        </div>
      </div>
    </div>
  );
}
