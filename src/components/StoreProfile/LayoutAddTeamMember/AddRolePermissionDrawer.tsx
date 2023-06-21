// @flow
import {
  Drawer,
  Box,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  FormGroup,
  Stack,
} from '@mui/material';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { CheckBox } from '@mui/icons-material';

interface Props {
  openDrawer: boolean;
  setOpenDrawer: Function;
}
export const AddRolePermissionDrawer = ({
  openDrawer,
  setOpenDrawer,
}: Props) => {
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  return (
    <Drawer
      anchor="right"
      className="z-[9999] "
      open={openDrawer}
      onClose={handleCloseDrawer}
    >
      <Box className="flex h-full flex-col">
        <Box className="w-full">
          <Grid container spacing={2} className=" w-[796px] bg-white p-8">
            <Grid xs={12} item>
              <div className=" flex items-center justify-center text-3xl font-semibold text-text-title">
                <Box
                  onClick={handleCloseDrawer}
                  className=" mr-auto cursor-pointer  text-icon-color"
                >
                  <CloseIcon fontSize="large" />
                </Box>
                <p className="mr-auto justify-center">Role & Permission</p>
              </div>
            </Grid>
            <Grid xs={8} item>
              <TextField fullWidth placeholder="Role & Permission Name" />
            </Grid>
            <Grid xs={4} item className="flex items-center justify-end">
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
                  control={<Switch />}
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
            </Grid>

            <Grid xs={12} item>
              <FormGroup>
                <FormControlLabel
                  className="ml-[1px]"
                  sx={{
                    color: '#00BDD6',
                    '&.Mui-checked': {
                      color: '#00BDD6',
                    },
                  }}
                  control={<CheckBox />}
                  label={
                    <Box
                      component="div"
                      className="text-[16px] font-medium text-[#404044]"
                    >
                      Allowed to make quick payment
                    </Box>
                  }
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Box>
        <Box className="mt-auto w-full">
          {/* Button bottom */}
          <Grid container className="p-8">
            <Grid xs={12} item>
              <Stack direction="row" spacing={2}>
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
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Drawer>
  );
};
