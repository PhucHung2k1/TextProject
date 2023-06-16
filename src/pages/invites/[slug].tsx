import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import { confirmInvitation } from '@/store/customer/customerAction';
import { useAppDispatch } from '@/store/hook';

const AcceptInviteJoinStore = () => {
  const router = useRouter();
  const { token }: any = router.query;
  console.log('token: ', token);

  const dispatch = useAppDispatch();

  const handleAcceptEmail = () => {
    dispatch(confirmInvitation({ Token: token }));
  };
  return (
    <main className="flex h-screen w-full items-center justify-center bg-mango-gray-light-2">
      <Box>
        <Box className="m-auto h-[590px] w-[772px] rounded-2xl bg-white p-12">
          <Typography fontSize={24} textAlign="center">
            Forgot your password? It happens to the best of us.
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
          <Typography>
            To reset your password, click the button below. The link will be
            inactive after 24 hours.
          </Typography>
          <Button
            variant="contained"
            className="mx-auto mt-3 h-12 rounded-lg bg-mango-primary-blue font-semibold text-white "
            sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
            onClick={handleAcceptEmail}
          >
            Reset your password
          </Button>
        </Box>
        <Typography className="mt-4 text-mango-text-gray-2">
          If you do not want to change your password or didn’t request a reset,
          you can ignore and delete this email.
        </Typography>
        <Divider
          sx={{ height: 28, width: 'calc(100%)' }}
          orientation="horizontal"
        />
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-2">
            <div className="flex flex-col items-center justify-center ">
              <p className="text-sm font-normal text-[#505050]">
                Need any help?
                <Typography
                  className="text-mango-primary-blue"
                  fontWeight="bold"
                >
                  Contact us
                </Typography>
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
          </div>
        </div>
      </Box>
    </main>
  );
};
export default AcceptInviteJoinStore;
