import { Button, FormControl, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import SendIcon from '@mui/icons-material/Send';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import TokenExpired from '@/components/Authentication/TokenExpired';
import { useAppDispatch } from '@/store/hook';
import {
  changePasswordByToken,
  validateForgotPasswordToken,
} from '@/store/passwordCustomer/passwordCustomerAction';

const ResetPassword = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { asPath } = router;

  const url = 'reset-password/';
  const { token } = router.query;

  const token1 = asPath.slice(asPath.indexOf(url), -1).replace(url, '');

  const [showTokenExpired, setShowTokenExpired] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      dispatch(validateForgotPasswordToken(token1)).then((res: any) => {
        if (res?.error) {
          setShowTokenExpired(true);
        }
      });
    }
  }, [token]);

  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);
  const passwordValueRealtime = watch('password');
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleCfPassword = () => {
    setShowCfPassword(!showCfPassword);
  };

  const handleResetPassword = (values: any) => {
    const payload = {
      token: token1,
      password: values?.password,
      passwordConfirm: values?.confirmPassword,
    };
    console.log(
      '🚀 ~ file: [token].tsx:63 ~ handleResetPassword ~ payload:',
      payload
    );
    dispatch(changePasswordByToken(payload)).then((res: any) => {
      if (!res?.error) {
        router.push('/login');
      }
    });
  };
  const validateConfirmPassword = (value: string) => {
    if (value === passwordValueRealtime) {
      return true;
    }
    return 'Passwords do not match';
  };

  return (
    <>
      <main className="flex h-screen items-center justify-center bg-mango-gray-light-2">
        {showTokenExpired ? (
          <TokenExpired />
        ) : (
          <div className="flex min-h-[30%] w-[25%] flex-col items-center justify-between gap-2 rounded-2xl bg-white p-8">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-text-title ">
                Reset your password
              </div>
              <div className="text-sm text-text-secondary">
                Enter your new password
              </div>
            </div>

            <form
              onSubmit={handleSubmit(handleResetPassword)}
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
                      label="Enter new password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      error={Boolean(errors.password)}
                      {...register('password', {
                        required: 'Enter new password!',
                        minLength: {
                          value: 9,
                          message: 'Password must be more than 8 characters!',
                        },
                      })}
                      className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleTogglePassword}>
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="password"
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
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <TextField
                      label="Confirm new password"
                      type={showCfPassword ? 'text' : 'password'}
                      required
                      error={Boolean(errors.confirmPassword)}
                      {...register('confirmPassword', {
                        required: 'Confirm Password is required!',
                        validate: validateConfirmPassword,
                      })}
                      className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleToggleCfPassword}>
                              {showCfPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="confirmPassword"
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
                    {errors?.email ? (
                      <Button
                        variant="contained"
                        className="mt-3 h-12 w-full cursor-pointer rounded-lg bg-mango-primary-blue font-semibold text-white "
                        type="submit"
                        sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
                        disabled
                      >
                        SEND{' '}
                        <SendIcon fontSize="small" style={{ marginLeft: 5 }} />
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        className="mt-3 h-12 w-full rounded-lg bg-mango-primary-blue font-semibold text-white "
                        type="submit"
                        sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
                      >
                        SEND{' '}
                        <SendIcon fontSize="small" style={{ marginLeft: 5 }} />
                      </Button>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </div>
        )}
      </main>
    </>
  );
};
export default ResetPassword;
