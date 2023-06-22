import {
  handleForwardProgressSetupStore,
  handlePreviousProgressSetupStore,
} from '@/components/StoreProfile/helper';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  Switch,
  FormControl,
  MenuItem,
  FormHelperText,
  Select,
  Box,
  Button,
} from '@mui/material';
import type { NextPage } from 'next';
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
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { sxSelect } from '@/utils/helper/styles';

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

  const handleDayArrowClick = (item: IWorkingHours) => {
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
          <div className="text-center">
            <Box
              className="mb-[8px] flex items-center justify-center"
              onClick={() => {
                handlePreviousProgressSetupStore(dispatch);
              }}
            >
              <ArrowBackIcon className="cursor-pointer text-3xl text-icon-color" />
              <p className="mx-auto text-[32px] font-semibold text-text-title">
                Add your working hours
              </p>
            </Box>
            <p className="text-[14px] text-mango-text-gray-2">
              Set up working time for clients to easily book an appointment with
              you
            </p>
          </div>
          <div className="mt-[60px] flex flex-col justify-center text-text-primary">
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
                    <div className=" font-semibold">{item.DayName}</div>
                  </div>
                  <div className="flex w-[50%] justify-between text-left">
                    {!item.IsClosed
                      ? `${convertTo12h(item.StartHours)} - ${convertTo12h(
                          item.EndHours
                        )}`
                      : 'Closed'}
                    {!item.IsClosed ? (
                      <KeyboardArrowRightIcon
                        className="cursor-pointer text-2xl text-icon-color-2"
                        onClick={() => {
                          handleDayArrowClick(item);
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            className="mt-12 h-12 w-full bg-mango-primary-blue  text-base font-bold capitalize text-white hover:bg-button-hover-cyan"
            variant="contained"
            type="submit"
            onClick={() => {
              handleUpdateWorkingHours();
              handleForwardProgressSetupStore(dispatch);
            }}
          >
            CONTINUE
          </Button>
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
              <div className="mt-8 flex items-center  justify-start ">
                <Switch
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#00BDD6',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#00BDD6',
                    },
                  }}
                  checked={showForm}
                  onChange={handleSwitchChange}
                />
                <div className=" px-5 text-center text-[20px] font-semibold">
                  Every {selectedDay}
                </div>
                <div className=" text-text-secondary">
                  {getDifferentHours(startHour, endHour)}
                </div>
              </div>
              {showForm && (
                <>
                  <div className="flex items-center justify-between">
                    <FormControl>
                      <FormHelperText className="m-0 pb-1 text-[16px] font-semibold text-primary-dark">
                        Start
                      </FormHelperText>
                      <Select
                        sx={{ sxSelect }}
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={convertTo12h(startHour)}
                        className="w-[212px]"
                        onChange={(e) =>
                          setStartHour(convertTo24h(e.target.value))
                        }
                        MenuProps={{
                          style: {
                            maxHeight: 348,
                          },
                        }}
                      >
                        {timeOptions.map((item) => (
                          <MenuItem
                            style={{
                              borderTop: '1px solid #f2f2f5',
                              padding: '10px 16px ',
                            }}
                            key={item}
                            value={item}
                          >
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div className="mx-[9px] mt-[30px] w-[14px] border border-solid border-line-light" />
                    <FormControl>
                      <FormHelperText className="m-0 pb-1 text-[16px] font-semibold text-primary-dark">
                        End
                      </FormHelperText>
                      <Select
                        sx={{ sxSelect }}
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={convertTo12h(endHour)}
                        className="w-[212px]"
                        onChange={(e) =>
                          setEndHour(convertTo24h(e.target.value))
                        }
                        MenuProps={{
                          style: {
                            maxHeight: 348,
                          },
                        }}
                      >
                        {timeOptions.map((item) => (
                          <MenuItem
                            key={item}
                            value={item}
                            style={{
                              borderTop: '1px solid #f2f2f5',
                              padding: '10px 16px ',
                            }}
                          >
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div className="mt-[30px] cursor-no-drop ">
                      <Button
                        disabled
                        sx={{
                          minWidth: 'unset',
                          width: 'fit-content',
                        }}
                      >
                        <DeleteOutlineIcon className=" " />
                      </Button>
                    </div>
                  </div>

                  {listBreakHoursForShow.length > 0 ? (
                    <div className="my-[10px] w-full border border-solid border-line-light " />
                  ) : (
                    ''
                  )}
                  {listBreakHoursForShow.length > 0 ? (
                    <>
                      {listBreakHoursForShow.map((form, index) => (
                        <>
                          <div
                            key={`${Math.random()}`}
                            className="flex items-center justify-between"
                          >
                            <FormControl>
                              <FormHelperText
                                className="m-0 py-[10px] pb-1 text-[16px] font-semibold text-primary-dark "
                                style={{
                                  display: index === 0 ? 'block' : 'none',
                                }}
                                // className=""
                              >
                                Break Time
                              </FormHelperText>
                              <Select
                                sx={{ sxSelect }}
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                className="w-[212px]"
                                value={convertTo12h(form.StartHours)}
                                size="medium"
                                onChange={(e) =>
                                  updateHoursBreak(
                                    index,
                                    'start',
                                    convertTo24h(e.target.value)
                                  )
                                }
                                MenuProps={{
                                  style: {
                                    maxHeight: 348,
                                  },
                                }}
                              >
                                {timeOptions.map((item) => (
                                  <MenuItem
                                    key={item}
                                    value={item}
                                    style={{
                                      borderTop: '1px solid #f2f2f5',
                                      padding: '10px 16px ',
                                    }}
                                  >
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <div
                              className={
                                index === 0
                                  ? ' mx-[9px]  mt-[45px] w-[14px] border border-solid border-line-light'
                                  : 'mx-[9px]  w-[14px] border border-solid  border-line-light'
                              }
                            />

                            <FormControl>
                              <FormHelperText
                                className="m-0 py-[10px] pb-1 text-[16px] font-semibold text-primary-dark "
                                style={{
                                  display: index === 0 ? 'block' : 'none',
                                }}
                              >
                                &nbsp;
                              </FormHelperText>
                              <Select
                                sx={{ sxSelect }}
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={convertTo12h(form.EndHours)}
                                className="w-[212px]"
                                onChange={(e) =>
                                  updateHoursBreak(
                                    index,
                                    'end',
                                    convertTo24h(e.target.value)
                                  )
                                }
                                MenuProps={{
                                  style: {
                                    maxHeight: 348,
                                  },
                                }}
                              >
                                {timeOptions.map((item) => (
                                  <MenuItem
                                    key={item}
                                    value={item}
                                    style={{
                                      borderTop: '1px solid #f2f2f5',
                                      padding: '10px 16px ',
                                    }}
                                  >
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <div className={index === 0 ? '  mt-[45px]' : ' '}>
                              <Button
                                sx={{
                                  minWidth: 'unset',
                                  width: 'fit-content',
                                }}
                                onClick={() => removeForm(index)}
                              >
                                <DeleteOutlineIcon className="cursor-pointer  text-right text-icon-delete" />
                              </Button>
                            </div>
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
                    sx={{
                      minWidth: 'unset',
                      width: 'fit-content',
                    }}
                  >
                    Add Break
                  </Button>
                </>
              )}
              <Button
                className="mt-12 h-12 w-full bg-mango-primary-blue  text-base font-bold capitalize text-white hover:bg-button-hover-cyan"
                variant="contained"
                type="submit"
                onClick={onSaveEditHours}
              >
                SAVE
              </Button>
            </div>
          </div>
        </>
      )}
    </LayoutStoreProfile>
  );
};
export default StoreWorkingHoursSetup;
