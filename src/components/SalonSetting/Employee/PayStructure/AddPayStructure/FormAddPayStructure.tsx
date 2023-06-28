/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-undef */
import { ErrorMessage } from '@hookform/error-message';
import PercentIcon from '@mui/icons-material/Percent';
import {
  Grid,
  FormControl,
  TextField,
  Stack,
  MenuItem,
  Divider,
  Select,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Box,
  Switch,
  Radio,
  ListItemText,
  InputAdornment,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  sxRadioBlue,
  sxSelect,
  sxSwitchBlue,
  sxTextField,
} from '@/utils/helper/styles';
import type { ICreatePayStructurePayLoad } from '@/services/payStructure.service/payStructure.interface';
import { AttachMoneyOutlined } from '@mui/icons-material';

interface IFormInput {
  payStructureName: string;
  payStructureType: string;
  potentialBonus: number;
  commissionPayout: number;
  maxCommissionPayout: number;
  salaryGuaranteePayout: number;
  maxSalaryGuaranteePayout: number;
  allowSalaryAndCommissionCombination: true;
  requiresWorkingTimeOver: true;
  workingTimeType: string;
  dayMinHour: number;
  weekType: string;
  weekMinHour: number;
  weekMinDay: number;
  weekMinTotalHour: number;
  monthType: string;
  monthMinHour: number;
  monthMinDay: number;
  monthMinTotalHour: number;
  baseOnPeriodType: string;
  baseOnPeriodMinHour: number;
  baseOnPeriodMinDay: number;
  baseOnPeriodMinTotalHour: number;
  tipOnCCType: string;
  tipOnCCFeeFromCreditCard: string;
  tipOnCCDailyFixedFee: number;
  dailySurchargeType: string;
  dailySurchargeFromCommission: number;
  dailySurchargeFixedSurcharge: number;
  dailySurchargeWorkingTimeType: string;
  dailySurchargeWorkingDailyMinHour: number;
  dailySurchargeWorkingWeeklyType: number;
  dailySurchargeWorkingWeeklyMinHour: number;
  dailySurchargeWorkingWeeklyMinDay: number;
  dailySurchargeWorkingWeeklyMinTotalHour: number;
  productChargeType: string;
  baseOnTicketAmount: number;
  baseOnTicketMinChargeAmount: number;
  baseOnTicketMinChargePercent: number;
  allowProductCommission: boolean;
  productCommissionPercent: number;
  maxPayoutProductCommissionPercent: number;
  allowHoldCash: boolean;
  tipFeeCheckPercentage: number;
  surchargeCheckPercentage: number;
}
interface FormAddPayStructureProps {
  handleCloseDrawer: Function;
}
const listPayStructureType = [
  {
    name: 'Commission',
    value: 'commission',
  },
  {
    name: 'Commission-Guarantee',
    value: 'commissionGuarantee',
  },
  {
    name: 'Salary',
    value: 'salary',
  },
  {
    name: 'Hour',
    value: 'hour',
  },
];
const listWorkingTimeType = [
  {
    name: 'Day',
    value: 'day',
  },
  {
    name: 'Week',
    value: 'week',
  },
];
const PayStructureMinTimeUnitType = [
  {
    Value: 'MinDayAndHour',
    Name: 'Min Day And Hour',
    Description: 'Min Day And Hour (day, hour)',
    IconUrl: null,
  },
  {
    Value: 'MinTotalHour',
    Name: 'Min Total Hour',
    Description: 'Min Total Hour (hours)',
    IconUrl: null,
  },
];
const FormAddPayStructure = ({
  handleCloseDrawer,
}: FormAddPayStructureProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const [payStructureData, setPayStructureData] =
    useState<ICreatePayStructurePayLoad>({
      payStructure: {
        name: '',
        description: '',
      },
      payStructureConfiguration: {
        payStructureSettings: {
          payStructureType: 'commission',
          potentialBonus: 50,
          commissionPayout: 30,
          maxCommissionPayout: 60,
          salaryGuaranteePayout: 0,
          maxSalaryGuaranteePayout: 0,
          allowSalaryAndCommissionCombination: true,
          requiresWorkingTimeOver: true,
          workingTimeType: '',
          dayMinHour: 0,
          weekType: '',
          weekMinHour: 0,
          weekMinDay: 0,
          weekMinTotalHour: 0,
          monthType: '',
          monthMinHour: 0,
          monthMinDay: 0,
          monthMinTotalHour: 0,
          baseOnPeriodType: '',
          baseOnPeriodMinHour: 0,
          baseOnPeriodMinDay: 0,
          baseOnPeriodMinTotalHour: 0,
        },
        tipOnCC: {
          tipOnCCType: 'tipOnCCFeeFromCreditCard',
          tipOnCCFeeFromCreditCard: '0',
          tipOnCCDailyFixedFee: 0,
        },
        dailySurcharge: {
          dailySurchargeType: 'dailySurchargeFromCommission',
          dailySurchargeFromCommission: 0,
          dailySurchargeFixedSurcharge: 0,
          dailySurchargeWorkingTimeType: 'day',
          dailySurchargeWorkingDailyMinHour: 8,
          dailySurchargeWorkingWeeklyType: 'MinDayAndHour',
          dailySurchargeWorkingWeeklyMinHour: 0,
          dailySurchargeWorkingWeeklyMinDay: 0,
          dailySurchargeWorkingWeeklyMinTotalHour: 0,
        },
        productCharge: {
          productChargeType: 'Based on Service',
          baseOnTicketAmount: 0,
          baseOnTicketMinChargeAmount: 0,
          baseOnTicketMinChargePercent: 0,
        },
        productCommission: {
          allowProductCommission: true,
          productCommissionPercent: 0,
          maxPayoutProductCommissionPercent: 0,
        },
        holdCash: {
          allowHoldCash: true,
        },
        checkCashPercentage: {
          tipFeeCheckPercentage: 0,
          surchargeCheckPercentage: 0,
        },
      },
    });
  const handleChangePayStructureType = (newPayStructureType: string) => {
    setPayStructureData((prevState) => ({
      ...prevState,
      payStructureConfiguration: {
        ...prevState.payStructureConfiguration,
        payStructureSettings: {
          ...prevState.payStructureConfiguration.payStructureSettings,
          payStructureType: newPayStructureType,
        },
      },
    }));
  };
  const handleChangeWorkingTimeType = (newWorkingTimeType: string) => {
    setPayStructureData((prevState) => ({
      ...prevState,
      payStructureConfiguration: {
        ...prevState.payStructureConfiguration,
        dailySurcharge: {
          ...prevState.payStructureConfiguration.dailySurcharge,
          dailySurchargeWorkingTimeType: newWorkingTimeType,
        },
      },
    }));
  };
  const handleChangeTipOnCCType = (newTipOnCCType: string) => {
    setPayStructureData((prevState) => ({
      ...prevState,
      payStructureConfiguration: {
        ...prevState.payStructureConfiguration,
        tipOnCC: {
          ...prevState.payStructureConfiguration.tipOnCC,
          tipOnCCType: newTipOnCCType,
        },
      },
    }));
  };
  const handleChangeDailySurchargeType = (newDailySurchargeType: string) => {
    setPayStructureData((prevState) => ({
      ...prevState,
      payStructureConfiguration: {
        ...prevState.payStructureConfiguration,
        dailySurcharge: {
          ...prevState.payStructureConfiguration.dailySurcharge,
          dailySurchargeType: newDailySurchargeType,
        },
      },
    }));
  };
  const handleChangeProductChargeType = (newChargeType: string) => {
    setPayStructureData((prevState) => ({
      ...prevState,
      payStructureConfiguration: {
        ...prevState.payStructureConfiguration,
        productCharge: {
          ...prevState.payStructureConfiguration.productCharge,
          productChargeType: newChargeType,
        },
      },
    }));
  };
  const handleChangeAllowProductCommission = (newAllowCommission: boolean) => {
    setPayStructureData((prevState) => ({
      ...prevState,
      payStructureConfiguration: {
        ...prevState.payStructureConfiguration,
        productCommission: {
          ...prevState.payStructureConfiguration.productCommission,
          allowProductCommission: newAllowCommission,
        },
      },
    }));
  };
  const handleChangeAllowHoldCash = (newAllowHoldCash: boolean) => {
    setPayStructureData((prevState) => ({
      ...prevState,
      payStructureConfiguration: {
        ...prevState.payStructureConfiguration,
        holdCash: {
          allowHoldCash: newAllowHoldCash,
        },
      },
    }));
  };
  const handleChangeDailySurchargeWorkingWeeklyType = (
    newWorkingWeeklyType: string
  ) => {
    setPayStructureData((prevState) => ({
      ...prevState,
      payStructureConfiguration: {
        ...prevState.payStructureConfiguration,
        dailySurcharge: {
          ...prevState.payStructureConfiguration.dailySurcharge,
          dailySurchargeWorkingWeeklyType: newWorkingWeeklyType,
        },
      },
    }));
  };
  const onSubmit = async (_values: IFormInput) => {};

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
                error={Boolean(errors.payStructureName)}
                {...register('payStructureName', {
                  required: 'Enter Pay Struct Group Name!',
                })}
                className="!rounded-sm border border-mango-text-gray-1 !outline-none"
              />
              <ErrorMessage
                errors={errors}
                name="payStructureName"
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
                      sx={[sxSelect]}
                      labelId="demo-select-small-label"
                      label="Pay Structure Type"
                      className="h-14"
                      value={
                        payStructureData.payStructureConfiguration
                          .payStructureSettings.payStructureType
                      }
                      onChange={(e) =>
                        handleChangePayStructureType(e.target.value)
                      }
                    >
                      {listPayStructureType.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="start"
                          >
                            <Radio
                              sx={sxRadioBlue}
                              checked={
                                item.value ===
                                payStructureData.payStructureConfiguration
                                  .payStructureSettings.payStructureType
                              }
                            />
                            <ListItemText primary={item.name} />
                          </Box>
                        </MenuItem>
                      ))}
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
                    value={
                      payStructureData.payStructureConfiguration
                        .payStructureSettings.potentialBonus
                    }
                    sx={sxTextField}
                    {...register('potentialBonus', {})}
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
                      value={
                        payStructureData.payStructureConfiguration
                          .payStructureSettings.commissionPayout
                      }
                      {...register('commissionPayout', {})}
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
                      value={
                        payStructureData.payStructureConfiguration
                          .payStructureSettings.maxCommissionPayout
                      }
                      {...register('maxCommissionPayout', {})}
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

              <FormControl>
                <RadioGroup
                  value={
                    payStructureData.payStructureConfiguration.tipOnCC
                      .tipOnCCType
                  }
                  {...register('tipOnCCType', {})}
                  onChange={(e) => handleChangeTipOnCCType(e.target.value)}
                >
                  <Stack direction="row" spacing={2} className="w-full">
                    <Grid xs={6} item>
                      <FormControlLabel
                        value="tipOnCCFeeFromCreditCard"
                        control={<Radio sx={sxRadioBlue} />}
                        label="Fee from credit card"
                      />

                      <FormControl
                        fullWidth
                        className="w-[83%] text-sm font-normal !text-mango-text-black-1"
                      >
                        <TextField
                          sx={sxTextField}
                          value={
                            payStructureData.payStructureConfiguration.tipOnCC
                              .tipOnCCFeeFromCreditCard
                          }
                          {...register('tipOnCCFeeFromCreditCard', {})}
                          className={`!rounded-sm border border-mango-text-gray-1 !outline-none ${
                            payStructureData.payStructureConfiguration.tipOnCC
                              .tipOnCCType !== 'tipOnCCFeeFromCreditCard' &&
                            'bg-disable-input'
                          }`}
                          disabled={
                            payStructureData.payStructureConfiguration.tipOnCC
                              .tipOnCCType !== 'tipOnCCFeeFromCreditCard'
                          }
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
                      <FormControlLabel
                        value="tipOnCCDailyFixedFee"
                        control={<Radio sx={sxRadioBlue} />}
                        label="Daily fixed fee"
                      />

                      <FormControl
                        fullWidth
                        className="w-[83%] text-sm font-normal !text-mango-text-black-1"
                      >
                        <TextField
                          sx={sxTextField}
                          value={
                            payStructureData.payStructureConfiguration.tipOnCC
                              .tipOnCCDailyFixedFee
                          }
                          {...register('tipOnCCDailyFixedFee', {})}
                          className={`!rounded-sm border border-mango-text-gray-1 !outline-none ${
                            payStructureData.payStructureConfiguration.tipOnCC
                              .tipOnCCType !== 'tipOnCCDailyFixedFee' &&
                            'bg-disable-input'
                          }`}
                          disabled={
                            payStructureData.payStructureConfiguration.tipOnCC
                              .tipOnCCType !== 'tipOnCCDailyFixedFee'
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PercentIcon />
                              </InputAdornment>
                            ),
                          }}
                          // disabled={selectedTipOnCC === 'feefromcreditcard'}
                        />
                      </FormControl>
                    </Grid>
                  </Stack>
                </RadioGroup>
              </FormControl>
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

              <FormControl>
                <RadioGroup
                  value={
                    payStructureData.payStructureConfiguration.dailySurcharge
                      .dailySurchargeType
                  }
                  {...register('dailySurchargeType', {})}
                  onChange={(e) =>
                    handleChangeDailySurchargeType(e.target.value)
                  }
                >
                  <Stack direction="row" spacing={2} className="w-full">
                    <Grid xs={6} item>
                      <FormControlLabel
                        value="dailySurchargeFromCommission"
                        control={<Radio sx={sxRadioBlue} />}
                        label="From commission"
                      />

                      <FormControl
                        fullWidth
                        className="w-[83%] text-sm font-normal !text-mango-text-black-1"
                      >
                        <TextField
                          sx={sxTextField}
                          value={
                            payStructureData.payStructureConfiguration
                              .dailySurcharge.dailySurchargeFromCommission
                          }
                          {...register('dailySurchargeFromCommission', {})}
                          className={`!rounded-sm border border-mango-text-gray-1 !outline-none ${
                            payStructureData.payStructureConfiguration
                              .dailySurcharge.dailySurchargeType !==
                              'dailySurchargeFromCommission' &&
                            'bg-disable-input'
                          }`}
                          disabled={
                            payStructureData.payStructureConfiguration
                              .dailySurcharge.dailySurchargeType !==
                            'dailySurchargeFromCommission'
                          }
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
                      <FormControlLabel
                        value="dailySurchargeFixedSurcharge"
                        control={<Radio sx={sxRadioBlue} />}
                        label="Fixed surcharge"
                      />

                      <FormControl
                        fullWidth
                        className="w-[83%] text-sm font-normal !text-mango-text-black-1"
                      >
                        <TextField
                          sx={sxTextField}
                          value={
                            payStructureData.payStructureConfiguration
                              .dailySurcharge.dailySurchargeFixedSurcharge
                          }
                          {...register('dailySurchargeFixedSurcharge', {})}
                          className={`!rounded-sm border border-mango-text-gray-1 !outline-none ${
                            payStructureData.payStructureConfiguration
                              .dailySurcharge.dailySurchargeType !==
                              'dailySurchargeFixedSurcharge' &&
                            'bg-disable-input'
                          }`}
                          disabled={
                            payStructureData.payStructureConfiguration
                              .dailySurcharge.dailySurchargeType !==
                            'dailySurchargeFixedSurcharge'
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PercentIcon />
                              </InputAdornment>
                            ),
                          }}
                          // disabled={selectedTipOnCC === 'feefromcreditcard'}
                        />
                      </FormControl>
                    </Grid>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <Grid
                xs={11}
                className="min-h-[218px] rounded-md border border-mango-gray-light-3 p-5 "
              >
                <Stack direction="column" spacing={1}>
                  <Box className="text-base font-semibold text-text-secondary">
                    If working time is:
                  </Box>
                  <Grid xs={9}>
                    <Select
                      sx={[sxSelect]}
                      fullWidth
                      className="h-14"
                      value={
                        payStructureData.payStructureConfiguration
                          .dailySurcharge.dailySurchargeWorkingTimeType
                      }
                      onChange={(e) =>
                        handleChangeWorkingTimeType(e.target.value)
                      }
                    >
                      {listWorkingTimeType.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="start"
                          >
                            <Radio
                              sx={sxRadioBlue}
                              checked={
                                item.value ===
                                payStructureData.payStructureConfiguration
                                  .dailySurcharge.dailySurchargeWorkingTimeType
                              }
                            />
                            <ListItemText primary={item.name} />
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid xs={9} item>
                    <Box className="  rounded bg-bg-light p-5">
                      <FormControl
                        fullWidth
                        className="text-sm font-normal !text-mango-text-black-1"
                      >
                        {/* Type Day */}

                        {payStructureData.payStructureConfiguration
                          .dailySurcharge.dailySurchargeWorkingTimeType ===
                          'day' && (
                          <TextField
                            sx={sxTextField}
                            label="Min hours (h)"
                            type="number"
                            value={
                              payStructureData.payStructureConfiguration
                                .dailySurcharge
                                .dailySurchargeWorkingDailyMinHour
                            }
                            error={Boolean(errors.dayMinHour)}
                            {...register('dayMinHour', {})}
                            className="w-40 !rounded-sm border border-mango-text-gray-1 bg-white !outline-none"
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
                        )}

                        {/* Type Week */}
                        {payStructureData.payStructureConfiguration
                          .dailySurcharge.dailySurchargeWorkingTimeType ===
                          'week' && (
                          <Box>
                            {/* dailySurchargeWorkingWeeklyType */}
                            <RadioGroup
                              row
                              value={
                                payStructureData.payStructureConfiguration
                                  .dailySurcharge
                                  .dailySurchargeWorkingWeeklyType
                              }
                              onChange={(e) =>
                                handleChangeDailySurchargeWorkingWeeklyType(
                                  e.target.value
                                )
                              }
                            >
                              <Stack
                                direction="column"
                                spacing={1}
                                className="mb-2 w-full"
                              >
                                {PayStructureMinTimeUnitType.map((item) => (
                                  <Grid xs={12} item key={item.Value}>
                                    <FormControlLabel
                                      control={<Radio sx={sxRadioBlue} />}
                                      label={item.Description}
                                      value={item.Value}
                                    />
                                  </Grid>
                                ))}
                              </Stack>
                            </RadioGroup>

                            {/* Type & Hours (day, hour) */}
                            {payStructureData.payStructureConfiguration
                              .dailySurcharge
                              .dailySurchargeWorkingWeeklyType ===
                              'MinDayAndHour' && (
                              <Stack direction="row" gap={2} className="w-full">
                                <TextField
                                  sx={sxTextField}
                                  label="Min Day (d)"
                                  type="number"
                                  value={
                                    payStructureData.payStructureConfiguration
                                      .dailySurcharge
                                      .dailySurchargeWorkingWeeklyMinDay
                                  }
                                  error={Boolean(errors.weekMinDay)}
                                  {...register('dayMinHour', {})}
                                  className="!w-40 !rounded-sm border border-mango-text-gray-1 bg-white !outline-none"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <div className="text-lg font-bold text-icon-color">
                                          D
                                        </div>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                <TextField
                                  sx={sxTextField}
                                  label="Min hours (h)"
                                  type="number"
                                  value={
                                    payStructureData.payStructureConfiguration
                                      .dailySurcharge
                                      .dailySurchargeWorkingWeeklyMinHour
                                  }
                                  error={Boolean(errors.weekMinHour)}
                                  {...register('dayMinHour', {})}
                                  className="!w-40 !rounded-sm border border-mango-text-gray-1 bg-white !outline-none"
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
                              </Stack>
                            )}

                            {/* Min total hours (hours) */}
                            {payStructureData.payStructureConfiguration
                              .dailySurcharge
                              .dailySurchargeWorkingWeeklyType ===
                              'MinTotalHour' && (
                              <TextField
                                sx={sxTextField}
                                label="Min hours (h)"
                                type="number"
                                value={
                                  payStructureData.payStructureConfiguration
                                    .dailySurcharge
                                    .dailySurchargeWorkingWeeklyMinHour
                                }
                                error={Boolean(errors.weekMinHour)}
                                {...register('dayMinHour', {})}
                                className="!w-40 !rounded-sm border border-mango-text-gray-1 bg-white !outline-none"
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
                            )}
                          </Box>
                        )}
                      </FormControl>
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
              <RadioGroup
                row
                value={
                  payStructureData.payStructureConfiguration.productCharge
                    .productChargeType
                }
                onChange={(e) => handleChangeProductChargeType(e.target.value)}
              >
                <Stack direction="column" spacing={1} className="w-full">
                  <Grid xs={12} item>
                    <FormControlLabel
                      control={<Radio sx={sxRadioBlue} />}
                      label="Based on Service (Menu Settings)"
                      value="Based on Service"
                    />
                  </Grid>

                  <Grid xs={12} item>
                    <FormControlLabel
                      control={<Radio sx={sxRadioBlue} />}
                      label="Based on ticket"
                      value="Based on ticket"
                    />
                  </Grid>
                </Stack>
                {/* Based on ticket Content Selected */}

                <Grid xs={6} item>
                  <TextField
                    sx={sxTextField}
                    label="Min ticket amount"
                    type="number"
                    value={
                      payStructureData.payStructureConfiguration.productCharge
                        .baseOnTicketAmount
                    }
                    error={Boolean(errors.baseOnTicketAmount)}
                    {...register('dayMinHour', {})}
                    className="!w-40 !rounded-sm border border-mango-text-gray-1 bg-white !outline-none"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {/* <Grid xs={4} item>
                  <Stack direction="row" spacing={1}>
                    <FormControlLabel
                      label="Charge"
                      labelPlacement="start"
                      control={
                        <TextField
                          sx={sxTextField}
                          label="Min ticket amount"
                          type="number"
                          value={
                            payStructureData.payStructureConfiguration
                              .productCharge.baseOnTicketMinChargeAmount
                          }
                          error={Boolean(errors.baseOnTicketMinChargeAmount)}
                          {...register('baseOnTicketMinChargeAmount', {})}
                          className="!w-40 !rounded-sm border border-mango-text-gray-1 bg-white !outline-none"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AttachMoneyOutlined />
                              </InputAdornment>
                            ),
                          }}
                        />
                      }
                    />

                    <FormControlLabel
                      label="Or"
                      labelPlacement="start"
                      control={
                        <TextField
                          sx={sxTextField}
                          label="Min ticket amount"
                          type="number"
                          value={
                            payStructureData.payStructureConfiguration
                              .productCharge.baseOnTicketMinChargePercent
                          }
                          error={Boolean(errors.baseOnTicketMinChargeAmount)}
                          {...register('baseOnTicketMinChargeAmount', {})}
                          className="!w-40 !rounded-sm border border-mango-text-gray-1 bg-white !outline-none"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AttachMoneyOutlined />
                              </InputAdornment>
                            ),
                          }}
                        />
                      }
                    />
                  </Stack>
                </Grid> */}
              </RadioGroup>
            </Stack>
          </Grid>
          {/* Under line */}
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Product Commission */}
          <Grid xs={12} item className="">
            <Stack direction="column" spacing={2}>
              <div className="text-2xl font-semibold text-text-title">
                Product Commission
              </div>

              <Stack direction="column" spacing={1} className="w-full">
                <Grid xs={12} item>
                  <FormControlLabel
                    sx={sxSwitchBlue}
                    {...register('allowProductCommission', {})}
                    control={
                      <Switch
                        name="Allow"
                        onChange={(e) =>
                          handleChangeAllowProductCommission(e.target.checked)
                        }
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
                    sx={sxSwitchBlue}
                    {...register('allowHoldCash', {})}
                    control={
                      <Switch
                        name="Yes"
                        onChange={(e) =>
                          handleChangeAllowHoldCash(e.target.checked)
                        }
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
                  onClick={() => handleCloseDrawer()}
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
