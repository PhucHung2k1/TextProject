import type { NextPage } from 'next';
import {
  FormControlLabel,
  Radio,
  Switch,
  Checkbox,
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
  MenuItem,
} from '@mui/material';

const RoleAndPermission: NextPage = () => {
  return (
    <div className="flex bg-white w-[796px] h-[800px]">
      <div className=" w-[732px] flex flex-col  text-xs text-text-secondary">
        <div className="ml-8 mt-8 items-center justify-center w-[732px]">
          <FormControl fullWidth variant="outlined">
            <InputLabel
              shrink={true}
              color="primary"
              id="selectRoleAndPermission"
            >
              Select Role & Permission
            </InputLabel>
            <Select
              labelId="selectRoleAndPermission"
              label="Select Role & Permission"
              displayEmpty
              notched={true}
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
          <div className="mt-8 flex flex-row items-center  justify-start text-center">
            <div>
              <Switch checked color="primary" size="medium" />
            </div>
            <div className="text-base leading-[140%]">Technician</div>
          </div>
          <div className="ml-4 flex items-center  justify-start text-center">
            <Checkbox color="primary" defaultChecked size="medium" />
            <div className="text-base leading-[140%]">Take Appoment</div>
          </div>
          <div className="ml-4 flex items-center  justify-start text-center">
            <Checkbox color="primary" defaultChecked size="medium" />
            <div className="text-base leading-[140%]">
              Available for Booking Online
            </div>
          </div>
          <div className="ml-4 flex items-center justify-start text-center">
            <Checkbox color="primary" defaultChecked size="medium" />
            <div className="text-base leading-[140%]">
              Allowed to make quick payment
            </div>
          </div>
          <div className="mt-8 box-border h-[2px] w-[full] border-t-[2px] border-solid border-line-light p-[5px]" />
        </div>
      </div>
    </div>
  );
};

export default RoleAndPermission;
