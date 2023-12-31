import { sxSwitchBlue, sxTextField } from '@/utils/helper/styles';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from '@mui/material';
import type { IStateAddRole } from './LayoutDrawer.tsx/DrawerRolePermission';

interface Props {
  roleName: string;
  setRoleName: Function;
  stateAddRole: IStateAddRole;
  setStateAddRole: Function;
}
function AddRoleAndPermission({
  roleName,
  setRoleName,
  stateAddRole,
  setStateAddRole,
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'isTechnician') {
      setStateAddRole({
        ...stateAddRole,
        isTechnician: event.target.checked,
        takeAppointment: false,
        availableBookingOnline: false,
      });
    } else
      setStateAddRole({
        ...stateAddRole,
        [event.target.name]: event.target.checked,
      });
  };

  return (
    <>
      <Grid
        xs={12}
        item
        className="mb-4 flex flex-row items-center justify-between"
      >
        <TextField
          variant="outlined"
          label="Role & Permission Name"
          placeholder="Role & Permission Name"
          sx={sxTextField}
          InputProps={{
            style: { height: '48px' },
          }}
          value={roleName}
          className=" mr-4 w-9/12"
          onChange={(e) => setRoleName(e.target.value)}
        />

        <FormControlLabel
          sx={sxSwitchBlue}
          control={
            <Switch
              checked={stateAddRole.isTechnician}
              onChange={handleChange}
              name="isTechnician"
              color="primary"
            />
          }
          label="Technician"
        />
      </Grid>

      <Grid xs={12} item>
        <FormGroup>
          {stateAddRole.isTechnician && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={stateAddRole.takeAppointment}
                    color="default"
                    onChange={handleChange}
                  />
                }
                label="Take Appointment"
                name="takeAppointment"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    checked={stateAddRole.availableBookingOnline}
                    name="availableBookingOnline"
                    onChange={handleChange}
                  />
                }
                label="Available for Booking Online"
              />
            </>
          )}
          <FormControlLabel
            control={
              <Checkbox
                color="default"
                checked={stateAddRole.allowQuickPayment}
                name="allowQuickPayment"
                onChange={handleChange}
              />
            }
            label="Allowed to make quick payment"
          />
        </FormGroup>
      </Grid>
    </>
  );
}

export default AddRoleAndPermission;
