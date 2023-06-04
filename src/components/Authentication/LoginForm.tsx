<<<<<<< Updated upstream
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { signIn } from "next-auth/react";
// import { useRouter } from "next/router";
export interface LoginFormProps {}

export default function LoginForm() {
  const listInputLogin = [
    {
      name: "email",
      placeHoler: "Enter your email",
      required: true,
      messageRequired: "Enter your email!",
      type: "default",
    },
    {
      name: "password",
      placeHoler: "Enter your password",
      required: true,
      messageRequired: "Enter your password!",
      type: "password",
    },
  ];
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        console.log("Invalid credentials");
      }
      if (callback?.ok && !callback?.error) {
        console.log("Logged in");
      }
    });

    console.log("res", res);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <>
      <div className="flex flex-col ">
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {listInputLogin.map((item) => (
            <Form.Item
              key={item.name}
              name={item.name}
              className="mango-text-black-1 text-sm font-normal "
              rules={[
                { required: item.required, message: item.messageRequired },
              ]}
            >
              {item.type == "password" ? (
                <>
                  <Input.Password
                    placeholder={item.placeHoler}
                    className={`h-12 text-input-center `}
                    prefix={
                      <img
                        src="/assets/images/Authentication/clockIcon.png"
                        className="m-auto w-[20px] h-[20px]"
                      />
                    }
                  ></Input.Password>
                </>
              ) : (
                <>
                  <Input
                    placeholder={item.placeHoler}
                    className="h-12  text-input-center"
                    prefix={
                      <img
                        src="/assets/images/Authentication/mailIcon.png"
                        className="m-auto w-[20px] h-[20px]"
                      />
                    }
                  ></Input>
                </>
              )}
            </Form.Item>
          ))}

          <Form.Item>
            <div className="flex items-center justify-between">
              <Form.Item noStyle>
                <Checkbox className="text-base font-medium" onChange={onChange}>
                  <p className="font-medium">Remember me</p>
                </Checkbox>
              </Form.Item>
              <Form.Item noStyle>
                <Link
                  href={"/"}
                  className="text-mango-primary-blue  font-medium "
                >
                  Forgot Password?
                </Link>
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full h-12 bg-mango-primary-blue"
              type="primary"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div className="flex items-center justify-center gap-2">
          <div>Don't have an account? </div>

          <Link
            href={"/signup"}
            className="text-mango-primary-blue text-base font-medium cursor-pointer"
          >
            Create an account
          </Link>
        </div>
      </div>
    </>
  );
=======
import { Checkbox, FormControlLabel } from '@mui/material'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { getSession, signIn } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'

import type { IAuthResponse } from '@/services/auth.service/auth.interface'
import type { ISignInForm } from '@/services/auth.service/auth.service'

import InputField from '../FormHelper/InputField'

export default function LoginForm() {
  const showPassword = false

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInForm>()

  const handleSignIn = async (values: ISignInForm) => {
    await signIn('credentials', {
      userName: values.username,
      password: values.password,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
      }

      if (callback?.ok && !callback?.error) {
        getSession().then((session) => {
          if (session) {
            const { user } = session

            if (user) {
              const userObj = user as IAuthResponse
              Cookies.set('auth-token', userObj.accessToken)
              Cookies.set('refresh-token', userObj.refreshToken)
            }
          }
        })
      }
    })
  }

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
            name: 'username', // email
            required: 'Enter your Email !',
            maxLength: { value: 255, message: 'over 255 characters' },
          }}
          className=" border border-gray-400 border-opacity-75 bg-gray-100"
          errors={errors}
        />

        <InputField
          keyboardType={!showPassword ? 'password' : 'text'}
          placeholder="Password"
          fullWidth
          type="password"
          register={register}
          registerOptions={{
            name: 'password',
            required: 'Enter your Password !',
            // minLength: {
            //   value: 8,
            //   message: 'Mật khẩu phải từ 8 ký tự trở lên.',
            // },
            // pattern: {
            //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%\^&\*]{8,}$/,
            //   message: 'Mật khẩu phải có ít nhất một ký tự viết thường, một ký tự viết HOA và một ký tự số.',
            // },
          }}
          className="border border-gray-400 border-opacity-75 bg-gray-100"
          errors={errors}
        />

        <div className="flex items-center justify-between">
          <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
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
        <Link href="/signup" className="cursor-pointer text-base font-medium text-mango-primary-blue">
          Create an account
        </Link>
      </div>
    </div>
  )
>>>>>>> Stashed changes
}
