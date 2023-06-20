import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from '@mui/material';
import React from 'react';

function AddRoleAndPermission() {
  const [enableForTechnican, setEnableForTechnican] = React.useState(false);
  // function handleClick() {
  //   setLoading(true);
  // }

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center mb-4">
        <TextField
          variant="outlined"
          placeholder="Role & Permission Name"
          InputProps={{
            style: { height: '48px' },
          }}
          className=" w-8/12 mr-4"
        />

        <FormControlLabel
          sx={{
            display: 'block',
          }}
          control={
            <Switch
              checked={enableForTechnican}
              onChange={() => setEnableForTechnican(!enableForTechnican)}
              name="isEnableTechnican"
              color="primary"
            />
          }
          label="Technician"
        />
      </div>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Allowed to make quick payment"
        />
        <FormControlLabel
          disabled={!enableForTechnican}
          control={<Checkbox />}
          label="Available for Booking Online"
        />
        <FormControlLabel
          control={<Checkbox />}
          disabled={!enableForTechnican}
          label="Allowed to make quick payment"
        />
      </FormGroup>
    </div>
  );
}

export default AddRoleAndPermission;
