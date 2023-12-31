import { Button } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';

const GetYourPasswordSucess = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-[30%] w-[568px] flex-col items-center justify-between gap-2 rounded-2xl bg-white p-8">
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-text-title ">
          Get your password
        </div>
      </div>
      <div className="text-base text-primary-dark">
        Within 5 minutes, you'll receive an email with a link to change your
        password.
      </div>
      <div className="w-full">
        <Button
          variant="contained"
          className="mt-3 h-12 w-full rounded-lg bg-mango-primary-blue font-semibold text-white "
          type="submit"
          sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
          onClick={() => {
            router.push('/login');
          }}
        >
          OK
        </Button>
      </div>
    </div>
  );
};

export default GetYourPasswordSucess;
