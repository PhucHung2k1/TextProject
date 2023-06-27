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
  const [isagreePolicy, setIsAgreePolicy] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [showCfPassword, setShowCfPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
    // watch,
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

  // const passwordValueRealtime = watch('password');

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
                sx={[sxTextField, sxTextFieldError]}
                label="First Name"
                type="text"
                required
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
                  <div
                    className="ml-2 mt-1 text-sm text-text-error"
                    role="alert"
                  >
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
                sx={[sxTextField, sxTextFieldError]}
                label="Last Name"
                type="text"
                required
                error={Boolean(errors.lastName)}
                {...register('lastName', {
                  required: 'Enter Your Last Name',
                })}
                className="!rounded-sm border border-mango-text-gray-1 !outline-none"
              />
              <ErrorMessage
                errors={errors}
                name="lastName"
                render={({ message }: any) => (
                  <div
                    className="ml-2 mt-1 text-sm text-text-error"
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
                sx={[sxTextField, sxTextFieldError]}
                label="Email Address"
                type="email"
                required
                error={Boolean(errors.email)}
                {...register('email', {
                  required: 'Enter Your Email',
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
                    className="ml-2 mt-1 text-sm text-text-error"
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
                sx={[sxTextField, sxTextFieldError]}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                error={Boolean(errors.password)}
                {...register('password', {
                  required: 'Enter Your Password',
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
                    className="ml-2 mt-1 text-sm text-text-error"

                    role="alert"
                  >
                    <span className="font-medium">{message}</span>
                  </div>
                )}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} item className="flex items-center">
            <FormControl className="ml-[-10px]">
              <Checkbox
                sx={sxCheckBox}
                checked={isagreePolicy}
                onChange={(_, v) => {
                  setIsAgreePolicy(v);
                }}
              />

              <ErrorMessage
                errors={errors}
                name="confirmPassword"
                render={({ message }: any) => (
                  <div
                    className="text-text-error ml-2 mt-1 text-sm"
                    role="alert"
                  >
                    <span className="font-medium">{message}</span>
                  </div>
                )}
              />

            </FormControl>

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
                disabled={!isagreePolicy}
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
              className="mb-[50px] flex cursor-pointer flex-row items-center justify-center gap-1"
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
