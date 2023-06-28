/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-undef */
import { checkExistEmail } from '@/store/account/accountAction';
import { useAppDispatch } from '@/store/hook';
import { emailRegex } from '@/utils/helper/regex';
import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/image';
import { Check, Error } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PercentIcon from '@mui/icons-material/Percent';
import {
  Grid,
  FormControl,
  TextField,
  debounce,
  Stack,
  InputAdornment,
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  Divider,
  Switch,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  sxTextField,
  sxDisableTextField,
  sxTextFieldError,
} from '@/utils/helper/styles';
import { apiPostPhoto } from '@/utils/axios/instance';

const listColors = [
  '#FFFFFF',
  '#2D9DE3',
  '#D03552',
  '#00AD93',
  '#7DB400',
  '#9D46DE',
  '#E77A16',
  '#EE328C',
];
interface IFormInput {
  firstName: string;
  lastName: string;
  nickName: string;
  jobTitle: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  email: number | string;
  password: string;
  confirmPassword: string;
}

interface EmployeeProfileTabProps {
  selectedEmployee: any;
}
const POST_IMAGE = '/file/upload-picture';
const EmployeeProfileTab: React.FC<EmployeeProfileTabProps> = ({
  selectedEmployee,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    trigger,
    clearErrors,
  } = useForm<IFormInput>();
  const [showPassword, setShowPassword] = useState(false);
  const [showPortalID, setShowPortalID] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>();
  const [valueTechPortal, setValueTechPortal] = React.useState('option1');
  const [avatarImage, setAvatarImage] = useState<any>();
  console.log(
    '🚀 ~ file: EmployeeProfileTab.tsx:86 ~ avatarImage:',
    avatarImage
  );
  const dispatch = useAppDispatch();
  const [emailState, setEmailState] = useState({
    emailName: '',
    emailStatus: 'idle', // existed , available
  });
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePortal = () => {
    setShowPortalID(!showPortalID);
  };
  // const handleDateChange = (date: Date | null) => {
  //   setSelectedDate(date);
  // };

  const onSubmit = async (values: IFormInput) => {
    // eslint-disable-next-line no-console
    console.log(
      '🚀 ~ file: EmployeeProfileTab.tsx:61 ~ onSubmit ~ values:',
      values
    );
  };
  const handleChangeTechPortal = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setValueTechPortal(event.target.value as string);
  };

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
  const uploadImage = async (imageFile: File): Promise<void> => {
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append('File', imageFile);
        const res = await apiPostPhoto(POST_IMAGE, formData);
        return res.data;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };
  const handleFileImage = async (e: any) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    const responsive = await uploadImage(file);
    setAvatarImage(responsive);
  };

  return (
    <div className=" min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="my-8" noValidate>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <form
              className=" mt-6 flex flex-wrap justify-center gap-2 "
              noValidate
            >
              <div className="relative flex w-full flex-col items-center justify-center">
                <div className="relative flex h-[186px] w-[186px] items-center justify-center rounded-full border border-border-light">
                  {selectedImage ? (
                    <Image
                      src={URL?.createObjectURL(selectedImage)}
                      alt="logo"
                      layout="fill"
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <Image
                      src={
                        selectedEmployee?.ProfilePictureUrl.includes(
                          'https://' || 'http://'
                        )
                          ? selectedEmployee?.ProfilePictureUrl
                          : '/assets/images/StoreProfile/store-default.png'
                      }
                      alt="logo1"
                      width={186}
                      height={186}
                      className={
                        selectedEmployee?.ProfilePictureUrl !== ''
                          ? 'rounded-full object-cover'
                          : 'rounded-full'
                      }
                    />
                  )}

                  <input
                    className="absolute bottom-0 right-0 z-10 mb-0 h-[185px] w-[185px] cursor-pointer opacity-0"
                    accept="image/*"
                    onChange={handleFileImage}
                    type="file"
                    id="imageUpload"
                  />
                  <div className="absolute bottom-0 right-0 mb-0 flex h-[59px] w-[59px] items-center justify-center rounded-full bg-primary-main">
                    <Image
                      src="/assets/images/SetupStore/picture.svg"
                      alt="logo"
                      width={32}
                      height={32}
                    />
                  </div>
                </div>
                <p className="w-full pt-[16px] text-center text-mango-text-gray-2 ">
                  <Switch checked color="success" />
                  Active
                </p>
              </div>
            </form>
          </Grid>
          <Grid xs={8} item spacing={2}>
            <Stack direction="column" spacing={2}>
              <Stack direction="row" spacing={2}>
                <Grid xs={6} item>
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <TextField
                      sx={sxTextField}
                      label="First Name"
                      type="text"
                      error={Boolean(errors.firstName)}
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
                      sx={sxTextField}
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
                          className="ml-2 mt-1 text-sm text-text-error"
                          role="alert"
                        >
                          <span className="font-medium">{message}</span>
                        </div>
                      )}
                    />
                  </FormControl>
                </Grid>
              </Stack>

              <Grid xs={12} item>
                <FormControl
                  fullWidth
                  className="text-sm font-normal !text-mango-text-black-1"
                >
                  <TextField
                    sx={sxTextField}
                    label="Nick Name"
                    type="text"
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
                    sx={sxTextField}
                    label="Job Title"
                    type="text"
                    {...register('jobTitle', {})}
                    className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker className="w-full" />
                </LocalizationProvider>
              </Grid>
            </Stack>
          </Grid>

          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Color */}
          <Grid xs={12} item className="">
            <Stack direction="column" spacing={2}>
              <div className="text-2xl font-semibold text-text-title">
                Color
              </div>
              <Stack direction="row" spacing={2}>
                {listColors.map((item, index) => {
                  return (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      onClick={() => {
                        // setSelectColor(item);
                      }}
                      className={`h-[54px] w-[54px] cursor-pointer rounded-full ${
                        item === '#FFFFFF' && 'border border-mango-gray-light-3'
                      }`}
                      style={{ background: item }}
                    />
                  );
                })}
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Address */}
          <Grid xs={12} item className="">
            <Stack direction="column" spacing={2}>
              <div className="text-2xl font-semibold text-text-title">
                Address
              </div>
              <Stack direction="column" spacing={2}>
                <Grid xs={12} item>
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <TextField
                      sx={sxTextField}
                      label="Address line 1"
                      type="text"
                      {...register('address1', {})}
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
                      sx={sxTextField}
                      label="Address line 2"
                      type="text"
                      {...register('address2', {})}
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
                      sx={sxTextField}
                      label="City"
                      type="text"
                      {...register('address2', {})}
                      className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                    />
                  </FormControl>
                </Grid>
                <Stack direction="row" spacing={2}>
                  <Grid xs={6} item>
                    <FormControl
                      fullWidth
                      className="text-sm font-normal !text-mango-text-black-1"
                    >
                      <TextField
                        sx={sxTextField}
                        label="State"
                        type="text"
                        error={Boolean(errors.firstName)}
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
                        sx={sxTextField}
                        label="Zip code"
                        type="text"
                        error={Boolean(errors.lastName)}
                        {...register('lastName', {})}
                        className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                      />
                    </FormControl>
                  </Grid>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Contact Info */}
          <Grid xs={12} item className="">
            <Stack direction="column" spacing={2}>
              <div className="text-2xl font-semibold text-text-title">
                Contact info
              </div>
              <Stack direction="column" spacing={2}>
                <Grid xs={12} item>
                  <Stack direction="row" spacing={2}>
                    <Grid xs={9}>
                      <FormControl
                        fullWidth
                        className="text-sm font-normal !text-mango-text-black-1"
                      >
                        <FormControl
                          fullWidth
                          className="text-sm font-normal !text-mango-text-black-1"
                        >
                          <TextField
                            sx={[sxTextField, sxTextFieldError]}
                            label="Email address"
                            type="text"
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
                                className="ml-2 mt-1 text-sm text-text-error"
                                role="alert"
                              >
                                <span className="font-medium">{message}</span>
                              </div>
                            )}
                          />
                        </FormControl>
                      </FormControl>
                    </Grid>
                    <Grid xs={3}>
                      <Button
                        startIcon={<SendIcon />}
                        className="h-[56px] w-full bg-[#00BDD614] px-3 font-semibold text-text-primary-dark"
                      >
                        Send Invitation
                      </Button>
                    </Grid>
                  </Stack>
                </Grid>
                <Grid xs={12} item>
                  <Stack direction="row" spacing={2}>
                    <Grid xs={3}>
                      <FormControl
                        fullWidth
                        className="text-sm font-normal !text-mango-text-black-1"
                      >
                        <TextField
                          disabled
                          className=" bg-[#F2F2F2]"
                          sx={{ sxDisableTextField }}
                          id="input-with-icon-textfield"
                          label="Prefix"
                          defaultValue="(+1)"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Box className="h-5 w-5">
                                  <Image
                                    loading="lazy"
                                    width={20}
                                    height={20}
                                    src="/assets/images/SetupStore/US.png"
                                    alt=""
                                  />
                                </Box>
                                <Divider
                                  className="mr-4"
                                  sx={{ height: 28, m: 0.5 }}
                                  orientation="vertical"
                                />
                              </InputAdornment>
                            ),
                          }}
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>

                    <FormControl
                      fullWidth
                      className="text-sm font-normal !text-mango-text-black-1"
                    >
                      <TextField
                        sx={sxTextField}
                        label="Phone number"
                        type="text"
                        {...register('address2', {})}
                        className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                      />
                    </FormControl>
                  </Stack>
                </Grid>
              </Stack>
            </Stack>
          </Grid>
          {/* UnderLine */}
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Security */}
          <Grid xs={12} item className="">
            <Stack direction="column" spacing={2}>
              <div className="text-2xl font-semibold text-text-title">
                Security
              </div>
              <Stack direction="column" spacing={2}>
                <Grid xs={12} item>
                  <Grid xs={6}>
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
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
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
                </Grid>
                <Grid xs={12} item>
                  <Stack direction="row" spacing={2}>
                    <Grid xs={6.55} item>
                      <FormControl
                        fullWidth
                        className="text-sm font-normal !text-mango-text-black-1"
                      >
                        <TextField
                          sx={sxTextField}
                          label="Portal Touch ID"
                          type={showPortalID ? 'text' : 'password'}
                          error={Boolean(errors.password)}
                          {...register('password', {
                            required: 'Enter Your Password!',
                            minLength: {
                              value: 4,
                              message:
                                'Password must be more than 4 characters!',
                            },
                          })}
                          className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={handleTogglePortal}>
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
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
                    <Grid xs={3.5} item>
                      <TextField
                        sx={sxTextField}
                        select
                        value={valueTechPortal}
                        onChange={handleChangeTechPortal}
                        variant="outlined"
                        className="w-full"
                        InputProps={{
                          startAdornment: (
                            <IconButton size="small">
                              <RadioButtonCheckedIcon
                                style={{ color: '#00bdd6' }}
                              />
                            </IconButton>
                          ),
                        }}
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="option1">Option 1</MenuItem>
                        <MenuItem value="option2">Option 2</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid xs={2.5} item>
                      <Button
                        startIcon={<SendIcon />}
                        className="h-[56px] w-full bg-[#00BDD614] px-3 font-semibold text-text-primary-dark"
                      >
                        Send
                      </Button>
                    </Grid>
                  </Stack>
                </Grid>
              </Stack>
            </Stack>
          </Grid>
          {/* Under line */}
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Select date and tủn bonus */}
          <Grid xs={12} item>
            <Stack direction="row" spacing={2}>
              <Grid xs={6} item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker className="w-full" />
                </LocalizationProvider>
              </Grid>
              <Grid xs={6} item>
                <FormControl
                  fullWidth
                  className="text-sm font-normal !text-mango-text-black-1"
                >
                  <TextField
                    sx={sxTextField}
                    label="Turn Bonus"
                    type="text"
                    error={Boolean(errors.lastName)}
                    {...register('lastName', {})}
                    className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PercentIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
            </Stack>
          </Grid>
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Button bottom */}
          <Grid xs={12} item>
            <Stack direction="row" spacing={2}>
              <Grid xs={6} item>
                <div className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] border border-border-secondary bg-white px-3 text-base font-semibold uppercase  text-text-secondary">
                  Cancel
                </div>
              </Grid>
              <Grid xs={6} item>
                <div className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] bg-primary-main text-base  font-semibold uppercase text-white">
                  Save
                </div>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EmployeeProfileTab;
