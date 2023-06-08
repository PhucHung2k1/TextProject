import type { ISignUpVerify } from '@/services/account.service/account.interface';
import { signUpSendVerify, signUpVerify } from '@/store/account/accountAction';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  setMessageToast,
  setTypeAlertToast,
  showToast,
} from '@/store/toast/toastSlice';
import { formatTimeMMSS } from '@/utils/helper/formatTime';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const VerifyAccount = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [countDown, setCountDown] = useState<number>(90);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isOtpWrong, setIsOtpWrong] = useState<boolean>(false);
  const [otpValues, setOtpValues] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const emailSignUp = useAppSelector((state) => state.accountSlice.emailSignUp);
  const handleResend = () => {
    setCountDown(90);
    setIsActive(true);
    // dispatch(setEmailSignUp('phanphutrong001@gmail.com'));
    dispatch(signUpSendVerify({ email: emailSignUp }));
  };

  const handleInputChange = (index: number, value: string) => {
    if (isOtpWrong) {
      setIsOtpWrong(false);
    }

    const newInputValues = [...otpValues];
    newInputValues[index] = value;
    setOtpValues(newInputValues);
    // Focus to next input element after enter number
    if (/^\d$/.test(value)) {
      const nextInput = document.getElementById(
        `input-${index + 1}`
      ) as HTMLInputElement;
      const endNext = nextInput?.value.length;
      nextInput?.focus();
      nextInput?.setSelectionRange(endNext, endNext);
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Focus to next input element
    if (event.key === 'ArrowRight' && index < otpValues.length - 1) {
      const nextInput = document.getElementById(
        `input-${index + 1}`
      ) as HTMLInputElement;
      const endNext = nextInput?.value.length;
      nextInput?.focus();
      nextInput?.setSelectionRange(endNext, endNext);
    }
    // Focus to previous input element
    if (
      (event.key === 'ArrowLeft' && index > 0) ||
      (event.key === 'Backspace' && otpValues[index]?.length !== 1 && index > 0)
    ) {
      const prevInput = document.getElementById(
        `input-${index - 1}`
      ) as HTMLInputElement;
      const endPrev = prevInput?.value.length;
      prevInput?.focus();
      prevInput?.setSelectionRange(endPrev, endPrev);
    }
  };
  const handleVerifyAccount = () => {
    const verifyNumber = otpValues.toString().concat().replaceAll(',', '');
    if (verifyNumber.length === 6) {
      const body: ISignUpVerify = {
        email: emailSignUp,
        otp: verifyNumber,
      };

      dispatch(signUpVerify(body)).then((res) => {
        const responseData = res.payload;
        if (responseData) {
          if (responseData?.status === 200) {
            dispatch(setTypeAlertToast('success'));
            dispatch(setMessageToast(responseData?.message));
            dispatch(showToast());
            setIsOtpWrong(false);
            setCountDown(90);
            setIsActive(true);
            router.push('/login');
          } else {
            dispatch(setTypeAlertToast('error'));
            dispatch(setMessageToast(responseData?.message));
            dispatch(showToast());
            setIsOtpWrong(true);
          }
        }
      });
    }
  };
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (isActive) {
      intervalId = setInterval(() => {
        setCountDown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    if (countDown === 0) {
      setIsActive(false);
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, countDown]);
  return (
    <div className="flex justify-center pt-[90px]">
      <div className=" w-[568px]  rounded-2xl bg-white px-8 py-10 shadow-md">
        <p className="text-[32px] font-semibold">Verify your email</p>
        <p>
          A text message with the code has been sent to{' '}
          <span className="font-bold text-mango-text-gray-2">
            {emailSignUp}.
          </span>
        </p>
        <Link href="/" className="!text-mango-primary-blue">
          Change your email
        </Link>

        {/*  */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {otpValues.map((value, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="h-16 w-16" key={`input-${index}`}>
              <input
                id={`input-${index}`}
                className={`h-full w-full rounded border-2  text-center text-3xl font-bold focus:border-none ${
                  isOtpWrong ? 'border-red-600 ' : 'border-mango-gray-light-1'
                }`}
                minLength={1}
                maxLength={1}
                autoComplete="new-password"
                inputMode="numeric"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                min={0}
                max={9}
                pattern="[0-9]"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 ">
          <span>Didn&apos;t get a code? </span>
          <button
            type="button"
            className="cursor-pointer text-base font-medium text-mango-primary-blue hover:underline "
            onClick={handleResend}
            // disabled={isActive}
          >
            Resend ({formatTimeMMSS(countDown)})
          </button>
        </div>
        <Button
          onClick={handleVerifyAccount}
          disabled={
            otpValues.toString().concat().replaceAll(',', '').length !== 6
          }
          className="mt-12 h-12 w-full bg-mango-primary-blue font-bold capitalize"
          variant="contained"
          // type="primary"
        >
          Verify
        </Button>
      </div>
    </div>
  );
};
export default VerifyAccount;
