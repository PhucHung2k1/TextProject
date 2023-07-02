/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-undef */
import { Grid, Divider, Stack, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hook';

import {
  getWorkingHours,
  updateWorkingHours,
} from '@/store/workingHours/workingHoursAction';
import type {
  IBreakTime,
  IWorkingHours,
} from '@/services/workingHours.service/workingHours.interface';
import { convertTo12h } from '@/helper/stringHelper';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface IFormInput {
  portaltouchid: string;
}

interface WorkingHoursTabProps {}

const WorkingHoursTab: React.FC<WorkingHoursTabProps> = () => {
  const { handleSubmit } = useForm<IFormInput>();

  const onSubmit = async (values: any) => {
    // eslint-disable-next-line no-console
    console.log(
      '🚀 ~ file: WorkingHoursTab.tsx:47 ~ onSubmit ~ values:',
      values
    );
  };
  const [showEditHours] = useState(false);

  const workingHours = useAppSelector(
    (state) => state.workingHoursSlice.workingHours
  );

  const [listData, setListData] = useState<IWorkingHours[]>(workingHours);

  const listBreakHoursForUpdate: IBreakTime[] = [];

  const dispatch = useAppDispatch();

  const handleChangeStatus = (index: number) => () => {
    const updatedStatus = listData.map((item, i) =>
      i === index ? { ...item, IsClosed: !item.IsClosed } : item
    );
    setListData(updatedStatus);
  };

  const handleUpdateWorkingHours = () => {
    listData.forEach((item) => {
      const { DayName, BreakTimes } = item;
      BreakTimes.forEach((breakTime) => {
        listBreakHoursForUpdate.push({
          DayName,
          StartHours: breakTime.StartHours,
          EndHours: breakTime.EndHours,
        });
      });
    });

    const data = {
      StoreHours: listData,
      BreakTime: listBreakHoursForUpdate,
    };

    dispatch(updateWorkingHours(data));
  };
  console.log(handleUpdateWorkingHours);

  useEffect(() => {
    dispatch(getWorkingHours({}));
  }, []);

  useEffect(() => {
    setListData(workingHours);
  }, [workingHours]);

  return (
    <div className="min-w-[893px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-4 rounded-[8px] rounded-t-none border border-t-0 border-mango-gray-light-3"
        noValidate
      >
        <Grid container spacing={2}>
          {/* Mango Biz */}

          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Working hours  */}
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
                <div>
                  {!showEditHours && (
                    <>
                      <div className=" flex flex-col justify-center text-text-primary">
                        {listData.map((item, index) => (
                          <div
                            className={`${
                              index === listData.length - 1 ? '' : 'border-b'
                            } py-[10px]`}
                            key={`${item.DayName}`}
                          >
                            <div className="flex items-center justify-start">
                              <div className="flex w-[50%] items-center justify-start gap-3">
                                <Switch
                                  sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                      color: '#00BDD6',
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':
                                      {
                                        backgroundColor: '#00BDD6',
                                      },
                                  }}
                                  checked={!item.IsClosed}
                                  onChange={handleChangeStatus(index)}
                                />
                                <div className=" font-semibold">
                                  {item.DayName}
                                </div>
                              </div>
                              <div className="flex w-[50%] justify-between text-left">
                                {!item.IsClosed
                                  ? `${convertTo12h(
                                      item.StartHours
                                    )} - ${convertTo12h(item.EndHours)}`
                                  : 'Closed'}
                                {!item.IsClosed ? (
                                  <KeyboardArrowRightIcon className="cursor-pointer text-2xl text-icon-color-2" />
                                ) : (
                                  ''
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default WorkingHoursTab;
