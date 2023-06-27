import { checkExistEmail, signUp } from '@/store/account/accountAction';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { emailRegex } from '@/utils/helper/regex';
import { ErrorMessage } from '@hookform/error-message';
import { Check, Error } from '@mui/icons-material';
import {
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import {
  sxCheckBox,
  sxTextField,
  sxTextFieldError,
} from '@/utils/helper/styles';

interface IFormInput {
  firstName: string;
  lastName: string;
  email: number | string;
  password: string;
  confirmPassword: string;
  inviteToken: string;
}

export default function SignUpForm() {
  const isInviteEmail = useAppSelector(
    (state) => state.customerSlice.isInviteEmail
  );
  const invitationToken = useAppSelector(
    (state) => state.customerSlice.invitationToken
  );
  const [emailState, setEmailState] = useState({
    emailName: '',
    emailStatus: 'idle', // existed , available
  });
  const [agreePolicy, setAgreePolicy] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleCfPassword = () => {
    setShowCfPassword(!showCfPassword);
  };

  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    trigger,
    clearErrors,
    watch,
  } = useForm<IFormInput>();

  const onSubmit = async (values: IFormInput) => {
    if (isInviteEmail) values.inviteToken = invitationToken;
    dispatch(signUp(values)).then((res) => {
      const responseData: any = res.payload;

      if (responseData) {
        if (!isInviteEmail) {
          router.push({
            pathname: '/verify-account',
            query: {
              email: values.email,
            },
          });
        } else router.push('/login');
      }
    });
  };

  const passwordValueRealtime = watch('password');

  const validateEmail = debounce(async (emailValue: string) => {
    if (emailRegex.test(emailValue)) {
      setEmailState((pre) => ({ ...pre, emailName: emailValue }));
      dispatch(
        checkExistEmail({
          Email: emailValue,
        })
      ).then((res) => {
        if (res.payload) {
          setEmailState((pre) => ({ ...pre, emailStatus: 'existed' }));
          setError('email', {
            type: 'manual',
            message: 'Email already exists',
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
  const validateConfirmPassword = (value: string) => {
    if (value === passwordValueRealtime) {
      return true;
    }
    return 'Passwords do not match';
  };

  useEffect(() => {
    return () => {
      validateEmail.cancel();
    };
  }, [validateEmail]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-8 px-[32px]"
        noValidate
      >
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <FormControl
              fullWidth
              className="text-sm font-normal !text-mango-text-black-1"
            >
              <TextField
                sx={sxTextField}
                label="First Name"
                type="text"
                className="!rounded-sm border border-mango-text-gray-1 !outline-none"
              />
            </FormControl>
          </Grid>
          <Grid xs={6} item>
            <FormControl
              fullWidth
              className="text-sm font-normal !text-mango-text-black-1"
            >
              <TextField
                sx={[sxTextField, sxTextFieldError]}
                label="Last Name"
                type="text"
                required
                error={Boolean(errors.lastName)}
                {...register('lastName', {
                  required: 'Enter Your Last Name!',
                })}
                className="!rounded-sm border border-mango-text-gray-1 !outline-none"
              />
              <ErrorMessage
                errors={errors}
                name="lastName"
                render={({ message }: any) => (
                  <div
                    className="mt-1 ml-2 text-sm text-text-error"
                    role="alert"
                  >
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
                sx={sxTextField}
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
                  <div
                    className="mt-1 ml-2 text-sm text-text-error"
                    role="alert"
                  >
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
                sx={sxTextField}
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
                  <div
                    className="mt-1 ml-2 text-sm text-text-error"
                    role="alert"
                  >
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
                sx={sxTextField}
                label="Confirm Password"
                type={showCfPassword ? 'text' : 'password'}
                required
                error={Boolean(errors.confirmPassword)}
                {...register('confirmPassword', {
                  required: 'Confirm Password is required!',
                  // validate: (value) =>
                  //   value === passwordValueRealtime ||
                  //   "Passwords do not match",
                  validate: validateConfirmPassword,
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
                  <div
                    className="mt-1 ml-2 text-sm text-text-error"
                    role="alert"
                  >
                    <span className="font-medium">{message}</span>
                  </div>
                )}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} item className="flex items-center">
            <FormControlLabel
              control={
                <Checkbox
                  sx={sxCheckBox}
                  checked={agreePolicy}
                  onChange={(_, v) => {
                    setAgreePolicy(v);
                  }}
                />
              }
              label=""
            />

            <div className=" flex">
              <p className="text-text-secondary">
                I agree to the{' '}
                <span className="text-[#00BDD6]">Privacy Policy </span>
                and <span className="text-[#00BDD6]">Terms of Use</span>
              </p>
            </div>
          </Grid>
          <Grid xs={12} item>
            <FormControl
              fullWidth
              className="text-sm font-normal !text-mango-text-black-1"
            >
              <Button
                variant="contained"
                className="mt-3 h-12 w-full rounded-lg bg-mango-primary-blue font-semibold text-white "
                type="submit"
                sx={{ '&:hover': { backgroundColor: '#00ADC3' } }}
              >
                SIGN UP
              </Button>
            </FormControl>
          </Grid>
          <Grid xs={12} item>
            <FormControl
              fullWidth
              className="flex cursor-pointer flex-row items-center justify-center gap-1 mb-[50px]"
            >
              <div>Had an account?</div>
              <Link href="/login">
                <div className="font-bold text-mango-primary-blue">Login</div>
              </Link>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
