import React from 'react';
import { ConfigComponent } from './ConfigComponent';
import { Grid } from '@mui/material';

const listConfigCol1 = [
  {
    typeConfig: 'SalonCenter',
    configName: 'Salon Center',
  },
  {
    typeConfig: 'Book',
    configName: 'Book',
  },
  {
    typeConfig: 'OnlineBooking',
    configName: 'Online Booking',
  },
  {
    typeConfig: 'Turns',
    configName: 'Turns',
  },
];
const listConfigCol2 = [
  {
    typeConfig: 'TurnOffReason',
    configName: 'Authorization Reasons',
  },
  {
    typeConfig: 'Check out',
    configName: 'Checkouts',
  },
  {
    typeConfig: 'Login Required',
    configName: 'Login Required',
  },
  {
    typeConfig: 'Auto Print',
    configName: 'Auto Print',
  },
];
const listConfigCol3 = [
  {
    typeConfig: 'Client',
    configName: 'Client',
  },
  {
    typeConfig: 'TurnOffReason',
    configName: 'Gift Card',
  },
  {
    typeConfig: 'Rating',
    configName: 'Rating',
  },
];
const General = () => {
  return (
    <>
      <Grid container className="pt-10" id="tab-general" spacing={2}>
        {/* List component  Config */}
        <Grid xs={4} item className="overflow-auto" id="tab1-general">
          {listConfigCol1.map((itemConfig) => (
            <ConfigComponent
              typeConfig={itemConfig.typeConfig}
              configName={itemConfig.configName}
              key={itemConfig.typeConfig}
            />
          ))}
        </Grid>
        <Grid
          xs={4}
          item
          className="max-h-[calc(100vh-200px)] overflow-auto"
          id="tab2-general"
        >
          {listConfigCol2.map((itemConfig) => (
            <ConfigComponent
              typeConfig={itemConfig.typeConfig}
              configName={itemConfig.configName}
              key={itemConfig.typeConfig}
            />
          ))}
        </Grid>
        <Grid
          xs={4}
          item
          className="max-h-[calc(100vh-200px)] overflow-auto"
          id="tab3-general"
        >
          {listConfigCol3.map((itemConfig) => (
            <ConfigComponent
              typeConfig={itemConfig.typeConfig}
              configName={itemConfig.configName}
              key={itemConfig.typeConfig}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default General;
