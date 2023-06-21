/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Grid } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
// eslint-disable-next-line import/no-cycle
import FormAddPayStructure from './FormAddPayStructure';

interface EditEmployeeProps {
  handleCloseDrawer: any;
}

const DrawerAddPayStructure: React.FC<EditEmployeeProps> = ({
  handleCloseDrawer,
}) => {
  return (
    <Grid container spacing={2} className=" w-[796px] bg-white p-8">
      <Grid xs={12} item>
        <div className="relative flex items-center justify-center text-3xl font-semibold text-text-title">
          <p>Add Pay Structure</p>
          <div
            onClick={handleCloseDrawer}
            className="absolute left-0  cursor-pointer text-icon-color"
          >
            <CloseIcon fontSize="large" />
          </div>
        </div>
      </Grid>
      <Grid xs={12} item>
        <FormAddPayStructure handleCloseDrawer={handleCloseDrawer} />
      </Grid>
    </Grid>
  );
};

export default DrawerAddPayStructure;
