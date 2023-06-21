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
} from '@mui/material';
import React, { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const RoleAndPermissionTab: NextPage = () => {
  const [showFormAppointment, setShowFormAppointment] = useState(true);
  const [showClientManagerment, setClientManagerment] = useState(false);
  const [showCreateAndcharge, setCreateAndcharge] = useState(false);

  const handleShowCreateAndcharge = () => {
    setCreateAndcharge(!showCreateAndcharge);
  };
  const handleShowClientManagerment = () => {
    setClientManagerment(!showClientManagerment);
  };
  const handleShowFormAppointment = () => {
    setShowFormAppointment(!showFormAppointment);
  };

  return (
    <div className="flex h-[800px] w-[796px] bg-white">
      <div className=" flex w-[732px] flex-col  text-xs text-text-secondary">
        <div className="ml-8 mt-8 w-[732px] items-center justify-center">
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
          <div className="mt-4 text-xl font-semibold leading-[133.4%] text-text-title">
            Accessibility
          </div>
          <div className="mt-2 box-border h-[auto] w-[732px] rounded-lg border-[1px] border-solid border-border-light p-1">
            <div className="ml-2 flex flex-row items-center  justify-between text-center">
              <div className="flex flex-row">
                <div>
                  <Switch
                    checked={showFormAppointment}
                    color="primary"
                    size="medium"
                    onChange={handleShowFormAppointment}
                  />
                </div>
                <div className="mt-2 text-lg font-semibold leading-[130%] text-text-primary">
                  Appointment
                </div>
              </div>
              <div>
                {showFormAppointment ? (
                  <>
                    <Button
                      className="items-center justify-center"
                      variant="text"
                      startIcon={<RemoveIcon sx={{ color: '#5C5D6A' }} />}
                      onClick={handleShowFormAppointment}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      className="items-center justify-center"
                      variant="text"
                      startIcon={<AddIcon sx={{ color: '#00ADC3' }} />}
                      onClick={handleShowFormAppointment}
                    />
                  </>
                )}
              </div>
            </div>
            {showFormAppointment ? (
              <>
                <div className="mt-2 box-border h-[2px] w-[full] border-t-[2px] border-solid border-line-light p-[5px]" />
                <div className="ml-4 flex items-center  justify-start text-center">
                  <Checkbox
                    color="primary"
                    defaultChecked
                    size="medium"
                    disabled
                  />
                  <div className="text-base leading-[140%]">
                    Access Appointment Book
                  </div>
                </div>
                <div className="ml-4 flex items-center  justify-start text-center">
                  <Checkbox
                    color="primary"
                    defaultChecked
                    size="medium"
                    disabled
                  />
                  <div className="text-base leading-[140%]">
                    Manage Appointment
                  </div>
                </div>
                <div className="ml-4 flex items-center justify-start text-center">
                  <Checkbox
                    color="primary"
                    value={false}
                    size="medium"
                    disabled
                  />
                  <div className="text-base leading-[140%]">
                    Manage Tech Request
                  </div>
                </div>
              </>
            ) : (
              ''
            )}
          </div>
          <div className="mt-2 box-border h-[auto] w-[732px] rounded-lg border-[1px] border-solid border-border-light p-1">
            <div className="ml-2 flex flex-row items-center  justify-between text-center">
              <div className="flex flex-row">
                <div>
                  <Switch
                    checked={showClientManagerment}
                    color="primary"
                    size="medium"
                    onChange={handleShowClientManagerment}
                  />
                </div>
                <div className="mt-2 text-lg font-semibold leading-[130%] text-text-primary">
                  Client Management
                </div>
              </div>
              <div>
                {showClientManagerment ? (
                  <>
                    <Button
                      className="items-center justify-center"
                      variant="text"
                      startIcon={<RemoveIcon sx={{ color: '#5C5D6A' }} />}
                      onClick={handleShowClientManagerment}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      className="items-center justify-center"
                      variant="text"
                      startIcon={<AddIcon sx={{ color: '#00ADC3' }} />}
                      onClick={handleShowClientManagerment}
                    />
                  </>
                )}
              </div>
            </div>
            {showClientManagerment ? (
              <>
                <div className="mt-2 box-border h-[2px] w-[full] border-t-[2px] border-solid border-line-light p-[5px]" />
                <div className="ml-4 flex items-center  justify-start text-center">
                  <Checkbox
                    color="primary"
                    defaultChecked
                    size="medium"
                    disabled
                  />
                  <div className="text-base leading-[140%]">Take Appoment</div>
                </div>
                <div className="ml-4 flex items-center  justify-start text-center">
                  <Checkbox
                    color="primary"
                    defaultChecked
                    size="medium"
                    disabled
                  />
                  <div className="text-base leading-[140%]">
                    Available for Booking Online
                  </div>
                </div>
                <div className="ml-4 flex items-center justify-start text-center">
                  <Checkbox
                    color="primary"
                    value={false}
                    size="medium"
                    disabled
                  />
                  <div className="text-base leading-[140%]">
                    Allowed to make quick payment
                  </div>
                </div>
              </>
            ) : (
              ''
            )}
          </div>
          <div className="mt-2 box-border h-[auto] w-[732px] rounded-lg border-[1px] border-solid border-border-light p-1">
            <div className="ml-2 flex flex-row items-center  justify-between text-center">
              <div className="flex flex-row">
                <div>
                  <Switch
                    checked={showCreateAndcharge}
                    color="primary"
                    size="medium"
                    onChange={handleShowCreateAndcharge}
                  />
                </div>
                <div className="mt-2 text-lg font-semibold leading-[130%] text-text-primary">
                  Create / Charge
                </div>
              </div>
              <div>
                {showCreateAndcharge ? (
                  <>
                    <Button
                      className="items-center justify-center"
                      variant="text"
                      startIcon={<RemoveIcon sx={{ color: '#5C5D6A' }} />}
                      onClick={handleShowCreateAndcharge}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      className="items-center justify-center"
                      variant="text"
                      startIcon={<AddIcon sx={{ color: '#00ADC3' }} />}
                      onClick={handleShowCreateAndcharge}
                    />
                  </>
                )}
              </div>
            </div>
            {showCreateAndcharge ? (
              <>
                <div className="mt-2 box-border h-[2px] w-[full] border-t-[2px] border-solid border-line-light p-[5px]" />
                <div className="ml-4 flex items-center  justify-start text-center">
                  <Checkbox
                    color="primary"
                    defaultChecked
                    size="medium"
                    disabled
                  />
                  <div className="text-base leading-[140%]">Take Appoment</div>
                </div>
                <div className="ml-4 flex items-center  justify-start text-center">
                  <Checkbox
                    color="primary"
                    defaultChecked
                    size="medium"
                    disabled
                  />
                  <div className="text-base leading-[140%]">
                    Available for Booking Online
                  </div>
                </div>
                <div className="ml-4 flex items-center justify-start text-center">
                  <Checkbox
                    color="primary"
                    value={false}
                    size="medium"
                    disabled
                  />
                  <div className="text-base leading-[140%]">
                    Allowed to make quick payment
                  </div>
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleAndPermissionTab;
