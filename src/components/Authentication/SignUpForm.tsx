import { Button, FormControl, Grid, TextField } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch } from '@/store/hook';
import { useRouter } from 'next/router';
import { ErrorMessage } from '@hookform/error-message';
import { signUp } from '@/store/account/accountAction';
import { emailRegex } from '@/utils/helper/isValidEmail';

interface IFormInput {
  firstName: string;
  lastName: string;
  email: number | string;
  password: string;
}

export default function SignUpForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit = async (values: IFormInput) => {
    dispatch(signUp(values)).then((res) => {
      if (res.payload) {
        router.push('/verifyAccount');
      }
    });
  };
  const handleInputFieldChange = (e: any, name: any) => {
    register(name).onChange(e);
  };
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

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <Grid container spacing={2}>
            <Grid xs={6} item>
              <FormControl
                fullWidth
                className="text-sm font-normal !text-mango-text-black-1"
              >
                <TextField
                  label="First Name"
                  type="text"
                  placeholder="First Name"
                  {...register('firstName', {})}
                  onChange={(e) => handleInputFieldChange(e, 'firstName')}
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
                  placeholder="Email Address"
                  {...register('email', {
                    required: 'Enter Your Email Address!',
                    pattern: {
                      value: emailRegex,
                      message: 'Invalid email address',
                    },
                  })}
                  className="!rounded-sm border border-mango-text-gray-1 !outline-none"
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
                  required
                  placeholder="Password"
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
