/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-undef */
import { ErrorMessage } from '@hookform/error-message';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import PercentIcon from '@mui/icons-material/Percent';
import type { SelectChangeEvent } from '@mui/material';
import {
  Grid,
  FormControl,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  MenuItem,
  Divider,
  Select,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Switch,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sxSelect, sxTextField } from '@/utils/helper/styles';

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
  paystructuregroupname: string;
  potentialbonus: string;
  commissionpayout: string;
  maxcommissionpayout: string;
}
interface FormAddPayStructureProps {
  handleCloseDrawer: any;
}

const FormAddPayStructure: React.FC<FormAddPayStructureProps> = ({
  handleCloseDrawer,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const [payStructureType, setPayStructureType] = React.useState(
    'commissionguarantee'
  );
  // state select radio tip on cc
  const [selectedTipOnCC, setSelectedTipOnCC] = useState('feefromcreditcard');
  const [selectedDailySur, setSelectedDailySur] = useState('fromcommission');
  const [valueTechPortal, setValueTechPortal] = useState('option1');
  // switch product comission
  const [checkedProductComission, setCheckedProductComission] = useState(false);

  // handle change tip select tip on cc
  const handleChangeTipOnCC = (event: any) => {
    setSelectedTipOnCC(event.target.value);
  };
  // handle change selected daily surcharge
  const handleChangeDailySur = (event: any) => {
    setSelectedDailySur(event.target.value);
  };
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
  // change select pay structure type
  const handleChangePayStructureType = (event: SelectChangeEvent) => {
    setPayStructureType(event.target.value);
  };
  // handle change product comission
  const handleChangeProductComission = () => {
    setCheckedProductComission(!checkedProductComission);
  };

  return (
    <div className=" min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="my-8" noValidate>
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <FormControl
              fullWidth
              className="text-sm font-normal !text-mango-text-black-1"
            >
              <TextField
                label="Pay Structure Group Name"
                sx={sxTextField}
                type="text"
                required
                error={Boolean(errors.lastName)}
                {...register('paystructuregroupname', {
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
          <Grid xs={12} item>
            <Divider />
          </Grid>

          <Grid xs={12} item>
            {/* Pay Structure settings */}
            <Stack direction="column" spacing={2}>
              <Grid xs={5.85} item>
                <Stack direction="column" spacing={2}>
                  <div className="text-2xl font-semibold text-text-title">
                    Pay Structure settings
                  </div>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                    <InputLabel id="demo-select-small-label">
                      Pay Structure Type
                    </InputLabel>
                    <Select
                      sx={sxSelect}
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={payStructureType}
                      label="Pay Structure Type"
                      onChange={handleChangePayStructureType}
                      startAdornment={
                        <InputAdornment position="start">
                          <IconButton size="small">
                            <RadioButtonCheckedIcon
                              style={{ color: '#00bdd6' }}
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="commissionguarantee">
                        Commission-Guarantee
                      </MenuItem>
                      <MenuItem value="commission">Commission</MenuItem>
                      <MenuItem value="salary">Salary</MenuItem>
                      <MenuItem value="hourly">Hourly</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid xs={5.85} item>
                <FormControl
                  fullWidth
                  className="text-sm font-normal !text-mango-text-black-1"
                >
                  <TextField
                    label="Potential Bonus"
                    type="text"
                    sx={sxTextField}
                    {...register('potentialbonus', {})}
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
              <Stack direction="row" spacing={2}>
                <Grid xs={6} item>
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <TextField
                      label="Commission Payout"
                      type="text"
                      sx={sxTextField}
                      {...register('commissionpayout', {})}
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
                </Grid>{' '}
                <Grid xs={6} item>
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    <TextField
                      sx={sxTextField}
                      label="Max Commission Payout"
                      type="text"
                      {...register('maxcommissionpayout', {})}
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
            </Stack>
          </Grid>

          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Tip on cc */}
          <Grid xs={12} item>
            <Stack direction="column" spacing={2}>
              <div className="text-2xl font-semibold text-text-title">
                Tip on CC
              </div>

              <RadioGroup row className="">
                <Stack direction="row" spacing={2} className="w-full">
                  <Grid xs={6} item>
                    <FormControlLabel
                      value="feefromcreditcard"
                      control={<Radio />}
                      label="Fee from credit card"
                      onChange={handleChangeTipOnCC}
                      checked={selectedTipOnCC === 'feefromcreditcard'}
                    />

                    <FormControl
                      fullWidth
                      className="w-[83%] text-sm font-normal !text-mango-text-black-1"
                    >
                      <TextField
                        sx={sxTextField}
                        type="number"
                        {...register('address1', {})}
                        className={`!rounded-sm border border-mango-text-gray-1 !outline-none ${
                          selectedTipOnCC === 'dailyfixedfee' &&
                          'bg-disable-input'
                        }`}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PercentIcon />
                            </InputAdornment>
                          ),
                        }}
                        disabled={selectedTipOnCC === 'dailyfixedfee'}
                      />
                    </FormControl>
                  </Grid>

                  <Grid xs={6} item>
                    <FormControlLabel
                      value="dailyfixedfee"
                      control={<Radio />}
                      label="Daily fixed fee"
                      onChange={handleChangeTipOnCC}
                      checked={selectedTipOnCC === 'dailyfixedfee'}
                    />

                    <FormControl
                      fullWidth
                      className="w-[83%] text-sm font-normal !text-mango-text-black-1"
                    >
                      <TextField
                        sx={sxTextField}
                        type="number"
                        {...register('address1', {})}
                        className={`!rounded-sm border border-mango-text-gray-1 !outline-none ${
                          selectedTipOnCC === 'feefromcreditcard' &&
                          'bg-disable-input'
                        }`}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PercentIcon />
                            </InputAdornment>
                          ),
                        }}
                        disabled={selectedTipOnCC === 'feefromcreditcard'}
                      />
                    </FormControl>
                  </Grid>
                </Stack>
              </RadioGroup>
            </Stack>
          </Grid>
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Daily Surcharge */}
          <Grid xs={12} item>
            <Stack direction="column" spacing={2}>
              <div className="text-2xl font-semibold text-text-title">
                Daily Surcharge
              </div>

              <RadioGroup row className="">
                <Stack direction="row" spacing={2} className="w-full">
                  <Grid xs={6} item>
                    <FormControlLabel
                      value="fromcommission"
                      control={<Radio />}
                      label="From commission"
                      onChange={handleChangeDailySur}
                      checked={selectedDailySur === 'fromcommission'}
                    />

                    <FormControl
                      fullWidth
                      className="w-[83%] text-sm font-normal !text-mango-text-black-1"
                    >
                      <TextField
                        sx={sxTextField}
                        type="number"
                        {...register('address1', {})}
                        className={`!rounded-sm border border-mango-text-gray-1 !outline-none ${
                          selectedDailySur === 'fixedsurcharge' &&
                          'bg-disable-input'
                        }`}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PercentIcon />
                            </InputAdornment>
                          ),
                        }}
                        disabled={selectedDailySur === 'fixedsurcharge'}
                      />
                    </FormControl>
                  </Grid>

                  <Grid xs={6} item>
                    <FormControlLabel
                      value="fixedsurcharge"
                      control={<Radio />}
                      label="Fixed surcharge"
                      onChange={handleChangeDailySur}
                      checked={selectedDailySur === 'fixedsurcharge'}
                    />

                    <FormControl
                      fullWidth
                      className="w-[83%] text-sm font-normal !text-mango-text-black-1"
                    >
                      <TextField
                        sx={sxTextField}
                        type="number"
                        {...register('address1', {})}
                        className={`!rounded-sm border border-mango-text-gray-1 !outline-none ${
                          selectedDailySur === 'fromcommission' &&
                          'bg-disable-input'
                        }`}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PercentIcon />
                            </InputAdornment>
                          ),
                        }}
                        disabled={selectedDailySur === 'fromcommission'}
                      />
                    </FormControl>
                  </Grid>
                </Stack>
              </RadioGroup>
              <Grid
                xs={11}
                className="min-h-[218px] rounded-md border border-mango-gray-light-3 p-5 "
              >
                <Stack direction="column" spacing={1}>
                  <Box className="text-base font-semibold text-text-secondary">
                    If working time is:
                  </Box>
                  <Grid xs={9}>
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
                      <MenuItem value="day">Day</MenuItem>
                      <MenuItem value="week">Week</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid xs={9} item>
                    <Box className=" h-[88px] rounded bg-bg-light p-5">
                      <Grid xs={4}>
                        <FormControl
                          fullWidth
                          className="text-sm font-normal !text-mango-text-black-1"
                        >
                          <TextField
                            sx={sxTextField}
                            label="Min hours (h)"
                            type="number"
                            error={Boolean(errors.password)}
                            {...register('password', {
                              required: 'Enter Your Password!',
                            })}
                            className="!rounded-sm border border-mango-text-gray-1 bg-white !outline-none"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <div className="text-lg font-bold text-icon-color">
                                    H
                                  </div>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </FormControl>
                      </Grid>
                    </Box>
                  </Grid>
                </Stack>
              </Grid>
            </Stack>
          </Grid>
          {/* UnderLine */}
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Product Charge */}
          <Grid xs={12} item className="">
            <Stack direction="column" spacing={2}>
              <div className="text-2xl font-semibold text-text-title">
                Product Charge
              </div>
              <RadioGroup row className="">
                <Stack direction="column" spacing={1} className="w-full">
                  <Grid xs={12} item>
                    <FormControlLabel
                      value="feefromcreditcard"
                      control={<Radio />}
                      label="Based on Service (Menu Settings)"
                      onChange={handleChangeTipOnCC}
                      checked={selectedTipOnCC === 'feefromcreditcard'}
                    />
                  </Grid>

                  <Grid xs={12} item>
                    <FormControlLabel
                      value="dailyfixedfee"
                      control={<Radio />}
                      label="Based on ticket"
                      onChange={handleChangeTipOnCC}
                      checked={selectedTipOnCC === 'dailyfixedfee'}
                    />
                  </Grid>
                </Stack>
              </RadioGroup>
            </Stack>
          </Grid>
          {/* Under line */}
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Product Comission */}
          <Grid xs={12} item className="">
            <Stack direction="column" spacing={2}>
              <div className="text-2xl font-semibold text-text-title">
                Product Commission
              </div>

              <Stack direction="column" spacing={1} className="w-full">
                <Grid xs={12} item>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checkedProductComission}
                        onChange={handleChangeProductComission}
                        name="Allow"
                      />
                    }
                    label="Allow"
                  />
                </Grid>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Allow Hold Cash */}
          <Grid xs={12} item className="">
            <Stack direction="column" spacing={2}>
              <div className="text-2xl font-semibold text-text-title">
                Allow Hold Cash
              </div>

              <Stack direction="column" spacing={1} className="w-full">
                <Grid xs={12} item>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checkedProductComission}
                        onChange={handleChangeProductComission}
                        name="Yes"
                      />
                    }
                    label="Yes"
                  />
                </Grid>
              </Stack>
            </Stack>
          </Grid>
          {/* Divider */}
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Check/ Card percentage */}
          <Grid xs={12} item>
            <Stack direction="column" spacing={2}>
              <div className="text-2xl font-semibold text-text-title">
                Check/ Cash percentage
              </div>

              <Stack direction="row" spacing={2} className="w-full">
                <Grid xs={6} item>
                  <FormControl
                    fullWidth
                    className=" text-sm font-normal !text-mango-text-black-1"
                  >
                    <TextField
                      sx={sxTextField}
                      type="number"
                      label="Tip"
                      {...register('address1', {})}
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

                <Grid xs={6} item>
                  <FormControl
                    fullWidth
                    className=" text-sm font-normal !text-mango-text-black-1"
                  >
                    <TextField
                      sx={sxTextField}
                      type="number"
                      label="Surcharge"
                      {...register('address1', {})}
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
            </Stack>
          </Grid>
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Button bottom */}
          <Grid xs={12} item>
            <Stack direction="row" spacing={2}>
              <Grid xs={6} item>
                <div
                  className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] border
                 border-border-secondary bg-white px-3 text-base font-semibold uppercase  text-text-secondary"
                  onClick={handleCloseDrawer}
                >
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

export default FormAddPayStructure;
