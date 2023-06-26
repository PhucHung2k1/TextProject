import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
  styled,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
// eslint-disable-next-line import/no-cycle
import { AntTab, StyledTabs } from '../..';
import EditRolePermissionTab from './EditRolePermissionTab';
import type { IAllCustomerRole } from '@/services/customerRole.service/customerRole.interface';
import AccessbilityTab from './AccessbilityTab';
import {
  getListRoleCustomById,
  getRoleDetailById,
} from '@/store/customerRole/customerRoleAction';
import { useAppDispatch, useAppSelector } from '@/store/hook';

interface EditRolePermissionProps {
  idRole: any;
  selected: string[];
  handleCloseDrawer: any;
  selectedItem: IAllCustomerRole | undefined;
}
const EditRolePermission: React.FC<EditRolePermissionProps> = ({
  idRole,
  selected,
  handleCloseDrawer,
  selectedItem,
}) => {
  const itemsTab = [
    {
      id: 0,
      label: 'Assign Employee ',
      key: 'assignemployee',
      children: (
        <EditRolePermissionTab
          idRole={idRole}
          selected={selected}
          handleCloseDrawer={handleCloseDrawer}
        />
      ),
    },
    {
      id: 1,
      label: 'Accessbility',
      key: 'accessbility',
      children: <AccessbilityTab handleCloseDrawer={handleCloseDrawer} />,
    },
  ];
  const [roleName, setRoleName] = React.useState(selectedItem?.Name);

  const detailRoleById = useAppSelector(
    (state) => state.customerRoleSlice.detailRoleById
  );

  const dispatch = useAppDispatch();
  const [activeKey, setActiveKey] = React.useState<number>(0);
  const [checkboxValues, setCheckboxValues] = useState({
    takeAppointment: detailRoleById.TakeAppointment,
    bookingOnline: detailRoleById.AvailableBookingOnline,
    quickPayment: detailRoleById.AllowQuickPayment,
  });

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveKey(newValue);
  };

  const [enableForTechnician, setEnableForTechnician] = React.useState(true);
  const StyledCheckbox = styled(Checkbox)`
    &.MuiCheckbox-root {
      color: #404044;
    }

    &.Mui-checked {
      color: #404044;
    }
  `;

  useEffect(() => {
    if (selectedItem?.Id) {
      dispatch(getRoleDetailById(selectedItem && selectedItem?.Id));
      dispatch(getListRoleCustomById(selectedItem && selectedItem?.Id));
    }
  }, [selectedItem?.Id]);

  return (
    <Grid container spacing={2} className=" w-[796px] bg-white p-8">
      <Grid xs={12} item>
        <div className="relative flex items-center justify-center text-3xl font-semibold text-text-title">
          <p>Edit Role & Permission</p>
          <Box
            onClick={handleCloseDrawer}
            className="absolute left-[-10px]  cursor-pointer text-icon-color"
          >
            <CloseIcon fontSize="large" />
          </Box>
        </div>
      </Grid>
      <Grid xs={12} item className="flex flex-row items-center justify-between">
        <TextField
          variant="outlined"
          label="Role & Permission Name"
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
          label={selectedItem?.Name}
        />
      </Grid>
      <Grid xs={12} item>
        <FormGroup>
          <FormControlLabel
            control={
              <StyledCheckbox
                checked={checkboxValues.takeAppointment}
                onChange={handleCheckboxChange}
                name="takeAppointment"
              />
            }
            label="Take Appointment"
          />
          <FormControlLabel
            disabled={!enableForTechnician}
            control={
              <StyledCheckbox
                checked={checkboxValues.bookingOnline}
                onChange={handleCheckboxChange}
                name="bookingOnline"
              />
            }
            label="Available for Booking Online"
          />
          <FormControlLabel
            control={
              <StyledCheckbox
                checked={checkboxValues.quickPayment}
                onChange={handleCheckboxChange}
                name="quickPayment"
              />
            }
            disabled={!enableForTechnician}
            label="Allowed to make quick payment"
          />
        </FormGroup>
      </Grid>
      <Grid xs={12} item>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <StyledTabs value={activeKey} onChange={handleChangeTab}>
              {itemsTab.map((item) => (
                <AntTab key={item.key} label={item.label} />
              ))}
            </StyledTabs>
          </Box>
          {itemsTab.map((item) => {
            return item.id === activeKey ? (
              <div key={item.key}>{item.children}</div>
            ) : (
              <></>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditRolePermission;
