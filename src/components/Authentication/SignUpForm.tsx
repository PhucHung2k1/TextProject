import { Button, Checkbox, FormControl } from '@mui/material';
import Link from 'next/link';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { emailRegex } from '@/utils/helper/isValidEmail';

import InputField from '../FormHelper/InputField';
import { useAppDispatch } from '@/store/hook';
import { signUp } from '@/store/account/accountAction';
import { useRouter } from 'next/router';

interface IFormInput {
  firstName: string;
  lastName: string;
  email: number | string;
  password: string;
}
interface IErrorObject {
  name: string;
  required?: string;
  pattern?: Object;
}
const listFormData = [
  {
    label: 'First Name',
    name: 'firstName',
    placeholder: 'Enter your first name',
    required: false,
    messageRequired: 'Enter your first name',
    type: 'text',
  },
  {
    label: 'Last Name',
    name: 'lastName',
    placeholder: 'Enter your last name',
    required: false,
    messageRequired: 'Enter your last name',
    type: 'text',
  },
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Enter your email',
    required: true,
    messageRequired: 'Enter your email',
    type: 'text',
  },
  {
    label: 'Password',
    name: 'password',
    placeholder: 'Enter your password',
    required: true,
    messageRequired: 'Enter your password',
    type: 'password',
  },
];
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
  return (
    <div className="flex flex-col gap-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        {listFormData.map((item) => {
          const registerOptions: IErrorObject = { name: item.name };
          if (item.required) registerOptions.required = item.messageRequired;
          if (item.name === 'email')
            registerOptions.pattern = {
              value: emailRegex,
              message: 'Invalid email address',
            };
          return (
            <Fragment key={item.name}>
              <FormControl
                fullWidth
                required={item.required}
                className="text-sm font-normal !text-mango-text-black-1"
              >
                <InputField
                  label={item.label}
                  keyboardType={item.type}
                  name={item.name}
                  placeholder={item.placeholder}
                  registerOptions={registerOptions}
                  className="!rounded-sm border border-mango-text-gray-1"
                  register={register}
                  errors={errors}
                />
              </FormControl>
            </Fragment>
          );
        })}
        <div>
          <label htmlFor="terms">
            <Checkbox className="mr-2  h-4 w-4" name="terms" />
            <span>I agree to the </span>
            <Link href="/" className="text-mango-text-blue-1">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/" className="text-mango-text-blue-1">
              Terms of Use
            </Link>
          </label>
        </div>
        <Button
          type="submit"
          className="my-4 h-12 w-full bg-mango-primary-blue"
          variant="contained"
        >
          Sign Up
        </Button>
      </form>

      <div className="mx-auto gap-2">
        <span>Already have an account? </span>
        <Link
          href="/login"
          className="text-base font-medium text-mango-primary-blue"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
