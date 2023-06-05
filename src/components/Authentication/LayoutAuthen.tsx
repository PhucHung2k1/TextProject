import React from 'react';

export interface LayoutAuthenProps {
  children: React.ReactNode;
  type: string;
}

export default function LayoutAuthen({ children, type }: LayoutAuthenProps) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className=" flex h-full w-[60%] items-center justify-between bg-mango-primary-blue ">
        <div className="m-auto flex h-full w-full">
          <img
            src="/assets/images/Authentication/women-cosmetic-salon-doing-treatment.png"
            className="w-full object-cover"
            alt="bg-sign-in"
          />
        </div>
      </div>
      <div className="flex h-full w-[40%] flex-col items-center justify-between overflow-auto bg-white pb-8">
        <div className="flex w-[70%] flex-col items-center ">
          <img
            src="/assets/images/Authentication/logoIcon.png"
            alt="logo"
            className="mt-12 w-[50%]"
          />
          <div className="mt-20 flex w-[80%] flex-col items-center">
            <p className="text-2xl text-[#262626]">
              {type === 'login'
                ? 'Welcome back to'
                : type === 'register'
                ? 'Create an account'
                : 'Verify your account'}
            </p>
            {type !== 'login' && (
              <p className="text-[35px] font-bold text-[#262626]">
                Mango For Salon
              </p>
            )}
            <div className="mt-10 flex w-full flex-col gap-5">{children}</div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center ">
          <p className="text-sm font-normal text-[#505050]">Connect with us</p>
          <div className="mt-2 flex items-center justify-center gap-5">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-[#F4F4F8]">
              <img
                src="/assets/images/Authentication/facebookIcon.png"
                alt="fbIcon"
                className="w-[60%] cursor-pointer"
              />
            </div>
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-[#F4F4F8]">
              <img
                src="/assets/images/Authentication/youtobeIcon.png"
                alt="fbIcon"
                className="w-[60%] cursor-pointer"
              />
            </div>
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-[#F4F4F8]">
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
