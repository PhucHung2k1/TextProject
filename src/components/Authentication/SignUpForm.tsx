import { checkExistEmail, signUp } from '@/store/account/accountAction';
import { useAppDispatch } from '@/store/hook';
import { emailRegex } from '@/utils/helper/isValidEmail';
import { ErrorMessage } from '@hookform/error-message';
import { Check, Error } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
} from '@mui/material';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IFormInput {
  firstName: string;
  lastName: string;
  email: number | string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const [emailState, setEmailState] = useState({
    emailName: '',
    emailStatus: 'idle', // existed , available
  });

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
    dispatch(signUp(values)).then((res) => {
      const responseData = res.payload;
      if (responseData?.status === 200) {
        router.push(
          {
            pathname: '/verify-account',
            query: {
              email: values.email,
            },
          },
          '/verify-account/'
        );
      }
    });
  };

  const passwordValueRealtime = watch('password');
  const confirmPasswordValueRealtime = watch('confirmPassword');

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

  useEffect(() => {
    return () => {
      validateEmail.cancel();
    };
  }, [validateEmail]);

  useEffect(() => {
    if (confirmPasswordValueRealtime !== passwordValueRealtime) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
    } else {
      clearErrors('confirmPassword');
    }
  }, [confirmPasswordValueRealtime]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className=" w-[568px] rounded-2xl bg-white px-8 py-10 shadow-md">
        <p className="text-[32px] font-semibold">Create new account</p>
        <p className="text-justify font-normal text-mango-text-gray-2">
          By creating an account, you agree to our{' '}
          <Link href="/">Terms of Use</Link> and acknowledge our{' '}
          <Link href="/" className="font-bold text-mango-text-blue-2">
            Privacy Policy
          </Link>{' '}
          . Depending on how you use Mango For Salon, we may send you
          promotional emails. See our Privacy Policy for more info or to
          opt-out.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8" noValidate>
          <Grid container spacing={2}>
            <Grid xs={6} item>
              <FormControl
                fullWidth
                className="text-sm font-normal !text-mango-text-black-1"
              >
                <TextField
                  label="First Name"
                  required
                  type="text"
                  placeholder="First Name"
                  error={Boolean(errors.firstName)}
                  {...register('firstName', {
                    required: 'Enter Your First Name!',
                  })}
                  className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                />
                <ErrorMessage
                  errors={errors}
                  name="firstName"
                  render={({ message }: any) => (
                    <div className="mt-2 text-sm text-red-700" role="alert">
                      <span className="font-medium">{message}</span>
                    </div>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid xs={6} item>
              <FormControl
                fullWidth
                className="text-sm font-normal !text-mango-text-black-1"
              >
                <TextField
                  label="Last Name"
                  type="text"
                  required
                  error={Boolean(errors.lastName)}
                  placeholder="Last Name"
                  {...register('lastName', {
                    required: 'Enter Your Last Name!',
                  })}
                  className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                />
                <ErrorMessage
                  errors={errors}
                  name="lastName"
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
                  label="Email Address"
                  type="email"
                  required
                  error={Boolean(errors.email)}
                  placeholder="Email Address"
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
                className="text-sm font-normal !text-mango-text-black-1"
              >
                <TextField
                  label="Password"
                  type="password"
                  placeholder="Password"
                  error={Boolean(errors.password)}
                  {...register('password', {
                    required: 'Enter Your Password!',
                  })}
                  className="!rounded-sm border border-mango-text-gray-1 !outline-none"
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
                  label="Confirm Password"
                  type="password"
                  required
                  placeholder="Confirm Password"
                  error={Boolean(errors.confirmPassword)}
                  {...register('confirmPassword', {
                    required: 'Confirm Password is required!',
                    // validate: (value) =>
                    //   value === passwordValueRealtime ||
                    //   "Passwords do not match",
                  })}
                  className="!rounded-sm border border-mango-text-gray-1 !outline-none"
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
          </Grid>

          <Button
            type="submit"
            className="my-4 h-12 w-full bg-mango-primary-blue font-bold"
            variant="contained"
          >
            Sign Up
          </Button>
        </form>

        <Button
          onClick={() => router.push('/login')}
          className="h-12 w-full bg-[#0000000a] px-[22px] py-2 font-bold text-mango-text-gray-2 !shadow-none hover:!bg-mango-primary-blue"
          variant="contained"
        >
          <ArrowBackIcon />
          Login
        </Button>
      </div>
    </div>
  );
}
