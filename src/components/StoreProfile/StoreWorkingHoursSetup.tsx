import {
  handleForwardProgressSetupStore,
  handlePreviousProgressSetupStore,
} from '@/components/StoreProfile/helper';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  Switch,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  Grid,
  Button,
} from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LayoutStoreProfile } from './LayoutStoreProfile';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import moment from 'moment';
import { Clear } from '@mui/icons-material';
import {
  getWorkingHours,
  updateWorkingHours,
} from '@/store/workingHours/workingHoursAction';
import type {
  IBreakTime,
  IWorkingHours,
} from '@/services/workingHours.service/workingHours.interface';
import { convertTo12h, convertTo24h } from '@/helper/stringHelper';

const StoreWorkingHoursSetup: NextPage = () => {
  const [showEditHours, setShowEditHours] = useState(false);
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const [dayStatus, setDayStatus] = useState(true);
  const [selectedDay, setSelectedDay] = useState('');
  const [showForm, setShowForm] = useState(true);

  const workingHours = useAppSelector(
    (state) => state.workingHoursSlice.workingHours
  );
  const [listData, setListData] = useState<IWorkingHours[]>(workingHours);
  const [listBreakHoursForShow, setListBreakHoursForShow] = useState<
    IBreakTime[]
  >([]);
  const listBreakHoursForUpdate: IBreakTime[] = [];

  const dispatch = useAppDispatch();
  const timeOptions = [
    '12:00 AM',
    '1:00 AM',
    '2:00 AM',
    '3:00 AM',
    '4:00 AM',
    '5:00 AM',
    '6:00 AM',
    '7:00 AM',
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
    '10:00 PM',
    '11:00 PM',
  ];

  const handleShowEditHours = () => {
    setShowEditHours(!showEditHours);
  };
  const handleSwitchChange = () => {
    setShowForm(!showForm);
  };

  const addForm = () => {
    const newBreak: IBreakTime = {
      DayName: selectedDay,
      StartHours: '09:00:00',
      EndHours: '10:00:00',
    };
    setListBreakHoursForShow((prevList) => [...prevList, newBreak]);
  };

  const removeForm = (index: number) => {
    const tempList = listBreakHoursForShow.filter(
      (_, index1) => index1 !== index
    );

    setListBreakHoursForShow(tempList);
    console.log(index, tempList);
  };
  console.log(listBreakHoursForShow);

  const updateHoursBreak = (index: number, position: string, value: string) => {
    if (position === 'start') {
      const updatedHours = listBreakHoursForShow.map((item, i) =>
        i === index ? { ...item, StartHours: value } : item
      );
      setListBreakHoursForShow(updatedHours);
    } else {
      const updatedHours = listBreakHoursForShow.map((item, i) =>
        i === index ? { ...item, EndHours: value } : item
      );
      setListBreakHoursForShow(updatedHours);
    }
  };

  const handleChangeStatus = (index: number) => () => {
    const updatedStatus = listData.map((item, i) =>
      i === index ? { ...item, IsClosed: !item.IsClosed } : item
    );
    setListData(updatedStatus);
  };
  const onSaveEditHours = () => {
    const updatedList = listData.map((item) =>
      item.DayName === selectedDay
        ? {
            ...item,
            StartHours: startHour,
            EndHours: endHour,
            IsClosed: dayStatus,
            BreakTimes: listBreakHoursForShow,
          }
        : item
    );
    setListData(updatedList);
    handleShowEditHours();
  };
  const getDifferentHours = (start: string, end: string) => {
    const momentTime1 = moment(start, 'HH:mm:ss');
    const momentTime2 = moment(end, 'HH:mm:ss');

    const diffInMinutes = momentTime2.diff(momentTime1, 'minutes');

    const diffHours = Math.floor(diffInMinutes / 60);
    const diffMinutes = diffInMinutes % 60;
    return `${diffHours}h ${diffMinutes}m`;
  };

  const handleUpdateWorkingHuors = () => {
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

  const hanldeDayArrowClick = (item: IWorkingHours) => {
    setSelectedDay(item.DayName);
    setDayStatus(item.IsClosed);
    setStartHour(item.StartHours);
    setEndHour(item.EndHours);
    const filteredBreakTimes = listData
      .filter((data) => data.DayName === item.DayName)
      .flatMap((data) => data.BreakTimes);
    setListBreakHoursForShow(filteredBreakTimes);
    handleShowEditHours();
  };

  useEffect(() => {
    dispatch(getWorkingHours({}));
  }, []);
  return (
    <LayoutStoreProfile>
      {!showEditHours ? (
        <>
          <div className="  text-center">
            <div className="flex items-center justify-center ">
              <ArrowBackIcon
                onClick={() => {
                  handlePreviousProgressSetupStore(dispatch);
                }}
                className="cursor-pointer text-3xl"
              />
              <p className="mx-auto text-[32px] font-semibold text-text-title">
                Add your working hours
              </p>
            </div>

            <p className="text-[14px] text-mango-text-gray-2">
              Set up working time for clients to easily book an appointment with
              you
            </p>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-[12px] text-text-primary">
            {listData.map((item, index) => (
              <div key={`${item.DayName}`}>
                <div>
                  <div className="flex flex-row items-center justify-start">
                    <div>
                      <Switch
                        checked={!item.IsClosed}
                        className="p-3"
                        onChange={handleChangeStatus(index)}
                      />
                    </div>
                    <div className="w-[70px] font-semibold leading-[140%]">
                      {item.DayName}
                    </div>
                    <div className="w-[70%] text-center leading-[140%]">
                      {!item.IsClosed
                        ? `${convertTo12h(item.StartHours)} - ${convertTo12h(
                            item.EndHours
                          )}`
                        : 'Closed'}
                    </div>
                    {!item.IsClosed ? (
                      <Image
                        src="/icons/chevronrightfilled.svg"
                        width="20"
                        height="20"
                        alt=""
                        objectFit="cover"
                        className="hidden cursor-pointer overflow-hidden"
                        onClick={() => {
                          hanldeDayArrowClick(item);
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="box-border h-px w-[100] border-t-[1px] border-solid border-line-light p-[5px]" />
              </div>
            ))}
            <button
              onClick={() => {
                handleUpdateWorkingHuors();
                handleForwardProgressSetupStore(dispatch);
              }}
              type="button"
              className="mt-8 box-border flex h-12 w-[100%] flex-col items-center justify-center overflow-hidden rounded bg-primary-main px-[22px] font-bold text-primary-contrast shadow-[0px_1px_5px_rgba(0,_0,_0,_0.12),_0px_2px_2px_rgba(0,_0,_0,_0.14),_0px_3px_1px_-2px_rgba(0,_0,_0,_0.2)]"
            >
              CONTINUE
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="flex items-center justify-center ">
              <Clear
                onClick={handleShowEditHours}
                className="cursor-pointer text-3xl"
              />
              <p className="mx-auto text-center text-[32px] font-semibold text-text-title">
                Edit salon hours
              </p>
            </div>

            <div className="flex w-full flex-col gap-[12px] text-text-primary">
              <div className="mt-8 flex flex-row items-center  justify-start text-center">
                <div>
                  <Switch
                    className="p-3"
                    checked={showForm}
                    onChange={handleSwitchChange}
                  />
                </div>
                <div className="w-[30%] font-semibold leading-[133.4%]">
                  Every {selectedDay}
                </div>
                <div className="leading-[140%] text-text-secondary">
                  {getDifferentHours(startHour, endHour)}
                </div>
              </div>
              {showForm && (
                <>
                  <Grid className="items-center" container spacing={4}>
                    <Grid item xs={4.8}>
                      <div className="font-semibold leading-[140%]">Start</div>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel color="primary" />
                        <Select
                          color="primary"
                          value={convertTo12h(startHour)}
                          size="medium"
                          onChange={(e) =>
                            setStartHour(convertTo24h(e.target.value))
                          }
                        >
                          {timeOptions.map((item) => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText />
                      </FormControl>
                    </Grid>
                    <Grid item xs={0.5}>
                      <div className="mt-8 box-border h-px w-[70] border-t-[2px] border-solid border-line-light p-[5px]" />
                    </Grid>
                    <Grid item xs={4.8}>
                      <div className="font-semibold leading-[140%]">End</div>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel color="primary" />
                        <Select
                          color="primary"
                          value={convertTo12h(endHour)}
                          size="medium"
                          onChange={(e) =>
                            setEndHour(convertTo24h(e.target.value))
                          }
                        >
                          {timeOptions.map((item) => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText />
                      </FormControl>
                    </Grid>
                    <Grid item xs={0.5}>
                      <Button
                        className="items-center justify-center"
                        variant="text"
                        startIcon={
                          <DeleteOutlineIcon sx={{ color: '#C5C4C9' }} />
                        }
                      />
                    </Grid>
                  </Grid>
                  {listBreakHoursForShow.length > 0 ? (
                    <>
                      <div className="mt-8 box-border h-px w-[70] border-t-[2px] border-solid border-line-light p-[5px]" />
                      <div className="font-semibold leading-[140%]">
                        Break Time
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                  {listBreakHoursForShow.length > 0 ? (
                    <>
                      {listBreakHoursForShow.map((form, index) => (
                        <>
                          <div key={`${Math.random()}`}>
                            <Grid
                              className="items-center"
                              container
                              spacing={4}
                            >
                              <Grid item xs={4.8}>
                                <FormControl fullWidth variant="outlined">
                                  <InputLabel color="primary" />
                                  <Select
                                    color="primary"
                                    value={convertTo12h(form.StartHours)}
                                    size="medium"
                                    onChange={(e) =>
                                      updateHoursBreak(
                                        index,
                                        'start',
                                        convertTo24h(e.target.value)
                                      )
                                    }
                                  >
                                    {timeOptions.map((item) => (
                                      <MenuItem key={item} value={item}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  <FormHelperText />
                                </FormControl>
                              </Grid>
                              <Grid item xs={0.5}>
                                <div className="box-border h-px w-[70] border-t-[2px] border-solid border-line-light p-[5px]" />
                              </Grid>
                              <Grid item xs={4.8}>
                                <FormControl fullWidth variant="outlined">
                                  <InputLabel color="primary" />
                                  <Select
                                    color="primary"
                                    value={convertTo12h(form.EndHours)}
                                    size="medium"
                                    onChange={(e) =>
                                      updateHoursBreak(
                                        index,
                                        'end',
                                        convertTo24h(e.target.value)
                                      )
                                    }
                                  >
                                    {timeOptions.map((item) => (
                                      <MenuItem key={item} value={item}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  <FormHelperText />
                                </FormControl>
                              </Grid>
                              <Grid item xs={0.5}>
                                <Button
                                  className="items-center justify-center"
                                  variant="text"
                                  startIcon={
                                    <DeleteOutlineIcon
                                      sx={{ color: '#F28500' }}
                                    />
                                  }
                                  onClick={() => removeForm(index)}
                                />
                              </Grid>
                            </Grid>
                          </div>
                        </>
                      ))}
                    </>
                  ) : (
                    ''
                  )}

                  <Button
                    className="justify-start font-semibold text-primary-main"
                    variant="text"
                    startIcon={<AddIcon sx={{ color: '#00bdd6' }} />}
                    onClick={addForm}
                  >
                    Add Break
                  </Button>
                </>
              )}

              <button
                type="button"
                className="mt-8 box-border flex h-12 w-[100%] flex-col items-center justify-center overflow-hidden rounded bg-primary-main px-[22px] font-bold text-primary-contrast shadow-[0px_1px_5px_rgba(0,_0,_0,_0.12),_0px_2px_2px_rgba(0,_0,_0,_0.14),_0px_3px_1px_-2px_rgba(0,_0,_0,_0.2)]"
                onClick={onSaveEditHours}
              >
                SAVE
              </button>
            </div>
          </div>
        </>
      )}
    </LayoutStoreProfile>
  );
};
export default StoreWorkingHoursSetup;
