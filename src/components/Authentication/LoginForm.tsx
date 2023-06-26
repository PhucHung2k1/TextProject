import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import type { ISignInForm } from '@/services/auth.service/auth.service';
import type { IAuthResponse } from '@/services/auth.service/auth.interface';
import Cookies from 'js-cookie';
import { signIn, getSession } from 'next-auth/react';
import {
  setMessageToast,
  setTypeAlertToast,
  showToast,
} from '@/store/toast/toastSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { ErrorMessage } from '@hookform/error-message';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form';
import { showToastMessage } from '@/utils/helper/showToastMessage';
import { useRouter } from 'next/router';
import { confirmInvitation } from '@/store/customer/customerAction';
import { showLoadingLogin } from '@/store/loading/loadingSlice';

export default function LoginForm() {
  const router = useRouter();

  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const invitationToken = useAppSelector(
    (state) => state.customerSlice.invitationToken
  );
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const isInviteEmail = useAppSelector(
    (state) => state.customerSlice.isInviteEmail
  );

  // const {
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = useForm<ISignInForm>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInForm>();

  const handleSignIn = async (values: ISignInForm) => {
    dispatch(showLoadingLogin(true));
    await signIn('credentials', {
      username: values.username,
      password: values.password,
      hasRefreshToken: rememberMe,
      redirect: false,
      callbackUrl: '/',
    })
      .then((callback) => {
        if (callback?.error) {
          // eslint-disable-next-line no-alert
          showToastMessage(
            dispatch,
            `${callback?.error}`.replace(/"/g, ' '),
            'error'
          );
        }

        if (callback?.ok && !callback?.error) {
          getSession().then((session) => {
            if (session) {
              const { user } = session;

              if (!user.IsVerified) {
                dispatch(setTypeAlertToast('error'));
                dispatch(setMessageToast('Please activate your account'));
                dispatch(showToast());
              } else {
                const iAuthResponse = user as unknown as IAuthResponse;
                if (iAuthResponse.AccessToken) {
                  Cookies.set('auth-token', iAuthResponse.AccessToken);
                }
                if (iAuthResponse.RefreshToken) {
                  Cookies.set('refresh-token', iAuthResponse.RefreshToken);
                }
                isInviteEmail &&
                  dispatch(confirmInvitation({ Token: invitationToken }));
                dispatch(setTypeAlertToast('success'));
                dispatch(setMessageToast('Login Success!'));
                dispatch(showToast());
                router.push('/select-store');
              }
            }
          });
        }
      })
      .finally(() => dispatch(showLoadingLogin(false)));
  };

  return (
    <>
      <div>
        <form
          className="container mx-auto mb-10 mt-8 flex w-full max-w-2xl flex-col items-center justify-start gap-5"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <FormControl
                fullWidth
                className="text-sm font-normal !text-mango-text-black-1"
              >
                <TextField
                  label="Email Address"
                  type="text"
                  error={Boolean(errors.username)}
                  {...register('username', {
                    required: 'Enter Your Email Address!',
                  })}
                  className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                />
                <ErrorMessage
                  errors={errors}
                  name="username"
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
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  error={Boolean(errors.password)}
                  {...register('password', {
                    required: 'Enter Your Password!',
                    minLength: {
                      value: 9,
                      message: 'Password must be more than 8 characters!',
                    },
                  })}
                  className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
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
          </Grid>

          <div className="flex w-full items-center justify-between">
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(_, v) => {
                    setRememberMe(v);
                  }}
                />
              }
              label="Remember me"
            />
            <Link
              href="/forget-password"
              className="cursor-pointer  font-medium text-mango-primary-blue"
            >
              <div className="cursor-pointer text-text-primary-dark ">
                Forget Password?
              </div>
            </Link>
          </div>

          <Button
            variant="contained"
            className="mt-3 h-12 w-full rounded-lg bg-mango-primary-blue font-semibold text-white "
            type="submit"
            sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
          >
            LOGIN
          </Button>
          <div className="flex cursor-pointer items-center justify-center gap-1">
            <div>Don't have an account?</div>
            <Link href="/sign-up">
              <div className="font-bold text-mango-primary-blue">
                Create new account
              </div>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
