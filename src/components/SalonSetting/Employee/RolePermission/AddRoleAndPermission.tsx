import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from '@mui/material';
import React from 'react';
import { sxTextField } from '@/utils/helper/styles';

function AddRoleAndPermission() {
  const [enableForTechnican, setEnableForTechnican] = React.useState(false);
  // function handleClick() {
  //   setLoading(true);
  // }

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-row items-center justify-between">
        <TextField
          sx={sxTextField}
          variant="outlined"
          placeholder="Role & Permission Name"
          InputProps={{
            style: { height: '48px' },
          }}
          className=" mr-4 w-8/12"
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
