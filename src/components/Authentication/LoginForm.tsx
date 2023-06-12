import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { ISignInForm } from '@/services/auth.service/auth.service';
import type { IAuthResponse } from '@/services/auth.service/auth.interface';
import Cookies from 'js-cookie';
import { signIn, getSession } from 'next-auth/react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  setMessageToast,
  setTypeAlertToast,
  showToast,
} from '@/store/toast/toastSlice';
import { useAppDispatch } from '@/store/hook';

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignInForm>();

  const handleSignIn = async (values: ISignInForm) => {
    await signIn('credentials', {
      username: values.username,
      password: values.password,
      hasRefreshToken: rememberMe,
      redirect: false,
      callbackUrl: '/',
    }).then((callback) => {
      if (callback?.error) {
        // eslint-disable-next-line no-alert
        dispatch(setTypeAlertToast('error'));
        dispatch(setMessageToast('Wrong username / password!'));
        dispatch(showToast());
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
              dispatch(setTypeAlertToast('success'));
              dispatch(setMessageToast('Login Success!'));
              dispatch(showToast());
            }
          }
        });
      }
    });
  };

  return (
    <div>
      <form
        className="container mx-auto mb-10 mt-5 flex w-full max-w-2xl flex-col items-center justify-start gap-5"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Controller
          name="username"
          control={control}
          rules={{ required: 'Username is required' }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-username-input"
              label="Username"
              type="text"
              autoComplete="username"
              className="w-full"
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

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
            href="/"
            className="cursor-pointer  font-medium text-mango-primary-blue"
          >
            <div className="text-text-primary-dark">Forgot Password?</div>
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
  );
}
