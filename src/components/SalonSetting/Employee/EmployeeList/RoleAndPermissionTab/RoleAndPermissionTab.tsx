/* eslint-disable react/no-array-index-key */
import type { NextPage } from 'next';
import {
  Switch,
  Checkbox,
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
  MenuItem,
  Button,
  Grid,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const RoleAndPermissionTab: NextPage = () => {
  const [listData, setListData] = useState([
    {
      Name: 'Appointment',
      IsChecked: true,
      Permissions: [
        {
          Name: 'Access Appointment Book',
          IsChecked: true,
        },
        {
          Name: 'Manage Appointment',
          IsChecked: true,
        },
        {
          Name: 'Manage Tech Request',
          IsChecked: false,
        },
      ],
    },
    {
      Name: 'Client Management',
      IsChecked: false,
      Permissions: [
        {
          Name: 'Access Appointment Book',
          IsChecked: true,
        },
        {
          Name: 'Manage Appointment',
          IsChecked: true,
        },
        {
          Name: 'Manage Tech Request',
          IsChecked: false,
        },
      ],
    },
  ]);

  const hanldePrimaryStatus = (index: number) => {
    const updatedStatus = listData.map((item, i) =>
      i === index ? { ...item, IsChecked: !item.IsChecked } : item
    );
    setListData(updatedStatus);
  };

  return (
    <div className=" flex w-[732px] bg-white">
      <div className=" w-[100%] flex-col items-center justify-center  text-xs text-text-secondary">
        <div className="mt-8 w-[full] items-center justify-center">
          <FormControl fullWidth variant="outlined">
            <InputLabel shrink color="primary" id="selectRoleAndPermission">
              Select Role & Permission
            </InputLabel>
            <Select
              labelId="selectRoleAndPermission"
              label="Select Role & Permission"
              displayEmpty
              notched
              color="primary"
              value="Senior Technician"
              size="medium"
            >
              <MenuItem key="Senior Technician" value="Senior Technician">
                Senior Technician
              </MenuItem>
              <MenuItem key="Senior Technician 1" value="Senior Technician 1">
                Senior Technician 1
              </MenuItem>
              <MenuItem key="Senior Technician 2" value="Senior Technician 2">
                Senior Technician 2
              </MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
          <div className="ml-2 mt-8 flex flex-row items-center  justify-start text-center">
            <div>
              <Switch checked color="primary" size="medium" />
            </div>
            <div className="text-base leading-[140%]">Technician</div>
          </div>
          <div className="ml-4 flex items-center  justify-start text-center">
            <Checkbox color="primary" defaultChecked size="medium" disabled />
            <div className="text-base leading-[140%]">Take Appoment</div>
          </div>
          <div className="ml-4 flex items-center  justify-start text-center">
            <Checkbox color="primary" defaultChecked size="medium" disabled />
            <div className="text-base leading-[140%]">
              Available for Booking Online
            </div>
          </div>
          <div className="ml-4 flex items-center justify-start text-center">
            <Checkbox color="primary" defaultChecked size="medium" disabled />
            <div className="text-base leading-[140%]">
              Allowed to make quick payment
            </div>
          </div>
          <div className="mt-8 box-border h-[2px] w-[full] border-t-[2px] border-solid border-line-light p-[5px]" />
          <div className="mb-8">
            <div className="mt-4 text-xl font-semibold leading-[133.4%] text-text-title">
              Accessibility
            </div>
            {listData.map((item, index) => (
              <div
                key={index}
                className=" mt-2 box-border h-[auto] w-[full] rounded-lg border-[1px] border-solid border-border-light p-1"
              >
                <div className="ml-2 flex flex-row items-center  justify-between text-center">
                  <div className="flex flex-row">
                    <div>
                      <Switch
                        checked={item.IsChecked}
                        color="primary"
                        size="medium"
                        onChange={() => hanldePrimaryStatus(index)}
                      />
                    </div>
                    <div className="mt-2 text-lg font-semibold leading-[130%] text-text-primary">
                      {item.Name}
                    </div>
                  </div>
                  <div>
                    {item.IsChecked ? (
                      <>
                        <Button
                          className="items-center justify-center"
                          variant="text"
                          startIcon={
                            <RemoveIcon className="h-8 w-8 rounded bg-mango-gray-light-1 text-mango-text-gray-2" />
                          }
                          onClick={() => hanldePrimaryStatus(index)}
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          className="items-center justify-center"
                          variant="text"
                          startIcon={
                            <AddIcon className="h-8 w-8 rounded border border-mango-primary-blue bg-mango-primary-blue text-white" />
                          }
                          onClick={() => hanldePrimaryStatus(index)}
                        />
                      </>
                    )}
                  </div>
                </div>
                {item.IsChecked ? (
                  <>
                    <div className="mt-2 box-border h-[2px] w-[full] border-t-[2px] border-solid border-line-light p-[5px]" />
                    {item.Permissions.map((permiss, index1) => (
                      <div
                        key={`permiss_${index1}`}
                        className="ml-4 flex items-center  justify-start text-center"
                      >
                        <Checkbox
                          color="primary"
                          checked={permiss.IsChecked}
                          size="medium"
                          disabled
                        />
                        <div className="text-base leading-[140%]">
                          {permiss.Name}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  ''
                )}
              </div>
            ))}

            <Stack className="mt-8" direction="row" spacing={2}>
              <Grid xs={6} item>
                <div className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] border border-border-secondary bg-white px-3 text-base font-semibold uppercase  text-text-secondary">
                  Cancel
                </div>
              </Grid>
              <Grid xs={6} item>
                <div className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] bg-primary-main text-base  font-semibold uppercase text-white">
                  Save
                </div>
              </Grid>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleAndPermissionTab;
