/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography,
  debounce,
  Chip,
  Select,
  OutlinedInput,
  MenuItem,
} from '@mui/material';
import Image from 'next/image';
import type { FieldErrors } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { emailRegex, phoneNumberRegex } from '@/utils/helper/regex';
import { hideModalCustom } from '@/store/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import type { ISendInvitationPayload } from '@/services/customer.service/customer.interface';
import { useState } from 'react';
import { sendInvitation } from '@/store/customer/customerAction';
import type { CountryPhone } from '@/services/common/common.interface';
import { ErrorMessage } from '@hookform/error-message';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { Clear, Check, Error } from '@mui/icons-material';
import {
  sxDisableTextField,
  sxSelect,
  sxTextField,
} from '@/utils/helper/styles';
import { getAllPermission } from '@/store/permission/permissionAction';
import { showDrawerRolePermission } from '@/store/common/commonSlice';

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

const arrServiceProduct = [
  'Artificial Nails',
  'Artificial Nails Maintenance',
  'Manicure',
  'Pedicure',
  'Extra',
  'Natural Nails',
];
interface FormControlComponentProps {
  errors?: FieldErrors<IFormInput>;
  required?: boolean;
  label: string;
  type: string;
  sx?: any;
  error?: boolean;
  placeholder: string;
  requiredField: any;
  name: any;
  onChange?: Function;
  InputProps?: any;
}
const FormControlComponent = ({
  label,
  type,
  error = false,
  required = false,
  placeholder,
  requiredField,
  errors,
  name,
  onChange,
  InputProps,
}: FormControlComponentProps) => (
  <FormControl fullWidth required={required}>
    <TextField
      sx={sxTextField}
      label={label}
      type={type}
      required={required}
      error={error}
      placeholder={placeholder}
      {...requiredField}
      onChange={onChange}
      InputProps={InputProps}
      className="!rounded-sm border border-mango-text-gray-1 text-sm font-normal !text-mango-text-black-1 !outline-none"
    />
    {errors && (
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }: any) => (
          <div className="ml-2 mt-1 text-sm text-text-error" role="alert">
            <span className="font-medium">{message}</span>
          </div>
        )}
      />
    )}
  </FormControl>
);
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
  const listRole = useAppSelector(
    (state) => state.customerRoleSlice.listRole
  ).filter((_role, index) => index !== 0);
  const listPayStructure = useAppSelector(
    (state) => state.payStructureSlice.listPayStructure
  );

  const listServiceProduct = useAppSelector(
    (state) => state.commonSlice.lookupData.ProductType
  );

  const [valueRole, setValueRole] = useState<string | null>(
    listRole.find((role) => role.Name === 'Technician')?.Id || null
  );

  const [valueServiceProduct, setValueServiceProduct] =
    useState<CountryPhone | null>(listServiceProduct[0] || null);

  const [valuePayStructure, setValuePayStructure] = useState<string | null>(
    listPayStructure[0]?.Id || null
  );

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
      customerRoleId: valueRole || '',
      payStructure: valuePayStructure || '',
      serviceAndProduct: valueServiceProduct?.Value || '',
      isSendInvitation: true,
    };

    dispatch(sendInvitation(body));
  };
  const handleCloseModal = () => {
    dispatch(hideModalCustom());
  };

  return (
    <div className=" w-[568px] rounded-2xl bg-white pb-8 pt-10 shadow-md">
      {/* <div className=" text-center">
        <div className="flex items-center justify-center px-8">
          <Clear
            onClick={handleCloseModal}
            className="cursor-pointer text-3xl"
          />
          <p className="mx-auto text-[32px] font-semibold">Add team member</p>
        </div>

        <p className="text-mango-text-gray-2">
          Invite your team member to join your salon
        </p>
      </div> */}
      <div className="relative px-8 text-center">
        <Clear
          onClick={handleCloseModal}
          className="absolute left-5 top-0 cursor-pointer text-3xl"
        />

        <p className="mx-auto text-[32px] font-semibold">Add team member</p>
      </div>
      <p className="text-center text-[14px] text-mango-text-gray-2">
        Invite your team member to join your salon
      </p>

      {/*  */}
      <form onSubmit={handleSubmit(onSubmit)} className="" noValidate>
        <Grid>
          <Grid
            container
            rowSpacing={2}
            className="my-5 max-h-[65vh] w-full overflow-x-hidden overflow-y-scroll px-8 pt-5"
          >
            <Grid container spacing={2}>
              <Grid xs={6} item>
                <FormControlComponent
                  label="First Name"
                  type="text"
                  sx={sxTextField}
                  error={Boolean(errors.firstName)}
                  placeholder="First Name"
                  name="firstName"
                  requiredField={{
                    ...register('firstName', {
                      required: 'Enter Your First Name!',
                    }),
                  }}
                  errors={errors}
                />
              </Grid>

              <Grid xs={6} item>
                <FormControlComponent
                  label="Last Name"
                  type="text"
                  required
                  sx={sxTextField}
                  error={Boolean(errors.lastName)}
                  placeholder="Last Name"
                  name="lastName"
                  requiredField={{
                    ...register('lastName', {
                      required: 'Enter Your Last Name!',
                    }),
                  }}
                  errors={errors}
                />
              </Grid>
            </Grid>

            <Grid xs={12} item>
              <FormControlComponent
                label="Nick Name"
                type="text"
                sx={sxTextField}
                placeholder="Nick Name"
                name="nickName"
                requiredField={{ ...register('nickName', {}) }}
              />
            </Grid>

            <Grid xs={12} item>
              <FormControlComponent
                label="Job Title"
                type="text"
                placeholder="Job title"
                name="jobTitle"
                requiredField={{ ...register('jobTitle', {}) }}
              />
            </Grid>

            <Divider
              sx={{ height: 28, width: 'calc(100%)', ml: 'auto' }}
              orientation="horizontal"
            />
            <Grid container spacing={2}>
              <Grid xs={12} item>
                <FormControlComponent
                  name="email"
                  label="Email Address"
                  type="email"
                  required
                  error={Boolean(errors.email)}
                  sx={sxTextField}
                  placeholder="Email Address"
                  requiredField={{
                    ...register('email', {
                      required: 'Enter Your Email!',
                    }),
                  }}
                  onChange={handleEmailChange}
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
              </Grid>
              <Grid xs={4} item>
                <TextField
                  disabled
                  className=" bg-[#F2F2F2]"
                  sx={sxDisableTextField}
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
              </Grid>
              <Grid xs={8} item>
                <FormControlComponent
                  placeholder="Enter Your Phone Number"
                  type="text"
                  sx={sxTextField}
                  errors={errors}
                  name="phoneNumber"
                  label="Phone number"
                  required
                  requiredField={{
                    ...register('phoneNumber', {
                      required: 'Enter Your Phone Number!',
                      validate: (value) =>
                        phoneNumberRegex.test(value) || 'Invalid Phone Number!',
                    }),
                  }}
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
            <div className=" mt-4 ">
              <Grid container rowSpacing={2} className="mt-2  w-full">
                <Grid xs={12} item>
                  <Typography fontSize={20} fontWeight={600} mb={1}>
                    Role & Permission
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      displayEmpty
                      value={valueRole}
                      sx={{
                        '& .css-1sv0avo-MuiGrid-root': {
                          display: 'none',
                          sxSelect,
                        },
                      }}
                      input={<OutlinedInput />}
                      inputProps={{ 'aria-label': 'Without label' }}
                      className="bg-white"
                      onChange={(e) => setValueRole(e.target.value)}
                    >
                      {listRole.map((name) => (
                        <MenuItem
                          key={name.Id}
                          value={name.Id}
                          className=" cursor-pointer p-2 hover:!bg-mango-blue-light-1 hover:!font-bold hover:!text-mango-primary-blue"
                        >
                          <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 40 }}>
                              <GroupOutlinedIcon />
                            </Grid>
                            <Grid item>
                              <Typography variant="body2" fontSize={16}>
                                {name.Name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </MenuItem>
                      ))}
                      <Box className=" cursor-pointer p-2 hover:!bg-mango-blue-light-1 hover:!font-bold hover:!text-mango-primary-blue">
                        <Grid
                          container
                          alignItems="center"
                          onClick={() => {
                            dispatch(
                              getAllPermission({
                                Appointments: true,
                                Marketings: true,
                                ClientManagements: true,
                                CreateCharges: true,
                                TicketManagers: true,
                                GiftCards: true,
                                SalonExchanges: true,
                                SalonCenters: true,
                                NeedHelps: true,
                                TechPortals: true,
                                SalonSettings: true,
                              })
                            );
                            dispatch(showDrawerRolePermission());
                          }}
                        >
                          <Grid item sx={{ display: 'flex', width: 40 }}>
                            <GroupOutlinedIcon />
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" fontSize={16}>
                              Add new role
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Select>
                  </FormControl>
                  <Typography className="my-2 text-mango-text-gray-2">
                    This role allows team members to access functions:
                  </Typography>
                  <Box className="flex-wrap">
                    {listRole
                      .find((item) => item.Id === valueRole)
                      ?.Permissions.map((role) => (
                        <Chip
                          key={role.Id}
                          className=" m-1  bg-blue-50 px-1 text-[16px]  text-blue-700"
                          label={role.Name}
                          sx={{
                            '& .css-6od3lo-MuiChip-label': {
                              overflow: 'unset',
                            },
                          }}
                        />
                      ))}
                  </Box>
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
                  <FormControl fullWidth>
                    <Select
                      displayEmpty
                      value={valuePayStructure}
                      sx={sxSelect}
                      input={<OutlinedInput />}
                      inputProps={{ 'aria-label': 'Without label' }}
                      className="bg-white"
                      onChange={(e) => setValuePayStructure(e.target.value)}
                    >
                      {listPayStructure.map((name) => (
                        <MenuItem
                          key={name.Id}
                          value={name.Id}
                          className=" cursor-pointer p-2 hover:!bg-mango-blue-light-1 hover:!font-bold hover:!text-mango-primary-blue"
                        >
                          <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 40 }}>
                              <GroupOutlinedIcon />
                            </Grid>
                            <Grid item>
                              <Typography variant="body2" fontSize={16}>
                                {name.Name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </MenuItem>
                      ))}
                      <Box className=" cursor-pointer p-2 hover:!bg-mango-blue-light-1 hover:!font-bold hover:!text-mango-primary-blue">
                        <Grid
                          container
                          alignItems="center"
                          onClick={() => dispatch(showDrawerRolePermission())}
                        >
                          <Grid item sx={{ display: 'flex', width: 40 }}>
                            <GroupOutlinedIcon />
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" fontSize={16}>
                              Add pay structure
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Select>
                  </FormControl>
                  <Typography className="my-2 text-mango-text-gray-2">
                    This pay structure is based on:
                  </Typography>
                  <Box className="flex-wrap">
                    <Chip
                      className=" m-1  bg-[#FDE5ED] px-1 text-[16px]  text-pink-500"
                      label={
                        listPayStructure.find(
                          (item) => item.Id === valuePayStructure
                        )?.Name
                      }
                      sx={{
                        '& .css-6od3lo-MuiChip-label': {
                          overflow: 'unset',
                        },
                      }}
                    />
                  </Box>
                  <Box className="my-2 flex-wrap text-mango-text-gray-2">
                    {listPayStructure
                      .find((item) => item.Id === valuePayStructure)
                      ?.Configurations.map((itemConfig, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Box key={index} className="m-1 flex">
                          <Typography>{itemConfig.Name}: </Typography>
                          <Typography fontWeight="bold">
                            {itemConfig.Value}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
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
                  <FormControl fullWidth>
                    <Autocomplete
                      options={listServiceProduct}
                      getOptionLabel={(option) => option.Name}
                      value={valueServiceProduct}
                      onChange={(_event: any, newValue: any) => {
                        setValueServiceProduct(newValue);
                      }}
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
                          {...register('serviceAndProduct', {})}
                        />
                      )}
                    />
                  </FormControl>
                  <Typography className="my-2 text-mango-text-gray-2">
                    This role allows team members to assign:
                  </Typography>
                  <Box className="flex-wrap ">
                    {arrServiceProduct.map((serviceProduct) => (
                      <Chip
                        key={serviceProduct}
                        className="m-1 bg-[#E0F7FA] px-1 text-[16px]  text-[#0098A9]"
                        label={serviceProduct}
                        sx={{
                          '& .css-6od3lo-MuiChip-label': {
                            overflow: 'unset',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid xs={12} item className="mt-2 px-8">
            <FormControl fullWidth>
              <Button
                type="submit"
                variant="contained"
                className="h-12 w-full rounded-lg bg-mango-primary-blue font-semibold text-white hover:bg-button-hover-cyan"
              >
                SAVE
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
