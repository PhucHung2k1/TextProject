import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

import Link from "next/link";
export interface LoginFormProps {}
const listDataForm = [
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
    type: "default",
  },
];
export default function LoginForm() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  // const onChange = (e: CheckboxChangeEvent) => {
  //   console.log(`checked = ${e.target.checked}`);
  // };
  return (
    <div className="flex flex-col ">
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {listDataForm.map((item) => (
          <Form.Item
            key={item.name}
            name={item.name}
            className="mango-text-black-1 text-sm font-normal "
            rules={[{ required: item.required, message: item.messageRequired }]}
          >
            {item.type == "password" ? (
              <Input.Password
                placeholder={item.placeHoler}
                className="h-12 text-center placeholder-center"
              ></Input.Password>
            ) : (
              <>
                <Input
                  placeholder={item.placeHoler}
                  className="h-12 text-center placeholder-center relative"
                ></Input>
                <div className="absolute left-3 top-[30%] z-10">
                  {item.name == "email" ? (
                    <img
                      src="/assets/images/Authentication/mailIcon.png"
                      className="m-auto w-[20px] h-[20px]"
                    />
                  ) : (
                    <img
                      src="/assets/images/Authentication/clockIcon.png"
                      className="m-auto w-[20px] h-[20px]"
                    />
                  )}
                </div>
              </>
            )}
          </Form.Item>
        ))}

        <Form.Item>
          <div className="flex items-center justify-between">
            <Form.Item name="firstName" noStyle>
              <Checkbox className="text-base font-medium">
                <p className="font-medium">Remember me</p>
              </Checkbox>
            </Form.Item>
            <Form.Item name="lastName" noStyle>
              <Link
                href={"/login"}
                className="text-mango-primary-blue  font-medium "
              >
                Forgot Password?
              </Link>
            </Form.Item>
          </div>
        </Form.Item>

        {/* <Form.Item label="Full Name">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="firstName" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="lastName" noStyle>
                <Link
                  href={"/login"}
                  className="text-mango-primary-blue text-base font-medium"
                >
                  Forgot Password?
                </Link>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item> */}

        {/* <Form.Item className="flex flex-row bg-red-100 w-full">
          <div className="flex items-center justify-center gap-2">
            <Checkbox
              onChange={onChange}
              className="text-26 text-base"
            ></Checkbox>
            <div className="text-base text-26">Remember me</div>
          </div>
          <div>
            <Link
              href={"/"}
              className="text-mango-primary-blue text-base font-medium cursor-pointer"
            >
              Forgot Password?
            </Link>
          </div>
        </Form.Item> */}
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
  );
}
