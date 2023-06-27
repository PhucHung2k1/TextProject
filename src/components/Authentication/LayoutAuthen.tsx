import {
  setInvitationToken,
  setIsInviteEmail,
} from '@/store/customer/customerSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export interface LayoutAuthenProps {
  children: React.ReactNode;
  type?: string;
}

export default function LayoutAuthen({ children, type }: LayoutAuthenProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isInviteEmail = useAppSelector(
    (state) => state.customerSlice.isInviteEmail
  );

  useEffect(() => {
    if (router.pathname !== '/login' && router.pathname !== '/sign-up') {
      dispatch(setIsInviteEmail(false));
      dispatch(setInvitationToken(''));
    }
  }, [router.pathname]);

  return (
    <div className="flex h-screen w-full items-center  justify-center bg-mango-gray-light-2  bg-cover bg-center bg-no-repeat ">
      <div className="  w-[568px] rounded-2xl bg-white pb-[16px] pt-[36px]">
        <div className="text-center">
          <Image
            src="/assets/images/Authentication/logoIcon.svg"
            alt="logo"
            width={150}
            height={50}
            className="text-center"
          />
        </div>
        <h1 className="my-[40px] text-center text-[32px] font-semibold text-text-title">
          {type === 'login' && ' Hi, welcome back'}
          {type === 'signup' && 'Create new account'}
          {type === 'verifyAccount' && 'Verify your account'}
          {type === 'selectstore' && 'Select Store'}
        </h1>
        {isInviteEmail && (
          <Typography className="w-[80%] text-center text-[14px] text-mango-text-gray-2">
            {type === 'login' &&
              'You have received an invitation from Queen Nails Salon. By logging in, you will join them'}
            {type === 'signup' &&
              'You have received an invitation to register from Queen Nails Salon. Create an account and enjoy your own Mango!'}
          </Typography>
        )}

        <div>{children}</div>

        {type !== 'selectstore' && (
          <div className="">
            <p className="text-center text-sm font-normal text-[#505050]">
              Connect with us
            </p>
            <div className="mt-2 flex items-center justify-center gap-5">
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-[#F4F4F8]">
                <Image
                  src="/assets/images/Authentication/facebookIcon.svg"
                  alt="fbIcon"
                  width={20}
                  height={20}
                  className="w-[60%] cursor-pointer"
                />
              </div>
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-[#F4F4F8]">
                <Image
                  src="/assets/images/Authentication/youtobeIcon.svg"
                  alt="fbIcon"
                  width={23}
                  height={16}
                  className="w-[60%] cursor-pointer"
                />
              </div>
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-[#F4F4F8]">
                <Image
                  src="/assets/images/Authentication/instagramIcon.svg"
                  alt="fbIcon"
                  width={18}
                  height={18}
                  className="w-[60%] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
