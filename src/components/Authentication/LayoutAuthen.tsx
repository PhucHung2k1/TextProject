import React from "react";

import logo from "../../../public/assets/images/Authentication/logoIcon.png";

export interface LayoutAuthenProps {
  children: React.ReactNode;
  type: string;
}

export default function LayoutAuthen({ children, type }: LayoutAuthenProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white pt-10">
      <div className="h-[90%] pt-8  w-[70%] flex flex-col items-center ">
        <img
          src="/assets/images/Authentication/logoIcon.png"
          alt="logo"
          className="w-[50%]"
        />

        <div className="flex flex-col items-center mt-20 w-[70%]">
          {type == "login" ? (
            <>
              <p className="text-2xl text-[#262626]">Welcome back to</p>
              <p className=" text-[40px]  font-bold text-[#262626]">
                Mango For Salon
              </p>
            </>
          ) : type == "register" ? (
            <p className=" text-[40px]  font-bold text-[#262626]">
              Create an account
            </p>
          ) : (
            <p className=" text-[40px]  font-bold text-[#262626]">
              Verify your account
            </p>
          )}

          <div className="mt-10 w-[100%] flex flex-col gap-5">{children}</div>
        </div>
      </div>
      <div className="h-[10%]">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm font-normal text-[#505050]">Connect with us</p>
          <div className="flex items-center justify-center gap-5 mt-2">
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-3xl bg-[#F4F4F8]">
              <img
                src="/assets/images/Authentication/facebookIcon.png"
                alt="fbIcon"
                className="w-[60%] cursor-pointer"
              />
            </div>
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-3xl bg-[#F4F4F8]">
              <img
                src="/assets/images/Authentication/youtobeIcon.png"
                alt="fbIcon"
                className="w-[60%] cursor-pointer"
              />
            </div>
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-3xl bg-[#F4F4F8]">
              <img
                src="/assets/images/Authentication/instagramIcon.png"
                alt="fbIcon"
                className="w-[60%] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
