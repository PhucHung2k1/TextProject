import { Button, Checkbox, Form, Input } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import CustomInput from "../Inputs/Input";

import Link from "next/link";
import { useState } from "react";
export interface LoginFormProps {}
const listDataForm = [
  {
    label: "First Name",
    name: "firstName",
    placeHoler: "Enter your first name",
    required: false,
    messageRequired: "",
    type: "default",
  },
  {
    label: "Last Name",
    name: "lastName",
    placeHoler: "Enter your last name",
    required: false,
    messageRequired: "",
    type: "default",
  },
  {
    label: "Email",
    name: "email",
    placeHoler: "Enter your email",
    required: true,
    messageRequired: "Enter your email",
    type: "default",
  },
  {
    label: "Password",
    name: "password",
    placeHoler: "Enter your password",
    required: true,
    messageRequired: "Enter your password",
    type: "password",
  },
];
export default function SignUpForm(props: LoginFormProps) {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex flex-col gap-0">
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {listDataForm.map((item, index) => (
          <Form.Item
            key={item.name}
            label={item.label}
            name={item.name}
            className="mango-text-black-1 text-sm font-normal"
            rules={[{ required: item.required, message: item.messageRequired }]}
          >
            {item.type == "password" ? (
              <Input.Password
                placeholder={item.placeHoler}
                className="h-12 "
              ></Input.Password>
            ) : (
              <Input placeholder={item.placeHoler} className="h-12 " />
            )}
          </Form.Item>
        ))}

        <Form.Item>
          <Checkbox>
            I agree to the{" "}
            <a className="text-mango-text-blue-1">Privacy Policy</a> and{" "}
            <a className="text-mango-text-blue-1">Terms of Use</a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            className="w-full h-12 bg-mango-primary-blue"
            type="primary"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <div className="mx-auto gap-2">
        <span>Already have an account? </span>
        <Link
          href={"/login"}
          className="text-mango-primary-blue text-base font-medium"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
