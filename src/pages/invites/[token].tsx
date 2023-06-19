import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { confirmInvitation } from '@/store/customer/customerAction';
import { useAppDispatch } from '@/store/hook';

const AcceptInviteJoinStore = () => {
  const router = useRouter();
  const { token }: any = router.query;
  const dispatch = useAppDispatch();

  const handleAcceptEmail = () => {
    dispatch(confirmInvitation({ Token: token }));
  };
  return (
    <main className="flex h-screen w-full items-center justify-center bg-mango-gray-light-2">
      <Box>
        <Box className="m-auto  rounded-2xl bg-white p-12">
          <Typography
            className="mx-auto "
            fontSize={24}
            fontWeight="bold"
            textAlign="center"
          >
            Join Store?
            <br />
            It happens to the best of us.
          </Typography>
          <div className="m-auto my-8 w-[259px] rounded-full bg-[#B2EBF3]">
            <img
              src="/assets/images/Invites/forgot-password.svg"
              height={259}
              width={259}
              className="m-auto !h-[259px] !w-[259px] rounded-full object-none object-bottom"
              alt="logo"
            />
          </div>
          <Typography className="mx-auto w-3/4" textAlign="center">
            To join store, click the button below. The link will be inactive
            after 24 hours.
          </Typography>
          <Button
            variant="contained"
            className="mx-auto mt-3 flex h-12 justify-center rounded-lg bg-mango-primary-blue font-semibold text-white !shadow-none"
            sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
            onClick={handleAcceptEmail}
          >
            Accept Join Store
          </Button>
        </Box>
        <Box className="">
          <Typography
            textAlign="center"
            className="mx-auto mb-10 mt-5  w-4/5 text-mango-text-gray-2"
          >
            If you do not want to join store or didn’t request a reset, you can
            ignore and delete this email.
          </Typography>
          <Box className="h-[0.5px] w-full bg-border-secondary " />
        </Box>

        <div className="mt-8 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2">
            <div className="flex flex-col items-center justify-center ">
              <Box className="flex gap-2">
                <Typography className="text-sm font-normal text-[#505050]">
                  Need any help?
                </Typography>
                <Typography
                  className="cursor-pointer text-mango-primary-blue"
                  fontWeight="bold"
                >
                  Contact us
                </Typography>
              </Box>
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
          </div>
        </div>
      </Box>
    </main>
  );
};
export default AcceptInviteJoinStore;
