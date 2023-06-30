/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-undef */
import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/image';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Grid,
  FormControl,
  TextField,
  Stack,
  InputAdornment,
  Box,
  IconButton,
  Divider,
  Button,
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
  address: string;
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
  } = useForm<IFormInput>();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>();
  const [avatarImage, setAvatarImage] = useState<any>();
  const [showMore, setShowMore] = useState<boolean>(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values: IFormInput) => {
    // eslint-disable-next-line no-console
    console.log(
      '🚀 ~ file: EmployeeProfileTab.tsx:61 ~ onSubmit ~ values:',
      values
    );
  };
  console.log(
    '🚀 ~ file: EmployeeProfileTab.tsx:61 ~  ~ avatarImage:',
    avatarImage,
    selectedEmployee
  );

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
  const handleShowMoreToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-[8px] rounded-t-none border border-t-0 border-mango-gray-light-3 "
        noValidate
      >
        <Grid container spacing={2}>
          <Grid xs={4}>
            <form
              className=" mt-6 flex flex-wrap justify-center gap-2  px-[24px] py-[32px]"
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
                    ''
                    // <Image
                    //   src={
                    //     selectedEmployee?.ProfilePictureUrl.includes(
                    //       'https://' || 'http://'
                    //     )
                    //       ? selectedEmployee?.ProfilePictureUrl
                    //       : '/assets/images/StoreProfile/store-default.png'
                    //   }
                    //   alt="logo1"
                    //   width={186}
                    //   height={186}
                    //   className={
                    //     selectedEmployee?.ProfilePictureUrl !== ''
                    //       ? 'rounded-full object-cover'
                    //       : 'rounded-full'
                    //   }
                    // />
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
                <p className="mt-[33px] w-full text-center text-mango-text-gray-2 ">
                  <Switch checked color="success" />
                  Active
                </p>
              </div>
            </form>
          </Grid>
          <Grid xs={8} className="pr-5" item spacing={2}>
            <Stack direction="column" className="pt-[32px]" spacing={2}>
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
              <Grid xs={12} item>
                <FormControl
                  fullWidth
                  className="text-sm font-normal !text-mango-text-black-1"
                >
                  <TextField
                    sx={[sxTextField, sxTextFieldError]}
                    label="Passcode "
                    type={showPassword ? 'text' : 'password'}
                    error={Boolean(errors.password)}
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
            </Stack>
          </Grid>
          <Grid xs={12} item className="my-[8px]">
            <Divider />
          </Grid>
          {/* Color */}
          <Grid xs={12} item>
            <Stack direction="column" spacing={2} className="px-5">
              <Box className="text-xl font-semibold text-text-title">
                Select Color
              </Box>
              <Stack direction="row" spacing={2}>
                {listColors.map((item, index) => {
                  return (
                    <Stack
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      className={`h-[64px] w-[64px] rounded-full ${
                        selectedColor === item &&
                        'border-2 border-primary-gradient'
                      }`}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box
                        onClick={() => {
                          setSelectedColor(item);
                        }}
                        className={`h-[54px] w-[54px] cursor-pointer rounded-full ${
                          item === '#FFFFFF' &&
                          'border border-mango-gray-light-3'
                        }`}
                        style={{ background: item }}
                      />
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} item className="my-[8px]">
            <Divider />
          </Grid>
          {/* Contact Info */}
          <Grid xs={12} item>
            <Stack direction="column" spacing={2} className="px-5 ">
              <div className="text-xl font-semibold text-text-title">
                Contact
              </div>
              <Stack direction="column" spacing={2}>
                <Grid xs={12} item>
                  <Stack direction="row" spacing={2}>
                    <Grid xs={6}>
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
                            className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                          />
                        </FormControl>
                      </FormControl>
                    </Grid>
                    <Grid xs={6} item>
                      <Stack direction="row" spacing={2}>
                        <Grid xs={5}>
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
                            {...register('city', {})}
                            className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                          />
                        </FormControl>
                      </Stack>
                    </Grid>
                  </Stack>
                </Grid>
              </Stack>
            </Stack>
          </Grid>
          {showMore ? (
            <Grid xs={12} item className="my-[8px]">
              <Divider />
            </Grid>
          ) : (
            ''
          )}

          {/* Address Info */}
          <Grid xs={12} item>
            <Stack className="px-5 pb-5">
              <Grid xs={12} className="flex flex-col-reverse" item>
                <div>
                  {showMore ? (
                    <Button
                      className="border border-mango-text-gray-2 text-mango-text-gray-2 text-[14px] hover:border-mango-text-gray-2 mt-5"
                      variant="outlined"
                      onClick={handleShowMoreToggle}
                    >
                      Show less
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      className="border border-mango-text-gray-2 text-mango-text-gray-2 hover:border-mango-text-gray-2 mt-[5px]"
                      onClick={handleShowMoreToggle}
                    >
                      Show more
                    </Button>
                  )}
                </div>
                {showMore ? (
                  <div>
                    {/* Address */}

                    <Grid xs={12} item>
                      <Stack direction="column" spacing={2}>
                        <Box className="text-xl font-semibold text-text-title">
                          Address
                        </Box>
                        <Stack direction="column" spacing={2}>
                          <Grid xs={12} item>
                            <FormControl
                              fullWidth
                              className="text-sm font-normal !text-mango-text-black-1"
                            >
                              <TextField
                                sx={sxTextField}
                                label="Address line "
                                type="text"
                                {...register('address', {})}
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
                                  label="City"
                                  type="text"
                                  {...register('city', {})}
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
                                  label="State"
                                  type="text"
                                  error={Boolean(errors.firstName)}
                                  className="!rounded-sm border border-mango-text-gray-1 !outline-none"
                                />
                              </FormControl>
                            </Grid>
                          </Stack>

                          <Stack>
                            <Grid xs={6} spacing={2}>
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
                                  className="mr-[8px]  !rounded-sm border border-mango-text-gray-1 !outline-none"
                                />
                              </FormControl>
                            </Grid>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Grid>
                  </div>
                ) : (
                  ''
                )}
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EmployeeProfileTab;
