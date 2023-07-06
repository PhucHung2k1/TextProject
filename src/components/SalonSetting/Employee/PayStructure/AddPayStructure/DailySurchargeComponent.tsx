import FormControlComponent from '@/common/Input/FormControlComponent';
import type { DailySurcharge } from '@/services/payStructure.service/payStructure.interface';
import { sxRadioBlue, sxTextField, sxSelect } from '@/utils/helper/styles';
import {
  Grid,
  Stack,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  InputAdornment,
  Box,
  Select,
  MenuItem,
  ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Props {
  dailySurchargeData: DailySurcharge;
  setPayStructureData: Function;
}
const listWorkingTimeType = [
  {
    name: 'Day',
    value: 'Day',
  },
  {
    name: 'Week',
    value: 'Week',
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
const DailySurchargeComponent = ({
  dailySurchargeData,
  setPayStructureData,
}: Props) => {
  const [dailySurcharge, setDailySurcharge] =
    useState<DailySurcharge>(dailySurchargeData);
  const handleChangeValue = (value: boolean | string, name: string) => {
    setDailySurcharge((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    setPayStructureData((prevState: any) => ({
      ...prevState,
      Configuration: {
        ...prevState.Configuration,
        DailySurcharge: dailySurcharge,
      },
    }));
  }, [dailySurcharge]);
  return (
    <Grid xs={12} item>
      <Stack direction="column" spacing={2}>
        <div className="text-2xl font-semibold text-text-title">
          Daily Surcharge
        </div>

        <FormControl>
          <RadioGroup
            value={dailySurcharge.DailySurchargeType}
            onChange={(e) =>
              handleChangeValue(e.target.value, 'DailySurchargeType')
            }
          >
            <Stack direction="row" spacing={2} className="w-full">
              <Grid xs={6} item>
                <FormControlLabel
                  value="DailySurchargeFromCommission"
                  control={<Radio sx={sxRadioBlue} />}
                  label="From commission"
                />

                <FormControlComponent
                  name="DailySurchargeFromCommission"
                  sx={sxTextField}
                  startIconInputProps="percent"
                  value={dailySurcharge.DailySurchargeFromCommission}
                  disabled={
                    dailySurcharge.DailySurchargeType !==
                    'DailySurchargeFromCommission'
                  }
                />
              </Grid>

              <Grid xs={6} item>
                <FormControlLabel
                  value="DailySurchargeFixedSurcharge"
                  control={<Radio sx={sxRadioBlue} />}
                  label="Fixed surcharge"
                />

                <FormControl
                  fullWidth
                  className="w-[83%] text-sm font-normal !text-mango-text-black-1"
                >
                  <FormControlComponent
                    sx={sxTextField}
                    type="number"
                    name="DailySurchargeFixedSurcharge"
                    value={dailySurcharge.DailySurchargeFixedSurcharge}
                    disabled={
                      dailySurcharge.DailySurchargeType !==
                      'DailySurchargeFixedSurcharge'
                    }
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
                value={dailySurcharge.DailySurchargeWorkingTimeType}
                onChange={(e) =>
                  handleChangeValue(
                    e.target.value,
                    'DailySurchargeWorkingTimeType'
                  )
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
                          dailySurcharge.DailySurchargeWorkingTimeType
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

                  {dailySurcharge.DailySurchargeWorkingTimeType === 'Day' && (
                    <TextField
                      sx={sxTextField}
                      label="Min hours (h)"
                      type="number"
                      value={dailySurcharge.DailySurchargeWorkingDailyMinHour}
                      onChange={(e) =>
                        handleChangeValue(
                          e.target.value,
                          'DailySurchargeWorkingDailyMinHour'
                        )
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
                    />
                  )}

                  {/* Type Week */}
                  {dailySurcharge.DailySurchargeWorkingTimeType === 'Week' && (
                    <Box>
                      {/* DailySurchargeWorkingWeeklyType */}
                      <RadioGroup
                        row
                        value={dailySurcharge.DailySurchargeWorkingWeeklyType}
                        onChange={(e) =>
                          handleChangeValue(
                            e.target.value,
                            'DailySurchargeWorkingWeeklyType'
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
                      {dailySurcharge.DailySurchargeWorkingWeeklyType ===
                        'MinDayAndHour' && (
                        <Stack direction="row" className="w-full">
                          <FormControlComponent
                            name="DailySurchargeWorkingWeeklyMinDay"
                            sx={sxTextField}
                            label="Min Day (d)"
                            type="number"
                            value={
                              dailySurcharge.DailySurchargeWorkingWeeklyMinDay
                            }
                            onChange={(e: any) =>
                              handleChangeValue(
                                e.target.value,
                                'DailySurchargeWorkingWeeklyMinDay'
                              )
                            }
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
                              dailySurcharge.DailySurchargeWorkingWeeklyMinHour
                            }
                            onChange={(e: any) =>
                              handleChangeValue(
                                e.target.value,
                                'DailySurchargeWorkingWeeklyMinHour'
                              )
                            }
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
                      {dailySurcharge.DailySurchargeWorkingWeeklyType ===
                        'MinTotalHour' && (
                        <TextField
                          sx={sxTextField}
                          label="Min hours (h)"
                          type="number"
                          value={
                            dailySurcharge.DailySurchargeWorkingWeeklyMinTotalHour
                          }
                          onChange={(e: any) =>
                            handleChangeValue(
                              e.target.value,
                              'DailySurchargeWorkingWeeklyMinTotalHour'
                            )
                          }
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
  );
};

export default DailySurchargeComponent;
