import { sxCheckBox, sxTextField } from '@/utils/helper/styles';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from '@mui/material';
import { useState } from 'react';

interface Props {
  roleName: string;
  setRoleName: Function;
}
function AddRoleAndPermission({ roleName, setRoleName }: Props) {
  const [enableForTechnician, setEnableForTechnician] = useState(true);

  return (
    <>
      <Grid
        xs={12}
        item
        className="mb-4 flex flex-row items-center justify-between"
      >
        <TextField
          sx={sxTextField}
          variant="outlined"
          label="Role & Permission Name"
          placeholder="Role & Permission Name"
          InputProps={{
            style: { height: '48px' },
          }}
          value={roleName}
          className=" mr-4 w-9/12"
          onChange={(e) => setRoleName(e.target.value)}
        />

        <FormControlLabel
          sx={{
            display: 'block',
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#00BDD6',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#00BDD6',
            },
          }}
          control={
            <Switch
              checked={enableForTechnician}
              onChange={() => setEnableForTechnician(!enableForTechnician)}
              name="isEnableTechnician"
              color="primary"
            />
          }
          label="Technician"
        />
      </Grid>
      <Grid xs={12} item>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox sx={sxCheckBox} defaultChecked />}
            label="Allowed to make quick payment"
          />
          <FormControlLabel
            disabled={!enableForTechnician}
            control={<Checkbox sx={sxCheckBox} />}
            label="Available for Booking Online"
          />
          <FormControlLabel
            control={<Checkbox sx={sxCheckBox} />}
            disabled={!enableForTechnician}
            label="Allowed to make quick payment"
          />
        </FormGroup>
      </Grid>
    </>
  );
}

export default AddRoleAndPermission;
