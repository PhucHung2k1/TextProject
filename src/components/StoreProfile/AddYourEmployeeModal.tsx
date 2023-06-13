/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Grid,
  FormControl,
  TextField,
  Button,
  CircularProgress,
  debounce,
  Divider,
  Typography,
  Link,
  Autocomplete,
} from '@mui/material';
import router from 'next/router';
import * as React from 'react';
import { Check, Clear, Error } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { emailRegex } from '@/utils/helper/isValidEmail';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

interface IFormInput {
  firstName: string;
  lastName: string;
  nickName: string;
  jobTitle: string;
  email: number | string;
  prefixPhone: string;
  phoneNumber: string;
  role: string;
  payStructure: string;
  serviceProduct: string;
}
const listRole = [
  {
    id: 1,
    name: 'Technician',
  },
  {
    id: 2,
    name: 'Manager',
  },
  { id: 3, name: 'Owner' },
  { id: 4, name: 'Add new role' },
];
const listPayStructure = [
  {
    id: 1,
    name: 'Commission',
  },
];
const listServiceProduct = [
  {
    id: 1,
    name: 'All',
  },
];

export const AddYourEmployeeModal = () => {
  // const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
    // clearErrors,
    setError,
    trigger,
  } = useForm<IFormInput>();
  const [emailState, setEmailState] = React.useState({
    emailName: '',
    emailStatus: 'idle', // existed , available
  });

  const validateEmail = debounce(async (emailValue: string) => {
    if (emailRegex.test(emailValue)) {
      setEmailState((pre) => ({ ...pre, emailName: emailValue }));
      // dispatch(
      //   checkExistEmail({
      //     Email: emailValue,
      //   })
      // ).then((res) => {
      //   if (res.payload) {
      //     setEmailState((pre) => ({ ...pre, emailStatus: 'existed' }));
      //     setError('email', {
      //       type: 'manual',
      //       message: 'Email already exists',
      //     });
      //   } else {
      //     setEmailState((pre) => ({ ...pre, emailStatus: 'available' }));
      //     clearErrors('email');
      //   }
      // });
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

  const onSubmit = (values: any) => {
    console.log('values', values);
  };

  return (
    <div className=" w-[568px] rounded-2xl bg-white shadow-md">
      <div className="px-8 pb-8 pt-12">
        <div className=" text-center">
          <div className="flex items-center justify-center ">
            <Clear
              onClick={() => router.back()}
              className="cursor-pointer text-3xl"
            />

            <p className="mx-auto text-[32px] font-semibold">
              Add your employee
            </p>
          </div>

          <p className="text-mango-text-gray-2">
            You can send them an invitation to join now
          </p>
        </div>

        {/*  */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-[90%] w-full overflow-auto pt-8"
        >
          <Grid container rowSpacing={2}>
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
            </Grid>

            <Grid xs={12} item>
              <FormControl
                fullWidth
                className="text-sm font-normal !text-mango-text-black-1"
              >
                <TextField
                  label="Nick Name"
                  type="text"
                  placeholder="Nick Name"
                  {...register('nickName', {})}
                  className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                />
              </FormControl>
            </Grid>

            <Grid xs={12} item>
              <FormControl
                fullWidth
                className="text-sm font-normal !text-mango-text-black-1"
              >
                <TextField
                  label="Job Title"
                  type="text"
                  placeholder="Job title"
                  {...register('jobTitle', {})}
                  className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                />
              </FormControl>
            </Grid>

            <Divider
              sx={{ height: 28, width: 'calc(100%)', ml: 'auto' }}
              orientation="horizontal"
            />

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
                        <Error className="text-red-500" />
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
            <Grid xs={12} item className="pt-2">
              <Typography
                variant="caption"
                mt={1}
                className="text-mango-text-gray-2"
              >
                We will invite your employee to join soon!
              </Typography>
              <Link href="/" className="ml-2">
                <Typography
                  variant="caption"
                  className="font-semibold text-mango-primary-blue"
                >
                  Learn more
                </Typography>
              </Link>
            </Grid>
            <Grid xs={12} item className="relative">
              <Divider
                sx={{
                  width: 'calc(100% + 64px)',
                  position: 'absolute',
                  left: -32,
                }}
                orientation="horizontal"
              />
            </Grid>
            <div className=" ">
              <Grid container rowSpacing={2} className="mt-2  w-full">
                <Grid xs={12} item>
                  <Typography fontSize={20} fontWeight={600} mb={1}>
                    Role & Permission
                  </Typography>
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <Autocomplete
                      options={listRole}
                      getOptionLabel={(option) => option.name}
                      defaultValue={listRole[0]}
                      renderOption={(props, option) => {
                        return (
                          <li
                            {...props}
                            className=" cursor-pointer p-2 hover:!bg-mango-blue-light-1 hover:!font-bold hover:!text-mango-primary-blue"
                          >
                            <Grid container alignItems="center">
                              <Grid item sx={{ display: 'flex', width: 40 }}>
                                <GroupOutlinedIcon />
                              </Grid>
                              <Grid item>
                                <Typography variant="body2" fontSize={16}>
                                  {option.name}
                                </Typography>
                              </Grid>
                            </Grid>
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField {...params} {...register('role', {})} />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} item className="relative">
                  <Divider
                    sx={{
                      width: 'calc(100% + 82px)',
                      position: 'absolute',
                      left: -32,
                    }}
                    orientation="horizontal"
                  />
                </Grid>

                <Grid xs={12} item>
                  <Typography fontSize={20} fontWeight={600} mb={1}>
                    Pay structure
                  </Typography>
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <Autocomplete
                      options={listPayStructure}
                      getOptionLabel={(option) => option.name}
                      defaultValue={listPayStructure[0]}
                      renderOption={(props, option) => {
                        return (
                          <li
                            {...props}
                            className=" cursor-pointer p-2 hover:!bg-mango-blue-light-1 hover:!font-bold hover:!text-mango-primary-blue"
                          >
                            <Grid container alignItems="center">
                              <Grid item sx={{ display: 'flex', width: 40 }}>
                                <GroupOutlinedIcon />
                              </Grid>
                              <Grid item>
                                <Typography variant="body2" fontSize={16}>
                                  {option.name}
                                </Typography>
                              </Grid>
                            </Grid>
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          {...register('payStructure', {})}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} item className="relative">
                  <Divider
                    sx={{
                      width: 'calc(100% + 82px)',
                      position: 'absolute',
                      left: -32,
                    }}
                    orientation="horizontal"
                  />
                </Grid>
                <Grid xs={12} item>
                  <Typography fontSize={20} fontWeight={600} mb={1}>
                    Service & Product
                  </Typography>
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <Autocomplete
                      options={listServiceProduct}
                      getOptionLabel={(option) => option.name}
                      defaultValue={listServiceProduct[0]}
                      renderOption={(props, option) => {
                        return (
                          <li
                            {...props}
                            className=" cursor-pointer p-2 hover:!bg-mango-blue-light-1 hover:!font-bold hover:!text-mango-primary-blue"
                          >
                            <Grid container alignItems="center">
                              <Grid item sx={{ display: 'flex', width: 40 }}>
                                <GroupOutlinedIcon />
                              </Grid>
                              <Grid item>
                                <Typography variant="body2" fontSize={16}>
                                  {option.name}
                                </Typography>
                              </Grid>
                            </Grid>
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          {...register('serviceProduct', {})}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </div>
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
                  SAVE
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};
