import { formatTimeMMSS } from '@/utils/helper/formatTime';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { LinearProgressWithLabel } from './LinearProgressWithLabel';

const VerifyPhoneNumber = () => {
  // const dispatch = useAppDispatch();
  // const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);
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

  // const infoSignUp = useAppSelector((state) => state.accountSlice.infoSignUp);
  const handleResend = () => {
    setCountDown(90);
    setIsActive(true);
    setOtpValues(['', '', '', '', '', '']);
    setIsOtpWrong(false);

    // dispatch(signUpSendVerify({ customerId: infoSignUp?.customerId }));
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
      // const body: ISignUpVerify = {
      //   customerId: infoSignUp?.customerId,
      //   otp: verifyNumber,
      // };
      // dispatch(signUpVerify(body)).then((res) => {
      //   const responseData = res.payload;
      //   if (responseData) {
      //     if (responseData?.status === 200) {
      //       showToastMessage(dispatch, responseData?.message, 'success');
      //       setIsOtpWrong(false);
      //       setCountDown(90);
      //       setIsActive(true);
      //       router.push('/login');
      //     } else {
      //       showToastMessage(dispatch, responseData?.message, 'error');
      //       setIsOtpWrong(true);
      //     }
      //   }
      // });
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

  useEffect(() => {
    if (otpValues.toString().concat().replaceAll(',', '').length === 6) {
      if (formRef.current) {
        formRef.current
          .querySelectorAll('input')
          .forEach((input) => input.blur());
      }
      handleVerifyAccount();
    }
  }, [otpValues]);

  return (
    <div className="flex justify-center pt-[90px]">
      <div className=" w-[568px] rounded-2xl bg-white shadow-md">
        <LinearProgressWithLabel />
        <div className="px-8 pb-8 pt-12">
          <div className="text-center">
            <p className=" text-[32px] font-semibold">
              Verify you phone number
            </p>
            <p className="text-mango-text-gray-2">
              A text message with the code has been sent to{' '}
              <span className="font-bold">(111) 123-4567</span>
            </p>
            <Link href="/" className="w-full  !text-mango-primary-blue">
              Change your phone number
            </Link>
          </div>

          {/*  */}
          <form ref={formRef} className="mt-6 flex justify-between gap-2">
            {otpValues.map((value, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="h-16 w-[72px]" key={`input-${index}`}>
                <input
                  id={`input-${index}`}
                  // eslint-disable-next-line tailwindcss/no-custom-classname
                  className={`h-full w-full rounded border-2  text-center text-3xl font-bold focus:border-none ${
                    isOtpWrong
                      ? 'animate__animated animate__shakeX border-red-600'
                      : 'border-mango-gray-light-1'
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
          </form>

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
            VERIFY
          </Button>
        </div>
      </div>
    </div>
  );
};
export default VerifyPhoneNumber;
