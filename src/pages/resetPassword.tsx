import { Button, FormControl, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import SendIcon from '@mui/icons-material/Send';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const ResetPassword = () => {
  const {
    register,
    formState: { errors },

    handleSubmit,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleCfPassword = () => {
    setShowCfPassword(!showCfPassword);
  };

  const onSubmit = (values: any) => {
    console.log(
      '🚀 ~ file: forgotPassword.tsx:78 ~ onSubmit ~ values:',
      values
    );
  };
  return (
    <main className="flex h-screen items-center justify-center bg-mango-gray-light-2">
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
          onSubmit={handleSubmit(onSubmit)}
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
                  })}
                  className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword}>
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
                  })}
                  className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleToggleCfPassword}>
                          {showCfPassword ? <VisibilityOff /> : <Visibility />}
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
                    SEND <SendIcon fontSize="small" style={{ marginLeft: 5 }} />
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    className="mt-3 h-12 w-full rounded-lg bg-mango-primary-blue font-semibold text-white "
                    type="submit"
                    sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
                  >
                    SEND <SendIcon fontSize="small" style={{ marginLeft: 5 }} />
                  </Button>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </div>
    </main>
  );
};
export default ResetPassword;
