import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
  debounce,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { emailRegex } from '@/utils/helper/regex';
import { checkExistEmail } from '@/store/account/accountAction';
import { useAppDispatch } from '@/store/hook';
import { Check, Error } from '@mui/icons-material';
import { ErrorMessage } from '@hookform/error-message';
import SendIcon from '@mui/icons-material/Send';
import GetYourPasswordSucess from '@/components/Authentication/GetYourPasswordSucess';
import { forgotPassword } from '@/store/passwordCustomer/passwordCustomerAction';

const ForgotPassword = () => {
  const {
    register,
    formState: { errors },

    handleSubmit,
    setError,
    trigger,
    clearErrors,
  } = useForm();

  const [showSucess, setShowSuccess] = useState<boolean>(false);

  const [emailState, setEmailState] = useState({
    emailName: '',
    emailStatus: 'idle', // existed , available
  });
  const dispatch = useAppDispatch();

  const validateEmail = debounce(async (emailValue: string) => {
    if (emailRegex.test(emailValue)) {
      setEmailState((pre) => ({ ...pre, emailName: emailValue }));
      dispatch(
        checkExistEmail({
          Email: emailValue,
        })
      ).then((res) => {
        if (!res.payload) {
          setEmailState((pre) => ({ ...pre, emailStatus: 'existed' }));
          setError('email', {
            type: 'manual',
            message: 'Email does not exists',
          });
        } else {
          setEmailState((pre) => ({ ...pre, emailStatus: 'available' }));
          clearErrors('email');
        }
      });
    } else {
      setEmailState({ emailStatus: 'idle', emailName: '' });
      setError('email', {
        type: 'manual',
        message: 'Invalid email address',
      });
    }
  }, 800);

  const handleEmailChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    await trigger('email');
    try {
      await validateEmail(event.target.value);
    } catch (error) {
      setError('email', { type: 'manual', message: 'errorMessage' });
    }
  };

  const handleForgotPassword = (values: any) => {
    // eslint-disable-next-line no-console
    console.log(
      '🚀 ~ file: forgotPassword.tsx:78 ~ onSubmit ~ values:',
      values
    );
    dispatch(
      forgotPassword({
        UserName: values.email,
      })
    ).then((res: any) => {
      if (!res.error) {
        setShowSuccess(true);
      }
    });
  };
  return (
    <>
      <main className="flex h-screen items-center justify-center bg-mango-gray-light-2">
        {!showSucess ? (
          <div className="flex min-h-[30%] w-[25%] flex-col items-center justify-between gap-2 rounded-2xl bg-white p-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-text-title ">
                Get your password
              </div>
              <div className="text-sm text-text-secondary">
                Enter your email address to receive a password reset email.
              </div>
            </div>

            <form
              onSubmit={handleSubmit(handleForgotPassword)}
              className="mt-8 w-full"
              noValidate
            >
              <Grid container spacing={2}>
                <Grid xs={12} item>
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <TextField
                      label="Email Address"
                      type="email"
                      required
                      error={Boolean(errors.email)}
                      {...register('email', {
                        required: 'Enter Your Email!',
                      })}
                      onChange={handleEmailChange}
                      className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                      InputProps={{
                        endAdornment:
                          emailState.emailStatus === 'available' ? (
                            <Check className=" bg-transparent text-green-700" />
                          ) : emailState.emailStatus === 'existed' ? (
                            <Error className=" text-red-500" />
                          ) : emailState.emailName ? (
                            <CircularProgress size="1.2rem" />
                          ) : (
                            <></>
                          ),
                      }}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ message }: any) => (
                        <div className="mt-2 text-sm text-red-700" role="alert">
                          <span className="font-medium">{message}</span>
                        </div>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} item>
                  <FormControl
                    fullWidth
                    className="w-full text-sm font-normal !text-mango-text-black-1"
                  >
                    <Button
                      variant="contained"
                      className="mt-3 h-12 w-full rounded-lg bg-mango-primary-blue font-semibold text-white "
                      type="submit"
                      sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
                      disabled={!!errors.email}
                    >
                      SEND{' '}
                      <SendIcon fontSize="small" style={{ marginLeft: 5 }} />
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </div>
        ) : (
          <GetYourPasswordSucess />
        )}
      </main>
    </>
  );
};
export default ForgotPassword;
