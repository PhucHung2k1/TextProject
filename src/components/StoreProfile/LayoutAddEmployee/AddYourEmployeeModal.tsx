/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  FormControl,
  Button,
  CircularProgress,
  debounce,
  Divider,
  Typography,
  Link,
  Autocomplete,
  InputAdornment,
  TextField,
  Grid,
} from '@mui/material';

import { Check, Clear, Error } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { emailRegex, phoneNumberRegex } from '@/utils/helper/regex';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { clearModalContentMUI, hideModalMUI } from '@/store/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import type { ISendInvitationPayload } from '@/services/customer.service/customer.interface';
import { useState } from 'react';
import type { IAllCustomerRole } from '@/services/customerRole.service/customerRole.interface';
import { sendInvitation } from '@/store/customer/customerAction';

interface IFormInput {
  firstName: string;
  lastName: string;
  nickName: string;
  jobTitle: string;
  email: string;
  prefixPhone: string;
  phoneNumber: string;
  customerRoleId: string;
  payStructure: string;
  serviceAndProduct: string;
}

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
const sxTextField = {
  '& .MuiInputBase-root.Mui-focused': {
    '& > fieldset': {
      borderColor: '#00BDD6',
    },
  },
  '& label.Mui-focused': {
    color: '#00BDD6',
  },
};
export const AddYourEmployeeModal = () => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
    setError,
    trigger,
  } = useForm<IFormInput>();
  const [emailState, setEmailState] = useState({
    emailName: '',
    emailStatus: 'idle', // existed , available
  });
  const listRole = useAppSelector((state) => state.customerRoleSlice.listRole);
  const [valueRole, setValueRole] = useState<IAllCustomerRole>();

  const validateEmail = debounce(async (emailValue: string) => {
    if (emailRegex.test(emailValue)) {
      setEmailState((pre) => ({
        ...pre,
        emailName: emailValue,
        emailStatus: 'available',
      }));
      clearErrors('email');
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

  const onSubmit = (values: IFormInput) => {
    const body: ISendInvitationPayload = {
      firstName: values.firstName,
      lastName: values?.lastName,
      nickName: values?.nickName,
      phoneNumber: values?.phoneNumber,
      email: values?.email,
      jobTitle: values?.jobTitle,
      customerRoleId: valueRole?.Id || '',
      payStructure: values?.payStructure,
      serviceAndProduct: values?.serviceAndProduct,
      isSendInvitation: true,
    };

    dispatch(sendInvitation(body));
  };
  const handleCloseModal = () => {
    dispatch(hideModalMUI());
    dispatch(clearModalContentMUI());
  };

  return (
    <div className="h-auto w-[568px] rounded-2xl bg-white shadow-md">
      <div className="h-full overflow-y-auto px-8 pb-8 pt-12">
        <div className=" text-center">
          <div className="flex items-center justify-center ">
            <Clear
              onClick={handleCloseModal}
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
          className="h-full w-full pt-8"
          noValidate
        >
          <Grid container rowSpacing={2}>
            <Grid container spacing={2}>
              <Grid xs={6} item>
                <FormControl
                  fullWidth
                  required
                  className="text-sm font-normal !text-mango-text-black-1"
                >
                  <TextField
                    label="First Name"
                    type="text"
                    sx={sxTextField}
                    error={Boolean(errors.firstName)}
                    placeholder="First Name"
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
                    sx={sxTextField}
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
                  sx={sxTextField}
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
            <Grid container spacing={2}>
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
                    sx={sxTextField}
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
              <Grid xs={4} item>
                <TextField
                  disabled
                  className=" bg-[#F2F2F2]"
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#404044',
                      fontWeight: '600',
                      fontSize: '16px',
                    },
                  }}
                  id="input-with-icon-textfield"
                  label="Prefix"
                  defaultValue="(+1)"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          loading="lazy"
                          width="20"
                          src="/assets/images/SetupStore/US.png"
                          alt=""
                          className="mr-1"
                        />
                        <Divider
                          className="mr-10"
                          sx={{ height: 28, m: 0.5 }}
                          orientation="vertical"
                        />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid xs={8} item>
                <TextField
                  sx={sxTextField}
                  id="outlined-basic"
                  label="Phone number"
                  required
                  variant="outlined"
                  {...register('phoneNumber', {
                    required: 'Enter Your Phone Number!',
                    validate: (value) =>
                      phoneNumberRegex.test(value) || 'Invalid Phone Number!',
                  })}
                  className="w-full font-[16px] text-[#404044]"
                />
                <ErrorMessage
                  errors={errors}
                  name="phoneNumber"
                  render={({ message }: any) => (
                    <div className="mt-2 text-sm text-red-700" role="alert">
                      <span className="font-medium">{message}</span>
                    </div>
                  )}
                />
              </Grid>
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
            <div className=" mt-4 h-[150px] w-full overflow-x-hidden overflow-y-scroll">
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
                      getOptionLabel={(option) => option?.Name}
                      value={valueRole}
                      onChange={(_event: any, newValue: any) => {
                        setValueRole(newValue);
                      }}
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
                                  {option.Name}
                                </Typography>
                              </Grid>
                            </Grid>
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          {...register('customerRoleId', {})}
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
                            className="  cursor-pointer p-2 hover:!bg-mango-blue-light-1 hover:!font-bold hover:!text-mango-primary-blue"
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
                            className=" cursor-pointer bg-white p-2 hover:!bg-mango-blue-light-1 hover:!font-bold hover:!text-mango-primary-blue"
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
                          {...register('serviceAndProduct', {})}
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
                  type="submit"
                  variant="contained"
                  className="h-12 w-full rounded-lg bg-mango-primary-blue font-semibold text-white"
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
