import {
  Box,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Switch,
  styled,
  Typography,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import type { IEmployee } from '@/services/employee.service/employee.interface';
import EmployeeProfileTab from './EditEmployeeTab/EmployeeProfileTab';

const steps = [
  {
    label: 'Select campaign settings',
  },
  {
    label: 'Create an ad group',
  },
  {
    label: 'Create an ad',
  },
];
// const itemsTab = [
//   {
//     id: 0,
//     label: 'EMPLOYEE PROFILE ',
//     key: 'employeeList',
//     children: <EmployeeProfileTab />,
//   },
//   {
//     id: 1,
//     label: 'WORK SCHEDULE',
//     key: 'rolePermissions',
//     children: <WorkScheduleTab />,
//   },

//   {
//     id: 2,
//     label: 'ROLE & PERMISSION',
//     key: 'payStructure',
//     children: <RoleAndPermissionTab />,
//   },
//   {
//     id: 4,
//     label: 'PAY STRUCTURE ',
//     key: 'serviceProduct',
//     children: <></>,
//   },
//   {
//     id: 5,
//     label: 'SERVICE & PRODUCT ',
//     key: 'serviceProduct',
//     children: <></>,
//   },
// ];
export const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-thumb': {
    color: theme.palette.common.white,
    backgroundColor: '#4CAF50',
    '&.Mui-checked': {
      backgroundColor: '#4CAF50',
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#8BC34A',
  },
}));

interface EditEmployeeProps {
  handleCloseDrawer: any;
  selectedEmployee: IEmployee | undefined;
}

const EditEmployee: React.FC<EditEmployeeProps> = ({
  handleCloseDrawer,
  selectedEmployee,
}) => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="relative"
    >
      <Grid
        container
        spacing={2}
        className="  w-full bg-white p-8 sm:max-w-[100%] lg:max-w-[50%]"
      >
        <Grid xs={12} item>
          <div className=" flex items-center justify-center text-3xl font-semibold text-text-title">
            <p>Edit Member</p>
          </div>
        </Grid>

        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Grid
            xs={12}
            item
            className="relative mt-8 rounded-lg border  border-mango-gray-light-3 "
          >
            <Stepper
              activeStep={0}
              orientation="vertical"
              className="absolute left-[-220px] "
            >
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <Grid xs={12} item className="border-b border-line-main px-6 py-4">
              <Typography variant="caption" className="text-2xl font-semibold">
                Team member profile
              </Typography>
            </Grid>
            <Box className="px-5">
              <Grid xs={12} item>
                <Box sx={{ width: '100%' }}>
                  <EmployeeProfileTab selectedEmployee={selectedEmployee} />
                </Box>
              </Grid>
            </Box>
          </Grid>
          <Grid
            xs={12}
            item
            className="rounded-lg border  border-mango-gray-light-3 px-4"
          >
            <Grid xs={12} item>
              <Box sx={{ width: '100%' }}>
                <EmployeeProfileTab selectedEmployee={selectedEmployee} />
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
      <Box
        onClick={handleCloseDrawer}
        className="absolute inset-6 h-5 w-5 cursor-pointer  text-icon-color"
      >
        <CloseIcon fontSize="large" />
      </Box>
      <div className="w-full border-t border-mango-gray-light-3 py-6">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Grid xs={3} item>
            <div className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] border border-border-secondary bg-white px-3 text-base font-semibold uppercase  text-text-secondary">
              Cancel
            </div>
          </Grid>
          <Grid xs={3} item>
            <div className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] bg-primary-main text-base  font-semibold uppercase text-white">
              Save
            </div>
          </Grid>
        </Stack>
      </div>
    </Stack>
  );
};

export default EditEmployee;
