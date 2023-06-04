import React from "react";

export interface LayoutAuthenProps {
  children: React.ReactNode;
  type: string;
}

export default function LayoutAuthen({ children, type }: LayoutAuthenProps) {
  return (
<<<<<<< Updated upstream
    <div className="flex items-center justify-center h-screen">
      <div className=" flex item-center h-full w-[60%] justify-between bg-mango-primary-blue ">
        <div className="flex m-auto h-full w-full">
=======
    <div className="flex h-screen items-center justify-center">
      <div className=" flex h-full w-[60%] items-center justify-between bg-mango-primary-blue ">
        <div className="m-auto flex h-full w-full">
>>>>>>> Stashed changes
          <img
            src="/assets/images/Authentication/women-cosmetic-salon-doing-treatment.png"
            className="w-full object-cover"
            alt="bg-sign-in"
          />
        </div>
      </div>
      <div className="w-[40%] overflow-auto h-full bg-white flex flex-col items-center justify-between pb-8">
        <div className="w-[70%] flex flex-col items-center ">
          <img
            src="/assets/images/Authentication/logoIcon.png"
            alt="logo"
            className="w-[50%] mt-12"
          />

<<<<<<< Updated upstream
          <div className="flex flex-col items-center mt-20 w-[80%]">
            {type == "login" ? (
              <>
                <p className="text-2xl text-[#262626]">Welcome back to</p>
                <p className=" text-[35px]  font-bold text-[#262626]">
                  Mango For Salon
                </p>
              </>
            ) : type == "register" ? (
              <p className=" text-[35px]  font-bold text-[#262626]">
                Create an account
              </p>
            ) : (
              <p className=" text-[35px]  font-bold text-[#262626]">
                Verify your account
              </p>
            )}

            <div className="mt-10 w-[100%] flex flex-col gap-5">{children}</div>
=======
          <div className="mt-20 flex w-[80%] flex-col items-center">
            <p className="text-2xl text-[#262626]">
              {type === 'login' ? 'Welcome back to' : type === 'register' ? 'Create an account' : 'Verify your account'}
            </p>
            {type !== 'login' && <p className="text-[35px] font-bold text-[#262626]">Mango For Salon</p>}
            <div className="mt-10 flex w-full flex-col gap-5">{children}</div>
>>>>>>> Stashed changes
          </div>
        </div>

        <div className="flex flex-col items-center justify-center ">
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
