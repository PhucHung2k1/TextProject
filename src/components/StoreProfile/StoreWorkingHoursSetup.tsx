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
import { getWorkingHours } from '@/store/workingHours/workingHoursAction';
import type { IWorkingHours } from '@/services/workingHours.service/workingHours.interface';
import { convertTo12h } from '@/helper/stringHelper';

const StoreWorkingHoursSetup: NextPage = () => {
  const [showEditHours, setShowEditHours] = useState(false);
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const [dayStatus, setDayStatus] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [forms, setForms] = useState([{ id: 0 }]);

  const workingHours = useAppSelector(
    (state) => state.workingHoursSlice.workingHours
  );

  const fetchData = workingHours.map((item) => ({
    ...item,
    StartHours: convertTo12h(item.StartHours ?? '09:00:00'),
    EndHours: convertTo12h(item.EndHours ?? '21:00:00'),
  }));
  const [listData, setListData] = useState<IWorkingHours[]>(fetchData);
  const dispatch = useAppDispatch();
  const timeOptions = [
    '05:00 AM',
    '06:00 AM',
    '07:00 AM',
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 AM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
    '09:00 PM',
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
    const newFormId = forms.length + 1;
    setForms([...forms, { id: newFormId }]);
  };
  const removeForm = (formId: number) => {
    setForms(forms.filter((form) => form.id !== formId));
  };

  const handleChangeStatus = (index: number) => () => {
    const updatedStatus = listData.map((item, i) =>
      i === index ? { ...item, IsClosed: !item.IsClosed } : item
    );
    setListData(updatedStatus);
  };
  const onSaveEditHours = () => {
    const updatedList = listData.map((item) =>
      item.Id === selectedId
        ? {
            ...item,
            StartHours: startHour,
            EndHours: endHour,
            IsClosed: dayStatus,
          }
        : item
    );
    setListData(updatedList);
    handleShowEditHours();
  };
  const getDifferentHours = (start: string, end: string) => {
    const momentTime1 = moment(start, 'hh:mm A');
    const momentTime2 = moment(end, 'hh:mm A');

    const diffInMinutes = momentTime2.diff(momentTime1, 'minutes');

    const diffHours = Math.floor(diffInMinutes / 60);
    const diffMinutes = diffInMinutes % 60;
    return `${diffHours}h ${diffMinutes}m`;
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
              <div key={item.Id}>
                <div>
                  <div className="flex flex-row items-center justify-start">
                    <div>
                      <Switch
                        checked={item.IsClosed}
                        className="p-3"
                        onChange={handleChangeStatus(index)}
                      />
                    </div>
                    <div className="w-[70px] font-semibold leading-[140%]">
                      {item.DayName}
                    </div>
                    <div className="w-[70%] text-center leading-[140%]">
                      {item.IsClosed
                        ? `${item.StartHours} - ${item.EndHours}`
                        : 'Closed'}
                    </div>
                    {item.IsClosed ? (
                      <Image
                        src="/icons/chevronrightfilled.svg"
                        width="20"
                        height="20"
                        alt=""
                        objectFit="cover"
                        className="hidden cursor-pointer overflow-hidden"
                        onClick={() => {
                          setSelectedId(item.Id);
                          setDayStatus(item.IsClosed);
                          setStartHour(item.StartHours);
                          setEndHour(item.EndHours);
                          handleShowEditHours();
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
              onClick={() => handleForwardProgressSetupStore(dispatch)}
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
                Edit business hours
              </p>
            </div>

            <div className="flex w-full flex-col gap-[12px] text-text-primary">
              <div className="mt-8 flex flex-row items-center  justify-start text-center">
                <div>
                  <Switch
                    className="p-3"
                    checked
                    onChange={handleSwitchChange}
                  />
                </div>
                <div className="w-[30%] font-semibold leading-[133.4%]">
                  Every Monday
                </div>
                <div className="leading-[140%] text-text-secondary">
                  {getDifferentHours(startHour, endHour)}
                </div>
              </div>
              {showForm && (
                <>
                  <Grid className="items-center" container spacing={4}>
                    <Grid item xs={5.5}>
                      <div className="font-semibold leading-[140%]">Start</div>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel color="primary" />
                        <Select
                          color="primary"
                          defaultValue={startHour}
                          size="medium"
                          onChange={(e) => setStartHour(e.target.value)}
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
                    <Grid item xs={1}>
                      <div className="mt-8 box-border h-px w-[70] border-t-[2px] border-solid border-line-light p-[5px]" />
                    </Grid>
                    <Grid item xs={5.5}>
                      <div className="font-semibold leading-[140%]">End</div>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel color="primary" />
                        <Select
                          color="primary"
                          defaultValue={endHour}
                          size="medium"
                          onChange={(e) => setEndHour(e.target.value)}
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
                  </Grid>
                  {forms.length > 1 ? (
                    <>
                      <div className="mt-8 box-border h-px w-[70] border-t-[2px] border-solid border-line-light p-[5px]" />
                      <div className="font-semibold leading-[140%]">
                        Break Time
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                  {forms.length > 1 ? (
                    <>
                      {forms.map((form) => (
                        <>
                          {form.id > 0 ? (
                            <div key={form.id}>
                              <Grid
                                className="items-center"
                                container
                                spacing={4}
                              >
                                <Grid item xs={4.5}>
                                  <FormControl fullWidth variant="outlined">
                                    <InputLabel color="primary" />
                                    <Select
                                      color="primary"
                                      defaultValue="09:00 AM"
                                      size="medium"
                                      onChange={(e) =>
                                        setStartHour(e.target.value)
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
                                <Grid item xs={1}>
                                  <div className="box-border h-px w-[70] border-t-[2px] border-solid border-line-light p-[5px]" />
                                </Grid>
                                <Grid item xs={4.5}>
                                  <FormControl fullWidth variant="outlined">
                                    <InputLabel color="primary" />
                                    <Select
                                      color="primary"
                                      defaultValue="09:00 PM"
                                      size="medium"
                                      onChange={(e) =>
                                        setEndHour(e.target.value)
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
                                <Grid item xs={1}>
                                  <Button
                                    className="items-center justify-center"
                                    variant="text"
                                    startIcon={
                                      <DeleteOutlineIcon
                                        sx={{ color: '#F28500' }}
                                      />
                                    }
                                    onClick={() => removeForm(form.id)}
                                  />
                                </Grid>
                              </Grid>
                            </div>
                          ) : (
                            ''
                          )}
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
