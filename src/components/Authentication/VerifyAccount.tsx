import { Button } from '@mui/material';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const VerifyAccount = () => {
  const [countDown, setCountDown] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(false);

  const startCountDown = () => {
    setCountDown(60);
    setIsActive(true);
  };

  const [inputValues, setInputValues] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
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
  const formatTime = (time: number): string => {
    const duration = moment.duration(time, 'seconds');
    return moment.utc(duration.asMilliseconds()).format('mm:ss');
  };
  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Focus to next input element
    if (event.key === 'ArrowRight' && index < inputValues.length - 1) {
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
      (event.key === 'Backspace' &&
        inputValues[index]?.length !== 1 &&
        index > 0)
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
    const verifyNumber = inputValues.toString().concat().replaceAll(',', '');
    if (verifyNumber.length === 6) {
      // console.log('verifyNumber', verifyNumber)
      startCountDown();
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
    <div className=" w-full">
      <p>Enter the code we sent over email to admin@enrichco.us.</p>
      <Link href="/" className="text-mango-primary-blue">
        Change your email
      </Link>

      {/*  */}
      <div className=" mt-6 flex w-fit flex-wrap items-center justify-center gap-2">
        {inputValues.map((value, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="h-16 w-16" key={`input-${index}`}>
            {/* <span className="border-b-4 w-1/2 border-mango-text-gray-1 absolute top-[80%] left-[25%]"></span> */}
            <input
              id={`input-${index}`}
              className="h-16 w-16 rounded border-2 border-mango-gray-light-1 text-center text-3xl font-bold focus:border-none"
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
      <Button
        onClick={handleVerifyAccount}
        disabled={
          inputValues.toString().concat().replaceAll(',', '').length !== 6
        }
        className="mt-12 h-12 w-full bg-mango-primary-blue font-bold capitalize"
        variant="contained"

        // type="primary"
      >
        Verify
      </Button>
      <div className="mt-10 text-center">
        <span>Didn&apos;t get a code? </span>
        <button
          type="button"
          className="cursor-pointer text-base font-medium text-mango-primary-blue hover:underline "
          onClick={startCountDown}
          disabled={isActive}
        >
          Send Again ({formatTime(countDown)})
        </button>
      </div>
    </div>
  );
};
export default VerifyAccount;
