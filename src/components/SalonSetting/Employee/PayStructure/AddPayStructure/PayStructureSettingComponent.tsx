import FormControlComponent from '@/common/Input/FormControlComponent';
import {
  currentDataPayStructureByType,
  currentDataRadioWorkingTimeByType,
} from '@/components/SalonSetting/helper';
import type { PayStructureSettings } from '@/services/payStructure.service/payStructure.interface';
import {
  PayStructureMinTimeUnitType,
  listPayStructureType,
  listWorkingTimeType,
} from '@/utils/helper/lookupData';
import {
  sxSelect,
  sxRadioBlue,
  sxTextField,
  sxSwitchBlue,
} from '@/utils/helper/styles';
import {
  Grid,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Radio,
  ListItemText,
  FormControlLabel,
  Switch,
  InputAdornment,
  RadioGroup,
  TextField,
  Select,
} from '@mui/material';

import React, { useEffect, useState } from 'react';

interface Props {
  setPayStructureData: Function;
}

const PayStructureSettingComponent = ({ setPayStructureData }: Props) => {
  const [payStructureSettings, setPayStructureSettings] =
    useState<PayStructureSettings>({
      PayStructureType: 'Commission',
      PotentialBonus: 50,
      CommissionPayout: 30,
      MaxCommissionPayout: 60,
      SalaryGuaranteePayout: 0,
      MaxSalaryGuaranteePayout: 0,
      HourlyPayout: 0.0,
      MaxHourlyPayout: 0.0,
      AllowSalaryAndCommissionCombination: false,
      RequiresWorkingTimeOver: false,
      WorkingTimeType: 'Day',
      DayMinHour: 0,
      WeekType: 'MinDayAndHour',
      WeekMinHour: 0,
      WeekMinDay: 0,
      WeekMinTotalHour: 0,
      MonthType: 'MinDayAndHour',
      MonthMinHour: 0,
      MonthMinDay: 0,
      MonthMinTotalHour: 0,
      BaseOnPeriodType: 'MinDayAndHour',
      BaseOnPeriodMinHour: 0,
      BaseOnPeriodMinDay: 0,
      BaseOnPeriodMinTotalHour: 0,
    });

  const handleChangeValue = (
    value: boolean | string | number,
    name: string
  ) => {
    setPayStructureSettings((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setPayStructureData((prevState: any) => ({
      ...prevState,
      Configuration: {
        ...prevState.Configuration,
        PayStructureSettings: payStructureSettings,
      },
    }));
  }, [payStructureSettings]);

  return (
    <Grid xs={12} item>
      <Stack direction="column" spacing={2}>
        <Grid xs={5.85} item>
          <div className="text-2xl font-semibold text-text-title">
            Pay Structure settings
          </div>
          <FormControl fullWidth className="mt-4">
            <InputLabel id="pay-structure-type-select-label">
              Pay Structure Type
            </InputLabel>
            <Select
              id="pay-structure-type-select"
              sx={[sxSelect]}
              label="Pay Structure Type"
              labelId="pay-structure-type-select-label"
              className="h-14"
              value={payStructureSettings.PayStructureType}
              onChange={(e) =>
                handleChangeValue(e.target.value, 'PayStructureType')
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
                        item.value === payStructureSettings.PayStructureType
                      }
                    />
                    <ListItemText primary={item.name} />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={5.85} item>
          <FormControl
            fullWidth
            className="text-sm font-normal !text-mango-text-black-1"
          >
            <FormControlComponent
              name="PotentialBonus"
              startIconInputProps="percent"
              label="Potential Bonus"
              type="text"
              value={payStructureSettings.PotentialBonus}
              onChange={(e: any) =>
                handleChangeValue(e.target.value, 'PotentialBonus')
              }
              sx={sxTextField}
            />
          </FormControl>
        </Grid>
        {/* Row 1 Text Field */}

        <Stack direction="row" spacing={2}>
          <Grid xs={6} item>
            <FormControlComponent
              name={
                currentDataPayStructureByType(payStructureSettings).name1Row1
              }
              startIconInputProps="percent"
              label={
                currentDataPayStructureByType(payStructureSettings).label1Row1
              }
              type="text"
              sx={sxTextField}
              value={payStructureSettings.CommissionPayout}
              onChange={(e: any) =>
                handleChangeValue(
                  e.target.value,
                  currentDataPayStructureByType(payStructureSettings).name1Row1
                )
              }
              // className="!rounded-sm border border-mango-text-gray-1 !outline-none"
            />
          </Grid>
          <Grid xs={6} item>
            <FormControlComponent
              name="MaxCommissionPayout"
              startIconInputProps="percent"
              sx={sxTextField}
              label="Max Commission Payout"
              type="text"
              value={payStructureSettings.MaxCommissionPayout}
              // className="!rounded-sm border border-mango-text-gray-1 !outline-none"
            />
          </Grid>
        </Stack>

        {/* Row 2 Text Field  */}
        {payStructureSettings.PayStructureType === 'CommissionGuarantee' && (
          <Stack direction="row" spacing={2}>
            <Grid xs={6} item>
              <FormControlComponent
                name="SalaryGuaranteePayout"
                startIconInputProps="percent"
                label="Salary (Guarantee) Payout"
                type="text"
                sx={sxTextField}
                value={payStructureSettings.SalaryGuaranteePayout}
                onChange={(e: any) =>
                  handleChangeValue(e.target.value, 'SalaryGuaranteePayout')
                }
                // className="!rounded-sm border border-mango-text-gray-1 !outline-none"
              />
            </Grid>
            <Grid xs={6} item>
              <FormControlComponent
                name="MaxSalaryGuaranteePayout"
                startIconInputProps="percent"
                sx={sxTextField}
                label="Max Salary (Guarantee) Payout"
                type="text"
                value={payStructureSettings.MaxSalaryGuaranteePayout}
                onChange={(e: any) =>
                  handleChangeValue(e.target.value, 'MaxSalaryGuaranteePayout')
                }
                // className="!rounded-sm border border-mango-text-gray-1 !outline-none"
              />
            </Grid>
          </Stack>
        )}

        {/* Toggle allow salary only (Guarantee) and requires working time (guarantee and salary) */}
        <Stack direction="column" rowGap={2}>
          {payStructureSettings.PayStructureType === 'CommissionGuarantee' && (
            <FormControlLabel
              sx={sxSwitchBlue}
              control={
                <Switch
                  name="AllowSalaryAndCommissionCombination"
                  value={
                    payStructureSettings.AllowSalaryAndCommissionCombination
                  }
                  onChange={(e) =>
                    handleChangeValue(
                      e.target.checked,
                      'AllowSalaryAndCommissionCombination'
                    )
                  }
                />
              }
              label="Allow salary and commission combination"
            />
          )}
          {(payStructureSettings.PayStructureType === 'CommissionGuarantee' ||
            payStructureSettings.PayStructureType === 'Salary') && (
            <FormControlLabel
              sx={sxSwitchBlue}
              control={
                <Switch
                  name="RequiresWorkingTimeOver"
                  value={payStructureSettings.RequiresWorkingTimeOver}
                  onChange={(e) =>
                    handleChangeValue(
                      e.target.checked,
                      'RequiresWorkingTimeOver'
                    )
                  }
                />
              }
              label="Requires working time over"
            />
          )}
        </Stack>

        {/* Require Working Time */}
        {payStructureSettings.RequiresWorkingTimeOver && (
          <Grid
            xs={8}
            item
            className="min-h-[218px] rounded-md border border-mango-gray-light-3 p-5 "
          >
            <Stack direction="column" spacing={1}>
              <Grid xs={12}>
                {/* Day, Week, Monthly, Base On Period Dropdown */}
                <Select
                  id="working-time-type-select"
                  sx={[sxSelect]}
                  fullWidth
                  className="h-14"
                  value={payStructureSettings.WorkingTimeType}
                  onChange={(e) =>
                    handleChangeValue(e.target.value, 'WorkingTimeType')
                  }
                >
                  {listWorkingTimeType.map((item) => (
                    <MenuItem key={item.Value} value={item.Value}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="start"
                      >
                        <Radio
                          sx={sxRadioBlue}
                          checked={
                            item.Value === payStructureSettings.WorkingTimeType
                          }
                        />
                        <ListItemText primary={item.Name} />
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              {/* Content Dropdown */}
              <Grid xs={12} item>
                <Box className=" rounded bg-bg-light p-5">
                  {/* Content Working Time Drop Down (Type Day) */}

                  {payStructureSettings.WorkingTimeType === 'Day' ? (
                    <FormControl
                      fullWidth
                      className="text-sm font-normal !text-mango-text-black-1"
                    >
                      <TextField
                        sx={sxTextField}
                        label="Min hours (h)"
                        type="number"
                        value={payStructureSettings.DayMinHour}
                        onChange={(e) =>
                          handleChangeValue(e.target.value, 'DayMinHour')
                        }
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
                      />{' '}
                    </FormControl>
                  ) : (
                    <Box>
                      {/* Content Working Time Drop Down (Type Week, Monthly, Base On Period) */}
                      <RadioGroup
                        row
                        value={
                          currentDataRadioWorkingTimeByType(
                            payStructureSettings
                          ).valueType
                        }
                        onChange={(e) => {
                          const { type } =
                            currentDataRadioWorkingTimeByType(
                              payStructureSettings
                            );
                          handleChangeValue(e.target.value, type);
                        }}
                        name={
                          currentDataRadioWorkingTimeByType(
                            payStructureSettings
                          ).type
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
                      {currentDataRadioWorkingTimeByType(payStructureSettings)
                        .valueType === 'MinDayAndHour' && (
                        <Stack direction="row" className="w-full">
                          <FormControlComponent
                            name="WeekMinDay"
                            sx={sxTextField}
                            label="Min Day (d)"
                            type="number"
                            value={
                              currentDataRadioWorkingTimeByType(
                                payStructureSettings
                              ).valueMinDay
                            }
                            onChange={(e: any) => {
                              const { nameMinDay } =
                                currentDataRadioWorkingTimeByType(
                                  payStructureSettings
                                );
                              handleChangeValue(e.target.value, nameMinDay);
                            }}
                            className="!w-40 bg-white"
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

                          <FormControlComponent
                            name="DailySurchargeWorkingWeeklyMinHour"
                            sx={sxTextField}
                            label="Min hours (h)"
                            type="number"
                            value={
                              currentDataRadioWorkingTimeByType(
                                payStructureSettings
                              ).valueMinHour
                            }
                            onChange={(e: any) => {
                              const { nameMinHour } =
                                currentDataRadioWorkingTimeByType(
                                  payStructureSettings
                                );
                              handleChangeValue(e.target.value, nameMinHour);
                            }}
                            className="!w-40 bg-white"
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
                      {currentDataRadioWorkingTimeByType(payStructureSettings)
                        .valueType === 'MinTotalHour' && (
                        <TextField
                          sx={sxTextField}
                          label="Min hours (h)"
                          type="number"
                          value={
                            currentDataRadioWorkingTimeByType(
                              payStructureSettings
                            ).valueMinHour
                          }
                          onChange={(e: any) => {
                            const { nameMinTotalHour } =
                              currentDataRadioWorkingTimeByType(
                                payStructureSettings
                              );
                            handleChangeValue(e.target.value, nameMinTotalHour);
                          }}
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
                </Box>
              </Grid>
            </Stack>
          </Grid>
        )}
      </Stack>
    </Grid>
  );
};

export default PayStructureSettingComponent;
