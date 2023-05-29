import { Input } from "antd";
import React from "react";
import { ChangeEvent } from "react";
interface CustomInputProps {
  placeholder: string;
  icon?: string;
  value: string;
  onChange: (value: string) => void;
  typeInput?: string;
}
const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  icon = {},
  value,
  onChange,
  typeInput = "text",
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-[30%] z-10">
        {icon && icon == "email" ? (
          <img
            src="/assets/images/Authentication/mailIcon.png"
            className="m-auto w-[20px] h-[20px]"
          />
        ) : icon == "password" ? (
          <img
            src="/assets/images/Authentication/clockIcon.png"
            className="m-auto w-[20px] h-[20px]"
          />
        ) : (
          " "
        )}
      </div>
      <div className="input-wrapper">
        <Input
          placeholder={placeholder}
          value={value}
          className="h-[48px] text-center placeholder-center"
          onChange={handleChange}
          type={typeInput}
        />
      </div>
    </div>
  );
};

export default CustomInput;
