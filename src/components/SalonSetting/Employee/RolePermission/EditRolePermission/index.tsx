import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Switch,
  Tab,
  TextField,
  styled,
} from '@mui/material';
import * as React from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditAssignEmloyee from '../EditRolePermission';

const EditRolePermission = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    console.log(event);
  };
  const StyledCheckbox = styled(Checkbox)`
    &.MuiCheckbox-root {
      color: #404044;
    }

    &.Mui-checked {
      color: #404044;
    }
  `;
  return (
    <div className="ml-auto mr-[0px] h-[95vh]  w-[796px] border">
      <div className="pt-[24px] text-center">
        <div className="flex items-center justify-center px-[32px] ">
          <ArrowBackIcon className="cursor-pointer text-3xl text-[#5C5D6A]" />

          <p className="mx-auto text-[32px] font-semibold text-[#1F1F23]">
            Edit Role & Permission
          </p>
        </div>
        <div className="mt-[56px] flex justify-between px-[32px]">
          <TextField
            id="outlined-basic"
            label="Role & Permission Name"
            variant="outlined"
            className="mb-2 w-[568px] "
            value="Technician"
            sx={{
              '& .MuiInputBase-root.Mui-focused': {
                '& > fieldset': {
                  borderColor: '#00BDD6',
                },
              },
              '& label.Mui-focused': {
                color: '#00BDD6',
              },
            }}
          />
          <FormGroup>
            <FormControlLabel
              className="ml-[1px]"
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#00BDD6',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#00BDD6',
                },
              }}
              control={<Switch checked />}
              label={
                <Box
                  component="div"
                  className="text-[16px] font-medium text-[#404044]"
                >
                  Technician
                </Box>
              }
            />
          </FormGroup>
        </div>
        <FormGroup className="mb-[50px] mt-[16px] px-[32px]">
          <FormControlLabel
            control={<StyledCheckbox defaultChecked />}
            label="Take Appointment"
          />

          <FormControlLabel
            control={<StyledCheckbox defaultChecked />}
            label="Take Available for Booking Online"
          />

          <FormControlLabel
            control={<StyledCheckbox defaultChecked />}
            label="Allowed to make quick payment"
          />
        </FormGroup>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  '& .css-1aquho2-MuiTabs-indicator': {
                    backgroundColor: '#00BDD6',
                    height: '2px',
                  },
                }}
                className="px-[32px]"
              >
                <Tab
                  className=" text-[14px] font-bold text-[#9B9BA0]"
                  label="ASSIGN EMPLOYEE"
                  value="1"
                  sx={{
                    '&.Mui-selected': {
                      color: '#00BDD6',
                    },
                  }}
                />
                <Tab
                  sx={{
                    '&.Mui-selected': {
                      color: '#00BDD6',
                    },
                  }}
                  className=" text-[14px] font-bold text-[#9B9BA0] "
                  label="ACCESSIBILITY"
                  value="2"
                />
              </TabList>
            </Box>
            <TabPanel value="1" className="p-0">
              <EditAssignEmloyee />
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default EditRolePermission;
