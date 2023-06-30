import FormControlComponent from '@/common/Input/FormControlComponent';
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
  Select,
  MenuItem,
  Box,
  Radio,
  ListItemText,
  FormControlLabel,
  Switch,
  InputAdornment,
  RadioGroup,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Props {
  setPayStructureData: Function;
}
const listPayStructureType = [
  {
    name: 'Commission',
    value: 'Commission',
  },
  {
    name: 'Commission-Guarantee',
    value: 'CommissionGuarantee',
  },
  {
    name: 'Salary',
    value: 'Salary',
  },
  {
    name: 'Hour',
    value: 'Hour',
  },
];
const listWorkingTimeType = [
  {
    Value: 'Day',
    Name: 'Day',
    Description: 'Day',
    IconUrl: null,
  },
  {
    Value: 'Week',
    Name: 'Week',
    Description: 'Week',
    IconUrl: null,
  },
  {
    Value: 'Monthly',
    Name: 'Monthly',
    Description: 'Monthly',
    IconUrl: null,
  },
  {
    Value: 'BaseOnPeriod',
    Name: 'Base On Period',
    Description: 'Base On Period',
    IconUrl: null,
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
const PayStructureSettingComponent = ({ setPayStructureData }: Props) => {
  const [payStructureSettings, setPayStructureSettings] = useState({
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

  const currentDataRadioWorkingTimeByType = () => {
    switch (payStructureSettings.WorkingTimeType) {
      case 'Week':
        return {
          valueType: payStructureSettings.WeekType,
          valueMinDay: payStructureSettings.WeekMinDay,
          nameMinDay: 'WeekMinDay',
          valueMinHour: payStructureSettings.WeekMinHour,
          nameMinHour: 'WeekMinHour',
          valueMinTotalHour: payStructureSettings.WeekMinTotalHour,
          nameMinTotalHour: 'WeekMinTotalHour',
          type: 'WeekType',
        };
      case 'Monthly':
        return {
          valueType: payStructureSettings.MonthType,
          valueMinDay: payStructureSettings.MonthMinDay,
          nameMinDay: 'MonthMinDay',
          valueMinHour: payStructureSettings.MonthMinHour,
          nameMinHour: 'MonthMinHour',

          valueMinTotalHour: payStructureSettings.MonthMinTotalHour,
          nameMinTotalHour: 'MonthMinTotalHour',
          type: 'MonthType',
        };
      case 'BaseOnPeriod':
        return {
          valueType: payStructureSettings.BaseOnPeriodType,
          valueMinDay: payStructureSettings.BaseOnPeriodMinDay,
          nameMinDay: 'BaseOnPeriodMinDay',
          valueMinHour: payStructureSettings.BaseOnPeriodMinHour,
          nameMinHour: 'BaseOnPeriodMinHour',
          valueMinTotalHour: payStructureSettings.BaseOnPeriodMinTotalHour,
          nameMinTotalHour: 'BaseOnPeriodMinTotalHour',
          type: 'BaseOnPeriodType',
        };
      default:
        return {
          valueType: payStructureSettings.WeekType,
          valueMinDay: payStructureSettings.WeekMinDay,
          nameMinDay: 'WeekMinDay',
          valueMinHour: payStructureSettings.WeekMinHour,
          nameMinHour: 'WeekMinHour',
          valueMinTotalHour: payStructureSettings.WeekMinTotalHour,
          nameMinTotalHour: 'WeekMinTotalHour',
          type: 'WeekType',
        };
    }
  };
  const handleChangeValue = (
    value: boolean | string | number,
    name: string
  ) => {
    setPayStructureSettings((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setPayStructureData((prev: any) => ({ ...prev, payStructureSettings }));
  }, [payStructureSettings]);
  return (
    <Grid xs={12} item>
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
          </Stack>
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
        <Stack direction="row" spacing={2}>
          <Grid xs={6} item>
            <FormControlComponent
              name="CommissionPayout"
              startIconInputProps="percent"
              label="Commission Payout"
              type="text"
              sx={sxTextField}
              value={payStructureSettings.CommissionPayout}
              onChange={(e: any) =>
                handleChangeValue(e.target.value, 'CommissionPayout')
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
        {payStructureSettings.PayStructureType === 'CommissionGuarantee' && (
          <Stack direction="row" spacing={2}>
            <Grid xs={6} item>
              <FormControlComponent
                name="SalaryGuaranteePayout"
                startIconInputProps="percent"
                label="salary (Guarantee) Payout"
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
            xs={11}
            className="min-h-[218px] rounded-md border border-mango-gray-light-3 p-5 "
          >
            <Stack direction="column" spacing={1}>
              <Grid xs={9}>
                {/* Day, Week, Monthly, Base On Period Dropdown */}
                <Select
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
              <Grid xs={9} item>
                <Box className=" rounded bg-bg-light p-5">
                  <FormControl
                    fullWidth
                    className="text-sm font-normal !text-mango-text-black-1"
                  >
                    {/* Content Working Time Drop Down (Type Day) */}

                    {payStructureSettings.WorkingTimeType === 'Day' ? (
                      <TextField
                        sx={sxTextField}
                        label="Min hours (h)"
                        type="number"
                        value={payStructureSettings.DayMinHour}
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
                    ) : (
                      <Box>
                        {/* Content Working Time Drop Down (Type Week, Monthly, Base On Period) */}
                        <RadioGroup
                          row
                          value={currentDataRadioWorkingTimeByType().valueType}
                          onChange={(e) => {
                            const { type } =
                              currentDataRadioWorkingTimeByType();
                            handleChangeValue(e.target.value, type);
                          }}
                          name={currentDataRadioWorkingTimeByType().type}
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
                        {currentDataRadioWorkingTimeByType().valueType ===
                          'MinDayAndHour' && (
                          <Stack direction="row" className="w-full">
                            <FormControlComponent
                              name="WeekMinDay"
                              sx={sxTextField}
                              label="Min Day (d)"
                              type="number"
                              value={
                                currentDataRadioWorkingTimeByType().valueMinDay
                              }
                              onChange={(e: any) => {
                                const { nameMinDay } =
                                  currentDataRadioWorkingTimeByType();
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
                                currentDataRadioWorkingTimeByType().valueMinHour
                              }
                              onChange={(e: any) => {
                                const { nameMinHour } =
                                  currentDataRadioWorkingTimeByType();
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
                        {currentDataRadioWorkingTimeByType().valueType ===
                          'MinTotalHour' && (
                          <TextField
                            sx={sxTextField}
                            label="Min hours (h)"
                            type="number"
                            value={
                              currentDataRadioWorkingTimeByType().valueMinHour
                            }
                            onChange={(e: any) => {
                              const { nameMinTotalHour } =
                                currentDataRadioWorkingTimeByType();
                              handleChangeValue(
                                e.target.value,
                                nameMinTotalHour
                              );
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
                  </FormControl>
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
