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
}
