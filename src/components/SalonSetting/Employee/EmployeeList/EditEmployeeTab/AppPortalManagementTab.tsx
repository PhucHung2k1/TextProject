/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-undef */
import { ErrorMessage } from '@hookform/error-message';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import {
  Grid,
  FormControl,
  TextField,
  InputAdornment,
  Box,
  IconButton,
  Divider,
  Typography,
  Switch,
  Stack,
  Button,
  FormControlLabel,
  Radio,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sxRadioBlue, sxTextField } from '@/utils/helper/styles';

interface IFormInput {
  portaltouchid: string;
}

interface AppPortalManagementTabProps {
  selectedEmployee: any;
}

const AppPortalManagementTab: React.FC<AppPortalManagementTabProps> = ({
  selectedEmployee,
}) => {
  console.log(
    '🚀 ~ file: AppPortalManagementTab.tsx:56 ~ selectedEmployee:',
    selectedEmployee
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="my-4 " noValidate>
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <Typography
              variant="caption"
              className="px-5 text-2xl font-semibold"
            >
              App & Potal Management
            </Typography>
          </Grid>
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Mango POS */}
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              className="px-5"
            >
              <Stack
                direction="column"
                justifyContent="space-between"
                spacing={2}
              >
                <Stack direction="column">
                  <Typography
                    variant="caption"
                    className="text-xl font-semibold text-text-title"
                  >
                    Mango POS
                  </Typography>
                  <Typography
                    variant="caption"
                    className="text-sm  text-text-secondary"
                  >
                    Allow team member access your Mango POS
                  </Typography>
                </Stack>
                <Stack direction="column" spacing={1}>
                  <Typography
                    variant="caption"
                    className="text-sm  text-text-secondary"
                  >
                    Send invitation email to your team member
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<EmailOutlinedIcon />}
                    className=" w-[158px] border-primary-main   text-sm  normal-case text-text-primary-dark"
                  >
                    Send Invitation
                  </Button>
                </Stack>
              </Stack>
              <Box>
                <Switch checked color="primary" />
                Active
              </Box>
            </Stack>
          </Grid>

          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Mango Biz */}
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              className="px-5"
            >
              <Stack
                direction="column"
                justifyContent="space-between"
                spacing={2}
              >
                <Stack direction="column">
                  <Typography
                    variant="caption"
                    className="text-xl font-semibold text-text-title"
                  >
                    Mango Biz
                  </Typography>
                  <Typography
                    variant="caption"
                    className="text-sm  text-text-secondary"
                  >
                    Allow team member access your Mango Biz
                  </Typography>
                </Stack>
                <Stack direction="column" spacing={1}>
                  <Typography
                    variant="caption"
                    className="text-sm  text-text-secondary"
                  >
                    Send invitation to your team member
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      startIcon={<PhoneIphoneIcon />}
                      className="w-[158px] border-primary-main  text-sm  normal-case text-text-primary-dark"
                    >
                      Send via SMS
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<EmailOutlinedIcon />}
                      className="w-[158px] border-primary-main  text-sm  normal-case text-text-primary-dark"
                    >
                      Send via Email
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
              <Box>
                <Switch checked color="primary" />
                Active
              </Box>
            </Stack>
          </Grid>

          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Portal  */}
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              className="px-5"
              alignItems="flex-start"
            >
              <Stack
                direction="column"
                justifyContent="space-between"
                spacing={2}
                className="w-full"
              >
                <Stack direction="column">
                  <Typography
                    variant="caption"
                    className="text-xl font-semibold text-text-title"
                  >
                    Portal
                  </Typography>
                  <Typography
                    variant="caption"
                    className="text-sm  text-text-secondary"
                  >
                    Allow team member access portal
                  </Typography>
                </Stack>

                <Grid xs={6}>
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <TextField
                      sx={sxTextField}
                      label="Portal Touch ID"
                      type={showPassword ? 'text' : 'password'}
                      error={Boolean(errors.portaltouchid)}
                      {...register('portaltouchid', {
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
                      name="portaltouchid"
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

                <Grid xs={6}>
                  <Stack direction="row" spacing={1}>
                    <Grid xs={6} item>
                      <FormControlLabel
                        value="tipOnCCFeeFromCreditCard"
                        control={<Radio sx={sxRadioBlue} />}
                        label="Tech Portal"
                      />
                    </Grid>

                    <Grid xs={6} item>
                      <FormControlLabel
                        value="tipOnCCDailyFixedFee"
                        control={<Radio sx={sxRadioBlue} />}
                        label="Boss Manage"
                      />
                    </Grid>
                  </Stack>
                </Grid>
                <Grid xs={6}>
                  <Stack direction="column" spacing={1}>
                    <Typography
                      variant="caption"
                      className="text-sm  text-text-secondary"
                    >
                      Allow team member access portal
                    </Typography>

                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        startIcon={<PhoneIphoneIcon />}
                        className="w-[158px] border border-primary-main  text-sm  normal-case text-text-primary-dark"
                      >
                        Send Portal ID
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<RestartAltOutlinedIcon />}
                        className="min-w-[158px]  border  border-icon-delete text-sm normal-case text-icon-delete hover:border-icon-delete"
                      >
                        Send Reset Link
                      </Button>
                    </Stack>
                  </Stack>
                </Grid>
              </Stack>
              <FormControlLabel
                control={<Switch checked name="jason" />}
                label="Active"
                className="mr-0"
              />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AppPortalManagementTab;
