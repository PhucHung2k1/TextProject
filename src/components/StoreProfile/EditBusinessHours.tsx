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
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import type { NextPage } from 'next';
import { useState } from 'react';

const EditBusinessHours: NextPage = () => {
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [forms, setForms] = useState([{ id: 0 }]);

  console.log(startHour, endHour);
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
  return (
    <div className="flex h-screen w-full items-center justify-center bg-mango-gray-light-2 bg-cover bg-center bg-no-repeat ">
      <div className="flex min-h-[70%] w-[35%] flex-col items-center justify-between gap-2 rounded-2xl bg-white p-6 py-5">
        {/* <div className="absolute left-[0px] top-[0px]  h-4 w-full rounded-t-xl bg-primary-states-hover" />
        <div className="absolute left-[0px] top-[0px] h-4 w-60 rounded-t-xl [background:linear-gradient(90deg,_#80dfeb_68.23%,_rgba(255,_255,_255,_0.52)_99.99%,_rgba(0,_240,_255,_0))]" /> */}
        <div className=" mt-12 w-[90%]">
          <div className="flex items-center justify-center ">
            <img
              className="cursor-pointer text-3xl"
              src="/closefilled.svg"
              alt=""
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
                  checked={showForm}
                  onChange={handleSwitchChange}
                />
              </div>
              <div className="w-[30%] font-semibold leading-[133.4%]">
                Every Monday
              </div>
              <div className="leading-[140%] text-text-secondary">12h 0min</div>
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
                        defaultValue="09:00 AM"
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
                        defaultValue="09:00 PM"
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
                              spacing={3}
                            >
                              <Grid item xs={5}>
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
                              <Grid item xs={5}>
                                <FormControl fullWidth variant="outlined">
                                  <InputLabel color="primary" />
                                  <Select
                                    color="primary"
                                    defaultValue="09:00 PM"
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
              className="mt-8 box-border flex w-[100%] flex-col items-center justify-center overflow-hidden rounded bg-primary-main px-[22px] py-[13px] text-[18px] font-bold text-primary-contrast shadow-[0px_1px_5px_rgba(0,_0,_0,_0.12),_0px_2px_2px_rgba(0,_0,_0,_0.14),_0px_3px_1px_-2px_rgba(0,_0,_0,_0.2)]"
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditBusinessHours;
