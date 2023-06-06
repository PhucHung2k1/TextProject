import { Checkbox, FormControlLabel } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { ISignInForm } from "@/services/auth.service/auth.service";
import InputField from '../FormHelper/InputField';
import { getSession, signIn } from 'next-auth/react';
import Cookies from 'js-cookie';
import { getAllRole } from '@/store/customerRole/customerRoleAction';
import { useAppDispatch } from '@/store/hook';
import { IAuthResponse } from "@/services/auth.service/auth.interface";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const showPassword = false;
  const [rememberMe, setRememberMe] = useState<boolean>(false);


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInForm>();

  const handleSignIn = async (values: ISignInForm) => {
    await signIn("credentials", {
      username: values.username,
      password: values.password,
      hasRefreshToken: rememberMe,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        // eslint-disable-next-line no-alert
        alert(callback?.error);
      }

      if (callback?.ok && !callback?.error) {
        getSession().then((session) => {
          if (session) {
            const { user } = session;
            dispatch(getAllRole({}));
            var iAuthResponse = user as unknown as IAuthResponse;
            Cookies.set("auth-token", iAuthResponse.AccessToken);
            Cookies.set("refresh-token", iAuthResponse.RefreshToken);

          }
        });
      }
    });
  };

  return (
    <div className="flex flex-col ">
      <form
        className="container mx-auto flex w-full max-w-2xl flex-col items-center justify-start"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <InputField
          placeholder="Email"
          type="email"
          fullWidth
          register={register}
          registerOptions={{
            name: "username", // email
            required: "Enter your Email !",
            maxLength: { value: 255, message: "over 255 characters" },
          }}
          className=" border border-gray-400  bg-gray-100"
          errors={errors}
        />

        <InputField
          keyboardType={!showPassword ? "password" : "text"}
          placeholder="Password"
          fullWidth
          type="password"
          register={register}
          registerOptions={{
            name: "password",
            required: "Enter your Password !",
            // minLength: {
            //   value: 8,
            //   message: 'Mật khẩu phải từ 8 ký tự trở lên.',
            // },
            // pattern: {
            //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%\^&\*]{8,}$/,
            //   message: 'Mật khẩu phải có ít nhất một ký tự viết thường, một ký tự viết HOA và một ký tự số.',
            // },
          }}
          className="border border-gray-400  bg-gray-100"
          errors={errors}
        />

        <div className="flex items-center justify-between">
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(_, v) => {
                  setRememberMe(v)
                }}
              />
            }
            label="Remember me"
          />
          <Link href="/" className="font-medium  text-mango-primary-blue ">
            Forgot Password?
          </Link>
        </div>

        <button
          className="rounded-lg bg-green-500 font-semibold text-white ring-2 ring-white hover:bg-green-400 focus:bg-green-700 focus:outline-none md:focus:shadow"
          style={{ width: 158, height: 49 }}
          type="submit"
        >
          LOG IN
        </button>
      </form>

      <div className="flex items-center justify-center gap-2">
        <div>Don't have an account?</div>
        <Link
          href="/signup"
          className="cursor-pointer text-base font-medium text-mango-primary-blue"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
